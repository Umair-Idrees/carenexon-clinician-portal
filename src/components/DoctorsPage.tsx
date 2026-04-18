import { useState } from "react";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  Stethoscope, 
  Star,
  CheckCircle2,
  Clock,
  Filter,
  UserPlus,
  X,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  status: "Available" | "On Leave" | "In Surgery" | "Busy";
  email: string;
  phone: string;
  avatar: string;
}

const initialDoctors: Doctor[] = [
  { 
    id: "DOC-001", 
    name: "Dr. Sarah Jenkins", 
    specialty: "General Practitioner", 
    experience: "12 Years", 
    rating: 4.9, 
    status: "Available",
    email: "s.jenkins@clinic.com",
    phone: "+44 7700 900123",
    avatar: "https://i.pravatar.cc/150?u=DOC-001"
  },
  { 
    id: "DOC-002", 
    name: "Dr. Michael O'Connor", 
    specialty: "Cardiologist", 
    experience: "15 Years", 
    rating: 5.0, 
    status: "Busy",
    email: "m.oconnor@clinic.com",
    phone: "+44 7700 900456",
    avatar: "https://i.pravatar.cc/150?u=DOC-002"
  },
  { 
    id: "DOC-003", 
    name: "Dr. Elena Rodriguez", 
    specialty: "Surgeon", 
    experience: "10 Years", 
    rating: 4.8, 
    status: "In Surgery",
    email: "e.rodriguez@clinic.com",
    phone: "+44 7700 900789",
    avatar: "https://i.pravatar.cc/150?u=DOC-003"
  },
  { 
    id: "DOC-004", 
    name: "Dr. David Thompson", 
    specialty: "Pediatrician", 
    experience: "8 Years", 
    rating: 4.7, 
    status: "Available",
    email: "d.thompson@clinic.com",
    phone: "+44 7700 900321",
    avatar: "https://i.pravatar.cc/150?u=DOC-004"
  },
  { 
    id: "DOC-005", 
    name: "Dr. Linda Wu", 
    specialty: "Dermatologist", 
    experience: "14 Years", 
    rating: 4.9, 
    status: "On Leave",
    email: "l.wu@clinic.com",
    phone: "+44 7700 900654",
    avatar: "https://i.pravatar.cc/150?u=DOC-005"
  },
];

export default function DoctorsPage() {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(initialDoctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const filteredDoctors = doctorsList.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDoctor = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsAddModalOpen(false);
  };

  const getStatusColor = (status: Doctor["status"]) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-700";
      case "Busy": return "bg-amber-100 text-amber-700";
      case "In Surgery": return "bg-rose-100 text-rose-700";
      case "On Leave": return "bg-slate-100 text-slate-500";
      default: return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">Medical Staff</h1>
          <p className="text-slate-500 font-medium">Manage your clinic's specialized doctors and their availability.</p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange hover:bg-orange/90 text-white shadow-lg shadow-orange/20 font-bold h-12 px-6 rounded-xl"
        >
          <UserPlus className="mr-2 w-4 h-4" /> Add New Doctor
        </Button>
      </div>

      {/* Stats & Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 border-none shadow-sm rounded-3xl overflow-hidden">
          <CardContent className="p-4 flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by name, specialty or ID..." 
                className="pl-10 bg-slate-50 border-none rounded-xl h-11 focus-visible:ring-orange/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-11 border-slate-200 text-slate-600 font-bold rounded-xl bg-white">
              <Filter className="mr-2 w-4 h-4" /> Filter
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm rounded-3xl bg-navy text-white p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Active Staff</p>
            <p className="text-2xl font-bold">{doctorsList.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-orange" />
          </div>
        </Card>
      </div>

      {/* Doctors Table */}
      <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="pl-8 font-bold text-slate-500 uppercase text-[10px] tracking-widest">Doctor Details</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Specialty</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Experience</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Rating</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Status</TableHead>
                <TableHead className="pr-8 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doc) => (
                <TableRow 
                  key={doc.id} 
                  className="group hover:bg-slate-50/50 border-slate-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedDoctor(doc)}
                >
                  <TableCell className="pl-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-100 overflow-hidden">
                        <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover text-[8px]" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-bold text-navy text-base">{doc.name}</p>
                        <p className="text-xs text-slate-400 font-bold tracking-tight">{doc.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-200 text-slate-600 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      {doc.specialty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-bold text-slate-600">{doc.experience}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-orange font-bold text-sm">
                      <Star className="w-3.5 h-3.5 fill-orange" />
                      {doc.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(doc.status)} border-none font-bold px-2.5 py-0.5 text-[10px] uppercase tracking-wider`}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-300 hover:text-navy">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Doctor Profile Side Panel */}
      <AnimatePresence>
        {selectedDoctor && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
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
                <h2 className="text-2xl font-display font-bold text-navy">Doctor Profile</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedDoctor(null)} className="rounded-full hover:bg-slate-100">
                  <X className="w-5 h-5 text-slate-400" />
                </Button>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-navy font-bold text-2xl border-2 border-indigo-100 overflow-hidden">
                    <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy">{selectedDoctor.name}</h3>
                    <p className="text-orange font-bold text-sm tracking-tight mb-2">{selectedDoctor.specialty}</p>
                    <Badge className={`${getStatusColor(selectedDoctor.status)} border-none font-bold text-[10px] uppercase`}>
                      {selectedDoctor.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-navy" />
                    <h4 className="font-bold text-navy">Contact Information</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <Mail className="w-4 h-4 text-orange" />
                      <p className="text-sm text-slate-600 font-bold">{selectedDoctor.email}</p>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <Phone className="w-4 h-4 text-orange" />
                      <p className="text-sm text-slate-600 font-bold">{selectedDoctor.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-navy rounded-[2rem] text-white">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold">Performance Summary</h4>
                    <Star className="w-5 h-5 text-orange fill-orange" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Experience</p>
                      <p className="text-lg font-bold">{selectedDoctor.experience}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Rating</p>
                      <p className="text-lg font-bold">{selectedDoctor.rating}/5.0</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-8">
                  <Button className="flex-1 h-12 bg-orange hover:bg-orange/90 text-white font-bold rounded-xl shadow-lg shadow-orange/20">
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 border-slate-200 text-navy font-bold rounded-xl">
                    View Schedule
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Doctor Modal */}
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
                <h2 className="text-2xl font-display font-bold text-navy">Register New Doctor</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)} className="rounded-full">
                  <X className="w-6 h-6 text-slate-400" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Full Name</Label>
                  <Input placeholder="e.g. Dr. Jane Smith" className="h-12 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Specialty</Label>
                  <Input placeholder="e.g. Cardiologist" className="h-12 rounded-xl bg-slate-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-navy">Experience</Label>
                    <Input placeholder="e.g. 10 Years" className="h-12 rounded-xl bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-navy">Phone</Label>
                    <Input placeholder="+44..." className="h-12 rounded-xl bg-slate-50" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1 h-12 rounded-xl font-bold">Cancel</Button>
                <Button onClick={handleAddDoctor} disabled={isSaving} className="flex-[2] h-12 bg-orange hover:bg-orange/90 text-white font-bold rounded-xl">
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register Staff"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
