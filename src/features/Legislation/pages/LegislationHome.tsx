import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCategories, resetFilters } from '@/features/Legislation/slices/legislationSlice';
import { fetchEntities, performGlobalSearch } from '@/features/Legislation/slices/heroSlice';
import { LegislationHero, ImportantNoticeModal, ImportantNoticeCard, LegislationCategoriesGrid } from '../components';
import { LegislationDocumentsPage } from './LegislationDocumentsPage';
import { LEGISLATION_CATEGORIES } from '../config/categories.config';
import type { AppDispatch, RootState } from '@/store';


interface LegislationHomeProps {
  fontSizeMultiplier?: number;
  userRole?: 'admin' | 'user';
}

function LegislationHome({ }: LegislationHomeProps = {}) {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Get hero state from Redux
  const { globalSearchQuery } = useSelector((state: RootState) => state.hero);
  // Fetch entities on mount
  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch]);

  // Perform search when query or entity changes
  useEffect(() => {
    if (globalSearchQuery) {
      dispatch(performGlobalSearch());
    }
  }, [globalSearchQuery, dispatch]);

  // If a category is selected, for now we just show a placeholder since we are refactoring home page
  if (selectedCategoryId) {
    return (
      <LegislationDocumentsPage
        categoryId={selectedCategoryId}
        onBack={() => {
          setSelectedCategoryId(null);
          dispatch(resetFilters());
          dispatch(resetCategories());
        }}
        onViewDocument={(doc) => console.log('View document:', doc)}
      />
    );
  }

  const handleCategorySearch = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Hero Banner */}
      <div className="relative">
        <LegislationHero
          handleCategorySearch={handleCategorySearch}
          legislationCategories={LEGISLATION_CATEGORIES}
        />
      </div>

      {/* Main Content Area */}
      <div className="px-20 pt-10 pb-8 space-y-8">
        <LegislationCategoriesGrid onCategorySelect={setSelectedCategoryId} />
        <ImportantNoticeCard />
      </div>

      <ImportantNoticeModal
        onClose={() => { }}
      />
    </div>
  );
}

export default LegislationHome;
