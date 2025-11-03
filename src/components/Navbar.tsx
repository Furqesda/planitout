import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, Home, PlusCircle, User, Menu, X } from "lucide-react";
import { isLoggedIn, logout } from "@/lib/authHelpers";

const Navbar = () => {
  const location = useLocation();
  const loggedIn = isLoggedIn();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold tracking-wide">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PlanItout
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className="gap-2 transition-all duration-300 hover:scale-105"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>

            <Link to="/explore">
              <Button
                variant={isActive("/explore") ? "default" : "ghost"}
                size="sm"
                className="gap-2 transition-all duration-300 hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                Explore
              </Button>
            </Link>

            {loggedIn ? (
              <>
                <Link to="/host">
                  <Button
                    variant={isActive("/host") ? "default" : "ghost"}
                    size="sm"
                    className="gap-2 transition-all duration-300 hover:scale-105"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Host
                  </Button>
                </Link>

                <Link to="/dashboard">
                  <Button
                    variant={isActive("/dashboard") ? "default" : "ghost"}
                    size="sm"
                    className="gap-2 transition-all duration-300 hover:scale-105"
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2 transition-all duration-300 hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button
                  size="sm"
                  className="gap-2 transition-all duration-300 hover:scale-105"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-dark transition-all duration-300 hover:scale-105"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu - Full Screen Cinematic Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 animate-fade-in">
            {/* Glassmorphism Backdrop */}
            <div 
              className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
              onClick={closeMobileMenu}
            />
            
            {/* Menu Content */}
            <div className="relative h-full flex flex-col">
              {/* Header with Logo and Close */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-2xl font-bold tracking-wide">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    PlanItout
                  </span>
                </span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-full glass-dark hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-90"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Links - Centered with Generous Spacing */}
              <div className="flex-1 flex flex-col justify-center px-8 space-y-4">
                <Link to="/" onClick={closeMobileMenu}>
                  <button
                    className={`w-full glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:scale-105 border border-white/20 ${
                      isActive("/")
                        ? "bg-gradient-to-r from-primary/20 to-accent/20 shadow-lg shadow-primary/20"
                        : "hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    <span className="text-lg font-medium">Home</span>
                  </button>
                </Link>

                <Link to="/explore" onClick={closeMobileMenu}>
                  <button
                    className={`w-full glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:scale-105 border border-white/20 ${
                      isActive("/explore")
                        ? "bg-gradient-to-r from-primary/20 to-accent/20 shadow-lg shadow-primary/20"
                        : "hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg font-medium">Explore</span>
                  </button>
                </Link>

                {loggedIn ? (
                  <>
                    <Link to="/host" onClick={closeMobileMenu}>
                      <button
                        className={`w-full glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:scale-105 border border-white/20 ${
                          isActive("/host")
                            ? "bg-gradient-to-r from-primary/20 to-accent/20 shadow-lg shadow-primary/20"
                            : "hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
                        }`}
                      >
                        <PlusCircle className="w-5 h-5" />
                        <span className="text-lg font-medium">Host</span>
                      </button>
                    </Link>

                    <Link to="/dashboard" onClick={closeMobileMenu}>
                      <button
                        className={`w-full glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:scale-105 border border-white/20 ${
                          isActive("/dashboard")
                            ? "bg-gradient-to-r from-primary/20 to-accent/20 shadow-lg shadow-primary/20"
                            : "hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
                        }`}
                      >
                        <User className="w-5 h-5" />
                        <span className="text-lg font-medium">Dashboard</span>
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        closeMobileMenu();
                        handleLogout();
                      }}
                      className="w-full glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:scale-105 border border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-lg font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link to="/auth" onClick={closeMobileMenu}>
                    <button className="w-full glass rounded-2xl p-5 flex items-center justify-center gap-4 transition-all duration-300 hover:scale-105 border border-white/20 bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 shadow-lg shadow-primary/20">
                      <span className="text-lg font-medium">Login</span>
                    </button>
                  </Link>
                )}
              </div>

              {/* Bottom Gradient Accent */}
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
