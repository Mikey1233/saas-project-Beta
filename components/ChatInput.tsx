"use client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z  from "zod";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { User, limitedMessageRef, messagesRef } from "@/lib/converters/Message";
import { addDoc, getDocs } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
const formSchema = z.object({
  input: z.string().max(1000),
});

function ChatInput({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const inputCopy = values.input.trim()
    form.reset();

    if (inputCopy.length === 0) {
      return;
    }
    if (!session?.user) {
      return;
    }
    ////////////////////
    const messages = (await getDocs(limitedMessageRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro =
      subscription?.role === "pro" && subscription?.status === "active";
    ////////////
    if (!isPro && messages >= 20) {
      toast({
        title: "free plan limit exceeded",
        description:
          "You've exceeded the free plan limit of 20 messages per chat.Upgrade to PRO for unlimited chat messages!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
      return;
    }
    //check if user is pro ,and limit creating new chat
    const userId = session.user.id as string;
    const userToStore: User = {
      id: userId!,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };
    addDoc(messagesRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToStore,
    });

  }
  return (
    <div className="sticky bottom-0 z-50 bg-white dark:bg-gray-900">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in ANY language..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-violet-600 text-white">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ChatInput;
