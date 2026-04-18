import { useState, useMemo } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User, 
  Calendar as CalendarIcon,
  MoreVertical,
  Plus,
  X,
  Loader2,
  Search,
  CheckCircle,
  Edit2,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  date: string; // ISO format for easy comparison
  type: "General" | "Follow-up" | "Emergency";
  status: "Confirmed" | "Pending";
}

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: "1", patientName: "Sarah Jenkins", time: "09:00 AM", date: "2026-04-16", type: "General", status: "Confirmed" },
  { id: "2", patientName: "Michael O'Connor", time: "10:30 AM", date: "2026-04-16", type: "Follow-up", status: "Confirmed" },
  { id: "3", patientName: "Elena Rodriguez", time: "01:00 PM", date: "2026-04-16", type: "Emergency", status: "Pending" },
  { id: "4", patientName: "David Thompson", time: "03:30 PM", date: "2026-04-16", type: "General", status: "Confirmed" },
];

export default function DashboardCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 16)); // Default to April 2026
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 3, 16));
  const [viewMode, setViewMode] = useState<'calendar' | 'year'>('calendar');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [appointmentList, setAppointmentList] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  
  // Edit Appointment State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingApt, setEditingApt] = useState<Appointment | null>(null);
  const [editForm, setEditForm] = useState<Appointment | null>(null);
  
  // Local Toast State
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

  const showLocalToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // New Appointment Form State
  const [newApt, setNewApt] = useState({
    name: "",
    time: "09:00",
    type: "General" as Appointment["type"]
  });
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const years = Array.from({ length: 12 }, (_, i) => 2020 + i);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setViewMode('calendar');
  };

  const handleSchedule = async () => {
    if (!newApt.name) return;
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const timeNum = parseInt(newApt.time.split(':')[0]);
    const ampm = timeNum >= 12 ? 'PM' : 'AM';
    const hour = timeNum % 12 || 12;
    const readableTime = `${hour}:${newApt.time.split(':')[1]} ${ampm}`;

    const newEntry: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      patientName: newApt.name,
      time: readableTime,
      date: formattedDate,
      type: newApt.type,
      status: "Confirmed"
    };

    setAppointmentList(prev => [...prev, newEntry]);
    setIsSaving(false);
    setIsScheduleModalOpen(false);
    setNewApt({ name: "", time: "09:00", type: "General" });
    showLocalToast("Appointment Scheduled Successfully.");
  };

  const handleUpdate = async () => {
    if (!editForm) return;
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setAppointmentList(prev => prev.map(a => a.id === editForm.id ? editForm : a));
    setIsSaving(false);
    setIsEditModalOpen(false);
    setEditingApt(null);
    setEditForm(null);
    showLocalToast("Appointment Updated Successfully.");
  };

  const timeOptions = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  const filteredAppointments = useMemo(() => {
    const formattedSelected = selectedDate.toISOString().split('T')[0];
    return appointmentList.filter(apt => apt.date === formattedSelected);
  }, [appointmentList, selectedDate]);

  const formatDateLabel = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Mini Calendar */}
      <Card className="lg:col-span-1 border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
          <button 
            onClick={() => setViewMode(viewMode === 'calendar' ? 'year' : 'calendar')}
            className="text-xl font-bold text-navy hover:text-orange transition-colors"
          >
            {viewMode === 'calendar' ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}` : "Select Year"}
          </button>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevMonth}
              className="h-8 w-8 rounded-lg hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextMonth}
              className="h-8 w-8 rounded-lg hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0 min-h-[300px]">
          <AnimatePresence mode="wait">
            {viewMode === 'calendar' ? (
              <motion.div 
                key="calendar"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-7 gap-2 mb-4"
              >
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                  <div key={day} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2">
                    {day}
                  </div>
                ))}
                {emptyDays.map(i => <div key={`empty-${i}`} />)}
                {days.map(day => {
                  const isSelected = day === selectedDate.getDate() && 
                                   currentDate.getMonth() === selectedDate.getMonth() && 
                                   currentDate.getFullYear() === selectedDate.getFullYear();
                  return (
                    <div 
                      key={day} 
                      onClick={() => handleDateClick(day)}
                      className={`text-center py-2 text-sm font-bold rounded-xl cursor-pointer transition-all ${
                        isSelected ? "bg-orange text-white shadow-lg shadow-orange/20 scale-110" : "text-navy hover:bg-slate-50"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                key="year"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="grid grid-cols-3 gap-3"
              >
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`py-4 rounded-2xl font-bold text-sm transition-all ${
                      year === currentDate.getFullYear() 
                        ? "bg-orange text-white shadow-lg" 
                        : "bg-slate-50 text-navy hover:bg-slate-100"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button 
            onClick={() => setIsScheduleModalOpen(true)}
            className="w-full bg-navy hover:bg-navy/90 text-white font-bold h-12 rounded-xl mt-4 shadow-lg shadow-navy/20"
          >
            <Plus className="mr-2 w-4 h-4" /> Schedule New
          </Button>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-navy">Today's Schedule</CardTitle>
            <p className="text-slate-500 font-medium text-sm">{formatDateLabel(selectedDate)}</p>
          </div>
          <Badge className="bg-orange/10 text-orange border-none font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
            {filteredAppointments.length} Appointments
          </Badge>
        </CardHeader>
        <CardContent className="p-8 pt-0 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredAppointments.map((apt) => (
              <motion.div 
                layout
                key={apt.id} 
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:shadow-md transition-all relative"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center border border-slate-100">
                    <Clock className="w-4 h-4 text-orange mb-1" />
                    <span className="text-[9px] font-bold text-navy">{apt.time.split(' ')[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-navy text-sm">{apt.patientName}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-slate-200 text-slate-500 font-bold text-[9px] uppercase px-2 py-0">
                        {apt.type}
                      </Badge>
                      <span className="text-[10px] text-slate-400 font-bold">{apt.time.split(' ')[1]}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${apt.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"} border-none font-bold text-[9px] uppercase px-2.5 py-0.5`}>
                    {apt.status}
                  </Badge>
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setOpenActionMenuId(openActionMenuId === apt.id ? null : apt.id)}
                      className="h-8 w-8 text-slate-300 hover:text-navy"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                    
                    {openActionMenuId === apt.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                        <button 
                          onClick={() => {
                            setEditingApt(apt);
                            setEditForm({ ...apt });
                            setIsEditModalOpen(true);
                            setOpenActionMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors active:scale-95"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit Appointment
                        </button>
                        <button 
                          onClick={() => {
                            setAppointmentList(prev => prev.filter(a => a.id !== apt.id));
                            setOpenActionMenuId(null);
                            showLocalToast("Appointment Canceled Successfully.", "error");
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors active:scale-95"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Cancel
                        </button>
                        <button 
                          onClick={() => {
                            setAppointmentList(prev => prev.map(a => a.id === apt.id ? { ...a, status: "Confirmed" as const } : a));
                            setOpenActionMenuId(null);
                            showLocalToast("Appointment Marked as Completed.");
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl flex items-center gap-2 transition-colors border-t border-slate-50 mt-1 active:scale-95"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Mark as Completed
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredAppointments.length === 0 && (
              <div className="h-48 flex flex-col items-center justify-center text-slate-400 gap-2 border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                <CalendarIcon className="w-8 h-8 opacity-20" />
                <p className="text-sm font-bold">No appointments for this day</p>
                <Button variant="ghost" size="sm" onClick={() => setIsScheduleModalOpen(true)} className="text-orange font-bold text-xs uppercase tracking-widest">
                  Create One
                </Button>
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Schedule New Modal */}
      <AnimatePresence>
        {isScheduleModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScheduleModalOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold text-navy">New Appointment</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsScheduleModalOpen(false)} className="rounded-full">
                  <X className="w-6 h-6 text-slate-400" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Patient Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      placeholder="Enter patient name..." 
                      value={newApt.name}
                      onChange={(e) => setNewApt({ ...newApt, name: e.target.value })}
                      className="h-12 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange/20" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-navy">Date</Label>
                    <div className="h-12 rounded-xl bg-slate-100 flex items-center px-4 font-bold text-navy text-sm">
                      {selectedDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-navy">Time Slot</Label>
                    <Input 
                      type="time" 
                      value={newApt.time}
                      onChange={(e) => setNewApt({ ...newApt, time: e.target.value })}
                      className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange/20" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Appointment Type</Label>
                  <select 
                    value={newApt.type}
                    onChange={(e) => setNewApt({ ...newApt, type: e.target.value as Appointment["type"] })}
                    className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-navy focus:ring-2 focus:ring-orange/20"
                  >
                    <option value="General">General Checkup</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)} className="flex-1 h-12 rounded-xl font-bold">Cancel</Button>
                <Button 
                  onClick={handleSchedule} 
                  disabled={isSaving || !newApt.name} 
                  className="flex-[2] h-12 bg-orange hover:bg-orange/90 text-white font-bold rounded-xl shadow-lg shadow-orange/20 transition-all active:scale-95"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Booking"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Edit Appointment Modal */}
      <AnimatePresence>
        {isEditModalOpen && editForm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold text-navy">Edit Appointment</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full">
                  <X className="w-6 h-6 text-slate-400" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Patient Name (Read-only)</Label>
                  <div className="h-12 flex items-center px-4 rounded-xl bg-slate-100 text-navy font-bold text-sm opacity-70">
                    {editForm.patientName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-navy">Time Slot</Label>
                    <select 
                      value={editForm.time}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-navy focus:ring-2 focus:ring-orange/20"
                    >
                      {timeOptions.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-navy">Status</Label>
                    <select 
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                      className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-navy focus:ring-2 focus:ring-orange/20"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-navy">Appointment Type</Label>
                  <select 
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value as any })}
                    className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-navy focus:ring-2 focus:ring-orange/20"
                  >
                    <option value="General">General</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="ghost" onClick={() => setIsEditModalOpen(false)} className="flex-1 h-12 rounded-xl font-bold text-slate-400">Cancel</Button>
                <Button 
                  onClick={handleUpdate} 
                  className="flex-[2] h-12 bg-orange hover:bg-orange/90 text-white font-bold rounded-xl shadow-lg shadow-orange/20 transition-all active:scale-95"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[250]"
          >
            <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
              toast.type === "success" ? "bg-slate-900 border-green-500/30" : "bg-rose-900 border-rose-500/30"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                toast.type === "success" ? "bg-green-500" : "bg-rose-500"
              }`}>
                <CheckCircle2 className="text-white w-5 h-5" />
              </div>
              <p className="text-white font-bold text-sm tracking-tight">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
