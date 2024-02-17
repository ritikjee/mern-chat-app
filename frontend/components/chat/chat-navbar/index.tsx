"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/globals/mode-toggle";
import { Settings, Share, Share2 } from "lucide-react";
import ChatSetting from "../chat-setting";

function ChatNavbar({
  profilePic,
  name,
  roomId,
  userId,
}: {
  profilePic: string;
  name: string;
  roomId: string;
  userId: string;
}) {
  return (
    <div className="bg-primary-foreground shadow py-2 px-2 rounded flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={profilePic} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <h1 className="text-lg">{name}</h1>
      </div>
      <div className="flex gap-3">
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-primary-foreground"
        >
          <Share2 size={24} />
        </Button>
        <ChatSetting roomId={roomId} userId={userId} />
        <ModeToggle />
      </div>
    </div>
  );
}

export default ChatNavbar;
