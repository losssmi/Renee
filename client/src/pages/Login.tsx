import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import loginBackground from "@assets/Sign up_1757333780171.png";
import renegadeLogo from "@assets/Renegade OS logo_transparent 1_1757334443265.png";

export const Login = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
      if (isLogin) {
        // Login flow
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to login");
        }

        const user = await response.json();
        
        // Navigate based on user's onboarding status
        if (!user.username) {
          setLocation("/choose-username");
        } else if (!user.city || !user.company) {
          setLocation("/work-location");
        } else {
          setLocation("/dashboard");
        }
      } else {
        // Register flow
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create account");
        }

        // User is automatically logged in after registration
        // Navigate to username selection
        setLocation("/choose-username");
      }
    } catch (error: any) {
      console.error("Error creating account:", error);
      setError(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-4">
            <img
              src={renegadeLogo}
              alt="Renegade OS"
              className="h-16 w-auto"
            />
          </div>
          <p className="text-white/80 text-lg mb-4">{isLogin ? "Welcome back" : "Create an account"}</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white rounded-2xl shadow-xl border-0">
          <CardContent className="p-8">
            {/* Google Sign Up Button */}
            <Button
              variant="outline"
              className="w-full h-12 mb-4 border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={() => console.log("Google sign up clicked")}
              data-testid="button-google-signup"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLogin ? "Sign in with Google" : "Sign up with Google"}
            </Button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Name Fields - Side by Side (only for registration) */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="h-12 border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 bg-gray-50"
                    data-testid="input-first-name"
                    required
                  />
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="h-12 border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 bg-gray-50"
                    data-testid="input-last-name"
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-12 border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 bg-gray-50"
                data-testid="input-email"
                required
              />

              {/* Password Field */}
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="h-12 border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 bg-gray-50"
                data-testid="input-password"
                required
              />

              {/* Create Account Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors mt-6 disabled:opacity-50"
                data-testid="button-create-account"
              >
                {isLoading ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign in" : "Create account")}
              </Button>

              {/* Toggle between Login/Register */}
              <p className="text-center text-gray-600 text-sm mt-4">
                {isLogin ? "Don't have an account?  " : "Already have an account? "}
                <button
                  type="button"
                  className="text-black hover:underline font-medium"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  data-testid="link-toggle-mode"
                >
                  {isLogin ? "Sign up" : "Log in here"}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
