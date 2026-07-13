"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { MapPin, Building, Ruler, Calendar, ArrowRight, GitCompare } from "lucide-react";
import { Project } from "@/data/mockData";
import { getComparedIds, addCompareId, removeCompareId, COMPARE_EVENT } from "@/utils/compareHelper";

interface PropertyCardProps {
  project: Project;
}

export default function PropertyCard({ project }: PropertyCardProps) {
  const [isAddedToCompare, setIsAddedToCompare] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsAddedToCompare(getComparedIds().includes(project.id));

    const handleUpdate = () => {
      setIsAddedToCompare(getComparedIds().includes(project.id));
    };

    window.addEventListener(COMPARE_EVENT, handleUpdate);
    return () => window.removeEventListener(COMPARE_EVENT, handleUpdate);
  }, [project.id]);

  const handleCompareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const added = addCompareId(project.id);
      if (!added) {
        e.target.checked = false;
        alert("You can compare up to 3 properties at a time.");
      }
    } else {
      removeCompareId(project.id);
    }
  };

  const bhkString = project.apartmentDetails?.bhk.length 
    ? `${project.apartmentDetails.bhk.join("/")} BHK`
    : "Residences";

  // Dynamic spec sheet based on category
  let specSection = null;

  if (project.category === "plot" && project.plotDetails) {
    specSection = (
      <div className="grid grid-cols-3 gap-2.5 text-center text-[11px] font-semibold text-dark/70">
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-100">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Plot size</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.plotDetails.plotSize.split(" ")[0]} sqft</span>
        </div>
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-150">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Facing</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.plotDetails.facing}</span>
        </div>
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-150">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Road</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.plotDetails.roadWidth.split(" ")[0]}ft</span>
        </div>
      </div>
    );
  } else if (project.category === "commercial" && project.commercialDetails) {
    specSection = (
      <div className="grid grid-cols-3 gap-2.5 text-center text-[11px] font-semibold text-dark/70">
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-100">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Frontage</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.commercialDetails.frontage.split(" ")[0]} ft</span>
        </div>
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-150">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Carpet Size</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.area.split(" ")[0]} sqft</span>
        </div>
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-150">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Est. Yield</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.commercialDetails.rentalYield}</span>
        </div>
      </div>
    );
  } else if (project.category === "villa" && project.villaDetails) {
    specSection = (
      <div className="grid grid-cols-3 gap-2.5 text-center text-[11px] font-semibold text-dark/70">
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-100">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Bedrooms</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.villaDetails.bedroomsCount} BHK</span>
        </div>
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-150">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Lawn Garden</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.villaDetails.hasGarden ? "Included" : "No"}</span>
        </div>
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-150">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Gated Area</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.villaDetails.isGated ? "3-Tier" : "No"}</span>
        </div>
      </div>
    );
  } else {
    // Default Apartment
    specSection = (
      <div className="grid grid-cols-3 gap-2.5 text-center text-[11px] font-semibold text-dark/70">
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-100">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Configuration</span>
          <span className="mt-0.5 text-dark font-extrabold">{bhkString}</span>
        </div>
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-150">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Carpet Size</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.area.split(" ")[0]} sqft</span>
        </div>
        <div className="flex flex-col items-center py-1 bg-light/65 rounded-xl border border-gray-150">
          <span className="text-[8px] font-bold uppercase tracking-wider text-dark/40">Possession</span>
          <span className="mt-0.5 text-dark font-extrabold">{project.possession.split(" ")[0]}</span>
        </div>
      </div>
    );
  }

  const trustScore = 9.0 + (Number(project.id.split("-")[1] || 5) % 10) * 0.1;

  // Spring animations values
  const cardVariants: Variants = {
    hover: {
      y: shouldReduceMotion ? 0 : -6,
      scale: shouldReduceMotion ? 1 : 1.015,
      transition: { type: "spring", stiffness: 350, damping: 22 }
    },
    tap: {
      scale: shouldReduceMotion ? 1 : 0.985
    }
  };

  const imageVariants: Variants = {
    hover: {
      scale: shouldReduceMotion ? 1 : 1.04,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200/60 bg-white shadow-md shadow-gray-100/40 hover:shadow-xl hover:shadow-dark/5 transition-all duration-300 cursor-pointer"
    >
      {/* Property Image & Badges */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
        <motion.img
          variants={imageVariants}
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* Type Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
          <span className="rounded-lg bg-dark/70 backdrop-blur-md px-2.5 py-1 text-[9px] font-black tracking-widest text-white uppercase shadow-sm">
            {project.type}
          </span>
          {project.newLaunch && (
            <span className="rounded-lg bg-primary/95 backdrop-blur-md px-2.5 py-1 text-[9px] font-black tracking-widest text-white uppercase shadow-sm animate-pulse">
              New Launch
            </span>
          )}
        </div>

        {/* Compare Checkbox */}
        <label className="absolute top-4 right-4 flex items-center gap-1.5 cursor-pointer rounded-xl bg-white/95 backdrop-blur-md px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-dark shadow-sm hover:bg-white transition-all select-none">
          <input
            type="checkbox"
            checked={isAddedToCompare}
            onChange={handleCompareChange}
            className="h-3.5 w-3.5 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
          />
          <GitCompare className="h-3 w-3 text-dark/70" />
          <span>Compare</span>
        </label>
      </div>

      {/* Property Details */}
      <div className="flex flex-1 flex-col p-6">
        {/* Trust Index Summary & Location */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-dark/50 font-bold">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{project.location}, Indore</span>
          </div>
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[9px] font-extrabold text-primary flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            {trustScore.toFixed(1)} OAM Score
          </span>
        </div>

        <h3 className="mt-2 text-md font-bold tracking-tight text-dark line-clamp-1 group-hover:text-primary transition-colors">
          <Link href={`/projects/${project.id}`}>{project.name}</Link>
        </h3>

        {/* Builder Name */}
        <div className="mt-1 flex items-center gap-1 text-xs text-dark/65 font-medium">
          <Building className="h-3.5 w-3.5 text-dark/40 shrink-0" />
          <span>By {project.builderName}</span>
        </div>

        <div className="my-4.5 h-[1px] w-full bg-gray-150" />

        {/* Adaptive spec grid based on category */}
        {specSection}

        {/* Price Tag */}
        <div className="mt-5 flex items-baseline justify-between border-t border-gray-150 pt-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-widest text-dark/40">Direct Pricing</span>
            <span className="text-md font-black tracking-tight text-primary">{project.price.split(" - ")[0]}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold uppercase tracking-widest text-dark/40">Appreciation Index</span>
            <span className="text-xs font-black text-gold">{project.roi} p.a.</span>
          </div>
        </div>

        {/* Actions Button Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-3 text-xs font-bold text-dark hover:bg-light transition-all"
          >
            Review Specs
          </Link>
          <Link
            href={`/projects/${project.id}#book-visit`}
            className="group flex items-center justify-center gap-1.5 rounded-xl bg-dark py-3 text-xs font-black text-white hover:bg-primary transition-all shadow-md shadow-dark/5 hover:shadow-primary/10 hover:scale-[1.02]"
          >
            Book Free Site Tour
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
