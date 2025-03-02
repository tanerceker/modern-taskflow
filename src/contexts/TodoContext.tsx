
import React, { createContext, useContext, useReducer, useEffect, ReactNode, useMemo, useCallback } from "react";
import { Todo, TodoFilter } from "@/lib/types";
import { getTodos, saveTodos, createTodo, sortTodosByPriority } from "@/lib/todo-utils";

// Context için state tipini tanımlama
interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
}

// Action tiplerini tanımlama
type TodoAction =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "ADD_TODO"; payload: { title: string; priority: Todo["priority"] } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "CLEAR_COMPLETED" }
  | { type: "SET_FILTER"; payload: TodoFilter };

// Context değerlerini tanımlama
interface TodoContextType extends TodoState {
  addTodo: (title: string, priority: Todo["priority"]) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: TodoFilter) => void;
  todoCount: {
    all: number;
    active: number;
    completed: number;
  };
}

// Reducer fonksiyonu
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    case "ADD_TODO":
      const newTodo = createTodo(
        action.payload.title,
        action.payload.priority
      );
      return {
        ...state,
        todos: sortTodosByPriority([...state.todos, newTodo]),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

// Başlangıç state'i
const initialState: TodoState = {
  todos: [],
  filter: "all",
};

// Context oluşturma
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider bileşeni
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // İlk yüklemede localStorage'dan todoları al
  useEffect(() => {
    const storedTodos = getTodos();
    dispatch({ type: "SET_TODOS", payload: storedTodos });
  }, []);

  // Todo durumu değiştiğinde localStorage'a kaydet
  useEffect(() => {
    saveTodos(state.todos);
  }, [state.todos]);

  // Callback fonksiyonları
  const addTodo = useCallback((title: string, priority: Todo["priority"]) => {
    dispatch({ type: "ADD_TODO", payload: { title, priority } });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: "CLEAR_COMPLETED" });
  }, []);

  const setFilter = useCallback((filter: TodoFilter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  }, []);

  // Todo sayıları
  const todoCount = useMemo(() => ({
    all: state.todos.length,
    active: state.todos.filter((todo) => !todo.completed).length,
    completed: state.todos.filter((todo) => todo.completed).length,
  }), [state.todos]);

  // Context değeri
  const value = useMemo(() => ({
    ...state,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
    todoCount,
  }), [state, addTodo, toggleTodo, deleteTodo, clearCompleted, setFilter, todoCount]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook
export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
