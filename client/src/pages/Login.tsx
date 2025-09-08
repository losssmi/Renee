import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";

export const Login = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create account clicked", formData);
    // Add your authentication logic here
    // For now, navigate to dashboard
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-2">
            Renegade OS.
          </h1>
          <p className="text-white/80 text-lg">
            Create an account
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-white rounded-2xl shadow-xl border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label 
                  htmlFor="usernameOrEmail" 
                  className="text-gray-600 font-medium"
                >
                  Username or email
                </Label>
                <Input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  value={formData.usernameOrEmail}
                  onChange={handleInputChange}
                  className="h-12 border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0"
                  data-testid="input-username-email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="password" 
                  className="text-gray-600 font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="h-12 border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0"
                  data-testid="input-password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
                data-testid="button-create-account"
              >
                Create an account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};