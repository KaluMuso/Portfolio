"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  budget: string;
  message: string;
};

const budgets = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Not sure yet",
];

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      // Uses EmailJS — configure your service/template IDs in .env.local:
      // NEXT_PUBLIC_EMAILJS_SERVICE_ID=
      // NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
      // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          from_email: data.email,
          budget: data.budget,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSent(true);
      reset();
    } catch {
      setError("Failed to send. Please email me directly or use WhatsApp.");
    }
  };

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-2xl mb-2">✓</p>
        <h3 className="font-semibold text-green-800 text-lg mb-1">Message received!</h3>
        <p className="text-green-700 text-sm">
          I&apos;ll reply within 24 hours. For urgent work, WhatsApp me directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <input
            {...register("name", { required: "Required" })}
            placeholder="Kaluba Musonda"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input
            {...register("email", {
              required: "Required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            })}
            type="email"
            placeholder="you@company.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget range</label>
        <select
          {...register("budget", { required: "Please select a range" })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select...</option>
          {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          What are you building?
        </label>
        <textarea
          {...register("message", { required: "Required", minLength: { value: 20, message: "Tell me a bit more (20+ chars)" } })}
          rows={5}
          placeholder="Describe your project, timeline, and what success looks like for you..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Sending..." : "Send message →"}
      </button>
    </form>
  );
}
