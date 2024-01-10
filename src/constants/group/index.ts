export enum GroupEnum {
  /** 新增群成员 */
  add = 'add',
  /** 删除群成员 */
  del = 'del',
  /** 新增群管理人员 */
  addGroup = 'addGroup',
  /** 删除群管理人员 */
  delGroup = 'delGroup',
}

export enum GroupShowNicknameEnum {
  show = '2',
  hide = '1',
}

export enum GroupHideNormalMembers {
  show = 2,
  hide = 1,
}
/** 群成员是否被禁言 */
export enum GroupMemberBanEnum {
  /** 禁言 */
  ban = 1,
  /** 解禁 */
  normal = 2,
}
