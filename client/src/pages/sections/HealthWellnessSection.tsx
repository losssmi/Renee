import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const marketingData = [
  {
    channel: "DLs",
    status: "Sent",
    progress: 100,
    barColor: "bg-[#09b600]",
  },
  {
    channel: "Social Media",
    status: "Scheduled",
    progress: 40,
    barColor: "bg-[#367bf6]",
  },
  {
    channel: "Newsletter",
    status: "Scheduled",
    progress: 10,
    barColor: "bg-[#367bf6]",
  },
];

export const HealthWellnessSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-white rounded-lg border border-solid border-[#ededed] shadow-sm">
      <CardContent className="p-4 md:p-6">
        <header className="mb-3">
          <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new900 text-sm tracking-[-0.14px] leading-7">
            Marketing
          </h2>
        </header>

        <div className="flex flex-col gap-2">
          {marketingData.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new900 text-xs tracking-[-0.12px] leading-7 min-w-[80px]">
                {item.channel}
              </span>
              <div className="flex-1 relative h-6 bg-gray-200 rounded-sm overflow-hidden max-w-[300px]">
                <div
                  className={`${item.barColor} h-full flex items-center justify-center`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new900 text-xs min-w-[60px] text-right">
                {item.status}
              </span>
              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new900 text-xs min-w-[40px] text-right">
                {item.progress}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
