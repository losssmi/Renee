import React from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import loginBackground from "@assets/Sign up_1757333780171.png";

export const Landing = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const handleLogin = () => {
    setLocation("/login");
  };

  const handleSignup = () => {
    setLocation("/login");
  };

  const handleBegin = () => {
    setLocation("/login");
  };

  const handleStartToday = () => {
    setLocation("/login");
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <div className="text-white text-xl font-light">Renegade OS.</div>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 h-auto px-4 py-2"
            onClick={handleLogin}
            data-testid="button-header-login"
          >
            Log in
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 h-auto px-4 py-2"
            onClick={handleSignup}
            data-testid="button-header-signup"
          >
            Sign up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-8 py-16">
        <div className="max-w-2xl">
          <h1 className="text-white text-6xl font-light mb-4" data-testid="text-hero-title">Free</h1>
          <p className="text-white text-lg mb-8" data-testid="text-hero-subtitle">30-day Challenge</p>

          <div className="mb-8">
            <p className="text-white text-sm uppercase tracking-wider mb-4" data-testid="text-strategy">
              STRATEGY. STRUCTURE + ACCOUNTABILITY
            </p>
            <p className="text-white/80 text-sm mb-2">
              Reset your business with daily
            </p>
            <p className="text-white/80 text-sm mb-2">
              habits that drive results.
            </p>
            <p className="text-white/80 text-sm">
              Designed to acquire or real estate performance.
            </p>
          </div>

          <Button 
            className="bg-white/20 text-white border border-white/30 hover:bg-white/30 h-auto px-6 py-3 rounded-full"
            onClick={handleBegin}
            data-testid="button-begin"
          >
            Begin →
          </Button>
        </div>
      </section>

      {/* Business Management Tool Section */}
      <section className="flex flex-col items-center text-center px-8 py-16">
        <div className="max-w-4xl">
          <h2 className="text-white text-3xl font-light mb-6" data-testid="text-business-tool-title">
            Your daily business management tool.
          </h2>
          <p className="text-white/80 text-base mb-12 max-w-2xl mx-auto" data-testid="text-business-tool-description">
            Build the foundation for a high-performing business by aligning
            people, processes and tools. Strategy, structure and accountability,
            every day, on repeat.
          </p>

          {/* Dashboard Mockup */}
          <div className="mb-16">
            <img
              src="/figmaAssets/landing-page.png"
              alt="Dashboard mockup showing business metrics and analytics"
              className="w-full max-w-3xl mx-auto rounded-lg shadow-2xl"
              data-testid="img-dashboard-mockup"
            />
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="flex flex-col items-center text-center px-8 py-16">
        <div className="max-w-2xl">
          <h3 className="text-white text-2xl font-light mb-4" data-testid="text-bottom-title">
            Every <span className="text-yellow-300">successful</span> business
            runs on an operating system.
          </h3>
          <p className="text-white text-2xl font-light mb-8" data-testid="text-bottom-subtitle">
            Without one, it falls into chaos.
          </p>

          <p className="text-white/80 text-sm mb-2">
            With strategic structure and accountability, performance
          </p>
          <p className="text-white/80 text-sm mb-8">
            becomes consistent and growth becomes inevitable.
          </p>

          <p className="text-white/80 text-sm mb-6">
            Start your journey to efficiency today.
          </p>

          <Button 
            className="bg-white/20 text-white border border-white/30 hover:bg-white/30 h-auto px-6 py-3 rounded-full"
            onClick={handleStartToday}
            data-testid="button-start-today"
          >
            Start today
          </Button>
        </div>
      </section>
    </div>
  );
};