import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, FileText, Clock, Users, ChevronRight, ArrowRight, Shield } from "lucide-react";

const openTenders = [
  { id: "TND-2847", org: "Ministry of Education", title: "Digital Learning Platform Development", budget: 45000, deadline: "2026-03-15T23:59:00", bids: 12 },
  { id: "TND-2846", org: "City General Hospital", title: "Medical Equipment Procurement", budget: 120000, deadline: "2026-03-10T18:00:00", bids: 8 },
  { id: "TND-2843", org: "State Transport Authority", title: "Fleet Management System", budget: 63000, deadline: "2026-03-20T17:00:00", bids: 6 },
];

function getCountdown(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  return `${days}d ${hours}h left`;
}

const SubmitBid = () => {
  const [search, setSearch] = useState("");

  const filtered = openTenders.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.org.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div>
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Bid Securely on Algorand</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Submit a Bid</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Select an open tender below to submit your bid. All bids are hashed and recorded on-chain for full transparency.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="Search by tender ID, title, or organization..."
            />
          </div>

          {/* Open Tenders */}
          <div className="space-y-4">
            {filtered.length === 0 && (
              <div className="glass-card p-8 text-center rounded-2xl">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No open tenders found matching your search.</p>
              </div>
            )}
            {filtered.map((tender) => (
              <div
                key={tender.id}
                className="glass-card rounded-2xl p-5 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{tender.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold badge-open">OPEN</span>
                    </div>
                    <h3 className="font-semibold mb-1 truncate">{tender.title}</h3>
                    <p className="text-sm text-primary mb-3">{tender.org}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-mono font-semibold text-primary">{tender.budget.toLocaleString()} ALGO</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{getCountdown(tender.deadline)}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{tender.bids} bids</span>
                    </div>
                  </div>
                  <Link
                    to={`/tender/${tender.id}`}
                    className="flex items-center gap-2 text-sm shrink-0 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
                  >
                    Bid Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/tenders" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
              View all tenders including closed <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitBid;