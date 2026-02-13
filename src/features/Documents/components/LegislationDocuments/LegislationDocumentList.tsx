import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppDispatch, RootState } from '@/store';
import { fetchDocuments, setPageNumber, setSelectedDocument } from '@/features/Documents/slices/documentsManagementSlice';
import { LegislationDocumentCard } from './LegislationDocumentCard';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { Document } from '../../types';
import { Shimmer } from '@/shared/components/Shimmer/Shimmer';

export function LegislationDocumentList({ categoryId, onViewDocument }: { categoryId: number; onViewDocument?: (doc: Document) => void }) {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const { items: documents, loading, error, pagination, filters } = useSelector((state: RootState) => state.documentsManagement);

    useEffect(() => {
        if (filters.selectedCategory === categoryId) {
            dispatch(fetchDocuments());
        }
    }, [dispatch, categoryId, filters.selectedCategory, filters.selectedSubCategory, filters.selectedEntity, filters.searchQuery, pagination.pageNumber]);

    const handlePageChange = (newPage: number) => {
        dispatch(setPageNumber(newPage));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };



    if (loading.fetch) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
            >
                <div className="mb-4"><Shimmer width={100} height={20} /></div>
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-xl p-6 border border-faa-primary/10 shadow-sm flex items-start gap-4"
                    >
                        <Shimmer width={48} height={48} rounded="rounded-lg" className="shrink-0" />
                        <div className="flex-1 space-y-3">
                            <Shimmer width="60%" height={24} />
                            <div className="flex gap-4">
                                <Shimmer width={100} height={16} />
                                <Shimmer width={100} height={16} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        );
    }

    if (error.fetch) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="py-20 text-center bg-white rounded-xl border border-red-100"
            >
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {t('common.somethingWentWrong')}
                </h3>
                <p className="text-gray-500 mb-4">{error.fetch}</p>
            </motion.div>
        );
    }

    if (documents.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-24 bg-white rounded-xl border border-dashed border-faa-primary/30"
            >
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {t('common.noResultsFound')}
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    {t('legislation.adjustSearchCriteria')}
                </p>
            </motion.div>
        );
    }

    const hasPreviousPage = pagination.pageNumber > 1;
    const hasNextPage = pagination.pageNumber < pagination.totalPages;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
        >
            <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4 text-sm font-medium text-secondary"
            >
                {t('legislation.documentCount', { count: pagination.totalCount })}
            </motion.p>

            <AnimatePresence mode="wait">
                {documents.map((doc: Document, index: number) => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                        <LegislationDocumentCard
                            document={doc}
                            onView={(document) => {
                                dispatch(setSelectedDocument(document));
                                onViewDocument?.(document);
                            }}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center gap-2 mt-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!hasPreviousPage}
                        onClick={() => handlePageChange(pagination.pageNumber - 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        {t('common.prev')}
                    </motion.button>
                    <motion.span
                        key={pagination.pageNumber}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-2"
                    >
                        {t('legislation.pageOf', { current: pagination.pageNumber, total: pagination.totalPages })}
                    </motion.span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!hasNextPage}
                        onClick={() => handlePageChange(pagination.pageNumber + 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        {t('common.next')}
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}
