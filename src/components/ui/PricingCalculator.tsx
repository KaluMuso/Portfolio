"use client";
import { useState } from "react";
import { Calculator, Check } from "lucide-react";

type Feature = {
  id: string;
  label: string;
  price: number;
  description: string;
};

const BASE_TYPES = [
  { id: "spa", label: "Single Page App (SPA)", base: 75 },
  { id: "pwa", label: "Progressive Web App (PWA)", base: 150 },
  { id: "ecommerce", label: "E-Commerce Store", base: 350 },
  { id: "saas", label: "SaaS Platform", base: 700 },
];

const WEB_FEATURES: Feature[] = [
  { id: "geo", label: "Geo-location Maps", price: 80, description: "Google Maps or Leaflet integration" },
  { id: "chatbot", label: "AI Chatbot", price: 120, description: "Custom AI assistant widget" },
  { id: "hosting", label: "Hosting Setup", price: 30, description: "Vercel / Firebase deployment" },
  { id: "domain", label: "Domain Configuration", price: 25, description: "DNS setup + SSL cert" },
  { id: "automation", label: "Workflow Automation", price: 150, description: "N8N flows + integrations" },
  { id: "blog", label: "Blog / CMS", price: 100, description: "Sanity or Notion-powered blog" },
  { id: "auth", label: "Auth System", price: 90, description: "Login, roles, Supabase Auth" },
  { id: "payments", label: "Payment Integration", price: 110, description: "Lenco and DPO or local gateway" },
  { id: "seo", label: "SEO Package", price: 60, description: "Schema, sitemap, meta optimization" },
  { id: "admin", label: "Admin Dashboard", price: 200, description: "Custom CMS / management panel" },
];

const WORKFLOW_PACKAGES = [
  {
    id: "starter",
    label: "Starter Automation",
    price: 120,
    description: "Single workflow, up to 3 integrations",
    features: ["1 N8N workflow", "Up to 3 app integrations", "Email or WhatsApp trigger", "Basic error handling"],
  },
  {
    id: "business",
    label: "Business Automation",
    price: 350,
    description: "Multi-step workflows, full integrations",
    features: ["Up to 5 N8N workflows", "Unlimited integrations", "CRM / database sync", "Error notifications", "30-day support"],
  },
  {
    id: "enterprise",
    label: "Enterprise Automation",
    price: 800,
    description: "Full automation suite with AI agents",
    features: ["Unlimited workflows", "AI agent integration", "Custom dashboards", "API development", "Ongoing maintenance", "Priority support"],
  },
];

export function WebDevCalculator() {
  const [baseType, setBaseType] = useState(BASE_TYPES[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const total = baseType.base + selectedFeatures.reduce((sum, id) => {
    const f = WEB_FEATURES.find((f) => f.id === id);
    return sum + (f?.price ?? 0);
  }, 0);

  return (
    <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center">
          <Calculator size={20} />
        </div>
        <div>
          <h3 className="font-black text-gray-900 dark:text-white text-lg">Web Dev Estimator</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Adjust features to get an instant quote</p>
        </div>
      </div>

      {/* Base type */}
      <div className="mb-6">
        <label className="block text-xs font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-3">
          Project Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {BASE_TYPES.map((bt) => (
            <button
              key={bt.id}
              onClick={() => setBaseType(bt)}
              className={`text-left p-4 rounded-2xl border-2 transition-all text-sm font-bold ${
                baseType.id === bt.id
                  ? "border-blue-600 bg-blue-600/5 text-blue-600"
                  : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-800"
              }`}
            >
              <div>{bt.label}</div>
              <div className="text-lg font-black mt-1">${bt.base}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <label className="block text-xs font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-3">
          Add-on Features
        </label>
        <div className="space-y-2">
          {WEB_FEATURES.map((f) => {
            const selected = selectedFeatures.includes(f.id);
            return (
              <button
                key={f.id}
                onClick={() => toggleFeature(f.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-sm ${
                  selected
                    ? "border-blue-600 bg-blue-600/5 dark:bg-blue-600/10"
                    : "border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    selected ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-white/20"
                  }`}>
                    {selected && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 dark:text-white">{f.label}</div>
                    <div className="text-xs text-gray-400">{f.description}</div>
                  </div>
                </div>
                <span className="font-black text-gray-700 dark:text-gray-300 shrink-0 ml-2">
                  +${f.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-blue-200 text-sm font-bold mb-1">Estimated Total</p>
            <p className="text-4xl font-black">${total.toLocaleString()}</p>
            <p className="text-blue-200 text-xs mt-1">Final quote confirmed after discovery call</p>
          </div>
          <a
            href="/contact"
            className="bg-white text-blue-600 px-5 py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition-colors shrink-0"
          >
            Get exact quote
          </a>
        </div>
      </div>
    </div>
  );
}

export function WorkflowCalculator() {
  const [selected, setSelected] = useState(WORKFLOW_PACKAGES[0]);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [withMaintenance, setWithMaintenance] = useState(false);

  const maintenanceCost = { starter: 45, business: 120, enterprise: 250 };
  const yearlyDiscount = 0.2;

  const basePrice = billing === "yearly" ? Math.round(selected.price * (1 - yearlyDiscount)) : selected.price;
  const maintCost = withMaintenance ? maintenanceCost[selected.id as keyof typeof maintenanceCost] : 0;

  return (
    <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-violet-600/10 text-violet-600 rounded-xl flex items-center justify-center">
          <Calculator size={20} />
        </div>
        <div>
          <h3 className="font-black text-gray-900 dark:text-white text-lg">Workflow Estimator</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Automation & integration pricing</p>
        </div>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center gap-3 mb-6 p-1.5 bg-gray-100 dark:bg-white/5 rounded-xl w-fit">
        {(["monthly", "yearly"] as const).map((b) => (
          <button
            key={b}
            onClick={() => setBilling(b)}
            className={`px-5 py-2 rounded-lg text-sm font-black capitalize transition-all ${
              billing === b
                ? "bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {b} {b === "yearly" && <span className="text-green-600 text-xs">-20%</span>}
          </button>
        ))}
      </div>

      {/* Package selection */}
      <div className="space-y-3 mb-6">
        {WORKFLOW_PACKAGES.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelected(pkg)}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
              selected.id === pkg.id
                ? "border-violet-600 bg-violet-600/5"
                : "border-gray-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-800"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-black text-gray-900 dark:text-white">{pkg.label}</span>
              <span className={`font-black text-lg ${selected.id === pkg.id ? "text-violet-600" : "text-gray-700 dark:text-gray-300"}`}>
                ${billing === "yearly" ? Math.round(pkg.price * (1 - yearlyDiscount)) : pkg.price}
                <span className="text-sm font-bold text-gray-400">/mo</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{pkg.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {pkg.features.map((f) => (
                <span key={f} className="text-xs bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-lg">
                  {f}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Maintenance */}
      <button
        onClick={() => setWithMaintenance(!withMaintenance)}
        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all mb-6 ${
          withMaintenance
            ? "border-green-500 bg-green-500/5"
            : "border-gray-200 dark:border-white/10 hover:border-gray-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
            withMaintenance ? "bg-green-500 border-green-500" : "border-gray-300 dark:border-white/20"
          }`}>
            {withMaintenance && <Check size={12} className="text-white" strokeWidth={3} />}
          </div>
          <div className="text-left">
            <div className="font-bold text-gray-900 dark:text-white text-sm">Monthly Maintenance</div>
            <div className="text-xs text-gray-400">Updates, monitoring & priority support</div>
          </div>
        </div>
        <span className="font-black text-gray-700 dark:text-gray-300 text-sm">
          +${maintCost}/mo
        </span>
      </button>

      {/* Total */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-violet-200 text-sm font-bold mb-1">Monthly Total</p>
            <p className="text-4xl font-black">${basePrice + maintCost}</p>
            {billing === "yearly" && (
              <p className="text-violet-200 text-xs mt-1">Billed annually · saves 20%</p>
            )}
          </div>
          <a
            href="/contact"
            className="bg-white text-violet-600 px-5 py-3 rounded-xl font-black text-sm hover:bg-violet-50 transition-colors shrink-0"
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  );
}
