import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const metricsData = [
  {
    title: "Active Listings",
    value: "10",
    status: "↔  Stable",
    statusColor: "text-[#09b600]",
    target: "Target  - 12",
    showIcon: false,
  },
  {
    title: "Hot Stock",
    value: "356,000",
    status: "5%",
    statusColor: "text-[#09b600]",
    target: "Target -",
    showIcon: true,
  },
  {
    title: "Appraisals Booked",
    value: "14",
    status: "On Track",
    statusColor: "text-[#09b600]",
    target: "Progress: 70%",
    showIcon: false,
  },
  {
    title: "Database Growth",
    value: "32",
    status: "Growing Steadily",
    statusColor: "text-[#09b600]",
    target: "Goal: 60 Contacts",
    showIcon: false,
  },
];

export const SalesOverviewSection = (): JSX.Element => {
  return (
    <section className="w-full bg-white rounded-lg border border-solid border-[#ededed] px-6 py-4">
      <header className="flex items-center gap-2 mb-4">
        <img
          className="w-6 h-6"
          alt="Bx analyse"
          src="/figmaAssets/bx-analyse.svg"
        />
        <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new900 text-base tracking-[-0.16px] leading-7">
          Listings
        </h2>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {metricsData.map((metric, index) => (
          <Card
            key={index}
            className="bg-[#f5f5f5] border-0 shadow-[inset_0px_0px_4px_#00000040]"
          >
            <CardContent className="p-6">
              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new900 text-sm tracking-[-0.14px] leading-7 mb-4">
                {metric.title}
              </h3>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-100 text-2xl tracking-[0] leading-9">
                    {metric.value}
                  </span>

                  <Badge
                    variant="secondary"
                    className="bg-transparent border-0 px-2 py-1 rounded-[10000px] h-auto"
                  >
                    {metric.showIcon && (
                      <img
                        className="w-3.5 h-3.5"
                        alt="Icon"
                        src="/figmaAssets/icon-1.svg"
                      />
                    )}
                    <span
                      className={`[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm tracking-[0] leading-[21px] ${metric.statusColor}`}
                    >
                      {metric.status}
                    </span>
                  </Badge>
                </div>

                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-neutral-new500 text-sm tracking-[0] leading-[21px]">
                  {metric.target}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
