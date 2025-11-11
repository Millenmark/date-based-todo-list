import { useState } from "react";
import { DatePicker } from "./date-picker";
import { useLocalStorageTodos } from "../hooks/use-local-storage-todos";

// Helper function to get the current local date
function getCurrentLocalDate(): Date {
  const now = new Date();
  // Create a date with the local time components
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function TodoApp() {
  const [newTodo, setNewTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState(getCurrentLocalDate());

  // Use the localStorage hook for persistent todos
  const { addTodo, toggleTodo, deleteTodo, getTodosForDate, getStats } =
    useLocalStorageTodos();

  const formatDateKey = (date: Date) => {
    // Use local date formatting to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const dateKey = formatDateKey(selectedDate);
    addTodo(newTodo.trim(), dateKey);
    setNewTodo("");
  };

  // Get todos for the selected date
  const selectedDateKey = formatDateKey(selectedDate);
  const filteredTodos = getTodosForDate(selectedDateKey);

  // Separate completed and uncompleted todos
  const uncompletedTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  const completedCount = filteredTodos.filter((todo) => todo.completed).length;
  const totalCount = filteredTodos.length;

  // Get overall statistics
  const { total, completed, pending } = getStats();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-4 flex-1 flex flex-col">
        {/* Header - stays at top */}
        <header className="flex-shrink-0 pt-12 py-6">
          <h1 className="pl-3 text-3xl font-bold text-gray-900 dtext-white mb-6">
            To Do List
          </h1>

          {/* Date Picker */}
          <DatePicker
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </header>

        {/* Todo List - fills remaining space */}
        <main className="flex-1 overflow-y-auto">
          <div className="space-y-2">
            {/* Uncompleted Todos Section */}
            {uncompletedTodos.length > 0 && (
              <>
                {uncompletedTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center text-[#121212] gap-3 px-3 py-2 rounded-xl transition-colors bg-[#F3EFEE] dbg-gray-700 border-gray-200"
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="w-5 h-5 rounded border-2 border-[#9f9f9f] rounded-md hover:border-primary-navy hover:cursor-pointer flex items-center justify-center transition-colors"
                    ></button>

                    <span className="flex-1 text-gray-900 dtext-white">
                      {todo.text}
                    </span>

                    <button
                      // onClick={() => deleteTodo(todo.id)}
                      className="p-1 text-[#d9d9d9] flex rounded transition-colors"
                      title="Menu"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM9 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM9 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM15 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM15 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </>
            )}

            {/* Completed Todos Section */}
            {completedTodos.length > 0 && (
              <div className="mt-8">
                <h2 className="pl-3 text-xs font-semibold uppercase text-primary-navy mb-3">
                  Completed
                </h2>
                <div className="space-y-2">
                  {completedTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center text-[#121212] gap-3 px-3 py-2 rounded-xl transition-colors bg-gray-100 border border-primary-navy/20 text-gray-400 opacity-60"
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="w-5 h-5 rounded border-2 bg-primary-navy border-primary-navy flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      <span className="flex-1 text-gray-500">{todo.text}</span>

                      <button
                        // onClick={() => deleteTodo(todo.id)}
                        className="p-1 text-[#d9d9d9] flex rounded transition-colors"
                        title="Menu"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM9 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM9 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM15 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM15 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {filteredTodos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No todos for this date</p>
              </div>
            )}
          </div>
        </main>

        {/* Footer - stays at bottom */}
        <footer className="flex-shrink-0 py-6">
          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo}>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Write a task..."
                className="flex-1 px-4 py-3 bg-[#F3EFEE] rounded-xl focus:outline-none focus:ring-0 focus:ring-none text-[#222]"
              />
              <button
                type="submit"
                className="px-6 py-2 cursor-pointer bg-primary-navy text-white rounded-xl font-medium transition-colors"
              >
                Add
              </button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  );
}
