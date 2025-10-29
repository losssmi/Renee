import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Circle, GripVertical, ArrowRight } from "lucide-react";
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
  revisedGuide: string;
  vendorsPrice: string;
  sellingPrice: string;
  methodOfSale: string;
  leadSource: string;
  motivation: string;
  readiness: "red" | "yellow" | "green";
  listedDate: string;
  daysOnMarket: number;
  offers: string;
  commRate: string;
  stage: "Preparing" | "On Market" | "Off Market";
}

const initialListings: ListingEntry[] = [
  {
    id: 1,
    address: "15 Beach Road",
    suburb: "Bondi",
    guide: "3200000",
    revisedGuide: "3100000",
    vendorsPrice: "3000000",
    sellingPrice: "",
    methodOfSale: "Private Treaty",
    leadSource: "Referral",
    motivation: "Upsizing",
    readiness: "green",
    listedDate: "10/10/2025",
    daysOnMarket: 13,
    offers: "2",
    commRate: "2.5",
    stage: "Preparing"
  },
  {
    id: 2,
    address: "42 Ocean Avenue",
    suburb: "Manly",
    guide: "2800000",
    revisedGuide: "2750000",
    vendorsPrice: "2700000",
    sellingPrice: "",
    methodOfSale: "Auction",
    leadSource: "Website",
    motivation: "Downsizing",
    readiness: "yellow",
    listedDate: "15/10/2025",
    daysOnMarket: 8,
    offers: "1",
    commRate: "2.0",
    stage: "Off Market"
  },
  {
    id: 3,
    address: "78 Coastal Drive",
    suburb: "Coogee",
    guide: "4500000",
    revisedGuide: "",
    vendorsPrice: "4400000",
    sellingPrice: "4450000",
    methodOfSale: "Auction",
    leadSource: "Cold Call",
    motivation: "Investment",
    readiness: "green",
    listedDate: "01/10/2025",
    daysOnMarket: 22,
    offers: "3",
    commRate: "3.0",
    stage: "On Market"
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

export function Listings() {
  const { toast } = useToast();
  const [listings, setListings] = useState<ListingEntry[]>(initialListings);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggedListing, setDraggedListing] = useState<number | null>(null);
  
  // Check for pending listings from Sellers page
  useEffect(() => {
    const pendingListings = localStorage.getItem('pendingListings');
    if (pendingListings) {
      const parsed = JSON.parse(pendingListings);
      if (parsed.length > 0) {
        setListings(prev => [...prev, ...parsed]);
        localStorage.removeItem('pendingListings');
        toast({
          title: "Listings Added",
          description: `${parsed.length} seller(s) converted to listings.`,
        });
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    address: "",
    suburb: "",
    guide: "",
    revisedGuide: "",
    vendorsPrice: "",
    sellingPrice: "",
    methodOfSale: "",
    leadSource: "",
    motivation: "",
    readiness: "yellow" as "red" | "yellow" | "green",
    listedDate: "",
    daysOnMarket: 0,
    offers: "",
    commRate: "",
    stage: "Preparing" as "Preparing" | "Off Market" | "On Market"
  });

  const resetForm = () => {
    setFormData({
      address: "",
      suburb: "",
      guide: "",
      revisedGuide: "",
      vendorsPrice: "",
      sellingPrice: "",
      methodOfSale: "",
      leadSource: "",
      motivation: "",
      readiness: "yellow",
      listedDate: "",
      daysOnMarket: 0,
      offers: "",
      commRate: "",
      stage: "Preparing"
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
      setFormData({
        address: listing.address,
        suburb: listing.suburb,
        guide: listing.guide,
        revisedGuide: listing.revisedGuide,
        vendorsPrice: listing.vendorsPrice,
        sellingPrice: listing.sellingPrice,
        methodOfSale: listing.methodOfSale,
        leadSource: listing.leadSource,
        motivation: listing.motivation,
        readiness: listing.readiness,
        listedDate: listing.listedDate,
        daysOnMarket: listing.daysOnMarket,
        offers: listing.offers,
        commRate: listing.commRate,
        stage: listing.stage
      });
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

  const handleMoveToSales = (id: number) => {
    const listing = listings.find(l => l.id === id);
    if (listing) {
      // Convert listing to sale format
      const newSale = {
        id: Date.now(),
        address: listing.address,
        suburb: listing.suburb,
        soldPrice: listing.sellingPrice || listing.guide,
        commRate: listing.commRate,
        methodOfSale: listing.methodOfSale,
        listingAgent: "TBD",
        conjunction: "No",
        leadSource: listing.leadSource,
        split: "100",
        listedDate: listing.listedDate,
        daysOnMarket: listing.daysOnMarket.toString(),
        exchangedDate: new Date().toLocaleDateString('en-GB'),
        settlementDate: "",
        stage: "Exchanged"
      };
      
      // Store in localStorage to be picked up by Sales page
      const existingSales = JSON.parse(localStorage.getItem('pendingSales') || '[]');
      localStorage.setItem('pendingSales', JSON.stringify([...existingSales, newSale]));
      
      // Remove from listings
      setListings(listings.filter(l => l.id !== id));
      
      toast({
        title: "Moved to Sales",
        description: "Listing has been converted to a sale. Check the Sales page.",
      });
    }
  };

  const handleDragStart = (e: React.DragEvent, listingId: number) => {
    setDraggedListing(listingId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStage: "Preparing" | "Off Market" | "On Market") => {
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

  const calculateForecastGCI = (guide: string, commRate: string) => {
    const guideNum = parseFloat(guide.replace(/[^0-9.]/g, '')) || 0;
    const rateNum = parseFloat(commRate) || 0;
    const gci = (guideNum * rateNum) / 100;
    return gci > 0 ? `$${gci.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-";
  };

  const getListingsByStage = (stage: "Preparing" | "Off Market" | "On Market") => {
    return listings.filter(listing => listing.stage === stage);
  };

  const calculateStageTotal = (stage: "Preparing" | "Off Market" | "On Market") => {
    const stageListings = getListingsByStage(stage);
    const total = stageListings.reduce((sum, listing) => {
      const guideNum = parseFloat(listing.guide.replace(/[^0-9.]/g, '')) || 0;
      const rateNum = parseFloat(listing.commRate) || 0;
      return sum + (guideNum * rateNum) / 100;
    }, 0);
    return total > 0 ? `$${total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "$0";
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

            <div className="min-w-[100px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Guide</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-guide-${listing.id}`}>
                ${parseFloat(listing.guide).toLocaleString('en-US')}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Revised Guide</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-revisedguide-${listing.id}`}>
                {listing.revisedGuide ? `$${parseFloat(listing.revisedGuide).toLocaleString('en-US')}` : "-"}
              </p>
            </div>

            <div className="min-w-[110px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Vendor's Price</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-vendorsprice-${listing.id}`}>
                ${parseFloat(listing.vendorsPrice).toLocaleString('en-US')}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Selling Price</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-xs" data-testid={`text-sellingprice-${listing.id}`}>
                {listing.sellingPrice ? `$${parseFloat(listing.sellingPrice).toLocaleString('en-US')}` : "-"}
              </p>
            </div>

            <div className="min-w-[110px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Method of Sale</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-methodofsale-${listing.id}`}>
                {listing.methodOfSale}
              </p>
            </div>

            <div className="min-w-[90px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Lead Source</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-leadsource-${listing.id}`}>
                {listing.leadSource}
              </p>
            </div>

            <div className="min-w-[90px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Motivation</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-motivation-${listing.id}`}>
                {listing.motivation}
              </p>
            </div>

            <div className="min-w-[70px] flex-shrink-0 text-center">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Readiness</p>
              <div className="flex justify-center" data-testid={`text-readiness-${listing.id}`}>
                <TrafficLight color={listing.readiness} />
              </div>
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

            <div className="min-w-[60px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Offers</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-offers-${listing.id}`}>
                {listing.offers}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Comm. Rate</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-[11px]" data-testid={`text-commrate-${listing.id}`}>
                {listing.commRate}%
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0 text-right">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[10px]">Forecast GCI</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#09b600] text-xs" data-testid={`text-forecastgci-${listing.id}`}>
                {calculateForecastGCI(listing.guide, listing.commRate)}
              </p>
            </div>

            <div className="flex gap-1 flex-shrink-0 pl-2">
              <button
                onClick={() => handleMoveToSales(listing.id)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#09b600] hover:text-[#09b600]/80 transition-colors p-1"
                title="Move to Sales"
                data-testid={`button-movetosales-${listing.id}`}
              >
                <ArrowRight className="w-3 h-3" />
              </button>
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

  const content = (
    <>
      <div className="px-6 py-5 bg-[#f5f5f5]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal]">
                Listings
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Drag listings between stages to update their status.
              </p>
            </div>
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
            {/* Preparing Stage */}
            <div className="flex flex-col w-full">
              <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3 flex items-center justify-between">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                  Preparing ({getListingsByStage("Preparing").length})
                </h2>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
                  Total Est. GCI: <span className="text-[#09b600] font-semibold">{calculateStageTotal("Preparing")}</span>
                </p>
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "Preparing")}
                className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300"
                data-testid="dropzone-preparing"
              >
                {getListingsByStage("Preparing").length === 0 ? (
                  <div className="flex items-center justify-center h-[100px]">
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                      Drag listings here
                    </p>
                  </div>
                ) : (
                  getListingsByStage("Preparing").map(renderListingCard)
                )}
              </div>
            </div>

            {/* Off Market Stage */}
            <div className="flex flex-col w-full">
              <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3 flex items-center justify-between">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                  Off Market ({getListingsByStage("Off Market").length})
                </h2>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
                  Total Est. GCI: <span className="text-[#09b600] font-semibold">{calculateStageTotal("Off Market")}</span>
                </p>
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "Off Market")}
                className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300"
                data-testid="dropzone-offmarket"
              >
                {getListingsByStage("Off Market").length === 0 ? (
                  <div className="flex items-center justify-center h-[100px]">
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                      Drag listings here
                    </p>
                  </div>
                ) : (
                  getListingsByStage("Off Market").map(renderListingCard)
                )}
              </div>
            </div>

            {/* On Market Stage */}
            <div className="flex flex-col w-full">
              <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3 flex items-center justify-between">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                  On Market ({getListingsByStage("On Market").length})
                </h2>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs">
                  Total Est. GCI: <span className="text-[#09b600] font-semibold">{calculateStageTotal("On Market")}</span>
                </p>
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "On Market")}
                className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300"
                data-testid="dropzone-onmarket"
              >
                {getListingsByStage("On Market").length === 0 ? (
                  <div className="flex items-center justify-center h-[100px]">
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                      Drag listings here
                    </p>
                  </div>
                ) : (
                  getListingsByStage("On Market").map(renderListingCard)
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
                  Guide
                </label>
                <Input
                  value={formData.guide}
                  onChange={(e) => setFormData({ ...formData, guide: e.target.value })}
                  placeholder="3200000"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-guide"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Revised Guide
                </label>
                <Input
                  value={formData.revisedGuide}
                  onChange={(e) => setFormData({ ...formData, revisedGuide: e.target.value })}
                  placeholder="3100000"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-revisedguide"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Vendor's Price
                </label>
                <Input
                  value={formData.vendorsPrice}
                  onChange={(e) => setFormData({ ...formData, vendorsPrice: e.target.value })}
                  placeholder="3000000"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-vendorsprice"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Selling Price
                </label>
                <Input
                  value={formData.sellingPrice}
                  onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                  placeholder="Optional"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-sellingprice"
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
            </div>

            <div className="grid grid-cols-3 gap-4">
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
                  placeholder="13"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-daysonmarket"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Offers
                </label>
                <Input
                  value={formData.offers}
                  onChange={(e) => setFormData({ ...formData, offers: e.target.value })}
                  placeholder="2"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-offers"
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
                  <SelectItem value="Preparing">Preparing</SelectItem>
                  <SelectItem value="Off Market">Off Market</SelectItem>
                  <SelectItem value="On Market">On Market</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.guide && formData.commRate && (
              <div className="grid gap-2 p-4 bg-[#f9fafb] rounded-lg border border-[#ededed]">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Forecast GCI
                </label>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#09b600] text-xl" data-testid="text-calculated-gci">
                  {calculateForecastGCI(formData.guide, formData.commRate)}
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

export function ListingsContent() {
  return <Listings />;
}

export default function ListingsPage() {
  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      <aside className="w-[263px] flex-shrink-0">
        <SideBarSection />
      </aside>

      <main className="flex-1 flex flex-col bg-[#f5f5f5]">
        <DashboardHeaderSection />
        <Listings />
      </main>
    </div>
  );
}
