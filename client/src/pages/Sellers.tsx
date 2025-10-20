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

interface SellerEntry {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  price: string;
  status: string;
}

const initialSellers: SellerEntry[] = [
  {
    id: 1,
    name: "Michael Brown",
    phone: "0423 456 789",
    email: "michael.b@email.com",
    address: "12 Park Avenue, Bondi",
    price: "$3,200,000",
    status: "Active"
  }
];

export function Sellers() {
  const { toast } = useToast();
  const [sellers, setSellers] = useState<SellerEntry[]>(initialSellers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    price: "",
    status: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      price: "",
      status: ""
    });
  };

  const handleAdd = () => {
    const newSeller: SellerEntry = {
      id: sellers.length + 1,
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
        price: seller.price,
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
                Manage your seller database.
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
                        Address
                      </th>
                      <th className="px-6 py-3 text-left [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#6b7280] text-xs tracking-[0] leading-[18px] uppercase">
                        Price
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
                    {sellers.map((seller) => (
                      <tr key={seller.id} className="hover:bg-[#f9fafb] transition-colors">
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-name-${seller.id}`}>
                          {seller.name}
                        </td>
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-phone-${seller.id}`}>
                          {seller.phone}
                        </td>
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-email-${seller.id}`}>
                          {seller.email}
                        </td>
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-address-${seller.id}`}>
                          {seller.address}
                        </td>
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm" data-testid={`text-price-${seller.id}`}>
                          {seller.price}
                        </td>
                        <td className="px-6 py-4 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm" data-testid={`text-status-${seller.id}`}>
                          {seller.status}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-end">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg">
              {editingId ? "Edit Seller" : "Add New Seller"}
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
                Price
              </label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                data-testid="input-price"
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
                  <SelectItem value="Listed">Listed</SelectItem>
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
    </div>
  );
}
