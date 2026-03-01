'use client';

interface ShrineMarkerProps {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  x: number;
  y: number;
  isActive?: boolean;
  onClick: () => void;
}

export default function ShrineMarker({
  name,
  nameEn,
  icon,
  x,
  y,
  isActive,
  onClick,
}: ShrineMarkerProps) {
  return (
    <button
      onClick={onClick}
      className="absolute flex flex-col items-center"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
      aria-label={name}
    >
      <div
        className={isActive ? "marker-pulse-active" : "marker-pulse"}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "2px solid #00c8a0",
          background: "rgba(0,30,40,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 22 }}>{icon}</span>
      </div>
      <span
        className="whitespace-nowrap text-center"
        style={{ fontSize: 10, color: "#6ee7d4", marginTop: 6 }}
      >
        {nameEn}
      </span>
      {isActive && (
        <span style={{ fontSize: 8, color: "#00c8a0", marginTop: 2 }}>●</span>
      )}
    </button>
  );
}
