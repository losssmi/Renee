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
import { Textarea } from "@/components/ui/textarea";

export const DashboardPreview = (): JSX.Element => {
  const [activeNav, setActiveNav] = useState("Accountability");
  const [activeSubNav, setActiveSubNav] = useState("Dashboard");
  const [activeTab, setActiveTab] = useState("daily");

  const navigationItems = [
    { name: "Strategy", active: activeNav === "Strategy" },
    { name: "Structure", active: activeNav === "Structure" },
    { name: "Accountability", active: activeNav === "Accountability" },
  ];

  // Dynamic sub-navigation based on main navigation
  const getSubNavigationItems = () => {
    switch (activeNav) {
      case "Strategy":
        return [
          { name: "Vision", active: activeSubNav === "Vision" },
          { name: "Goals", active: activeSubNav === "Goals" },
          { name: "Priorities", active: activeSubNav === "Priorities" },
          { name: "Market Analysis", active: activeSubNav === "Market Analysis" },
        ];
      case "Structure":
        return [
          { name: "Org Chart", active: activeSubNav === "Org Chart" },
          { name: "Roles", active: activeSubNav === "Roles" },
          { name: "Processes", active: activeSubNav === "Processes" },
          { name: "Systems", active: activeSubNav === "Systems" },
        ];
      case "Accountability":
      default:
        return [
          { name: "Dashboard", active: activeSubNav === "Dashboard" },
          { name: "Scorecard", active: activeSubNav === "Scorecard" },
          { name: "Forecast", active: activeSubNav === "Forecast" },
          { name: "KPIs", active: activeSubNav === "KPIs" },
          { name: "Meetings", active: activeSubNav === "Meetings" },
        ];
    }
  };

  const subNavigationItems = getSubNavigationItems();

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
                onClick={() => {
                  setActiveNav(item.name);
                  // Set default sub-navigation for each section
                  if (item.name === "Strategy") setActiveSubNav("Vision");
                  else if (item.name === "Structure") setActiveSubNav("Org Chart");
                  else if (item.name === "Accountability") setActiveSubNav("Dashboard");
                }}
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
        {/* Conditional Content Based on Navigation */}
        {activeNav === "Strategy" && (
          <div className="text-white">
            {activeSubNav === "Vision" ? <VisionPage /> : 
             activeSubNav === "Goals" ? <GoalsPage /> : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">{activeSubNav}</h2>
                <p className="text-white/60">Coming soon...</p>
              </div>
            )}
          </div>
        )}

        {activeNav === "Structure" && (
          <div className="text-white text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">{activeSubNav}</h2>
            <p className="text-white/60">Coming soon...</p>
          </div>
        )}

        {activeNav === "Accountability" && (
          <>
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
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Quick Analytics</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="total-sales">
                    <SelectTrigger className="w-40 h-8 text-sm bg-white/10 border-white/20 text-white">
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
                    className="h-8 w-8 p-0 transition-colors hover:bg-white/10 text-white"
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
                    <div className="text-sm text-white/60 mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xl font-semibold text-white">
                      {metric.value}
                    </div>
                    {metric.subtitle && (
                      <div className="text-xs text-white/40">
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
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-white/40 px-4">
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
                    className="flex items-center justify-between p-2 hover:bg-white/10 rounded transition-colors cursor-pointer w-full"
                    onClick={() => console.log(`Action item ${index + 1} clicked`)}
                    data-testid={`action-item-${index}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs">
                        <ClipboardList className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-white/90">
                        <span className="font-semibold">{item.count}</span>{" "}
                        {item.text}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GCI Section */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">GCI Metrics </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {gciMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-white mb-1">
                      {metric.title}
                    </div>
                    <div className="text-sm text-white/60 mb-1">
                      {metric.subtitle}
                    </div>
                    <div className="text-xs text-white/40">
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
                      <span className="text-sm font-semibold text-white">
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
  );
};

// Vision Page Component
const VisionPage = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Vision</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Vision</label>
              <Textarea
                placeholder="Enter your vision statement..."
                className="min-h-[100px] resize-none bg-white/10 border-white/20 text-white placeholder:text-white/60"
                data-testid="input-vision"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Mission</label>
              <Textarea
                placeholder="Enter your mission statement..."
                className="min-h-[100px] resize-none bg-white/10 border-white/20 text-white placeholder:text-white/60"
                data-testid="input-mission"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Core Focus</label>
              <Input
                placeholder="Enter your core focus..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                data-testid="input-core-focus"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">USP</label>
              <Input
                placeholder="Enter your unique selling proposition..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                data-testid="input-usp"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Values</label>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Input
                    key={num}
                    placeholder={`Value ${num}`}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    data-testid={`input-value-${num}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - SWOT Analysis */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Strengths</label>
              <Textarea
                placeholder="List your strengths..."
                className="min-h-[120px] resize-none bg-white/10 border-white/20 text-white placeholder:text-white/60"
                data-testid="input-strengths"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Weaknesses</label>
              <Textarea
                placeholder="List your weaknesses..."
                className="min-h-[120px] resize-none bg-white/10 border-white/20 text-white placeholder:text-white/60"
                data-testid="input-weaknesses"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Opportunities</label>
              <Textarea
                placeholder="List opportunities..."
                className="min-h-[120px] resize-none bg-white/10 border-white/20 text-white placeholder:text-white/60"
                data-testid="input-opportunities"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Threats</label>
              <Textarea
                placeholder="List potential threats..."
                className="min-h-[120px] resize-none bg-white/10 border-white/20 text-white placeholder:text-white/60"
                data-testid="input-threats"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <Button 
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            onClick={() => console.log('Reset clicked')}
            data-testid="button-reset"
          >
            Reset
          </Button>
          <Button 
            className="bg-white text-black hover:bg-gray-100"
            onClick={() => console.log('Save Vision clicked')}
            data-testid="button-save-vision"
          >
            Save Vision
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Goals Page Component - Monday.com style
const GoalsPage = () => {
  const goals = [
    {
      id: 1,
      task: "Increase monthly revenue by 25%",
      status: "In Progress",
      priority: "High",
      progress: 65,
      assignee: "John D",
      dueDate: "Dec 15, 2025",
      completed: false
    },
    {
      id: 2,
      task: "Launch new product line",
      status: "Planning",
      priority: "High",
      progress: 30,
      assignee: "Sarah M",
      dueDate: "Jan 30, 2026",
      completed: false
    },
    {
      id: 3,
      task: "Improve customer satisfaction score",
      status: "Done",
      priority: "Medium",
      progress: 100,
      assignee: "Mike R",
      dueDate: "Nov 20, 2025",
      completed: true
    },
    {
      id: 4,
      task: "Expand to 3 new markets",
      status: "In Progress",
      priority: "High",
      progress: 45,
      assignee: "Anna L",
      dueDate: "Mar 15, 2026",
      completed: false
    },
    {
      id: 5,
      task: "Reduce operational costs by 15%",
      status: "Planning",
      priority: "Medium",
      progress: 20,
      assignee: "Tom W",
      dueDate: "Feb 28, 2026",
      completed: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Done": return "bg-green-500";
      case "In Progress": return "bg-blue-500";
      case "Planning": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-7xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-2xl">Strategic Goals</CardTitle>
          <Button 
            className="bg-white text-black hover:bg-gray-100"
            onClick={() => console.log('Add Goal clicked')}
            data-testid="button-add-goal"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Board Header */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/20 mb-4">
          <div className="col-span-1 text-sm font-medium text-white/60"></div>
          <div className="col-span-4 text-sm font-medium text-white/60">Goal</div>
          <div className="col-span-1 text-sm font-medium text-white/60">Status</div>
          <div className="col-span-1 text-sm font-medium text-white/60">Priority</div>
          <div className="col-span-2 text-sm font-medium text-white/60">Progress</div>
          <div className="col-span-1 text-sm font-medium text-white/60">Assignee</div>
          <div className="col-span-2 text-sm font-medium text-white/60">Due Date</div>
        </div>

        {/* Goal Rows */}
        <div className="space-y-3">
          {goals.map((goal) => (
            <div 
              key={goal.id}
              className="grid grid-cols-12 gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            >
              {/* Checkbox */}
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => console.log(`Toggle goal ${goal.id}`)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-white focus:ring-white/20"
                  data-testid={`checkbox-goal-${goal.id}`}
                />
              </div>

              {/* Goal Title */}
              <div className="col-span-4 flex items-center">
                <span className={`text-sm ${goal.completed ? 'text-white/60 line-through' : 'text-white'}`}>
                  {goal.task}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-1 flex items-center">
                <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </span>
              </div>

              {/* Priority */}
              <div className="col-span-1 flex items-center">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(goal.priority)}`}></div>
              </div>

              {/* Progress */}
              <div className="col-span-2 flex items-center space-x-2">
                <div className="flex-1 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-white/60">{goal.progress}%</span>
              </div>

              {/* Assignee */}
              <div className="col-span-1 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                  {goal.assignee.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              {/* Due Date */}
              <div className="col-span-2 flex items-center">
                <span className="text-sm text-white/70">{goal.dueDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-2xl font-bold text-white mb-1">5</div>
            <div className="text-sm text-white/60">Total Goals</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-2xl font-bold text-green-400 mb-1">1</div>
            <div className="text-sm text-white/60">Completed</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-2xl font-bold text-blue-400 mb-1">52%</div>
            <div className="text-sm text-white/60">Average Progress</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
