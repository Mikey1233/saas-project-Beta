import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import ChatInput from "@/components/ChatInput";
import { getDocs } from "firebase/firestore";
import { sortedMessagesRef } from "@/lib/converters/Message";
import ChatMessages from "@/components/ChatMessages";
import ChatMemberShipBadge from "@/components/ChatMemberShipBadge";
import AdminControls from "@/components/AdminControls";

type Props = {
  params: {
    chatId: string;
  };
};
async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);
  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );
  return (
    <>
      {/* admin controls */}
      <AdminControls chatId={chatId}/>
      {/* chat membersBadge */}
      <ChatMemberShipBadge chatId={chatId}/>
      {/* chat Messages */}
      <div className=" flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      <ChatInput chatId={chatId} />
    </>
  );
}

export default ChatPage;
