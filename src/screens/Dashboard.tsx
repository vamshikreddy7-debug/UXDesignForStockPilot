import { useState } from "react";
import type { Screen } from "../App";

const stats = [
  { label: "Today's Sales", value: "₹12,480", sub: "+8.4% vs yesterday", up: true },
  { label: "Total Items", value: "1,342", sub: "23 added this week", up: true },
  { label: "Low Stock Alerts", value: "3", sub: "Needs restocking", up: false, alert: true },
  { label: "Pending Receipts", value: "7", sub: "₹34,200 outstanding", up: false },
];

const topItems = [
  { name: "Bosch Spark Plug Set — NGK", sku: "NGK-B8ES", qty: 48, sold: 124, revenue: "₹18,600" },
  { name: "Engine Oil Filter — Maruti 800", sku: "OF-MAR-800", qty: 32, sold: 89, revenue: "₹12,460" },
  { name: "Brake Pad Set — Honda City", sku: "BP-HON-CTY", qty: 15, sold: 67, revenue: "₹28,140" },
  { name: "Air Filter — Tata Indica", sku: "AF-TAT-IND", qty: 28, sold: 54, revenue: "₹6,750" },
  { name: "V-Belt Fan — Universal 22\"", sku: "VB-UNI-22", qty: 60, sold: 43, revenue: "₹5,160" },
];

const recentSales = [
  { id: "RCP-0312", item: "Bosch Spark Plug Set", qty: 2, amount: "₹300", time: "2:34 PM", status: "paid" },
  { id: "RCP-0311", item: "Engine Oil Filter", qty: 1, amount: "₹140", time: "1:58 PM", status: "paid" },
  { id: "RCP-0310", item: "Brake Pad Set — Honda City", qty: 1, amount: "₹420", time: "12:41 PM", status: "paid" },
  { id: "RCP-0309", item: "Air Filter — Tata Indica", qty: 3, amount: "₹375", time: "11:22 AM", status: "paid" },
  { id: "RCP-0308", item: "V-Belt Fan 22\"", qty: 2, amount: "₹240", time: "10:05 AM", status: "paid" },
];

const alerts = [
  { name: "Brake Pad Set — Honda City", qty: 4, threshold: 10 },
  { name: "Clutch Wire — Hero Splendor", qty: 2, threshold: 8 },
  { name: "Carburetor Jet — TVS Star", qty: 1, threshold: 5 },
];

// Simple bar chart using SVG
const weekData = [
  { day: "Mon", value: 8400 },
  { day: "Tue", value: 11200 },
  { day: "Wed", value: 9600 },
  { day: "Thu", value: 14800 },
  { day: "Fri", value: 12480 },
  { day: "Sat", value: 0 },
  { day: "Sun", value: 0 },
];

function MiniBarChart() {
  const max = Math.max(...weekData.map((d) => d.value));
  const h = 64;
  return (
    <div className="flex items-end gap-1.5 mt-2">
      {weekData.map((d, i) => {
        const barH = d.value ? Math.round((d.value / max) * h) : 4;
        const isToday = i === 4;
        return (
          <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-sm transition-all"
              style={{
                height: barH,
                background: isToday ? "var(--accent)" : d.value ? "#334155" : "var(--border)",
              }}
            />
            <span className="text-xs" style={{ color: isToday ? "var(--accent)" : "var(--muted-foreground)", fontSize: "10px" }}>
              {d.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [tab, setTab] = useState<"sales" | "items">("sales");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Outfit" }}>
            Good afternoon, Rajesh 👋
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Friday, 12 September 2026 · Sharma Auto Parts
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate("inventory")}
            className="px-4 py-2 text-sm font-medium rounded border transition-colors hover:bg-secondary"
            style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            + Add Item
          </button>
          <button
            onClick={() => onNavigate("sales")}
            className="px-4 py-2 text-sm font-semibold rounded"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Record Sale
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-4 rounded-lg border"
            style={{
              background: "var(--card)",
              border: s.alert ? "1px solid rgba(220,38,38,0.3)" : "1px solid var(--border)",
              boxShadow: s.alert ? "0 0 0 2px rgba(220,38,38,0.06)" : "none",
            }}
          >
            <div className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
              {s.label}
            </div>
            <div
              className="text-2xl font-bold font-mono mb-1"
              style={{ fontFamily: "Outfit", color: s.alert ? "#dc2626" : "var(--foreground)" }}
            >
              {s.value}
            </div>
            <div className="text-xs flex items-center gap-1" style={{ color: s.alert ? "#dc2626" : s.up ? "#10b981" : "var(--muted-foreground)" }}>
              {s.up && !s.alert && <span>↑</span>}
              {s.alert && <span>⚠</span>}
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Weekly Sales Chart */}
        <div className="col-span-2 p-5 rounded-lg border" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold" style={{ fontFamily: "Outfit" }}>This Week's Sales</h2>
            <span className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>Mon–Fri</span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold" style={{ fontFamily: "Outfit" }}>₹56,480</span>
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>+12.3%</span>
          </div>
          <div className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>vs ₹50,300 last week</div>
          <MiniBarChart />
        </div>

        {/* Low-stock Alerts */}
        <div className="p-5 rounded-lg border" style={{ background: "var(--card)", border: "1px solid rgba(220,38,38,0.3)" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold flex items-center gap-1.5" style={{ fontFamily: "Outfit" }}>
              <span style={{ color: "#dc2626" }}>⚠</span> Low Stock
            </h2>
            <button className="text-xs underline" style={{ color: "var(--accent)" }} onClick={() => onNavigate("alerts")}>
              View all
            </button>
          </div>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.name} className="pb-3 border-b last:border-0 last:pb-0" style={{ borderColor: "var(--border)" }}>
                <div className="text-xs font-medium mb-1 truncate" title={a.name}>{a.name}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--secondary)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.round((a.qty / a.threshold) * 100)}%`, background: a.qty <= 3 ? "#dc2626" : "#f59e0b" }}
                    />
                  </div>
                  <span className="text-xs font-mono shrink-0" style={{ color: a.qty <= 3 ? "#dc2626" : "#f59e0b" }}>
                    {a.qty}/{a.threshold}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom tabs */}
      <div className="rounded-lg border overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
          {(["sales", "items"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-3 text-sm font-medium border-b-2 transition-colors"
              style={{
                borderColor: tab === t ? "var(--accent)" : "transparent",
                color: tab === t ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              {t === "sales" ? "Recent Sales" : "Top Items"}
            </button>
          ))}
        </div>
        {tab === "sales" && (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--secondary)" }}>
                {["Receipt", "Item", "Qty", "Amount", "Time", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentSales.map((s) => (
                <tr key={s.id} className="border-t hover:bg-secondary/40 transition-colors" style={{ borderColor: "var(--border)" }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{s.id}</td>
                  <td className="px-4 py-3 text-xs">{s.item}</td>
                  <td className="px-4 py-3 font-mono text-xs">{s.qty}</td>
                  <td className="px-4 py-3 font-mono text-xs font-medium">{s.amount}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{s.time}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "items" && (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--secondary)" }}>
                {["Item", "SKU", "In Stock", "Units Sold", "Revenue"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topItems.map((item) => (
                <tr key={item.sku} className="border-t hover:bg-secondary/40 transition-colors" style={{ borderColor: "var(--border)" }}>
                  <td className="px-4 py-3 text-xs font-medium">{item.name}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{item.sku}</td>
                  <td className="px-4 py-3 font-mono text-xs">{item.qty}</td>
                  <td className="px-4 py-3 font-mono text-xs">{item.sold}</td>
                  <td className="px-4 py-3 font-mono text-xs font-medium">{item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
