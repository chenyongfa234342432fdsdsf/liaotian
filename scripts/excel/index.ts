import fs from 'fs'
import xlsx from 'xlsx'
import { getZhCNJson } from 'scripts/i18n-update/utils'

const json = getZhCNJson()
const sheetName = 'Web' // 工作表名称
const header = ['key', 'cn'] // 表头
const data = Object.entries(json) // 将 JSON 转换为二维数组

const workSheet = xlsx.utils.aoa_to_sheet([header, ...data])
const workBook = xlsx.utils.book_new()
xlsx.utils.book_append_sheet(workBook, workSheet, sheetName)

const excelData = xlsx.write(workBook, { bookType: 'xlsx', type: 'buffer' })
fs.writeFileSync(`dist/i18n.xlsx`, excelData)
