import { Eye, Edit, Trash2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Document } from '../../types';
import { Button } from '@/shared/components/ui/button';
import { Shimmer } from '@/shared/components/Shimmer/Shimmer';

interface DocumentsTableProps {
    documents: Document[];
    loading: boolean;
    onPreview: (doc: Document) => void;
    onEdit: (doc: Document) => void;
    onDelete: (doc: Document) => void;
    isArabic: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function DocumentsTable({
    documents,
    loading,
    onPreview,
    onEdit,
    onDelete,
    isArabic,
    currentPage,
    totalPages,
    onPageChange
}: DocumentsTableProps) {
    const { t } = useTranslation();



    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const getPageNumbers = () => {
            const pages: (number | string)[] = [];
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

            if (isMobile) {
                // Mobile: simple pagination
                if (currentPage > 1) pages.push(currentPage - 1);
                pages.push(currentPage);
                if (currentPage < totalPages) pages.push(currentPage + 1);
                return pages;
            }

            // Desktop (your original logic but slightly cleaner)
            const maxVisible = 15;

            if (totalPages <= maxVisible) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);

                let start = Math.max(2, currentPage - 3);
                let end = Math.min(totalPages - 1, currentPage + 3);

                if (start > 2) pages.push('...');
                for (let i = start; i <= end; i++) pages.push(i);
                if (end < totalPages - 1) pages.push('...');

                pages.push(totalPages);
            }

            return pages;
        };
        return (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-gray-100 bg-white">
                <div className="flex w-full sm:w-auto items-center justify-between sm:justify-center gap-2 order-2 sm:order-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 min-w-[36px] justify-center px-2 sm:px-3 flex-shrink-0 mt-0 sm:mt-0"
                    >
                        {isArabic ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        <span className="hidden sm:inline">{t('common.previous')}</span>
                    </Button>
                    <div className="flex flex-1 sm:flex-none overflow-x-auto items-center justify-start sm:justify-center gap-1 px-1 pb-2 sm:pb-0 pt-1">
                        {getPageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
                                disabled={typeof page !== 'number'}
                                className={`w-8 h-8 flex-shrink-0 rounded-md text-sm font-medium transition-colors ${typeof page !== 'number'
                                    ? 'cursor-default text-gray-500 hover:bg-transparent'
                                    : currentPage === page
                                        ? 'bg-dashboard-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1 min-w-[36px] justify-center px-2 sm:px-3 flex-shrink-0"
                    >
                        <span className="hidden sm:inline">{t('common.next')}</span>
                        {isArabic ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap order-1 sm:order-2">
                    {t('common.page')} {currentPage} {t('common.of')} {totalPages}
                </div>
            </div>
        );
    };

    const renderLoadingState = () => {
        return Array.from({ length: 3 }).map((_, index) => (
            <tr key={index} className="border-t border-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        <Shimmer width="20px" height="20px" rounded="rounded-sm" />
                        <Shimmer width="180px" height="16px" />
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <Shimmer width="50px" height="16px" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <Shimmer width="50px" height="16px" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <Shimmer width="100px" height="16px" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <Shimmer width="90px" height="16px" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <Shimmer width="70px" height="24px" rounded="rounded-md" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <Shimmer width="32px" height="32px" rounded="rounded-md" />
                        <Shimmer width="32px" height="32px" rounded="rounded-md" />
                        <Shimmer width="32px" height="32px" rounded="rounded-md" />
                    </div>
                </td>
            </tr>
        ));
    };

    return (
        <div className="bg-white overflow-hidden mt-6 shadow-sm border border-gray-100" style={{ borderRadius: '8px' }}>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-white border-b-2" style={{ borderColor: 'var(--color-faa-primary' }}>
                            {['documentTitle', 'entity', 'legislation', 'category', 'uploadDate', 'classification', 'actions'].map((headerKey) => (
                                <th
                                    key={headerKey}
                                    className={`px-6 py-4 text-${isArabic ? 'right' : 'left'} text-base text-gray-900 uppercase tracking-wide whitespace-nowrap`}
                                    style={{ fontWeight: 800 }}
                                >
                                    {t(`legislation.documentsManagement.${headerKey}`)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            renderLoadingState()
                        ) : documents.length > 0 ? (
                            documents.map((doc) => (
                                <tr
                                    key={doc.id}
                                    className="border-t border-gray-100 hover:bg-gray-50 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 ease-in-out group cursor-pointer"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--color-faa-primary)' }} />
                                            <span className="text-base text-black" style={{ fontWeight: 600 }}>
                                                {isArabic ? doc.documentNameAr : doc.documentNameEn}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-base text-black whitespace-nowrap" >
                                        {isArabic ? doc.entityNameAr : doc.entityNameEn}
                                    </td>
                                    <td className="px-6 py-4 text-base text-black whitespace-nowrap" >
                                        {isArabic ? doc.categoryNameAr : doc.categoryNameEn}
                                    </td>
                                    <td className="px-6 py-4 text-base text-black whitespace-nowrap" >
                                        {isArabic ? doc.subCategoryNameAr : doc.subCategoryNameEn}
                                    </td>
                                    <td className="px-6 py-4 text-base text-gray-500 whitespace-nowrap" >
                                        {new Date(doc.createdOn).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-1 text-sm ${doc.classification === 1
                                                ? 'bg-green-50 text-green-700'
                                                : 'bg-red-50 text-red-700'
                                                }`}
                                            style={{ fontWeight: 700, borderRadius: '6px' }}
                                        >
                                            {doc.classification === 1 ? t('legislation.documentsManagement.public') : t('legislation.documentsManagement.secret')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="p-2 hover:bg-gray-50 transition-all duration-200 rounded-lg shadow-sm hover:shadow text-gray-500 hover:text-gray-700 bg-white border border-gray-100"
                                                title={t('legislation.documentsManagement.view')}
                                                onClick={() => onPreview(doc)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-blue-50 transition-all duration-200 rounded-lg shadow-sm hover:shadow text-blue-500 hover:text-blue-700 bg-white border border-gray-100"
                                                title={t('legislation.documentsManagement.edit')}
                                                onClick={() => onEdit(doc)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-red-50 transition-all duration-200 rounded-lg shadow-sm hover:shadow text-red-500 hover:text-red-700 bg-white border border-gray-100"
                                                title={t('legislation.documentsManagement.delete')}
                                                onClick={() => onDelete(doc)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-16 text-center">
                                    <FileText className="h-14 w-14 text-gray-300 mx-auto mb-4" />
                                    <p className="text-base text-gray-500" >
                                        {t('legislation.documentsManagement.noDocuments')}
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {renderPagination()}
        </div>
    );
}
