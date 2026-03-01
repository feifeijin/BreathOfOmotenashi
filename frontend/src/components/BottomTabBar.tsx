'use client';

const TABS = [
  { id: "map", icon: "🗺", label: "Map" },
  { id: "shrines", icon: "⛩", label: "Shrines" },
  { id: "guide", icon: "✦", label: "Guide" },
  { id: "journal", icon: "📜", label: "Journal" },
  { id: "profile", icon: "👤", label: "Profile" },
];

export default function BottomTabBar() {
  return (
    <div
      className="flex items-center justify-around w-full"
      style={{
        height: 72,
        background: "#071018",
        borderTop: "1px solid #0d2535",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === "guide";
        return (
          <button
            key={tab.id}
            className="flex flex-col items-center justify-center gap-1"
            style={{ color: isActive ? "#00c8ff" : "#4a6070", flex: 1, height: "100%" }}
          >
            {isActive ? (
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 52,
                  height: 52,
                  background: "#0b1a2b",
                  border: "2px solid #1a3a4a",
                }}
              >
                <span style={{ fontSize: 22 }}>{tab.icon}</span>
              </div>
            ) : (
              <>
                <span style={{ fontSize: 22 }}>{tab.icon}</span>
                <span style={{ fontSize: 10 }}>{tab.label}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
