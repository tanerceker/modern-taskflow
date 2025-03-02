
import { Todo } from "./types";

// localStorage'dan todoları getir
export const getTodos = (): Todo[] => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

// localStorage'a todoları kaydet
export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Yeni todo oluştur
export const createTodo = (title: string, priority: Todo["priority"] = "medium"): Todo => {
  return {
    id: Date.now().toString(),
    title,
    completed: false,
    priority,
    createdAt: new Date(),
  };
};

// Todoları önceliğe göre sırala
export const sortTodosByPriority = (todos: Todo[]): Todo[] => {
  const priorityOrder = {
    high: 0,
    medium: 1,
    low: 2,
  };

  return [...todos].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
};
