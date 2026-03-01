'use client';

import ShrineVoiceGuide from '@/components/ShrineVoiceGuide';

interface Shrine {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  x: number;
  y: number;
}

interface Props {
  shrine: Shrine | null;
  onClose: () => void;
}

const DESCRIPTIONS: Record<string, string> = {
  "fushimi-inari": "千本鳥居で知られる稲荷大社。商売繁盛・五穀豊穣の神、稲荷大神を祀る。",
  "arashiyama": "竹林と嵐山渡月橋で有名な景勝地。野宮神社・天龍寺が鎮座する。",
  "kinkakuji": "金箔に覆われた舎利殿が鏡湖池に映える、世界遺産の禅寺。",
  "kiyomizudera": "清水の舞台から京都市内を一望できる、奈良時代創建の古刹。",
  "heian-jingu": "明治時代に創建された、平安京遷都を記念する大神宮。",
};

export default function ShrineBottomSheet({ shrine, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      {shrine && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.5)" }}
        />
      )}

      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
          shrine ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxWidth: 430, marginLeft: "auto", marginRight: "auto" }}
      >
        <div
          style={{
            background: "#071018",
            borderRadius: "24px 24px 0 0",
            borderTop: "2px solid rgba(0,200,160,0.3)",
          }}
        >
          {/* Drag Handle */}
          <div className="flex justify-center pt-3">
            <div
              style={{
                width: 40,
                height: 4,
                borderRadius: 999,
                background: "#1a3a4a",
              }}
            />
          </div>

          {shrine && (
            <>
              {/* Shrine Name */}
              <div className="mt-4 px-6">
                <h2 className="font-bold" style={{ fontSize: 24, color: "#00c8a0" }}>
                  {shrine.name}
                </h2>
                <p style={{ fontSize: 13, color: "#4a7080", marginTop: 2 }}>
                  {shrine.nameEn}
                </p>
              </div>

              {/* Description */}
              <p
                className="mt-3 px-6"
                style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.7 }}
              >
                {DESCRIPTIONS[shrine.id] ?? ""}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: "#1a3a4a",
                  marginTop: 16,
                  marginLeft: 24,
                  marginRight: 24,
                }}
              />

              {/* Voice Guide */}
              <div className="px-6 py-4">
                <ShrineVoiceGuide shrineId={shrine.id} shrineName={shrine.name} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
