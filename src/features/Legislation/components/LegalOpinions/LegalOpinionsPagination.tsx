import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/components/ui/button';
import type { PaginationInfo } from '../../types/legalOpinions.types';

interface LegalOpinionsPaginationProps {
    pagination: PaginationInfo;
    onPageChange: (page: number) => void;
    fontSizeMultiplier?: number;
}

export function LegalOpinionsPagination({
    pagination,
    onPageChange,
    fontSizeMultiplier = 1,
}: LegalOpinionsPaginationProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';

    const { pageNumber, totalPages, totalCount, hasNextPage, hasPreviousPage } = pagination;

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const delta = 2;

        // Always show first page
        pages.push(1);

        // Calculate range around current page
        const rangeStart = Math.max(2, pageNumber - delta);
        const rangeEnd = Math.min(totalPages - 1, pageNumber + delta);

        // Add ellipsis after first page if needed
        if (rangeStart > 2) {
            pages.push('...');
        }

        // Add pages in range
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }

        // Add ellipsis before last page if needed
        if (rangeEnd < totalPages - 1) {
            pages.push('...');
        }

        // Always show last page if more than 1 page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 border border-gray-100">
            {/* Results info */}
            <div
                style={{
                    fontFamily,
                    fontSize: `${14 * fontSizeMultiplier}px`,
                    color: '#64748B',
                }}
            >
                {t('legalOpinions.results')}: <span className="font-semibold text-slate-700">{totalCount}</span>
                {' '}{t('common.page')} <span className="font-semibold text-slate-700">{pageNumber}</span> {t('common.of')} <span className="font-semibold text-slate-700">{totalPages}</span>
            </div>

            {/* Page controls */}
            <div className="flex items-center gap-2">
                {/* Previous button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(pageNumber - 1)}
                    disabled={!hasPreviousPage}
                    className="gap-1"
                >
                    <ChevronLeft className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                    <span className="hidden sm:inline">{t('common.previous')}</span>
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {pageNumbers.map((page, index) => (
                        page === '...' ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 text-gray-400"
                                style={{ fontFamily, fontSize: `${14 * fontSizeMultiplier}px` }}
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={`min-w-[36px] h-9 rounded-lg transition-all ${page === pageNumber
                                        ? 'bg-[#2F4F6F] text-white font-semibold'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                                style={{
                                    fontFamily,
                                    fontSize: `${14 * fontSizeMultiplier}px`,
                                }}
                            >
                                {page}
                            </button>
                        )
                    ))}
                </div>

                {/* Next button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(pageNumber + 1)}
                    disabled={!hasNextPage}
                    className="gap-1"
                >
                    <span className="hidden sm:inline">{t('common.next')}</span>
                    <ChevronRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                </Button>
            </div>
        </div>
    );
}
