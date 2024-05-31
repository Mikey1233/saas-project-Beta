"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSubscription } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef } from "@/lib/converters/ChatMembers";
import LoadingSpinner from "./LoadingSpinner";
// import  {useRouter as Cur} from "next/router"

// const {v4 : uuid} = require('uuid')
function CreateChatButton({isLarge} : {isLarge? :boolean}) {
  const router = useRouter();
  
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscription((state) => state.subscription);
  const createNewChat = async () => {
    if (!session?.user.id) return;
    //logic goes here
    setLoading(true);
    toast({
      title: "Creating new chat...",
      description: "Hold tight while we create a new chat...",
      duration: 3000,
    });
    //checks for pro user and set limits then creating a new chat

    //........
    const chatId = uuidv4();
    const userId = session.user.id as string;
    await setDoc(addChatRef(chatId, userId), {
      userId: userId!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been created",
          className: "bg-green text-white",
        });
        router.push(`chat/${chatId}`);
      })
      .catch((err) => {
        console.log(err)
        toast({
          title: "Error",
          description: "There was an error creating your chat",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (isLarge){
    return(
      <div>
        <Button variant={'default'} onClick={createNewChat}>
          {loading? <LoadingSpinner/> : "create a New Chat"}
        </Button>
      </div>
    )
  }
  return (
    <Button variant={"ghost"} onClick={createNewChat}>
      <MessageSquarePlusIcon />
    </Button>
  );
}

export default CreateChatButton;
