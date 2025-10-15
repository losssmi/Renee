import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const initialVisionMetrics = [
  { metric: "GCI", target: "$1,600,000", notes: "" },
  { metric: "Sales", target: "120", notes: "" },
  { metric: "Listings", target: "$500,000", notes: "" },
  { metric: "Team Size", target: "3", notes: "" },
  { metric: "Profit Margin", target: "25%", notes: "" },
  { metric: "Profit Margin", target: "6%", notes: "" },
];

const initialSuggestedTargets = [
  { metric: "SuggestedGCI", target: "$200,000", notes: "" },
  { metric: "SuggestedSales", target: "40", notes: "" },
  { metric: "SuggestedListings", target: "20", notes: "" },
  { metric: "SuggestedPrice", target: "", notes: "" },
  { metric: "Profit Margin", target: "25%", notes: "" },
  { metric: "Market Share", target: "8%", notes: "" },
];

const initialFinalGoals = [
  { metric: "GCI", target: "$400,000", progress: "0%", notes: "" },
  { metric: "Sales", target: "42", progress: "0%", notes: "" },
  { metric: "Listings", target: "22", progress: "0%", notes: "" },
  { metric: "Avg. Sale Price", target: "$750,000", progress: "0%", notes: "" },
  { metric: "Team Size", target: "2", progress: "0%", notes: "" },
  { metric: "Profit Margin", target: "25%", progress: "0%", notes: "" },
  { metric: "Profit Margin", target: "6%", progress: "0%", notes: "" },
];

export function VisionGoals() {
  const { toast } = useToast();
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [coreFocus, setCoreFocus] = useState("");
  const [usp, setUSP] = useState("");
  const [values, setValues] = useState<string[]>(["Integrity", "Growth", "Client First", "Innovation"]);
  const [newValue, setNewValue] = useState("");
  
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [opportunities, setOpportunities] = useState("");
  const [threats, setThreats] = useState("");
  
  const [bhag, setBhag] = useState("");
  
  const [visionMetrics, setVisionMetrics] = useState(initialVisionMetrics);
  const [suggestedTargets, setSuggestedTargets] = useState(initialSuggestedTargets);
  const [finalGoals, setFinalGoals] = useState(initialFinalGoals);
  
  const [isEditingVision, setIsEditingVision] = useState(false);
  const [isEditingGoals, setIsEditingGoals] = useState(false);

  const addValue = () => {
    if (newValue.trim() && values.length < 6) {
      setValues([...values, newValue.trim()]);
      setNewValue("");
    }
  };

  const removeValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

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

  const updateVisionMetric = (index: number, field: 'target' | 'notes', value: string) => {
    const updated = [...visionMetrics];
    updated[index] = { ...updated[index], [field]: value };
    setVisionMetrics(updated);
  };

  const updateSuggestedTarget = (index: number, field: 'target' | 'notes', value: string) => {
    const updated = [...suggestedTargets];
    updated[index] = { ...updated[index], [field]: value };
    setSuggestedTargets(updated);
  };

  const updateFinalGoal = (index: number, field: 'target' | 'progress' | 'notes', value: string) => {
    const updated = [...finalGoals];
    updated[index] = { ...updated[index], [field]: value };
    setFinalGoals(updated);
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
                    Define your direction, clarify your purpose, and align your growth.
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

              <div className="flex gap-4">
                <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <img className="w-6 h-6" alt="Purpose & Direction" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                      <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                        Purpose & Direction
                      </h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="mb-2">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                            Vision:
                          </span>
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3] ml-2">
                            Your ultimate destination — what success looks like in 10 years.
                          </span>
                        </div>
                        {isEditingVision ? (
                          <Textarea
                            value={vision}
                            onChange={(e) => setVision(e.target.value)}
                            placeholder='Add your vision here...'
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[80px] ml-16 p-3 bg-gray-50 rounded border border-gray-200"
                            data-testid="input-vision"
                          />
                        ) : (
                          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.5] ml-16 p-3 bg-gray-50 rounded border border-gray-200 min-h-[80px]">
                            {vision || 'Click Edit to add your vision...'}
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="mb-2">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                            Mission:
                          </span>
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3] ml-2">
                            Your promise and focus — how you'll get there.
                          </span>
                        </div>
                        {isEditingVision ? (
                          <Textarea
                            value={mission}
                            onChange={(e) => setMission(e.target.value)}
                            placeholder='Add your mission here...'
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[80px] ml-16 p-3 bg-gray-50 rounded border border-gray-200"
                            data-testid="input-mission"
                          />
                        ) : (
                          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.5] ml-16 p-3 bg-gray-50 rounded border border-gray-200 min-h-[80px]">
                            {mission || 'Click Edit to add your mission...'}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <img className="w-6 h-6" alt="Core Identity" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                      <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                        Core Identity
                      </h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                            Core Focus:
                          </span>
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3] ml-2">
                            What do you do best? What's your niche?
                          </span>
                        </div>
                        {isEditingVision ? (
                          <Input
                            value={coreFocus}
                            onChange={(e) => setCoreFocus(e.target.value)}
                            placeholder='Add your core focus...'
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm ml-16 p-2 bg-gray-50 rounded border border-gray-200"
                            data-testid="input-core-focus"
                          />
                        ) : (
                          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.5] ml-16 p-2 bg-gray-50 rounded border border-gray-200">
                            {coreFocus || 'Click Edit to add your core focus...'}
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="mb-2">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                            USP:
                          </span>
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3] ml-2">
                            Why you're different.
                          </span>
                        </div>
                        {isEditingVision ? (
                          <Input
                            value={usp}
                            onChange={(e) => setUSP(e.target.value)}
                            placeholder='Add your USP...'
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm ml-16 p-2 bg-gray-50 rounded border border-gray-200"
                            data-testid="input-usp"
                          />
                        ) : (
                          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.5] ml-16 p-2 bg-gray-50 rounded border border-gray-200">
                            {usp || 'Click Edit to add your USP...'}
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="mb-2">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                            Values:
                          </span>
                        </div>
                        <div className="flex gap-2 flex-wrap ml-16">
                          {values.map((value, index) => (
                            <div key={index} className="relative group">
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[10px] tracking-[-0.1px] px-2 py-1 bg-[#e8ffe6] border border-[#c6ffc1] rounded shadow-[inset_0px_0px_4px_rgba(0,0,0,0.1)]">
                                {value}
                              </span>
                              {isEditingVision && (
                                <button
                                  onClick={() => removeValue(index)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                  data-testid={`button-remove-value-${index}`}
                                >
                                  <X className="w-2.5 h-2.5" />
                                </button>
                              )}
                            </div>
                          ))}
                          {isEditingVision && values.length < 6 && (
                            <div className="flex gap-1">
                              <Input
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addValue()}
                                placeholder="Add value..."
                                className="h-7 text-xs w-24"
                                data-testid="input-new-value"
                              />
                              <Button onClick={addValue} size="sm" className="h-7 px-2 text-xs" data-testid="button-add-value">+</Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <img className="w-6 h-6" alt="SWOT Overview" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      SWOT Overview
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                        Strengths
                      </h3>
                      {isEditingVision ? (
                        <Textarea
                          value={strengths}
                          onChange={(e) => setStrengths(e.target.value)}
                          placeholder='Add strengths...'
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs min-h-[100px]"
                          data-testid="input-strengths"
                        />
                      ) : (
                        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs tracking-[-0.1px] leading-[1.3] min-h-[100px]">
                          {strengths || 'Click Edit to add...'}
                        </p>
                      )}
                    </div>

                    <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                        Weaknesses
                      </h3>
                      {isEditingVision ? (
                        <Textarea
                          value={weaknesses}
                          onChange={(e) => setWeaknesses(e.target.value)}
                          placeholder='Add weaknesses...'
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs min-h-[100px]"
                          data-testid="input-weaknesses"
                        />
                      ) : (
                        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs tracking-[-0.1px] leading-[1.3] min-h-[100px]">
                          {weaknesses || 'Click Edit to add...'}
                        </p>
                      )}
                    </div>

                    <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                        Opportunities
                      </h3>
                      {isEditingVision ? (
                        <Textarea
                          value={opportunities}
                          onChange={(e) => setOpportunities(e.target.value)}
                          placeholder='Add opportunities...'
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs min-h-[100px]"
                          data-testid="input-opportunities"
                        />
                      ) : (
                        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs tracking-[-0.1px] leading-[1.3] min-h-[100px]">
                          {opportunities || 'Click Edit to add...'}
                        </p>
                      )}
                    </div>

                    <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                        Threats
                      </h3>
                      {isEditingVision ? (
                        <Textarea
                          value={threats}
                          onChange={(e) => setThreats(e.target.value)}
                          placeholder='Add threats...'
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs min-h-[100px]"
                          data-testid="input-threats"
                        />
                      ) : (
                        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs tracking-[-0.1px] leading-[1.3] min-h-[100px]">
                          {threats || 'Click Edit to add...'}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <img className="w-6 h-6" alt="BHAG" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      BHAG (Big Hairy Audacious Goal)
                    </h2>
                  </div>
                  
                  <div>
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3] mb-2">
                      Your 10-year game-changer.
                    </p>
                    {isEditingVision ? (
                      <Textarea
                        value={bhag}
                        onChange={(e) => setBhag(e.target.value)}
                        placeholder='Add your BHAG...'
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[60px] p-3 bg-gray-50 rounded border border-gray-200"
                        data-testid="input-bhag"
                      />
                    ) : (
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.5] p-3 bg-gray-50 rounded border border-gray-200 min-h-[60px]">
                        {bhag || 'Click Edit to add your BHAG...'}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="flex-1 mt-0">
            <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
              <div className="flex items-center justify-between -mt-4 mb-2">
                <div className="flex flex-col gap-2">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                    Set your 5-year vision, align your 1-year plan, and commit to clear, measurable outcomes.
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

              <div className="flex gap-4">
                <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <img className="w-6 h-6" alt="3-Year Vision" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                      <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                        3-Year Vision
                      </h2>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Metric</span>
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Target</span>
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Notes</span>
                      </div>
                      {visionMetrics.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 items-center">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">{item.metric}</span>
                          <Input
                            value={item.target}
                            onChange={(e) => updateVisionMetric(index, 'target', e.target.value)}
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs h-8"
                            disabled={!isEditingGoals}
                            data-testid={`input-vision-target-${index}`}
                          />
                          <Input
                            value={item.notes}
                            onChange={(e) => updateVisionMetric(index, 'notes', e.target.value)}
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs h-8"
                            disabled={!isEditingGoals}
                            data-testid={`input-vision-notes-${index}`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <img className="w-6 h-6" alt="Suggested 1-Year Targets" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                      <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                        Suggested 1-Year Targets
                      </h2>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Metric</span>
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Target</span>
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Notes</span>
                      </div>
                      {suggestedTargets.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 items-center">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">{item.metric}</span>
                          <Input
                            value={item.target}
                            onChange={(e) => updateSuggestedTarget(index, 'target', e.target.value)}
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs h-8"
                            disabled={!isEditingGoals}
                            data-testid={`input-suggested-target-${index}`}
                          />
                          <Input
                            value={item.notes}
                            onChange={(e) => updateSuggestedTarget(index, 'notes', e.target.value)}
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs h-8"
                            disabled={!isEditingGoals}
                            data-testid={`input-suggested-notes-${index}`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <img className="w-6 h-6" alt="Final 1-Year Goals" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Final 1- Year Goals
                    </h2>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-4 pb-2 border-b border-gray-200">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Metric</span>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Target</span>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Progress</span>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Notes</span>
                    </div>
                    {finalGoals.map((item, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 items-center">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">{item.metric}</span>
                        <Input
                          value={item.target}
                          onChange={(e) => updateFinalGoal(index, 'target', e.target.value)}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs h-8"
                          disabled={!isEditingGoals}
                          data-testid={`input-final-target-${index}`}
                        />
                        <Input
                          value={item.progress}
                          onChange={(e) => updateFinalGoal(index, 'progress', e.target.value)}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs h-8"
                          disabled={!isEditingGoals}
                          data-testid={`input-final-progress-${index}`}
                        />
                        <Input
                          value={item.notes}
                          onChange={(e) => updateFinalGoal(index, 'notes', e.target.value)}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs h-8"
                          disabled={!isEditingGoals}
                          data-testid={`input-final-notes-${index}`}
                        />
                      </div>
                    ))}
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
