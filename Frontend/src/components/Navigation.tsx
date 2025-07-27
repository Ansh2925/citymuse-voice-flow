import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Mic, Menu, MapPin, Info, Settings, MessageSquare, WifiOff, LogOut, LogIn } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store";
import { toast } from "sonner";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const navItems = [
    { path: "/", label: "Home", icon: Mic },
    { path: "/voice", label: "Voice Chat", icon: Mic, protected: true },
    { path: "/discover", label: "Discover", icon: MapPin, protected: true },
    { path: "/about", label: "About", icon: Info },
    { path: "/settings", label: "Settings", icon: Settings, protected: true },
    { path: "/feedback", label: "Feedback", icon: MessageSquare },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const closeSheet = () => setIsOpen(false);

  return (
    <nav className="p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm border-b border-border/50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
          <Mic className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg">CityMuse</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          if (item.protected && !isAuthenticated) return null;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-smooth hover:bg-muted ${
                location.pathname === item.path ? "bg-muted text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="sm">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">CityMuse</span>
          </div>
          
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              if (item.protected && !isAuthenticated) return null;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSheet}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-smooth hover:bg-muted w-full ${
                    location.pathname === item.path ? "bg-muted text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            {/* Auth Buttons */}
            <div className="mt-4 space-y-2">
              {!isAuthenticated ? (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/signup" onClick={closeSheet}>
                      Sign Up
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/login" onClick={closeSheet}>
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Button asChild variant="outline">
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;