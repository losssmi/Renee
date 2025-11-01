import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, GripVertical, MenuIcon, XIcon } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListingsContent } from "./Listings";

interface SaleEntry {
  id: number;
  address: string;
  suburb: string;
  commRate: string;
  soldPrice: string;
  exchangedDate: string;
  methodOfSale: string;
  listingAgent: string;
  conjunction: string;
  leadSource: string;
  listedDate: string;
  daysOnMarket: number;
  settlementDate: string;
  split: string;
  stage: "Exchanged" | "Settled";
}

const initialSales: SaleEntry[] = [
  {
    id: 1,
    address: "15 Beach Road",
    suburb: "Bondi",
    commRate: "2.5",
    soldPrice: "3200000",
    exchangedDate: "20/10/2025",
    methodOfSale: "Private Treaty",
    listingAgent: "Sarah Johnson",
    conjunction: "No",
    leadSource: "Referral",
    listedDate: "10/10/2025",
    daysOnMarket: 10,
    settlementDate: "20/11/2025",
    split: "100",
    stage: "Exchanged"
  },
  {
    id: 2,
    address: "42 Ocean Avenue",
    suburb: "Manly",
    commRate: "2.0",
    soldPrice: "2750000",
    exchangedDate: "15/10/2025",
    methodOfSale: "Auction",
    listingAgent: "Michael Brown",
    conjunction: "Yes",
    leadSource: "Website",
    listedDate: "01/10/2025",
    daysOnMarket: 14,
    settlementDate: "15/11/2025",
    split: "50",
    stage: "Settled"
  }
];

export function Sales() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sales, setSales] = useState<SaleEntry[]>(initialSales);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggedSale, setDraggedSale] = useState<number | null>(null);
  
  // Check for pending sales from Listings page
  useEffect(() => {
    const pendingSales = localStorage.getItem('pendingSales');
    if (pendingSales) {
      const parsed = JSON.parse(pendingSales);
      if (parsed.length > 0) {
        setSales(prev => [...prev, ...parsed]);
        localStorage.removeItem('pendingSales');
        toast({
          title: "Sales Added",
          description: `${parsed.length} listing(s) converted to sales.`,
        });
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    address: "",
    suburb: "",
    commRate: "",
    soldPrice: "",
    exchangedDate: "",
    methodOfSale: "",
    listingAgent: "",
    conjunction: "",
    leadSource: "",
    listedDate: "",
    daysOnMarket: 0,
    settlementDate: "",
    split: "",
    stage: "Exchanged" as "Exchanged" | "Settled"
  });

  const resetForm = () => {
    setFormData({
      address: "",
      suburb: "",
      commRate: "",
      soldPrice: "",
      exchangedDate: "",
      methodOfSale: "",
      listingAgent: "",
      conjunction: "",
      leadSource: "",
      listedDate: "",
      daysOnMarket: 0,
      settlementDate: "",
      split: "",
      stage: "Exchanged"
    });
  };

  const handleAdd = () => {
    const newSale: SaleEntry = {
      id: Math.max(...sales.map(s => s.id), 0) + 1,
      ...formData
    };
    setSales([...sales, newSale]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Sale Added",
      description: "New sale has been added successfully.",
    });
  };

  const handleEdit = (id: number) => {
    const sale = sales.find(s => s.id === id);
    if (sale) {
      setFormData({
        address: sale.address,
        suburb: sale.suburb,
        commRate: sale.commRate,
        soldPrice: sale.soldPrice,
        exchangedDate: sale.exchangedDate,
        methodOfSale: sale.methodOfSale,
        listingAgent: sale.listingAgent,
        conjunction: sale.conjunction,
        leadSource: sale.leadSource,
        listedDate: sale.listedDate,
        daysOnMarket: sale.daysOnMarket,
        settlementDate: sale.settlementDate,
        split: sale.split,
        stage: sale.stage
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
      description: "Sale has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setSales(sales.filter(sale => sale.id !== id));
    toast({
      title: "Sale Deleted",
      description: "Sale has been removed successfully.",
    });
  };

  const handleDragStart = (e: React.DragEvent, saleId: number) => {
    setDraggedSale(saleId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStage: "Exchanged" | "Settled") => {
    e.preventDefault();
    if (draggedSale !== null) {
      setSales(sales.map(sale => 
        sale.id === draggedSale ? { ...sale, stage: newStage } : sale
      ));
      toast({
        title: "Stage Updated",
        description: `Sale moved to ${newStage}`,
      });
      setDraggedSale(null);
    }
  };

  const calculateActualGCI = (soldPrice: string, commRate: string, split: string) => {
    const priceNum = parseFloat(soldPrice.replace(/[^0-9.]/g, '')) || 0;
    const rateNum = parseFloat(commRate) || 0;
    const splitNum = parseFloat(split) || 100;
    const gci = (priceNum * rateNum * splitNum) / 10000;
    return gci > 0 ? `$${gci.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-";
  };

  const getSalesByStage = (stage: "Exchanged" | "Settled") => {
    return sales.filter(sale => sale.stage === stage);
  };

  const renderSaleCard = (sale: SaleEntry) => (
    <Card
      key={sale.id}
      className="bg-white border-[#ededed] shadow-sm mb-1 cursor-move hover:shadow-md transition-shadow w-full"
      draggable
      onDragStart={(e) => handleDragStart(e, sale.id)}
      data-testid={`sale-card-${sale.id}`}
    >
      <CardContent className="px-3 py-2">
        <div className="flex items-center gap-2">
          <GripVertical className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <div className="flex items-center flex-1 min-w-0 gap-3 overflow-x-auto">
            <div className="min-w-[160px] flex-shrink-0">
              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm leading-tight" data-testid={`text-address-${sale.id}`}>
                {sale.address}
              </h3>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[11px] leading-tight truncate" data-testid={`text-suburb-${sale.id}`}>
                {sale.suburb}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Sold Price</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-xs" data-testid={`text-soldprice-${sale.id}`}>
                ${parseFloat(sale.soldPrice).toLocaleString('en-US')}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Comm. Rate</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-commrate-${sale.id}`}>
                {sale.commRate}%
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Actual GCI</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-xs" data-testid={`text-actualgci-${sale.id}`}>
                {calculateActualGCI(sale.soldPrice, sale.commRate, sale.split)}
              </p>
            </div>

            <div className="min-w-[110px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Method of Sale</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-methodofsale-${sale.id}`}>
                {sale.methodOfSale}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Listing Agent</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-listingagent-${sale.id}`}>
                {sale.listingAgent}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Conjunction</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-conjunction-${sale.id}`}>
                {sale.conjunction}
              </p>
            </div>

            <div className="min-w-[90px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Lead Source</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-leadsource-${sale.id}`}>
                {sale.leadSource}
              </p>
            </div>

            <div className="min-w-[60px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Split</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-split-${sale.id}`}>
                {sale.split}%
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Listed Date</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-listeddate-${sale.id}`}>
                {sale.listedDate}
              </p>
            </div>

            <div className="min-w-[70px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Days on Market</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-daysonmarket-${sale.id}`}>
                {sale.daysOnMarket}
              </p>
            </div>

            <div className="min-w-[90px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Exchanged Date</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-exchangeddate-${sale.id}`}>
                {sale.exchangedDate}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Settlement Date</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-settlementdate-${sale.id}`}>
                {sale.settlementDate}
              </p>
            </div>

            <div className="flex gap-1 flex-shrink-0 pl-2">
              <button
                onClick={() => handleEdit(sale.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                data-testid={`button-edit-${sale.id}`}
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(sale.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                data-testid={`button-delete-${sale.id}`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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

        <Tabs defaultValue="listings" className="flex-1 flex flex-col">
          <div className="px-6 py-5 bg-[#f5f5f5]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal]">
                  Sales
                </h1>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                  Manage listings, exchanges and settlements.
                </p>
              </div>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white h-9 px-4 gap-2"
                data-testid="button-add-sale"
              >
                <Plus className="w-4 h-4" />
                Add Sale
              </Button>
            </div>
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto mt-4">
              <TabsTrigger value="listings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2" data-testid="tab-listings">
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Listings</span>
              </TabsTrigger>
              <TabsTrigger value="exchanges" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2" data-testid="tab-exchanges">
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Exchanges</span>
              </TabsTrigger>
              <TabsTrigger value="settlements" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2" data-testid="tab-settlements">
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Settlements</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="listings" className="flex-1 mt-0">
            <div className="bg-[#f5f5f5]">
              <ListingsContent />
            </div>
          </TabsContent>

          <TabsContent value="exchanges" className="flex-1 mt-0">
            <div className="px-6 pb-6 bg-[#f5f5f5]">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col w-full">
                  <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3">
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm">
                      Exchanged ({getSalesByStage("Exchanged").length})
                    </h2>
                  </div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "Exchanged")}
                    className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border-2 border-t-0 border-dashed border-gray-300"
                    data-testid="dropzone-exchanged"
                  >
                    {getSalesByStage("Exchanged").length === 0 ? (
                      <div className="flex items-center justify-center h-[100px]">
                        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                          Drag sales here
                        </p>
                      </div>
                    ) : (
                      getSalesByStage("Exchanged").map(renderSaleCard)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settlements" className="flex-1 mt-0">
            <div className="px-6 pb-6 bg-[#f5f5f5]">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col w-full">
                  <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3">
                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm">
                      Settled ({getSalesByStage("Settled").length})
                    </h2>
                  </div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "Settled")}
                    className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border-2 border-t-0 border-dashed border-gray-300"
                    data-testid="dropzone-settled"
                  >
                    {getSalesByStage("Settled").length === 0 ? (
                      <div className="flex items-center justify-center h-[100px]">
                        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                          Drag sales here
                        </p>
                      </div>
                    ) : (
                      getSalesByStage("Settled").map(renderSaleCard)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-white max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg">
              {editingId ? "Edit Sale" : "Add New Sale"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Address
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="15 Beach Road"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-address"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Suburb
                </label>
                <Input
                  value={formData.suburb}
                  onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                  placeholder="Bondi"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-suburb"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Sold Price
                </label>
                <Input
                  value={formData.soldPrice}
                  onChange={(e) => setFormData({ ...formData, soldPrice: e.target.value })}
                  placeholder="3200000"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-soldprice"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Comm. Rate (%)
                </label>
                <Input
                  value={formData.commRate}
                  onChange={(e) => setFormData({ ...formData, commRate: e.target.value })}
                  placeholder="2.5"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-commrate"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Split (%)
                </label>
                <Input
                  value={formData.split}
                  onChange={(e) => setFormData({ ...formData, split: e.target.value })}
                  placeholder="100"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-split"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Method of Sale
                </label>
                <Select value={formData.methodOfSale} onValueChange={(value) => setFormData({ ...formData, methodOfSale: value })}>
                  <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-methodofsale">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private Treaty">Private Treaty</SelectItem>
                    <SelectItem value="Auction">Auction</SelectItem>
                    <SelectItem value="Expression of Interest">Expression of Interest</SelectItem>
                    <SelectItem value="Tender">Tender</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Listing Agent
                </label>
                <Input
                  value={formData.listingAgent}
                  onChange={(e) => setFormData({ ...formData, listingAgent: e.target.value })}
                  placeholder="Sarah Johnson"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-listingagent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Conjunction
                </label>
                <Select value={formData.conjunction} onValueChange={(value) => setFormData({ ...formData, conjunction: value })}>
                  <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-conjunction">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Lead Source
                </label>
                <Select value={formData.leadSource} onValueChange={(value) => setFormData({ ...formData, leadSource: value })}>
                  <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-leadsource">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Cold Call">Cold Call</SelectItem>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Open Home">Open Home</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Listed Date
                </label>
                <Input
                  value={formData.listedDate}
                  onChange={(e) => setFormData({ ...formData, listedDate: e.target.value })}
                  placeholder="10/10/2025"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-listeddate"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Days on Market
                </label>
                <Input
                  type="number"
                  value={formData.daysOnMarket}
                  onChange={(e) => setFormData({ ...formData, daysOnMarket: parseInt(e.target.value) || 0 })}
                  placeholder="10"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-daysonmarket"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Exchanged Date
                </label>
                <Input
                  value={formData.exchangedDate}
                  onChange={(e) => setFormData({ ...formData, exchangedDate: e.target.value })}
                  placeholder="20/10/2025"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-exchangeddate"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Settlement Date
                </label>
                <Input
                  value={formData.settlementDate}
                  onChange={(e) => setFormData({ ...formData, settlementDate: e.target.value })}
                  placeholder="20/11/2025"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-settlementdate"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                Stage
              </label>
              <Select value={formData.stage} onValueChange={(value: any) => setFormData({ ...formData, stage: value })}>
                <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-stage">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Exchanged">Exchanged</SelectItem>
                  <SelectItem value="Settled">Settled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.soldPrice && formData.commRate && formData.split && (
              <div className="grid gap-2 p-4 bg-[#f9fafb] rounded-lg border border-[#ededed]">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Actual GCI
                </label>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xl" data-testid="text-calculated-gci">
                  {calculateActualGCI(formData.soldPrice, formData.commRate, formData.split)}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setEditingId(null);
                resetForm();
              }}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica]"
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={editingId ? handleUpdate : handleAdd}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white"
              data-testid="button-save"
            >
              {editingId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
