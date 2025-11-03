import { useState } from "react";
import { DashboardPageLayout } from "@/components/DashboardPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
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

interface ListingEntry {
  id: number;
  address: string;
  suburb: string;
  guide: string;
  commRate: string;
  listingAgent: string;
  leadSource: string;
  listedDate: string;
  daysOnMarket: number;
  stage: "Listed" | "Under Offer";
}

interface ExchangeEntry {
  id: number;
  address: string;
  suburb: string;
  soldPrice: string;
  commRate: string;
  split: string;
  exchangedDate: string;
  methodOfSale: string;
  listingAgent: string;
  conjunction: string;
  leadSource: string;
  settlementDate: string;
  stage: "Exchanged";
}

interface SettlementEntry {
  id: number;
  address: string;
  suburb: string;
  soldPrice: string;
  commRate: string;
  split: string;
  exchangedDate: string;
  settlementDate: string;
  methodOfSale: string;
  listingAgent: string;
  conjunction: string;
  leadSource: string;
  daysOnMarket: number;
  stage: "Settled";
}

const initialListings: ListingEntry[] = [
  {
    id: 1,
    address: "23 Park Lane",
    suburb: "Bondi",
    guide: "3500000",
    commRate: "2.5",
    listingAgent: "Sarah Johnson",
    leadSource: "Referral",
    listedDate: "01/11/2025",
    daysOnMarket: 2,
    stage: "Listed"
  }
];

const initialExchanges: ExchangeEntry[] = [
  {
    id: 1,
    address: "15 Beach Road",
    suburb: "Bondi",
    soldPrice: "3200000",
    commRate: "2.5",
    split: "100",
    exchangedDate: "20/10/2025",
    methodOfSale: "Private Treaty",
    listingAgent: "Sarah Johnson",
    conjunction: "No",
    leadSource: "Referral",
    settlementDate: "20/11/2025",
    stage: "Exchanged"
  }
];

const initialSettlements: SettlementEntry[] = [
  {
    id: 1,
    address: "42 Ocean Avenue",
    suburb: "Manly",
    soldPrice: "2750000",
    commRate: "2.0",
    split: "50",
    exchangedDate: "15/10/2025",
    settlementDate: "15/11/2025",
    methodOfSale: "Auction",
    listingAgent: "Michael Brown",
    conjunction: "Yes",
    leadSource: "Website",
    daysOnMarket: 14,
    stage: "Settled"
  }
];

function ListingsContent() {
  const { toast } = useToast();
  const [listings, setListings] = useState<ListingEntry[]>(initialListings);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggedListing, setDraggedListing] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    address: "",
    suburb: "",
    guide: "",
    commRate: "",
    listingAgent: "",
    leadSource: "",
    listedDate: "",
    daysOnMarket: 0,
    stage: "Listed" as "Listed" | "Under Offer"
  });

  const resetForm = () => {
    setFormData({
      address: "",
      suburb: "",
      guide: "",
      commRate: "",
      listingAgent: "",
      leadSource: "",
      listedDate: "",
      daysOnMarket: 0,
      stage: "Listed"
    });
  };

  const handleAdd = () => {
    const newListing: ListingEntry = {
      id: Math.max(...listings.map(l => l.id), 0) + 1,
      ...formData
    };
    setListings([...listings, newListing]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Listing Added",
      description: "New listing has been added successfully.",
    });
  };

  const handleEdit = (id: number) => {
    const listing = listings.find(l => l.id === id);
    if (listing) {
      setFormData(listing);
      setEditingId(id);
      setIsAddDialogOpen(true);
    }
  };

  const handleUpdate = () => {
    setListings(listings.map(listing => 
      listing.id === editingId ? { ...listing, ...formData } : listing
    ));
    setIsAddDialogOpen(false);
    setEditingId(null);
    resetForm();
    toast({
      title: "Listing Updated",
      description: "Listing has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setListings(listings.filter(listing => listing.id !== id));
    toast({
      title: "Listing Deleted",
      description: "Listing has been removed successfully.",
    });
  };

  const handleDragStart = (e: React.DragEvent, listingId: number) => {
    setDraggedListing(listingId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStage: "Listed" | "Under Offer") => {
    e.preventDefault();
    if (draggedListing !== null) {
      setListings(listings.map(listing => 
        listing.id === draggedListing ? { ...listing, stage: newStage } : listing
      ));
      toast({
        title: "Stage Updated",
        description: `Listing moved to ${newStage}`,
      });
      setDraggedListing(null);
    }
  };

  const getListingsByStage = (stage: "Listed" | "Under Offer") => {
    return listings.filter(listing => listing.stage === stage);
  };

  const renderListingCard = (listing: ListingEntry) => (
    <Card
      key={listing.id}
      className="bg-white border-[#ededed] shadow-sm mb-1 cursor-move hover:shadow-md transition-shadow w-full"
      draggable
      onDragStart={(e) => handleDragStart(e, listing.id)}
      data-testid={`listing-card-${listing.id}`}
    >
      <CardContent className="px-3 py-2">
        <div className="flex items-center gap-2">
          <GripVertical className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <div className="flex items-center flex-1 min-w-0 gap-3 overflow-x-auto">
            <div className="min-w-[160px] flex-shrink-0">
              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm leading-tight" data-testid={`text-address-${listing.id}`}>
                {listing.address}
              </h3>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[11px] leading-tight truncate" data-testid={`text-suburb-${listing.id}`}>
                {listing.suburb}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Guide</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-guide-${listing.id}`}>
                ${parseFloat(listing.guide).toLocaleString('en-US')}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Comm. Rate</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-commrate-${listing.id}`}>
                {listing.commRate}%
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Listing Agent</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-listingagent-${listing.id}`}>
                {listing.listingAgent}
              </p>
            </div>

            <div className="min-w-[90px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Lead Source</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-leadsource-${listing.id}`}>
                {listing.leadSource}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Listed Date</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-listeddate-${listing.id}`}>
                {listing.listedDate}
              </p>
            </div>

            <div className="min-w-[70px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Days on Market</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-daysonmarket-${listing.id}`}>
                {listing.daysOnMarket}
              </p>
            </div>

            <div className="flex gap-1 flex-shrink-0 pl-2">
              <button
                onClick={() => handleEdit(listing.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                data-testid={`button-edit-${listing.id}`}
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(listing.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                data-testid={`button-delete-${listing.id}`}
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
    <>
      <div className="px-6 py-5 bg-[#f5f5f5]">
        <div className="flex items-center justify-between">
          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
            Manage your active sales listings and track offers.
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white h-9 px-4 gap-2"
            data-testid="button-add-listing"
          >
            <Plus className="w-4 h-4" />
            Add Listing
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 bg-[#f5f5f5]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm">
                Listed ({getListingsByStage("Listed").length})
              </h2>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "Listed")}
              className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border-2 border-t-0 border-dashed border-gray-300"
              data-testid="dropzone-listed"
            >
              {getListingsByStage("Listed").length === 0 ? (
                <div className="flex items-center justify-center h-[100px]">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                    Drag listings here
                  </p>
                </div>
              ) : (
                getListingsByStage("Listed").map(renderListingCard)
              )}
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm">
                Under Offer ({getListingsByStage("Under Offer").length})
              </h2>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "Under Offer")}
              className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border-2 border-t-0 border-dashed border-gray-300"
              data-testid="dropzone-underoffer"
            >
              {getListingsByStage("Under Offer").length === 0 ? (
                <div className="flex items-center justify-center h-[100px]">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                    Drag listings here
                  </p>
                </div>
              ) : (
                getListingsByStage("Under Offer").map(renderListingCard)
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-white max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg">
              {editingId ? "Edit Listing" : "Add New Listing"}
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
                  placeholder="23 Park Lane"
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

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Guide Price
                </label>
                <Input
                  value={formData.guide}
                  onChange={(e) => setFormData({ ...formData, guide: e.target.value })}
                  placeholder="3500000"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-guide"
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
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Lead Source
                </label>
                <Input
                  value={formData.leadSource}
                  onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                  placeholder="Referral"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-leadsource"
                />
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
                  placeholder="01/11/2025"
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
                  placeholder="0"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-daysonmarket"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                Stage
              </label>
              <Select value={formData.stage} onValueChange={(value: "Listed" | "Under Offer") => setFormData({ ...formData, stage: value })}>
                <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-stage">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Listed">Listed</SelectItem>
                  <SelectItem value="Under Offer">Under Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
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
              type="button"
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
}

function ExchangesContent() {
  const { toast } = useToast();
  const [exchanges, setExchanges] = useState<ExchangeEntry[]>(initialExchanges);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    address: "",
    suburb: "",
    soldPrice: "",
    commRate: "",
    split: "",
    exchangedDate: "",
    methodOfSale: "",
    listingAgent: "",
    conjunction: "",
    leadSource: "",
    settlementDate: "",
    stage: "Exchanged" as "Exchanged"
  });

  const resetForm = () => {
    setFormData({
      address: "",
      suburb: "",
      soldPrice: "",
      commRate: "",
      split: "",
      exchangedDate: "",
      methodOfSale: "",
      listingAgent: "",
      conjunction: "",
      leadSource: "",
      settlementDate: "",
      stage: "Exchanged"
    });
  };

  const handleAdd = () => {
    const newExchange: ExchangeEntry = {
      id: Math.max(...exchanges.map(e => e.id), 0) + 1,
      ...formData
    };
    setExchanges([...exchanges, newExchange]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Exchange Added",
      description: "New exchange has been added successfully.",
    });
  };

  const handleEdit = (id: number) => {
    const exchange = exchanges.find(e => e.id === id);
    if (exchange) {
      setFormData(exchange);
      setEditingId(id);
      setIsAddDialogOpen(true);
    }
  };

  const handleUpdate = () => {
    setExchanges(exchanges.map(exchange => 
      exchange.id === editingId ? { ...exchange, ...formData } : exchange
    ));
    setIsAddDialogOpen(false);
    setEditingId(null);
    resetForm();
    toast({
      title: "Exchange Updated",
      description: "Exchange has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setExchanges(exchanges.filter(exchange => exchange.id !== id));
    toast({
      title: "Exchange Deleted",
      description: "Exchange has been removed successfully.",
    });
  };

  const calculateActualGCI = (soldPrice: string, commRate: string, split: string) => {
    const priceNum = parseFloat(soldPrice.replace(/[^0-9.]/g, '')) || 0;
    const rateNum = parseFloat(commRate) || 0;
    const splitNum = parseFloat(split) || 100;
    const gci = (priceNum * rateNum * splitNum) / 10000;
    return gci > 0 ? `$${gci.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-";
  };

  const renderExchangeCard = (exchange: ExchangeEntry) => (
    <Card
      key={exchange.id}
      className="bg-white border-[#ededed] shadow-sm mb-1 hover:shadow-md transition-shadow w-full"
      data-testid={`exchange-card-${exchange.id}`}
    >
      <CardContent className="px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center flex-1 min-w-0 gap-3 overflow-x-auto">
            <div className="min-w-[160px] flex-shrink-0">
              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm leading-tight" data-testid={`text-address-${exchange.id}`}>
                {exchange.address}
              </h3>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[11px] leading-tight truncate" data-testid={`text-suburb-${exchange.id}`}>
                {exchange.suburb}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Sold Price</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-xs" data-testid={`text-soldprice-${exchange.id}`}>
                ${parseFloat(exchange.soldPrice).toLocaleString('en-US')}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Comm. Rate</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-commrate-${exchange.id}`}>
                {exchange.commRate}%
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Actual GCI</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-xs" data-testid={`text-actualgci-${exchange.id}`}>
                {calculateActualGCI(exchange.soldPrice, exchange.commRate, exchange.split)}
              </p>
            </div>

            <div className="min-w-[110px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Method of Sale</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-methodofsale-${exchange.id}`}>
                {exchange.methodOfSale}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Listing Agent</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-listingagent-${exchange.id}`}>
                {exchange.listingAgent}
              </p>
            </div>

            <div className="min-w-[90px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Exchanged Date</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-exchangeddate-${exchange.id}`}>
                {exchange.exchangedDate}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Settlement Date</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-settlementdate-${exchange.id}`}>
                {exchange.settlementDate}
              </p>
            </div>

            <div className="flex gap-1 flex-shrink-0 pl-2">
              <button
                onClick={() => handleEdit(exchange.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                data-testid={`button-edit-${exchange.id}`}
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(exchange.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                data-testid={`button-delete-${exchange.id}`}
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
    <>
      <div className="px-6 py-5 bg-[#f5f5f5]">
        <div className="flex items-center justify-between">
          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
            Track exchanged sales pending settlement.
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white h-9 px-4 gap-2"
            data-testid="button-add-exchange"
          >
            <Plus className="w-4 h-4" />
            Add Exchange
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 bg-[#f5f5f5]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm">
                Exchanged ({exchanges.length})
              </h2>
            </div>
            <div className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300">
              {exchanges.length === 0 ? (
                <div className="flex items-center justify-center h-[100px]">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                    No exchanges yet
                  </p>
                </div>
              ) : (
                exchanges.map(renderExchangeCard)
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-white max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg">
              {editingId ? "Edit Exchange" : "Add New Exchange"}
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
                <Input
                  value={formData.leadSource}
                  onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                  placeholder="Referral"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-leadsource"
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
          </div>
          <DialogFooter>
            <Button
              type="button"
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
              type="button"
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
}

function SettlementsContent() {
  const { toast } = useToast();
  const [settlements, setSettlements] = useState<SettlementEntry[]>(initialSettlements);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    address: "",
    suburb: "",
    soldPrice: "",
    commRate: "",
    split: "",
    exchangedDate: "",
    settlementDate: "",
    methodOfSale: "",
    listingAgent: "",
    conjunction: "",
    leadSource: "",
    daysOnMarket: 0,
    stage: "Settled" as "Settled"
  });

  const resetForm = () => {
    setFormData({
      address: "",
      suburb: "",
      soldPrice: "",
      commRate: "",
      split: "",
      exchangedDate: "",
      settlementDate: "",
      methodOfSale: "",
      listingAgent: "",
      conjunction: "",
      leadSource: "",
      daysOnMarket: 0,
      stage: "Settled"
    });
  };

  const handleAdd = () => {
    const newSettlement: SettlementEntry = {
      id: Math.max(...settlements.map(s => s.id), 0) + 1,
      ...formData
    };
    setSettlements([...settlements, newSettlement]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Settlement Added",
      description: "New settlement has been added successfully.",
    });
  };

  const handleEdit = (id: number) => {
    const settlement = settlements.find(s => s.id === id);
    if (settlement) {
      setFormData(settlement);
      setEditingId(id);
      setIsAddDialogOpen(true);
    }
  };

  const handleUpdate = () => {
    setSettlements(settlements.map(settlement => 
      settlement.id === editingId ? { ...settlement, ...formData } : settlement
    ));
    setIsAddDialogOpen(false);
    setEditingId(null);
    resetForm();
    toast({
      title: "Settlement Updated",
      description: "Settlement has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setSettlements(settlements.filter(settlement => settlement.id !== id));
    toast({
      title: "Settlement Deleted",
      description: "Settlement has been removed successfully.",
    });
  };

  const calculateActualGCI = (soldPrice: string, commRate: string, split: string) => {
    const priceNum = parseFloat(soldPrice.replace(/[^0-9.]/g, '')) || 0;
    const rateNum = parseFloat(commRate) || 0;
    const splitNum = parseFloat(split) || 100;
    const gci = (priceNum * rateNum * splitNum) / 10000;
    return gci > 0 ? `$${gci.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-";
  };

  const renderSettlementCard = (settlement: SettlementEntry) => (
    <Card
      key={settlement.id}
      className="bg-white border-[#ededed] shadow-sm mb-1 hover:shadow-md transition-shadow w-full"
      data-testid={`settlement-card-${settlement.id}`}
    >
      <CardContent className="px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center flex-1 min-w-0 gap-3 overflow-x-auto">
            <div className="min-w-[160px] flex-shrink-0">
              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm leading-tight" data-testid={`text-address-${settlement.id}`}>
                {settlement.address}
              </h3>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[11px] leading-tight truncate" data-testid={`text-suburb-${settlement.id}`}>
                {settlement.suburb}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Sold Price</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-xs" data-testid={`text-soldprice-${settlement.id}`}>
                ${parseFloat(settlement.soldPrice).toLocaleString('en-US')}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Comm. Rate</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-commrate-${settlement.id}`}>
                {settlement.commRate}%
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Actual GCI</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-xs" data-testid={`text-actualgci-${settlement.id}`}>
                {calculateActualGCI(settlement.soldPrice, settlement.commRate, settlement.split)}
              </p>
            </div>

            <div className="min-w-[70px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Days on Market</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-daysonmarket-${settlement.id}`}>
                {settlement.daysOnMarket}
              </p>
            </div>

            <div className="min-w-[90px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Exchanged Date</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-exchangeddate-${settlement.id}`}>
                {settlement.exchangedDate}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Settlement Date</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-settlementdate-${settlement.id}`}>
                {settlement.settlementDate}
              </p>
            </div>

            <div className="flex gap-1 flex-shrink-0 pl-2">
              <button
                onClick={() => handleEdit(settlement.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                data-testid={`button-edit-${settlement.id}`}
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(settlement.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
                data-testid={`button-delete-${settlement.id}`}
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
    <>
      <div className="px-6 py-5 bg-[#f5f5f5]">
        <div className="flex items-center justify-between">
          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
            View all settled sales and completed transactions.
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white h-9 px-4 gap-2"
            data-testid="button-add-settlement"
          >
            <Plus className="w-4 h-4" />
            Add Settlement
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 bg-[#f5f5f5]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm">
                Settled ({settlements.length})
              </h2>
            </div>
            <div className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300">
              {settlements.length === 0 ? (
                <div className="flex items-center justify-center h-[100px]">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                    No settlements yet
                  </p>
                </div>
              ) : (
                settlements.map(renderSettlementCard)
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-white max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg">
              {editingId ? "Edit Settlement" : "Add New Settlement"}
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
                  placeholder="42 Ocean Avenue"
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
                  placeholder="Manly"
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
                  placeholder="2750000"
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
                  placeholder="2.0"
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
                  placeholder="50"
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
                  placeholder="Michael Brown"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-listingagent"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Exchanged Date
                </label>
                <Input
                  value={formData.exchangedDate}
                  onChange={(e) => setFormData({ ...formData, exchangedDate: e.target.value })}
                  placeholder="15/10/2025"
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
                  placeholder="15/11/2025"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-settlementdate"
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
                  placeholder="14"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-daysonmarket"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
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
              type="button"
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
}

export function Sales() {
  const [activeTab, setActiveTab] = useState("listings");

  return (
    <DashboardPageLayout>
      <div className="px-6 py-5 bg-[#f5f5f5]">
        <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal] mb-2">
          Sales
        </h1>
        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm tracking-[0] leading-[21px]">
          Track your sales pipeline from listing to settlement. Manage active listings, monitor exchanges, and celebrate settled transactions.
        </p>
      </div>

      <div className="pb-6 bg-[#f5f5f5]">
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto mb-4">
              <TabsTrigger 
                value="listings" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2"
                data-testid="tab-listings"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Listings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="exchanges" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2"
                data-testid="tab-exchanges"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Exchanges</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settlements" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#172a41] data-[state=active]:bg-transparent pb-2"
                data-testid="tab-settlements"
              >
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-sm">Settlements</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="mt-0">
              <ListingsContent />
            </TabsContent>

            <TabsContent value="exchanges" className="mt-0">
              <ExchangesContent />
            </TabsContent>

            <TabsContent value="settlements" className="mt-0">
              <SettlementsContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
