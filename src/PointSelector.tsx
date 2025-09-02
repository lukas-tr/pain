import React, { useRef, useState, useEffect } from "react";

type Point = { x: number; y: number };

type Props = {
  width?: number;
  height?: number;
  initialPoint?: Point; // normalized 0..1
  onChange?: (p: Point) => void;
  snapToGrid?: number | null; // integer divisions (e.g. 10 -> snap to 0.0,0.1,...,1.0)
  step?: number; // keyboard arrow step (normalized)
  showCoords?: boolean;
  gridLines?: number | null; // visual grid lines count
};

export default function PointSelector({
  width = 400,
  height = 400,
  initialPoint = { x: 0.5, y: 0.5 },
  onChange,
  snapToGrid = null,
  step = 0.01,
  showCoords = true,
  gridLines = 10,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pt, setPt] = useState<Point>(clampPoint(initialPoint));
  const dragging = useRef(false);

  useEffect(() => setPt(clampPoint(initialPoint)), [initialPoint.x, initialPoint.y]);

  function clamp(v: number) {
    return Math.max(0, Math.min(1, v));
  }
  function clampPoint(p: Point) {
    return { x: clamp(p.x), y: clamp(p.y) };
  }

  function applySnap(p: Point) {
    if (!snapToGrid || snapToGrid <= 0) return p;
    const s = snapToGrid;
    return { x: Math.round(p.x * s) / s, y: Math.round(p.y * s) / s };
  }

  function setPointFromClient(clientX: number, clientY: number) {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (clientX - r.left) / r.width;
    const y = (clientY - r.top) / r.height;
    const normalized = applySnap(clampPoint({ x, y }));
    setPt(normalized);
    onChange?.(normalized);
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragging.current = true;
    setPointFromClient(e.clientX, e.clientY);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    setPointFromClient(e.clientX, e.clientY);
  }
  function onPointerUp(e: React.PointerEvent) {
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
    dragging.current = false;
  }

  function onClick(e: React.MouseEvent) {
    setPointFromClient(e.clientX, e.clientY);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    let dx = 0,
      dy = 0;
    if (e.key === "ArrowLeft") dx = -step;
    if (e.key === "ArrowRight") dx = step;
    if (e.key === "ArrowUp") dy = -step;
    if (e.key === "ArrowDown") dy = step;
    if (dx || dy) {
      e.preventDefault();
      const next = applySnap(clampPoint({ x: pt.x + dx, y: pt.y + dy }));
      setPt(next);
      onChange?.(next);
    }
  }

  const cx = Math.round(pt.x * width);
  const cy = Math.round(pt.y * height);

  return (
    <div className="inline-block">
      <div
        ref={containerRef}
        role="application"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="select-none outline-none"
        style={{ width, height }}
      >
        <svg
          width={width}
          height={height}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onClick={onClick}
          className="rounded border border-gray-300 bg-white cursor-crosshair"
        >
          {/* grid */}
          {gridLines && gridLines > 0 && (
            <g strokeOpacity={0.6} strokeWidth={1} stroke="#e5e7eb">
              {Array.from({ length: gridLines + 1 }).map((_, i) => {
                const x = (i / gridLines) * width;
                const y = (i / gridLines) * height;
                return (
                  <g key={i}>
                    <line x1={x} y1={0} x2={x} y2={height} />
                    <line x1={0} y1={y} x2={width} y2={y} />
                  </g>
                );
              })}
            </g>
          )}

          {/* crosshair lines */}
          <line x1={cx} y1={0} x2={cx} y2={height} stroke="#111827" strokeOpacity={0.15} />
          <line x1={0} y1={cy} x2={width} y2={cy} stroke="#111827" strokeOpacity={0.15} />

          {/* point handle */}
          <g>
            <circle cx={cx} cy={cy} r={8} fill="#111827" fillOpacity={0.9} />
            <circle cx={cx} cy={cy} r={4} fill="#fff" />
          </g>
        </svg>
      </div>

      {showCoords && (
        <div className="mt-2 text-sm font-mono">
          <span>x: {pt.x.toFixed(3)}</span>
          <span className="ml-3">y: {pt.y.toFixed(3)}</span>
        </div>
      )}
    </div>
  );
}
