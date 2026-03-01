export default function MapControls() {
  const controls = [
    { icon: "add", color: "#7aa0b4" },
    { icon: "remove", color: "#7aa0b4" },
    { icon: "near_me", color: "#00c8ff" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {controls.map((ctrl) => (
        <button
          key={ctrl.icon}
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 42,
            height: 42,
            background: "rgba(7,16,24,0.9)",
            border: "1px solid #1a3a4a",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: ctrl.color }}>
            {ctrl.icon}
          </span>
        </button>
      ))}
    </div>
  );
}
