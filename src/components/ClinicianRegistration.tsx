import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  X, 
  User, 
  Mail, 
  ShieldCheck, 
  Loader2,
  Activity,
  Stethoscope,
  Building2,
  Lock
} from "lucide-react";

interface ClinicianRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

type ClinicianFormData = {
  fullName: string;
  email: string;
  gmcNumber: string;
  specialty: string;
  clinicName: string;
};

export default function ClinicianRegistration({ isOpen, onClose, onSuccess }: ClinicianRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset } = useForm<ClinicianFormData>({
    defaultValues: {
      fullName: "Dr. Sarah Jenkins",
      email: "s.jenkins@nhs.net",
      gmcNumber: "7482910",
      specialty: "General Practice",
      clinicName: "London Central Health",
    }
  });

  const onSubmit = (data: ClinicianFormData) => {
    setIsSubmitting(true);
    // Immediate success for demo
    onSuccess(data);
    reset();
    onClose();
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy/60 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange rounded-2xl flex items-center justify-center shadow-lg shadow-orange/20">
                <Stethoscope className="text-white w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-navy">Clinician Onboarding</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">GPhC Secure Registration</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100">
              <X className="w-6 h-6 text-slate-400" />
            </Button>
          </div>

          {/* Form Content */}
          <div className="p-8 overflow-y-auto max-h-[60vh]">
            <form id="clinician-reg-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-navy font-bold flex items-center gap-2">
                  <User className="w-4 h-4 text-orange" /> Full Name
                </Label>
                <Input 
                  {...register("fullName")}
                  placeholder="Dr. John Smith" 
                  className="h-12 rounded-xl bg-slate-50 border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-navy font-bold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange" /> Professional Email
                </Label>
                <Input 
                  {...register("email")}
                  type="email"
                  placeholder="jsmith@clinic.nhs.uk" 
                  className="h-12 rounded-xl bg-slate-50 border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-navy font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange" /> GMC Number
                  </Label>
                  <Input 
                    {...register("gmcNumber")}
                    placeholder="7654321" 
                    className="h-12 rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-navy font-bold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange" /> Specialty
                  </Label>
                  <Input 
                    {...register("specialty")}
                    placeholder="General Practice" 
                    className="h-12 rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-navy font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange" /> Clinic/Practice Name
                </Label>
                <Input 
                  {...register("clinicName")}
                  placeholder="London Central Health" 
                  className="h-12 rounded-xl bg-slate-50 border-slate-200"
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
                <Lock className="text-blue-600 w-5 h-5 mt-0.5" />
                <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                  By registering, you agree to the GPhC clinical governance standards. Your credentials will be verified against the National Health Service database.
                </p>
              </div>

              {/* Action Buttons inside the form for better compatibility */}
              <div className="pt-4 flex gap-4">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 h-14 border-slate-200 font-bold text-navy rounded-2xl"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] h-14 bg-orange hover:bg-orange/90 text-white font-bold shadow-xl shadow-orange/20 rounded-2xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Verifying...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
