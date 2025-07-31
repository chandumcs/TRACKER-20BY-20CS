import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastLogin, setLastLogin] = useState("");
  const [lastLogout, setLastLogout] = useState("");

  useEffect(() => {
    // Set current login time and get last logout time
    const now = new Date().toLocaleString();
    setLastLogin(now);
    localStorage.setItem("lastLoginTime", now);

    const lastLogoutTime = localStorage.getItem("lastLogoutTime");
    if (lastLogoutTime) {
      setLastLogout(lastLogoutTime);
    }
  }, []);

  const handleLogout = () => {
    const logoutTime = new Date().toLocaleString();
    localStorage.setItem("lastLogoutTime", logoutTime);
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 animate-pulse shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Last Login Time */}
            <div className="flex items-center">
              <div>
                <span className="text-sm text-white/80">Last Login:</span>
                <div className="text-lg font-semibold text-white">
                  {lastLogin}
                </div>
              </div>
            </div>

            {/* Center - Heading */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                OLIVE-DCB
              </h1>
            </div>

            {/* Right side - Last Logout Time and Logout button */}
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <span className="text-sm text-gray-500">Last Logout:</span>
                <div className="text-lg font-semibold text-gray-900">
                  {lastLogout || "Never"}
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-gray-700 hover:text-gray-900"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Dashboard content will go here */}
      </main>
    </div>
  );
}
