
import { TodoFilter as FilterType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCount: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TodoFilter = ({
  currentFilter,
  onFilterChange,
  todoCount,
}: TodoFilterProps) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: `All (${todoCount.all})` },
    { value: "active", label: `Active (${todoCount.active})` },
    { value: "completed", label: `Completed (${todoCount.completed})` },
  ];

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-md shadow-sm">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange(filter.value)}
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
};
