import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchApprovedOpinions,
  fetchLegalOpinionEntities,
  setSearchQuery,
  setSelectedDepartment,
  setPage,
} from '../slices/legalOpinionsSlice';
import { LegislationHero } from '../components/LegislationHero';
import {
  LegalOpinionsFilters,
  OpinionsList,
  ScrollToTopButton,
  LegalOpinionsLoading,
  LegalOpinionsError,
  LegalOpinionsPagination,
} from '../components/LegalOpinions';
import type { ApprovedOpinion } from '../types/legalOpinions.types';

const LEGISLATION_COLORS = {
  bgOffWhite: '#F7F8FA',
};

export function ApprovedLegalOpinionsPage() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { fontSizeMultiplier } = useAppSelector((state) => state.global);
  const { opinions, entities, filters } = useAppSelector((state) => state.legalOpinions);

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [searchDebounce, setSearchDebounce] = useState(filters.searchQuery);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchLegalOpinionEntities());
    dispatch(fetchApprovedOpinions());
  }, [dispatch]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchDebounce !== filters.searchQuery) {
        dispatch(setSearchQuery(searchDebounce));
        dispatch(fetchApprovedOpinions(1));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchDebounce, dispatch, filters.searchQuery]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchDebounce(value);
  }, []);

  const handleDepartmentChange = useCallback((value: string) => {
    dispatch(setSelectedDepartment(value));
    dispatch(fetchApprovedOpinions(1));
  }, [dispatch]);

  const handleOpinionSelect = useCallback((opinion: ApprovedOpinion) => {
    navigate(`/approved-opinions/${opinion.id}`);
  }, [navigate]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setPage(page));
    dispatch(fetchApprovedOpinions(page));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRetry = useCallback(() => {
    dispatch(fetchApprovedOpinions(1));
  }, [dispatch]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: LEGISLATION_COLORS.bgOffWhite }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Hero Banner */}
      <LegislationHero
        mode="approved-opinions"
      />

      {/* Main Content */}
      <div className="pt-8 pb-20">
        <div className="max-w-[1600px] mx-auto px-8">
          {/* Search and Filters */}
          <LegalOpinionsFilters
            searchQuery={searchDebounce}
            selectedDepartment={filters.selectedDepartment}
            entities={entities.items}
            onSearchChange={handleSearchChange}
            onDepartmentChange={handleDepartmentChange}
            fontSizeMultiplier={fontSizeMultiplier}
          />

          {/* Loading State */}
          {opinions.loading && <LegalOpinionsLoading fontSizeMultiplier={fontSizeMultiplier} />}

          {/* Error State */}
          {!opinions.loading && opinions.error && (
            <LegalOpinionsError
              message={opinions.error}
              onRetry={handleRetry}
              fontSizeMultiplier={fontSizeMultiplier}
            />
          )}

          {/* Opinions List */}
          {!opinions.loading && !opinions.error && (
            <>
              <OpinionsList
                opinions={opinions.items}
                entities={entities.items}
                onOpinionSelect={handleOpinionSelect}
                fontSizeMultiplier={fontSizeMultiplier}
              />

              {/* Pagination */}
              {opinions.pagination.totalPages > 1 && (
                <LegalOpinionsPagination
                  pagination={opinions.pagination}
                  onPageChange={handlePageChange}
                  fontSizeMultiplier={fontSizeMultiplier}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton
        visible={showScrollToTop}
        onClick={handleScrollToTop}
        fontSizeMultiplier={fontSizeMultiplier}
      />
    </div>
  );
}

export default ApprovedLegalOpinionsPage;