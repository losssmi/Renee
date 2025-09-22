import React, { useState } from "react";
import { useLocation } from "wouter";
import backgroundImage from "@assets/background.png";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  Package,
  TrendingDown,
  MoreHorizontal,
  BarChart3,
  ClipboardList,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const DashboardPreview = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [activeNav, setActiveNav] = useState("Home");
  const [activeSubNav, setActiveSubNav] = useState("My Renegade");
  const [activeTab, setActiveTab] = useState("daily");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavChange = (nav: string, subNav?: string) => {
    setActiveNav(nav);
    if (subNav) {
      setActiveSubNav(subNav);
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
    // For example: clear session, etc.
    setLocation("/login");
  };


  const metricCards = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Total sales",
      value: "$ 1,284.00",
      subtitle: "of $ 5,000.00",
      change: "+11%",
      changeText: "vs PREV 30 DAYS",
      positive: true,
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Total Products",
      value: "122",
      subtitle: "Items",
      change: "0%",
      changeText: "vs PREV 30 DAYS",
      positive: false,
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: "% Latest Churn",
      value: "7.81",
      subtitle: "%",
      change: "+1.7%",
      changeText: "vs PREV 30 DAYS",
      positive: false,
    },
  ];

  const quickAnalyticsMetrics = [
    { label: "Average Order Value", value: "$ 124.32" },
    { label: "Last Period Sales", value: "$ 901.77" },
    { label: "Low Stock Products", value: "7", subtitle: "Items" },
  ];

  const gciMetrics = [
    {
      title: "32,000",
      subtitle: "93,000 to go",
      description: "Month to date",
      percentage: 70,
    },
    {
      title: "125,000",
      subtitle: "# to go",
      description: "Quarter to date",
      percentage: 70,
    },
    {
      title: "500,000",
      subtitle: "# to go",
      description: "Year to date",
      percentage: 10,
    },
  ];

  const actionItems = [
    { count: "6", text: "orders to fulfill" },
    { count: "50+", text: "payments to capture" },
    { count: "1", text: "chargeback to review" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--bg))] flex">
      {/* Sidebar */}
      <DashboardSidebar 
        activeNav={activeNav} 
        activeSubNav={activeSubNav} 
        onNavChange={handleNavChange}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader 
          activeNav={activeNav}
          activeSubNav={activeSubNav}
          activeTab={activeNav === "Accountability" ? activeTab : undefined}
          onTabChange={activeNav === "Accountability" ? setActiveTab : undefined}
          onLogout={handleLogout}
        />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pt-4 space-y-4 md:space-y-6 max-w-7xl mx-auto w-full">
        {/* Conditional Content Based on Navigation */}

        {/* Content Based on Navigation */}
        {activeNav === "Home" && activeSubNav === "My Renegade" && (
          <>

            {/* Dashboard Content - Main widgets grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
              {/* Today's structure */}
              <Card className="bg-[hsl(var(--surface-1))] border-[hsl(var(--border))] shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[hsl(var(--text-strong))] text-lg">Today's structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-[hsl(var(--text))] text-sm">
                    <div>10 connects by 10am</div>
                    <div>3 x 45 minute call sessions</div>
                    <div>1 buyer work session</div>
                  </div>
                </CardContent>
              </Card>

              {/* Reminders */}
              <Card className="bg-[hsl(var(--surface-1))] border-[hsl(var(--border))] shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[hsl(var(--text-strong))] text-lg">Reminders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--warning))]"></div>
                      <div className="text-[hsl(var(--text))] text-sm">Hot Stock uncontacted</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--warning))]"></div>
                      <div className="text-[hsl(var(--text))] text-sm">Pipeline coverage</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--warning))]"></div>
                      <div className="text-[hsl(var(--text))] text-sm">Priority drift</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* KPIs */}
              <Card className="bg-[hsl(var(--surface-1))] border-[hsl(var(--border))] shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[hsl(var(--text-strong))] text-lg">KPIs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))]"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))]"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quarterly Priorities */}
              <Card className="bg-[hsl(var(--surface-1))] border-[hsl(var(--border))] shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[hsl(var(--text-strong))] text-lg">Quarterly Priorities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--accent))]"></div>
                      <div className="text-[hsl(var(--text))] text-sm">Launch DL Campaign</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--accent))]"></div>
                      <div className="text-[hsl(var(--text))] text-sm">Build DB to 500</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--accent))]"></div>
                      <div className="text-[hsl(var(--text))] text-sm">Secure 2 expired listings</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeNav === "Strategy" && (
          <div className="text-black">
            {activeSubNav === "Vision" ? (
              <VisionPage />
            ) : activeSubNav === "Goals" ? (
              <GoalsPage />
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4 text-black">{activeSubNav}</h2>
                <p className="text-black">Coming soon...</p>
              </div>
            )}
          </div>
        )}

        {(activeNav === "Structure" || activeNav === "Sales" || activeNav === "Business Audit") && (
          <div className="text-black text-center py-12">
            <h2 className="text-2xl font-semibold mb-4 text-black">{activeSubNav || activeNav}</h2>
            <p className="text-black">Coming soon...</p>
          </div>
        )}

        {activeNav === "Accountability" && (
          <>
            {/* Page Summary */}
            <div className="mb-4">
              <p className="text-[hsl(var(--text-muted))] text-sm">
                Displaying data from September 2025
              </p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metricCards.map((card, index) => (
                <Card
                  key={index}
                  className="bg-[hsl(var(--surface-1))] border-[hsl(var(--border))] backdrop-blur-sm"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[hsl(var(--text-muted))] text-sm font-medium">
                        {card.title}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[hsl(var(--text-muted))] hover:bg-[hsl(var(--surface-2))] h-auto p-1 transition-colors"
                        onClick={() => console.log("Card menu clicked")}
                        data-testid={`button-card-menu-${index}`}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="text-black/60">{card.icon}</div>
                      <span className="text-2xl font-semibold text-black">
                        {card.value}
                      </span>
                      <span className="text-black/60 text-sm">
                        {card.subtitle}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span
                        className={`${card.positive ? "text-green-400" : "text-red-400"}`}
                      >
                        {card.change}
                      </span>
                      <span className="text-black/40">{card.changeText}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* AI Recommendation Card */}
              <Card className="bg-[hsl(var(--surface-2))] border-[hsl(var(--border))] backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-black font-semibold mb-1">
                        8 actions
                      </div>
                      <div className="text-black/60 text-sm">
                        Recommended with AI
                      </div>
                      <div className="text-black/40 text-xs">
                        Requires review
                      </div>
                    </div>
                    <Button
                      className="bg-[#56413C] hover:bg-[#1D0200] text-black h-auto px-3 py-1 text-sm transition-colors"
                      onClick={() => console.log("See All Actions clicked")}
                      data-testid="button-see-actions"
                    >
                      See All Actions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics and GCI Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Analytics */}
              <Card className="bg-[#FFFBEF]/10 backdrop-blur-md border-[#C7BDB4]/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-black">
                      Quick Analytics
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Select defaultValue="total-sales">
                        <SelectTrigger className="w-40 h-8 text-sm bg-[#FFFBEF]/10 border-[#C7BDB4]/20 text-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="total-sales">
                            View Total Sales
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 transition-colors hover:bg-[#C7BDB4]/10 text-black"
                        onClick={() => console.log("Analytics chart clicked")}
                        data-testid="button-analytics-chart"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {quickAnalyticsMetrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-sm text-black/60 mb-1">
                          {metric.label}
                        </div>
                        <div className="text-xl font-semibold text-black">
                          {metric.value}
                        </div>
                        {metric.subtitle && (
                          <div className="text-xs text-black/40">
                            {metric.subtitle}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="h-48 relative mb-4">
                    <svg className="w-full h-full" viewBox="0 0 400 150">
                      {/* Grid lines */}
                      <defs>
                        <pattern
                          id="grid"
                          width="40"
                          height="30"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 40 0 L 0 0 0 30"
                            fill="none"
                            stroke="#f0f0f0"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* Chart lines */}
                      <path
                        d="M 20 120 L 60 100 L 100 110 L 140 80 L 180 70 L 220 90 L 260 85 L 300 75 L 340 80 L 380 70"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      <path
                        d="M 20 130 L 60 125 L 100 120 L 140 115 L 180 110 L 220 115 L 260 120 L 300 115 L 340 110 L 380 105"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />

                      {/* Data points */}
                      <circle cx="180" cy="70" r="3" fill="#10b981" />
                      <circle cx="180" cy="110" r="3" fill="#f59e0b" />

                      {/* Tooltip */}
                      <rect
                        x="140"
                        y="45"
                        width="80"
                        height="35"
                        fill="white"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        rx="4"
                      />
                      <text x="150" y="60" fontSize="10" fill="#374151">
                        15 June 2025
                      </text>
                      <text x="150" y="72" fontSize="10" fill="#10b981">
                        $ 124.32
                      </text>
                    </svg>

                    {/* X-axis labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-black/40 px-4">
                      <span>2 Jun</span>
                      <span>9 Jun</span>
                      <span>15 Jun</span>
                      <span>21 Jun</span>
                      <span>28 Jun</span>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="space-y-2">
                    {actionItems.map((item, index) => (
                      <button
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-[#C7BDB4]/10 rounded transition-colors cursor-pointer w-full"
                        onClick={() =>
                          console.log(`Action item ${index + 1} clicked`)
                        }
                        data-testid={`action-item-${index}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-[#FFFBEF]/20 rounded flex items-center justify-center text-xs">
                            <ClipboardList className="w-3 h-3" />
                          </div>
                          <span className="text-sm text-black/90">
                            <span className="font-semibold">{item.count}</span>{" "}
                            {item.text}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-black/40" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* GCI Section */}
              <Card className="bg-[#FFFBEF]/10 backdrop-blur-md border-[#C7BDB4]/20">
                <CardHeader>
                  <CardTitle className="text-black">GCI Metrics </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {gciMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-black mb-1">
                          {metric.title}
                        </div>
                        <div className="text-sm text-black/60 mb-1">
                          {metric.subtitle}
                        </div>
                        <div className="text-xs text-black/40">
                          {metric.description}
                        </div>
                      </div>
                      <div className="relative w-16 h-16">
                        <svg
                          className="w-16 h-16 transform -rotate-90"
                          viewBox="0 0 64 64"
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="6"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke={
                              metric.percentage === 10 ? "#ef4444" : "#374151"
                            }
                            strokeWidth="6"
                            strokeDasharray={`${metric.percentage * 1.76} 176`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-semibold text-black">
                            {metric.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </>
        )}
        </main>
      </div>
    </div>
  );
};

// Vision Page Component
const VisionPage = () => {
  return (
    <Card className="bg-[hsl(var(--surface-1))] border-[hsl(var(--border))] shadow-sm max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-black text-2xl">Vision</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Vision
              </label>
              <Textarea
                placeholder="Enter your vision statement..."
                className="min-h-[100px] resize-none bg-[hsl(var(--surface-2))] border-[hsl(var(--border))] text-black placeholder:text-[hsl(var(--text-muted))]"
                data-testid="input-vision"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                Mission
              </label>
              <Textarea
                placeholder="Enter your mission statement..."
                className="min-h-[100px] resize-none bg-[#FFFBEF]/10 border-[#C7BDB4]/20 text-black placeholder:text-black/60"
                data-testid="input-mission"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                Core Focus
              </label>
              <Input
                placeholder="Enter your core focus..."
                className="bg-[#FFFBEF]/10 border-[#C7BDB4]/20 text-black placeholder:text-black/60"
                data-testid="input-core-focus"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                USP
              </label>
              <Input
                placeholder="Enter your unique selling proposition..."
                className="bg-[#FFFBEF]/10 border-[#C7BDB4]/20 text-black placeholder:text-black/60"
                data-testid="input-usp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                Values
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Input
                    key={num}
                    placeholder={`Value ${num}`}
                    className="bg-[#FFFBEF]/10 border-[#C7BDB4]/20 text-black placeholder:text-black/60"
                    data-testid={`input-value-${num}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - SWOT Analysis */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                Strengths
              </label>
              <Textarea
                placeholder="List your strengths..."
                className="min-h-[120px] resize-none bg-[#FFFBEF]/10 border-[#C7BDB4]/20 text-black placeholder:text-black/60"
                data-testid="input-strengths"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                Weaknesses
              </label>
              <Textarea
                placeholder="List your weaknesses..."
                className="min-h-[120px] resize-none bg-[#FFFBEF]/10 border-[#C7BDB4]/20 text-black placeholder:text-black/60"
                data-testid="input-weaknesses"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                Opportunities
              </label>
              <Textarea
                placeholder="List opportunities..."
                className="min-h-[120px] resize-none bg-[#FFFBEF]/10 border-[#C7BDB4]/20 text-black placeholder:text-black/60"
                data-testid="input-opportunities"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                Threats
              </label>
              <Textarea
                placeholder="List potential threats..."
                className="min-h-[120px] resize-none bg-[#FFFBEF]/10 border-[#C7BDB4]/20 text-black placeholder:text-black/60"
                data-testid="input-threats"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <Button
            variant="outline"
            className="border-[#C7BDB4]/30 text-black hover:bg-[#C7BDB4]/10"
            onClick={() => console.log("Reset clicked")}
            data-testid="button-reset"
          >
            Reset
          </Button>
          <Button
            className="bg-[#FFFBEF] text-[#1D0200] hover:bg-[#C7BDB4]"
            onClick={() => console.log("Save Vision clicked")}
            data-testid="button-save-vision"
          >
            Save Vision
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Goals Page Component - Original client design with glass morphism
const GoalsPage = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("1 year Goals");

  const timeframes = ["1 year Goals", "3 year Goals", "10 year Goals"];

  const goalCategories = [
    "Future date",
    "Revenue (GCI)",
    "Profit",
    "KPIs",
    "Revenue",
    "Client base",
  ];

  const lifeAreas = [
    "Business",
    "Health (Physical & Mental)",
    "Relationships",
    "Finance/Investments",
    "Personal Growth/Learning",
    "Spirituality/Values",
  ];

  return (
    <Card className="bg-[hsl(var(--surface-1))] backdrop-blur-md border-[hsl(var(--border))] max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="text-black text-2xl mb-6">Goals</CardTitle>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-[hsl(var(--surface-2))] rounded-lg p-1">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setActiveTimeframe(timeframe)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTimeframe === timeframe
                  ? "bg-[hsl(var(--surface-3))] text-black"
                  : "text-black/60 hover:text-black hover:bg-[hsl(var(--surface-3))]"
              }`}
              data-testid={`tab-${timeframe.replace(" ", "-").toLowerCase()}`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Left Sidebar - Goal Categories */}
          <div className="lg:w-2/5 space-y-3 pr-4">
            {goalCategories.map((category, index) => (
              <div
                key={index}
                className="p-4 bg-[#FFFBEF]/5 rounded-lg border border-[#C7BDB4]/10 hover:bg-[#C7BDB4]/10 transition-colors"
              >
                <div className="text-black font-medium">{category}</div>
              </div>
            ))}
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-[hsl(var(--border))]"></div>

          {/* Purpose/Result Components positioned directly next to divider */}
          <div className="lg:w-3/5 space-y-4 pl-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <h3 className="text-black font-semibold text-lg">Purpose</h3>
              </div>
              <div className="text-center">
                <h3 className="text-black font-semibold text-lg">Result</h3>
              </div>
            </div>

            {lifeAreas.map((area, index) => (
              <div
                key={index}
                className="bg-[hsl(var(--surface-2))] rounded-lg border border-[hsl(var(--border))] p-4"
              >
                <div className="mb-3">
                  <span className="text-black/90 font-medium text-sm">
                    {area}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Purpose Column */}
                  <div>
                    <Textarea
                      placeholder="Enter purpose..."
                      className="min-h-[80px] resize-none bg-[hsl(var(--surface-3))] border-[hsl(var(--border))] text-black placeholder:text-[hsl(var(--text-muted))] text-sm"
                      data-testid={`purpose-${area.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    />
                  </div>

                  {/* Result Column */}
                  <div>
                    <Textarea
                      placeholder="Enter result..."
                      className="min-h-[80px] resize-none bg-[hsl(var(--surface-3))] border-[hsl(var(--border))] text-black placeholder:text-[hsl(var(--text-muted))] text-sm"
                      data-testid={`result-${area.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    />
                  </div>
                </div>

                {/* Progress indicator inspired by Monday.com */}
                <div className="mt-3 flex items-center space-x-2">
                  <div className="flex-1 bg-[hsl(var(--border))] rounded-full h-1">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-1 rounded-full w-0 transition-all"></div>
                  </div>
                  <span className="text-xs text-black/40">0%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button
            variant="outline"
            className="border-[#C7BDB4]/30 text-black hover:bg-[#C7BDB4]/10"
            onClick={() => console.log("Reset Goals clicked")}
            data-testid="button-reset-goals"
          >
            Reset
          </Button>
          <Button
            className="bg-[#FFFBEF] text-[#1D0200] hover:bg-[#C7BDB4]"
            onClick={() => console.log("Save Goals clicked")}
            data-testid="button-save-goals"
          >
            Save Goals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
