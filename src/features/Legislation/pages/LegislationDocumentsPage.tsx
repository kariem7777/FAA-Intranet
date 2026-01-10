import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { LegislationSidebar } from '../components/LegislationSidebar';
import { LegislationFilters } from '../components/LegislationFilters';
import { LegislationDocumentList } from '../components/LegislationDocumentList';
import type { LegislationDocument } from '../types';

interface LegislationDocumentsPageProps {
  categoryId: number;
  onBack: () => void;
  onViewDocument?: (doc: LegislationDocument) => void;
  fontSizeMultiplier?: number;
}

export function LegislationDocumentsPage({
  categoryId,
  onBack,
  onViewDocument,
  fontSizeMultiplier = 1
}: LegislationDocumentsPageProps) {
  const { isRTL, t } = useTranslation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const { data: categoryGroup } = useSelector((state: RootState) => state.legislation.categories);
  const { selectedCategory } = useSelector((state: RootState) => state.legislation.filters);

  // Derive sub-category name
  const currentCategoryName = categoryGroup?.categories?.find(c => c.id === selectedCategory)?.name || '';

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

  const colors = {
    primary: '#0F2A44',
    accent: '#C9A24D',
    bgOffWhite: '#F7F8FA',
    bgWhite: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#5A5A5A',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
      style={{ backgroundColor: colors.bgOffWhite }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex">
        <LegislationSidebar categoryId={categoryId} />

        {/* RIGHT COLUMN — Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="sticky z-30 border-b"
            style={{
              backgroundColor: colors.bgOffWhite,
              borderColor: '#E5E7EB',
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mx-auto px-16 py-8 max-w-[1600px]"
            >
              {/* BACK BUTTON */}
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:bg-gray-100"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: `${17 * fontSizeMultiplier}px`,
                  fontWeight: 600,
                  color: colors.primary,
                }}
              >
                <ArrowLeft className="w-5 h-5" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                {t('legislation.backToLegislations')}
              </button>

              {/* PAGE TITLE - Main Legislation Category Group Title */}
              <h1
                className="mb-3"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: `${48 * fontSizeMultiplier}px`,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  lineHeight: 1.2,
                }}
              >
                {isRTL ? categoryGroup?.titleAr : categoryGroup?.titleEn}
              </h1>

              {/* Subtitle - Selected subcategory */}
              <p
                className="mb-0"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: `${18 * fontSizeMultiplier}px`,
                  fontWeight: 500,
                  color: colors.textSecondary,
                }}
              >
                {currentCategoryName}
              </p>
            </motion.div>
          </motion.div>

          {/* SCROLLABLE CONTENT SECTION */}
          <div className="mx-auto px-16 py-10 w-full max-w-[1600px]">

            <LegislationFilters />

            <LegislationDocumentList onViewDocument={onViewDocument} />

          </div>
        </div>
      </div>

      {/* Floating Scroll to Top */}
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
            className="fixed z-50 rounded-full shadow-2xl group flex items-center gap-3"
            style={{
              bottom: '40px',
              [isRTL ? 'left' : 'right']: '40px',
              backgroundColor: colors.accent,
              color: '#FFFFFF',
              padding: '16px 24px',
            }}
            aria-label={t('legislation.returnToTop')}
          >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:translate-y-[-4px]" />
            <span
              style={{
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {t('legislation.returnToSearch')}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}