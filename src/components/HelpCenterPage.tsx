import React, { useState } from "react";
import { 
  Search, 
  Puzzle, 
  ShieldCheck, 
  Pill, 
  Lock, 
  Users, 
  CreditCard, 
  MessageSquare, 
  LifeBuoy, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const topics = [
  { title: "Integration", icon: Puzzle, desc: "Connect with GPhC and NHS APIs.", color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Compliance", icon: ShieldCheck, desc: "GDPR and clinical safety standards.", color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Prescribing", icon: Pill, desc: "Digital signature and PMR sync.", color: "text-orange", bg: "bg-orange/10" },
  { title: "Security", icon: Lock, desc: "AES-256 encryption and MFA setup.", color: "text-purple-600", bg: "bg-purple-50" },
  { title: "Patients", icon: Users, desc: "Managing records and medical history.", color: "text-indigo-600", bg: "bg-indigo-50" },
  { title: "Billing", icon: CreditCard, desc: "Invoicing, insurance, and terminals.", color: "text-rose-600", bg: "bg-rose-50" },
];

export default function HelpCenterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert("Support ticket created successfully!");
  };

  const startChat = async () => {
    setIsChatLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsChatLoading(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-12 text-center border border-blue-100/50">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-200 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <Badge className="bg-blue-100 text-blue-700 border-none font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest">
            Support Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy tracking-tight">
            How can we <span className="text-blue-600">help you</span> today?
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Search our knowledge base or reach out to our clinical support team.
          </p>
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              placeholder="Search for topics, guides, or FAQs..." 
              className="h-16 pl-12 pr-6 rounded-2xl bg-white border-none shadow-xl shadow-blue-500/5 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-navy">Browse Topics</h2>
          <Button variant="ghost" className="text-blue-600 font-bold hover:bg-blue-50">
            View All Guides <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all group cursor-pointer rounded-[2rem] overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${topic.bg} ${topic.color}`}>
                  <topic.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{topic.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {topic.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-2xl font-bold text-navy">Submit a Ticket</CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Our clinical experts typically respond within 2 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Inquiry Type</Label>
                  <select className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-medium text-navy focus:ring-2 focus:ring-blue-500/20">
                    <option>Technical Issue</option>
                    <option>Billing Inquiry</option>
                    <option>Feature Request</option>
                    <option>Compliance Question</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-navy">Priority Level</Label>
                  <select className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-medium text-navy focus:ring-2 focus:ring-blue-500/20">
                    <option>Low - General Question</option>
                    <option>Medium - Minor Bug</option>
                    <option>High - Critical Issue</option>
                    <option>Urgent - System Down</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-navy">Detailed Issue</Label>
                <textarea 
                  className="w-full min-h-[150px] rounded-xl bg-slate-50 border-none p-4 font-medium text-navy focus:ring-2 focus:ring-blue-500/20 resize-none"
                  placeholder="Please describe your issue in detail..."
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 h-12 bg-orange hover:bg-orange/90 text-white font-bold rounded-xl shadow-lg shadow-orange/20"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="mr-2 w-4 h-4" /> Send Inquiry</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Live Status Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-navy text-white">
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <LifeBuoy className="w-6 h-6 text-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Live Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Agents Online</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Avg. Response Time</span>
                  <span className="font-bold">4 mins</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-orange"
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  Our support team is currently experiencing low volume.
                </p>
              </div>

              <Button 
                onClick={startChat}
                disabled={isChatLoading}
                className="w-full h-14 bg-white hover:bg-white/90 text-navy font-bold rounded-xl shadow-xl"
              >
                {isChatLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><MessageSquare className="mr-2 w-5 h-5 text-orange" /> Start Live Chat</>}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-white border border-slate-100">
            <CardContent className="p-8 space-y-6">
              <h3 className="font-bold text-navy flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Quick Resources
              </h3>
              <div className="space-y-3">
                {[
                  "API Documentation",
                  "Compliance Checklist",
                  "Security Whitepaper",
                  "User Manual (PDF)"
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                    <span className="text-sm font-bold text-slate-600 group-hover:text-navy">{item}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
