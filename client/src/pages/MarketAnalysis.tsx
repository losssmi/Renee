import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface SuburbData {
  id: number;
  suburb: string;
  medianPrice: string;
  priceChange: string;
  salesVolume: string;
  daysOnMarket: string;
}

const initialSuburbs: SuburbData[] = [
  {
    id: 1,
    suburb: "Woollahra",
    medianPrice: "$3,200,000",
    priceChange: "+5.2%",
    salesVolume: "42",
    daysOnMarket: "28"
  },
  {
    id: 2,
    suburb: "Double Bay",
    medianPrice: "$2,850,000",
    priceChange: "+3.8%",
    salesVolume: "38",
    daysOnMarket: "32"
  }
];

export function MarketAnalysis() {
  const { toast } = useToast();
  const [suburbs, setSuburbs] = useState<SuburbData[]>(initialSuburbs);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    suburb: "",
    medianPrice: "",
    priceChange: "",
    salesVolume: "",
    daysOnMarket: ""
  });

  const resetForm = () => {
    setFormData({
      suburb: "",
      medianPrice: "",
      priceChange: "",
      salesVolume: "",
      daysOnMarket: ""
    });
  };

  const handleEdit = (id: number) => {
    const suburb = suburbs.find(s => s.id === id);
    if (suburb) {
      setFormData({
        suburb: suburb.suburb,
        medianPrice: suburb.medianPrice,
        priceChange: suburb.priceChange,
        salesVolume: suburb.salesVolume,
        daysOnMarket: suburb.daysOnMarket
      });
      setEditingId(id);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editingId !== null) {
      setSuburbs(suburbs.map(suburb => 
        suburb.id === editingId ? { ...suburb, ...formData } : suburb
      ));
      setEditingId(null);
      setIsEditing(false);
      resetForm();
      toast({
        title: "Suburb Updated",
        description: "Suburb data has been updated successfully.",
      });
    }
  };

  const handleAdd = () => {
    const newSuburb: SuburbData = {
      id: suburbs.length + 1,
      ...formData
    };
    setSuburbs([...suburbs, newSuburb]);
    setIsAdding(false);
    resetForm();
    toast({
      title: "Suburb Added",
      description: "New suburb has been added successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setSuburbs(suburbs.filter(suburb => suburb.id !== id));
    toast({
      title: "Suburb Removed",
      description: "Suburb has been removed successfully.",
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
          <div className="flex flex-col gap-2">
            <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal]">
              Market Analysis
            </h1>
            <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
              Track market trends and suburb performance.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 bg-[#f5f5f5]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {suburbs.map((suburb) => (
              <Card key={suburb.id} className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    {editingId === suburb.id && isEditing ? (
                      <Input
                        value={formData.suburb}
                        onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg h-8 border-[#ededed]"
                        data-testid={`input-suburb-${suburb.id}`}
                      />
                    ) : (
                      <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg tracking-[-0.18px] leading-7">
                        {suburb.suburb}
                      </h2>
                    )}
                    <div className="flex gap-2">
                      {editingId === suburb.id && isEditing ? (
                        <Button
                          onClick={handleSave}
                          size="sm"
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 px-3 bg-[#172a41] hover:bg-[#172a41]/90 text-white"
                          data-testid={`button-save-${suburb.id}`}
                        >
                          Save
                        </Button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(suburb.id)}
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-2 py-1 border border-[#ededed] rounded-lg hover:bg-gray-50 transition-colors"
                            data-testid={`button-edit-${suburb.id}`}
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(suburb.id)}
                            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-2 py-1 border border-[#ededed] rounded-lg hover:bg-gray-50 transition-colors"
                            data-testid={`button-delete-${suburb.id}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                        Median Price
                      </p>
                      {editingId === suburb.id && isEditing ? (
                        <Input
                          value={formData.medianPrice}
                          onChange={(e) => setFormData({ ...formData, medianPrice: e.target.value })}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-8 border-[#ededed]"
                          data-testid={`input-medianprice-${suburb.id}`}
                        />
                      ) : (
                        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[0] leading-[24px]" data-testid={`text-medianprice-${suburb.id}`}>
                          {suburb.medianPrice}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                        Price Change
                      </p>
                      {editingId === suburb.id && isEditing ? (
                        <Input
                          value={formData.priceChange}
                          onChange={(e) => setFormData({ ...formData, priceChange: e.target.value })}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-8 border-[#ededed]"
                          data-testid={`input-pricechange-${suburb.id}`}
                        />
                      ) : (
                        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-base tracking-[0] leading-[24px]" data-testid={`text-pricechange-${suburb.id}`}>
                          {suburb.priceChange}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                        Sales Volume
                      </p>
                      {editingId === suburb.id && isEditing ? (
                        <Input
                          value={formData.salesVolume}
                          onChange={(e) => setFormData({ ...formData, salesVolume: e.target.value })}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-8 border-[#ededed]"
                          data-testid={`input-salesvolume-${suburb.id}`}
                        />
                      ) : (
                        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[0] leading-[24px]" data-testid={`text-salesvolume-${suburb.id}`}>
                          {suburb.salesVolume}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                        Days on Market
                      </p>
                      {editingId === suburb.id && isEditing ? (
                        <Input
                          value={formData.daysOnMarket}
                          onChange={(e) => setFormData({ ...formData, daysOnMarket: e.target.value })}
                          className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-8 border-[#ededed]"
                          data-testid={`input-daysonmarket-${suburb.id}`}
                        />
                      ) : (
                        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[0] leading-[24px]" data-testid={`text-daysonmarket-${suburb.id}`}>
                          {suburb.daysOnMarket}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {isAdding ? (
              <Card className="bg-white border-[#ededed] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Input
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      placeholder="Suburb name"
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg h-8 border-[#ededed]"
                      data-testid="input-new-suburb"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                        Median Price
                      </p>
                      <Input
                        value={formData.medianPrice}
                        onChange={(e) => setFormData({ ...formData, medianPrice: e.target.value })}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-8 border-[#ededed]"
                        data-testid="input-new-medianprice"
                      />
                    </div>

                    <div>
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                        Price Change
                      </p>
                      <Input
                        value={formData.priceChange}
                        onChange={(e) => setFormData({ ...formData, priceChange: e.target.value })}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-8 border-[#ededed]"
                        data-testid="input-new-pricechange"
                      />
                    </div>

                    <div>
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                        Sales Volume
                      </p>
                      <Input
                        value={formData.salesVolume}
                        onChange={(e) => setFormData({ ...formData, salesVolume: e.target.value })}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-8 border-[#ededed]"
                        data-testid="input-new-salesvolume"
                      />
                    </div>

                    <div>
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[18px] mb-1">
                        Days on Market
                      </p>
                      <Input
                        value={formData.daysOnMarket}
                        onChange={(e) => setFormData({ ...formData, daysOnMarket: e.target.value })}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-8 border-[#ededed]"
                        data-testid="input-new-daysonmarket"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleAdd}
                      size="sm"
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 px-3 bg-[#172a41] hover:bg-[#172a41]/90 text-white"
                      data-testid="button-save-new"
                    >
                      Add Suburb
                    </Button>
                    <Button
                      onClick={() => {
                        setIsAdding(false);
                        resetForm();
                      }}
                      variant="outline"
                      size="sm"
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-7 px-3"
                      data-testid="button-cancel-new"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border-[#ededed] border-dashed shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent 
                  className="p-6 flex items-center justify-center min-h-[200px]"
                  onClick={() => setIsAdding(true)}
                  data-testid="button-add-suburb"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Plus className="w-8 h-8 text-[#6b7280]" />
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#6b7280] text-sm">
                      Add New Suburb
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
