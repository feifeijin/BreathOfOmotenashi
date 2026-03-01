'use client';

const TABS = [
  { id: "map", icon: "map", label: "Map" },
  { id: "shrines", icon: "temple_hindu", label: "Shrines" },
  { id: "guide", icon: "auto_awesome", label: "Guide" },
  { id: "journal", icon: "history_edu", label: "Journal" },
  { id: "profile", icon: "account_circle", label: "Profile" },
];

export default function BottomTabBar() {
  return (
    <div
      className="flex items-end justify-around w-full"
      style={{
        height: 72,
        background: "#071018",
        borderTop: "1px solid #0d2535",
        paddingBottom: 8,
      }}
    >
      {TABS.map((tab) => {
        const isGuide = tab.id === "guide";
        const isActive = tab.id === "map";

        if (isGuide) {
          return (
            <button
              key={tab.id}
              className="flex flex-col items-center justify-center"
              style={{ flex: 1, marginTop: -24 }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  background: "#0b1a2b",
                  border: "2px solid #1a3a4a",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 26, color: "#00c8ff" }}>
                  {tab.icon}
                </span>
              </div>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            className="flex flex-col items-center justify-center gap-1"
            style={{ color: isActive ? "#00c8ff" : "#4a6070", flex: 1 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
              {tab.icon}
            </span>
            <span style={{ fontSize: 10 }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
