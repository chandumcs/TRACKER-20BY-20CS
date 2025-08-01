import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

export default function DailyTracker() {
  const [activeTab, setActiveTab] = useState("track");
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
              <h1 className="text-2xl font-bold text-white">Daily Tracker</h1>
            </div>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-white mr-2" />
              <span className="text-white">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
                <CardDescription>
                  Filter your daily activities and tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Range Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Date Range</Label>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-gray-500">From</Label>
                      <Input
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">To</Label>
                      <Input
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Product</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="neft-rtgs">NEFT-RTGS</SelectItem>
                      <SelectItem value="imps">IMPS</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="e-mandate">E MANDATE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Issue Type Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Issue Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="bug">BUG</SelectItem>
                      <SelectItem value="brd">BRD</SelectItem>
                      <SelectItem value="reopened-bug">REOPENED BUG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Apply Filters Button */}
                <Button className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>

                {/* Clear Filters */}
                <Button variant="outline" className="w-full">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - 4 Screens */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 rounded-none">
                    <TabsTrigger
                      value="track"
                      className="flex items-center gap-2"
                    >
                      <BarChart3 className="h-4 w-4" />
                      TRACK
                    </TabsTrigger>
                    <TabsTrigger
                      value="add"
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      ADD
                    </TabsTrigger>
                    <TabsTrigger
                      value="edit"
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      EDIT
                    </TabsTrigger>
                    <TabsTrigger
                      value="reports"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      REPORTS
                    </TabsTrigger>
                  </TabsList>

                  {/* TRACK Screen */}
                  <TabsContent value="track" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          Daily Activities
                        </h2>
                        <p className="text-gray-600">
                          Your tracked activities and progress for the selected
                          period
                        </p>
                      </div>

                      {/* Summary Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-green-600">
                            5
                          </div>
                          <div className="text-sm text-green-700">
                            Completed
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg text-center">
                          <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-yellow-600">
                            3
                          </div>
                          <div className="text-sm text-yellow-700">
                            In Progress
                          </div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg text-center">
                          <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-red-600">
                            2
                          </div>
                          <div className="text-sm text-red-700">Pending</div>
                        </div>
                      </div>

                      {/* Task List */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Today's Tasks</h3>

                        <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                NEFT-RTGS - Transaction Processing
                              </h4>
                              <p className="text-sm text-gray-600">
                                Completed at 10:30 AM
                              </p>
                            </div>
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                        </div>

                        <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                UPI - System Monitoring
                              </h4>
                              <p className="text-sm text-gray-600">
                                Started at 2:15 PM
                              </p>
                            </div>
                            <Clock className="h-5 w-5 text-yellow-600" />
                          </div>
                        </div>

                        <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                NEFT-RTGS - Settlement Review
                              </h4>
                              <p className="text-sm text-gray-600">
                                Due by 5:00 PM
                              </p>
                            </div>
                            <XCircle className="h-5 w-5 text-red-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* ADD Screen */}
                  <TabsContent value="add" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          Add New Task
                        </h2>
                        <p className="text-gray-600">
                          Create a new daily activity or task
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Product</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select product..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="neft-rtgs">
                                  NEFT-RTGS
                                </SelectItem>
                                <SelectItem value="imps">IMPS</SelectItem>
                                <SelectItem value="upi">UPI</SelectItem>
                                <SelectItem value="e-mandate">
                                  E MANDATE
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Issue Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bug">BUG</SelectItem>
                                <SelectItem value="brd">BRD</SelectItem>
                                <SelectItem value="reopened-bug">
                                  REOPENED BUG
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Task Title</Label>
                          <Input placeholder="Enter task title..." />
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Enter task description..."
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Priority</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Due Date</Label>
                            <Input type="date" />
                          </div>
                        </div>

                        <Button className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Task
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* EDIT Screen */}
                  <TabsContent value="edit" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          Edit Tasks
                        </h2>
                        <p className="text-gray-600">
                          Modify existing tasks and update their status
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium">
                                UPI - System Monitoring
                              </h4>
                              <p className="text-sm text-gray-600">
                                In Progress
                              </p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600"
                            >
                              Mark Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600"
                            >
                              Mark Pending
                            </Button>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium">
                                NEFT-RTGS - Settlement Review
                              </h4>
                              <p className="text-sm text-gray-600">Pending</p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600"
                            >
                              Mark Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-yellow-600"
                            >
                              Start Task
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* REPORTS Screen */}
                  <TabsContent value="reports" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          Reports & Analytics
                        </h2>
                        <p className="text-gray-600">
                          View detailed reports and performance metrics
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-blue-800">
                            Weekly Progress
                          </h3>
                          <div className="text-2xl font-bold text-blue-600">
                            87%
                          </div>
                          <p className="text-sm text-blue-700">
                            Tasks completed this week
                          </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-purple-800">
                            Average Time
                          </h3>
                          <div className="text-2xl font-bold text-purple-600">
                            2.4h
                          </div>
                          <p className="text-sm text-purple-700">
                            Per task completion
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Product Performance
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span>NEFT-RTGS</span>
                            <span className="font-semibold">
                              8 tasks completed
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span>UPI</span>
                            <span className="font-semibold">
                              12 tasks completed
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span>IMPS</span>
                            <span className="font-semibold">
                              6 tasks completed
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span>E MANDATE</span>
                            <span className="font-semibold">
                              4 tasks completed
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
