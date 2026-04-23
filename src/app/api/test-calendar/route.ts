import { NextRequest, NextResponse } from 'next/server';
import { checkAvailability } from '@/services/calendarService';
import { addDays, setHours, setMinutes, addMinutes, format, isWeekend } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const dateParam = url.searchParams.get('date');
    
    // Use provided date or default to tomorrow
    let testDate = dateParam ? new Date(dateParam) : addDays(new Date(), 1);
    
    // Skip to next weekday if weekend
    while (isWeekend(testDate)) {
      testDate = addDays(testDate, 1);
    }

    console.log(`Testing availability for: ${format(testDate, 'yyyy-MM-dd (EEEE)')}`);

    const results = [];
    
    // Generate 30-minute slots from 9:00 AM to 6:30 PM
    let currentTime = setMinutes(setHours(testDate, 9), 0);
    const endTime = setMinutes(setHours(testDate, 18), 30);

    while (currentTime < endTime) {
      const timeSlot = new Date(currentTime);
      const availability = await checkAvailability(timeSlot, 30);
      
      results.push({
        time: format(timeSlot, 'h:mm a'),
        iso: timeSlot.toISOString(),
        available: availability.isAvailable,
        reason: availability.reason || null
      });

      currentTime = addMinutes(currentTime, 30);
    }

    return NextResponse.json({
      testDate: format(testDate, 'yyyy-MM-dd (EEEE)'),
      totalSlots: results.length,
      availableSlots: results.filter(r => r.available).length,
      unavailableSlots: results.filter(r => !r.available).length,
      slots: results
    });

  } catch (error) {
    console.error('Calendar test error:', error);
    return NextResponse.json({ error: 'Failed to test calendar' }, { status: 500 });
  }
}