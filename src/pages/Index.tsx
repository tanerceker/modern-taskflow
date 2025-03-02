
import { TodoInput } from "@/components/todo/TodoInput";
import { TodoList } from "@/components/todo/TodoList";
import { TodoFilter } from "@/components/todo/TodoFilter";
import { TodoStats } from "@/components/todo/TodoStats";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { TodoProvider, useTodo } from "@/contexts/TodoContext";
import { toast } from "sonner";

// TodoApp bileşeni - Context tüketicisi
const TodoApp = () => {
  const { todos, filter, todoCount, clearCompleted } = useTodo();

  const handleClearCompleted = () => {
    clearCompleted();
    toast.success("Completed tasks cleared");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Task Flow</h1>
          <ThemeToggle />
        </div>
        
        <TodoInput />
        
        {todos.length > 0 && (
          <>
            <TodoStats />
            
            <TodoFilter />
            
            <TodoList />
            
            {todoCount.completed > 0 && (
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClearCompleted}
                >
                  Clear completed
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Ana Index bileşeni - Context Provider'ı içeriyor
const Index = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default Index;
