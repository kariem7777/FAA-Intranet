"use client";

import { useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    className?: string;
    showItemsPerPage?: boolean;
    itemsPerPageOptions?: number[];
}

export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    className = "",
    showItemsPerPage = true,
    itemsPerPageOptions = [10, 20, 50, 100],
}: PaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Generate page numbers to display
    const pageNumbers = useMemo(() => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        // Calculate range
        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        // Add first page
        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...");
        } else {
            rangeWithDots.push(1);
        }

        // Add middle pages
        rangeWithDots.push(...range);

        // Add last page
        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots.filter(
            (item, index, arr) => arr.indexOf(item) === index
        );
    }, [currentPage, totalPages]);

    if (totalPages <= 1 && !showItemsPerPage) {
        return null;
    }

    return (
        <div
            className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 w-full rounded-lg bg-secondary border border-border-primary ${className}`}
        >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full">
                {/* Items per page selector */}
                {showItemsPerPage && onItemsPerPageChange && (
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                        <span className="text-xs sm:text-sm text-font-gray whitespace-nowrap">Show</span>
                        <select
                            title="option"
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            className="bg-card-primary border border-border-primary text-font-white rounded-md px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-btn-primary-color1 focus:border-btn-primary-color1 hover:border-btn-primary-color1/50 transition-all duration-200 min-w-[50px] sm:min-w-[60px] cursor-pointer appearance-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394A3B8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: `right 0.5rem center`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "20px",
                            }}
                        >
                            {itemsPerPageOptions.map((option) => (
                                <option key={option} value={option} className="bg-card-primary text-font-white">
                                    {option}
                                </option>
                            ))}
                        </select>
                        <span className="text-xs sm:text-sm text-font-gray whitespace-nowrap">Per Page</span>
                    </div>
                )}

                {/* Items count info and pagination controls */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">
                    <span className="text-xs sm:text-sm font-medium text-font-gray text-center sm:text-left whitespace-nowrap">
                        Showing <span className="text-font-white">{startItem}</span> to <span className="text-font-white">{endItem}</span> of <span className="text-font-white">{totalItems}</span> results
                    </span>

                    {/* Pagination controls */}
                    <div className="flex items-center gap-0.5 sm:gap-1">
                        {/* Previous button */}
                        <button
                            title="previous page"
                            aria-label="previous page"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition-all duration-200 border ${currentPage <= 1
                                ? "text-font-gray/50 cursor-not-allowed bg-card-primary border-border-primary opacity-50"
                                : "text-font-gray hover:text-font-white bg-card-primary border-border-primary hover:border-btn-primary-color1/50 hover:bg-card-secondary active:scale-95"
                                }`}
                        >
                            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 rtl:rotate-180" />
                        </button>

                        {/* Page numbers */}
                        {pageNumbers.map((pageNumber, index) => (
                            <div key={index}>
                                {pageNumber === "..." ? (
                                    <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm font-medium text-font-gray">
                                        ···
                                    </span>
                                ) : (
                                    <button
                                        title="page number"
                                        aria-label="page number"
                                        onClick={() => onPageChange(pageNumber as number)}
                                        disabled={pageNumber === currentPage}
                                        className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${currentPage === pageNumber
                                            ? "bg-font-gray/50  text-white border-transparent"
                                            : "text-font-white bg-card-primary border-border-primary hover:border-btn-primary-color1/50 hover:bg-card-secondary hover:text-btn-primary-color2 active:scale-95"
                                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Next button */}
                        <button
                            title="next page"
                            aria-label="next page"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition-all duration-200 border ${currentPage >= totalPages
                                ? "text-font-gray/50 cursor-not-allowed bg-card-primary border-border-primary opacity-50"
                                : "text-font-gray hover:text-font-white bg-card-primary border-border-primary hover:border-btn-primary-color1/50 hover:bg-card-secondary active:scale-95"
                                }`}
                        >
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rtl:rotate-180" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}