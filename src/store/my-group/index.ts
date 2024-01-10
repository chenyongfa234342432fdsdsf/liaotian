import { create } from 'zustand'
import { createTrackedSelector } from 'react-tracked'
import produce from 'immer'
import { devtools } from 'zustand/middleware'

type ImyGroup = ReturnType<typeof getStore>

function getStore(set, get) {
  return {
    joinWidth: 0,
    foundWidth: 0,
    setJoinWidth: number => {
      set(
        produce((draft: ImyGroup) => {
          draft.joinWidth = number
        })
      )
    },
    setFoundWidth: number => {
      set(
        produce((draft: ImyGroup) => {
          draft.foundWidth = number
        })
      )
    },
  }
}
const baseMyGroupStore = create(devtools(getStore, { name: 'my-group' }))

const useMyGroupStore = createTrackedSelector(baseMyGroupStore)

export { useMyGroupStore, baseMyGroupStore }
