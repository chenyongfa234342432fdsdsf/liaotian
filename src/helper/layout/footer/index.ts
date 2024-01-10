import { YapiGetV1ImHomeColumnGetListColumnsDatasData } from '@/typings/yapi/ImHomeColumnGetListV1GetApi'

function recursiveColumnMap(columnsDatas: YapiGetV1ImHomeColumnGetListColumnsDatasData[]) {
  let mapped = {}

  function recursiveSearch(columns: YapiGetV1ImHomeColumnGetListColumnsDatasData[]) {
    if (!columns || columns.length === 0) return
    columns.forEach(col => {
      recursiveSearch(col.childColumns as unknown as YapiGetV1ImHomeColumnGetListColumnsDatasData[])
      if (col.homeColumnCd) mapped[col.homeColumnCd] = col
    })
  }

  recursiveSearch(columnsDatas)

  return mapped
}

export { recursiveColumnMap }
