"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Compare", path: "/compare" },
    { name: "Home Loan", path: "/home-loan" },
    { name: "Builder Partnership", path: "/builder-partnership" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-200/50 bg-white/75 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="group flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/20 transition-all group-hover:scale-105">
                  <span className="text-xl font-bold tracking-wider">O</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-dark transition-colors group-hover:text-primary">
                    Awas Mela
                  </span>
                  <span className="text-[10px] -mt-1 font-semibold tracking-widest text-gold uppercase">
                    Online Startup
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-dark/70"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA Action */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                <Link
                  href="/projects"
                  className="group flex items-center gap-1.5 rounded-full bg-dark px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-primary transition-all"
                >
                  Explore Projects
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-dark hover:bg-gray-100 hover:text-primary focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-dark/20 backdrop-blur-sm"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-xl flex flex-col border-l border-gray-100"
            >
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold">
                    O
                  </div>
                  <span className="text-md font-bold tracking-tight text-dark">
                    Awas Mela
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-dark hover:bg-gray-100 hover:text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 py-8 flex flex-col gap-6 overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-semibold tracking-wide transition-colors ${
                        isActive ? "text-primary pl-2 border-l-2 border-primary" : "text-dark/70 hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs text-dark/50">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  RERA Registered Properties Only
                </div>
                <Link
                  href="/projects"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/10 hover:bg-primary-dark transition-all"
                >
                  Explore Projects
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
