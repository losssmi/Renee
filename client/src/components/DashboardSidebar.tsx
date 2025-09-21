import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, ChevronRight, Home, LogOut, Menu } from "lucide-react";
import renegadeLogo from "@assets/Renegade OS logo_transparent 1_1757334443265.png";

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
  onLogout: () => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const DashboardSidebar = ({ activeNav, activeSubNav, onNavChange, onLogout, isMobileMenuOpen, setIsMobileMenuOpen }: DashboardSidebarProps): JSX.Element => {
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

  const SidebarContent = () => (
    <div className="h-full bg-white/10 backdrop-blur-sm border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <img
            src={renegadeLogo}
            alt="Renegade OS"
            className="h-8 w-auto"
          />
          <div className="text-white text-sm bg-green-500 rounded-full px-2 py-1 text-xs">
            74%
          </div>
        </div>
        <div className="text-white/60 text-xs mb-3">Stage of Growth: Start Up</div>
        
        {/* User Profile */}
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-white/30 transition-all" data-testid="profile-dropdown-trigger">
                <AvatarImage src="" />
                <AvatarFallback className="bg-orange-500 text-white text-sm">
                  A
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={onLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
                data-testid="logout-button"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64">
        <SidebarContent />
      </div>

      {/* Mobile Menu Button & Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/20 text-white hover:bg-white/30 transition-colors"
            data-testid="mobile-menu-trigger"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-transparent border-none">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Main navigation for the dashboard</SheetDescription>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};