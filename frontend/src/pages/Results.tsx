import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Trophy, ExternalLink, BarChart3, ChevronDown, CheckCircle2, X, Star, ArrowLeft, Loader2 } from "lucide-react";
import { getTender, getResults } from "@/services/api";

export default function Results() {
  const { id } = useParams();
  const [feedbackCompany, setFeedbackCompany] = useState<string | null>(null);
  const [tender, setTender] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [tenderData, resultsData] = await Promise.all([
        getTender(id),
        getResults(id)
      ]);
      setTender(tenderData);
      setResults(resultsData);
    } catch (error) {
      console.error("Failed to load results:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!tender || !results) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
          <p className="text-muted-foreground mb-6">This tender hasn't been evaluated yet.</p>
          <Link to="/tenders" className="text-primary hover:underline">Back to Tenders</Link>
        </div>
      </div>
    );
  }

  const criteria = Object.entries(tender.criteria || {}).map(([name, weight]) => ({
    name,
    weight: weight as number
  }));

  const bids = results.ranked_bids || [];
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
            <h1 className="text-3xl font-bold">{tender.title}</h1>
            <div className="text-muted-foreground mt-1">{tender.organization || "Unknown"} • {tender.tender_id}</div>
          </div>
          <span className="badge-awarded px-3 py-1.5 rounded-full text-sm font-semibold ml-auto">{tender.status}</span>
        </div>

        {/* Collusion Alert - Hidden for now */}
        {false && (
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
                Evaluated <span className="text-primary font-semibold">{bids.length} bids</span> using Gemini AI — objective, unbiased scoring
              </p>
            </div>
          </div>
        </div>

        {/* Winner Card */}
        {winner && (
        <div className="glass-card-elevated rounded-2xl p-8 mb-6 border border-gold-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-gold-400" />
            </div>
            <div>
              <div className="text-xs text-gold-400 font-semibold uppercase tracking-wider">Winner</div>
              <h2 className="text-2xl font-bold">{winner.vendor_name}</h2>
            </div>
            <div className="ml-auto text-right">
              <div className="text-4xl font-bold gradient-text">{winner.score || 0}</div>
              <div className="text-sm text-muted-foreground">/ 100</div>
            </div>
          </div>

          {/* Score breakdown */}
          {winner.reasoning && (
            <div className="p-4 rounded-xl bg-muted/50 mb-4">
              <p className="text-sm text-muted-foreground">{winner.reasoning}</p>
            </div>
          )}

          <a
            href={`https://lora.algokit.io/testnet/transaction/${winner.bid_hash || 'WINNER'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gold-500/30 text-gold-400 text-sm font-semibold hover:bg-gold-500/10 transition-all"
          >
            View Bid on Algorand <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        )}

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
              {bids.map((bid, index) => (
                <tr
                  key={bid.bid_id}
                  className={`border-b border-border/50 transition-colors ${index === 0 ? "bg-primary/5" : "hover:bg-muted/30"}`}
                >
                  <td className="py-4 font-bold">
                    {index === 0 ? (
                      <span className="flex items-center gap-1 text-gold-400">
                        <Trophy className="w-4 h-4" /> 1
                      </span>
                    ) : (
                      <span className="text-muted-foreground">#{index + 1}</span>
                    )}
                  </td>
                  <td className="py-4 font-medium">
                    {bid.vendor_name}
                    {index === 0 && <Star className="w-3 h-3 text-gold-400 inline ml-1" />}
                  </td>
                  {criteria.map((c, i) => (
                    <td key={i} className="py-4 text-center font-mono hidden sm:table-cell">-</td>
                  ))}
                  <td className="py-4 text-center font-bold font-mono">
                    <span className={index === 0 ? "text-primary" : "text-muted-foreground"}>{bid.score || 0}</span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${index === 0 ? "badge-open" : "badge-closed"}`}>
                      {index === 0 ? "WINNER" : "REJECTED"}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    {index !== 0 && bid.reasoning && (
                      <button
                        onClick={() => setFeedbackCompany(bid.vendor_name)}
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
          <h2 className="text-xl font-bold mb-6">Blockchain Audit Trail</h2>
          <div className="space-y-4">
            {[
              { event: "Tender Created", timestamp: tender.created_at, tx: tender.criteria_hash },
              { event: "Bids Sealed", timestamp: results.ranked_bids[0]?.submitted_at, tx: results.ranked_bids[0]?.bid_hash },
              { event: "Deadline Hit", timestamp: tender.deadline, tx: null },
              { event: "Criteria Revealed", timestamp: tender.deadline, tx: tender.criteria_hash },
              { event: "AI Evaluated", timestamp: new Date().toISOString(), tx: null },
              { event: "Winner Declared", timestamp: new Date().toISOString(), tx: winner?.bid_hash }
            ].filter(step => step.timestamp).map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{step.event}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {new Date(step.timestamp).toLocaleString()}
                  </div>
                  {step.tx && (
                    <a
                      href={`https://lora.algokit.io/testnet/transaction/${step.tx}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2 font-mono"
                    >
                      {step.tx.substring(0, 16)}... <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {feedbackCompany && (
        <FeedbackModal company={feedbackCompany} bid={bids.find((b: any) => b.vendor_name === feedbackCompany)} onClose={() => setFeedbackCompany(null)} />
      )}
    </div>
  );
}

function FeedbackModal({ company, bid, onClose }: { company: string; bid: any; onClose: () => void }) {
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
            <h4 className="font-semibold mb-2 text-sm">AI Evaluation Feedback</h4>
            <p className="text-sm text-muted-foreground">
              {bid?.reasoning || "No feedback available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
