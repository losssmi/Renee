import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface PriorityItem {
  id: number;
  quarter: string;
  title: string;
  pillar: string;
  dueDate: string;
  successMetric: string;
  progress: string;
  status: string;
  nextAction: string;
}

const initialPriorities: PriorityItem[] = [
  {
    id: 1,
    quarter: "Q1",
    title: "Grow database to 500 contacts",
    pillar: "Marketing, Prospecting",
    dueDate: "Mar 31",
    successMetric: "+200 new contacts",
    progress: "75%",
    status: "On Track",
    nextAction: ""
  }
];

export function QuarterlyPriorities() {
  const { toast } = useToast();
  const [activeQuarter, setActiveQuarter] = useState("Q1");
  const [priorities, setPriorities] = useState<PriorityItem[]>(initialPriorities);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    pillar: "",
    dueDate: "",
    successMetric: "",
    progress: "",
    status: "",
    nextAction: ""
  });

  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const filteredPriorities = priorities.filter(p => p.quarter === activeQuarter);

  const resetForm = () => {
    setFormData({
      title: "",
      pillar: "",
      dueDate: "",
      successMetric: "",
      progress: "",
      status: "",
      nextAction: ""
    });
  };

  const handleEdit = (id: number) => {
    const priority = priorities.find(p => p.id === id);
    if (priority) {
      setFormData({
        title: priority.title,
        pillar: priority.pillar,
        dueDate: priority.dueDate,
        successMetric: priority.successMetric,
        progress: priority.progress,
        status: priority.status,
        nextAction: priority.nextAction
      });
      setEditingId(id);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editingId !== null) {
      setPriorities(priorities.map(priority => 
        priority.id === editingId ? { ...priority, ...formData } : priority
      ));
      setEditingId(null);
      setIsEditing(false);
      resetForm();
      toast({
        title: "Priority Updated",
        description: "Priority has been updated successfully.",
      });
    }
  };

  const handleAdd = () => {
    const newPriority: PriorityItem = {
      id: priorities.length + 1,
      quarter: activeQuarter,
      ...formData
    };
    setPriorities([...priorities, newPriority]);
    setIsAdding(false);
    resetForm();
    toast({
      title: "Priority Added",
      description: "New priority has been added successfully.",
    });
  };

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      <aside className="w-[263px] flex-shrink-0">
        <SideBarSection />
      </aside>

      <main className="flex-1 flex flex-col bg-[#f5f5f5]">
        <DashboardHeaderSection />
        
        <div className="px-6 py-5 bg-[#f5f5f5]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal]">
                Priorities
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Set, track, and complete your key initiatives each quarter.
              </p>
            </div>
{!isAdding && !editingId && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-3 py-1 border border-[#ededed] rounded-lg hover:bg-gray-50 transition-colors"
                data-testid="button-edit"
              >
                {isEditing ? "Done" : "Edit"}
              </button>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 bg-[#f5f5f5]">
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex gap-2 mb-6">
                {quarters.map((quarter) => (
                  <button
                    key={quarter}
                    onClick={() => setActiveQuarter(quarter)}
                    className={`[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] px-3 py-1 border border-[#ededed] rounded-lg transition-colors ${
                      activeQuarter === quarter
                        ? "bg-neutral-100"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    data-testid={`button-${quarter.toLowerCase()}`}
                  >
                    {quarter}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredPriorities.map((priority) => (
                  <Card key={priority.id} className="bg-neutral-100 border-[#ededed]">
                    <CardContent className="p-6">
                      {editingId === priority.id && isEditing ? (
                        <div className="space-y-4">
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm border-[#ededed]"
                            data-testid={`input-title-${priority.id}`}
                          />
                          
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px]">
                                Pillar:
                              </p>
                              <Input
                                value={formData.pillar}
                                onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                                className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 text-[10px] border-[#ededed]"
                                data-testid={`input-pillar-${priority.id}`}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px]">
                                Due Date:
                              </p>
                              <Input
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 text-[10px] border-[#ededed]"
                                data-testid={`input-duedate-${priority.id}`}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px]">
                                Success Metric:
                              </p>
                              <Input
                                value={formData.successMetric}
                                onChange={(e) => setFormData({ ...formData, successMetric: e.target.value })}
                                className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 text-[10px] border-[#ededed]"
                                data-testid={`input-successmetric-${priority.id}`}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px]">
                                Progress:
                              </p>
                              <Input
                                value={formData.progress}
                                onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                                className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 text-[10px] border-[#ededed]"
                                data-testid={`input-progress-${priority.id}`}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px]">
                                Status:
                              </p>
                              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                                <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 text-[10px] border-[#ededed]" data-testid={`select-status-${priority.id}`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="On Track">On Track</SelectItem>
                                  <SelectItem value="At Risk">At Risk</SelectItem>
                                  <SelectItem value="Off Track">Off Track</SelectItem>
                                  <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.69)] tracking-[-0.1px]">
                                Next Action:
                              </p>
                              <Textarea
                                value={formData.nextAction}
                                onChange={(e) => setFormData({ ...formData, nextAction: e.target.value })}
                                className="[font-family:'Plus_Jakarta_Sans',Helvetica] min-h-[60px] text-[10px] border-[#ededed]"
                                data-testid={`input-nextaction-${priority.id}`}
                              />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={handleSave}
                              size="sm"
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 px-3 bg-[#172a41] hover:bg-[#172a41]/90 text-white"
                              data-testid={`button-save-${priority.id}`}
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => {
                                setEditingId(null);
                                setIsEditing(false);
                                resetForm();
                              }}
                              variant="outline"
                              size="sm"
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 px-3"
                              data-testid={`button-cancel-${priority.id}`}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-snug flex-1" data-testid={`text-title-${priority.id}`}>
                              {priority.title}
                            </h3>
                            {isEditing && (
                              <button
                                onClick={() => handleEdit(priority.id)}
                                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] px-2 py-1 border border-[#ededed] rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
                                data-testid={`button-edit-${priority.id}`}
                              >
                                Edit
                              </button>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-start">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px] w-[120px]">
                                Pillar:
                              </p>
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px]" data-testid={`text-pillar-${priority.id}`}>
                                {priority.pillar}
                              </p>
                            </div>

                            <div className="flex items-start">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px] w-[120px]">
                                Due Date:
                              </p>
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px]" data-testid={`text-duedate-${priority.id}`}>
                                {priority.dueDate}
                              </p>
                            </div>

                            <div className="flex items-start">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px] w-[120px]">
                                Success Metric:
                              </p>
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px]" data-testid={`text-successmetric-${priority.id}`}>
                                {priority.successMetric}
                              </p>
                            </div>

                            <div className="flex items-start">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px] w-[120px]">
                                Progress:
                              </p>
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px]" data-testid={`text-progress-${priority.id}`}>
                                {priority.progress}
                              </p>
                            </div>

                            <div className="flex items-start">
                              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px] w-[120px]">
                                Status:
                              </p>
                              <p className={`[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] tracking-[-0.1px] ${
                                priority.status === "On Track" ? "text-[#09b700]" : 
                                priority.status === "At Risk" ? "text-[#ffc130]" : 
                                priority.status === "Off Track" ? "text-[#ff4d4d]" :
                                "text-[#172a41]"
                              }`} data-testid={`text-status-${priority.id}`}>
                                {priority.status}
                              </p>
                            </div>

                            {priority.nextAction && (
                              <div className="flex items-start">
                                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.69)] tracking-[-0.1px] w-[120px]">
                                  Next Action:
                                </p>
                                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[10px]" data-testid={`text-nextaction-${priority.id}`}>
                                  {priority.nextAction}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {isAdding ? (
                  <Card className="bg-neutral-100 border-[#ededed]">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Priority title"
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm border-[#ededed]"
                          data-testid="input-new-title"
                        />
                        
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px]">
                              Pillar:
                            </p>
                            <Input
                              value={formData.pillar}
                              onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 text-[10px] border-[#ededed]"
                              data-testid="input-new-pillar"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px]">
                              Due Date:
                            </p>
                            <Input
                              value={formData.dueDate}
                              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 text-[10px] border-[#ededed]"
                              data-testid="input-new-duedate"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px]">
                              Success Metric:
                            </p>
                            <Input
                              value={formData.successMetric}
                              onChange={(e) => setFormData({ ...formData, successMetric: e.target.value })}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 text-[10px] border-[#ededed]"
                              data-testid="input-new-successmetric"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px]">
                              Progress:
                            </p>
                            <Input
                              value={formData.progress}
                              onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 text-[10px] border-[#ededed]"
                              data-testid="input-new-progress"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[10px] text-[rgba(23,42,65,0.66)] tracking-[-0.1px]">
                              Status:
                            </p>
                            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                              <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 text-[10px] border-[#ededed]" data-testid="select-new-status">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="On Track">On Track</SelectItem>
                                <SelectItem value="At Risk">At Risk</SelectItem>
                                <SelectItem value="Off Track">Off Track</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={handleAdd}
                            size="sm"
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 px-3 bg-[#172a41] hover:bg-[#172a41]/90 text-white"
                            data-testid="button-add-priority"
                          >
                            Add
                          </Button>
                          <Button
                            onClick={() => {
                              setIsAdding(false);
                              resetForm();
                            }}
                            variant="outline"
                            size="sm"
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 px-3"
                            data-testid="button-cancel-add"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  !isEditing && (
                    <Card className="bg-white border-[#ededed] border-dashed shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                      <CardContent 
                        className="p-6 flex items-center justify-center min-h-[200px]"
                        onClick={() => setIsAdding(true)}
                        data-testid="button-add-card"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Plus className="w-8 h-8 text-[#6b7280]" />
                          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#6b7280] text-sm">
                            Add New Priority
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
