import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  ShieldCheck, 
  Stethoscope, 
  Database, 
  Zap, 
  Users, 
  ClipboardCheck,
  CheckCircle2,
  Lock,
  Globe,
  Activity,
  Settings,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Monitor,
  Smartphone,
  Laptop,
  Tablet,
  FileText,
  Search,
  Check,
  X,
  Cpu,
  Server,
  Key,
  User,
  AlertCircle,
  Clock,
  Fingerprint,
  History,
  Network,
  Cloud,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";
import ClinicianRegistration from "./ClinicianRegistration";

interface LandingPageProps {
  onStartDemo: () => void;
}

export default function LandingPage({ onStartDemo }: LandingPageProps) {
  const [isRegOpen, setIsRegOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] selection:bg-orange/10 selection:text-orange font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="p-1.5 bg-orange/10 rounded-lg group-hover:bg-orange/20 transition-colors">
                <Activity className="text-orange w-5 h-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-bold text-navy/60 uppercase tracking-[0.2em] ml-auto mb-0.5">Technology</span>
                <div className="flex items-center">
                  <span className="text-xl font-display font-extrabold text-orange">Care</span>
                  <span className="text-xl font-display font-extrabold text-navy">Nexon</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <a href="#services" className="hover:text-orange transition-colors">Services</a>
              <a href="#technology" className="hover:text-orange transition-colors">Technology</a>
              <a href="#clinicians" className="hover:text-orange transition-colors">Clinicians</a>
              <a href="#security" className="hover:text-orange transition-colors">Security</a>
              <a href="#compliance" className="hover:text-orange transition-colors">Compliance</a>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                className="bg-orange hover:bg-orange/90 text-white shadow-lg shadow-orange/20 font-bold sm:px-6 px-3 rounded-xl sm:h-12 h-10 sm:text-sm text-[11px]" 
                onClick={() => setIsRegOpen(true)}
              >
                <span className="hidden sm:inline">Register as Clinician</span>
                <span className="sm:hidden">Register</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange/10 rounded-full border border-orange/20 mb-8">
              <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-orange uppercase tracking-widest">GPhC Accredited Ecosystem</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-navy leading-[1.1] mb-8">
              Discover Our Mission and <br className="hidden md:block" />
              Values in <span className="text-orange">Patient-Centered</span> Healthcare
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
              We are dedicated to providing exceptional digital prescribing and dispensing 
              through a compassionate, patient-centered approach.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="h-14 px-10 text-md bg-orange hover:bg-orange/90 text-white shadow-2xl shadow-orange/20 rounded-full font-bold transition-all hover:scale-105" 
                onClick={() => setIsRegOpen(true)}
              >
                Contact us <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Auto-Scrolling Image Marquee (Pharma Focused) */}
          <div className="relative w-full overflow-hidden py-10">
            <motion.div 
              className="flex gap-6 w-max"
              animate={{ x: [0, -1920] }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[
                "https://images.unsplash.com/photo-1587854680352-936b22b91030?auto=format&fit=crop&q=80&w=600&h=400",
                "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=400",
                "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600&h=400",
                "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=600&h=400",
                "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=600&h=400",
                "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=600&h=400",
                // Duplicate for seamless loop
                "https://images.unsplash.com/photo-1587854680352-936b22b91030?auto=format&fit=crop&q=80&w=600&h=400",
                "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=400",
                "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600&h=400",
              ].map((src, i) => (
                <div key={i} className="w-[400px] h-[300px] rounded-[2rem] overflow-hidden border-4 border-white shadow-lg relative group shrink-0">
                  <img 
                    src={src} 
                    alt={`Medical scene ${i}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                  {i % 3 === 1 && (
                    <div className="absolute bottom-4 right-4">
                      <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full">
                        <p className="text-white text-[10px] font-bold">Verified Care</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
            
            {/* Gradient Fades for the edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10" />
          </div>

          {/* Background Accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy/5 blur-[120px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-display font-extrabold text-navy mb-6">Integrated Clinical Services</h2>
            <p className="text-lg text-slate-500 font-medium">Beyond simple software. We provide the infrastructure for the next generation of UK pharmacy operations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Electronic Prescribing (EPS) Ready", 
                desc: "Full integration with the NHS Electronic Prescription Service for instantaneous, paperless prescribing.",
                icon: FileText,
                color: "bg-blue-50 text-blue-600"
              },
              { 
                title: "Automated Patient Notifications", 
                desc: "Real-time SMS and email updates for patients throughout the dispensing and delivery lifecycle.",
                icon: Bell,
                color: "bg-orange/10 text-orange"
              },
              { 
                title: "Digital Pharmacy Management", 
                desc: "Comprehensive tools for stock control, clinical governance, and pharmacist-led dispensing workflows.",
                icon: LayoutDashboard,
                color: "bg-green-50 text-green-600"
              }
            ].map((service, i) => (
              <Card key={i} className="border-none bg-slate-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl overflow-hidden group">
                <CardContent className="p-10">
                  <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-4">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-32 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,0,0.2)_0%,transparent_50%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <Badge className="mb-6 bg-orange text-white border-none font-bold uppercase tracking-widest text-[10px]">API-First Architecture</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-8 leading-tight">
                Enterprise-Grade Technology for Modern Healthcare.
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Seamless integration with NymoPMR", desc: "Native bi-directional sync with the UK's leading Pharmacy Management System." },
                  { title: "NHS Spine Connectivity", desc: "Secure, high-speed access to the NHS Spine for identity and record verification." },
                  { title: "Enterprise-grade React Architecture", desc: "Built on a robust, scalable frontend stack designed for high-concurrency medical environments." }
                ].map((tech, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Cpu className="text-orange w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2">{tech.title}</h4>
                      <p className="text-white/60 font-medium leading-relaxed">{tech.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 p-8 rounded-3xl text-center">
                <Network className="text-orange w-10 h-10 mx-auto mb-4" />
                <p className="text-3xl font-extrabold mb-1">124ms</p>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">API Latency</p>
              </Card>
              <Card className="bg-white/5 border-white/10 p-8 rounded-3xl text-center">
                <Cloud className="text-blue-400 w-10 h-10 mx-auto mb-4" />
                <p className="text-3xl font-extrabold mb-1">Tier 4</p>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">UK Data Centers</p>
              </Card>
              <Card className="bg-white/5 border-white/10 p-8 rounded-3xl text-center col-span-2">
                <div className="flex justify-center gap-4 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-xs font-bold uppercase tracking-widest">Live NHS Spine Connection</p>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/3 bg-orange"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Clinicians Section */}
      <section id="clinicians" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 blur-3xl rounded-full" />
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center overflow-hidden border border-slate-200">
                      <img 
                        src="https://randomuser.me/api/portraits/men/44.jpg" 
                        alt="Oliver Smith" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">Oliver Smith</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">NHS: 485 210 3456</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-none font-bold">Verified</Badge>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Active Prescription</p>
                    <p className="text-sm font-bold text-navy">Amoxicillin 500mg Capsules</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Dispensing Pharmacy</p>
                    <p className="text-sm font-bold text-navy">London Central Dispensing</p>
                  </div>
                  <div className="p-4 bg-orange/5 rounded-2xl border border-orange/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="text-orange w-5 h-5" />
                      <p className="text-xs font-bold text-navy uppercase tracking-widest">Real-time PMR Sync</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Badge className="mb-6 bg-blue-100 text-blue-700 border-none font-bold uppercase tracking-widest text-[10px]">Clinician First</Badge>
              <h2 className="text-4xl font-display font-extrabold text-navy mb-8 leading-tight">
                Designed for the Modern UK Medical Professional.
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                We've built a workspace that respects your time and clinical expertise. Automated workflows, instant record access, and seamless communication.
              </p>
              <ul className="space-y-4">
                {[
                  "One-click patient record retrieval",
                  "Smart medication search with dosage logic",
                  "Instant clinical governance audit trails",
                  "Multi-device responsive workspace"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-navy font-bold">
                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-display font-extrabold text-navy mb-6">Bank-Grade Security</h2>
            <p className="text-lg text-slate-500 font-medium">Your data security is our primary directive. We employ multi-layered defense strategies to protect patient confidentiality.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none bg-white shadow-sm rounded-[2.5rem] p-10 group hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                <History className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Comprehensive Audit Trail</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Every action within the CareNexon ecosystem is logged with a cryptographic timestamp. Full transparency for clinical governance and regulatory audits.
              </p>
            </Card>

            <Card className="border-none bg-white shadow-sm rounded-[2.5rem] p-10 group hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-orange rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                <Fingerprint className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Two-Factor Authentication (2FA)</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Mandatory multi-factor authentication for all clinician accounts. Secure your workspace with biometric or app-based verification.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section id="compliance" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-orange/10 -skew-x-12 translate-x-1/4" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-8 leading-tight">
                  Regulatory Compliance as Standard.
                </h2>
                <p className="text-xl text-white/60 mb-12 font-medium leading-relaxed">
                  Your data is hosted in UK-based Tier 4 data centers with AES-256 encryption. We meet and exceed all UK healthcare data standards.
                </p>
                <div className="flex flex-wrap gap-6">
                  {[
                    { label: "GDPR", icon: ShieldCheck },
                    { label: "GPhC", icon: ClipboardCheck },
                    { label: "Cyber Essentials", icon: Lock }
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
                      <badge.icon className="text-orange w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-widest">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur">
                  <div className="flex items-center gap-4 mb-4">
                    <Server className="text-orange w-6 h-6" />
                    <h4 className="text-lg font-bold">Data Sovereignty</h4>
                  </div>
                  <p className="text-white/60 font-medium text-sm leading-relaxed">
                    All patient data remains within the UK jurisdiction at all times. Hosted on sovereign infrastructure with 24/7 physical security.
                  </p>
                </div>
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur">
                  <div className="flex items-center gap-4 mb-4">
                    <Key className="text-blue-400 w-6 h-6" />
                    <h4 className="text-lg font-bold">AES-256 Encryption</h4>
                  </div>
                  <p className="text-white/60 font-medium text-sm leading-relaxed">
                    Military-grade encryption for data at rest and in transit. Your clinical records are protected by the world's most robust standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
              <div className="flex items-center gap-2 group mb-8">
                <div className="p-1.5 bg-orange/10 rounded-lg group-hover:bg-orange/20 transition-colors">
                  <Activity className="text-orange w-5 h-5" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] font-bold text-navy/60 uppercase tracking-[0.2em] ml-auto mb-0.5">Technology</span>
                  <div className="flex items-center">
                    <span className="text-xl font-display font-extrabold text-orange">Care</span>
                    <span className="text-xl font-display font-extrabold text-navy">Nexon</span>
                  </div>
                </div>
              </div>
              <p className="max-w-md text-slate-500 font-medium leading-relaxed mb-10">
                The UK’s leading infrastructure provider for digital pharmacy platforms. Secure, GPhC-accredited, and clinician-first.
              </p>
              
              {/* Live System Status Pill */}
              <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/20">
                <div className="flex items-center gap-2 border-r border-white/10 pr-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">PMR API: Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">NHS Spine: Connected</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-navy font-bold mb-8 uppercase tracking-widest text-[10px]">Company</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="#services" className="hover:text-orange transition-colors">Services</a></li>
                <li><a href="#technology" className="hover:text-orange transition-colors">Technology</a></li>
                <li><a href="#security" className="hover:text-orange transition-colors">Security</a></li>
                <li><a href="#compliance" className="hover:text-orange transition-colors">Compliance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-navy font-bold mb-8 uppercase tracking-widest text-[10px]">Legal</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-orange transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">GPhC Registration</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <p>© 2026 CareNexon Technology. All rights reserved.</p>
            <p>124 City Road, London, EC1V 2NX</p>
          </div>
        </div>
      </footer>

      <ClinicianRegistration 
        isOpen={isRegOpen} 
        onClose={() => setIsRegOpen(false)} 
        onSuccess={onStartDemo} 
      />
    </div>
  );
}
