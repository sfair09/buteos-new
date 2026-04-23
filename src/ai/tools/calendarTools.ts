'use server';
/**
 * @fileOverview Genkit tools for calendar interactions (checking availability and booking).
 */
import { getAI } from '@/ai/genkit';
import {z} from 'genkit';
import { checkAvailability, bookAppointment } from '@/services/calendarService';

// At the top level of the file
const ai = await getAI();

// Schema for checkCalendarAvailabilityTool input
const CheckCalendarAvailabilityInputSchema = z.object({
  dateTime: z.string().datetime().describe("The desired date and time for the appointment in ISO 8601 format (e.g., '2024-07-30T14:00:00.000Z')."),
});
export type CheckCalendarAvailabilityInput = z.infer<typeof CheckCalendarAvailabilityInputSchema>;

// Schema for checkCalendarAvailabilityTool output
const CheckCalendarAvailabilityOutputSchema = z.object({
  isAvailable: z.boolean().describe("Whether the time slot is available."),
  reason: z.string().optional().describe("Reason if not available (e.g., 'Slot booked', 'Outside business hours')."),
});
export type CheckCalendarAvailabilityOutput = z.infer<typeof CheckCalendarAvailabilityOutputSchema>;

export const checkCalendarAvailabilityTool = ai.defineTool(
  {
    name: 'checkCalendarAvailabilityTool',
    description: 'Checks if a specific 1-hour time slot is available in the calendar. Considers existing appointments and business hours (Mon-Fri, 9 AM - 5 PM).',
    inputSchema: CheckCalendarAvailabilityInputSchema,
    outputSchema: CheckCalendarAvailabilityOutputSchema,
  },
  async (input: CheckCalendarAvailabilityInput) => {
    console.log('checkCalendarAvailabilityTool invoked with input:', input);
    try {
      const requestedDate = new Date(input.dateTime);
      if (isNaN(requestedDate.getTime())) {
        return { isAvailable: false, reason: "Invalid date/time format provided." };
      }
      return await checkAvailability(requestedDate);
    } catch (e: any) {
      console.error("Error in checkCalendarAvailabilityTool:", e);
      return { isAvailable: false, reason: e.message || "Error checking availability." };
    }
  }
);

// Schema for bookAppointmentTool input
const BookAppointmentInputSchema = z.object({
  dateTime: z.string().datetime().describe("The confirmed date and time for the appointment in ISO 8601 format (e.g., '2024-07-30T14:00:00.000Z'). This should be a slot previously confirmed as available."),
  serviceDetails: z.string().describe("A brief description of the service or reason for the appointment (e.g., 'AI Consultation', 'Product Demo')."),
  userName: z.string().optional().describe("The name of the person for whom the appointment is being booked, if available."),
});
export type BookAppointmentInput = z.infer<typeof BookAppointmentInputSchema>;

// Schema for bookAppointmentTool output
const BookAppointmentOutputSchema = z.object({
  success: z.boolean().describe("Whether the appointment was successfully booked."),
  bookingId: z.string().optional().describe("A unique ID for the booking, if successful."),
  confirmationMessage: z.string().describe("A confirmation or error message."),
  error: z.string().optional().describe("Detailed error if booking failed after availability check (should be rare).")
});
export type BookAppointmentOutput = z.infer<typeof BookAppointmentOutputSchema>;

export const bookAppointmentTool = ai.defineTool(
  {
    name: 'bookAppointmentTool',
    description: 'Books a 1-hour appointment in the calendar for a *previously confirmed available* date and time. Records service details and user name if provided.',
    inputSchema: BookAppointmentInputSchema,
    outputSchema: BookAppointmentOutputSchema,
  },
  async (input: BookAppointmentInput) => {
    console.log('bookAppointmentTool invoked with input:', input);
    try {
      const appointmentDate = new Date(input.dateTime);
       if (isNaN(appointmentDate.getTime())) {
        return { success: false, confirmationMessage: "Invalid date/time format provided for booking.", error: "Invalid date/time." };
      }
      return await bookAppointment(appointmentDate, input.serviceDetails, input.userName);
    } catch (e: any) {
      console.error("Error in bookAppointmentTool:", e);
      return { success: false, confirmationMessage: "An unexpected error occurred while booking.", error: e.message };
    }
  }
);
