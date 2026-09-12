import { useState } from "react";

type Period = "week" | "month" | "quarter";

const salesData: Record<Period, { label: string; value: number }[]> = {
  week: [
    { label: "Mon", value: 8400 },
    { label: "Tue", value: 11200 },
    { label: "Wed", value: 9600 },
    { label: "Thu", value: 14800 },
    { label: "Fri", value: 12480 },
    { label: "Sat", value: 3200 },
    { label: "Sun", value: 1100 },
  ],
  month: [
    { label: "Wk 1", value: 62400 },
    { label: "Wk 2", value: 58800 },
    { label: "Wk 3", value: 71200 },
    { label: "Wk 4", value: 84600 },
  ],
  quarter: [
    { label: "Jul", value: 248000 },
    { label: "Aug", value: 312000 },
    { label: "Sep", value: 197000 },
  ],
};

const summaries: Record<Period, { revenue: string; transactions: number; avgTicket: string; topCat: string }> = {
  week: { revenue: "₹60,780", transactions: 187, avgTicket: "₹325", topCat: "Brakes" },
  month: { revenue: "₹2,77,000", transactions: 812, avgTicket: "₹341", topCat: "Filters" },
  quarter: { revenue: "₹7,57,000", transactions: 2340, avgTicket: "₹323", topCat: "Ignition" },
};

const topItems = [
  { name: "Bosch Spark Plug Set — NGK B8ES", units: 124, revenue: "₹18,600", pct: 100 },
  { name: "Engine Oil Filter — Maruti 800", units: 89, revenue: "₹12,460", pct: 71 },
  { name: "Brake Pad Set — Honda City", units: 67, revenue: "₹28,140", pct: 54 },
  { name: "Air Filter — Tata Indica", units: 54, revenue: "₹6,750", pct: 44 },
  { name: "V-Belt Fan — Universal 22\"", units: 43, revenue: "₹5,160", pct: 35 },
];

const categoryData = [
  { label: "Filters", pct: 28, color: "#1e293b" },
  { label: "Brakes", pct: 22, color: "#f59e0b" },
  { label: "Ignition", pct: 18, color: "#3b82f6" },
  { label: "Electrical", pct: 15, color: "#10b981" },
  { label: "Other", pct: 17, color: "#cbd5e1" },
];

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2" style={{ height: 120 }}>
      {data.map((d, i) => {
        const h = Math.round((d.value / max) * 100);
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
            <div
              className="w-full rounded-t transition-all"
              style={{ height: `${h}%`, background: i === data.length - 1 ? "var(--accent)" : "var(--primary)", opacity: i === data.length - 1 ? 1 : 0.7 }}
              title={`₹${d.value.toLocaleString("en-IN")}`}
            />
            <span className="text-xs shrink-0" style={{ color: "var(--muted-foreground)", fontSize: "10px" }}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function DonutChart({ data }: { data: { label: string; pct: number; color: string }[] }) {
  let offset = 0;
  const r = 40;
  const cx = 56;
  const cy = 56;
  const circumference = 2 * Math.PI * r;
  const segments = data.map((d) => {
    const dash = (d.pct / 100) * circumference;
    const gap = circumference - dash;
    const seg = { ...d, dash, gap, offset };
    offset += dash;
    return seg;
  });
  return (
    <svg width="112" height="112" viewBox="0 0 112 112">
      {segments.map((s, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth="18"
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={-s.offset + circumference / 4}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      ))}
      <circle cx={cx} cy={cy} r="28" fill="white" />
    </svg>
  );
}

export default function Reports() {
  const [period, setPeriod] = useState<Period>("week");
  const sum = summaries[period];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Outfit" }}>Reports & Analytics</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Sharma Auto Parts · GST-ready</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded overflow-hidden border" style={{ border: "1px solid var(--border)" }}>
            {(["week", "month", "quarter"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-3 py-1.5 text-xs font-medium transition-colors"
                style={{ background: period === p ? "var(--primary)" : "var(--card)", color: period === p ? "var(--primary-foreground)" : "var(--muted-foreground)" }}
              >
                {p === "week" ? "This Week" : p === "month" ? "This Month" : "Quarter"}
              </button>
            ))}
          </div>
          <button className="px-3 py-1.5 text-xs rounded border flex items-center gap-1" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
            ↓ Export
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[
          { label: "Revenue", value: sum.revenue, icon: "₹" },
          { label: "Transactions", value: sum.transactions.toLocaleString("en-IN"), icon: "#" },
          { label: "Avg. Ticket", value: sum.avgTicket, icon: "~" },
          { label: "Top Category", value: sum.topCat, icon: "★" },
        ].map((k) => (
          <div key={k.label} className="p-4 rounded-lg border" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>{k.label}</div>
            <div className="text-xl font-bold" style={{ fontFamily: "Outfit" }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Sales bar chart */}
        <div className="col-span-2 p-5 rounded-lg border" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ fontFamily: "Outfit" }}>
            Sales — {period === "week" ? "This Week" : period === "month" ? "This Month" : "Q3 2026"}
          </h2>
          <BarChart data={salesData[period]} />
        </div>

        {/* Category breakdown */}
        <div className="p-5 rounded-lg border" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ fontFamily: "Outfit" }}>Sales by Category</h2>
          <div className="flex items-center gap-4">
            <DonutChart data={categoryData} />
            <div className="space-y-2 flex-1">
              {categoryData.map((c) => (
                <div key={c.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: c.color }} />
                  <span className="text-xs flex-1" style={{ color: "var(--muted-foreground)" }}>{c.label}</span>
                  <span className="text-xs font-mono font-semibold">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top items */}
      <div className="rounded-lg border overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
          <h2 className="text-sm font-semibold" style={{ fontFamily: "Outfit" }}>Top Selling Items</h2>
        </div>
        <table className="w-full text-sm" style={{ background: "var(--card)" }}>
          <thead>
            <tr style={{ background: "var(--secondary)" }}>
              {["Item", "Units Sold", "Revenue", "Share"].map((h) => (
                <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topItems.map((item) => (
              <tr key={item.name} className="border-t hover:bg-secondary/40 transition-colors" style={{ borderColor: "var(--border)" }}>
                <td className="px-5 py-3 text-xs font-medium">{item.name}</td>
                <td className="px-5 py-3 font-mono text-xs">{item.units}</td>
                <td className="px-5 py-3 font-mono text-xs font-medium">{item.revenue}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--secondary)" }}>
                      <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: "var(--accent)" }} />
                    </div>
                    <span className="text-xs font-mono">{item.pct}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
