import { useState } from "react";
import { DashboardPageLayout } from "@/components/DashboardPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SellersContent } from "./Sellers";
import { ListingsContent } from "./Listings";
import { AppraisalsContent } from "./Appraisals";
import { BuyersContent } from "./Buyers";

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

      <div className="pb-6 bg-[#f5f5f5]">
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto mb-4">
              <TabsTrigger 
                value="sellers" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2"
                data-testid="tab-sellers"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Sellers</span>
              </TabsTrigger>
              <TabsTrigger 
                value="listings" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2"
                data-testid="tab-listings"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Listings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="appraisals" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2"
                data-testid="tab-appraisals"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Appraisals</span>
              </TabsTrigger>
              <TabsTrigger 
                value="buyers" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2"
                data-testid="tab-buyers"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Buyers</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sellers" className="mt-0">
              <SellersContent />
            </TabsContent>

            <TabsContent value="listings" className="mt-0">
              <ListingsContent />
            </TabsContent>

            <TabsContent value="appraisals" className="mt-0">
              <AppraisalsContent />
            </TabsContent>

            <TabsContent value="buyers" className="mt-0">
              <BuyersContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
