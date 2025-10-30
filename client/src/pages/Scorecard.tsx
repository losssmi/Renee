import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ScorecardRow {
  title: string;
  goal: string;
  weeklyValues: string[];
  total: string;
  variance: string;
}

export function Scorecard() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Generate week dates (example dates for Q1)
  const weekDates = [
    "06/01/2025", "13/01/2025", "20/01/2025", "27/01/2025",
    "03/02/2025", "10/02/2025", "17/02/2025", "24/02/2025",
    "03/03/2025", "10/03/2025", "17/03/2025", "24/03/2025"
  ];

  const [inputs, setInputs] = useState<ScorecardRow[]>([
    { title: "Calls", goal: "", weeklyValues: Array(12).fill(""), total: "", variance: "" },
    { title: "Connects", goal: "150/week", weeklyValues: Array(12).fill(""), total: "", variance: "" },
    { title: "Database (additions)", goal: "25/week", weeklyValues: Array(12).fill(""), total: "0", variance: "" },
    { title: "BAP (conducted)", goal: "8/week", weeklyValues: Array(12).fill(""), total: "", variance: "" },
    { title: "MAP (conducted)", goal: "3/week", weeklyValues: Array(12).fill(""), total: "", variance: "" },
    { title: "LAP (conducted)", goal: "1/week", weeklyValues: Array(12).fill(""), total: "", variance: "" },
  ]);

  const [pipeline, setPipeline] = useState<ScorecardRow[]>([
    { title: "Prospects", goal: "50", weeklyValues: Array(12).fill(""), total: "", variance: "" },
    { title: "Pipeline", goal: "30", weeklyValues: Array(12).fill(""), total: "", variance: "" },
    { title: "Hot Stock", goal: "10", weeklyValues: Array(12).fill(""), total: "", variance: "" },
    { title: "Hot Buyers", goal: "10", weeklyValues: Array(12).fill(""), total: "", variance: "" },
  ]);

  const [outputs, setOutputs] = useState<ScorecardRow[]>([
    { title: "New Listings", goal: "3/quarter", weeklyValues: Array(12).fill(""), total: "0", variance: "" },
    { title: "Off Market", goal: "", weeklyValues: Array(12).fill(""), total: "0", variance: "" },
    { title: "On Market", goal: "", weeklyValues: Array(12).fill(""), total: "0", variance: "" },
    { title: "Withdrawals", goal: "", weeklyValues: Array(12).fill(""), total: "0", variance: "" },
    { title: "Sales", goal: "6/quarter", weeklyValues: Array(12).fill(""), total: "0", variance: "" },
    { title: "Purchases", goal: "6/quarter", weeklyValues: Array(12).fill(""), total: "0", variance: "" },
  ]);

  const [marketing, setMarketing] = useState<ScorecardRow[]>([
    { title: "Newsletter", goal: "Sent Y/N", weeklyValues: Array(12).fill(""), total: "0", variance: "" },
    { title: "DLs", goal: "Sent Y/N", weeklyValues: Array(12).fill(""), total: "0", variance: "" },
    { title: "Socials", goal: "3/week", weeklyValues: Array(12).fill(""), total: "0", variance: "" },
  ]);

  const updateRow = (section: 'inputs' | 'pipeline' | 'outputs' | 'marketing', rowIndex: number, field: keyof ScorecardRow, value: string, weekIndex?: number) => {
    const sectionMap = { inputs, pipeline, outputs, marketing };
    const setterMap = { inputs: setInputs, pipeline: setPipeline, outputs: setOutputs, marketing: setMarketing };
    
    const updated = [...sectionMap[section]];
    if (field === 'weeklyValues' && weekIndex !== undefined) {
      const newWeeklyValues = [...updated[rowIndex].weeklyValues];
      newWeeklyValues[weekIndex] = value;
      updated[rowIndex] = { ...updated[rowIndex], weeklyValues: newWeeklyValues };
    } else if (field !== 'weeklyValues') {
      updated[rowIndex] = { ...updated[rowIndex], [field]: value };
    }
    setterMap[section](updated);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Saved",
      description: "Your scorecard has been saved.",
    });
  };

  const renderSection = (title: string, data: ScorecardRow[], section: 'inputs' | 'pipeline' | 'outputs' | 'marketing') => (
    <div className="mb-6">
      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3 uppercase">
        {title}
      </h3>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-[200px_100px_repeat(12,80px)_80px_80px] gap-2 items-center mb-2 border-b border-gray-100 pb-2">
          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
            {row.title}
          </span>
          <Input
            value={row.goal}
            onChange={(e) => updateRow(section, rowIndex, 'goal', e.target.value)}
            disabled={!isEditing}
            className="h-8 text-xs text-center"
            data-testid={`input-${section}-goal-${rowIndex}`}
          />
          {row.weeklyValues.map((value, weekIndex) => (
            <Input
              key={weekIndex}
              value={value}
              onChange={(e) => updateRow(section, rowIndex, 'weeklyValues', e.target.value, weekIndex)}
              disabled={!isEditing}
              className="h-8 text-xs text-center"
              data-testid={`input-${section}-week-${rowIndex}-${weekIndex}`}
            />
          ))}
          <Input
            value={row.total}
            onChange={(e) => updateRow(section, rowIndex, 'total', e.target.value)}
            disabled={!isEditing}
            className="h-8 text-xs text-center bg-gray-50"
            data-testid={`input-${section}-total-${rowIndex}`}
          />
          <Input
            value={row.variance}
            onChange={(e) => updateRow(section, rowIndex, 'variance', e.target.value)}
            disabled={!isEditing}
            className="h-8 text-xs text-center"
            data-testid={`input-${section}-variance-${rowIndex}`}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
        data-testid="button-mobile-menu"
      >
        {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      {/* Sidebar - hidden on mobile, shown on desktop */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-[263px] flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SideBarSection onNavigate={() => setMobileMenuOpen(false)} />
      </aside>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col bg-[#f5f5f5] w-full lg:w-auto">
        <DashboardHeaderSection />
        
        <div className="px-6 py-5 bg-[#f5f5f5]">
          <div className="flex items-center justify-between">
            <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-snug">
              Scorecard
            </h1>
            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-3 py-1 border border-[#ededed] rounded-lg bg-white hover:bg-gray-50 transition-colors"
              data-testid="button-edit-scorecard"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <img className="w-6 h-6" alt="Scorecard" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                  Weekly Metrics
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                {/* Header Row */}
                <div className="grid grid-cols-[200px_100px_repeat(12,80px)_80px_80px] gap-2 mb-4 pb-2 border-b-2 border-gray-200">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Title</span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs text-center">Goal</span>
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Week {i + 1}</span>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-[10px]">{weekDates[i]}</span>
                    </div>
                  ))}
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs text-center">Total</span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs text-center">Variance</span>
                </div>

                {renderSection("INPUTS", inputs, 'inputs')}
                {renderSection("PIPELINE", pipeline, 'pipeline')}
                {renderSection("OUTPUTS", outputs, 'outputs')}
                {renderSection("MARKETING", marketing, 'marketing')}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
