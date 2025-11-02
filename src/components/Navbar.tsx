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
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/20 animate-fade-in-up">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link to="/" onClick={closeMobileMenu}>
                <Button
                  variant={isActive("/") ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>

              <Link to="/explore" onClick={closeMobileMenu}>
                <Button
                  variant={isActive("/explore") ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Explore
                </Button>
              </Link>

              {loggedIn ? (
                <>
                  <Link to="/host" onClick={closeMobileMenu}>
                    <Button
                      variant={isActive("/host") ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Host
                    </Button>
                  </Link>

                  <Link to="/dashboard" onClick={closeMobileMenu}>
                    <Button
                      variant={isActive("/dashboard") ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    onClick={() => {
                      closeMobileMenu();
                      handleLogout();
                    }}
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={closeMobileMenu}>
                  <Button className="w-full justify-start gap-2">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
