import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Stethoscope, 
  AlertTriangle, 
  Pill,
  ShieldCheck,
  Loader2,
  Activity
} from "lucide-react";

interface PatientRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

type PatientFormData = {
  fullName: string;
  dob: string;
  gender: string;
  nhsNumber: string;
  email: string;
  phone: string;
  address: string;
  allergies: string;
  medications: string;
  gpPractice: string;
};

export default function PatientRegistration({ isOpen, onClose, onSuccess }: PatientRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PatientFormData>({
    defaultValues: {
      fullName: "",
      dob: "",
      gender: "",
      nhsNumber: "",
      email: "",
      phone: "",
      address: "",
      allergies: "",
      medications: "",
      gpPractice: "",
    }
  });

  const onSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true);
    // Simulate PMR Sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onSuccess(data);
    reset();
    onClose();
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
          className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange rounded-2xl flex items-center justify-center shadow-lg shadow-orange/20">
                <Activity className="text-white w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-navy">Register New Patient</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Secure PMR Enrollment</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100">
              <X className="w-6 h-6 text-slate-400" />
            </Button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <form id="patient-reg-form" onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              
              {/* Section: Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-l-4 border-orange pl-4">
                  <h3 className="text-lg font-bold text-navy">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-navy font-bold flex items-center gap-2">
                      <User className="w-4 h-4 text-orange" /> Full Name
                    </Label>
                    <Input 
                      {...register("fullName", { required: "Full name is required" })}
                      placeholder="e.g. John Doe" 
                      className={`h-12 rounded-xl bg-slate-50 border-slate-200 ${errors.fullName ? "border-rose-500" : ""}`}
                    />
                    {errors.fullName && <p className="text-xs text-rose-500 font-bold">{errors.fullName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-navy font-bold">Date of Birth</Label>
                    <Input 
                      {...register("dob", { required: "Date of birth is required" })}
                      type="date"
                      className={`h-12 rounded-xl bg-slate-50 border-slate-200 ${errors.dob ? "border-rose-500" : ""}`}
                    />
                    {errors.dob && <p className="text-xs text-rose-500 font-bold">{errors.dob.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-navy font-bold">Gender</Label>
                    <select 
                      {...register("gender", { required: "Gender is required" })}
                      className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange/20"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && <p className="text-xs text-rose-500 font-bold">{errors.gender.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-navy font-bold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-orange" /> NHS Number
                    </Label>
                    <Input 
                      {...register("nhsNumber", { 
                        required: "NHS number is required",
                        pattern: { value: /^[0-9]{10}$/, message: "NHS number must be 10 digits" }
                      })}
                      placeholder="e.g. 485 210 3456" 
                      className={`h-12 rounded-xl bg-slate-50 border-slate-200 ${errors.nhsNumber ? "border-rose-500" : ""}`}
                    />
                    {errors.nhsNumber && <p className="text-xs text-rose-500 font-bold">{errors.nhsNumber.message}</p>}
                  </div>
                </div>
              </div>

              {/* Section: Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-l-4 border-orange pl-4">
                  <h3 className="text-lg font-bold text-navy">Contact Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-navy font-bold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-orange" /> Email Address
                    </Label>
                    <Input 
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                      })}
                      type="email"
                      placeholder="john@example.com" 
                      className={`h-12 rounded-xl bg-slate-50 border-slate-200 ${errors.email ? "border-rose-500" : ""}`}
                    />
                    {errors.email && <p className="text-xs text-rose-500 font-bold">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-navy font-bold flex items-center gap-2">
                      <Phone className="w-4 h-4 text-orange" /> Phone Number
                    </Label>
                    <Input 
                      {...register("phone", { required: "Phone number is required" })}
                      placeholder="e.g. 07700 900123" 
                      className={`h-12 rounded-xl bg-slate-50 border-slate-200 ${errors.phone ? "border-rose-500" : ""}`}
                    />
                    {errors.phone && <p className="text-xs text-rose-500 font-bold">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-navy font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange" /> Home Address
                  </Label>
                  <Textarea 
                    {...register("address", { required: "Address is required" })}
                    placeholder="Enter full residential address..." 
                    className={`min-h-[100px] rounded-xl bg-slate-50 border-slate-200 ${errors.address ? "border-rose-500" : ""}`}
                  />
                  {errors.address && <p className="text-xs text-rose-500 font-bold">{errors.address.message}</p>}
                </div>
              </div>

              {/* Section: Clinical/Regulatory Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-l-4 border-orange pl-4">
                  <h3 className="text-lg font-bold text-navy">Clinical Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-navy font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange" /> Known Allergies
                    </Label>
                    <Textarea 
                      {...register("allergies")}
                      placeholder="List any known allergies (e.g. Penicillin, Nuts)..." 
                      className="min-h-[80px] rounded-xl bg-slate-50 border-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-navy font-bold flex items-center gap-2">
                      <Pill className="w-4 h-4 text-orange" /> Current Medications
                    </Label>
                    <Textarea 
                      {...register("medications")}
                      placeholder="List any medications currently being taken..." 
                      className="min-h-[80px] rounded-xl bg-slate-50 border-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-navy font-bold flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-orange" /> GP Practice Name
                    </Label>
                    <Input 
                      {...register("gpPractice", { required: "GP practice name is required" })}
                      placeholder="Search GP practice..." 
                      className={`h-12 rounded-xl bg-slate-50 border-slate-200 ${errors.gpPractice ? "border-rose-500" : ""}`}
                    />
                    {errors.gpPractice && <p className="text-xs text-rose-500 font-bold">{errors.gpPractice.message}</p>}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Footer Actions */}
          <div className="p-8 border-t border-slate-100 bg-slate-50 flex gap-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 h-14 border-slate-200 font-bold text-navy rounded-2xl"
            >
              Cancel
            </Button>
            <Button 
              form="patient-reg-form"
              disabled={isSubmitting}
              className="flex-[2] h-14 bg-orange hover:bg-orange/90 text-white font-bold shadow-xl shadow-orange/20 rounded-2xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Syncing with PMR...
                </>
              ) : (
                "Register Patient"
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
