// https://vitejs.dev/config/
import { defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import legacy from '@vitejs/plugin-legacy'
import ssr from 'vike/plugin'
import macrosPlugin from 'vite-plugin-babel-macros'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { visualizer } from 'rollup-plugin-visualizer'
import { vitePlugins } from '@nbit/utils'
import { fileURLToPath, URL } from 'url'
import { cjsInterop } from 'vite-plugin-cjs-interop'
import { injectEnvConfig } from './build'

export default async ({ mode }) => {
  //  这个是用来判断是否为商家版的 bid
  process.env.VITE_MARKCOIN_BUSINESS_ID = process.env.VITE_MARKCOIN_BUSINESS_ID || '1'
  // 这个是代码中真实请求的 bid 测试环境写死 为 1
  const id = mode === 'test' ? '1' : process.env.VITE_MARKCOIN_BUSINESS_ID
  process.env.VITE_MARKCOIN_BUSINESS_ID_CURRENT = id
  const env = loadEnv(mode, process.cwd())
  const { VITE_PORT, VITE_NEWBIT_ENV } = env
  await injectEnvConfig(env, mode, id)
  const isDevelopment = mode === 'development'
  const enabledSentry = false && ['test', 'production'].includes(VITE_NEWBIT_ENV || '')
  const enabledSourceMap = false && ['dev', 'test'].includes(VITE_NEWBIT_ENV || '')
  return defineConfig({
    resolve: {
      alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    },
    clearScreen: false,
    server: {
      strictPort: true,
      port: Number(VITE_PORT),
      host: true,
    },
    envPrefix: [
      'VITE_',
      'TAURI_PLATFORM',
      'TAURI_ARCH',
      'TAURI_FAMILY',
      'TAURI_PLATFORM_VERSION',
      'TAURI_PLATFORM_TYPE',
      'TAURI_DEBUG',
    ],
    plugins: [
      cjsInterop({
        // List of CJS dependencies that require interop
        dependencies: ['@nbit/arco', '@nbit/arco/**', 'react-lazy-load-image-component'],
      }),
      isDevelopment ? vitePlugins.cssModuleHMR() : null,
      enabledSentry
        ? sentryVitePlugin({
            org: 'newbit',
            project: 'im-chat-web',
            include: './dist',
            authToken: 'd247ef4d9ba344fab67085856a6b5cdca83c24ff42f34a3eb2ab6b0cbd0eebde',
          })
        : null,
      macrosPlugin(),
      legacy({
        renderLegacyChunks: false,
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      react({
        babel: {
          plugins: ['macros'],
        },
      }),
      createStyleImportPlugin({
        libs: [
          {
            libraryNameChangeCase: 'pascalCase',
            libraryName: '@nbit/arco',
            esModule: true,
            resolveStyle: name => {
              return `@nbit/arco/es/${name}/style/css.js`
            },
          },
        ],
      }),
      ssr({ prerender: true }),
      // visualizer(),
    ],
    build: {
      outDir: './dist',
      sourcemap: enabledSourceMap,
      // Tauri uses Chromium on Windows and WebKit on macOS and Linux
      target: process.env.TAURI_PLATFORM
        ? process.env.TAURI_PLATFORM === 'windows'
          ? 'chrome105'
          : 'safari13'
        : ['es2018'],
      minify: true,
    },
    css: {
      modules: {
        generateScopedName: '[folder]-[name]__[local]--[hash:base64:3]',
        scopeBehaviour: 'global',
      },
    },
  } as UserConfig)
}
