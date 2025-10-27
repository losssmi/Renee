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
        <div className="px-6 mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white border border-[#ededed] p-1 rounded-lg">
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
