import { useImStore } from '@/store/im'
import { friendToConversation } from '@/helper/conversation'
import { useAddressBookStore } from '@/store/address-book'
import { ContactItem, IChildProps, renderContactItems } from './base'

export function Friend({ selectedContacts, onChange }: IChildProps) {
  const friends = useAddressBookStore().addressBookList

  const conversations = friends.map(item => friendToConversation(item))

  return (
    <div>
      {renderContactItems({
        conversations,
        selectedContacts,
        onChange,
      })}
    </div>
  )
}
