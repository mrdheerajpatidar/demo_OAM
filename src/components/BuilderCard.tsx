import React from "react";
import Link from "next/link";
import { Star, Award, Building, ArrowRight } from "lucide-react";
import { Builder } from "@/data/mockData";

interface BuilderCardProps {
  builder: Builder;
}

export default function BuilderCard({ builder }: BuilderCardProps) {
  return (
    <div className="group relative flex flex-col rounded-3xl border border-gray-200/60 bg-white p-6 shadow-md shadow-gray-100/40 hover:shadow-xl hover:shadow-dark/5 transition-all duration-300">
      {/* Upper Info Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dark text-white font-extrabold text-sm shadow-md group-hover:bg-primary transition-all">
            {builder.logo}
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-dark group-hover:text-primary transition-colors">
              {builder.name}
            </h3>
            <div className="mt-0.5 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span className="text-xs font-bold text-dark">{builder.rating}</span>
              <span className="text-[10px] text-dark/45 font-medium">(Verified Developer)</span>
            </div>
          </div>
        </div>

        {builder.featured && (
          <span className="rounded-lg bg-gold/10 px-2.5 py-1 text-[9px] font-bold tracking-wider text-gold uppercase border border-gold/20 shrink-0">
            Premium Partner
          </span>
        )}
      </div>

      {/* Stats Summary */}
      <div className="my-5 grid grid-cols-2 gap-3 border-y border-gray-100 py-3.5 text-center">
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Projects</span>
          <span className="mt-0.5 flex items-center gap-1 text-xs font-extrabold text-dark">
            <Building className="h-3.5 w-3.5 text-primary shrink-0" />
            {builder.projectsCount} Active
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Experience</span>
          <span className="mt-0.5 flex items-center gap-1 text-xs font-extrabold text-dark">
            <Award className="h-3.5 w-3.5 text-primary shrink-0" />
            {builder.experienceYears} Years
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-dark/55 leading-relaxed flex-1 line-clamp-3">
        {builder.description}
      </p>

      {/* Action */}
      <Link
        href={`/projects?builderId=${builder.id}`}
        className="group mt-6 flex items-center justify-between rounded-xl bg-light px-4 py-3 text-xs font-bold text-dark hover:bg-dark hover:text-white transition-all"
      >
        <span>View Listed Projects</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
