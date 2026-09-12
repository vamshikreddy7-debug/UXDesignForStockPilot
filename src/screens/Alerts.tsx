import { useState } from "react";

type Alert = {
  id: string;
  name: string;
  sku: string;
  category: string;
  qty: number;
  threshold: number;
  severity: "critical" | "warning";
  lastSold: string;
};

const initAlerts: Alert[] = [
  { id: "1", name: "Carburetor Jet — TVS Star", sku: "CJ-TVS-STR", category: "Engine", qty: 1, threshold: 5, severity: "critical", lastSold: "Today, 9:12 AM" },
  { id: "2", name: "Clutch Wire — Hero Splendor", sku: "CW-HER-SPL", category: "Cables", qty: 2, threshold: 8, severity: "critical", lastSold: "Yesterday" },
  { id: "3", name: "Brake Pad Set — Honda City", sku: "BP-HON-CTY", category: "Brakes", qty: 4, threshold: 10, severity: "warning", lastSold: "Today, 12:41 PM" },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(initAlerts);
  const [resolving, setResolving] = useState<string | null>(null);
  const [restockQty, setRestockQty] = useState(20);
  const [resolved, setResolved] = useState<string[]>([]);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);

  function restock(id: string) {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, qty: a.qty + restockQty } : a
      )
    );
    setResolved((prev) => [...prev, id]);
    setResolving(null);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
      setResolved((prev) => prev.filter((i) => i !== id));
    }, 1500);
  }

  const critical = alerts.filter((a) => a.severity === "critical");
  const warnings = alerts.filter((a) => a.severity === "warning");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Outfit" }}>Alerts</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {alerts.length} active alert{alerts.length !== 1 ? "s" : ""} · {critical.length} critical
          </p>
        </div>
        <button
          onClick={() => setNotifPanelOpen(true)}
          className="px-4 py-2 text-sm rounded border flex items-center gap-2"
          style={{ border: "1px solid var(--border)", background: "var(--card)" }}
        >
          <span>🔔</span> Notification Settings
        </button>
      </div>

      {alerts.length === 0 && (
        <div className="rounded-lg border flex flex-col items-center justify-center py-16" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="text-4xl mb-3">✅</div>
          <h2 className="font-bold text-base mb-1" style={{ fontFamily: "Outfit" }}>All stocked up!</h2>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>No low-stock alerts at the moment.</p>
        </div>
      )}

      {critical.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <h2 className="text-sm font-semibold" style={{ color: "#dc2626" }}>Critical — Stock almost out</h2>
          </div>
          <div className="space-y-3">
            {critical.map((a) => (
              <AlertCard key={a.id} alert={a} resolved={resolved.includes(a.id)} onRestock={() => { setResolving(a.id); setRestockQty(20); }} />
            ))}
          </div>
        </section>
      )}

      {warnings.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
            <h2 className="text-sm font-semibold" style={{ color: "#b45309" }}>Warning — Running low</h2>
          </div>
          <div className="space-y-3">
            {warnings.map((a) => (
              <AlertCard key={a.id} alert={a} resolved={resolved.includes(a.id)} onRestock={() => { setResolving(a.id); setRestockQty(20); }} />
            ))}
          </div>
        </section>
      )}

      {/* Restock Modal */}
      {resolving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-sm rounded-xl border shadow-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h2 className="font-bold" style={{ fontFamily: "Outfit" }}>Restock Item</h2>
            </div>
            <div className="p-6">
              {(() => {
                const a = alerts.find((x) => x.id === resolving);
                if (!a) return null;
                return (
                  <>
                    <div className="text-sm font-medium mb-1">{a.name}</div>
                    <div className="text-xs font-mono mb-4" style={{ color: "var(--muted-foreground)" }}>{a.sku}</div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex-1 p-3 rounded text-center" style={{ background: "var(--secondary)" }}>
                        <div className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>Current stock</div>
                        <div className="text-xl font-bold font-mono" style={{ color: a.severity === "critical" ? "#dc2626" : "#f59e0b" }}>{a.qty}</div>
                      </div>
                      <div className="text-xl" style={{ color: "var(--muted-foreground)" }}>→</div>
                      <div className="flex-1 p-3 rounded text-center" style={{ background: "rgba(16,185,129,0.08)" }}>
                        <div className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>After restock</div>
                        <div className="text-xl font-bold font-mono" style={{ color: "#10b981" }}>{a.qty + restockQty}</div>
                      </div>
                    </div>
                    <label className="text-xs font-medium block mb-1.5 mt-4">Units to add</label>
                    <input
                      type="number"
                      min="1"
                      value={restockQty}
                      onChange={(e) => setRestockQty(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded border font-mono"
                      style={{ border: "1px solid var(--border)", background: "var(--background)" }}
                    />
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => setResolving(null)} className="flex-1 py-2 text-sm rounded border" style={{ border: "1px solid var(--border)" }}>Cancel</button>
                      <button onClick={() => restock(resolving)} className="flex-1 py-2 text-sm font-semibold rounded" style={{ background: "#10b981", color: "#fff" }}>
                        ✓ Update Stock
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings Panel */}
      {notifPanelOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-md rounded-xl border shadow-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
              <h2 className="font-bold" style={{ fontFamily: "Outfit" }}>Notification Settings</h2>
              <button onClick={() => setNotifPanelOpen(false)} style={{ color: "var(--muted-foreground)" }}>✕</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Email alerts", desc: "Send low-stock emails to rajesh@example.com", on: true },
                { label: "SMS alerts", desc: "Send SMS to +91 98765 43210", on: true },
                { label: "WhatsApp notifications", desc: "Send WhatsApp messages for critical alerts", on: false },
                { label: "Daily digest", desc: "Morning summary of stock levels", on: true },
              ].map((n) => (
                <div key={n.label} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium">{n.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{n.desc}</div>
                  </div>
                  <div className="w-10 h-5 rounded-full shrink-0 relative cursor-pointer" style={{ background: n.on ? "var(--accent)" : "var(--border)" }}>
                    <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all" style={{ background: "#fff", left: n.on ? "calc(100% - 18px)" : "2px" }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <button onClick={() => setNotifPanelOpen(false)} className="w-full py-2.5 text-sm font-semibold rounded" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AlertCard({ alert, resolved, onRestock }: { alert: Alert; resolved: boolean; onRestock: () => void }) {
  const pct = Math.round((alert.qty / alert.threshold) * 100);
  return (
    <div
      className="rounded-lg border p-4 transition-all"
      style={{
        border: resolved ? "1px solid rgba(16,185,129,0.4)" : alert.severity === "critical" ? "1px solid rgba(220,38,38,0.3)" : "1px solid rgba(245,158,11,0.3)",
        background: resolved ? "rgba(16,185,129,0.04)" : alert.severity === "critical" ? "rgba(220,38,38,0.03)" : "rgba(245,158,11,0.03)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-medium truncate">{alert.name}</span>
            {resolved && (
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
                ✓ Restocked
              </span>
            )}
          </div>
          <div className="text-xs font-mono mb-2" style={{ color: "var(--muted-foreground)" }}>
            {alert.sku} · {alert.category} · Last sold: {alert.lastSold}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--secondary)", maxWidth: 120 }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${Math.min(pct, 100)}%`, background: alert.severity === "critical" ? "#dc2626" : "#f59e0b" }}
              />
            </div>
            <span className="text-xs font-mono font-semibold" style={{ color: alert.severity === "critical" ? "#dc2626" : "#b45309" }}>
              {alert.qty} / {alert.threshold} units
            </span>
          </div>
        </div>
        <button
          onClick={onRestock}
          disabled={resolved}
          className="px-3 py-1.5 text-xs font-semibold rounded shrink-0 transition-opacity"
          style={{ background: resolved ? "var(--border)" : "var(--primary)", color: resolved ? "var(--muted-foreground)" : "var(--primary-foreground)" }}
        >
          {resolved ? "Restocked" : "Restock →"}
        </button>
      </div>
    </div>
  );
}
