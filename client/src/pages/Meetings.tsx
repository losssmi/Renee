import { SideBarSection } from "./sections/SideBarSection";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, User, MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface Meeting {
  id: number;
  title: string;
  type: "1-on-1" | "Team" | "Client";
  date: string;
  time: string;
  attendees: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
}

export function Meetings() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      title: "Weekly Team Sync",
      type: "Team",
      date: "2024-01-22",
      time: "10:00 AM",
      attendees: "5 people",
      status: "upcoming",
    },
    {
      id: 2,
      title: "1-on-1 with Sales Rep",
      type: "1-on-1",
      date: "2024-01-23",
      time: "2:00 PM",
      attendees: "2 people",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Client Strategy Session",
      type: "Client",
      date: "2024-01-24",
      time: "11:00 AM",
      attendees: "3 people",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Monthly Review",
      type: "Team",
      date: "2024-01-18",
      time: "3:00 PM",
      attendees: "8 people",
      status: "completed",
      notes: "Discussed Q1 targets and pipeline progress.",
    },
    {
      id: 5,
      title: "Performance Check-in",
      type: "1-on-1",
      date: "2024-01-17",
      time: "9:00 AM",
      attendees: "2 people",
      status: "completed",
      notes: "Reviewed KPIs and discussed growth opportunities.",
    },
  ]);

  const upcomingMeetings = meetings.filter(m => m.status === "upcoming");
  const pastMeetings = meetings.filter(m => m.status === "completed");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "1-on-1":
        return <User className="w-4 h-4" />;
      case "Team":
        return <Users className="w-4 h-4" />;
      case "Client":
        return <Users className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "1-on-1":
        return "bg-blue-100 text-blue-700";
      case "Team":
        return "bg-green-100 text-green-700";
      case "Client":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
                Meetings
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#394e66] text-sm tracking-[0] leading-[21px]">
                Manage and track your meetings and collaboration sessions.
              </p>
            </div>
            <Button
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] h-auto px-4 py-2 bg-[#172a41] hover:bg-[#172a41]/90 text-white"
              data-testid="button-add-meeting"
            >
              Schedule Meeting
            </Button>
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-6">
          {/* Upcoming Meetings */}
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base mb-4">
                Upcoming Meetings
              </h2>
              
              <div className="space-y-3">
                {upcomingMeetings.length === 0 ? (
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#4e657f] text-sm text-center py-4">
                    No upcoming meetings scheduled
                  </p>
                ) : (
                  upcomingMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="flex items-start justify-between p-4 border border-[#ededed] rounded-lg hover:bg-[#fffdf9] transition-colors"
                      data-testid={`meeting-${meeting.id}`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">{getTypeIcon(meeting.type)}</div>
                        <div className="flex-1">
                          <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-1">
                            {meeting.title}
                          </h3>
                          <div className="flex items-center gap-4 text-xs text-[#4e657f]">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica]">{meeting.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica]">{meeting.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica]">{meeting.attendees}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-[10px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold ${getTypeBadgeColor(meeting.type)}`}>
                          {meeting.type}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-4 [font-family:'Plus_Jakarta_Sans',Helvetica] text-xs"
                        data-testid={`button-join-${meeting.id}`}
                      >
                        Join
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Past Meetings */}
          <Card className="bg-white border-[#ededed] shadow-sm">
            <CardContent className="p-6">
              <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-base mb-4">
                Past Meetings
              </h2>
              
              <div className="space-y-3">
                {pastMeetings.length === 0 ? (
                  <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#4e657f] text-sm text-center py-4">
                    No past meetings found
                  </p>
                ) : (
                  pastMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="flex items-start justify-between p-4 border border-[#ededed] rounded-lg"
                      data-testid={`meeting-past-${meeting.id}`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1 opacity-50">{getTypeIcon(meeting.type)}</div>
                        <div className="flex-1">
                          <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#172a41] text-sm mb-1">
                            {meeting.title}
                          </h3>
                          <div className="flex items-center gap-4 text-xs text-[#4e657f] mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica]">{meeting.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica]">{meeting.time}</span>
                            </div>
                          </div>
                          {meeting.notes && (
                            <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#4e657f] text-xs mt-2">
                              {meeting.notes}
                            </p>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-[10px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold ${getTypeBadgeColor(meeting.type)} opacity-70`}>
                          {meeting.type}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
