'use server';

/**
 * @fileOverview Provides company information to the user, using a tool to fetch data.
 *
 * - companyInfoChat - A function that allows users to ask questions about the company.
 * - CompanyInfoChatInput - The input type for the companyInfoChat function.
 * - CompanyInfoChatOutput - The return type for the companyInfoChat function.
 */

import { getAI } from '@/ai/genkit';
import {z} from 'genkit';
import { getCompanyInfoTool } from '@/ai/tools/companyDataTool';
import type { Message } from '@/types';

const ai = await getAI();

const CompanyInfoChatInputSchema = z.object({
  query: z.string().describe('The user query about the company.'),
  conversationHistory: z.array(z.object({
    id: z.string(),
    text: z.string(),
    sender: z.enum(['user', 'bot', 'system']), // Allow 'system' as sender
    timestamp: z.string(),
    mode: z.enum(['info', 'chat', 'booking', 'system'])
  })).optional().describe('Previous messages in the conversation for context.'),
});
export type CompanyInfoChatInput = z.infer<typeof CompanyInfoChatInputSchema>;

const CompanyInfoChatOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query, based on retrieved company data or general knowledge if the tool is not applicable.'),
});
export type CompanyInfoChatOutput = z.infer<typeof CompanyInfoChatOutputSchema>;

export async function companyInfoChat(input: CompanyInfoChatInput): Promise<CompanyInfoChatOutput> {
  return companyInfoChatFlow(input);
}

const prompt = ai?.definePrompt({
  name: 'companyInfoChatPrompt',
  input: {schema: CompanyInfoChatInputSchema},
  output: {schema: CompanyInfoChatOutputSchema},
  tools: [getCompanyInfoTool],
  prompt: `You are a helpful AI assistant for ButeoBot Inc. Answer user questions about the company naturally and concisely.

Conversation History:
{{#if conversationHistory}}
{{#each conversationHistory}}
{{sender}}: {{text}}
{{/each}}
{{else}}
No previous conversation.
{{/if}}

User's current query: "{{{query}}}"

Instructions:
1. Use the conversation history to understand context and provide more relevant answers
2. If the user is asking follow-up questions (like time zones after asking about hours), use the context to provide a complete answer
3. Use the 'getCompanyInfoTool' to retrieve relevant company information when appropriate
4. Provide direct, helpful answers without explaining your internal processes
5. Be conversational and natural in your responses
6. If you don't have specific information, provide a helpful general response
7. Keep responses concise and to the point

IMPORTANT: 
- Always return a valid JSON object with an "answer" field
- Never mention tools, processes, or technical details to the user
- Focus on providing the information the user requested in a natural way`,
});

const companyInfoChatFlow = ai?.defineFlow(
  {
    name: 'companyInfoChatFlow',
    inputSchema: CompanyInfoChatInputSchema,
    outputSchema: CompanyInfoChatOutputSchema,
  },
  async (input: CompanyInfoChatInput) => {
    try {
      if (!prompt) {
        throw new Error('AI prompt not initialized');
      }
      
      const {output} = await prompt(input);
      
      if (output && output.answer) {
        return output;
      }
    } catch (error) {
      console.error('Error in company info chat flow:', error);
    }
    
    // Fallback response
    return {
      answer: "I'm sorry, I couldn't retrieve that information at the moment. ButeoBot Inc. specializes in AI solutions. How else can I help?",
    };
  }
);
