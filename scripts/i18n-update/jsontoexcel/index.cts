import fs from 'fs'
import xlsx from 'xlsx'
import path from 'path'

const jsonStringZh = fs.readFileSync(path.join(__dirname, '../../../src/locales/zh-CN/messages.json'), 'utf-8')
const jsonStringEn = fs.readFileSync(path.join(__dirname, '../../../src/locales/en-US/messages.json'), 'utf-8')
const jsonZh = JSON.parse(jsonStringZh)
const jsonEn = JSON.parse(jsonStringEn)

const sheetName = 'Web' // 工作表名称
const header = ['key', 'cn', 'en'] // 表头
const data = Object.entries(jsonZh) // 将 JSON 转换为二维数组
data.forEach(item => {
  item.push(jsonEn[item[0]])
})
const workSheet = xlsx.utils.aoa_to_sheet([header, ...data])
const workBook = xlsx.utils.book_new()
xlsx.utils.book_append_sheet(workBook, workSheet, sheetName)

const excelData = xlsx.write(workBook, { bookType: 'xlsx', type: 'buffer' })

function writeToFile(filePath, data) {
  // 获取目标文件夹路径
  const directoryPath = path.dirname(filePath)

  // 确保目标文件夹存在
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true })
  }

  // 写入文件
  fs.writeFileSync(filePath, data)
}

writeToFile(`i18n.xlsx`, excelData)
