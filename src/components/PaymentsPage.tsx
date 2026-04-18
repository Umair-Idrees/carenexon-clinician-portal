import { useState } from "react";
import { 
  CreditCard, 
  Download, 
  Bell, 
  Search, 
  Filter, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  FileText, 
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  Calendar,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

interface Invoice {
  id: string;
  patientName: string;
  date: string;
  amount: number;
  method: "Insurance" | "Cash" | "Card";
  status: "Paid" | "Overdue" | "Pending Insurance";
}

const revenueData = [
  { month: "Oct", revenue: 45000 },
  { month: "Nov", revenue: 52000 },
  { month: "Dec", revenue: 48000 },
  { month: "Jan", revenue: 61000 },
  { month: "Feb", revenue: 55000 },
  { month: "Mar", revenue: 67000 },
];

const initialInvoices: Invoice[] = [
  { id: "INV-8821", patientName: "Sarah Jenkins", date: "12/04/2026", amount: 1250.00, method: "Insurance", status: "Paid" },
  { id: "INV-8822", patientName: "Michael O'Connor", date: "10/04/2026", amount: 450.00, method: "Card", status: "Pending Insurance" },
  { id: "INV-8823", patientName: "Elena Rodriguez", date: "08/04/2026", amount: 2800.00, method: "Insurance", status: "Overdue" },
  { id: "INV-8824", patientName: "David Thompson", date: "05/04/2026", amount: 120.00, method: "Cash", status: "Paid" },
  { id: "INV-8825", patientName: "Linda Wu", date: "02/04/2026", amount: 890.00, method: "Card", status: "Paid" },
  { id: "INV-8826", patientName: "Robert Chen", date: "28/03/2026", amount: 3200.00, method: "Insurance", status: "Pending Insurance" },
  { id: "INV-8827", patientName: "Elena Rodriguez", date: "25/03/2026", amount: 150.00, method: "Card", status: "Paid" },
];

export default function PaymentsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const filteredInvoices = invoices.filter(inv => 
    inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = async (id: string, action: string) => {
    setIsProcessing(`${id}-${action}`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(null);
  };

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-emerald-100 text-emerald-700 border-none font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider"><CheckCircle2 className="w-3 h-3 mr-1" /> Paid</Badge>;
      case "Overdue":
        return <Badge className="bg-rose-100 text-rose-700 border-none font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider"><AlertCircle className="w-3 h-3 mr-1" /> Overdue</Badge>;
      case "Pending Insurance":
        return <Badge className="bg-blue-100 text-blue-700 border-none font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">Financial Overview</h1>
          <p className="text-slate-500 font-medium">Monitor revenue, billing cycles, and insurance claims.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 border-slate-200 text-navy font-bold rounded-xl bg-white shadow-sm">
            <Download className="mr-2 w-4 h-4" /> Export Report
          </Button>
          <Button className="h-12 bg-orange hover:bg-orange/90 text-white shadow-lg shadow-orange/20 font-bold px-6 rounded-xl">
            <Plus className="mr-2 w-4 h-4" /> Create Invoice
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "$284,500", trend: "+12.5%", icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Outstanding", value: "$12,450", trend: "-2.4%", icon: Clock, color: "text-orange", bg: "bg-orange/10" },
          { label: "Insurance Claims", value: "48", trend: "+5.2%", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Avg. Payment", value: "$850", trend: "+1.8%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2rem] overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <Badge variant="outline" className={`border-none font-bold text-[10px] ${stat.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                  {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {stat.trend}
                </Badge>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-navy">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-1 border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-xl font-bold text-navy">Monthly Revenue</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Revenue performance for last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="p-8 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#FF8A00' : '#4A90E2'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Invoice Table */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-navy">Recent Invoices</CardTitle>
              <CardDescription className="text-slate-500 font-medium">Manage and track patient billing</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search invoices..." 
                className="pl-10 bg-slate-50 border-none rounded-xl h-10 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-none">
                  <TableHead className="pl-8 font-bold text-slate-500 uppercase text-[10px] tracking-widest">Invoice ID</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Patient</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Amount</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Status</TableHead>
                  <TableHead className="pr-8 text-right font-bold text-slate-500 uppercase text-[10px] tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((inv) => (
                  <TableRow key={inv.id} className="group hover:bg-slate-50/50 border-slate-50 transition-colors">
                    <TableCell className="pl-8 py-5 font-bold text-navy text-sm">{inv.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-bold text-navy text-sm">{inv.patientName}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{inv.date}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-navy text-sm">${inv.amount.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{inv.method}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(inv.status)}</TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleAction(inv.id, 'download')}
                          className="h-9 w-9 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Download PDF"
                        >
                          {isProcessing === `${inv.id}-download` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleAction(inv.id, 'remind')}
                          className="h-9 w-9 text-slate-400 hover:text-orange hover:bg-orange/10 rounded-lg"
                          title="Send Reminder"
                        >
                          {isProcessing === `${inv.id}-remind` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-[2rem] bg-navy text-white overflow-hidden">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-orange" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Terminal Status</p>
              <p className="text-[10px] text-white/60 font-medium">3 Terminals Online</p>
            </div>
            <Button variant="ghost" className="text-xs font-bold text-white/80 hover:text-white hover:bg-white/10">Manage</Button>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden border border-slate-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-navy">Auto-Billing</p>
              <p className="text-[10px] text-slate-500 font-medium">Enabled for Insurance</p>
            </div>
            <Button variant="ghost" className="text-xs font-bold text-navy/60 hover:text-navy hover:bg-slate-50">Settings</Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden border border-slate-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-rose-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-navy">Overdue Balance</p>
              <p className="text-[10px] text-slate-500 font-medium">3 Invoices Pending</p>
            </div>
            <Button variant="ghost" className="text-xs font-bold text-rose-600 hover:bg-rose-50">View All</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
