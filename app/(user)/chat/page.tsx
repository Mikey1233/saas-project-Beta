import ChatList from "@/components/ChatList";
import React from "react";
import ChatPermissionError from "@/components/ChatPermissionError";

type props = {
  params: {};
  searchParams: {
    error: string;
  };
};
{/* <div className="px-5 md:px-10 ">
  <ChatList />
</div>; */}
function ChatPage({ searchParams: { error } }: props) {
  return (
    <div>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}
      <ChatList/>
    </div>
  );
}

export default ChatPage;
