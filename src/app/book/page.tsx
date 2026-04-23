'use client';

import { useState, useEffect, useCallback } from 'react';
import { format, addDays, isWeekend, setHours, setMinutes, addMinutes } from 'date-fns';
import './booking.css';
import { checkAvailability, bookAppointment } from '@/services/calendarService';

const serviceDurations: { [key: string]: number } = {
  'Buteos Nest': 30,
  'Buteos Flight': 45,
  'Buteos Talon': 60,
  'I don\'t know': 60,
};

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Buteos Nest');
  const [timeSlots, setTimeSlots] = useState<{ time: Date; isAvailable: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const getNextBusinessDays = () => {
    const businessDays: Date[] = [];
    let currentDate = new Date();
    let count = 0;

    while (count < 10) {
      if (!isWeekend(currentDate)) {
        businessDays.push(currentDate);
        count++;
      }
      currentDate = addDays(currentDate, 1);
    }
    return businessDays;
  };

  const businessDays = getNextBusinessDays();

  const generateTimeSlots = (date: Date, duration: number) => {
    const slots = [];
    let currentTime = setMinutes(setHours(date, 9), 0);
    const endTime = setMinutes(setHours(date, 18), 30); // Appointments available until 6:30 PM

    while (currentTime < endTime) {
      // Ensure the slot plus duration does not exceed end time
      if (addMinutes(currentTime, duration) <= endTime) {
        slots.push(new Date(currentTime));
      }
      currentTime = addMinutes(currentTime, 30); // 30-minute intervals
    }
    return slots;
  };

  const fetchAvailableTimeSlots = useCallback(async (date: Date, serviceName: string) => {
    const duration = serviceDurations[serviceName];
    const generatedSlots = generateTimeSlots(date, duration);

    // Optimistically render all slots as available initially
    setTimeSlots(generatedSlots.map(slot => ({
      time: slot,
      isAvailable: true, // Assume available until checked
    })));

    setIsLoading(true);

    // Asynchronously check availability for each slot
    const availabilityPromises = generatedSlots.map(slot => checkAvailability(slot, duration));
    const availabilityResults = await Promise.all(
      availabilityPromises
    );

    // Update timeSlots with actual availability
    setTimeSlots(prevSlots => prevSlots.map((slot, index) => ({
      ...slot,
      isAvailable: availabilityResults[index].isAvailable,
    })));

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimeSlots(selectedDate, service);
    }
  }, [selectedDate, service, fetchAvailableTimeSlots]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setBookingStatus({ type: null, message: '' });
  };

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime || !name || !email || !service) {
      setBookingStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    try {
      const duration = serviceDurations[service];
      const result = await bookAppointment(selectedTime, service, name, duration);
      if (result.success) {
        // Send confirmation email
        const emailResponse = await fetch('/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selectedTime,
            service,
            name,
            email,
            duration,
          }),
        });

        const emailResult = await emailResponse.json();

        if (emailResult.success) {
          setBookingStatus({ type: 'success', message: result.confirmationMessage + ' Confirmation email sent!' });
        } else {
          setBookingStatus({ type: 'error', message: result.confirmationMessage + ' Failed to send confirmation email.' });
        }

        setSelectedDate(null);
        setSelectedTime(null);
        setName('');
        setEmail('');
        setService('Buteos Nest');
      } else {
        setBookingStatus({ type: 'error', message: result.confirmationMessage });
      }
    } catch (error) {
      setBookingStatus({ type: 'error', message: 'An error occurred while booking. Please try again.' });
    }
  };

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>Book an Appointment</h1>
          <p>Schedule a consultation to discuss your unique software needs</p>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <div className="booking-grid">
            <div className="date-selection-container">
              <h3>Select a Date</h3>
              <div className="date-buttons">
                {businessDays.map((date) => (
                  <button
                    key={date.toISOString()}
                    className={`date-button ${selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? 'selected' : ''}`}
                    onClick={() => handleDateSelect(date)}
                  >
                    {format(date, 'EEE, MMM d')}
                  </button>
                ))}
              </div>
            </div>

            <div className="booking-details">
              <div className="service-selection">
                <label>Service</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="Buteos Nest">Buteos Nest (30 min)</option>
                  <option value="Buteos Flight">Buteos Flight (45 min)</option>
                  <option value="Buteos Talon">Buteos Talon (60 min)</option>
                  <option value="I don't know">I don't know (60 min)</option>
                </select>
              </div>

              {selectedDate && (
                <div className="time-selection">
                  <h3>Available Times for {format(selectedDate, 'MMMM do, yyyy')}</h3>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="time-slots">
                      {timeSlots.map(({ time, isAvailable }) => (
                        <button
                          key={time.toISOString()}
                          className={`time-slot-button ${!isAvailable ? 'unavailable' : ''} ${selectedTime?.getTime() === time.getTime() ? 'selected' : ''}`}
                          onClick={() => isAvailable && handleTimeSelect(time)}
                          disabled={!isAvailable}
                        >
                          {format(time, 'h:mm a')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {selectedTime && (
                <div className="booking-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mobile-date-time">
                      <label>Selected Date & Time</label>
                      <input
                        type="text"
                        value={`${format(selectedTime, 'MMMM do, yyyy')} at ${format(selectedTime, 'h:mm a')}`}
                        readOnly
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="cta-button"
                    >
                      Book Appointment
                    </button>
                  </form>
                </div>
              )}

              {bookingStatus.type && (
                <div className={`status-message ${bookingStatus.type}`}>
                  {bookingStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}