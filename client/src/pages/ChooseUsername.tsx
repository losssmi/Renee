import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import loginBackground from "@assets/Sign up_1757333780171.png";

export const ChooseUsername = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get user ID from localStorage (will be set after signup)
  const userId = localStorage.getItem("pendingUserId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError("Session expired. Please sign up again.");
      setLocation("/");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/users/${userId}/username`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to set username");
      }

      // Clear the pending user ID
      localStorage.removeItem("pendingUserId");
      
      // Navigate to dashboard
      setLocation("/dashboard");
    } catch (error: any) {
      console.error("Error setting username:", error);
      if (error.message.includes("Username already taken")) {
        setError("This username is already taken. Please choose another one.");
      } else {
        setError("Failed to set username. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // If no pending user, redirect to login
  if (!userId) {
    setLocation("/");
    return <div></div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-white mb-8">
            Choose a username
          </h1>
          
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-14 border-0 rounded-full bg-white/90 text-gray-800 placeholder:text-gray-500 text-center text-lg focus:ring-0 focus:border-0 focus:bg-white"
              data-testid="input-username"
              required
              minLength={3}
              maxLength={20}
              pattern="[a-zA-Z0-9_]+"
              title="Username can only contain letters, numbers, and underscores"
            />
            
            {error && (
              <p className="text-red-300 text-sm mt-4 text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading || username.length < 3}
              className="w-full h-12 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full transition-colors mt-6 backdrop-blur-sm border border-white/20"
              data-testid="button-continue"
            >
              {isLoading ? "Setting username..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};