"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Phone, MessageCircle, Mail, MapPin, Check, Send, Globe, Award, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompareWidget from "@/components/CompareWidget";
import { projects } from "@/data/mockData";

function ContactContent() {
  const searchParams = useSearchParams();
  const preselectedProjectId = searchParams.get("project") || "";

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProject, setSelectedProject] = useState(preselectedProjectId);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (preselectedProjectId) {
      setSelectedProject(preselectedProjectId);
    }
  }, [preselectedProjectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setSelectedProject("");
      setMessage("");
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-dark/40">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-dark">Contact</span>
      </div>

      {/* Page Title */}
      <div className="mt-6 flex flex-col gap-2 border-b border-gray-200/60 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-dark sm:text-4xl">
          Connect With Real Estate Counselors
        </h1>
        <p className="text-xs text-dark/50 mt-1 max-w-xl leading-relaxed">
          Need details about a project? Schedule a VIP shuttle visit or talk to our home financing team.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left Column: Coordinates */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-black">
              Direct Channels
            </span>
            <h2 className="mt-2.5 text-xl font-black text-dark tracking-tight">
              Get in Touch Instantly
            </h2>
            <p className="mt-3 text-xs text-dark/55 leading-relaxed font-medium">
              We respond to WhatsApp requests and loan queries within 1 business hour.
            </p>
          </div>

          {/* Contact Methods Cards */}
          <div className="flex flex-col gap-4">
            {/* Phone */}
            <div className="flex items-start gap-4 rounded-2xl border border-gray-150 bg-white p-5 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xs font-extrabold text-dark uppercase tracking-wider">Phone Call</h3>
                <p className="mt-1 text-xs text-dark/70 font-semibold">+91 91112 39024</p>
                <p className="mt-0.5 text-[10px] text-dark/40 font-medium">Mon-Sat, 9AM to 7PM IST</p>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919111239024?text=Hi,%20I%20have%20an%20inquiry%2520regarding%2520Indore%2520properties"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-gray-150 bg-white p-5 shadow-sm hover:border-primary/30 transition-all text-left"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xs font-extrabold text-dark uppercase tracking-wider group-hover:text-primary transition-colors">WhatsApp Support</h3>
                <p className="mt-1 text-xs text-dark/70 font-semibold">+91 91112 39024</p>
                <p className="mt-0.5 text-[10px] text-dark/40 font-medium">Available 24/7 for urgent chats</p>
              </div>
            </a>

            {/* Email */}
            <div className="flex items-start gap-4 rounded-2xl border border-gray-150 bg-white p-5 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xs font-extrabold text-dark uppercase tracking-wider">Corporate Email</h3>
                <p className="mt-1 text-xs text-dark/70 font-semibold">contact@onlineawasmela.com</p>
                <p className="mt-0.5 text-[10px] text-dark/40 font-medium">Official developer listings desk</p>
              </div>
            </div>
          </div>

          {/* RERA Check banner */}
          <div className="rounded-2xl bg-gold/5 border border-gold/20 p-5 flex gap-3 text-xs text-gold">
            <ShieldCheck className="h-6 w-6 text-gold shrink-0 mt-0.5" />
            <div>
              <strong className="block font-black uppercase tracking-wider">Compliance Priority</strong>
              <span className="block mt-1 font-medium text-dark/70">OAM only operates with developers holding verified RERA registration status.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Modern Contact Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-3xl border border-gray-250 bg-white p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-dark/50 mb-6">Inquiry form</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Aggarwal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl bg-light border border-gray-200 px-3.5 py-2.5 text-xs text-dark focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Email ID *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ramesh@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl bg-light border border-gray-200 px-3.5 py-2.5 text-xs text-dark focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Active Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5 w-full rounded-xl bg-light border border-gray-200 px-3.5 py-2.5 text-xs text-dark focus:border-primary focus:outline-none"
                />
              </div>

              {/* Selected Project dropdown */}
              <div className="flex flex-col">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Select Project Interest (Optional)</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="mt-1.5 w-full rounded-xl bg-light border border-gray-200 p-3 text-xs font-bold text-dark focus:outline-none"
                >
                  <option value="">General Inquiry / Talk to Banker</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-[9px] font-bold uppercase tracking-wider text-dark/40">Message Details</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your configuration preferences, budget limits, or home loan queries..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full rounded-xl bg-light border border-gray-200 px-3.5 py-2.5 text-xs text-dark focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry Details"}
                <Send className="h-3.5 w-3.5" />
              </button>

              {submitSuccess && (
                <div className="rounded-xl bg-primary/20 border border-primary/30 p-3 text-center text-xs font-bold text-primary-light">
                  ✓ Message Sent successfully! A local OAM counselor will connect on your mobile shortly.
                </div>
              )}
            </form>
          </div>

          {/* Office HQ & Maps placeholder */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-dark/50">Office Headquarters</h3>
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-1.5 text-xs font-extrabold text-dark">
                  <MapPin className="h-4.5 w-4.5 text-primary" />
                  Sukhliya Corporate HQ
                </span>
                <p className="text-xs text-dark/55 leading-relaxed pl-6 max-w-sm">
                  A304 Aditya Gateway Sukhliya, Indore, Madhya Pradesh - 452003
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-dark/40 shrink-0 bg-light p-3.5 rounded-xl border border-gray-150 font-semibold self-start sm:self-auto">
                <Globe className="h-4 w-4 text-primary" />
                <span>Indore-Focused Proptech</span>
              </div>
            </div>

            {/* Map Frame graphic placeholder */}
            <div className="w-full aspect-21/9 rounded-2xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#111827_1px,transparent_1px)] [background-size:16px_16px]" />
              <MapPin className="h-6 w-6 text-primary animate-bounce z-10" />
              <span className="mt-2 text-xs font-bold text-dark z-10">Sukhliya Google Map Placeholder</span>
              <span className="text-[9px] text-dark/40 z-10">Interactive satellite maps iframe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-32 text-center flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary mb-4" />
            <span className="text-xs font-bold text-dark/40 uppercase tracking-widest">Loading contact console...</span>
          </div>
        }
      >
        <ContactContent />
      </Suspense>
      <Footer />
      <CompareWidget />
    </>
  );
}
