"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Award, Landmark, ShieldCheck, ChevronDown, Check, ArrowRight, 
  HelpCircle, FileText, CheckCircle2, Star, Percent, Sparkles, ShieldAlert,
  ArrowUpRight, HeartHandshake, PhoneCall, MessageSquare, Compass, Info, Lock, MapPin
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EMICalculator from "@/components/EMICalculator";
import CompareWidget from "@/components/CompareWidget";

// Custom counter hook for smooth numbers rolling (Stripe-like microinteraction)
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    const duration = 600; // ms
    const startTime = performance.now();
    
    let animationFrameId: number;
    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out exponential curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (end - start) * ease);
      setDisplayValue(current);
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };
    animationFrameId = requestAnimationFrame(updateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(displayValue)}</span>;
}

// Sanction ticker data for real-time social proof (CRO Trust engine)
const liveSanctions = [
  { text: "SBI matched 8.40% for ₹52L loan on Super Corridor plot", time: "2 mins ago" },
  { text: "HDFC pre-approved ₹78L for Vijay Nagar Apartment", time: "5 mins ago" },
  { text: "ICICI sanctioned ₹1.2 Cr for luxury villa near Bypass road", time: "12 mins ago" },
  { text: "Kotak waived processing fees for salaried buyer in Nipania", time: "18 mins ago" }
];

export default function HomeLoan() {
  // Eligibility state
  const [income, setIncome] = useState(120000); // Net monthly income
  const [obligations, setObligations] = useState(15000); // Existing monthly EMIs
  const [tenureYears, setTenureYears] = useState(20);

  // Resulting eligibility variables
  const maxEMI = Math.max(0, Math.round((income * 0.5) - obligations));
  const r = 8.45 / 12 / 100;
  const n = tenureYears * 12;
  const eligibleAmount = Math.round(maxEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));

  // Dynamic Indore real estate matching based on purchase power
  const getIndorePropertyMatch = (power: number) => {
    const totalCap = power / 0.8; // Assuming 80% LTV, total budget cap
    if (totalCap < 3500000) {
      return "perfect for residential plots in Super Corridor extension or Dewas Road.";
    } else if (totalCap < 7500000) {
      return "ideal for premium 2 BHK apartments in Nipania or ready-to-move plots in Kanadia.";
    } else if (totalCap < 15000000) {
      return "great for luxury 3 BHK flats in Vijay Nagar or custom builder floors in scheme 140.";
    } else {
      return "designed for premium independent villas in Bypass townships or high-end properties in Indore's posh colonies.";
    }
  };

  // State for progressive form funnel (CRO - Multi-step progressive disclosure)
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    employmentType: "salaried",
    customIncome: "120000",
    customObligations: "15000",
    propertyStage: "selected",
    propertyLocation: "Indore",
    purpose: "apartment",
    fullName: "",
    email: "",
    phone: "",
    communicationPreference: "whatsapp" // whatsapp, call, advisor
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Bank bids comparison state
  const [selectedBanksForCompare, setSelectedBanksForCompare] = useState<string[]>([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Live sanction marquee index
  const [marqueeIndex, setMarqueeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarqueeIndex((prev) => (prev + 1) % liveSanctions.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert("Please fill in your contact information.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormStep(4); // Success step
    }, 1200);
  };

  const handleBankSelectForCompare = (bankName: string) => {
    setSelectedBanksForCompare((prev) => {
      if (prev.includes(bankName)) {
        return prev.filter((b) => b !== bankName);
      }
      if (prev.length >= 3) {
        alert("You can compare a maximum of 3 banks side-by-side.");
        return prev;
      }
      return [...prev, bankName];
    });
  };

  const bankBids = [
    {
      bank: "State Bank of India",
      rate: 8.40,
      fee: "0.35% (Max ₹10k)",
      rating: "4.8",
      logo: "SBI",
      approvalTime: "5 Days",
      prepayment: "Nil",
      bgClass: "bg-blue-600",
      tag: "Lowest Rate"
    },
    {
      bank: "HDFC Bank",
      rate: 8.45,
      fee: "0.25% (Max ₹7.5k)",
      rating: "4.7",
      logo: "HDFC",
      approvalTime: "4 Days",
      prepayment: "Nil",
      bgClass: "bg-blue-900",
      tag: "Fastest Sanction"
    },
    {
      bank: "ICICI Bank",
      rate: 8.50,
      fee: "₹5,000 Flat",
      rating: "4.6",
      logo: "ICICI",
      approvalTime: "6 Days",
      prepayment: "Nil",
      bgClass: "bg-orange-600",
      tag: "Lowest Fees"
    },
    {
      bank: "Kotak Mahindra",
      rate: 8.55,
      fee: "Zero Processing",
      rating: "4.5",
      logo: "Kotak",
      approvalTime: "5 Days",
      prepayment: "Nil",
      bgClass: "bg-red-600",
      tag: "OAM Direct Special"
    }
  ];

  const loanFaqs = [
    {
      q: "What is the processing fee charged by Online Awas Mela?",
      a: "Online Awas Mela charges exactly ₹0 for home loan coordination. We function as a direct integration gateway. Any processing fees shown are levied directly by the lending bank according to their corporate tiers."
    },
    {
      q: "Will checking my eligibility on OAM impact my CIBIL score?",
      a: "Absolutely not. Checking your eligibility and matching bids on OAM is a 'soft check' run on internal risk models. We do not initiate a hard inquiry with credit bureaus until you consent and select a specific bank bid."
    },
    {
      q: "What is the FOIR ratio and how does it limit my borrowing?",
      a: "FOIR (Fixed Obligation to Income Ratio) is the metric banks use to gauge repayment capacity. Usually capped at 50% for standard salaries, it guarantees that all your monthly EMIs (existing + new) do not exceed half of your net monthly earnings."
    },
    {
      q: "What documents will I need to compile for the single-gateway process?",
      a: "Salaried applicants need 3 months of payslips, 2 years of Form 16, and 6 months of bank statements showing salary credit. Self-employed applicants require 3 years of audited ITR reports, GST registers, and business address validations."
    }
  ];

  return (
    <div className="bg-light min-h-screen text-dark relative font-sans">
      <Navbar />

      {/* Real-time Sanction Ticker (CRO Trust Anchor) */}
      <div className="bg-dark border-b border-white/5 py-2.5 text-xs overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-light animate-ping" />
            <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Live Bidding Network:</span>
          </div>
          <div className="flex-1 px-4 overflow-hidden relative h-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={marqueeIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-white/80 font-medium truncate flex items-center gap-2"
              >
                <Sparkles className="h-3 w-3 text-gold shrink-0" />
                <span>{liveSanctions[marqueeIndex].text}</span>
                <span className="text-[9px] text-white/40 font-semibold bg-white/5 px-1.5 py-0.5 rounded">
                  {liveSanctions[marqueeIndex].time}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden md:flex items-center gap-4 text-white/55 text-[10px] font-bold">
            <span className="flex items-center gap-1">🏢 HQ: Sukhliya, Indore</span>
            <span>🛡️ RBI Regulated Partners</span>
          </div>
        </div>
      </div>

      {/* Apple & Tesla-inspired Editorial Hero Experience */}
      <section className="relative overflow-hidden py-16 lg:py-28 gradient-bg">
        {/* Abstract Light Orbs */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[80px] -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Value Proposition */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-[11px] font-bold text-primary border border-primary/20"
              >
                <Percent className="h-3 w-3" />
                <span>Direct Banker Rates — Starting at 8.40% p.a.</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1] text-dark"
              >
                Skip brokers. <br />
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Get banks to bid for you.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-sm text-dark/60 leading-relaxed max-w-xl font-medium"
              >
                Online Awas Mela consolidates your financial package once and sends it securely to our direct bank integrations. SBI, HDFC, ICICI, and Kotak submit bids. You choose the lowest rate.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 flex flex-wrap gap-4 w-full sm:w-auto"
              >
                <a
                  href="#eligibility-checker"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-xs font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all hover:scale-[1.02] w-full sm:w-auto cursor-pointer"
                >
                  Estimate Pre-Approved Limit
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://demo-oam.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 px-6 py-4 text-xs font-bold text-dark hover:border-gray-300 transition-all hover:scale-[1.02] w-full sm:w-auto cursor-pointer shadow-sm"
                >
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  RERA Verified Properties Only
                </a>
                <a
                  href="tel:+919111239024"
                  className="flex items-center justify-center gap-2 rounded-xl bg-light px-6 py-4 text-xs font-bold text-dark/70 hover:bg-gray-250 transition-all hover:scale-[1.02] w-full sm:w-auto cursor-pointer"
                >
                  <PhoneCall className="h-4 w-4 text-primary shrink-0" />
                  Hotline: +91 91112 39024
                </a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-200/60 pt-8 w-full max-w-lg"
              >
                <div>
                  <h3 className="text-xl font-black text-dark">0%</h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-dark/40 mt-1">Surcharge or Fees</p>
                </div>
                <div>
                  <h3 className="text-xl font-black text-dark">100%</h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-dark/40 mt-1">Spam Protection</p>
                </div>
                <div>
                  <h3 className="text-xl font-black text-dark">5 Days</h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-dark/40 mt-1">Sanction Time</p>
                </div>
              </motion.div>
            </div>

            {/* Premium Card Graphic (Airbnb Feel) */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative rounded-3xl border border-gray-200/50 bg-white p-6 shadow-2xl shadow-dark/5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-gold/5 pointer-events-none" />
                
                {/* Simulated Loan Summary Card */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-dark">OAM Verified Pre-Appraisal</h4>
                      <p className="text-[10px] text-dark/40 mt-0.5">Ready for bank disbursement</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[9px] font-black text-primary uppercase">Active</span>
                </div>

                <div className="py-6 flex flex-col gap-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Total Financing Power</span>
                    <h3 className="text-3xl font-black text-dark mt-1 tracking-tight">₹84,50,000</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-light p-3 rounded-xl border border-gray-100">
                      <span className="text-[9px] font-bold text-dark/40 uppercase">Pre-Approved Rate</span>
                      <p className="text-xs font-black text-primary mt-1">8.40% p.a.</p>
                    </div>
                    <div className="bg-light p-3 rounded-xl border border-gray-100">
                      <span className="text-[9px] font-bold text-dark/40 uppercase">Estimated EMI</span>
                      <p className="text-xs font-black text-dark mt-1">₹72,854/mo</p>
                    </div>
                  </div>
                </div>

                {/* Direct bank bid simulation items */}
                <div className="border-t border-gray-100 pt-5 space-y-3">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-dark/40 block mb-1">Direct Banker Offers matched:</span>
                  
                  <div className="flex items-center justify-between text-xs bg-light p-2.5 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center text-[9px] font-extrabold text-white">SBI</div>
                      <span className="font-bold text-dark text-[11px]">SBI Direct Bid</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-primary block text-[11px]">8.40%</span>
                      <span className="text-[8px] text-dark/40 font-semibold block">0.35% Processing Fee</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-light p-2.5 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-blue-900 flex items-center justify-center text-[9px] font-extrabold text-white">HDFC</div>
                      <span className="font-bold text-dark text-[11px]">HDFC Match Bid</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-primary block text-[11px]">8.45%</span>
                      <span className="text-[8px] text-dark/40 font-semibold block">₹7,500 Flat Fee</span>
                    </div>
                  </div>
                </div>

                <a 
                  href="#eligibility-checker" 
                  className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl bg-dark py-3.5 text-xs font-bold text-white hover:bg-primary transition-all shadow-md"
                >
                  Personalize Your Offer
                  <ArrowRight className="h-3 w-3" />
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Eligibility & Indore-Specific Purchase Power Checker */}
      <section id="eligibility-checker" className="bg-white py-20 border-y border-gray-200/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Decision Science Engine
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-dark sm:text-4xl">
              Home Loan Eligibility Visualizer
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xs text-dark/50 leading-relaxed font-semibold">
              Adjust your financial thresholds. We dynamically calculate your pre-approved purchase power and translate it directly to what you can buy in Indore.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
            
            {/* Input controls (Sliders) */}
            <div className="lg:col-span-7 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-dark/5 flex flex-col justify-between gap-8">
              <h3 className="text-xs font-black uppercase tracking-wider text-dark/45 border-b border-gray-150 pb-3 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                <span>Adjust Financial Inputs</span>
              </h3>

              {/* Net Monthly Income Slider */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center text-xs font-bold text-dark">
                  <span className="flex items-center gap-1">Net Monthly Income <span className="inline-flex cursor-help text-dark/30 hover:text-dark" title="Your post-tax monthly bank salary credit"><Info className="h-3 w-3" /></span></span>
                  <span className="text-primary font-black text-sm">
                    {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(income)}
                  </span>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={500000}
                  step={5000}
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="mt-3.5 h-1.5 w-full cursor-pointer rounded-lg bg-slate-100 accent-primary"
                />
                <div className="mt-1.5 flex justify-between text-[9px] font-bold text-dark/40">
                  <span>₹30,000</span>
                  <span>₹5 Lakhs</span>
                </div>
                {/* Dynamic Micro-Feedback Note (CRO trigger) */}
                <div className="mt-2.5 rounded-lg bg-primary/5 px-2.5 py-1.5 text-[10px] font-bold text-primary flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  <span>
                    {income >= 100000 
                      ? "Tier-A Enterprise bracket. Qualifies you for sub-8.45% rates." 
                      : "Standard salary bracket. Qualifies you for all major national banks."}
                  </span>
                </div>
              </div>

              {/* Existing EMI Obligation Slider */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center text-xs font-bold text-dark">
                  <span className="flex items-center gap-1">Existing Monthly obligations <span className="inline-flex cursor-help text-dark/30 hover:text-dark" title="All ongoing EMIs like auto, personal or business loans"><Info className="h-3 w-3" /></span></span>
                  <span className="text-red-500 font-black text-sm">
                    {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(obligations)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200000}
                  step={2000}
                  value={obligations}
                  onChange={(e) => setObligations(Number(e.target.value))}
                  className="mt-3.5 h-1.5 w-full cursor-pointer rounded-lg bg-slate-100 accent-primary"
                />
                <div className="mt-1.5 flex justify-between text-[9px] font-bold text-dark/40">
                  <span>₹0 (No debt)</span>
                  <span>₹2 Lakhs</span>
                </div>
                {/* Critical warning if obligations are high relative to income */}
                {obligations > income * 0.4 && (
                  <div className="mt-2.5 rounded-lg bg-red-50 px-2.5 py-1.5 text-[10px] font-bold text-red-500 flex items-center gap-1.5 border border-red-100">
                    <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                    <span>Your ongoing obligations exceed 40% of income. This restricts loan approval ratios.</span>
                  </div>
                )}
              </div>

              {/* Tenure Select Slider */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center text-xs font-bold text-dark">
                  <span>Desired Loan Tenure</span>
                  <span className="text-primary font-black text-sm">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={30}
                  step={5}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="mt-3.5 h-1.5 w-full cursor-pointer rounded-lg bg-slate-100 accent-primary"
                />
                <div className="mt-1.5 flex justify-between text-[9px] font-bold text-dark/40">
                  <span>10 Years</span>
                  <span>30 Years (Lowest EMI)</span>
                </div>
              </div>
            </div>

            {/* Results & Indore Property Map (Tesla style) */}
            <div className="lg:col-span-5 rounded-3xl bg-dark text-white p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)_0%,_transparent_65%)] opacity-20 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Estimated Borrowing Capacity
                </span>
                <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-primary-light">
                  <AnimatedNumber value={eligibleAmount} />
                </h3>
                <span className="text-[9px] text-white/40 mt-1 font-semibold">Calculated on standard 8.45% FOIR threshold</span>
              </div>

              <div className="relative z-10 my-6 border-t border-white/10" />

              <div className="relative z-10 flex flex-col gap-4 text-xs font-medium">
                <div className="flex justify-between text-white/60">
                  <span>Maximum Allowable EMI</span>
                  <span className="font-bold text-white">
                    {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(maxEMI)}/mo
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Estimated Downpayment (20%)</span>
                  <span className="font-bold text-white">
                    {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.round(eligibleAmount * 0.25))}
                  </span>
                </div>
                <div className="flex justify-between text-white/60 border-t border-white/10 pt-4">
                  <span>Total Buying Budget</span>
                  <span className="font-black text-primary-light text-sm">
                    {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.round(eligibleAmount / 0.8))}
                  </span>
                </div>
              </div>

              {/* Buying Power Property Translation Section (CRO decision bridging) */}
              <div className="relative z-10 mt-6 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <span className="text-[9px] font-black uppercase text-gold tracking-wider flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5" />
                  <span>Indore Buying Power Match</span>
                </span>
                <p className="text-[11px] text-white/80 leading-relaxed font-semibold mt-1.5">
                  Your purchase power is {getIndorePropertyMatch(eligibleAmount)}
                </p>
              </div>

              <a
                href="#apply-funnel"
                onClick={() => {
                  handleInputChange("customIncome", income.toString());
                  handleInputChange("customObligations", obligations.toString());
                }}
                className="relative z-10 mt-8 flex items-center justify-center gap-1.5 rounded-xl bg-primary py-3.5 text-xs font-bold text-white hover:bg-primary-dark transition-all hover:scale-[1.02] shadow-lg shadow-primary/20 cursor-pointer"
              >
                Lock this limit & Apply Bids
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>

          {/* PolicyBazaar-style Dynamic Bids Grid */}
          {eligibleAmount > 0 && (
            <div className="mt-16 border-t border-gray-150 pt-16">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-md font-black uppercase tracking-wider text-dark/50 text-center md:text-left">
                    Direct Partner Banker Match
                  </h3>
                  <p className="text-[11px] text-dark/40 font-semibold mt-1 text-center md:text-left">
                    Select up to 3 banks to perform a detailed side-by-side comparison.
                  </p>
                </div>
                
                {selectedBanksForCompare.length > 0 && (
                  <button
                    onClick={() => setIsCompareDrawerOpen(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-dark px-4 py-2 text-xs font-bold text-white hover:bg-primary transition-all"
                  >
                    Compare Selected ({selectedBanksForCompare.length})
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {bankBids.map((bid, idx) => {
                  const bidEmi = Math.round(
                    (eligibleAmount * (bid.rate / 12 / 100) * Math.pow(1 + (bid.rate / 12 / 100), tenureYears * 12)) /
                    (Math.pow(1 + (bid.rate / 12 / 100), tenureYears * 12) - 1)
                  );
                  const isChecked = selectedBanksForCompare.includes(bid.bank);

                  return (
                    <div
                      key={idx}
                      className={`flex flex-col lg:flex-row items-center justify-between p-5 rounded-2xl border ${
                        isChecked ? "border-primary bg-primary/5" : "border-gray-200 bg-white"
                      } hover:shadow-md transition-all gap-4 relative`}
                    >
                      {/* Selection checkbox */}
                      <button
                        onClick={() => handleBankSelectForCompare(bid.bank)}
                        className={`absolute top-4 left-4 lg:relative lg:top-auto lg:left-auto h-5 w-5 rounded border ${
                          isChecked ? "bg-primary border-primary text-white" : "border-gray-300 bg-white"
                        } flex items-center justify-center hover:border-primary transition-colors`}
                      >
                        {isChecked && <Check className="h-3.5 w-3.5" />}
                      </button>

                      {/* Bank Logo */}
                      <div className="flex items-center gap-3 w-full lg:w-1/4 pl-6 lg:pl-0">
                        <div className={`h-11 w-11 rounded-xl ${bid.bgClass} text-white font-extrabold text-xs flex items-center justify-center shadow-sm shrink-0`}>
                          {bid.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-black text-dark">{bid.bank}</h4>
                            <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                              {bid.tag}
                            </span>
                          </div>
                          <span className="text-[10px] text-dark/45 font-semibold flex items-center gap-0.5 mt-0.5">
                            <Star className="h-3 w-3 fill-gold text-gold" />
                            {bid.rating} Rating
                          </span>
                        </div>
                      </div>

                      {/* Interest Rate */}
                      <div className="flex flex-col items-center lg:items-start w-full sm:w-1/4 lg:w-1/6">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Interest Rate</span>
                        <span className="text-xs font-black text-primary mt-1 flex items-center gap-0.5">
                          <Percent className="h-3.5 w-3.5" />
                          {bid.rate.toFixed(2)}% p.a.
                        </span>
                      </div>

                      {/* Est. EMI */}
                      <div className="flex flex-col items-center lg:items-start w-full sm:w-1/4 lg:w-1/6">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Monthly EMI</span>
                        <span className="text-xs font-black text-dark mt-1">
                          {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(bidEmi)}/mo
                        </span>
                      </div>

                      {/* Processing Fees */}
                      <div className="flex flex-col items-center lg:items-start w-full sm:w-1/4 lg:w-1/6">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Processing Fee</span>
                        <span className="text-xs font-bold text-dark/70 mt-1">
                          {bid.fee}
                        </span>
                      </div>

                      {/* Action */}
                      <div className="flex items-center gap-2 w-full lg:w-auto">
                        <a
                          href="#apply-funnel"
                          className="rounded-xl bg-dark hover:bg-primary text-white text-xs font-bold px-5 py-2.5 shadow-sm transition-all w-full lg:w-auto text-center cursor-pointer"
                        >
                          Sanction Offer
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Side-by-side Comparative Bank Drawer (PolicyBazaar-style) */}
      <AnimatePresence>
        {isCompareDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareDrawerOpen(false)}
              className="fixed inset-0 bg-black z-[100]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-[101] rounded-t-3xl max-h-[85vh] overflow-y-auto"
            >
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between border-b border-gray-150 pb-5 mb-6">
                  <div>
                    <h3 className="text-md font-black text-dark uppercase tracking-wider">Lender Side-by-Side Comparison</h3>
                    <p className="text-[11px] text-dark/50">Analyze terms to make an informed, spam-free decision.</p>
                  </div>
                  <button
                    onClick={() => setIsCompareDrawerOpen(false)}
                    className="rounded-xl border border-gray-200 bg-light p-2 text-dark/50 hover:text-dark hover:border-gray-300 transition-all font-bold text-xs"
                  >
                    Close Compare
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedBanksForCompare.map((bankName) => {
                    const bid = bankBids.find((b) => b.bank === bankName);
                    if (!bid) return null;
                    const emi = Math.round(
                      (eligibleAmount * (bid.rate / 12 / 100) * Math.pow(1 + (bid.rate / 12 / 100), tenureYears * 12)) /
                      (Math.pow(1 + (bid.rate / 12 / 100), tenureYears * 12) - 1)
                    );
                    return (
                      <div key={bid.bank} className="rounded-2xl border border-gray-250 p-5 bg-white shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                            <div className={`h-10 w-10 rounded-xl ${bid.bgClass} text-white font-black text-xs flex items-center justify-center`}>
                              {bid.logo}
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-dark">{bid.bank}</h4>
                              <p className="text-[9px] text-primary font-bold">{bid.tag}</p>
                            </div>
                          </div>

                          <div className="space-y-3.5 text-xs">
                            <div className="flex justify-between">
                              <span className="text-dark/45 font-semibold">Interest Rate</span>
                              <span className="font-black text-primary">{bid.rate}% p.a.</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-dark/45 font-semibold">Estimated EMI</span>
                              <span className="font-black text-dark">
                                {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(emi)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-dark/45 font-semibold">Processing Fee</span>
                              <span className="font-bold text-dark/70">{bid.fee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-dark/45 font-semibold">Approval Speed</span>
                              <span className="font-bold text-dark/70">{bid.approvalTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-dark/45 font-semibold">Prepayment Charges</span>
                              <span className="font-bold text-dark/70">{bid.prepayment}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8">
                          <a
                            href="#apply-funnel"
                            onClick={() => setIsCompareDrawerOpen(false)}
                            className="block text-center rounded-xl bg-dark hover:bg-primary text-white text-xs font-bold py-3.5 transition-all w-full cursor-pointer"
                          >
                            Apply Sanction Offer
                          </a>
                        </div>
                      </div>
                    );
                  })}
                  {/* Empty state slots inside compare modal */}
                  {Array.from({ length: Math.max(0, 3 - selectedBanksForCompare.length) }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-dashed border-gray-200 p-5 flex flex-col items-center justify-center text-center text-dark/30 min-h-[220px]">
                      <Landmark className="h-8 w-8 text-dark/20 mb-2" />
                      <p className="text-[11px] font-bold">Slot Available</p>
                      <p className="text-[9px] max-w-[150px] mt-1 text-dark/40">Select another lender match from the bids grid to compare.</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Embedded High-Performance EMI Calculator Section */}
      <section className="py-20 lg:py-28 bg-light border-b border-gray-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Precision Calculator</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl text-dark">Amortization Simulator</h2>
          </div>
          <EMICalculator />
        </div>
      </section>

      {/* Multi-Step Progressive Profiling Lead Funnel (Apple simplicity + Stripe focus) */}
      <section id="apply-funnel" className="py-20 lg:py-32 scroll-mt-20 relative bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3.5 py-1 text-[10px] font-bold text-primary border border-primary/20 uppercase tracking-widest">
              <Lock className="h-3 w-3" /> Secure Gateway Coordination
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-dark sm:text-4xl">
              Sanction Bidding Request
            </h2>
            <p className="mx-auto mt-3 max-w-md text-xs text-dark/50 font-semibold leading-relaxed">
              Verify your records once. We compile and dispatch bids securely. Credit agency soft pulls only — no spam guarantee.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-xl shadow-dark/5 relative overflow-hidden">
            
            {/* Steps Progress Header */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-150 pb-5">
              <div className="flex gap-2">
                {[1, 2, 3].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`h-2 w-12 rounded-full transition-all duration-300 ${
                      formStep >= stepNum 
                        ? "bg-primary" 
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-dark/40">
                {formStep < 4 ? `Step ${formStep} of 3` : "Request Complete"}
              </span>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: FINANCIAL CLARITY */}
                {formStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Employment Status</label>
                      <div className="grid grid-cols-2 gap-3">
                        {["salaried", "self-employed"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleInputChange("employmentType", type)}
                            className={`py-3.5 px-4 rounded-xl border text-xs font-bold text-center capitalize transition-all ${
                              formData.employmentType === type
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-gray-200 bg-white text-dark/65 hover:border-gray-300"
                            }`}
                          >
                            {type.replace("-", " ")}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Monthly Income (INR)</label>
                        <input
                          type="number"
                          placeholder="Monthly Salary"
                          value={formData.customIncome}
                          onChange={(e) => handleInputChange("customIncome", e.target.value)}
                          className="mt-2 w-full rounded-xl bg-white border border-gray-250 px-4 py-3 text-xs text-dark focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Current Monthly EMIs</label>
                        <input
                          type="number"
                          placeholder="Ongoing EMIs"
                          value={formData.customObligations}
                          onChange={(e) => handleInputChange("customObligations", e.target.value)}
                          className="mt-2 w-full rounded-xl bg-white border border-gray-250 px-4 py-3 text-xs text-dark focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="w-full mt-8 rounded-xl bg-dark text-white font-bold py-3.5 text-xs flex items-center justify-center gap-1.5 hover:bg-primary transition-all cursor-pointer"
                    >
                      Next Step: Property Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: PROPERTY PREFERENCE */}
                {formStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Property Search Stage</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "selected", label: "Selected Home" },
                          { id: "searching", label: "Searching" },
                          { id: "balance-transfer", label: "Balance Transfer" }
                        ].map((stage) => (
                          <button
                            key={stage.id}
                            type="button"
                            onClick={() => handleInputChange("propertyStage", stage.id)}
                            className={`py-3.5 px-2.5 rounded-xl border text-[11px] font-bold text-center transition-all leading-tight ${
                              formData.propertyStage === stage.id
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-gray-200 bg-white text-dark/65 hover:border-gray-300"
                            }`}
                          >
                            {stage.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">City of Purchase</label>
                        <select
                          value={formData.propertyLocation}
                          onChange={(e) => handleInputChange("propertyLocation", e.target.value)}
                          className="mt-2 w-full rounded-xl bg-white border border-gray-250 px-4 py-3 text-xs text-dark focus:border-primary focus:outline-none"
                        >
                          <option value="Indore">Indore</option>
                          <option value="Bhopal">Bhopal</option>
                          <option value="Ujjain">Ujjain</option>
                          <option value="Dewas">Dewas</option>
                          <option value="Other">Outside MP</option>
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Loan Purpose Type</label>
                        <select
                          value={formData.purpose}
                          onChange={(e) => handleInputChange("purpose", e.target.value)}
                          className="mt-2 w-full rounded-xl bg-white border border-gray-250 px-4 py-3 text-xs text-dark focus:border-primary focus:outline-none"
                        >
                          <option value="plot">Plot Purchase</option>
                          <option value="apartment">Apartment / Villa purchase</option>
                          <option value="construction">Home Construction</option>
                          <option value="commercial">Commercial Space</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="w-1/3 rounded-xl border border-gray-200 bg-white text-dark/70 font-bold py-3.5 text-xs hover:border-gray-300 transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormStep(3)}
                        className="flex-1 rounded-xl bg-dark text-white font-bold py-3.5 text-xs flex items-center justify-center gap-1.5 hover:bg-primary transition-all cursor-pointer"
                      >
                        Next Step: Secure Contact
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: CONTACT VERIFICATION & ANTI-SPAM SELECTOR */}
                {formStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Your Full Name</label>
                      <input
                        type="text"
                        placeholder="Ramesh Kumar"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="mt-2 w-full rounded-xl bg-white border border-gray-250 px-4 py-3 text-xs text-dark focus:border-primary focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Email ID</label>
                        <input
                          type="email"
                          placeholder="ramesh@gmail.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="mt-2 w-full rounded-xl bg-white border border-gray-250 px-4 py-3 text-xs text-dark focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+91 91112 39024"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="mt-2 w-full rounded-xl bg-white border border-gray-250 px-4 py-3 text-xs text-dark focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Anti-spam selection selector (Critical psychological trust builder) */}
                    <div className="flex flex-col gap-2 pt-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40 flex items-center gap-1.5">
                        <span>Communication Protection Preferences</span>
                      </label>
                      
                      <div className="flex flex-col gap-2.5">
                        {[
                          {
                            id: "whatsapp",
                            label: "WhatsApp updates only (Highly Recommended)",
                            desc: "Get digital quotes and coordinates directly via chat. Zero spam phone calls.",
                            icon: MessageSquare
                          },
                          {
                            id: "call",
                            label: "Schedule a 10-minute expert call-back",
                            desc: "An OAM senior loan advisor calls to discuss your amortization timeline.",
                            icon: PhoneCall
                          },
                          {
                            id: "advisor",
                            label: "Immediate Lender Dispatch Bidding",
                            desc: "Transmit matching bids immediately to SBI, HDFC and Kotak direct desk.",
                            icon: Landmark
                          }
                        ].map((pref) => {
                          const Icon = pref.icon;
                          const isSelected = formData.communicationPreference === pref.id;
                          return (
                            <button
                              key={pref.id}
                              type="button"
                              onClick={() => handleInputChange("communicationPreference", pref.id)}
                              className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                                isSelected 
                                  ? "border-primary bg-primary/5 text-dark" 
                                  : "border-gray-200 bg-white text-dark/70 hover:border-gray-300"
                              }`}
                            >
                              <div className={`mt-0.5 rounded p-1.5 ${isSelected ? "bg-primary/20 text-primary" : "bg-gray-100 text-dark/40"}`}>
                                <Icon className="h-3.5 w-3.5" />
                              </div>
                              <div>
                                <span className="text-xs font-bold block">{pref.label}</span>
                                <span className="text-[9px] text-dark/45 font-medium mt-0.5 block">{pref.desc}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="w-1/3 rounded-xl border border-gray-200 bg-white text-dark/70 font-bold py-3.5 text-xs hover:border-gray-300 transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 rounded-xl bg-primary text-white font-bold py-3.5 text-xs flex items-center justify-center gap-1.5 hover:bg-primary-dark transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-primary/25"
                      >
                        {isSubmitting ? "Initiating Secure Sanction..." : "Send Secure Bid Request"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS / INSTANT WHATSAPP HANDSHAKE */}
                {formStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-6 flex flex-col items-center"
                  >
                    <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8 animate-bounce" />
                    </div>

                    <h3 className="text-xl font-black text-dark">Pre-Appraisal Sanction Dispatched</h3>
                    <p className="text-xs text-dark/50 max-w-sm mt-3 font-semibold leading-relaxed mx-auto">
                      Your single-gateway documentation pipeline has initialized. Partner banks (SBI, HDFC, Kotak) have received direct matching bids.
                    </p>

                    <div className="mt-8 bg-light rounded-2xl border border-gray-200 p-5 text-left w-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-11 w-11 rounded-full bg-primary/25 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary shrink-0">
                          OAM
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-dark">Dheeraj Patidar</h4>
                          <p className="text-[10px] text-dark/45 font-semibold">Senior Mortgage Coordinator • Response: &lt;5 mins</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-dark/60 leading-relaxed font-semibold">
                        "Hello {formData.fullName}! I've compiled your matching lender quotes. Let's finalise your sanctions without spam calls. Click below to connect instantly on WhatsApp."
                      </p>

                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <a
                          href={`https://wa.me/919111239024?text=Hi%20Dheeraj,%20I%20just%20completed%20the%20OAM%20home%20loan%20eligibility%20check%20for%20my%20property%20search.%250A%250AName:%20${formData.fullName}%250AIncome:%20Rs.%20${formData.customIncome}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold py-3.5 transition-all shadow-md shadow-primary/15"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Chat via WhatsApp (Instant)
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              employmentType: "salaried",
                              customIncome: "120000",
                              customObligations: "15000",
                              propertyStage: "selected",
                              propertyLocation: "Indore",
                              purpose: "apartment",
                              fullName: "",
                              email: "",
                              phone: "",
                              communicationPreference: "whatsapp"
                            });
                            setFormStep(1);
                            setSubmitSuccess(false);
                          }}
                          className="px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-dark/60 font-bold text-xs hover:bg-light transition-all"
                        >
                          New Calculation
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>

      {/* Trust & Proof Section (CRO Assurance Engine) */}
      <section className="py-20 bg-light border-y border-gray-200/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Solid Proof</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl text-dark">Trust System & Safeguards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-gray-200/70 bg-white p-6 shadow-sm flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-dark">Credit Safeguard Pulls</h3>
                <p className="mt-2 text-xs text-dark/50 leading-relaxed font-semibold">
                  Checking matching rates on OAM is completely score-neutral. We never initiate hard pulls without explicit consent.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200/70 bg-white p-6 shadow-sm flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-dark">Indore HQ Office</h3>
                <p className="mt-2 text-xs text-dark/50 leading-relaxed font-semibold">
                  Visit us face-to-face: A304 Aditya Gateway, Sukhliya, Indore, MP 452003. We are 100% locally operated.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200/70 bg-white p-6 shadow-sm flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-dark">Indore Appraisal Pre-Cleared</h3>
                <p className="mt-2 text-xs text-dark/50 leading-relaxed font-semibold">
                  All property listings marked verified on OAM contain pre-appraised title logs from SBI and HDFC for immediate sanction releases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Accordion Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">FAQs</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl text-dark">Clarifications & Guidelines</h2>
          </div>

          <div className="flex flex-col gap-4">
            {loanFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-gray-300 transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between text-left focus:outline-none"
                >
                  <h3 className="text-xs font-extrabold text-dark pr-4">{faq.q}</h3>
                  <ChevronDown
                    className={`h-4.5 w-4.5 text-dark/40 transition-transform duration-250 shrink-0 ${
                      openFaq === idx ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-4 text-xs text-dark/50 leading-relaxed font-semibold border-t border-gray-150 pt-4">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CompareWidget />
    </div>
  );
}
