import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const marketingData = [
  {
    channel: "DLs",
    status: "Sent",
    statusColor: "bg-[#09b600]",
  },
  {
    channel: "Social Media",
    status: "Pending",
    statusColor: "bg-[#ffc130]",
  },
  {
    channel: "Newsletter",
    status: "Scheduled",
    statusColor: "bg-[#367bf6]",
  },
];

export const HealthWellnessSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-white rounded-lg border border-solid border-[#ededed] shadow-sm">
      <CardContent className="p-4 md:p-6">
        <header className="mb-6">
          <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new900 text-sm tracking-[-0.14px] leading-7">
            Marketing
          </h2>
        </header>

        <div className="flex flex-col gap-0">
          {marketingData.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between py-2">
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new900 text-xs tracking-[-0.12px] leading-7">
                  {item.channel}
                </span>
                <div className="flex items-center gap-3">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new900 text-xs tracking-[-0.12px] leading-7">
                    {item.status}
                  </span>
                  <div
                    className={`${item.statusColor} w-[18px] h-[18px] rounded-full`}
                  />
                </div>
              </div>
              {index < marketingData.length - 1 && (
                <Separator className="bg-neutral-30" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
