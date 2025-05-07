import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Routes as AppRoutes } from './Routes';
import { SidebarProvider } from "@/components/ui/sidebar";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import History from './pages/History';
import Explorer from "./pages/Explorer";
import Learning from "./pages/Learning";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ui/theme-provider";
import ChatLayout from "@/components/layouts/ChatLayout";
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import AuthCard from './pages/auth/AuthCard';
import { Toaster as HotToaster } from 'react-hot-toast';
import { SearchProvider } from './context/SearchContext';
import { 
  SearchHistoryItem, 
  addToHistory, 
  getHistory, 
  removeHistoryItem, 
  formatTimestamp,
  clearHistory 
} from './utils/historyUtils';

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <SidebarProvider>
              <Toaster />
              <Sonner />
              <HotToaster position="top-right" />
              <SearchProvider>
                <Router>
                  <Routes>
                    {/* Landing page as default route */}
                    <Route path="/" element={<Landing />} />
                    
                    
                    {/* App routes wrapped in ChatLayout */}
                    <Route
                      path="/app/*"
                      element={
                        <ProtectedRoute>
                          <ChatLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Index />} />
                      <Route path="history" element={<History />} />
                      <Route path="explore" element={<Explorer />} />
                      <Route path="learning" element={<Learning />} />
                      <Route path="account" element={<Account />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>

                    {/* Auth routes */}
                    <Route path="/auth" element={<AuthCard />} />
                    <Route path="/history" element={<History />} />

                    {/* Catch all unknown routes and redirect to landing */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Router>
              </SearchProvider>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
