
import { useState, useEffect } from "react";
import { TodoInput } from "@/components/todo/TodoInput";
import { TodoList } from "@/components/todo/TodoList";
import { TodoFilter } from "@/components/todo/TodoFilter";
import { TodoStats } from "@/components/todo/TodoStats";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Todo, TodoFilter as FilterType } from "@/lib/types";
import { getTodos, saveTodos, createTodo, sortTodosByPriority } from "@/lib/todo-utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  // İlk yüklemede localStorage'dan todoları al
  useEffect(() => {
    const storedTodos = getTodos();
    setTodos(storedTodos);
  }, []);

  // Todo durumu değiştiğinde localStorage'a kaydet
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // Yeni todo ekle
  const handleAddTodo = (title: string, priority: Todo["priority"]) => {
    const newTodo = createTodo(title, priority);
    setTodos((prevTodos) => sortTodosByPriority([...prevTodos, newTodo]));
  };

  // Todo'nun tamamlandı durumunu değiştir
  const handleToggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todo'yu sil
  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Tümünü temizle
  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    toast.success("Completed tasks cleared");
  };

  // Todo sayıları
  const todoCount = {
    all: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Task Flow</h1>
          <ThemeToggle />
        </div>
        
        <TodoInput onAdd={handleAddTodo} />
        
        {todos.length > 0 && (
          <>
            <TodoStats todos={todos} />
            
            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              todoCount={todoCount}
            />
            
            <TodoList
              todos={todos}
              filter={filter}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
            
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

export default Index;
