import { useState } from "react";

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

// Helper function to get the current local date
function getCurrentLocalDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

// Helper function to format date as YYYY-MM-DD using local time
function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function DatePicker({ selectedDate, onDateSelect }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(getCurrentLocalDate());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isToday = (date: Date) => {
    return formatDateKey(date) === formatDateKey(getCurrentLocalDate());
  };

  const isSelected = (date: Date) => {
    return formatDateKey(date) === formatDateKey(selectedDate);
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
    <div className="p-4 mb-6">
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

      <div className="flex overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-2.5 pb-2">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="w-12 h-12 shrink-0" />;
          }

          const dayOfWeek = day.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const dayNumber = day.getDate();

          return (
            <button
              key={formatDateKey(day)}
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
      </div>
    </div>
  );
}
