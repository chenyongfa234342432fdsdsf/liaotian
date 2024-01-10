import { create } from 'zustand'

import { subscribeWithSelector } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'
import { ThemeOptionEnum, ColorPlateEnum, ThemeEnum } from '@/constants/base'
import { setCookieLocale, setCookieTheme } from '@/helper/cookie'
import {
  getLangCache,
  getThemeCache,
  setLangCache,
  setThemeCache,
  getMergeModeCache,
  setMergeModeCache,
  getBusinessIdCache,
  getAccessKeyCache,
  setBusinessIdCache,
  setAccessKeyCache,
  setThemeTypeCache,
} from '@/helper/cache'
import { I18nsEnum } from '@/constants/i18n'
import produce from 'immer'
import { businessId, getDefaultAccessKey, isMerchant } from '@/helper/env'
import { RefObject } from 'react'

type IStore = ReturnType<typeof getStore>

const themeCache = getThemeCache()
const langCache = getLangCache()
const mergeCache = getMergeModeCache()
const businessIdCache = getBusinessIdCache()
const accessKeyCache = getAccessKeyCache()

function getStore(set, get) {
  return {
    maintenanceMode: {
      triggerCheck: false,
      isMaintenance: false,
    },
    setMaintenanceMode: ({ triggerCheck, isMaintenance }: { triggerCheck?: boolean; isMaintenance?: boolean }) =>
      set(
        produce((draft: IStore) => {
          if (triggerCheck) draft.maintenanceMode.triggerCheck = triggerCheck
          if (isMaintenance) draft.maintenanceMode.isMaintenance = isMaintenance
        })
      ),

    themeOption: themeCache || ThemeOptionEnum.light,
    theme: ThemeEnum.light,
    setTheme: (theme: ThemeEnum) => {
      set({ theme })
    },
    themeType: ColorPlateEnum.default,
    setThemeType: (currentThemeType?: string) =>
      set(state => {
        setThemeTypeCache(currentThemeType)
        if (currentThemeType === ColorPlateEnum.okx) {
          state.setTheme(ThemeOptionEnum.light)
        }
        return { themeType: currentThemeType }
      }),
    setThemeOption: (currentTheme: ThemeOptionEnum) =>
      set((state: IStore) => {
        setThemeCache(currentTheme)
        return { themeOption: currentTheme }
      }),
    locale: langCache,
    setLocale: (currentLocale?: string) =>
      set(() => {
        if (currentLocale) {
          return { locale: currentLocale }
        }
        return {}
      }),
    secretKey: null,
    setSecretKey: (secretKey?: string) =>
      set(() => {
        if (secretKey) {
          return { secretKey }
        }
        return {}
      }),
    isMergeMode: mergeCache || false,
    setMergeMode: (isMergeMode: boolean) =>
      set(() => {
        setMergeModeCache(isMergeMode)
        return { isMergeMode }
      }),
    businessId: businessIdCache || businessId,
    setBusinessId: (_businessId: string) =>
      set(() => {
        const id = _businessId || businessId
        setBusinessIdCache(id)
        return { businessId: id }
      }),
    accessKey: accessKeyCache || null,
    setAccessKey: (accessKey: string) =>
      set(() => {
        const _key = accessKey
        setAccessKeyCache(_key)
        return { accessKey: _key }
      }),
    // ws 的延迟时间
    wsDelayTime: 0,
    setwsDelayTime: (wsDelayTime: number) =>
      set(() => {
        return { wsDelayTime }
      }),

    c2cModeInfo: {} as {
      c2cBid?: number
    },
    setC2cModeInfo: info =>
      set(() => {
        return {
          c2cModeInfo: info,
        }
      }),
    /** 全局的铃声播放 */
    globalAudioRefs: {
      message: null as RefObject<HTMLAudioElement> | null,
      call: null as RefObject<HTMLAudioElement> | null,
      videoCall: null as RefObject<HTMLAudioElement> | null,
    },
    setGlobalAudioRefs: (key: string, ref: RefObject<HTMLAudioElement>) =>
      set(() => {
        return {
          globalAudioRefs: {
            ...get().globalAudioRefs,
            [key]: ref,
          },
        }
      }),

    globalVoiceAndVideoRef: null as RefObject<HTMLAudioElement> | null,
    setGlobalVoiceAndVideoRef: (ref: RefObject<HTMLAudioElement>) =>
      set(() => {
        return {
          globalVoiceAndVideoRef: ref,
        }
      }),
  }
}

const baseCommonStore = create(subscribeWithSelector(getStore))

baseCommonStore.subscribe(
  state => state.themeType,
  themeType => {
    if (typeof window !== 'undefined') {
      document.body.setAttribute('theme-type', themeType)
    }
  }
)

export function applyTheme(theme: ThemeOptionEnum) {
  const { setTheme } = baseCommonStore.getState()
  if (typeof window !== 'undefined') {
    if (theme !== ThemeOptionEnum.system) {
      document.body.setAttribute('arco-theme', theme)
      setTheme(theme as any)
      isMerchant && document.body.setAttribute('theme-business', `merchant-${theme}`)
    } else {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      if (mediaQuery.matches) {
        document.body.setAttribute('arco-theme', ThemeOptionEnum.dark)
        setTheme(ThemeEnum.dark)
        isMerchant && document.body.setAttribute('theme-business', `merchant-${ThemeOptionEnum.dark}`)
      } else {
        document.body.setAttribute('arco-theme', ThemeOptionEnum.light)
        setTheme(ThemeEnum.light)
        isMerchant && document.body.setAttribute('theme-business', `merchant-${ThemeOptionEnum.light}`)
      }
    }
    setCookieTheme(theme)
  }
}

// 添加监听，A 模块变动去修改 B 模块状态
baseCommonStore.subscribe(
  state => state.themeOption,
  theme => applyTheme(theme)
)

baseCommonStore.subscribe(
  state => state.locale,
  locale => {
    if (typeof window !== 'undefined') {
      setLangCache(locale)
      setCookieLocale(locale)
    }
  }
)

const useCommonStore = createTrackedSelector(baseCommonStore)
// TODO: 必须要这样调用：baseCommonStore.getState()
export { useCommonStore, baseCommonStore }
