import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "₹499",
    period: "/mo",
    items: "Up to 500 items",
    features: ["1 user", "Basic reports", "Email alerts", "Mobile app"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹1,199",
    period: "/mo",
    items: "Up to 5,000 items",
    features: ["5 users", "Advanced analytics", "SMS + email alerts", "Barcode scanning", "Export to Excel"],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    price: "₹2,999",
    period: "/mo",
    items: "Unlimited items",
    features: ["Unlimited users", "Custom reports", "API access", "Priority support", "Multi-branch"],
  },
];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    shop: "",
    category: "",
    password: "",
  });
  const [plan, setPlan] = useState("pro");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateStep1() {
    const e: Record<string, string> = {};
    if (!form.name) e.name = "Full name is required";
    if (!form.email && !form.phone) e.email = "Email or phone required";
    if (!form.shop) e.shop = "Shop name is required";
    if (!form.password || form.password.length < 8) e.password = "Password must be 8+ characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === 1 && !validateStep1()) return;
    setStep((s) => s + 1);
  }

  const stepLabels = ["Account", "Shop", "Plan", "Done"];

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-80 p-10 shrink-0"
        style={{ background: "var(--primary)" }}
      >
        <div>
          <div className="flex items-center gap-2 mb-12">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
              style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
            >
              SP
            </div>
            <span className="text-lg font-bold tracking-tight text-white" style={{ fontFamily: "Outfit" }}>
              StockPilot
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "Outfit" }}>
            Manage your inventory with confidence.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            Trusted by 2,400+ shop owners across India. Real-time stock tracking, smart alerts, and seamless sales — all in one place.
          </p>
          <div className="mt-10 space-y-4">
            {["Live stock updates", "Barcode scanning", "Low-stock alerts", "Sales & receipts", "GST-ready reports"].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#f59e0b" }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4L3 6L7 2" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "#cbd5e1" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs" style={{ color: "#475569" }}>
          © 2026 StockPilot Technologies Pvt. Ltd.
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Steps */}
        <div className="w-full max-w-md mb-8">
          <div className="flex items-center gap-0">
            {stepLabels.map((label, i) => {
              const idx = i + 1;
              const done = idx < step;
              const active = idx === step;
              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                      style={{
                        background: done ? "#10b981" : active ? "var(--accent)" : "var(--border)",
                        color: done || active ? "#0f172a" : "var(--muted-foreground)",
                      }}
                    >
                      {done ? "✓" : idx}
                    </div>
                    <span className="text-xs" style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}>
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div
                      className="flex-1 h-px mx-2 mb-4"
                      style={{ background: done ? "#10b981" : "var(--border)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Account */}
        {step === 1 && (
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Outfit" }}>Create your account</h1>
            <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>Get started in under 2 minutes.</p>
            <div className="space-y-4">
              <Field label="Full name" error={errors.name}>
                <input
                  className="w-full px-3 py-2.5 text-sm rounded border outline-none focus:ring-2"
                  style={{ border: errors.name ? "1px solid #ef4444" : "1px solid var(--border)", background: "var(--card)" }}
                  placeholder="Rajesh Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label="Email address" error={errors.email}>
                <input
                  className="w-full px-3 py-2.5 text-sm rounded border outline-none"
                  style={{ border: "1px solid var(--border)", background: "var(--card)" }}
                  placeholder="rajesh@example.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
              <Field label="Mobile number">
                <input
                  className="w-full px-3 py-2.5 text-sm rounded border outline-none"
                  style={{ border: "1px solid var(--border)", background: "var(--card)" }}
                  placeholder="+91 98765 43210"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </Field>
              <Field label="Shop name" error={errors.shop}>
                <input
                  className="w-full px-3 py-2.5 text-sm rounded border outline-none"
                  style={{ border: errors.shop ? "1px solid #ef4444" : "1px solid var(--border)", background: "var(--card)" }}
                  placeholder="Sharma Auto Parts"
                  value={form.shop}
                  onChange={(e) => setForm({ ...form, shop: e.target.value })}
                />
              </Field>
              <Field label="Business category">
                <select
                  className="w-full px-3 py-2.5 text-sm rounded border outline-none"
                  style={{ border: "1px solid var(--border)", background: "var(--card)" }}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  <option>Auto Parts</option>
                  <option>Hardware & Tools</option>
                  <option>Grocery / Kirana</option>
                  <option>Furniture</option>
                  <option>Electronics</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Password" error={errors.password}>
                <input
                  className="w-full px-3 py-2.5 text-sm rounded border outline-none"
                  style={{ border: errors.password ? "1px solid #ef4444" : "1px solid var(--border)", background: "var(--card)" }}
                  placeholder="Min. 8 characters"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </Field>
            </div>
            <button
              onClick={handleNext}
              className="w-full mt-6 py-2.5 rounded text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Continue →
            </button>
            <p className="text-xs text-center mt-4" style={{ color: "var(--muted-foreground)" }}>
              Already have an account? <span className="underline cursor-pointer" style={{ color: "var(--accent)" }}>Sign in</span>
            </p>
          </div>
        )}

        {/* Step 2: Shop setup */}
        {step === 2 && (
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Outfit" }}>Set up your shop</h1>
            <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>Tell us a bit more about your business.</p>
            <div className="space-y-4">
              <Field label="GST number (optional)">
                <input className="w-full px-3 py-2.5 text-sm rounded border" style={{ border: "1px solid var(--border)", background: "var(--card)" }} placeholder="27AAECS1234A1Z5" />
              </Field>
              <Field label="Address">
                <textarea className="w-full px-3 py-2.5 text-sm rounded border resize-none" style={{ border: "1px solid var(--border)", background: "var(--card)" }} rows={2} placeholder="Shop #12, Station Road, Pune - 411001" />
              </Field>
              <Field label="Currency">
                <select className="w-full px-3 py-2.5 text-sm rounded border" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
                  <option>INR — Indian Rupee (₹)</option>
                  <option>USD — US Dollar ($)</option>
                  <option>AED — UAE Dirham (د.إ)</option>
                </select>
              </Field>
              <Field label="Low-stock threshold (default units)">
                <input className="w-full px-3 py-2.5 text-sm rounded border font-mono" style={{ border: "1px solid var(--border)", background: "var(--card)" }} defaultValue="10" type="number" min="1" />
              </Field>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="flex-1 py-2.5 rounded text-sm font-medium border" style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}>
                ← Back
              </button>
              <button onClick={handleNext} className="flex-1 py-2.5 rounded text-sm font-semibold" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Plan */}
        {step === 3 && (
          <div className="w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-1 text-center" style={{ fontFamily: "Outfit" }}>Choose your plan</h1>
            <p className="text-sm text-center mb-6" style={{ color: "var(--muted-foreground)" }}>14-day free trial on all plans. No card required.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className="text-left p-5 rounded-lg border-2 transition-all relative"
                  style={{
                    border: plan === p.id ? "2px solid var(--accent)" : "2px solid var(--border)",
                    background: "var(--card)",
                    boxShadow: plan === p.id ? "0 0 0 3px rgba(245,158,11,0.12)" : "none",
                  }}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                      Most popular
                    </div>
                  )}
                  <div className="font-bold text-base mb-0.5" style={{ fontFamily: "Outfit" }}>{p.name}</div>
                  <div className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>{p.items}</div>
                  <div className="flex items-baseline gap-0.5 mb-3">
                    <span className="text-2xl font-bold font-mono" style={{ fontFamily: "Outfit" }}>{p.price}</span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.period}</span>
                  </div>
                  <div className="space-y-1.5">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
                        <div className="w-3 h-3 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                          <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M1 3L2.5 4.5L5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="flex-1 py-2.5 rounded text-sm font-medium border" style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}>
                ← Back
              </button>
              <button onClick={handleNext} className="flex-1 py-2.5 rounded text-sm font-semibold" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                Start Free Trial →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Done */}
        {step === 4 && (
          <div className="w-full max-w-md text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(16,185,129,0.12)" }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#10b981" fillOpacity="0.2" />
                <path d="M10 16L14 20L22 12" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Outfit" }}>You're all set, Rajesh!</h1>
            <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
              Your StockPilot account is ready. Your 14-day Pro trial has started. Add your first items and start tracking.
            </p>
            <div className="p-4 rounded-lg mb-6 text-left space-y-2" style={{ background: "var(--secondary)" }}>
              <div className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>QUICK CHECKLIST</div>
              {["Add your first inventory items", "Set low-stock thresholds", "Invite team members", "Configure your receipt header"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded border" style={{ border: "1.5px solid var(--border)" }} />
                  {t}
                </div>
              ))}
            </div>
            <button
              onClick={onComplete}
              className="w-full py-3 rounded text-sm font-semibold"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Go to Dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--foreground)" }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{error}</p>}
    </div>
  );
}
