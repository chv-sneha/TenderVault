import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wallet, User, Menu, X, LogOut, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Tenders", path: "/tenders" },
  { label: "Submit Bid", path: "/submit-bid" },
  { label: "Post a Tender", path: "/create-tender" },
  { label: "Results", path: "/results/demo" },
  { label: "Transparency Portal", path: "/transparency" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const { currentUser, accountType, logout } = useAuth();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const connectWallet = () => {
    setWalletConnected(true);
    setWalletAddress("ALGO7X3K...MNP2");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-elevated"
            : "bg-background/60 backdrop-blur-md border-b border-border/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary rounded-lg opacity-20 group-hover:opacity-40 transition-opacity animate-pulse-glow" />
                <Zap className="w-5 h-5 text-primary relative z-10" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">Tender</span>
                <span className="text-foreground">Vault</span>
              </span>
            </Link>

            {/* Center Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold text-primary uppercase">
                      {accountType === "government" ? "Organization" : "Vendor"}
                    </span>
                  </div>
                  <Link
                    to="/profile"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-glow-sm"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-card border-l border-border shadow-elevated transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-bold gradient-text">TenderVault</span>
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-border">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold text-primary uppercase">
                      {accountType === "government" ? "Organization" : "Vendor"}
                    </span>
                  </div>
                  <Link
                    to="/profile"
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all text-sm"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="mt-2 w-full flex items-center gap-2 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="mt-2 w-full flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-glow-sm"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
