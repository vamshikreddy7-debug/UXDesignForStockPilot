import React from "react";
import type { Screen } from "../App";

const nav: { id: string; label: string; icon: ({ size }: { size: number }) => React.ReactElement; badge?: number }[] = [
  { id: "dashboard", label: "Dashboard", icon: GridIcon },
  { id: "inventory", label: "Inventory", icon: BoxIcon },
  { id: "sales", label: "Sales", icon: ReceiptIcon },
  { id: "alerts", label: "Alerts", icon: BellIcon, badge: 3 },
  { id: "reports", label: "Reports", icon: ChartIcon },
  { id: "billing", label: "Billing", icon: CardIcon },
  { id: "settings", label: "Settings", icon: GearIcon },
];

export default function Sidebar({
  current,
  onNavigate,
}: {
  current: Screen;
  onNavigate: (s: Screen) => void;
}) {
  return (
    <aside
      className="w-56 flex flex-col border-r shrink-0 h-screen"
      style={{ background: "var(--primary)", borderColor: "#0f1e30" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "#0f1e30" }}>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            SP
          </div>
          <span
            className="text-base font-bold tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif", color: "#f8fafc" }}
          >
            StockPilot
          </span>
        </div>
        <div className="mt-1 text-xs" style={{ color: "#64748b" }}>
          Sharma Auto Parts
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ id, label, icon: Icon, badge }) => {
          const active = current === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id as Screen)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-all text-left"
              style={{
                background: active ? "rgba(245,158,11,0.15)" : "transparent",
                color: active ? "#f59e0b" : "#94a3b8",
                borderLeft: active ? "2px solid #f59e0b" : "2px solid transparent",
              }}
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {badge && !active && (
                <span
                  className="text-xs rounded-full px-1.5 py-0.5 font-mono font-medium"
                  style={{ background: "#dc2626", color: "#fff", fontSize: "10px" }}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "#0f1e30" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "#334155", color: "#94a3b8" }}
          >
            RS
          </div>
          <div>
            <div className="text-xs font-medium" style={{ color: "#e2e8f0" }}>
              Rajesh Sharma
            </div>
            <div className="text-xs" style={{ color: "#475569" }}>
              Owner · Pro Plan
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function GridIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}
function BoxIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" />
      <path d="M8 1V15M2 4.5L8 8L14 4.5" />
    </svg>
  );
}
function ReceiptIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 1H13V15L11 13.5L9 15L7 13.5L5 15L3 13.5V1Z" />
      <path d="M6 5H10M6 8H10M6 11H8" strokeLinecap="round" />
    </svg>
  );
}
function BellIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1C5.8 1 4 2.8 4 5V9L2 11H14L12 9V5C12 2.8 10.2 1 8 1Z" />
      <path d="M6.5 13C6.5 13.83 7.17 14.5 8 14.5C8.83 14.5 9.5 13.83 9.5 13" />
    </svg>
  );
}
function ChartIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="9" width="3" height="6" />
      <rect x="6" y="5" width="3" height="10" />
      <rect x="11" y="2" width="3" height="13" />
      <path d="M1 1H15" strokeLinecap="round" />
    </svg>
  );
}
function CardIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 7H15" />
      <rect x="3" y="9" width="4" height="2" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function GearIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1V3M8 13V15M1 8H3M13 8H15M2.93 2.93L4.34 4.34M11.66 11.66L13.07 13.07M13.07 2.93L11.66 4.34M4.34 11.66L2.93 13.07" strokeLinecap="round" />
    </svg>
  );
}
