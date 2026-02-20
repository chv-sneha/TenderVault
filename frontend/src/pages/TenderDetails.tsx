import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Lock, Users, Clock, ExternalLink, CheckCircle, Copy, Loader2, AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { submitBid, getTender, evaluateTender } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

const mockTender = {
  id: "TND-A1B2C3",
  title: "Construction of Public Hospital Wing B",
  organization: "Ministry of Health",
  orgType: "Government",
  budget: 250000,
  deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
  bids: 8,
  status: "OPEN",
  description: "Procurement for the construction of Wing B of the Regional Public Hospital, including 120 beds, ICU facilities, and modern medical infrastructure.",
  contactEmail: "procurement@health.gov",
  appId: "847392018",
};

function getCountdown(deadline: Date) {
  const diff = deadline.getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${days}d ${hours}h ${mins}m`;
}

interface BidSuccess {
  hash: string;
  txId: string;
}

export default function TenderDetails() {
  const { id } = useParams();
  const { accountType, currentUser } = useAuth();
  const [tender, setTender] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bidLoading, setBidLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [bidSuccess, setBidSuccess] = useState<BidSuccess | null>(null);
  const [form, setForm] = useState({
    company: "",
    contact: "",
    price: "",
    timeline: "",
    experience: "",
    proposal: "",
  });

  useEffect(() => {
    loadTender();
  }, [id]);

  const loadTender = async () => {
    try {
      const data = await getTender(id!);
      setTender({
        id: data.tender_id,
        title: data.title,
        organization: data.organization || "Unknown",
        orgType: data.orgType || "Government",
        budget: data.budget || 0,
        deadline: new Date(data.deadline),
        bids: data.bid_count || 0,
        status: data.status || "OPEN",
        description: data.description,
        contactEmail: data.contactEmail || "contact@org.gov",
        appId: "755804596",
        criteria: data.criteria
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to load tender", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.price || !form.timeline) {
      toast({ title: "Missing fields", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    
    setBidLoading(true);
    try {
      const response = await submitBid({
        tender_id: tender.id,
        vendor_name: form.company,
        proposal: form.proposal || "Standard proposal",
        price: parseFloat(form.price),
        user_id: currentUser?.uid
      });
      
      setBidSuccess({ 
        hash: response.bid_hash, 
        txId: response.tx_id 
      });
      toast({ title: "Bid Submitted!", description: "Your bid has been sealed on Algorand" });
      loadTender(); // Refresh bid count
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit bid", variant: "destructive" });
    } finally {
      setBidLoading(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!" });
  };

  const handleEvaluate = async () => {
    setEvaluating(true);
    try {
      await evaluateTender(tender.id);
      toast({ title: "Success!", description: "Bids evaluated successfully" });
      loadTender(); // Refresh to show updated status
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to evaluate bids", variant: "destructive" });
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link to="/tenders" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Tenders
        </Link>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && tender && (
          <>
        {/* Tender Header */}
        <div className="glass-card-elevated rounded-2xl p-8 mb-6 border-glow">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="text-xs text-muted-foreground font-mono mb-1">{tender.id}</div>
              <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{tender.orgType}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${tender.status === "OPEN" ? "badge-open" : "badge-closed"}`}>
                {tender.status}
              </span>
              {tender.status === "EVALUATED" && (
                <Link
                  to={`/results/${tender.id}`}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
                >
                  View Results
                </Link>
              )}
              {tender.status === "OPEN" && (accountType === "organization" || accountType === "government") && tender.bids > 0 && (
                <button
                  onClick={handleEvaluate}
                  disabled={evaluating}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {evaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Evaluate with AI
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="text-lg text-muted-foreground mb-1">{tender.organization}</div>
          <h1 className="text-3xl font-bold mb-4">{tender.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">{tender.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Budget", value: `${tender.budget.toLocaleString()} ALGO`, color: "text-primary" },
              { label: "Deadline", value: getCountdown(tender.deadline), color: "text-orange-400" },
              { label: "Bids Received", value: `${tender.bids} bids`, color: "text-blue-400" },
              { label: "Contact", value: tender.contactEmail, color: "text-muted-foreground" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-muted/50">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className={`text-sm font-semibold ${item.color} font-mono truncate`}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Algorand link */}
          <div className="mt-4 pt-4 border-t border-border">
            <a
              href={`https://lora.algokit.io/testnet/application/${tender.appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-mono"
            >
              App ID: {tender.appId} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Criteria Section */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            {tender.status === "OPEN" ? (
              <>
                <Lock className="w-5 h-5 text-orange-400" />
                <div>
                  <h3 className="font-bold">Evaluation Criteria</h3>
                  <p className="text-sm text-muted-foreground">Encrypted — Will be revealed automatically after deadline</p>
                </div>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-bold">Evaluation Criteria Revealed</h3>
                  <p className="text-sm text-muted-foreground">Criteria weights are now public</p>
                </div>
              </>
            )}
          </div>
          {tender.status === "OPEN" ? (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {["Price", "Experience", "Timeline", "Quality"].map((c) => (
                <div key={c} className="flex flex-col items-center p-3 rounded-xl bg-orange-500/5 border border-orange-500/15">
                  <Lock className="w-4 h-4 text-orange-400/60 mb-2" />
                  <span className="text-xs text-muted-foreground text-center">{c}</span>
                  <span className="text-xs text-orange-400/60 mt-1">??%</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {Object.entries(tender.criteria || {}).map(([name, weight]) => (
                <div key={name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize">{name}</span>
                    <span className="text-primary font-mono font-bold">{weight}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                      style={{ width: `${weight}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bid Count Info */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
          <Users className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <p className="text-sm text-blue-300">
            <strong>{tender.bids} bids</strong> submitted. Vendor names and amounts are privacy-protected on-chain until deadline.
          </p>
        </div>

        {/* Bid Form */}
        {tender.status === "OPEN" && !bidSuccess && accountType !== "organization" && accountType !== "government" && (
          <form onSubmit={handleBid} className="glass-card rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-bold">Submit Your Bid</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">Vendor Company Name *</label>
                <input className="form-input" placeholder="Your Company Ltd." value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Person *</label>
                <input className="form-input" placeholder="Full Name" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Proposed Price (ALGO) *</label>
                <div className="relative">
                  <input type="number" className="form-input pr-16" placeholder="180000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-mono text-sm font-semibold">ALGO</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Timeline (weeks) *</label>
                <input type="number" className="form-input" placeholder="24" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-2">Company Experience (years)</label>
                <input type="number" className="form-input" placeholder="10" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-2">Detailed Proposal</label>
                <textarea className="form-input min-h-[120px] resize-none" placeholder="Describe your approach, methodology, and unique value proposition..." value={form.proposal} onChange={(e) => setForm({ ...form, proposal: e.target.value })} rows={4} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-2">Supporting Documents</label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center text-muted-foreground hover:border-primary/40 transition-colors cursor-pointer">
                  <div className="text-sm">📎 Click to upload or drag & drop</div>
                  <div className="text-xs mt-1">PDF, DOC, XLSX up to 10MB</div>
                </div>
              </div>
            </div>

            {/* Stake info */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-primary">
                <strong>0.1 ALGO</strong> will be staked as a participation guarantee. It will be returned automatically if your bid is unsuccessful.
              </p>
            </div>

            <button
              type="submit"
              disabled={bidLoading}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 disabled:opacity-50 transition-all shadow-glow animate-pulse-glow"
            >
              {bidLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sealing bid on Algorand...
                </>
              ) : (
                <>Submit Bid and Stake 0.1 ALGO</>
              )}
            </button>
          </form>
        )}

        {/* Bid Success */}
        {bidSuccess && (
          <div className="glass-card-elevated rounded-2xl p-8 border-glow animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Bid Submitted Successfully!</h3>
                <p className="text-sm text-muted-foreground">Sealed and recorded on Algorand Testnet</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Bid Hash", value: bidSuccess.hash },
                { label: "Transaction ID", value: bidSuccess.txId },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="font-mono text-xs text-primary break-all">{item.value}</div>
                  </div>
                  <button onClick={() => copy(item.value)} className="p-2 rounded-lg hover:bg-secondary transition-all text-muted-foreground hover:text-foreground ml-3">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <a
              href={`https://lora.algokit.io/testnet/application/755804596`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
            >
              View on Algorand Explorer <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
}
