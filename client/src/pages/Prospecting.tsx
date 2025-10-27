import { useState } from "react";
import { Link } from "wouter";
import { DashboardPageLayout } from "@/components/DashboardPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Prospecting() {
  const [activeTab, setActiveTab] = useState("sellers");

  return (
    <DashboardPageLayout>
      <div className="px-6 py-5 bg-[#f5f5f5]">
        <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal] mb-2">
          Prospecting
        </h1>
        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
          Manage your appraisals, buyers, sellers, and listings.
        </p>
      </div>

      <div className="px-6 pb-6 bg-[#f5f5f5]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white border border-[#ededed] p-1 rounded-lg mb-4">
            <TabsTrigger 
              value="sellers" 
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] data-[state=active]:bg-[#172a41] data-[state=active]:text-white"
              data-testid="tab-sellers"
            >
              Sellers
            </TabsTrigger>
            <TabsTrigger 
              value="listings" 
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] data-[state=active]:bg-[#172a41] data-[state=active]:text-white"
              data-testid="tab-listings"
            >
              Listings
            </TabsTrigger>
            <TabsTrigger 
              value="appraisals" 
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] data-[state=active]:bg-[#172a41] data-[state=active]:text-white"
              data-testid="tab-appraisals"
            >
              Appraisals
            </TabsTrigger>
            <TabsTrigger 
              value="buyers" 
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] data-[state=active]:bg-[#172a41] data-[state=active]:text-white"
              data-testid="tab-buyers"
            >
              Buyers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sellers" className="mt-0">
            <div className="bg-white rounded-lg border border-[#ededed] p-6">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm mb-4">
                Manage your seller prospects and track them through the sales funnel.
              </p>
              <Link href="/sellers">
                <Button className="bg-[#172a41] hover:bg-[#172a41]/90 text-white" data-testid="link-sellers-page">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica]">Go to Sellers</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="mt-0">
            <div className="bg-white rounded-lg border border-[#ededed] p-6">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm mb-4">
                Track your listings from pre-market to on market stages.
              </p>
              <Link href="/listings">
                <Button className="bg-[#172a41] hover:bg-[#172a41]/90 text-white" data-testid="link-listings-page">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica]">Go to Listings</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="appraisals" className="mt-0">
            <div className="bg-white rounded-lg border border-[#ededed] p-6">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm mb-4">
                Manage property appraisals and track your conversion rates.
              </p>
              <Link href="/appraisals">
                <Button className="bg-[#172a41] hover:bg-[#172a41]/90 text-white" data-testid="link-appraisals-page">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica]">Go to Appraisals</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="buyers" className="mt-0">
            <div className="bg-white rounded-lg border border-[#ededed] p-6">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm mb-4">
                Track your buyer prospects and their property requirements.
              </p>
              <Link href="/buyers">
                <Button className="bg-[#172a41] hover:bg-[#172a41]/90 text-white" data-testid="link-buyers-page">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica]">Go to Buyers</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}
