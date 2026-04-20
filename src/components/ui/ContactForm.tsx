"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Send, CheckCircle2, Layers } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  budget: string;
  message: string;
  website: string; // honeypot
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
    // Honeypot — bots fill this; pretend success.
    if (data.website && data.website.trim()) {
      setSent(true);
      reset();
      return;
    }
    try {
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
      <div className="glass border-emerald-500/20 rounded-[2rem] p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Message Received</h3>
        <p className="text-gray-500 dark:text-gray-400 font-bold mb-8">
          Kaluba will personally review this and reply within 24 hours.
        </p>
        <button 
          onClick={() => setSent(false)}
          className="text-sm font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClasses = "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium";
  const labelClasses = "block text-xs font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-3 ml-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Honeypot — visually hidden, bots fill it. */}
      <div className="absolute left-[-9999px] w-0 h-0 overflow-hidden" aria-hidden="true">
        <label>
          Website (leave blank)
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>Full Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="John Doe"
            className={inputClasses}
          />
          {errors.name && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-wider">{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>Work Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            })}
            type="email"
            placeholder="john@company.com"
            className={inputClasses}
          />
          {errors.email && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-wider">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClasses}>Project Budget</label>
        <div className="relative">
          <select
            {...register("budget", { required: "Please select a budget" })}
            className={`${inputClasses} appearance-none`}
          >
            <option value="">Select a range...</option>
            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <Layers size={18} />
          </div>
        </div>
        {errors.budget && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-wider">{errors.budget.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Project Brief</label>
        <textarea
          {...register("message", { required: "Please describe your project", minLength: { value: 20, message: "Tell me more (20+ chars)" } })}
          rows={5}
          placeholder="What are we building? Mention timelines and goals..."
          className={`${inputClasses} resize-none`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-wider">{errors.message.message}</p>}
      </div>

      {error && (
        <div className="bg-red-500/5 border border-red-500/20 text-red-500 px-6 py-4 rounded-2xl text-sm font-bold animate-in shake duration-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>Send Project Inquiry <Send size={18} /></>
        )}
      </button>
    </form>
  );
}

