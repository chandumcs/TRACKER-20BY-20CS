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
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function DailyTracker() {
  const [activeTab, setActiveTab] = useState("track");
  const [editingTask, setEditingTask] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  // Load tasks from database on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const result = await response.json();

      if (result.success) {
        setTasks(result.tasks);
      } else {
        console.error('Failed to load tasks:', result.message);
        // Fallback to localStorage if database fails
        const savedTasks = localStorage.getItem("dailyTasks");
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      // Fallback to localStorage if database fails
      const savedTasks = localStorage.getItem("dailyTasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  };

  // Filter state
  const [filters, setFilters] = useState({
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: new Date().toISOString().split("T")[0],
    product: "all",
    issueType: "all",
    status: "all",
  });

  // Applied filters state (only applied when user clicks Apply Filters)
  const [appliedFilters, setAppliedFilters] = useState({
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: new Date().toISOString().split("T")[0],
    product: "all",
    issueType: "all",
    status: "all",
  });

  // Tasks data from state
  const allTasks = tasks;

  // Filter tasks based on applied filters
  const filteredTasks = allTasks.filter((task) => {
    const matchesProduct =
      appliedFilters.product === "all" ||
      task.product === appliedFilters.product;
    const matchesIssueType =
      appliedFilters.issueType === "all" ||
      task.issueType === appliedFilters.issueType;
    const matchesStatus =
      appliedFilters.status === "all" || task.status === appliedFilters.status;
    const matchesDate =
      task.date >= appliedFilters.dateFrom &&
      task.date <= appliedFilters.dateTo;

    return matchesProduct && matchesIssueType && matchesStatus && matchesDate;
  });

  // Calculate stats based on filtered tasks
  const stats = {
    completed: filteredTasks.filter((task) => task.status === "completed")
      .length,
    inProgress: filteredTasks.filter((task) => task.status === "in-progress")
      .length,
    pending: filteredTasks.filter((task) => task.status === "pending").length,
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const clearFilters = () => {
    const defaultFilters = {
      dateFrom: new Date().toISOString().split("T")[0],
      dateTo: new Date().toISOString().split("T")[0],
      product: "all",
      issueType: "all",
      status: "all",
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const taskData = {
      title: formData.get("title") as string,
      product: formData.get("product") as string,
      issueType: formData.get("issueType") as string,
      description: formData.get("description") as string,
      developer: formData.get("developer") as string,
      uatPerson: formData.get("uatPerson") as string,
      productionPerson: formData.get("productionPerson") as string,
      priority: formData.get("priority") as string,
      reportedDate: formData.get("reportedDate") as string,
      fixedDate: formData.get("fixedDate") as string,
      closedDate: formData.get("closedDate") as string,
      userEmail: localStorage.getItem("userEmail") || "system@olivecrypto.com",
    };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const result = await response.json();

      if (result.success) {
        // Reload tasks from database to get the latest data
        await loadTasks();

        // Reset form
        (e.target as HTMLFormElement).reset();

        // Show success message and switch to track tab
        alert("Task added successfully!");
        setActiveTab("track");
      } else {
        alert(result.message || "Failed to add task. Please try again.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Connection error. Please try again.");
    }
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;

    const formData = new FormData(e.target as HTMLFormElement);

    const updateData = {
      title: formData.get("title") as string,
      product: formData.get("product") as string,
      issueType: formData.get("issueType") as string,
      description: formData.get("description") as string,
      developer: formData.get("developer") as string,
      uatPerson: formData.get("uatPerson") as string,
      productionPerson: formData.get("productionPerson") as string,
      priority: formData.get("priority") as string,
      reportedDate: formData.get("reportedDate") as string,
      fixedDate: formData.get("fixedDate") as string,
      closedDate: formData.get("closedDate") as string,
    };

    try {
      const response = await fetch(`/api/tasks/${editingTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (result.success) {
        // Reload tasks from database
        await loadTasks();

        setEditingTask(null);
        alert("Task updated successfully!");
        setActiveTab("track");
      } else {
        alert(result.message || "Failed to update task. Please try again.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Connection error. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (result.success) {
          // Reload tasks from database
          await loadTasks();
          alert("Task deleted successfully!");
        } else {
          alert(result.message || "Failed to delete task. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Connection error. Please try again.");
      }
    }
  };

  const exportToExcel = () => {
    if (filteredTasks.length === 0) {
      alert("No data to export. Please add tasks or adjust your filters.");
      return;
    }

    // Prepare data for export
    const exportData = filteredTasks.map((task, index) => ({
      "S.No": index + 1,
      "Task Title": task.title,
      Product: task.product.toUpperCase().replace("-", " "),
      "Issue Type": task.issueType.toUpperCase().replace("-", " "),
      Status:
        task.status.charAt(0).toUpperCase() +
        task.status.slice(1).replace("-", " "),
      Priority: task.priority || "Not Set",
      Developer: task.developer || "Not Assigned",
      "UAT Person": task.uatPerson || "Not Assigned",
      "Production Person": task.productionPerson || "Not Assigned",
      "Reported Date": task.reportedDate || "Not Set",
      "Fixed Date": task.fixedDate || "Not Set",
      "Closed Date": task.closedDate || "Not Set",
      Date: task.date,
      Time: task.time,
      Description: task.description || "No description provided",
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths for better readability
    const columnWidths = [
      { wch: 8 }, // S.No
      { wch: 30 }, // Task Title
      { wch: 15 }, // Product
      { wch: 15 }, // Issue Type
      { wch: 12 }, // Status
      { wch: 10 }, // Priority
      { wch: 20 }, // Developer
      { wch: 20 }, // UAT Person
      { wch: 20 }, // Production Person
      { wch: 15 }, // Reported Date
      { wch: 15 }, // Fixed Date
      { wch: 15 }, // Closed Date
      { wch: 12 }, // Date
      { wch: 20 }, // Time
      { wch: 40 }, // Description
    ];
    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Tasks Report");

    // Generate filename with current date and filter info
    const currentDate = new Date().toISOString().split("T")[0];
    const filterInfo =
      appliedFilters.product !== "all" ? `_${appliedFilters.product}` : "";
    const filename = `DailyTasks_Report_${currentDate}${filterInfo}.xlsx`;

    // Export file
    XLSX.writeFile(workbook, filename);

    alert(`Report exported successfully as "${filename}"`);
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
                        value={filters.dateFrom}
                        onChange={(e) =>
                          handleFilterChange("dateFrom", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">To</Label>
                      <Input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) =>
                          handleFilterChange("dateTo", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Product</Label>
                  <Select
                    value={filters.product}
                    onValueChange={(value) =>
                      handleFilterChange("product", value)
                    }
                  >
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
                  <Select
                    value={filters.issueType}
                    onValueChange={(value) =>
                      handleFilterChange("issueType", value)
                    }
                  >
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
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      handleFilterChange("status", value)
                    }
                  >
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
                <Button className="w-full" onClick={applyFilters}>
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearFilters}
                >
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
                            {stats.completed}
                          </div>
                          <div className="text-sm text-green-700">
                            Completed
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg text-center">
                          <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-yellow-600">
                            {stats.inProgress}
                          </div>
                          <div className="text-sm text-yellow-700">
                            In Progress
                          </div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg text-center">
                          <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-red-600">
                            {stats.pending}
                          </div>
                          <div className="text-sm text-red-700">Pending</div>
                        </div>
                      </div>

                      {/* Task List */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                          Filtered Tasks ({filteredTasks.length} found)
                        </h3>

                        {filteredTasks.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p>No tasks found matching the current filters.</p>
                            <Button
                              variant="outline"
                              onClick={clearFilters}
                              className="mt-4"
                            >
                              Clear Filters
                            </Button>
                          </div>
                        ) : (
                          filteredTasks.map((task) => {
                            const statusConfig = {
                              completed: {
                                bg: "bg-green-50",
                                border: "border-green-200",
                                icon: (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ),
                              },
                              "in-progress": {
                                bg: "bg-yellow-50",
                                border: "border-yellow-200",
                                icon: (
                                  <Clock className="h-5 w-5 text-yellow-600" />
                                ),
                              },
                              pending: {
                                bg: "bg-red-50",
                                border: "border-red-200",
                                icon: (
                                  <XCircle className="h-5 w-5 text-red-600" />
                                ),
                              },
                            };

                            const config =
                              statusConfig[
                                task.status as keyof typeof statusConfig
                              ];

                            return (
                              <div
                                key={task.id}
                                className={`border rounded-lg p-4 ${config.bg} ${config.border}`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">
                                      {task.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {task.time}
                                    </p>
                                    <div className="flex gap-2 mt-1">
                                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {task.product.toUpperCase()}
                                      </span>
                                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                        {task.issueType
                                          .toUpperCase()
                                          .replace("-", " ")}
                                      </span>
                                    </div>
                                  </div>
                                  {config.icon}
                                </div>
                              </div>
                            );
                          })
                        )}
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

                      <form onSubmit={handleAddTask} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Product</Label>
                            <Select name="product" required>
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
                            <Select name="issueType" required>
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
                          <Input
                            name="title"
                            placeholder="Enter task title..."
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            name="description"
                            placeholder="Enter task description..."
                            rows={4}
                          />
                        </div>

                        {/* Team Assignment Section */}
                        <div className="space-y-4 border-t pt-4">
                          <h4 className="font-medium text-gray-800">
                            Team Assignment
                          </h4>

                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label>Developer Name</Label>
                              <Input
                                name="developer"
                                placeholder="Enter developer name..."
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>UAT Person</Label>
                              <Input
                                name="uatPerson"
                                placeholder="Enter UAT person name..."
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Production Person</Label>
                              <Input
                                name="productionPerson"
                                placeholder="Enter production person name..."
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Priority</Label>
                          <Select name="priority">
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

                        {/* Date Tracking Section */}
                        <div className="space-y-4 border-t pt-4">
                          <h4 className="font-medium text-gray-800">
                            Date Tracking
                          </h4>

                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label>Reported Date</Label>
                              <Input
                                name="reportedDate"
                                type="date"
                                placeholder="Select reported date..."
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Fixed Date</Label>
                              <Input
                                name="fixedDate"
                                type="date"
                                placeholder="Select fixed date..."
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Closed Date</Label>
                              <Input
                                name="closedDate"
                                type="date"
                                placeholder="Select closed date..."
                              />
                            </div>
                          </div>
                        </div>

                        <Button type="submit" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Task
                        </Button>
                      </form>
                    </div>
                  </TabsContent>

                  {/* EDIT Screen */}
                  <TabsContent value="edit" className="p-6">
                    {editingTask ? (
                      /* Edit Form - Similar to ADD but with existing data */
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-semibold mb-2">
                              Edit Task
                            </h2>
                            <p className="text-gray-600">
                              Update task details and information
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => setEditingTask(null)}
                          >
                            Back to List
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Product</Label>
                              <Select defaultValue={editingTask.product}>
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
                              <Select defaultValue={editingTask.issueType}>
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
                            <Input
                              defaultValue={editingTask.title}
                              placeholder="Enter task title..."
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              defaultValue="Task description details..."
                              placeholder="Enter task description..."
                              rows={4}
                            />
                          </div>

                          {/* Team Assignment Section */}
                          <div className="space-y-4 border-t pt-4">
                            <h4 className="font-medium text-gray-800">
                              Team Assignment
                            </h4>

                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <Label>Developer Name</Label>
                                <Input placeholder="Enter developer name..." />
                              </div>

                              <div className="space-y-2">
                                <Label>UAT Person</Label>
                                <Input placeholder="Enter UAT person name..." />
                              </div>

                              <div className="space-y-2">
                                <Label>Production Person</Label>
                                <Input placeholder="Enter production person name..." />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Priority</Label>
                            <Select defaultValue="medium">
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

                          {/* Date Tracking Section */}
                          <div className="space-y-4 border-t pt-4">
                            <h4 className="font-medium text-gray-800">
                              Date Tracking
                            </h4>

                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <Label>Reported Date</Label>
                                <Input type="date" defaultValue="2025-01-08" />
                              </div>

                              <div className="space-y-2">
                                <Label>Fixed Date</Label>
                                <Input type="date" />
                              </div>

                              <div className="space-y-2">
                                <Label>Closed Date</Label>
                                <Input type="date" />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button className="flex-1">
                              <Edit className="h-4 w-4 mr-2" />
                              Update Task
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditingTask(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Task List for Editing */
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold mb-2">
                            Edit Tasks
                          </h2>
                          <p className="text-gray-600">
                            Select a task to edit its details
                          </p>
                        </div>

                        <div className="space-y-3">
                          {filteredTasks.map((task) => (
                            <div
                              key={task.id}
                              className="border rounded-lg p-4 hover:bg-gray-50"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium">{task.title}</h4>
                                  <p className="text-sm text-gray-600">
                                    {task.time}
                                  </p>
                                  <div className="flex gap-2 mt-2">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                      {task.product.toUpperCase()}
                                    </span>
                                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                      {task.issueType
                                        .toUpperCase()
                                        .replace("-", " ")}
                                    </span>
                                    <span
                                      className={`text-xs px-2 py-1 rounded ${
                                        task.status === "completed"
                                          ? "bg-green-100 text-green-800"
                                          : task.status === "in-progress"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {task.status
                                        .toUpperCase()
                                        .replace("-", " ")}
                                    </span>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingTask(task)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          ))}

                          {filteredTasks.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                              <p>No tasks available for editing.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* REPORTS Screen */}
                  <TabsContent value="reports" className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-semibold mb-2">
                            Reports & Analytics
                          </h2>
                          <p className="text-gray-600">
                            View detailed reports and export filtered data to
                            Excel
                          </p>
                        </div>
                        <Button
                          onClick={exportToExcel}
                          className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Export to Excel
                        </Button>
                      </div>

                      {/* Current Filter Summary */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-2">
                          Current Filter Summary
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-blue-600 font-medium">
                              Date Range:
                            </span>
                            <p className="text-blue-800">
                              {appliedFilters.dateFrom} to{" "}
                              {appliedFilters.dateTo}
                            </p>
                          </div>
                          <div>
                            <span className="text-blue-600 font-medium">
                              Product:
                            </span>
                            <p className="text-blue-800">
                              {appliedFilters.product === "all"
                                ? "All Products"
                                : appliedFilters.product
                                    .toUpperCase()
                                    .replace("-", " ")}
                            </p>
                          </div>
                          <div>
                            <span className="text-blue-600 font-medium">
                              Issue Type:
                            </span>
                            <p className="text-blue-800">
                              {appliedFilters.issueType === "all"
                                ? "All Types"
                                : appliedFilters.issueType
                                    .toUpperCase()
                                    .replace("-", " ")}
                            </p>
                          </div>
                          <div>
                            <span className="text-blue-600 font-medium">
                              Status:
                            </span>
                            <p className="text-blue-800">
                              {appliedFilters.status === "all"
                                ? "All Status"
                                : appliedFilters.status
                                    .charAt(0)
                                    .toUpperCase() +
                                  appliedFilters.status
                                    .slice(1)
                                    .replace("-", " ")}
                            </p>
                          </div>
                          <div>
                            <span className="text-blue-600 font-medium">
                              Total Tasks:
                            </span>
                            <p className="text-blue-800 font-bold">
                              {filteredTasks.length} found
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Live Statistics */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h3 className="font-semibold text-green-800">
                            Completed Tasks
                          </h3>
                          <div className="text-2xl font-bold text-green-600">
                            {stats.completed}
                          </div>
                          <p className="text-sm text-green-700">
                            From filtered data
                          </p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h3 className="font-semibold text-yellow-800">
                            In Progress
                          </h3>
                          <div className="text-2xl font-bold text-yellow-600">
                            {stats.inProgress}
                          </div>
                          <p className="text-sm text-yellow-700">
                            Active tasks
                          </p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <h3 className="font-semibold text-red-800">
                            Pending Tasks
                          </h3>
                          <div className="text-2xl font-bold text-red-600">
                            {stats.pending}
                          </div>
                          <p className="text-sm text-red-700">
                            Awaiting action
                          </p>
                        </div>
                      </div>

                      {/* Product Performance - Based on Filtered Data */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Product Performance (Filtered Data)
                        </h3>
                        <div className="space-y-2">
                          {["neft-rtgs", "upi", "imps", "e-mandate"].map(
                            (product) => {
                              const productTasks = filteredTasks.filter(
                                (task) => task.product === product,
                              );
                              const completedCount = productTasks.filter(
                                (task) => task.status === "completed",
                              ).length;
                              return (
                                <div
                                  key={product}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                                >
                                  <span className="font-medium">
                                    {product.toUpperCase().replace("-", "-")}
                                  </span>
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">
                                      {completedCount}/{productTasks.length}{" "}
                                      completed
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {productTasks.length} total tasks
                                    </span>
                                  </div>
                                </div>
                              );
                            },
                          )}
                        </div>

                        {filteredTasks.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <p>
                              No data to display. Please add tasks or adjust
                              your filters.
                            </p>
                          </div>
                        )}
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
