import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Package, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  Activity,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Database,
  LogOut,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  Stethoscope,
  User,
  Lock,
  CreditCard,
  RefreshCw,
  X,
  ShoppingCart,
  ShoppingBag,
  Home,
  Wallet,
  BarChart3,
  Folder,
  UserCircle,
  Timer,
  ChevronDown,
  Calendar,
  Building2,
  ClipboardList,
  HelpCircle,
  Edit2,
  Download,
  Flag,
  Key
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import AppointmentsPage from "./AppointmentsPage";
import PatientsPage from "./PatientsPage";
import DoctorsPage from "./DoctorsPage";
import DepartmentsPage from "./DepartmentsPage";
import PaymentsPage from "./PaymentsPage";
import HelpCenterPage from "./HelpCenterPage";
import DashboardCalendar from "./DashboardCalendar";
import DoctorSchedulePage from "./DoctorSchedulePage";
import { motion, AnimatePresence } from "framer-motion";
import PrescriptionBuilder from "./PrescriptionBuilder";
import PatientRegistration from "./PatientRegistration";
import DashboardDrillDownModal, { CardType } from "./DashboardDrillDownModal";

interface DemoAppProps {
  onLogout: () => void;
}

export default function DemoApp({ onLogout }: DemoAppProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isDrillDownOpen, setIsDrillDownOpen] = useState(false);
  const [drillDownType, setDrillDownType] = useState<CardType>('prescriptions');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleCardClick = (type: CardType) => {
    setDrillDownType(type);
    setIsDrillDownOpen(true);
  };

  const pieData = [
    { name: 'Purchases', value: 42, color: '#f97316' },
    { name: 'Suppliers', value: 28, color: '#1e3a8a' },
    { name: 'Sales', value: 18, color: '#3b82f6' },
    { name: 'No Sales', value: 12, color: '#94a3b8' },
  ];

  const salesData = [
    { name: 'Mon', value: 12000, total: 45000 },
    { name: 'Tue', value: 18000, total: 45000 },
    { name: 'Wed', value: 32000, total: 45000 },
    { name: 'Thu', value: 24000, total: 45000 },
    { name: 'Fri', value: 15000, total: 45000 },
    { name: 'Sat', value: 10000, total: 45000 },
  ];

  const [prescriptions, setPrescriptions] = useState([
    { name: "James Wilson", avatar: "https://i.pravatar.cc/150?u=JW", med: "Amoxicillin 500mg", nhs: "Verified", payment: "Paid", pmr: "Synced", date: "16/04/2026" },
    { name: "Emma Thompson", avatar: "https://i.pravatar.cc/150?u=ET", med: "Lisinopril 10mg", nhs: "Pending", payment: "Unpaid", pmr: "Pending", date: "16/04/2026" },
    { name: "Robert Davis", avatar: "https://i.pravatar.cc/150?u=RD", med: "Metformin 500mg", nhs: "Verified", payment: "Paid", pmr: "Synced", date: "15/04/2026" },
    { name: "Sophie Martin", avatar: "https://i.pravatar.cc/150?u=SM", med: "Atorvastatin 20mg", nhs: "Verified", payment: "Paid", pmr: "Synced", date: "15/04/2026" },
    { name: "Arthur Miller", avatar: "https://i.pravatar.cc/150?u=AM", med: "Salbutamol 100mcg", nhs: "In Review", payment: "Paid", pmr: "Failed", date: "14/04/2026" },
  ]);

  const [patients, setPatients] = useState([
    { id: "P-1001", name: "James Wilson", dob: "12/05/1982", phone: "07700 900123", nhs: "485 210 3456", status: "Dispensed" },
    { id: "P-1002", name: "Emma Thompson", dob: "24/11/1990", phone: "07700 900456", nhs: "912 334 5567", status: "Pending" },
    { id: "P-1003", name: "Robert Davis", dob: "03/02/1975", phone: "07700 900789", nhs: "112 445 6678", status: "Dispensed" },
    { id: "P-1004", name: "Sophie Martin", dob: "15/08/1988", phone: "07700 900321", nhs: "554 221 8890", status: "Dispensed" },
    { id: "P-1005", name: "Arthur Miller", dob: "30/06/1962", phone: "07700 900654", nhs: "223 114 9901", status: "In Review" },
    { id: "P-1006", name: "Sarah Jenkins", dob: "05/09/1995", phone: "07700 900888", nhs: "334 556 7789", status: "Dispensed" },
    { id: "P-1007", name: "Michael O'Connor", dob: "18/12/1970", phone: "07700 900999", nhs: "445 667 8890", status: "Pending" },
  ]);

  const [pmrLogs, setPmrLogs] = useState([
    { id: "SYNC-992", action: "Prescription Sync", patient: "James Wilson", status: "Success", time: "10:45 AM" },
    { id: "SYNC-991", action: "Record Update", patient: "Robert Davis", status: "Success", time: "09:30 AM" },
    { id: "SYNC-990", action: "Prescription Sync", patient: "Arthur Miller", status: "Failed", time: "09:15 AM" },
    { id: "SYNC-989", action: "Identity Verify", patient: "Emma Thompson", status: "Success", time: "08:50 AM" },
    { id: "SYNC-988", action: "Medication Sync", patient: "Sarah Jenkins", status: "Success", time: "08:30 AM" },
    { id: "SYNC-987", action: "PMR Handshake", patient: "System", status: "Success", time: "08:00 AM" },
  ]);

  const [openTableRowMenu, setOpenTableRowMenu] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  const handleResync = (name: string) => {
    showToast(`Triggering manual PMR sync for ${name}...`, "success");
    setTimeout(() => {
      setPrescriptions(prev => prev.map(p => p.name === name ? { ...p, pmr: "Synced" } : p));
      showToast(`PMR Sync successful for ${name}`, "success");
    }, 2000);
  };

  const handleDownloadPDF = (name: string) => {
    showToast(`Generating clinical PDF for ${name}...`, "success");
    setTimeout(() => {
      showToast(`Prescription PDF downloaded successfully`, "success");
    }, 1500);
  };

  const handleViewPrescription = (entry: any) => {
    setSelectedEntry(entry);
    setIsDetailModalOpen(true);
  };

  const handleEditEntry = (entry: any) => {
    setSelectedEntry(entry);
    setIsEditModalOpen(true);
  };

  const saveEdit = (updatedMed: string) => {
    if (!selectedEntry) return;
    setPrescriptions(prev => prev.map(p => p.name === selectedEntry.name ? { ...p, med: updatedMed } : p));
    showToast(`Updated record for ${selectedEntry.name}`, "success");
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-[#F8F9FD] border-r border-slate-200 flex flex-col hidden lg:flex transition-all duration-300 relative ${isSidebarExpanded ? 'w-64' : 'w-24'}`}>
        <div className="p-6 flex items-center justify-center border-b border-slate-100">
          <div className="flex items-center gap-2 group">
            <div className="p-1.5 bg-orange/10 rounded-lg group-hover:bg-orange/20 transition-colors">
              <Activity className="text-orange w-5 h-5" />
            </div>
            {isSidebarExpanded && (
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-bold text-navy/40 uppercase tracking-[0.2em] ml-auto mb-0.5">Technology</span>
                <div className="flex items-center">
                  <span className="text-xl font-display font-extrabold text-orange">Care</span>
                  <span className="text-xl font-display font-extrabold text-navy">Nexon</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 py-4 space-y-6 overflow-y-auto px-3">
          {/* Main Menu */}
          <div className="space-y-1">
            {isSidebarExpanded && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Main Menu</p>}
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, hasSub: false },
              { id: "appointments", label: "Appointments", icon: Calendar, hasSub: false },
              { id: "patients", label: "Patients", icon: Users, hasSub: false },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex transition-all duration-200 group relative ${
                  isSidebarExpanded 
                  ? "flex-row items-center gap-3 px-4 py-3 rounded-xl" 
                  : "flex-col items-center justify-center gap-1 py-4 rounded-2xl"
                } ${
                  activeTab === item.id 
                  ? "bg-[#4A90E2] text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <item.icon className={`${isSidebarExpanded ? 'w-5 h-5' : 'w-7 h-7'} ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`} />
                <span className={`font-bold transition-all ${
                  isSidebarExpanded ? "text-sm" : "text-[10px] text-center leading-tight"
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Other Menu */}
          <div className="space-y-1">
            {isSidebarExpanded && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Other Menu</p>}
            {[
              { id: "doctors", label: "Doctors", icon: Stethoscope, hasSub: true },
              { id: "department", label: "Department", icon: Building2, hasSub: true },
              { id: "schedule", label: "Doctor Schedule", icon: ClipboardList, hasSub: false },
              { id: "payments", label: "Payments", icon: CreditCard, hasSub: false },
              { id: "inventory", label: "Inventory", icon: Package, hasSub: false },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex transition-all duration-200 group relative ${
                  isSidebarExpanded 
                  ? "flex-row items-center gap-3 px-4 py-3 rounded-xl" 
                  : "flex-col items-center justify-center gap-1 py-4 rounded-2xl"
                } ${
                  activeTab === item.id 
                  ? "bg-[#4A90E2] text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <item.icon className={`${isSidebarExpanded ? 'w-5 h-5' : 'w-7 h-7'} ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`} />
                <span className={`font-bold transition-all ${
                  isSidebarExpanded ? "text-sm" : "text-[10px] text-center leading-tight"
                }`}>
                  {item.label}
                </span>
                {isSidebarExpanded && item.hasSub && (
                  <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`} />
                )}
                {!isSidebarExpanded && item.hasSub && (
                  <div className="absolute bottom-1 right-1">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-[6px] border-b-slate-400 rotate-45" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Help */}
          <div className="space-y-1">
            {isSidebarExpanded && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Help</p>}
            {[
              { id: "help", label: "Help Center", icon: HelpCircle, hasSub: false },
              { id: "report", label: "Report", icon: Flag, hasSub: false },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex transition-all duration-200 group relative ${
                  isSidebarExpanded 
                  ? "flex-row items-center gap-3 px-4 py-3 rounded-xl" 
                  : "flex-col items-center justify-center gap-1 py-4 rounded-2xl"
                } ${
                  activeTab === item.id 
                  ? "bg-[#4A90E2] text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <item.icon className={`${isSidebarExpanded ? 'w-5 h-5' : 'w-7 h-7'} ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`} />
                <span className={`font-bold transition-all ${
                  isSidebarExpanded ? "text-sm" : "text-[10px] text-center leading-tight"
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          {isSidebarExpanded && (
            <div className="bg-indigo-50 rounded-xl p-4 mb-4 flex items-center justify-between group cursor-pointer hover:bg-indigo-100 transition-colors">
              <span className="text-xs font-bold text-indigo-700">Configure Features</span>
              <ChevronRight className="w-4 h-4 text-indigo-700" />
            </div>
          )}

          {isSidebarExpanded && (
            <div className="bg-white border border-slate-200 rounded-full py-2 px-4 flex items-center gap-2 mb-4 shadow-sm">
              <div className="w-4 h-4 rounded-full bg-blue-400 border-4 border-blue-100" />
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Take a live product tour</span>
            </div>
          )}

          <div className={`flex ${isSidebarExpanded ? 'flex-row gap-2' : 'flex-col gap-2'}`}>
            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 p-3 rounded-xl flex items-center justify-center transition-colors"
            >
              {isSidebarExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            <button
              onClick={onLogout}
              className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-500 p-3 rounded-xl flex items-center justify-center transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search patients, prescriptions, or medicines..." 
                className="pl-10 bg-slate-50 border-none focus-visible:ring-orange/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-slate-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange rounded-full border-2 border-white" />
            </Button>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-3 p-3 px-6 rounded-full transition-all duration-300 border-2 ${isProfileOpen ? 'border-black bg-slate-50' : 'border-slate-100 hover:border-slate-300'}`}
              >
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-black text-navy leading-none">Dr. Siregar</p>
                  <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">GMC: 8823412</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ml-2 ${isProfileOpen ? 'rotate-180 text-black' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsProfileOpen(false)} 
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 z-50 p-6 overflow-hidden"
                    >
                      <div className="p-6 bg-slate-50/80 rounded-[2.5rem] mb-6 border border-slate-100/50">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-16 w-16 rounded-[1.5rem] border-4 border-white shadow-md overflow-hidden flex-shrink-0">
                            <img 
                              src="https://randomuser.me/api/portraits/men/32.jpg" 
                              alt="Dr. Alireza Siregar" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-black text-navy leading-tight tracking-tight">Dr. Alireza Siregar</p>
                            <div className="flex">
                              <Badge className="bg-emerald-100 text-emerald-600 border-none text-[9px] font-black uppercase px-2.5 py-1 rounded-lg">Clinician Verified</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">GMC ID</span>
                          <span className="text-sm font-black text-navy tabular-nums tracking-tight">8823412</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button 
                          onClick={() => {
                            console.log("Clicked: My Profile");
                            setIsProfileOpen(false);
                            navigate("/profile");
                          }} 
                          className="w-full flex items-center gap-4 p-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl transition-all group"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center transition-transform group-active:scale-95 shadow-sm">
                            <UserCircle className="w-5 h-5 text-blue-500" />
                          </div>
                          <span className="tracking-tight text-navy/80">My Profile</span>
                        </button>
                        <button 
                          onClick={() => {
                            console.log("Clicked: Account Settings");
                            setIsProfileOpen(false);
                            navigate("/account");
                          }} 
                          className="w-full flex items-center gap-4 p-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl transition-all group"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center transition-transform group-active:scale-95 shadow-sm">
                            <Settings className="w-5 h-5 text-slate-500" />
                          </div>
                          <span className="tracking-tight text-navy/80">Account Settings</span>
                        </button>
                        <button 
                          onClick={() => {
                            console.log("Clicked: Practice Details");
                            setIsProfileOpen(false);
                            navigate("/practice");
                          }} 
                          className="w-full flex items-center gap-4 p-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl transition-all group"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-[#E8E8FF] flex items-center justify-center transition-transform group-active:scale-95 shadow-sm">
                            <Building2 className="w-5 h-5 text-[#6366F1]" />
                          </div>
                          <span className="tracking-tight text-navy/80">Practice Details</span>
                        </button>
                        <button 
                          onClick={() => {
                            console.log("Clicked: Notification Preferences");
                            setIsProfileOpen(false);
                            navigate("/notifications");
                          }} 
                          className="w-full flex items-center gap-4 p-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl transition-all group"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-[#FFF5EB] flex items-center justify-center transition-transform group-active:scale-95 shadow-sm">
                            <Bell className="w-5 h-5 text-[#F97316]" />
                          </div>
                          <span className="tracking-tight text-navy/80">Notification Preferences</span>
                        </button>
                      </div>

                      <div className="h-px bg-slate-100 my-4 mx-2" />

                      <button 
                        onClick={() => {
                          console.log("Clicked: Logout");
                          setIsProfileOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-4 p-2 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition-all group"
                      >
                        <div className="w-11 h-11 rounded-2xl bg-rose-50 flex items-center justify-center transition-transform group-active:scale-95 shadow-sm group-hover:bg-rose-100">
                          <LogOut className="w-5 h-5 text-rose-500" />
                        </div>
                        <span className="tracking-tight font-black">Logout</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-navy whitespace-nowrap">Welcome, Dr. Siregar!</h1>
                  <p className="text-slate-500 font-medium max-w-[240px] sm:max-w-none">Your clinical ecosystem is fully synced and secure.</p>
                </div>
                <Button 
                  onClick={() => setIsBuilderOpen(true)}
                  className="bg-orange hover:bg-orange/90 shadow-lg shadow-orange/20 font-bold h-12 px-6 rounded-xl"
                >
                  <Plus className="mr-2 w-4 h-4" /> New Prescription
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Patients", value: "1,284", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", type: 'patients' as CardType },
                  { label: "Active Prescriptions", value: "45", change: "+5", icon: FileText, color: "text-orange", bg: "bg-orange/5", border: "border-orange/10", type: 'prescriptions' as CardType },
                  { label: "Pending Dispensing", value: "12", change: "-2", icon: Package, color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100", type: 'pending' as CardType },
                  { label: "PMR Sync Status", value: "Healthy", change: "100%", icon: Database, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", type: 'sync' as CardType },
                ].map((stat, i) => (
                  <Card 
                    key={i} 
                    onClick={() => handleCardClick(stat.type)}
                    className={`border ${stat.border} ${stat.bg} shadow-sm rounded-[2rem] overflow-hidden relative group hover:shadow-md transition-all cursor-pointer`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-white/80 backdrop-blur rounded-xl shadow-sm">
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-extrabold text-navy">{stat.value}</p>
                        <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-slate-500'}`}>
                          {stat.change} This Month
                        </span>
                      </div>
                      
                      {/* Mini Sparkline Chart Placeholder */}
                      <div className="absolute bottom-0 right-0 w-24 h-16 opacity-20 group-hover:opacity-40 transition-opacity">
                        <div className="flex items-end justify-end gap-1 h-full p-2">
                          {[40, 70, 45, 90, 65].map((h, idx) => (
                            <div key={idx} className={`w-2 rounded-t-sm ${stat.color.replace('text-', 'bg-')}`} style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Graph Report (Donut Chart) */}
                <Card className="lg:col-span-4 border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Graph Report</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[240px] w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                        <p className="text-2xl font-extrabold text-navy">755K</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {pieData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Total Sales Overview (Rounded Bar Chart) */}
                <Card className="lg:col-span-5 border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Total Sales Overview</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                          />
                          <Tooltip 
                            cursor={{ fill: 'transparent' }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-navy text-white p-3 rounded-xl shadow-xl border-none">
                                    <p className="text-[10px] font-bold text-white/60 uppercase mb-1">Apr, 2026</p>
                                    <p className="text-sm font-bold">£{payload[0].value.toLocaleString()}.00K</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          {/* Background Bar */}
                          <Bar dataKey="total" fill="#f1f5f9" radius={[20, 20, 20, 20]} barSize={32} />
                          {/* Foreground Bar */}
                          <Bar dataKey="value" radius={[20, 20, 20, 20]} barSize={32}>
                            {salesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 2 ? '#f97316' : '#1e3a8a'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* PMR Integration Logic (Redesigned with Glassmorphism & Floating Elements) */}
                <Card className="lg:col-span-3 border-none shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden relative rounded-[3rem] min-h-[500px] flex flex-col">
                  {/* Abstract Medical Illustration Background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <Activity className="w-64 h-64 text-blue-400" strokeWidth={0.5} />
                    </motion.div>
                  </div>

                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="p-2 bg-white/80 backdrop-blur rounded-xl shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-navy text-lg">PMR API Logic</CardTitle>
                        <CardDescription className="text-slate-500 font-medium">GPhC Accredited Sync</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 relative z-10 flex flex-col justify-between">
                    {/* Floating Elements Container */}
                    <div className="relative h-64 w-full">
                      {/* Secure API Key - Floating Card */}
                      <motion.div 
                        className="absolute top-0 left-0 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 w-48 z-20"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center shadow-lg shadow-orange/20">
                            <Key className="text-white w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-navy">Secure API Key</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">AES-256 Active</p>
                          </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-orange"
                            animate={{ width: ["30%", "100%", "30%"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </div>
                      </motion.div>

                      {/* Live Sync Status - Floating Badge */}
                      <motion.div 
                        className="absolute top-10 right-0 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2 z-20"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-navy uppercase tracking-wider">Live Record Sync</span>
                        <Badge className="bg-green-100 text-green-600 border-none text-[9px] font-bold">ACTIVE</Badge>
                      </motion.div>

                      {/* GPhC Provider - Floating Card */}
                      <motion.div 
                        className="absolute bottom-0 right-4 bg-white/90 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl border border-white/50 w-56 z-20"
                        animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <Stethoscope className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">GPhC Provider</span>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400">Status</span>
                            <span className="text-[10px] font-bold text-green-600">Verified</span>
                          </div>
                          <div className="h-1 w-full bg-slate-100 rounded-full" />
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400">Trust Score</span>
                            <span className="text-[10px] font-bold text-navy">98.4%</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-auto pt-6">
                      <Button 
                        variant="outline" 
                        className="w-full border-slate-200 text-navy hover:bg-white hover:border-orange hover:text-orange font-bold h-12 rounded-xl shadow-sm transition-all"
                      >
                        <RefreshCw className="mr-2 w-4 h-4" /> Force Sync Records
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Dashboard Calendar Integration */}
              <div className="mt-8">
                <DashboardCalendar />
              </div>

              {/* Main Prescriptions Table */}
              <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-navy">Clinical Activity</CardTitle>
                    <CardDescription className="text-slate-500 font-medium text-sm">Real-time status of all digital prescriptions</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCardClick('prescriptions')}
                    className="text-orange font-bold hover:text-orange/80 hover:bg-orange/5"
                  >
                    View All Records
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-slate-100 px-8">
                        <TableHead className="font-bold text-navy pl-8 py-6">Patient Name</TableHead>
                        <TableHead className="font-bold text-navy">Medication</TableHead>
                        <TableHead className="font-bold text-navy">NHS Status</TableHead>
                        <TableHead className="font-bold text-navy">Payment Status</TableHead>
                        <TableHead className="font-bold text-navy">PMR Sync Status</TableHead>
                        <TableHead className="font-bold text-navy">Date</TableHead>
                        <TableHead className="text-right pr-8"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prescriptions.map((row, i) => (
                        <TableRow 
                          key={i} 
                          onClick={() => {
                            if (row.pmr === "Failed") {
                              showToast(`Sync Failed for ${row.name}: API Timeout - Gateway error 504. Please retry manual sync.`, "error");
                            }
                          }}
                          className={`border-slate-50 cursor-pointer group transition-all duration-200 ${
                            row.pmr === "Failed" ? "bg-rose-50/30 hover:bg-rose-50/50" : "hover:bg-slate-50/80"
                          }`}
                        >
                          <TableCell 
                            className="pl-8 py-5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewPrescription(row);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm transition-transform group-hover:scale-110">
                                <img src={row.avatar} alt={row.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <span className="font-bold text-slate-900 group-hover:text-orange transition-colors">{row.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-slate-500 text-sm">{row.med}</TableCell>
                          <TableCell>
                            <Badge className={`${
                              row.nhs === "Verified" ? "bg-green-100 text-green-700" : 
                              row.nhs === "Pending" ? "bg-[#FFF4E5] text-[#FF6B00]" : 
                              "bg-[#E8F1FF] text-[#0066FF]"
                            } border-none font-black px-3 py-1 text-[10px] rounded-full uppercase tracking-wider`}>
                              {row.nhs}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CreditCard className={`w-4 h-4 ${row.payment === "Paid" ? "text-green-500" : "text-slate-200"}`} />
                              <span className={`text-[11px] font-black uppercase tracking-wider ${row.payment === "Paid" ? "text-slate-900" : "text-slate-300"}`}>{row.payment}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                row.pmr === "Synced" ? "bg-green-500" : 
                                row.pmr === "Pending" ? "bg-amber-500 animate-pulse" : 
                                "bg-[#FF0000] shadow-[0_0_8px_rgba(255,0,0,0.4)]"
                              }`} />
                              <span className={`text-xs font-bold ${row.pmr === "Failed" ? "text-rose-600" : "text-slate-700"}`}>{row.pmr}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-400 text-xs font-bold tabular-nums">{row.date}</TableCell>
                          <TableCell className="text-right pr-8 relative">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenTableRowMenu(openTableRowMenu === i ? null : i);
                              }}
                              className={`h-9 w-9 transition-all ${openTableRowMenu === i ? "bg-navy text-white" : "text-slate-300 hover:text-navy hover:bg-slate-100"}`}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>

                            <AnimatePresence>
                              {openTableRowMenu === i && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                  className="absolute right-12 top-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-navy/5 z-[100] p-2 overflow-hidden text-left"
                                >
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleViewPrescription(row); setOpenTableRowMenu(null); }}
                                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-all"
                                  >
                                    <FileText className="w-3.5 h-3.5" /> View Full Prescription
                                  </button>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleResync(row.name); setOpenTableRowMenu(null); }}
                                    className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-all ${
                                      row.pmr === "Failed" ? "text-orange bg-orange/5 hover:bg-orange/10" : "text-slate-600 hover:bg-slate-50"
                                    }`}
                                  >
                                    <RefreshCw className="w-3.5 h-3.5" /> Resync with PMR
                                  </button>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleDownloadPDF(row.name); setOpenTableRowMenu(null); }}
                                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-all"
                                  >
                                    <Download className="w-3.5 h-3.5" /> Download PDF
                                  </button>
                                  <div className="h-px bg-slate-50 my-1 mx-2" />
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleEditEntry(row); setOpenTableRowMenu(null); }}
                                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl flex items-center gap-2 transition-all"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" /> Edit Entry
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "appointments" && <AppointmentsPage />}
          {activeTab === "patients" && <PatientsPage />}
          {activeTab === "doctors" && <DoctorsPage />}
          {activeTab === "department" && <DepartmentsPage />}
          {activeTab === "payments" && <PaymentsPage />}
          {activeTab === "help" && <HelpCenterPage />}
          {activeTab === "schedule" && <DoctorSchedulePage />}

          {activeTab === "prescriptions" && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-navy">Generate Digital Prescription</h1>
                <p className="text-slate-500 font-medium">Secure GPhC-compliant workflow with real-time PMR sync.</p>
              </div>

              <Card className="border-none shadow-xl">
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="patient" className="font-bold text-navy">Select Patient</Label>
                      <Input id="patient" placeholder="Search by name or NHS number..." className="bg-slate-50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date" className="font-bold text-navy">Date of Issue</Label>
                      <Input id="date" type="date" defaultValue="2026-04-16" className="bg-slate-50" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold text-navy">Medication Details</Label>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-2">
                          <Label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Medicine Name</Label>
                          <Input placeholder="e.g. Amoxicillin 500mg Capsules" className="bg-white" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Quantity</Label>
                          <Input placeholder="e.g. 21" className="bg-white" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Dosage Instructions</Label>
                        <Input placeholder="e.g. One capsule three times a day for 7 days" className="bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold text-navy">Verification & Security</Label>
                    <div className="flex items-center gap-4 p-4 bg-orange/5 rounded-xl border border-orange/10">
                      <ShieldCheck className="text-orange w-6 h-6" />
                      <p className="text-sm text-navy font-medium">
                        This prescription will be digitally signed using your <span className="font-bold">GMC credentials</span> and transferred via secure <span className="font-bold text-orange">GPhC-compliant API</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button variant="outline" className="px-8 border-slate-200 font-bold text-navy">Save Draft</Button>
                    <Button className="px-8 bg-navy hover:bg-navy/90 text-white shadow-lg shadow-navy/20 font-bold">
                      Sign & Send to PMR
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "inventory" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-display font-bold text-navy">Medicine Catalog</h1>
                  <p className="text-slate-500 font-medium">Integrated E-commerce Flow & Real-time Stock Management.</p>
                </div>
                <Button className="bg-orange hover:bg-orange/90 shadow-lg shadow-orange/20 font-bold">
                  <Plus className="mr-2 w-4 h-4" /> Add Medication
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Amoxicillin", strength: "500mg", stock: 1200, price: 4.50, category: "Antibiotic" },
                  { name: "Lisinopril", strength: "10mg", stock: 850, price: 3.20, category: "ACE Inhibitor" },
                  { name: "Metformin", strength: "500mg", stock: 2100, price: 2.80, category: "Antidiabetic" },
                  { name: "Atorvastatin", strength: "20mg", stock: 1500, price: 5.10, category: "Statin" },
                  { name: "Salbutamol", strength: "100mcg", stock: 450, price: 6.75, category: "Bronchodilator" },
                ].map((med, i) => (
                  <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow group">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-orange/10 transition-colors">
                          <Package className="text-slate-400 group-hover:text-orange w-6 h-6 transition-colors" />
                        </div>
                        <Badge variant="outline" className="border-slate-200 text-slate-500 font-bold text-[10px] uppercase">{med.category}</Badge>
                      </div>
                      <h3 className="text-lg font-bold text-navy mb-1">{med.name}</h3>
                      <p className="text-sm text-slate-500 mb-4 font-medium">{med.strength}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Stock</p>
                          <p className={`text-sm font-bold ${med.stock < 500 ? "text-rose-500" : "text-navy"}`}>{med.stock.toLocaleString()} units</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Price</p>
                          <p className="text-sm font-extrabold text-orange">£{med.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <Button className="w-full mt-6 bg-slate-50 hover:bg-orange/10 text-slate-600 hover:text-orange border-none shadow-none font-bold">
                        <ShoppingCart className="mr-2 w-4 h-4" /> Manage Stock
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "pmr" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-display font-bold text-navy">PMR Integration</h1>
                  <p className="text-slate-500 font-medium">Real-time synchronization with UK Pharmacy Management Systems.</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-slate-200 font-bold text-navy">
                    <Settings className="mr-2 w-4 h-4" /> API Config
                  </Button>
                  <Button className="bg-orange hover:bg-orange/90 shadow-lg shadow-orange/20 font-bold">
                    <RefreshCw className="mr-2 w-4 h-4" /> Resync All
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Integration Logs</CardTitle>
                    <CardDescription>Live stream of API calls and synchronization events.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pmrLogs.map((log) => (
                        <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              log.status === "Success" ? "bg-green-100" : "bg-rose-100"
                            }`}>
                              {log.status === "Success" ? (
                                <CheckCircle2 className="text-green-600 w-5 h-5" />
                              ) : (
                                <AlertCircle className="text-rose-600 w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-navy">{log.action}</p>
                              <p className="text-xs text-slate-500">Patient: <span className="font-bold">{log.patient}</span></p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.time}</p>
                            <p className="text-xs font-mono font-bold text-slate-400">{log.id}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-none shadow-sm bg-navy text-white">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white/60 text-sm">API Endpoint</span>
                          <Badge className="bg-white/10 text-white border-none text-[10px] font-mono">
                            {/* @ts-ignore */}
                            {import.meta.env?.VITE_API_URL ? new URL(import.meta.env.VITE_API_URL).pathname : "/v1/sync"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/60 text-sm">Uptime</span>
                          <span className="text-green-400 font-bold text-sm">99.98%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/60 text-sm">Latency</span>
                          <span className="text-white font-bold text-sm">124ms</span>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-xs font-bold uppercase tracking-widest">All Systems Operational</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Integration Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Demo Connection</Label>
                        <div className="p-3 bg-orange/5 rounded-xl border border-orange/10 flex items-center justify-between">
                          <span className="text-sm font-bold text-navy">Demo Mode Active</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold text-orange uppercase">Connected</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PMR Provider</Label>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold text-navy">
                          NymoPMR Enterprise
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sync Frequency</Label>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold text-navy">
                          Real-time (Push)
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h1 className="text-3xl font-display font-bold text-navy">Settings</h1>
                <p className="text-slate-500 font-medium">Configure your account, clinic identity, and system integrations.</p>
              </div>
              {/* Settings content... */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-orange" /> Account Security
                  </CardTitle>
                  <CardDescription>Manage your password and authentication methods.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-navy">Change Password</p>
                      <p className="text-sm text-slate-500">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline" className="border-slate-200 font-bold text-navy">Update</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Prescription Builder Wizard */}
      <PrescriptionBuilder 
        isOpen={isBuilderOpen} 
        onClose={() => setIsBuilderOpen(false)}
        onSuccess={(data) => {
          // Add to prescriptions list
          const newPrescription = {
            name: data.patientName,
            med: data.medication,
            nhs: "Verified",
            payment: "Paid",
            pmr: "Synced",
            date: new Date().toLocaleDateString('en-GB')
          };
          setPrescriptions(prev => [newPrescription, ...prev]);

          // Add to PMR logs
          const newLog = {
            id: `SYNC-${Math.floor(Math.random() * 1000)}`,
            action: "Prescription Dispensed",
            patient: data.patientName,
            status: "Success",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setPmrLogs(prev => [newLog, ...prev]);

          showToast(`Prescription for ${data.patientName} paid and dispensed successfully!`);
        }}
      />

      {/* Patient Registration Modal */}
      <PatientRegistration 
        isOpen={isRegistrationOpen} 
        onClose={() => setIsRegistrationOpen(false)}
        onSuccess={(data) => {
          const newPatient = {
            id: `P-${1000 + patients.length + 1}`,
            name: data.fullName,
            dob: new Date(data.dob).toLocaleDateString('en-GB'),
            phone: data.phone,
            nhs: data.nhsNumber,
            status: "Pending"
          };
          
          setPatients(prev => [newPatient, ...prev]);
          
          const newLog = {
            id: `SYNC-${992 + pmrLogs.length + 1}`,
            action: "Patient Registration",
            patient: data.fullName,
            status: "Success",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          
          setPmrLogs(prev => [newLog, ...prev]);
          
          showToast(`Patient ${data.fullName} registered & synced with PMR successfully!`);
        }}
      />

      {/* Prescription Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && selectedEntry && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="absolute inset-0 bg-navy/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md border-2 border-orange/20">
                    <img src={selectedEntry.avatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-navy">{selectedEntry.name}</h2>
                    <div className="flex items-center gap-2">
                       <p className="text-xs font-bold text-orange uppercase tracking-widest">{selectedEntry.date}</p>
                       <span className="text-slate-200">•</span>
                       <p className="text-xs font-bold text-slate-400">ID: {patients.find(p => p.name === selectedEntry.name)?.id || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsDetailModalOpen(false)} className="rounded-full hover:bg-slate-100">
                  <X className="w-6 h-6 text-slate-400" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date of Birth</p>
                   <p className="font-bold text-navy">{patients.find(p => p.name === selectedEntry.name)?.dob || 'Not Available'}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mobile Number</p>
                   <p className="font-bold text-navy">{patients.find(p => p.name === selectedEntry.name)?.phone || 'Not Available'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-slate-900 rounded-[2rem] space-y-4 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                  
                  <div className="flex justify-between relative z-10">
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Active Medication</span>
                    <span className="text-sm font-bold text-orange">{selectedEntry.med}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-4 relative z-10">
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">NHS Number</span>
                    <span className="text-sm font-black tracking-tighter text-blue-400">{patients.find(p => p.name === selectedEntry.name)?.nhs || 'Pending Assignment'}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-4 relative z-10">
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">PMR Verification</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${selectedEntry.pmr === "Synced" ? "bg-green-400" : selectedEntry.pmr === "Pending" ? "bg-amber-400" : "bg-rose-400"}`} />
                      <span className="text-sm font-bold">{selectedEntry.pmr}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-[10px] font-black text-navy uppercase tracking-widest mb-3 flex items-center gap-2">
                    <ClipboardList className="w-3 h-3 text-orange" />
                    Complete Clinical Case Detail
                  </h3>
                  <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold italic">
                      "Patient {selectedEntry.name} was evaluated on {selectedEntry.date}. Clinical integrity verified via NHSD identity gateway. 
                      Current pharmacological intervention with {selectedEntry.med} is performing as expected. 
                      Database synchronization for {selectedEntry.pmr.toLowerCase()} status is currently active."
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button onClick={() => handleDownloadPDF(selectedEntry.name)} className="flex-1 h-14 bg-orange hover:bg-orange/90 text-white font-bold rounded-2xl shadow-xl shadow-orange/30 transition-all active:scale-95">
                  <Download className="mr-2 w-5 h-5" /> Export Medical PDF
                </Button>
                <Button onClick={() => setIsDetailModalOpen(false)} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 font-bold hover:bg-slate-50 transition-all text-navy">Dismiss</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Entry Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedEntry && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-navy/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-navy">Edit Record: {selectedEntry.name}</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full">
                  <X className="w-6 h-6 text-slate-400" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Medication Adjustment</Label>
                  <Input 
                    defaultValue={selectedEntry.med} 
                    id="edit-med-input-final"
                    className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange/20 font-bold text-navy" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Record Date</Label>
                  <div className="h-12 rounded-xl bg-slate-100 flex items-center px-4 font-bold text-slate-400 opacity-60">
                    {selectedEntry.date}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button onClick={() => setIsEditModalOpen(false)} variant="ghost" className="flex-1 h-12 font-bold text-slate-400 hover:text-navy">Cancel</Button>
                <Button 
                  onClick={() => {
                    const input = document.getElementById('edit-med-input-final') as HTMLInputElement;
                    saveEdit(input.value);
                  }}
                  className="flex-[2] h-12 bg-navy hover:bg-navy/90 text-white font-bold rounded-xl shadow-lg shadow-navy/20 transition-all active:scale-95"
                >
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <DashboardDrillDownModal 
        isOpen={isDrillDownOpen}
        onClose={() => setIsDrillDownOpen(false)}
        type={drillDownType}
      />

      {/* Custom Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200]"
          >
            <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
              toast.type === "success" ? "bg-slate-900 border-green-500/30" : "bg-rose-900 border-rose-500/30"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                toast.type === "success" ? "bg-green-500" : "bg-rose-500"
              }`}>
                <CheckCircle2 className="text-white w-5 h-5" />
              </div>
              <p className="text-white font-bold text-sm">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
