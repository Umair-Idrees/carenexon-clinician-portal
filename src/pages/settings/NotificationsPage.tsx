import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Stethoscope, 
  Settings, 
  Building2, 
  ChevronLeft,
  Smartphone,
  Mail,
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface Preference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface Section {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  preferences: Preference[];
}

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<Section[]>([
    {
      title: "Clinical Alerts",
      icon: <Stethoscope className="w-5 h-5" />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      preferences: [
        { id: "new-presc", label: "New Prescription Forms", description: "Get notified when a new patient prescription is submitted for review.", enabled: true },
        { id: "pend-sign", label: "Pending Signatures", description: "Daily reminder for clinical records awaiting your digital signature.", enabled: true },
        { id: "urgent-results", label: "Urgent Patient Results", description: "Immediate alerts for pathology or lab results flagged as high priority.", enabled: true },
        { id: "med-review", label: "Medication Reviews", description: "Monthly alerts for patients due for regular clinical medication review.", enabled: false },
      ]
    },
    {
      title: "System & API Health",
      icon: <Settings className="w-5 h-5" />,
      iconBg: "bg-orange/10",
      iconColor: "text-orange",
      preferences: [
        { id: "pmr-sync", label: "PMR Sync Status Errors", description: "Alerts when the portal fails to synchronize with the pharmacy system database.", enabled: true },
        { id: "api-status", label: "API Provider Status", description: "Real-time updates if external NHS or Clinical API providers experience downtime.", enabled: false },
        { id: "system-updates", label: "System Maintenance", description: "Advance notification of scheduled CareNexon system updates and new features.", enabled: true },
      ]
    },
    {
      title: "Practice Management",
      icon: <Building2 className="w-5 h-5" />,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
      preferences: [
        { id: "appointment-book", label: "Appointment Bookings", description: "Summary of new online bookings or cancellations within the last 24 hours.", enabled: false },
        { id: "payment-confirm", label: "Payments Received", description: "Instant notification upon successful private prescription payment transactions.", enabled: true },
        { id: "staff-activity", label: "Staff Access Logs", description: "Weekly report of which staff members accessed high-security clinical areas.", enabled: false },
      ]
    }
  ]);

  const togglePreference = (sectionIdx: number, prefIdx: number) => {
    const newPrefs = [...preferences];
    newPrefs[sectionIdx].preferences[prefIdx].enabled = !newPrefs[sectionIdx].preferences[prefIdx].enabled;
    setPreferences(newPrefs);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="rounded-full bg-white shadow-sm hover:shadow-md transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-navy" />
            </Button>
            <div>
              <h1 className="text-2xl font-black text-navy tracking-tight">Notification Preferences</h1>
              <p className="text-slate-500 text-sm">Customize how and when you receive clinical and system alerts</p>
            </div>
          </div>
          <Badge className="bg-emerald-100 text-emerald-600 border-none font-bold px-4 py-1.5 rounded-full hidden sm:flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Live Updates Enabled
          </Badge>
        </div>

        {/* Channels Selection */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
          <h3 className="text-lg font-black text-navy tracking-tight mb-6">Delivery Channels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-orange/10 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-orange/5 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:bg-orange/5 transition-colors">
                  <Smartphone className="w-6 h-6 text-orange" />
                </div>
                <div>
                  <p className="font-black text-navy leading-none">Push</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Recommended</p>
                </div>
              </div>
              <Switch checked={true} className="data-[state=checked]:bg-orange" />
            </div>
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:bg-navy/5 transition-colors">
                  <Mail className="w-6 h-6 text-navy/70" />
                </div>
                <div>
                  <p className="font-black text-navy leading-none">Email</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Daily Digest</p>
                </div>
              </div>
              <Switch checked={true} className="data-[state=checked]:bg-navy" />
            </div>
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:bg-navy/5 transition-colors">
                  <Zap className="w-6 h-6 text-navy/70" />
                </div>
                <div>
                  <p className="font-black text-navy leading-none">Desktop</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">In-app</p>
                </div>
              </div>
              <Switch checked={false} className="data-[state=checked]:bg-navy" />
            </div>
          </div>
        </div>

        {/* Detailed Preferences List */}
        <div className="space-y-8">
          {preferences.map((section, sIdx) => (
            <div key={sIdx} className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-2.5 ${section.iconBg} rounded-2xl`}>
                  <div className={section.iconColor}>{section.icon}</div>
                </div>
                <h3 className="text-lg font-black text-navy tracking-tight">{section.title}</h3>
              </div>

              <div className="space-y-2">
                {section.preferences.map((pref, pIdx) => (
                  <div 
                    key={pIdx} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-slate-50/50 rounded-[2rem] transition-all group"
                  >
                    <div className="max-w-xl">
                      <p className="font-black text-navy mb-1">{pref.label}</p>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{pref.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Switch 
                        checked={pref.enabled} 
                        onCheckedChange={() => togglePreference(sIdx, pIdx)}
                        className="data-[state=checked]:bg-orange"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Help */}
        <div className="p-8 bg-navy rounded-[3rem] text-white overflow-hidden relative shadow-2xl shadow-navy/20">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/10 rounded-[1.5rem] backdrop-blur-md">
                <ShieldCheck className="w-8 h-8 text-orange" />
              </div>
              <div>
                <h4 className="text-xl font-black">Data Security Notice</h4>
                <p className="text-blue-100/70 font-medium">Notifications containing patient PII are always encrypted.</p>
              </div>
            </div>
            <Button className="bg-orange hover:bg-orange/90 text-white font-black h-14 px-8 rounded-2xl shadow-lg shadow-orange/30">
              Verify Global Security Rules
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
