import { useState } from 'react'
import { useMount, useUpdateEffect } from 'ahooks'
// import { MemberMemberAreaType } from '@/typings/user'
// import { getMemberIpArea } from '@/apis/user'
import { FormInstance } from '@nbit/arco'
import { TabOption } from './user-operate'

const useGetMemberArea = (form?: FormInstance, name?: string, selectedTab?: string) => {
  const [area, setArea] = useState<any>({
    codeVal: '',
    codeKey: '',
    remark: '',
  })

  const getAreaIp = async () => {
    // const res = await getMemberIpArea({})
    // if (res.isOk) {
    //   const { enCode, fullName, shortName } = res.data
    //   setArea({
    //     codeVal: enCode,
    //     codeKey: fullName,
    //     remark: shortName,
    //   })
    // }
  }

  useMount(() => {
    getAreaIp()
  })

  useUpdateEffect(() => {
    if (form && area?.codeVal && name && selectedTab === TabOption.Phone) {
      form?.setFieldsValue({ [name]: { areacode: area?.codeVal, areaName: area?.remark } })
    }
  }, [area, selectedTab, form])

  return { area }
}

export { useGetMemberArea }
