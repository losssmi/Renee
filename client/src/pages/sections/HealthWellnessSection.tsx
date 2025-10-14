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
    status: "Progress",
    progress: 40,
    barColor: "bg-[#ffc130]",
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
        <header className="mb-4">
          <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new900 text-sm tracking-[-0.14px] leading-7">
            Marketing
          </h2>
        </header>

        <div className="flex flex-col gap-3">
          {marketingData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new900 text-xs tracking-[-0.12px] leading-7 w-24 flex-shrink-0">
                {item.channel}
              </span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className={`${item.barColor} h-full flex items-center justify-end px-2`}
                    style={{ width: `${item.progress}%` }}
                  >
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-xs">
                      {item.status}
                    </span>
                  </div>
                </div>
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new900 text-xs w-12 text-right">
                  {item.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
