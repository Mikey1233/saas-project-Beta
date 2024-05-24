"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSubscription } from "@/store/store";
import LoadingSpinner from "./LoadingSpinner";
import { StarIcon } from "lucide-react";
import ManageAccountButton from "./ManageAccountButton";

export function UserButton({session}: {session : Session | null}) {
  //subcription listener...
  const subscription = useSubscription((state)=> state.subscription)
  // Session...
if (!session) {
  return (
    <Button variant={'outline'} onClick={()=> signIn()}>Sign in</Button>
  )
}
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={session.user?.name}
          // image="https://github.com/shadcn.png"
          image={session.user?.image}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          subscription === undefined && (
            <DropdownMenuItem>
              <LoadingSpinner/>
            </DropdownMenuItem>
          )
        }
        {
          subscription?.role === 'pro' && (
            <>
            <DropdownMenuLabel className="text-xs flex items-center text-center justify-center space-x-1 text-[#e935c1]">
              <StarIcon fill="#e93fc1"/>
              <p>PRO</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              {/* Manage */}
              <ManageAccountButton/> 
            </DropdownMenuItem>
            </>
          )
        }
        <DropdownMenuItem onClick={()=> signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}