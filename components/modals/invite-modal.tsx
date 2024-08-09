"use client";
import axios from "axios";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export const InviteModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";

  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden rounded-lg">
        <DialogHeader className="pt-5 px-6 text-2xl font-bold">
          Invite Friends !
        </DialogHeader>
        <div className="px-5 py-2">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black/[.9] font-bold"
              value={inviteUrl}
              disabled={isLoading}
            />
            <Button
              size="icon"
              className="dark:text-white bg-indigo-500 hover:bg-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400 px-2"
              onClick={onCopy}
              disabled={isLoading}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4 " />
              )}
            </Button>
          </div>
          <div className="text-xs mt-1 text-neutral-500 font-bold flex items-baseline gap-1">
            Your invite link expires in 7 days.
            <Button
              variant="link"
              size="sm"
              className="text-xs font-bold p-0 text-indigo-500"
              disabled={isLoading}
              onClick={onNew}
            >
              Generate new link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
