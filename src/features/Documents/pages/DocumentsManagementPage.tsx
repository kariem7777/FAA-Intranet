import { useState, useEffect, type Key } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Select } from '@/shared/components/ui/select';
import { DeleteConfirmationDialog } from '../components/DocumentManagement/DeleteConfirmationDialog';
import { AddDocumentDialog } from '../components/DocumentManagement/AddDocumentDialog';
import { EditDocumentDialog } from '../components/DocumentManagement/EditDocumentDialog';
import { DocumentsTable } from '../components/DocumentManagement/DocumentsTable';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import type { Document } from '../types';
import { fetchDocuments, setPageNumber, setSearchQuery, setSelectedSubCategory, setSelectedEntity, setSelectedCategory, resetFilters } from '../slices/documentsManagementSlice';
import { fetchSubCategoriesByCategory } from '@/features/Legislation/slices/legislationSlice';
import { LegislationHero } from '@/features/Legislation/components/LegislationHero/LegislationHero';
import { RotateCcw } from 'lucide-react';

interface DocumentsManagementPageProps {
  onAddDocument: () => void;
  onEditDocument: (document: Document) => void;
  onBack?: () => void;
}

export function DocumentsManagementPage({ }: DocumentsManagementPageProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const dispatch = useAppDispatch();
  const { items: documents, loading, filters, pagination } = useAppSelector((state) => state.documentsManagement);
  const { entities, categories, subCategories } = useAppSelector((state) => state.legislationSlice);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editDocument, setEditDocument] = useState<Document | null>(null);
  const [deleteDocument, setDeleteDocument] = useState<Document | null>(null);
  const [viewingDocumentId, setViewingDocumentId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(resetFilters());
  }, [])

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch, filters, pagination.pageNumber]);

  // Fetch sub-categories when category is selected
  useEffect(() => {
    if (filters.selectedCategory && filters.selectedCategory !== null) {
      const categoryId = Number(filters.selectedCategory);
      if (!isNaN(categoryId)) {
        dispatch(fetchSubCategoriesByCategory({ categoryId }));
      }
    }
  }, [dispatch, filters.selectedCategory]);

  const handlePageChange = (page: number) => {
    dispatch(setPageNumber(page));
  };

  const handlePreviewDocument = (doc: Document) => {
    setViewingDocumentId(doc.id);
  };

  const handleBackFromViewer = () => {
    // dispatch(clearDocument());
    setViewingDocumentId(null);
  };

  // If viewing a document, show the document viewer
  if (viewingDocumentId !== null) {
    return (
      // <LegislationDocumentViewer
      //   documentId={viewingDocumentId}
      //   onBack={handleBackFromViewer}
      // />
      <div>

      </div>
    );
  }


  const fontFamily = isArabic
    ? 'Dubai, Arial, sans-serif'
    : 'Inter, system-ui, sans-serif';


  const showSubCategoryFilter = filters.selectedCategory && filters.selectedCategory !== null;

  return (
    <div className="min-h-screen " style={{ backgroundColor: 'rgb(250, 250, 248)' }}>
      <LegislationHero
        mode="documents"
        onAddDocument={() => setIsAddDialogOpen(true)}
      />
      <div className="px-20 py-10 animate-fadeIn">
        <div className="flex flex-col gap-6">
          {/* Search Bar Section */}
          <div className="bg-white px-8 py-6 shadow-sm border border-gray-100" style={{ borderRadius: '12px' }}>
            <div className="relative">
              <Search className={`absolute ${isArabic ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 h-6 w-6 text-[#9CA3AF]`} />
              <Input
                type="text"
                placeholder={t('legislation.documentsManagement.searchPlaceholder')}
                value={filters.searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className={`${isArabic ? 'pr-14' : 'pl-14'} h-16 text-[18px] rounded-xl bg-[#F3F4F6] border-faa-primary/30`}
              />
            </div>
          </div>

          {/* Filters Bar Section */}
          <div className="bg-white px-8 py-8 shadow-sm border border-gray-100" style={{ borderRadius: '12px' }}>
            <div className="flex flex-col gap-6">


              <div className="flex flex-wrap items-end gap-6">
                {/* Entity Filter */}
                <div className="flex-1 min-w-[240px] space-y-2">
                  <label className="text-[14px] font-bold text-[#6B7280] uppercase tracking-wider px-1">
                    {t('legislation.documentsManagement.entity')}
                  </label>
                  <div className="relative">
                    <Select
                      value={filters.selectedEntity || 'null'}
                      onChange={(e) => dispatch(setSelectedEntity(e.target.value == 'null' ? null : Number(e.target.value)))}
                      className="h-14 bg-[#F9FAFB] border-faa-primary/30"
                    >
                      <option value='null'>{t('legislation.documentsManagement.allEntities')}</option>
                      {entities.items.map(entity => (
                        <option key={entity.entityId} value={entity.entityId}>
                          {isArabic ? entity.entityNameAr : entity.entityName}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex-1 min-w-[240px] space-y-2">
                  <label className="text-[14px] font-bold text-[#6B7280] uppercase tracking-wider px-1">
                    {t('legislation.documentsManagement.category')}
                  </label>
                  <div className="relative">
                    <Select
                      value={filters.selectedCategory || 'null'}
                      onChange={(e) => dispatch(setSelectedCategory(e.target.value == 'null' ? null : Number(e.target.value)))}
                      className="h-14 bg-[#F9FAFB] border-gray-200"
                    >
                      <option value="null">{t('legislation.documentsManagement.allCategories')}</option>
                      {categories.items.map(category => (
                        <option key={category.id} value={category.id}>
                          {isArabic ? category.lawCategoryAr : (category.lawCategoryEn)}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* Sub-Category Filter */}
                {showSubCategoryFilter && (
                  <div className="flex-1 min-w-[240px] space-y-2 animate-fadeInFast">
                    <label className="text-[14px] font-bold text-[#6B7280] uppercase tracking-wider px-1">
                      {isArabic ? 'التصنيف الفرعي' : 'Sub-Category'}
                    </label>
                    <div className="relative">
                      <Select
                        value={filters.selectedSubCategory || 'null'}
                        onChange={(e) => dispatch(setSelectedSubCategory(e.target.value == 'null' ? null : Number(e.target.value)))}
                        className="h-14 bg-[#F9FAFB] border-faa-primary/30"
                        disabled={subCategories.loading}
                      >
                        <option value="null">
                          {subCategories.loading
                            ? t('common.loading')
                            : t('legislation.documentsManagement.allSubCategories')}
                        </option>
                        {subCategories.items.map(subCategory => (
                          <option key={subCategory.id} value={subCategory.id}>
                            {isArabic ? subCategory.lawSubCategoryAr : subCategory.lawSubCategoryEn}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}

                {/* Reset Button */}
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="h-14 px-8 flex items-center gap-3 bg-white border-2 border-faa-primary/30 text-[#4B5563] hover:bg-gray-50 hover:border-faa-primary/50 hover:text-[#1D293D] transition-all duration-300 shadow-md group active:scale-95"
                  style={{ borderRadius: '10px', fontFamily, fontWeight: 700 }}
                  title={isArabic ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
                >
                  <RotateCcw className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
                  <span>{isArabic ? 'إعادة ضبط' : 'Reset'}</span>
                </button>
              </div>
            </div>
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
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInFast {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fadeInFast { animation: fadeInFast 0.3s ease-out; }
      `}</style>

      {/* Dialogs */}
      <AddDocumentDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {
        editDocument && (
          <EditDocumentDialog
            isOpen={true}
            onClose={() => setEditDocument(null)}
            document={editDocument}
          />
        )
      }

      {
        deleteDocument && (
          <DeleteConfirmationDialog
            isOpen={true}
            document={deleteDocument}
            onClose={() => setDeleteDocument(null)}
          />
        )
      }
    </div >
  );
}