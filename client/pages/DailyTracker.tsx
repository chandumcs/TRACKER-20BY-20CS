import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Filter, Clock, CheckCircle, XCircle } from "lucide-react";

export default function DailyTracker() {
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
              <h1 className="text-2xl font-bold text-white">Daily Tracker</h1>
            </div>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-white mr-2" />
              <span className="text-white">{new Date().toLocaleDateString()}</span>
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
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">To</Label>
                      <Input
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]}
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

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Daily Activities</CardTitle>
                <CardDescription>
                  Your tracked activities and progress for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <div className="text-sm text-green-700">Completed</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">3</div>
                    <div className="text-sm text-yellow-700">In Progress</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-sm text-red-700">Pending</div>
                  </div>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold mb-4">Today's Tasks</h3>
                  
                  {/* Sample Tasks */}
                  <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">NEFT-RTGS - Transaction Processing</h4>
                        <p className="text-sm text-gray-600">Completed at 10:30 AM</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">UPI - System Monitoring</h4>
                        <p className="text-sm text-gray-600">Started at 2:15 PM</p>
                      </div>
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">NEFT-RTGS - Settlement Review</h4>
                        <p className="text-sm text-gray-600">Due by 5:00 PM</p>
                      </div>
                      <XCircle className="h-5 w-5 text-red-600" />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">IMPS - Performance Testing</h4>
                        <p className="text-sm text-gray-600">Completed at 1:45 PM</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">E MANDATE - Authorization Check</h4>
                        <p className="text-sm text-gray-600">In progress since 3:30 PM</p>
                      </div>
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
