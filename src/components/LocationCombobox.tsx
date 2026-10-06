"use client";

import { useTranslations } from "next-intl";
import { type KeyboardEvent, useEffect, useId, useMemo, useState } from "react";
import {
  getDepartementCode,
  type IndexedLocation,
  loadLocations,
  type Location,
  searchLocations,
} from "@/lib/locations";

interface LocationComboboxProps {
  id: string;
  // Called with a location only once the user picks a suggestion
  onChange: (location: Location | null) => void;
}

const MIN_INPUT_LENGTH = 2;

const getOptionId = (listboxId: string, index: number) =>
  `${listboxId}-${index}`;

export const LocationCombobox = ({ id, onChange }: LocationComboboxProps) => {
  const t = useTranslations("SearchBox");
  const listboxId = useId();
  const [inputValue, setInputValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [locations, setLocations] = useState<IndexedLocation[] | null>(null);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const suggestions = useMemo(
    () =>
      locations && !selectedLocation
        ? searchLocations(locations, inputValue)
        : [],
    [locations, selectedLocation, inputValue],
  );

  const isListVisible =
    isOpen && !selectedLocation && inputValue.trim().length >= MIN_INPUT_LENGTH;

  // Focus stays in the input (aria-activedescendant), so the browser does not scroll
  // the list to the highlighted option by itself during keyboard navigation.
  useEffect(() => {
    if (activeIndex < 0) return;
    document
      .getElementById(getOptionId(listboxId, activeIndex))
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listboxId]);

  const ensureLocationsLoaded = () => {
    if (locations) return;
    setHasLoadError(false);
    loadLocations().then(setLocations, () => setHasLoadError(true));
  };

  const selectLocation = (location: Location) => {
    setSelectedLocation(location);
    setInputValue(location.libelle);
    setIsOpen(false);
    setActiveIndex(-1);
    onChange(location);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsOpen(true);
    setActiveIndex(-1);
    if (selectedLocation) {
      setSelectedLocation(null);
      onChange(null);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Enter":
        // While suggestions are shown, Enter only picks the highlighted one.
        if (!isListVisible) break;
        event.preventDefault();
        if (suggestions[activeIndex]) selectLocation(suggestions[activeIndex]);
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const renderStatus = () => {
    if (hasLoadError) return t("locationLoadError");
    if (!locations) return t("locationLoading");
    if (suggestions.length === 0) return t("locationNoResult");
    return null;
  };
  const status = isListVisible ? renderStatus() : null;

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={isListVisible}
        aria-controls={listboxId}
        aria-activedescendant={
          isListVisible && activeIndex >= 0
            ? getOptionId(listboxId, activeIndex)
            : undefined
        }
        placeholder={t("locationPlaceholder")}
        value={inputValue}
        onChange={(event) => handleInputChange(event.target.value)}
        onFocus={() => {
          ensureLocationsLoaded();
          setIsOpen(true);
        }}
        onBlur={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
        className="h-12 w-full border border-line bg-white px-[17px] text-[15px] text-brand outline-none placeholder:text-muted focus:border-brand"
      />
      <ul
        id={listboxId}
        role="listbox"
        hidden={!isListVisible}
        className="absolute inset-x-0 top-full z-20 mt-1 max-h-[300px] overflow-y-auto border border-line bg-white shadow-lg"
      >
        {status ? (
          <li className="px-[17px] py-3 text-[15px] text-muted">{status}</li>
        ) : (
          suggestions.map((location, index) => {
            const departementCode = getDepartementCode(location);
            return (
              <li
                key={`${location.type}-${location.code}`}
                id={getOptionId(listboxId, index)}
                role="option"
                aria-selected={index === activeIndex}
                // Keeps the focus in the input so that its blur does not close the list before the click.
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectLocation(location)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-[17px] py-3 text-[15px] text-brand ${index === activeIndex ? "bg-brand/5" : ""}`}
              >
                <span>
                  {location.libelle}
                  {departementCode && (
                    <span className="text-muted"> ({departementCode})</span>
                  )}
                </span>
                <span className="shrink-0 text-xs uppercase text-muted">
                  {t(`locationTypes.${location.type}`)}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
