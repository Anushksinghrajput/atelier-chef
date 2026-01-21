import { CalendarEvent } from '../types';

export const generateICSFile = (events: CalendarEvent[]): string => {
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AtelierChef//NONSGML Event Calendar//EN'
  ];

  events.forEach(event => {
    const dateStr = event.date.replace(/-/g, '');
    const timeStr = event.startTime.replace(/:/g, '') + '00';
    
    icsContent.push('BEGIN:VEVENT');
    icsContent.push(`SUMMARY:${event.title}`);
    icsContent.push(`DESCRIPTION:${event.description}`);
    icsContent.push(`DTSTART:${dateStr}T${timeStr}`);
    icsContent.push(`DTEND:${dateStr}T${timeStr}`); // Rough estimation, or use durationMinutes
    icsContent.push('END:VEVENT');
  });

  icsContent.push('END:VCALENDAR');
  return icsContent.join('\r\n');
};

export const downloadICS = (content: string, filename: string = 'atelier-schedule.ics') => {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
