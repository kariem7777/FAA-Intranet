import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppDispatch, RootState } from '@/store';
import { fetchCategories, setSelectedCategory } from '@/features/Legislation/slices/legislationSlice';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Shimmer } from '@/shared/components/Shimmer/Shimmer';

export function LegislationSidebar({ categoryId }: { categoryId: number }) {
  const { isRTL, t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [categoryPage, setCategoryPage] = useState(1);
  const categoriesPerPage = 10;

  const { data: categoryGroup, loading, error } = useSelector((state: RootState) => state.legislation.categories);
  const { selectedCategory } = useSelector((state: RootState) => state.legislation.filters);

  useEffect(() => {
    dispatch(fetchCategories(categoryId));
  }, [dispatch, categoryId]);

  const colors = {
    primary: '#0F2A44',
    accent: '#C9A24D',
    bgWhite: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#5A5A5A',
    bgOffWhite: '#F7F8FA',
  };

  if (loading) {
    return (
      <>
        <div
          className="h-[calc(100vh-92px)] fixed border-r overflow-hidden transition-all duration-300 z-20 w-[320px] px-8"
          style={{
            backgroundColor: colors.bgWhite,
            borderColor: '#E5E7EB',
            [isRTL ? 'right' : 'left']: 0,
          }}
        >
          <div className="pt-6 pb-4">
            <Shimmer width={120} height={24} className="mb-6" />
          </div>
          <div className="h-px mb-6" style={{ backgroundColor: '#E5E7EB' }} />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Shimmer height={48} className="rounded-lg" />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="transition-all duration-300 hidden lg:block" style={{ width: '320px' }} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div
          className="h-[calc(100vh-92px)] fixed border-r overflow-hidden transition-all duration-300 z-20 w-[320px] px-8"
          style={{
            backgroundColor: colors.bgWhite,
            borderColor: '#E5E7EB',
            [isRTL ? 'right' : 'left']: 0,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center h-full text-center px-4"
          >
            <div className="mb-4 p-4 rounded-full" style={{ backgroundColor: '#FEE2E2' }}>
              <div className="w-8 h-8 flex items-center justify-center font-bold text-xl" style={{ color: '#DC2626' }}>!</div>
            </div>
            <h3
              className="text-lg font-bold mb-2"
              style={{
                color: colors.textPrimary,
                fontFamily: 'Dubai, Arial, sans-serif',
              }}
            >
              {t('common.loadingError')}
            </h3>
            <p
              className="text-sm mb-4"
              style={{
                color: colors.textSecondary,
                fontFamily: 'Dubai, Arial, sans-serif',
              }}
            >
              {t('legislation.failedToLoadCategories')}
            </p>
            <button
              onClick={() => dispatch(fetchCategories(categoryId))}
              className="px-6 py-2.5 rounded-lg transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: colors.primary,
                color: '#FFFFFF',
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {t('common.retry')}
            </button>
          </motion.div>
        </div>
        <div className="transition-all duration-300 hidden lg:block" style={{ width: '320px' }} />
      </>
    );
  }

  if (!categoryGroup) return null;

  const handleCategoryClick = (id: number) => {
    dispatch(setSelectedCategory(id));
  };

  const totalPages = Math.ceil((categoryGroup.categories?.length || 0) / categoriesPerPage);
  const currentCategories = categoryGroup.categories?.slice(
    (categoryPage - 1) * categoriesPerPage,
    categoryPage * categoriesPerPage
  ) || [];

  // Empty categories state
  if (!categoryGroup.categories || categoryGroup.categories.length === 0) {
    return (
      <>
        <div
          className="h-[calc(100vh-92px)] fixed border-r overflow-hidden transition-all duration-300 z-20 w-[320px] px-8"
          style={{
            backgroundColor: colors.bgWhite,
            borderColor: '#E5E7EB',
            [isRTL ? 'right' : 'left']: 0,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center h-full text-center px-4"
          >
            <div className="mb-4 p-4 rounded-full" style={{ backgroundColor: colors.bgOffWhite }}>
              <Menu className="w-8 h-8" style={{ color: colors.textSecondary }} />
            </div>
            <h3
              className="text-lg font-bold mb-2"
              style={{
                color: colors.textPrimary,
                fontFamily: 'Dubai, Arial, sans-serif',
              }}
            >
              {isRTL ? 'لا توجد تصنيفات' : 'No Categories'}
            </h3>
            <p
              className="text-sm"
              style={{
                color: colors.textSecondary,
                fontFamily: 'Dubai, Arial, sans-serif',
              }}
            >
              {isRTL ? 'لا توجد تصنيفات متاحة حالياً' : 'No categories available at the moment'}
            </p>
          </motion.div>
        </div>
        <div className="transition-all duration-300 hidden lg:block" style={{ width: '320px' }} />
      </>
    );
  }

  return (
    <>
      {/* LEFT COLUMN — Categories Sidebar */}
      <motion.div
        animate={{
          width: isSidebarCollapsed ? 0 : 320
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="h-[calc(100vh-92px)] fixed border-r overflow-y-auto z-20"
        style={{
          backgroundColor: colors.bgWhite,
          borderColor: '#E5E7EB',
          paddingLeft: isSidebarCollapsed ? 0 : '2rem',
          paddingRight: isSidebarCollapsed ? 0 : '2rem',
          [isRTL ? 'right' : 'left']: 0,
        }}
      >
        <AnimatePresence>
          {!isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Collapse Button */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="pt-6 pb-4 flex items-center justify-between"
              >
                <h3
                  style={{
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: colors.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {t('legislation.categories.title')}
                </h3>

                <button
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 group"
                  style={{ color: colors.primary }}
                  aria-label={t('legislation.hideCategories')}
                  title={t('legislation.hideCategories')}
                >
                  <Menu className="w-5 h-5 transition-transform group-hover:scale-110" />
                </button>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2 }}
                className="h-px mb-6"
                style={{ backgroundColor: '#E5E7EB' }}
              />

              {/* List */}
              <div className="space-y-2">
                {currentCategories.map((cat, index) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group"
                    style={{
                      backgroundColor: selectedCategory === cat.id ? colors.primary : 'transparent',
                      color: selectedCategory === cat.id ? '#FFFFFF' : colors.textPrimary,
                      fontFamily: 'Dubai, Arial, sans-serif',
                      fontSize: '15px',
                      fontWeight: selectedCategory === cat.id ? 600 : 500,
                      textAlign: isRTL ? 'right' : 'left',
                    }}
                  >
                    {/* Handle localization of category name properly */}
                    <span>{cat.name}</span>
                    <span
                      className="text-xs px-2 py-1 rounded-full min-w-[32px] text-center"
                      style={{
                        backgroundColor: selectedCategory === cat.id ? 'rgba(255, 255, 255, 0.2)' : '#F3F4F6',
                        color: selectedCategory === cat.id ? '#FFFFFF' : colors.textSecondary,
                      }}
                    >
                      {cat.count}
                    </span>
                  </motion.button>
                ))}
              </div>
              {categoryGroup.categories.length > 0 && (
                <div className="mt-4 px-3 flex justify-between items-center">
                  <div className="text-center" style={{ fontFamily: 'Dubai, Arial, sans-serif', fontSize: '12px', color: colors.textSecondary }}>
                    {t('legislation.pageOf', { current: categoryPage, total: totalPages })}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      disabled={categoryPage === 1}
                      onClick={() => setCategoryPage(p => Math.max(1, p - 1))}
                      className={`p-1.5 rounded-md ${categoryPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                      style={{ border: `1px solid ${colors.primary}`, color: colors.primary }}
                    >
                      <ChevronLeft className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                      disabled={categoryPage === totalPages}
                      onClick={() => setCategoryPage(p => Math.min(totalPages, p + 1))}
                      className={`p-1.5 rounded-md ${categoryPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                      style={{ border: `1px solid ${colors.primary}`, color: colors.primary }}
                    >
                      <ChevronRight className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Collapsed Toggle Button */}
      <AnimatePresence>
        {isSidebarCollapsed && (
          <motion.button
            initial={{ x: isRTL ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isRTL ? 100 : -100, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsSidebarCollapsed(false)}
            className="fixed top-[200px] z-50 rounded-r-lg shadow-lg transition-all duration-300 hover:pr-2 group"
            style={{
              [isRTL ? 'right' : 'left']: '0',
              backgroundColor: colors.primary,
              color: '#FFFFFF',
              padding: '20px 8px',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: isRTL ? 'rotate(180deg)' : 'none',
            }}
          >
            <span style={{ fontFamily: 'Dubai, Arial, sans-serif', fontSize: '14px', fontWeight: 600, letterSpacing: '1px' }}>
              {t('legislation.categories.title').toUpperCase()}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Spacer div to push main content */}
      <div
        className="transition-all duration-300 hidden lg:block"
        style={{ width: isSidebarCollapsed ? 0 : '320px' }}
      />
    </>
  );
}
