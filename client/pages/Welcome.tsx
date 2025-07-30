import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Welcome() {
  const location = useLocation();
  const email = location.state?.email || "User";
  
  // Extract name from email (part before @)
  const userName = email.split('@')[0];

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('https://cdn.builder.io/api/v1/image/assets%2F68d80f357eb44d4f91b54f9959266e98%2F8d16a2e9ec1743bca22b41627cfcc12a?format=webp&width=800')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
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
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome, {userName}!
            </h2>
            <p className="text-gray-600">
              You have successfully signed in to your account.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link to="/dashboard" state={{ email }}>
              Continue to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
