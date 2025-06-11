
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/SettingsPage";
import TenantManagement from "./pages/TenantManagement";
import UserManagement from "./pages/UserManagement";
import BotMonitoring from "./pages/BotMonitoring";
import LiveMonitoring from "./pages/LiveMonitoring";
import Finances from "./pages/Finances";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analytics" element={<Index />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/bot-monitoring" element={<BotMonitoring />} />
          <Route path="/live-monitoring" element={<LiveMonitoring />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/tenant-management" element={<TenantManagement />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
