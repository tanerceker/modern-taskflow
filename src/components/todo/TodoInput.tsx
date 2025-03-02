
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Todo } from "@/lib/types";
import { toast } from "sonner";

interface TodoInputProps {
  onAdd: (title: string, priority: Todo["priority"]) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      onAdd(title.trim(), priority);
      setTitle("");
      setPriority("medium");
      toast.success("Task added");
    } else {
      toast.error("Task title cannot be empty");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 animate-scale-in">
      <div className="glass-effect rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow bg-background/50"
          />
          <div className="flex gap-2">
            <Select
              value={priority}
              onValueChange={(value) => setPriority(value as Todo["priority"])}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
