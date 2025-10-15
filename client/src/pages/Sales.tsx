import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SaleEntry {
  id: number;
  month: string;
  address: string;
  price: string;
  motivation: string;
  leadStatus: string;
  estComm: string;
  estGCI: string;
  appraised: boolean;
}

const initialSales: SaleEntry[] = [
  {
    id: 1,
    month: "Sept",
    address: "1 John Street, Woollahra",
    price: "$3,000,000",
    motivation: "Downsize",
    leadStatus: "OFI",
    estComm: "1.8%",
    estGCI: "$54,000",
    appraised: true
  }
];

export function Sales() {
  const { toast } = useToast();
  const [sales, setSales] = useState<SaleEntry[]>(initialSales);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"listings" | "sales">("listings");
  
  const [formData, setFormData] = useState({
    month: "",
    address: "",
    price: "",
    motivation: "",
    leadStatus: "",
    estComm: "",
    estGCI: "",
    appraised: false
  });

  const resetForm = () => {
    setFormData({
      month: "",
      address: "",
      price: "",
      motivation: "",
      leadStatus: "",
      estComm: "",
      estGCI: "",
      appraised: false
    });
  };

  const handleAdd = () => {
    const newSale: SaleEntry = {
      id: sales.length + 1,
      ...formData
    };
    setSales([...sales, newSale]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Sale Added",
      description: "New sale entry has been added successfully.",
    });
  };

  const handleEdit = (id: number) => {
    const sale = sales.find(s => s.id === id);
    if (sale) {
      setFormData({
        month: sale.month,
        address: sale.address,
        price: sale.price,
        motivation: sale.motivation,
        leadStatus: sale.leadStatus,
        estComm: sale.estComm,
        estGCI: sale.estGCI,
        appraised: sale.appraised
      });
      setEditingId(id);
      setIsAddDialogOpen(true);
    }
  };

  const handleUpdate = () => {
    setSales(sales.map(sale => 
      sale.id === editingId ? { ...sale, ...formData } : sale
    ));
    setIsAddDialogOpen(false);
    setEditingId(null);
    resetForm();
    toast({
      title: "Sale Updated",
      description: "Sale entry has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setSales(sales.filter(sale => sale.id !== id));
    toast({
      title: "Sale Deleted",
      description: "Sale entry has been removed.",
    });
  };

  const toggleAppraised = (id: number) => {
    setSales(sales.map(sale =>
      sale.id === id ? { ...sale, appraised: !sale.appraised } : sale
    ));
  };

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      <aside className="w-[263px] flex-shrink-0">
        <SideBarSection />
      </aside>

      <main className="flex-1 flex flex-col bg-[#f5f5f5]">
        <DashboardHeaderSection />
        
        <div className="px-6 py-5 bg-[#f5f5f5]">
          <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal]">
            Sales
          </h1>
        </div>

        <div className="px-6 pb-6 bg-[#f5f5f5] flex gap-4">
          <Card className="flex-1 bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="bg-[#f5f5f5] rounded-lg p-6 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.25)]">
                <div className="grid grid-cols-8 gap-4 mb-4">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#767676] text-xs">Month</span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#767676] text-xs">Address</span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#767676] text-xs">Price</span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#767676] text-xs">Motivation</span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#767676] text-xs">Lead Status</span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#767676] text-xs">Est. Comm</span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#767676] text-xs">Est. GCI</span>
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#767676] text-xs">Appraised</span>
                </div>

                {sales.map((sale) => (
                  <div key={sale.id} className="bg-white rounded-lg p-3 mb-2 grid grid-cols-8 gap-4 items-center group relative">
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[10px] text-black">{sale.month}</span>
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[10px] text-black">{sale.address}</span>
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[10px] text-black">{sale.price}</span>
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[10px] text-black">{sale.motivation}</span>
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[10px] text-black">{sale.leadStatus}</span>
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[10px] text-black">{sale.estComm}</span>
                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[10px] text-black">{sale.estGCI}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAppraised(sale.id)}
                        className={`w-3 h-3 rounded-full ${sale.appraised ? 'bg-[#09b600]' : 'bg-gray-300'}`}
                        data-testid={`appraised-${sale.id}`}
                      />
                      <div className="absolute right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(sale.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                          data-testid={`edit-sale-${sale.id}`}
                        >
                          <Pencil className="w-3 h-3 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(sale.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                          data-testid={`delete-sale-${sale.id}`}
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => { setEditingId(null); setIsAddDialogOpen(true); }}
                  className="mt-4 w-full"
                  variant="outline"
                  data-testid="button-add-sale"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sale
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[308px] bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("listings")}
                  className={`[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[15px] ${
                    activeTab === "listings" ? "text-[#09b700]" : "text-[#101010]"
                  }`}
                  data-testid="tab-listings"
                >
                  Listings
                </button>
                <button
                  onClick={() => setActiveTab("sales")}
                  className={`[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[15px] ${
                    activeTab === "sales" ? "text-[#09b700]" : "text-[#101010]"
                  }`}
                  data-testid="tab-sales"
                >
                  Sales
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Sale" : "Add New Sale"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Month</label>
                <Input
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  placeholder="e.g., Sept"
                  data-testid="input-month"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., $3,000,000"
                  data-testid="input-price"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g., 1 John Street, Woollahra"
                data-testid="input-address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Motivation</label>
                <Input
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="e.g., Downsize"
                  data-testid="input-motivation"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Lead Status</label>
                <Input
                  value={formData.leadStatus}
                  onChange={(e) => setFormData({ ...formData, leadStatus: e.target.value })}
                  placeholder="e.g., OFI"
                  data-testid="input-lead-status"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Est. Commission</label>
                <Input
                  value={formData.estComm}
                  onChange={(e) => setFormData({ ...formData, estComm: e.target.value })}
                  placeholder="e.g., 1.8%"
                  data-testid="input-est-comm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Est. GCI</label>
                <Input
                  value={formData.estGCI}
                  onChange={(e) => setFormData({ ...formData, estGCI: e.target.value })}
                  placeholder="e.g., $54,000"
                  data-testid="input-est-gci"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.appraised}
                onChange={(e) => setFormData({ ...formData, appraised: e.target.checked })}
                className="w-4 h-4"
                data-testid="checkbox-appraised"
              />
              <label className="text-sm font-medium">Appraised</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); setEditingId(null); resetForm(); }}>
              Cancel
            </Button>
            <Button onClick={editingId ? handleUpdate : handleAdd} data-testid="button-save">
              {editingId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
