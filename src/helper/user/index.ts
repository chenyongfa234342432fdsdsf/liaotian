import { t } from '@lingui/macro'
import { getBusinessName } from '@/helper/common'
import { UserIsBanEnum, UserModuleDescribeKeyEnum, UserOrderUnit } from '@/constants/user'
import { Message } from '@nbit/arco'
import { getV1ImChatImUserInfoQueryBanChatApiRequest } from '@/apis/settings-center'
import { baseUserStore } from '@/store/user'

export function getUserPageDefaultDescribeMeta(pageTitle: string, key: string) {
  const values = {
    businessName: getBusinessName(),
  }

  const getId = () => {
    switch (key) {
      case UserModuleDescribeKeyEnum.default:
        return `modules_assets_company_verified_material_index_page_server_efre42ngx6`
      case UserModuleDescribeKeyEnum.register:
        return `modules_user_register_index_page_ojyzttck8o`
      case UserModuleDescribeKeyEnum.agentCenter:
        return `helper_agent_index_gr1uz7jkp0`
      default:
        return ``
    }
  }

  return {
    title: pageTitle,
    description: t({
      id: getId(),
      values,
    }),
  }
}

export async function updateUserIsBanToStore() {
  const res = await getV1ImChatImUserInfoQueryBanChatApiRequest({})
  if (res.isOk) {
    baseUserStore.getState().setIsBan(res.data?.isBan === UserIsBanEnum.yes)
  }
}
