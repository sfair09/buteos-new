'use server';

/**
 * @fileOverview Provides AI-powered appointment booking capabilities.
 *
 * - aiAppointmentBooking - A function that handles appointment booking requests.
 * - AiAppointmentBookingInput - The input type for the aiAppointmentBooking function.
 * - AiAppointmentBookingOutput - The return type for the aiAppointmentBooking function.
 */

import { getAI } from '@/ai/genkit';
import {z} from 'genkit';
import { checkCalendarAvailabilityTool, bookAppointmentTool } from '@/ai/tools/calendarTools';

const ai = await getAI();

const AiAppointmentBookingInputSchema = z.object({
  userInput: z.string().describe('The user input for appointment booking.'),
  currentDate: z.string().describe('The current date in ISO format.'),
  conversationHistory: z.array(z.object({
    id: z.string(),
    text: z.string(),
    sender: z.enum(['user', 'bot', 'system']),
    timestamp: z.string(),
    mode: z.enum(['info', 'chat', 'booking', 'system'])
  })).optional().describe('Previous messages in the conversation for context.'),
});
export type AiAppointmentBookingInput = z.infer<typeof AiAppointmentBookingInputSchema>;

const AiAppointmentBookingOutputSchema = z.object({
  confirmation: z.string().describe('The confirmation message or response to the user.'),
});
export type AiAppointmentBookingOutput = z.infer<typeof AiAppointmentBookingOutputSchema>;

export async function aiAppointmentBooking(input: AiAppointmentBookingInput): Promise<AiAppointmentBookingOutput> {
  return aiAppointmentBookingFlow(input);
}

const prompt = ai?.definePrompt({
  name: 'aiAppointmentBookingPrompt',
  input: {schema: AiAppointmentBookingInputSchema},
  output: {schema: AiAppointmentBookingOutputSchema},
  tools: [checkCalendarAvailabilityTool, bookAppointmentTool],
  prompt: `You are ButeoBot, an AI assistant for ButeoBot Inc. that helps with appointment booking.

Conversation History:
{{#if conversationHistory}}
{{#each conversationHistory}}
{{sender}}: {{text}}
{{/each}}
{{else}}
No previous conversation.
{{/if}}

Current Date: {{{currentDate}}}
User's current input: "{{{userInput}}}"

Instructions:
1. Use the conversation history to understand context and provide more relevant responses
2. If the user is asking follow-up questions about availability or booking, use the context to provide complete answers
3. Use the 'checkCalendarAvailabilityTool' to check available time slots when appropriate
4. Use the 'bookAppointmentTool' to book appointments when the user provides necessary details
5. Be helpful and conversational in your responses
6. Ask for any missing information needed for booking (date, time, purpose, etc.)
7. Provide clear confirmation messages when appointments are booked

IMPORTANT: 
- Always return a valid JSON object with a "confirmation" field
- Never mention tools, processes, or technical details to the user
- Focus on providing helpful booking assistance in a natural way`,
});

const aiAppointmentBookingFlow = ai?.defineFlow(
  {
    name: 'aiAppointmentBookingFlow',
    inputSchema: AiAppointmentBookingInputSchema,
    outputSchema: AiAppointmentBookingOutputSchema,
  },
  async (input: AiAppointmentBookingInput) => {
    try {
      if (!prompt) {
        throw new Error('AI prompt not initialized');
      }
      
      const {output} = await prompt(input);
      
      if (output && output.confirmation) {
        return output;
      }
    } catch (error) {
      console.error('Error in AI appointment booking flow:', error);
    }
    
    // Fallback response
    return {
      confirmation: "I'd be happy to help you book an appointment! Could you please let me know what date and time you'd prefer, and what the appointment is for?",
    };
  }
);
