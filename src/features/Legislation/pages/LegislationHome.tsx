import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCategories, resetFilters } from '@/features/Legislation/slices/legislationSlice';
import { fetchEntities, performGlobalSearch } from '@/features/Legislation/slices/heroSlice';
import { clearDocument } from '@/features/Legislation/slices/legislationDocumentSlice';
import { LegislationHero, ImportantNoticeModal, ImportantNoticeCard, LegislationCategoriesGrid } from '../components';
import { LegislationDocumentsPage } from './LegislationDocumentsPage';
import { LegislationDocumentViewer } from './LegislationDocumentViewer';
import { LEGISLATION_CATEGORIES } from '../config/categories.config';
import type { AppDispatch, RootState } from '@/store';
import type { LegislationDocument } from '../types';


interface LegislationHomeProps {
  fontSizeMultiplier?: number;
  userRole?: 'admin' | 'user';
}

function LegislationHome({ }: LegislationHomeProps = {}) {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [viewingDocumentId, setViewingDocumentId] = useState<number | null>(null);

  const { globalSearchQuery } = useSelector((state: RootState) => state.hero);

  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch]);

  useEffect(() => {
    if (globalSearchQuery) {
      dispatch(performGlobalSearch());
    }
  }, [globalSearchQuery, dispatch]);

  const handleViewDocument = (doc: LegislationDocument) => {
    setViewingDocumentId(doc.id);
  };

  const handleBackFromViewer = () => {
    dispatch(clearDocument());
    setViewingDocumentId(null);
  };

  if (viewingDocumentId !== null) {
    return (
      <LegislationDocumentViewer
        documentId={viewingDocumentId}
        onBack={handleBackFromViewer}
      />
    );
  }

  if (selectedCategoryId) {
    return (
      <LegislationDocumentsPage
        categoryId={selectedCategoryId}
        onBack={() => {
          setSelectedCategoryId(null);
          dispatch(resetFilters());
          dispatch(resetCategories());
        }}
        onViewDocument={handleViewDocument}
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

