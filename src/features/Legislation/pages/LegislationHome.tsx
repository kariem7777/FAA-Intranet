import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '@/store';
import { LegislationHero } from '@/features/Legislation/components/LegislationHero/LegislationHero';
import { LegislationCategoriesGrid } from '../components/Home/LegislationCategoriesGrid';
import { ImportantNoticeCard } from '../components/Home/Notice/ImportantNoticeCard';
import { ImportantNoticeModal } from '../components/Home/Notice/ImportantNoticeModal';
import { resetSubCategories, clearSearch } from '../slices/legislationSlice';
import { LegalOpinions } from '@/features/LegalOpinions/pages/LegalOpinions';
import { OpinionDetailPage } from '@/features/LegalOpinions/pages/OpinionDetailPage';
import { LegislationDocumentsPage } from '@/features/Documents/pages/LegislationDocumentsPage';
import { LegislationDocumentViewer } from '@/features/Documents/pages/LegislationDocumentViewer';
import { clearSelectedDocument, setSearchQuery, setSelectedDocument } from '@/features/Documents/slices/documentsManagementSlice';

function LegislationHome() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const categorySlug = searchParams.get('category');
  const viewingDocumentId = searchParams.get('documentId') ? Number(searchParams.get('documentId')) : null;
  const selectedEnquiryId = searchParams.get('enquiryId') ? Number(searchParams.get('enquiryId')) : null;

  const { categories } = useSelector((state: RootState) => state.legislationSlice);

  const selectedCategoryId = useMemo(() => {
    if (!categorySlug) return null;
    if (categorySlug === 'legal-opinion') return -1;
    const category = categories.items.find((c: any) => c.slug === categorySlug);
    return category ? category.id : null;
  }, [categorySlug, categories.items]);

  const setSelectedCategoryId = (id: number | null) => {
    setSearchParams(prev => {
      if (id === null) {
        prev.delete('category');
      } else if (id === -1) {
        prev.set('category', 'legal-opinion');
      } else {
        const category = categories.items.find((c: any) => c.id === id);
        if (category) {
          prev.set('category', category.slug);
        }
      }
      return prev;
    }, { replace: false });
  };

  const setViewingDocumentId = (id: number | null) => {
    setSearchParams(prev => {
      if (id === null) prev.delete('documentId');
      else prev.set('documentId', id.toString());
      return prev;
    }, { replace: false });
  };

  const setSelectedEnquiryId = (id: number | null) => {
    setSearchParams(prev => {
      if (id === null) prev.delete('enquiryId');
      else prev.set('enquiryId', id.toString());
      return prev;
    }, { replace: false });
  };

  const { globalSearchQuery } = useSelector((state: RootState) => state.legislationSlice);

  const handleViewDocument = (doc: any) => {
    dispatch(setSelectedDocument(doc));
    setViewingDocumentId(doc.id);
  };

  const handleBackFromViewer = () => {
    dispatch(clearSelectedDocument());
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
    if (selectedCategoryId === -1) {
      if (selectedEnquiryId !== null) {
        return (
          <OpinionDetailPage
            id={selectedEnquiryId}
            onBack={() => setSelectedEnquiryId(null)}
          />
        );
      }

      return (
        <LegalOpinions
          onBack={() => setSelectedCategoryId(null)}
          onOpinionSelect={(enquiry) => setSelectedEnquiryId(enquiry.id)}
        />
      );
    }

    return (
      <LegislationDocumentsPage
        categoryId={selectedCategoryId}
        onBack={() => {
          setSelectedCategoryId(null);
          dispatch(resetSubCategories());
        }}
        onViewDocument={handleViewDocument}
      />
    );
  }

  const handleCategorySearch = (categoryId: number) => {
    if (globalSearchQuery) {
      dispatch(setSearchQuery(globalSearchQuery));
      dispatch(clearSearch());
    }
    setSelectedCategoryId(categoryId);
  };

  return (
    <div>
      <div className="relative">
        <LegislationHero
          handleCategorySearch={handleCategorySearch}
          onViewDocument={handleViewDocument}
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
