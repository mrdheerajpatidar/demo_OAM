"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Award, Landmark, ShieldCheck, ChevronDown, Check, ArrowRight, DollarSign, HelpCircle, FileText, CheckCircle2, Star, Percent } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EMICalculator from "@/components/EMICalculator";
import CompareWidget from "@/components/CompareWidget";

export default function HomeLoan() {
  // Eligibility states
  const [income, setIncome] = useState(100000); // Monthly income in Rs
  const [obligations, setObligations] = useState(20000); // Existing monthly EMIs
  const [tenureYears, setTenureYears] = useState(20);

  // Resulting eligibility variables
  const maxEMI = Math.max(0, Math.round((income * 0.5) - obligations));
  const r = 8.5 / 12 / 100;
  const n = tenureYears * 12;
  const eligibleAmount = Math.round(maxEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));

  // Apply Form State
  const [applyName, setApplyName] = useState("");
  const [applyPhone, setApplyPhone] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applyIncome, setApplyIncome] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyName || !applyPhone || !applyEmail || !applyIncome) {
      alert("Please fill in all details.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setApplyName("");
      setApplyPhone("");
      setApplyEmail("");
      setApplyIncome("");
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const formatRawCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Dynamic lender bids based on sliders (PolicyBazaar style)
  const calculateLenderEmi = (principal: number, interestRate: number) => {
    if (principal <= 0) return 0;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenureYears * 12;
    return Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const bankBids = [
    {
      bank: "State Bank of India",
      rate: 8.40,
      fee: "0.35% (Max ₹10k)",
      rating: "4.8/5",
      logo: "SBI"
    },
    {
      bank: "HDFC Bank",
      rate: 8.45,
      fee: "0.25% (Max ₹7.5k)",
      rating: "4.7/5",
      logo: "HDFC"
    },
    {
      bank: "ICICI Bank",
      rate: 8.50,
      fee: "₹5,000 Flat",
      rating: "4.6/5",
      logo: "ICICI"
    },
    {
      bank: "Kotak Mahindra",
      rate: 8.55,
      fee: "Zero Processing",
      rating: "4.5/5",
      logo: "Kotak"
    }
  ];

  const steps = [
    {
      title: "Evaluate Eligibility",
      desc: "Use our interactive checker to estimate your loan threshold based on your monthly income.",
      icon: Calculator
    },
    {
      title: "Digital Submission",
      desc: "Upload KYC, payslips, and Bank Statements once onto our encrypted secure pipeline.",
      icon: FileText
    },
    {
      title: "Bank Bid Matching",
      desc: "OAM coordinates with SBI, HDFC, ICICI and others to present competitive bidding options.",
      icon: Landmark
    },
    {
      title: "Fast-Track Approval",
      desc: "Our dedicated loan executive coordinates with the chosen bank for sanctions in under 5 days.",
      icon: Check
    }
  ];

  const benefits = [
    { title: "Starting at 8.4% p.a.", desc: "Gain access to rock-bottom direct interest rates based on your corporate tier." },
    { title: "Collateral Pre-Clearance", desc: "Properties listed on OAM possess pre-cleared appraisal certificates from major banks." },
    { title: "Single Gateway Submissions", desc: "Apply to multiple public and private lenders with a single documentation compile." },
    { title: "Zero Brokerage Surcharges", desc: "OAM financial coordination services are 100% free to buyers. Zero hidden fees." }
  ];

  const loanFaqs = [
    {
      q: "What is the processing fee charged by OAM?",
      a: "OAM charges exactly ₹0 for home loan coordination services. Any processing fee is charged directly by the lending bank according to their corporate structure."
    },
    {
      q: "What is the eligibility ratio used by banks?",
      a: "Most banks enforce a Debt-to-Income (FOIR) ratio of 50%. This means your total monthly loan obligations (including the new home loan) should not exceed 50% of your net monthly income."
    },
    {
      q: "What documentation is needed for self-employed buyers?",
      a: "Self-employed buyers need 3 years of audited balance sheet reports, Income Tax Returns (ITR files), GST registers, business address proofs, and 6 months of active bank statements."
    },
    {
      q: "Can I get a pre-approved loan before selecting a property?",
      a: "Yes! Banks can issue a 'Pre-Sanction' letter based on your credit score and salary records, giving you a clear budget bracket before selecting a home."
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-light border-b border-gray-200/40 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              ⚡ Platform Finance Gateway
            </span>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-dark sm:text-5xl lg:text-6xl leading-tight">
              Pre-Approved Loans. <br />
              <span className="text-primary">Best Rates Guaranteed.</span>
            </h1>
            <p className="mt-6 text-xs text-dark/50 leading-relaxed max-w-md font-medium">
              Maximize your buying leverage. We compile your documents once and coordinate bidding across SBI, HDFC, ICICI, and Kotak to secure sub-8.5% p.a. interest rates.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Eligibility Checker */}
      <section className="bg-white py-20 border-b border-gray-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Instant Pre-Appraisal
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              Home Loan Eligibility Checker
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-xs text-dark/50">
              Adjust income inputs to check pre-approved budget brackets and review real-time banker matches below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-center">
            {/* Input card */}
            <div className="lg:col-span-2 rounded-3xl border border-gray-250 bg-white p-6 shadow-sm flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-dark/50">Financial inputs</h3>

              {/* Monthly Income Slider */}
              <div className="flex flex-col">
                <div className="flex justify-between text-xs font-bold text-dark">
                  <span>Net Monthly Income</span>
                  <span className="text-primary font-black">{formatRawCurrency(income)}</span>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={500000}
                  step={5000}
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="mt-3 h-1.5 w-full cursor-pointer rounded-lg bg-gray-200 accent-primary"
                />
                <div className="mt-1 flex justify-between text-[9px] font-bold text-dark/40">
                  <span>₹30,000</span>
                  <span>₹5 Lakhs</span>
                </div>
              </div>

              {/* Existing EMI Obligation Slider */}
              <div className="flex flex-col">
                <div className="flex justify-between text-xs font-bold text-dark">
                  <span>Existing Monthly EMIs</span>
                  <span className="text-red-500 font-black">{formatRawCurrency(obligations)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200000}
                  step={2000}
                  value={obligations}
                  onChange={(e) => setObligations(Number(e.target.value))}
                  className="mt-3 h-1.5 w-full cursor-pointer rounded-lg bg-gray-200 accent-primary"
                />
                <div className="mt-1 flex justify-between text-[9px] font-bold text-dark/40">
                  <span>₹0</span>
                  <span>₹2 Lakhs</span>
                </div>
              </div>

              {/* Tenure Select */}
              <div className="flex flex-col">
                <div className="flex justify-between text-xs font-bold text-dark">
                  <span>Desired Loan Tenure</span>
                  <span className="text-primary font-black">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={30}
                  step={5}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="mt-3 h-1.5 w-full cursor-pointer rounded-lg bg-gray-200 accent-primary"
                />
                <div className="mt-1 flex justify-between text-[9px] font-bold text-dark/40">
                  <span>10 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Results card */}
            <div className="rounded-3xl bg-dark text-white p-6 shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)_0%,_transparent_55%)] opacity-20" />
              
              <div className="relative z-10 text-center flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Estimated Loan Cap
                </span>
                <span className="mt-2 text-3xl font-black tracking-tight text-primary">
                  {formatRawCurrency(eligibleAmount)}
                </span>
                <span className="text-[9px] text-white/40 mt-1">Calculated at standard 8.5% p.a.</span>
              </div>

              <div className="relative z-10 my-6 h-[1px] w-full bg-white/10" />

              <div className="relative z-10 flex flex-col gap-3.5 text-xs">
                <div className="flex justify-between text-white/60">
                  <span>Allowable Monthly EMI</span>
                  <span className="font-bold text-white">{formatRawCurrency(maxEMI)}/mo</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tenure Period</span>
                  <span className="font-bold text-white">{tenureYears} Years</span>
                </div>
                <div className="flex justify-between text-white/60 border-t border-white/10 pt-3.5">
                  <span>Property Purchase Power</span>
                  <span className="font-black text-primary">{formatRawCurrency(eligibleAmount / 0.8)}</span>
                </div>
              </div>

              <a
                href="#apply-loan"
                className="relative z-10 mt-8 flex items-center justify-center gap-1.5 rounded-xl bg-primary py-3.5 text-xs font-bold text-white hover:bg-primary-dark transition-all"
              >
                Fast-Track Sanction Request
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* PolicyBazaar-style banker matching panel */}
          {eligibleAmount > 0 && (
            <div className="mt-12 border-t border-gray-100 pt-12">
              <h3 className="text-xs font-black uppercase tracking-wider text-dark/50 mb-6 text-center lg:text-left">
                Direct Lender Matching Bids
              </h3>
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } }
                }}
                className="flex flex-col gap-4"
              >
                {bankBids.map((bid, idx) => {
                  const bidEmi = calculateLenderEmi(eligibleAmount, bid.rate);
                  return (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                      }}
                      whileHover={{ scale: 1.008, borderColor: "rgba(22, 163, 74, 0.25)" }}
                      className="flex flex-col lg:flex-row items-center justify-between p-5 rounded-2xl border border-gray-250 bg-light/35 gap-4 transition-all"
                    >
                      {/* Logo and Rating */}
                      <div className="flex items-center gap-4 w-full lg:w-1/4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-dark text-white font-extrabold text-xs shrink-0 shadow-sm">
                          {bid.logo}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-dark">{bid.bank}</h4>
                          <span className="text-[9px] text-dark/45 font-semibold flex items-center gap-0.5 mt-0.5">
                            <Star className="h-3 w-3 fill-gold text-gold" />
                            {bid.rating} verified
                          </span>
                        </div>
                      </div>

                      {/* Interest Rate */}
                      <div className="flex flex-col items-center lg:items-start w-full sm:w-1/3 lg:w-1/6">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Interest Rate</span>
                        <span className="text-xs font-black text-primary mt-1.5 flex items-center gap-0.5">
                          <Percent className="h-3.5 w-3.5" />
                          {bid.rate.toFixed(2)}% p.a.
                        </span>
                      </div>

                      {/* Estimated EMI */}
                      <div className="flex flex-col items-center lg:items-start w-full sm:w-1/3 lg:w-1/6">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Est. Monthly EMI</span>
                        <span className="text-xs font-black text-dark mt-1.5">
                          {formatRawCurrency(bidEmi)}/mo
                        </span>
                      </div>

                      {/* Processing Fees */}
                      <div className="flex flex-col items-center lg:items-start w-full sm:w-1/3 lg:w-1/6">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Processing Fee</span>
                        <span className="text-xs font-bold text-dark/65 mt-1.5">
                          {bid.fee}
                        </span>
                      </div>

                      {/* Apply Action */}
                      <a
                        href="#apply-loan"
                        className="rounded-xl bg-dark hover:bg-primary text-white text-xs font-bold px-5 py-2.5 shadow-sm transition-all w-full lg:w-auto text-center"
                      >
                        Select & Apply
                      </a>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-20 lg:py-28 bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EMICalculator />
        </div>
      </section>

      {/* Loan Process Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Approval Pipeline
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              Home Loan Process Workflow
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="rounded-3xl border border-gray-200/50 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5 shrink-0">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="text-xs font-extrabold text-dark">{step.title}</h3>
                  <p className="mt-2 text-xs text-dark/50 leading-relaxed font-medium">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Loan Benefits Section */}
      <section className="bg-light py-20 lg:py-28 border-y border-gray-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              The OAM Advantage
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              Home Loan Benefits
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-4 rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-extrabold text-dark">{benefit.title}</h3>
                  <p className="mt-2 text-xs text-dark/50 leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bankers Logo Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-dark/45">
            50+ Partner Financial Institutions
          </span>
          <div className="mt-8 grid grid-cols-3 gap-5 text-center text-xs font-bold text-dark/50 sm:grid-cols-6">
            {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "LIC Housing Finance", "IDFC First Bank", "Bajaj Finserv", "Union Bank of India", "Bank of Baroda", "PNB Housing", "Canara Bank"].map((bank, idx) => (
              <div key={idx} className="flex h-14 items-center justify-center rounded-xl border border-gray-200/60 bg-white px-2 shadow-sm font-semibold">
                {bank}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan FAQs Section */}
      <section className="bg-light py-20 border-t border-gray-200/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Clarifications
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              Home Loans FAQs
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {loanFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between text-left focus:outline-none"
                >
                  <h3 className="text-xs font-extrabold text-dark pr-4">{faq.q}</h3>
                  <ChevronDown
                    className={`h-4.5 w-4.5 text-dark/40 transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-4 text-xs text-dark/50 leading-relaxed font-semibold border-t border-gray-100 pt-4">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Loan Form Section */}
      <section id="apply-loan" className="scroll-mt-24 py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary-dark)_0%,_transparent_55%)] opacity-25" />
        
        <div className="mx-auto max-xl px-4 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <span className="rounded-full bg-primary/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30">
              Apply Digitally
            </span>
            <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-4xl">
              Single-Gateway Financing
            </h2>
            <p className="mt-2 text-xs text-white/50 max-w-xs leading-relaxed">
              Verify your eligibility once. Receive compiled banker appraisals without credit score hits.
            </p>
          </div>

          <form onSubmit={handleApplySubmit} className="mt-10 flex flex-col gap-4 text-left">
            <div className="flex flex-col">
              <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                value={applyName}
                onChange={(e) => setApplyName(e.target.value)}
                className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Email ID</label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@gmail.com"
                  value={applyEmail}
                  onChange={(e) => setApplyEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 90000 12345"
                  value={applyPhone}
                  onChange={(e) => setApplyPhone(e.target.value)}
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Monthly Net Income (INR)</label>
              <input
                type="number"
                placeholder="e.g. 120000"
                value={applyIncome}
                onChange={(e) => setApplyIncome(e.target.value)}
                className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-xl bg-primary py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Initiating Bidding..." : "Send Application To Bidding Pipeline"}
            </button>

            {submitSuccess && (
              <div className="rounded-xl bg-primary/20 border border-primary/30 p-3 text-center text-xs font-bold text-primary-light">
                ✓ Application Submitted! Bids have been requested from partner lenders. A loan counselor will follow up.
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
      <CompareWidget />
    </>
  );
}
