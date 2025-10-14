import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";

export function VisionGoals() {
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
                Vision
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Define your direction, clarify your purpose, and align your growth.
              </p>
            </div>
            <button className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-2 py-1 border border-[#ededed] rounded-lg bg-white hover:bg-gray-50 transition-colors" data-testid="button-edit-vision">
              Edit
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-4 bg-[#f5f5f5]">
          <div className="flex gap-4">
            <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <img className="w-6 h-6" alt="Purpose & Direction" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    Purpose & Direction
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start gap-4 mb-2">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                        Vision:
                      </span>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                        Your ultimate destination — what success looks like in 10 years.
                      </span>
                    </div>
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3] ml-16">
                      Example: "To be the most trusted real estate advisor in the region, known for innovation and client care."
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-4 mb-2">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                        Mission:
                      </span>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                        Your promise and focus — how you'll get there.
                      </span>
                    </div>
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3] ml-16">
                      Example: "To help clients achieve their property goals through insight, integrity, and consistency."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <img className="w-6 h-6" alt="Core Identity" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                  <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                    Core Identity
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start gap-4 mb-2">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                        Core Focus:
                      </span>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                        What do you do best? What's your niche?
                      </span>
                    </div>
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3] ml-16">
                      Example: "Luxury waterfront listings & investor relations."
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-4 mb-2">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                        USP:
                      </span>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                        Why you're different.
                      </span>
                    </div>
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3] ml-16">
                      Example: "Combining high-end presentation with strategic marketing."
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-4 mb-2">
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3]">
                        Values:
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        {['Integrity', 'Growth', 'Client First', 'Innovation'].map((value) => (
                          <span key={value} className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[10px] tracking-[-0.1px] px-2 py-1 bg-[#e8ffe6] border border-[#c6ffc1] rounded shadow-[inset_0px_0px_4px_rgba(0,0,0,0.1)]">
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <img className="w-6 h-6" alt="SWOT Overview" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                  SWOT Overview
                </h2>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                    Strengths
                  </h3>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3]">
                    Example: "Strong local brand"
                  </p>
                </div>

                <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                    Weaknesses
                  </h3>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3]">
                    Example: "Limited automation"
                  </p>
                </div>

                <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                    Opportunities
                  </h3>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3]">
                    "New luxury developments"
                  </p>
                </div>

                <div className="bg-[#f5f5f5] border border-[#f3f3f3] rounded-lg p-4 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                  <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                    Threats
                  </h3>
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3]">
                    "High competition in area"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <img className="w-6 h-6" alt="BHAG" src="/figmaAssets/lsicon-sales-return-outline.svg" />
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7">
                  BHAG (Big Hairy Audacious Goal)
                </h2>
              </div>
              
              <div>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[-0.14px] leading-[1.3] mb-2">
                  Your 10-year game-changer.
                </p>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-light text-[10px] text-[rgba(23,42,65,0.62)] tracking-[-0.1px] leading-[1.3]">
                  Example: "Achieve $10M in sales volume and open 2 regional offices."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
