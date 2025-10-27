import { ReactNode } from "react";
import { SideBarSection } from "@/pages/sections/SideBarSection";
import { DashboardHeaderSection } from "@/pages/sections/DashboardHeaderSection";

interface DashboardPageLayoutProps {
  children: ReactNode;
}

export function DashboardPageLayout({ children }: DashboardPageLayoutProps) {
  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      <aside className="w-[263px] flex-shrink-0">
        <SideBarSection />
      </aside>

      <main className="flex-1 flex flex-col bg-[#f5f5f5]">
        <DashboardHeaderSection />
        {children}
      </main>
    </div>
  );
}
