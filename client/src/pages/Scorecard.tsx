import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface GridRow {
  label: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
  total: string;
}

interface PipelineRow {
  label: string;
  value: string;
}

interface OutputRow {
  label: string;
  value: string;
}

export function Scorecard() {
  const [inputsData, setInputsData] = useState<GridRow[]>([
    { label: "Database", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "", total: "" },
    { label: "Calls", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "", total: "" },
    { label: "Connects", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "", total: "" },
    { label: "BAPs", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "", total: "" },
    { label: "MAPs", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "", total: "" },
    { label: "LAPs", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "", total: "" },
  ]);

  const [feeling, setFeeling] = useState<{ [key: string]: string }>({ mon: "", tue: "", wed: "", thu: "", fri: "" });

  const toggleFeeling = (day: string) => {
    const currentValue = feeling[day];
    let newValue = "";
    
    if (currentValue === "") newValue = "good";
    else if (currentValue === "good") newValue = "neutral";
    else if (currentValue === "neutral") newValue = "bad";
    else newValue = "";
    
    setFeeling({ ...feeling, [day]: newValue });
  };

  const getFeelingColor = (value: string) => {
    switch (value) {
      case "good":
        return "bg-[#09b600]";
      case "neutral":
        return "bg-[#ffc130]";
      case "bad":
        return "bg-[#ff4d4d]";
      default:
        return "bg-transparent";
    }
  };

  const [pipelineData, setPipelineData] = useState<PipelineRow[]>([
    { label: "Hot Stock", value: "" },
    { label: "Hot Buyers", value: "" },
    { label: "Pipeline", value: "" },
  ]);

  const [outputsData, setOutputsData] = useState<OutputRow[]>([
    { label: "Off Market", value: "" },
    { label: "On Market", value: "" },
    { label: "Sold", value: "" },
  ]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
              Scorecard
            </h1>
            <button
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-3 py-1 border border-[#ededed] rounded-lg hover:bg-gray-50 transition-colors"
              data-testid="button-quick-add"
            >
              Quick Add
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-6">
          {/* Inputs Section */}
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <img className="w-6 h-6" alt="Inputs" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px]">
                  Inputs
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left pb-2 pr-4 min-w-[120px]"></th>
                      {days.map((day) => (
                        <th key={day} className="text-center pb-2 px-1">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-xs">
                            {day}
                          </span>
                        </th>
                      ))}
                      <th className="text-center pb-2 px-1">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-xs">
                          Total
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inputsData.map((row, rowIndex) => (
                      <tr key={row.label}>
                        <td className="py-1 pr-4">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px]">
                            {row.label}
                          </span>
                        </td>
                        {days.map((day, dayIndex) => (
                          <td key={day} className="py-1 px-1">
                            <Input
                              value={row[day.toLowerCase() as keyof GridRow] as string}
                              onChange={(e) => {
                                const newData = [...inputsData];
                                newData[rowIndex] = { ...row, [day.toLowerCase()]: e.target.value };
                                setInputsData(newData);
                              }}
                              className="h-10 w-10 text-center p-0 border-[#d7d7d7] [font-family:'Plus_Jakarta_Sans',Helvetica]"
                              data-testid={`input-${row.label.toLowerCase()}-${day.toLowerCase()}`}
                            />
                          </td>
                        ))}
                        <td className="py-1 px-1">
                          <Input
                            value={row.total}
                            onChange={(e) => {
                              const newData = [...inputsData];
                              newData[rowIndex] = { ...row, total: e.target.value };
                              setInputsData(newData);
                            }}
                            className="h-10 w-10 text-center p-0 border-[#d7d7d7] [font-family:'Plus_Jakarta_Sans',Helvetica]"
                            data-testid={`input-${row.label.toLowerCase()}-total`}
                          />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-1 pr-4">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px]">
                          How are you feeling?
                        </span>
                      </td>
                      {days.slice(0, 5).map((day) => (
                        <td key={day} className="py-1 px-1">
                          <button
                            onClick={() => toggleFeeling(day.toLowerCase())}
                            className={`w-[18px] h-[18px] rounded-full border-2 border-[#d7d7d7] mx-auto transition-colors ${getFeelingColor(feeling[day.toLowerCase()])}`}
                            data-testid={`feeling-${day.toLowerCase()}`}
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pipeline Section */}
            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-6 h-6" alt="Pipeline" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px]">
                    Pipeline
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {pipelineData.map((row, index) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px]">
                        {row.label}
                      </span>
                      <Input
                        value={row.value}
                        onChange={(e) => {
                          const newData = [...pipelineData];
                          newData[index] = { ...row, value: e.target.value };
                          setPipelineData(newData);
                        }}
                        className="w-24 h-10 text-center border-[#ededed] [font-family:'Plus_Jakarta_Sans',Helvetica]"
                        data-testid={`input-pipeline-${row.label.toLowerCase().replace(' ', '-')}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Outputs Section */}
            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-6 h-6" alt="Outputs" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px]">
                    Outputs
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {outputsData.map((row, index) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px]">
                        {row.label}
                      </span>
                      <Input
                        value={row.value}
                        onChange={(e) => {
                          const newData = [...outputsData];
                          newData[index] = { ...row, value: e.target.value };
                          setOutputsData(newData);
                        }}
                        className="w-24 h-10 text-center border-[#ededed] [font-family:'Plus_Jakarta_Sans',Helvetica]"
                        data-testid={`input-output-${row.label.toLowerCase().replace(' ', '-')}`}
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
