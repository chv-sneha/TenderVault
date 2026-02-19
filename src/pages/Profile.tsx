import { useState } from "react";
import { ExternalLink, Copy, Wallet, FileText, Gavel, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const myTenders = [
  { id: "TND-A1B2C3", title: "Hospital Wing B Construction", status: "AWARDED", bids: 5 },
  { id: "TND-D4E5F6", title: "Campus Network Upgrade", status: "OPEN", bids: 14 },
];

const myBids = [
  { id: "TND-J1K2L3", title: "Enterprise Software Licensing", status: "WON", company: "Nexgen Corp" },
  { id: "TND-G7H8I9", title: "Medical Equipment Procurement", status: "LOST", company: "City Hospital" },
  { id: "TND-M4N5O6", title: "Road Infrastructure Phase 3", status: "PENDING", company: "Transport Authority" },
];

const stakes = [
  { tenderId: "TND-J1K2L3", amount: "0.1", status: "RETURNED", txId: "ABC123...XYZ" },
  { tenderId: "TND-G7H8I9", amount: "0.1", status: "RETURNED", txId: "DEF456...UVW" },
  { tenderId: "TND-M4N5O6", amount: "0.1", status: "LOCKED", txId: "GHI789...RST" },
];

const txHistory = [
  { type: "Bid Submitted", tenderId: "TND-M4N5O6", txId: "GHI789...RST", date: "2026-02-10" },
  { type: "Stake Returned", tenderId: "TND-G7H8I9", txId: "DEF456...UVW", date: "2026-01-30" },
  { type: "Bid Submitted", tenderId: "TND-G7H8I9", txId: "JKL012...MNO", date: "2026-01-15" },
  { type: "Tender Created", tenderId: "TND-D4E5F6", txId: "PQR345...STU", date: "2026-01-10" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    OPEN: "badge-open",
    AWARDED: "badge-awarded",
    CLOSED: "badge-closed",
    WON: "badge-open",
    LOST: "badge-closed",
    PENDING: "text-yellow-400 border border-yellow-400/40 bg-yellow-400/10",
    RETURNED: "badge-open",
    LOCKED: "text-orange-400 border border-orange-400/40 bg-orange-400/10",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] || ""}`}>{status}</span>;
}

export default function Profile() {
  const [tab, setTab] = useState<"tenders" | "bids">("tenders");
  const walletAddress = "ALGO7X3KMNP2ALGO7X3KMNP2ALGO7X3K";

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!" });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="glass-card-elevated rounded-2xl p-8 mb-8 border-glow">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center animate-pulse-glow">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-muted-foreground mb-1">Connected Wallet</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="font-mono text-primary font-semibold truncate">{walletAddress}</div>
                <button onClick={() => copy(walletAddress)} className="p-1.5 rounded-lg hover:bg-secondary transition-all text-muted-foreground hover:text-foreground flex-shrink-0">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Algorand Testnet</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "Tenders Posted", value: "2", icon: FileText },
              { label: "Bids Submitted", value: "3", icon: Gavel },
              { label: "Bids Won", value: "1", icon: TrendingUp },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-muted/50">
                  <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                  <div className="text-xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-muted/50 mb-6 w-fit">
          {["tenders", "bids"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as "tenders" | "bids")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                tab === t ? "bg-primary text-primary-foreground shadow-glow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              My {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === "tenders" && (
          <div className="space-y-4 mb-8">
            {myTenders.map((t) => (
              <div key={t.id} className="glass-card rounded-xl p-5 flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-xs font-mono text-muted-foreground mb-1">{t.id}</div>
                  <div className="font-semibold">{t.title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{t.bids} bids received</div>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        )}

        {tab === "bids" && (
          <div className="space-y-4 mb-8">
            {myBids.map((b) => (
              <div key={b.id} className="glass-card rounded-xl p-5 flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-xs font-mono text-muted-foreground mb-1">{b.id}</div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{b.company}</div>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        )}

        {/* Stake History */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Stake History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-3 text-muted-foreground font-medium">Tender ID</th>
                  <th className="text-left pb-3 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left pb-3 text-muted-foreground font-medium">Status</th>
                  <th className="text-left pb-3 text-muted-foreground font-medium">Tx ID</th>
                </tr>
              </thead>
              <tbody>
                {stakes.map((s) => (
                  <tr key={s.tenderId} className="border-b border-border/50">
                    <td className="py-3 font-mono text-xs text-muted-foreground">{s.tenderId}</td>
                    <td className="py-3 font-semibold text-primary font-mono">{s.amount} ALGO</td>
                    <td className="py-3"><StatusBadge status={s.status} /></td>
                    <td className="py-3">
                      <a
                        href={`https://testnet.algoexplorer.io/tx/${s.txId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        {s.txId} <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction History */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-3 text-muted-foreground font-medium">Type</th>
                  <th className="text-left pb-3 text-muted-foreground font-medium">Tender</th>
                  <th className="text-left pb-3 text-muted-foreground font-medium">Date</th>
                  <th className="text-left pb-3 text-muted-foreground font-medium">Tx ID</th>
                </tr>
              </thead>
              <tbody>
                {txHistory.map((tx, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 font-medium">{tx.type}</td>
                    <td className="py-3 font-mono text-xs text-muted-foreground">{tx.tenderId}</td>
                    <td className="py-3 text-muted-foreground">{tx.date}</td>
                    <td className="py-3">
                      <a
                        href={`https://testnet.algoexplorer.io/tx/${tx.txId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        {tx.txId} <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
