
/**
 * 接口 [公告中心正文页↗](https://yapi.nbttfc365.com/project/82/interface/api/12184) 的 **请求类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/announcement/content`
 * @更新时间 `2023-09-22 16:53:04`
 */
export interface ImHelpCenterAnnouncementContentApiRequest {
    /**
     * 870266
     */
    announceContentId: string
  }
  
  /**
   * 接口 [公告中心正文页↗](https://yapi.nbttfc365.com/project/82/interface/api/12184) 的 **返回类型**
   *
   * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
   * @请求头 `GET /v1/im-helpCenter/announcement/content`
   * @更新时间 `2023-09-22 16:53:04`
   */
  export interface ImHelpCenterAnnouncementContentApiResponse {
    code?: number
    data?: ImHelpCenterAnnouncementContentData
    message?: string
  }
  export interface ImHelpCenterAnnouncementContentData {
    /**
     * 目录的列表
     */
    catalogVOList?: ImHelpCenterAnnouncementContentListCatalogVOListData[]
    /**
     * 公告的列表
     */
    announcementList?: ImHelpCenterAnnouncementContentListAnnouncementListData[]
    /**
     * 正文的内容
     */
    announcementCenter?: announcementCenterType
  }

  export interface announcementCenterType {
    /** 正文内容 */
    content: string
    /** 标题 */
    name: string
    /** 上级的 id */
    parentId: string
    /** 更新时间 */
    pushTimeStramp: number
  }
  export interface ImHelpCenterAnnouncementContentListCatalogVOListData {
    /**
     * 标题
     */
    name?: string
    /**
     * ID
     */
    id?: number
  }
  export interface ImHelpCenterAnnouncementContentListAnnouncementListData {
    /**
     * 标题
     */
    name: string
    /**
     * id
     */
    id: number
  }



  
  

  