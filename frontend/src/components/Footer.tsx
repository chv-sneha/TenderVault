import { Link } from "react-router-dom";
import { Zap, ExternalLink, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-primary/20 rounded-lg">
                <Zap className="w-5 h-5 text-primary" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">Tender</span>
                <span className="text-foreground">Vault</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              AI-powered transparent procurement system built on Algorand blockchain. 
              Making corruption technically impossible.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground font-mono">
                Connected to Algorand Testnet
              </span>
            </div>
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/yourusername/TenderVault"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-primary/20 transition-colors group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://twitter.com/tendervault"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-primary/20 transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com/company/tendervault"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-primary/20 transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="mailto:contact@tendervault.com"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-primary/20 transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Platform</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Browse Tenders", path: "/tenders" },
                { label: "Post a Tender", path: "/create-tender" },
                { label: "Results", path: "/results/demo" },
                { label: "Transparency Portal", path: "/transparency" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Algorand */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Built on Algorand</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://testnet.algoexplorer.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Testnet Explorer <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://algokit.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                AlgoKit Docs <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold gradient-text">TenderVault</span>
            <span>|</span>
            <span>Built on Algorand</span>
            <span>|</span>
            <span className="text-primary font-semibold">RIFT 2026</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            All transactions verifiable on Algorand Testnet
          </div>
        </div>
      </div>
    </footer>
  );
}
