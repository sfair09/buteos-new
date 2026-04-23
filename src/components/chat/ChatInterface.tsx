'use client';

import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageList } from "@/components/chat/MessageList";
import type { Message } from '@/types';
import { routeInquiry } from '@/ai/flows/inquiry-router-flow';
import type { RouteInquiryInput, RouteInquiryOutput } from '@/ai/flows/inquiry-router-flow';
import { useToast } from "@/hooks/use-toast";

// Conversation state management
interface ConversationState {
  isActive: boolean;
  startTime: Date | null;
  messageCount: number;
  lastActivity: Date | null;
  conversationId: string;
}

const CONVERSATION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const MIN_MESSAGES_FOR_SUMMARY = 3; // Minimum messages before sending summary

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [conversationState, setConversationState] = useState<ConversationState>({
    isActive: false,
    startTime: null,
    messageCount: 0,
    lastActivity: null,
    conversationId: '',
  });
  
  // For demonstration, let's assume we have user details.
  // In a real app, this would come from auth.
  const [userDetails, setUserDetails] = useState({ email: "user@example.com", name: "Demo User" });

  // Function to start a new conversation
  const startConversation = useCallback(() => {
    const conversationId = `conv-${Date.now()}`;
    setConversationState({
      isActive: true,
      startTime: new Date(),
      messageCount: 0,
      lastActivity: new Date(),
      conversationId,
    });
  }, []);

  // Function to end conversation and send summary
  const endConversation = useCallback(async (reason: 'timeout' | 'user_end' | 'error') => {
    if (!conversationState.isActive) return;

    const { messageCount, startTime, conversationId } = conversationState;
    
    // Only send summary if we have enough messages and a valid email
    if (messageCount >= MIN_MESSAGES_FOR_SUMMARY && userDetails.email && !userDetails.email.includes('example.com')) {
      try {
        // Import the email tool dynamically to avoid client-side bundling issues
        const { sendConversationSummaryTool } = await import('@/ai/tools/emailTool');
        
        const lastUserMessage = messages.filter(m => m.sender === 'user').pop();
        const lastBotMessage = messages.filter(m => m.sender === 'bot').pop();
        
        if (lastUserMessage && lastBotMessage) {
          await sendConversationSummaryTool({
            userInput: lastUserMessage.text,
            botResponse: lastBotMessage.text,
            userEmail: userDetails.email,
            userName: userDetails.name,
            conversationTopic: 'conversation_summary',
          });
          console.log('Conversation summary sent successfully');
        }
      } catch (error) {
        console.error('Failed to send conversation summary:', error);
      }
    }

    setConversationState(prev => ({
      ...prev,
      isActive: false,
    }));
  }, [conversationState, messages, userDetails]);

  // Check for conversation timeout
  useEffect(() => {
    if (!conversationState.isActive || !conversationState.lastActivity) return;

    const timeoutId = setTimeout(() => {
      endConversation('timeout');
    }, CONVERSATION_TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [conversationState.lastActivity, conversationState.isActive, endConversation]);

  // Handle page unload to end conversation
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (conversationState.isActive) {
        endConversation('user_end');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also end conversation when component unmounts
      if (conversationState.isActive) {
        endConversation('user_end');
      }
    };
  }, [conversationState.isActive, endConversation]);

  useEffect(() => {
    const initialMessage: Message = {
      id: `initial-${Date.now()}`,
      text: `Hello! I'm ButeoBot. How can I assist you today? I can help with company information, general conversation, or booking appointments.`,
      sender: 'bot',
      timestamp: new Date(),
      mode: 'system',
    };
    if (messages.length === 0) {
        setMessages([initialMessage]);
        startConversation(); // Start conversation when first message is added
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Ensure this runs only once

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date(),
      mode: 'chat', // Mode is determined by AI now, so default to 'chat' for user message
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    // Update conversation state
    setConversationState(prev => ({
      ...prev,
      messageCount: prev.messageCount + 1,
      lastActivity: new Date(),
    }));

    try {
      const input: RouteInquiryInput = {
        userInput: text,
        userEmail: userDetails.email,
        userName: userDetails.name,
        conversationHistory: messages, // Pass the current conversation history
      };
      const output: RouteInquiryOutput = await routeInquiry(input);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: output.responseText,
        sender: 'bot',
        timestamp: new Date(),
        mode: output.determinedMode,
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Error calling AI router flow:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Apologies, I encountered an issue. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        mode: 'system',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full shadow-none border-none flex flex-col bg-card">
      <CardContent className="flex-grow overflow-hidden p-0">
        <MessageList messages={messages} isLoading={isLoading} />
      </CardContent>
      <CardFooter className="p-0 border-t border-border bg-card">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
}
