import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { DashboardPageLayout } from "@/components/DashboardPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Circle, ArrowRight } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

interface SellerEntry {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  suburbs: string;
  price: string;
  propertyType?: string;
  leadSource: string;
  motivation: string;
  readiness: "red" | "yellow" | "green";
  estCommissionRate: string;
  appraised: string;
  stage: "Hot Stocks" | "Pipeline" | "Prospect";
  status: string;
  nextFollowUpDate?: string;
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
    propertyType: "House",
    estCommissionRate: "2.5",
    appraised: "Yes",
    stage: "Hot Stocks",
    status: "Active",
    nextFollowUpDate: ""
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
    propertyType: "Apartment",
    estCommissionRate: "2.0",
    appraised: "No",
    stage: "Pipeline",
    status: "Active",
    nextFollowUpDate: ""
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
    propertyType: "House",
    estCommissionRate: "3.0",
    appraised: "Pending",
    stage: "Prospect",
    status: "Active",
    nextFollowUpDate: ""
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
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    suburbs: "",
    price: "",
    propertyType: "",
    leadSource: "",
    motivation: "",
    readiness: "yellow" as "red" | "yellow" | "green",
    estCommissionRate: "",
    appraised: "",
    stage: "Hot Stocks" as "Hot Stocks" | "Pipeline" | "Prospect",
    status: "",
    nextFollowUpDate: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      suburbs: "",
      price: "",
      propertyType: "",
      leadSource: "",
      motivation: "",
      readiness: "yellow",
      estCommissionRate: "",
      appraised: "",
      stage: "Hot Stocks",
      status: "",
      nextFollowUpDate: ""
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
        propertyType: seller.propertyType || "",
        leadSource: seller.leadSource,
        motivation: seller.motivation,
        readiness: seller.readiness,
        estCommissionRate: seller.estCommissionRate,
        appraised: seller.appraised,
        stage: seller.stage,
        status: seller.status,
        nextFollowUpDate: seller.nextFollowUpDate || ""
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

  const handleMoveToListings = (id: number) => {
    const seller = sellers.find(s => s.id === id);
    if (seller) {
      // Convert seller to listing format
      const newListing = {
        id: Date.now(),
        address: seller.address,
        suburb: seller.suburbs,
        guide: seller.price,
        revisedGuide: "",
        vendorsPrice: seller.price,
        sellingPrice: "",
        methodOfSale: "Private Treaty",
        leadSource: seller.leadSource,
        motivation: seller.motivation,
        readiness: seller.readiness,
        listedDate: new Date().toLocaleDateString('en-GB'),
        daysOnMarket: "0",
        offers: "0",
        commRate: seller.estCommissionRate,
        stage: "Pre-market"
      };
      
      // Store in localStorage to be picked up by Listings page
      const existingListings = JSON.parse(localStorage.getItem('pendingListings') || '[]');
      localStorage.setItem('pendingListings', JSON.stringify([...existingListings, newListing]));
      
      // Remove from sellers
      setSellers(sellers.filter(s => s.id !== id));
      
      toast({
        title: "Moved to Listings",
        description: "Seller converted to a listing.",
        action: (
          <ToastAction
            altText="Undo"
            onClick={() => {
              // Remove the pending listing we just added
              const pending = JSON.parse(localStorage.getItem('pendingListings') || '[]');
              const filtered = pending.filter((l: any) => l.address !== seller.address || l.listedDate !== newListing.listedDate);
              localStorage.setItem('pendingListings', JSON.stringify(filtered));
              // Add the seller back
              setSellers((prev) => [...prev, seller]);
            }}
          >
            Undo
          </ToastAction>
        ),
      });
    }
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

  const calculateStageTotal = (stage: "Hot Stocks" | "Pipeline" | "Prospect") => {
    const stageSellers = filteredSellers.filter(seller => seller.stage === stage);
    const total = stageSellers.reduce((sum, seller) => {
      const priceNum = parseFloat(seller.price.replace(/[^0-9.]/g, '')) || 0;
      const rateNum = parseFloat(seller.estCommissionRate) || 0;
      return sum + (priceNum * rateNum) / 100;
    }, 0);
    return `$${total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const calculateTotalForecast = () => {
    const total = filteredSellers.reduce((sum, seller) => {
      const priceNum = parseFloat(seller.price.replace(/[^0-9.]/g, '')) || 0;
      const rateNum = parseFloat(seller.estCommissionRate) || 0;
      return sum + (priceNum * rateNum) / 100;
    }, 0);
    return `$${total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const getSellersByStage = (stage: "Hot Stocks" | "Pipeline" | "Prospect") => {
    return filteredSellers.filter(seller => seller.stage === stage);
  };

  const renderSellerCard = (seller: SellerEntry) => (
    <Card
      key={seller.id}
      className="bg-white border-[#ededed] shadow-sm mb-1 cursor-move hover:shadow-md transition-shadow w-full"
      draggable
      onDragStart={(e) => handleDragStart(e, seller.id)}
      data-testid={`seller-card-${seller.id}`}
    >
      <CardContent className="px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center flex-1 min-w-0 gap-3 overflow-x-auto">
            <div className="min-w-[160px] flex-shrink-0">
              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm leading-tight" data-testid={`text-address-${seller.id}`}>
                {seller.address}
              </h3>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[11px] leading-tight truncate" data-testid={`text-suburbs-${seller.id}`}>
                {seller.suburbs}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Price</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-price-${seller.id}`}>
                ${parseFloat(seller.price).toLocaleString('en-US')}
              </p>
            </div>

            <div className="min-w-[110px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Lead Source</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-leadsource-${seller.id}`}>
                {seller.leadSource}
              </p>
            </div>

            <div className="min-w-[90px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Motivation</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-motivation-${seller.id}`}>
                {seller.motivation}
              </p>
            </div>

            <div className="min-w-[90px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Readiness</p>
              <div className="flex" data-testid={`text-readiness-${seller.id}`}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <TrafficLight color={seller.readiness} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-xs">{seller.readiness === 'green' ? 'Ready to list' : seller.readiness === 'yellow' ? 'Nurture opportunity' : 'Low priority'}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="min-w-[110px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Est. Comm Rate</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-commrate-${seller.id}`}>
                {seller.estCommissionRate}%
              </p>
            </div>

            <div className="min-w-[110px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Est. GCI</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-estgci-${seller.id}`}>
                {calculateEstGCI(seller.price, seller.estCommissionRate)}
              </p>
            </div>
            <div className="min-w-[120px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Property Type</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]">
                {seller.propertyType || '-'}
              </p>
            </div>

            <div className="min-w-[140px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Next Follow-Up</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]">
                {seller.nextFollowUpDate || '-'}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Appraised</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-appraised-${seller.id}`}>
                {seller.appraised}
              </p>
            </div>

            <div className="min-w-[70px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Status</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-status-${seller.id}`}>
                {seller.status}
              </p>
            </div>

            <div className="min-w-[140px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Name</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-name-${seller.id}`}>
                {seller.name}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Phone</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-phone-${seller.id}`}>
                {seller.phone}
              </p>
            </div>

            <div className="min-w-[140px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Email</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px] truncate" data-testid={`text-email-${seller.id}`}>
                {seller.email}
              </p>
            </div>

            <div className="flex gap-1 flex-shrink-0 pl-2">
              <button
                onClick={() => handleMoveToListings(seller.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                title="Move to Listings"
                data-testid={`button-movetolisting-${seller.id}`}
              >
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleEdit(seller.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                data-testid={`button-edit-${seller.id}`}
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(seller.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                data-testid={`button-delete-${seller.id}`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const [search, setSearch] = useState("");

  const filteredSellers = sellers.filter((s) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      s.address.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q)
    );
  });

  const content = (
    <>
      <div className="px-6 py-5 bg-[#f5f5f5]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                Total Est. GCI: <span className="font-semibold">{calculateTotalForecast()}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by address or name"
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-9 w-[280px] border-[#ededed]"
                data-testid="input-search-sellers"
              />
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white h-9 px-4 gap-2"
              data-testid="button-add-seller"
            >
              Add Seller
            </Button>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 bg-[#f5f5f5]">
          <div className="flex flex-col gap-4">
            {/* Hot Stocks Stage */}
            <div className="flex flex-col w-full">
              <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3 flex items-center justify-between">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                  Hot Stocks ({filteredSellers.filter(s=>s.stage==="Hot Stocks").length})
                </h2>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
                  Total Est. GCI: <span className="font-semibold">{calculateStageTotal("Hot Stocks")}</span>
                </p>
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "Hot Stocks")}
                className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300"
                data-testid="dropzone-hotstocks"
              >
                {filteredSellers.filter(s=>s.stage==="Hot Stocks").length === 0 ? (
                  <div className="flex items-center justify-center h-[100px]">
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                      Drag sellers here
                    </p>
                  </div>
                ) : (
                  filteredSellers.filter(s=>s.stage==="Hot Stocks").map(renderSellerCard)
                )}
              </div>
            </div>

            {/* Pipeline Stage */}
            <div className="flex flex-col w-full">
              <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3 flex items-center justify-between">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                  Pipeline ({filteredSellers.filter(s=>s.stage==="Pipeline").length})
                </h2>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
                  Total Est. GCI: <span className="font-semibold">{calculateStageTotal("Pipeline")}</span>
                </p>
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "Pipeline")}
                className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300"
                data-testid="dropzone-pipeline"
              >
                {filteredSellers.filter(s=>s.stage==="Pipeline").length === 0 ? (
                  <div className="flex items-center justify-center h-[100px]">
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                      Drag sellers here
                    </p>
                  </div>
                ) : (
                  filteredSellers.filter(s=>s.stage==="Pipeline").map(renderSellerCard)
                )}
              </div>
            </div>

            {/* Prospects Stage */}
            <div className="flex flex-col w-full">
              <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3 flex items-center justify-between">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                  Prospects ({filteredSellers.filter(s=>s.stage==="Prospect").length})
                </h2>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
                  Total Est. GCI: <span className="font-semibold">{calculateStageTotal("Prospect")}</span>
                </p>
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "Prospect")}
                className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300"
                data-testid="dropzone-prospect"
              >
                {filteredSellers.filter(s=>s.stage==="Prospect").length === 0 ? (
                  <div className="flex items-center justify-center h-[100px]">
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                      Drag sellers here
                    </p>
                  </div>
                ) : (
                  filteredSellers.filter(s=>s.stage==="Prospect").map(renderSellerCard)
                )}
              </div>
            </div>
          </div>
        </div>

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
                Property Type
              </label>
              <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
                <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-property-type">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Duplex">Duplex</SelectItem>
                  <SelectItem value="Land">Land</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                Next Follow-Up Date
              </label>
              <Input
                type="date"
                value={formData.nextFollowUpDate}
                onChange={(e) => setFormData({ ...formData, nextFollowUpDate: e.target.value })}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                data-testid="input-next-followup"
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
                    <SelectItem value="Other">Other</SelectItem>
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
                    <SelectItem value="Other">Other</SelectItem>
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
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xl" data-testid="text-calculated-gci">
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
    </>
  );

  return content;
}

export function SellersContent() {
  return <Sellers />;
}

export default function SellersPage() {
  return (
    <DashboardPageLayout>
      <Sellers />
    </DashboardPageLayout>
  );
}
