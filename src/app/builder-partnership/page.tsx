"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Award, Zap, Users, BarChart3, Clock, CheckCircle2, ChevronDown, ArrowRight, MessageSquare, AlertCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompareWidget from "@/components/CompareWidget";

export default function BuilderPartnership() {
  // Booking Form State
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !contactName || !email || !phone) {
      alert("Please fill in all details.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setCompany("");
      setContactName("");
      setEmail("");
      setPhone("");
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const builderProblems = [
    {
      title: "Delayed Home Loan Clearances",
      desc: "Properties sit unsold for months waiting for banking sanctions and manual client background verifications."
    },
    {
      title: "Expensive Traditional Brokers",
      desc: "Brokers demand high commission rates (2% to 4%) while providing zero marketing analytics or target logs."
    },
    {
      title: "Low Quality, Cold Lead Streams",
      desc: "Classification portals generate duplicate cold lead reports, wasting sales agent call resources."
    }
  ];

  const oamSolutions = [
    {
      title: "Pre-Cleared Bank Appraisals",
      desc: "OAM pre-approves listed project collaterals with 50+ partner banks, cutting loan approval cycles to under 7 days.",
      icon: Zap
    },
    {
      title: "Performance Based Commissions",
      desc: "We charge flat, predictable commission models only upon successful registration. Zero listing fees.",
      icon: BarChart3
    },
    {
      title: "Curation & Qualification Funnels",
      desc: "Our interactive comparison grids filters buyers by actual budget and intent, routing ready-to-buy clients.",
      icon: Users
    }
  ];

  const commercialModels = [
    {
      name: "Standard Launch",
      cost: "1.0% Commission",
      desc: "Ideal for builders launching mid-tier residential properties wanting steady digital leads.",
      features: [
        "Interactive property listings pages",
        "RERA & compliance verification badge",
        "WhatsApp call routing integration",
        "Standard digital leads reporting dashboard"
      ]
    },
    {
      name: "Premium Spotlight",
      cost: "1.5% Commission",
      desc: "Designed for premium townships and villa layouts needing rapid sales acceleration.",
      features: [
        "All Standard Launch features",
        "Top-of-page search spotlight placement",
        "Dedicated financial coordinator support",
        "Free VIP site visit shuttle routing",
        "Premium drone visual listings support"
      ],
      popular: true
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Compliance & Title Check",
      desc: "Submit your RERA certificate, environment clearances, and layout maps for OAM verification."
    },
    {
      step: "02",
      title: "Asset Digitization",
      desc: "OAM media team captures high-res floor plans, drone videos, and specifies layouts."
    },
    {
      step: "03",
      title: "Funnel Activation",
      desc: "Your project goes live with side-by-side comparison models, EMI calculators, and lead routes."
    },
    {
      step: "04",
      title: "Automated Conversions",
      desc: "Receive pre-qualified leads, site visit requests, and coordinated bank loan documentation."
    }
  ];

  const faqData = [
    {
      q: "What credentials are required to list on OAM?",
      a: "We mandate valid RERA registration certificate, municipal corporation building permissions, environmental clearance documents, and clear title deed registry files."
    },
    {
      q: "How does the lead routing dashboard work?",
      a: "Developers receive access to the OAM Leads Console, where you can view pre-screened client budgets, credit scores, preferred configurations, and planned site visit dates in real-time."
    },
    {
      q: "How are the VIP Site Visits coordinated?",
      a: "OAM manages private premium shuttle cars to pick up clients and coordinate tours. Our representatives accompany clients to present project benefits alongside your sales team."
    },
    {
      q: "Are there any upfront listing charges?",
      a: "No! Listing on OAM is completely free. We work on a purely performance-based commission model paid only when a property sale completes registration."
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-dark text-white py-20 lg:py-32 relative overflow-hidden">
        {/* Abstract Glow pattern */}
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col items-start">
              <span className="rounded-full bg-primary/20 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary border border-primary/30">
                B2B Developer Partnership
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                Accelerate Your Property Sales Pipeline.
              </h1>
              <p className="mt-6 text-xs text-white/60 leading-relaxed max-w-lg">
                OAM is Indore's premium proptech platform. We list your RERA-registered projects, route highly qualified digital buyer leads, and coordinate single-gateway home loans for faster conversions.
              </p>
              <a
                href="#book-demo"
                className="mt-8 group flex items-center gap-1.5 rounded-full bg-primary px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
              >
                Book Partnership Demo
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Visual Stripe-style Funnel representation */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-2xl backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold block mb-6">
                The OAM Sales Accelerator Funnel
              </span>
              <div className="flex flex-col gap-4">
                {[
                  { stage: "Stage 1: Verified Traffic", desc: "Curated premium buyers searching Indore neighborhoods.", pct: "100%" },
                  { stage: "Stage 2: Active Comparison", desc: "Unbiased matrix filters intent by pricing and specifications.", pct: "65%" },
                  { stage: "Stage 3: Guided Shuttle Tours", desc: "Free site visits routed dynamically via WhatsApp.", pct: "30%" },
                  { stage: "Stage 4: Digital Loan Closures", desc: "Quick loan approvals with 50+ banking channels.", pct: "18%" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 p-4">
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.stage}</h4>
                      <p className="text-[10px] text-white/50 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-xs font-extrabold text-primary shrink-0">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Problems Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Market Realities
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              Major Friction in Property Sales
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-xs text-dark/50">
              Why traditional real estate sales channels slow down developer cash flow.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {builderProblems.map((prob, idx) => (
              <div key={idx} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm flex gap-4">
                <AlertCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-extrabold text-dark">{prob.title}</h3>
                  <p className="mt-2 text-xs text-dark/50 leading-relaxed font-medium">{prob.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="bg-light py-20 lg:py-28 border-y border-gray-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              The OAM Solution
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              How OAM Solves Developer Problems
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
            {oamSolutions.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div key={idx} className="rounded-3xl bg-white border border-gray-200/50 p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-start">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xs font-extrabold text-dark">{sol.title}</h3>
                  <p className="mt-2 text-xs text-dark/50 leading-relaxed font-medium">{sol.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Partner Timeline */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Listing Process
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              Four Steps to Get Listed
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-4 relative">
            {/* Horizontal Timeline Connector (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-200 z-0" />
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-dark text-white font-black text-sm border-4 border-white shadow-md">
                  {step.step}
                </div>
                <h3 className="mt-4 text-xs font-extrabold text-dark">{step.title}</h3>
                <p className="mt-2 text-xs text-dark/50 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Models Section */}
      <section className="bg-light py-20 lg:py-28 border-y border-gray-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Pricing Options
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              Flexible Commercial Models
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-xs text-dark/50">
              No subscription tiers. Performance based payouts only. Pay when deals get registered.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
            {commercialModels.map((model, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col rounded-3xl border p-8 bg-white shadow-md ${
                  model.popular ? "border-primary shadow-xl shadow-primary/5 ring-1 ring-primary/20" : "border-gray-200"
                }`}
              >
                {model.popular && (
                  <span className="absolute -top-3.5 left-8 rounded-full bg-primary px-3.5 py-1 text-[9px] font-bold tracking-widest text-white uppercase shadow-sm">
                    Recommended
                  </span>
                )}
                <div>
                  <h3 className="text-md font-bold text-dark">{model.name}</h3>
                  <p className="text-xs text-dark/50 mt-1">{model.desc}</p>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-3xl font-black tracking-tight text-primary">{model.cost}</span>
                  </div>
                </div>

                <div className="my-6 h-[1px] w-full bg-gray-200" />

                <ul className="flex-1 flex flex-col gap-3 text-xs text-dark/70 font-semibold mb-8">
                  {model.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#book-demo"
                  className={`w-full text-center rounded-xl py-3 text-xs font-bold transition-all ${
                    model.popular
                      ? "bg-primary text-white shadow-md hover:bg-primary-dark hover:scale-[1.02]"
                      : "bg-light text-dark hover:bg-dark hover:text-white"
                  }`}
                >
                  Choose {model.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Clarifications
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              Developer Partnerships FAQ
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqData.map((faq, idx) => (
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

      {/* Book Partnership Call Form */}
      <section id="book-demo" className="scroll-mt-24 py-20 bg-dark text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--color-primary-dark)_0%,_transparent_55%)] opacity-25" />
        
        <div className="mx-auto max-w-xl px-4 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <span className="rounded-full bg-primary/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30">
              Let's Scale Together
            </span>
            <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-4xl">
              Schedule Developer Call
            </h2>
            <p className="mt-2 text-xs text-white/50 max-w-sm">
              Connect with OAM Business Acquisition desk. Book a private presentation.
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="mt-10 flex flex-col gap-4 text-left">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Developer Company</label>
                <input
                  type="text"
                  placeholder="e.g. Shalimar Group"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Contact Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Milestone"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Corporate Email ID</label>
              <input
                type="email"
                placeholder="e.g. business@shalimar.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Active Phone Number</label>
              <input
                type="tel"
                placeholder="e.g. +91 98765 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Submitting Demo Details..." : "Request Partnership Callback"}
            </button>

            {submitSuccess && (
              <div className="rounded-xl bg-primary/20 border border-primary/30 p-3 text-center text-xs font-bold text-primary-light">
                ✓ Request Submitted! Our acquisitions counselor will reach out within 24 business hours.
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
