import { ChevronRightIcon, DiamondIcon, HomeIcon } from "lucide-react";
import React from "react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const pathToPageName: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/my-renegade": "My Renegade",
  "/vision-goals": "Vision & Goals",
  "/market-analysis": "Market Analysis",
  "/quarterly-priorities": "Quarterly Priorities",
  "/prospecting": "Prospecting",
  "/sales": "Sales",
  "/scorecard": "Scorecard",
  "/kpis": "Business KPIs",
  "/meetings": "Meetings",
  "/reports": "Reports",
  "/business-audit": "Business Audit",
  "/settings": "Settings",
};

export const DashboardHeaderSection = (): JSX.Element => {
  const [location] = useLocation();
  const pageName = pathToPageName[location] || "Dashboard";

  return (
    <header className="w-full min-h-[62px] bg-white border-b border-[#dbe2eb] flex items-center justify-between px-4 md:px-6 py-2 md:py-0">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              className="inline-flex items-start p-1 rounded-md"
            >
              <HomeIcon className="w-5 h-5" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRightIcon className="w-6 h-6" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="inline-flex items-center justify-center px-2 py-1 rounded-md border border-solid border-[#f0f9f0]">
              <span className="text-neutral-new900 text-sm tracking-[0] leading-[normal] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold">
                {pageName}
              </span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2 md:gap-4">
        <Badge className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#f5e6d3] to-[#e3dcd2] rounded-[100px] border border-solid border-[#d4c5b0] h-auto shadow-sm">
          <DiamondIcon className="w-5 h-5 text-[#8b6914]" />
          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#5d4a1f] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
            Premium account
          </span>
        </Badge>

        <img
          className="w-[90px] h-[24px] md:w-[114px] md:h-[30px]"
          alt="Frame"
          src="/figmaAssets/frame-2147225131.svg"
        />
      </div>
    </header>
  );
};
