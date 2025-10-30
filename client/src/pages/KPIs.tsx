import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const assessmentQuestions = [
  "Are you focusing on building your client base and learning the basics of prospecting?",
  "Is your growth currently slow, with modest sales volume?",
  "Have you implemented a daily prospecting schedule for lead generation?",
  "Have you established mentorship relationships with at least two experienced agents?",
  "Have you set up and maintained a CRM system?",
  "Are you focusing on basic marketing and learning tools and techniques?",
  "Are you concentrating on learning and small transactions, with heavy reliance on mentors and guidance?",
  "Do you have an administrative assistant or 1 junior agent on your team?",
  "Are you focusing on building systems and expanding prospecting efforts to strengthen client relationships?",
  "Is your sales volume increasing, with a broader market reach?",
  "Have you standardised pipeline stages and implemented CRM tools for sales?",
  "Are you building strong relationships to secure repeat business?",
  "Have you automated routine marketing tasks to save time?",
  "Are you utilising social media, basic digital marketing, and local networking for client acquisition?",
  "Is your prospecting more consistent, targeting higher-value clients, and refining your sales pitch?",
];

export function KPIs() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [responses, setResponses] = useState<Record<number, 'yes' | 'no' | null>>({});

  const setResponse = (index: number, value: 'yes' | 'no') => {
    setResponses({ 
      ...responses, 
      [index]: responses[index] === value ? null : value 
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Saved",
      description: "Your KPI assessments have been saved.",
    });
  };

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
            <div className="flex flex-col gap-2">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-snug">
                Business KPIs
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Track your performance across every department and pinpoint where to focus next.
              </p>
            </div>
            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-3 py-1 border border-[#ededed] rounded-lg bg-white hover:bg-gray-50 transition-colors"
              data-testid="button-edit-kpis"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 bg-[#f5f5f5]">
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <img className="w-6 h-6" alt="KPIs" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                  Stage of Business Growth Assessments
                </h2>
              </div>

              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-4">
                Lead Overview
              </h3>
              
              <div className="space-y-4">
                {/* Header Row */}
                <div className="grid grid-cols-[1fr_50px_50px] gap-4 pb-2 border-b-2 border-gray-200">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">
                    Assessment Question
                  </span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs text-center">
                    Y
                  </span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs text-center">
                    N
                  </span>
                </div>

                {/* Question Rows */}
                {assessmentQuestions.map((question, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-[1fr_50px_50px] gap-4 items-center py-2 border-b border-gray-100"
                  >
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                      {question}
                    </span>
                    <div className="flex justify-center">
                      <Checkbox
                        checked={responses[index] === 'yes'}
                        onCheckedChange={() => setResponse(index, 'yes')}
                        disabled={!isEditing}
                        className="w-5 h-5 data-[state=checked]:bg-[#09b600] data-[state=checked]:border-[#09b600]"
                        data-testid={`checkbox-yes-${index}`}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Checkbox
                        checked={responses[index] === 'no'}
                        onCheckedChange={() => setResponse(index, 'no')}
                        disabled={!isEditing}
                        className="w-5 h-5 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                        data-testid={`checkbox-no-${index}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
