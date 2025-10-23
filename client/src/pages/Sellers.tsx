import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Circle, GripVertical } from "lucide-react";
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

interface SellerEntry {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  suburbs: string;
  price: string;
  leadSource: string;
  motivation: string;
  readiness: "red" | "yellow" | "green";
  estCommissionRate: string;
  appraised: string;
  stage: "Hot Stocks" | "Pipeline" | "Prospect";
  status: string;
}

const initialSellers: SellerEntry[] = [
  {
    id: 1,
    name: "Michael Brown",
    phone: "0423 456 789",
    email: "michael.b@email.com",
    address: "12 Park Avenue",
    suburbs: "Bondi",
    price: "3200000",
    leadSource: "Referral",
    motivation: "Upsizing",
    readiness: "green",
    estCommissionRate: "2.5",
    appraised: "Yes",
    stage: "Hot Stocks",
    status: "Active"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "0412 345 678",
    email: "sarah.j@email.com",
    address: "45 Beach Road",
    suburbs: "Manly",
    price: "2800000",
    leadSource: "Website",
    motivation: "Downsizing",
    readiness: "yellow",
    estCommissionRate: "2.0",
    appraised: "No",
    stage: "Pipeline",
    status: "Active"
  },
  {
    id: 3,
    name: "David Lee",
    phone: "0498 765 432",
    email: "david.l@email.com",
    address: "78 Ocean Street",
    suburbs: "Coogee",
    price: "4500000",
    leadSource: "Cold Call",
    motivation: "Investment",
    readiness: "red",
    estCommissionRate: "3.0",
    appraised: "Pending",
    stage: "Prospect",
    status: "Active"
  }
];

const TrafficLight = ({ color }: { color: "red" | "yellow" | "green" }) => {
  const colorMap = {
    red: "#ef4444",
    yellow: "#eab308",
    green: "#22c55e"
  };

  return (
    <div className="flex items-center justify-center">
      <Circle
        className="w-5 h-5"
        fill={colorMap[color]}
        stroke={colorMap[color]}
        data-testid={`traffic-light-${color}`}
      />
    </div>
  );
};

export function Sellers() {
  const { toast } = useToast();
  const [sellers, setSellers] = useState<SellerEntry[]>(initialSellers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggedSeller, setDraggedSeller] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"Hot Stocks" | "Pipeline" | "Prospect">("Hot Stocks");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    suburbs: "",
    price: "",
    leadSource: "",
    motivation: "",
    readiness: "yellow" as "red" | "yellow" | "green",
    estCommissionRate: "",
    appraised: "",
    stage: "Hot Stocks" as "Hot Stocks" | "Pipeline" | "Prospect",
    status: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      suburbs: "",
      price: "",
      leadSource: "",
      motivation: "",
      readiness: "yellow",
      estCommissionRate: "",
      appraised: "",
      stage: "Hot Stocks",
      status: ""
    });
  };

  const handleAdd = () => {
    const newSeller: SellerEntry = {
      id: Math.max(...sellers.map(s => s.id), 0) + 1,
      ...formData
    };
    setSellers([...sellers, newSeller]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Seller Added",
      description: "New seller has been added successfully.",
    });
  };

  const handleEdit = (id: number) => {
    const seller = sellers.find(s => s.id === id);
    if (seller) {
      setFormData({
        name: seller.name,
        phone: seller.phone,
        email: seller.email,
        address: seller.address,
        suburbs: seller.suburbs,
        price: seller.price,
        leadSource: seller.leadSource,
        motivation: seller.motivation,
        readiness: seller.readiness,
        estCommissionRate: seller.estCommissionRate,
        appraised: seller.appraised,
        stage: seller.stage,
        status: seller.status
      });
      setEditingId(id);
      setIsAddDialogOpen(true);
    }
  };

  const handleUpdate = () => {
    setSellers(sellers.map(seller => 
      seller.id === editingId ? { ...seller, ...formData } : seller
    ));
    setIsAddDialogOpen(false);
    setEditingId(null);
    resetForm();
    toast({
      title: "Seller Updated",
      description: "Seller has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setSellers(sellers.filter(seller => seller.id !== id));
    toast({
      title: "Seller Deleted",
      description: "Seller has been removed successfully.",
    });
  };

  const handleDragStart = (e: React.DragEvent, sellerId: number) => {
    setDraggedSeller(sellerId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStage: "Hot Stocks" | "Pipeline" | "Prospect") => {
    e.preventDefault();
    if (draggedSeller !== null) {
      setSellers(sellers.map(seller => 
        seller.id === draggedSeller ? { ...seller, stage: newStage } : seller
      ));
      toast({
        title: "Stage Updated",
        description: `Seller moved to ${newStage}`,
      });
      setDraggedSeller(null);
    }
  };

  const calculateEstGCI = (price: string, rate: string) => {
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    const rateNum = parseFloat(rate) || 0;
    const gci = (priceNum * rateNum) / 100;
    return gci > 0 ? `$${gci.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-";
  };

  const getSellersByStage = (stage: "Hot Stocks" | "Pipeline" | "Prospect") => {
    return sellers.filter(seller => seller.stage === stage);
  };

  const renderSellerCard = (seller: SellerEntry) => (
    <Card
      key={seller.id}
      className="bg-white border-[#ededed] shadow-sm mb-3 cursor-move hover:shadow-md transition-shadow"
      draggable
      onDragStart={(e) => handleDragStart(e, seller.id)}
      data-testid={`seller-card-${seller.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <GripVertical className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base mb-1" data-testid={`text-name-${seller.id}`}>
                  {seller.name}
                </h3>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-sm" data-testid={`text-address-${seller.id}`}>
                  {seller.address}, {seller.suburbs}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(seller.id)}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors"
                  data-testid={`button-edit-${seller.id}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(seller.id)}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors"
                  data-testid={`button-delete-${seller.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mb-1">Phone</p>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-phone-${seller.id}`}>
                  {seller.phone}
                </p>
              </div>
              <div>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mb-1">Email</p>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm truncate" data-testid={`text-email-${seller.id}`}>
                  {seller.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mb-1">Price</p>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm" data-testid={`text-price-${seller.id}`}>
                  ${parseFloat(seller.price).toLocaleString('en-US')}
                </p>
              </div>
              <div>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mb-1">Est. GCI</p>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-sm" data-testid={`text-estgci-${seller.id}`}>
                  {calculateEstGCI(seller.price, seller.estCommissionRate)}
                </p>
              </div>
              <div>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mb-1">Readiness</p>
                <div data-testid={`text-readiness-${seller.id}`}>
                  <TrafficLight color={seller.readiness} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mb-1">Lead Source</p>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs" data-testid={`text-leadsource-${seller.id}`}>
                  {seller.leadSource}
                </p>
              </div>
              <div>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mb-1">Motivation</p>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs" data-testid={`text-motivation-${seller.id}`}>
                  {seller.motivation}
                </p>
              </div>
              <div>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mb-1">Appraised</p>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs" data-testid={`text-appraised-${seller.id}`}>
                  {seller.appraised}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
                Sellers
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Drag sellers between stages to update their pipeline status.
              </p>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white h-9 px-4 gap-2"
              data-testid="button-add-seller"
            >
              <Plus className="w-4 h-4" />
              Add Seller
            </Button>
          </div>
        </div>

        <div className="px-6 pb-6 bg-[#f5f5f5]">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="bg-white border border-[#ededed] p-1 mb-4">
              <TabsTrigger value="Hot Stocks" className="flex-1 data-[state=active]:bg-[#172a41] data-[state=active]:text-white" data-testid="tab-hotstocks">
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">
                  Hot Stocks ({getSellersByStage("Hot Stocks").length})
                </span>
              </TabsTrigger>
              <TabsTrigger value="Pipeline" className="flex-1 data-[state=active]:bg-[#172a41] data-[state=active]:text-white" data-testid="tab-pipeline">
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">
                  Pipeline ({getSellersByStage("Pipeline").length})
                </span>
              </TabsTrigger>
              <TabsTrigger value="Prospect" className="flex-1 data-[state=active]:bg-[#172a41] data-[state=active]:text-white" data-testid="tab-prospect">
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">
                  Prospect ({getSellersByStage("Prospect").length})
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Hot Stocks" className="mt-0">
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "Hot Stocks")}
                className="min-h-[400px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
                data-testid="dropzone-hotstocks"
              >
                {getSellersByStage("Hot Stocks").length === 0 ? (
                  <div className="flex items-center justify-center h-[200px]">
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-sm">
                      No sellers in Hot Stocks. Drag sellers here or add a new one.
                    </p>
                  </div>
                ) : (
                  getSellersByStage("Hot Stocks").map(renderSellerCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="Pipeline" className="mt-0">
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "Pipeline")}
                className="min-h-[400px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
                data-testid="dropzone-pipeline"
              >
                {getSellersByStage("Pipeline").length === 0 ? (
                  <div className="flex items-center justify-center h-[200px]">
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-sm">
                      No sellers in Pipeline. Drag sellers here or add a new one.
                    </p>
                  </div>
                ) : (
                  getSellersByStage("Pipeline").map(renderSellerCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="Prospect" className="mt-0">
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "Prospect")}
                className="min-h-[400px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
                data-testid="dropzone-prospect"
              >
                {getSellersByStage("Prospect").length === 0 ? (
                  <div className="flex items-center justify-center h-[200px]">
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-sm">
                      No sellers in Prospect. Drag sellers here or add a new one.
                    </p>
                  </div>
                ) : (
                  getSellersByStage("Prospect").map(renderSellerCard)
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg">
              {editingId ? "Edit Seller" : "Add New Seller"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-name"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Phone
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                Email
              </label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                data-testid="input-email"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Address
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-address"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Suburbs
                </label>
                <Input
                  value={formData.suburbs}
                  onChange={(e) => setFormData({ ...formData, suburbs: e.target.value })}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-suburbs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Price
                </label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="3200000"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-price"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Est. Commission Rate (%)
                </label>
                <Input
                  value={formData.estCommissionRate}
                  onChange={(e) => setFormData({ ...formData, estCommissionRate: e.target.value })}
                  placeholder="2.5"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-commissionrate"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Motivation
                </label>
                <Select value={formData.motivation} onValueChange={(value) => setFormData({ ...formData, motivation: value })}>
                  <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-motivation">
                    <SelectValue placeholder="Select motivation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Upsizing">Upsizing</SelectItem>
                    <SelectItem value="Downsizing">Downsizing</SelectItem>
                    <SelectItem value="Relocation">Relocation</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Readiness
                </label>
                <Select value={formData.readiness} onValueChange={(value: "red" | "yellow" | "green") => setFormData({ ...formData, readiness: value })}>
                  <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-readiness">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">
                      <div className="flex items-center gap-2">
                        <Circle className="w-4 h-4" fill="#ef4444" stroke="#ef4444" />
                        <span>Not Ready</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="yellow">
                      <div className="flex items-center gap-2">
                        <Circle className="w-4 h-4" fill="#eab308" stroke="#eab308" />
                        <span>Warming Up</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="green">
                      <div className="flex items-center gap-2">
                        <Circle className="w-4 h-4" fill="#22c55e" stroke="#22c55e" />
                        <span>Ready</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Appraised
                </label>
                <Select value={formData.appraised} onValueChange={(value) => setFormData({ ...formData, appraised: value })}>
                  <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-appraised">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Stage
                </label>
                <Select value={formData.stage} onValueChange={(value: any) => setFormData({ ...formData, stage: value })}>
                  <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-stage">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hot Stocks">Hot Stocks</SelectItem>
                    <SelectItem value="Pipeline">Pipeline</SelectItem>
                    <SelectItem value="Prospect">Prospect</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Status
                </label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Listed">Listed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.price && formData.estCommissionRate && (
              <div className="grid gap-2 p-4 bg-[#f9fafb] rounded-lg border border-[#ededed]">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Estimated GCI
                </label>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#09b600] text-xl" data-testid="text-calculated-gci">
                  {calculateEstGCI(formData.price, formData.estCommissionRate)}
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
