"use client";

import { useLocale, useTranslations } from "next-intl";
import { type ReactNode, useId, useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import { LocationCombobox } from "@/components/LocationCombobox";
import { Toggle } from "@/components/Toggle";
import { CaretDownIcon } from "@/components/icons/CaretDownIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { Link } from "@/i18n/navigation";
import { buildSearchHref } from "@/lib/franceFoncierUrls";
import {
  acquisitionTypes,
  availabilities,
  defaultSearchFilters,
  destinations,
  offerTypes,
  type SearchFilters,
  type SurfaceUnit,
  surfaceUnits,
  toFranceFoncierQuery,
  toggleValue,
} from "@/lib/searchFilters";

const fieldLabelClassName =
  "mb-2 block text-xs text-brand uppercase font-medium";
const fieldFrameClassName =
  "flex h-12 items-center gap-6 border border-line px-[17px]";

const CheckboxGroup = ({
  legend,
  children,
  className = "",
}: {
  legend: string;
  children: ReactNode;
  className?: string;
}) => (
  <fieldset className={className}>
    <legend className={fieldLabelClassName}>{legend}</legend>
    {children}
  </fieldset>
);

export const SearchBox = () => {
  const t = useTranslations("SearchBox");
  const locale = useLocale();
  const locationInputId = useId();
  const surfaceInputId = useId();
  const advancedFiltersId = useId();
  const [filters, setFilters] = useState(defaultSearchFilters);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  // Remounts the location field on reset, as it owns the text typed by the user.
  const [resetCount, setResetCount] = useState(0);

  const updateFilters = (update: Partial<SearchFilters>) =>
    setFilters((current) => ({ ...current, ...update }));

  const handleReset = () => {
    setFilters(defaultSearchFilters);
    setIsAdvancedFiltersOpen(false);
    setResetCount((count) => count + 1);
  };

  const searchHref = buildSearchHref(toFranceFoncierQuery(filters, locale));

  return (
    <div
      role="search"
      aria-label={t("ariaLabel")}
      className="mt-12 bg-white p-5 text-brand shadow-[0px_4px_12px_rgba(0,0,0,0.06)] lg:w-fit"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="lg:min-w-[299px] lg:flex-1">
          <label htmlFor={locationInputId} className={fieldLabelClassName}>
            {t("locationLabel")}
          </label>
          <LocationCombobox
            key={resetCount}
            id={locationInputId}
            onChange={(location) => updateFilters({ location })}
          />
        </div>
        <CheckboxGroup legend={t("acquisitionTypeLabel")}>
          <div className={fieldFrameClassName}>
            {acquisitionTypes.map((acquisitionType) => (
              <Checkbox
                key={acquisitionType}
                label={t(`acquisitionTypes.${acquisitionType}`)}
                checked={filters.acquisitionTypes.includes(acquisitionType)}
                onChange={() =>
                  updateFilters({
                    acquisitionTypes: toggleValue(
                      filters.acquisitionTypes,
                      acquisitionType,
                    ),
                  })
                }
              />
            ))}
          </div>
        </CheckboxGroup>
        <CheckboxGroup legend={t("labelLabel")} className="lg:w-[220px]">
          <div className={fieldFrameClassName}>
            <Toggle
              label={t("readyToUseSite")}
              checked={filters.readyToUseSite}
              onChange={() =>
                updateFilters({ readyToUseSite: !filters.readyToUseSite })
              }
            />
          </div>
        </CheckboxGroup>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
        <div className="flex flex-col gap-4 lg:flex-1 lg:flex-row lg:items-end">
          <CheckboxGroup legend={t("offerTypeLabel")}>
            <div className={fieldFrameClassName}>
              {offerTypes.map((offerType) => (
                <Checkbox
                  key={offerType}
                  label={t(`offerTypes.${offerType}`)}
                  checked={filters.offerTypes.includes(offerType)}
                  onChange={() =>
                    updateFilters({
                      offerTypes: toggleValue(filters.offerTypes, offerType),
                    })
                  }
                />
              ))}
            </div>
          </CheckboxGroup>
          <div>
            <label htmlFor={surfaceInputId} className={fieldLabelClassName}>
              {t("surfaceLabel")}
            </label>
            <div className="flex h-12 items-center border border-line focus-within:border-brand lg:w-[168px]">
              <input
                id={surfaceInputId}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="0"
                value={filters.surface.value}
                onChange={(event) =>
                  updateFilters({
                    surface: { ...filters.surface, value: event.target.value },
                  })
                }
                className="h-full w-full min-w-0 bg-transparent px-[17px] text-[15px] text-brand outline-none [appearance:textfield] placeholder:text-muted [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span aria-hidden className="h-6 w-px shrink-0 bg-line" />
              <div className="relative h-full shrink-0">
                <select
                  aria-label={t("surfaceUnitLabel")}
                  value={filters.surface.unit}
                  onChange={(event) =>
                    updateFilters({
                      surface: {
                        ...filters.surface,
                        unit: event.target.value as SurfaceUnit,
                      },
                    })
                  }
                  className="h-full cursor-pointer appearance-none bg-transparent pr-9 pl-2 text-[15px] text-brand outline-none"
                >
                  {surfaceUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {t(`surfaceUnits.${unit}`)}
                    </option>
                  ))}
                </select>
                <CaretDownIcon className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted" />
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-expanded={isAdvancedFiltersOpen}
              aria-controls={advancedFiltersId}
              onClick={() => setIsAdvancedFiltersOpen((isOpen) => !isOpen)}
              className="flex h-12 items-center justify-center gap-2 border border-brand px-4 text-[15px] font-semibold whitespace-nowrap transition-colors hover:bg-brand/5"
            >
              {t("advancedFilters")}
              <CaretDownIcon
                className={`transition-transform ${isAdvancedFiltersOpen ? "rotate-180" : ""}`}
              />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="h-12 px-4 text-[15px] font-semibold whitespace-nowrap transition-colors hover:bg-brand/5"
            >
              {t("reset")}
            </button>
          </div>
        </div>
        <Link
          href={searchHref}
          className="flex h-12 items-center justify-center gap-2 bg-brand-accent px-4 text-[15px] font-semibold text-white transition-colors hover:bg-brand-accent-hover lg:w-[201px]"
        >
          {t("search")}
          <SearchIcon width={20} height={20} />
        </Link>
      </div>

      <div
        id={advancedFiltersId}
        hidden={!isAdvancedFiltersOpen}
        className="mt-6 border-t border-line pt-4"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          <CheckboxGroup legend={t("availabilityLabel")} className="lg:flex-1">
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 border border-line px-[17px] py-3 sm:grid-cols-2">
              {availabilities.map((availability) => (
                <Checkbox
                  key={availability}
                  label={t(`availabilities.${availability}`)}
                  checked={filters.availabilities.includes(availability)}
                  onChange={() =>
                    updateFilters({
                      availabilities: toggleValue(
                        filters.availabilities,
                        availability,
                      ),
                    })
                  }
                />
              ))}
            </div>
          </CheckboxGroup>
          <CheckboxGroup legend={t("destinationLabel")} className="lg:flex-1">
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 border border-line px-[17px] py-3 sm:grid-cols-2">
              {destinations.map((destination) => (
                <Checkbox
                  key={destination}
                  label={t(`destinations.${destination}`)}
                  checked={filters.destinations.includes(destination)}
                  onChange={() =>
                    updateFilters({
                      destinations: toggleValue(
                        filters.destinations,
                        destination,
                      ),
                    })
                  }
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>
      </div>
    </div>
  );
};
