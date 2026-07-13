"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col gap-10">
      {/* Skeleton Header */}
      <div className="flex flex-col gap-3 animate-pulse">
        <div className="h-4 w-28 rounded-md bg-gray-200" />
        <div className="h-10 w-2/3 rounded-xl bg-gray-200" />
        <div className="h-5 w-1/2 rounded-md bg-gray-200/70" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-3xl border border-gray-250 bg-white p-5 gap-4 animate-pulse shadow-sm"
          >
            {/* Image placeholder */}
            <div className="aspect-16/10 w-full rounded-2xl bg-gray-200" />
            
            {/* Location & Title */}
            <div className="flex flex-col gap-2">
              <div className="h-3 w-1/3 rounded bg-gray-200" />
              <div className="h-5 w-3/4 rounded bg-gray-200" />
            </div>

            {/* Spec lines */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="h-10 rounded-xl bg-gray-200" />
              <div className="h-10 rounded-xl bg-gray-200" />
              <div className="h-10 rounded-xl bg-gray-200" />
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 flex gap-3">
              <div className="h-10 w-1/2 rounded-xl bg-gray-200" />
              <div className="h-10 w-1/2 rounded-xl bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
