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

interface BuyerEntry {
  id: number;
  name: string;
  phone: string;
  email: string;
  budget: string;
  location: string;
  status: string;
}

const initialBuyers: BuyerEntry[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "0412 345 678",
    email: "sarah.j@email.com",
    budget: "$2,000,000 - $2,500,000",
    location: "Bondi, Bronte",
    status: "Active"
  }
];

export function Buyers() {
  const { toast } = useToast();
  const [buyers, setBuyers] = useState<BuyerEntry[]>(initialBuyers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    location: "",
    status: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      budget: "",
      location: "",
      status: ""
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
        status: buyer.status
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

  const content = (
    <>
      <div className="px-6 py-5 bg-[#f5f5f5]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal]">
                Buyers
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Manage your buyer database.
              </p>
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
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f9fafb] border-b border-[#ededed]">
                    <tr>
                      <th className="px-6 py-3 text-left [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#6b7280] text-xs tracking-[0] leading-[18px] uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#6b7280] text-xs tracking-[0] leading-[18px] uppercase">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#6b7280] text-xs tracking-[0] leading-[18px] uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#6b7280] text-xs tracking-[0] leading-[18px] uppercase">
                        Budget
                      </th>
                      <th className="px-6 py-3 text-left [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#6b7280] text-xs tracking-[0] leading-[18px] uppercase">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#6b7280] text-xs tracking-[0] leading-[18px] uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#6b7280] text-xs tracking-[0] leading-[18px] uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ededed]">
                    {buyers.map((buyer) => (
                      <tr key={buyer.id} className="hover:bg-[#f9fafb] transition-colors">
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-name-${buyer.id}`}>
                          {buyer.name}
                        </td>
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-phone-${buyer.id}`}>
                          {buyer.phone}
                        </td>
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-email-${buyer.id}`}>
                          {buyer.email}
                        </td>
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm" data-testid={`text-budget-${buyer.id}`}>
                          {buyer.budget}
                        </td>
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-location-${buyer.id}`}>
                          {buyer.location}
                        </td>
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-status-${buyer.id}`}>
                          {buyer.status}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleEdit(buyer.id)}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors"
                              data-testid={`button-edit-${buyer.id}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(buyer.id)}
                              className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors"
                              data-testid={`button-delete-${buyer.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
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
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      <aside className="w-[263px] flex-shrink-0">
        <SideBarSection />
      </aside>

      <main className="flex-1 flex flex-col bg-[#f5f5f5]">
        <DashboardHeaderSection />
        <Buyers />
      </main>
    </div>
  );
}
