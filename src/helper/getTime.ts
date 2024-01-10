export const getTime = applyTime => {
  // 获取当前时间的时间戳
  const currentTimestamp = new Date().getTime()

  // 计算差值（毫秒为单位）
  const differenceInMilliseconds = currentTimestamp - applyTime

  // 转换差值为天数
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))

  return differenceInDays
}
