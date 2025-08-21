import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    // Create a demo admin user if no users exist
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]",
    );
    if (registeredUsers.length === 0) {
      const demoAdmin = {
        id: 1,
        name: "Chandu Mcs",
        userName: "chandu",
        email: "chandu@olivecrypto.com",
        password: "admin123",
        department: "Management",
        lastLogin: "Never",
        lastLogout: "Never",
        status: "Offline",
        totalLeaves: 20,
        usedLeaves: 0,
        weekOffs: 52,
        usedWeekOffs: 0,
        employeeId: "EMP001",
        role: "admin",
        registeredAt: new Date().toLocaleString(),
      };
      localStorage.setItem("registeredUsers", JSON.stringify([demoAdmin]));
    }
  }, []);

  const validateEmail = (email: string) => {
    if (!email.endsWith("@olivecrypto.com")) {
      setEmailError("Please enter organization mail id");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !value.endsWith("@olivecrypto.com")) {
      setEmailError("Please enter organization mail id");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    try {
      // Use database API for authentication
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!result.success) {
        setLoginError(result.message || "Invalid email or password");
        return;
      }

      setLoginError(""); // Clear any previous errors

      // Store user data for session management
      localStorage.setItem("userEmail", email);
      localStorage.setItem("currentUser", JSON.stringify(result.user));

      // Successful login - redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Connection error. Please try again.");
    }
  };
  return (
    <div>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full"></div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
              backgroundImage:
                "url('https://cdn.builder.io/api/v1/image/assets%2F68d80f357eb44d4f91b54f9959266e98%2F8d16a2e9ec1743bca22b41627cfcc12a?format=webp&width=800')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-center">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F68d80f357eb44d4f91b54f9959266e98%2F8cee284c0a70412183ad1ae114224f28?format=webp&width=800"
                    alt="Olive"
                    className="h-12 mx-auto"
                  />
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email (e.g., user@olivecrypto.com)"
                      value={email}
                      onChange={handleEmailChange}
                      className={emailError ? "border-red-500" : ""}
                      required
                    />
                    {emailError && (
                      <p className="text-sm text-red-500 mt-1">{emailError}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={loginError ? "border-red-500" : ""}
                      required
                    />
                    {loginError && (
                      <p className="text-sm text-red-500 mt-1">{loginError}</p>
                    )}
                  </div>
                  <Button className="w-full" type="submit">
                    Sign In
                  </Button>
                </form>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
