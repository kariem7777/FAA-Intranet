import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchEnquiries,
  setSearchText,
  setDepartmentFilter,
  setPage,
} from '../slices/EnquiriesSlice';
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

  const { enquiries, filters } = useAppSelector((state) => state.enquiries);

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [searchDebounce, setSearchDebounce] = useState(filters.searchText);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchEnquiries(
      { status: '3' }
    ));
  }, [dispatch]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchDebounce !== filters.searchText) {
        dispatch(setSearchText(searchDebounce || ''));
        dispatch(fetchEnquiries({
          status: '3', searchText: searchDebounce || ''
        }));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchDebounce, dispatch, filters.searchText]);

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
    dispatch(setDepartmentFilter(value));
    dispatch(fetchEnquiries({
      status: '3',
      departmentId: value
    }));
  }, [dispatch]);

  const handleEnquirySelect = useCallback((enquiry: Enquiry) => {
    navigate(`/opinions/${enquiry.id}`);
  }, [navigate]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setPage(page));
    dispatch(fetchEnquiries(
      { status: '3', pageNumber: page }
    ));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRetry = useCallback(() => {
    dispatch(fetchEnquiries({ status: '3' }));
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
            searchQuery={searchDebounce || filters.searchText || ''}
            selectedDepartment={filters.departmentId?.toString() || ''}
            entities={[]}
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