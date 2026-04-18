import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Lock, 
  ShieldCheck, 
  Globe, 
  Trash2, 
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";

export default function AccountPage() {
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

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
            <h1 className="text-2xl font-black text-navy tracking-tight">Account Settings</h1>
            <p className="text-slate-500 text-sm">Manage your security, login credentials, and global preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Change Password */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-orange/10 rounded-2xl">
                <Lock className="w-5 h-5 text-orange" />
              </div>
              <h3 className="text-lg font-black text-navy tracking-tight">Change Password</h3>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Old Password</Label>
                <div className="relative">
                  <Input 
                    type={showPasswords.old ? "text" : "password"} 
                    placeholder="Enter current password"
                    className="h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold"
                  />
                  <button 
                    onClick={() => setShowPasswords(prev => ({ ...prev, old: !prev.old }))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy transition-colors"
                  >
                    {showPasswords.old ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">New Password</Label>
                <div className="relative">
                  <Input 
                    type={showPasswords.new ? "text" : "password"} 
                    placeholder="Enter new password"
                    className="h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold"
                  />
                  <button 
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy transition-colors"
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Confirm New Password</Label>
                <div className="relative">
                  <Input 
                    type={showPasswords.confirm ? "text" : "password"} 
                    placeholder="Repeat new password"
                    className="h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold"
                  />
                  <button 
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy transition-colors"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button className="w-full h-14 bg-orange hover:bg-orange/90 text-white font-black rounded-2xl shadow-lg mt-8 shadow-orange/20">
              Update Password
            </Button>
          </div>

          <div className="space-y-8">
            {/* Login Security (2FA) */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-2xl">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-black text-navy tracking-tight">Login Security</h3>
                </div>
                <Switch 
                  checked={is2FAEnabled} 
                  onCheckedChange={setIs2FAEnabled} 
                  className="data-[state=checked]:bg-orange"
                />
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <Fingerprint className="w-6 h-6 text-navy/70" />
                </div>
                <div>
                  <p className="font-black text-navy mb-1 leading-tight">2-Factor Authentication</p>
                  <p className="text-xs text-slate-500 leading-normal">Improve your clinical account security by requiring an additional sync code on login.</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-emerald-600 font-bold text-sm px-1">
                <CheckCircle2 className="w-4 h-4" />
                Enhanced security is currently enabled
              </div>
            </div>

            {/* Language & Locale */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-purple-50 rounded-2xl">
                  <Globe className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-black text-navy tracking-tight">Language & Locale</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">System Language</Label>
                  <Select defaultValue="en-uk">
                    <SelectTrigger className="h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold text-navy">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100">
                      <SelectItem value="en-uk" className="rounded-xl">English (United Kingdom)</SelectItem>
                      <SelectItem value="en-us" className="rounded-xl">English (United States)</SelectItem>
                      <SelectItem value="es" className="rounded-xl">Español</SelectItem>
                      <SelectItem value="fr" className="rounded-xl">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Deactivate Account */}
            <div className="bg-red-50/50 rounded-[2.5rem] p-8 border border-red-100">
              <div className="flex items-center gap-3 mb-4 text-red-600">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-lg font-black tracking-tight">Dangerous Action</h3>
              </div>
              <p className="text-sm text-red-700/70 mb-6 leading-relaxed">Deactivating your account will block access to patients' clinical records and sync functions. This action is irreversible.</p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full h-14 bg-white border border-red-100 text-red-600 hover:bg-red-600 hover:text-white font-black rounded-2xl transition-all">
                    Deactivate My Clinician Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-10 max-w-md">
                  <DialogHeader className="space-y-4">
                    <div className="w-16 h-16 bg-red-50 rounded-[1.5rem] flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <DialogTitle className="text-2xl font-black text-navy text-center">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="text-center text-slate-500 text-base leading-relaxed p-2">
                      This will permanently disable your clinical access and PMR synchronization. All your pending prescriptions will be frozen.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="mt-8 gap-3 sm:flex-col sm:gap-3">
                    <Button variant="outline" className="h-14 rounded-2xl font-bold border-slate-200">Cancel</Button>
                    <Button className="h-14 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl w-full">Yes, Deactivate Account</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
