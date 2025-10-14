import { CheckIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";

const dailyFocusTasks = [
  { id: 1, text: "10 connects by 10am", status: "green" },
  { id: 2, text: "3 x 45 minute call sessions", status: "orange" },
  { id: 3, text: "1 buyer work session", status: "red" },
];

const reminders = [
  { id: 1, text: "Hot Stock uncontacted", status: "green" },
  { id: 2, text: "Pipeline coverage", status: "orange" },
  { id: 3, text: "Priority drift", status: "red" },
];

const quarterlyPriorities = [
  { id: 1, text: "Launch DL Campaign", status: "green" },
  { id: 2, text: "Build DB to 500", status: "orange" },
  { id: 3, text: "Secure 2 expired listings", status: "red" },
];

const kpis = [
  { label: "Connects", percentage: 5, color: "#09b600" },
  { label: "Listings", percentage: 3, color: "#09b600" },
  { label: "Conversions", percentage: 70, color: "#09b600" },
];

const actions = [
  { text: "List 1 John Street", checked: false },
  { text: "Social media", checked: false },
  { text: "Newsletter", checked: false },
];

const scorecardItems = [
  "Database", "Calls", "Connects", "BAPs", "MAPs", "LAPs", "How are you feeling?"
];

const resources = [
  { text: "Time Blocking", checked: false },
  { text: "Goal Setting", checked: false },
  { text: "Quarterly Reviews", checked: false },
];

export function MyRenegade() {
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
                  <button className="ml-auto [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-2 py-1 border border-[#ededed] rounded-lg">
                    Edit
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#f5f5f5] border border-[#dbdbdb] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.1)]">
                    <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] mb-4">
                      Today's tasks
                    </h3>
                    <div className="flex flex-col gap-3">
                      {dailyFocusTasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-3">
                          <div className={`w-[11px] h-[11px] rounded-full`} style={{ backgroundColor: task.status === 'green' ? '#09b600' : task.status === 'orange' ? '#ffc130' : '#ff4d4d' }} />
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
                      {reminders.map((reminder) => (
                        <div key={reminder.id} className="flex items-center gap-3">
                          <div className={`w-[11px] h-[11px] rounded-full`} style={{ backgroundColor: reminder.status === 'green' ? '#09b600' : reminder.status === 'orange' ? '#ffc130' : '#ff4d4d' }} />
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
                      {quarterlyPriorities.map((priority) => (
                        <div key={priority.id} className="flex items-center gap-3">
                          <div className={`w-[11px] h-[11px] rounded-full`} style={{ backgroundColor: priority.status === 'green' ? '#09b600' : priority.status === 'orange' ? '#ffc130' : '#ff4d4d' }} />
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
                      }} />
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[#172a41] text-base tracking-[-0.16px] leading-[1.3] flex-1">
                        {kpi.label}
                      </span>
                      <div className="flex items-center gap-1">
                        <CheckIcon className="w-3.5 h-3.5 text-[#09b600]" />
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b700] text-sm">
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
                  <span className="ml-auto [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px] tracking-[-0.13px]">
                    Add new +
                  </span>
                </div>
                
                <div className="flex flex-col gap-3">
                  {actions.map((action, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-[19px] h-[19px] rounded-full border-2 border-gray-300" />
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px] tracking-[-0.13px] leading-[1.3]">
                        {action.text}
                      </span>
                    </div>
                  ))}
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
                          <div key={i} className="w-[29px] h-[29px] bg-transparent border border-[rgba(215,215,215,0.01)] rounded-lg shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]" />
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
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px] tracking-[-0.13px]">
                    Contact Renegade for a Mentoring Session.
                  </p>
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
                  {resources.map((resource, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-[19px] h-[19px] rounded-full border-2 border-gray-300" />
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px] tracking-[-0.13px] leading-[1.3]">
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
