'use server';
/**
 * @fileOverview Calendar service for appointment booking using Google Calendar API.
 */

import { google } from 'googleapis';
import type { calendar_v3 } from 'googleapis';
import { getSecret } from '@/utils/secrets';

// --- Google Calendar API Setup ---
let calendar: calendar_v3.Calendar | null = null;

async function getGoogleCalendarClient(): Promise<calendar_v3.Calendar | null> {
  if (calendar) {
    return calendar;
  }

  try {
    // Get secrets from Google Secret Manager
    const serviceAccountKey = await getSecret('GOOGLE_SERVICE_ACCOUNT_KEY_JSON');
    const calendarId = await getSecret('GOOGLE_CALENDAR_ID');

    if (!serviceAccountKey || !calendarId) {
      console.error('Required Google Calendar secrets are not set.');
      return null;
    }

    try {
      const credentials = JSON.parse(serviceAccountKey);
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
      });

      const authClient = await auth.getClient();
      calendar = google.calendar({ version: 'v3', auth: authClient as any });
      console.log('Google Calendar client initialized successfully.');
      return calendar;
    } catch (error) {
      console.error('Error parsing service account key or initializing calendar client:', error);
      return null;
    }
  } catch (error) {
    console.error('Failed to access Google Calendar secrets:', error);
    return null;
  }
}

export async function checkAvailability(dateTime: Date, durationMinutes: number = 30): Promise<{ isAvailable: boolean; reason?: string }> {
  const gCalendar = await getGoogleCalendarClient();
  const calendarId = await getSecret('GOOGLE_CALENDAR_ID');
  
  if (!gCalendar || !calendarId) {
    return { isAvailable: false, reason: "Calendar service is not configured." };
  }

  const requestedStartTime = new Date(dateTime);
  const requestedEndTime = new Date(requestedStartTime.getTime() + durationMinutes * 60 * 1000);

  // Debug logging
  console.log(`=== AVAILABILITY CHECK DEBUG ===`);
  console.log(`Input dateTime: ${dateTime.toISOString()}`);
  console.log(`Server timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`);
  console.log(`Requested start: ${requestedStartTime.toISOString()}`);
  console.log(`Requested end: ${requestedEndTime.toISOString()}`);
  // Determine business timezone for local checks. Prefer explicit env var, otherwise fall back to server timezone.
  const businessTz = process.env.BUSINESS_TIMEZONE || Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(`Business timezone for availability checks: ${businessTz}`);

  // Helper to extract weekday/hour/minute in a specific timezone using Intl
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  function getLocalParts(d: Date, tz: string) {
    const fmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour12: false, weekday: 'short', hour: '2-digit', minute: '2-digit' });
    const parts = fmt.formatToParts(d);
    const hourPart = parts.find(p => p.type === 'hour')?.value || '0';
    const minutePart = parts.find(p => p.type === 'minute')?.value || '0';
    const weekdayPart = parts.find(p => p.type === 'weekday')?.value || 'Mon';
    return {
      weekday: weekdayMap[weekdayPart] ?? 1,
      hour: parseInt(hourPart, 10),
      minute: parseInt(minutePart, 10),
    };
  }

  const startParts = getLocalParts(requestedStartTime, businessTz);
  const endParts = getLocalParts(requestedEndTime, businessTz);
  console.log(`Local start hour: ${startParts.hour}:${startParts.minute}`);
  console.log(`Local end hour: ${endParts.hour}:${endParts.minute}`);

  if (requestedStartTime < new Date()) {
    return { isAvailable: false, reason: "Cannot book appointments in the past." };
  }

  const day = startParts.weekday;
  const startHour = startParts.hour;
  const startMinutes = startParts.minute;
  const endHour = endParts.hour;
  const endMinutes = endParts.minute;

  // Check weekdays only
  if (day === 0 || day === 6) {
    console.log(`Rejected: Weekend (day ${day})`);
    return { isAvailable: false, reason: "Appointments can only be booked on weekdays." };
  }
  
  // Check business hours: 9 AM to 6:30 PM (18:30)
  if (startHour < 9 || startHour > 18 || (startHour === 18 && startMinutes > 30)) {
    console.log(`Rejected: Start time outside business hours (${startHour}:${startMinutes})`);
    return { isAvailable: false, reason: `Appointments can only be booked between 9:00 AM and 6:30 PM. Requested: ${startHour}:${startMinutes.toString().padStart(2, '0')}` };
  }
  
  if (endHour > 18 || (endHour === 18 && endMinutes > 30)) {
    console.log(`Rejected: End time outside business hours (${endHour}:${endMinutes})`);
    return { isAvailable: false, reason: `Appointment would end after business hours (6:30 PM). Would end at: ${endHour}:${endMinutes.toString().padStart(2, '0')}` };
  }

  try {
    // Use FreeBusy query to reliably determine busy slots for the calendar
    const checkStart = new Date(requestedStartTime.getTime() - 30 * 60 * 1000); // 30 min before
    const checkEnd = new Date(requestedEndTime.getTime() + 30 * 60 * 1000); // 30 min after

    try {
      const fbResponse = await gCalendar.freebusy.query({
        requestBody: {
          timeMin: checkStart.toISOString(),
          timeMax: checkEnd.toISOString(),
          items: [{ id: calendarId }],
        },
      });

      const calendars = (fbResponse.data && fbResponse.data.calendars) || {};
      const calBusy = calendars[calendarId]?.busy || [];

      console.log(`FreeBusy returned ${calBusy.length} busy ranges for calendar ${calendarId}`);

      if (calBusy.length > 0) {
        // Check if any busy range overlaps the requested window
        for (const busy of calBusy) {
          const busyStart = new Date(busy.start);
          const busyEnd = new Date(busy.end);
          console.log(`Busy range: ${busyStart.toISOString()} - ${busyEnd.toISOString()}`);
          if (requestedStartTime < busyEnd && requestedEndTime > busyStart) {
            return { isAvailable: false, reason: 'The time slot conflicts with an existing appointment.' };
          }
        }
      }

      console.log(`Time slot ${requestedStartTime.toISOString()} to ${requestedEndTime.toISOString()} is available (no FreeBusy conflicts).`);
      return { isAvailable: true };
    } catch (fbErr: any) {
      console.error('FreeBusy query failed, falling back to events.list. Error:', fbErr);
      // Fallback to previous events.list approach if FreeBusy fails
      const response = await gCalendar.events.list({
        calendarId: calendarId,
        timeMin: checkStart.toISOString(),
        timeMax: checkEnd.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      if (response.data.items && response.data.items.length > 0) {
        for (const event of response.data.items) {
          if (!event.start?.dateTime || !event.end?.dateTime) continue;
          const eventStart = new Date(event.start.dateTime);
          const eventEnd = new Date(event.end.dateTime);
          console.log(`Event found: ${event.summary} (${eventStart.toISOString()} - ${eventEnd.toISOString()})`);
          if (requestedStartTime < eventEnd && requestedEndTime > eventStart) {
            return { isAvailable: false, reason: 'The time slot conflicts with an existing appointment.' };
          }
        }
      }

      console.log(`Time slot ${requestedStartTime.toISOString()} to ${requestedEndTime.toISOString()} is available (events.list found no conflicts).`);
      return { isAvailable: true };
    }
  } catch (error: any) {
    console.error('Error checking Google Calendar availability:', error);
    return { isAvailable: false, reason: `Error checking calendar: ${error.message}` };
  }
}

export async function bookAppointment(
  dateTime: Date,
  serviceDetails: string,
  userName?: string,
  durationMinutes?: number
): Promise<{ success: boolean; bookingId?: string; confirmationMessage: string; error?: string }> {
  const gCalendar = await getGoogleCalendarClient();
  const calendarId = await getSecret('GOOGLE_CALENDAR_ID');
  
  if (!gCalendar || !calendarId) {
    return { success: false, confirmationMessage: "Booking failed: Calendar service is not configured.", error: "Calendar service not configured."};
  }

  console.log(`Attempting to book Google Calendar appointment for: ${dateTime.toISOString()}, Service: ${serviceDetails}, Duration: ${durationMinutes}`);

  const availability = await checkAvailability(dateTime, durationMinutes || 60); // Default to 60 minutes if not provided
  if (!availability.isAvailable) {
    return { success: false, confirmationMessage: `Failed to book: ${availability.reason || 'Slot not available.'}`, error: availability.reason };
  }

  const startTime = new Date(dateTime);
  const endTime = new Date(startTime.getTime() + (durationMinutes || 60) * 60 * 1000); // Default to 60 minutes if not provided
  
  const eventTitle = userName ? `${serviceDetails} for ${userName}` : serviceDetails;
  const eventDescription = `Appointment booked via ButeoBot AI.\nService: ${serviceDetails}\n${userName ? `Client: ${userName}` : ''}`;

  const event: calendar_v3.Schema$Event = {
    summary: eventTitle,
    description: eventDescription,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  try {
    const response = await gCalendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
    });

    const bookingId = response.data.id || `gcal-${Date.now()}`;
    const confirmationMessage = `Appointment for "${eventTitle}" on ${startTime.toLocaleString()} successfully booked. Event ID: ${bookingId}.`;
    console.log(confirmationMessage);
    return { success: true, bookingId, confirmationMessage };

  } catch (error: any) {
    console.error('Error booking Google Calendar appointment:', error);
    const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to create event.';
    return { success: false, confirmationMessage: `An unexpected error occurred while booking: ${errorMessage}`, error: errorMessage };
  }
}
