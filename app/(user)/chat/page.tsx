import ChatList from '@/components/ChatList';
import React from 'react'

type props = {
  params : {};
  searchParams : {
    error : string
  }
}
function ChatPage({searchParams : {error}}: props) {
  return (
    <div>
      {/* chat permission */}
  <h2>Chats </h2>
      {/* chatlist */}
      <ChatList/>
    </div>
  )
}

export default ChatPage
