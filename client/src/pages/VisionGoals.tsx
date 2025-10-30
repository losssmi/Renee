import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

 

interface Value {
  name: string;
  description: string;
}

interface YearTarget {
  year: string;
  totalGCI: string;
  numberOfSales: string;
  avSalePrice: string;
  avCommRate: string;
  commSplit: string;
  avGCI: string;
  grossIncome: string;
  hourlyRate: string;
  teamSize: string;
}

interface QuarterTarget {
  quarter: string;
  totalGCI: string;
  numberOfSales: string;
  avSalePrice: string;
  avCommRate: string;
  avGCI: string;
  grossIncome: string;
  hourlyRate: string;
}

export function VisionGoals() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [vision, setVision] = useState("");
  const [coreFocus, setCoreFocus] = useState("");
  
  const [values, setValues] = useState<Value[]>([
    { name: "Value 1", description: "" },
    { name: "Value 2", description: "" },
    { name: "Value 3", description: "" },
    { name: "Value 4", description: "" },
    { name: "Value 5", description: "" },
  ]);

  const [tenYearPlan, setTenYearPlan] = useState("");
  
  const [strengthsText, setStrengthsText] = useState("");
  const [weaknessesText, setWeaknessesText] = useState("");
  const [opportunitiesText, setOpportunitiesText] = useState("");
  const [threatsText, setThreatsText] = useState("");
  
  const [threeYearTargets, setThreeYearTargets] = useState<YearTarget[]>([
    {
      year: "2025",
      totalGCI: "500,000",
      numberOfSales: "6",
      avSalePrice: "5,000,000",
      avCommRate: "1.65%",
      commSplit: "30%",
      avGCI: "82,500",
      grossIncome: "150,000",
      hourlyRate: "250",
      teamSize: "1",
    },
    {
      year: "2026",
      totalGCI: "750,000",
      numberOfSales: "9",
      avSalePrice: "5,000,000",
      avCommRate: "1.65%",
      commSplit: "40%",
      avGCI: "82,500",
      grossIncome: "300,000",
      hourlyRate: "375",
      teamSize: "1",
    },
    {
      year: "2027",
      totalGCI: "1,125,000",
      numberOfSales: "14",
      avSalePrice: "5,000,000",
      avCommRate: "1.65%",
      commSplit: "50%",
      avGCI: "82,500",
      grossIncome: "562,500",
      hourlyRate: "563",
      teamSize: "2",
    },
  ]);

  const [ninetyDayTargets, setNinetyDayTargets] = useState<QuarterTarget[]>([
    {
      quarter: "Q1",
      totalGCI: "125,000",
      numberOfSales: "2",
      avSalePrice: "5,000,000",
      avCommRate: "1.65%",
      avGCI: "82,500",
      grossIncome: "37,500",
      hourlyRate: "63",
    },
    {
      quarter: "Q2",
      totalGCI: "125,000",
      numberOfSales: "2",
      avSalePrice: "5,000,000",
      avCommRate: "1.65%",
      avGCI: "82,500",
      grossIncome: "37,500",
      hourlyRate: "63",
    },
    {
      quarter: "Q3",
      totalGCI: "125,000",
      numberOfSales: "2",
      avSalePrice: "5,000,000",
      avCommRate: "1.65%",
      avGCI: "82,500",
      grossIncome: "37,500",
      hourlyRate: "63",
    },
    {
      quarter: "Q4",
      totalGCI: "125,000",
      numberOfSales: "2",
      avSalePrice: "5,000,000",
      avCommRate: "1.65%",
      avGCI: "82,500",
      grossIncome: "37,500",
      hourlyRate: "63",
    },
  ]);
  
  const [isEditingVision, setIsEditingVision] = useState(false);
  const [isEditingGoals, setIsEditingGoals] = useState(false);

  const handleSaveVision = () => {
    setIsEditingVision(false);
    toast({
      title: "Saved",
      description: "Your vision has been saved.",
    });
  };

  const handleSaveGoals = () => {
    setIsEditingGoals(false);
    toast({
      title: "Saved",
      description: "Your goals have been saved.",
    });
  };

  // Helpers for Goals calculations and formatting
  const parseNumber = (value: string): number => {
    if (!value) return 0;
    const cleaned = value.toString().replace(/[^0-9.\-]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const parsePercent = (value: string): number => {
    if (!value) return 0;
    const cleaned = value.toString().replace(/[^0-9.\-]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed / 100;
  };

  const formatNumber = (num: number): string => {
    if (!isFinite(num)) return "0";
    return Math.round(num).toLocaleString();
  };

  const formatMoney = (num: number): string => formatNumber(num);
  const formatPercent = (num: number): string => `${(num * 100).toFixed(0)}%`;

  const computeAvgGci = (totalGci: string, sales: string): string => {
    const gci = parseNumber(totalGci);
    const n = parseNumber(sales);
    if (n <= 0) return "";
    return formatMoney(gci / n);
  };

  const computeNetIncome = (grossIncome: string, splitPercent: string): string => {
    const gross = parseNumber(grossIncome);
    const split = parsePercent(splitPercent);
    return formatMoney(gross * (1 - split));
  };

  const findYearIndex = (idx: number): number => idx; // placeholder if structure changes later

 

  const updateValue = (index: number, field: 'name' | 'description', value: string) => {
    const updated = [...values];
    updated[index] = { ...updated[index], [field]: value };
    setValues(updated);
  };

  const updateThreeYearTarget = (yearIndex: number, field: keyof YearTarget, value: string) => {
    const updated = [...threeYearTargets];
    updated[yearIndex] = { ...updated[yearIndex], [field]: value };
    setThreeYearTargets(updated);
  };

  const updateNinetyDayTarget = (quarterIndex: number, field: keyof QuarterTarget, value: string) => {
    const updated = [...ninetyDayTargets];
    updated[quarterIndex] = { ...updated[quarterIndex], [field]: value };
    setNinetyDayTargets(updated);
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
        
        <Tabs defaultValue="vision" className="flex-1 flex flex-col">
          <div className="px-6 py-5 bg-[#f5f5f5]">
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto mb-4">
              <TabsTrigger 
                value="vision" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2"
                data-testid="tab-vision"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Vision</span>
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2"
                data-testid="tab-goals"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Goals</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="vision" className="flex-1 mt-0">
            <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
              <div className="flex items-center justify-between -mt-4 mb-2">
                <div className="flex flex-col gap-2">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                    Define the destination before you start the journey.
                  </p>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                    Every high-performing business begins with a clear vision. It gives direction to daily effort and keeps every decision aligned to a shared future.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    if (isEditingVision) {
                      handleSaveVision();
                    } else {
                      setIsEditingVision(true);
                    }
                  }}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-3 py-1 border border-[#ededed] rounded-lg bg-white hover:bg-gray-50 transition-colors" 
                  data-testid="button-edit-vision"
                >
                  {isEditingVision ? "Save" : "Edit"}
                </button>
              </div>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                          Vision
                        </span>
                      </div>
                      <Textarea
                        value={vision}
                        onChange={(e) => setVision(e.target.value)}
                        placeholder="Describe your ultimate destination..."
                        disabled={!isEditingVision}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[80px] p-3 bg-gray-50 rounded border border-gray-200"
                        data-testid="input-vision"
                      />
                      
                    </div>

                    <div>
                      <div className="mb-2">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                          Core Focus
                        </span>
                      </div>
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px] mb-2">
                        Clarify what you’re building, why it matters, and where it’s going.
                      </p>
                      <Input
                        value={coreFocus}
                        onChange={(e) => setCoreFocus(e.target.value)}
                        placeholder="Enter your core focus..."
                        disabled={!isEditingVision}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm p-2 bg-gray-50 rounded border border-gray-200"
                        data-testid="input-core-focus"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Values
                    </h2>
                  </div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px] mb-4">
                    Define the standards you live and lead by. These become the cultural foundation for your hiring, performance, and client experience.
                  </p>
                  
                  <div className="space-y-4">
                    {values.map((value, index) => (
                      <div key={index} className="grid grid-cols-5 gap-4 items-start">
                        <select
                          onChange={(e) => updateValue(index, 'name', e.target.value)}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm p-2 bg-gray-50 rounded border border-gray-200"
                          data-testid={`select-value-sample-${index}`}
                          defaultValue=""
                        >
                          <option value="" disabled>Sample</option>
                          <option value="Honesty">Honesty</option>
                          <option value="Excellence">Excellence</option>
                          <option value="Accountability">Accountability</option>
                          <option value="Service">Service</option>
                          <option value="Innovation">Innovation</option>
                        </select>
                        <Input
                          value={value.name}
                          onChange={(e) => updateValue(index, 'name', e.target.value)}
                          placeholder={`Value ${index + 1}`}
                          disabled={!isEditingVision}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm"
                          data-testid={`input-value-name-${index}`}
                        />
                        <Input
                          value={value.description}
                          onChange={(e) => updateValue(index, 'description', e.target.value)}
                          placeholder="Description"
                          disabled={!isEditingVision}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm col-span-3"
                          data-testid={`input-value-description-${index}`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      SWOT
                    </h2>
                  </div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px] mb-4">
                    See your position clearly — where you excel, what holds you back, and where to play next.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">
                        Strengths
                      </h3>
                      <Textarea
                        value={strengthsText}
                        onChange={(e) => setStrengthsText(e.target.value)}
                        placeholder="List your strengths..."
                        disabled={!isEditingVision}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[100px] p-3 bg-gray-50 rounded border border-gray-200"
                        data-testid="textarea-strengths"
                      />
                    </div>

                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">
                        Weaknesses
                      </h3>
                      <Textarea
                        value={weaknessesText}
                        onChange={(e) => setWeaknessesText(e.target.value)}
                        placeholder="List your weaknesses..."
                        disabled={!isEditingVision}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[100px] p-3 bg-gray-50 rounded border border-gray-200"
                        data-testid="textarea-weaknesses"
                      />
                    </div>

                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">
                        Opportunities
                      </h3>
                      <Textarea
                        value={opportunitiesText}
                        onChange={(e) => setOpportunitiesText(e.target.value)}
                        placeholder="List your opportunities..."
                        disabled={!isEditingVision}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[100px] p-3 bg-gray-50 rounded border border-gray-200"
                        data-testid="textarea-opportunities"
                      />
                    </div>

                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">
                        Threats
                      </h3>
                      <Textarea
                        value={threatsText}
                        onChange={(e) => setThreatsText(e.target.value)}
                        placeholder="List your threats..."
                        disabled={!isEditingVision}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[100px] p-3 bg-gray-50 rounded border border-gray-200"
                        data-testid="textarea-threats"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      10 Year Plan
                    </h2>
                  </div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px] mb-1">
                    Write the story of your future. Think big, then reverse-engineer it.
                  </p>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px] mb-4">
                    Where do you want your business, team, and life to be in 10 years? What impact will you have? What will success look and feel like?
                  </p>
                  
                  <Textarea
                    value={tenYearPlan}
                    onChange={(e) => setTenYearPlan(e.target.value)}
                    placeholder="Describe your 10-year vision..."
                    disabled={!isEditingVision}
                    className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[100px] p-3 bg-gray-50 rounded border border-gray-200"
                    data-testid="input-ten-year-plan"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="flex-1 mt-0">
            <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
              <div className="flex items-center justify-between -mt-4 mb-2">
                <div className="flex flex-col gap-2">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[0] leading-[21px]">
                    Turn your vision into measurable momentum.
                  </p>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[0] leading-[21px]">
                    Define the numbers that will guide your next three years, then break them down into achievable 90-day outcomes.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    if (isEditingGoals) {
                      handleSaveGoals();
                    } else {
                      setIsEditingGoals(true);
                    }
                  }}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-3 py-1 border border-[#ededed] rounded-lg bg-white hover:bg-gray-50 transition-colors" 
                  data-testid="button-edit-goals"
                >
                  {isEditingGoals ? "Save" : "Edit"}
                </button>
              </div>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      3 Year Plan
                    </h2>
                  </div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px] mb-4">
                    Map your growth trajectory across the next three years. Set clear financial, sales and performance targets.
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left pb-2 pr-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Metric</span>
                          </th>
                          {threeYearTargets.map((target, index) => (
                            <th key={index} className="text-left pb-2 px-2">
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">{target.year} Targets</span>
                            </th>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Net Income (after split)</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={computeNetIncome(threeYearTargets[index].grossIncome, threeYearTargets[index].commSplit)}
                                disabled
                                className="h-8 text-left text-xs bg-gray-50"
                                data-testid={`input-3year-netincome-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-1 pr-4"></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-1 px-2">
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[10px] text-[#4e657f]">Calculated from Gross Income ÷ Estimated Hours Worked (38 hours)</span>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Growth Total GCI (first → last)</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2 align-middle">
                              {index === threeYearTargets.length - 1 ? (
                                (() => {
                                  const first = parseNumber(threeYearTargets[0].totalGCI);
                                  const last = parseNumber(threeYearTargets[threeYearTargets.length - 1].totalGCI);
                                  const pct = first > 0 ? (last - first) / first : 0;
                                  return <span className="text-xs text-[#172a41]">{formatPercent(pct)}</span>;
                                })()
                              ) : null}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Growth Net Income (first → last)</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2 align-middle">
                              {index === threeYearTargets.length - 1 ? (
                                (() => {
                                  const first = computeNetIncome(threeYearTargets[0].grossIncome, threeYearTargets[0].commSplit);
                                  const last = computeNetIncome(threeYearTargets[threeYearTargets.length - 1].grossIncome, threeYearTargets[threeYearTargets.length - 1].commSplit);
                                  const firstNum = parseNumber(first);
                                  const lastNum = parseNumber(last);
                                  const pct = firstNum > 0 ? (lastNum - firstNum) / firstNum : 0;
                                  return <span className="text-xs text-[#172a41]">{formatPercent(pct)}</span>;
                                })()
                              ) : null}
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Total GCI</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={threeYearTargets[index].totalGCI}
                                onChange={(e) => updateThreeYearTarget(index, 'totalGCI', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-3year-gci-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Number of Sales</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={threeYearTargets[index].numberOfSales}
                                onChange={(e) => updateThreeYearTarget(index, 'numberOfSales', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-3year-sales-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Av. Sale Price</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={threeYearTargets[index].avSalePrice}
                                onChange={(e) => updateThreeYearTarget(index, 'avSalePrice', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-3year-price-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Av. Comm Rate</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={threeYearTargets[index].avCommRate}
                                onChange={(e) => updateThreeYearTarget(index, 'avCommRate', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-3year-commrate-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Comm. Split</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={threeYearTargets[index].commSplit}
                                onChange={(e) => updateThreeYearTarget(index, 'commSplit', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-3year-split-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Av. GCI</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={computeAvgGci(threeYearTargets[index].totalGCI, threeYearTargets[index].numberOfSales)}
                                disabled
                                className="h-8 text-left text-xs bg-gray-50"
                                data-testid={`input-3year-avgci-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Gross Income</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={threeYearTargets[index].grossIncome}
                                onChange={(e) => updateThreeYearTarget(index, 'grossIncome', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-3year-income-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Hourly rate</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={threeYearTargets[index].hourlyRate}
                                onChange={(e) => updateThreeYearTarget(index, 'hourlyRate', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-3year-hourly-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Team Size</span></td>
                          {threeYearTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={threeYearTargets[index].teamSize}
                                onChange={(e) => updateThreeYearTarget(index, 'teamSize', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-3year-team-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      90 Day Plan
                    </h2>
                  </div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px] mb-4">
                    Translate long-term goals into actionable quarterly targets that keep you focused and on track.
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left pb-2 pr-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Metric</span>
                          </th>
                          {ninetyDayTargets.map((target, index) => (
                            <th key={index} className="text-left pb-2 px-2">
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">{target.quarter}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Total GCI</span></td>
                          {ninetyDayTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={ninetyDayTargets[index].totalGCI}
                                onChange={(e) => updateNinetyDayTarget(index, 'totalGCI', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-90day-gci-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Number of Sales</span></td>
                          {ninetyDayTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={ninetyDayTargets[index].numberOfSales}
                                onChange={(e) => updateNinetyDayTarget(index, 'numberOfSales', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-90day-sales-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Av. Sale Price</span></td>
                          {ninetyDayTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={ninetyDayTargets[index].avSalePrice}
                                onChange={(e) => updateNinetyDayTarget(index, 'avSalePrice', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-90day-price-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Av. Comm Rate</span></td>
                          {ninetyDayTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={ninetyDayTargets[index].avCommRate}
                                onChange={(e) => updateNinetyDayTarget(index, 'avCommRate', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-90day-commrate-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Av. GCI</span></td>
                          {ninetyDayTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={ninetyDayTargets[index].avGCI}
                                onChange={(e) => updateNinetyDayTarget(index, 'avGCI', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-90day-avgci-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Gross Income</span></td>
                          {ninetyDayTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={ninetyDayTargets[index].grossIncome}
                                onChange={(e) => updateNinetyDayTarget(index, 'grossIncome', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-90day-income-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">Hourly rate</span></td>
                          {ninetyDayTargets.map((_, index) => (
                            <td key={index} className="py-2 px-2">
                              <Input
                                value={ninetyDayTargets[index].hourlyRate}
                                onChange={(e) => updateNinetyDayTarget(index, 'hourlyRate', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-left text-xs"
                                data-testid={`input-90day-hourly-${index}`}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="py-2 pr-4 align-top"><span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Annualised Projection</span></td>
                          <td className="py-2 px-2" colSpan={ninetyDayTargets.length}>
                            {(() => {
                              const sum = (arr: string[]) => arr.reduce((acc, v) => acc + parseNumber(v), 0);
                              const avg = (arr: string[]) => arr.length ? sum(arr) / arr.length : 0;
                              const gci = sum(ninetyDayTargets.map(t => t.totalGCI));
                              const sales = sum(ninetyDayTargets.map(t => t.numberOfSales));
                              const avPrice = avg(ninetyDayTargets.map(t => t.avSalePrice));
                              const avComm = avg(ninetyDayTargets.map(t => t.avCommRate));
                              const avGci = sum(ninetyDayTargets.map(t => t.avGCI));
                              const gross = sum(ninetyDayTargets.map(t => t.grossIncome));
                              const hourly = avg(ninetyDayTargets.map(t => t.hourlyRate));
                              return (
                                <div className="flex flex-wrap gap-4 text-xs text-[#172a41]">
                                  <span>Total GCI: {formatMoney(gci * 4)}</span>
                                  <span>Sales: {formatNumber(sales * 4)}</span>
                                  <span>Av. Sale Price: {formatMoney(avPrice)}</span>
                                  <span>Av. Comm Rate: {Math.round(avComm)}%</span>
                                  <span>Av. GCI: {formatMoney(avGci * 4)}</span>
                                  <span>Gross Income: {formatMoney(gross * 4)}</span>
                                  <span>Hourly Rate: {formatMoney(hourly)}</span>
                                </div>
                              );
                            })()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
