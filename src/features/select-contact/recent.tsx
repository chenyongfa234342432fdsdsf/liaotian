import { useImStore } from '@/store/im'
import { ContactItem, IChildProps, renderContactItems } from './base'

export function Recent({ selectedContacts, onChange }: IChildProps) {
  const { conversations } = useImStore()
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
