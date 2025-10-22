import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function MarketAnalysis() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Demographics
  const [demographics, setDemographics] = useState({
    population: "",
    averageAge: "",
    ownersRenters: "",
    familySingle: "",
    totalProperties: "",
    totalHouses: "8,000",
    totalApartments: "",
    tenure: "",
  });

  // Houses
  const [houses, setHouses] = useState({
    avSalePrice: "5,000,000",
    highestSalePrice: "",
    lowestSalePrice: "",
    salesLast12Months: "20",
    avDaysOnMarket: "",
    growthRate: "",
    averageCommission: "1.65%",
    averageCommPerSale: "82,500",
    turnoverRate: "0.25%",
    valueOfMarket: "1,650,000",
  });

  const [annualGCIPotential] = useState([
    { stage: "Stage 1", value: "82,500" },
    { stage: "Stage 2", value: "165,000" },
    { stage: "Stage 3", value: "330,000" },
    { stage: "Stage 4", value: "495,000" },
    { stage: "Stage 5", value: "660,000" },
  ]);

  // Apartments
  const [apartments, setApartments] = useState({
    avSalePrice: "",
    highestSalePrice: "",
    lowestSalePrice: "",
    salesLast12Months: "",
    avDaysOnMarket: "",
    growthRate: "",
    averageCommission: "1.65%",
    averageCommPerSale: "0",
    turnoverRate: "0.00%",
    valueOfMarket: "0",
  });

  const [keyAgents, setKeyAgents] = useState(["", "", "", "", ""]);

  const [marketShareTarget] = useState([
    { stage: "Stage 1", value: "0.05" },
    { stage: "Stage 2", value: "0.1" },
    { stage: "Stage 3", value: "0.2" },
    { stage: "Stage 4", value: "0.3" },
    { stage: "Stage 5", value: "0.4" },
  ]);

  const [salesPotential] = useState([
    { stage: "Stage 1", value: "1" },
    { stage: "Stage 2", value: "2" },
    { stage: "Stage 3", value: "4" },
    { stage: "Stage 4", value: "6" },
    { stage: "Stage 5", value: "8" },
  ]);

  const updateDemographic = (field: string, value: string) => {
    setDemographics({ ...demographics, [field]: value });
  };

  const updateHouse = (field: string, value: string) => {
    setHouses({ ...houses, [field]: value });
  };

  const updateApartment = (field: string, value: string) => {
    setApartments({ ...apartments, [field]: value });
  };

  const updateKeyAgent = (index: number, value: string) => {
    const updated = [...keyAgents];
    updated[index] = value;
    setKeyAgents(updated);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Saved",
      description: "Your market analysis has been saved.",
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
            <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-snug">
              Market Analysis
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
              data-testid="button-edit-market"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
          {/* Demographics */}
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <img className="w-6 h-6" alt="Demographics" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                  Demographics
                </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  {Object.entries(demographics).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4 items-center">
                      <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <Input
                        value={value}
                        onChange={(e) => updateDemographic(key, e.target.value)}
                        disabled={!isEditing}
                        className="h-8 text-sm"
                        data-testid={`input-demo-${key}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {Object.entries(demographics).slice(4).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4 items-center">
                      <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <Input
                        value={value}
                        onChange={(e) => updateDemographic(key, e.target.value)}
                        disabled={!isEditing}
                        className="h-8 text-sm"
                        data-testid={`input-demo-${key}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {/* Houses */}
            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <img className="w-6 h-6" alt="Houses" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    HOUSES
                  </h2>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(houses).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4 items-center">
                      <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <Input
                        value={value}
                        onChange={(e) => updateHouse(key, e.target.value)}
                        disabled={!isEditing}
                        className="h-8 text-xs"
                        data-testid={`input-house-${key}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-4">
                    Annual GCI Potential
                  </h3>
                  <div className="space-y-2">
                    {annualGCIPotential.map((item, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4 items-center">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
                          {item.stage}
                        </span>
                        <Input
                          value={item.value}
                          disabled
                          className="h-8 text-xs bg-gray-50"
                          data-testid={`input-gci-${index}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apartments */}
            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <img className="w-6 h-6" alt="Apartments" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    APARTMENTS
                  </h2>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(apartments).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4 items-center">
                      <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <Input
                        value={value}
                        onChange={(e) => updateApartment(key, e.target.value)}
                        disabled={!isEditing}
                        className="h-8 text-xs"
                        data-testid={`input-apt-${key}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Key Agents */}
            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <img className="w-6 h-6" alt="Key Agents" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    KEY AGENTS
                  </h2>
                </div>
                
                <div className="space-y-2">
                  {keyAgents.map((agent, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#4e657f] text-sm w-4">
                        {index + 1}
                      </span>
                      <Input
                        value={agent}
                        onChange={(e) => updateKeyAgent(index, e.target.value)}
                        placeholder={`Agent ${index + 1}`}
                        disabled={!isEditing}
                        className="h-8 text-sm flex-1"
                        data-testid={`input-agent-${index}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Share Target */}
            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <img className="w-6 h-6" alt="Market Share" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    Market Share Target
                  </h2>
                </div>
                
                <div className="space-y-2">
                  {marketShareTarget.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 items-center">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                        {item.stage}
                      </span>
                      <Input
                        value={item.value}
                        disabled
                        className="h-8 text-sm bg-gray-50"
                        data-testid={`input-share-${index}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sales Potential */}
            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <img className="w-6 h-6" alt="Sales Potential" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    Sales Potential
                  </h2>
                </div>
                
                <div className="space-y-2">
                  {salesPotential.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 items-center">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                        {item.stage}
                      </span>
                      <Input
                        value={item.value}
                        disabled
                        className="h-8 text-sm bg-gray-50"
                        data-testid={`input-sales-${index}`}
                      />
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
