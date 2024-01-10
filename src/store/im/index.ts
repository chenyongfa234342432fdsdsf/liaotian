import { create } from 'zustand'
import { createTrackedSelector } from 'react-tracked'
import produce from 'immer'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { IIMConversation, IIMFileMessage, IIMMessage, IIMUserInfo } from '@/plugins/im/types'
import { cloneDeep, unionBy } from 'lodash'
import { sortConversations } from '@/helper/conversation'
import { ignoreMessage, sortMessages } from '@/helper/message'
import { getRevokedMessageIdsFromCache, setRevokedMessageIdsToCache } from '@/helper/cache/im'
import { YapiGetV1ImChatGroupHasOngoingCallData } from '@/typings/yapi/ImChatGroupHasOngoingCallV1GetApi'
import { getV1ImChatGroupHasOngoingCallApiRequest } from '@/apis/audio-video'
import { AudioAndVideoStoreRef } from '@/features/audio-and-video/audio-video-type'

// 主页 store，主要用于布局
type IImStore = ReturnType<typeof getStore>

type IUpdateMessagesByConversationType = 'push' | 'replace' | 'unshift' | 'update' | 'delete'

function getStore(set, get) {
  return {
    imUserInfo: {
      userID: '',
    } as IIMUserInfo,
    setImUserInfo: (data: IIMUserInfo) => {
      set(
        produce((draft: IImStore) => {
          draft.imUserInfo = data
        })
      )
    },
    /** 会话列表 */
    conversations: [] as IIMConversation[],
    /** 更新会话 */
    updateConversations: (data: IIMConversation[], type: IUpdateMessagesByConversationType) => {
      set(
        produce((draft: IImStore) => {
          switch (type) {
            case 'push':
              draft.conversations.push(...data)
              break
            case 'unshift':
              draft.conversations.unshift(...data)
              break
            case 'replace':
              draft.conversations = data
              break
            case 'update':
              data.forEach(item => {
                item = {
                  ...item,
                }
                const index = draft.conversations.findIndex(
                  conversation => conversation.conversationID === item.conversationID
                )
                if (index > -1) {
                  draft.conversations.splice(index, 1, item)
                } else {
                  // 会话新增就推到最前面
                  draft.conversations.unshift(item)
                }
              })
              break
            case 'delete':
              data.forEach(item => {
                const index = draft.conversations.findIndex(
                  conversation => conversation.conversationID === item.conversationID
                )
                if (index > -1) {
                  draft.conversations.splice(index, 1)
                }
              })
              break
            default:
              break
          }
          draft.conversations = sortConversations(unionBy(draft.conversations, item => item.conversationID))
          // 没有了就删除，有就更新
          if (draft.currentConversation) {
            const newConversation = draft.conversations.find(
              conversation => conversation.conversationID === draft.currentConversation!.conversationID
            )
            if (newConversation) {
              draft.currentConversation = newConversation
            } else {
              draft.currentConversation = undefined
            }
          }
        })
      )
    },
    /** im 登录状态，成功登录过一次就算登录，除非用户退出账号或者刷新页面 */
    imIsLogin: false,
    setImIsLogin: (isLogin: boolean) =>
      set(
        produce((draft: IImStore) => {
          draft.imIsLogin = isLogin
        })
      ),
    /** im 是否在线，通过心跳判断的 */
    imIsOnline: false,
    setImIsOnline: (isOnline: boolean) =>
      set(
        produce((draft: IImStore) => {
          draft.imIsOnline = isOnline
        })
      ),
    currentConversation: undefined as IIMConversation | undefined,
    setCurrentConversation: (conversation: IIMConversation | undefined) =>
      set(
        produce((draft: IImStore) => {
          draft.currentConversation = conversation
        })
      ),
    messagesByConversation: [] as {
      conversationId: string
      messages: IIMMessage[]
    }[],
    updateMessagesByConversation: (
      conversationId: string,
      oldMessages: IIMMessage[],
      type: IUpdateMessagesByConversationType
    ) =>
      set(
        produce((draft: IImStore) => {
          // 要克隆是因为避免 sdk 直接更新原来的数据导致时间戳不准
          const messages = cloneDeep(oldMessages).filter(message => !ignoreMessage(message))
          let target = draft.messagesByConversation.find(item => item.conversationId === conversationId)
          // 聊天太多时删掉旧的，以免内存爆炸
          if (draft.messagesByConversation.length > 100) {
            draft.messagesByConversation.splice(0, 1)
          }
          if (!target) {
            target = {
              conversationId,
              messages: [],
            }
            draft.messagesByConversation.push(target)
          }
          switch (type) {
            case 'push':
              target.messages.push(...messages)
              break
            case 'unshift':
              target.messages.unshift(...messages)
              break
            case 'replace':
              target.messages = messages
              break
            case 'update':
              messages.forEach((item, oldIndex) => {
                // 不加这个更新消息的时候不会触发重新渲染
                item = {
                  ...item,
                }
                function findIndex() {
                  return target!.messages.findIndex(
                    message =>
                      message.messageID === item.messageID ||
                      (message.localMessageID !== '0' && message.localMessageID === item.localMessageID)
                  )
                }
                const index = findIndex()
                // TODO: 之前会偶发消息重复的情况，但是无法复现，后面复现了在这里优化
                const targetMessage = target!.messages[index]
                if (index > -1) {
                  target!.messages.splice(index, 1, {
                    ...item,
                    // 本地文件取第一次时的
                    fileLocalPath: (target!.messages[index] as IIMFileMessage).fileLocalPath,
                  } as IIMFileMessage)
                } else {
                  target!.messages.push(item)
                }
              })
              break
            case 'delete':
              messages.forEach(item => {
                const index = target!.messages.findIndex(message => message.messageID === item.messageID)
                if (index > -1) {
                  target!.messages.splice(index, 1)
                }
              })
              break
            default:
              break
          }
          target.messages = unionBy(sortMessages(target.messages), item => item.messageID)
        })
      ),
    clearAllMessagesByConversation: () => {
      set(
        produce((draft: IImStore) => {
          draft.messagesByConversation = []
        })
      )
    },
    // 已撤回的消息消息 id，用来做撤回的过度方案，需要用到的地方有：会话消息、消息搜索、消息列表
    // 为了优化展示，这里做一个缓存
    revokedMessageIds: getRevokedMessageIdsFromCache(),
    setRevokedMessageIds: (conversationId: string, messageIds: string[]) =>
      set(
        produce((draft: IImStore) => {
          draft.revokedMessageIds[conversationId] = unionBy(
            (draft.revokedMessageIds[conversationId] || []).concat(messageIds).slice(),
            item => item
          )
          setRevokedMessageIdsToCache(draft.revokedMessageIds)
        })
      ),
    roomAudioVideoDetail: {} as YapiGetV1ImChatGroupHasOngoingCallData,
    async setRoomAudioVideoDetail(conversationId: string) {
      const { isOk, data } = await getV1ImChatGroupHasOngoingCallApiRequest({
        groupId: conversationId as string,
      })
      if (isOk) {
        set(
          produce((draft: IImStore) => {
            draft.roomAudioVideoDetail = { ...data } as YapiGetV1ImChatGroupHasOngoingCallData
          })
        )
      }
    },
    audioVideoHooksObj: {} as AudioAndVideoStoreRef,
    setAudioVideoHooksObj: audioVideoHooks =>
      set(
        produce((draft: IImStore) => {
          draft.audioVideoHooksObj = { ...audioVideoHooks }
        })
      ),
  }
}
const baseImStore = create(subscribeWithSelector(devtools(getStore, { name: 'im-store' })))

const useImStore = createTrackedSelector(baseImStore)

export { useImStore, baseImStore }
