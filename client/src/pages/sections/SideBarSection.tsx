import {
  BoxIcon,
  ChevronUpIcon,
  HomeIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";

const homeItems = [
  { icon: HomeIcon, label: "Dashboard", path: "/dashboard" },
  { icon: BoxIcon, label: "My Renegade", path: "/my-renegade" },
];

const strategyItems = [
  { icon: "/figmaAssets/oui-integration-general.svg", label: "Vision & Goals", path: "/vision-goals" },
  {
    icon: "/figmaAssets/carbon-ibm-event-automation-6.svg",
    label: "Quarterly Priorities",
    path: "/quarterly-priorities",
  },
];

const structureItems = [
  { 
    icon: "/figmaAssets/oui-integration-general.svg", 
    label: "Marketing", 
    path: null,
    subItems: [
      { label: "Market Analysis", path: "/market-analysis" },
    ]
  },
  {
    icon: "/figmaAssets/carbon-ibm-event-automation-5.svg",
    label: "Prospecting",
    path: "/prospecting"
  },
  { icon: "/figmaAssets/carbon-ibm-event-automation.svg", label: "Sales", path: "/sales" },
];

const accountabilityItems = [
  { icon: "/figmaAssets/oui-integration-general.svg", label: "Scorecard", path: "/scorecard" },
  { icon: "/figmaAssets/carbon-ibm-event-automation-4.svg", label: "KPIs", path: "/kpis" },
  { icon: "/figmaAssets/carbon-ibm-event-automation-2.svg", label: "Meetings", path: "/meetings" },
  { icon: "/figmaAssets/carbon-ibm-event-automation-3.svg", label: "Reports", path: "/reports" },
];

const supportsItems = [
  { icon: "/figmaAssets/lsicon-setting-outline.svg", label: "Settings", path: "/settings" },
  { icon: "/figmaAssets/icon-park-outline-help.svg", label: "Help", path: null },
];

export const SideBarSection = (): JSX.Element => {
  const { data: user } = useQuery<{ id: number; email: string; username?: string }>({
    queryKey: ['/api/auth/user'],
  });
  const [location] = useLocation();
  const [isInitialMount, setIsInitialMount] = useState(true);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('sidebar-sections-state');
    return saved ? JSON.parse(saved) : {
      home: true,
      strategy: true,
      structure: true,
      accountability: true,
      supports: true,
      marketing: true,
      prospecting: true,
    };
  });

  useEffect(() => {
    setIsInitialMount(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-sections-state', JSON.stringify(openSections));
  }, [openSections]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const displayName = user?.username || user?.email?.split('@')[0] || 'User';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <aside className={`w-full h-full bg-[#fffbef] border-r border-[#dbe2eb] flex flex-col ${isInitialMount ? '[&_*]:!transition-none' : ''}`}>
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
        <Collapsible open={openSections.home} onOpenChange={() => toggleSection('home')}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              HOME
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-1">
            {homeItems.map((item, index) => {
              const isActive = location === item.path;
              return (
                <Link key={index} href={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-2 h-auto ${
                      isActive
                        ? "bg-[#fffdf9] rounded-lg border border-[#dbe2eb] shadow-[0px_0px_10px_#0000000a] px-3 py-3"
                        : "px-3 py-2"
                    }`}
                    data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span
                      className={`[font-family:'Plus_Jakarta_Sans',Helvetica] text-xs tracking-[0] leading-[normal] whitespace-nowrap ${
                        isActive
                          ? "font-bold text-neutral-new900"
                          : "font-medium text-neutral-new600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Button>
                </Link>
              );
            })}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.strategy} onOpenChange={() => toggleSection('strategy')}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              STRATEGY
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-[15px] space-y-1">
            {strategyItems.map((item, index) => {
              const isActive = location === item.path;
              const content = (
                <Button
                  key={index}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-2 h-auto ${
                    isActive
                      ? "bg-[#fffdf9] rounded-lg border border-[#dbe2eb] shadow-[0px_0px_10px_#0000000a] px-3 py-3"
                      : "px-3 py-2"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <img className="w-4 h-4" alt={item.label} src={item.icon} />
                  <span
                    className={`[font-family:'Plus_Jakarta_Sans',Helvetica] text-xs tracking-[0] leading-[normal] whitespace-nowrap ${
                      isActive
                        ? "font-bold text-neutral-new900"
                        : "font-medium text-neutral-new600"
                    }`}
                  >
                    {item.label}
                  </span>
                </Button>
              );
              
              return item.path ? (
                <Link key={index} href={item.path}>
                  {content}
                </Link>
              ) : (
                content
              );
            })}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.structure} onOpenChange={() => toggleSection('structure')}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              STRUCTURE
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-[15px] space-y-1">
            {structureItems.map((item, index) => {
              const isActive = location === item.path;
              
              if (item.subItems) {
                const sectionKey = item.label.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Collapsible key={index} open={openSections[sectionKey]} onOpenChange={() => toggleSection(sectionKey)}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 h-auto px-3 py-2"
                        data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <img className="w-4 h-4" alt={item.label} src={item.icon} />
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-neutral-new600 text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                          {item.label}
                        </span>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => {
                        const isSubActive = location === subItem.path;
                        return (
                          <Link key={subIndex} href={subItem.path}>
                            <Button
                              variant={isSubActive ? "secondary" : "ghost"}
                              className={`w-full justify-start gap-2 h-auto ${
                                isSubActive
                                  ? "bg-[#fffdf9] rounded-lg border border-[#dbe2eb] shadow-[0px_0px_10px_#0000000a] px-3 py-2"
                                  : "px-3 py-2"
                              }`}
                              data-testid={`nav-${subItem.label.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <span
                                className={`[font-family:'Plus_Jakarta_Sans',Helvetica] text-xs tracking-[0] leading-[normal] whitespace-nowrap ${
                                  isSubActive
                                    ? "font-bold text-neutral-new900"
                                    : "font-medium text-neutral-new600"
                                }`}
                              >
                                {subItem.label}
                              </span>
                            </Button>
                          </Link>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }
              
              const content = (
                <Button
                  key={index}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-2 h-auto ${
                    isActive
                      ? "bg-[#fffdf9] rounded-lg border border-[#dbe2eb] shadow-[0px_0px_10px_#0000000a] px-3 py-3"
                      : "px-3 py-2"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <img className="w-4 h-4" alt={item.label} src={item.icon} />
                  <span
                    className={`[font-family:'Plus_Jakarta_Sans',Helvetica] text-xs tracking-[0] leading-[normal] whitespace-nowrap ${
                      isActive
                        ? "font-bold text-neutral-new900"
                        : "font-medium text-neutral-new600"
                    }`}
                  >
                    {item.label}
                  </span>
                </Button>
              );
              
              return item.path ? (
                <Link key={index} href={item.path}>
                  {content}
                </Link>
              ) : (
                content
              );
            })}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.accountability} onOpenChange={() => toggleSection('accountability')}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              ACCOUNTABILITY
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-[15px] space-y-1">
            {accountabilityItems.map((item, index) => {
              const isActive = location === item.path;
              const content = (
                <Button
                  key={index}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-2 h-auto ${
                    isActive
                      ? "bg-[#fffdf9] rounded-lg border border-[#dbe2eb] shadow-[0px_0px_10px_#0000000a] px-3 py-3"
                      : "px-3 py-2"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <img className="w-4 h-4" alt={item.label} src={item.icon} />
                  <span
                    className={`[font-family:'Plus_Jakarta_Sans',Helvetica] text-xs tracking-[0] leading-[normal] whitespace-nowrap ${
                      isActive
                        ? "font-bold text-neutral-new900"
                        : "font-medium text-neutral-new600"
                    }`}
                  >
                    {item.label}
                  </span>
                </Button>
              );
              
              return item.path ? (
                <Link key={index} href={item.path}>
                  {content}
                </Link>
              ) : (
                content
              );
            })}
          </CollapsibleContent>
        </Collapsible>

        <div className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              BUSINESS AUDIT
            </span>
          </div>
          <Link href="/business-audit">
            <Button
              variant={location === "/business-audit" ? "secondary" : "ghost"}
              className={`w-full justify-start gap-2 h-auto ${
                location === "/business-audit"
                  ? "bg-[#fffdf9] rounded-lg border border-[#dbe2eb] shadow-[0px_0px_10px_#0000000a] px-3 py-3"
                  : "px-3 py-2"
              }`}
              data-testid="nav-business-audit"
            >
              <img className="w-4 h-4" alt="Business Audit" src="/figmaAssets/carbon-ibm-event-automation-2.svg" />
              <span
                className={`[font-family:'Plus_Jakarta_Sans',Helvetica] text-xs tracking-[0] leading-[normal] whitespace-nowrap ${
                  location === "/business-audit"
                    ? "font-bold text-neutral-new900"
                    : "font-medium text-neutral-new600"
                }`}
              >
                Business Audit
              </span>
            </Button>
          </Link>
        </div>

        <Collapsible open={openSections.supports} onOpenChange={() => toggleSection('supports')}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-new600 text-[10px] tracking-[0] leading-[normal]">
              SUPPORTS
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-1">
            {supportsItems.map((item, index) => {
              const isActive = location === item.path;
              const content = (
                <Button
                  key={index}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-2 h-auto ${
                    isActive
                      ? "bg-[#fffdf9] rounded-lg border border-[#dbe2eb] shadow-[0px_0px_10px_#0000000a] px-3 py-3"
                      : "px-3 py-2"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  <img className="w-4 h-4" alt={item.label} src={item.icon} />
                  <span
                    className={`[font-family:'Plus_Jakarta_Sans',Helvetica] text-xs tracking-[0] leading-[normal] whitespace-nowrap ${
                      isActive
                        ? "font-bold text-neutral-new900"
                        : "font-medium text-neutral-new600"
                    }`}
                  >
                    {item.label}
                  </span>
                </Button>
              );
              
              return item.path ? (
                <Link key={index} href={item.path}>
                  {content}
                </Link>
              ) : (
                content
              );
            })}
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
