import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MoreHorizontal, 
  Users, 
  Search,
  Building,
  UserCheck,
  Settings,
  BarChart3
} from "lucide-react";
import { useState } from "react";

export default function Others() {
  const [activeTab, setActiveTab] = useState("directory");
  const [searchTerm, setSearchTerm] = useState("");

  // User directory data with names and positions
  const userDirectory = [
    {
      id: 1,
      name: "John Smith",
      position: "Senior Software Developer",
      department: "Development",
      team: "Backend Team",
      level: "Senior",
      email: "john.smith@company.com",
      employeeId: "EMP001"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "QA Test Engineer",
      department: "Quality Assurance",
      team: "Testing Team",
      level: "Mid-Level",
      email: "sarah.johnson@company.com",
      employeeId: "EMP002"
    },
    {
      id: 3,
      name: "Mike Chen",
      position: "Production Support Engineer",
      department: "Operations",
      team: "Production Team",
      level: "Senior",
      email: "mike.chen@company.com",
      employeeId: "EMP003"
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "UAT Specialist",
      department: "Quality Assurance",
      team: "UAT Team",
      level: "Mid-Level",
      email: "emily.davis@company.com",
      employeeId: "EMP004"
    },
    {
      id: 5,
      name: "David Wilson",
      position: "Full Stack Developer",
      department: "Development",
      team: "Frontend Team",
      level: "Junior",
      email: "david.wilson@company.com",
      employeeId: "EMP005"
    },
    {
      id: 6,
      name: "Lisa Anderson",
      position: "Technical Lead",
      department: "Development",
      team: "Architecture Team",
      level: "Lead",
      email: "lisa.anderson@company.com",
      employeeId: "EMP006"
    },
    {
      id: 7,
      name: "Robert Taylor",
      position: "DevOps Engineer",
      department: "Operations",
      team: "Infrastructure Team",
      level: "Senior",
      email: "robert.taylor@company.com",
      employeeId: "EMP007"
    },
    {
      id: 8,
      name: "Jennifer Lee",
      position: "Business Analyst",
      department: "Business",
      team: "Analysis Team",
      level: "Mid-Level",
      email: "jennifer.lee@company.com",
      employeeId: "EMP008"
    },
    {
      id: 9,
      name: "Mark Thompson",
      position: "Security Engineer",
      department: "Security",
      team: "Security Team",
      level: "Senior",
      email: "mark.thompson@company.com",
      employeeId: "EMP009"
    },
    {
      id: 10,
      name: "Amanda Clark",
      position: "Project Manager",
      department: "Management",
      team: "Project Office",
      level: "Manager",
      email: "amanda.clark@company.com",
      employeeId: "EMP010"
    }
  ];

  // Filter users based on search term
  const filteredUsers = userDirectory.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group users by department
  const usersByDepartment = filteredUsers.reduce((acc, user) => {
    if (!acc[user.department]) {
      acc[user.department] = [];
    }
    acc[user.department].push(user);
    return acc;
  }, {} as Record<string, typeof userDirectory>);

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "Lead":
        return "bg-purple-100 text-purple-800";
      case "Manager":
        return "bg-blue-100 text-blue-800";
      case "Senior":
        return "bg-green-100 text-green-800";
      case "Mid-Level":
        return "bg-yellow-100 text-yellow-800";
      case "Junior":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div 
      className="min-h-screen" 
      style={{
        backgroundImage: "linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DDA0DD, #98D8E8, #F7DC6F)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center text-white hover:text-white/80 mr-6">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-white">Others</h1>
            </div>
            <div className="flex items-center">
              <MoreHorizontal className="h-6 w-6 text-white mr-2" />
              <span className="text-white">Additional Tools</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 rounded-none">
                <TabsTrigger value="directory" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  DIRECTORY
                </TabsTrigger>
                <TabsTrigger value="departments" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  DEPARTMENTS
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  ANALYTICS
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  SETTINGS
                </TabsTrigger>
              </TabsList>

              {/* DIRECTORY Tab - User Names and Positions */}
              <TabsContent value="directory" className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Employee Directory</h2>
                      <p className="text-gray-600">Complete list of all employees with their positions</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                        <Input
                          placeholder="Search employees..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Employee Cards */}
                  <div className="grid gap-4">
                    {filteredUsers.map((user) => (
                      <Card key={user.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{user.name}</h3>
                                <p className="text-blue-600 font-medium">{user.position}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <div className="flex items-center space-x-2">
                                <Badge className={getLevelBadgeColor(user.level)}>
                                  {user.level}
                                </Badge>
                                <Badge variant="outline">
                                  {user.employeeId}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p><strong>Department:</strong> {user.department}</p>
                                <p><strong>Team:</strong> {user.team}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {filteredUsers.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No employees found matching your search.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* DEPARTMENTS Tab */}
              <TabsContent value="departments" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Department Overview</h2>
                    <p className="text-gray-600">Employees organized by department and positions</p>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(usersByDepartment).map(([department, users]) => (
                      <Card key={department}>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Building className="h-5 w-5 mr-2" />
                            {department} Department
                            <Badge variant="secondary" className="ml-2">
                              {users.length} employees
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-3">
                            {users.map((user) => (
                              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.position}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <Badge className={getLevelBadgeColor(user.level)} variant="secondary">
                                    {user.level}
                                  </Badge>
                                  <p className="text-xs text-gray-500 mt-1">{user.team}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* ANALYTICS Tab */}
              <TabsContent value="analytics" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Team Analytics</h2>
                    <p className="text-gray-600">Statistics and insights about team structure</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-2xl font-bold text-blue-600">{userDirectory.length}</h3>
                        <p className="text-sm text-gray-600">Total Employees</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-2xl font-bold text-green-600">{Object.keys(usersByDepartment).length}</h3>
                        <p className="text-sm text-gray-600">Departments</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-2xl font-bold text-purple-600">
                          {userDirectory.filter(u => u.level === "Senior" || u.level === "Lead").length}
                        </h3>
                        <p className="text-sm text-gray-600">Senior Staff</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-2xl font-bold text-orange-600">
                          {new Set(userDirectory.map(u => u.team)).size}
                        </h3>
                        <p className="text-sm text-gray-600">Teams</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* SETTINGS Tab */}
              <TabsContent value="settings" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">System Settings</h2>
                    <p className="text-gray-600">Configuration and system management options</p>
                  </div>

                  <div className="grid gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">User Management</h3>
                        <p className="text-sm text-gray-600 mb-4">Add, edit, or remove user accounts and permissions</p>
                        <Button variant="outline">Manage Users</Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">System Reports</h3>
                        <p className="text-sm text-gray-600 mb-4">Generate and download system usage reports</p>
                        <Button variant="outline">Generate Reports</Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Backup & Maintenance</h3>
                        <p className="text-sm text-gray-600 mb-4">System backup and maintenance utilities</p>
                        <Button variant="outline">System Tools</Button>
                      </CardContent>
                    </Card>
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
