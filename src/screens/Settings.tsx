import { useState } from "react";

export default function Settings() {
  const [tab, setTab] = useState<"shop" | "users" | "receipt" | "integrations">("shop");
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold" style={{ fontFamily: "Outfit" }}>Settings</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Manage your shop and account preferences</p>
      </div>

      <div className="flex gap-4">
        {/* Sidebar tabs */}
        <div className="w-44 shrink-0 space-y-0.5">
          {(["shop", "users", "receipt", "integrations"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="w-full text-left px-3 py-2.5 text-sm rounded font-medium transition-colors"
              style={{
                background: tab === t ? "var(--secondary)" : "transparent",
                color: tab === t ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              {t === "shop" ? "Shop Details" : t === "users" ? "Users & Roles" : t === "receipt" ? "Receipt Design" : "Integrations"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 rounded-lg border p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {tab === "shop" && (
            <div className="max-w-lg space-y-4">
              <h2 className="font-bold mb-4" style={{ fontFamily: "Outfit" }}>Shop Details</h2>
              <Field label="Shop name"><input className="field" defaultValue="Sharma Auto Parts" /></Field>
              <Field label="Owner name"><input className="field" defaultValue="Rajesh Sharma" /></Field>
              <Field label="GST number"><input className="field" defaultValue="27SHARM1234A1Z5" /></Field>
              <Field label="Address">
                <textarea className="field resize-none" rows={2} defaultValue="Shop #12, Station Road, Pune - 411001" />
              </Field>
              <Field label="Phone">
                <input className="field" defaultValue="+91 98765 43210" type="tel" />
              </Field>
              <Field label="Email">
                <input className="field" defaultValue="rajesh@sharmaparts.in" type="email" />
              </Field>
              <Field label="Currency">
                <select className="field">
                  <option>INR — Indian Rupee (₹)</option>
                  <option>USD — US Dollar ($)</option>
                </select>
              </Field>
              <Field label="Default low-stock threshold (units)">
                <input className="field font-mono" type="number" defaultValue={10} />
              </Field>
              <SaveBtn saved={saved} onClick={save} />
            </div>
          )}

          {tab === "users" && (
            <div className="max-w-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold" style={{ fontFamily: "Outfit" }}>Users & Roles</h2>
                <button className="px-3 py-1.5 text-xs font-semibold rounded" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                  + Invite User
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Rajesh Sharma", email: "rajesh@sharmaparts.in", role: "Owner", joined: "Jan 2026" },
                  { name: "Priya Deshpande", email: "priya@sharmaparts.in", role: "Manager", joined: "Mar 2026" },
                  { name: "Suresh Kumar", email: "suresh@sharmaparts.in", role: "Staff", joined: "Aug 2026" },
                ].map((u) => (
                  <div key={u.email} className="flex items-center justify-between p-3 rounded border" style={{ border: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--secondary)", color: "var(--secondary-foreground)" }}>
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{u.name}</div>
                        <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{u.email} · Since {u.joined}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--secondary)", color: "var(--secondary-foreground)" }}>{u.role}</span>
                      {u.role !== "Owner" && (
                        <button className="text-xs" style={{ color: "#dc2626" }}>Remove</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "receipt" && (
            <div className="max-w-lg">
              <h2 className="font-bold mb-4" style={{ fontFamily: "Outfit" }}>Receipt Design</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <Field label="Receipt header line 1"><input className="field" defaultValue="Sharma Auto Parts" /></Field>
                </div>
                <div className="col-span-2">
                  <Field label="Receipt header line 2"><input className="field" defaultValue="Station Road, Pune · GST: 27SHARM1234A1Z5" /></Field>
                </div>
                <Field label="Footer message"><input className="field" defaultValue="Thank you for your business!" /></Field>
                <Field label="Receipt prefix">
                  <input className="field font-mono" defaultValue="RCP-" />
                </Field>
              </div>
              <div className="p-4 rounded-lg border text-center text-xs" style={{ border: "1px solid var(--border)", background: "var(--secondary)" }}>
                <div className="font-bold text-sm mb-0.5">Sharma Auto Parts</div>
                <div style={{ color: "var(--muted-foreground)" }}>Station Road, Pune · GST: 27SHARM1234A1Z5</div>
                <div className="border-t border-b my-2 py-2" style={{ borderColor: "var(--border)" }}>
                  <div className="flex justify-between"><span>Bosch Spark Plug × 2</span><span className="font-mono">₹300</span></div>
                </div>
                <div className="flex justify-between font-bold"><span>Total</span><span className="font-mono">₹300</span></div>
                <div className="mt-2" style={{ color: "var(--muted-foreground)" }}>Thank you for your business!</div>
              </div>
              <div className="mt-4">
                <SaveBtn saved={saved} onClick={save} />
              </div>
            </div>
          )}

          {tab === "integrations" && (
            <div className="max-w-lg">
              <h2 className="font-bold mb-4" style={{ fontFamily: "Outfit" }}>Integrations</h2>
              <div className="space-y-3">
                {[
                  { name: "WhatsApp Business", desc: "Send receipts and low-stock alerts via WhatsApp", connected: true, icon: "💬" },
                  { name: "Google Sheets", desc: "Auto-sync inventory and sales data to a spreadsheet", connected: false, icon: "📊" },
                  { name: "Tally ERP", desc: "Export sales data in Tally-compatible format", connected: false, icon: "📒" },
                  { name: "Zoho Books", desc: "Sync invoices and purchase orders", connected: false, icon: "📦" },
                  { name: "SMS Gateway", desc: "Send OTPs and order alerts via SMS", connected: true, icon: "📱" },
                ].map((i) => (
                  <div key={i.name} className="flex items-center justify-between p-4 rounded-lg border" style={{ border: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{i.icon}</div>
                      <div>
                        <div className="text-sm font-medium">{i.name}</div>
                        <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{i.desc}</div>
                      </div>
                    </div>
                    <button
                      className="text-xs px-3 py-1.5 rounded font-semibold"
                      style={{
                        background: i.connected ? "rgba(16,185,129,0.1)" : "var(--primary)",
                        color: i.connected ? "#10b981" : "var(--primary-foreground)",
                        border: i.connected ? "1px solid rgba(16,185,129,0.3)" : "none",
                      }}
                    >
                      {i.connected ? "✓ Connected" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5">{label}</label>
      <style>{`.field { width: 100%; padding: 8px 12px; font-size: 14px; border-radius: 6px; border: 1px solid var(--border); background: var(--background); outline: none; font-family: Inter, sans-serif; }`}</style>
      {children}
    </div>
  );
}

function SaveBtn({ saved, onClick }: { saved: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 text-sm font-semibold rounded transition-colors"
      style={{ background: saved ? "#10b981" : "var(--primary)", color: "var(--primary-foreground)" }}
    >
      {saved ? "✓ Saved!" : "Save Changes"}
    </button>
  );
}
