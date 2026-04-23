'use client';

import type React from 'react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    await onSendMessage(inputText);
    setInputText("");
  };

  const placeholderMessage = "How can I help you today?";

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 border-t">
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={placeholderMessage}
        disabled={isLoading}
        className="flex-grow"
        aria-label="Chat message input"
      />
      <Button type="submit" disabled={isLoading || !inputText.trim()} size="icon" aria-label="Send message">
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
      </Button>
    </form>
  );
}
