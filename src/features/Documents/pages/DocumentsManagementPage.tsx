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





  const showSubCategoryFilter = filters.selectedCategory && filters.selectedCategory !== null;

  return (
    <div style={{ backgroundColor: 'rgb(250, 250, 248)' }}>
      <LegislationHero
        mode="documents"
        onAddDocument={() => setIsAddDialogOpen(true)}
      />
      <div className="px-20 py-5 animate-fadeIn">
        <div className="flex flex-col gap-6">
          {/* Search Bar Section */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-faa-primary/20 to-faa-primary/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-white px-4 py-3 shadow-sm border border-gray-100/80 rounded-2xl">
              <div className="relative flex items-center">
                <Search className="absolute start-4 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                <Input
                  type="text"
                  placeholder={t('legislation.documentsManagement.searchPlaceholder')}
                  value={filters.searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className={`${isArabic ? 'pr-14' : 'pl-12'} h-12 text-base rounded-xl bg-gray-50/80 border border-gray-200 focus:border-faa-primary/50 focus:bg-white transition-all duration-200 placeholder:text-gray-400`}
                />
              </div>
            </div>
          </div>

          {/* Filters Bar Section */}
          <div className="bg-white shadow-sm border border-gray-100/80 rounded-2xl overflow-hidden">
            {/* Header strip */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50/60">
              <svg className="h-3.5 w-3.5 text-faa-primary/70" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 3.5A.5.5 0 0 1 1.5 3h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 3.5zm2 3A.5.5 0 0 1 3.5 6h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6.5zm2 3A.5.5 0 0 1 5.5 9h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 5 9.5z" />
              </svg>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {isArabic ? 'تصفية النتائج' : 'Filter Results'}
              </span>
            </div>

            <div className="flex flex-wrap items-end gap-4 px-5 py-4">
              {/* Entity Filter */}
              <div className="flex-1 min-w-[200px] space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider px-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-faa-primary/60" />
                  {t('legislation.documentsManagement.entity')}
                </label>
                <Select
                  value={filters.selectedEntity || 'null'}
                  onChange={(e) => dispatch(setSelectedEntity(e.target.value == 'null' ? null : Number(e.target.value)))}
                  className="h-10 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:border-faa-primary/50 focus:bg-white transition-all duration-200 hover:border-gray-300"
                >
                  <option value='null'>{t('legislation.documentsManagement.allEntities')}</option>
                  {entities.items.map(entity => (
                    <option key={entity.entityId} value={entity.entityId}>
                      {isArabic ? entity.entityNameAr : entity.entityName}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-10 bg-gray-100 self-end mb-0.5" />

              {/* Category Filter */}
              <div className="flex-1 min-w-[200px] space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider px-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-faa-primary/60" />
                  {t('legislation.documentsManagement.category')}
                </label>
                <Select
                  value={filters.selectedCategory || 'null'}
                  onChange={(e) => dispatch(setSelectedCategory(e.target.value == 'null' ? null : Number(e.target.value)))}
                  className="h-10 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:border-faa-primary/50 focus:bg-white transition-all duration-200 hover:border-gray-300"
                >
                  <option value="null">{t('legislation.documentsManagement.allCategories')}</option>
                  {categories.items.map(category => (
                    <option key={category.id} value={category.id}>
                      {isArabic ? category.lawCategoryAr : category.lawCategoryEn}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Sub-Category Filter */}
              {showSubCategoryFilter && (
                <>
                  <div className="hidden md:block w-px h-10 bg-gray-100 self-end mb-0.5" />
                  <div className="flex-1 min-w-[200px] space-y-1.5 animate-fadeInFast">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider px-0.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-faa-primary/40" />
                      {isArabic ? 'التصنيف الفرعي' : 'Sub-Category'}
                    </label>
                    <Select
                      value={filters.selectedSubCategory || 'null'}
                      onChange={(e) => dispatch(setSelectedSubCategory(e.target.value == 'null' ? null : Number(e.target.value)))}
                      className="h-10 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:border-faa-primary/50 focus:bg-white transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={subCategories.loading}
                    >
                      <option value="null">
                        {subCategories.loading ? t('common.loading') : t('legislation.documentsManagement.allSubCategories')}
                      </option>
                      {subCategories.items.map(subCategory => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {isArabic ? subCategory.lawSubCategoryAr : subCategory.lawSubCategoryEn}
                        </option>
                      ))}
                    </Select>
                  </div>
                </>
              )}

              {/* Reset Button — inline with filters */}
              {filters && (
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="self-end h-10 px-5 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm font-medium hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-200 group active:scale-95"
                  title={isArabic ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
                >
                  <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
                  <span>{isArabic ? 'إعادة ضبط' : 'Reset'}</span>
                </button>
              )}
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
          currentPage={pagination.pageNumber}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInFast {
      from { opacity: 0; transform: translateX(-6px) scale(0.97); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }
    .animate-fadeIn { animation: fadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
    .animate-fadeInFast { animation: fadeInFast 0.25s ease-out; }
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