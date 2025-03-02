
import { TodoItem } from "./TodoItem";
import { Todo, TodoFilter } from "@/lib/types";

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({ 
  todos, 
  filter, 
  onToggle, 
  onDelete 
}: TodoListProps) => {
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
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
