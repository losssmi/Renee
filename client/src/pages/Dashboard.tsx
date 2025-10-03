import { ArrowUpRightIcon, TrendingUpIcon } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { HealthWellnessSection } from "./sections/HealthWellnessSection";
import { ListingsSection } from "./sections/ListingsSection";
import { SalesOverviewSection } from "./sections/SalesOverviewSection";
import { SideBarSection } from "./sections/SideBarSection";
import { TopBarSection } from "./sections/TopBarSection";

const metricCards = [
  {
    icon: "/figmaAssets/lsicon-sales-return-outline.svg",
    title: "GCI",
    value: "$70,000",
    change: "5%",
    changePositive: true,
    subtitle: "Target - $100K",
    periods: ["Monthly", "Quarterly", "Annually"],
    activePeriod: "Monthly",
  },
  {
    icon: "/figmaAssets/akar-icons-coin.svg",
    title: "Sales",
    value: "$122,512",
    change: "4%",
    changePositive: true,
    subtitle: "Relative to last month",
    periods: ["Monthly", "Quarterly", "Annually"],
    activePeriod: "Monthly",
  },
  {
    icon: "/figmaAssets/icon-park-outline-sales-report.svg",
    title: "Forecast",
    value: "$782,000",
    subtitle: "70% Complete",
    status: "On Track",
    periods: ["Monthly", "Quarterly", "Annually"],
    activePeriod: "Monthly",
  },
  {
    icon: "/figmaAssets/icon-park-outline-sales-report.svg",
    title: "Market Share",
    value: "4%",
    subtitle: "Goal 5%",
    status: "Growing",
    periods: [],
  },
];

export const Dashboard = (): JSX.Element => {
  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      <aside className="w-[263px] flex-shrink-0">
        <SideBarSection />
      </aside>

      <main className="flex-1 flex flex-col bg-[#f5f5f5]">
        <DashboardHeaderSection />
        <TopBarSection />

        <div className="px-6 py-4 flex flex-col gap-4 bg-[#f5f5f5]">
          <div className="grid grid-cols-4 gap-4">
            {metricCards.map((card, index) => (
              <Card
                key={index}
                className="h-full border-[#ededed] shadow-sm overflow-hidden bg-white"
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-6 h-6"
                        alt={card.title}
                        src={card.icon}
                      />
                      <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new900 text-base tracking-[-0.16px] leading-7 whitespace-nowrap">
                        {card.title}
                      </div>
                    </div>

                    {card.periods.length > 0 && (
                      <div className="flex bg-neutral-10 border border-[#dbe2eb] rounded-lg px-2 py-1 gap-2 self-start">
                        {card.periods.map((period, idx) => (
                          <div
                            key={idx}
                            className={`[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[8px] tracking-[-0.08px] leading-[10.4px] whitespace-nowrap ${
                              period === card.activePeriod
                                ? "text-[#09b600]"
                                : "text-neutral-new600"
                            }`}
                          >
                            {period}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 mb-4 flex-grow">
                    <div className="flex items-center gap-2.5">
                      <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-black text-2xl tracking-[0] leading-9 whitespace-nowrap">
                        {card.value}
                      </div>
                      {card.change && (
                        <Badge
                          variant="secondary"
                          className="inline-flex items-center gap-0.5 px-2 py-1 bg-transparent border-0"
                        >
                          <TrendingUpIcon className="w-3.5 h-3.5 text-[#09b600]" />
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-sm tracking-[0] leading-[21px]">
                            {card.change}
                          </span>
                        </Badge>
                      )}
                      {card.status && (
                        <Badge
                          variant="secondary"
                          className="inline-flex items-center gap-0.5 px-2 py-1 bg-transparent border-0"
                        >
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-sm tracking-[0] leading-[21px]">
                            {card.status}
                          </span>
                        </Badge>
                      )}
                    </div>
                    <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-neutral-new500 text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                      {card.subtitle}
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    className="w-full h-auto bg-white border border-[#dbe2eb] hover:bg-[#f5f5f5] rounded-[1000px] px-3 py-2 mt-auto"
                  >
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new900 text-sm tracking-[0] leading-[21px]">
                      View Details
                    </span>
                    <ArrowUpRightIcon className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <SalesOverviewSection />
            </div>
            <div className="flex-1">
              <section className="w-full bg-white rounded-lg border border-solid border-[#ededed] px-6 py-4">
                <header className="flex items-center gap-2 mb-4">
                  <img
                    className="w-6 h-6"
                    alt="Health and Wellness"
                    src="/figmaAssets/bx-analyse.svg"
                  />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new900 text-base tracking-[-0.16px] leading-7">
                    Health and Wellness
                  </h2>
                </header>
                <ListingsSection />
              </section>
            </div>
          </div>

          <HealthWellnessSection />
        </div>
      </main>
    </div>
  );
};
