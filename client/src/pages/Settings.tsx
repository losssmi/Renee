import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function Settings() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "My Real Estate Agency",
    email: "agent@realestate.com",
    phone: "0412 345 678",
    location: "Sydney, NSW",
    timezone: "Australia/Sydney",
    currency: "AUD",
    emailNotifications: true,
    weeklyReports: true,
    goalReminders: true,
    autoBackup: true
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

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
        
        <div className="px-6 py-5 bg-[#f5f5f5]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#101010] text-lg tracking-[0] leading-[normal]">
                Settings
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Manage your account and platform preferences.
              </p>
            </div>
            {isEditing ? (
              <Button
                onClick={handleSave}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] bg-[#172a41] hover:bg-[#172a41]/90 text-white h-9 px-4"
                data-testid="button-save"
              >
                Save Changes
              </Button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-[10px] tracking-[-0.1px] leading-7 px-3 py-2 border border-[#ededed] rounded-lg hover:bg-gray-50 transition-colors"
                data-testid="button-edit"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 bg-[#f5f5f5] flex flex-col gap-4">
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                Business Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                    Business Name
                  </Label>
                  {isEditing ? (
                    <Input
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                      data-testid="input-businessname"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm py-2" data-testid="text-businessname">
                      {formData.businessName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                      data-testid="input-email"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm py-2" data-testid="text-email">
                      {formData.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                    Phone
                  </Label>
                  {isEditing ? (
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                      data-testid="input-phone"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm py-2" data-testid="text-phone">
                      {formData.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]"
                      data-testid="input-location"
                    />
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm py-2" data-testid="text-location">
                      {formData.location}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                Regional Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                    Timezone
                  </Label>
                  {isEditing ? (
                    <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
                      <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Australia/Sydney">Sydney (AEDT)</SelectItem>
                        <SelectItem value="Australia/Melbourne">Melbourne (AEDT)</SelectItem>
                        <SelectItem value="Australia/Brisbane">Brisbane (AEST)</SelectItem>
                        <SelectItem value="Australia/Perth">Perth (AWST)</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm py-2" data-testid="text-timezone">
                      {formData.timezone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                    Currency
                  </Label>
                  {isEditing ? (
                    <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                      <SelectTrigger className="[font-family:'Plus_Jakarta_Sans',Helvetica] border-[#ededed]" data-testid="select-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="NZD">NZD - New Zealand Dollar</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#172a41] text-sm py-2" data-testid="text-currency">
                      {formData.currency}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base tracking-[-0.16px] leading-7 mb-4">
                Notifications & Preferences
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                      Email Notifications
                    </Label>
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mt-1">
                      Receive notifications about important updates
                    </p>
                  </div>
                  <Switch
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: checked })}
                    disabled={!isEditing}
                    data-testid="switch-emailnotifications"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                      Weekly Reports
                    </Label>
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mt-1">
                      Get weekly performance summaries
                    </p>
                  </div>
                  <Switch
                    checked={formData.weeklyReports}
                    onCheckedChange={(checked) => setFormData({ ...formData, weeklyReports: checked })}
                    disabled={!isEditing}
                    data-testid="switch-weeklyreports"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                      Goal Reminders
                    </Label>
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mt-1">
                      Remind me about my goals and priorities
                    </p>
                  </div>
                  <Switch
                    checked={formData.goalReminders}
                    onCheckedChange={(checked) => setFormData({ ...formData, goalReminders: checked })}
                    disabled={!isEditing}
                    data-testid="switch-goalreminders"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#172a41] text-sm">
                      Auto Backup
                    </Label>
                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7280] text-xs mt-1">
                      Automatically backup your data daily
                    </p>
                  </div>
                  <Switch
                    checked={formData.autoBackup}
                    onCheckedChange={(checked) => setFormData({ ...formData, autoBackup: checked })}
                    disabled={!isEditing}
                    data-testid="switch-autobackup"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
