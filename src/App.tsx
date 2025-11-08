import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import MandiPrice from "./pages/MandiPrice";
import CropRegistration from "./pages/CropRegistration";
import ListedCrop from "./pages/ListedCrop";
import QualityVerification from "./pages/QualityVerification";
import SoldCrop from "./pages/SoldCrop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mandi-price" element={<MandiPrice />} />
            <Route path="/crop-registration" element={<CropRegistration />} />
            <Route path="/listed-crop" element={<ListedCrop />} />
            <Route path="/quality-verification" element={<QualityVerification />} />
            <Route path="/sold-crop" element={<SoldCrop />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
