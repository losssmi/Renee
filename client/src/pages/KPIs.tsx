import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const kpiCategories = [
  {
    title: "Marketing",
    kpis: [
      "Marketing Calendar Consistency",
      "Campaign Execution Rate", 
      "Lead Response Time",
      "Asset Library Maintenance"
    ]
  },
  {
    title: "Operations",
    kpis: [
      "Marketing Calendar Consistency",
      "Campaign Execution Rate",
      "Lead Response Time", 
      "Asset Library Maintenance"
    ]
  },
  {
    title: "Prospecting",
    kpis: [
      "Marketing Calendar Consistency",
      "Campaign Execution Rate",
      "Lead Response Time",
      "Asset Library Maintenance"
    ]
  },
  {
    title: "Team",
    kpis: [
      "Marketing Calendar Consistency",
      "Campaign Execution Rate",
      "Lead Response Time",
      "Asset Library Maintenance"
    ]
  },
  {
    title: "Sales",
    kpis: [
      "Marketing Calendar Consistency",
      "Campaign Execution Rate",
      "Lead Response Time",
      "Asset Library Maintenance"
    ]
  },
  {
    title: "Leadership",
    kpis: [
      "Marketing Calendar Consistency",
      "Campaign Execution Rate",
      "Lead Response Time",
      "Asset Library Maintenance"
    ]
  },
  {
    title: "Service",
    kpis: [
      "Marketing Calendar Consistency",
      "Campaign Execution Rate",
      "Lead Response Time",
      "Asset Library Maintenance"
    ]
  },
  {
    title: "Financials",
    kpis: [
      "Marketing Calendar Consistency",
      "Campaign Execution Rate",
      "Lead Response Time",
      "Asset Library Maintenance"
    ]
  }
];

const statusOptions = [
  { label: "Not Present", color: "bg-gray-400" },
  { label: "Emerging", color: "bg-red-500" },
  { label: "Functional", color: "bg-yellow-500" },
  { label: "Embedded", color: "bg-green-500" }
];

export function KPIs() {
  const { toast } = useToast();
  const [kpiStatuses, setKpiStatuses] = useState<Record<string, number>>({});

  const setStatus = (categoryIndex: number, kpiIndex: number, statusIndex: number) => {
    const key = `${categoryIndex}-${kpiIndex}`;
    setKpiStatuses({ ...kpiStatuses, [key]: statusIndex });
  };

  const getStatus = (categoryIndex: number, kpiIndex: number): number | undefined => {
    return kpiStatuses[`${categoryIndex}-${kpiIndex}`];
  };

  const addAction = () => {
    toast({
      title: "Add Action",
      description: "Action feature coming soon.",
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
                Business KPIs
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Track your performance across every department and pinpoint where to focus next.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {statusOptions.map((status, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${status.color}`} />
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
                    {status.label}
                  </span>
                </div>
              ))}
              <button 
                onClick={addAction}
                className="flex items-center gap-1 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs hover:text-[#09b600] transition-colors ml-4"
                data-testid="button-add-action"
              >
                <Plus className="w-4 h-4" />
                Add Action
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 bg-[#f5f5f5]">
          <div className="grid grid-cols-2 gap-4">
            {kpiCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                    {category.title}
                  </h2>
                  
                  <div className="space-y-3">
                    {category.kpis.map((kpi, kpiIndex) => {
                      const currentStatus = getStatus(categoryIndex, kpiIndex);
                      return (
                        <div key={kpiIndex} className="flex items-center justify-between">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                            {kpi}
                          </span>
                          <div className="flex gap-2">
                            {statusOptions.map((status, statusIndex) => (
                              <button
                                key={statusIndex}
                                onClick={() => setStatus(categoryIndex, kpiIndex, statusIndex)}
                                className={`w-4 h-4 rounded-full border-2 transition-all ${
                                  currentStatus === statusIndex 
                                    ? `${status.color} border-gray-800 scale-110` 
                                    : 'bg-gray-200 border-gray-300 hover:border-gray-400'
                                }`}
                                title={status.label}
                                data-testid={`status-${categoryIndex}-${kpiIndex}-${statusIndex}`}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
