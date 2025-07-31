import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Users, ClipboardList, MoreHorizontal } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastLogin, setLastLogin] = useState("");
  const [lastLogout, setLastLogout] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
                <span className="text-sm text-white/80">Last Logout:</span>
                <div className="text-lg font-semibold text-white">
                  {lastLogout || "Never"}
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-white border-white/50 hover:bg-white/20 hover:text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Four-part grid layout */}
        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          {/* Top Left */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 1</h2>
            <div className="text-gray-600">
              Content for top left section
            </div>
          </div>

          {/* Top Right */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 2</h2>
            <div className="text-gray-600">
              Content for top right section
            </div>
          </div>

          {/* Bottom Left */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 3</h2>
            <div className="text-gray-600">
              Content for bottom left section
            </div>
          </div>

          {/* Bottom Right */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 4</h2>
            <div className="text-gray-600">
              Content for bottom right section
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
