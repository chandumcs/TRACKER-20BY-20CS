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
      {/* Floating alien elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Alien 1 - Green alien */}
        <div
          className="absolute top-16 left-16 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative w-20 h-24">
            {/* Head */}
            <div className="w-16 h-16 bg-gradient-to-b from-green-400 to-green-500 rounded-full mx-auto relative">
              {/* Eyes */}
              <div className="absolute top-3 left-2 w-3 h-4 bg-black rounded-full"></div>
              <div className="absolute top-3 right-2 w-3 h-4 bg-black rounded-full"></div>
              {/* Mouth */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></div>
            </div>
            {/* Body */}
            <div className="w-8 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-lg mx-auto -mt-2"></div>
          </div>
        </div>

        {/* UFO 1 */}
        <div
          className="absolute top-20 right-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <div className="relative w-24 h-12">
            {/* UFO dome */}
            <div className="w-12 h-6 bg-gradient-to-b from-cyan-300 to-cyan-500 rounded-t-full mx-auto opacity-80"></div>
            {/* UFO base */}
            <div className="w-24 h-4 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full -mt-2 opacity-80"></div>
            {/* Lights */}
            <div className="absolute bottom-0 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <div
              className="absolute bottom-0 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
        </div>

        {/* Alien 2 - Blue alien */}
        <div
          className="absolute bottom-20 right-16 animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          <div className="relative w-18 h-22">
            {/* Head */}
            <div className="w-14 h-14 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full mx-auto relative">
              {/* Eyes */}
              <div className="absolute top-2 left-1 w-4 h-5 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-2 right-1 w-4 h-5 bg-white rounded-full">
                <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
            {/* Body */}
            <div className="w-6 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg mx-auto -mt-1"></div>
          </div>
        </div>

        {/* UFO 2 - Larger */}
        <div
          className="absolute top-1/3 left-1/3 animate-pulse opacity-70"
          style={{ animationDelay: "3s" }}
        >
          <div className="relative w-32 h-16">
            {/* UFO dome */}
            <div className="w-16 h-8 bg-gradient-to-b from-purple-300 to-purple-500 rounded-t-full mx-auto"></div>
            {/* UFO base */}
            <div className="w-32 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full -mt-3"></div>
            {/* Beam */}
            <div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-yellow-300 to-transparent opacity-50"
              style={{
                clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
              }}
            ></div>
          </div>
        </div>

        {/* Alien 3 - Purple alien */}
        <div
          className="absolute bottom-1/4 left-1/4 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="relative w-16 h-20">
            {/* Head */}
            <div className="w-12 h-12 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full mx-auto relative">
              {/* Antennae */}
              <div className="absolute -top-2 left-2 w-1 h-3 bg-purple-300"></div>
              <div className="absolute -top-2 right-2 w-1 h-3 bg-purple-300"></div>
              <div className="absolute -top-3 left-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="absolute -top-3 right-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
              {/* Eyes */}
              <div className="absolute top-3 left-2 w-2 h-3 bg-white rounded-full"></div>
              <div className="absolute top-3 right-2 w-2 h-3 bg-white rounded-full"></div>
            </div>
            {/* Body */}
            <div className="w-6 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-lg mx-auto -mt-1"></div>
          </div>
        </div>

        {/* Small UFO */}
        <div
          className="absolute top-1/2 right-1/3 animate-ping opacity-60"
          style={{ animationDelay: "4s" }}
        >
          <div className="relative w-16 h-8">
            <div className="w-8 h-4 bg-gradient-to-b from-green-300 to-green-500 rounded-t-full mx-auto"></div>
            <div className="w-16 h-3 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full -mt-1"></div>
          </div>
        </div>

        {/* Planet */}
        <div
          className="absolute bottom-1/3 right-1/4 animate-pulse opacity-50"
          style={{ animationDelay: "2.5s" }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full relative">
            {/* Planet rings */}
            <div className="absolute inset-0 border-2 border-yellow-400 rounded-full scale-125 opacity-60"></div>
          </div>
        </div>
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
