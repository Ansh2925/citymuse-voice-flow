import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Providers } from "@/lib/providers";
import { RequireAuth } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import VoiceInteraction from "./pages/VoiceInteraction";
import CityDiscovery from "./pages/CityDiscovery";
import About from "./pages/About";
import OfflineMode from "./pages/OfflineMode";
import Settings from "./pages/Settings";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Providers>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/feedback" element={<Feedback />} />

                {/* Protected Routes */}
                <Route
                  path="/voice"
                  element={
                    <RequireAuth>
                      <VoiceInteraction />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/discover"
                  element={
                    <RequireAuth>
                      <CityDiscovery />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/offline"
                  element={
                    <RequireAuth>
                      <OfflineMode />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <RequireAuth>
                      <Settings />
                    </RequireAuth>
                  }
                />

                {/* Catch-all Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </Providers>
  );
}

export default App;
