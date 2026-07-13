"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Building, Ruler, Calendar, ShieldCheck, Check, ArrowRight, Phone, MessageCircle, Mail, School, Hospital, Train, Star, FileText, Download, GitCompare, Compass, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import EMICalculator from "@/components/EMICalculator";
import CompareWidget from "@/components/CompareWidget";
import { Project, Builder } from "@/data/mockData";
import { getComparedIds, addCompareId, removeCompareId, COMPARE_EVENT } from "@/utils/compareHelper";

interface ProjectDetailsClientProps {
  project: Project;
  builder?: Builder;
  relatedProjects: Project[];
}

export default function ProjectDetailsClient({ project, builder, relatedProjects }: ProjectDetailsClientProps) {
  // Gallery & Tabs State
  const [activeImage, setActiveImage] = useState(project.image);
  const [activeTab, setActiveTab] = useState("overview");

  // Comparison State
  const [isAddedToCompare, setIsAddedToCompare] = useState(false);

  // Inquiry and quote form states
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [requestedPrice, setRequestedPrice] = useState(false);

  useEffect(() => {
    setActiveImage(project.image);
    setIsAddedToCompare(getComparedIds().includes(project.id));

    const handleUpdate = () => {
      setIsAddedToCompare(getComparedIds().includes(project.id));
    };

    window.addEventListener(COMPARE_EVENT, handleUpdate);
    return () => window.removeEventListener(COMPARE_EVENT, handleUpdate);
  }, [project]);

  const handleCompareToggle = () => {
    if (isAddedToCompare) {
      removeCompareId(project.id);
    } else {
      const added = addCompareId(project.id);
      if (!added) {
        alert("You can compare up to 3 properties at a time.");
      }
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) {
      alert("Please fill in all details.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setBookingName("");
      setBookingPhone("");
      setBookingDate("");
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleBrochureDownload = () => {
    alert(`📥 PDF Brochure for "${project.name}" has been prepared. Your premium download will start automatically.`);
  };

  const handlePriceRequest = () => {
    setRequestedPrice(true);
    setTimeout(() => {
      alert(`✨ Price details requested! Our Indore sales executive will WhatsApp the pricing worksheet to you shortly.`);
      setRequestedPrice(false);
    }, 1000);
  };

  const bhkString = project.apartmentDetails?.bhk.length
    ? `${project.apartmentDetails.bhk.join("/")} BHK`
    : "Residences";

  // Spec layouts depending on category
  let highlightsGrid = null;
  let customTabContent = null;
  let customTabLabel = "Specs Sheet";

  if (project.category === "plot" && project.plotDetails) {
    customTabLabel = "Appreciation Potentials";
    highlightsGrid = (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Ruler className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Plot Area</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.plotDetails.plotSize}</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Compass className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Plot Facing</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.plotDetails.facing} Facing</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Layers className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Road Width</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.plotDetails.roadWidth} Road</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <ShieldCheck className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Colony Sanction</span>
          <strong className="mt-0.5 block text-xs text-dark truncate max-w-full">{project.plotDetails.colonyApproval.split(" ")[0]}</strong>
        </div>
      </div>
    );
    customTabContent = (
      <div className="flex flex-col gap-6">
        <h3 className="text-base font-bold text-dark">Appreciation and Valuation Indices</h3>
        <div className="rounded-2xl bg-light p-6 border border-gray-200 flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Estimated Growth Index</span>
            <span className="font-black text-primary">{project.plotDetails.appreciationPotential}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Registry Clear Status</span>
            <span className="font-black text-dark">{project.plotDetails.registryStatus}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Corner Property Plot</span>
            <span className="font-black text-dark">{project.plotDetails.isCornerPlot ? "Yes (Premium Premium)" : "No"}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Colony Approvals</span>
            <span className="font-black text-dark">{project.plotDetails.colonyApproval}</span>
          </div>
          <div className="h-[1px] bg-gray-255 w-full my-2" />
          <div className="flex flex-col gap-1 text-xs">
            <span className="font-bold text-dark/50 uppercase tracking-widest text-[9px]">Nearby Expansion Infrastructure</span>
            <p className="font-medium text-dark/75 leading-relaxed">{project.plotDetails.nearbyDevelopment}</p>
          </div>
        </div>
      </div>
    );
  } else if (project.category === "commercial" && project.commercialDetails) {
    customTabLabel = "Business Suitability";
    highlightsGrid = (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Ruler className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Carpet Size</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.area.split(" ")[0]} sqft</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Compass className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Frontage Road</span>
          <strong className="mt-0.5 block text-xs text-dark truncate max-w-full">{project.commercialDetails.frontage}</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Layers className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Estimated Yield</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.commercialDetails.rentalYield}</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Star className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Est. Footfall</span>
          <strong className="mt-0.5 block text-xs text-dark truncate max-w-full">{project.commercialDetails.footfall.split(" ")[0]}</strong>
        </div>
      </div>
    );
    customTabContent = (
      <div className="flex flex-col gap-6">
        <h3 className="text-base font-bold text-dark">Business Suitability Analysis</h3>
        <div className="rounded-2xl bg-light p-6 border border-gray-200 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 items-center text-xs">
            <span className="font-bold text-dark/50 uppercase tracking-widest text-[9px] block w-full mb-1">Recommended Businesses</span>
            {project.commercialDetails.suitableBusiness.map((b, idx) => (
              <span key={idx} className="rounded-lg bg-white border border-gray-200 px-3 py-1 font-bold text-dark shadow-sm">
                {b}
              </span>
            ))}
          </div>
          <div className="h-[1px] bg-gray-255 w-full my-2" />
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Complex Footfall Category</span>
            <span className="font-black text-dark">{project.commercialDetails.footfall}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Main Frontage Size</span>
            <span className="font-black text-dark">{project.commercialDetails.frontage}</span>
          </div>
          <div className="flex flex-col gap-1 text-xs mt-2">
            <span className="font-bold text-dark/50 uppercase tracking-widest text-[9px]">Nearby Commercial Nodes</span>
            <ul className="flex flex-col gap-1.5 font-semibold text-dark/70 mt-1 pl-4 list-disc">
              {project.commercialDetails.nearbyHubs.map((hub, idx) => (
                <li key={idx}>{hub}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else if (project.category === "villa" && project.villaDetails) {
    customTabLabel = "Gated Duplex Details";
    highlightsGrid = (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Ruler className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Construction Area</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.villaDetails.constructionArea}</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Building className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Bedrooms Count</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.villaDetails.bedroomsCount} BHK</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Compass className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Private Plot Size</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.villaDetails.landArea}</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <ShieldCheck className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Gated Complex</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.villaDetails.isGated ? "Yes (Secured)" : "No"}</strong>
        </div>
      </div>
    );
    customTabContent = (
      <div className="flex flex-col gap-6">
        <h3 className="text-base font-bold text-dark">Luxury Gated Mansion Configuration</h3>
        <div className="rounded-2xl bg-light p-6 border border-gray-200 flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Independent Private Lawn</span>
            <span className="font-black text-dark">{project.villaDetails.hasGarden ? "Included (Pre-landscaped)" : "Not Included"}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Dedicated Private Parking</span>
            <span className="font-black text-dark">{project.villaDetails.privateParking ? "Yes (Dual car slots)" : "Common Gated"}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Gated 3-Tier Security</span>
            <span className="font-black text-dark">{project.villaDetails.isGated ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Total Bedrooms Structure</span>
            <span className="font-black text-dark">{project.villaDetails.bedroomsCount} Duplex Rooms</span>
          </div>
        </div>
      </div>
    );
  } else {
    // Apartment
    customTabLabel = "Towers & Units Blueprint";
    highlightsGrid = (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Ruler className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Super Area</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.area}</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Building className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Residences</span>
          <strong className="mt-0.5 block text-xs text-dark">{bhkString}</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <Calendar className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Possession</span>
          <strong className="mt-0.5 block text-xs text-dark">{project.possession}</strong>
        </div>
        <div className="rounded-2xl border border-gray-150 bg-white p-4 text-center animate-fade-in">
          <ShieldCheck className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-dark/40">Clear Title</span>
          <strong className="mt-0.5 block text-xs text-dark">RERA Approved</strong>
        </div>
      </div>
    );
    customTabContent = (
      <div className="flex flex-col gap-6">
        <h3 className="text-base font-bold text-dark">Towers & Structure Blueprint</h3>
        <div className="rounded-2xl bg-light p-6 border border-gray-200 flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Tower Name / Block</span>
            <span className="font-black text-dark">{project.apartmentDetails?.towerName}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Estimated Maintenance</span>
            <span className="font-black text-dark">{project.apartmentDetails?.maintenance}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Reserved Parking Slots</span>
            <span className="font-black text-dark">{project.apartmentDetails?.parkingCount} Reserved</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Clubhouse & Lounge Access</span>
            <span className="font-black text-dark">{project.apartmentDetails?.hasClubhouse ? "Complimentary" : "Unavailable"}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-dark/60">Towers Elevator Lift</span>
            <span className="font-black text-dark">{project.apartmentDetails?.hasLift ? "High-Speed Capsule" : "Unavailable"}</span>
          </div>
        </div>
      </div>
    );
  }

  // Pre-calculated deterministic variables for trust ledger
  const trustScore = 9.0 + (Number(project.id.split("-")[1] || 3) % 10) * 0.1;
  const reraRegId = `RERA-IND-P-${100000 + (Number(project.id.split("-")[1] || 1) * 789)}`;

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-dark/40">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-primary">Search Board</Link>
          <span>/</span>
          <span className="text-dark truncate max-w-[200px]">{project.name}</span>
        </div>

        {/* Heading Panel */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase">
                {project.type}
              </span>
              <span className="rounded-lg bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-gold uppercase border border-gold/10">
                RERA Registered
              </span>
            </div>
            <h1 className="mt-2.5 text-2xl font-black tracking-tight text-dark sm:text-4xl">
              {project.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-dark/50">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" />
                {project.location}, Indore
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building className="h-4 w-4 text-dark/35" />
                By {project.builderName}
              </span>
            </div>
          </div>

          <div className="flex items-baseline justify-between lg:text-right border-y border-gray-150 py-3 lg:border-none lg:py-0 shrink-0 gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Platform Valuation</span>
              <span className="text-xl font-black tracking-tight text-primary sm:text-2xl">{project.price.split(" - ")[0]}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Appreciation Potential</span>
              <span className="text-sm font-bold text-dark">{project.roi} p.a.</span>
            </div>
          </div>
        </div>

        {/* Media / Aerial Drone view */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 aspect-16/10 overflow-hidden rounded-3xl border border-gray-250 bg-gray-100 shadow-sm relative">
            <img src={activeImage} alt={project.name} className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 rounded-xl bg-dark/60 backdrop-blur-md px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5 shadow-md">
              <span>🚁</span>
              <span>Aerial Drone Visuals</span>
            </div>
          </div>

          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible">
            {project.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-16/10 w-28 lg:w-full overflow-hidden rounded-2xl border transition-all shrink-0 bg-gray-100 ${
                  activeImage === img ? "border-primary shadow-md ring-2 ring-primary/20" : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img src={img} alt={`Gallery index ${idx}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons (CRO optimized layout) */}
        <div className="mt-8 rounded-2xl bg-light border border-gray-200/50 p-4 flex flex-wrap gap-4 items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-dark bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm hover:bg-light transition-all">
              <input
                type="checkbox"
                checked={isAddedToCompare}
                onChange={handleCompareToggle}
                className="h-4 w-4 rounded border-gray-300 text-primary accent-primary"
              />
              <GitCompare className="h-4 w-4 text-dark/65" />
              Compare Asset
            </label>
            <button
              onClick={handleBrochureDownload}
              className="flex items-center gap-1.5 text-xs font-bold text-dark bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm hover:bg-light transition-all cursor-pointer"
            >
              <Download className="h-4 w-4 text-dark/65" />
              Download Brochure PDF
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePriceRequest}
              className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/10 transition-all shadow-sm cursor-pointer animate-pulse"
            >
              Request Custom Pricing Sheet
            </button>
            <Link
              href="/home-loan"
              className="rounded-xl bg-dark text-white px-4 py-2.5 text-xs font-bold hover:bg-primary transition-all shadow-sm"
            >
              Fast-Track Loan Approval
            </Link>
          </div>
        </div>

        {/* Detailed Layout & Sidebar */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            
            {/* The Trust Ledger Section (Tesla Confidence / CRO) */}
            <div className="rounded-3xl border border-primary/20 bg-primary/[0.02] p-6 shadow-sm flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><ShieldCheck className="h-5.5 w-5.5" /></span>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-dark">OAM Verified Safety Ledger</h3>
                  <p className="text-[10px] text-dark/50 mt-0.5 leading-relaxed">Full registry documents pre-vetting checklist</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { check: "RERA Registration Approved", detail: reraRegId },
                  { check: "Municipal Corporation Surcharges Clear", detail: "Indore Municipal Corporation (IMC)" },
                  { check: "Clear Title Registry Report", detail: "Vetted by legal consultants team" },
                  { check: "Collateral Valuation Appraisal Status", detail: "Pre-approved by 50+ partner banks" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start bg-white p-3.5 rounded-xl border border-gray-150 shadow-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary shrink-0 mt-0.5">✓</span>
                    <div className="text-[11px]">
                      <strong className="block text-dark font-extrabold">{item.check}</strong>
                      <span className="block text-dark/40 font-semibold mt-0.5">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs details */}
            <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-none py-1">
              {[
                { id: "overview", label: "Overview Summary" },
                { id: "amenities", label: "Amenities" },
                { id: "specs", label: customTabLabel },
                { id: "location", label: "Micro-Market Map" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-b-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-dark/50 hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col">
              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-6">
                  {highlightsGrid}
                  <div className="mt-4 flex flex-col gap-3">
                    <h3 className="text-base font-bold text-dark">Asset Description</h3>
                    <p className="text-xs text-dark/65 leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Amenities */}
              {activeTab === "amenities" && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {project.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-2xl border border-gray-150 bg-white p-4 shadow-sm"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-bold text-dark">{amenity}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Specs */}
              {activeTab === "specs" && customTabContent}

              {/* Tab 4: Location Map */}
              {activeTab === "location" && (
                <div className="flex flex-col gap-6">
                  <div className="w-full aspect-21/9 rounded-3xl bg-gray-150 border border-gray-200 flex flex-col items-center justify-center text-center p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#111827_1px,transparent_1px)] [background-size:16px_16px]" />
                    <MapPin className="h-8 w-8 text-primary animate-bounce z-10" />
                    <span className="mt-2.5 text-xs font-bold text-dark z-10">{project.name} Area Route Map</span>
                    <span className="text-[10px] text-dark/40 z-10">Interactive satellite maps placeholder</span>
                  </div>

                  {project.nearby.schools.length > 0 || project.nearby.hospitals.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <div className="rounded-2xl border border-gray-150 bg-white p-5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-dark/50 flex items-center gap-1.5 mb-3">
                          <School className="h-4.5 w-4.5 text-primary" />
                          Education
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {project.nearby.schools.map((sch, i) => (
                            <li key={i} className="text-xs text-dark/70 font-semibold">• {sch}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-gray-150 bg-white p-5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-dark/50 flex items-center gap-1.5 mb-3">
                          <Hospital className="h-4.5 w-4.5 text-primary" />
                          Hospitals
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {project.nearby.hospitals.map((hosp, i) => (
                            <li key={i} className="text-xs text-dark/70 font-semibold">• {hosp}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-gray-150 bg-white p-5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-dark/50 flex items-center gap-1.5 mb-3">
                          <Train className="h-4.5 w-4.5 text-primary" />
                          Metro
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {project.nearby.metro.map((tr, i) => (
                            <li key={i} className="text-xs text-dark/70 font-semibold">• {tr}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-gray-150 bg-white p-5 text-center text-xs text-dark/50">
                      Plot/Commercial scheme location highlights: Swiftest transport corridors and commercial developments nearby.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* EMICalculator */}
            <div id="calculator" className="scroll-mt-24 border-t border-gray-200 pt-10">
              <EMICalculator initialPrincipal={project.priceMin} />
            </div>

            {/* Developer Port */}
            <div className="rounded-3xl border border-gray-200/60 bg-white p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-dark/50">About The Developer</h3>
              {builder ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-150 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dark text-white font-extrabold text-sm shadow-md">
                      {builder.logo}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-dark">{builder.name}</h4>
                      <div className="mt-0.5 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                        <span className="text-xs font-bold text-dark">{builder.rating}</span>
                        <span className="text-[10px] text-dark/45 font-medium">({builder.experienceYears} Years Developer Legacy)</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/projects?builderId=${builder.id}`}
                    className="rounded-xl border border-gray-250 bg-light px-4 py-2.5 text-xs font-bold text-dark hover:bg-dark hover:text-white transition-all self-start sm:self-auto"
                  >
                    View Developer Portfolio
                  </Link>
                </div>
              ) : null}
              <p className="text-xs text-dark/55 leading-relaxed">
                Developer properties listed on OAM undergo a comprehensive compliance verification check. We ensure active RERA registry status and clean title deeds prior to listing.
              </p>
            </div>
          </div>

          {/* Right column: Book VIP shuttle site visit */}
          <aside className="flex flex-col gap-6">
            <div id="book-visit" className="scroll-mt-24 rounded-3xl border border-primary/20 bg-dark p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)_0%,_transparent_55%)] opacity-20" />
              
              <div className="relative z-10 flex flex-col gap-5">
                <div>
                  <h3 className="text-md font-bold text-white">Schedule Free VIP Shuttle Tour</h3>
                  <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed">
                    Indore Valuation experts pick you up in a private vehicle. Direct site tour coordinates.
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col text-left">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Dhiraj Aggarwal"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col text-left">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Date */}
                  <div className="flex flex-col text-left">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-primary focus:outline-none cursor-pointer"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2.5 w-full rounded-xl bg-primary py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Securing Shuttle..." : "Confirm Shuttle Booking"}
                  </button>

                  {submitSuccess && (
                    <div className="rounded-xl bg-primary/20 border border-primary/30 p-3 text-center text-xs font-bold text-primary-light animate-fade-in">
                      ✓ Coordinated! Our VIP logistics driver will call to align coordinates.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Direct WhatsApp Callouts */}
            <div className="rounded-3xl border border-gray-200/60 bg-white p-6 shadow-sm flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-dark/50">Consult Valuation Advisor</h4>
              <div className="flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/919111239024?text=Hi,%20I%20want%20to%20review%20pricing%20worksheets%20for%20${encodeURIComponent(project.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 py-3 text-xs font-bold text-primary hover:bg-primary/15 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  Connect via WhatsApp
                </a>
                <a
                  href="tel:+919111239024"
                  className="flex items-center justify-center gap-2 rounded-xl bg-dark py-3 text-xs font-bold text-white hover:bg-primary transition-all"
                >
                  <Phone className="h-4 w-4" />
                  Direct Consultation Desk
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-20 border-t border-gray-200 pt-16">
            <h2 className="text-xl font-black text-dark tracking-tight sm:text-2xl">
              Related Property Classes in {project.location}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((proj) => (
                <PropertyCard key={proj.id} project={proj} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <CompareWidget />
    </>
  );
}
