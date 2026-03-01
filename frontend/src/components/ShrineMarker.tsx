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
          border: `2px solid ${isActive ? "#00c8ff" : "#00c8a0"}`,
          background: isActive ? "rgba(0,200,255,0.12)" : "rgba(0,30,40,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 24, color: isActive ? "#00c8ff" : "#00c8a0" }}
        >
          {icon}
        </span>
      </div>
      <span
        className="whitespace-nowrap text-center"
        style={{ fontSize: 10, color: isActive ? "#00c8ff" : "#6ee7d4", marginTop: 6 }}
      >
        {nameEn}
      </span>
    </button>
  );
}
