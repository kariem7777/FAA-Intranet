import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/components/ui/button';

interface LegalOpinionsPaginationProps {
    totalCount: number;
    pageNumber: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
}

export function LegalOpinionsPagination({
    totalCount,
    pageNumber,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    onPageChange,
}: LegalOpinionsPaginationProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const delta = 2;

        pages.push(1);

        const rangeStart = Math.max(2, pageNumber - delta);
        const rangeEnd = Math.min(totalPages - 1, pageNumber + delta);

        if (rangeStart > 2) {
            pages.push('...');
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }

        if (rangeEnd < totalPages - 1) {
            pages.push('...');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 border border-gray-100 text-base">
            {/* Results info */}
            <div
                style={{
                    color: '#64748B',
                }}
            >
                {t('legalOpinions.resultsLabel')}: <span className="font-semibold text-slate-700">{totalCount}</span>
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
                                className="px-2 text-gray-400 text-base"

                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={`min-w-[36px]
                                    text-base
                                    h-9 rounded-lg transition-all ${page === pageNumber
                                        ? 'bg-[#2F4F6F] text-white font-semibold'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}

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
