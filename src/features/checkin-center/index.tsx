import { useMemo, useState, useEffect, useRef } from 'react'
import Link from '@/components/link'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { t } from '@lingui/macro'
import {
  postV1ImChatImBlockListQueryList,
  getV1ImSignInGetUserSignInfoApiRequest,
  postV1ImSignInSignInApiRequest,
} from '@/apis/checkin-center'
import { YapiGetV1ImSignInGetUserSignInfoListSignInfoListNewData } from '@/typings/apis/checkin'
import { signRemindEnum } from '@/constants/setting'
import { useCheckinStore } from '@/store/checkin-center'
import { SignEnum, MONTH_SWITCH_PREV, MONTH_SWITCH_NEXT } from '@/constants/checkin'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { Switch, Message, Button } from '@nbit/arco'
import LazyImage from '@/components/lazy-image'
import Icon from '@/components/icon'
import { getDaysOfMonth, weekTitles } from './utils'
import PointsRecord, { PointsRecordRef } from './points-record'
import SignSuccess from './sign-success'
import Styles from './index.module.css'

dayjs.locale('zh-cn')

// 日期切换按钮
function CalendarMonthSwitch({ onMonthSwitch, direction }) {
  return (
    <div className="calendar-month-switch" onClick={() => onMonthSwitch(direction)}>
      <Icon name="icon_chat_arrow" fontSize={12} className={direction === MONTH_SWITCH_PREV ? 'left-icon' : ''} />
    </div>
  )
}

// 天的图标
function CalendarDay({ day }) {
  if (!day) {
    return <div />
  }

  const dayClass =
    day.ifSign === SignEnum.SIGNED_IN_OVER
      ? 'calendar-day overcalendar-day'
      : day.ifSign === SignEnum.SIGNED_IN
      ? 'calendar-day signedcalendar-day'
      : 'calendar-day nocalendar-day'
  const imageType =
    day.ifSign === SignEnum.SIGNED_IN_OVER
      ? 'sign-expired'
      : day.ifSign === SignEnum.SIGNED_IN
      ? 'signedin'
      : 'nosignedin'
  const imageUrl = `${oss_svg_image_domain_address}${imageType}.png`
  return (
    <div className={dayClass} key={day.daynumber}>
      <div className="calendardaytop">{dayjs(day.daynumber).format('DD')}</div>
      <div className="calendardaybottom">
        <LazyImage width={40} src={imageUrl} />
      </div>
    </div>
  )
}

function CheckinCenter() {
  const [month, setMonth] = useState(dayjs())
  const { setNewTodayIfSign } = useCheckinStore()
  const [todayIfSign, setTodayIfSign] = useState(false)
  const [signRemind, setSignRemind] = useState(false)
  const [isloding, setIsloding] = useState<boolean>(false) // loading
  const [signInfoList, setSignInfoList] = useState<YapiGetV1ImSignInGetUserSignInfoListSignInfoListNewData[]>([])
  const [goldCount, setGoldCount] = useState(0)
  const [signIn, setSignIn] = useState({})
  const [visible, setVisible] = useState(false)
  const pointsRecordRef = useRef<PointsRecordRef>(null)

  // 获取天数
  const days = useMemo(() => {
    const dayData = getDaysOfMonth(month.year(), month.month() + 1)
    const yesterday = dayjs().subtract(1, 'day').endOf('day').valueOf()
    if (!signInfoList.length && !dayData.length) return []

    const updatedDayData = dayData.map(val => {
      const matchingSignInfo = signInfoList.find(item => item.signTime === val?.daynumber)
      if (matchingSignInfo) {
        val.ifSign = matchingSignInfo.ifSign
          ? SignEnum.SIGNED_IN
          : Number(matchingSignInfo.signTimestamp) > yesterday
          ? SignEnum.NO_SIGNED_IN
          : SignEnum.SIGNED_IN_OVER
      }
      return val
    })
    return updatedDayData
  }, [month, signInfoList])

  // 切换月份
  const onMonthSwitch = action => {
    setMonth(month => {
      return month.add(action, 'month')
    })
  }

  // 设置签到提醒
  const onChangeSwitch = (value: boolean) => {
    setSignRemind(value)
    postV1ImChatImBlockListQueryList({ signRemind: value ? signRemindEnum.OPEN : signRemindEnum.CLOSE }).then(res => {
      if (res.isOk && res.data?.success) {
        if (!value) {
          Message.warning(t`features_checkin_center_index_9ibxoatkan`)
        }
      }
    })
  }

  // 获取签到信息
  const getUserSignInfo = () => {
    const timeData = {
      startTimestamp: `${dayjs(month).startOf('month').valueOf()}`,
      endTimestamp: `${dayjs(month).endOf('month').valueOf()}`,
    }
    getV1ImSignInGetUserSignInfoApiRequest(timeData).then(res => {
      if (res.isOk && res.data) {
        setTodayIfSign(res.data?.todayIfSign || false)
        setSignInfoList(res.data?.signInfoList || [])
        setSignRemind(res.data?.signRemind || false)
        setGoldCount(res.data?.goldCount || 0)
      }
    })
  }

  // 立即签到
  const handleSignIn = () => {
    if (todayIfSign) return
    setIsloding(true)
    postV1ImSignInSignInApiRequest({}).then(res => {
      if (res.isOk && res.data?.success) {
        setIsloding(false)
        setSignIn(res.data)
        setVisible(true)
        setNewTodayIfSign(true)
        if (pointsRecordRef.current) {
          pointsRecordRef.current.fetchData(1) // 调用子组件中的 fetchData 方法
        }
      }
    })
  }

  // 成功签到确认
  const signCommit = () => {
    setVisible(false)
    getUserSignInfo()
  }

  useEffect(() => {
    getUserSignInfo()
  }, [month])

  return (
    <div className={Styles.scoped}>
      <div className="headbg"> </div>
      <div className="headbox flex">
        <Link href="/">
          <Icon name="a-Notselected" fontSize={24} className="backicon" />
        </Link>
        <span className="ml-6">{t`features_checkin_center_index_2lwin2z8h7`}</span>
      </div>
      <div className="content flex">
        <div className="calendar">
          <div className="flex remindbox">
            <span className="remindlabel">{t`features_checkin_center_index_lumolgble_`}</span>
            <div className="remindicon flex">
              <span className="remindtxt">{t`features_checkin_center_index_ss9tkloz1i`}</span>
              <Switch onChange={onChangeSwitch} checked={signRemind} />
            </div>
          </div>
          {/* 日历 S */}
          <div className="calendarbox">
            <div className="calendar-month">
              <CalendarMonthSwitch onMonthSwitch={onMonthSwitch} direction={MONTH_SWITCH_PREV} />
              <div className="monthtime">{month.format('YYYY.MM')}</div>
              <CalendarMonthSwitch onMonthSwitch={onMonthSwitch} direction={MONTH_SWITCH_NEXT} />
            </div>
            <div className="calendar-title">
              {weekTitles.map((title, index) => (
                <div className="calendar-week" key={index}>
                  {title}
                </div>
              ))}
            </div>
            <div className="calendar-content">
              {days.map((day, index) => (
                <CalendarDay day={day} key={index} />
              ))}
            </div>
          </div>
          {/* 日历 E */}
          <Button loading={isloding} className={`signinnow ${todayIfSign ? 'already' : ''}`} onClick={handleSignIn}>
            <span>
              {todayIfSign ? t`features_checkin_center_index_gghgnr1b5w` : t`features_checkin_center_index_df2sqpdwvv`}
            </span>
          </Button>
        </div>
        <PointsRecord goldCount={goldCount} ref={pointsRecordRef} />
      </div>
      <SignSuccess visible={visible} onCommit={signCommit} signInData={signIn} />
    </div>
  )
}

export default CheckinCenter
