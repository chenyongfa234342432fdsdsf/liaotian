import { defineConfig } from 'nbit-ytt'
import path from 'path'

import { getName, deleteFilesSync } from './utils'

const targetFolder = path.resolve('src/typings/yapi')

// 删除本地所有文件 yapi 目录下的文件，和后端完全同步。默认不删除以免影响其他人的代码
deleteFilesSync(targetFolder)

console.log('输出路径：', targetFolder)

export default defineConfig([
  {
    serverUrl: 'https://yapi.nbttfc365.com/',
    typesOnly: true,
    target: 'typescript',
    reactHooks: {
      enabled: false,
    },
    outputFilePath: interfaceInfo => `${targetFolder}/${getName(interfaceInfo)}.d.ts`,
    dataKey: [],
    projects: [
      {
        // chainstar
        // https://yapi.admin-devops.com/project/44/setting
        token: 'ffbf48ef96e3948e9ba25c980c130c6bd489d84108b18959c8e95b56f7b53d0d',
        categories: [
          {
            id: 0,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              // return changeCase.camelCase(interfaceInfo.path)

              // 若生成的请求函数名存在语法关键词报错、或想通过某个关键词触发 IDE 自动引入提示，可考虑加前缀，如：
              return changeCase.camelCase(`Yapi_${interfaceInfo.method}_${interfaceInfo.path}_api`)

              // 若生成的请求函数名有重复报错，可考虑将接口请求方式纳入生成条件，如：
              // return changeCase.camelCase(`${interfaceInfo.method}_${interfaceInfo.path}`)
            },
          },
        ],
      },
    ],
  },
])
