
import { Check, Trash } from "lucide-react";
import { Todo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityClasses = {
  low: "border-l-4 border-l-green-400",
  medium: "border-l-4 border-l-amber-400",
  high: "border-l-4 border-l-red-400",
};

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const handleToggle = () => {
    onToggle(todo.id);
    toast.success(todo.completed ? "Task marked as undone" : "Task completed");
  };

  const handleDelete = () => {
    onDelete(todo.id);
    toast.success("Task deleted");
  };

  return (
    <div
      className={cn(
        "mb-3 p-4 bg-card rounded-md shadow-sm animate-fade-in transition-all group",
        priorityClasses[todo.priority]
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            id={`todo-${todo.id}`}
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className={cn(
              "text-sm font-medium transition-all cursor-pointer",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.title}
          </label>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleDelete}
        >
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        <span className="capitalize">{todo.priority} priority</span>
        <span className="mx-2">•</span>
        <span>
          {new Date(todo.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};
