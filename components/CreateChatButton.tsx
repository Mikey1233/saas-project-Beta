"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import {  MessageSquarePlusIcon } from "lucide-react"
function CreateChatButton() {
    const router = useRouter()
    const createNewChat = async ()=>{
        //logic goes here
        router.push(`/chat/${'abc'}`)

        // router.path()
    }
  return (
    <Button variant={'ghost'}><MessageSquarePlusIcon/></Button>
  )
}

export default CreateChatButton