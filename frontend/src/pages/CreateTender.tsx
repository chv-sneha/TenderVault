import { useState } from "react";
import { Plus, Minus, Lock, AlertTriangle, CheckCircle, ExternalLink, Copy, Loader2, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { createTender } from "@/services/api";

interface Criterion {
  id: string;
  name: string;
  weight: number;
}

const defaultCriteria: Criterion[] = [
  { id: "1", name: "Price", weight: 40 },
  { id: "2", name: "Experience", weight: 30 },
  { id: "3", name: "Timeline", weight: 20 },
  { id: "4", name: "Quality", weight: 10 },
];

const orgTypes = ["Government", "College", "Hospital", "Enterprise"];

interface SuccessModal {
  tenderId: string;
  appId: string;
  explorerLink: string;
  tenderLink: string;
}

export default function CreateTender() {
  const [criteria, setCriteria] = useState<Criterion[]>(defaultCriteria);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<SuccessModal | null>(null);
  const [form, setForm] = useState({
    title: "",
    organization: "",
    orgType: "Government",
    description: "",
    budget: "",
    deadline: "",
    email: "",
  });

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  const isWeightValid = totalWeight === 100;

  const addCriterion = () => {
    setCriteria([...criteria, { id: Date.now().toString(), name: "", weight: 0 }]);
  };

  const removeCriterion = (id: string) => {
    if (criteria.length <= 1) return;
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const updateCriterion = (id: string, field: "name" | "weight", value: string | number) => {
    setCriteria(criteria.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWeightValid) {
      toast({ title: "Invalid weights", description: "Criteria weights must sum to exactly 100%", variant: "destructive" });
      return;
    }
    if (!form.title || !form.organization || !form.budget || !form.deadline) {
      toast({ title: "Missing fields", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const criteriaObj = criteria.reduce((acc, c) => ({ ...acc, [c.name]: c.weight }), {});
      const response = await createTender({
        title: form.title,
        description: form.description,
        criteria: criteriaObj,
        deadline: form.deadline
      });
      
      setSuccess({
        tenderId: response.tender_id,
        appId: "755776827",
        explorerLink: `https://lora.algokit.io/testnet/transaction/${response.tx_id}`,
        tenderLink: `${window.location.origin}/tenders/${response.tender_id}`,
      });
      toast({ title: "Success!", description: "Tender created on Algorand" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to create tender", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Copied to clipboard" });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Lock className="w-3.5 h-3.5" />
            Encrypted on Algorand
          </div>
          <h1 className="text-4xl font-bold mb-3">Post a New Tender</h1>
          <p className="text-muted-foreground text-lg">
            Criteria will be encrypted and sealed on Algorand until deadline.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
          <div className="glass-card rounded-2xl p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
              Basic Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-2">Tender Title *</label>
                <input
                  className="form-input"
                  placeholder="e.g. Construction of Public Hospital Wing B"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Organization Name *</label>
                <input
                  className="form-input"
                  placeholder="e.g. Ministry of Health"
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Organization Type *</label>
                <select
                  className="form-input"
                  value={form.orgType}
                  onChange={(e) => setForm({ ...form, orgType: e.target.value })}
                >
                  {orgTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  className="form-input min-h-[120px] resize-none"
                  placeholder="Detailed description of the procurement requirement..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Budget (ALGO) *</label>
                <div className="relative">
                  <input
                    type="number"
                    className="form-input pr-16"
                    placeholder="50000"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-mono text-sm font-semibold">ALGO</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Deadline *</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-2">Contact Email *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="procurement@organization.gov"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Evaluation Criteria */}
          <div className="glass-card rounded-2xl p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
              Evaluation Criteria
            </h2>

            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Lock className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-orange-300">
                <strong>Criteria weights will be encrypted and hidden from all vendors until deadline.</strong> Once submitted to the blockchain, they cannot be changed.
              </p>
            </div>

            {/* Criteria List */}
            <div className="space-y-3">
              {criteria.map((criterion, i) => (
                <div key={criterion.id} className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm w-5">{i + 1}.</span>
                  <input
                    className="form-input flex-1"
                    placeholder="Criterion name"
                    value={criterion.name}
                    onChange={(e) => updateCriterion(criterion.id, "name", e.target.value)}
                  />
                  <div className="relative w-28">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="form-input pr-8 text-center"
                      value={criterion.weight}
                      onChange={(e) => updateCriterion(criterion.id, "weight", Number(e.target.value))}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCriterion(criterion.id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    disabled={criteria.length <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Criterion */}
            <button
              type="button"
              onClick={addCriterion}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Criterion
            </button>

            {/* Weight Counter */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${
              isWeightValid
                ? "bg-primary/10 border-primary/20"
                : "bg-destructive/10 border-destructive/20"
            }`}>
              <div className="flex items-center gap-2">
                {isWeightValid ? (
                  <CheckCircle className="w-4 h-4 text-primary" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                )}
                <span className={`text-sm font-medium ${isWeightValid ? "text-primary" : "text-destructive"}`}>
                  {isWeightValid ? "Weights balanced" : `${totalWeight}% — must be exactly 100%`}
                </span>
              </div>
              <span className={`text-2xl font-bold font-mono ${isWeightValid ? "text-primary" : "text-destructive"}`}>
                {totalWeight}%
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isWeightValid}
            className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-glow animate-pulse-glow"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Deploying smart contract...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Encrypt and Lock on Algorand
              </>
            )}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="glass-card-elevated rounded-2xl p-8 max-w-lg w-full border-glow animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Tender Created!</h3>
              </div>
              <button
                onClick={() => setSuccess(null)}
                className="p-2 rounded-lg hover:bg-secondary transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-muted-foreground mb-6">
              Your tender has been deployed on Algorand Testnet. Criteria are encrypted and sealed.
            </p>

            <div className="space-y-3">
              {[
                { label: "Tender ID", value: success.tenderId },
                { label: "App ID", value: success.appId },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="font-mono text-sm text-primary">{item.value}</div>
                  </div>
                  <button
                    onClick={() => copyText(item.value)}
                    className="p-2 rounded-lg hover:bg-secondary transition-all text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <div className="text-xs text-muted-foreground">Tender Link</div>
                  <div className="font-mono text-xs text-primary truncate max-w-[250px]">{success.tenderLink}</div>
                </div>
                <button
                  onClick={() => copyText(success.tenderLink)}
                  className="p-2 rounded-lg hover:bg-secondary transition-all text-muted-foreground hover:text-foreground"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={success.explorerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
              >
                View on Algorand <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={success.tenderLink}
                className="flex-1 px-4 py-3 rounded-xl border border-border hover:bg-secondary transition-all text-sm font-semibold text-center"
              >
                View Your Tender
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
