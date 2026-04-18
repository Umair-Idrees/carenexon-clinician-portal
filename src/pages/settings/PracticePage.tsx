import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Clock, 
  Users, 
  Activity, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Database,
  ExternalLink,
  MapPin,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const staffList = [
  { name: "Dr. Alireza Siregar", role: "Clinician (Admin)", status: "Active" },
  { name: "Sarah Jenkins", role: "Pharmacy Manager", status: "Active" },
  { name: "James Wilson", role: "Clinical Pharmacist", status: "Active" },
  { name: "Emma Thompson", role: "Medical Assistant", status: "Inactive" },
];

const syncLogs = [
  { timestamp: "2026-04-17 12:45", status: "Successful", records: 12, ods: "FG542" },
  { timestamp: "2026-04-17 08:30", status: "Successful", records: 45, ods: "FG542" },
  { timestamp: "2026-04-16 18:15", status: "Failed", records: 0, ods: "FG542" },
  { timestamp: "2026-04-16 12:00", status: "Successful", records: 28, ods: "FG542" },
];

export default function PracticePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
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
            <h1 className="text-2xl font-black text-navy tracking-tight">Practice Details</h1>
            <p className="text-slate-500 text-sm">Pharmacy profile, operational hours, and system synchronization status</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pharmacy Information */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-2xl">
                    <Building2 className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-black text-navy tracking-tight">Pharmacy Information</h3>
                </div>
                <Badge className="bg-emerald-100 text-emerald-600 border-none font-bold px-4 py-1.5 rounded-full w-fit">
                  PMR Connection Active
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Practice Name</p>
                  <p className="text-lg font-black text-navy">Central London Pharmacy Hub</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ODS Code</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-black text-navy font-mono">FG542</p>
                    <Badge variant="outline" className="border-slate-200 text-slate-500 font-bold ml-2">Primary Hub</Badge>
                  </div>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Registered Address</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                    <p className="text-navy font-bold leading-relaxed">
                      15 Baker Street, Marylebone, London NW1 6XE, United Kingdom
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="rounded-xl border-slate-200 font-bold px-6">
                  Edit Practice Information
                </Button>
              </div>
            </div>

            {/* PMR Sync Log */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange/10 rounded-2xl">
                    <Activity className="w-5 h-5 text-orange" />
                  </div>
                  <h3 className="text-lg font-black text-navy tracking-tight">PMR Sync Log</h3>
                </div>
                <Button variant="ghost" className="text-orange font-bold text-sm gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Force Sync Now
                </Button>
              </div>

              <div className="rounded-[1.5rem] border border-slate-100 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="border-slate-100 hover:bg-transparent">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 h-12">Timestamp</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 h-12">Action</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 h-12">Status</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 h-12 text-right">Records</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {syncLogs.map((log, idx) => (
                      <TableRow key={idx} className="border-slate-100 hover:bg-slate-50/30 transition-colors">
                        <TableCell className="font-bold text-navy tabular-nums text-sm py-4">{log.timestamp}</TableCell>
                        <TableCell className="text-slate-500 font-medium text-sm py-4">Full PMR DB Sync (ODS: {log.ods})</TableCell>
                        <TableCell className="py-4">
                          <Badge className={log.status === "Successful" ? "bg-emerald-50 text-emerald-600 border-none px-3 font-bold" : "bg-red-50 text-red-600 border-none px-3 font-bold"}>
                            {log.status === "Successful" ? <CheckCircle2 className="w-3 h-3 mr-1.5" /> : <AlertCircle className="w-3 h-3 mr-1.5" />}
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-black text-navy tabular-nums py-4">{log.records}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-center pt-2">
                <Button variant="ghost" className="text-slate-400 text-sm font-bold">View Full Activity History</Button>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Opening Hours */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-50 rounded-2xl">
                  <Clock className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-black text-navy tracking-tight">Opening Hours</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { day: "Mon - Fri", hours: "08:30 - 18:30", active: true },
                  { day: "Saturday", hours: "09:00 - 14:00", active: true },
                  { day: "Sunday", hours: "Closed", active: false },
                ].map((row, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl border ${row.active ? 'border-transparent bg-slate-50' : 'border-slate-100 opacity-60'}`}>
                    <span className="font-bold text-navy">{row.day}</span>
                    <span className={row.active ? "font-black text-navy tabular-nums" : "text-slate-400"}>{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Registered Staff */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-2xl">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-black text-navy tracking-tight">Registered Staff</h3>
              </div>

              <div className="space-y-2">
                {staffList.map((staff, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group">
                    <div>
                      <p className="font-bold text-navy text-sm">{staff.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{staff.role}</p>
                    </div>
                    {staff.status === "Active" ? (
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                    )}
                  </div>
                ))}
              </div>
              
              <Button className="w-full h-12 bg-navy text-white hover:bg-navy/90 rounded-2xl font-bold flex items-center justify-center gap-2">
                Manage Access Roles
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
