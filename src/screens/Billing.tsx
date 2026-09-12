import { useState } from "react";

const plans = [
  { id: "starter", name: "Starter", price: "₹499", period: "/mo", items: "500 items", users: "1 user" },
  { id: "pro", name: "Pro", price: "₹1,199", period: "/mo", items: "5,000 items", users: "5 users", current: true },
  { id: "business", name: "Business", price: "₹2,999", period: "/mo", items: "Unlimited", users: "Unlimited" },
];

const invoices = [
  { id: "INV-2026-09", date: "1 Sep 2026", amount: "₹1,199", status: "paid", plan: "Pro" },
  { id: "INV-2026-08", date: "1 Aug 2026", amount: "₹1,199", status: "paid", plan: "Pro" },
  { id: "INV-2026-07", date: "1 Jul 2026", amount: "₹1,199", status: "paid", plan: "Pro" },
  { id: "INV-2026-06", date: "1 Jun 2026", amount: "₹999", status: "paid", plan: "Pro (Annual)" },
];

export default function Billing() {
  const [upgrading, setUpgrading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold" style={{ fontFamily: "Outfit" }}>Billing & Subscription</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Manage your plan and payment history</p>
      </div>

      {/* Current plan card */}
      <div className="p-5 rounded-lg border mb-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>CURRENT PLAN</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-bold" style={{ fontFamily: "Outfit" }}>Pro</span>
              <span className="text-sm font-mono text-gray-500">₹1,199/mo</span>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                { label: "Items", value: "1,342 / 5,000", pct: 27 },
                { label: "Users", value: "3 / 5", pct: 60 },
              ].map((u) => (
                <div key={u.label} className="min-w-40">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "var(--muted-foreground)" }}>{u.label}</span>
                    <span className="font-mono">{u.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--secondary)" }}>
                    <div className="h-full rounded-full" style={{ width: `${u.pct}%`, background: "var(--accent)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Next billing date</div>
            <div className="font-mono text-sm font-medium">1 Oct 2026</div>
            <button onClick={() => setUpgrading(true)} className="mt-3 px-4 py-2 text-xs font-semibold rounded" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
              Change Plan
            </button>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="p-5 rounded-lg border mb-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>PAYMENT METHOD</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 rounded flex items-center justify-center text-xs font-bold" style={{ background: "#1a1f71", color: "#fff" }}>
                VISA
              </div>
              <div>
                <div className="text-sm font-medium font-mono">•••• •••• •••• 4242</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Expires 08/2028</div>
              </div>
            </div>
          </div>
          <button className="text-xs px-3 py-1.5 rounded border" style={{ border: "1px solid var(--border)" }}>
            Update Card
          </button>
        </div>
      </div>

      {/* Invoice history */}
      <div className="rounded-lg border overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
          <h2 className="text-sm font-semibold" style={{ fontFamily: "Outfit" }}>Invoice History</h2>
        </div>
        <table className="w-full text-sm" style={{ background: "var(--card)" }}>
          <thead>
            <tr style={{ background: "var(--secondary)" }}>
              {["Invoice", "Date", "Plan", "Amount", "Status", ""].map((h) => (
                <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t hover:bg-secondary/40 transition-colors" style={{ borderColor: "var(--border)" }}>
                <td className="px-5 py-3 font-mono text-xs">{inv.id}</td>
                <td className="px-5 py-3 text-xs">{inv.date}</td>
                <td className="px-5 py-3 text-xs">{inv.plan}</td>
                <td className="px-5 py-3 font-mono text-xs font-medium">{inv.amount}</td>
                <td className="px-5 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>{inv.status}</span>
                </td>
                <td className="px-5 py-3">
                  <button className="text-xs" style={{ color: "var(--accent)" }}>↓ PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cancel plan */}
      <div className="mt-6 p-4 rounded-lg border" style={{ border: "1px solid rgba(220,38,38,0.2)", background: "rgba(220,38,38,0.02)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium" style={{ color: "#dc2626" }}>Cancel Subscription</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Your data is retained for 30 days after cancellation.</div>
          </div>
          <button className="text-xs px-3 py-1.5 rounded border font-medium" style={{ border: "1px solid rgba(220,38,38,0.4)", color: "#dc2626" }}>
            Cancel Plan
          </button>
        </div>
      </div>

      {/* Upgrade modal */}
      {upgrading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-xl rounded-xl border shadow-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
              <h2 className="font-bold" style={{ fontFamily: "Outfit" }}>Change Plan</h2>
              <button onClick={() => setUpgrading(false)} style={{ color: "var(--muted-foreground)" }}>✕</button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-5">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    className="text-left p-4 rounded-lg border-2 transition-all"
                    style={{
                      border: selectedPlan === p.id ? "2px solid var(--accent)" : "2px solid var(--border)",
                      background: p.current && selectedPlan === p.id ? "rgba(245,158,11,0.05)" : "var(--background)",
                    }}
                  >
                    <div className="font-bold text-sm mb-0.5" style={{ fontFamily: "Outfit" }}>{p.name}</div>
                    {p.current && <div className="text-xs mb-1" style={{ color: "var(--accent)", fontSize: "10px" }}>CURRENT</div>}
                    <div className="font-mono text-base font-bold">{p.price}</div>
                    <div className="text-xs mt-2" style={{ color: "var(--muted-foreground)" }}>{p.items}<br />{p.users}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setUpgrading(false)} className="flex-1 py-2.5 text-sm rounded border" style={{ border: "1px solid var(--border)" }}>Cancel</button>
                <button onClick={() => setUpgrading(false)} className="flex-1 py-2.5 text-sm font-semibold rounded" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                  Confirm Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
