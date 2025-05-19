
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BackendProvider } from "./contexts/BackendContext";
import ErrorBoundary from "./components/ErrorBoundary";
import SkeletonLoader from "./components/ui/skeleton-loader";

// Lazy load pages para melhorar performance
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Fallback para carregamento
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-pantog-black p-4">
    <div className="w-full max-w-md flex flex-col items-center">
      <SkeletonLoader type="card" className="w-full h-[300px] mb-4" />
      <SkeletonLoader type="text" className="w-3/4 mb-2" />
      <SkeletonLoader type="text" className="w-1/2" />
    </div>
  </div>
);

// Criando queryClient com configurações otimizadas
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BackendProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/settings" element={<Settings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </TooltipProvider>
        </BrowserRouter>
      </BackendProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
