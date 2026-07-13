"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, Search, RefreshCw, X, ArrowLeft, Layers, Landmark, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import CompareWidget from "@/components/CompareWidget";
import { projects, builders, locations } from "@/data/mockData";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL state inputs
  const initialLocation = searchParams.get("location") || "";
  const initialBudget = searchParams.get("budget") || "";
  const initialType = searchParams.get("type") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialPurpose = searchParams.get("purpose") || "";
  const initialBuilderId = searchParams.get("builderId") || "";

  // Search State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedBudget, setSelectedBudget] = useState(initialBudget);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPurpose, setSelectedPurpose] = useState(initialPurpose);
  const [selectedBuilderId, setSelectedBuilderId] = useState(initialBuilderId);
  const [minArea, setMinArea] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync state if URL search params change
  useEffect(() => {
    setSelectedLocation(searchParams.get("location") || "");
    setSelectedBudget(searchParams.get("budget") || "");
    setSelectedType(searchParams.get("type") || "");
    setSelectedCategory(searchParams.get("category") || "");
    setSelectedPurpose(searchParams.get("purpose") || "");
    setSelectedBuilderId(searchParams.get("builderId") || "");
  }, [searchParams]);

  // Options lists
  const indoreLocationsList = locations.map(l => l.name);
  const buildersList = builders;
  
  const propertyTypesList = [
    "Residential Plot", "Commercial Plot", "Apartment", "Villa", "Row House", 
    "Penthouse", "Farm House", "Shop", "Office", "Showroom", "Warehouse", 
    "Industrial Land", "Investment Property", "New Launch Projects"
  ];

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedBudget("");
    setSelectedType("");
    setSelectedCategory("");
    setSelectedPurpose("");
    setSelectedBuilderId("");
    setMinArea("");
    setProjectStatus("");
    router.push("/projects");
  };

  // Filter Logic
  const filteredProjects = projects.filter((project) => {
    // Search Term match
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = project.name.toLowerCase().includes(term);
      const matchBuilder = project.builderName.toLowerCase().includes(term);
      if (!matchName && !matchBuilder) return false;
    }

    // Category match (plot, apartment, villa, commercial)
    if (selectedCategory && project.category !== selectedCategory) {
      return false;
    }

    // Type match (e.g. Row House, Showroom)
    if (selectedType && project.type !== selectedType) {
      return false;
    }

    // Location match
    if (selectedLocation && project.location !== selectedLocation) {
      return false;
    }

    // Builder match
    if (selectedBuilderId && project.builderId !== selectedBuilderId) {
      return false;
    }

    // Purpose match
    if (selectedPurpose) {
      if (selectedPurpose === "buy") {
        // Buy residential
        if (project.category !== "apartment" && project.category !== "villa") return false;
      } else if (selectedPurpose === "commercial") {
        // Commercial assets
        if (project.category !== "commercial" && project.type !== "Commercial Plot" && project.type !== "Industrial Land") return false;
      } else if (selectedPurpose === "investment") {
        // Investment properties / High appreciation plots
        if (project.type !== "Investment Property" && project.category !== "plot" && !project.trending) return false;
      }
    }

    // Budget match
    if (selectedBudget) {
      const maxBudgetVal = Number(selectedBudget);
      if (project.priceMin > maxBudgetVal) return false;
    }

    // Area sqft match
    if (minArea) {
      const areaVal = Number(minArea);
      if (project.areaSqFt < areaVal) return false;
    }

    // Project Status match
    if (projectStatus) {
      if (projectStatus === "Ready") {
        if (project.possession !== "Ready to Move" && project.possession !== "Ready to Construct") return false;
      } else if (projectStatus === "Construction") {
        if (project.possession.includes("2026") || project.possession.includes("2027")) return false;
      } else if (projectStatus === "Launch") {
        if (!project.newLaunch) return false;
      }
    }

    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-dark/40">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-dark">Search Registry</span>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-b border-gray-200/60 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-dark sm:text-4xl">
          Real Estate Sales Board
        </h1>
        <p className="text-xs text-dark/50 mt-1 max-w-xl leading-relaxed">
          Search and compare residential plots, apartments, offices, vills, and retail showrooms in Indore. Toggle compare checkmarks on up to 3 listings.
        </p>
      </div>

      {/* Main Filter and Search grid layout */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Left sidebar filter panel */}
        <aside className="hidden lg:flex flex-col gap-6 rounded-3xl border border-gray-200/60 bg-white p-6 shadow-sm self-start">
          <div className="flex items-center justify-between border-b border-gray-150 pb-4">
            <h3 className="text-xs font-black text-dark uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
              Advanced Filters
            </h3>
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1 text-[10px] font-bold text-dark/40 hover:text-primary transition-all uppercase tracking-widest"
            >
              <RefreshCw className="h-3 w-3 animate-spin-slow" />
              Reset
            </button>
          </div>

          {/* Search text */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Keyword</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Shalimar Elite"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-light py-2.5 pl-8.5 pr-3 text-xs font-bold text-dark focus:border-primary focus:outline-none"
              />
              <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-dark/40" />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Indore Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark focus:outline-none"
            >
              <option value="">Any Location</option>
              {indoreLocationsList.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Purpose</label>
            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark focus:outline-none"
            >
              <option value="">Any Purpose</option>
              <option value="buy">Residential Gated Living</option>
              <option value="investment">High-ROI / Appreciation Plots</option>
              <option value="commercial">Commercial Yield Cashflow</option>
            </select>
          </div>

          {/* Property Category */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Main Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedType(""); // Reset detailed type
              }}
              className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark focus:outline-none"
            >
              <option value="">All Categories</option>
              <option value="plot">Plots & Lands</option>
              <option value="apartment">Apartments & Suites</option>
              <option value="villa">Villas & Farmhouses</option>
              <option value="commercial">Commercial Retail/Office</option>
            </select>
          </div>

          {/* Detailed Property Type */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Detailed Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark focus:outline-none"
            >
              <option value="">All Types</option>
              {propertyTypesList.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Max Budget</label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark"
            >
              <option value="">Any Budget</option>
              <option value="3000000">Under ₹30 Lakhs</option>
              <option value="6000000">Under ₹60 Lakhs</option>
              <option value="12000000">Under ₹1.2 Crore</option>
              <option value="25000000">Under ₹2.5 Crore</option>
              <option value="50000000">Under ₹5.0 Crore</option>
            </select>
          </div>

          {/* Area filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Min Area (Sq Ft)</label>
            <input
              type="number"
              placeholder="e.g. 1500"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-light px-3.5 py-2.5 text-xs font-bold text-dark focus:border-primary focus:outline-none"
            />
          </div>

          {/* Builder */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Developer</label>
            <select
              value={selectedBuilderId}
              onChange={(e) => setSelectedBuilderId(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark focus:outline-none"
            >
              <option value="">Any Builder</option>
              {buildersList.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Project Status */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Construction Status</label>
            <select
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark focus:outline-none"
            >
              <option value="">Any Status</option>
              <option value="Ready">Ready to Move / Construct</option>
              <option value="Construction">Under Construction</option>
              <option value="Launch">New Launches Spotlight</option>
            </select>
          </div>
        </aside>

        {/* Right side results listings */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <span className="text-xs font-bold text-dark/60">
              Found <strong className="text-primary font-black">{filteredProjects.length}</strong> Premium Assets
            </span>
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="inline-flex lg:hidden items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-dark hover:bg-light"
            >
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Advanced Filters
            </button>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white border border-gray-200 p-16 text-center shadow-sm">
              <span className="text-4xl">🔍</span>
              <h3 className="mt-4 text-sm font-black text-dark">No Matching Properties</h3>
              <p className="mt-2 text-xs text-dark/50 max-w-sm">
                We couldn't find any premium verified listings matching those specific filters. Try expanding your search queries.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-primary-dark"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p) => (
                <PropertyCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer filter board */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div onClick={() => setIsFilterDrawerOpen(false)} className="fixed inset-0 bg-dark/20 backdrop-blur-sm" />
          
          <div className="relative z-10 w-full max-w-xs bg-white p-6 shadow-xl flex flex-col h-full overflow-y-auto ml-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-xs font-black text-dark uppercase tracking-wider">Advanced Filters</h3>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="rounded-lg p-2 hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex-1 py-6 flex flex-col gap-5">
              {/* Keyword */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Keyword</label>
                <input
                  type="text"
                  placeholder="e.g. Singapore"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark focus:outline-none"
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark focus:outline-none"
                >
                  <option value="">Any Location</option>
                  {indoreLocationsList.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Purpose */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Purpose</label>
                <select
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark"
                >
                  <option value="">Any Purpose</option>
                  <option value="buy">Residential Buy</option>
                  <option value="investment">Investment Plots</option>
                  <option value="commercial">Commercial Yield</option>
                </select>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark"
                >
                  <option value="">All Categories</option>
                  <option value="plot">Plots</option>
                  <option value="apartment">Apartments</option>
                  <option value="villa">Villas</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Max Budget</label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-light p-3 text-xs font-bold text-dark"
                >
                  <option value="">Any Budget</option>
                  <option value="4000000">Under 40 Lakhs</option>
                  <option value="8000000">Under 80 Lakhs</option>
                  <option value="15000000">Under 1.5 Cr</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-150 flex flex-col gap-3">
              <button onClick={handleClearFilters} className="w-full rounded-xl border border-gray-200 py-3 text-xs font-bold text-dark hover:bg-light">Reset</button>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="w-full rounded-xl bg-primary py-3 text-xs font-bold text-white">Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="mx-auto max-w-7xl px-4 py-32 text-center flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary mb-4" />
          <span className="text-xs font-bold text-dark/40 uppercase tracking-widest">Loading OAM search registry...</span>
        </div>
      }>
        <ProjectsContent />
      </Suspense>
      <Footer />
      <CompareWidget />
    </>
  );
}
