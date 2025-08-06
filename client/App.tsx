import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import DailyTracker from "./pages/DailyTracker";
import ShiftHandover from "./pages/ShiftHandover";
import AllUsersData from "./pages/AllUsersData";
import Others from "./pages/Others";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredPage="dashboard">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/daily-tracker"
              element={
                <ProtectedRoute requiredPage="daily-tracker">
                  <DailyTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shift-handover"
              element={
                <ProtectedRoute requiredPage="shift-handover">
                  <ShiftHandover />
                </ProtectedRoute>
              }
            />
            <Route
              path="/all-users-data"
              element={
                <ProtectedRoute requiredPage="all-users-data">
                  <AllUsersData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/others"
              element={
                <ProtectedRoute requiredPage="others">
                  <Others />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

// Properly manage React root to avoid warnings during HMR
const container = document.getElementById("root")!;
let root = (container as any)._reactRoot;

if (!root) {
  root = createRoot(container);
  (container as any)._reactRoot = root;
}

root.render(<App />);
