import { create } from 'zustand'
import { createTrackedSelector } from 'react-tracked'
import produce from 'immer'
import { devtools } from 'zustand/middleware'

type TLayoutStore = ReturnType<typeof getStore>

function getStore(set) {
  return {
    layoutProps: {} as any | undefined,
    setLayoutProps: (layoutProps?: any | undefined) =>
      set(() => {
        if (layoutProps) {
          return { layoutProps }
        }
        return {}
      }),
    columnsDataByCd: {} as Record<string, any>,
    setColumnsDataByCd: data =>
      set(
        produce((draft: TLayoutStore) => {
          draft.columnsDataByCd = data
        })
      ),
  }
}
const baseLayoutStore = create(devtools(getStore, { name: 'layout-store' }))

const useLayoutStore = createTrackedSelector(baseLayoutStore)

export { useLayoutStore, baseLayoutStore }
