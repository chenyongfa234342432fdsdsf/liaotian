/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取网站配置信息↗](https://yapi.nbttfc365.com/project/82/interface/api/12434) 的 **请求类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/im-home/website/getData`
 * @更新时间 `2023-09-04 16:21:09`
 */
export interface YapiGetV1ImHomeWebsiteGetDataApiRequest {
  /**
   * newbit商户默认填1
   */
  businessId: string
  /**
   * 语言类型
   */
  lanType: string
}

/**
 * 接口 [获取网站配置信息↗](https://yapi.nbttfc365.com/project/82/interface/api/12434) 的 **返回类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/im-home/website/getData`
 * @更新时间 `2023-09-04 16:21:09`
 */
export interface YapiGetV1ImHomeWebsiteGetDataApiResponse {
  code?: number
  data?: YapiGetV1ImHomeWebsiteGetData
  message?: string
}
export interface YapiGetV1ImHomeWebsiteGetData {
  /**
   * logo url
   */
  imgWebLogo?: string
  /**
   * 公司:展示在网页头部
   */
  copyright?: string
  /**
   * 司法联络邮箱
   */
  emailJudiciary?: string
  /**
   * seo_keywords
   */
  keywords?: string
  /**
   * 作者
   */
  author?: string
  /**
   * 商务合作邮箱
   */
  emailBusiness?: string
  /**
   * 语言类型 字典
   */
  lanTypeCd?: string
  /**
   * app平台介绍
   */
  appInfo?: string
  /**
   * 平台名称
   */
  businessName?: string
  /**
   * 控制台名称
   */
  controlName?: string
  /**
   * 网址描述
   */
  description?: string
  /**
   * 网址title
   */
  webTitle?: string
  /**
   * 客服邮箱
   */
  emailCustomer?: string
  /**
   * 网站年份设置：首页展示
   */
  webCopyright?: string
  /**
   * icon url
   */
  imgWebIcon?: string
  /**
   * 产品反馈邮箱
   */
  emailProduct?: string
  /**
   * 官网url
   */
  webUrl?: string
  /**
   * slogen设置
   */
  slogan?: string
  /**
   * 客服中心跳转链接
   */
  customerJumpUrl?: string
  /**
   * app分享二维码
   */
  shareQrCode?: string
  /**
   * app分享标题
   */
  shareTitle?: string
  /**
   * app分享封面图
   */
  shareCoverUrl?: string
  /**
   * web分享封面图
   */
  webShareCoverUrl?: string
  /**
   *  PC下载页面的描述
   */
  pcDownloadDescription?: string
  /**
   * APP下载页面的描述
   */
  appDownloadDescription?: string
  /**
   * APP下载页面的标题
   */
  appDownloadTitle?: string
  /**
   * PC下载页面的标题
   */
  pcDownloadTitle?: string
  /**
   * APP邀请返佣跳转链接
   */
  inviteReturnAppUrl?: string
  /**
   * APP活动中心跳转链接
   */
  activityCenterAppUrl?: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取网站配置信息↗](https://yapi.nbttfc365.com/project/82/interface/api/12434)
// **/
// export const getV1ImHomeWebsiteGetDataApiRequest: MarkcoinRequest<
//   YapiGetV1ImHomeWebsiteGetDataApiRequest,
//   YapiGetV1ImHomeWebsiteGetDataApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im-home/website/getData",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
