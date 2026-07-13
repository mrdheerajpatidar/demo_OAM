"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, GitCompare, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getComparedIds, removeCompareId, clearCompare, COMPARE_EVENT } from "@/utils/compareHelper";
import { projects } from "@/data/mockData";

export default function CompareWidget() {
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

  if (!mounted || comparedIds.length === 0) return null;

  // Fetch full project data for selected IDs
  const selectedProjects = comparedIds
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        exit={{ y: 100, opacity: 0, x: "-50%" }}
        className="fixed bottom-6 left-1/2 z-50 w-[92%] max-w-3xl -translate-x-1/2 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl shadow-dark/10 backdrop-blur-md md:p-5"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Header & Items Info */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GitCompare className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-dark">Compare Projects</h4>
              <p className="text-[11px] text-dark/50">
                Choose up to 3 properties to compare side-by-side
              </p>
            </div>
            <span className="rounded-full bg-dark px-2.5 py-0.5 text-xs font-semibold text-white">
              {comparedIds.length}/3 Selected
            </span>
          </div>

          {/* Cards & CTA Row */}
          <div className="flex flex-1 items-center justify-between gap-6 sm:justify-end">
            <div className="flex items-center gap-3 overflow-x-auto py-1">
              {selectedProjects.map((proj) => {
                if (!proj) return null;
                return (
                  <div
                    key={proj.id}
                    className="relative flex items-center gap-2 rounded-xl border border-gray-150 bg-light p-1.5 pr-3 shadow-sm hover:border-gray-300 transition-all shrink-0"
                  >
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="h-8 w-8 rounded-lg object-cover"
                    />
                    <span className="max-w-[80px] truncate text-[11px] font-bold text-dark md:max-w-[120px]">
                      {proj.name}
                    </span>
                    <button
                      onClick={() => removeCompareId(proj.id)}
                      className="rounded-full bg-white p-0.5 text-dark/40 shadow-sm hover:bg-gray-200 hover:text-dark transition-all"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-dark/45 hover:text-dark transition-all"
              >
                Clear
              </button>
              <Link
                href="/compare"
                className="group flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-primary/10 hover:bg-primary-dark transition-all hover:scale-[1.02]"
              >
                Compare Now
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
