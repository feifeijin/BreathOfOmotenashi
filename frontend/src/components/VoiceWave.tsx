export default function VoiceWave({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[0.3, 0.6, 1, 0.7, 0.4].map((delay, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-[#00c8a0]"
          style={{
            height: "100%",
            animation: `voiceWave 0.8s ease-in-out ${delay * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
