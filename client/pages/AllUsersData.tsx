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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Clock,
  LogIn,
  LogOut,
  Calendar,
  CalendarDays,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function AllUsersData() {
  const [activeTab, setActiveTab] = useState("users");
  const [pageLoginTime, setPageLoginTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample user data
  const usersData = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      department: "Development",
      lastLogin: "2025-01-08 09:30:15",
      lastLogout: "2025-01-07 18:45:30",
      status: "Online",
      totalLeaves: 15,
      usedLeaves: 8,
      weekOffs: 52,
      usedWeekOffs: 45,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Testing",
      lastLogin: "2025-01-08 08:45:22",
      lastLogout: "2025-01-07 17:30:45",
      status: "Online",
      totalLeaves: 18,
      usedLeaves: 12,
      weekOffs: 52,
      usedWeekOffs: 50,
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      department: "Production",
      lastLogin: "2025-01-07 16:20:10",
      lastLogout: "2025-01-07 16:25:55",
      status: "Offline",
      totalLeaves: 20,
      usedLeaves: 5,
      weekOffs: 52,
      usedWeekOffs: 48,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      department: "UAT",
      lastLogin: "2025-01-08 10:15:33",
      lastLogout: "2025-01-07 19:10:20",
      status: "Online",
      totalLeaves: 16,
      usedLeaves: 10,
      weekOffs: 52,
      usedWeekOffs: 47,
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@company.com",
      department: "Development",
      lastLogin: "2025-01-08 07:30:45",
      lastLogout: "2025-01-07 20:15:10",
      status: "Online",
      totalLeaves: 14,
      usedLeaves: 6,
      weekOffs: 52,
      usedWeekOffs: 49,
    },
  ];

  // Filter users based on search term
  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    // Set page login time when component mounts
    const loginTime = new Date().toLocaleString();
    setPageLoginTime(loginTime);
  }, []);

  const getStatusBadge = (status: string) => {
    return status === "Online" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
        Online
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
        <div className="h-2 w-2 bg-gray-500 rounded-full mr-1"></div>
        Offline
      </Badge>
    );
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
            <div className="flex items-center">
              <Link
                to="/dashboard"
                className="flex items-center text-white hover:text-white/80 mr-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-white">All Users Data</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-sm text-white/80">Page Login Time:</span>
                <div className="text-sm font-semibold text-white">
                  {pageLoginTime}
                </div>
              </div>
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 rounded-none">
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  USERS
                </TabsTrigger>
                <TabsTrigger value="leaves" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  LEAVES
                </TabsTrigger>
                <TabsTrigger
                  value="weekoffs"
                  className="flex items-center gap-2"
                >
                  <CalendarDays className="h-4 w-4" />
                  WEEK OFFS
                </TabsTrigger>
              </TabsList>

              {/* USERS Tab */}
              <TabsContent value="users" className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        User Management
                      </h2>
                      <p className="text-gray-600">
                        View all users with login/logout times and status
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Users List */}
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <Card
                        key={user.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div>
                                <h3 className="font-semibold">{user.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {user.email}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {user.department}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6">
                              <div className="text-center">
                                <div className="flex items-center text-sm text-gray-600 mb-1">
                                  <LogIn className="h-4 w-4 mr-1" />
                                  Last Login
                                </div>
                                <p className="text-sm font-medium">
                                  {user.lastLogin}
                                </p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center text-sm text-gray-600 mb-1">
                                  <LogOut className="h-4 w-4 mr-1" />
                                  Last Logout
                                </div>
                                <p className="text-sm font-medium">
                                  {user.lastLogout}
                                </p>
                              </div>
                              <div className="text-center">
                                {getStatusBadge(user.status)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {filteredUsers.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No users found matching your search.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* LEAVES Tab */}
              <TabsContent value="leaves" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Leave Management
                    </h2>
                    <p className="text-gray-600">
                      Track leave balances and usage for all users
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {filteredUsers.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div>
                                <h3 className="font-semibold">{user.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {user.department}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-8">
                              <div className="text-center">
                                <p className="text-sm text-gray-600">
                                  Total Leaves
                                </p>
                                <p className="text-2xl font-bold text-blue-600">
                                  {user.totalLeaves}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-600">
                                  Used Leaves
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                  {user.usedLeaves}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-600">
                                  Remaining
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                  {user.totalLeaves - user.usedLeaves}
                                </p>
                              </div>
                              <div className="w-32">
                                <div className="bg-gray-200 rounded-full h-3">
                                  <div
                                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                                    style={{
                                      width: `${((user.totalLeaves - user.usedLeaves) / user.totalLeaves) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Leave Balance
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* WEEK OFFS Tab */}
              <TabsContent value="weekoffs" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Week Off Management
                    </h2>
                    <p className="text-gray-600">
                      Track weekly off days and usage for all users
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {filteredUsers.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div>
                                <h3 className="font-semibold">{user.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {user.department}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-8">
                              <div className="text-center">
                                <p className="text-sm text-gray-600">
                                  Total Week Offs
                                </p>
                                <p className="text-2xl font-bold text-blue-600">
                                  {user.weekOffs}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-600">
                                  Used Week Offs
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                  {user.usedWeekOffs}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-600">
                                  Remaining
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                  {user.weekOffs - user.usedWeekOffs}
                                </p>
                              </div>
                              <div className="w-32">
                                <div className="bg-gray-200 rounded-full h-3">
                                  <div
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                                    style={{
                                      width: `${((user.weekOffs - user.usedWeekOffs) / user.weekOffs) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Week Off Balance
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
