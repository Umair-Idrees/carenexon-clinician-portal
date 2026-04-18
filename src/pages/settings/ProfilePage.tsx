import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  ShieldCheck, 
  ChevronLeft,
  FileSignature,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full bg-white shadow-sm hover:shadow-md transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-navy" />
          </Button>
          <div>
            <h1 className="text-2xl font-black text-navy tracking-tight">My Profile</h1>
            <p className="text-slate-500 text-sm">Manage your professional credentials and contact information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-orange/5" />
              <div className="relative">
                <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 mx-auto border-4 border-white shadow-xl overflow-hidden mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Dr. Alireza Siregar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 p-1">
                    <button className="p-2 bg-orange text-white rounded-xl shadow-lg hover:scale-105 transition-transform">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h2 className="text-xl font-black text-navy leading-tight">Dr. Alireza Siregar</h2>
                <p className="text-slate-500 font-medium text-sm mt-1">Consultant Cardiologist</p>
                <div className="mt-4 flex justify-center">
                  <Badge className="bg-emerald-100 text-emerald-600 border-none px-4 py-1.5 rounded-full font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Verified by GMC
                  </Badge>
                </div>
              </div>

              <div className="mt-8 pt-8 border-top border-slate-100 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">GMC ID</span>
                  <span className="text-navy font-black tabular-nums">8823412</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Member Since</span>
                  <span className="text-navy font-black tabular-nums">Jan 2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Professional Details */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-blue-50 rounded-2xl">
                  <Award className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-black text-navy tracking-tight">Professional Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Specialization</label>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-transparent font-bold text-navy">Cardiology & Internal Medicine</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Qualifications</label>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-transparent font-bold text-navy">MBBS, FRCP, MD</div>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Board Certifications</label>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-transparent font-bold text-navy">General Medical Council (UK), American Board of Internal Medicine</div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-orange/10 rounded-2xl">
                  <Mail className="w-5 h-5 text-orange" />
                </div>
                <h3 className="text-lg font-black text-navy tracking-tight">Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Email</label>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-transparent font-bold text-navy flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    a.siregar@nhs.co.uk
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Contact Number</label>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-transparent font-bold text-navy flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    +44 7700 900543
                  </div>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Practice Address</label>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-transparent font-bold text-navy flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    Central London Medical Hub, 15 Baker Street, Marylebone, London NW1 6XE, United Kingdom
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-purple-50 rounded-2xl">
                  <FileSignature className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-black text-navy tracking-tight">Digital Signature</h3>
              </div>
              
              <div className="p-12 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center space-y-4 bg-slate-50/50">
                <div className="w-64 h-24 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-4">
                  <p className="font-serif italic text-3xl text-navy/40 select-none">Alireza Siregar</p>
                </div>
                <p className="text-sm text-slate-500 text-center max-w-xs">Used for digitally signing electronic prescriptions and referrals within the portal.</p>
                <div className="flex gap-3">
                  <Button variant="outline" className="rounded-xl border-slate-200 font-bold px-6">Redraw</Button>
                  <Button className="bg-navy text-white hover:bg-navy/90 rounded-xl font-bold px-6">Upload Signature</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
