
import { Todo } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TodoStatsProps {
  todos: Todo[];
}

export const TodoStats = ({ todos }: TodoStatsProps) => {
  if (todos.length === 0) return null;

  const completed = todos.filter((todo) => todo.completed).length;
  const completionRate = Math.round((completed / todos.length) * 100);

  // Önceliğe göre sayımlar
  const priorityCounts = {
    high: todos.filter((todo) => todo.priority === "high").length,
    medium: todos.filter((todo) => todo.priority === "medium").length,
    low: todos.filter((todo) => todo.priority === "low").length,
  };

  return (
    <Card className="mb-6 animate-fade-in shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Completion</span>
              <span>{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">High</div>
              <div className="text-lg font-semibold">{priorityCounts.high}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Medium</div>
              <div className="text-lg font-semibold">{priorityCounts.medium}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Low</div>
              <div className="text-lg font-semibold">{priorityCounts.low}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
