export default function MapBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        backgroundColor: "#0b1a2b",
        backgroundImage: "radial-gradient(circle, #162a3a 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 430 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -20 120 C 80 110, 200 135, 280 120 S 380 100, 450 115"
          stroke="#00c8a0"
          strokeOpacity="0.07"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -20 220 C 60 240, 180 210, 300 230 S 400 215, 450 225"
          stroke="#00c8a0"
          strokeOpacity="0.07"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -20 340 C 100 320, 220 360, 320 340 S 420 325, 450 335"
          stroke="#00c8a0"
          strokeOpacity="0.07"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -20 460 C 70 480, 190 450, 290 470 S 390 455, 450 465"
          stroke="#00c8a0"
          strokeOpacity="0.07"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -20 570 C 90 555, 210 580, 310 565 S 410 550, 450 560"
          stroke="#00c8a0"
          strokeOpacity="0.07"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
