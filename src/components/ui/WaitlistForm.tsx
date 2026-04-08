"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  sameAsPhone: boolean;
  businessType: string;
  otherBusinessType?: string;
};

export function WaitlistForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      sameAsPhone: false
    }
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const businessType = watch("businessType");
  const sameAsPhone = watch("sameAsPhone");
  const phone = watch("phone");

  useEffect(() => {
    if (sameAsPhone) {
      setValue("whatsapp", phone);
    }
  }, [sameAsPhone, phone, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        whatsapp: data.sameAsPhone ? data.phone : data.whatsapp,
        businessType: data.businessType,
        otherBusinessType: data.businessType === "other" ? data.otherBusinessType : undefined,
      };

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) throw new Error("Failed to submit");
      
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again or WhatsApp me directly.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md text-left">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          {...register("phone", { required: "Phone number is required" })}
          type="tel"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder="+260..."
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
          <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
            <input
              type="checkbox"
              {...register("sameAsPhone")}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Same as phone
          </label>
        </div>
        {!sameAsPhone && (
          <input
            {...register("whatsapp", { required: !sameAsPhone ? "WhatsApp number is required" : false })}
            type="tel"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="+260..."
          />
        )}
        {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Business type</label>
        <select
          {...register("businessType", { required: "Please select a business type" })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        >
          <option value="">Select...</option>
          <option value="fashion">Fashion / apparel</option>
          <option value="retail">Retail / general</option>
          <option value="food">Food & beverage</option>
          <option value="services">Services / consulting</option>
          <option value="other">Other</option>
        </select>
        {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType.message}</p>}
      </div>

      {businessType === "other" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Please specify</label>
          <input
            {...register("otherBusinessType", { required: businessType === "other" ? "Please specify your business type" : false })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="What do you do?"
          />
          {errors.otherBusinessType && <p className="text-red-500 text-xs mt-1">{errors.otherBusinessType.message}</p>}
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors mt-4"
      >
        {isSubmitting ? "Joining..." : "Join the waitlist"}
      </button>
    </form>
  );
}
