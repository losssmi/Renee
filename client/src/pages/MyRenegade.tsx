import { useState } from "react";
import { CheckIcon, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const initialDailyFocusTasks = [
  { id: 1, text: "10 connects by 10am", status: "green" },
  { id: 2, text: "3 x 45 minute call sessions", status: "orange" },
  { id: 3, text: "1 buyer work session", status: "red" },
];

const initialReminders = [
  { id: 1, text: "Hot Stock uncontacted", status: "green" },
  { id: 2, text: "Pipeline coverage", status: "orange" },
  { id: 3, text: "Priority drift", status: "red" },
];

const initialQuarterlyPriorities = [
  { id: 1, text: "Launch DL Campaign", status: "green" },
  { id: 2, text: "Build DB to 500", status: "orange" },
  { id: 3, text: "Secure 2 expired listings", status: "red" },
];

const kpis = [
  { label: "Connects", percentage: 5, color: "#09b600" },
  { label: "Listings", percentage: 3, color: "#09b600" },
  { label: "Conversions", percentage: 70, color: "#09b600" },
];

const scorecardItems = [
  "Database", "Calls", "Connects", "BAPs", "MAPs", "LAPs", "How are you feeling?"
];

export function MyRenegade() {
  const { toast } = useToast();
  const [actions, setActions] = useState([
    { id: 1, text: "List 1 John Street", checked: false },
    { id: 2, text: "Social media", checked: false },
    { id: 3, text: "Newsletter", checked: false },
  ]);
  const [resources, setResources] = useState([
    { id: 1, text: "Time Blocking", checked: false },
    { id: 2, text: "Goal Setting", checked: false },
    { id: 3, text: "Quarterly Reviews", checked: false },
  ]);
  const [scorecardRatings, setScorecardRatings] = useState<Record<string, number>>({});
  const [isAddingAction, setIsAddingAction] = useState(false);
  const [newActionText, setNewActionText] = useState("");
  const [isEditingFocus, setIsEditingFocus] = useState(false);

  const toggleAction = (id: number) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, checked: !action.checked } : action
    ));
  };

  const toggleResource = (id: number) => {
    setResources(resources.map(resource => 
      resource.id === id ? { ...resource, checked: !resource.checked } : resource
    ));
  };

  const setRating = (item: string, rating: number) => {
    setScorecardRatings(prev => ({ ...prev, [item]: rating }));
  };

  const addAction = () => {
    if (newActionText.trim()) {
      setActions([...actions, { 
        id: actions.length + 1, 
        text: newActionText, 
        checked: false 
      }]);
      setNewActionText("");
      setIsAddingAction(false);
      toast({
        title: "Action added",
        description: "New action has been added to your list.",
      });
    }
  };

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      <aside className="w-[263px] flex-shrink-0">
        <SideBarSection />
      </aside>

      <main className="flex-1 flex flex-col bg-[#f5f5f5]">
        <DashboardHeaderSection />
        
        <div className="px-6 py-5 bg-[#f5f5f5]">
          <div className="flex flex-col gap-2">
            <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal]">
              My Renegade
            </h1>
            <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
              Keep track of your daily operations.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
          <div className="flex gap-4">
            <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-6 h-6" alt="Daily Focus" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    Daily Focus
                  </h2>
                  <button 
                    onClick={() => {
                      setIsEditingFocus(!isEditingFocus);
                      toast({
                        title: isEditingFocus ? "Edit mode disabled" : "Edit mode enabled",
                        description: isEditingFocus ? "Your changes have been saved." : "You can now edit your daily focus.",
                      });
                    }}
                    className="ml-auto [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-2 py-1 border border-[#ededed] rounded-lg hover:bg-gray-50 transition-colors"
                    data-testid="button-edit-focus"
                  >
                    {isEditingFocus ? "Save" : "Edit"}
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#f5f5f5] border border-[#dbdbdb] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.1)]">
                    <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] mb-4">
                      Today's tasks
                    </h3>
                    <div className="flex flex-col gap-3">
                      {initialDailyFocusTasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-3">
                          <div className={`w-[11px] h-[11px] rounded-full cursor-pointer`} style={{ backgroundColor: task.status === 'green' ? '#09b600' : task.status === 'orange' ? '#ffc130' : '#ff4d4d' }} data-testid={`status-task-${task.id}`} />
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[#172a41] text-xs tracking-[-0.12px] leading-[1.3]">
                            {task.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#f5f5f5] border border-[#dbdbdb] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.1)]">
                    <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] mb-4">
                      Reminders
                    </h3>
                    <div className="flex flex-col gap-3">
                      {initialReminders.map((reminder) => (
                        <div key={reminder.id} className="flex items-center gap-3">
                          <div className={`w-[11px] h-[11px] rounded-full cursor-pointer`} style={{ backgroundColor: reminder.status === 'green' ? '#09b600' : reminder.status === 'orange' ? '#ffc130' : '#ff4d4d' }} data-testid={`status-reminder-${reminder.id}`} />
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[#172a41] text-xs tracking-[-0.12px] leading-[1.3]">
                            {reminder.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#f5f5f5] border border-[#dbdbdb] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.1)]">
                    <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] mb-4">
                      Quarterly Priorities
                    </h3>
                    <div className="flex flex-col gap-3">
                      {initialQuarterlyPriorities.map((priority) => (
                        <div key={priority.id} className="flex items-center gap-3">
                          <div className={`w-[11px] h-[11px] rounded-full cursor-pointer`} style={{ backgroundColor: priority.status === 'green' ? '#09b600' : priority.status === 'orange' ? '#ffc130' : '#ff4d4d' }} data-testid={`status-priority-${priority.id}`} />
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[#172a41] text-xs tracking-[-0.12px] leading-[1.3]">
                            {priority.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-[341px] bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-6 h-6" alt="KPIs" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    KPIs
                  </h2>
                </div>
                
                <div className="flex flex-col gap-6">
                  {kpis.map((kpi, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-[17px] h-[17px] rounded-full" style={{ 
                        backgroundColor: index === 0 ? '#09b600' : index === 1 ? '#ffc130' : '#ff4d4d' 
                      }} data-testid={`kpi-indicator-${index}`} />
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[#172a41] text-base tracking-[-0.16px] leading-[1.3] flex-1">
                        {kpi.label}
                      </span>
                      <div className="flex items-center gap-1">
                        <CheckIcon className="w-3.5 h-3.5 text-[#09b600]" />
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b700] text-sm" data-testid={`kpi-percentage-${index}`}>
                          {kpi.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-6 h-6" alt="Actions" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    Actions
                  </h2>
                  <button 
                    onClick={() => setIsAddingAction(true)}
                    className="ml-auto [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px] tracking-[-0.13px] hover:text-[#09b600] transition-colors cursor-pointer"
                    data-testid="button-add-action"
                  >
                    Add new +
                  </button>
                </div>
                
                <div className="flex flex-col gap-3">
                  {actions.map((action) => (
                    <div key={action.id} className="flex items-center gap-3">
                      <button
                        onClick={() => toggleAction(action.id)}
                        className={`w-[19px] h-[19px] rounded-full border-2 flex items-center justify-center transition-colors ${
                          action.checked ? 'border-[#09b600] bg-[#09b600]' : 'border-gray-300'
                        }`}
                        data-testid={`checkbox-action-${action.id}`}
                      >
                        {action.checked && <CheckIcon className="w-3 h-3 text-white" />}
                      </button>
                      <span className={`[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px] tracking-[-0.13px] leading-[1.3] ${action.checked ? 'line-through opacity-50' : ''}`}>
                        {action.text}
                      </span>
                    </div>
                  ))}
                  {isAddingAction && (
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="text"
                        value={newActionText}
                        onChange={(e) => setNewActionText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addAction()}
                        placeholder="Enter new action..."
                        className="flex-1"
                        autoFocus
                        data-testid="input-new-action"
                      />
                      <Button onClick={addAction} size="sm" data-testid="button-save-action">Add</Button>
                      <Button onClick={() => { setIsAddingAction(false); setNewActionText(""); }} size="sm" variant="outline" data-testid="button-cancel-action">Cancel</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-6 h-6" alt="Scorecard" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    Scorecard
                  </h2>
                </div>
                
                <div className="flex flex-col gap-4">
                  {scorecardItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px] tracking-[-0.13px] w-40">
                        {item}
                      </span>
                      <div className="flex gap-2">
                        {[...Array(8)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setRating(item, i + 1)}
                            className={`w-[29px] h-[29px] border rounded-lg transition-all ${
                              scorecardRatings[item] === i + 1 
                                ? 'bg-[#09b600] border-[#09b600]' 
                                : scorecardRatings[item] && scorecardRatings[item] > i 
                                  ? 'bg-[#e0f4de] border-[#09b600]'
                                  : 'bg-transparent border-[rgba(215,215,215,0.3)] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]'
                            }`}
                            data-testid={`rating-${item}-${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-6 h-6" alt="Next Meeting" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    Next Meeting
                  </h2>
                </div>
                
                <div className="flex flex-col gap-2">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px] tracking-[-0.13px]">
                    No meetings scheduled
                  </p>
                  <button 
                    onClick={() => {
                      toast({
                        title: "Scheduling a meeting",
                        description: "Redirecting to contact Renegade...",
                      });
                    }}
                    className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#09b600] text-[13px] tracking-[-0.13px] hover:underline text-left"
                    data-testid="link-contact-renegade"
                  >
                    Contact Renegade for a Mentoring Session.
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-6 h-6" alt="Resources" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    Recources
                  </h2>
                </div>
                
                <div className="flex flex-col gap-3">
                  {resources.map((resource) => (
                    <div key={resource.id} className="flex items-center gap-3">
                      <button
                        onClick={() => toggleResource(resource.id)}
                        className={`w-[19px] h-[19px] rounded-full border-2 flex items-center justify-center transition-colors ${
                          resource.checked ? 'border-[#09b600] bg-[#09b600]' : 'border-gray-300'
                        }`}
                        data-testid={`checkbox-resource-${resource.id}`}
                      >
                        {resource.checked && <CheckIcon className="w-3 h-3 text-white" />}
                      </button>
                      <span className={`[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px] tracking-[-0.13px] leading-[1.3] ${resource.checked ? 'line-through opacity-50' : ''}`}>
                        {resource.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
