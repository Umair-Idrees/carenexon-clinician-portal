import { useState } from "react";
import { 
  HeartPulse, 
  Brain, 
  Baby, 
  Bone, 
  Dna, 
  Scan, 
  Users, 
  MoreVertical, 
  Plus, 
  Settings2, 
  ChevronDown, 
  ChevronUp,
  Search,
  CheckCircle2,
  X,
  Loader2,
  Stethoscope,
  Building2,
  Edit3,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  status: "Active" | "Offline";
  avatar: string;
}

interface Department {
  id: string;
  name: string;
  icon: any;
  color: string;
  doctorCount: number;
  description: string;
  doctors: Doctor[];
}

const initialDepartments: Department[] = [
  {
    id: "dept-1",
    name: "Cardiology",
    icon: HeartPulse,
    color: "text-rose-500 bg-rose-50",
    doctorCount: 8,
    description: "Specialized care for heart and cardiovascular health.",
    doctors: [
      { id: "d1", name: "Dr. Michael O'Connor", specialty: "Interventional Cardiology", experience: "15 Years", status: "Active", avatar: "MO" },
      { id: "d2", name: "Dr. Sarah Jenkins", specialty: "Electrophysiology", experience: "12 Years", status: "Active", avatar: "SJ" },
    ]
  },
  {
    id: "dept-2",
    name: "Neurology",
    icon: Brain,
    color: "text-indigo-500 bg-indigo-50",
    doctorCount: 5,
    description: "Advanced diagnostics and treatment for brain and nerve disorders.",
    doctors: [
      { id: "d3", name: "Dr. Elena Rodriguez", specialty: "Neurosurgeon", experience: "10 Years", status: "Active", avatar: "ER" },
      { id: "d4", name: "Dr. James Wilson", specialty: "Neurologist", experience: "18 Years", status: "Offline", avatar: "JW" },
    ]
  },
  {
    id: "dept-3",
    name: "Pediatrics",
    icon: Baby,
    color: "text-orange bg-orange/10",
    doctorCount: 12,
    description: "Compassionate healthcare for infants, children, and adolescents.",
    doctors: [
      { id: "d5", name: "Dr. David Thompson", specialty: "Pediatrician", experience: "8 Years", status: "Active", avatar: "DT" },
      { id: "d6", name: "Dr. Linda Wu", specialty: "Pediatric Specialist", experience: "14 Years", status: "Active", avatar: "LW" },
    ]
  },
  {
    id: "dept-4",
    name: "Orthopedics",
    icon: Bone,
    color: "text-emerald-500 bg-emerald-50",
    doctorCount: 6,
    description: "Expert treatment for bone, joint, and muscle conditions.",
    doctors: [
      { id: "d7", name: "Dr. Robert Chen", specialty: "Sports Medicine", experience: "11 Years", status: "Active", avatar: "RC" },
    ]
  },
  {
    id: "dept-5",
    name: "Oncology",
    icon: Dna,
    color: "text-purple-500 bg-purple-50",
    doctorCount: 4,
    description: "Comprehensive cancer care and innovative research.",
    doctors: [
      { id: "d8", name: "Dr. Sophia Martinez", specialty: "Medical Oncology", experience: "20 Years", status: "Active", avatar: "SM" },
    ]
  },
  {
    id: "dept-6",
    name: "Radiology",
    icon: Scan,
    color: "text-blue-500 bg-blue-50",
    doctorCount: 7,
    description: "State-of-the-art medical imaging and diagnostics.",
    doctors: [
      { id: "d9", name: "Dr. Alan Grant", specialty: "Diagnostic Radiology", experience: "15 Years", status: "Offline", avatar: "AG" },
    ]
  }
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const toggleDept = (id: string) => {
    setExpandedDept(expandedDept === id ? null : id);
  };

  const handleManageDept = (dept: Department) => {
    setSelectedDept(dept);
    setIsManageModalOpen(true);
  };

  const handleAddDoctor = (dept: Department) => {
    setSelectedDept(dept);
    setIsAddDoctorModalOpen(true);
  };

  const saveDepartment = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsManageModalOpen(false);
  };

  const saveDoctor = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsAddDoctorModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">Medical Departments</h1>
          <p className="text-slate-500 font-medium">Overview of clinical specialties and active medical staff.</p>
        </div>
        <Button className="bg-orange hover:bg-orange/90 text-white shadow-lg shadow-orange/20 font-bold h-12 px-6 rounded-xl">
          <Plus className="mr-2 w-4 h-4" /> New Department
        </Button>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="border-none shadow-sm rounded-[2.5rem] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dept.color} shadow-sm`}>
                  <dept.icon className="w-8 h-8" />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleManageDept(dept)}
                  className="rounded-full hover:bg-slate-100 text-slate-400 hover:text-navy"
                >
                  <Settings2 className="w-5 h-5" />
                </Button>
              </div>
              <CardTitle className="text-2xl font-bold text-navy mb-2">{dept.name}</CardTitle>
              <CardDescription className="text-slate-500 font-medium line-clamp-2">
                {dept.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-bold text-navy">{dept.doctorCount} Doctors</span>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-none font-bold text-[10px] uppercase">
                  {dept.doctors.filter(d => d.status === "Active").length} Active
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => toggleDept(dept.id)}
                  variant="outline" 
                  className="flex-1 h-12 border-slate-200 text-navy font-bold rounded-xl hover:bg-slate-50"
                >
                  {expandedDept === dept.id ? (
                    <><ChevronUp className="mr-2 w-4 h-4" /> Hide Staff</>
                  ) : (
                    <><ChevronDown className="mr-2 w-4 h-4" /> View Staff</>
                  )}
                </Button>
                <Button 
                  onClick={() => handleAddDoctor(dept)}
                  className="w-12 h-12 bg-navy hover:bg-navy/90 text-white rounded-xl flex items-center justify-center shadow-lg shadow-navy/20"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>

              {/* Expanded Doctor List */}
              <AnimatePresence>
                {expandedDept === dept.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-6 space-y-3"
                  >
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Department Specialists</p>
                    {dept.doctors.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-2xl hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-navy font-bold text-xs border border-slate-200">
                            {doc.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-navy">{doc.name}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{doc.specialty}</p>
                          </div>
                        </div>
                        <Badge className={`${doc.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"} border-none font-bold text-[9px] uppercase px-2 py-0.5`}>
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Manage Department Modal */}
      <AnimatePresence>
        {isManageModalOpen && selectedDept && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsManageModalOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedDept.color}`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-navy">Manage {selectedDept.name}</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsManageModalOpen(false)} className="rounded-full">
                  <X className="w-6 h-6 text-slate-400" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Department Name</Label>
                  <Input defaultValue={selectedDept.name} className="h-12 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Description</Label>
                  <Input defaultValue={selectedDept.description} className="h-12 rounded-xl bg-slate-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold text-navy">
                    <Edit3 className="mr-2 w-4 h-4" /> Edit Details
                  </Button>
                  <Button variant="outline" className="h-12 rounded-xl border-rose-100 text-rose-500 hover:bg-rose-50 font-bold">
                    <Trash2 className="mr-2 w-4 h-4" /> Delete Dept
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setIsManageModalOpen(false)} className="flex-1 h-12 rounded-xl font-bold">Cancel</Button>
                <Button onClick={saveDepartment} disabled={isSaving} className="flex-[2] h-12 bg-orange hover:bg-orange/90 text-white font-bold rounded-xl">
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Doctor Modal */}
      <AnimatePresence>
        {isAddDoctorModalOpen && selectedDept && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddDoctorModalOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-orange" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-navy">Add to {selectedDept.name}</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsAddDoctorModalOpen(false)} className="rounded-full">
                  <X className="w-6 h-6 text-slate-400" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Doctor Full Name</Label>
                  <Input placeholder="e.g. Dr. Jane Smith" className="h-12 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Specialty</Label>
                  <Input placeholder="e.g. Pediatric Surgeon" className="h-12 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Experience</Label>
                  <Input placeholder="e.g. 10 Years" className="h-12 rounded-xl bg-slate-50" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setIsAddDoctorModalOpen(false)} className="flex-1 h-12 rounded-xl font-bold">Cancel</Button>
                <Button onClick={saveDoctor} disabled={isSaving} className="flex-[2] h-12 bg-navy hover:bg-navy/90 text-white font-bold rounded-xl">
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register Doctor"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
