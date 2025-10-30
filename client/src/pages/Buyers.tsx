import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { DashboardPageLayout } from "@/components/DashboardPageLayout";
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

interface BuyerEntry {
  id: number;
  name: string;
  phone: string;
  email: string;
  budget: string;
  location: string;
  status: string;
  stage: "Leads" | "Active" | "Hot Buyers";
}

const initialBuyers: BuyerEntry[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "0412 345 678",
    email: "sarah.j@email.com",
    budget: "$2,000,000 - $2,500,000",
    location: "Bondi, Bronte",
    status: "Active",
    stage: "Active"
  }
];

export function Buyers() {
  const { toast } = useToast();
  const [buyers, setBuyers] = useState<BuyerEntry[]>(initialBuyers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggedBuyer, setDraggedBuyer] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    location: "",
    status: "",
    stage: "Leads" as "Leads" | "Active" | "Hot Buyers"
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      budget: "",
      location: "",
      status: "",
      stage: "Leads"
    });
  };

  const handleAdd = () => {
    const newBuyer: BuyerEntry = {
      id: buyers.length + 1,
      ...formData
    };
    setBuyers([...buyers, newBuyer]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Buyer Added",
      description: "New buyer has been added successfully.",
    });
  };

  const handleEdit = (id: number) => {
    const buyer = buyers.find(b => b.id === id);
    if (buyer) {
      setFormData({
        name: buyer.name,
        phone: buyer.phone,
        email: buyer.email,
        budget: buyer.budget,
        location: buyer.location,
        status: buyer.status,
        stage: buyer.stage
      });
      setEditingId(id);
      setIsAddDialogOpen(true);
    }
  };

  const handleUpdate = () => {
    setBuyers(buyers.map(buyer => 
      buyer.id === editingId ? { ...buyer, ...formData } : buyer
    ));
    setIsAddDialogOpen(false);
    setEditingId(null);
    resetForm();
    toast({
      title: "Buyer Updated",
      description: "Buyer has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setBuyers(buyers.filter(buyer => buyer.id !== id));
    toast({
      title: "Buyer Deleted",
      description: "Buyer has been removed successfully.",
    });
  };

  const handleDragStart = (e: React.DragEvent, buyerId: number) => {
    setDraggedBuyer(buyerId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStage: "Leads" | "Active" | "Hot Buyers") => {
    e.preventDefault();
    if (draggedBuyer !== null) {
      setBuyers(buyers.map(buyer => 
        buyer.id === draggedBuyer ? { ...buyer, stage: newStage } : buyer
      ));
      toast({
        title: "Stage Updated",
        description: `Buyer moved to ${newStage}`,
      });
      setDraggedBuyer(null);
    }
  };

  const getBuyersByStage = (stage: "Leads" | "Active" | "Hot Buyers") => {
    return buyers.filter(buyer => buyer.stage === stage);
  };

  const renderBuyerCard = (buyer: BuyerEntry) => (
    <Card
      key={buyer.id}
      className="bg-white border-[#ededed] shadow-sm mb-1 cursor-move hover:shadow-md transition-shadow w-full"
      draggable
      onDragStart={(e) => handleDragStart(e, buyer.id)}
      data-testid={`buyer-card-${buyer.id}`}
    >
      <CardContent className="px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center flex-1 min-w-0 gap-3 overflow-x-auto">
            <div className="min-w-[160px] flex-shrink-0">
              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm leading-tight" data-testid={`text-name-${buyer.id}`}>
                {buyer.name}
              </h3>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[11px] leading-tight truncate" data-testid={`text-phone-${buyer.id}`}>
                {buyer.phone}
              </p>
            </div>

            <div className="min-w-[180px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Email</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs truncate" data-testid={`text-email-${buyer.id}`}>
                {buyer.email}
              </p>
            </div>

            <div className="min-w-[140px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Budget</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-budget-${buyer.id}`}>
                {buyer.budget}
              </p>
            </div>

            <div className="min-w-[120px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Location</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs" data-testid={`text-location-${buyer.id}`}>
                {buyer.location}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Status</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs" data-testid={`text-status-${buyer.id}`}>
                {buyer.status}
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center flex-shrink-0 ml-2">
            <button
              onClick={() => handleEdit(buyer.id)}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
              data-testid={`button-edit-${buyer.id}`}
            >
              <Pencil className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleDelete(buyer.id)}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
              data-testid={`button-delete-${buyer.id}`}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const content = (
    <>
      <div className="px-6 py-5 bg-[#f5f5f5]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white h-9 px-4 gap-2"
            data-testid="button-add-buyer"
          >
            <Plus className="w-4 h-4" />
            Add Buyer
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 bg-[#f5f5f5]">
        <div className="flex flex-col gap-4">
          {/* Leads Stage */}
          <div className="flex flex-col w-full">
            <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3 flex items-center justify-between">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                Leads ({getBuyersByStage("Leads").length})
              </h2>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "Leads")}
              className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300"
              data-testid="dropzone-leads"
            >
              {getBuyersByStage("Leads").length === 0 ? (
                <div className="flex items-center justify-center h-[100px]">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                    Drag buyers here
                  </p>
                </div>
              ) : (
                getBuyersByStage("Leads").map(renderBuyerCard)
              )}
            </div>
          </div>

          {/* Active Stage */}
          <div className="flex flex-col w-full">
            <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3 flex items-center justify-between">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                Active ({getBuyersByStage("Active").length})
              </h2>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "Active")}
              className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300"
              data-testid="dropzone-active"
            >
              {getBuyersByStage("Active").length === 0 ? (
                <div className="flex items-center justify-center h-[100px]">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                    Drag buyers here
                  </p>
                </div>
              ) : (
                getBuyersByStage("Active").map(renderBuyerCard)
              )}
            </div>
          </div>

          {/* Hot Buyers Stage */}
          <div className="flex flex-col w-full">
            <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3 flex items-center justify-between">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                Hot Buyers ({getBuyersByStage("Hot Buyers").length})
              </h2>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "Hot Buyers")}
              className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300"
              data-testid="dropzone-hotbuyers"
            >
              {getBuyersByStage("Hot Buyers").length === 0 ? (
                <div className="flex items-center justify-center h-[100px]">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                    Drag buyers here
                  </p>
                </div>
              ) : (
                getBuyersByStage("Hot Buyers").map(renderBuyerCard)
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg">
              {editingId ? "Edit Buyer" : "Add New Buyer"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
            <div className="grid gap-2">
              <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                Budget
              </label>
              <Input
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                data-testid="input-budget"
              />
            </div>
            <div className="grid gap-2">
              <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                Location
              </label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                data-testid="input-location"
              />
            </div>
            <div className="grid gap-2">
              <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                Status
              </label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                Stage
              </label>
              <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value as "Leads" | "Active" | "Hot Buyers" })}>
                <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-stage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leads">Leads</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Hot Buyers">Hot Buyers</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

export function BuyersContent() {
  return <Buyers />;
}

export default function BuyersPage() {
  return (
    <DashboardPageLayout>
      <Buyers />
    </DashboardPageLayout>
  );
}
