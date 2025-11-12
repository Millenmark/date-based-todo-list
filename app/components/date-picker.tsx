import { useState } from "react";
import { getCurrentLocalDate, formatDate } from "~/utils/datefn";

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function DatePicker({ selectedDate, onDateSelect }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(getCurrentLocalDate());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Add all days of the month starting from the left
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isToday = (date: Date) => {
    return formatDate(date) === formatDate(getCurrentLocalDate());
  };

  const isSelected = (date: Date) => {
    return formatDate(date) === formatDate(selectedDate);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className=" mb-1">
      {/* <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div> */}

      <div className="flex overflow-x-auto gap-2.5 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 transition-colors duration-200 touch-pan-x">
        {/* Scroll indicator padding on both ends */}
        <div className="w-2 shrink-0" />
        {days.map((day, index) => {
          const dayOfWeek = day.toLocaleDateString("en-PH", {
            weekday: "short",
          });

          const dayNumber = day.getDate();

          return (
            <button
              key={formatDate(day)}
              onClick={() => onDateSelect(day)}
              className={`w-14 h-16 shrink-0 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                isSelected(day)
                  ? "border-primary-navy bg-primary-navy text-white"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              <span className="text-xs uppercase">{dayOfWeek}</span>
              <span className="font-semibold text-base">{dayNumber}</span>
            </button>
          );
        })}
        {/* Scroll indicator padding on both ends */}
        <div className="w-2 shrink-0" />
      </div>
    </div>
  );
}
