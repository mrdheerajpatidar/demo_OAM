"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, IndianRupee } from "lucide-react";

interface EMICalculatorProps {
  initialPrincipal?: number; // Prefilled loan amount
}

export default function EMICalculator({ initialPrincipal }: EMICalculatorProps) {
  // Default values: 80% of project price or 50L
  const defaultPrincipal = initialPrincipal ? Math.round(initialPrincipal * 0.8) : 5000000;

  const [principal, setPrincipal] = useState(defaultPrincipal);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20); // in years

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  useEffect(() => {
    if (initialPrincipal) {
      setPrincipal(Math.round(initialPrincipal * 0.8));
    }
  }, [initialPrincipal]);

  useEffect(() => {
    const P = principal;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;

    // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

    if (isFinite(emi)) {
      const formattedEmi = Math.round(emi);
      const payable = formattedEmi * n;
      const interest = payable - P;

      setMonthlyEMI(formattedEmi);
      setTotalPayable(payable);
      setTotalInterest(interest);
    }
  }, [principal, interestRate, tenure]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  const formatRawCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Percentages for stacked progress bar
  const principalPercentage = (principal / totalPayable) * 100 || 0;
  const interestPercentage = 100 - principalPercentage || 0;

  return (
    <div className="rounded-3xl border border-gray-200/60 bg-white p-6 shadow-lg shadow-dark/5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-md font-bold text-dark">Home Loan EMI Calculator</h3>
          <p className="text-[11px] text-dark/50">Plan your home financing options instantly</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Sliders Input */}
        <div className="flex flex-col gap-6">
          {/* Principal Slider */}
          <div className="flex flex-col">
            <div className="flex justify-between text-xs font-bold text-dark">
              <span>Loan Amount</span>
              <span className="text-primary font-black">{formatRawCurrency(principal)}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={100000}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer rounded-lg bg-gray-200 accent-primary"
            />
            <div className="mt-1 flex justify-between text-[9px] font-bold text-dark/40">
              <span>₹10 Lakhs</span>
              <span>₹5 Crores</span>
            </div>
          </div>

          {/* Interest Slider */}
          <div className="flex flex-col">
            <div className="flex justify-between text-xs font-bold text-dark">
              <span>Interest Rate (p.a.)</span>
              <span className="text-primary font-black">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={7}
              max={15}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer rounded-lg bg-gray-200 accent-primary"
            />
            <div className="mt-1 flex justify-between text-[9px] font-bold text-dark/40">
              <span>7%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="flex flex-col">
            <div className="flex justify-between text-xs font-bold text-dark">
              <span>Tenure (Years)</span>
              <span className="text-primary font-black">{tenure} Years</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer rounded-lg bg-gray-200 accent-primary"
            />
            <div className="mt-1 flex justify-between text-[9px] font-bold text-dark/40">
              <span>5 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Results Output */}
        <div className="flex flex-col justify-between rounded-2xl bg-light p-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-dark/40">
              Estimated Monthly EMI
            </span>
            <span className="mt-1.5 text-3xl font-black tracking-tight text-primary">
              {formatRawCurrency(monthlyEMI)}
            </span>
            <span className="text-[9px] text-dark/40 mt-0.5">Calculated at {interestRate}% for {tenure} years</span>
          </div>

          <div className="my-6 h-[1px] w-full bg-gray-200" />

          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-dark/60">Principal Amount</span>
              <span className="font-extrabold text-dark">{formatRawCurrency(principal)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="font-bold text-dark/60">Total Interest Payable</span>
              <span className="font-extrabold text-dark">{formatRawCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between text-xs border-t border-gray-200 pt-3">
              <span className="font-bold text-dark">Total Amount Payable</span>
              <span className="font-black text-primary">{formatRawCurrency(totalPayable)}</span>
            </div>
          </div>

          {/* Visual Stacked Bar */}
          <div className="mt-6 flex h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              style={{ width: `${principalPercentage}%` }}
              className="bg-primary transition-all duration-300"
              title={`Principal: ${principalPercentage.toFixed(1)}%`}
            />
            <div
              style={{ width: `${interestPercentage}%` }}
              className="bg-gold transition-all duration-300"
              title={`Interest: ${interestPercentage.toFixed(1)}%`}
            />
          </div>
          <div className="mt-2 flex justify-between text-[9px] font-bold text-dark/40">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Principal ({principalPercentage.toFixed(0)}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Interest ({interestPercentage.toFixed(0)}%)
            </span>
          </div>

          <Link
            href="/home-loan#apply"
            className="group mt-6 flex items-center justify-center gap-2 rounded-xl bg-dark py-3.5 text-xs font-bold text-white shadow-md hover:bg-primary transition-all"
          >
            Apply for Bank Loan
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
