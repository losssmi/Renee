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

interface AppraisalEntry {
  id: number;
  date: string;
  address: string;
  suburb: string;
  owner: string;
  price: string;
  bookedDate: string;
  wonLost: string;
  appointedAgent: string;
  status: string;
  notes: string;
}

const initialAppraisals: AppraisalEntry[] = [
  {
    id: 1,
    date: "15/10/2025",
    address: "5 Ocean Street",
    suburb: "Bondi",
    owner: "John Smith",
    price: "$2,500,000",
    bookedDate: "10/10/2025",
    wonLost: "Won",
    appointedAgent: "Sarah Johnson",
    status: "Scheduled",
    notes: "Follow up next week"
  }
];

export function Appraisals() {
  const { toast } = useToast();
  const [appraisals, setAppraisals] = useState<AppraisalEntry[]>(initialAppraisals);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    date: "",
    address: "",
    suburb: "",
    owner: "",
    price: "",
    bookedDate: "",
    wonLost: "",
    appointedAgent: "",
    status: "",
    notes: ""
  });

  const resetForm = () => {
    setFormData({
      date: "",
      address: "",
      suburb: "",
      owner: "",
      price: "",
      bookedDate: "",
      wonLost: "",
      appointedAgent: "",
      status: "",
      notes: ""
    });
  };

  const handleAdd = () => {
    const newAppraisal: AppraisalEntry = {
      id: Math.max(...appraisals.map(a => a.id), 0) + 1,
      ...formData
    };
    setAppraisals([...appraisals, newAppraisal]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Appraisal Added",
      description: "New appraisal has been added successfully.",
    });
  };

  const handleEdit = (id: number) => {
    const appraisal = appraisals.find(a => a.id === id);
    if (appraisal) {
      setFormData({
        date: appraisal.date,
        address: appraisal.address,
        suburb: appraisal.suburb,
        owner: appraisal.owner,
        price: appraisal.price,
        bookedDate: appraisal.bookedDate,
        wonLost: appraisal.wonLost,
        appointedAgent: appraisal.appointedAgent,
        status: appraisal.status,
        notes: appraisal.notes
      });
      setEditingId(id);
      setIsAddDialogOpen(true);
    }
  };

  const handleUpdate = () => {
    setAppraisals(appraisals.map(appraisal => 
      appraisal.id === editingId ? { ...appraisal, ...formData } : appraisal
    ));
    setIsAddDialogOpen(false);
    setEditingId(null);
    resetForm();
    toast({
      title: "Appraisal Updated",
      description: "Appraisal has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setAppraisals(appraisals.filter(appraisal => appraisal.id !== id));
    toast({
      title: "Appraisal Deleted",
      description: "Appraisal has been removed successfully.",
    });
  };

  const renderAppraisalCard = (appraisal: AppraisalEntry) => (
    <Card
      key={appraisal.id}
      className="bg-white border-[#ededed] shadow-sm mb-1 hover:shadow-md transition-shadow w-full"
      data-testid={`appraisal-card-${appraisal.id}`}
    >
      <CardContent className="px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center flex-1 min-w-0 gap-3 overflow-x-auto">
            <div className="min-w-[160px] flex-shrink-0">
              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm leading-tight" data-testid={`text-address-${appraisal.id}`}>
                {appraisal.address}
              </h3>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-[11px] leading-tight truncate" data-testid={`text-suburb-${appraisal.id}`}>
                {appraisal.suburb}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Owner</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs" data-testid={`text-owner-${appraisal.id}`}>
                {appraisal.owner}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Price</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-xs" data-testid={`text-price-${appraisal.id}`}>
                {appraisal.price}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Date</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs" data-testid={`text-date-${appraisal.id}`}>
                {appraisal.date}
              </p>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Booked</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs" data-testid={`text-bookeddate-${appraisal.id}`}>
                {appraisal.bookedDate}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Outcome</p>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${
                appraisal.wonLost === 'Won' 
                  ? 'bg-green-100 text-green-800' 
                  : appraisal.wonLost === 'Lost'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`} data-testid={`text-wonlost-${appraisal.id}`}>
                {appraisal.wonLost}
              </span>
            </div>

            <div className="min-w-[100px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Agent</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs" data-testid={`text-appointedagent-${appraisal.id}`}>
                {appraisal.appointedAgent}
              </p>
            </div>

            <div className="min-w-[80px] flex-shrink-0">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Status</p>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-xs" data-testid={`text-status-${appraisal.id}`}>
                {appraisal.status}
              </p>
            </div>

            {appraisal.notes && (
              <div className="min-w-[120px] flex-shrink-0">
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-[10px]">Notes</p>
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs truncate" data-testid={`text-notes-${appraisal.id}`}>
                  {appraisal.notes}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2 items-center flex-shrink-0 ml-2">
            <button
              onClick={() => handleEdit(appraisal.id)}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
              data-testid={`button-edit-${appraisal.id}`}
            >
              <Pencil className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleDelete(appraisal.id)}
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#172a41] hover:text-[#172a41]/80 transition-colors p-1"
              data-testid={`button-delete-${appraisal.id}`}
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
            data-testid="button-add-appraisal"
          >
            <Plus className="w-4 h-4" />
            Add Appraisal
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 bg-[#f5f5f5]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <div className="bg-white border border-[#ededed] rounded-t-lg px-4 py-3 flex items-center justify-between">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm">
                All Appraisals ({appraisals.length})
              </h2>
            </div>
            <div className="min-h-[200px] p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-300">
              {appraisals.length === 0 ? (
                <div className="flex items-center justify-center h-[100px]">
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs text-center px-4">
                    No appraisals yet. Click "Add Appraisal" to get started.
                  </p>
                </div>
              ) : (
                appraisals.map(renderAppraisalCard)
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-lg">
              {editingId ? "Edit Appraisal" : "Add New Appraisal"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Date
                </label>
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="15/10/2025"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-date"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Booked Date
                </label>
                <Input
                  value={formData.bookedDate}
                  onChange={(e) => setFormData({ ...formData, bookedDate: e.target.value })}
                  placeholder="10/10/2025"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-bookeddate"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Address
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="5 Ocean Street"
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
                  Owner
                </label>
                <Input
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  placeholder="John Smith"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-owner"
                />
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Price
                </label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="$2,500,000"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-price"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Won/Lost
                </label>
                <Select value={formData.wonLost} onValueChange={(value) => setFormData({ ...formData, wonLost: value })}>
                  <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-wonlost">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Won">Won</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                  Appointed Agent
                </label>
                <Input
                  value={formData.appointedAgent}
                  onChange={(e) => setFormData({ ...formData, appointedAgent: e.target.value })}
                  placeholder="Sarah Johnson"
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                  data-testid="input-appointedagent"
                />
              </div>
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
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                Notes
              </label>
              <Input
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Follow up next week"
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                data-testid="input-notes"
              />
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

export function AppraisalsContent() {
  return <Appraisals />;
}

export default function AppraisalsPage() {
  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex">
      <aside className="w-[263px] flex-shrink-0">
        <SideBarSection />
      </aside>

      <main className="flex-1 flex flex-col bg-[#f5f5f5]">
        <DashboardHeaderSection />
        <Appraisals />
      </main>
    </div>
  );
}
