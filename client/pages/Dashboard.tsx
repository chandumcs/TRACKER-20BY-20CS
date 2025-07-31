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

  const handleSectionClick = (sectionName: string) => {
    setActiveSection(sectionName);
    setTimeout(() => setActiveSection(null), 300); // Reset after animation
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
          {/* Daily Tracker */}
          <div
            className={`bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'daily-tracker' ? 'transform scale-105 shadow-2xl -translate-y-2' : ''
            }`}
            onClick={() => handleSectionClick('daily-tracker')}
          >
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-white mr-3" />
              <h2 className="text-xl font-semibold text-white">Daily Tracker</h2>
            </div>
            <div className="text-white/90">
              <p className="mb-2">Track your daily activities and progress</p>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded">
                <p className="text-sm text-white">Today's Tasks: 5 completed, 3 pending</p>
              </div>
            </div>
          </div>

          {/* Shift Hand Over */}
          <div
            className={`bg-white rounded-lg shadow-md p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'shift-handover' ? 'transform scale-105 shadow-2xl -translate-y-2' : ''
            }`}
            onClick={() => handleSectionClick('shift-handover')}
          >
            <div className="flex items-center mb-4">
              <ClipboardList className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Shift Hand Over</h2>
            </div>
            <div className="text-gray-600">
              <p className="mb-2">Manage shift transitions and handovers</p>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-green-700">Next shift: 6:00 PM - 2:00 AM</p>
              </div>
            </div>
          </div>

          {/* All Users Data */}
          <div
            className={`bg-white rounded-lg shadow-md p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'users-data' ? 'transform scale-105 shadow-2xl -translate-y-2' : ''
            }`}
            onClick={() => handleSectionClick('users-data')}
          >
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">All Users Data</h2>
            </div>
            <div className="text-gray-600">
              <p className="mb-2">View and manage all user information</p>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-purple-700">Total users: 1,245 active</p>
              </div>
            </div>
          </div>

          {/* Others */}
          <div
            className={`bg-white rounded-lg shadow-md p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'others' ? 'transform scale-105 shadow-2xl -translate-y-2' : ''
            }`}
            onClick={() => handleSectionClick('others')}
          >
            <div className="flex items-center mb-4">
              <MoreHorizontal className="h-6 w-6 text-orange-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Others</h2>
            </div>
            <div className="text-gray-600">
              <p className="mb-2">Additional tools and features</p>
              <div className="bg-orange-50 p-3 rounded">
                <p className="text-sm text-orange-700">Reports, Settings, Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
