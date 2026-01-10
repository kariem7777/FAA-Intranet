import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetCategories, resetFilters, setSelectedCategory } from '@/features/Legislation/slices/legislationSlice';
import { LegislationHero, ImportantNoticeModal, ImportantNoticeCard, LegislationCategoriesGrid } from '../components';
import { LegislationDocumentsPage } from './LegislationDocumentsPage';


interface LegislationHomeProps {
  fontSizeMultiplier?: number;
  userRole?: 'admin' | 'user';
}

function LegislationHome({ }: LegislationHomeProps = {}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);


  const dispatch = useDispatch();

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

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Hero Banner */}
      <div className=" relative">
        <LegislationHero />
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
