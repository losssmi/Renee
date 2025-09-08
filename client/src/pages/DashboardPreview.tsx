import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal, 
  Plus,
  Eye,
  Target,
  PieChart,
  BarChart,
  Users,
  Calendar
} from "lucide-react";
import backgroundImage from "@assets/background.png";

const DashboardPreview = () => {
  const [activeNav, setActiveNav] = useState("Strategy");
  const [activeSubNav, setActiveSubNav] = useState("Vision");
  const [activeTab, setActiveTab] = useState("daily");

  const navItems = [
    {
      name: "Strategy",
      subItems: ["Vision", "Goals", "Priorities", "Market Analysis"],
    },
    {
      name: "Structure", 
      subItems: ["Org Chart", "Roles", "Processes", "Systems"],
    },
    {
      name: "Accountability",
      subItems: ["Dashboard", "Scorecard", "Forecast", "KPIs", "Meetings"],
    },
  ];

  const handleNavClick = (navName: string, defaultSubItem?: string) => {
    setActiveNav(navName);
    if (defaultSubItem) {
      setActiveSubNav(defaultSubItem);
    }
  };

  const handleSubNavClick = (subNavName: string) => {
    setActiveSubNav(subNavName);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white">Business Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-white/80">Welcome back, Antoine</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8 py-4">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`text-white/80 hover:text-white hover:bg-white/10 transition-colors ${
                  activeNav === item.name ? "text-white bg-white/10" : ""
                }`}
                onClick={() => handleNavClick(item.name, item.subItems[0])}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Button>
            ))}
          </div>

          {/* Sub Navigation */}
          {activeNav && (
            <div className="flex space-x-6 pb-4 border-t border-white/10 pt-4">
              {navItems
                .find((item) => item.name === activeNav)
                ?.subItems.map((subItem) => (
                  <Button
                    key={subItem}
                    variant="ghost"
                    size="sm"
                    className={`text-white/60 hover:text-white hover:bg-white/5 transition-colors ${
                      activeSubNav === subItem ? "text-white bg-white/10" : ""
                    }`}
                    onClick={() => handleSubNavClick(subItem)}
                    data-testid={`subnav-${subItem.toLowerCase().replace(' ', '-')}`}
                  >
                    {subItem}
                  </Button>
                ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Strategy - Vision Page */}
        {activeNav === "Strategy" && activeSubNav === "Vision" && (
          <VisionPage />
        )}
        
        {/* Strategy - Other Sub-pages */}
        {activeNav === "Strategy" && activeSubNav !== "Vision" && (
          <div className="text-white text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">{activeSubNav}</h2>
            <p className="text-white/60">Coming soon...</p>
          </div>
        )}

        {/* Structure Pages */}
        {activeNav === "Structure" && (
          <div className="text-white text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">{activeSubNav}</h2>
            <p className="text-white/60">Coming soon...</p>
          </div>
        )}

        {/* Accountability Pages */}
        {activeNav === "Accountability" && activeSubNav === "Dashboard" && (
          <AccountabilityDashboard />
        )}
        
        {activeNav === "Accountability" && activeSubNav === "Scorecard" && (
          <ScorecardPage />
        )}
        
        {activeNav === "Accountability" && activeSubNav === "Forecast" && (
          <ForecastPage />
        )}
        
        {activeNav === "Accountability" && activeSubNav === "KPIs" && (
          <KPIsPage />
        )}
        
        {activeNav === "Accountability" && activeSubNav === "Meetings" && (
          <MeetingsPage />
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

// Accountability Page Components
const AccountabilityDashboard = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Revenue</h3>
            <div className="text-3xl font-bold text-white">$234,567</div>
            <div className="text-green-400 text-sm">+12.5% from last month</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Active Users</h3>
            <div className="text-3xl font-bold text-white">15,234</div>
            <div className="text-green-400 text-sm">+8.3% from last month</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Conversion Rate</h3>
            <div className="text-3xl font-bold text-white">3.47%</div>
            <div className="text-red-400 text-sm">-1.2% from last month</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Customer Satisfaction</h3>
            <div className="text-3xl font-bold text-white">4.8/5</div>
            <div className="text-green-400 text-sm">+0.3 from last month</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Market Share</h3>
            <div className="text-3xl font-bold text-white">23.4%</div>
            <div className="text-green-400 text-sm">+2.1% from last month</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Goals Achieved</h3>
            <div className="text-3xl font-bold text-white">7/10</div>
            <div className="text-yellow-400 text-sm">On track</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ScorecardPage = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Scorecard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {[
            { metric: "Revenue Growth", target: "15%", actual: "12.5%", status: "yellow" },
            { metric: "Customer Acquisition", target: "1000", actual: "1200", status: "green" },
            { metric: "Churn Rate", target: "<5%", actual: "3.2%", status: "green" },
            { metric: "Net Promoter Score", target: ">50", actual: "68", status: "green" },
            { metric: "Market Expansion", target: "3 regions", actual: "2 regions", status: "red" },
            { metric: "Product Development", target: "4 features", actual: "3 features", status: "yellow" }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">{item.metric}</h3>
                  <div className="text-white/70 text-sm mt-1">
                    Target: {item.target} | Actual: {item.actual}
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full ${
                  item.status === 'green' ? 'bg-green-500' : 
                  item.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ForecastPage = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Revenue Forecast</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Q1 2024</span>
                <span className="text-white font-medium">$250K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Q2 2024</span>
                <span className="text-white font-medium">$285K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Q3 2024</span>
                <span className="text-white font-medium">$320K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Q4 2024</span>
                <span className="text-white font-medium">$365K</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Growth Projections</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">User Growth</span>
                <span className="text-green-400 font-medium">+25%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Market Expansion</span>
                <span className="text-green-400 font-medium">+40%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Revenue Growth</span>
                <span className="text-green-400 font-medium">+30%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Team Growth</span>
                <span className="text-blue-400 font-medium">+50%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const KPIsPage = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Key Performance Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { kpi: "Monthly Recurring Revenue", value: "$45,230", change: "+18%", trend: "up" },
            { kpi: "Customer Lifetime Value", value: "$2,340", change: "+12%", trend: "up" },
            { kpi: "Customer Acquisition Cost", value: "$127", change: "-8%", trend: "down" },
            { kpi: "Gross Margin", value: "68%", change: "+3%", trend: "up" },
            { kpi: "Employee Satisfaction", value: "8.4/10", change: "+0.5", trend: "up" },
            { kpi: "Product Quality Score", value: "92%", change: "+4%", trend: "up" }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <h3 className="text-white/90 text-sm font-medium mb-2">{item.kpi}</h3>
              <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
              <div className={`text-sm ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {item.change} from last period
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const MeetingsPage = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Meetings & Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {[
            { title: "Weekly Leadership Review", date: "Every Monday 9:00 AM", attendees: "Executive Team", status: "recurring" },
            { title: "Monthly Board Meeting", date: "First Thursday 2:00 PM", attendees: "Board Members", status: "upcoming" },
            { title: "Quarterly Business Review", date: "March 15, 2024 10:00 AM", attendees: "All Departments", status: "scheduled" },
            { title: "Annual Strategy Session", date: "December 1-2, 2024", attendees: "Leadership Team", status: "planning" },
            { title: "Customer Advisory Board", date: "Bi-monthly 3:00 PM", attendees: "Key Customers", status: "recurring" }
          ].map((meeting, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium">{meeting.title}</h3>
                  <p className="text-white/70 text-sm mt-1">{meeting.date}</p>
                  <p className="text-white/60 text-xs mt-1">Attendees: {meeting.attendees}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  meeting.status === 'recurring' ? 'bg-blue-500/20 text-blue-400' :
                  meeting.status === 'upcoming' ? 'bg-green-500/20 text-green-400' :
                  meeting.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {meeting.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { DashboardPreview };