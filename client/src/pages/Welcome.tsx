import { useEffect } from "react";
import { useLocation } from "wouter";
import loginBackground from "@assets/Sign up_1757333780171.png";

export const Welcome = (): JSX.Element => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-advance to step 2 after 3 seconds
    const timer = setTimeout(() => {
      setLocation("/step2-strategy");
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <div className="text-center">
        <h1 className="text-white text-lg font-light mb-4" data-testid="text-welcome-intro">
          Welcome to
        </h1>
        <h2 className="text-white text-6xl font-light leading-none" data-testid="text-renegade-branding">
          Renegade OS.
        </h2>
      </div>
    </div>
  );
};