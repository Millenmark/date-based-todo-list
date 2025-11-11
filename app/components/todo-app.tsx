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

  const completedCount = filteredTodos.filter((todo) => todo.completed).length;
  const totalCount = filteredTodos.length;

  // Get overall statistics
  const { total, completed, pending } = getStats();

  return (
    <div className="min-h-screen py-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4">
        <div className=" p-6">
          <h1 className="text-3xl font-bold text-gray-900 dtext-white mb-6 text-center">
            To Do List
          </h1>

          {/* Date Picker */}
          <DatePicker
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder={`Add a todo for ${selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}...`}
                className="flex-1 px-4 py-2 border border-gray-300 dborder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dbg-gray-700 dtext-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Add
              </button>
            </div>
          </form>

          {/* Todo List */}
          <div className="space-y-2">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dtext-gray-400">
                <p className="text-lg">No todos for this date!</p>
                <p>Add your first todo above to get started.</p>
                {total > 0 && (
                  <p className="text-sm mt-2">
                    You have {total} total todos across all dates.
                  </p>
                )}
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    todo.completed
                      ? "bg-green-50 dbg-green-900/20 border-green-200 dborder-green-800"
                      : "bg-white dbg-gray-700 border-gray-200 dborder-gray-600"
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 dborder-gray-500 hover:border-green-400"
                    }`}
                  >
                    {todo.completed && (
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
                    )}
                  </button>

                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? "line-through text-gray-500 dtext-gray-400"
                        : "text-gray-900 dtext-white"
                    }`}
                  >
                    {todo.text}
                  </span>

                  <span className="text-xs text-gray-400 dtext-gray-500">
                    {new Date(todo.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dhover:bg-red-900/20 rounded transition-colors"
                    title="Delete todo"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
