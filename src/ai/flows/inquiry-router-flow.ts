'use server';
/**
 * @fileOverview A flow that routes user inquiries to the appropriate specialized flow
 * and optionally sends an email summary of the interaction.
 *
 * - routeInquiry - A function that classifies user input and routes to the correct flow.
 * - RouteInquiryInput - The input type for the routeInquiry function.
 * - RouteInquiryOutput - The return type for the routeInquiry function.
 */

import { getAI } from '@/ai/genkit';
import {z} from 'genkit';
import type { CompanyInfoChatInput, CompanyInfoChatOutput } from './company-info-chat';
import { companyInfoChat } from './company-info-chat';
import type { ConverseInput, ConverseOutput } from './natural-language-conversation';
import { converse } from './natural-language-conversation';
import type { AiAppointmentBookingInput, AiAppointmentBookingOutput } from './ai-appointment-booking';
import { aiAppointmentBooking } from './ai-appointment-booking';
import type { ChatMode, Message } from '@/types';
// Note: Email summaries should be handled at the conversation level, not per message
// import { sendConversationSummaryTool } from '@/ai/tools/emailTool';

const ai = await getAI();

const RouteInquiryInputSchema = z.object({
  userInput: z.string().describe('The user input to be classified and routed.'),
  userEmail: z.string().optional().describe("The user's email address, if available and they've consented to receive summaries."),
  userName: z.string().optional().describe("The user's name, if known."),
  conversationHistory: z.array(z.object({
    id: z.string(),
    text: z.string(),
    sender: z.enum(['user', 'bot', 'system']), // Allow 'system' as sender
    timestamp: z.string(),
    mode: z.enum(['info', 'chat', 'booking', 'system'])
  })).optional().describe('Previous messages in the conversation for context.'),
});
export type RouteInquiryInput = z.infer<typeof RouteInquiryInputSchema>;

const RouteInquiryOutputSchema = z.object({
  responseText: z.string().describe('The final response to the user.'),
  determinedMode: z.enum(['info', 'chat', 'booking']).describe('The mode determined by the AI.'),
});
export type RouteInquiryOutput = z.infer<typeof RouteInquiryOutputSchema>;

// Internal schema for the classification step
const InquiryClassificationSchema = z.object({
  determinedMode: z.enum(['info', 'chat', 'booking', 'unknown']) // Added 'unknown'
    .describe('The classified type of user inquiry: "info" for company information, "chat" for general conversation, "booking" for appointment requests, or "unknown" if unclear.'),
});

export async function routeInquiry(input: RouteInquiryInput): Promise<RouteInquiryOutput> {
  return inquiryRouterFlow(input);
}

const classificationPrompt = ai?.definePrompt({
  name: 'inquiryClassificationPrompt',
  input: { schema: z.object({ 
    userInput: z.string().describe('The user input to be classified and routed.'),
    conversationHistory: z.array(z.object({
      id: z.string(),
      text: z.string(),
      sender: z.enum(['user', 'bot', 'system']),
      timestamp: z.string(),
      mode: z.enum(['info', 'chat', 'booking', 'system'])
    })).optional().describe('Previous messages in the conversation for context.')
  }) },
  output: { schema: InquiryClassificationSchema },
  prompt: `You are an expert at classifying user intentions for a chatbot. Classify the following user input into one of four categories, taking into account the conversation history for context:

- "info": If the user is asking for company information, its services, products, history, contact details, office hours etc.
- "booking": If the user is trying to book, schedule, modify, or inquire about an appointment or availability. This includes asking "Are you free tomorrow?".
- "chat": For all other general conversation, greetings, small talk, or inquiries not clearly covered by "info" or "booking".
- "unknown": If the intent is very unclear or ambiguous.

Conversation History:
{{#if conversationHistory}}
{{#each conversationHistory}}
{{sender}}: {{text}}
{{/each}}
{{else}}
No previous conversation.
{{/if}}

Current User Input: {{{userInput}}}

Consider the conversation context when classifying. For example, if the user previously asked about hours and now says "cst" or "us central time", this is likely a follow-up to their previous question about hours.

Return ONLY the determinedMode.`,
});

const inquiryRouterFlow = ai?.defineFlow(
  {
    name: 'inquiryRouterFlow',
    inputSchema: RouteInquiryInputSchema,
    outputSchema: RouteInquiryOutputSchema,
    // Note: Email summaries should be handled at the conversation level, not per message
    // tools: [sendConversationSummaryTool], 
  },
  async (flowInput: RouteInquiryInput) => {
    if (!classificationPrompt) {
      throw new Error('AI classification prompt not initialized');
    }

    const {output: classificationOutput} = await classificationPrompt({
      userInput: flowInput.userInput,
      conversationHistory: flowInput.conversationHistory || []
    });
    
    let determinedMode: ChatMode | 'unknown' = 'chat'; // Default to chat
    if (classificationOutput) {
      determinedMode = classificationOutput.determinedMode;
    }
     if (determinedMode === 'unknown') {
        determinedMode = 'chat'; // Treat unknown as chat for now
    }


    let responseText = "Sorry, I couldn't process that.";
    let finalDeterminedMode: ChatMode = determinedMode as ChatMode; // Cast here after handling unknown

    switch (determinedMode) {
      case 'info':
        const infoInput: CompanyInfoChatInput = { 
          query: flowInput.userInput,
          conversationHistory: flowInput.conversationHistory
        };
        const infoOutput: CompanyInfoChatOutput = await companyInfoChat(infoInput);
        responseText = infoOutput.answer;
        finalDeterminedMode = 'info';
        break;
      case 'chat':
        const converseInput: ConverseInput = { 
          message: flowInput.userInput,
          conversationHistory: flowInput.conversationHistory
        };
        const converseOutput: ConverseOutput = await converse(converseInput);
        responseText = converseOutput.response;
        finalDeterminedMode = 'chat';
        break;
      case 'booking':
        const bookingInput: AiAppointmentBookingInput = { 
          userInput: flowInput.userInput,
          currentDate: new Date().toISOString(), // Pass current date for booking flow
          conversationHistory: flowInput.conversationHistory
        };
        const bookingOutput: AiAppointmentBookingOutput = await aiAppointmentBooking(bookingInput);
        responseText = bookingOutput.confirmation;
        finalDeterminedMode = 'booking';
        break;
      // No default needed due to 'unknown' being handled and type casting
    }

    // Note: Email summaries should be handled at the conversation level, not per message
    // This prevents premature email sending and allows for proper conversation tracking
    // The chat interface should handle sending email summaries when a conversation ends

    return { responseText, determinedMode: finalDeterminedMode };
  }
);
