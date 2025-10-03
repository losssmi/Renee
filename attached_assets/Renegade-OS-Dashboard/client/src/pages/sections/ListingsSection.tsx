import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const moodData = [
  { day: "Monday", mood: "Great", color: "bg-[#09b600]" },
  { day: "Tuesday", mood: "Not bad", color: "bg-[#09b600]" },
  { day: "Wednesday", mood: "Tired", color: "bg-[#ffc130]" },
  { day: "Thursday", mood: "Focused", color: "bg-[#09b600]" },
  { day: "Friday", mood: "Great", color: "bg-[#09b600]" },
  { day: "Saturday", mood: "Calm", color: "bg-[#09b600]" },
];

export const ListingsSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-[#f5f5f5] rounded-lg border border-solid border-[#ededed] shadow-[inset_0px_0px_4px_#00000040]">
      <CardContent className="p-6">
        <header className="mb-6">
          <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new900 text-sm tracking-[-0.14px] leading-7">
            How are you feeling?
          </h2>
        </header>

        <div className="flex flex-col gap-0">
          {moodData.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between py-2">
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new900 text-xs tracking-[-0.12px] leading-7">
                  {item.day}
                </span>
                <div className="flex items-center gap-3">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new900 text-xs tracking-[-0.12px] leading-7">
                    {item.mood}
                  </span>
                  <div
                    className={`${item.color} w-[18px] h-[18px] rounded-full`}
                  />
                </div>
              </div>
              {index < moodData.length - 1 && (
                <Separator className="bg-neutral-30" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
