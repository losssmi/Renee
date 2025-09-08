import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import loginBackground from "@assets/Sign up_1757333780171.png";

export const Step4Accountability = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const handleStart = () => {
    // Navigate to dashboard
    setLocation("/dashboard");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-white text-3xl font-light mb-8" data-testid="text-step4-title">
          Step 4: Start tracking and reporting in Accountability
        </h1>
        
        <p className="text-white text-lg font-light mb-8" data-testid="text-next-step">
          Next step: Complete The Renegade Roadmap Assessment
        </p>
        
        <Button
          onClick={handleStart}
          className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-medium rounded-full transition-colors"
          data-testid="button-start"
        >
          Start
        </Button>
      </div>
    </div>
  );
};