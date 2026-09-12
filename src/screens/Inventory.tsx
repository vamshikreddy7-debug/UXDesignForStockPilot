import { useState } from "react";

type Item = {
  id: string;
  name: string;
  sku: string;
  category: string;
  qty: number;
  threshold: number;
  cost: number;
  price: number;
  barcode: string;
};

const initItems: Item[] = [
  { id: "1", name: "Bosch Spark Plug Set — NGK B8ES", sku: "NGK-B8ES", category: "Ignition", qty: 48, threshold: 10, cost: 120, price: 150, barcode: "8901058765432" },
  { id: "2", name: "Engine Oil Filter — Maruti 800", sku: "OF-MAR-800", category: "Filters", qty: 32, threshold: 12, cost: 90, price: 140, barcode: "8901234567890" },
  { id: "3", name: "Brake Pad Set — Honda City", sku: "BP-HON-CTY", category: "Brakes", qty: 4, threshold: 10, cost: 320, price: 420, barcode: "8900987654321" },
  { id: "4", name: "Air Filter — Tata Indica", sku: "AF-TAT-IND", category: "Filters", qty: 28, threshold: 8, cost: 90, price: 125, barcode: "8901122334455" },
  { id: "5", name: "V-Belt Fan — Universal 22\"", sku: "VB-UNI-22", category: "Belts", qty: 60, threshold: 15, cost: 80, price: 120, barcode: "8904411223344" },
  { id: "6", name: "Clutch Wire — Hero Splendor", sku: "CW-HER-SPL", category: "Cables", qty: 2, threshold: 8, cost: 55, price: 90, barcode: "8903344556677" },
  { id: "7", name: "Carburetor Jet — TVS Star", sku: "CJ-TVS-STR", category: "Engine", qty: 1, threshold: 5, cost: 180, price: 260, barcode: "8902233445566" },
  { id: "8", name: "Headlight Bulb 12V 35W — Universal", sku: "HB-UNI-35W", category: "Electrical", qty: 94, threshold: 20, cost: 40, price: 65, barcode: "8905566778899" },
  { id: "9", name: "Radiator Coolant 1L — Castrol", sku: "RC-CAS-1L", category: "Fluids", qty: 22, threshold: 10, cost: 140, price: 195, barcode: "8901000200030" },
  { id: "10", name: "Wiper Blade — Maruti Swift", sku: "WB-MAR-SWT", category: "Body", qty: 17, threshold: 6, cost: 160, price: 240, barcode: "8909988776655" },
];

const categories = ["All", "Ignition", "Filters", "Brakes", "Belts", "Cables", "Engine", "Electrical", "Fluids", "Body"];

const emptyItem: Omit<Item, "id"> = {
  name: "", sku: "", category: "Filters", qty: 0, threshold: 10, cost: 0, price: 0, barcode: "",
};

type ModalMode = "add" | "edit" | "view" | null;

export default function Inventory() {
  const [items, setItems] = useState(initItems);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [mode, setMode] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<Item | null>(null);
  const [form, setForm] = useState<Omit<Item, "id">>(emptyItem);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [addMethod, setAddMethod] = useState<"manual" | "barcode" | "photo">("manual");
  const [scanning, setScanning] = useState(false);
  const [saved, setSaved] = useState(false);

  const filtered = items.filter((i) => {
    const matchCat = cat === "All" || i.category === cat;
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function openAdd() {
    setForm(emptyItem);
    setMode("add");
    setAddMethod("manual");
    setScanning(false);
  }

  function openEdit(item: Item) {
    setForm({ name: item.name, sku: item.sku, category: item.category, qty: item.qty, threshold: item.threshold, cost: item.cost, price: item.price, barcode: item.barcode });
    setSelected(item);
    setMode("edit");
  }

  function saveItem() {
    if (mode === "add") {
      setItems((prev) => [...prev, { ...form, id: String(Date.now()) }]);
    } else if (mode === "edit" && selected) {
      setItems((prev) => prev.map((i) => i.id === selected.id ? { ...form, id: selected.id } : i));
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setMode(null); }, 1000);
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteConfirm(null);
  }

  function simulateScan() {
    setScanning(true);
    setTimeout(() => {
      setForm({ ...form, barcode: "8901058765432", name: "Bosch Spark Plug Set — NGK B8ES", sku: "NGK-B8ES", category: "Ignition" });
      setScanning(false);
      setAddMethod("manual");
    }, 2000);
  }

  const lowStock = items.filter((i) => i.qty <= i.threshold);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Outfit" }}>Inventory</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {items.length} items total · <span style={{ color: lowStock.length ? "#dc2626" : "inherit" }}>{lowStock.length} low stock</span>
          </p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 text-sm font-semibold rounded" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
          + Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M10 10L13 13" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            className="w-full pl-9 pr-3 py-2 text-sm rounded border outline-none"
            style={{ border: "1px solid var(--border)", background: "var(--card)" }}
            placeholder="Search by name or SKU…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-3 py-2 text-xs rounded font-medium shrink-0 transition-colors"
              style={{
                background: cat === c ? "var(--primary)" : "var(--card)",
                color: cat === c ? "var(--primary-foreground)" : "var(--muted-foreground)",
                border: cat === c ? "1px solid transparent" : "1px solid var(--border)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--secondary)" }}>
              {["Item / SKU", "Category", "In Stock", "Threshold", "Cost", "Sell Price", "Margin", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ background: "var(--card)" }}>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-12 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  No items found.{" "}
                  <button className="underline" style={{ color: "var(--accent)" }} onClick={openAdd}>
                    Add your first item
                  </button>
                </td>
              </tr>
            )}
            {filtered.map((item) => {
              const low = item.qty <= item.threshold;
              const margin = Math.round(((item.price - item.cost) / item.price) * 100);
              return (
                <tr key={item.id} className="border-t hover:bg-muted/40 transition-colors" style={{ borderColor: "var(--border)" }}>
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium">{item.name}</div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: "var(--muted-foreground)" }}>{item.sku}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--secondary)", color: "var(--secondary-foreground)" }}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-semibold" style={{ color: low ? "#dc2626" : "var(--foreground)" }}>
                      {item.qty}
                    </span>
                    {low && (
                      <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(220,38,38,0.1)", color: "#dc2626" }}>
                        low
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{item.threshold}</td>
                  <td className="px-4 py-3 font-mono text-xs">₹{item.cost}</td>
                  <td className="px-4 py-3 font-mono text-xs">₹{item.price}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs" style={{ color: margin > 30 ? "#10b981" : margin > 15 ? "#f59e0b" : "#ef4444" }}>
                      {margin}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(item)} className="text-xs px-2.5 py-1 rounded border hover:bg-secondary transition-colors" style={{ border: "1px solid var(--border)" }}>
                        Edit
                      </button>
                      <button onClick={() => setDeleteConfirm(item.id)} className="text-xs px-2.5 py-1 rounded border transition-colors" style={{ border: "1px solid rgba(220,38,38,0.3)", color: "#dc2626" }}>
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {(mode === "add" || mode === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-lg rounded-xl border shadow-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h2 className="font-bold text-base" style={{ fontFamily: "Outfit" }}>
                {mode === "add" ? "Add New Item" : "Edit Item"}
              </h2>
              <button onClick={() => setMode(null)} className="text-lg" style={{ color: "var(--muted-foreground)" }}>✕</button>
            </div>

            {mode === "add" && (
              <div className="flex gap-2 px-6 pt-4">
                {(["manual", "barcode", "photo"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setAddMethod(m); if (m === "barcode") simulateScan(); }}
                    className="flex-1 py-2 text-xs rounded font-medium border transition-colors"
                    style={{
                      background: addMethod === m ? "var(--primary)" : "var(--secondary)",
                      color: addMethod === m ? "var(--primary-foreground)" : "var(--secondary-foreground)",
                      border: addMethod === m ? "1px solid transparent" : "1px solid var(--border)",
                    }}
                  >
                    {m === "manual" ? "✏ Manual" : m === "barcode" ? "⊞ Scan Barcode" : "📷 Photo"}
                  </button>
                ))}
              </div>
            )}

            {scanning && (
              <div className="mx-6 mt-4 rounded-lg flex flex-col items-center justify-center py-8" style={{ background: "#0f172a" }}>
                <div className="relative w-32 h-20 border-2 rounded mb-3" style={{ borderColor: "var(--accent)" }}>
                  <div className="absolute inset-x-0 top-1/2 h-0.5 animate-pulse" style={{ background: "var(--accent)" }} />
                </div>
                <p className="text-xs" style={{ color: "#94a3b8" }}>Scanning barcode…</p>
              </div>
            )}

            <div className="px-6 py-4 space-y-3 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1">Item name *</label>
                  <input className="w-full px-3 py-2 text-sm rounded border" style={{ border: "1px solid var(--border)", background: "var(--background)" }} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Bosch Spark Plug Set" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">SKU / Part No.</label>
                  <input className="w-full px-3 py-2 text-sm rounded border font-mono" style={{ border: "1px solid var(--border)", background: "var(--background)" }} value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="NGK-B8ES" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Category</label>
                  <select className="w-full px-3 py-2 text-sm rounded border" style={{ border: "1px solid var(--border)", background: "var(--background)" }} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {categories.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Quantity *</label>
                  <input type="number" min="0" className="w-full px-3 py-2 text-sm rounded border font-mono" style={{ border: "1px solid var(--border)", background: "var(--background)" }} value={form.qty} onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Low-stock threshold</label>
                  <input type="number" min="1" className="w-full px-3 py-2 text-sm rounded border font-mono" style={{ border: "1px solid var(--border)", background: "var(--background)" }} value={form.threshold} onChange={(e) => setForm({ ...form, threshold: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Cost price (₹)</label>
                  <input type="number" min="0" className="w-full px-3 py-2 text-sm rounded border font-mono" style={{ border: "1px solid var(--border)", background: "var(--background)" }} value={form.cost} onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Selling price (₹)</label>
                  <input type="number" min="0" className="w-full px-3 py-2 text-sm rounded border font-mono" style={{ border: "1px solid var(--border)", background: "var(--background)" }} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1">Barcode (optional)</label>
                  <input className="w-full px-3 py-2 text-sm rounded border font-mono" style={{ border: "1px solid var(--border)", background: "var(--background)" }} value={form.barcode} onChange={(e) => setForm({ ...form, barcode: e.target.value })} placeholder="8901234567890" />
                </div>
              </div>
              {form.cost > 0 && form.price > 0 && (
                <div className="p-3 rounded text-xs" style={{ background: "var(--secondary)" }}>
                  Margin: <strong>{Math.round(((form.price - form.cost) / form.price) * 100)}%</strong> · Profit per unit: <strong>₹{form.price - form.cost}</strong>
                </div>
              )}
            </div>
            <div className="flex gap-3 px-6 py-4 border-t" style={{ borderColor: "var(--border)" }}>
              <button onClick={() => setMode(null)} className="flex-1 py-2 text-sm rounded border" style={{ border: "1px solid var(--border)" }}>
                Cancel
              </button>
              <button
                onClick={saveItem}
                className="flex-1 py-2 text-sm font-semibold rounded"
                style={{ background: saved ? "#10b981" : "var(--primary)", color: "var(--primary-foreground)" }}
              >
                {saved ? "✓ Saved!" : mode === "add" ? "Add to Inventory" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-80 rounded-xl border p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h3 className="font-bold mb-2" style={{ fontFamily: "Outfit" }}>Delete item?</h3>
            <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 text-sm rounded border" style={{ border: "1px solid var(--border)" }}>Cancel</button>
              <button onClick={() => deleteItem(deleteConfirm)} className="flex-1 py-2 text-sm font-semibold rounded" style={{ background: "#dc2626", color: "#fff" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
