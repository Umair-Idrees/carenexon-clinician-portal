import { useState } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  User, 
  Calendar, 
  FileText, 
  MoreVertical, 
  ChevronRight,
  X,
  Stethoscope,
  Activity,
  History,
  Pill
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
import PatientRegistration from "./PatientRegistration";

interface Patient {
  id: string; // NHS style: 123 456 7890
  name: string;
  avatar: string;
  gender: "Male" | "Female" | "Other";
  lastVisit: string;
  nextAppointment: string;
  condition: string;
  history: string[];
}

const initialPatients: Patient[] = [
  { 
    id: "NHS 482 119 4421", 
    name: "Sarah Jenkins", 
    avatar: "https://i.pravatar.cc/150?u=P-001", 
    gender: "Female", 
    lastVisit: "12/04/2026", 
    nextAppointment: "22/04/2026", 
    condition: "Hypertension",
    history: ["Type 2 Diabetes diagnosed 2022", "Allergic to Penicillin", "Regular BP monitoring"]
  },
  { 
    id: "NHS 992 341 8823", 
    name: "Michael O'Connor", 
    avatar: "https://i.pravatar.cc/150?u=P-002", 
    gender: "Male", 
    lastVisit: "05/04/2026", 
    nextAppointment: "18/04/2026", 
    condition: "Asthma",
    history: ["Seasonal allergies", "Smoker (quit 2024)", "Inhaler review pending"]
  },
  { 
    id: "NHS 124 556 3390", 
    name: "Elena Rodriguez", 
    avatar: "https://i.pravatar.cc/150?u=P-003", 
    gender: "Female", 
    lastVisit: "15/04/2026", 
    nextAppointment: "15/05/2026", 
    condition: "Post-Op Recovery",
    history: ["Knee replacement surgery Mar 2026", "Physiotherapy ongoing", "Pain management"]
  },
  { 
    id: "NHS 772 110 5562", 
    name: "David Thompson", 
    avatar: "https://i.pravatar.cc/150?u=P-004", 
    gender: "Male", 
    lastVisit: "10/03/2026", 
    nextAppointment: "25/04/2026", 
    condition: "Diabetes Type 1",
    history: ["Insulin dependent", "Annual eye screening completed", "HbA1c: 6.8%"]
  },
  { 
    id: "NHS 331 990 2214", 
    name: "Linda Wu", 
    avatar: "https://i.pravatar.cc/150?u=P-005", 
    gender: "Female", 
    lastVisit: "20/03/2026", 
    nextAppointment: "None", 
    condition: "General Checkup",
    history: ["Routine bloods normal", "Vaccinations up to date", "No chronic conditions"]
  },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegistrationSuccess = (data: any) => {
    const newPatient: Patient = {
      id: `NHS ${data.nhsNumber.slice(0, 3)} ${data.nhsNumber.slice(3, 6)} ${data.nhsNumber.slice(6)}`,
      name: data.fullName,
      avatar: data.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2),
      gender: data.gender.charAt(0).toUpperCase() + data.gender.slice(1) as any,
      lastVisit: new Date().toLocaleDateString('en-GB'),
      nextAppointment: "Pending",
      condition: "New Admission",
      history: [
        `Allergies: ${data.allergies || "None"}`,
        `Medications: ${data.medications || "None"}`,
        `GP Practice: ${data.gpPractice}`
      ]
    };
    setPatients([newPatient, ...patients]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">Patient Directory</h1>
          <p className="text-slate-500 font-medium">Total Patients: <span className="text-navy font-bold">{patients.length}</span></p>
        </div>
        <Button 
          onClick={() => setIsRegistrationOpen(true)}
          className="bg-orange hover:bg-orange/90 text-white shadow-lg shadow-orange/20 font-bold h-12 px-6 rounded-xl"
        >
          <Plus className="mr-2 w-4 h-4" /> Add New Patient
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by name or NHS number..." 
              className="pl-10 bg-slate-50 border-none rounded-xl h-11 focus-visible:ring-orange/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-11 border-slate-200 text-slate-600 font-bold rounded-xl bg-white">
              <Filter className="mr-2 w-4 h-4" /> Filter by Visit
            </Button>
            <Button variant="outline" className="h-11 border-slate-200 text-slate-600 font-bold rounded-xl bg-white">
              Gender
            </Button>
            <Button variant="outline" className="h-11 border-slate-200 text-slate-600 font-bold rounded-xl bg-white">
              Condition
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient Table */}
      <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="pl-8 font-bold text-slate-500 uppercase text-[10px] tracking-widest">Patient Details</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Last Visit</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Next Appt</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Condition</TableHead>
                <TableHead className="pr-8 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow 
                  key={patient.id} 
                  className="group hover:bg-slate-50/50 border-slate-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <TableCell className="pl-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-100 overflow-hidden">
                        <img src={patient.avatar} alt={patient.name} className="w-full h-full object-cover text-[8px]" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-bold text-navy text-base">{patient.name}</p>
                        <p className="text-xs text-slate-400 font-bold tracking-tight">{patient.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {patient.lastVisit}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm font-bold text-navy">
                      <Activity className="w-3.5 h-3.5 text-blue-500" />
                      {patient.nextAppointment}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      {patient.condition}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Button 
                        size="sm" 
                        className="bg-navy hover:bg-navy/90 text-white font-bold rounded-lg h-9 px-4 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Prescribe logic here
                        }}
                      >
                        <Pill className="mr-2 w-3.5 h-3.5" /> Prescribe
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-300 hover:text-navy">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick View Side Panel */}
      <AnimatePresence>
        {selectedPatient && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPatient(null)}
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
                <h2 className="text-2xl font-display font-bold text-navy">Patient Profile</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedPatient(null)} className="rounded-full hover:bg-slate-100">
                  <X className="w-5 h-5 text-slate-400" />
                </Button>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-navy font-bold text-2xl border-2 border-indigo-100 overflow-hidden">
                    <img src={selectedPatient.avatar} alt={selectedPatient.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy">{selectedPatient.name}</h3>
                    <p className="text-slate-500 font-bold text-sm tracking-tight mb-2">{selectedPatient.id}</p>
                    <Badge className="bg-navy text-white font-bold text-[10px] uppercase">{selectedPatient.gender}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Condition</p>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-orange" />
                      <p className="font-bold text-navy">{selectedPatient.condition}</p>
                    </div>
                  </div>
                  <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Last Visit</p>
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-blue-500" />
                      <p className="font-bold text-navy">{selectedPatient.lastVisit}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-navy" />
                    <h4 className="font-bold text-navy">Medical History Summary</h4>
                  </div>
                  <div className="space-y-3">
                    {selectedPatient.history.map((item, i) => (
                      <div key={i} className="flex gap-3 items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 shrink-0" />
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-8">
                  <Button className="flex-1 h-12 bg-orange hover:bg-orange/90 text-white font-bold rounded-xl shadow-lg shadow-orange/20">
                    Full Medical Record
                  </Button>
                  <Button variant="outline" className="h-12 w-12 border-slate-200 rounded-xl flex items-center justify-center">
                    <MoreVertical className="w-5 h-5 text-slate-400" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PatientRegistration 
        isOpen={isRegistrationOpen} 
        onClose={() => setIsRegistrationOpen(false)} 
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
}
