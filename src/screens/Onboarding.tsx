import { useState } from "react";
import { authService } from "../services/authService";

interface OnboardingProps {
  onComplete: (userData: any, token: string) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<"choice" | "login" | "register">("choice");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Register state
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    businessName: "",
    phoneNumber: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(loginData.email, loginData.password);
      if (response.success) {
        onComplete(response.user, response.token);
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register(
        registerData.username,
        registerData.email,
        registerData.password,
        registerData.firstName,
        registerData.lastName,
        registerData.businessName,
        registerData.phoneNumber
      );
      if (response.success) {
        onComplete(response.user, response.token);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Left side - Branding */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12"
        style={{ background: "linear-gradient(135deg, var(--accent) 0%, #1e40af 100%)" }}
      >
        <div className="text-center">
          <div className="text-6xl mb-6">📦</div>
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>
            StockPilot
          </h1>
          <p className="text-xl text-white/80 mb-8">Inventory & Sales Management</p>
          <div className="space-y-4 text-white/70">
            <div className="flex items-center gap-3">
              <span>✓</span>
              <span>Real-time inventory tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <span>✓</span>
              <span>Point of sale system</span>
            </div>
            <div className="flex items-center gap-3">
              <span>✓</span>
              <span>Sales analytics & reports</span>
            </div>
            <div className="flex items-center gap-3">
              <span>✓</span>
              <span>Low-stock alerts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
        <div className="max-w-md w-full mx-auto">
          {step === "choice" && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "Outfit" }}>
                Welcome to StockPilot
              </h2>
              <p className="mb-8" style={{ color: "var(--muted-foreground)" }}>
                Choose an option to get started
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setStep("login");
                    setError(null);
                  }}
                  className="w-full py-3 rounded font-semibold transition-colors"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setStep("register");
                    setError(null);
                  }}
                  className="w-full py-3 rounded font-semibold border"
                  style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                >
                  Create Account
                </button>
              </div>
            </div>
          )}

          {step === "login" && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "Outfit" }}>
                  Sign In
                </h2>
                <p style={{ color: "var(--muted-foreground)" }}>Enter your credentials</p>
              </div>

              {error && (
                <div className="p-4 rounded" style={{ background: "rgba(220, 38, 38, 0.1)", color: "#dc2626" }}>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: "var(--border)", background: "var(--background)" }}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: "var(--border)", background: "var(--background)" }}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded font-semibold transition-opacity"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("choice");
                  setLoginData({ email: "", password: "" });
                  setError(null);
                }}
                className="w-full text-sm"
                style={{ color: "var(--accent)" }}
              >
                Back
              </button>
            </form>
          )}

          {step === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "Outfit" }}>
                  Create Account
                </h2>
                <p style={{ color: "var(--muted-foreground)" }}>Fill in your details</p>
              </div>

              {error && (
                <div className="p-4 rounded" style={{ background: "rgba(220, 38, 38, 0.1)", color: "#dc2626" }}>
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={registerData.firstName}
                    onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                    className="w-full px-3 py-2 rounded border text-sm"
                    style={{ borderColor: "var(--border)", background: "var(--background)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    className="w-full px-3 py-2 rounded border text-sm"
                    style={{ borderColor: "var(--border)", background: "var(--background)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                  className="w-full px-3 py-2 rounded border text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--background)" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  value={registerData.businessName}
                  onChange={(e) => setRegisterData({ ...registerData, businessName: e.target.value })}
                  className="w-full px-3 py-2 rounded border text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--background)" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded border text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--background)" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Phone (Optional)</label>
                <input
                  type="tel"
                  value={registerData.phoneNumber}
                  onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded border text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--background)" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-3 py-2 rounded border text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--background)" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 rounded border text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--background)" }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded font-semibold transition-opacity text-sm"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("choice");
                  setRegisterData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    firstName: "",
                    lastName: "",
                    businessName: "",
                    phoneNumber: "",
                  });
                  setError(null);
                }}
                className="w-full text-sm"
                style={{ color: "var(--accent)" }}
              >
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
