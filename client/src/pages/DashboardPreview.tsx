import React, { useState } from "react";
import backgroundImage from "@assets/background.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Settings, Search, DollarSign, Package, TrendingDown, MoreHorizontal, BarChart3, ClipboardList, ChevronRight, Plus } from "lucide-react";

export const DashboardPreview = (): JSX.Element => {
  const [activeNav, setActiveNav] = useState("Accountability");
  const [activeSubNav, setActiveSubNav] = useState("Dashboard");
  const [activeTab, setActiveTab] = useState("daily");

  const navigationItems = [
    { name: "Strategy", active: activeNav === "Strategy" },
    { name: "Structure", active: activeNav === "Structure" },
    { name: "Accountability", active: activeNav === "Accountability" },
  ];

  const subNavigationItems = [
    { name: "Dashboard", active: activeSubNav === "Dashboard" },
    { name: "Scorecard", active: activeSubNav === "Scorecard" },
    { name: "Forecast", active: activeSubNav === "Forecast" },
    { name: "KPIs", active: activeSubNav === "KPIs" },
    { name: "Meetings", active: activeSubNav === "Meetings" },
  ];

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
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center space-x-8">
          <div className="text-white text-xl font-semibold">Renegade.</div>
          <nav className="flex space-x-6">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveNav(item.name)}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  item.active
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-white/60 hover:text-white"
                }`}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="w-64 pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              data-testid="search-input"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 transition-colors"
            onClick={() => console.log('Notifications clicked')}
            data-testid="button-notifications"
          >
            <Bell className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 transition-colors"
            onClick={() => console.log('Settings clicked')}
            data-testid="button-settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-orange-500 text-white text-sm">
              A
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Sub Navigation */}
      <nav className="flex items-center px-6 py-3 bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="flex space-x-6">
          {subNavigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveSubNav(item.name)}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                item.active ? "text-white" : "text-white/60 hover:text-white"
              }`}
              data-testid={`subnav-${item.name.toLowerCase()}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Greeting Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">
              Hello Antoine!
            </h1>
            <p className="text-white/60 text-sm">
              Displaying the data from August 2025
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="bg-white/10 border-white/20">
                <TabsTrigger
                  value="daily"
                  className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/20"
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/20"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/20"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button 
              className="bg-white text-black hover:bg-gray-100 h-auto px-4 py-2 transition-colors"
              onClick={() => console.log('Add Product Batch clicked')}
              data-testid="button-add-product"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product Batch
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metricCards.map((card, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 backdrop-blur-sm"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white/60 text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:bg-white/10 h-auto p-1 transition-colors"
                    onClick={() => console.log('Card menu clicked')}
                    data-testid={`button-card-menu-${index}`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-1">
                  <div className="text-white/60">{card.icon}</div>
                  <span className="text-2xl font-semibold text-white">
                    {card.value}
                  </span>
                  <span className="text-white/60 text-sm">{card.subtitle}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span
                    className={`${card.positive ? "text-green-400" : "text-red-400"}`}
                  >
                    {card.change}
                  </span>
                  <span className="text-white/40">{card.changeText}</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* AI Recommendation Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold mb-1">8 actions</div>
                  <div className="text-white/60 text-sm">
                    Recommended with AI
                  </div>
                  <div className="text-white/40 text-xs">Requires review</div>
                </div>
                <Button 
                  className="bg-orange-600 hover:bg-orange-700 text-white h-auto px-3 py-1 text-sm transition-colors"
                  onClick={() => console.log('See All Actions clicked')}
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
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Quick Analytics</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="total-sales">
                    <SelectTrigger className="w-40 h-8 text-sm">
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
                    className="h-8 w-8 p-0 transition-colors hover:bg-gray-100"
                    onClick={() => console.log('Analytics chart clicked')}
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
                    <div className="text-sm text-gray-600 mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xl font-semibold text-gray-900">
                      {metric.value}
                    </div>
                    {metric.subtitle && (
                      <div className="text-xs text-gray-500">
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
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
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
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer w-full"
                    onClick={() => console.log(`Action item ${index + 1} clicked`)}
                    data-testid={`action-item-${index}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">
                        <ClipboardList className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-gray-700">
                        <span className="font-semibold">{item.count}</span>{" "}
                        {item.text}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GCI Section */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">GCI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {gciMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {metric.title}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {metric.subtitle}
                    </div>
                    <div className="text-xs text-gray-500">
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
                      <span className="text-sm font-semibold text-gray-900">
                        {metric.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
