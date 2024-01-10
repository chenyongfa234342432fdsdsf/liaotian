// import { baseCommonStore } from '@/store/common'
// import { baseUserStore } from '@/store/user'
// import { MergeModeLoginInvalidPopUp } from '@/features/user/utils/common'
// import { setCookieBid } from '@/helper/cookie'

// export async function InitMergeMode(pageContext: PageContext) {
//   const { urlParsed } = pageContext
//   const { search } = urlParsed
//   const { setMergeMode, setBusinessId, setAccessKey, isMergeMode } = baseCommonStore.getState()
//   const { updateMerchantToken, setMergeModeToken, clearUserCacheData, isLogin, mergeModeToken } =
//     baseUserStore.getState()

//   const refreshToken = search?.refreshToken
//   const businessId = search?.businessId
//   const accessKey = search?.webAccessKey
//   const isMerge = !!refreshToken && !!businessId && !!accessKey

//   const handleParameters = () => history?.pushState({}, '', urlParsed?.pathname)

//   const handleMergeModeUserInfo = async () => {
//     setMergeModeToken(refreshToken)

//     await clearUserCacheData()
//     await setBusinessId(businessId)
//     await setAccessKey(accessKey)
//     await updateMerchantToken(refreshToken, handleParameters)
//   }

//   /** 设置融合模式 tag */
//   !isMergeMode && setMergeMode(isMerge)

//   /** 登录态判断 */
//   if (isLogin) {
//     if (refreshToken && mergeModeToken) {
//       if (refreshToken === mergeModeToken) {
//         handleParameters()
//         return false
//       }

//       await handleMergeModeUserInfo()
//       return false
//     }
//   }

//   /** 融合模式更新信息 */
//   if (isMerge) {
//     setCookieBid(businessId)
//     await handleMergeModeUserInfo()
//     return false
//   }

//   /** 融合商户未登录处理 */
//   if (isMergeMode && !isMerge && !isLogin) {
//     MergeModeLoginInvalidPopUp()
//   }

//   return false
// }
