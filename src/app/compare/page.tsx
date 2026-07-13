"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, GitCompare, Landmark, Sparkles, Building, MapPin, Check, Ruler, Calendar, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompareWidget from "@/components/CompareWidget";
import { projects } from "@/data/mockData";
import { getComparedIds, removeCompareId, clearCompare, COMPARE_EVENT } from "@/utils/compareHelper";

export default function Compare() {
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setComparedIds(getComparedIds());

    const handleUpdate = () => {
      setComparedIds(getComparedIds());
    };

    window.addEventListener(COMPARE_EVENT, handleUpdate);
    return () => window.removeEventListener(COMPARE_EVENT, handleUpdate);
  }, []);

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-32 text-center flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary mb-4" />
          <span className="text-xs font-bold text-dark/40 uppercase tracking-widest">Loading OAM Comparison...</span>
        </div>
        <Footer />
      </>
    );
  }

  const selectedProjects = comparedIds
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);

  const handleRemove = (id: string) => {
    removeCompareId(id);
  };

  // Decision-Fatigue reduction calculators: Determine matrix winners
  let lowestPriceId = "";
  let highestRoiId = "";

  if (selectedProjects.length > 1) {
    // 1. Lowest Price Winner
    const sortedByPrice = [...selectedProjects].sort((a, b) => (a?.priceMin || 0) - (b?.priceMin || 0));
    lowestPriceId = sortedByPrice[0]?.id || "";

    // 2. Highest ROI Winner
    const getRoiVal = (roiStr: string) => parseFloat(roiStr.replace("%", "").replace(" p.a.", "")) || 0;
    const sortedByRoi = [...selectedProjects].sort((a, b) => getRoiVal(b?.roi || "") - getRoiVal(a?.roi || ""));
    highestRoiId = sortedByRoi[0]?.id || "";
  }

  // Determine matrix category sheet
  let comparisonSheetType: "plot" | "villa" | "commercial" | "apartment" | "mixed" = "mixed";
  if (selectedProjects.length > 0) {
    const firstCat = selectedProjects[0]?.category;
    const allSame = selectedProjects.every(p => p?.category === firstCat);
    if (allSame && firstCat) {
      comparisonSheetType = firstCat;
    }
  }

  // Render spec cells helper
  const renderSpecRow = (label: string, accessor: (proj: any) => React.ReactNode) => {
    return (
      <div className="grid grid-cols-4 gap-6 py-4 border-b border-gray-100 items-center">
        <div className="text-xs font-bold text-dark/50 uppercase tracking-wider">{label}</div>
        {selectedProjects.map((p) => (
          <div key={p?.id} className="text-xs font-extrabold text-dark">
            {accessor(p)}
          </div>
        ))}
        {[...Array(3 - selectedProjects.length)].map((_, i) => (
          <div key={i} className="text-xs text-dark/30">-</div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-dark/40">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-dark">Compare Matrix</span>
        </div>

        {/* Header */}
        <div className="mt-6 flex items-center justify-between border-b border-gray-200/60 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-dark sm:text-4xl">
              Comparative Analysis Matrix
            </h1>
            <p className="text-xs text-dark/50 mt-1 max-w-xl leading-relaxed">
              CarDekho-style comparative evaluation dashboard. Automated indicators highlight pricing and yield winners.
            </p>
          </div>
          {selectedProjects.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs font-bold text-dark/45 hover:text-primary transition-all uppercase tracking-wider animate-pulse"
            >
              Clear Comparison
            </button>
          )}
        </div>

        {selectedProjects.length === 0 ? (
          <div className="mx-auto mt-16 max-w-lg rounded-3xl border border-gray-200/50 bg-white p-12 text-center shadow-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <GitCompare className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-base font-black text-dark">No Properties Selected</h3>
            <p className="mt-2 text-xs text-dark/50 leading-relaxed max-w-xs mx-auto">
              Please browse our listings and toggle the "Compare" checkbox on up to 3 residential plots, commercial units, or luxury villas.
            </p>
            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-primary-dark transition-all"
            >
              Browse Indore Properties
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Mini-cards Row */}
              <div className="grid grid-cols-4 gap-6 border-b border-gray-200 pb-8">
                {/* OAM Analytics badge column */}
                <div className="flex flex-col justify-end pr-4">
                  <div className="flex flex-col gap-2 rounded-2xl bg-primary/10 p-4 border border-primary/15">
                    <span className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 shrink-0" />
                      Comparative Matrix
                    </span>
                    <span className="text-[10px] text-dark/60 font-semibold leading-relaxed">
                      Analyzing shared characteristics for: <strong className="text-primary font-black uppercase">{comparisonSheetType}</strong> units.
                    </span>
                  </div>
                </div>

                {/* Properties columns */}
                {selectedProjects.map((proj) => {
                  if (!proj) return null;
                  const isLowestPrice = proj.id === lowestPriceId;
                  const isHighestRoi = proj.id === highestRoiId;

                  return (
                    <div key={proj.id} className="group relative rounded-3xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                      <button
                        onClick={() => handleRemove(proj.id)}
                        className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-dark/40 shadow-md border border-gray-150 hover:bg-gray-100 hover:text-dark transition-all z-10"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>

                      {/* CRO Winner Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                        {isLowestPrice && (
                          <span className="rounded bg-emerald-600 px-2 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider">
                            💰 Best Entry Price
                          </span>
                        )}
                        {isHighestRoi && (
                          <span className="rounded bg-amber-600 px-2 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider">
                            🏆 Highest Growth potential
                          </span>
                        )}
                      </div>

                      <div>
                        <img
                          src={proj.image}
                          alt={proj.name}
                          className="aspect-video w-full rounded-2xl object-cover"
                        />
                        <span className="mt-3 block text-[9px] font-bold uppercase tracking-wider text-dark/40">
                          {proj.type} • {proj.location}
                        </span>
                        <h3 className="text-xs font-extrabold text-dark tracking-tight leading-snug line-clamp-2 mt-1">
                          {proj.name}
                        </h3>
                      </div>

                      <div className="mt-4 flex flex-col gap-2">
                        <Link
                          href={`/projects/${proj.id}`}
                          className="text-center rounded-xl bg-light py-2 text-[10px] font-bold text-dark hover:bg-dark hover:text-white transition-all"
                        >
                          Book VIP Shuttle Tour
                        </Link>
                      </div>
                    </div>
                  );
                })}

                {/* Empty column slots */}
                {[...Array(3 - selectedProjects.length)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-6 bg-light/35"
                  >
                    <GitCompare className="h-6 w-6 text-dark/20" />
                    <span className="mt-2 text-[10px] font-bold text-dark/40">Slot Open</span>
                    <Link
                      href="/projects"
                      className="mt-3 text-[10px] font-bold text-primary hover:underline"
                    >
                      Browse +
                    </Link>
                  </div>
                ))}
              </div>

              {/* Dynamic Comparison Matrix rows */}
              <div className="flex flex-col mt-4">
                {/* Universal Rows */}
                {renderSpecRow("Asset Class Type", (p) => <span className="rounded-lg bg-light border px-2 py-0.5 text-[10px] font-bold text-dark">{p.type}</span>)}
                {renderSpecRow("Price Bracket", (p) => <span className="text-primary font-black">{p.price}</span>)}
                {renderSpecRow("Developer Builder", (p) => p.builderName)}
                {renderSpecRow("Indore Locality", (p) => p.location)}
                {renderSpecRow("Average ROI Yield", (p) => <span className="text-gold font-extrabold">{p.roi}</span>)}
                {renderSpecRow("Est. Starting EMI", (p) => p.emi)}

                {/* Category Specific Rows */}
                {comparisonSheetType === "plot" && (
                  <>
                    {renderSpecRow("Plot Size Area", (p) => p.plotDetails?.plotSize)}
                    {renderSpecRow("Facing Direction", (p) => p.plotDetails?.facing)}
                    {renderSpecRow("Is Corner Plot", (p) => p.plotDetails?.isCornerPlot ? "Yes (Premium)" : "No")}
                    {renderSpecRow("Registry Status", (p) => p.plotDetails?.registryStatus)}
                    {renderSpecRow("Colony Approval", (p) => p.plotDetails?.colonyApproval)}
                    {renderSpecRow("Approach Road Width", (p) => p.plotDetails?.roadWidth)}
                    {renderSpecRow("Water Supply Line", (p) => p.plotDetails?.hasWater ? "Pre-installed" : "Pending")}
                    {renderSpecRow("Electricity Grid", (p) => p.plotDetails?.hasElectricity ? "Connected" : "Pending")}
                    {renderSpecRow("Appreciation Potential", (p) => p.plotDetails?.appreciationPotential)}
                  </>
                )}

                {comparisonSheetType === "villa" && (
                  <>
                    {renderSpecRow("Land Area sqft", (p) => p.villaDetails?.landArea)}
                    {renderSpecRow("Construction Area", (p) => p.villaDetails?.constructionArea)}
                    {renderSpecRow("Bedrooms Count", (p) => `${p.villaDetails?.bedroomsCount} Bedrooms`)}
                    {renderSpecRow("Private Lawn Garden", (p) => p.villaDetails?.hasGarden ? "Included" : "No")}
                    {renderSpecRow("Private Parking Slot", (p) => p.villaDetails?.privateParking ? "Yes (Dedicated)" : "Common")}
                    {renderSpecRow("Gated Community", (p) => p.villaDetails?.isGated ? "Yes (3-tier security)" : "No")}
                  </>
                )}

                {comparisonSheetType === "commercial" && (
                  <>
                    {renderSpecRow("Frontage Main Road", (p) => p.commercialDetails?.frontage)}
                    {renderSpecRow("Carpet Area Size", (p) => p.area)}
                    {renderSpecRow("Footfall Category", (p) => p.commercialDetails?.footfall)}
                    {renderSpecRow("Rental Yield Index", (p) => <span className="text-primary font-black">{p.commercialDetails?.rentalYield} p.a.</span>)}
                    {renderSpecRow("Suitable Businesses", (p) => p.commercialDetails?.suitableBusiness.join(", "))}
                  </>
                )}

                {comparisonSheetType === "apartment" && (
                  <>
                    {renderSpecRow("Configurations", (p) => p.apartmentDetails?.bhk.map((b: number) => `${b} BHK`).join(", "))}
                    {renderSpecRow("Tower Block", (p) => p.apartmentDetails?.towerName)}
                    {renderSpecRow("Maintenance Rate", (p) => p.apartmentDetails?.maintenance)}
                    {renderSpecRow("Parking Spaces", (p) => `${p.apartmentDetails?.parkingCount} Car slot`)}
                    {renderSpecRow("Clubhouse Access", (p) => p.apartmentDetails?.hasClubhouse ? "Yes (Complimentary)" : "No")}
                    {renderSpecRow("Lifts Elevators", (p) => p.apartmentDetails?.hasLift ? "High-Speed Capsule" : "No")}
                  </>
                )}

                {comparisonSheetType === "mixed" && (
                  <>
                    {renderSpecRow("General Area", (p) => p.area)}
                    {renderSpecRow("Possession Schedule", (p) => p.possession)}
                    {renderSpecRow("Audit Status", (p) => <span className="text-primary font-bold">RERA Approved</span>)}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CompareWidget />
    </>
  );
}
