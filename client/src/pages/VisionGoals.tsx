import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
  
  const [isEditing, setIsEditing] = useState(false);

  const addValue = () => {
    if (newValue.trim() && values.length < 6) {
      setValues([...values, newValue.trim()]);
      setNewValue("");
    }
  };

  const removeValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Saved",
      description: "Your vision and goals have been saved.",
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
                Vision
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Define your direction, clarify your purpose, and align your growth.
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
              data-testid="button-edit-vision"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
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
                    {isEditing ? (
                      <Textarea
                        value={vision}
                        onChange={(e) => setVision(e.target.value)}
                        placeholder='Example: "To be the most trusted real estate advisor in the region, known for innovation and client care."'
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[80px]"
                        data-testid="input-vision"
                      />
                    ) : (
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.5] ml-16 p-3 bg-gray-50 rounded border border-gray-200 min-h-[80px]">
                        {vision || 'Click Edit to add your vision...'}
                      </p>
                    )}
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3] ml-16 mt-1">
                      Example: "To be the most trusted real estate advisor in the region, known for innovation and client care."
                    </p>
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
                    {isEditing ? (
                      <Textarea
                        value={mission}
                        onChange={(e) => setMission(e.target.value)}
                        placeholder='Example: "To help clients achieve their property goals through insight, integrity, and consistency."'
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[80px]"
                        data-testid="input-mission"
                      />
                    ) : (
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.5] ml-16 p-3 bg-gray-50 rounded border border-gray-200 min-h-[80px]">
                        {mission || 'Click Edit to add your mission...'}
                      </p>
                    )}
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3] ml-16 mt-1">
                      Example: "To help clients achieve their property goals through insight, integrity, and consistency."
                    </p>
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
                    {isEditing ? (
                      <Input
                        value={coreFocus}
                        onChange={(e) => setCoreFocus(e.target.value)}
                        placeholder='Example: "Luxury waterfront listings & investor relations."'
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm"
                        data-testid="input-core-focus"
                      />
                    ) : (
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.5] ml-16 p-2 bg-gray-50 rounded border border-gray-200">
                        {coreFocus || 'Click Edit to add your core focus...'}
                      </p>
                    )}
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3] ml-16 mt-1">
                      Example: "Luxury waterfront listings & investor relations."
                    </p>
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
                    {isEditing ? (
                      <Input
                        value={usp}
                        onChange={(e) => setUSP(e.target.value)}
                        placeholder='Example: "Combining high-end presentation with strategic marketing."'
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm"
                        data-testid="input-usp"
                      />
                    ) : (
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.5] ml-16 p-2 bg-gray-50 rounded border border-gray-200">
                        {usp || 'Click Edit to add your USP...'}
                      </p>
                    )}
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3] ml-16 mt-1">
                      Example: "Combining high-end presentation with strategic marketing."
                    </p>
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
                          {isEditing && (
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
                      {isEditing && values.length < 6 && (
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
                  {isEditing ? (
                    <Textarea
                      value={strengths}
                      onChange={(e) => setStrengths(e.target.value)}
                      placeholder='Example: "Strong local brand"'
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] min-h-[100px]"
                      data-testid="input-strengths"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3]">
                      {strengths || 'Example: "Strong local brand"'}
                    </p>
                  )}
                </div>

                <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                    Weaknesses
                  </h3>
                  {isEditing ? (
                    <Textarea
                      value={weaknesses}
                      onChange={(e) => setWeaknesses(e.target.value)}
                      placeholder='Example: "Limited automation"'
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] min-h-[100px]"
                      data-testid="input-weaknesses"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3]">
                      {weaknesses || 'Example: "Limited automation"'}
                    </p>
                  )}
                </div>

                <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                    Opportunities
                  </h3>
                  {isEditing ? (
                    <Textarea
                      value={opportunities}
                      onChange={(e) => setOpportunities(e.target.value)}
                      placeholder='"New luxury developments"'
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] min-h-[100px]"
                      data-testid="input-opportunities"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3]">
                      {opportunities || '"New luxury developments"'}
                    </p>
                  )}
                </div>

                <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                    Threats
                  </h3>
                  {isEditing ? (
                    <Textarea
                      value={threats}
                      onChange={(e) => setThreats(e.target.value)}
                      placeholder='"High competition in area"'
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] min-h-[100px]"
                      data-testid="input-threats"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3]">
                      {threats || '"High competition in area"'}
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
                {isEditing ? (
                  <Textarea
                    value={bhag}
                    onChange={(e) => setBhag(e.target.value)}
                    placeholder='Example: "Achieve $10M in sales volume and open 2 regional offices."'
                    className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[60px]"
                    data-testid="input-bhag"
                  />
                ) : (
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.5] p-3 bg-gray-50 rounded border border-gray-200 min-h-[60px]">
                    {bhag || 'Click Edit to add your BHAG...'}
                  </p>
                )}
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3] mt-1">
                  Example: "Achieve $10M in sales volume and open 2 regional offices."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
