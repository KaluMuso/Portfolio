"use client"

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/[0.01]" />
      <Container className="relative">
        <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-card/50 border border-border/50 p-6 md:p-12 text-center space-y-6 backdrop-blur-sm shadow-xl shadow-primary/[0.02]">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-1">
            <Sparkles className="h-6 w-6" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Get <span className="text-primary italic">AI & Automation Insights</span> <br className="hidden md:block" /> 
              Direct to Your Inbox.
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join developers and business owners receiving weekly case studies 
              on building high-impact systems and automation ROI.
            </p>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="you@company.com" 
                required 
                className="h-12 rounded-xl bg-background shadow-inner text-base px-4"
              />
              <Button type="submit" size="lg" className="h-12 px-6 rounded-xl text-base font-bold shadow-lg shadow-primary/10">
                Join Now
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center space-y-3 animate-in zoom-in-95 duration-500">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <div className="space-y-1">
                <p className="text-xl font-bold italic">You&apos;re in!</p>
                <p className="text-sm text-muted-foreground">Welcome to the inner circle.</p>
              </div>
            </div>
          )}

          <p className="text-[10px] text-muted-foreground opacity-60 uppercase tracking-widest">
            No spam. Just pure technical value.
          </p>
        </div>
      </Container>
    </section>
  );
}
