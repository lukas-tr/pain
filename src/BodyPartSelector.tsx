
import React, { useEffect, useRef, useState } from "react";

type Props = {
  selectedBodyParts: string[];
  onSetSelectedBodyParts: (words: string[]) => void;
};

export default function BodyPartSelector({ selectedBodyParts, onSetSelectedBodyParts }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [points, setPoints] = useState<{ id: string; x: number; y: number }[]>([]);

  useEffect(() => {
    const parsed = selectedBodyParts
      .map((s, idx) => {
        const parts = s.split(";");
        if (parts.length !== 2) return null;
        const x = Number(parts[0]);
        const y = Number(parts[1]);
        if (Number.isFinite(x) && Number.isFinite(y)) {
          return { id: `${x}-${y}-${idx}`, x, y };
        }
        return null;
      })
      .filter(Boolean) as { id: string; x: number; y: number }[];
    setPoints(parsed);
  }, [selectedBodyParts]);

  const serialize = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x};${p.y}`);

  const handleImageClick: React.MouseEventHandler<HTMLImageElement> = (e) => {
    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    const nx = Math.max(0, Math.min(1, cx / rect.width));
    const ny = Math.max(0, Math.min(1, cy / rect.height));

    const newPoint = { id: `${nx}-${ny}-${Date.now()}`, x: nx, y: ny };
    const next = [...points, newPoint];
    setPoints(next);
    onSetSelectedBodyParts(serialize(next));
  };

  const handleRemove = (id: string) => {
    const next = points.filter((p) => p.id !== id);
    setPoints(next);
    onSetSelectedBodyParts(serialize(next));
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative max-w-[500px] w-full">
        <img
          ref={imgRef}
          loading="lazy"
          src="Human Body Diagram.jpeg"
          alt="body"
          className="w-full h-auto block"
          onClick={handleImageClick}
        />

        {points.map((p) => (
          <button
            key={p.id}
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(p.id);
            }}
            title={`Remove ${p.x.toFixed(2)};${p.y.toFixed(2)}`}
            style={{
              position: "absolute",
              left: `${p.x * 100}%`,
              top: `${p.y * 100}%`,
              transform: "translate(-50%,-50%)",
              zIndex: 10,
            }}
            className="!rounded-full w-6 h-6 flex items-center justify-center text-xs active"
            aria-label={`point-${p.id}`}
          >
            ×
          </button>
        ))}
      </div>
    </div>
  );
}
