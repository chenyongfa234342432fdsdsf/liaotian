import { YapiGetV1ImChatGroupInfoData } from "../yapi/ImChatGroupInfoV1GetApi"

/**
 * 接口 [查询群成员↗](https://yapi.nbttfc365.com/project/82/interface/api/11409) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/member`
 * @更新时间 `2023-08-22 11:10:05`
 */
export interface ImChatGroupMemberApiRequest {
    /**
     * 群组 ID
     */
    groupId: string
    /**是否返回所有成员 1 全部 2 非全部 */
    listType?: number
  }
  
  /**
   * 接口 [查询群成员↗](https://yapi.nbttfc365.com/project/82/interface/api/11409) 的 **返回类型**
   *
   * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
   * @请求头 `GET /v1/im/chat/group/member`
   * @更新时间 `2023-08-22 11:10:05`
   */
  export interface ImChatGroupMemberApiResponse {
    /**
     * 200，成功，其他失败
     */
    code: number
    /**
     * 描述信息
     */
    message: string
    /**
     * 群成员数据
     */
    data: ImChatGroupMemberListData[]
  }
  export interface ImChatGroupMemberListData {
    /**
     * 用户 ID
     */
    uid: number
    /**
     * 用户昵称
     */
    nickName: string
    /**
     * 用户头像
     */
    avatarPath: string
    /**
     * 是否是群主，true，是，false，不是
     */
    lord: boolean
    isLord: boolean
    /**
     * 是否是管理员，true，是，false，不是
     */
    administrator: boolean
    isAdministrator: boolean
    realNickName: string
  }
  export interface SetNormalUserHideRequest {
    /** 群组 ID */
    groupId	: number | string
    /** 是否开启隐藏成员 1，已开启，2，未开启 */
    isHideUser: number
  }
  export interface SetNormalUserHideResponse {
    success: boolean
  }

  export interface banGroupRequest{
    /** 群组 ID */
    groupId: number | string
    /** 禁言类型 1 全部  2 指定 会员 ID */
    banType: number
    /** 会员 ID 列表 */
    memberUid?: number[]
    /** 1 已禁言  2 未禁言 */
    ban: number
  }

  export interface banGroupResponse{
    success: boolean
  }
/**
 * 我的群设置信息
 */
export interface GetV1ImChatGroupInfoSettingData {
  /**
   * 群备注
   */
  groupRemark: string
  /**
   * 消息免打扰，1，关闭，2，打开
   */
  messageDisturb: number
  /**
   * 是否置顶，1，不置顶，2，置顶
   */
  isTop: number
  /**
   * 我在群里面的昵称
   */
  myNickName: string
  /**
   * 显示群成员昵称，1，不显示，2，显示
   */
  showMemberNickName: number
}
/**
 * 群组信息
 */
export interface GetV1ImChatGroupInfoGroupData {
  /**
   * 群名称
   */
  groupName: string
  /**
   * 二维码
   */
  qrCode: string
  /**
   * 群头像
   */
  headImage: string
  /**
   * 群公告
   */
  announcement: string
  /**
   * 群主用户 ID
   */
  lord: number
  /**
   * 群成员数量
   */
  number: number
  /**
   * 创建群用户 ID
   */
  createUid: number
  /**
   * 创建人名称
   */
  createUserName: string
  /**
   * 创建时间，时间戳格式
   */
  createTime: number
  /**
   *  群组状态，1，被封，2，正常
   */
  groupStatus: number
  /**
   * 是否开启隐藏成员 1，已开启，2 未开启
   */
  isHideUser: number
  /**
   * 是否禁言，1，已禁言，2，未禁言
   */
  isBan:  number
  /**
   * 普通用户群禁言，1，已禁言，2，未禁言
   */
  groupBan: number
}
  export interface getV1ImChatGroupInfoApiResponse{
    settingData: GetV1ImChatGroupInfoSettingData
    groupData: GetV1ImChatGroupInfoGroupData
  }

  