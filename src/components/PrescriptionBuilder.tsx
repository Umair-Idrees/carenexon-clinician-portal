import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Search, 
  User, 
  Pill, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Activity
} from "lucide-react";

interface PrescriptionBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

type FormData = {
  patientName: string;
  nhsNumber: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
};

const STEPS = [
  { id: 1, title: "PATIENT", icon: User },
  { id: 2, title: "MEDICATION", icon: Pill },
  { id: 3, title: "DOSAGE", icon: Clock },
  { id: 4, title: "SUMMARY", icon: CheckCircle2 },
];

export default function PrescriptionBuilder({ isOpen, onClose, onSuccess }: PrescriptionBuilderProps) {
  const [step, setStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [syncStatus, setSyncStatus] = useState<"idle" | "payment" | "dispensing" | "syncing" | "success">("idle");
  
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger, reset } = useForm<FormData>({
    defaultValues: {
      patientName: "umair",
      nhsNumber: "2345678934",
      medication: "Amoxicillin 500mg Capsules",
      dosage: "500mg",
      frequency: "2daily",
      duration: "7",
    }
  });

  const formData = watch();
  const showNhsAlert = formData.nhsNumber.length >= 10;

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (step === 1) fieldsToValidate = ["patientName", "nhsNumber"];
    if (step === 2) fieldsToValidate = ["medication"];
    if (step === 3) fieldsToValidate = ["dosage", "frequency", "duration"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const onSubmit = async (data: FormData) => {
    setIsSyncing(true);
    
    setSyncStatus("payment");
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setSyncStatus("dispensing");
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setSyncStatus("syncing");
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setSyncStatus("success");
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSyncing(false);
    onSuccess(data);
    
    // Reset for next time
    setTimeout(() => {
      onClose();
      setStep(1);
      setSyncStatus("idle");
      reset();
    }, 500);
  };

  // Mock data for autocomplete
  const mockPatients = [
    { name: "James Wilson", nhs: "4852103456" },
    { name: "Emma Thompson", nhs: "9123345567" },
    { name: "Robert Davis", nhs: "1124456678" },
  ];

  const mockMeds = [
    "Amoxicillin 500mg Capsules",
    "Lisinopril 10mg Tablets",
    "Metformin 500mg Tablets",
    "Atorvastatin 20mg Tablets",
    "Salbutamol 100mcg Inhaler",
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-end">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
        />

        {/* Slide-over Panel */}
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-xl h-full bg-white shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center shadow-lg shadow-orange/20">
                <Activity className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-navy">New Digital Prescription</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">GPhC Secure Workflow</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100">
              <X className="w-5 h-5 text-slate-400" />
            </Button>
          </div>

          {/* Stepper (Matching image_34.png) */}
          <div className="px-8 pt-8 pb-4 bg-white border-b border-slate-100">
            <div className="flex justify-between relative">
              {/* Connector Line */}
              <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 -z-10" />
              
              {STEPS.map((s) => (
                <div 
                  key={s.id} 
                  className="flex flex-col items-center gap-2 relative z-10"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step === s.id 
                    ? "border-orange bg-white text-orange shadow-lg shadow-orange/20 scale-110" 
                    : step > s.id 
                    ? "border-orange bg-orange text-white" 
                    : "border-slate-200 bg-white text-slate-300"
                  }`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold tracking-widest transition-colors ${
                    step === s.id ? "text-orange" : "text-slate-300"
                  }`}>
                    {s.title}
                  </span>
                  {step === s.id && (
                    <motion.div 
                      layoutId="activeStep"
                      className="absolute -bottom-4 w-full h-1 bg-orange rounded-full"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <form id="prescription-form" onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <Label className="text-navy font-bold text-lg">Search Patient</Label>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input 
                          {...register("patientName", { required: "Patient name is required" })}
                          placeholder="Enter patient name or NHS number..." 
                          className={`pl-12 h-14 rounded-2xl border-slate-200 focus-visible:ring-orange/20 text-lg ${errors.patientName ? "border-rose-500 bg-rose-50" : "bg-white"}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            setValue("patientName", val);
                            const found = mockPatients.find(p => p.name.toLowerCase().includes(val.toLowerCase()) || p.nhs.includes(val));
                            if (found) setValue("nhsNumber", found.nhs);
                          }}
                        />
                      </div>
                      {errors.patientName && <p className="text-xs text-rose-500 font-bold">{errors.patientName.message}</p>}
                    </div>

                    <div className="space-y-4">
                      <Label className="text-navy font-bold text-lg">NHS Number</Label>
                      <Input 
                        {...register("nhsNumber", { 
                          required: "NHS number is required",
                          pattern: { value: /^[0-9]{10}$/, message: "NHS number must be 10 digits" }
                        })}
                        type="number"
                        placeholder="e.g. 485 210 3456" 
                        className={`h-14 rounded-2xl border-slate-200 focus-visible:ring-orange/20 text-lg ${errors.nhsNumber ? "border-rose-500 bg-rose-50" : "bg-white"}`}
                      />
                      {errors.nhsNumber && <p className="text-xs text-rose-500 font-bold">{errors.nhsNumber.message}</p>}
                    </div>

                    {/* Animated Alert Box (Matching image_34.png) */}
                    <AnimatePresence>
                      {showNhsAlert && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4"
                        >
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-100">
                            <ShieldCheck className="text-blue-600 w-6 h-6" />
                          </div>
                          <p className="text-sm text-blue-800 font-medium leading-relaxed pt-1">
                            Patient identity is verified against the NHS Spine. Ensure the NHS number matches the official record.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <Label className="text-navy font-bold">Medicine Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                          {...register("medication", { required: "Medication selection is required" })}
                          placeholder="Search approved UK medicine catalog..." 
                          className={`pl-10 h-12 ${errors.medication ? "border-rose-500 bg-rose-50" : "bg-slate-50"}`}
                        />
                      </div>
                      {errors.medication && <p className="text-xs text-rose-500 font-bold">{errors.medication.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {mockMeds.map((med) => (
                        <button
                          key={med}
                          type="button"
                          onClick={() => setValue("medication", med)}
                          className={`p-3 text-left text-xs font-bold rounded-xl border transition-all ${
                            formData.medication === med 
                            ? "bg-orange border-orange text-white shadow-lg shadow-orange/20" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-orange/40"
                          }`}
                        >
                          {med}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-navy font-bold">Dosage</Label>
                        <Input 
                          {...register("dosage", { required: "Dosage is required" })}
                          placeholder="e.g. 500mg" 
                          className={errors.dosage ? "border-rose-500 bg-rose-50" : "bg-slate-50"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-navy font-bold">Frequency</Label>
                        <Input 
                          {...register("frequency", { required: "Frequency is required" })}
                          placeholder="e.g. TDS (3x daily)" 
                          className={errors.frequency ? "border-rose-500 bg-rose-50" : "bg-slate-50"}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-navy font-bold">Duration</Label>
                      <Input 
                        {...register("duration", { required: "Duration is required" })}
                        placeholder="e.g. 7 days" 
                        className={errors.duration ? "border-rose-500 bg-rose-50" : "bg-slate-50"}
                      />
                    </div>

                    <div className="p-6 bg-orange/5 rounded-2xl border border-orange/10">
                      <h4 className="text-sm font-bold text-navy mb-2">Clinical Preview</h4>
                      <p className="text-sm text-slate-600 italic">
                        "{formData.medication} - {formData.dosage} to be taken {formData.frequency} for {formData.duration}."
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange/20 blur-3xl rounded-full" />
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <p className="text-[10px] font-bold text-orange uppercase tracking-[0.2em] mb-1">Prescription Summary</p>
                            <h3 className="text-2xl font-display font-bold">{formData.patientName}</h3>
                            <p className="text-xs text-white/40 font-mono">{formData.nhsNumber}</p>
                          </div>
                          <Badge className="bg-green-500 text-white border-none">Ready to Sync</Badge>
                        </div>

                        <div className="space-y-4 border-t border-white/10 pt-6">
                          <div className="flex justify-between">
                            <span className="text-white/40 text-sm">Medication</span>
                            <span className="font-bold">{formData.medication}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/40 text-sm">Dosage</span>
                            <span className="font-bold">{formData.dosage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/40 text-sm">Instructions</span>
                            <span className="font-bold">{formData.frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/40 text-sm">Duration</span>
                            <span className="font-bold">{formData.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                      <CheckCircle2 className="text-green-600 w-6 h-6" />
                      <p className="text-sm text-green-800 font-medium">
                        Prescription validated against GPhC safety protocols.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer Actions inside the form for reliability */}
              <div className="mt-8 pt-8 border-t border-slate-100 flex gap-4">
                {step > 1 && (
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={prevStep}
                    disabled={isSyncing}
                    className="flex-1 h-14 border-slate-200 font-bold text-navy rounded-2xl"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="flex-[2] h-14 bg-navy hover:bg-navy/90 text-white font-bold shadow-xl shadow-navy/20 rounded-2xl"
                  >
                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={isSyncing}
                    className="flex-[2] h-14 bg-orange hover:bg-orange/90 text-white font-bold shadow-xl shadow-orange/20 rounded-2xl"
                  >
                    {isSyncing ? (
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>
                          {syncStatus === "payment" && "Processing Payment..."}
                          {syncStatus === "dispensing" && "Dispensing Medication..."}
                          {syncStatus === "syncing" && "Syncing with PMR..."}
                          {syncStatus === "success" && (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                              <span>Dispensed Successfully!</span>
                            </div>
                          )}
                        </span>
                      </div>
                    ) : (
                      "Pay & Dispense"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
