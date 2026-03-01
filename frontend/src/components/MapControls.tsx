export default function MapControls() {
  return (
    <div className="flex flex-col gap-2">
      {["+", "−", "⊕"].map((icon) => (
        <button
          key={icon}
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 42,
            height: 42,
            background: "rgba(7,16,24,0.9)",
            border: "1px solid #1a3a4a",
            color: "#7aa0b4",
            fontSize: 18,
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
