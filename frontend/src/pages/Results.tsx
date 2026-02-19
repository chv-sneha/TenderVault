import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Trophy, ExternalLink, BarChart3, ChevronDown, CheckCircle2, X, Star, ArrowLeft } from "lucide-react";

const criteria = [
  { name: "Price", weight: 40, winnerScore: 92, scores: [92, 78, 85, 71, 60] },
  { name: "Experience", weight: 30, winnerScore: 88, scores: [88, 91, 74, 82, 76] },
  { name: "Timeline", weight: 20, winnerScore: 95, scores: [95, 80, 88, 70, 65] },
  { name: "Quality", weight: 10, winnerScore: 87, scores: [87, 94, 82, 79, 71] },
];

const bids = [
  { rank: 1, company: "BuildRight Ltd.", scores: [92, 88, 95, 87], total: 91.1, status: "WINNER" },
  { rank: 2, company: "Apex Constructions", scores: [78, 91, 80, 94], total: 83.6, status: "REJECTED" },
  { rank: 3, company: "Metro Builders Inc.", scores: [85, 74, 88, 82], total: 82.6, status: "REJECTED" },
  { rank: 4, company: "Golden Gate Corp", scores: [71, 82, 70, 79], total: 74.3, status: "REJECTED" },
  { rank: 5, company: "Swift Infrastructure", scores: [60, 76, 65, 71], total: 67.1, status: "REJECTED" },
];

const auditTrail = [
  { step: "Tender Created", hash: "ALGO7X3K...A1B2", timestamp: "2026-01-15 09:00 UTC" },
  { step: "Bids Sealed", hash: "ALGOMNP2...C3D4", timestamp: "2026-01-15 09:30 UTC" },
  { step: "Deadline Hit", hash: "ALGOE5F6...G7H8", timestamp: "2026-02-01 17:00 UTC" },
  { step: "Criteria Revealed", hash: "ALGOI9J0...K1L2", timestamp: "2026-02-01 17:00 UTC" },
  { step: "AI Evaluated", hash: "ALGOM3N4...O5P6", timestamp: "2026-02-01 17:01 UTC" },
  { step: "Winner Declared", hash: "ALGOQ7R8...S9T0", timestamp: "2026-02-01 17:02 UTC" },
];

function FeedbackModal({ company, onClose }: { company: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass-card-elevated rounded-2xl p-8 max-w-lg w-full border-glow animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">AI Feedback — {company}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <h4 className="font-semibold mb-2 text-sm">Why you didn't win</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• Price was 18% higher than the winning bid</li>
              <li>• Delivery timeline exceeded requirements by 4 weeks</li>
              <li>• Experience documentation was insufficient for scale</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <h4 className="font-semibold mb-2 text-sm text-primary">How to improve next time</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• Review your pricing model to be more competitive</li>
              <li>• Provide more detailed project timeline breakdowns</li>
              <li>• Include more certified qualifications and past project references</li>
              <li>• Consider specialized subcontracting to reduce timeline</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Results() {
  const [feedbackCompany, setFeedbackCompany] = useState<string | null>(null);
  const [showCollusionAlert] = useState(Math.random() > 0.5);

  const winner = bids[0];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/tenders" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Tenders
        </Link>

        {/* Header */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">Construction of Public Hospital Wing B</h1>
            <div className="text-muted-foreground mt-1">Ministry of Health • TND-A1B2C3</div>
          </div>
          <span className="badge-awarded px-3 py-1.5 rounded-full text-sm font-semibold ml-auto">AWARDED</span>
        </div>

        {/* Collusion Alert */}
        {showCollusionAlert && (
          <div className="flex items-start gap-3 p-5 rounded-2xl bg-orange-500/10 border border-orange-500/30 mb-6">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="font-bold text-orange-400 mb-1">Collusion Alert</h3>
              <p className="text-sm text-orange-300">
                2 bids flagged for suspicious price similarity within 3% of each other. Flagged and recorded on Algorand.
              </p>
            </div>
          </div>
        )}

        {/* Criteria Revealed */}
        <div className="glass-card rounded-2xl p-8 mb-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Criteria Revealed
          </h2>
          <div className="space-y-4">
            {criteria.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-primary font-mono font-bold">{c.weight}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                    style={{ width: `${c.weight}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Summary */}
        <div className="glass-card rounded-2xl p-6 mb-6 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold">AI Evaluation Summary</h3>
              <p className="text-muted-foreground text-sm">
                Evaluated <span className="text-primary font-semibold">5 bids</span> in <span className="text-primary font-semibold">1.2 seconds</span> using Claude AI — objective, unbiased scoring
              </p>
            </div>
          </div>
        </div>

        {/* Winner Card */}
        <div className="glass-card-elevated rounded-2xl p-8 mb-6 border border-gold-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-gold-400" />
            </div>
            <div>
              <div className="text-xs text-gold-400 font-semibold uppercase tracking-wider">Winner</div>
              <h2 className="text-2xl font-bold">{winner.company}</h2>
            </div>
            <div className="ml-auto text-right">
              <div className="text-4xl font-bold gradient-text">{winner.total}</div>
              <div className="text-sm text-muted-foreground">/ 100</div>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="space-y-3">
            {criteria.map((c, i) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-muted-foreground">{c.name} ({c.weight}%)</span>
                  <span className="text-sm font-bold text-primary">{winner.scores[i]}/100</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${winner.scores[i]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://testnet.algoexplorer.io/tx/WINNER"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gold-500/30 text-gold-400 text-sm font-semibold hover:bg-gold-500/10 transition-all"
          >
            View on Algorand Explorer <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* All Bids Table */}
        <div className="glass-card rounded-2xl p-6 mb-6 overflow-x-auto">
          <h2 className="text-xl font-bold mb-6">All Bids Ranked</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-3 text-muted-foreground font-medium">Rank</th>
                <th className="text-left pb-3 text-muted-foreground font-medium">Company</th>
                {criteria.map((c) => (
                  <th key={c.name} className="text-center pb-3 text-muted-foreground font-medium hidden sm:table-cell">{c.name}</th>
                ))}
                <th className="text-center pb-3 text-muted-foreground font-medium">Total</th>
                <th className="text-left pb-3 text-muted-foreground font-medium">Status</th>
                <th className="text-center pb-3 text-muted-foreground font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => (
                <tr
                  key={bid.rank}
                  className={`border-b border-border/50 transition-colors ${bid.status === "WINNER" ? "bg-primary/5" : "hover:bg-muted/30"}`}
                >
                  <td className="py-4 font-bold">
                    {bid.rank === 1 ? (
                      <span className="flex items-center gap-1 text-gold-400">
                        <Trophy className="w-4 h-4" /> 1
                      </span>
                    ) : (
                      <span className="text-muted-foreground">#{bid.rank}</span>
                    )}
                  </td>
                  <td className="py-4 font-medium">
                    {bid.company}
                    {bid.status === "WINNER" && <Star className="w-3 h-3 text-gold-400 inline ml-1" />}
                  </td>
                  {bid.scores.map((s, i) => (
                    <td key={i} className="py-4 text-center font-mono hidden sm:table-cell">{s}</td>
                  ))}
                  <td className="py-4 text-center font-bold font-mono">
                    <span className={bid.status === "WINNER" ? "text-primary" : "text-muted-foreground"}>{bid.total}</span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bid.status === "WINNER" ? "badge-open" : "badge-closed"}`}>
                      {bid.status}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    {bid.status !== "WINNER" && (
                      <button
                        onClick={() => setFeedbackCompany(bid.company)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-all"
                      >
                        AI Feedback
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Audit Trail */}
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">Audit Trail</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 to-transparent" />
            <div className="space-y-6">
              {auditTrail.map((step, i) => (
                <div key={i} className="pl-12 relative">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <div className="font-semibold">{step.step}</div>
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
              ))}
            </div>
          </div>
        </div>
      </div>

      {feedbackCompany && (
        <FeedbackModal company={feedbackCompany} onClose={() => setFeedbackCompany(null)} />
      )}
    </div>
  );
}
