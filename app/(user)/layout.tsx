import React from "react";

function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 w-full flex-col max-w-6xl mx-auto">{children}</div>
  );
}

export default ChatLayout;
