import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Clock, 
  User, 
  MoreVertical,
  RefreshCw,
  ExternalLink,
  Check,
  Stethoscope,
  Scissors,
  Home,
  Plane,
  X,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

interface Doctor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
}

interface Shift {
  id: string;
  doctorId: string;
  type: "On Call" | "In Clinic" | "Surgery" | "Leave";
  day: number; // 0-6 (Sun-Sat)
  startTime: string;
  endTime: string;
}

const doctors: Doctor[] = [
  { id: "1", name: "Dr. Sarah Jenkins", role: "General Practitioner", avatar: "SJ", color: "bg-blue-500" },
  { id: "2", name: "Dr. Michael O'Connor", role: "Cardiologist", avatar: "MO", color: "bg-orange" },
  { id: "3", name: "Dr. Elena Rodriguez", role: "Surgeon", avatar: "ER", color: "bg-emerald-500" },
  { id: "4", name: "Dr. David Thompson", role: "Pediatrician", avatar: "DT", color: "bg-indigo-500" },
];

const initialShifts: Shift[] = [
  { id: "s1", doctorId: "1", type: "In Clinic", day: 1, startTime: "09:00", endTime: "17:00" },
  { id: "s2", doctorId: "2", type: "On Call", day: 1, startTime: "18:00", endTime: "06:00" },
  { id: "s3", doctorId: "3", type: "Surgery", day: 2, startTime: "08:00", endTime: "14:00" },
  { id: "s4", doctorId: "4", type: "In Clinic", day: 3, startTime: "10:00", endTime: "18:00" },
  { id: "s5", doctorId: "1", type: "Leave", day: 5, startTime: "00:00", endTime: "23:59" },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

export default function DoctorSchedulePage() {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 12)); // April 12, 2026
  const [newShift, setNewShift] = useState<Partial<Shift>>({
    doctorId: "1",
    type: "In Clinic",
    day: 1,
    startTime: "09:00",
    endTime: "17:00"
  });

  const handleSync = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
  };

  const navigateDate = (amount: number, unit: 'day' | 'week' | 'month' | 'year') => {
    const newDate = new Date(currentDate);
    if (unit === 'day') newDate.setDate(newDate.getDate() + amount);
    if (unit === 'week') newDate.setDate(newDate.getDate() + amount * 7);
    if (unit === 'month') newDate.setMonth(newDate.getMonth() + amount);
    if (unit === 'year') newDate.setFullYear(newDate.getFullYear() + amount);
    setCurrentDate(newDate);
  };

  const formatDateRange = () => {
    const start = new Date(currentDate);
    const end = new Date(currentDate);
    end.setDate(end.getDate() + 6);
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    if (start.getMonth() === end.getMonth()) {
      return `${monthNames[start.getMonth()]} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
    } else {
      return `${monthNames[start.getMonth()]} ${start.getDate()} - ${monthNames[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
    }
  };

  const handleAddShift = () => {
    const shift: Shift = {
      id: `s${Date.now()}`,
      doctorId: newShift.doctorId!,
      type: newShift.type!,
      day: Number(newShift.day),
      startTime: newShift.startTime!,
      endTime: newShift.endTime!
    };
    setShifts([...shifts, shift]);
    setIsAddModalOpen(false);
  };

  const getShiftColor = (type: Shift["type"]) => {
    switch (type) {
      case "On Call": return "bg-orange/10 text-orange border-orange/20";
      case "In Clinic": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Surgery": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Leave": return "bg-slate-100 text-slate-500 border-slate-200";
      default: return "bg-slate-50 text-slate-600";
    }
  };

  const getShiftIcon = (type: Shift["type"]) => {
    switch (type) {
      case "On Call": return <Clock className="w-3 h-3" />;
      case "In Clinic": return <Stethoscope className="w-3 h-3" />;
      case "Surgery": return <Scissors className="w-3 h-3" />;
      case "Leave": return <Plane className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">Doctor Availability</h1>
          <p className="text-slate-500 font-medium">Manage shifts, surgery schedules, and leave requests.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            onClick={handleSync}
            disabled={isSyncing}
            className="h-12 border-slate-200 text-navy font-bold rounded-xl bg-white shadow-sm min-w-[160px]"
          >
            {isSyncing ? (
              <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Syncing...</>
            ) : (
              <><RefreshCw className="mr-2 w-4 h-4" /> Sync Calendar</>
            )}
          </Button>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="h-12 bg-orange hover:bg-orange/90 text-white shadow-lg shadow-orange/20 font-bold px-6 rounded-xl"
          >
            <Plus className="mr-2 w-4 h-4" /> Add Shift
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Sidebar: Shift Manager */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-navy">Shift Manager</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search doctors..." className="pl-10 bg-slate-50 border-none rounded-xl h-11" />
              </div>
              
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Doctors</p>
                {doctors.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 group cursor-grab active:cursor-grabbing hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${doc.color} flex items-center justify-center text-white font-bold text-xs`}>
                        {doc.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">{doc.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{doc.role}</p>
                      </div>
                    </div>
                    <MoreVertical className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Legend</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "On Call", color: "bg-orange" },
                    { label: "In Clinic", color: "bg-blue-500" },
                    { label: "Surgery", color: "bg-emerald-500" },
                    { label: "Leave", color: "bg-slate-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-xs font-bold text-slate-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] bg-navy text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <p className="text-sm font-bold">External Sync</p>
                  <p className="text-[10px] text-white/60 font-medium">Google / Outlook</p>
                </div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Automatically sync your clinic shifts with personal calendars to avoid double bookings.
              </p>
              <Button 
                onClick={handleSync}
                disabled={isSyncing}
                className="w-full bg-white/10 hover:bg-white/20 text-white border-none font-bold text-xs h-10 rounded-xl"
              >
                {isSyncing ? "Syncing..." : "Configure Sync"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Calendar View */}
        <div className="xl:col-span-3">
          <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-white h-full">
            <CardHeader className="flex flex-col sm:flex-row items-center justify-between p-8 border-b border-slate-50 gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Year</span>
                    <div className="flex items-center bg-slate-100 rounded-lg p-1">
                      <Button onClick={() => navigateDate(-1, 'year')} variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-white hover:shadow-sm">
                        <ChevronLeft className="w-3 h-3" />
                      </Button>
                      <Button onClick={() => navigateDate(1, 'year')} variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-white hover:shadow-sm">
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-slate-200 mx-1" />
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Month</span>
                    <div className="flex items-center bg-slate-100 rounded-lg p-1">
                      <Button onClick={() => navigateDate(-1, 'month')} variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-white hover:shadow-sm">
                        <ChevronLeft className="w-3 h-3" />
                      </Button>
                      <Button onClick={() => navigateDate(1, 'month')} variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-white hover:shadow-sm">
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-slate-200 mx-1" />
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Week</span>
                    <div className="flex items-center bg-orange/10 rounded-lg p-1">
                      <Button onClick={() => navigateDate(-1, 'week')} variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-white hover:shadow-sm text-orange">
                        <ChevronLeft className="w-3 h-3" />
                      </Button>
                      <Button onClick={() => navigateDate(1, 'week')} variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-white hover:shadow-sm text-orange">
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-bold text-navy">{formatDateRange()}</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Schedules fully synchronized</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1">
                <Button variant="ghost" className="h-9 px-4 rounded-lg text-xs font-bold text-slate-500 hover:bg-white hover:text-navy hover:shadow-sm transition-all">Day</Button>
                <Button variant="ghost" className="h-9 px-4 rounded-lg text-xs font-bold bg-white text-navy shadow-sm">Week</Button>
                <Button variant="ghost" className="h-9 px-4 rounded-lg text-xs font-bold text-slate-500 hover:bg-white hover:text-navy hover:shadow-sm transition-all">Month</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Calendar Grid Header */}
                  <div className="grid grid-cols-8 border-b border-slate-50">
                    <div className="p-4 border-r border-slate-50" />
                    {days.map((day, i) => {
                      const date = new Date(currentDate);
                      date.setDate(date.getDate() + i);
                      const isToday = new Date().toDateString() === date.toDateString();
                      
                      return (
                        <div key={day} className="p-4 text-center border-r border-slate-50 last:border-r-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{day}</p>
                          <p className={`text-lg font-bold ${isToday ? 'text-orange' : 'text-navy'}`}>{date.getDate()}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Calendar Body */}
                  <div className="relative h-[600px] overflow-y-auto">
                    {hours.map((hour) => (
                      <div key={hour} className="grid grid-cols-8 h-20 border-b border-slate-50 last:border-b-0">
                        <div className="p-2 text-right border-r border-slate-50">
                          <span className="text-[10px] font-bold text-slate-400">{hour}:00</span>
                        </div>
                        {days.map((_, i) => (
                          <div key={i} className="border-r border-slate-50 last:border-r-0 relative group hover:bg-slate-50/30 transition-colors" />
                        ))}
                      </div>
                    ))}

                    {/* Shifts Overlay */}
                    {shifts.map((shift) => {
                      const doctor = doctors.find(d => d.id === shift.doctorId);
                      const startHour = parseInt(shift.startTime.split(":")[0]);
                      const duration = 4; // Mock duration for visual
                      
                      return (
                        <motion.div
                          key={shift.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`absolute z-10 p-2 rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition-all overflow-hidden ${getShiftColor(shift.type)}`}
                          style={{
                            top: `${(startHour - 8) * 80 + 10}px`,
                            left: `${(shift.day / 8) * 100 + 12.5}%`,
                            width: "11%",
                            height: `${duration * 40}px`
                          }}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            {getShiftIcon(shift.type)}
                            <span className="text-[9px] font-bold uppercase tracking-wider">{shift.type}</span>
                          </div>
                          <p className="text-[11px] font-bold leading-tight mb-1 truncate">{doctor?.name}</p>
                          <div className="flex items-center gap-1 text-[9px] opacity-70">
                            <Clock className="w-2.5 h-2.5" />
                            {shift.startTime} - {shift.endTime}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Shift Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold text-navy">Add New Shift</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)} className="rounded-full">
                  <X className="w-6 h-6 text-slate-400" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Select Doctor</Label>
                  <select 
                    className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm font-medium"
                    value={newShift.doctorId}
                    onChange={(e) => setNewShift({...newShift, doctorId: e.target.value})}
                  >
                    {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-navy">Shift Type</Label>
                  <select 
                    className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm font-medium"
                    value={newShift.type}
                    onChange={(e) => setNewShift({...newShift, type: e.target.value as any})}
                  >
                    <option value="In Clinic">In Clinic</option>
                    <option value="On Call">On Call</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Leave">Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-navy">Day</Label>
                    <select 
                      className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm font-medium"
                      value={newShift.day}
                      onChange={(e) => setNewShift({...newShift, day: Number(e.target.value)})}
                    >
                      {days.map((d, i) => <option key={i} value={i}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-navy">Start Time</Label>
                    <Input 
                      type="time" 
                      value={newShift.startTime}
                      onChange={(e) => setNewShift({...newShift, startTime: e.target.value})}
                      className="h-12 rounded-xl bg-slate-50" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1 h-12 rounded-xl font-bold">Cancel</Button>
                <Button onClick={handleAddShift} className="flex-1 h-12 bg-orange hover:bg-orange/90 text-white font-bold rounded-xl">Save Shift</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
