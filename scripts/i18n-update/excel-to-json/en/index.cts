import { i18nSyncFromRemote } from 'scripts/i18n-update/excel-to-json'

const excelFileDir = 'scripts/i18n-update/excel-to-json'
const scriptDir = `${excelFileDir}/en`
const locali18nFile = `src/locales/en-US/messages.json`
const targeSheetName = 'IM-Web' // 工作表名称
const targeSheetLangColumnName = 'en' // 工作表名称

i18nSyncFromRemote({
  excelFileDir,
  scriptDir,
  locali18nFile,
  targeSheetName,
  targeSheetLangColumnName,
})
