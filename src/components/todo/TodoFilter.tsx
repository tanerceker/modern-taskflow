
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTodo } from "@/contexts/TodoContext";

export const TodoFilter = memo(() => {
  const { filter: currentFilter, setFilter, todoCount } = useTodo();

  const filters = [
    { value: "all", label: `All (${todoCount.all})` },
    { value: "active", label: `Active (${todoCount.active})` },
    { value: "completed", label: `Completed (${todoCount.completed})` },
  ] as const;

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-md shadow-sm">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant="ghost"
            size="sm"
            onClick={() => setFilter(filter.value)}
            className={cn(
              "rounded-md transition-all",
              currentFilter === filter.value &&
                "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
});

TodoFilter.displayName = "TodoFilter";
