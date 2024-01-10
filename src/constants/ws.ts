// https://cd.admin-devops.com/zentao/doc-objectLibs-custom-0-79-665.html#app=doc
export enum WsTypesEnum {
  friendDestroy = 'friend_destroy',
  friendAddPass = 'friend_add_pass',
  redPackageStatus = 'red_package_status',
  friendAdd = 'friend_add',
  userInfoModify = 'user_info_modify',
  friendApply = 'friend_apply',
  passFriendApply = 'pass_friend_apply',
}

export function getWsContractType(type: WsTypesEnum) {
  return `perpetual_${type}`
}

export enum WsBizEnum {
  im = 'im',
}

export enum WsThrottleTimeEnum {
  Slower = 2000, // 慢速 2 秒 1 次
  Slow = 1000, // 慢速 1 秒 1 次
  Market = 500, // 正常速度 1 秒 2 次
  Medium = 300, // 中等速度 1 秒 3 次
  Fast = 100, // 快速 1 秒 10 次
}
