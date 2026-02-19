import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Clock, Users, ChevronRight, ArrowUpDown, Loader2 } from "lucide-react";
import { getTenders } from "@/services/api";

const mockTenders = [
  {
    id: "TND-A1B2C3",
    title: "Construction of Public Hospital Wing B",
    organization: "Ministry of Health",
    orgType: "Government",
    budget: 250000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
    bids: 8,
    status: "OPEN",
  },
  {
    id: "TND-D4E5F6",
    title: "University Campus Network Upgrade",
    organization: "State University",
    orgType: "College",
    budget: 85000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
    bids: 14,
    status: "OPEN",
  },
  {
    id: "TND-G7H8I9",
    title: "Medical Equipment Procurement 2026",
    organization: "City Hospital",
    orgType: "Hospital",
    budget: 420000,
    deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    bids: 11,
    status: "CLOSED",
  },
  {
    id: "TND-J1K2L3",
    title: "Enterprise Software Licensing",
    organization: "Nexgen Corp",
    orgType: "Enterprise",
    budget: 150000,
    deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    bids: 6,
    status: "AWARDED",
  },
  {
    id: "TND-M4N5O6",
    title: "Road Infrastructure Development Phase 3",
    organization: "Transport Authority",
    orgType: "Government",
    budget: 890000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
    bids: 3,
    status: "OPEN",
  },
  {
    id: "TND-P7Q8R9",
    title: "Smart City IoT Deployment",
    organization: "Municipal Corporation",
    orgType: "Government",
    budget: 340000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    bids: 9,
    status: "OPEN",
  },
];

function getCountdown(deadline: Date) {
  const diff = deadline.getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    OPEN: "badge-open",
    CLOSED: "badge-closed",
    AWARDED: "badge-awarded",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] || ""}`}>
      {status}
    </span>
  );
}

export default function BrowseTenders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [orgFilter, setOrgFilter] = useState("ALL");
  const [allTenders, setAllTenders] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTenders();
  }, []);

  const loadTenders = async () => {
    try {
      const response = await getTenders();
      const tendersData = response.tenders.map(t => ({
        id: t.tender_id,
        title: t.title,
        organization: t.organization || "Unknown",
        orgType: t.orgType || "Government",
        budget: t.budget || 0,
        deadline: new Date(t.deadline),
        bids: t.bid_count || 0,
        status: t.status || "OPEN"
      }));
      setAllTenders(tendersData);
      setTenders(tendersData);
    } catch (error) {
      console.error("Failed to load tenders:", error);
      setAllTenders(mockTenders);
      setTenders(mockTenders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = allTenders;
    if (search) filtered = filtered.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.organization.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "ALL") filtered = filtered.filter((t) => t.status === statusFilter);
    if (orgFilter !== "ALL") filtered = filtered.filter((t) => t.orgType === orgFilter);
    setTenders(filtered);
  }, [search, statusFilter, orgFilter, allTenders]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Browse <span className="gradient-text">Tenders</span></h1>
          <p className="text-muted-foreground text-lg">All procurement opportunities — transparent and on-chain</p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              className="form-input pl-11"
              placeholder="Search tenders or organizations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="form-input w-full sm:w-40"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
            <option value="AWARDED">Awarded</option>
          </select>
          <select
            className="form-input w-full sm:w-44"
            value={orgFilter}
            onChange={(e) => setOrgFilter(e.target.value)}
          >
            <option value="ALL">All Org Types</option>
            <option value="Government">Government</option>
            <option value="College">College</option>
            <option value="Hospital">Hospital</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground mb-6">
          Showing <span className="text-foreground font-medium">{tenders.length}</span> tenders
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Tender Cards */}
        {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenders.map((tender) => (
            <div key={tender.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition-all duration-200 border border-border hover:border-primary/30 group animated-border">
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-muted-foreground font-mono mb-1">{tender.id}</div>
                  <div className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full inline-block">{tender.orgType}</div>
                </div>
                <StatusBadge status={tender.status} />
              </div>

              {/* Org + Title */}
              <div>
                <div className="text-sm text-muted-foreground mb-1">{tender.organization}</div>
                <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">{tender.title}</h3>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-border">
                <div className="text-center">
                  <div className="text-sm font-bold text-primary font-mono">{tender.budget.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">ALGO</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-bold text-orange-400">
                    <Clock className="w-3 h-3" />
                    {getCountdown(tender.deadline)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">Deadline</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-bold">
                    <Users className="w-3 h-3 text-blue-400" />
                    {tender.bids}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">Bids</div>
                </div>
              </div>

              {/* Action */}
              <Link
                to={`/tenders/${tender.id}`}
                className="mt-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                View Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
        )}

        {tenders.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
            <p className="text-lg text-muted-foreground mb-6">No tenders found. Be the first to post one!</p>
            <Link
              to="/create-tender"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
            >
              Post a Tender
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
