import { useState, useEffect } from "react";
import type { Screen } from "../App";
import { reportService } from "../services/reportService";
import { inventoryService } from "../services/inventoryService";
import { salesService } from "../services/salesService";

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
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await reportService.getDashboard();
        setReport(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p style={{ color: "var(--muted-foreground)" }}>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 rounded" style={{ background: "rgba(220, 38, 38, 0.1)", color: "#dc2626" }}>
          {error}
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Today's Sales", value: `₹${report?.totalSalesToday || 0}", sub: "+8.4% vs yesterday", up: true },
    { label: "Total Items", value: `${report?.totalItems || 0}`, sub: "23 added this week", up: true },
    { label: "Low Stock Alerts", value: `${report?.lowStockCount || 0}`, sub: "Needs restocking", up: false, alert: true },
    { label: "Weekly Sales", value: `₹${report?.totalSalesThisWeek || 0}`, sub: "+12.3% vs last week", up: true },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Outfit" }}>
            Good afternoon 👋
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
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
        <div className="col-span-2 p-5 rounded-lg border" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold" style={{ fontFamily: "Outfit" }}>
              This Week's Sales
            </h2>
            <span className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>
              Mon–Fri
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold" style={{ fontFamily: "Outfit" }}>
              ₹{report?.totalSalesThisWeek || 0}
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
              +12.3%
            </span>
          </div>
          <div className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            vs ₹50,300 last week
          </div>
          <MiniBarChart />
        </div>

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
            {[1, 2, 3].map((i) => (
              <div key={i} className="pb-3 border-b last:border-0 last:pb-0" style={{ borderColor: "var(--border)" }}>
                <div className="text-xs font-medium mb-1">Sample Item {i}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--secondary)" }}>
                    <div className="h-full rounded-full" style={{ width: "30%", background: "#dc2626" }} />
                  </div>
                  <span className="text-xs font-mono shrink-0" style={{ color: "#dc2626" }}>
                    {i}/10
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
