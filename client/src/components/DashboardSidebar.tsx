import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Home, User } from "lucide-react";

interface SidebarItem {
  name: string;
  icon?: React.ReactNode;
  isExpanded?: boolean;
  subsections?: string[];
  activeSubsection?: string;
}

interface DashboardSidebarProps {
  activeNav: string;
  activeSubNav: string;
  onNavChange: (nav: string, subNav?: string) => void;
}

export const DashboardSidebar = ({ activeNav, activeSubNav, onNavChange }: DashboardSidebarProps): JSX.Element => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Home", "Strategy", "Structure", "Sales", "Accountability"]);

  const sidebarItems: SidebarItem[] = [
    {
      name: "Home",
      icon: <Home className="w-4 h-4" />,
      subsections: ["My Renegade"],
      isExpanded: expandedSections.includes("Home"),
      activeSubsection: activeNav === "Home" ? activeSubNav : undefined,
    },
    {
      name: "Strategy",
      subsections: ["Vision", "Goals", "Priorities", "Market Analysis"],
      isExpanded: expandedSections.includes("Strategy"),
      activeSubsection: activeNav === "Strategy" ? activeSubNav : undefined,
    },
    {
      name: "Structure",
      subsections: ["Marketing", "Prospecting", "Sellers", "Buyers", "Appraisals"],
      isExpanded: expandedSections.includes("Structure"),
      activeSubsection: activeNav === "Structure" ? activeSubNav : undefined,
    },
    {
      name: "Sales", 
      subsections: ["Listings", "Sales"],
      isExpanded: expandedSections.includes("Sales"),
      activeSubsection: activeNav === "Sales" ? activeSubNav : undefined,
    },
    {
      name: "Accountability",
      subsections: ["Scorecard", "KPIs", "Meetings", "Dashboard"],
      isExpanded: expandedSections.includes("Accountability"),
      activeSubsection: activeNav === "Accountability" ? activeSubNav : undefined,
    },
    {
      name: "Business Audit",
      subsections: [],
      isExpanded: false,
    },
  ];

  const toggleSection = (sectionName: string) => {
    if (expandedSections.includes(sectionName)) {
      setExpandedSections(expandedSections.filter(s => s !== sectionName));
    } else {
      setExpandedSections([...expandedSections, sectionName]);
    }
  };

  const handleSubsectionClick = (mainNav: string, subNav: string) => {
    onNavChange(mainNav, subNav);
  };

  const handleMainNavClick = (mainNav: string) => {
    const section = sidebarItems.find(item => item.name === mainNav);
    if (section && section.subsections && section.subsections.length > 0) {
      const defaultSubNav = section.subsections[0];
      onNavChange(mainNav, defaultSubNav);
    } else {
      onNavChange(mainNav);
    }
  };

  return (
    <div className="w-64 h-full bg-white/10 backdrop-blur-sm border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="text-white font-light text-lg">Renegade.</div>
          <div className="text-white text-sm bg-green-500 rounded-full px-2 py-1 text-xs">
            74%
          </div>
        </div>
        <div className="text-white/60 text-xs mt-1">Stage of Growth: Start Up</div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-white/10">
        <div className="text-white text-right text-lg font-light">R.</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {/* Main Navigation Item */}
              <Button
                variant="ghost"
                className={`w-full justify-start text-left p-3 h-auto font-normal ${
                  activeNav === item.name 
                    ? "bg-white/20 text-white" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => {
                  handleMainNavClick(item.name);
                  if (item.subsections && item.subsections.length > 0) {
                    toggleSection(item.name);
                  }
                }}
                data-testid={`sidebar-nav-${item.name.toLowerCase()}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.subsections && item.subsections.length > 0 && (
                    <div onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(item.name);
                    }}>
                      {item.isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </div>
              </Button>

              {/* Subsections */}
              {item.isExpanded && item.subsections && item.subsections.length > 0 && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subsections.map((subsection, subIndex) => (
                    <Button
                      key={subIndex}
                      variant="ghost"
                      className={`w-full justify-start text-left p-2 h-auto font-normal text-sm ${
                        activeNav === item.name && activeSubNav === subsection
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white/80"
                      }`}
                      onClick={() => handleSubsectionClick(item.name, subsection)}
                      data-testid={`sidebar-subnav-${subsection.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          activeNav === item.name && activeSubNav === subsection
                            ? "bg-white" 
                            : "bg-white/40"
                        }`} />
                        {subsection}
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};