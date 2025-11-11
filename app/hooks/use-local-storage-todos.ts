import { useState, useEffect } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string; // JSON serialized Date
  date: string; // YYYY-MM-DD format
  order: number; // For drag and drop ordering
}

const STORAGE_KEY = "date-based-todos";

export function useLocalStorageTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage on initialization
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Validate the data structure
          if (Array.isArray(parsed)) {
            const todosWithOrder = parsed.map((todo, index) => ({
              ...todo,
              // Ensure date strings are properly formatted
              date: todo.date || new Date().toISOString().split("T")[0],
              createdAt: todo.createdAt || new Date().toISOString(),
              // Initialize order if it doesn't exist
              order: todo.order !== undefined ? todo.order : index,
            }));
            return todosWithOrder;
          }
        }
      } catch (error) {
        console.warn("Failed to load todos from localStorage:", error);
      }
    }
    return [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.warn("Failed to save todos to localStorage:", error);
      }
    }
  }, [todos]);

  // Add a new todo
  const addTodo = (text: string, date: string) => {
    // Get the next order number (highest order + 1)
    const allTodos = todos;
    const nextOrder =
      allTodos.length > 0
        ? Math.max(...allTodos.map((t) => t.order || 0)) + 1
        : 0;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      date: date,
      order: nextOrder,
    };

    setTodos((prev) => [newTodo, ...prev]);
    return newTodo.id;
  };

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Get todos for a specific date
  const getTodosForDate = (date: string) => {
    return todos
      .filter((todo) => todo.date === date)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  // Clear all todos
  const clearAllTodos = () => {
    setTodos([]);
  };

  // Get statistics
  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  };

  // Reorder todos by updating their order values
  const reorderTodos = (reorderedTodos: Todo[]) => {
    setTodos(reorderedTodos);
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    reorderTodos,
    getTodosForDate,
    clearAllTodos,
    getStats,
  };
}
