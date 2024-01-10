import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'
import produce from 'immer'
import multiWindowsCacheUtils from '@/helper/cache/multi-windows'
import cacheUtils from 'store'
import {
  userInfo,
  setLineCssColor,
  getTokenCache,
  setTokenCache,
  getZimTokenCache,
  setZimTokenCache,
  getChatConfiguration,
  setChatConfiguration,
  getUserInfo,
  setUserInfo,
  getSystemUidCache,
  setSystemUidCache,
} from '@/helper/cache'
import {
  YapiGetV1ImChatImUserIndividualQueryEntityApiNewResponse,
  YapiPostV1ImChatImUserIndividualConfigurationApiNewRequest,
} from '@/typings/apis/setting'
import { removeToken, setToken } from '@/helper/auth'
import {
  UserUpsAndDownsColorEnum,
  UserCurrencySymbolEnum,
  UserEnableEnum,
  ColorBlockSettingsEnum,
} from '@/constants/user'
import { I18nsEnum } from '@/constants/i18n'
import { setMemberSellProperty, setMemberBuyProperty } from '@/helper/handlecolor'
import { link } from '@/helper/link'
import { t } from '@lingui/macro'
import { toKenTtlDefaultValue } from '@/constants/auth'
import { getImInstance } from '@/plugins/im/core'

type IStore = ReturnType<typeof getStore>

const getBaseImStore = () => import('@/store/im').then(res => res.baseImStore)

const cacheToken = getTokenCache() as any | null
const userTransitionData = 'USER_TRANSITION_DATA'
const personalCenterSettings = 'PERSONAL_CENTER_SETTINGS'
const deviceId = 'DEVICE_ID'
const imConfig = 'IM_CONFIG'
const mergeModeToken = 'MERGE_MODE_TOKEN'
const multipleLoginTime = 'MULTIPLE_LOGIN_TIME'
const thirdPartyToken = 'THIRD_PARTY_TOKEN'

type RestItemType = {
  /** 邮箱 */
  isEmail: boolean
  /** 手机 */
  isMobile: boolean
  /** 谷歌 */
  isGoogle: boolean
}

type UserTransitionDataType = {
  /** 账号 */
  account?: string
  /** 账号类型 手机或邮箱 */
  accountType?: string | number
  /** 第三方账号 */
  thirdPartyAccount?: string
  /** 第三方账号类型 */
  thirdPartyAccountType?: string | number
  /** 注册类型 */
  registerType?: string
  /** 极验码 */
  imageCode?: string
  /** 安全项 */
  item?: number
  /** 邮箱 */
  email?: string
  /** 密码 */
  loginPassword?: string
  /** 国家缩写字母 */
  regCountry?: string
  /** 手机区号 */
  mobileCountryCode?: string
  /** 手机号 */
  mobileNumber?: string
  /** uid */
  uid?: string
  /** 重置安全项选项 */
  resetItem?: RestItemType
  /** 地区值 */
  codeVal?: string
  /** 国家名称 */
  codeKey?: string
  /** 是否可用  */
  enableInd?: number
  /** 国家缩写 */
  remark?: string | null
  /** 目录名 */
  homeColumnName?: string
}

type PersonalCenterSettingsType = {
  /** 涨跌色 */
  colors?: number
  /** 深色色块 */
  colorsBlock?: number
  /** 货币符号 */
  currencySymbol?: UserCurrencySymbolEnum
  /** 推送语言 */
  pushLanguage?: string
  /** 保持登录时长 */
  tokenTtl?: number
  /** 自动追加保证金是否首次设置 */
  automaticMarginCall?: string
}

const personalCenterSettingsDefaultValue = {
  colors: UserUpsAndDownsColorEnum.greenUpRedDown,
  colorsBlock: ColorBlockSettingsEnum.grandTotal,
  /** 过渡变量 更新后删除 */
  currencySymbol: UserCurrencySymbolEnum.usd,
  pushLanguage: I18nsEnum['en-US'],
  tokenTtl: toKenTtlDefaultValue,
  automaticMarginCall: UserEnableEnum.no,
}

// 判断 refreshToken 过期时间 重置 isLogin 状态
function getIsLoginStatus() {
  if (cacheToken) {
    const isTrue = Date.now() <= cacheToken.refreshTokenExpireTime && !!cacheToken.accessToken
    return isTrue
  }

  return !!cacheToken
}

function getStore(set, get) {
  return {
    token: cacheToken,
    setToken: (tokenObj: any | null) =>
      set((store: IStore) => {
        return produce(store, _store => {
          _store.token = tokenObj
          setTokenCache(tokenObj)
        })
      }),
    isLogin: getIsLoginStatus(),
    setLogin: (values: boolean) => {
      set((store: IStore) => {
        return produce(store, _store => {
          _store.isLogin = values
        })
      })
    },
    /** 用户是否被禁言 */
    isBan: false,
    setIsBan: (values: boolean) =>
      set((store: IStore) => {
        return produce(store, _store => {
          _store.isBan = values
        })
      }),
    zimToken: getZimTokenCache(),
    setZimToken: (token: string) =>
      set((store: IStore) => {
        return produce(store, _store => {
          setZimTokenCache(token)
          _store.zimToken = token
        })
      }),
    /** 超级管理员 uid */
    systemUid: getSystemUidCache(),
    setSystemUid: (uid: string) =>
      set((store: IStore) => {
        return produce(store, _store => {
          _store.systemUid = uid
          setSystemUidCache(uid)
        })
      }),
    userInfo: getUserInfo() || <any>{},
    setUserInfo: (values: Partial<any>) =>
      set((store: IStore) => {
        return produce(store, _store => {
          const userInfoFormations = { ..._store.userInfo, ...values }

          getBaseImStore().then(baseImStore => {
            if (baseImStore.getState().imIsLogin) {
              getImInstance().updateUserAvatarUrl(userInfoFormations.avatarPath)
              getImInstance().updateUserName(userInfoFormations.nickName)
            }
          })
          _store.userInfo = userInfoFormations
          setUserInfo(userInfoFormations)
        })
      }),
    removeUserInfo: () =>
      set((store: IStore) => {
        return produce(store, _store => {
          _store.userInfo = <any>{}
          multiWindowsCacheUtils.set(userInfo, '')
        })
      }),
    deviceId: multiWindowsCacheUtils.get(deviceId) || '',
    setDeviceId: (values: string) =>
      set((store: IStore) => {
        return produce(store, _store => {
          _store.deviceId = values
          multiWindowsCacheUtils.set(deviceId, values)
        })
      }),
    imConfig: (multiWindowsCacheUtils.get(imConfig) ||
      {}) as YapiPostV1ImChatImUserIndividualConfigurationApiNewRequest,
    setImConfig: (values: YapiPostV1ImChatImUserIndividualConfigurationApiNewRequest) =>
      set((store: IStore) => {
        return produce(store, _store => {
          const imNewConfig = { ..._store.imConfig, ...values }
          _store.imConfig = imNewConfig
          multiWindowsCacheUtils.set(imConfig, imNewConfig)
        })
      }),
    /** 个人中心个人偏好设置 */
    personalCenterSettings: <PersonalCenterSettingsType>{
      ...personalCenterSettingsDefaultValue,
      ...multiWindowsCacheUtils.get(personalCenterSettings),
    },
    /** 清除用户登录状态缓存的数据 */
    clearUserCacheData: async () => {
      const state: IStore = get()

      // removeC2CParamsTipsCache()
      await removeToken()
      await state.removeUserInfo()
      state.setLogin(false)
    },
    /** 更新用户信息 */
    async updateUserInfoData() {
      // const res = await getMemberUserInfo({})
      // if (res.isOk) {
      //   set((store: IStore) => {
      //     return produce(store, _store => {
      //       const userInfoFormations = { ..._store.userInfo, ...(res?.data as MemberUserInfoResp) }
      //       _store.userInfo = userInfoFormations
      //       multiWindowsCacheUtils.set(userInfo, userInfoFormations)
      //     })
      //   })
      // }
    },
    showUserClassificationPopUp: false,
    setUserClassificationPopUpStatus: (status: boolean) =>
      set((store: IStore) => {
        return produce(store, _store => {
          _store.showUserClassificationPopUp = status
        })
      }),
    /** 多点登录时间 */
    multipleLoginTime: multiWindowsCacheUtils.get(multipleLoginTime) || 0,
    setMultipleLoginTime(value) {
      set((store: IStore) => {
        return produce(store, _store => {
          _store.multipleLoginTime = value
          multiWindowsCacheUtils.set(multipleLoginTime, value)
        })
      })
    },
    clearMultipleLoginTime() {
      set((store: IStore) => {
        return produce(store, _store => {
          _store.multipleLoginTime = 0
          multiWindowsCacheUtils.set(multipleLoginTime, 0)
        })
      })
    },
    /** 第三方登录 token */
    thirdPartyToken: multiWindowsCacheUtils.get(thirdPartyToken) || '',
    setThirdPartyToken(token: string) {
      set((store: IStore) => {
        return produce(store, _store => {
          _store.thirdPartyToken = token
          multiWindowsCacheUtils.set(thirdPartyToken, token)
        })
      })
    },
    clearThirdPartyToken() {
      set((store: IStore) => {
        return produce(store, _store => {
          _store.thirdPartyToken = ''
          multiWindowsCacheUtils.set(thirdPartyToken, '')
        })
      })
    },
    userTransitionDatas: multiWindowsCacheUtils.get(userTransitionData) || <UserTransitionDataType>{},
    setUserTransitionDatas: (values: UserTransitionDataType & Partial<Record<'resetEmail' | 'resetPhone', string>>) =>
      set((store: IStore) => {
        return produce(store, _store => {
          const userTranstionData = { ..._store.userTransitionDatas, ...values }
          _store.userTransitionDatas = userTranstionData
          multiWindowsCacheUtils.set(userTransitionData, userTranstionData)
        })
      }),
    removeUserTransitionDatas: () =>
      set((store: IStore) => {
        return produce(store, _store => {
          _store.userTransitionDatas = <UserTransitionDataType>{}
          multiWindowsCacheUtils.set(userTransitionData, '')
        })
      }),
  }
}
const baseUserStore = create(
  devtools(subscribeWithSelector(getStore), {
    name: 'user-store',
  })
)

const useUserStore = createTrackedSelector(baseUserStore)

// 添加监听，A 模块变动去修改 B 模块状态
const unUserSub = baseUserStore.subscribe(
  state => !!state.token,
  val => {
    baseUserStore.getState().setLogin(val)
  }
)
export { useUserStore, baseUserStore, unUserSub }
