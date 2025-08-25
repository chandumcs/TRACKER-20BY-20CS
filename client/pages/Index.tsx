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
        {/* Main floating spheres */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-60 blur-sm animate-pulse"></div>
        <div className="absolute top-32 right-32 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-50 blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-40 blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 opacity-70 blur-none animate-bounce rotate-45" style={{ animationDelay: '0.5s', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg opacity-60 blur-none animate-bounce rotate-12" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 opacity-80 blur-none animate-pulse rotate-45" style={{ animationDelay: '3s', clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}></div>

        {/* Additional accent elements */}
        <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full opacity-90 blur-none animate-ping" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-75 blur-none animate-spin" style={{ animationDelay: '4s', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
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
