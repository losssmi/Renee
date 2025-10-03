import { ChevronRightIcon, DiamondIcon, HomeIcon } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const DashboardHeaderSection = (): JSX.Element => {
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
                Dashboard
              </span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2 md:gap-4">
        <Badge className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-10 rounded-[100px] border border-solid border-[#dbe2eb] h-auto">
          <DiamondIcon className="w-5 h-5" />
          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-primary-900 text-sm tracking-[0] leading-[21px] whitespace-nowrap">
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
