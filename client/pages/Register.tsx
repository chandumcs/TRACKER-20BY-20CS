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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");

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
    if (value && !value.endsWith("@olivecrypto.com")) {
      setEmailError("Please enter organization mail id");
    } else {
      setEmailError("");
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target as HTMLFormElement);
    const data = {
      firstName: formDataObj.get("firstName") as string,
      lastName: formDataObj.get("lastName") as string,
      userName: formDataObj.get("userName") as string,
      employeeId: formDataObj.get("employeeId") as string,
      email: formDataObj.get("email") as string,
      role: formDataObj.get("role") as string,
      password: formDataObj.get("password") as string,
      confirmPassword: formDataObj.get("confirmPassword") as string,
    };

    if (!validateEmail(data.email)) {
      return;
    }

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Store user credentials for login validation
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]",
    );
    const currentTime = new Date().toLocaleString();

    const newUser = {
      id: Date.now(),
      name: `${data.firstName} ${data.lastName}`,
      userName: data.userName,
      email: data.email,
      password: data.password, // Store password for validation
      department:
        data.role === "admin"
          ? "Management"
          : data.role === "developer"
            ? "Development"
            : data.role === "production-support"
              ? "Production"
              : data.role === "uat-support"
                ? "Testing"
                : data.role === "manager"
                  ? "Management"
                  : "Unknown",
      lastLogin: currentTime,
      lastLogout: "Never",
      status: "Online",
      totalLeaves: 20, // Default leave allocation
      usedLeaves: 0,
      weekOffs: 52,
      usedWeekOffs: 0,
      employeeId: data.employeeId,
      role: data.role,
      registeredAt: currentTime,
    };

    // Check if user already exists (by email)
    const existingUserIndex = registeredUsers.findIndex(
      (user: any) => user.email === data.email,
    );
    if (existingUserIndex >= 0) {
      // Update existing user with full registration data
      registeredUsers[existingUserIndex] = {
        ...registeredUsers[existingUserIndex],
        ...newUser,
      };
    } else {
      registeredUsers.push(newUser);
    }

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    // Also add to signed-in users since they just registered
    const signedInUsers = JSON.parse(
      localStorage.getItem("signedInUsers") || "[]",
    );
    const signedInUser = { ...newUser };
    delete signedInUser.password; // Don't store password in signed-in users for security

    const existingSignedInIndex = signedInUsers.findIndex(
      (user: any) => user.email === data.email,
    );
    if (existingSignedInIndex >= 0) {
      signedInUsers[existingSignedInIndex] = signedInUser;
    } else {
      signedInUsers.push(signedInUser);
    }

    localStorage.setItem("signedInUsers", JSON.stringify(signedInUsers));
    localStorage.setItem("userEmail", data.email);

    // Registration successful
    alert("Registration successful! Account created.");
    navigate("/dashboard");
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
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                name="firstName"
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                name="lastName"
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userName">User Name</Label>
              <Input
                name="userName"
                id="userName"
                type="text"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                name="employeeId"
                id="employeeId"
                type="text"
                placeholder="Enter your employee ID"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email (e.g., user@olivecrypto.com)"
                onChange={handleEmailChange}
                className={emailError ? "border-red-500" : ""}
                required
              />
              {emailError && (
                <p className="text-sm text-red-500 mt-1">{emailError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select name="role" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="production-support">
                    Production Support
                  </SelectItem>
                  <SelectItem value="uat-support">UAT Support</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Create a password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
              />
            </div>
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </form>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
