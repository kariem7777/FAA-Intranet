import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchApprovedOpinions,
  setApprovedSearchText,
  setApprovedDepartmentFilter,
  setApprovedPage,
  resetFilters,
} from '../slices/EnquiriesSlice';
import useDebounce from '@/shared/hooks/useDebouncing';
import {
  LegalOpinionsFilters,
  OpinionsList,
  ScrollToTopButton,
  LegalOpinionsLoading,
  LegalOpinionsError,
  LegalOpinionsPagination,
} from '../components';
import type { Enquiry } from '../types';
import { LegislationHero } from '@/features/Legislation/components/LegislationHero/LegislationHero';


export function ApprovedLegalOpinionsPage() {
  const { isRTL } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { approvedOpinions: enquiries, approvedFilters: filters } = useAppSelector((state) => state.enquiries);
  const { departments } = useAppSelector((state) => state.legislationSlice);

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.searchText || '');
  const debounce = useDebounce();


  useEffect(() => {
    dispatch(resetFilters());
  }, [])

  useEffect(() => {
    setLocalSearch(filters.searchText || '');
  }, [filters.searchText]);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchApprovedOpinions({}));
  }, [dispatch]);

  // Sync data on filter change
  useEffect(() => {
    dispatch(fetchApprovedOpinions({
      searchText: filters.searchText,
      departmentId: filters.departmentId,
      pageNumber: enquiries.pagination.pageNumber,
    }));
  }, [dispatch, filters.searchText, filters.departmentId, enquiries.pagination.pageNumber]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setLocalSearch(value);
    debounce(() => {
      dispatch(setApprovedSearchText(value));
    }, 500);
  }, [dispatch, debounce]);

  const handleDepartmentChange = useCallback((value: string) => {
    dispatch(setApprovedDepartmentFilter(value));
  }, [dispatch]);

  const handleEnquirySelect = useCallback((enquiry: Enquiry) => {
    navigate(`/opinions/${enquiry.id}`);
  }, [navigate]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setApprovedPage(page));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRetry = useCallback(() => {
    dispatch(fetchApprovedOpinions({}));
  }, [dispatch]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'rgb(250, 250, 248)' }}
      dir={isRTL ? 'rtl' : 'ltr'}
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
            searchQuery={localSearch}
            selectedDepartment={filters.departmentId?.toString() || ''}
            departments={departments.items}
            onSearchChange={handleSearchChange}
            onDepartmentChange={handleDepartmentChange}
          />

          {/* Loading State */}
          {enquiries.loading && <LegalOpinionsLoading />}

          {/* Error State */}
          {!enquiries.loading && enquiries.error && (
            <LegalOpinionsError
              message={enquiries.error}
              onRetry={handleRetry}
            />
          )}

          {/* Enquiries List */}
          {!enquiries.loading && !enquiries.error && (
            <>
              <OpinionsList
                enquiries={enquiries.items}
                onEnquirySelect={handleEnquirySelect}
              />

              {/* Pagination */}
              {enquiries.pagination.totalPages > 1 && (
                <LegalOpinionsPagination
                  pageNumber={enquiries.pagination.pageNumber || 1}
                  totalPages={enquiries.pagination.totalPages || 1}
                  totalCount={enquiries.pagination.totalCount || 0}
                  hasNextPage={enquiries.pagination.hasNextPage || false}
                  hasPreviousPage={enquiries.pagination.hasPreviousPage || false}
                  onPageChange={handlePageChange}
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
      />
    </div>
  );
}

export default ApprovedLegalOpinionsPage;