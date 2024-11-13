import React from 'react';
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

function MonthCalendar({ month, year, selectedDates, onDateClick }) {
  const currentMonth = new Date(year, month);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="calendar-month">
      <header>
        <span>{format(currentMonth, 'MMMM yyyy', { locale: es })}</span>
      </header>
      <div className="calendar-grid">
        {days.map((date) => (
          <div
            key={date}
            className={`calendar-date ${
              isSameDay(date, selectedDates.startDate) || isSameDay(date, selectedDates.endDate)
                ? 'selected'
                : ''
            } ${!isSameMonth(date, currentMonth) ? 'disabled' : ''}`}
            onClick={() => onDateClick(date)}
          >
            {format(date, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthCalendar;
