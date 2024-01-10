import dayjs from 'dayjs'
import { SignEnum } from '@/constants/checkin'
import { t } from '@lingui/macro'

export const getDaysOfMonth = (year: number, month: number) => {
  const currentDate = dayjs(`${year}-${month}-01`) // 使用传入的年份和月份

  const firstDayOfMonth = currentDate.startOf('month') // 当前月份的第一天
  const lastDayOfMonth = currentDate.endOf('month') // 当前月份的最后一天

  const days: any[] = []
  // 如果第一天不是周日，则用空数组填充从周日开始到第一天之间的日期
  if (firstDayOfMonth.day() !== 0) {
    const emptyDaysCount = firstDayOfMonth.day()
    for (let i = 0; i < emptyDaysCount; i += 1) {
      days.push(null)
    }
  }

  let tempDate: any = firstDayOfMonth
  while (tempDate.isBefore(lastDayOfMonth) || tempDate.isSame(lastDayOfMonth)) {
    days.push({ daynumber: dayjs(tempDate).format('YYYY-MM-DD'), ifSign: SignEnum.NO_SIGNED_IN })
    tempDate = tempDate.add(1, 'day')
  }

  return days
}

export const weekTitles = [
  t`features_checkin_center_utils_cq7yreasiy`,
  t`features_checkin_center_utils_hsmq9adcbj`,
  t`features_checkin_center_utils_zrxiofx_wk`,
  t`features_checkin_center_utils_niylmixu4l`,
  t`features_checkin_center_utils_puqb0pmu0s`,
  t`features_checkin_center_utils_ysfleqaslz`,
  t`features_checkin_center_utils_ugbqkpexsy`,
]
