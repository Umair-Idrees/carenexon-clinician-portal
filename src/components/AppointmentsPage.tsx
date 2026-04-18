import { useState } from "react";
import { 
  Search, 
  Calendar as CalendarIcon, 
  Plus, 
  MoreVertical, 
  User, 
  Clock, 
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  History,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";

interface Appointment {
  id: string;
  patientName: string;
  avatar: string;
  time: string;
  date: string;
  type: "General" | "Follow-up" | "Emergency";
  doctor: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

const mockAppointments: Appointment[] = [
  { id: "APT-001", patientName: "James Wilson", avatar: "https://i.pravatar.cc/150?u=JW", time: "09:00 AM", date: "16/04/2026", type: "General", doctor: "Dr. Siregar", status: "Confirmed" },
  { id: "APT-002", patientName: "Emma Thompson", avatar: "https://i.pravatar.cc/150?u=ET", time: "10:30 AM", date: "16/04/2026", type: "Follow-up", doctor: "Dr. Siregar", status: "Pending" },
  { id: "APT-003", patientName: "Robert Davis", avatar: "https://i.pravatar.cc/150?u=RD", time: "11:45 AM", date: "16/04/2026", type: "Emergency", doctor: "Dr. Smith", status: "Confirmed" },
  { id: "APT-004", patientName: "Sophie Martin", avatar: "https://i.pravatar.cc/150?u=SM", time: "02:15 PM", date: "16/04/2026", type: "General", doctor: "Dr. Siregar", status: "Cancelled" },
  { id: "APT-005", patientName: "Arthur Miller", avatar: "https://i.pravatar.cc/150?u=AM", time: "04:00 PM", date: "16/04/2026", type: "Follow-up", doctor: "Dr. Jones", status: "Confirmed" },
];

export default function AppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppointments = mockAppointments.filter(apt => 
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">Appointments Management</h1>
          <p className="text-slate-500 font-medium">Manage and track patient consultations.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search patients..." 
              className="pl-10 bg-white border-slate-200 rounded-xl h-12 focus-visible:ring-orange/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-12 px-4 rounded-xl border-slate-200 text-slate-600 font-bold bg-white">
            <CalendarIcon className="mr-2 w-4 h-4" /> 16 Apr - 22 Apr
          </Button>
          <Button className="h-12 px-6 bg-orange hover:bg-orange/90 text-white shadow-lg shadow-orange/20 font-bold rounded-xl">
            <Plus className="mr-2 w-4 h-4" /> Book Appointment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Today's Total", value: "24", icon: CalendarIcon, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pending Confirmation", value: "08", icon: Clock, color: "text-orange", bg: "bg-orange/5" },
          { label: "Completed", value: "12", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-extrabold text-navy mt-1">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Table */}
      <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 px-8 py-6">
          <CardTitle className="text-xl font-bold text-navy">Appointment List</CardTitle>
          <Button variant="ghost" size="icon" className="text-slate-400">
            <Filter className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="pl-8 font-bold text-slate-500 uppercase text-[10px] tracking-widest">Patient Name</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Time & Date</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Type</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Doctor</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Status</TableHead>
                <TableHead className="pr-8 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((apt) => (
                <TableRow 
                  key={apt.id} 
                  className="group hover:bg-slate-50/50 border-slate-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedAppointment(apt)}
                >
                  <TableCell className="pl-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm overflow-hidden">
                        <img src={apt.avatar} alt={apt.patientName} className="w-full h-full object-cover text-[8px]" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-bold text-navy">{apt.patientName}</p>
                        <p className="text-xs text-slate-400 font-medium">{apt.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-navy">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {apt.time}
                      </div>
                      <p className="text-xs text-slate-400 font-medium">{apt.date}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`
                      font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border-none
                      ${apt.type === 'Emergency' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'}
                    `}>
                      {apt.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-sm font-bold text-slate-600">{apt.doctor}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`
                      font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border-none
                      ${apt.status === 'Confirmed' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 
                        apt.status === 'Pending' ? 'bg-orange text-white shadow-lg shadow-orange/20' : 
                        'bg-slate-400 text-white'}
                    `}>
                      {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">View Details</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange transition-colors" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Details Drawer (Overlay) */}
      <AnimatePresence>
        {selectedAppointment && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAppointment(null)}
              className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display font-bold text-navy">Appointment Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedAppointment(null)} className="rounded-full hover:bg-slate-100">
                  <X className="w-5 h-5 text-slate-400" />
                </Button>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {selectedAppointment.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy">{selectedAppointment.patientName}</h3>
                    <p className="text-slate-500 font-medium">{selectedAppointment.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-100 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time</p>
                    <p className="font-bold text-navy">{selectedAppointment.time}</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                    <p className="font-bold text-navy">{selectedAppointment.date}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                    <span className="text-sm font-bold text-slate-500">Appointment Type</span>
                    <Badge variant="secondary" className="font-bold">{selectedAppointment.type}</Badge>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                    <span className="text-sm font-bold text-slate-500">Assigned Doctor</span>
                    <span className="text-sm font-bold text-navy">{selectedAppointment.doctor}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                    <span className="text-sm font-bold text-slate-500">Status</span>
                    <Badge className={`font-bold ${selectedAppointment.status === 'Confirmed' ? 'bg-green-500' : 'bg-orange'}`}>
                      {selectedAppointment.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="font-bold text-navy">Clinical Notes</h4>
                  <div className="p-4 bg-orange/5 rounded-2xl border border-orange/10 text-sm text-slate-600 italic leading-relaxed">
                    "Patient reports recurring symptoms. Follow-up required after initial medication course. Monitor blood pressure levels during next visit."
                  </div>
                </div>

                <div className="flex gap-3 pt-8">
                  <Button className="flex-1 h-12 bg-navy text-white font-bold rounded-xl">Edit Appointment</Button>
                  <Button variant="outline" className="flex-1 h-12 border-slate-200 text-rose-500 font-bold rounded-xl hover:bg-rose-50">Cancel</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
