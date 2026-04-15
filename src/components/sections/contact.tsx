"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden border-t">
      <BackgroundBeams />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Ready to Build <br />
                <span className="text-primary italic">Systems That Drive ROI?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                I help businesses eliminate bottlenecks with AI-powered systems. 
                Whether you have a specific project or just want to explore 
                the possibilities, let&apos;s talk.
              </p>
            </div>

            <div className="space-y-3">
              <a href="mailto:hello@kaluba.me" className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-all hover:bg-card">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none mb-1">Direct Email</p>
                  <p className="font-bold text-base">hello@kaluba.me</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-all hover:bg-card">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none mb-1">Strategy Call</p>
                  <p className="font-bold text-base">Schedule 15 mins</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-1 rounded-[2rem] shadow-2xl shadow-primary/[0.02]">
            <CardContent className="p-6 md:p-8 space-y-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1 text-center mb-6">
                    <h3 className="text-xl font-bold">Send a Message</h3>
                    <p className="text-xs text-muted-foreground">Typically responds within 24 hours.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Name</label>
                      <Input id="name" placeholder="John Doe" required className="h-11 bg-background/50 rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</label>
                      <Input id="email" type="email" placeholder="john@company.com" required className="h-11 bg-background/50 rounded-xl" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Project Details</label>
                    <Textarea id="message" placeholder="Describe the system or automation..." required className="min-h-[120px] bg-background/50 rounded-xl" />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full h-12 text-base rounded-xl group transition-all font-bold">
                    Send Proposal
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 duration-500">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold italic">Message Sent!</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                      I&apos;ll review your project details and get back to you within 24 hours.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-xl px-6 h-10 text-xs font-bold">
                    Send another message
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
