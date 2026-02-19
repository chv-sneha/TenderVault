import { useState, useEffect } from "react";
import { ExternalLink, Copy, Wallet, FileText, Gavel, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserTenders, getUserBids } from "@/services/api";
import { Link } from "react-router-dom";

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
  const { currentUser, accountType } = useAuth();
  const [tab, setTab] = useState<"tenders" | "bids">("tenders");
  const [myTenders, setMyTenders] = useState<any[]>([]);
  const [myBids, setMyBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const [tendersData, bidsData] = await Promise.all([
        getUserTenders(currentUser!.uid),
        getUserBids(currentUser!.uid)
      ]);
      console.log('Tenders:', tendersData);
      console.log('Bids:', bidsData);
      setMyTenders(tendersData.tenders || []);
      setMyBids(bidsData.bids || []);
    } catch (error) {
      console.error('Profile load error:', error);
      toast({ title: "Error", description: "Failed to load profile data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

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
              <div className="text-sm text-muted-foreground mb-1">Logged in as</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="font-semibold text-primary truncate">{currentUser?.email}</div>
                <button onClick={() => copy(currentUser?.email || "")} className="p-1.5 rounded-lg hover:bg-secondary transition-all text-muted-foreground hover:text-foreground flex-shrink-0">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-xs text-muted-foreground mt-1 capitalize">{accountType} Account</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "Tenders Posted", value: myTenders.length.toString(), icon: FileText },
              { label: "Bids Submitted", value: myBids.length.toString(), icon: Gavel },
              { label: "Bids Won", value: myBids.filter(b => b.score && b.score >= 80).length.toString(), icon: TrendingUp },
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
        {tab === "tenders" && (
          <div className="space-y-4 mb-8">
            {myTenders.length === 0 ? (
              <div className="glass-card rounded-xl p-8 text-center text-muted-foreground">
                No tenders posted yet. <Link to="/create-tender" className="text-primary hover:underline">Create your first tender</Link>
              </div>
            ) : (
              myTenders.map((t) => (
                <Link key={t.tender_id} to={`/tenders/${t.tender_id}`} className="glass-card rounded-xl p-5 flex items-center gap-4 hover:bg-secondary/50 transition-all">
                  <div className="flex-1">
                    <div className="text-xs font-mono text-muted-foreground mb-1">{t.tender_id}</div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{t.bid_count || 0} bids received</div>
                  </div>
                  <StatusBadge status={t.status} />
                </Link>
              ))
            )}
          </div>
        )}

        {tab === "bids" && (
          <div className="space-y-4 mb-8">
            {myBids.length === 0 ? (
              <div className="glass-card rounded-xl p-8 text-center text-muted-foreground">
                No bids submitted yet. <Link to="/tenders" className="text-primary hover:underline">Browse available tenders</Link>
              </div>
            ) : (
              myBids.map((b) => (
                <Link key={b.bid_id} to={`/tenders/${b.tender_id}`} className="glass-card rounded-xl p-5 hover:bg-secondary/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-xs font-mono text-muted-foreground mb-1">{b.tender_id}</div>
                      <div className="font-semibold">{b.tender_title || "Tender"}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">Bid: {b.price} ALGO</div>
                      {b.score && <div className="text-sm text-primary mt-1">Score: {b.score}/100</div>}
                    </div>
                    <StatusBadge status={b.score ? (b.score >= 80 ? "WON" : "LOST") : "PENDING"} />
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
}
