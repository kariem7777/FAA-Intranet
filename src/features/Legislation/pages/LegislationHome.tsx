import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { LegislationHero } from '@/features/Legislation/components/LegislationHero/LegislationHero';
import { LegislationCategoriesGrid } from '../components/Home/LegislationCategoriesGrid';
import { ImportantNoticeCard } from '../components/Home/Notice/ImportantNoticeCard';
import { ImportantNoticeModal } from '../components/Home/Notice/ImportantNoticeModal';
import { performGlobalSearch } from '../slices/legislationSlice';


interface LegislationHomeProps {
  fontSizeMultiplier?: number;
  userRole?: 'admin' | 'user';
}

function LegislationHome({ }: LegislationHomeProps = {}) {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [viewingDocumentId, setViewingDocumentId] = useState<number | null>(null);

  const { globalSearchQuery } = useSelector((state: RootState) => state.legislationSlice);

  useEffect(() => {
    if (globalSearchQuery) {
      dispatch(performGlobalSearch());
    }
  }, [globalSearchQuery, dispatch]);

  const handleViewDocument = (doc: any) => {
    setViewingDocumentId(doc.id);
  };

  const handleBackFromViewer = () => {
    // dispatch(clearDocument());
    setViewingDocumentId(null);
  };

  if (viewingDocumentId !== null) {
    return (
      // <LegislationDocumentViewer
      //   documentId={viewingDocumentId}
      //   onBack={handleBackFromViewer}
      // />
      <div></div>
    );
  }

  if (selectedCategoryId) {
    return (
      // <LegislationDocumentsPage
      //   categoryId={selectedCategoryId}
      //   onBack={() => {
      //     setSelectedCategoryId(null);
      //     dispatch(resetFilters());
      //     dispatch(resetCategories());
      //   }}
      //   onViewDocument={handleViewDocument}
      // />
      <div></div>

    );
  }

  const handleCategorySearch = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div>
      <div className="relative">
        <LegislationHero
          handleCategorySearch={handleCategorySearch}
        />
      </div>
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

