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
import { FormEvent, useState } from "react";

export default function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");

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

    // Track signed-in user
    const signedInUsers = JSON.parse(
      localStorage.getItem("signedInUsers") || "[]",
    );
    const currentTime = new Date().toLocaleString();
    const userName = email.split("@")[0]; // Extract name from email before @

    // Check if user already exists
    const existingUserIndex = signedInUsers.findIndex(
      (user: any) => user.email === email,
    );

    if (existingUserIndex >= 0) {
      // Update existing user's login time
      signedInUsers[existingUserIndex].lastLogin = currentTime;
      signedInUsers[existingUserIndex].status = "Online";
    } else {
      // Add new user
      const newUser = {
        id: Date.now(),
        name: userName.charAt(0).toUpperCase() + userName.slice(1), // Capitalize first letter
        email: email,
        department: "Unknown", // Will be updated when they register
        lastLogin: currentTime,
        lastLogout: "Never",
        status: "Online",
        totalLeaves: 0,
        usedLeaves: 0,
        weekOffs: 0,
        usedWeekOffs: 0,
      };
      signedInUsers.push(newUser);
    }

    localStorage.setItem("signedInUsers", JSON.stringify(signedInUsers));
    localStorage.setItem("userEmail", email);

    // Here you would typically handle authentication
    // For now, just redirect to welcome page with email
    navigate("/welcome", { state: { email } });
  };
  return (
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
                required
              />
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
  );
}
