import { useState } from "react";
import { DashboardPageLayout } from "@/components/DashboardPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, CheckIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Task {
  id: number;
  text: string;
  checked: boolean;
}

const initialTasks: Task[] = [
  { id: 1, text: "List 1 John Street", checked: false },
  { id: 2, text: "Follow up with hot prospects", checked: false },
  { id: 3, text: "Prepare weekly newsletter", checked: false },
  { id: 4, text: "Schedule team meeting", checked: true },
  { id: 5, text: "Review market analysis", checked: false },
];

export function ToDos() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim()) {
      const newTask: Task = {
        id: Math.max(...tasks.map(t => t.id), 0) + 1,
        text: taskText.trim(),
        checked: false
      };
      setTasks([...tasks, newTask]);
      setTaskText("");
      setIsAddDialogOpen(false);
      toast({
        title: "Task Added",
        description: "New task has been added to your to-do list.",
      });
    }
  };

  const handleEditTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTaskText(task.text);
      setEditingId(id);
      setIsAddDialogOpen(true);
    }
  };

  const handleUpdateTask = () => {
    if (taskText.trim()) {
      setTasks(tasks.map(task => 
        task.id === editingId ? { ...task, text: taskText.trim() } : task
      ));
      setTaskText("");
      setEditingId(null);
      setIsAddDialogOpen(false);
      toast({
        title: "Task Updated",
        description: "Task has been updated successfully.",
      });
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task Deleted",
      description: "Task has been removed from your to-do list.",
    });
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, checked: !task.checked } : task
    ));
  };

  const activeTasks = tasks.filter(t => !t.checked);
  const completedTasks = tasks.filter(t => t.checked);

  return (
    <DashboardPageLayout>
      <div className="px-6 py-5 bg-[#f5f5f5]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal]">
              To-Dos
            </h1>
            <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
              Track and manage all your action items in one place. Stay organized and accountable to your daily commitments.
            </p>
          </div>
          <Button
            onClick={() => {
              setTaskText("");
              setEditingId(null);
              setIsAddDialogOpen(true);
            }}
            className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white h-9 px-4 gap-2"
            data-testid="button-add-task"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 bg-[#f5f5f5]">
        <div className="flex flex-col gap-4">
          {/* Active Tasks */}
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                  Active Tasks ({activeTasks.length})
                </h2>
              </div>
              
              {activeTasks.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-sm">
                    No active tasks. Add a new task to get started!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {activeTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-center gap-3 p-3 rounded-lg bg-[#f5f5f5] hover:bg-gray-100 transition-colors"
                      data-testid={`task-${task.id}`}
                    >
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`w-[19px] h-[19px] rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          task.checked ? 'border-[#172a41] bg-[#172a41]' : 'border-gray-300'
                        }`}
                        data-testid={`checkbox-task-${task.id}`}
                      >
                        {task.checked && <CheckIcon className="w-3 h-3 text-white" />}
                      </button>
                      <span 
                        className={`[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm flex-1 ${task.checked ? 'line-through opacity-50' : ''}`}
                        data-testid={`text-task-${task.id}`}
                      >
                        {task.text}
                      </span>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleEditTask(task.id)}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                          data-testid={`button-edit-task-${task.id}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                          data-testid={`button-delete-task-${task.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    Completed Tasks ({completedTasks.length})
                  </h2>
                </div>
                
                <div className="flex flex-col gap-3">
                  {completedTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-center gap-3 p-3 rounded-lg bg-[#f5f5f5] hover:bg-gray-100 transition-colors"
                      data-testid={`task-${task.id}`}
                    >
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`w-[19px] h-[19px] rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          task.checked ? 'border-[#09b600] bg-[#09b600]' : 'border-gray-300'
                        }`}
                        data-testid={`checkbox-task-${task.id}`}
                      >
                        {task.checked && <CheckIcon className="w-3 h-3 text-white" />}
                      </button>
                      <span 
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm flex-1 line-through opacity-50"
                        data-testid={`text-task-${task.id}`}
                      >
                        {task.text}
                      </span>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleEditTask(task.id)}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                          data-testid={`button-edit-task-${task.id}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                          data-testid={`button-delete-task-${task.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg">
              {editingId ? "Edit Task" : "Add New Task"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                Task Description
              </label>
              <Input
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (editingId ? handleUpdateTask() : handleAddTask())}
                placeholder="Enter task description..."
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                autoFocus
                data-testid="input-task-text"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setEditingId(null);
                setTaskText("");
              }}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica]"
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={editingId ? handleUpdateTask : handleAddTask}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white"
              data-testid="button-save"
            >
              {editingId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardPageLayout>
  );
}
