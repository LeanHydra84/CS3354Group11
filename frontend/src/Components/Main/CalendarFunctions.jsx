// CalendarFunctions.jsx
import React from 'react';

export function renderCalendar(currentDate, events, setEvents) {
  // Calendar rendering logic...
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const totalDays = daysInMonth(currentDate);
  const startDay = startDayOfMonth(currentDate);

  const days = [];
  let dayCount = 1;

  const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const prevMonthDays = startDay;

  for (let i = 0; i < 5; i++) { // Change to 5 rows
    const cells = [];

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        const day = prevMonthLastDay - (prevMonthDays - j) + 1;
        cells.push(
          <td key={`prevMonth-${j}`} className="empty-cell">
            <div className="calendar-number other-month">{day}</div>
          </td>
        );
      } else if (dayCount <= totalDays) {
        cells.push(
          <td key={`day-${dayCount}`} className="calendar-cell">
            <div className="calendar-number">{dayCount}</div>
            {/* Display events for this day */}
            {events.map((event, index) => (
              (event.date.getDate() === dayCount && event.date.getMonth() === currentDate.getMonth()) &&
              <div key={index} className="event">
                {event.title}
              </div>
            ))}
          </td>
        );
        dayCount++;
      } else {
        cells.push(
          <td key={`nextMonth-${j}`} className="empty-cell">
            <div className="calendar-number other-month">{dayCount - totalDays}</div>
          </td>
        );
        dayCount++;
      }
    }

    days.push(<tr key={`row-${i}`}>{cells}</tr>);
  }

  return days;
}
