import React from "react";
import Link from "next/link";
import { Compass, Eye, Shield, Users, Landmark, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompareWidget from "@/components/CompareWidget";

export default function About() {
  const coreValues = [
    {
      title: "Obsessive Transparency",
      desc: "We ensure all pricing breakdown layers, municipal certificates, and builder credentials are open to check.",
      icon: Shield
    },
    {
      title: "Data-Driven Decisions",
      desc: "Our side-by-side matrices calculate expected ROI percentages and bank loan eligibility scientifically.",
      icon: Compass
    },
    {
      title: "Developer Integrity",
      desc: "We list only builders with verified track records, structural compliance audits, and active RERA codes.",
      icon: Landmark
    },
    {
      title: "Frictionless Speed",
      desc: "From smart digital filters to fast-tracked loan appraisals, we compress home purchase timelines.",
      icon: Zap
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Startup Inception",
      desc: "OAM founded by tech professionals in Indore to solve fake real estate classified portal spams."
    },
    {
      year: "2024",
      title: "Builder Pipeline Activation",
      desc: "Established direct partnerships with Indore's top 10 developers including Shalimar and Singapore Groups."
    },
    {
      year: "2025",
      title: "Financing Integration",
      desc: "Connected with 50+ banking channels to introduce pre-approved home loan clearances on listed projects."
    },
    {
      year: "2026",
      title: "4,000+ Families Served",
      desc: "Launching our state-of-the-art comparison platform to digitize home acquisitions completely."
    }
  ];

  const team = [
    {
      name: "Aakash Patidar",
      role: "Co-Founder & CEO",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop",
      bio: "Tech entrepreneur with deep knowledge of Indore micro-markets, guiding the vision of direct developer mappings."
    },
    {
      name: "Dheeraj Patidar",
      role: "Co-Founder & Product Lead",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop",
      bio: "Platform architect specializing in high-performance digital tools, spring animation details, and loans bidding panels."
    },
    {
      name: "Adv. Sneha Pathak",
      role: "Chief Legal Compliance Officer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
      bio: "Indore High Court real estate legal specialist, managing our RERA audits and IMC registry checklist pre-vetting."
    }
  ];

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-dark/40">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-dark">About</span>
        </div>

        {/* Page Title */}
        <div className="mt-6 flex flex-col gap-2 border-b border-gray-200/60 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-dark sm:text-4xl">
            Our Mission to Clean Up Proptech
          </h1>
          <p className="text-xs text-dark/50 mt-1 max-w-xl leading-relaxed">
            The story behind Online Awas Mela (OAM) and how we are building Indore's premium real estate platform.
          </p>
        </div>

        {/* Story Section */}
        <section className="py-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-black">
              Company Inception
            </span>
            <h2 className="mt-2.5 text-2xl font-black text-dark tracking-tight">
              A Proptech Startup Built on Trust
            </h2>
            <p className="mt-4 text-xs text-dark/65 leading-relaxed font-medium">
              For decades, searching for properties online in Indore meant wading through hundreds of duplicate listings, dealing with spam cold calls from brokers, and hitting bottlenecks during title checks and home loan sanctions.
            </p>
            <p className="mt-3 text-xs text-dark/65 leading-relaxed font-medium">
              We started **Online Awas Mela (OAM)** to fix this. Inspired by the clean, minimal interaction models of Apple and Stripe, we created a startup platform that coordinates directly with premium developers. We curate projects, verify title registries, publish direct pricing tables, and offer real loan assistance eligibility checkers.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-video bg-gray-100 shadow-lg border border-gray-250">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
              alt="Indore Tech Hub"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className="bg-light border-y border-gray-200/40 -mx-4 px-4 py-16 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Vision */}
            <div className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm flex gap-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                <Eye className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-dark uppercase tracking-wider">Our Vision</h3>
                <p className="mt-3 text-xs text-dark/50 leading-relaxed font-medium">
                  To turn home purchasing into a frictionless digital event. We envision a real estate market where property choices are made on scientific specifications, and loans are approved instantly using digital channels.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm flex gap-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                <Compass className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-dark uppercase tracking-wider">Our Mission</h3>
                <p className="mt-3 text-xs text-dark/50 leading-relaxed font-medium">
                  To serve as Indore's trusted primary real estate sales partner. We support home buyers through rigorous compliance screenings, side-by-side matrices, and bank loan approvals without charging listing fees or brokerage commission.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 lg:py-28">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Core Principles
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="rounded-3xl border border-gray-200/50 bg-white p-6 shadow-sm flex flex-col items-start">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xs font-extrabold text-dark">{val.title}</h3>
                  <p className="mt-2.5 text-xs text-dark/50 leading-relaxed font-medium">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-light border-y border-gray-200/40 -mx-4 px-4 py-20 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Startup History
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
                OAM Milestone Timeline
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {milestones.map((m, idx) => (
                <div key={idx} className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm flex flex-col">
                  <span className="text-3xl font-black text-primary tracking-tight">{m.year}</span>
                  <h3 className="mt-3 text-xs font-extrabold text-dark">{m.title}</h3>
                  <p className="mt-2 text-xs text-dark/50 leading-relaxed font-medium">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 lg:py-28">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Management
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              Meet OAM's Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {team.map((t, idx) => (
              <div key={idx} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-center text-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-28 w-28 rounded-full object-cover border-4 border-light shadow-md"
                />
                <h3 className="mt-5 text-sm font-extrabold text-dark">{t.name}</h3>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{t.role}</span>
                <p className="mt-3 text-xs text-dark/50 leading-relaxed font-medium px-4">{t.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action to listings */}
        <section className="pb-12">
          <div className="rounded-3xl bg-dark p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)_0%,_transparent_55%)] opacity-20" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-xl font-black tracking-tight sm:text-3xl leading-tight">
                Want to Discover Pre-Approved Premium Homes?
              </h2>
              <p className="mt-3 max-w-sm text-xs text-white/60 leading-relaxed">
                Browse our curated Indore projects listing and test our side-by-side matrices.
              </p>
              <Link
                href="/projects"
                className="mt-6 group flex items-center gap-1.5 rounded-full bg-primary px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-primary-dark transition-all hover:scale-[1.02]"
              >
                Browse Projects
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CompareWidget />
    </>
  );
}
