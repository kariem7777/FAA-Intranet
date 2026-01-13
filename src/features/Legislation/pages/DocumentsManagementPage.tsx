import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { DeleteConfirmationDialog } from '../components/DocumentsManagement/DeleteConfirmationDialog';
import { AddDocumentDialog } from '../components/DocumentsManagement/AddDocumentDialog';
import { EditDocumentDialog } from '../components/DocumentsManagement/EditDocumentDialog';
import { DocumentsTable } from '../components/DocumentsManagement/DocumentsTable';
import { LegislationDocumentViewer } from './LegislationDocumentViewer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchDocuments,
  fetchDocumentsEntities,
  fetchDocumentsCategories,
  setSearchQuery,
  setSelectedLegislation,
  setSelectedCategory,
  setSelectedEntity,
  setPageNumber
} from '../slices/documentsManagementSlice';
import { clearDocument } from '../slices/legislationDocumentSlice';
import type { DocumentDto } from '../services/DocumentsService';
import { LegislationHero } from '../components/LegislationHero';

interface DocumentsManagementPageProps {
  onAddDocument: () => void;
  onEditDocument: (document: DocumentDto) => void;
  onBack?: () => void;
}

export function DocumentsManagementPage({ }: DocumentsManagementPageProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const dispatch = useAppDispatch();
  const { items: documents, loading, filters, entities, categories, pagination } = useAppSelector((state) => state.documentsManagement);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editDocument, setEditDocument] = useState<DocumentDto | null>(null);
  const [deleteDocument, setDeleteDocument] = useState<DocumentDto | null>(null);
  const [viewingDocumentId, setViewingDocumentId] = useState<number | null>(null);

  // Initial Fetch
  useEffect(() => {
    dispatch(fetchDocuments());
    dispatch(fetchDocumentsEntities());
  }, [dispatch]);

  useEffect(() => {
    const legislationIdMap: Record<string, number> = {
      'entityLegislation': 1,
      'federalLegislation': 2,
      'localLegislation': 3,
      'supremeCommittee': 4,
      'faaLegalOpinions': 5,
      'faaLegislation': 6,
    };

    if (filters.selectedLegislation && filters.selectedLegislation !== 'all') {
      const id = legislationIdMap[filters.selectedLegislation];
      if (id) {
        dispatch(fetchDocumentsCategories(id));
      }
    }
  }, [dispatch, filters.selectedLegislation]);

  // Re-fetch when filters change (debouncing could be added for search in a real app, but for now simple effect)
  // Ideally, use a separate useEffect for search query with debounce
  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch, filters, pagination.pageNumber]);

  const handlePageChange = (page: number) => {
    dispatch(setPageNumber(page));
  };

  const handlePreviewDocument = (doc: DocumentDto) => {
    // Store the document ID to trigger the viewer
    setViewingDocumentId(doc.id);
  };

  const handleBackFromViewer = () => {
    dispatch(clearDocument());
    setViewingDocumentId(null);
  };

  // If viewing a document, show the document viewer
  if (viewingDocumentId !== null) {
    return (
      <LegislationDocumentViewer
        documentId={viewingDocumentId}
        onBack={handleBackFromViewer}
      />
    );
  }


  const fontFamily = isArabic
    ? 'Dubai, Arial, sans-serif'
    : 'Inter, system-ui, sans-serif';

  const legislations = [
    { id: 'all', name: t('legislation.documentsManagement.allLegislations') },
    { id: 'entityLegislation', name: t('legislation.categories.entityLegislation.title') },
    { id: 'federalLegislation', name: t('legislation.categories.federalLegislation.title') },
    { id: 'localLegislation', name: t('legislation.categories.localLegislation.title') },
    { id: 'supremeCommittee', name: t('legislation.categories.supremeCommittee.title') },
    { id: 'faaLegislation', name: t('legislation.categories.faaLegislation.title') },
  ];

  const showCategoryFilter = filters.selectedLegislation !== 'all' && filters.selectedLegislation !== 'supremeCommittee';

  return (
    <div className="min-h-screen bg-[#F9FAFB]" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Banner Section */}
      <LegislationHero
        mode="documents"
        onAddDocument={() => setIsAddDialogOpen(true)}
      />

      {/* Content Below Banner */}
      <div className="px-20 py-10 animate-fadeIn">

        {/* Search & Filters */}
        <div className="bg-white px-8 py-6" style={{ borderRadius: '8px' }}>
          <div className={`grid gap-5 ${showCategoryFilter ? 'grid-cols-4' : 'grid-cols-3'}`}>

            {/* Search */}
            <div className="relative">
              <Search className={`absolute ${isArabic ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280]`} />
              <Input
                type="text"
                placeholder={t('legislation.documentsManagement.searchPlaceholder')}
                value={filters.searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className={`${isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'} h-14 bg-[#F9FAFB] hover:bg-white focus:bg-white transition-colors duration-200 text-[17px] text-[#1D293D] border-none rounded-md`}
                style={{ fontFamily, fontWeight: 500 }}
              />
            </div>

            {/* Legislation Filter */}
            <div className="relative">
              <select
                value={filters.selectedLegislation}
                onChange={(e) => dispatch(setSelectedLegislation(e.target.value))}
                className={`w-full h-14 px-4 bg-[#F9FAFB] hover:bg-white focus:bg-white text-[#1D293D] appearance-none transition-colors duration-200 cursor-pointer text-[17px] ${isArabic ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
                style={{ fontFamily, fontWeight: 600, borderRadius: '6px' }}
              >
                {legislations.map(legislation => (
                  <option key={legislation.id} value={legislation.id}>
                    {legislation.name}
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280] pointer-events-none`} />
            </div>

            {/* Entity Filter */}
            <div className="relative">
              <select
                value={filters.selectedEntity}
                onChange={(e) => dispatch(setSelectedEntity(e.target.value))}
                className={`w-full h-14 px-4 bg-[#F9FAFB] hover:bg-white focus:bg-white text-[#1D293D] appearance-none transition-colors duration-200 cursor-pointer text-[17px] ${isArabic ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
                style={{ fontFamily, fontWeight: 600, borderRadius: '6px' }}
              >
                <option value="all">{t('legislation.documentsManagement.allEntities')}</option>
                {entities.map(entity => (
                  <option key={entity.id} value={entity.id}>
                    {isArabic ? entity.nameAr : entity.nameEn}
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280] pointer-events-none`} />
            </div>

            {/* Category Filter */}
            {showCategoryFilter && (
              <div className="relative">
                <select
                  value={filters.selectedCategory}
                  onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
                  className={`w-full h-14 px-4 bg-[#F9FAFB] hover:bg-white focus:bg-white text-[#1D293D] appearance-none transition-colors duration-200 cursor-pointer text-[17px] ${isArabic ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
                  style={{ fontFamily, fontWeight: 600, borderRadius: '6px' }}
                >
                  <option value="all">{t('legislation.documentsManagement.allCategories')}</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {isArabic ? category.nameAr : (category.nameEn || category.name)}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280] pointer-events-none`} />
              </div>
            )}
          </div>
        </div>

        {/* Documents Table */}
        <DocumentsTable
          documents={documents}
          loading={loading.fetch}
          onPreview={handlePreviewDocument}
          onEdit={setEditDocument}
          onDelete={setDeleteDocument}
          isArabic={isArabic}
          fontFamily={fontFamily}
          currentPage={pagination.pageNumber}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>

      {/* Dialogs */}
      <AddDocumentDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {editDocument && (
        <EditDocumentDialog
          isOpen={true}
          onClose={() => setEditDocument(null)}
          document={editDocument}
        />
      )}

      {deleteDocument && (
        <DeleteConfirmationDialog
          isOpen={true}
          document={deleteDocument}
          onClose={() => setDeleteDocument(null)}
        />
      )}
    </div>
  );
}