import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [changingRoleUserId, setChangingRoleUserId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  // Page access permissions state
  const [pagePermissions, setPagePermissions] = useState({
    "Admin": {
      "Dashboard": "Full Access",
      "Daily Tracker": "Full Access",
      "Shift Handover": "Full Access",
      "All Users Data": "Full Access",
      "Others": "Full Access"
    },
    "Manager": {
      "Dashboard": "Full Access",
      "Daily Tracker": "Full Access",
      "Shift Handover": "Full Access",
      "All Users Data": "Full Access",
      "Others": "Full Access"
    },
    "Production Support": {
      "Dashboard": "Full Access",
      "Daily Tracker": "Full Access",
      "Shift Handover": "Full Access",
      "All Users Data": "No Access",
      "Others": "No Access"
    },
    "UAT Support": {
      "Dashboard": "Full Access",
      "Daily Tracker": "Full Access",
      "Shift Handover": "No Access",
      "All Users Data": "No Access",
      "Others": "No Access"
    },
    "Developer": {
      "Dashboard": "Full Access",
      "Daily Tracker": "Full Access",
      "Shift Handover": "No Access",
      "All Users Data": "No Access",
      "Others": "No Access"
    }
  });

  // Available roles for selection
  const availableRoles = [
    { value: "Admin", label: "Admin", color: "bg-red-100 text-red-800" },
    { value: "Manager", label: "Manager", color: "bg-blue-100 text-blue-800" },
    { value: "Production Support", label: "Production Support", color: "bg-green-100 text-green-800" },
    { value: "UAT Support", label: "UAT Support", color: "bg-purple-100 text-purple-800" },
    { value: "Developer", label: "Developer", color: "bg-orange-100 text-orange-800" }
  ];

  // Function to get current user role
  const getCurrentUserRole = (userId: number): string => {
    if (userId === 1) return "Admin";
    if (userId === 2 || userId === 8) return "Manager";
    if (userId === 3) return "Production Support";
    if (userId === 4) return "UAT Support";
    return "Developer";
  };

  // Function to handle role change
  const handleRoleChange = (userId: number) => {
    setChangingRoleUserId(userId);
    setSelectedRole(getCurrentUserRole(userId));
  };

  // Function to save role change
  const saveRoleChange = () => {
    if (changingRoleUserId && selectedRole) {
      // Here you would typically save to backend
      console.log(`Changing user ${changingRoleUserId} role to ${selectedRole}`);
      alert(`Role changed to ${selectedRole} successfully!`);

      // Reset state
      setChangingRoleUserId(null);
      setSelectedRole("");
    }
  };

  // Function to cancel role change
  const cancelRoleChange = () => {
    setChangingRoleUserId(null);
    setSelectedRole("");
  };

  // Available access levels
  const accessLevels = [
    { value: "Full Access", label: "Full Access", icon: "✅" },
    { value: "View Only", label: "View Only", icon: "👁️" },
    { value: "No Access", label: "No Access", icon: "❌" }
  ];

  // Function to update page permission
  const updatePagePermission = (role: string, page: string, access: string) => {
    setPagePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role as keyof typeof prev],
        [page]: access
      }
    }));
  };

  // Function to save page permissions
  const savePagePermissions = () => {
    // Here you would typically save to backend
    console.log("Saving page permissions:", pagePermissions);
    alert("Page access permissions saved successfully!");
  };

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
                    <h2 className="text-xl font-semibold mb-2">User Role Management</h2>
                    <p className="text-gray-600">Assign roles and page access permissions to users</p>
                  </div>

                  {/* Role-Based Access Control */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <UserCheck className="h-5 w-5 mr-2" />
                        Role Assignment
                      </CardTitle>
                      <CardDescription>
                        Assign roles to users to control page access permissions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Available Roles */}
                        <div>
                          <h4 className="font-medium mb-3">Available Roles & Permissions</h4>
                          <div className="grid gap-3">
                            <div className="p-3 border rounded-lg bg-red-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-semibold text-red-800">Admin</h5>
                                  <p className="text-sm text-red-700">Full access to all pages and system settings</p>
                                </div>
                                <Badge className="bg-red-100 text-red-800">Full Access</Badge>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-red-600">
                                  Pages: Dashboard, Daily Tracker, Shift Handover, All Users Data, Others, User Management
                                </p>
                              </div>
                            </div>

                            <div className="p-3 border rounded-lg bg-blue-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-semibold text-blue-800">Manager</h5>
                                  <p className="text-sm text-blue-700">Access to management and reporting features</p>
                                </div>
                                <Badge className="bg-blue-100 text-blue-800">Management</Badge>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-blue-600">
                                  Pages: Dashboard, Daily Tracker, Shift Handover, All Users Data, Others
                                </p>
                              </div>
                            </div>

                            <div className="p-3 border rounded-lg bg-green-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-semibold text-green-800">Production Support</h5>
                                  <p className="text-sm text-green-700">Access to production operations and monitoring</p>
                                </div>
                                <Badge className="bg-green-100 text-green-800">Production</Badge>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-green-600">
                                  Pages: Dashboard, Daily Tracker, Shift Handover
                                </p>
                              </div>
                            </div>

                            <div className="p-3 border rounded-lg bg-purple-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-semibold text-purple-800">UAT Support</h5>
                                  <p className="text-sm text-purple-700">Access to UAT testing and validation features</p>
                                </div>
                                <Badge className="bg-purple-100 text-purple-800">UAT Testing</Badge>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-purple-600">
                                  Pages: Dashboard, Daily Tracker
                                </p>
                              </div>
                            </div>

                            <div className="p-3 border rounded-lg bg-orange-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-semibold text-orange-800">Developer</h5>
                                  <p className="text-sm text-orange-700">Access to development and coding features</p>
                                </div>
                                <Badge className="bg-orange-100 text-orange-800">Development</Badge>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-orange-600">
                                  Pages: Dashboard, Daily Tracker
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* User Role Assignment */}
                        <div>
                          <h4 className="font-medium mb-3">Assign Roles to Users</h4>
                          <div className="space-y-3">
                            {userDirectory.slice(0, 6).map((user) => (
                              <div key={user.id} className="p-3 border rounded-lg">
                                {changingRoleUserId === user.id ? (
                                  /* Role Change Interface */
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                      <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                      </div>
                                      <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-gray-600">{user.position}</p>
                                      </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <h5 className="font-medium mb-3">Select New Role</h5>
                                      <div className="space-y-3">
                                        <Select value={selectedRole} onValueChange={setSelectedRole}>
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a role..." />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {availableRoles.map((role) => (
                                              <SelectItem key={role.value} value={role.value}>
                                                <div className="flex items-center space-x-2">
                                                  <Badge className={role.color} variant="secondary">
                                                    {role.label}
                                                  </Badge>
                                                </div>
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>

                                        {selectedRole && (
                                          <div className="p-3 bg-blue-50 rounded border">
                                            <p className="text-sm text-blue-800">
                                              <strong>Selected Role:</strong> {selectedRole}
                                            </p>
                                            <p className="text-xs text-blue-600 mt-1">
                                              This user will have access to pages according to the {selectedRole} role permissions.
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex space-x-2">
                                      <Button
                                        size="sm"
                                        onClick={saveRoleChange}
                                        disabled={!selectedRole}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        Save Role
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={cancelRoleChange}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  /* Normal Display */
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                      </div>
                                      <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-gray-600">{user.position}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Badge
                                        className={
                                          user.id === 1 ? "bg-red-100 text-red-800" :
                                          user.id === 2 || user.id === 8 ? "bg-blue-100 text-blue-800" :
                                          user.id === 3 ? "bg-green-100 text-green-800" :
                                          user.id === 4 ? "bg-purple-100 text-purple-800" :
                                          "bg-orange-100 text-orange-800"
                                        }
                                      >
                                        {getCurrentUserRole(user.id)}
                                      </Badge>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleRoleChange(user.id)}
                                      >
                                        Change Role
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Page Access Matrix */}
                        <div>
                          <h4 className="font-medium mb-3">Page Access Matrix</h4>
                          <p className="text-sm text-gray-600 mb-4">Configure access permissions for each role and page</p>

                          <div className="overflow-x-auto">
                            <table className="w-full text-sm border rounded-lg">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="text-left p-3 border-b font-medium">Role</th>
                                  <th className="text-center p-3 border-b font-medium">Dashboard</th>
                                  <th className="text-center p-3 border-b font-medium">Daily Tracker</th>
                                  <th className="text-center p-3 border-b font-medium">Shift Handover</th>
                                  <th className="text-center p-3 border-b font-medium">All Users Data</th>
                                  <th className="text-center p-3 border-b font-medium">Others</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.keys(pagePermissions).map((role, index) => (
                                  <tr key={role} className={index < Object.keys(pagePermissions).length - 1 ? "border-b" : ""}>
                                    <td className="p-3 font-medium">{role}</td>
                                    {["Dashboard", "Daily Tracker", "Shift Handover", "All Users Data", "Others"].map((page) => (
                                      <td key={page} className="p-2">
                                        <Select
                                          value={pagePermissions[role as keyof typeof pagePermissions][page as keyof typeof pagePermissions[typeof role]]}
                                          onValueChange={(value) => updatePagePermission(role, page, value)}
                                        >
                                          <SelectTrigger className="w-full min-w-[120px]">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {accessLevels.map((level) => (
                                              <SelectItem key={level.value} value={level.value}>
                                                <div className="flex items-center space-x-2">
                                                  <span>{level.icon}</span>
                                                  <span>{level.label}</span>
                                                </div>
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                              <p className="text-xs text-blue-700 mb-2">
                                <strong>Access Levels:</strong>
                              </p>
                              <div className="flex flex-wrap gap-4 text-xs text-blue-600">
                                <span>✅ Full Access - Complete read/write access</span>
                                <span>👁️ View Only - Read-only access</span>
                                <span>❌ No Access - No access to page</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 pt-4 border-t">
                          <Button className="flex-1">
                            Save Role Changes
                          </Button>
                          <Button variant="outline">
                            Reset to Default
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Tools */}
                  <div className="grid gap-4">
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
