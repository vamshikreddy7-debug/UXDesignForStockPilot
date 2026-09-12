import { useState } from "react";
import Onboarding from "./screens/Onboarding";
import Dashboard from "./screens/Dashboard";
import Inventory from "./screens/Inventory";
import Sales from "./screens/Sales";
import Alerts from "./screens/Alerts";
import Reports from "./screens/Reports";
import Settings from "./screens/Settings";
import Billing from "./screens/Billing";
import Sidebar from "./components/Sidebar";

export type Screen =
  | "onboarding"
  | "dashboard"
  | "inventory"
  | "sales"
  | "alerts"
  | "reports"
  | "settings"
  | "billing";

export default function App() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [onboarded, setOnboarded] = useState(false);

  if (!onboarded) {
    return <Onboarding onComplete={() => { setOnboarded(true); setScreen("dashboard"); }} />;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar current={screen} onNavigate={setScreen} />
      <main className="flex-1 overflow-y-auto">
        {screen === "dashboard" && <Dashboard onNavigate={setScreen} />}
        {screen === "inventory" && <Inventory />}
        {screen === "sales" && <Sales />}
        {screen === "alerts" && <Alerts />}
        {screen === "reports" && <Reports />}
        {screen === "settings" && <Settings />}
        {screen === "billing" && <Billing />}
      </main>
    </div>
  );
}
