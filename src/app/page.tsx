"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Building, Landmark, Compass, Eye, ShieldCheck, CheckCircle2, ChevronRight, Phone, MessageSquare, ArrowRight, Star, Quote, Sparkles, Home as HomeIcon, Layers, ShoppingBag, Map, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import BuilderCard from "@/components/BuilderCard";
import CompareWidget from "@/components/CompareWidget";
import { projects, builders, testimonials, locations } from "@/data/mockData";

export default function Home() {
  const router = useRouter();

  // Search parameters state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchBudget, setSearchBudget] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchPurpose, setSearchPurpose] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.set("location", searchLocation);
    if (searchBudget) params.set("budget", searchBudget);
    if (searchType) params.set("type", searchType);
    if (searchPurpose) params.set("purpose", searchPurpose);
    router.push(`/projects?${params.toString()}`);
  };

  // Pre-configured paths based on behavioral segments (CRO optimization)
  const handleSegmentClick = (segment: "first_time" | "investor" | "family" | "nri") => {
    const params = new URLSearchParams();
    if (segment === "first_time") {
      params.set("budget", "6000000"); // Under 60L
      params.set("category", "apartment");
      params.set("status", "Ready");
    } else if (segment === "investor") {
      params.set("purpose", "investment");
      params.set("category", "plot");
    } else if (segment === "family") {
      params.set("category", "villa");
    } else if (segment === "nri") {
      params.set("budget", "25000000"); // Premium
      params.set("category", "villa");
    }
    router.push(`/projects?${params.toString()}`);
  };

  const indoreLocationsList = locations.map(l => l.name);

  const propertyTypes = [
    { label: "Residential Plots", category: "plot", type: "Residential Plot", desc: "Secure custom structural land", icon: Map },
    { label: "Apartments", category: "apartment", type: "Apartment", desc: "Premium lock-and-key flats", icon: Building },
    { label: "Villas & duplex", category: "villa", type: "Villa", desc: "Private gated complexes", icon: HomeIcon },
    { label: "Commercial Office", category: "commercial", type: "Office", desc: "Yield-generating spaces", icon: ShoppingBag },
    { label: "Farm Houses", category: "villa", type: "Farm House", desc: "Scenic luxury retreats", icon: Layers },
    { label: "Penthouses", category: "apartment", type: "Penthouse", desc: "High-rise vertical estates", icon: Sparkles },
    { label: "Investment Lands", category: "plot", type: "Investment Property", desc: "High appreciation projects", icon: Landmark }
  ];

  // Curated showcases
  const featuredProjects = projects.filter(p => p.category === "apartment" && p.featured).slice(0, 4);
  const featuredPlots = projects.filter(p => p.category === "plot" && p.featured).slice(0, 4);
  const luxuryVillas = projects.filter(p => p.category === "villa").slice(0, 4);
  const commercialOps = projects.filter(p => p.category === "commercial" && p.featured).slice(0, 4);
  const investmentPicks = projects.filter(p => p.type === "Investment Property" || p.featured).slice(4, 8);
  const newLaunches = projects.filter(p => p.newLaunch).slice(0, 4);
  const hotDeals = projects.filter(p => p.hotDeal).slice(0, 4);

  const featuredBuilders = builders.filter(b => b.featured).slice(0, 4);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop"
            alt="OAM Indore real estate platform"
            className="h-full w-full object-cover brightness-30 saturate-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-light via-dark/45 to-dark/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <span className="rounded-full bg-primary/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary border border-primary/30">
              ⚡ INDORE'S PIONEERING SALES & COMPARISON PLATFORM
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
              Don't Just Browse. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-primary to-gold">
                Evaluate scientifically.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-xs text-white/75 leading-relaxed font-semibold">
              OAM coordinates direct builder mappings. We pre-vet title clearances, audit RERA safety indexes, and run automated loan bid matching to shield you from broker spam.
            </p>

            {/* Conversational CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/projects"
                className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all hover:scale-[1.03]"
              >
                Access Curated Catalog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-white hover:text-dark transition-all"
              >
                Request Free Site Visit Shuttle
              </Link>
            </div>
          </div>

          {/* Airbnb style Search Console */}
          <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-lg md:p-8">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-5">
              {/* Purpose Select */}
              <div className="flex flex-col text-left">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">
                  Target Purpose
                </label>
                <select
                  value={searchPurpose}
                  onChange={(e) => setSearchPurpose(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-light p-3.5 text-xs font-bold text-dark focus:border-primary focus:outline-none"
                >
                  <option value="">Any Purpose</option>
                  <option value="buy">Residential Gated Living</option>
                  <option value="investment">High Appreciation Plots</option>
                  <option value="commercial">Commercial Yield Cashflow</option>
                </select>
              </div>

              {/* Location Select */}
              <div className="flex flex-col text-left">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">
                  Indore Location
                </label>
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-light p-3.5 text-xs font-bold text-dark focus:border-primary focus:outline-none"
                >
                  <option value="">Any Location</option>
                  {indoreLocationsList.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Property Type Select */}
              <div className="flex flex-col text-left">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">
                  Category
                </label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-light p-3.5 text-xs font-bold text-dark focus:border-primary focus:outline-none"
                >
                  <option value="">Any Type</option>
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Office">Office Space</option>
                  <option value="Shop">Shop / Retail</option>
                </select>
              </div>

              {/* Budget Select */}
              <div className="flex flex-col text-left">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">
                  Max Budget
                </label>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-light p-3.5 text-xs font-bold text-dark focus:border-primary focus:outline-none"
                >
                  <option value="">Any Budget</option>
                  <option value="4000000">Under 40 Lakhs</option>
                  <option value="8000000">Under 80 Lakhs</option>
                  <option value="15000000">Under 1.5 Crore</option>
                  <option value="30000000">Under 3.0 Crore</option>
                </select>
              </div>

              {/* Search Action */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Search className="h-4 w-4" />
                  Apply Filters
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* User Journey Segmentation (CRO/Behavioral Psychology) */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Tailored Search</span>
            <h2 className="text-xl font-black text-dark tracking-tight sm:text-2xl mt-1">Identify Your Goal</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
            {[
              { id: "first_time", label: "First-Time Buyer", desc: "Ready to move family units with fast-track home loan support.", action: "Explore Starters" },
              { id: "investor", label: "Wealth Investor", desc: "High appreciation plot schemes and high yield commercial retail.", action: "Explore Yields" },
              { id: "family", label: "Gated Family Duplex", desc: "Premium villas and row houses inside Indore's green zones.", action: "Explore Villas" },
              { id: "nri", label: "Premium NRI Assets", desc: "Ultra-luxury penthouses and farmhouses with dedicated remote support.", action: "Explore Luxury" }
            ].map((journey) => (
              <button
                key={journey.id}
                onClick={() => handleSegmentClick(journey.id as any)}
                className="flex flex-col justify-between items-start text-left p-6 rounded-2xl border border-gray-150 bg-white hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-dark">{journey.label}</h3>
                  <p className="text-[11px] text-dark/50 leading-relaxed font-semibold mt-2.5">{journey.desc}</p>
                </div>
                <span className="mt-6 flex items-center gap-1 text-[10px] font-bold text-primary">
                  {journey.action}
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Core Safety/Trust Ledger Showcase */}
      <section className="py-12 bg-light border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex gap-4 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0"><ShieldCheck className="h-5.5 w-5.5" /></span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-dark">RERA Regd Verification</h4>
                <p className="text-[10px] text-dark/45 font-semibold leading-relaxed mt-1">We enforce complete documentation checks. Only 100% compliant layout grids get listed.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0"><Award className="h-5.5 w-5.5" /></span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-dark">Direct Developer Tie-ups</h4>
                <p className="text-[10px] text-dark/45 font-semibold leading-relaxed mt-1">Direct inventory lock with top Indore builders. Zero broker markups or hidden fees.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0"><Users className="h-5.5 w-5.5" /></span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-dark">Lending Pre-Clearances</h4>
                <p className="text-[10px] text-dark/45 font-semibold leading-relaxed mt-1">50+ national partner banks pre-approve listed collaterals for under-7-day loan sanctions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Property Type */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Asset Classes</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">Browse by Property Class</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {propertyTypes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={`/projects?category=${item.category}`}
                  className="group flex flex-col items-center text-center p-5 rounded-2xl border border-gray-200/60 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-light text-dark group-hover:bg-primary group-hover:text-white transition-all mb-4">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xs font-bold text-dark group-hover:text-primary transition-colors">
                    {item.label}
                  </h3>
                  <span className="text-[9px] text-dark/40 mt-1 leading-tight block">
                    {item.desc}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore by Location */}
      <section className="bg-light py-20 border-y border-gray-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Indore Regions</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">Explore Prime Micro-Markets</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                href={`/projects?location=${encodeURIComponent(loc.name)}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-primary/25 transition-all flex flex-col justify-between aspect-4/5"
              >
                <div className="absolute inset-0 z-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <img src={loc.image} alt={loc.name} className="h-full w-full object-cover" />
                </div>
                
                <div className="relative z-10 flex flex-col gap-1">
                  <span className="rounded-full bg-primary/10 self-start px-2 py-0.5 text-[9px] font-bold text-primary">
                    {loc.growthRate} Growth
                  </span>
                  <h3 className="mt-2.5 text-sm font-extrabold text-dark group-hover:text-primary transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-[10px] text-dark/55 leading-relaxed font-semibold mt-1.5">
                    {loc.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-gray-100 pt-3 text-[10px]">
                  <span className="font-bold text-dark/40">
                    {loc.avgPricePerSqFt.split(" ")[0]}/sqft
                  </span>
                  <span className="font-black text-primary flex items-center gap-0.5">
                    Browse
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Grid showcases */}
      {/* 1. Featured Projects */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-gray-100 pb-4 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Apartments & Suites</span>
              <h2 className="text-xl font-black text-dark tracking-tight sm:text-3xl mt-1">Featured Residential Projects</h2>
            </div>
            <Link href="/projects?category=apartment" className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline">
              View All
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map(p => (
              <PropertyCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Featured Plots */}
      <section className="py-20 bg-light border-y border-gray-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-gray-200/60 pb-4 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Land Development</span>
              <h2 className="text-xl font-black text-dark tracking-tight sm:text-3xl mt-1">Featured Plot Schemes</h2>
            </div>
            <Link href="/projects?category=plot" className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline">
              View All
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPlots.map(p => (
              <PropertyCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Luxury Villas */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-gray-100 pb-4 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Gated Mansions</span>
              <h2 className="text-xl font-black text-dark tracking-tight sm:text-3xl mt-1">Luxury Villas & Farm Houses</h2>
            </div>
            <Link href="/projects?category=villa" className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline">
              View All
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {luxuryVillas.map(p => (
              <PropertyCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Commercial Opportunities */}
      <section className="py-20 bg-light border-y border-gray-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-gray-200/60 pb-4 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Corporate Retail & Retail</span>
              <h2 className="text-xl font-black text-dark tracking-tight sm:text-3xl mt-1">Commercial Opportunities</h2>
            </div>
            <Link href="/projects?category=commercial" className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline">
              View All
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {commercialOps.map(p => (
              <PropertyCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Investment Picks */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-gray-100 pb-4 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Capital Appreciation Picks</span>
              <h2 className="text-xl font-black text-dark tracking-tight sm:text-3xl mt-1">High-ROI Investment Picks</h2>
            </div>
            <Link href="/projects?purpose=investment" className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline">
              View All
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {investmentPicks.map(p => (
              <PropertyCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. New Launches & Hot Deals */}
      <section className="py-20 bg-light border-y border-gray-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-end justify-between border-b border-gray-200/60 pb-3 mb-6">
                <h3 className="text-base font-black text-dark uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-primary" />
                  New Launches
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {newLaunches.slice(0, 2).map(p => (
                  <PropertyCard key={p.id} project={p} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between border-b border-gray-200/60 pb-3 mb-6">
                <h3 className="text-base font-black text-dark uppercase tracking-wider flex items-center gap-2">
                  <Star className="h-4.5 w-4.5 text-gold fill-gold" />
                  Hot Value Deals
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {hotDeals.slice(0, 2).map(p => (
                  <PropertyCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Spotlight */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-black">Authorized Developers</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">Developer Spotlight</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBuilders.map((builder) => (
              <BuilderCard key={builder.id} builder={builder} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-light py-20 border-t border-gray-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-black">Verified Reviews</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-dark sm:text-4xl">Trusted by Indore's Families</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <div key={item.id} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm border border-gray-200/40 justify-between">
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary/10 mt-4" />
                  <p className="text-xs text-dark/65 leading-relaxed font-semibold italic -mt-2">
                    "{item.comment}"
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
                  <img src={item.avatar} alt={item.name} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-dark">{item.name}</h4>
                    <p className="text-[10px] text-dark/45 font-medium">{item.role}</p>
                    {item.projectName && (
                      <span className="text-[9px] text-primary font-bold mt-0.5 block">Asset: {item.projectName}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRO Optimized CTA Block */}
      <section className="py-20 lg:py-28 relative">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-primary-dark to-dark p-8 md:p-12 shadow-xl shadow-primary-dark/10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary-light)_0%,_transparent_55%)] opacity-30" />
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-2xl font-black tracking-tight sm:text-4xl leading-tight">
                Want Indore's Market Appreciation Worksheets?
              </h2>
              <p className="mt-4 max-w-lg text-xs text-white/70 leading-relaxed font-medium">
                Submit an inquiry to receive detailed RERA documents, registry compliance guidelines, and banking rate schedules compiled by OAM.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                <Link
                  href="/projects"
                  className="rounded-full bg-white px-6 py-3.5 text-xs font-bold text-dark shadow-md hover:bg-light transition-all"
                >
                  Browse Curated Assets
                </Link>
                <Link
                  href="/contact?subject=Worksheets"
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-bold text-white hover:bg-primary-dark transition-all"
                >
                  <MessageSquare className="h-4 w-4" />
                  Speak with Valuation Advisor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CompareWidget />
    </>
  );
}
