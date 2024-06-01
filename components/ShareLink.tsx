import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { Dispatch, SetStateAction } from "react";

function ShareLink({
  isOpen,
  ChatId,
  setIsOpen,
}: {
  isOpen: boolean;
  ChatId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const host = window.location.host;

  const linkToChat =
    process.env.NODE_ENV === "development"
      ? `http://${host}/chat/${ChatId}`
      : `https://${host}/chat/${ChatId}`;
  async function copyToClipBoard() {
    try {
      await navigator.clipboard.writeText(linkToChat);
      console.log("text copied!!!");

      toast({
        title: "copied successfully",
        description:
          "Share this to the person you want to chat with !.(NOTE : they must added to the chat to access it)",
        className: "bg-green-600 text-white",
      });
    } catch (err) {
      console.error("failed to copy link", err);
    }
  }
  return (
    <Dialog
      onOpenChange={(open) => setIsOpen(open)}
      open={isOpen}
      defaultOpen={isOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Copy className="mr-2" />
          Share Link
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
          <DialogDescription>
            Any user who has been{" "}
            <span className="text-indigo-600 font-bold">granted access</span>{" "}
            can use this link
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={linkToChat} readOnly />
          </div>
          <Button
            type="submit"
            onClick={() => copyToClipBoard()}
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            Copy
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
}

export default ShareLink;


