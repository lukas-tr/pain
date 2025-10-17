

import { useEffect, useRef, useState } from 'react';

export default function ElementSelector({ selectedElements, onSetSelectedElements }: { selectedElements: string[], onSetSelectedElements: (elements: string[]) => void }) {
  const ids = ['EARTH', 'WOOD', 'WATER', 'FIRE', 'METAL'];
  const elements = ids.map((id, i) => ({ id, angle: i * (360 / ids.length) }));

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState(120);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      // radius = half of min(width,height) * 0.45 to leave room for buttons
      const r = Math.min(rect.width, rect.height) * 0.45;
      setRadius(Math.max(60, Math.round(r)));
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={containerRef} className="relative" style={{ width: 320, height: 320 }}>
        {elements.map((el) => {
          // compute position from angle around circle radius
          const rad = (el.angle - 90) * (Math.PI / 180); // rotate so 0deg is at top
          const x = Math.round((Math.cos(rad) * radius));
          const y = Math.round((Math.sin(rad) * radius));

          return (
            <button
              key={el.id}
              onClick={() => {
                if (selectedElements.includes(el.id)) {
                  onSetSelectedElements(selectedElements.filter(e => e !== el.id));
                } else {
                  onSetSelectedElements([...selectedElements, el.id]);
                }
              }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center !rounded-[100%] ${selectedElements.includes(el.id) ? 'active' : ''}`}
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            >
              {el.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
