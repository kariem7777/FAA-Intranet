import { Eye, Edit, Trash2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { DocumentDto } from '../services/DocumentsService';
import { Button } from '@/shared/components/ui/button';
import { Shimmer } from '@/shared/components/Shimmer/Shimmer';

interface DocumentsTableProps {
    documents: DocumentDto[];
    loading: boolean;
    onPreview: (doc: DocumentDto) => void;
    onEdit: (doc: DocumentDto) => void;
    onDelete: (doc: DocumentDto) => void;
    isArabic: boolean;
    fontFamily: string;
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
    fontFamily,
    currentPage,
    totalPages,
    onPageChange
}: DocumentsTableProps) {
    const { t } = useTranslation();

    const legislationColors = {
        primary: '#2F4F6F',
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1"
                    >
                        {isArabic ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        {t('common.previous')}
                    </Button>
                    <div className="flex items-center gap-1 mx-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${currentPage === page
                                    ? 'bg-[#2F4F6F] text-white'
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
                        className="flex items-center gap-1"
                    >
                        {t('common.next')}
                        {isArabic ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                </div>
                <div className="text-sm text-gray-500">
                    {t('common.page')} {currentPage} {t('common.of')} {totalPages}
                </div>
            </div>
        );
    };

    const renderLoadingState = () => {
        return Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="border-t border-[#F3F4F6]">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        <Shimmer width="20px" height="20px" rounded="rounded-sm" />
                        <Shimmer width="180px" height="16px" />
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <Shimmer width="120px" height="16px" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <Shimmer width="140px" height="16px" />
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
                        <tr className="bg-[#ffffff] border-b-2" style={{ borderColor: legislationColors.primary }}>
                            {['documentTitle', 'entity', 'legislation', 'category', 'uploadDate', 'classification', 'actions'].map((headerKey) => (
                                <th
                                    key={headerKey}
                                    className={`px-6 py-4 text-${isArabic ? 'right' : 'left'} text-[15px] text-[#1D293D] uppercase tracking-wide whitespace-nowrap`}
                                    style={{ fontFamily, fontWeight: 800 }}
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
                                    className="border-t border-[#F3F4F6] hover:bg-[#F9FAFB] hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 ease-in-out group cursor-pointer"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 flex-shrink-0" style={{ color: legislationColors.primary }} />
                                            <span className="text-[15px] text-[#1D293D]" style={{ fontFamily, fontWeight: 600 }}>
                                                {doc.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[15px] text-[#6B7280] whitespace-nowrap" style={{ fontFamily }}>
                                        {doc.entity}
                                    </td>
                                    <td className="px-6 py-4 text-[15px] text-[#6B7280] whitespace-nowrap" style={{ fontFamily }}>
                                        {t(`legislation.categories.${doc.legislation}.title`) || doc.legislation}
                                    </td>
                                    <td className="px-6 py-4 text-[15px] text-[#6B7280] whitespace-nowrap" style={{ fontFamily }}>
                                        {doc.category}
                                    </td>
                                    <td className="px-6 py-4 text-[15px] text-[#6B7280] whitespace-nowrap" style={{ fontFamily }}>
                                        {doc.uploadDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-1 text-[13px] ${doc.classification === 'public'
                                                ? 'bg-green-50 text-green-700'
                                                : 'bg-red-50 text-red-700'
                                                }`}
                                            style={{ fontFamily, fontWeight: 700, borderRadius: '6px' }}
                                        >
                                            {doc.classification === 'public' ? t('legislation.documentsManagement.public') : t('legislation.documentsManagement.secret')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="p-2 hover:bg-[#F3F4F6] transition-colors duration-150 rounded-md"
                                                title={t('legislation.documentsManagement.view')}
                                                onClick={() => onPreview(doc)}
                                            >
                                                <Eye className="h-4 w-4 text-[#6B7280]" />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-[#F3F4F6] transition-colors duration-150 rounded-md"
                                                title={t('legislation.documentsManagement.edit')}
                                                onClick={() => onEdit(doc)}
                                            >
                                                <Edit className="h-4 w-4 text-[#6B7280]" />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-red-50 transition-colors duration-150 rounded-md"
                                                title={t('legislation.documentsManagement.delete')}
                                                onClick={() => onDelete(doc)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-16 text-center">
                                    <FileText className="h-14 w-14 text-[#D1D5DB] mx-auto mb-4" />
                                    <p className="text-[16px] text-[#6B7280]" style={{ fontFamily }}>
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
