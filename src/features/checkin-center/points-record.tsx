import React, { useState, useEffect, useImperativeHandle, forwardRef, Ref } from 'react'
import { Modal, List, Spin } from '@nbit/arco'
import { t } from '@lingui/macro'
import dayjs from 'dayjs'
import ListEmpty from '@/components/list-empty'
import {
  YapiGetV1ImSignInGetSignListData,
  YapiGetV1ImSignInGetSignListApiRequest,
} from '@/typings/yapi/ImSignInGetSignListV1GetApi'
import { getV1ImSignInGetSignListApiRequest } from '@/apis/checkin-center'
import { PAGE_SIZE, PAGE_NUM } from '@/constants/checkin'
import Styles from './points-record.module.css'

interface PointsRecordProps {
  goldCount: number
}

export interface PointsRecordRef {
  fetchData: (currentPage: number) => void
}

function PointsRecord({ goldCount }: PointsRecordProps, ref) {
  const [pointData, setPointData] = useState<YapiGetV1ImSignInGetSignListData[]>([])
  const [scrollLoading, setScrollLoading] = useState<JSX.Element | string>(<Spin loading />)

  const fetchData = currentPage => {
    const queryData: YapiGetV1ImSignInGetSignListApiRequest = {
      pageNum: currentPage,
      pageSize: `${PAGE_SIZE}`,
    }
    getV1ImSignInGetSignListApiRequest(queryData).then(res => {
      if (res.isOk && res.data) {
        setScrollLoading('')
        const listData = res.data.list as YapiGetV1ImSignInGetSignListData[]
        if (listData.length < PAGE_SIZE && pointData.length > PAGE_SIZE) {
          setScrollLoading(t`features_checkin_center_points_record_9zzgu4ntzv`)
        }
        if (currentPage === PAGE_NUM) {
          setPointData(listData)
          return
        }
        setPointData(pointData => pointData.concat(...listData))
      }
    })
  }

  useImperativeHandle(ref, () => ({
    fetchData,
  }))

  useEffect(() => {
    fetchData(PAGE_NUM)
  }, [])

  return (
    <div className={Styles.points}>
      <div className="pointstop flex">
        <span className="pointstopleft">{t`features_checkin_center_points_record_4r06bwmy6b`}</span>
        <div className="pointstopright">
          <span className="mypointlabel">{t`features_checkin_center_points_record_hfgphjtal2`}</span>
          <span className="mynum">{goldCount}</span>
        </div>
      </div>

      <div className="pointslist">
        <List
          className="point-list-box"
          scrollLoading={scrollLoading}
          onReachBottom={currentPage => fetchData(currentPage)}
          dataSource={pointData}
          noDataElement={<ListEmpty />}
          render={(item, index) => (
            <List.Item key={index}>
              <div className="pointitem">
                <div className="pointitemleft">
                  <span className="remark">{item.remark}</span>
                  <span className="time">{dayjs(item.signTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
                <div className="pointitemright">+{item.signAward}</div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
export default forwardRef<PointsRecordRef, PointsRecordProps>(PointsRecord)
