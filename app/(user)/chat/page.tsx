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

      {/* chatlist */}
      <ChatList/>
    </div>
  )
}

export default ChatPage
