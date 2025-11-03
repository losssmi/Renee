import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Value {
  name: string;
  description: string;
}

export function Vision() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [vision, setVision] = useState("");
  const [coreFocus, setCoreFocus] = useState("");
  const [mission, setMission] = useState("");
  const [usp, setUsp] = useState("");
  
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
  
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Saved",
      description: "Your vision has been saved.",
    });
  };

  const updateValue = (index: number, field: 'name' | 'description', value: string) => {
    const updated = [...values];
    updated[index] = { ...updated[index], [field]: value };
    setValues(updated);
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
        
        <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
          <div className="flex items-center justify-between pt-5 mb-2">
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
                    disabled={!isEditing}
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
                    Clarify what you're building, why it matters, and where it's going.
                  </p>
                  <Input
                    value={coreFocus}
                    onChange={(e) => setCoreFocus(e.target.value)}
                    placeholder="Enter your core focus..."
                    disabled={!isEditing}
                    className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm p-2 bg-gray-50 rounded border border-gray-200"
                    data-testid="input-core-focus"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                  Mission
                </h2>
              </div>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px] mb-4">
                Why you exist. What problem you solve. Who you serve.
              </p>
              
              <Textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                placeholder="Describe your mission..."
                disabled={!isEditing}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[80px] p-3 bg-gray-50 rounded border border-gray-200"
                data-testid="input-mission"
              />
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                  USP
                </h2>
              </div>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px] mb-4">
                What makes you different. Why clients choose you over competitors.
              </p>
              
              <Textarea
                value={usp}
                onChange={(e) => setUsp(e.target.value)}
                placeholder="Describe your unique selling proposition..."
                disabled={!isEditing}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[80px] p-3 bg-gray-50 rounded border border-gray-200"
                data-testid="input-usp"
              />
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
                      disabled={!isEditing}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm"
                      data-testid={`input-value-name-${index}`}
                    />
                    <Input
                      value={value.description}
                      onChange={(e) => updateValue(index, 'description', e.target.value)}
                      placeholder="Description"
                      disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                disabled={!isEditing}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm min-h-[100px] p-3 bg-gray-50 rounded border border-gray-200"
                data-testid="input-ten-year-plan"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
