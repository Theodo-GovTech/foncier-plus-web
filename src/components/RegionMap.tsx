"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { type MouseEvent, useState } from "react";
import iconPlusSE from "@/assets/icon-plus-SE.svg";
import { franceMapViewBox, regions, type Region } from "@/data/regions";
import { buildFranceFoncierRegionSearchUrl } from "@/lib/franceFoncierUrls";

interface RegionMapProps {
  className?: string;
}

export const RegionMap = ({ className }: RegionMapProps) => {
  const t = useTranslations("Regions");
  const locale = useLocale();
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
      className={`relative ${className ?? ""}`}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setHoveredRegionId(null)}
    >
      <svg viewBox={franceMapViewBox} className="h-auto w-full">
        {regions.map((region) => (
          <a
            key={region.id}
            href={buildFranceFoncierRegionSearchUrl(region, locale)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(region.id)}
            className="group outline-none"
            onMouseEnter={() => setHoveredRegionId(region.id)}
            onMouseLeave={() => setHoveredRegionId(null)}
          >
            <path
              d={region.path}
              className="cursor-pointer outline-none transition-colors duration-150 group-focus-visible:fill-brand"
              fill={
                hoveredRegionId === region.id ? "var(--color-brand)" : "white"
              }
              stroke="var(--color-brand-accent)"
              strokeWidth={1.28}
            />
          </a>
        ))}
      </svg>
      {hoveredRegionId && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-xs border border-line bg-white px-5 py-4 shadow-lg"
          style={{ left: pointerPosition.x, top: pointerPosition.y }}
        >
          <Image
            src={iconPlusSE}
            alt=""
            className="absolute bottom-0 left-0 size-5 -translate-x-full translate-y-full"
          />
          <p className="text-lg font-bold whitespace-nowrap text-brand">
            {t(hoveredRegionId)}
          </p>
        </div>
      )}
    </div>
  );
};
