import React from 'react'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { ConfigProvider } from '@nbit/arco'
import zhCN from '@nbit/arco/lib/locale/zh-CN'
import zhHK from '@nbit/arco/lib/locale/zh-HK'
import enUS from '@nbit/arco/lib/locale/en-US'
import { I18nsEnum } from '@/constants/i18n'
import { PageContextProvider } from '@/hooks/use-page-context'
import ErrorBoundary from '@/components/error-boundary'
import type { ComponentConfig } from '@nbit/arco/es/ConfigProvider/interface'
import LoadingElement from '@/components/loading-element'
import ListEmpty from '@/components/list-empty'
import { configResponsive, useMount } from 'ahooks'
import { MessengerLayout } from '@/features/messenger/messenger-layout'
import { oss_domain_address } from '@/constants/oss'
import { baseCommonStore, useCommonStore } from '@/store/common'

export default Layout

const arcoComponentConfig: ComponentConfig = {
  Spin: {
    element: <LoadingElement />,
  },
  Table: {
    noDataElement: <ListEmpty />,
  },
}
function Layout({ pageContext, children }: { pageContext: PageContext; children: React.ReactNode }) {
  const isFullScreen = pageContext.layoutParams?.fullScreen

  const { locale } = baseCommonStore.getState()

  configResponsive({
    lg: 1200,
    xl: 1440,
    xxl: 1850,
    xxxl: 2560,
  })
  function getLocale(localeVal?: string) {
    switch (localeVal) {
      case I18nsEnum['zh-CN']:
        return zhCN

      case I18nsEnum['en-US']:
        return enUS

      case I18nsEnum['zh-HK']:
        return zhHK

      default:
        return zhCN
    }
  }
  const { setGlobalAudioRefs, setGlobalVoiceAndVideoRef } = useCommonStore()
  const notificationAudioRef = React.useRef<HTMLAudioElement>(null)
  const voiceAndVideoRef = React.useRef<HTMLAudioElement>(null)
  const [mounted, setMounted] = React.useState(false)
  const [voiceAndVideoMounted, setVoiceAndVideoMounted] = React.useState(false)
  useMount(() => {
    setMounted(true)
    setVoiceAndVideoMounted(true)
    setGlobalAudioRefs('message', notificationAudioRef)
    setGlobalVoiceAndVideoRef(voiceAndVideoRef)
  })

  return (
    <PageContextProvider pageContext={pageContext}>
      <I18nProvider i18n={i18n}>
        <ConfigProvider componentConfig={arcoComponentConfig} locale={getLocale(locale)}>
          <div id="layout" className={isFullScreen ? 'layout-fullscreen-wrap' : 'layout-wrap'}>
            <ErrorBoundary>
              {isFullScreen && children}
              {!isFullScreen && <MessengerLayout>{children}</MessengerLayout>}
            </ErrorBoundary>
            {mounted && (
              <audio
                preload="auto"
                ref={notificationAudioRef}
                src={`${oss_domain_address}/audio/message-notification.mp3`}
              />
            )}
            {voiceAndVideoMounted && (
              <audio
                preload="auto"
                ref={voiceAndVideoRef}
                src={`${oss_domain_address}/audio/incoming_call_ring.mp3`}
                loop
              />
            )}
          </div>
        </ConfigProvider>
      </I18nProvider>
    </PageContextProvider>
  )
}
