import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Search, Plus, FileText, Download, Eye, Edit, Trash2, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { LegislationBanner } from './LegislationBanner';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

interface Document {
  id: number;
  title: string;
  entity: string;
  legislation: string;
  category: string;
  uploadDate: string;
  uploadedBy: string;
  classification: 'Public' | 'Secret';
  fileSize: string;
  fileType: string;
}

interface DocumentsManagementPageProps {
  onAddDocument: () => void;
  onEditDocument: (document: Document) => void;
  onPreviewDocument?: (document: Document) => void;
  onBack?: () => void;
}

export function DocumentsManagementPage({ onAddDocument, onEditDocument, onPreviewDocument, onBack }: DocumentsManagementPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLegislation, setSelectedLegislation] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEntity, setSelectedEntity] = useState<string>('all');
  const [deleteDocument, setDeleteDocument] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  // Legislation Platform Theme Colors
  const legislationColors = {
    primary: '#2F4F6F',      // Deep Blue-Gray (legislation primary)
    accent: '#C9A24D',       // Muted Gold
    bgOffWhite: '#F7F8FA',   // Off-White
  };

  // Typography - Use Dubai font for Arabic
  const fontFamily = isArabic 
    ? 'Dubai, Arial, sans-serif' 
    : 'Inter, system-ui, sans-serif';

  // Reset category when legislation changes
  useEffect(() => {
    setSelectedCategory('all');
  }, [selectedLegislation]);

  // Initialize documents with mock data
  useEffect(() => {
    // Mock data - would come from API in production
    const mockDocuments: Document[] = [
      {
        id: 1,
        title: isArabic ? 'القانون الاتحادي رقم 7 لسنة 2017' : 'Federal Law No. 7 of 2017',
        entity: isArabic ? 'الحكومة الاتحادية' : 'Federal Government',
        legislation: 'federalLegislation',
        category: 'laws',
        uploadDate: '2024-01-15',
        uploadedBy: isArabic ? 'أحمد محمد' : 'Ahmed Mohammed',
        classification: 'Public',
        fileSize: '2.4 MB',
        fileType: 'PDF',
      },
      {
        id: 2,
        title: isArabic ? 'قرار مجلس الوزراء رقم 23 لسنة 2023' : 'Cabinet Resolution No. 23 of 2023',
        entity: isArabic ? 'مجلس الوزراء' : 'Cabinet',
        legislation: 'federalLegislation',
        category: 'resolutions',
        uploadDate: '2024-02-20',
        uploadedBy: isArabic ? 'فاطمة علي' : 'Fatima Ali',
        classification: 'Secret',
        fileSize: '1.8 MB',
        fileType: 'PDF',
      },
      {
        id: 3,
        title: isArabic ? 'قانون أبوظبي رقم 12 لسنة 2023' : 'Abu Dhabi Law No. 12 of 2023',
        entity: isArabic ? 'حكومة أبوظبي' : 'Abu Dhabi Government',
        legislation: 'localLegislation',
        category: 'emiratiLaws',
        uploadDate: '2024-03-10',
        uploadedBy: isArabic ? 'سالم خالد' : 'Salem Khaled',
        classification: 'Public',
        fileSize: '3.2 MB',
        fileType: 'PDF',
      },
      {
        id: 4,
        title: isArabic ? 'رأي قانوني رقم 145 لسنة 2024' : 'Legal Opinion No. 145 of 2024',
        entity: isArabic ? 'هيئة التدقيق المالي' : 'Financial Audit Authority',
        legislation: 'supremeCommittee',
        category: 'all',
        uploadDate: '2024-04-05',
        uploadedBy: isArabic ? 'مريم سعيد' : 'Mariam Saeed',
        classification: 'Secret',
        fileSize: '1.5 MB',
        fileType: 'PDF',
      },
      {
        id: 5,
        title: isArabic ? 'قرار الهيئة رقم 8 لسنة 2024' : 'Authority Decision No. 8 of 2024',
        entity: isArabic ? 'هيئة التدقيق المالي' : 'Financial Audit Authority',
        legislation: 'faaLegislation',
        category: 'regulations',
        uploadDate: '2024-05-12',
        uploadedBy: isArabic ? 'يوسف حسن' : 'Youssef Hassan',
        classification: 'Public',
        fileSize: '2.1 MB',
        fileType: 'PDF',
      },
      {
        id: 6,
        title: isArabic ? 'لائحة داخلية رقم 3 لسنة 2024' : 'Internal Regulation No. 3 of 2024',
        entity: isArabic ? 'بنك أبوظبي التجاري' : 'Abu Dhabi Commercial Bank',
        legislation: 'entityLegislation',
        category: 'policies',
        uploadDate: '2024-06-01',
        uploadedBy: isArabic ? 'خالد أحمد' : 'Khaled Ahmed',
        classification: 'Secret',
        fileSize: '1.9 MB',
        fileType: 'PDF',
      },
    ];
    setDocuments(mockDocuments);
  }, [isArabic]);

  const content = {
    en: {
      pageTitle: 'Documents Management',
      pageDescription: 'Manage and organize all legislative documents across categories',
      addDocument: 'Add Document',
      searchPlaceholder: 'Search documents by title or entity...',
      filterByLegislation: 'Legislation Type',
      filterByCategory: 'Category',
      filterByEntity: 'Entity',
      allLegislations: 'All Legislations',
      allCategories: 'All Categories',
      allEntities: 'All Entities',
      documentTitle: 'Document Title',
      entity: 'Entity',
      legislation: 'Legislation',
      category: 'Category',
      uploadDate: 'Upload Date',
      uploadedBy: 'Uploaded By',
      classification: 'Classification',
      actions: 'Actions',
      public: 'Public',
      secret: 'Secret',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      download: 'Download',
      noDocuments: 'No documents found matching your criteria',
      totalDocuments: 'Total Documents',
      legislations: {
        entityLegislation: "Entity's Legislation",
        federalLegislation: 'Federal Legislation',
        localLegislation: 'Local Legislation',
        supremeCommittee: "Supreme Committee's Legal Opinion",
        faaLegislation: "FAA's Legislation",
      },
      federalCategories: {
        laws: 'Federal Laws',
        decrees: 'Federal Decrees',
        resolutions: 'Cabinet Resolutions',
        decisions: 'Ministerial Decisions',
      },
      localCategories: {
        emiratiLaws: 'Emirati Laws',
        emiratiDecrees: 'Emirati Decrees',
        localResolutions: 'Local Resolutions',
      },
      entityCategories: {
        regulations: 'Regulations',
        policies: 'Internal Policies',
        circulars: 'Administrative Circulars',
      },
    },
    ar: {
      pageTitle: 'إدارة الوثائق',
      pageDescription: 'إدارة وتنظيم جميع الوثائق التشريعية عبر الفئات',
      addDocument: 'إضافة وثيقة',
      searchPlaceholder: 'البحث عن الوثائق بالعنوان أو الجهة...',
      filterByLegislation: 'نوع التشريع',
      filterByCategory: 'الفئة',
      filterByEntity: 'الجهة',
      allLegislations: 'جميع التشريعات',
      allCategories: 'جميع الفئات',
      allEntities: 'جميع الجهات',
      documentTitle: 'عنوان الوثيقة',
      entity: 'الجهة',
      legislation: 'التشريع',
      category: 'الفئة',
      uploadDate: 'تاريخ الرفع',
      uploadedBy: 'تم الرفع بواسطة',
      classification: 'التصنيف',
      actions: 'الإجراءات',
      public: 'عامة',
      secret: 'سرية',
      view: 'عرض',
      edit: 'تعديل',
      delete: 'حذف',
      download: 'تحميل',
      noDocuments: 'لم يتم العثور على وثائق مطابقة للمعايير',
      totalDocuments: 'إجمالي الوثائق',
      legislations: {
        entityLegislation: 'تشريعات الجهات الخاضعة',
        federalLegislation: 'التشريعات الاتحادية',
        localLegislation: 'التشريعات المحلية',
        supremeCommittee: 'فتاوى اللجنة العليا للتشريعات',
        faaLegislation: 'تشريعات الجهاز',
      },
      federalCategories: {
        laws: 'قوانين اتحادية',
        decrees: 'مراسيم اتحادية',
        resolutions: 'قرارات مجلس الوزراء',
        decisions: 'قرارات وزارية',
      },
      localCategories: {
        emiratiLaws: 'قوانين إماراتية',
        emiratiDecrees: 'مراسيم إماراتية',
        localResolutions: 'قرارات محلية',
      },
      entityCategories: {
        regulations: 'لوائح',
        policies: 'سياسات داخلية',
        circulars: 'تعاميم إدارية',
      },
    },
  };

  const t = content[language];

  const legislations = [
    { id: 'all', name: t.allLegislations },
    { id: 'entityLegislation', name: t.legislations.entityLegislation },
    { id: 'federalLegislation', name: t.legislations.federalLegislation },
    { id: 'localLegislation', name: t.legislations.localLegislation },
    { id: 'supremeCommittee', name: t.legislations.supremeCommittee },
    { id: 'faaLegislation', name: t.legislations.faaLegislation },
  ];

  // Get categories based on selected legislation
  const getCategories = () => {
    const allOption = [{ id: 'all', name: t.allCategories }];
    
    switch (selectedLegislation) {
      case 'federalLegislation':
        return [
          ...allOption,
          { id: 'laws', name: t.federalCategories.laws },
          { id: 'decrees', name: t.federalCategories.decrees },
          { id: 'resolutions', name: t.federalCategories.resolutions },
          { id: 'decisions', name: t.federalCategories.decisions },
        ];
      case 'localLegislation':
        return [
          ...allOption,
          { id: 'emiratiLaws', name: t.localCategories.emiratiLaws },
          { id: 'emiratiDecrees', name: t.localCategories.emiratiDecrees },
          { id: 'localResolutions', name: t.localCategories.localResolutions },
        ];
      case 'entityLegislation':
      case 'faaLegislation':
        return [
          ...allOption,
          { id: 'regulations', name: t.entityCategories.regulations },
          { id: 'policies', name: t.entityCategories.policies },
          { id: 'circulars', name: t.entityCategories.circulars },
        ];
      default:
        return allOption;
    }
  };

  const entities = [
    { id: 'all', name: t.allEntities },
    { id: 'federal', name: isArabic ? 'الحكومة الاتحادية' : 'Federal Government' },
    { id: 'cabinet', name: isArabic ? 'مجلس الوزراء' : 'Cabinet' },
    { id: 'abudhabi', name: isArabic ? 'حكومة أبوظبي' : 'Abu Dhabi Government' },
    { id: 'faa', name: isArabic ? 'هيئة التدقيق المالي' : 'Financial Audit Authority' },
    { id: 'bank', name: isArabic ? 'بنك أبوظبي التجاري' : 'Abu Dhabi Commercial Bank' },
  ];

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.entity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLegislation = selectedLegislation === 'all' || doc.legislation === selectedLegislation;
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesEntity = selectedEntity === 'all' || doc.entity.includes(entities.find(e => e.id === selectedEntity)?.name || '');
    
    return matchesSearch && matchesLegislation && matchesCategory && matchesEntity;
  });

  // Get display name for legislation and category
  const getLegislationName = (legislationId: string) => {
    const legislation = legislations.find(l => l.id === legislationId);
    return legislation?.name || '';
  };

  const getCategoryName = (legislationId: string, categoryId: string) => {
    if (categoryId === 'all') return '';
    
    switch (legislationId) {
      case 'federalLegislation':
        return t.federalCategories[categoryId as keyof typeof t.federalCategories] || '';
      case 'localLegislation':
        return t.localCategories[categoryId as keyof typeof t.localCategories] || '';
      case 'entityLegislation':
      case 'faaLegislation':
        return t.entityCategories[categoryId as keyof typeof t.entityCategories] || '';
      default:
        return '';
    }
  };

  const categories = getCategories();
  const showCategoryFilter = selectedLegislation !== 'all' && selectedLegislation !== 'supremeCommittee';

  return (
    <div className="min-h-screen bg-[#F9FAFB]" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Banner Section with Add Button */}
      <div className="relative">
        <LegislationBanner 
          title={{
            en: 'Documents Management',
            ar: 'إدارة الوثائق'
          }}
          description={{
            en: 'Centralized platform to upload, organize, and manage all legislative documents with advanced categorization and filtering.',
            ar: 'منصة مركزية لرفع وتنظيم وإدارة جميع الوثائق التشريعية مع تصنيف وتصفية متقدمة.'
          }}
        />
        <div className="absolute top-0 end-0 px-20 h-full flex items-center" >
          <Button
            onClick={onAddDocument}
            style={{ 
              backgroundColor: legislationColors.accent,
              fontFamily,
              fontWeight: 700,
              fontSize: '18px',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#B8933D';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = legislationColors.accent;
            }}
            className="text-white px-8 py-6 flex items-center gap-3 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            {t.addDocument}
          </Button>
        </div>
      </div>

      {/* Content Below Banner */}
      <div className="px-20 py-10 animate-fadeIn">
        
       

        {/* Search & Filters - Single Horizontal Bar */}
        <div className="bg-white px-8 py-6" style={{ borderRadius: '8px' }}>
          <div className={`grid gap-5 ${showCategoryFilter ? 'grid-cols-4' : 'grid-cols-3'}`}>
            
            {/* Search - Visually Dominant */}
            <div className="relative">
              <Search className={`absolute ${isArabic ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280]`} />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'} h-14 bg-[#F9FAFB] hover:bg-white focus:bg-white transition-colors duration-200 text-[17px] text-[#1D293D]`}
                style={{ 
                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '6px',
                }}
              />
            </div>

            {/* Legislation Filter */}
            <div className="relative">
              <select
                value={selectedLegislation}
                onChange={(e) => setSelectedLegislation(e.target.value)}
                className={`w-full h-14 px-4 bg-[#F9FAFB] hover:bg-white focus:bg-white text-[#1D293D] appearance-none transition-colors duration-200 cursor-pointer text-[17px] ${isArabic ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
                style={{ 
                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', 
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '6px',
                }}
              >
                {legislations.map(legislation => (
                  <option key={legislation.id} value={legislation.id}>
                    {legislation.name}
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280] pointer-events-none`} />
            </div>

            {/* Category Filter - Conditional */}
            {showCategoryFilter && (
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full h-14 px-4 bg-[#F9FAFB] hover:bg-white focus:bg-white text-[#1D293D] appearance-none transition-colors duration-200 cursor-pointer text-[17px] ${isArabic ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
                  style={{ 
                    fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', 
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '6px',
                  }}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280] pointer-events-none`} />
              </div>
            )}

            {/* Entity Filter */}
            <div className="relative">
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                className={`w-full h-14 px-4 bg-[#F9FAFB] hover:bg-white focus:bg-white text-[#1D293D] appearance-none transition-colors duration-200 cursor-pointer text-[17px] ${isArabic ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
                style={{ 
                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', 
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '6px',
                }}
              >
                {entities.map(entity => (
                  <option key={entity.id} value={entity.id}>
                    {entity.name}
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280] pointer-events-none`} />
            </div>
          </div>
        </div>

        {/* Documents Table - Modern Enterprise Design */}
        <div className="bg-white overflow-hidden" style={{ borderRadius: '8px' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr 
                  className="bg-[#ffffff] border-b-2" 
                  style={{ borderColor: legislationColors.primary }}
                >
                  <th 
                    className={`px-8 py-6 text-${isArabic ? 'right' : 'left'} text-[16px] text-[#1D293D] uppercase tracking-wide`} 
                    style={{ fontFamily, fontWeight: 800 }}
                  >
                    {t.documentTitle}
                  </th>
                  <th 
                    className={`px-8 py-6 text-${isArabic ? 'right' : 'left'} text-[16px] text-[#1D293D] uppercase tracking-wide`} 
                    style={{ fontFamily, fontWeight: 800 }}
                  >
                    {t.entity}
                  </th>
                  <th 
                    className={`px-8 py-6 text-${isArabic ? 'right' : 'left'} text-[16px] text-[#1D293D] uppercase tracking-wide`} 
                    style={{ fontFamily, fontWeight: 800 }}
                  >
                    {t.legislation}
                  </th>
                  <th 
                    className={`px-8 py-6 text-${isArabic ? 'right' : 'left'} text-[16px] text-[#1D293D] uppercase tracking-wide`} 
                    style={{ fontFamily, fontWeight: 800 }}
                  >
                    {t.category}
                  </th>
                  <th 
                    className={`px-8 py-6 text-${isArabic ? 'right' : 'left'} text-[16px] text-[#1D293D] uppercase tracking-wide`} 
                    style={{ fontFamily, fontWeight: 800 }}
                  >
                    {t.uploadDate}
                  </th>
                  <th 
                    className={`px-8 py-6 text-${isArabic ? 'right' : 'left'} text-[16px] text-[#1D293D] uppercase tracking-wide`} 
                    style={{ fontFamily, fontWeight: 800 }}
                  >
                    {t.classification}
                  </th>
                  <th 
                    className={`px-8 py-6 text-${isArabic ? 'right' : 'left'} text-[16px] text-[#1D293D] uppercase tracking-wide`} 
                    style={{ fontFamily, fontWeight: 800 }}
                  >
                    {t.actions}
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc, index) => (
                    <tr 
                      key={doc.id} 
                      className="border-t border-[#F3F4F6] hover:bg-[#F9FAFB] hover:scale-[1.02] transition-all duration-200 group cursor-pointer"
                      style={{ 
                        borderLeftWidth: '0px',
                        borderRightWidth: '0px',
                      }}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <FileText 
                            className="h-5 w-5 flex-shrink-0" 
                            style={{ color: legislationColors.primary }}
                          />
                          <span 
                            className="text-[16px] text-[#1D293D]" 
                            style={{ fontFamily, fontWeight: 600 }}
                          >
                            {doc.title}
                          </span>
                        </div>
                      </td>
                      <td 
                        className="px-8 py-6 text-[16px] text-[#6B7280]" 
                        style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', fontWeight: 500 }}
                      >
                        {doc.entity}
                      </td>
                      <td 
                        className="px-8 py-6 text-[16px] text-[#6B7280]" 
                        style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', fontWeight: 500 }}
                      >
                        {getLegislationName(doc.legislation)}
                      </td>
                      <td 
                        className="px-8 py-6 text-[16px] text-[#6B7280]" 
                        style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', fontWeight: 500 }}
                      >
                        {getCategoryName(doc.legislation, doc.category)}
                      </td>
                      <td 
                        className="px-8 py-6 text-[16px] text-[#6B7280]" 
                        style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', fontWeight: 500 }}
                      >
                        {doc.uploadDate}
                      </td>
                      <td className="px-8 py-6">
                        <span 
                          className={`inline-flex items-center px-3 py-1.5 text-[14px] ${
                            doc.classification === 'Public' 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-red-50 text-red-700'
                          }`} 
                          style={{ 
                            fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', 
                            fontWeight: 700,
                            borderRadius: '6px',
                          }}
                        >
                          {doc.classification === 'Public' ? t.public : t.secret}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-2.5 hover:bg-[#F3F4F6] transition-colors duration-150" 
                            title={t.view}
                            style={{ borderRadius: '6px' }}
                            onClick={() => {
                              if (onPreviewDocument) {
                                // Transform document data for LegislationDocumentViewer
                                const viewerDocument = {
                                  title: doc.title,
                                  titleAr: doc.title, // In a real app, this would be separate
                                  referenceNumber: `DOC-${doc.id}`,
                                  entityName: doc.entity,
                                  entityNameAr: doc.entity, // In a real app, this would be separate
                                  issueDate: doc.uploadDate,
                                  year: new Date(doc.uploadDate).getFullYear(),
                                  classification: doc.classification.toLowerCase(),
                                  uploadedBy: doc.uploadedBy,
                                  fileSize: doc.fileSize,
                                  fileType: doc.fileType,
                                };
                                onPreviewDocument(viewerDocument);
                              }
                            }}
                          >
                            <Eye className="h-5 w-5 text-[#6B7280]" />
                          </button>
                          <button 
                            className="p-2.5 hover:bg-[#F3F4F6] transition-colors duration-150" 
                            title={t.download}
                            style={{ borderRadius: '6px' }}
                          >
                            <Download className="h-5 w-5 text-[#6B7280]" />
                          </button>
                          <button 
                            className="p-2.5 hover:bg-[#F3F4F6] transition-colors duration-150" 
                            title={t.edit} 
                            onClick={() => onEditDocument(doc)}
                            style={{ borderRadius: '6px' }}
                          >
                            <Edit className="h-5 w-5 text-[#6B7280]" />
                          </button>
                          <button 
                            className="p-2.5 hover:bg-red-50 transition-colors duration-150" 
                            title={t.delete}
                            style={{ borderRadius: '6px' }}
                            onClick={() => setDeleteDocument(doc)}
                          >
                            <Trash2 className="h-5 w-5 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-8 py-16 text-center">
                      <FileText className="h-14 w-14 text-[#D1D5DB] mx-auto mb-4" />
                      <p 
                        className="text-[16px] text-[#6B7280]" 
                        style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', fontWeight: 500 }}
                      >
                        {t.noDocuments}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>

      {/* Delete Confirmation Dialog */}
      {deleteDocument && (
        <DeleteConfirmationDialog
          document={deleteDocument}
          onCancel={() => setDeleteDocument(null)}
          onDelete={() => {
            setDocuments(documents.filter(doc => doc.id !== deleteDocument.id));
            setDeleteDocument(null);
          }}
        />
      )}
    </div>
  );
}