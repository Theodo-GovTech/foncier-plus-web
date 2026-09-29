"use client";

import { useTranslations } from "next-intl";
import { type MouseEvent, useState } from "react";
import { franceMapViewBox, regions, type Region } from "@/data/regions";

interface RegionMapProps {
  className?: string;
  onRegionSelect?: (region: Region) => void;
}

export const RegionMap = ({ className, onRegionSelect }: RegionMapProps) => {
  const t = useTranslations("Regions");
  const [hoveredRegionId, setHoveredRegionId] = useState<Region["id"] | null>(
    null,
  );
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointerPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
  };

  return (
    <div
      className={`${className ?? ""}`}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setHoveredRegionId(null)}
    >
      <svg viewBox={franceMapViewBox} className="h-auto w-full">
        {regions.map((region) => (
          <path
            key={region.id}
            d={region.path}
            role="button"
            tabIndex={0}
            aria-label={t(region.id)}
            className="cursor-pointer outline-none transition-colors duration-150"
            fill={
              hoveredRegionId === region.id ? "var(--color-brand)" : "white"
            }
            stroke="var(--color-brand-accent)"
            strokeWidth={1.28}
            onMouseEnter={() => setHoveredRegionId(region.id)}
            onClick={() => onRegionSelect?.(region)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onRegionSelect?.(region);
              }
            }}
          />
        ))}
      </svg>
      {hoveredRegionId && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-xs border border-line bg-white px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-brand shadow-lg"
          style={{ left: pointerPosition.x, top: pointerPosition.y }}
        >
          {t(hoveredRegionId)}
        </div>
      )}
    </div>
  );
};
