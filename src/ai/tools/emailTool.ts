'use server';
/**
 * @fileOverview Genkit tool for sending email summaries.
 */
import { getAI } from '@/ai/genkit';
import {z} from 'genkit';
import { sendEmail } from '@/services/emailService';

const ai = await getAI();
// Schema for sendConversationSummaryTool input
const SendConversationSummaryInputSchema = z.object({
  userEmail: z.string().optional().describe("The user's email address. If not provided, a default will be used."),
  userName: z.string().optional().describe("The user's name, if known."),
  userInput: z.string().describe("The last message/query from the user."),
  botResponse: z.string().describe("The bot's response to the user's query."),
  conversationTopic: z.string().optional().describe("The general topic or mode of the conversation (e.g., info, booking, chat)."),
});
export type SendConversationSummaryInput = z.infer<typeof SendConversationSummaryInputSchema>;

// Schema for sendConversationSummaryTool output
const SendConversationSummaryOutputSchema = z.object({
  success: z.boolean().describe("Whether the email was sent successfully."),
  messageId: z.string().optional().describe("The ID of the sent message, if successful."),
  error: z.string().optional().describe("Error message if sending failed."),
});
export type SendConversationSummaryOutput = z.infer<typeof SendConversationSummaryOutputSchema>;

export const sendConversationSummaryTool = ai?.defineTool(
  {
    name: 'sendConversationSummaryTool',
    description: 'Sends a summary of the current conversation turn via email. Includes user input, bot response, and placeholder contact details.',
    inputSchema: SendConversationSummaryInputSchema,
    outputSchema: SendConversationSummaryOutputSchema,
  },
  async (input: SendConversationSummaryInput) => {
    console.log('sendConversationSummaryTool invoked with input:', input);
    
    // Validate email address - don't send to invalid domains
    const emailToUse = input.userEmail && input.userEmail.includes('@') && !input.userEmail.includes('example.com') 
      ? input.userEmail 
      : undefined; // Let the email service handle default
    
    if (!emailToUse) {
      console.log('No valid email provided, skipping email summary');
      return { 
        success: true, 
        messageId: 'skipped', 
        error: 'No valid email address provided for summary' 
      };
    }

    const subject = `Your ButeoBot Conversation Summary (${input.conversationTopic || 'General'})`;
    const body = `
Hello ${input.userName || 'Valued User'},

Thank you for chatting with ButeoBot! Here's a summary of your recent interaction:

Your Query:
"${input.userInput}"

Our Response:
"${input.botResponse}"

---
For further assistance, please contact us at:
Phone: 555-0101
Email: support@ButeoBot.example.com
Address: 123 AI Lane, Tech City, TX 75001

We look forward to assisting you again!

Best regards,
The ButeoBot Team
    `;

    try {
      const result = await sendEmail({
        to: emailToUse,
        subject,
        body,
      });
      if (result.success) {
        return { success: true, messageId: result.messageId };
      } else {
        return { success: false, error: "Email service reported failure." };
      }
    } catch (e: any) {
      console.error("Error in sendConversationSummaryTool:", e);
      return { success: false, error: e.message || "An unexpected error occurred while sending the email." };
    }
  }
);
