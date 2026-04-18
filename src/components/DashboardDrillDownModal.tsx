import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Search, 
  Users, 
  FileText, 
  Package, 
  Database,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Stethoscope,
  Activity,
  ClipboardList,
  User,
  Settings,
  ShieldCheck,
  LayoutDashboard,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export type CardType = 'patients' | 'prescriptions' | 'pending' | 'sync';

interface DashboardDrillDownModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: CardType;
}

const NHS_MEDS = [
  { id: "RX-4402", patient: "Oliver Smith", nhs: "485 210 3456", med: "Amoxicillin 500mg", doctor: "Dr. Alireza Siregar", status: "Dispensing", sync: "PMR Synced", date: "16/04/2026", priority: "High" },
  { id: "RX-4403", patient: "Charlotte Brown", nhs: "912 334 5567", med: "Lisinopril 10mg", doctor: "Dr. Alireza Siregar", status: "PMR Ready", sync: "PMR Synced", date: "16/04/2026", priority: "Normal" },
  { id: "RX-4404", patient: "James Wilson", nhs: "112 445 6678", med: "Metformin 500mg", doctor: "Dr. Sarah Jenkins", status: "Awaiting Action", sync: "Auto-Fail", date: "16/04/2026", priority: "Routine" },
  { id: "RX-4405", patient: "Emma Thompson", nhs: "554 221 8890", med: "Atorvastatin 20mg", doctor: "Dr. Michael O'Connor", status: "Dispensing", sync: "PMR Synced", date: "16/04/2026", priority: "Urgent" },
  { id: "RX-4406", patient: "William Jones", nhs: "223 114 9901", med: "Salbutamol 100mcg", doctor: "Dr. Alireza Siregar", status: "Clinical Review", sync: "Pending", date: "16/04/2026", priority: "High" },
  { id: "RX-4407", patient: "Olivia Garcia", nhs: "334 556 7789", med: "Sertraline 50mg", doctor: "Dr. Elena Rodriguez", status: "Dispensing", sync: "PMR Synced", date: "16/04/2026", priority: "Routine" },
  { id: "RX-4408", patient: "Henry Taylor", nhs: "445 667 8890", med: "Omeprazole 20mg", doctor: "Dr. Sarah Jenkins", status: "Dispensing", sync: "PMR Synced", date: "16/04/2026", priority: "Normal" },
  { id: "RX-4409", patient: "Emily Martinez", nhs: "556 778 9901", med: "Levothyroxine 50mcg", doctor: "Dr. Alireza Siregar", status: "PMR Ready", sync: "PMR Synced", date: "16/04/2026", priority: "High" },
];

const PATIENT_DATA = [
  { id: "P-8821", name: "Oliver Smith", nhs: "485 210 3456", dob: "12/05/1982", gender: "Male", gp: "Dr. Alireza Siregar", status: "Active" },
  { id: "P-8822", name: "Charlotte Brown", nhs: "912 334 5567", dob: "15/08/1988", gender: "Female", gp: "Dr. Sarah Jenkins", status: "Active" },
  { id: "P-8823", name: "James Wilson", nhs: "112 445 6678", dob: "03/02/1975", gender: "Male", gp: "Dr. Michael O'Connor", status: "Under Review" },
  { id: "P-8824", name: "Emma Thompson", nhs: "554 221 8890", dob: "24/11/1990", gender: "Female", gp: "Dr. Elena Rodriguez", status: "Active" },
  { id: "P-8825", name: "William Jones", nhs: "223 114 9901", dob: "30/06/1962", gender: "Male", gp: "Dr. Alireza Siregar", status: "Active" },
  { id: "P-8826", name: "Olivia Garcia", nhs: "334 556 7789", dob: "05/09/1995", gender: "Female", gp: "Dr. Sarah Jenkins", status: "Inactive" },
];

export default function DashboardDrillDownModal({ isOpen, onClose, type }: DashboardDrillDownModalProps) {
  const [activeView, setActiveView] = useState<CardType>(type);
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Sync activeView with incoming type prop whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveView(type);
    }
  }, [isOpen, type]);

  // Automatically clear filters and search when navigation between views occurs
  useEffect(() => {
    setStatusFilter(null);
    setSearchTerm("");
    setIsFilterOpen(false);
  }, [activeView]);

  const getHeaderInfo = () => {
    switch(activeView) {
      case 'patients': return { title: 'Population Overview', subtitle: 'Patient Demographics & Status', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'prescriptions': return { title: 'Active Prescriptions', subtitle: 'Live Clinical Issuance', icon: FileText, color: 'text-orange', bg: 'bg-orange/10' };
      case 'pending': return { title: 'Pending Dispensing', subtitle: 'Awaiting Pharmacist Action', icon: Package, color: 'text-cyan-600', bg: 'bg-cyan-50' };
      case 'sync': return { title: 'PMR Sync Health', subtitle: 'Real-time System Connectivity', icon: Database, color: 'text-indigo-600', bg: 'bg-indigo-50' };
    }
  };

  const info = getHeaderInfo();

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Simulate file download
      const content = "Clinical Data Export\nGenerated: " + new Date().toLocaleString();
      const element = document.createElement("a");
      const file = new Blob([content], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `Clinical_Export_${activeView}.txt`;
      document.body.appendChild(element);
      element.click();
    }, 1500);
  };

  const filteredData = useMemo(() => {
    const data = activeView === 'patients' ? PATIENT_DATA : NHS_MEDS;
    return data.filter(item => {
      const matchesSearch = Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = !statusFilter || (item as any).status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, activeView, statusFilter]);

  // Dynamically derive current statuses from the raw dataset (unfiltered by status but filtered by search)
  const availableStatuses = useMemo(() => {
    const data = activeView === 'patients' ? PATIENT_DATA : NHS_MEDS;
    // We want to see statuses available in the current search context
    const searchedData = data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    const statuses = searchedData.map((item: any) => item.status);
    return Array.from(new Set(statuses)).filter(Boolean).sort();
  }, [activeView, searchTerm]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[1100px] h-[85vh] bg-white rounded-[2.5rem] shadow-2xl flex overflow-hidden border border-slate-200"
        >
          {/* Internal Sidebar (Medical Icons - Secondary Nav) */}
          <aside className="w-20 bg-slate-50 border-r border-slate-100 flex flex-col items-center py-8 gap-8">
            <div className="p-3 bg-white shadow-sm rounded-2xl">
              <Activity className="w-5 h-5 text-orange animate-pulse" />
            </div>
            <div className="flex flex-col gap-6">
              {[
                { icon: Users, type: 'patients' as CardType },
                { icon: FileText, type: 'prescriptions' as CardType },
                { icon: Package, type: 'pending' as CardType },
                { icon: Database, type: 'sync' as CardType }
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => item.type && setActiveView(item.type)}
                  className={`transition-all p-2 rounded-xl ${
                    activeView === item.type 
                      ? "text-orange bg-orange/10 scale-110" 
                      : "text-slate-400 hover:text-navy hover:bg-slate-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
            <div className="mt-auto">
              <button onClick={onClose} className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors group">
                <X className="w-5 h-5 text-slate-500 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${info.bg} rounded-[1.25rem] flex items-center justify-center shadow-sm`}>
                  <info.icon className={`w-7 h-7 ${info.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-extrabold text-navy leading-tight">{info.title}</h2>
                  <p className="text-sm font-semibold text-slate-400 tracking-wide uppercase">{info.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    disabled={availableStatuses.length === 0}
                    className={`h-11 rounded-xl border-slate-200 font-bold gap-2 transition-all ${
                      isFilterOpen ? "bg-navy text-white" : "text-navy"
                    } ${availableStatuses.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <Filter className="w-4 h-4" /> 
                    {availableStatuses.length === 0 ? "No Filters" : (statusFilter || "Filters")}
                  </Button>
                  
                  {isFilterOpen && availableStatuses.length > 0 && (
                    <div className="absolute top-12 right-0 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 p-2 py-3 overflow-hidden animate-in fade-in slide-in-from-top-2">
                       <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filter by Status</p>
                       {availableStatuses.map(s => (
                         <button 
                            key={s as string}
                            onClick={() => { setStatusFilter((s as string) === statusFilter ? null : (s as string)); setIsFilterOpen(false); }}
                            className={`w-full text-left px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
                              statusFilter === s ? "bg-orange/10 text-orange" : "text-slate-600 hover:bg-slate-50"
                            }`}
                         >
                           {s as string}
                         </button>
                       ))}
                       {statusFilter && (
                         <button 
                            onClick={() => { setStatusFilter(null); setIsFilterOpen(false); }}
                            className="w-full text-left px-4 py-2 mt-2 text-[10px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors uppercase tracking-widest"
                         >
                           Clear Filter
                         </button>
                       )}
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex-1 sm:flex-none h-11 bg-orange hover:bg-orange/90 text-white font-bold rounded-xl px-6 relative overflow-hidden transition-all"
                >
                  <AnimatePresence mode="wait">
                    {isExporting ? (
                      <motion.div 
                        initial={{ y: 20 }} 
                        animate={{ y: 0 }} 
                        exit={{ y: -20 }}
                        key="exporting"
                        className="flex items-center gap-2"
                      >
                         <RefreshCw className="w-4 h-4 animate-spin" /> Processing...
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ y: 20 }} 
                        animate={{ y: 0 }} 
                        exit={{ y: -20 }}
                        key="export"
                        className="flex items-center gap-2"
                      >
                        Export Data
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>

            {/* Search & Tool Area */}
            <div className="px-8 py-6 bg-slate-50/50 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                  placeholder={`Search clinical records for ${activeView}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-white border-slate-200 rounded-2xl shadow-sm focus:ring-orange/20"
                />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="h-12 px-4 rounded-xl border-slate-200 bg-white font-bold text-navy whitespace-nowrap">
                  Last 30 Days
                </Badge>
                <Button size="icon" variant="ghost" className="h-12 w-12 rounded-xl text-slate-400 hover:bg-white hover:shadow-sm">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-y-auto p-8 pt-2">
              <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden min-h-[400px]">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent border-slate-100 italic font-serif">
                      {activeView === 'patients' ? (
                        <>
                          <TableHead className="w-24 font-bold text-navy/40 uppercase text-[10px] tracking-widest pl-6">ID</TableHead>
                          <TableHead className="font-bold text-navy/40 uppercase text-[10px] tracking-widest">FullName</TableHead>
                          <TableHead className="font-bold text-navy/40 uppercase text-[10px] tracking-widest">NHS Number</TableHead>
                          <TableHead className="font-bold text-navy/40 uppercase text-[10px] tracking-widest">DOB</TableHead>
                          <TableHead className="font-bold text-navy/40 uppercase text-[10px] tracking-widest">GP Clinician</TableHead>
                          <TableHead className="font-bold text-navy/40 uppercase text-[10px] tracking-widest pr-6">Status</TableHead>
                        </>
                      ) : (
                        <>
                          <TableHead className="w-24 font-bold text-navy/40 uppercase text-[10px] tracking-widest pl-6">Ref ID</TableHead>
                          <TableHead className="font-bold text-navy/40 uppercase text-[10px] tracking-widest">Medication / Strength</TableHead>
                          <TableHead className="font-bold text-navy/40 uppercase text-[10px] tracking-widest">Clinician</TableHead>
                          <TableHead className="font-bold text-navy/40 uppercase text-[10px] tracking-widest">Sync Health</TableHead>
                          <TableHead className="font-bold text-navy/40 uppercase text-[10px] tracking-widest pr-6">Workflow status</TableHead>
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence mode="popLayout">
                      {filteredData.length > 0 ? filteredData.map((row: any, i) => (
                        <motion.tr 
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: i * 0.03 }}
                          key={row.id} 
                          className="hover:bg-slate-50 transition-colors border-slate-50 font-sans group cursor-default"
                        >
                          {activeView === 'patients' ? (
                            <>
                              <TableCell className="font-mono text-xs font-bold text-slate-400 pl-6">{row.id}</TableCell>
                              <TableCell className="font-bold text-navy">{row.name}</TableCell>
                              <TableCell className="font-bold text-slate-600">{row.nhs}</TableCell>
                              <TableCell className="font-medium text-slate-500">{row.dob}</TableCell>
                              <TableCell className="font-bold text-navy">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center">
                                    <Stethoscope className="w-4 h-4 text-orange" />
                                  </div>
                                  {row.gp}
                                </div>
                              </TableCell>
                              <TableCell className="pr-6 text-right">
                                <Badge variant={row.status === 'Active' ? 'default' : 'outline'} className={row.status === 'Active' ? 'bg-green-500' : 'bg-slate-100 text-slate-500'}>
                                  {row.status}
                                </Badge>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell className="font-mono text-xs font-bold text-slate-400 pl-6">{row.id}</TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="font-extrabold text-navy">{row.med}</span>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.patient} • {row.nhs}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-bold text-navy">{row.doctor}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${row.sync === 'PMR Synced' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                  <span className="text-xs font-bold text-slate-600">{row.sync}</span>
                                </div>
                              </TableCell>
                              <TableCell className="pr-6 text-right">
                                <Badge variant="outline" className={`font-extrabold border-2 ${
                                  row.status === 'Dispensing' ? 'text-blue-600 border-blue-100 bg-blue-50' : 
                                  row.status === 'PMR Ready' ? 'text-emerald-600 border-emerald-100 bg-emerald-50' :
                                  'text-orange border-orange/10 bg-orange/5'
                                }`}>
                                  {row.status}
                                </Badge>
                              </TableCell>
                            </>
                          )}
                        </motion.tr>
                      )) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-64 text-center">
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <div className="p-4 bg-slate-50 rounded-full">
                                <Filter className="w-8 h-8 text-slate-300" />
                              </div>
                              <p className="text-sm font-bold text-slate-400">No records matching your search or filters.</p>
                              <Button variant="ghost" size="sm" onClick={() => { setSearchTerm(""); setStatusFilter(null); }} className="text-orange font-bold text-xs uppercase tracking-widest">Reset All Filters</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
