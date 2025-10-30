import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VisionMetric {
  label: string;
  value: string;
}

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
  
  const [visionMetrics, setVisionMetrics] = useState<VisionMetric[]>([
    { label: "Total GCI", value: "" },
    { label: "Number of Sales", value: "" },
    { label: "Av. Sale Price", value: "" },
    { label: "Av. Comm Rate", value: "" },
    { label: "Comm. Split", value: "" },
    { label: "Av. GCI", value: "" },
    { label: "Gross Income", value: "" },
    { label: "Hourly rate", value: "" },
    { label: "Team Size", value: "" },
  ]);

  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [coreFocus, setCoreFocus] = useState("");
  const [usp, setUSP] = useState("");
  
  const [values, setValues] = useState<Value[]>([
    { name: "Value 1", description: "" },
    { name: "Value 2", description: "" },
    { name: "Value 3", description: "" },
    { name: "Value 4", description: "" },
    { name: "Value 5", description: "" },
  ]);

  const [tenYearPlan, setTenYearPlan] = useState("");
  
  const [strengths, setStrengths] = useState<string[]>(["", "", ""]);
  const [weaknesses, setWeaknesses] = useState<string[]>(["", "", ""]);
  const [opportunities, setOpportunities] = useState<string[]>(["", "", ""]);
  const [threats, setThreats] = useState<string[]>(["", "", ""]);
  
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

  const updateVisionMetric = (index: number, value: string) => {
    const updated = [...visionMetrics];
    updated[index] = { ...updated[index], value };
    setVisionMetrics(updated);
  };

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

  const updateStrength = (index: number, value: string) => {
    const updated = [...strengths];
    updated[index] = value;
    setStrengths(updated);
  };

  const updateWeakness = (index: number, value: string) => {
    const updated = [...weaknesses];
    updated[index] = value;
    setWeaknesses(updated);
  };

  const updateOpportunity = (index: number, value: string) => {
    const updated = [...opportunities];
    updated[index] = value;
    setOpportunities(updated);
  };

  const updateThreat = (index: number, value: string) => {
    const updated = [...threats];
    updated[index] = value;
    setThreats(updated);
  };

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      <aside className="w-[263px] flex-shrink-0">
        <SideBarSection />
      </aside>

      <main className="flex-1 flex flex-col bg-[#f5f5f5]">
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
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Core Focus
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                          Vision
                        </span>
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-xs tracking-[-0.14px] leading-[1.3] ml-2">
                          Your Ultimate Destination
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
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {visionMetrics.map((metric, index) => (
                          <div key={index}>
                            <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-xs mb-1 block">
                              {metric.label}
                            </label>
                            <Input
                              value={metric.value}
                              onChange={(e) => updateVisionMetric(index, e.target.value)}
                              disabled={!isEditingVision}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm h-8"
                              data-testid={`input-vision-metric-${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                          Mission
                        </span>
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-xs tracking-[-0.14px] leading-[1.3] ml-2">
                          Your Core Purpose
                        </span>
                      </div>
                      <Textarea
                        value={mission}
                        onChange={(e) => setMission(e.target.value)}
                        placeholder="Define your core purpose..."
                        disabled={!isEditingVision}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[60px] p-3 bg-gray-50 rounded border border-gray-200"
                        data-testid="input-mission"
                      />
                    </div>

                    <div>
                      <div className="mb-2">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                          Core Focus
                        </span>
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-xs tracking-[-0.14px] leading-[1.3] ml-2">
                          Your Niche & Expertise
                        </span>
                      </div>
                      <Input
                        value={coreFocus}
                        onChange={(e) => setCoreFocus(e.target.value)}
                        placeholder="Define your niche and expertise..."
                        disabled={!isEditingVision}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm p-2 bg-gray-50 rounded border border-gray-200"
                        data-testid="input-core-focus"
                      />
                    </div>

                    <div>
                      <div className="mb-2">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                          USP
                        </span>
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-xs tracking-[-0.14px] leading-[1.3] ml-2">
                          What Makes You Different?
                        </span>
                      </div>
                      <Input
                        value={usp}
                        onChange={(e) => setUSP(e.target.value)}
                        placeholder="What makes you different..."
                        disabled={!isEditingVision}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm p-2 bg-gray-50 rounded border border-gray-200"
                        data-testid="input-usp"
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
                  
                  <div className="space-y-4">
                    {values.map((value, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 items-start">
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
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">
                        Strengths
                      </h3>
                      <div className="space-y-2">
                        {strengths.map((strength, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-sm mt-2">
                              {index + 1}
                            </span>
                            <Input
                              value={strength}
                              onChange={(e) => updateStrength(index, e.target.value)}
                              placeholder={`Strength ${index + 1}`}
                              disabled={!isEditingVision}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm flex-1"
                              data-testid={`input-strength-${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">
                        Weaknesses
                      </h3>
                      <div className="space-y-2">
                        {weaknesses.map((weakness, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-sm mt-2">
                              {index + 1}
                            </span>
                            <Input
                              value={weakness}
                              onChange={(e) => updateWeakness(index, e.target.value)}
                              placeholder={`Weakness ${index + 1}`}
                              disabled={!isEditingVision}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm flex-1"
                              data-testid={`input-weakness-${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">
                        Opportunities
                      </h3>
                      <div className="space-y-2">
                        {opportunities.map((opportunity, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-sm mt-2">
                              {index + 1}
                            </span>
                            <Input
                              value={opportunity}
                              onChange={(e) => updateOpportunity(index, e.target.value)}
                              placeholder={`Opportunity ${index + 1}`}
                              disabled={!isEditingVision}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm flex-1"
                              data-testid={`input-opportunity-${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">
                        Threats
                      </h3>
                      <div className="space-y-2">
                        {threats.map((threat, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-sm mt-2">
                              {index + 1}
                            </span>
                            <Input
                              value={threat}
                              onChange={(e) => updateThreat(index, e.target.value)}
                              placeholder={`Threat ${index + 1}`}
                              disabled={!isEditingVision}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm flex-1"
                              data-testid={`input-threat-${index}`}
                            />
                          </div>
                        ))}
                      </div>
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
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                    Set your 3-year vision and 90-day plan with clear, measurable outcomes.
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
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left pb-2 pr-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Metric</span>
                          </th>
                          {threeYearTargets.map((target, index) => (
                            <th key={index} className="text-center pb-2 px-2">
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">{target.year} Targets</span>
                            </th>
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                value={threeYearTargets[index].avGCI}
                                onChange={(e) => updateThreeYearTarget(index, 'avGCI', e.target.value)}
                                disabled={!isEditingGoals}
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left pb-2 pr-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Metric</span>
                          </th>
                          {ninetyDayTargets.map((target, index) => (
                            <th key={index} className="text-center pb-2 px-2">
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
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
                                className="h-8 text-center text-xs"
                                data-testid={`input-90day-hourly-${index}`}
                              />
                            </td>
                          ))}
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
