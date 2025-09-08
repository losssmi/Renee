import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import loginBackground from "@assets/Sign up_1757333780171.png";

export const WorkLocation = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    city: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/auth/work-info`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.status === 401) {
        setError("Session expired. Please log in again.");
        setLocation("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update work information");
      }

      // Navigate to welcome screen
      setLocation("/welcome");
    } catch (error: any) {
      console.error("Error updating work info:", error);
      setError(error.message || "Failed to update work information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-light mb-8" data-testid="text-work-location-title">
            Where do you work?
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full h-12 px-4 rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              data-testid="input-city"
              required
            />

            <Input
              name="company"
              type="text"
              placeholder="Company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full h-12 px-4 rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              data-testid="input-company"
              required
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-medium rounded-full transition-colors mt-8 disabled:opacity-50 flex items-center justify-center gap-2"
              data-testid="button-continue"
            >
              {isLoading ? "Saving..." : "Continue"}
              {!isLoading && <ChevronRight className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};