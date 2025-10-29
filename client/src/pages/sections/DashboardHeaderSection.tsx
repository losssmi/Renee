import { DiamondIcon } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";

export const DashboardHeaderSection = (): JSX.Element => {
  return (
    <header className="w-full min-h-[62px] bg-white border-b border-[#dbe2eb] flex items-center justify-end px-4 md:px-6 py-2 md:py-0">
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
