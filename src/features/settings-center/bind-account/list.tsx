import Icon from '@/components/icon'
import { map } from 'lodash'
import { t } from '@lingui/macro'
import { link } from '@/helper/link'
import { getAddAccountRoutePath, getAddBankCardRoutePath } from '@/constants/my-wallet'
import ListEmpty from '@/components/list-empty'

export function List({ thirdLists, bankLists }) {
  return (
    <ul className="flex-1 overflow-y-scroll">
      {!thirdLists.length && !bankLists.length ? (
        <ListEmpty />
      ) : (
        <>
          {map(thirdLists, i => (
            <li key={i.id} className="flex justify-between mb-2.5 bg-card_bg_color_03 px-6 py-4">
              <div className="flex flex-col">
                <div className="mb-2">{i.thirdNickName || t`features_settings_center_index_06mq_dgqgg`}</div>
                <span className="text-text_color_02 text-sm">UID {i.thirdUid}</span>
              </div>
              <Icon
                className="edit-icon"
                onClick={() => link(getAddAccountRoutePath(i.id, i.thirdUid))}
                fontSize={24}
                name="icon_register_edit"
              />
            </li>
          ))}
          {map(bankLists, i => (
            <li key={i.id} className="flex justify-between mb-2.5 bg-card_bg_color_03 px-6 py-4">
              <div className="flex flex-col">
                <div className="mb-2">{i.cardHolder || t`features_settings_center_index_06mq_dgqgg`}</div>
                <span className="text-text_color_02 text-sm">
                  {i.bankName} {i.cardNo?.slice(-4)}
                </span>
              </div>
              <Icon
                className="edit-icon"
                onClick={() => link(getAddBankCardRoutePath(i.id))}
                fontSize={24}
                name="icon_register_edit"
              />
            </li>
          ))}
        </>
      )}
    </ul>
  )
}
