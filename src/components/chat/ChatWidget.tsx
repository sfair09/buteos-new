'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { MessageCircle, X } from "lucide-react";
import { ChatInterface } from "./ChatInterface";
import { ButeoBotLogo } from "@/components/ButeoBotLogo";

export function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background z-50 transition-all duration-200 hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 h-[calc(100vh-env(safe-area-inset-top)-env(safe-area-inset-bottom))] sm:h-[75vh] w-full sm:max-w-md p-0 m-0 sm:rounded-lg shadow-xl flex flex-col bg-card text-card-foreground border border-border data-[state=open]:slide-in-from-bottom-full sm:data-[state=open]:slide-in-from-right-1/2"
        onPointerDownOutside={(e) => e.preventDefault()} // Prevents closing when clicking inside MessageList scroll
        onInteractOutside={(e) => e.preventDefault()} // Prevents closing on mobile drag outside
        hideCloseButton // We'll use our custom close button in header
      >
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-border bg-card">
          <DialogTitle className="text-lg font-semibold">
            <ButeoBotLogo size={24} textClassName="text-xl" />
          </DialogTitle>
          <DialogClose asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-muted hover:text-muted-foreground"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close chat</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex-grow overflow-hidden bg-card">
          <ChatInterface />
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Add this to your DialogContent component if not already there or extend it
declare module "@radix-ui/react-dialog" {
  interface DialogContentProps {
    hideCloseButton?: boolean;
  }
}
