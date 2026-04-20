"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check } from "lucide-react";

type FormData = {
  name: string;
  companyName: string;
  industry: string;
  email: string;
  phone: string;
  whatsapp: string;
  sameAsPhone: boolean;
  district: string;
  website: string; // honeypot — real users never fill this
};

const INDUSTRIES = [
  "Retail / General",
  "Fashion & Apparel",
  "Food & Beverage",
  "Electronics",
  "Agriculture",
  "Health & Beauty",
  "Events & Entertainment",
  "Professional Services",
  "Education",
  "Real Estate",
  "Transport & Logistics",
  "Other",
];

export function WaitlistForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: { sameAsPhone: false },
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const sameAsPhone = watch("sameAsPhone");
  const phone = watch("phone");

  useEffect(() => {
    if (sameAsPhone && phone) {
      setValue("whatsapp", phone);
    }
  }, [sameAsPhone, phone, setValue]);

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const payload = {
        name: data.name,
        companyName: data.companyName,
        industry: data.industry,
        email: data.email,
        phone: data.phone,
        whatsapp: data.sameAsPhone ? data.phone : data.whatsapp,
        district: data.district,
        website: data.website, // honeypot — pass through; server discards if filled
      };

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit");

      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us directly.");
    }
  };

  const inputClasses = "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium text-gray-900 dark:text-white";
  const labelClasses = "block text-xs font-black uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 mb-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
      {/* Honeypot — hidden from real users, bots fill it. aria-hidden keeps screen readers away. */}
      <div className="absolute left-[-9999px] w-0 h-0 overflow-hidden" aria-hidden="true">
        <label>
          Website (leave blank)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      {/* Name */}
      <div>
        <label className={labelClasses}>Full Name *</label>
        <input
          {...register("name", { required: "Name is required" })}
          className={inputClasses}
          placeholder="Your full name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.name.message}</p>}
      </div>

      {/* Company */}
      <div>
        <label className={labelClasses}>Business / Company Name *</label>
        <input
          {...register("companyName", { required: "Company name is required" })}
          className={inputClasses}
          placeholder="Your business name"
        />
        {errors.companyName && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.companyName.message}</p>}
      </div>

      {/* Industry */}
      <div>
        <label className={labelClasses}>Industry *</label>
        <select
          {...register("industry", { required: "Industry is required" })}
          className={inputClasses}
        >
          <option value="">Select your industry...</option>
          {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
        {errors.industry && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.industry.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className={labelClasses}>Email Address *</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
          })}
          type="email"
          className={inputClasses}
          placeholder="you@company.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className={labelClasses}>Phone Number *</label>
        <input
          {...register("phone", { required: "Phone number is required" })}
          type="tel"
          className={inputClasses}
          placeholder="+260 97X XXX XXX"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.phone.message}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClasses + " mb-0"}>WhatsApp Number *</label>
          <button
            type="button"
            onClick={() => setValue("sameAsPhone", !sameAsPhone)}
            className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-lg transition-all ${
              sameAsPhone
                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10"
            }`}
          >
            {sameAsPhone
              ? <><Check size={12} /> Copied!</>
              : <><Copy size={12} /> Same as phone</>
            }
          </button>
        </div>
        {!sameAsPhone && (
          <input
            {...register("whatsapp", { required: !sameAsPhone ? "WhatsApp number is required" : false })}
            type="tel"
            className={inputClasses}
            placeholder="+260 97X XXX XXX"
          />
        )}
        {sameAsPhone && (
          <div className="w-full bg-green-500/5 border border-green-500/20 rounded-2xl px-5 py-3.5 text-sm font-medium text-green-600">
            {phone || "Same as phone number"}
          </div>
        )}
        {errors.whatsapp && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.whatsapp.message}</p>}
      </div>

      {/* District */}
      <div>
        <label className={labelClasses}>District / Location *</label>
        <input
          {...register("district", { required: "District is required" })}
          type="text"
          className={inputClasses}
          placeholder="Enter your district or location"
        />
        {errors.district && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.district.message}</p>}
      </div>

      {error && (
        <div className="bg-red-500/5 border border-red-500/20 text-red-500 px-5 py-4 rounded-2xl text-sm font-bold">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-black text-sm hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.99] shadow-xl shadow-blue-500/20 mt-2"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Joining Convergeo...
          </span>
        ) : (
          "Secure My Spot on Convergeo"
        )}
      </button>
    </form>
  );
}
