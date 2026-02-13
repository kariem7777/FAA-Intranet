import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppDispatch, RootState } from '@/store';
import { fetchSubCategoriesByCategory } from '@/features/Legislation/slices/legislationSlice';
import { setSelectedSubCategory } from '@/features/Documents/slices/documentsManagementSlice';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Shimmer } from '@/shared/components/Shimmer/Shimmer';

export function LegislationSidebar({ categoryId }: { categoryId: number }) {
  const { isRTL, t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [categoryPage, setCategoryPage] = useState(1);
  const categoriesPerPage = 11;

  const { subCategories } = useSelector((state: RootState) => state.legislationSlice);
  const { selectedSubCategory } = useSelector((state: RootState) => state.documentsManagement.filters);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSubCategoriesByCategory({ categoryId, pageNumber: categoryPage, pageSize: categoriesPerPage }));
    }
  }, [dispatch, categoryId, categoryPage]);


  const handleCategoryClick = (id: number | null) => {
    dispatch(setSelectedSubCategory(id));
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  const { items: currentCategories, pagination } = subCategories;
  const totalPages = pagination.totalPages;

  const renderContent = (isMobileView = false) => {
    if (subCategories.loading) {
      return (
        <div className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-6">
            <Shimmer width={120} height={24} />
            {isMobileView && (
              <button onClick={() => setIsMobileOpen(false)} className="p-2 lg:hidden">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <Shimmer key={i} height={48} className="rounded-lg w-full" />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="pt-3 pb-4 flex items-center justify-between">
          <h3
            style={{
              fontFamily: 'Dubai, Arial, sans-serif',
              fontSize: 'var(--font-size-base)',
              fontWeight: 700,
              color: 'var(--color-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {t('legislation.categories.title')}
          </h3>

          <div className="flex items-center gap-1">
            {isMobileView ? (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 lg:hidden"
                style={{ color: 'var(--color-faa-primary)' }}
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setIsSidebarCollapsed(true)}
                className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 group hidden lg:block"
                style={{ color: 'var(--color-faa-primary)' }}
                aria-label={t('legislation.hideCategories')}
                title={t('legislation.hideCategories')}
              >
                <Menu className="w-5 h-5 transition-transform group-hover:scale-110" />
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="space-y-2 overflow-y-auto">
          {/* All Categories Option */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.02 }}
            whileHover={{
              backgroundColor: selectedSubCategory === null ? 'var(--color-faa-primary)' : 'var(--color-bg-subtle)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategoryClick(null)}
            className="w-full px-2 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group"
            style={{
              backgroundColor: selectedSubCategory === null ? 'var(--color-faa-primary)' : 'transparent',
              color: selectedSubCategory === null ? 'var(--color-bg-white)' : 'var(--color-primary)',
              fontFamily: 'Dubai, Arial, sans-serif',
              fontSize: 'var(--font-size-base)',
              fontWeight: selectedSubCategory === null ? 600 : 500,
              textAlign: isRTL ? 'right' : 'left',
              border: 'none',
              outline: 'none',
            }}
          >
            <span>{t('legislation.documentsManagement.allCategories')}</span>
          </motion.button>

          {currentCategories.map((cat) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.02 }}
              whileHover={{
                backgroundColor: selectedSubCategory === cat.id ? 'var(--color-faa-primary)' : 'var(--color-bg-subtle)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(cat.id)}
              className="w-full px-2 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group"
              style={{
                backgroundColor: selectedSubCategory === cat.id ? 'var(--color-faa-primary)' : 'transparent',
                color: selectedSubCategory === cat.id ? 'var(--color-bg-white)' : 'var(--color-primary)',
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: 'var(--font-size-base)',
                fontWeight: selectedSubCategory === cat.id ? 800! : 500!,
                textAlign: isRTL ? 'right' : 'left',
                border: 'none',
                outline: 'none',
              }}
            >
              <span>{isRTL ? cat.lawSubCategoryAr : cat.lawSubCategoryEn}</span>
              <span
                className="text-xs px-2 py-1 rounded-full min-w-[32px] text-center line-clamp-1"
                style={{
                  backgroundColor: selectedSubCategory === cat.id ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-bg-card)',
                  color: selectedSubCategory === cat.id ? 'var(--color-bg-white)' : 'var(--color-secondary)',
                }}
              >
                {cat.documentsCount}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Pagination */}
        {subCategories.items.length > 0 && pagination.totalPages > 1 && (
          <div className="mt-3 pt-4 px-3 flex justify-between items-center bg-white sticky bottom-0 border-t-1 border-faa-primary" style={{ color: 'var(--color-faa-primary)' }}>
            <div className="text-center" style={{ fontFamily: 'Dubai, Arial, sans-serif', fontSize: 'var(--font-size-xs)', color: 'var(--color-secondary)' }}>
              {t('legislation.pageOf', { current: pagination.pageNumber, total: pagination.totalPages })}
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                disabled={!pagination.hasPreviousPage}
                onClick={() => setCategoryPage(p => Math.max(1, p - 1))}
                className={`p-1.5 rounded-md ${!pagination.hasPreviousPage ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                style={{ border: `1px solid ${'var(--color-faa-primary)'}`, color: 'var(--color-faa-primary)' }}
              >
                <ChevronLeft className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setCategoryPage(p => Math.min(totalPages, p + 1))}
                className={`p-1.5 rounded-md ${!pagination.hasNextPage ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                style={{ border: `1px solid ${'var(--color-faa-primary)'}`, color: 'var(--color-faa-primary)' }}
              >
                <ChevronRight className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        )
        }
      </div >
    );
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-40 p-4 rounded-full shadow-lg flex items-center gap-2 hover:scale-110 active:scale-95 transition-all"
        style={{ backgroundColor: 'var(--color-faa-primary)', color: 'var(--color-bg-white)' }}
      >
        <Menu className="w-6 h-6" />
        <span className="font-bold text-sm hidden sm:inline">{t('legislation.categories.title')}</span>
      </button>

      {/* Mobile Overlay/Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[101] shadow-2xl px-6 lg:hidden"
              style={{ [isRTL ? 'right' : 'left']: 0 }}
            >
              {renderContent(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        animate={{
          width: isSidebarCollapsed ? 0 : 320
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="h-[calc(100vh-150px)] sticky top-[92px] border-r z-20 overflow-hidden hidden lg:block"
        style={{
          backgroundColor: 'var(--color-bg-white)',
          borderColor: 'var(--color-bg-light)',
          paddingLeft: isSidebarCollapsed ? 0 : '2rem',
          paddingRight: isSidebarCollapsed ? 0 : '2rem',
        }}
      >
        <AnimatePresence mode="wait">
          {!isSidebarCollapsed && renderContent(false)}
        </AnimatePresence>
      </motion.div>

      {/* Collapsed Toggle Button (Desktop) */}
      <AnimatePresence>
        {isSidebarCollapsed && (
          <motion.button
            initial={{ x: isRTL ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isRTL ? 100 : -100, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsSidebarCollapsed(false)}
            className="fixed top-[200px] z-50 rounded-r-lg shadow-lg transition-all duration-300 hover:pr-2 group hidden lg:flex"
            style={{
              [isRTL ? 'right' : 'left']: '0',
              backgroundColor: 'var(--color-faa-primary)',
              color: 'var(--color-bg-white)',
              padding: '20px 8px',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: isRTL ? 'rotate(180deg)' : 'none',
            }}
          >
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, letterSpacing: '1px' }}>
              {t('legislation.categories.title').toUpperCase()}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
