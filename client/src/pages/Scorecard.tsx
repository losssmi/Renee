import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const scorecardItems = [
  "Database", "Calls", "Connects", "BAPs", "MAPs", "LAPs", "How are you feeling?"
];

export function Scorecard() {
  const [scorecardRatings, setScorecardRatings] = useState<Record<string, number>>({});

  const setRating = (item: string, rating: number) => {
    setScorecardRatings(prev => ({ ...prev, [item]: rating }));
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

        <div className="px-6 pb-6">
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <img className="w-6 h-6" alt="Scorecard" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                  Daily Metrics
                </h2>
              </div>
              
              <div className="flex flex-col gap-4">
                {scorecardItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[13px] tracking-[-0.13px] w-48">
                      {item}
                    </span>
                    <div className="flex gap-2">
                      {[...Array(8)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setRating(item, i + 1)}
                          className={`w-[29px] h-[29px] border rounded-lg transition-all ${
                            scorecardRatings[item] === i + 1 
                              ? 'bg-[#09b600] border-[#09b600]' 
                              : scorecardRatings[item] && scorecardRatings[item] > i 
                                ? 'bg-[#e0f4de] border-[#09b600]'
                                : 'bg-transparent border-[rgba(215,215,215,0.3)] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]'
                          }`}
                          data-testid={`rating-${item}-${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
