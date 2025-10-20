import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, DollarSign, Users, Home } from "lucide-react";
import { useState } from "react";

interface Report {
  id: number;
  title: string;
  description: string;
  category: "Sales" | "Pipeline" | "Performance" | "Financial";
  lastUpdated: string;
  icon: React.ReactNode;
}

export function Reports() {
  const [reports] = useState<Report[]>([
    {
      id: 1,
      title: "Monthly Sales Report",
      description: "Comprehensive overview of sales performance, closed deals, and revenue.",
      category: "Sales",
      lastUpdated: "2024-01-20",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Pipeline Analysis",
      description: "Current pipeline status, conversion rates, and forecasted deals.",
      category: "Pipeline",
      lastUpdated: "2024-01-21",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Team Performance",
      description: "Individual and team metrics, KPIs, and goal progress tracking.",
      category: "Performance",
      lastUpdated: "2024-01-19",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Market Analysis Report",
      description: "Market trends, competitor analysis, and opportunity identification.",
      category: "Performance",
      lastUpdated: "2024-01-18",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 5,
      title: "Quarterly Financial Summary",
      description: "Revenue breakdown, expenses, and profit margins for Q1.",
      category: "Financial",
      lastUpdated: "2024-01-15",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: 6,
      title: "Lead Conversion Report",
      description: "Lead sources, conversion funnels, and optimization opportunities.",
      category: "Sales",
      lastUpdated: "2024-01-17",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sales":
        return "bg-green-100 text-green-700";
      case "Pipeline":
        return "bg-blue-100 text-blue-700";
      case "Performance":
        return "bg-purple-100 text-purple-700";
      case "Financial":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      <aside className="w-[263px] flex-shrink-0">
        <SideBarSection />
      </aside>

      <main className="flex-1 flex flex-col bg-[#f5f5f5]">
        <DashboardHeaderSection />
        
        <div className="px-6 py-5 bg-[#f5f5f5]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal]">
                Reports
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Access and generate business reports for insights and analysis.
              </p>
            </div>
            <Button
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-auto px-4 py-2 bg-[#172a41] hover:bg-[#172a41]/90 text-white"
              data-testid="button-create-report"
            >
              Create Custom Report
            </Button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <Card
                key={report.id}
                className="bg-white border-[#ededed] shadow-sm hover:shadow-md transition-shadow"
                data-testid={`report-card-${report.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-[#fffdf9] rounded-lg border border-[#ededed]">
                      {report.icon}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold ${getCategoryColor(report.category)}`}>
                      {report.category}
                    </span>
                  </div>

                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-2">
                    {report.title}
                  </h3>
                  
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#4e657f] text-xs mb-4 line-clamp-2">
                    {report.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#ededed]">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#4e657f] text-[10px]">
                      Updated {report.lastUpdated}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-2"
                        data-testid={`button-view-${report.id}`}
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-2"
                        data-testid={`button-download-${report.id}`}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <Card className="bg-white border-[#ededed] shadow-sm mt-6">
            <CardContent className="p-6">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base mb-4">
                Report Summary
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#fffdf9] rounded-lg border border-[#ededed]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#4e657f] text-xs">
                      Total Reports
                    </span>
                    <FileText className="w-4 h-4 text-[#4e657f]" />
                  </div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#172a41] text-2xl" data-testid="text-total-reports">
                    {reports.length}
                  </p>
                </div>

                <div className="p-4 bg-[#fffdf9] rounded-lg border border-[#ededed]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#4e657f] text-xs">
                      Sales Reports
                    </span>
                    <DollarSign className="w-4 h-4 text-[#4e657f]" />
                  </div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#172a41] text-2xl" data-testid="text-sales-reports">
                    {reports.filter(r => r.category === "Sales").length}
                  </p>
                </div>

                <div className="p-4 bg-[#fffdf9] rounded-lg border border-[#ededed]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#4e657f] text-xs">
                      Performance
                    </span>
                    <Users className="w-4 h-4 text-[#4e657f]" />
                  </div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#172a41] text-2xl" data-testid="text-performance-reports">
                    {reports.filter(r => r.category === "Performance").length}
                  </p>
                </div>

                <div className="p-4 bg-[#fffdf9] rounded-lg border border-[#ededed]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#4e657f] text-xs">
                      Last Updated
                    </span>
                    <TrendingUp className="w-4 h-4 text-[#4e657f]" />
                  </div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm" data-testid="text-last-updated">
                    {reports[0]?.lastUpdated || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
