"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, DollarSign, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface CalculationResult {
  monthlySavings: number;
  annualSavings: number;
  monthlyCost: number;
  netMonthlySavings: number;
  netAnnualSavings: number;
  roi: number;
  paybackMonths: number;
}

const ROICalculator: React.FC<{ className?: string }> = ({ className }) => {
  const [employees, setEmployees] = useState(100);
  const [hoursPerEmployee, setHoursPerEmployee] = useState(10);
  const [avgHourlyCost, setAvgHourlyCost] = useState(25);
  const [automationPercent, setAutomationPercent] = useState(50);
  const [solutionCost, setSolutionCost] = useState(5000);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    setShowResults(true);
    window.scrollBy({ top: 300, behavior: "smooth" });
  };

  const calculate = (): CalculationResult => {
    const totalHours = employees * hoursPerEmployee;
    const automationSavings = (totalHours * automationPercent) / 100;
    const monthlySavings = automationSavings * avgHourlyCost;
    const annualSavings = monthlySavings * 12;
    const monthlyCost = solutionCost;
    const netMonthlySavings = monthlySavings - monthlyCost;
    const netAnnualSavings = annualSavings - (solutionCost * 12);
    const roi = (netAnnualSavings / (solutionCost * 12)) * 100;
    const paybackMonths = solutionCost / monthlySavings;

    return {
      monthlySavings,
      annualSavings,
      monthlyCost,
      netMonthlySavings,
      netAnnualSavings,
      roi,
      paybackMonths,
    };
  };

  const result = calculate();
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-navy mb-2">
            Calculate Your ROI
          </h2>
          <p className="text-neutral-text-secondary">
            See how much you can save with AI automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Number of Employees */}
          <div>
            <label className="block text-sm font-medium text-neutral-text-primary mb-2">
              <Users className="h-4 w-4 inline mr-2" />
              Number of Employees
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-2 bg-neutral-border rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-text-secondary mt-1">
              <span>10</span>
              <span className="font-bold text-primary-navy text-lg">{employees}</span>
              <span>1000</span>
            </div>
          </div>

          {/* Hours per Employee */}
          <div>
            <label className="block text-sm font-medium text-neutral-text-primary mb-2">
              <Clock className="h-4 w-4 inline mr-2" />
              Hours per Employee/Month
            </label>
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={hoursPerEmployee}
              onChange={(e) => setHoursPerEmployee(Number(e.target.value))}
              className="w-full h-2 bg-neutral-border rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-text-secondary mt-1">
              <span>5</span>
              <span className="font-bold text-primary-navy text-lg">{hoursPerEmployee}</span>
              <span>40</span>
            </div>
          </div>

          {/* Average Hourly Cost */}
          <div>
            <label className="block text-sm font-medium text-neutral-text-primary mb-2">
              <DollarSign className="h-4 w-4 inline mr-2" />
              Average Hourly Cost ($)
            </label>
            <input
              type="range"
              min="15"
              max="100"
              step="5"
              value={avgHourlyCost}
              onChange={(e) => setAvgHourlyCost(Number(e.target.value))}
              className="w-full h-2 bg-neutral-border rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-text-secondary mt-1">
              <span>$15</span>
              <span className="font-bold text-primary-navy text-lg">${avgHourlyCost}</span>
              <span>$100</span>
            </div>
          </div>

          {/* Automation Percentage */}
          <div>
            <label className="block text-sm font-medium text-neutral-text-primary mb-2">
              <TrendingUp className="h-4 w-4 inline mr-2" />
              Automation Potential (%)
            </label>
            <input
              type="range"
              min="20"
              max="80"
              step="5"
              value={automationPercent}
              onChange={(e) => setAutomationPercent(Number(e.target.value))}
              className="w-full h-2 bg-neutral-border rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-text-secondary mt-1">
              <span>20%</span>
              <span className="font-bold text-primary-navy text-lg">{automationPercent}%</span>
              <span>80%</span>
            </div>
          </div>

          {/* Solution Cost */}
          <div>
            <label className="block text-sm font-medium text-neutral-text-primary mb-2">
              <DollarSign className="h-4 w-4 inline mr-2" />
              Estimated Monthly Cost ($)
            </label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={solutionCost}
              onChange={(e) => setSolutionCost(Number(e.target.value))}
              className="w-full h-2 bg-neutral-border rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-text-secondary mt-1">
              <span>$1K</span>
              <span className="font-bold text-primary-navy text-lg">
                {formatCurrency(solutionCost)}
              </span>
              <span>$50K</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleCalculate}
            className="group"
          >
            Calculate My ROI
            <ChevronRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 pt-8 border-t border-neutral-border"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary-navy mb-2">
                  Your Potential Savings
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-sm text-neutral-text-secondary mb-1">
                    Monthly Savings
                  </p>
                  <p className="text-3xl font-bold text-primary-navy">
                    {formatCurrency(result.monthlySavings)}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
                  <p className="text-sm text-neutral-text-secondary mb-1">
                    Annual Savings
                  </p>
                  <p className="text-3xl font-bold text-primary-blue">
                    {formatCurrency(result.annualSavings)}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <p className="text-sm text-neutral-text-secondary mb-1">
                    Net Annual Savings
                  </p>
                  <p className="text-3xl font-bold text-accent-success">
                    {formatCurrency(result.netAnnualSavings)}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                  <p className="text-sm text-neutral-text-secondary mb-1">
                    First-Year ROI
                  </p>
                  <p className="text-3xl font-bold text-primary-navy">
                    {result.roi.toFixed(0)}%
                  </p>
                </div>
              </div>

              <div className="bg-primary-navy text-white rounded-xl p-6 text-center">
                <p className="text-lg mb-2">
                  Payback Period:{" "}
                  <span className="font-bold text-2xl">
                    {result.paybackMonths.toFixed(1)} months
                  </span>
                </p>
                <p className="text-blue-100 text-sm">
                  Start saving in under {Math.ceil(result.paybackMonths)} months
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #1e3a8a;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #1e3a8a;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ROICalculator;


