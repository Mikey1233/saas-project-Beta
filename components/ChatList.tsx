import { authOptions } from "@/auth";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import ChatRows from "./ChatRows";
async function ChatList() {
  const session = await getServerSession(authOptions);
  const user = session?.user.id as string
  const chatsSnapShot = await getDocs(
    chatMembersCollectionGroupRef(user)
  ); 

 const initialChats = chatsSnapShot.docs.map((doc)=>({
  ...doc.data(),
  timestamp : null
 }))
  // return <div>ChatList</div>;
  return <ChatRows initialChats = {initialChats}/>
}

export default ChatList;
