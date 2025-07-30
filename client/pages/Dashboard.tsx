import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Try to get user info from location state or localStorage
    const emailFromState = location.state?.email;
    const emailFromStorage = localStorage.getItem('userEmail');
    
    const email = emailFromState || emailFromStorage;
    
    if (email) {
      localStorage.setItem('userEmail', email);
      setUserName(email.split('@')[0]);
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Username */}
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-gray-900">
                Welcome, {userName}
              </h1>
            </div>
            
            {/* Right side - Logout button */}
            <div>
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
