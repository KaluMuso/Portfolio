"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  businessType: string;
};

export function WaitlistForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      // Option A: save to Supabase (recommended — you know this stack)
      // Option B: send via EmailJS to your inbox
      // Option C: Resend API (add RESEND_API_KEY to .env.local)
      // Implement whichever you prefer — the form contract is the same.
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Failed to submit");
      
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again or WhatsApp me directly.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder="Your name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email" } })}
          type="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder="you@company.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Business type</label>
        <select
          {...register("businessType", { required: true })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        >
          <option value="">Select...</option>
          <option value="fashion">Fashion / apparel</option>
          <option value="retail">Retail / general</option>
          <option value="food">Food & beverage</option>
          <option value="services">Services / consulting</option>
          <option value="other">Other</option>
        </select>
        {errors.businessType && <p className="text-red-500 text-xs mt-1">Please select a business type</p>}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Joining..." : "Join the waitlist"}
      </button>
    </form>
  );
}
