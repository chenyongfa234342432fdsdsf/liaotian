import { isChainstar } from '@/helper/env'

// chainstar business user
export const chainstarBConfig = {
  iconfontFile: 'iconfont_2023_12_14_17_40.js',
  ossFolder: '/im-web',
}

// monkey business user
export const monkeyBConfig = {
  iconfontFile: 'iconfont_2023_12_19_15_43.js',
  ossFolder: '/im-web',
}

// fusion mode
export const fusionModeBConfig = {
  iconfontFile: 'iconfont_merge_mode_2023_09_20_19_06.js',
}

export const getBConfig = () => {
  return monkeyBConfig
}
