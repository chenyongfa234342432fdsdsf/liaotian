import ApplyToJoinAudioVideo from '@/features/audio-and-video/apply-to-join-audio-video'
import { ChatHeader } from './chat-header'
import { ChatInput } from './input/chat-input'
import { ChatMessages } from './chat-messages'

import ChatAnnouncement from './chat-announcement'

export function ChatWindow() {
  return (
    <div className="h-full flex flex-col">
      <ChatHeader />
      <div className="flex-1 h-0 flex flex-col relative">
        <ApplyToJoinAudioVideo />
        <ChatAnnouncement />
        <ChatMessages />
      </div>
      <ChatInput />
    </div>
  )
}
