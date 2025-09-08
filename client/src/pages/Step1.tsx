import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import loginBackground from "@assets/Sign up_1757333780171.png";

export const Step1 = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const handleNext = () => {
    setLocation("/step2-strategy");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-white text-3xl font-light mb-8" data-testid="text-step1-title">
          Step 1
        </h1>
        
        <Button
          onClick={handleNext}
          className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-medium rounded-full transition-colors flex items-center gap-2 mx-auto"
          data-testid="button-next-step1"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};