import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { LegislationSidebar } from '../components/LegislationDocuments/LegislationSidebar';
import { LegislationFilters } from '../components/LegislationDocuments/LegislationFilters';
import type { Document } from '../types';
import { LegislationDocumentList } from '../components/LegislationDocuments/LegislationDocumentList';
import { setSelectedCategory } from '../slices/documentsManagementSlice';

interface LegislationDocumentsPageProps {
    categoryId: number;
    onBack: () => void;
    onViewDocument?: (doc: Document) => void;
}

export function LegislationDocumentsPage({
    categoryId,
    onBack,
    onViewDocument,
}: LegislationDocumentsPageProps) {
    const { isRTL, t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const { items: categories } = useSelector((state: RootState) => state.legislationSlice.categories);
    const { selectedSubCategory } = useSelector((state: RootState) => state.documentsManagement.filters);
    const { subCategories } = useSelector((state: RootState) => state.legislationSlice);
    const category = categories.find(c => c.id === categoryId);
    const currentSubCategoryName = subCategories.items.find(c => c.id === selectedSubCategory)?.[isRTL ? 'lawSubCategoryAr' : 'lawSubCategoryEn'] || '';

    const { filters } = useSelector((state: RootState) => state.documentsManagement);

    useEffect(() => {
        if (filters.selectedCategory !== categoryId) {
            dispatch(setSelectedCategory(categoryId));
        }
    }, [dispatch, categoryId, filters.selectedCategory]);

    // Scroll to top logic
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="bg-bg-subtle"
        >
            <div className="flex">
                <LegislationSidebar categoryId={categoryId} />

                {/* RIGHT COLUMN — Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="sticky top-[92px] z-30 border-b border-bg-light bg-bg-white"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mx-auto px-4 sm:px-8 lg:px-16 py-6 lg:py-8 max-w-[1600px]"
                        >
                            {/* BACK BUTTON */}
                            <button
                                onClick={onBack}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:bg-gray-100 mb-4 text-faa-primary text-base font-semibold"
                            >
                                <ArrowLeft className="w-5 h-5" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                                {t('legislation.backToLegislations')}
                            </button>

                            {/* PAGE TITLE */}
                            <h1
                                className="mb-2 lg:mb-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight"
                            >
                                {category ? (isRTL ? category.lawCategoryAr : category.lawCategoryEn) : ''}
                            </h1>

                            {/* Subtitle */}
                            <p
                                className="mb-0 text-base sm:text-lg font-medium text-secondary"
                            >
                                {currentSubCategoryName}
                            </p>
                        </motion.div>
                    </motion.div>

                    <div className="mx-auto px-7 sm:px-8 lg:px-16 py-6 lg:py-8 w-full max-w-[1600px]">
                        <LegislationFilters />
                        <LegislationDocumentList
                            categoryId={categoryId}
                            onViewDocument={onViewDocument}
                        />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showScrollToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 100 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        onClick={scrollToTop}
                        className="fixed z-50 rounded-full shadow-2xl group flex items-center gap-3 bg-legislation-active-indicator text-bg-white p-4 px-6"
                        style={{
                            bottom: '40px',
                            [isRTL ? 'left' : 'right']: '40px',
                        }}
                        aria-label={t('legislation.returnToTop')}
                    >
                        <ArrowUp className="w-5 h-5 transition-transform group-hover:translate-y-[-4px]" />
                        <span className="text-sm font-semibold">
                            {t('legislation.returnToTop')}
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
