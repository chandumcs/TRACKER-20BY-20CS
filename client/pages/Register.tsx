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
  const [step, setStep] = useState<"registration" | "otp">("registration");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    employeeId: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: ""
  });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    if (!email.endsWith('@olivecrypto.com')) {
      setEmailError('Please enter organization mail id');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !value.endsWith('@olivecrypto.com')) {
      setEmailError('Please enter organization mail id');
    } else {
      setEmailError('');
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

    setFormData(data);
    sendOtp(data.email);
  };

  const sendOtp = (email: string) => {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    // Here you would typically send OTP via email API
    console.log(`OTP sent to ${email}: ${otp}`);
    alert(`OTP sent to ${email}. For demo purposes, your OTP is: ${otp}`);

    setOtpSent(true);
    setStep("otp");
  };

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (otp === generatedOtp) {
      // OTP verified successfully
      alert("Registration successful! Account created.");
      navigate("/dashboard");
    } else {
      alert("Invalid OTP. Please try again.");
      setOtp("");
    }
  };

  const resendOtp = () => {
    sendOtp(formData.email);
    setOtp("");
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
          {step === "registration" ? (
            /* Step 1: Registration Form */
            <>
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
                  Send OTP to Email
                </Button>
              </form>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </>
          ) : (
            /* Step 2: OTP Verification */
            <>
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Verify Your Email</h3>
                <p className="text-sm text-gray-600 mt-2">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-sm font-medium text-blue-600">{formData.email}</p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                    required
                  />
                </div>

                <Button className="w-full" type="submit" disabled={otp.length !== 6}>
                  Verify OTP & Create Account
                </Button>
              </form>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?
                </p>
                <div className="flex space-x-4 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resendOtp}
                  >
                    Resend OTP
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStep("registration");
                      setOtp("");
                      setOtpSent(false);
                    }}
                  >
                    Change Email
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
