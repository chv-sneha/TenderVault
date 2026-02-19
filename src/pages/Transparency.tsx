import { useState } from "react";
import { Search, Eye, CheckCircle2, ExternalLink, ShieldCheck, Lock, Clock, Award, Zap } from "lucide-react";

const mockResults = [
  {
    id: "TND-A1B2C3",
    title: "Construction of Public Hospital Wing B",
    organization: "Ministry of Health",
    status: "AWARDED",
    winner: "BuildRight Ltd.",
    bids: 5,
    completedAt: "2026-02-01",
    auditTrail: [
      { step: "Tender Created", hash: "ALGO7X3K...A1B2", timestamp: "2026-01-15 09:00 UTC" },
      { step: "Bids Sealed", hash: "ALGOMNP2...C3D4", timestamp: "2026-01-15 09:30 UTC" },
      { step: "Deadline Hit", hash: "ALGOE5F6...G7H8", timestamp: "2026-02-01 17:00 UTC" },
      { step: "Criteria Revealed", hash: "ALGOI9J0...K1L2", timestamp: "2026-02-01 17:00 UTC" },
      { step: "AI Evaluated", hash: "ALGOM3N4...O5P6", timestamp: "2026-02-01 17:01 UTC" },
      { step: "Winner Declared", hash: "ALGOQ7R8...S9T0", timestamp: "2026-02-01 17:02 UTC" },
    ],
  },
  {
    id: "TND-G7H8I9",
    title: "Medical Equipment Procurement 2026",
    organization: "City Hospital",
    status: "CLOSED",
    winner: null,
    bids: 11,
    completedAt: "2026-01-28",
    auditTrail: [
      { step: "Tender Created", hash: "ALGOA1B2...C3D4", timestamp: "2026-01-10 10:00 UTC" },
      { step: "Bids Sealed", hash: "ALGOE5F6...G7H8", timestamp: "2026-01-10 11:00 UTC" },
      { step: "Deadline Hit", hash: "ALGOI9J0...K1L2", timestamp: "2026-01-28 18:00 UTC" },
      { step: "Criteria Revealed", hash: "ALGOM3N4...O5P6", timestamp: "2026-01-28 18:00 UTC" },
      { step: "AI Evaluated", hash: "ALGOQ7R8...S9T0", timestamp: "2026-01-28 18:01 UTC" },
      { step: "Winner Declared", hash: "ALGOU1V2...W3X4", timestamp: "2026-01-28 18:02 UTC" },
    ],
  },
  {
    id: "TND-J1K2L3",
    title: "Enterprise Software Licensing",
    organization: "Nexgen Corp",
    status: "AWARDED",
    winner: "TechCore Solutions",
    bids: 6,
    completedAt: "2026-01-20",
    auditTrail: [
      { step: "Tender Created", hash: "ALGOY5Z6...A7B8", timestamp: "2026-01-05 08:00 UTC" },
      { step: "Bids Sealed", hash: "ALGOC9D0...E1F2", timestamp: "2026-01-05 09:00 UTC" },
      { step: "Deadline Hit", hash: "ALGOG3H4...I5J6", timestamp: "2026-01-20 16:00 UTC" },
      { step: "Criteria Revealed", hash: "ALGOK7L8...M9N0", timestamp: "2026-01-20 16:00 UTC" },
      { step: "AI Evaluated", hash: "ALGOO1P2...Q3R4", timestamp: "2026-01-20 16:01 UTC" },
      { step: "Winner Declared", hash: "ALGOS5T6...U7V8", timestamp: "2026-01-20 16:02 UTC" },
    ],
  },
];

export default function Transparency() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(mockResults);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSearch = (val: string) => {
    setSearch(val);
    const q = val.toLowerCase();
    setResults(
      q
        ? mockResults.filter((r) => r.id.toLowerCase().includes(q) || r.organization.toLowerCase().includes(q) || r.title.toLowerCase().includes(q))
        : mockResults
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            No Login Required
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Verify Any Tender Publicly
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No login required. All data verifiable on Algorand Testnet.
          </p>
        </div>

        {/* Verification Banner */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-primary/10 border border-primary/20 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-semibold">All data is publicly verifiable on Algorand Testnet — no account needed</div>
            <a
              href="https://testnet.algoexplorer.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1 mt-0.5"
            >
              Open Algorand Testnet Explorer <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            className="form-input pl-12 text-lg py-5"
            placeholder="Search by Tender ID or Organization name..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.map((r) => (
            <div key={r.id} className="glass-card rounded-2xl p-6 hover:border-primary/30 border border-border transition-all duration-200">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-muted-foreground">{r.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          r.status === "AWARDED" ? "badge-awarded" : "badge-closed"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{r.title}</h3>
                    <div className="text-sm text-muted-foreground">{r.organization}</div>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        {r.bids} bids evaluated
                      </div>
                      {r.winner && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <span className="text-gold-400">🏆</span>
                          Winner: <span className="text-foreground font-medium">{r.winner}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <span>Completed: {r.completedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:min-w-[160px]">
                    <a
                      href={`https://testnet.algoexplorer.io/application/847392018`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition-all"
                    >
                      Verify On-Chain <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                      <Lock className="w-3 h-3 text-primary" />
                      Immutable record
                    </div>
                  </div>
                </div>

                {/* Audit Trail */}
                <button
                  onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors text-left font-medium"
                >
                  {expandedId === r.id ? "▼ Hide" : "▶"} Complete Audit Trail
                </button>

                {expandedId === r.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="space-y-4">
                      {r.auditTrail.map((step, i) => {
                        const icons = [Lock, CheckCircle2, Clock, Eye, Zap, Award];
                        const Icon = icons[i] || CheckCircle2;
                        return (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <div>
                                  <div className="font-semibold text-sm">{step.step}</div>
                                  <div className="text-xs text-muted-foreground">{step.timestamp}</div>
                                </div>
                                <a
                                  href={`https://testnet.algoexplorer.io/tx/${step.hash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
                                >
                                  {step.hash} <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
            <div className="text-muted-foreground">No tenders found for "{search}"</div>
          </div>
        )}

        {/* How verification works */}
        <div className="mt-12 glass-card rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">How Verification Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Every action is on-chain",
                desc: "Tender creation, bid submissions, criteria reveal, and winner declaration — all recorded as Algorand transactions",
              },
              {
                step: "2",
                title: "Cryptographically sealed",
                desc: "Criteria are encrypted with AES-256 before sealing. No one — not even ClearBid — can read them before deadline",
              },
              {
                step: "3",
                title: "Open to all",
                desc: "Anyone can verify any transaction on the Algorand Testnet Explorer, no account required",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
