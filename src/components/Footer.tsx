"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Compass, Shield, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Search Projects", path: "/projects" },
    { name: "Compare Tools", path: "/compare" },
    { name: "Home Loan Rates", path: "/home-loan" },
    { name: "Builder Association", path: "/builder-partnership" },
    { name: "Our Story", path: "/about" },
    { name: "Support Contact", path: "/contact" },
  ];

  const indoreLocations = [
    { name: "Vijay Nagar", query: "Vijay Nagar" },
    { name: "Nipania", query: "Nipania" },
    { name: "Super Corridor", query: "Super Corridor" },
    { name: "Bypass Road", query: "Bypass Road" },
    { name: "Mahalaxmi Nagar", query: "Mahalaxmi Nagar" },
  ];

  return (
    <footer className="mt-auto border-t border-gray-200/60 bg-dark text-white/90">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold">
                O
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Awas Mela
              </span>
            </Link>
            <p className="text-xs text-white/60 leading-relaxed max-w-xs">
              Indore's trusted real estate sales and comparison platform. We connect premium home-seekers with RERA-registered developers using modern data standards.
            </p>
            <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold tracking-wider text-gold uppercase bg-white/5 self-start px-2.5 py-1.5 rounded-md border border-white/10">
              <Shield className="h-3.5 w-3.5 text-primary" />
              100% RERA VERIFIED ONLY
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.path}
                    className="text-xs text-white/50 transition-colors hover:text-primary hover:underline decoration-primary decoration-2 underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trending Locations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Indore Hotspots
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {indoreLocations.map((loc, idx) => (
                <li key={idx}>
                  <Link
                    href={`/projects?location=${encodeURIComponent(loc.query)}`}
                    className="text-xs text-white/50 transition-colors hover:text-primary hover:underline decoration-primary decoration-2 underline-offset-4"
                  >
                    Properties in {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Contact HQ
              </h3>
              <div className="mt-4 flex flex-col gap-2.5 text-xs text-white/50">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span>A304 Aditya Gateway Sukhliya, Indore, MP 452003</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>+91 91112 39024</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>contact@onlineawasmela.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                OAM Newsletter
              </h3>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-2.5 flex items-center bg-white/5 border border-white/10 rounded-lg p-1.5 focus-within:border-primary/50 transition-all"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-2.5 py-1 text-xs text-white placeholder-white/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-white hover:bg-primary-dark transition-all"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Lower Row */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/40 leading-relaxed text-center sm:text-left max-w-2xl">
            Disclaimer: Online Awas Mela (OAM) is an independent marketing & real estate service provider. All builders, projects, specifications and floor layouts are based on developer submissions. RERA registrations must be verified independently by buyer prior to signing sale agreements.
          </p>
          <p className="text-[11px] text-white/40 shrink-0">
            © {currentYear} Online Awas Mela. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
