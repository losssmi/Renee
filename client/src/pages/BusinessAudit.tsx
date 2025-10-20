import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

export function BusinessAudit() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    revenue: "$450,000",
    expenses: "$280,000",
    profit: "$170,000",
    gci: "$85,000",
    transactions: "42",
    conversionRate: "3.2%",
    avgDealSize: "$2,100,000",
    strengths: "Strong local presence, excellent client relationships, high conversion rate on qualified leads",
    weaknesses: "Limited digital marketing presence, inconsistent follow-up system, reliance on referrals",
    opportunities: "Expand into luxury market segment, develop social media strategy, create buyer database",
    threats: "Increased competition from digital platforms, market volatility, changing buyer preferences"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Business Audit Updated",
      description: "Your business audit has been saved successfully.",
    });
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
                Business Audit
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Review your business performance and strategic position.
              </p>
            </div>
            {isEditing ? (
              <Button
                onClick={handleSave}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white h-9 px-4"
                data-testid="button-save"
              >
                Save Changes
              </Button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-3 py-2 border border-[#ededed] rounded-lg hover:bg-gray-50 transition-colors"
                data-testid="button-edit"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 bg-[#f5f5f5] flex flex-col gap-4">
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                Financial Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                    Revenue (YTD)
                  </p>
                  {isEditing ? (
                    <Input
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-10 border-[#ededed]"
                      data-testid="input-revenue"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#172a41] text-2xl tracking-[0] leading-[32px]" data-testid="text-revenue">
                      {formData.revenue}
                    </p>
                  )}
                </div>

                <div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                    Expenses (YTD)
                  </p>
                  {isEditing ? (
                    <Input
                      value={formData.expenses}
                      onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-10 border-[#ededed]"
                      data-testid="input-expenses"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#172a41] text-2xl tracking-[0] leading-[32px]" data-testid="text-expenses">
                      {formData.expenses}
                    </p>
                  )}
                </div>

                <div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                    Profit (YTD)
                  </p>
                  {isEditing ? (
                    <Input
                      value={formData.profit}
                      onChange={(e) => setFormData({ ...formData, profit: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-10 border-[#ededed]"
                      data-testid="input-profit"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#09b600] text-2xl tracking-[0] leading-[32px]" data-testid="text-profit">
                      {formData.profit}
                    </p>
                  )}
                </div>

                <div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                    GCI (YTD)
                  </p>
                  {isEditing ? (
                    <Input
                      value={formData.gci}
                      onChange={(e) => setFormData({ ...formData, gci: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-10 border-[#ededed]"
                      data-testid="input-gci"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#172a41] text-2xl tracking-[0] leading-[32px]" data-testid="text-gci">
                      {formData.gci}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                Performance Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                    Transactions
                  </p>
                  {isEditing ? (
                    <Input
                      value={formData.transactions}
                      onChange={(e) => setFormData({ ...formData, transactions: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-10 border-[#ededed]"
                      data-testid="input-transactions"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#172a41] text-2xl tracking-[0] leading-[32px]" data-testid="text-transactions">
                      {formData.transactions}
                    </p>
                  )}
                </div>

                <div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                    Conversion Rate
                  </p>
                  {isEditing ? (
                    <Input
                      value={formData.conversionRate}
                      onChange={(e) => setFormData({ ...formData, conversionRate: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-10 border-[#ededed]"
                      data-testid="input-conversionrate"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#172a41] text-2xl tracking-[0] leading-[32px]" data-testid="text-conversionrate">
                      {formData.conversionRate}
                    </p>
                  )}
                </div>

                <div>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                    Avg Deal Size
                  </p>
                  {isEditing ? (
                    <Input
                      value={formData.avgDealSize}
                      onChange={(e) => setFormData({ ...formData, avgDealSize: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-10 border-[#ededed]"
                      data-testid="input-avgdealsize"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#172a41] text-2xl tracking-[0] leading-[32px]" data-testid="text-avgdealsize">
                      {formData.avgDealSize}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                  Strengths
                </h2>
                {isEditing ? (
                  <Textarea
                    value={formData.strengths}
                    onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                    className="[font-family:'Plus_Jakarta_Sans',Helvetica] min-h-[120px] border-[#ededed]"
                    data-testid="input-strengths"
                  />
                ) : (
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[0] leading-[21px]" data-testid="text-strengths">
                    {formData.strengths}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                  Weaknesses
                </h2>
                {isEditing ? (
                  <Textarea
                    value={formData.weaknesses}
                    onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
                    className="[font-family:'Plus_Jakarta_Sans',Helvetica] min-h-[120px] border-[#ededed]"
                    data-testid="input-weaknesses"
                  />
                ) : (
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[0] leading-[21px]" data-testid="text-weaknesses">
                    {formData.weaknesses}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                  Opportunities
                </h2>
                {isEditing ? (
                  <Textarea
                    value={formData.opportunities}
                    onChange={(e) => setFormData({ ...formData, opportunities: e.target.value })}
                    className="[font-family:'Plus_Jakarta_Sans',Helvetica] min-h-[120px] border-[#ededed]"
                    data-testid="input-opportunities"
                  />
                ) : (
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[0] leading-[21px]" data-testid="text-opportunities">
                    {formData.opportunities}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                  Threats
                </h2>
                {isEditing ? (
                  <Textarea
                    value={formData.threats}
                    onChange={(e) => setFormData({ ...formData, threats: e.target.value })}
                    className="[font-family:'Plus_Jakarta_Sans',Helvetica] min-h-[120px] border-[#ededed]"
                    data-testid="input-threats"
                  />
                ) : (
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[0] leading-[21px]" data-testid="text-threats">
                    {formData.threats}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
