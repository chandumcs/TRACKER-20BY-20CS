import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Users, ClipboardList, MoreHorizontal, Filter } from "lucide-react";

export default function Dashboard() {
  // Add CSS animation keyframes
  const gradientStyle = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  // Inject styles
  if (typeof document !== "undefined") {
    const styleElement =
      document.getElementById("gradient-animation") ||
      document.createElement("style");
    styleElement.id = "gradient-animation";
    styleElement.textContent = gradientStyle;
    if (!document.getElementById("gradient-animation")) {
      document.head.appendChild(styleElement);
    }
  }
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

  const handleSectionClick = (sectionName: string) => {
    setActiveSection(sectionName);
    setTimeout(() => setActiveSection(null), 300); // Reset after animation

    // Navigate to specific pages
    if (sectionName === 'daily-tracker') {
      navigate('/daily-tracker');
    }
    // Add other navigation logic here for other sections
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DDA0DD, #98D8E8, #F7DC6F)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 shadow-lg border-b">
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
              <h1 className="text-2xl font-bold text-white">OLIVE-DCB</h1>
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
          {/* Daily Tracker */}
          <div
            className={`rounded-lg shadow-md p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === "daily-tracker"
                ? "transform scale-105 shadow-2xl -translate-y-2"
                : ""
            }`}
            style={{
              backgroundImage:
                "linear-gradient(-45deg, #60A5FA, #3B82F6, #1D4ED8, #1E40AF)",
              backgroundSize: "400% 400%",
              animation: "gradient 6s ease infinite",
            }}
            onClick={() => handleSectionClick("daily-tracker")}
          >
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-white mr-3" />
              <h2 className="text-xl font-semibold text-white">
                Daily Tracker
              </h2>
            </div>
            <div className="text-white/90 space-y-4">
              {/* Date Filters */}
              <div className="space-y-2">
                <Label className="text-white text-sm font-medium">Date Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                  <Input
                    type="date"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Product Filter */}
              <div className="space-y-2">
                <Label className="text-white text-sm font-medium">Product Filter</Label>
                <Select>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Select product..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="product-a">Product A</SelectItem>
                    <SelectItem value="product-b">Product B</SelectItem>
                    <SelectItem value="product-c">Product C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filter Button */}
              <Button
                size="sm"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                variant="outline"
              >
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>

              {/* Results Summary */}
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded">
                <p className="text-sm text-white">
                  Found: 5 completed, 3 pending tasks
                </p>
              </div>
            </div>
          </div>

          {/* Shift Hand Over */}
          <div
            className={`rounded-lg shadow-md p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === "shift-handover"
                ? "transform scale-105 shadow-2xl -translate-y-2"
                : ""
            }`}
            style={{
              backgroundImage:
                "linear-gradient(-45deg, #4ADE80, #10B981, #059669, #047857)",
              backgroundSize: "400% 400%",
              animation: "gradient 7s ease infinite",
            }}
            onClick={() => handleSectionClick("shift-handover")}
          >
            <div className="flex items-center mb-4">
              <ClipboardList className="h-6 w-6 text-white mr-3" />
              <h2 className="text-xl font-semibold text-white">
                Shift Hand Over
              </h2>
            </div>
            <div className="text-white/90">
              <p className="mb-2">Manage shift transitions and handovers</p>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded">
                <p className="text-sm text-white">
                  Next shift: 6:00 PM - 2:00 AM
                </p>
              </div>
            </div>
          </div>

          {/* All Users Data */}
          <div
            className={`rounded-lg shadow-md p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === "users-data"
                ? "transform scale-105 shadow-2xl -translate-y-2"
                : ""
            }`}
            style={{
              backgroundImage:
                "linear-gradient(-45deg, #A78BFA, #8B5CF6, #7C3AED, #6D28D9)",
              backgroundSize: "400% 400%",
              animation: "gradient 9s ease infinite",
            }}
            onClick={() => handleSectionClick("users-data")}
          >
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-white mr-3" />
              <h2 className="text-xl font-semibold text-white">
                All Users Data
              </h2>
            </div>
            <div className="text-white/90">
              <p className="mb-2">View and manage all user information</p>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded">
                <p className="text-sm text-white">Total users: 1,245 active</p>
              </div>
            </div>
          </div>

          {/* Others */}
          <div
            className={`rounded-lg shadow-md p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === "others"
                ? "transform scale-105 shadow-2xl -translate-y-2"
                : ""
            }`}
            style={{
              backgroundImage:
                "linear-gradient(-45deg, #FB923C, #F97316, #EA580C, #DC2626)",
              backgroundSize: "400% 400%",
              animation: "gradient 5s ease infinite",
            }}
            onClick={() => handleSectionClick("others")}
          >
            <div className="flex items-center mb-4">
              <MoreHorizontal className="h-6 w-6 text-white mr-3" />
              <h2 className="text-xl font-semibold text-white">Others</h2>
            </div>
            <div className="text-white/90">
              <p className="mb-2">Additional tools and features</p>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded">
                <p className="text-sm text-white">
                  Reports, Settings, Analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
