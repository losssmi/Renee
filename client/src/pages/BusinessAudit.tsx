import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

interface MarketingActivity {
  activity: string;
  frequency: string;
  budgetPerMonth: string;
  totalBudget: string;
}

interface TeamMember {
  name: string;
  title: string;
}

export function BusinessAudit() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("business-audit");

  const assessmentQuestions = [
    "Are you focusing on building your client base and learning the basics of prospecting?",
    "Is your growth currently slow, with modest sales volume?",
    "Have you implemented a daily prospecting schedule for lead generation?",
    "Have you established mentorship relationships with at least two experienced agents?",
    "Have you set up and maintained a CRM system?",
    "Are you focusing on basic marketing and learning tools and techniques?",
    "Are you concentrating on learning and small transactions, with heavy reliance on mentors and guidance?",
    "Do you have an administrative assistant or 1 junior agent on your team?",
    "Are you focusing on building systems and expanding prospecting efforts to strengthen client relationships?",
    "Is your sales volume increasing, with a broader market reach?",
    "Have you standardised pipeline stages and implemented CRM tools for sales?",
    "Are you building strong relationships to secure repeat business?",
    "Have you automated routine marketing tasks to save time?",
    "Are you utilising social media, basic digital marketing, and local networking for client acquisition?",
    "Is your prospecting more consistent, targeting higher-value clients, and refining your sales pitch?",
  ];

  const [kpiResponses, setKpiResponses] = useState<Record<number, 'yes' | 'no' | null>>({});

  const setKpiResponse = (index: number, value: 'yes' | 'no') => {
    setKpiResponses({ 
      ...kpiResponses, 
      [index]: kpiResponses[index] === value ? null : value 
    });
  };

  const [marketingPlan, setMarketingPlan] = useState<MarketingActivity[]>([
    { activity: "CRM", frequency: "Monthly", budgetPerMonth: "", totalBudget: "" },
    { activity: "DLs", frequency: "Weekly", budgetPerMonth: "", totalBudget: "" },
    { activity: "Letters", frequency: "Weekly", budgetPerMonth: "", totalBudget: "" },
    { activity: "Printed Newsletter", frequency: "Monthly", budgetPerMonth: "", totalBudget: "" },
    { activity: "Social", frequency: "Posting three times per week", budgetPerMonth: "", totalBudget: "" },
    { activity: "Video content", frequency: "Creating three per month", budgetPerMonth: "", totalBudget: "" },
    { activity: "Email Newsletter", frequency: "As required", budgetPerMonth: "", totalBudget: "" },
    { activity: "Website", frequency: "As required", budgetPerMonth: "", totalBudget: "" },
    { activity: "SMS", frequency: "As required", budgetPerMonth: "", totalBudget: "" },
    { activity: "Banner Ads", frequency: "Monthly", budgetPerMonth: "", totalBudget: "" },
  ]);

  const prospectingDaily = {
    vendors: ["Active Vendors", "Pipeline", "Core Area"],
    buyers: ["Hot Buyers", "Buyers Agents", "Enquiries"]
  };

  const prospectingWeekly = {
    vendors: ["Expired Listings", "Just Listed", "Just Sold"],
    buyers: ["OFIs", "", "Letters"]
  };

  const prospectingQuarterly = {
    vendors: ["Past Purchasers", "Past Appraisals", "Past Vendors", "Archived Landlords"],
    buyers: ["Neighbourhood", "Buyer", "Just Listed", "Just Sold", "Newsletter"]
  };

  const [salesOffMarket] = useState({
    week1: { inspections: "10", priceFeedback: "" },
    week2: { inspections: "5", priceFeedback: "" }
  });

  const [salesOnMarket] = useState([
    { activity: "Set to Sell Meeting (face to face)", week1: "", week2: "", week3: "", week4: "" },
    { activity: "Price Revision", week1: "", week2: "", week3: "", week4: "" },
    { activity: "Launch", week1: "", week2: "", week3: "", week4: "" },
    { activity: "BAPs", week1: "3", week2: "3", week3: "3", week4: "3" },
    { activity: "OFI Thursday", week1: "", week2: "", week3: "", week4: "" },
    { activity: "OFI Saturday", week1: "", week2: "", week3: "", week4: "" },
    { activity: "1st round call backs", week1: "", week2: "", week3: "", week4: "" },
    { activity: "Selling Price", week1: "Identify", week2: "Review", week3: "Review", week4: "Review" },
    { activity: "Offers", week1: "2", week2: "2", week3: "1", week4: "Sold" },
    { activity: "Vendor Report", week1: "", week2: "", week3: "", week4: "" },
    { activity: "2nd round call backs", week1: "", week2: "", week3: "", week4: "" },
    { activity: "Vendor Face to Face Meeting", week1: "", week2: "", week3: "", week4: "" },
    { activity: "Readiness to Sell", week1: "", week2: "", week3: "", week4: "" },
  ]);

  const vendorMeetingAgenda = ["Price", "Presentation", "Marketing"];
  
  const afterSalesService = ["On Market", "Pre Auction", "Exchange", "Settlement"];

  const [operations, setOperations] = useState([
    { area: "Marketing", documented: false, followedByAll: false, effective: false },
    { area: "Prospecting", documented: false, followedByAll: false, effective: false },
    { area: "Sales", documented: false, followedByAll: false, effective: false },
    { area: "Service", documented: false, followedByAll: false, effective: false },
    { area: "Team", documented: false, followedByAll: false, effective: false },
    { area: "Leadership", documented: false, followedByAll: false, effective: false },
    { area: "Finance/Accounting", documented: false, followedByAll: false, effective: false },
  ]);

  const [teamOverview, setTeamOverview] = useState<TeamMember[]>([
    { name: "", title: "Owner/Rainmaker" },
    { name: "", title: "Leader" },
    { name: "", title: "Manager" },
    { name: "", title: "Player" },
    { name: "", title: "Support Staff" },
  ]);

  const leadershipAreas = ["Job Descriptions", "Remuneration/Packages", "Onboarding Program", "Probation Review", "Annual Performance Review"];
  const leadershipColumns = ["Director", "BDM", "Leasing", "PM", "Admin"];

  const hrDocuments = ["Letter of Offer", "Induction Checklist", "Onboarding Program", "Letter of Termination"];

  const updateMarketingActivity = (index: number, field: keyof MarketingActivity, value: string) => {
    const updated = [...marketingPlan];
    updated[index] = { ...updated[index], [field]: value };
    setMarketingPlan(updated);
  };

  const updateOperation = (index: number, field: 'documented' | 'followedByAll' | 'effective', value: boolean) => {
    const updated = [...operations];
    updated[index] = { ...updated[index], [field]: value };
    setOperations(updated);
  };

  const updateTeamMember = (index: number, value: string) => {
    const updated = [...teamOverview];
    updated[index] = { ...updated[index], name: value };
    setTeamOverview(updated);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Saved",
      description: "Your business plan has been saved.",
    });
  };

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
        data-testid="button-mobile-menu"
      >
        {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      {/* Sidebar - hidden on mobile, shown on desktop */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-[263px] flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SideBarSection onNavigate={() => setMobileMenuOpen(false)} />
      </aside>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col bg-[#f5f5f5] w-full lg:w-auto">
        <DashboardHeaderSection />
        
        <div className="px-6 py-5 bg-[#f5f5f5]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-2">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-snug">
                Business Audit
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Assess your business health across marketing, sales, and operations.
              </p>
            </div>
            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-3 py-1 border border-[#ededed] rounded-lg bg-white hover:bg-gray-50 transition-colors"
              data-testid="button-edit-business-audit"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="flex-1 flex flex-col">
          <div className="px-6 bg-[#f5f5f5]">
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto mb-4">
              <TabsTrigger 
                value="business-audit" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2" 
                data-testid="tab-business-audit"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Business Audit</span>
              </TabsTrigger>
              <TabsTrigger 
                value="kpis" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2" 
                data-testid="tab-kpis"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">KPIs</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="business-audit" className="flex-1 mt-0">
            <Tabs defaultValue="marketing" className="flex-1 flex flex-col">
              <div className="px-6 bg-[#f5f5f5]">
                <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto mb-4">
                  <TabsTrigger value="marketing" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2" data-testid="tab-marketing">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Marketing</span>
                  </TabsTrigger>
                  <TabsTrigger value="prospecting" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2" data-testid="tab-prospecting">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Prospecting</span>
                  </TabsTrigger>
                  <TabsTrigger value="sales" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2" data-testid="tab-sales">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Sales</span>
                  </TabsTrigger>
                  <TabsTrigger value="operations" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2" data-testid="tab-operations">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Operations & Team</span>
                  </TabsTrigger>
                </TabsList>
              </div>

          <TabsContent value="marketing" className="flex-1 mt-0">
            <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <img className="w-6 h-6" alt="Marketing Plan" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Marketing Plan
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left pb-2 pr-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Acquisition Activities</span>
                          </th>
                          <th className="text-left pb-2 px-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Frequency</span>
                          </th>
                          <th className="text-left pb-2 px-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Budget per month</span>
                          </th>
                          <th className="text-left pb-2 pl-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Total Budget</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketingPlan.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 pr-4">
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">{item.activity}</span>
                            </td>
                            <td className="py-3 px-4">
                              <Input
                                value={item.frequency}
                                onChange={(e) => updateMarketingActivity(index, 'frequency', e.target.value)}
                                disabled={!isEditing}
                                className="h-8 text-xs"
                                data-testid={`input-marketing-frequency-${index}`}
                              />
                            </td>
                            <td className="py-3 px-4">
                              <Input
                                value={item.budgetPerMonth}
                                onChange={(e) => updateMarketingActivity(index, 'budgetPerMonth', e.target.value)}
                                disabled={!isEditing}
                                className="h-8 text-xs"
                                data-testid={`input-marketing-budget-${index}`}
                              />
                            </td>
                            <td className="py-3 pl-4">
                              <Input
                                value={item.totalBudget}
                                onChange={(e) => updateMarketingActivity(index, 'totalBudget', e.target.value)}
                                disabled={!isEditing}
                                className="h-8 text-xs"
                                data-testid={`input-marketing-total-${index}`}
                              />
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-gray-300">
                          <td className="py-3 pr-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm">TOTAL</span>
                          </td>
                          <td className="py-3 px-4"></td>
                          <td className="py-3 px-4"></td>
                          <td className="py-3 pl-4"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="prospecting" className="flex-1 mt-0">
            <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <img className="w-6 h-6" alt="Prospecting Plan" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Prospecting Plan
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">Daily</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-xs mb-2">Vendors</h4>
                          <ul className="space-y-1">
                            {prospectingDaily.vendors.map((item, i) => (
                              <li key={i} className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-xs mb-2">Buyers</h4>
                          <ul className="space-y-1">
                            {prospectingDaily.buyers.map((item, i) => (
                              <li key={i} className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">Weekly</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-xs mb-2">Vendors</h4>
                          <ul className="space-y-1">
                            {prospectingWeekly.vendors.map((item, i) => (
                              <li key={i} className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-xs mb-2">Buyers</h4>
                          <ul className="space-y-1">
                            {prospectingWeekly.buyers.map((item, i) => item && (
                              <li key={i} className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">Quarterly</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-xs mb-2">Vendors</h4>
                          <ul className="space-y-1">
                            {prospectingQuarterly.vendors.map((item, i) => (
                              <li key={i} className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-xs mb-2">Buyers</h4>
                          <ul className="space-y-1">
                            {prospectingQuarterly.buyers.map((item, i) => (
                              <li key={i} className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="flex-1 mt-0">
            <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <img className="w-6 h-6" alt="Sales Plan" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Sales Plan - Off Market
                    </h2>
                  </div>

                  <table className="w-full mb-6">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left pb-2 pr-4 w-1/3">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Activity</span>
                        </th>
                        <th className="text-center pb-2 px-4">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Week 1</span>
                        </th>
                        <th className="text-center pb-2 pl-4">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Week 2</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">Inspections</span>
                        </td>
                        <td className="py-3 px-4">
                          <Input value={salesOffMarket.week1.inspections} disabled={!isEditing} className="h-8 text-xs text-center" data-testid="input-offmarket-week1-inspections" />
                        </td>
                        <td className="py-3 pl-4">
                          <Input value={salesOffMarket.week2.inspections} disabled={!isEditing} className="h-8 text-xs text-center" data-testid="input-offmarket-week2-inspections" />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">Price feedback</span>
                        </td>
                        <td className="py-3 px-4">
                          <Input value={salesOffMarket.week1.priceFeedback} disabled={!isEditing} className="h-8 text-xs" data-testid="input-offmarket-week1-feedback" />
                        </td>
                        <td className="py-3 pl-4">
                          <Input value={salesOffMarket.week2.priceFeedback} disabled={!isEditing} className="h-8 text-xs" data-testid="input-offmarket-week2-feedback" />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex items-center gap-2 mb-4 mt-8">
                    <img className="w-6 h-6" alt="On Market" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Sales Plan - On Market
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left pb-2 pr-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Activity</span>
                          </th>
                          <th className="text-center pb-2 px-2">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Week 1</span>
                          </th>
                          <th className="text-center pb-2 px-2">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Week 2</span>
                          </th>
                          <th className="text-center pb-2 px-2">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Week 3</span>
                          </th>
                          <th className="text-center pb-2 pl-2">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Week 4</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesOnMarket.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 pr-4">
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">{item.activity}</span>
                            </td>
                            <td className="py-2 px-2">
                              <Input value={item.week1} disabled={!isEditing} className="h-8 text-xs text-center" data-testid={`input-onmarket-week1-${index}`} />
                            </td>
                            <td className="py-2 px-2">
                              <Input value={item.week2} disabled={!isEditing} className="h-8 text-xs text-center" data-testid={`input-onmarket-week2-${index}`} />
                            </td>
                            <td className="py-2 px-2">
                              <Input value={item.week3} disabled={!isEditing} className="h-8 text-xs text-center" data-testid={`input-onmarket-week3-${index}`} />
                            </td>
                            <td className="py-2 pl-2">
                              <Input value={item.week4} disabled={!isEditing} className="h-8 text-xs text-center" data-testid={`input-onmarket-week4-${index}`} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white border-[#ededed] shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <img className="w-6 h-6" alt="Meeting Agenda" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                      <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                        Vendor Face to Face Meeting Agenda
                      </h2>
                    </div>
                    <ol className="space-y-2">
                      {vendorMeetingAgenda.map((item, index) => (
                        <li key={index} className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                          {index + 1}. {item}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                <Card className="bg-white border-[#ededed] shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <img className="w-6 h-6" alt="Service" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                      <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                        Service - After Sales Service
                      </h2>
                    </div>
                    <ul className="space-y-2">
                      {afterSalesService.map((item, index) => (
                        <li key={index} className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="flex-1 mt-0">
            <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <img className="w-6 h-6" alt="Operations" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Operations
                    </h2>
                  </div>

                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left pb-2 pr-4">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Area</span>
                        </th>
                        <th className="text-center pb-2 px-4">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Documented</span>
                        </th>
                        <th className="text-center pb-2 px-4">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Followed By All</span>
                        </th>
                        <th className="text-center pb-2 pl-4">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Effective</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {operations.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 pr-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">{item.area}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Checkbox
                              checked={item.documented}
                              onCheckedChange={(checked) => updateOperation(index, 'documented', checked as boolean)}
                              disabled={!isEditing}
                              className="mx-auto"
                              data-testid={`checkbox-documented-${index}`}
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Checkbox
                              checked={item.followedByAll}
                              onCheckedChange={(checked) => updateOperation(index, 'followedByAll', checked as boolean)}
                              disabled={!isEditing}
                              className="mx-auto"
                              data-testid={`checkbox-followed-${index}`}
                            />
                          </td>
                          <td className="py-3 pl-4 text-center">
                            <Checkbox
                              checked={item.effective}
                              onCheckedChange={(checked) => updateOperation(index, 'effective', checked as boolean)}
                              disabled={!isEditing}
                              className="mx-auto"
                              data-testid={`checkbox-effective-${index}`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <img className="w-6 h-6" alt="Team Overview" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Team Overview
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {teamOverview.map((member, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4 items-center">
                        <Input
                          value={member.name}
                          onChange={(e) => updateTeamMember(index, e.target.value)}
                          placeholder="Name"
                          disabled={!isEditing}
                          className="h-8 text-sm"
                          data-testid={`input-team-name-${index}`}
                        />
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                          {member.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <img className="w-6 h-6" alt="Leadership" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Leadership
                    </h2>
                  </div>

                  <table className="w-full mb-6">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left pb-2 pr-4">
                          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">Area</span>
                        </th>
                        {leadershipColumns.map((col, i) => (
                          <th key={i} className="text-center pb-2 px-2">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">{col}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {leadershipAreas.map((area, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2 pr-4">
                            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">{area}</span>
                          </td>
                          {leadershipColumns.map((_, colIndex) => (
                            <td key={colIndex} className="py-2 px-2">
                              <Input disabled={!isEditing} className="h-8 text-xs" data-testid={`input-leadership-${index}-${colIndex}`} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-3">
                    HR Documents
                  </h3>
                  <ul className="space-y-2">
                    {hrDocuments.map((doc, index) => (
                      <li key={index} className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="kpis" className="flex-1 mt-0">
            <div className="px-6 pb-6 bg-[#f5f5f5]">
              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <img className="w-6 h-6" alt="KPIs" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                      Stage of Business Growth Assessments
                    </h2>
                  </div>

                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-4">
                    Lead Overview
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="grid grid-cols-[1fr_50px_50px] gap-4 pb-2 border-b-2 border-gray-200">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs">
                        Assessment Question
                      </span>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs text-center">
                        Y
                      </span>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs text-center">
                        N
                      </span>
                    </div>

                    {/* Question Rows */}
                    {assessmentQuestions.map((question, index) => (
                      <div 
                        key={index} 
                        className="grid grid-cols-[1fr_50px_50px] gap-4 items-center py-2 border-b border-gray-100"
                      >
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                          {question}
                        </span>
                        <div className="flex justify-center">
                          <Checkbox
                            checked={kpiResponses[index] === 'yes'}
                            onCheckedChange={() => setKpiResponse(index, 'yes')}
                            disabled={!isEditing}
                            className="w-5 h-5 data-[state=checked]:bg-[#09b600] data-[state=checked]:border-[#09b600]"
                            data-testid={`checkbox-yes-${index}`}
                          />
                        </div>
                        <div className="flex justify-center">
                          <Checkbox
                            checked={kpiResponses[index] === 'no'}
                            onCheckedChange={() => setKpiResponse(index, 'no')}
                            disabled={!isEditing}
                            className="w-5 h-5 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                            data-testid={`checkbox-no-${index}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
