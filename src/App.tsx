import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import CreateTender from "./pages/CreateTender";
import BrowseTenders from "./pages/BrowseTenders";
import TenderDetails from "./pages/TenderDetails";
import Results from "./pages/Results";
import Transparency from "./pages/Transparency";
import SubmitBid from "./pages/SubmitBid";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/create-tender" element={<CreateTender />} />
              <Route path="/tenders" element={<BrowseTenders />} />
              <Route path="/tenders/:id" element={<TenderDetails />} />
              <Route path="/results/:id" element={<Results />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/submit-bid" element={<SubmitBid />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
