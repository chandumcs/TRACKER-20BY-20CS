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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    // Validate credentials against stored users
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]",
    );
    const user = registeredUsers.find(
      (u: any) => u.email === email && u.password === password,
    );

    if (!user) {
      setLoginError("Invalid email or password");
      return;
    }

    setLoginError(""); // Clear any previous errors

    // Track signed-in user
    const signedInUsers = JSON.parse(
      localStorage.getItem("signedInUsers") || "[]",
    );
    const currentTime = new Date().toLocaleString();

    // Check if user already exists in signed-in users
    const existingUserIndex = signedInUsers.findIndex(
      (signedUser: any) => signedUser.email === email,
    );

    if (existingUserIndex >= 0) {
      // Update existing user's login time
      signedInUsers[existingUserIndex].lastLogin = currentTime;
      signedInUsers[existingUserIndex].status = "Online";
    } else {
      // Add user to signed-in users with their registration data
      const signedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        lastLogin: currentTime,
        lastLogout: user.lastLogout || "Never",
        status: "Online",
        totalLeaves: user.totalLeaves || 20,
        usedLeaves: user.usedLeaves || 0,
        weekOffs: user.weekOffs || 52,
        usedWeekOffs: user.usedWeekOffs || 0,
        employeeId: user.employeeId,
        role: user.role,
      };
      signedInUsers.push(signedInUser);
    }

    localStorage.setItem("signedInUsers", JSON.stringify(signedInUsers));
    localStorage.setItem("userEmail", email);

    // Successful login - redirect to dashboard
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-10 blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-16 right-16 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-400 rounded-lg opacity-20 blur-lg animate-bounce rotate-45" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-16 left-16 w-28 h-28 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg opacity-20 blur-lg animate-bounce rotate-12" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-15 blur-md animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/10 border-white/20">
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
  );
}
