"use client";

import { type ReactNode, useState } from "react";
import { CaretDownIcon } from "@/components/icons/CaretDownIcon";

type NewsTimelineProps = {
  title: ReactNode;
  previousLabel: string;
  nextLabel: string;
  cards: ReactNode[];
};

const NEWS_PER_PAGE = 3;
const FIRST_PAGE = 0;

const buttonClassName =
  "flex size-11 cursor-pointer items-center justify-center border border-brand bg-white text-brand transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand not-aria-disabled:hover:bg-brand not-aria-disabled:hover:text-white aria-disabled:cursor-default aria-disabled:border-muted/30 aria-disabled:text-muted/40";

// The page fades out, then the next one fades in
const pageClassName =
  "col-start-1 row-start-1 grid grid-cols-3 gap-x-8 transition-opacity delay-200 duration-200 inert:opacity-0 inert:delay-0 motion-reduce:transition-none xl:gap-x-16";

export const NewsTimeline = ({
  title,
  previousLabel,
  nextLabel,
  cards,
}: NewsTimelineProps) => {
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const pages = Array.from(
    { length: Math.ceil(cards.length / NEWS_PER_PAGE) },
    (_, index) =>
      cards.slice(index * NEWS_PER_PAGE, (index + 1) * NEWS_PER_PAGE),
  );
  const lastPage = pages.length - 1;

  const goToPreviousPage = () =>
    setCurrentPage((page) => (page === FIRST_PAGE ? FIRST_PAGE : page - 1));

  const goToNextPage = () =>
    setCurrentPage((page) => (page === lastPage ? FIRST_PAGE : page + 1));

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-[28px] font-semibold text-brand">{title}</h2>
        {pages.length > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={previousLabel}
              aria-disabled={currentPage === FIRST_PAGE}
              onClick={goToPreviousPage}
              className={buttonClassName}
            >
              <CaretDownIcon aria-hidden="true" className="size-6 rotate-90" />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={goToNextPage}
              className={buttonClassName}
            >
              <CaretDownIcon aria-hidden="true" className="size-6 -rotate-90" />
            </button>
          </div>
        )}
      </div>
      {/* Pages share the same cell: the timeline keeps the height of the tallest one */}
      <div aria-live="polite" className="mt-11 grid">
        {pages.map((page, pageIndex) => (
          <ul
            key={pageIndex}
            inert={pageIndex !== currentPage}
            className={pageClassName}
          >
            {page.map((card, cardIndex) => (
              <li key={cardIndex}>{card}</li>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
};
