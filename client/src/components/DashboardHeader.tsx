import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, LogOut, ChevronRight } from "lucide-react";

interface DashboardHeaderProps {
  activeNav: string;
  activeSubNav: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onLogout: () => void;
}

export const DashboardHeader = ({ 
  activeNav, 
  activeSubNav, 
  activeTab, 
  onTabChange, 
  onLogout 
}: DashboardHeaderProps): JSX.Element => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/10 backdrop-blur-md border-b border-white/20 px-6 flex items-center justify-between">
      {/* Left: Breadcrumb + Title */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center text-sm text-white/60">
          <span>{activeNav}</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white font-medium">{activeSubNav}</span>
        </div>
      </div>

      {/* Center: Empty space for balance */}
      <div className="flex-1"></div>

      {/* Right: Actions + User */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Tabs for Accountability section (hidden on small screens) */}
        {activeNav === "Accountability" && activeTab && onTabChange && (
          <div className="hidden lg:block">
            <Tabs value={activeTab} onValueChange={onTabChange} className="w-auto">
              <TabsList className="bg-white/10 border-white/20 h-9">
                <TabsTrigger
                  value="daily"
                  className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/20 h-7 text-sm"
                  data-testid="tab-daily"
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/20 h-7 text-sm"
                  data-testid="tab-weekly"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/20 h-7 text-sm"
                  data-testid="tab-monthly"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Quick Add Button (responsive) */}
        <Button
          size="sm"
          className="bg-white/20 text-white border border-white/30 hover:bg-white/30 h-9 px-2 md:px-3"
          data-testid="button-quick-add"
        >
          <Plus className="w-4 h-4 md:mr-1" />
          <span className="hidden sm:inline">Quick Add</span>
        </Button>

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-white/30 transition-all" data-testid="header-profile-dropdown">
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
              data-testid="header-logout-button"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};