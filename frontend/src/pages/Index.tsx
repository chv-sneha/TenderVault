import { Link } from "react-router-dom";
import { ArrowRight, Shield, Eye, Zap, ChevronRight, ExternalLink, Lock, Award, Clock, TrendingUp, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const steps = [
  {
    icon: Lock,
    title: "Tender Created",
    description: "Evaluation criteria encrypted and sealed on Algorand smart contract",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
  {
    icon: Shield,
    title: "Vendors Bid",
    description: "Bid hash stored on-chain. No vendor can see competitor bids",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: Clock,
    title: "Deadline Hits",
    description: "Smart contract auto-reveals encrypted criteria. Tamper-proof",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  {
    icon: Zap,
    title: "AI Evaluates",
    description: "Claude AI scores all bids instantly against revealed criteria",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  {
    icon: Award,
    title: "Winner Declared",
    description: "Results published on-chain. Publicly verifiable by anyone, forever",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
];

const whyAlgorand = [
  {
    icon: Shield,
    title: "Tamper-Proof",
    description: "Once written to Algorand blockchain, no data can ever be changed or deleted. Evaluation criteria are cryptographically sealed until deadline.",
    color: "text-cyan-400",
  },
  {
    icon: Eye,
    title: "Transparent",
    description: "Every transaction, every bid hash, every evaluation score is publicly visible on the Algorand testnet explorer — for anyone to audit.",
    color: "text-blue-400",
  },
  {
    icon: Zap,
    title: "Trustless",
    description: "No human can interfere with the process. Smart contracts execute automatically. No authority needed — the code is the law.",
    color: "text-primary",
  },
];

export default function Home() {
  const [stats, setStats] = useState([
    { label: "Total Tenders", value: 0, target: 1284, suffix: "" },
    { label: "Total Bids", value: 0, target: 9741, suffix: "" },
    { label: "Time Saved", value: 0, target: 67, suffix: "%" },
    { label: "Amount Saved", value: 0, target: 2.4, suffix: "M ALGO" },
  ]);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: Math.min(stat.target, (stat.target * step) / steps),
        }))
      );
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Hero Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-10 bg-background/75" />
        <div className="absolute inset-0 z-10 grid-bg opacity-20" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-10 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl z-10 animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in-up">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Built for RIFT 2026 Hackathon
              <ChevronRight className="w-4 h-4" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Making Procurement
              <br />
              <span className="shimmer-text">Corruption Technically</span>
              <br />
              Impossible
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              TenderVault uses Claude AI + Algorand smart contracts to seal evaluation criteria before bidding, 
              auto-reveal them at deadline, and declare winners transparently — eliminating bias and corruption from procurement forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link
                to="/create-tender"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-200 shadow-glow animate-pulse-glow"
              >
                Post a Tender
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/tenders"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm text-foreground font-semibold text-lg hover:bg-secondary hover:border-primary/40 transition-all duration-200"
              >
                Browse Tenders
                <Eye className="w-5 h-5" />
              </Link>
            </div>

            {/* Algorand badge */}
            <div className="mt-10 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="w-px h-8 bg-border" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Powered by Algorand Blockchain — All data publicly verifiable
                <a
                  href="https://testnet.algoexplorer.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  Testnet Explorer <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-muted-foreground text-xs animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary/50" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-border bg-card/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {stat.suffix.includes("M") ? stat.value.toFixed(1) : Math.floor(stat.value)}
                  <span className="text-xl">{stat.suffix}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              How <span className="gradient-text">TenderVault</span> Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A 5-step automated process powered by smart contracts — no human can interfere
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent -translate-x-1/2" />

            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className={`flex items-center gap-8 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* Content */}
                    <div className={`flex-1 ${isLeft ? "lg:text-right" : "lg:text-left"}`}>
                      <div className={`glass-card rounded-xl p-6 border-glow inline-block w-full ${step.border} hover:scale-[1.02] transition-transform duration-200`}>
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                          <div className={`w-10 h-10 rounded-lg ${step.bg} flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${step.color}`} />
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground font-mono">Step {i + 1}</div>
                            <h3 className="font-bold text-lg">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex w-12 h-12 rounded-full bg-card border-2 border-primary/40 items-center justify-center shadow-glow-sm flex-shrink-0 z-10">
                      <span className="text-primary font-bold text-sm">{i + 1}</span>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1 hidden lg:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Algorand */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why <span className="gradient-text">Algorand</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Algorand's unique properties make it the perfect foundation for trustless procurement
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyAlgorand.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="glass-card-elevated rounded-2xl p-8 hover:scale-[1.02] transition-all duration-200 group animated-border">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:shadow-glow-sm transition-all">
                    <Icon className={`w-7 h-7 ${card.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-primary font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified on Algorand Testnet
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Eliminate Corruption</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Post your first tender today and let blockchain + AI handle the rest. Completely transparent. Completely fair.
          </p>
          <Link
            to="/create-tender"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all shadow-glow animate-pulse-glow"
          >
            Get Started — Post a Tender
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
