
import { memo } from "react";
import { TodoItem } from "./TodoItem";
import { useTodo } from "@/contexts/TodoContext";

export const TodoList = memo(() => {
  const { todos, filter } = useTodo();
  
  // Filtreleme işlemi
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-10 animate-fade-in">
        <p className="text-muted-foreground">No tasks to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </div>
  );
});

TodoList.displayName = "TodoList";
