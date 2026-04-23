'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import type { Message } from '@/types';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="h-full flex-grow p-4 bg-card" ref={scrollAreaRef} viewportRef={viewportRef}>
      <div className="space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && messages.length > 0 && messages[messages.length-1].sender === 'user' && (
          <div className="flex items-end space-x-2 mb-4 justify-start">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot size={18} />
              </AvatarFallback>
            </Avatar>
            <div className="p-3 rounded-lg shadow-md bg-muted/50 text-muted-foreground mr-auto">
              <div className="flex space-x-1 items-center">
                <span className="h-2 w-2 bg-primary/50 rounded-full animate-pulse delay-0"></span>
                <span className="h-2 w-2 bg-primary/50 rounded-full animate-pulse delay-200"></span>
                <span className="h-2 w-2 bg-primary/50 rounded-full animate-pulse delay-400"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
