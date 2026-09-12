import { useState } from "react";

type SaleItem = { id: string; name: string; sku: string; qty: number; price: number };

const catalog = [
  { id: "1", name: "Bosch Spark Plug Set — NGK B8ES", sku: "NGK-B8ES", price: 150, stock: 48 },
  { id: "2", name: "Engine Oil Filter — Maruti 800", sku: "OF-MAR-800", price: 140, stock: 32 },
  { id: "3", name: "Brake Pad Set — Honda City", sku: "BP-HON-CTY", price: 420, stock: 4 },
  { id: "4", name: "Air Filter — Tata Indica", sku: "AF-TAT-IND", price: 125, stock: 28 },
  { id: "5", name: "V-Belt Fan — Universal 22\"", sku: "VB-UNI-22", price: 120, stock: 60 },
  { id: "6", name: "Headlight Bulb 12V 35W", sku: "HB-UNI-35W", price: 65, stock: 94 },
  { id: "7", name: "Radiator Coolant 1L — Castrol", sku: "RC-CAS-1L", price: 195, stock: 22 },
  { id: "8", name: "Wiper Blade — Maruti Swift", sku: "WB-MAR-SWT", price: 240, stock: 17 },
];

const receipts = [
  { id: "RCP-0312", customer: "Walk-in", items: 2, total: "₹300", date: "12 Sep, 2:34 PM", status: "paid" },
  { id: "RCP-0311", customer: "Anil Motors", items: 1, total: "₹140", date: "12 Sep, 1:58 PM", status: "paid" },
  { id: "RCP-0310", customer: "Kumar Garage", items: 1, total: "₹420", date: "12 Sep, 12:41 PM", status: "paid" },
  { id: "RCP-0309", customer: "Walk-in", items: 3, total: "₹375", date: "12 Sep, 11:22 AM", status: "paid" },
  { id: "RCP-0308", customer: "Star Service", items: 2, total: "₹480", date: "12 Sep, 10:05 AM", status: "paid" },
];

type Step = "select" | "confirm" | "receipt";

export default function Sales() {
  const [tab, setTab] = useState<"new" | "history">("new");
  const [step, setStep] = useState<Step>("select");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [customer, setCustomer] = useState("");
  const [payMode, setPayMode] = useState("cash");
  const [receiptData, setReceiptData] = useState<{ id: string; items: SaleItem[]; customer: string; total: number } | null>(null);

  const results = catalog.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.sku.toLowerCase().includes(search.toLowerCase())
  );

  function addToCart(item: (typeof catalog)[0]) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: item.id, name: item.name, sku: item.sku, qty: 1, price: item.price }];
    });
  }

  function updateQty(id: string, qty: number) {
    if (qty <= 0) setCart((prev) => prev.filter((c) => c.id !== id));
    else setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty } : c));
  }

  const total = cart.reduce((sum, c) => sum + c.qty * c.price, 0);

  function confirmSale() {
    setReceiptData({ id: `RCP-${Math.floor(Math.random() * 9000 + 1000)}`, items: cart, customer: customer || "Walk-in", total });
    setStep("receipt");
    setCart([]);
    setSearch("");
    setCustomer("");
  }

  function newSale() {
    setStep("select");
    setReceiptData(null);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold" style={{ fontFamily: "Outfit" }}>Sales</h1>
        <div className="flex gap-1 rounded-lg p-0.5" style={{ background: "var(--secondary)" }}>
          {(["new", "history"] as const).map((t) => (
            <button key={t} onClick={() => { setTab(t); setStep("select"); }} className="px-4 py-1.5 text-sm rounded font-medium transition-colors" style={{ background: tab === t ? "var(--card)" : "transparent", color: tab === t ? "var(--foreground)" : "var(--muted-foreground)", boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}>
              {t === "new" ? "New Sale" : "History"}
            </button>
          ))}
        </div>
      </div>

      {tab === "new" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Item selector */}
          <div className="lg:col-span-3 rounded-lg border" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.5" />
                  <path d="M10 10L13 13" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  className="w-full pl-9 pr-3 py-2 text-sm rounded border outline-none"
                  style={{ border: "1px solid var(--border)", background: "var(--background)" }}
                  placeholder="Search items by name or SKU…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {results.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/40 transition-colors">
                  <div>
                    <div className="text-xs font-medium">{item.name}</div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                      {item.sku} · Stock: {item.stock}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold">₹{item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="text-xs px-3 py-1.5 rounded font-medium transition-opacity hover:opacity-80"
                      style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart / confirm / receipt */}
          <div className="lg:col-span-2">
            {step === "select" && (
              <div className="rounded-lg border flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="px-4 py-3 border-b font-semibold text-sm" style={{ borderColor: "var(--border)", fontFamily: "Outfit" }}>
                  Cart ({cart.length})
                </div>
                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-12 text-sm" style={{ color: "var(--muted-foreground)" }}>
                    <div className="text-3xl mb-2">🛒</div>
                    Add items from the left panel
                  </div>
                ) : (
                  <div className="divide-y flex-1" style={{ borderColor: "var(--border)" }}>
                    {cart.map((c) => (
                      <div key={c.id} className="px-4 py-3">
                        <div className="text-xs font-medium mb-1.5">{c.name}</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(c.id, c.qty - 1)} className="w-6 h-6 rounded border flex items-center justify-center text-xs" style={{ border: "1px solid var(--border)" }}>−</button>
                            <span className="font-mono text-xs w-8 text-center">{c.qty}</span>
                            <button onClick={() => updateQty(c.id, c.qty + 1)} className="w-6 h-6 rounded border flex items-center justify-center text-xs" style={{ border: "1px solid var(--border)" }}>+</button>
                          </div>
                          <span className="font-mono text-sm font-medium">₹{c.qty * c.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {cart.length > 0 && (
                  <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
                    <div className="flex justify-between text-sm font-bold mb-3">
                      <span>Total</span>
                      <span className="font-mono">₹{total}</span>
                    </div>
                    <button onClick={() => setStep("confirm")} className="w-full py-2.5 text-sm font-semibold rounded" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                      Proceed to Confirm →
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === "confirm" && (
              <div className="rounded-lg border" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="px-4 py-3 border-b font-semibold text-sm flex items-center gap-2" style={{ borderColor: "var(--border)", fontFamily: "Outfit" }}>
                  <button onClick={() => setStep("select")} style={{ color: "var(--muted-foreground)" }}>←</button>
                  Confirm Sale
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="text-xs font-medium block mb-1">Customer name (optional)</label>
                    <input className="w-full px-3 py-2 text-sm rounded border" style={{ border: "1px solid var(--border)", background: "var(--background)" }} placeholder="Walk-in / Anil Motors" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1">Payment mode</label>
                    <div className="grid grid-cols-3 gap-1">
                      {["cash", "UPI", "card"].map((m) => (
                        <button key={m} onClick={() => setPayMode(m)} className="py-2 text-xs rounded border font-medium transition-colors" style={{ background: payMode === m ? "var(--primary)" : "var(--secondary)", color: payMode === m ? "var(--primary-foreground)" : "var(--muted-foreground)", border: payMode === m ? "1px solid transparent" : "1px solid var(--border)" }}>
                          {m.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 rounded text-sm" style={{ background: "var(--secondary)" }}>
                    {cart.map((c) => (
                      <div key={c.id} className="flex justify-between text-xs py-0.5">
                        <span>{c.name} × {c.qty}</span>
                        <span className="font-mono">₹{c.qty * c.price}</span>
                      </div>
                    ))}
                    <div className="border-t mt-2 pt-2 flex justify-between font-semibold" style={{ borderColor: "var(--border)" }}>
                      <span>Total</span>
                      <span className="font-mono">₹{total}</span>
                    </div>
                  </div>
                  <button onClick={confirmSale} className="w-full py-2.5 text-sm font-semibold rounded" style={{ background: "#10b981", color: "#fff" }}>
                    ✓ Confirm Sale & Generate Receipt
                  </button>
                </div>
              </div>
            )}

            {step === "receipt" && receiptData && (
              <div className="rounded-lg border" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#10b981" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </div>
                  <span className="font-semibold text-sm" style={{ fontFamily: "Outfit" }}>Sale Recorded!</span>
                </div>
                <div className="p-4">
                  <div className="text-center mb-4">
                    <div className="font-bold" style={{ fontFamily: "Outfit" }}>Sharma Auto Parts</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Station Road, Pune · GST: 27SHARM1234A1Z5</div>
                    <div className="text-xs mt-1 font-mono">{receiptData.id} · {new Date().toLocaleString("en-IN")}</div>
                  </div>
                  <div className="border-t border-b py-3 mb-3 space-y-1" style={{ borderColor: "var(--border)" }}>
                    {receiptData.items.map((i) => (
                      <div key={i.id} className="flex justify-between text-xs">
                        <span>{i.name} × {i.qty}</span>
                        <span className="font-mono">₹{i.qty * i.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-bold text-sm mb-4">
                    <span>Total Paid</span>
                    <span className="font-mono">₹{receiptData.total}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-xs rounded border" style={{ border: "1px solid var(--border)" }}>🖨 Print</button>
                    <button className="flex-1 py-2 text-xs rounded border" style={{ border: "1px solid var(--border)" }}>📲 WhatsApp</button>
                  </div>
                  <button onClick={newSale} className="w-full mt-2 py-2.5 text-sm font-semibold rounded" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                    + New Sale
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "history" && (
        <div className="rounded-lg border overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--secondary)" }}>
                {["Receipt No.", "Customer", "Items", "Total", "Date & Time", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ background: "var(--card)" }}>
              {receipts.map((r) => (
                <tr key={r.id} className="border-t hover:bg-secondary/40 transition-colors" style={{ borderColor: "var(--border)" }}>
                  <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-4 py-3 text-xs">{r.customer}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.items}</td>
                  <td className="px-4 py-3 font-mono text-xs font-medium">{r.total}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{r.date}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
