import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Restaurants from "./pages/Restaurants";
import BecomePartner from "./pages/BecomePartner";
import BecomeDriver from "./pages/BecomeDriver";
import ClientDashboard from "./pages/ClientDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Experience from "./pages/Experience";
import RestaurantCreation from "./pages/RestaurantCreation";
import Drivers from "./pages/Drivers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/become-partner" element={<BecomePartner />} />
          <Route path="/become-driver" element={<BecomeDriver />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/restaurant/create" element={<RestaurantCreation />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['client', 'restaurant', 'driver', 'admin']}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/client"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/restaurant" 
            element={
              <ProtectedRoute allowedRoles={['restaurant']}>
                <RestaurantDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/driver" 
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DriverDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
