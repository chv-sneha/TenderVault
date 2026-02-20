import { Shield, Code2, Zap, Lock, Eye, Globe, Award, Users, ExternalLink } from "lucide-react";

const algorandPoints = [
  {
    icon: Lock,
    title: "Commit-Reveal Smart Contracts",
    description: "Criteria are hashed and committed to the contract at creation. The actual values are only revealed after deadline — enforced by code.",
  },
  {
    icon: Shield,
    title: "Tamper-Proof Storage",
    description: "Once data is recorded on Algorand's blockchain, it's cryptographically immutable. No one — including us — can alter it.",
  },
  {
    icon: Zap,
    title: "Sub-5 Second Finality",
    description: "Algorand achieves transaction finality in under 5 seconds with no forks — critical for deadline-sensitive procurement.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "Every transaction, hash, and contract call is publicly visible on the Algorand Testnet Explorer with no login required.",
  },
  {
    icon: Globe,
    title: "Decentralized Execution",
    description: "Smart contracts execute autonomously. No trusted party is needed to trigger criteria reveal or winner declaration.",
  },
  {
    icon: Award,
    title: "On-Chain Proof of Award",
    description: "The winning bid and full scoring breakdown are permanently recorded, providing an immutable audit trail for any dispute.",
  },
];

const techStack = [
  { name: "AlgoKit", desc: "Smart contract development framework", color: "text-cyan-400" },
  { name: "PyTEAL", desc: "Smart contract language for Algorand", color: "text-blue-400" },
  { name: "React + Vite", desc: "Frontend framework with TypeScript", color: "text-cyan-400" },
  { name: "Claude AI", desc: "AI-powered bid evaluation engine", color: "text-primary" },
  { name: "Algorand SDK", desc: "Blockchain interaction library", color: "text-blue-400" },
  { name: "Tailwind CSS", desc: "Utility-first styling framework", color: "text-purple-400" },
];

const team = [
  { name: "M Kishore", role: "Blockchain and Backend", avatar: "MK" },
  { name: "CH V Sneha", role: "Frontend and AI", avatar: "CS" }
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Award className="w-3.5 h-3.5" />
            RIFT 2026 Hackathon Project
          </div>
          <h1 className="text-5xl font-bold mb-6">
            About <span className="gradient-text">TenderVault</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            TenderVault is an AI-powered transparent procurement platform that makes corruption technically impossible. 
            By combining Algorand blockchain's immutability with Claude AI's evaluation capabilities, we eliminate 
            the possibility of biased, manipulated, or fraudulent procurement decisions.
          </p>
        </div>

        {/* App ID Banner */}
        <div className="glass-card-elevated rounded-2xl p-8 mb-16 border-glow">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Deployed App ID</div>
              <div className="text-3xl font-bold font-mono text-primary mb-6">755804596</div>
            </div>
            <a
              href="https://testnet.algoexplorer.io/application/755804596"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition-all"
            >
              View on Algorand Testnet <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Problem + Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="glass-card rounded-2xl p-8">
            <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="text-xl font-bold mb-3">The Problem</h3>
            <p className="text-muted-foreground leading-relaxed">
              Public procurement is plagued by corruption. Evaluation criteria are secretly adjusted after bids are received. 
              Favored vendors win regardless of merit. Billions of taxpayer dollars are wasted annually due to rigged procurement.
            </p>
          </div>
          <div className="glass-card-elevated rounded-2xl p-8 border-glow">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Our Solution</h3>
            <p className="text-muted-foreground leading-relaxed">
              Seal evaluation criteria on Algorand before bidding opens. Criteria are cryptographically encrypted — 
              invisible to everyone until deadline. Then AI evaluates all bids objectively. 
              The math does the selecting, not humans.
            </p>
          </div>
        </div>

        {/* How Algorand is Used */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-3">How We Use Algorand</h2>
          <p className="text-muted-foreground text-center mb-10">6 ways Algorand makes TenderVault possible</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {algorandPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <div key={i} className="glass-card rounded-xl p-6 hover:border-primary/30 border border-border transition-all duration-200 hover:scale-[1.02] group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">{point.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="glass-card rounded-xl p-5 text-center">
                <Code2 className={`w-6 h-6 mx-auto mb-3 ${tech.color}`} />
                <div className="font-bold mb-1">{tech.name}</div>
                <div className="text-xs text-muted-foreground">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathon Banner */}
        <div className="glass-card-elevated rounded-2xl p-8 mb-16 border-glow text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-30" />
          <div className="relative z-10">
            <Award className="w-12 h-12 text-gold-400 mx-auto mb-4 animate-float" />
            <h2 className="text-2xl font-bold mb-3">Built for RIFT 2026 Hackathon</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              TenderVault was conceptualized and built during the RIFT 2026 Hackathon — 
              a competition to build the most impactful blockchain solutions for real-world governance problems.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              RIFT 2026 — Blockchain for Good
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">The Team</h2>
          <div className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="glass-card rounded-2xl p-8 text-center hover:scale-[1.05] transition-all duration-200 min-w-[200px]">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl mx-auto mb-4 animate-pulse-glow">
                  {member.avatar}
                </div>
                <div className="font-bold text-lg mb-2">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Algorand link */}
        <div className="mt-12 text-center">
          <a
            href="https://lora.algokit.io/testnet/application/755804596"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/10 transition-all"
          >
            Verify on Algorand Testnet <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
