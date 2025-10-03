import {
  BoxIcon,
  ChevronUpIcon,
  HomeIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useQuery } from "@tanstack/react-query";

const homeItems = [
  { icon: HomeIcon, label: "Dashboard", active: true },
  { icon: BoxIcon, label: "My Renegade", active: false },
];

const strategyItems = [
  { icon: "/figmaAssets/oui-integration-general.svg", label: "Vision & Goals" },
  {
    icon: "/figmaAssets/carbon-ibm-event-automation-6.svg",
    label: "Quarterly Priorities",
  },
  {
    icon: "/figmaAssets/carbon-ibm-event-automation-1.svg",
    label: "Market Analysis",
  },
];

const structureItems = [
  { icon: "/figmaAssets/oui-integration-general.svg", label: "Marketing" },
  {
    icon: "/figmaAssets/carbon-ibm-event-automation-5.svg",
    label: "Prospecting",
  },
  { icon: "/figmaAssets/carbon-ibm-event-automation.svg", label: "Sales" },
];

const accountabilityItems = [
  { icon: "/figmaAssets/oui-integration-general.svg", label: "Scorecard" },
  { icon: "/figmaAssets/carbon-ibm-event-automation-4.svg", label: "KPIs" },
  { icon: "/figmaAssets/carbon-ibm-event-automation-2.svg", label: "Meetings" },
  { icon: "/figmaAssets/carbon-ibm-event-automation-3.svg", label: "Reports" },
];

const supportsItems = [
  { icon: "/figmaAssets/lsicon-setting-outline.svg", label: "Settings" },
  { icon: "/figmaAssets/icon-park-outline-help.svg", label: "Help" },
];

export const SideBarSection = (): JSX.Element => {
  const { data: user } = useQuery<{ id: number; email: string; username?: string }>({
    queryKey: ['/api/auth/user'],
  });

  const displayName = user?.username || user?.email?.split('@')[0] || 'User';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <aside className="w-full h-full bg-[#fffbef] border-r border-[#dbe2eb] flex flex-col">
      <header className="flex items-center justify-between px-[21px] pt-[23px] pb-4">
        <div className="flex items-center gap-3">
          <img
            className="w-[127px] h-6"
            alt="Renegade OS"
            src="/figmaAssets/ren-1.png"
          />
        </div>
        <Button variant="ghost" size="icon" className="w-[30px] h-[30px] p-0">
          <img
            className="w-[30px] h-[30px]"
            alt="Collapse button"
            src="/figmaAssets/collapse-button.svg"
          />
        </Button>
      </header>

      <nav className="flex-1 px-3 space-y-4 overflow-y-auto">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              HOME
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-1">
            {homeItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start gap-2 h-auto ${
                  item.active
                    ? "bg-[#fffdf9] rounded-lg border border-[#dbe2eb] shadow-[0px_0px_10px_#0000000a] px-3 py-3"
                    : "px-3 py-2"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span
                  className={`[font-family:'Plus_Jakarta_Sans',Helvetica] text-xs tracking-[0] leading-[normal] whitespace-nowrap ${
                    item.active
                      ? "font-bold text-neutral-new900"
                      : "font-medium text-neutral-new600"
                  }`}
                >
                  {item.label}
                </span>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              STRATEGY
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-[15px] space-y-1">
            {strategyItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-2 h-auto px-3 py-2"
              >
                <img className="w-4 h-4" alt={item.label} src={item.icon} />
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-neutral-new600 text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                  {item.label}
                </span>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              STRUCTURE
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-[15px] space-y-1">
            {structureItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-2 h-auto px-3 py-2"
              >
                <img className="w-4 h-4" alt={item.label} src={item.icon} />
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-neutral-new600 text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                  {item.label}
                </span>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              ACCOUNTABILITY
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-[15px] space-y-1">
            {accountabilityItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-2 h-auto px-3 py-2"
              >
                <img className="w-4 h-4" alt={item.label} src={item.icon} />
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-neutral-new600 text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                  {item.label}
                </span>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <div className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              BUSINESS AUDIT
            </span>
          </div>
        </div>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              SUPPORTS
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-1">
            {supportsItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-2 h-auto px-3 py-2"
              >
                <img className="w-4 h-4" alt={item.label} src={item.icon} />
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-neutral-new600 text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                  {item.label}
                </span>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </nav>

      <footer className="px-3 py-4 border-t border-[#dbe2eb]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-neutral-new600 text-white text-xs">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new900 text-xs">
                {displayName}
              </span>
              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new600 text-[10px]">
                {user?.email || ''}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-6 h-6 p-0">
            <MoreHorizontalIcon className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </aside>
  );
};
