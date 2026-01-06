import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, ChevronRight, ChevronLeft, Plus, Download as DownloadIcon, Filter, TrendingUp, FileText, Calendar, Eye, ChevronDown, Grid, List as ListIcon, Edit2, Trash2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { DocumentDetailView } from './legislation/DocumentDetailView';
import { DocumentFormModal } from './legislation/DocumentFormModal';

interface CategoryDetailPageProps {
  categoryId: number;
  onBack: () => void;
}

interface LegislationItem {
  id: number;
  nameAr: string;
  nameEn: string;
  entity: string;
  date: string;
  category: number;
  lawNumber?: string;
  issueDate?: string;
  tags?: string[];
  status?: 'active' | 'amended' | 'cancelled';
  description?: string;
  issuingAuthority?: string;
  effectiveDate?: string;
  gazette?: string;
  classification?: 'public' | 'secret';
}

export function CategoryDetailPage({ categoryId, onBack }: CategoryDetailPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [entitySearchQuery, setEntitySearchQuery] = useState('');
  const [isEntityDropdownOpen, setIsEntityDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedDocument, setSelectedDocument] = useState<LegislationItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<LegislationItem | null>(null);
  const [documents, setDocuments] = useState<LegislationItem[]>([]);
  const itemsPerPage = 12;

  // Available entities
  const entities = [
    { id: 'rta', nameEn: 'Roads and Transport Authority', nameAr: 'هيئة الطرق والمواصلات' },
    { id: 'dha', nameEn: 'Dubai Health Authority', nameAr: 'هيئة الصحة بدبي' },
    { id: 'dof', nameEn: 'Department of Finance', nameAr: 'دائرة المالية' },
    { id: 'ded', nameEn: 'Department of Economic Development', nameAr: 'دائرة التنمية الاقتصادية' },
    { id: 'dmcc', nameEn: 'Dubai Multi Commodities Centre', nameAr: 'مركز دبي للسلع المتعددة' },
    { id: 'dewa', nameEn: 'Dubai Electricity and Water Authority', nameAr: 'هيئة كهرباء ومياه دبي' },
    { id: 'dld', nameEn: 'Dubai Land Department', nameAr: 'دائرة الأراضي والأملاك' },
    { id: 'khda', nameEn: 'Knowledge and Human Development Authority', nameAr: 'هيئة المعرفة والتنمية البشرية' },
  ];

  // Category configurations
  const categoryConfigs: Record<number, any> = {
    1: {
      title: isArabic ? "تشريعات الجهة" : "Entity's Legislation",
      description: isArabic ? 'عرض جميع القوانين الحاكمة للجهة' : 'Browse entity governing laws',
      subcategories: [
        { id: 1, name: isArabic ? 'قانون التأسيس' : 'Establishment Law', count: 3 },
        { id: 2, name: isArabic ? 'التشريعات المالية' : 'Financial Legislation', count: 127 },
        { id: 3, name: isArabic ? 'الحكم' : 'Governance', count: 8 },
        { id: 4, name: isArabic ? 'العقود والمشتريات' : 'Contracts & Purchasing', count: 12 },
        { id: 5, name: isArabic ? 'الموارد البشرية' : 'Human Resources', count: 20 },
        { id: 6, name: isArabic ? 'مهام الجهة' : 'Entity Tasks', count: 6 },
      ],
    },
    2: {
      title: isArabic ? 'التشريعات الاتحادية' : 'Federal Legislation',
      description: isArabic ? 'تصفح القوانين والمراسيم والقرارات الاتحادية' : 'Browse federal laws, decrees, and decisions',
      subcategories: [
        { id: 1, name: isArabic ? 'القوانين الاتحادية' : 'Federal Laws', count: 25 },
        { id: 2, name: isArabic ? 'المراسيم الاتحادية' : 'Federal Decrees', count: 18 },
        { id: 3, name: isArabic ? 'القرارات الاتحادية' : 'Federal Decisions', count: 32 },
      ],
    },
    3: {
      title: isArabic ? 'التشريعات المحلية' : 'Local Legislation',
      description: isArabic ? 'تصفح القواعد والتوجيهات على مستوى الإمارة' : 'Browse emirate-level rules and directives',
      subcategories: [
        { id: 1, name: isArabic ? 'قوانين محلية' : 'Local Laws', count: 20 },
        { id: 2, name: isArabic ? 'مراسيم محلية' : 'Local Decrees', count: 15 },
        { id: 3, name: isArabic ? 'قرارات محلية' : 'Local Decisions', count: 28 },
      ],
    },
    4: {
      title: isArabic ? 'الرأي القانوني للجنة العليا' : "Supreme Committee's Legal Opinion",
      description: isArabic ? 'قراءة التفسيرات الرسمية من اللجنة العليا' : 'Read official interpretations from the Supreme Committee',
      subcategories: [],
    },
    5: {
      title: isArabic ? 'الآراء القانونية للجهاز' : 'FAA Legal Opinions',
      description: isArabic ? 'استكشاف التوجيهات القانونية الصادرة عن الجهاز' : 'Explore FAA-issued legal guidance',
      subcategories: [],
    },
    6: {
      title: isArabic ? 'تشريعات الجهاز' : "FAA's Legislation",
      description: isArabic ? 'البحث عن جميع القوانين والفويضات التي تحكم الجهاز' : 'Find all laws and mandates governing the FAA',
      subcategories: [
        { id: 1, name: isArabic ? 'قرارات مجلس الإدارة' : 'Board Decisions', count: 30 },
        { id: 2, name: isArabic ? 'السياسات والإجراءات' : 'Policies & Procedures', count: 25 },
        { id: 3, name: isArabic ? 'التعاميم' : 'Circulars', count: 40 },
        { id: 4, name: isArabic ? 'الأدلة الإرشادية' : 'Guidelines', count: 18 },
      ],
    },
  };

  const currentConfig = categoryConfigs[categoryId] || categoryConfigs[1];

  // Mock legislation data
  const mockData: LegislationItem[] = [
    { 
      id: 1, 
      nameAr: 'قانون رقم (3) لسنة 2016 بشأن إنشاء هيئة التدقيق المالي',
      nameEn: 'Law No. (3) of 2016 on Establishing the Financial Audit Authority',
      entity: 'Roads and Transport Authority',
      date: '2016',
      category: 1,
      lawNumber: 'Law No. (3) of 2016',
      issueDate: 'January 15, 2016',
      effectiveDate: 'March 1, 2016',
      gazette: 'Issue 595',
      issuingAuthority: isArabic ? 'رئيس دولة الإمارات العربية المتحدة' : 'President of the United Arab Emirates',
      description: isArabic ? 'هذا القانون ينشئ هيئة التدقيق المالي ككيان اتحادي مستقل مسؤول عن تدقيق الحسابات الحكومية' : 'This law establishes the FAA as an independent federal entity responsible for auditing government accounts',
      tags: [isArabic ? 'تأسيس' : 'Establishment', isArabic ? 'تدقيق مالي' : 'Financial Audit'],
      status: 'active',
    },
    { 
      id: 2, 
      nameAr: 'قانون رقم (14) لسنة 2009 بشأن إجراءات المحاسبة المالية',
      nameEn: 'Law No. (14) of 2009 on Financial Accounting Procedures',
      entity: 'Dubai Health Authority',
      date: '2009',
      category: 2,
      lawNumber: 'Law No. (14) of 2009',
      issueDate: 'August 20, 2009',
      effectiveDate: 'October 1, 2009',
      gazette: 'Issue 512',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'قانون ينظم إجراءات المحاسبة المالية في الجهات الحكومية' : 'Law regulating financial accounting procedures in government entities',
      status: 'amended',
    },
    { 
      id: 3, 
      nameAr: 'قانون رقم (2) لسنة 2013 بشأن تنظيم إجراءات التعاقد الحكومي',
      nameEn: 'Law No. (2) of 2013 on Organizing Government Procurement',
      entity: 'Department of Finance',
      date: '2013',
      category: 4,
      lawNumber: 'Law No. (2) of 2013',
      issueDate: 'March 10, 2013',
      effectiveDate: 'June 1, 2013',
      gazette: 'Issue 561',
      issuingAuthority: isArabic ? 'مجلس الوزراء' : 'Cabinet of Ministers',
      description: isArabic ? 'ينظم هذا القانون إجراءات التعاقد والمشتريات الحكومية' : 'This law regulates government contracting and procurement procedures',
      status: 'active',
    },
    { 
      id: 4, 
      nameAr: 'قانون رقم (7) لسنة 2018 بشأن التنمية الاقتصادية',
      nameEn: 'Law No. (7) of 2018 on Economic Development',
      entity: 'Department of Economic Development',
      date: '2018',
      category: 1,
      lawNumber: 'Law No. (7) of 2018',
      issueDate: 'May 5, 2018',
      effectiveDate: 'July 1, 2018',
      gazette: 'Issue 601',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'قانون يعزز التنمية الاقتصادية وينظم الأنشطة التجارية' : 'Law promoting economic development and regulating commercial activities',
      status: 'active',
    },
    { 
      id: 5, 
      nameAr: 'قانون رقم (11) لسنة 2020 بشأن تنظيم السلع والتجارة',
      nameEn: 'Law No. (11) of 2020 on Commodities and Trade Regulation',
      entity: 'Dubai Multi Commodities Centre',
      date: '2020',
      category: 2,
      lawNumber: 'Law No. (11) of 2020',
      issueDate: 'September 12, 2020',
      effectiveDate: 'January 1, 2021',
      gazette: 'Issue 625',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'ينظم هذا القانون تجارة السلع ويحدد الإجراءات والمعايير' : 'This law regulates commodities trade and defines procedures and standards',
      status: 'active',
    },
    { 
      id: 6, 
      nameAr: 'قانون رقم (5) لسنة 2015 بشأن الكهرباء والمياه',
      nameEn: 'Law No. (5) of 2015 on Electricity and Water',
      entity: 'Dubai Electricity and Water Authority',
      date: '2015',
      category: 3,
      lawNumber: 'Law No. (5) of 2015',
      issueDate: 'June 20, 2015',
      effectiveDate: 'September 1, 2015',
      gazette: 'Issue 580',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'قانون ينظم خدمات الكهرباء والمياه في الإمارة' : 'Law regulating electricity and water services in the Emirate',
      status: 'active',
    },
    { 
      id: 7, 
      nameAr: 'قانون رقم (9) لسنة 2017 بشأن الأراضي والأملاك',
      nameEn: 'Law No. (9) of 2017 on Land and Property',
      entity: 'Dubai Land Department',
      date: '2017',
      category: 1,
      lawNumber: 'Law No. (9) of 2017',
      issueDate: 'April 8, 2017',
      effectiveDate: 'July 1, 2017',
      gazette: 'Issue 593',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'ينظم هذا القانون تسجيل وتنظيم الأراضي والأملاك' : 'This law regulates land and property registration and management',
      status: 'active',
    },
    { 
      id: 8, 
      nameAr: 'قانون رقم (12) لسنة 2019 بشأن التعليم والتنمية البشرية',
      nameEn: 'Law No. (12) of 2019 on Education and Human Development',
      entity: 'Knowledge and Human Development Authority',
      date: '2019',
      category: 5,
      lawNumber: 'Law No. (12) of 2019',
      issueDate: 'October 15, 2019',
      effectiveDate: 'January 1, 2020',
      gazette: 'Issue 615',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'قانون ينظم قطاع التعليم والتنمية البشرية' : 'Law regulating education and human development sector',
      status: 'active',
    },
    { 
      id: 9, 
      nameAr: 'قانون رقم (6) لسنة 2021 بشأن المناطق الحرة',
      nameEn: 'Law No. (6) of 2021 on Free Zones',
      entity: 'Department of Economic Development',
      date: '2021',
      category: 1,
      lawNumber: 'Law No. (6) of 2021',
      issueDate: 'February 20, 2021',
      effectiveDate: 'April 1, 2021',
      gazette: 'Issue 630',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'قانون ينظم إنشاء وإدارة المناطق الحرة' : 'Law regulating establishment and management of free zones',
      status: 'active',
    },
    { 
      id: 10, 
      nameAr: 'قانون رقم (8) لسنة 2022 بشأن النقل العام',
      nameEn: 'Law No. (8) of 2022 on Public Transportation',
      entity: 'Roads and Transport Authority',
      date: '2022',
      category: 3,
      lawNumber: 'Law No. (8) of 2022',
      issueDate: 'March 15, 2022',
      effectiveDate: 'June 1, 2022',
      gazette: 'Issue 642',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'قانون ينظم خدمات النقل العام والمترو والحافلات' : 'Law regulating public transport services including metro and buses',
      status: 'active',
    },
    { 
      id: 11, 
      nameAr: 'قانون رقم (4) لسنة 2023 بشأن الرعاية الصحية',
      nameEn: 'Law No. (4) of 2023 on Healthcare',
      entity: 'Dubai Health Authority',
      date: '2023',
      category: 2,
      lawNumber: 'Law No. (4) of 2023',
      issueDate: 'January 10, 2023',
      effectiveDate: 'March 1, 2023',
      gazette: 'Issue 655',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'قانون ينظم الرعاية الصحية والمستشفيات الخاصة' : 'Law regulating healthcare and private hospitals',
      status: 'active',
    },
    { 
      id: 12, 
      nameAr: 'قانون رقم (10) لسنة 2024 بشأن الاستدامة البيئية',
      nameEn: 'Law No. (10) of 2024 on Environmental Sustainability',
      entity: 'Dubai Electricity and Water Authority',
      date: '2024',
      category: 4,
      lawNumber: 'Law No. (10) of 2024',
      issueDate: 'May 5, 2024',
      effectiveDate: 'July 1, 2024',
      gazette: 'Issue 670',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'قانون يعزز الاستدامة البيئية والطاقة المتجددة' : 'Law promoting environmental sustainability and renewable energy',
      status: 'active',
    },
    { 
      id: 13, 
      nameAr: 'قانون رقم (15) لسنة 2010 بشأن إدارة الموارد البشرية',
      nameEn: 'Law No. (15) of 2010 on Human Resources Management',
      entity: 'Department of Finance',
      date: '2010',
      category: 5,
      lawNumber: 'Law No. (15) of 2010',
      issueDate: 'November 12, 2010',
      effectiveDate: 'January 1, 2011',
      gazette: 'Issue 525',
      issuingAuthority: isArabic ? 'مجلس الوزراء' : 'Cabinet of Ministers',
      description: isArabic ? 'قانون ينظم إدارة الموارد البشرية في الجهات الحكومية' : 'Law regulating human resources management in government entities',
      status: 'amended',
    },
    { 
      id: 14, 
      nameAr: 'قانون رقم (1) لسنة 2014 بشأن التجارة الإلكترونية',
      nameEn: 'Law No. (1) of 2014 on E-Commerce',
      entity: 'Dubai Multi Commodities Centre',
      date: '2014',
      category: 1,
      lawNumber: 'Law No. (1) of 2014',
      issueDate: 'February 18, 2014',
      effectiveDate: 'May 1, 2014',
      gazette: 'Issue 568',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'قانون ينظم التجارة الإلكترونية والمعاملات الرقمية' : 'Law regulating e-commerce and digital transactions',
      status: 'active',
    },
    { 
      id: 15, 
      nameAr: 'قانون رقم (13) لسنة 2011 بشأن حماية المستهلك',
      nameEn: 'Law No. (13) of 2011 on Consumer Protection',
      entity: 'Department of Economic Development',
      date: '2011',
      category: 2,
      lawNumber: 'Law No. (13) of 2011',
      issueDate: 'July 25, 2011',
      effectiveDate: 'October 1, 2011',
      gazette: 'Issue 538',
      issuingAuthority: isArabic ? 'حاكم دبي' : 'Ruler of Dubai',
      description: isArabic ? 'قانون يحمي حقوق المستهلكين وينظم العلاقة التجارية' : 'Law protecting consumer rights and regulating commercial relationships',
      status: 'active',
    },
  ];

  // Initialize documents from mock data
  useEffect(() => {
    const selectedCategoryData = currentConfig.subcategories.find((sub: any) => sub.id === selectedSubcategory);
    const initialData = Array.from({ length: selectedCategoryData?.count || 10 }, (_, i) => ({
      ...mockData[i % mockData.length],
      id: i + 1,
    }));
    setDocuments(initialData);
  }, [selectedSubcategory]);

  // Repeat for pagination demo - Fix to use actual category counts
  const selectedCategoryData = currentConfig.subcategories.find((sub: any) => sub.id === selectedSubcategory);
  const allData = documents;

  // Filter data
  const filteredData = allData.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      (isArabic ? item.nameAr : item.nameEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lawNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !selectedStatus || item.status === selectedStatus;
    const matchesYear = !selectedYear || item.date === selectedYear;
    const matchesEntity = !selectedEntity || item.entity === selectedEntity;

    return matchesSearch && matchesStatus && matchesYear && matchesEntity;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Content
  const content = {
    en: {
      breadcrumbHome: 'Home',
      breadcrumbLegislation: 'Legislative Categories',
      back: 'Back to Categories',
      searchPlaceholder: 'Search by title or law number...',
      filter: 'Filter',
      showFilters: 'Show Filters',
      hideFilters: 'Hide Filters',
      addNew: 'Add New Document',
      export: 'Export',
      totalDocuments: 'Total Documents',
      activeDocuments: 'Active',
      amendedDocuments: 'Amended',
      recentUpdates: 'Recent Updates',
      lastUpdated: 'Last Updated',
      allCategories: 'All Categories',
      status: 'Status',
      year: 'Year',
      all: 'All',
      active: 'Active',
      amended: 'Amended',
      cancelled: 'Cancelled',
      view: 'View',
      download: 'Download',
      viewMode: 'View Mode',
      grid: 'Grid',
      list: 'List',
      resultsCount: 'results',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      backToCategories: 'Back to Categories',
    },
    ar: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbLegislation: 'الفئات التشريعية',
      back: 'العودة إلى الفئات',
      searchPlaceholder: 'البحث بالعنوان أو رقم القانون...',
      filter: 'تصفية',
      showFilters: 'إظهار الفلاتر',
      hideFilters: 'إخفاء الفلاتر',
      addNew: 'إضافة مستند جديد',
      export: 'تصدير',
      totalDocuments: 'إجمالي المستندات',
      activeDocuments: 'نافذة',
      amendedDocuments: 'معدلة',
      recentUpdates: 'تحديثات حديثة',
      lastUpdated: 'آخر تحديث',
      allCategories: 'كل الفئات',
      status: 'الحالة',
      year: 'السنة',
      all: 'الكل',
      active: 'نافذة',
      amended: 'معدلة',
      cancelled: 'ملغاة',
      view: 'عرض',
      download: 'تنزيل',
      viewMode: 'وضع العرض',
      grid: 'شبكة',
      list: 'قائمة',
      resultsCount: 'نتيجة',
      showing: 'عرض',
      to: 'إلى',
      of: 'من',
      backToCategories: 'العودة إلى الفئات',
    },
  };

  const t = content[language];

  // Handler functions
  const handleAddDocument = () => {
    setEditingDocument(null);
    setIsFormModalOpen(true);
  };

  const handleEditDocument = (doc: LegislationItem) => {
    setEditingDocument(doc);
    setIsFormModalOpen(true);
  };

  const handleDeleteDocument = (docId: number) => {
    if (window.confirm(isArabic ? 'هل أنت متأكد من حذف هذا المستند؟' : 'Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== docId));
    }
  };

  const handleSaveDocument = (documentData: any) => {
    if (editingDocument) {
      // Update existing document
      setDocuments(documents.map(doc => 
        doc.id === editingDocument.id ? { ...documentData, id: editingDocument.id } : doc
      ));
    } else {
      // Add new document
      setDocuments([{ ...documentData, id: Date.now() }, ...documents]);
    }
    setIsFormModalOpen(false);
    setEditingDocument(null);
  };

  // Document detail view
  if (selectedDocument) {
    return (
      <DocumentDetailView
        document={selectedDocument}
        onBack={() => setSelectedDocument(null)}
        onEdit={() => {
          setEditingDocument(selectedDocument);
          setIsFormModalOpen(true);
        }}
        language={language}
      />
    );
  }

  return (
    <div
      className="min-h-screen"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        backgroundColor: '#F5F5F5',
        fontFamily: isArabic ? 'var(--font-family-ar)' : 'var(--font-family-en)',
      }}
    >
      {/* Header Section - White Background, Professional */}
      <div
        className="border-b"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#D1D5DB',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-5" aria-label="Breadcrumb">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {isArabic ? 'الفئات التشريعية' : 'Legislative Categories'}
            </button>
            <ChevronRight size={14} className={`text-gray-400 ${isArabic ? 'rotate-180' : ''}`} />
            <span
              className="text-gray-900"
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              {currentConfig.title}
            </span>
          </nav>

          {/* Page Title and Action Button */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <h1
                className="text-gray-900 mb-2"
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  letterSpacing: '-0.025em',
                }}
              >
                {currentConfig.title}
              </h1>

              {/* Subtitle/Description */}
              <p
                className="text-gray-600"
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-normal)',
                }}
              >
                {currentConfig.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar Panel */}
          {currentConfig.subcategories.length > 1 && (
            <aside className="col-span-12 lg:col-span-3">
              <div
                className="bg-white border"
                style={{
                  borderColor: '#D1D5DB',
                  borderRadius: '8px',
                }}
              >
                {/* Sidebar Header */}
                <div
                  className="px-5 py-4 border-b rounded-t-lg"
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderColor: '#D1D5DB',
                  }}
                >
                  <h3
                    className="text-gray-900"
                    style={{
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    {isArabic ? 'الفئات' : 'Categories'}
                  </h3>
                </div>

                {/* Category List */}
                <nav>
                  {currentConfig.subcategories.map((sub: any, index: number) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubcategory(sub.id);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-${isArabic ? 'right' : 'left'} px-5 py-3.5 border-b transition-colors relative ${
                        selectedSubcategory === sub.id
                          ? 'bg-gray-50 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      } ${index === currentConfig.subcategories.length - 1 ? 'border-b-0' : ''}`}
                      style={{
                        borderColor: '#E5E7EB',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: selectedSubcategory === sub.id ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                        borderBottomLeftRadius: index === currentConfig.subcategories.length - 1 ? '8px' : '0',
                        borderBottomRightRadius: index === currentConfig.subcategories.length - 1 ? '8px' : '0',
                      }}
                    >
                      {/* Left Highlight Bar */}
                      {selectedSubcategory === sub.id && (
                        <div
                          className="absolute top-0 bottom-0 w-1"
                          style={{
                            backgroundColor: '#7b282d',
                            [isArabic ? 'right' : 'left']: 0,
                          }}
                        />
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span>{sub.name}</span>
                        {selectedEntity && (
                          <span
                            className="px-2 py-0.5 text-xs bg-gray-200 text-gray-700"
                            style={{
                              fontWeight: 'var(--font-weight-semibold)',
                              borderRadius: '6px',
                            }}
                          >
                            {sub.count.toLocaleString(isArabic ? 'ar-AE' : 'en-US')}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Right Content Panel */}
          <div className={`col-span-12 ${currentConfig.subcategories.length > 1 ? 'lg:col-span-9' : ''}`}>
            {/* Search & Filters Bar - Structured Horizontal */}
            <div
              className="bg-white border mb-6"
              style={{
                borderColor: '#D1D5DB',
                borderRadius: '8px',
              }}
            >
              <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Entity Filter */}
                  <div className="lg:col-span-4">
                    <label
                      className="block text-gray-700 mb-2"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {isArabic ? 'الجهة' : 'Entity'}
                    </label>
                    <div className="relative">
                      <button
                        className="w-full h-10 px-4 border rounded-md bg-white focus:outline-none transition-colors flex items-center justify-between"
                        style={{
                          borderColor: '#D1D5DB',
                          fontSize: 'var(--font-size-sm)',
                          fontFamily: isArabic ? 'var(--font-family-ar)' : 'var(--font-family-en)',
                        }}
                        onClick={() => setIsEntityDropdownOpen(!isEntityDropdownOpen)}
                      >
                        <span className="text-gray-700">
                          {selectedEntity ? entities.find(entity => entity.nameEn === selectedEntity)?.[isArabic ? 'nameAr' : 'nameEn'] : (isArabic ? 'جميع الجهات' : 'All Entities')}
                        </span>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isEntityDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isEntityDropdownOpen && (
                        <div
                          className="absolute top-full left-0 right-0 mt-1 bg-white border shadow-lg z-50 max-h-80 overflow-y-auto"
                          style={{
                            borderColor: '#D1D5DB',
                            fontFamily: isArabic ? 'var(--font-family-ar)' : 'var(--font-family-en)',
                          }}
                        >
                          {/* Search Input */}
                          <div className="p-3 border-b sticky top-0 bg-white" style={{ borderColor: '#E5E7EB' }}>
                            <input
                              type="text"
                              value={entitySearchQuery}
                              onChange={(e) => setEntitySearchQuery(e.target.value)}
                              placeholder={isArabic ? 'بحث عن جهة...' : 'Search entity...'}
                              className="w-full h-9 px-3 border focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent"
                              style={{
                                borderColor: '#D1D5DB',
                                fontSize: 'var(--font-size-sm)',
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          
                          {/* All Entities Option */}
                          <button
                            onClick={() => {
                              setSelectedEntity('');
                              setEntitySearchQuery('');
                              setIsEntityDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-${isArabic ? 'right' : 'left'} hover:bg-gray-50 transition-colors border-b ${
                              !selectedEntity ? 'bg-gray-50' : ''
                            }`}
                            style={{
                              borderColor: '#E5E7EB',
                              fontSize: 'var(--font-size-sm)',
                              fontWeight: !selectedEntity ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                              color: !selectedEntity ? '#7b282d' : 'inherit',
                            }}
                          >
                            {isArabic ? 'جميع الجهات' : 'All Entities'}
                          </button>
                          
                          {/* Filtered Entities */}
                          {entities
                            .filter(entity => 
                              entity.nameEn.toLowerCase().includes(entitySearchQuery.toLowerCase()) || 
                              entity.nameAr.includes(entitySearchQuery)
                            )
                            .map(entity => (
                              <button
                                key={entity.id}
                                onClick={() => {
                                  setSelectedEntity(entity.nameEn);
                                  setEntitySearchQuery('');
                                  setIsEntityDropdownOpen(false);
                                  setCurrentPage(1);
                                }}
                                className={`w-full px-4 py-2.5 text-${isArabic ? 'right' : 'left'} hover:bg-gray-50 transition-colors border-b ${
                                  selectedEntity === entity.nameEn ? 'bg-gray-50' : ''
                                }`}
                                style={{
                                  borderColor: '#E5E7EB',
                                  fontSize: 'var(--font-size-sm)',
                                  fontWeight: selectedEntity === entity.nameEn ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                                  color: selectedEntity === entity.nameEn ? '#7b282d' : 'inherit',
                                }}
                              >
                                {isArabic ? entity.nameAr : entity.nameEn}
                              </button>
                            ))}
                          
                          {/* No Results */}
                          {entities.filter(entity => 
                            entity.nameEn.toLowerCase().includes(entitySearchQuery.toLowerCase()) || 
                            entity.nameAr.includes(entitySearchQuery)
                          ).length === 0 && entitySearchQuery && (
                            <div className="px-4 py-6 text-center text-gray-500" style={{ fontSize: 'var(--font-size-sm)' }}>
                              {isArabic ? 'لا توجد نتائج' : 'No results found'}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="lg:col-span-5">
                    <label
                      className="block text-gray-700 mb-2"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {isArabic ? 'البحث' : 'Search'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="w-full h-10 px-4 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent"
                        style={{
                          borderColor: '#D1D5DB',
                          fontSize: 'var(--font-size-sm)',
                          fontFamily: isArabic ? 'var(--font-family-ar)' : 'var(--font-family-en)',
                        }}
                      />
                      <FileText
                        size={18}
                        className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                        style={{ [isArabic ? 'left' : 'right']: '12px' }}
                      />
                    </div>
                  </div>

                  {/* Filter Toggle Button */}
                  <div className="lg:col-span-3">
                    <label className="block text-gray-700 mb-2 opacity-0" style={{ fontSize: 'var(--font-size-sm)' }}>
                      {isArabic ? 'خيارات' : 'Options'}
                    </label>
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="h-10 px-4 w-full border bg-white hover:bg-gray-50"
                      style={{ 
                        borderColor: '#D1D5DB',
                        fontSize: 'var(--font-size-sm)',
                      }}
                    >
                      <Filter size={16} className={isArabic ? 'ml-2' : 'mr-2'} />
                      {showFilters ? t.hideFilters : t.showFilters}
                    </Button>
                  </div>
                </div>

                {/* Collapsible Advanced Filters */}
                {showFilters && (
                  <div className="mt-5 pt-5 border-t grid grid-cols-1 md:grid-cols-2 gap-4" style={{ borderColor: '#E5E7EB' }}>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        style={{
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                      >
                        {t.status}
                      </label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full h-10 px-4 border bg-white focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent"
                        style={{ 
                          borderColor: '#D1D5DB',
                          fontSize: 'var(--font-size-sm)',
                        }}
                      >
                        <option value="">{t.all}</option>
                        <option value="active">{t.active}</option>
                        <option value="amended">{t.amended}</option>
                        <option value="cancelled">{t.cancelled}</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        style={{
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                      >
                        {t.year}
                      </label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full h-10 px-4 border bg-white focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent"
                        style={{ 
                          borderColor: '#D1D5DB',
                          fontSize: 'var(--font-size-sm)',
                        }}
                      >
                        <option value="">{t.all}</option>
                        {Array.from(new Set(allData.map(item => item.date))).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Add New Document Button - Always Visible */}
            <div className="mb-4 flex items-center justify-between">
              {selectedEntity && (
                <p
                  className="text-gray-600"
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  {isArabic ? 'عرض' : 'Showing'} <span className="text-gray-900">{startIndex + 1}</span> - <span className="text-gray-900">{Math.min(startIndex + itemsPerPage, filteredData.length)}</span> {isArabic ? 'من' : 'of'} <span className="text-gray-900">{filteredData.length.toLocaleString(isArabic ? 'ar-AE' : 'en-US')}</span> {isArabic ? 'نتيجة' : 'results'}
                </p>
              )}
              
              {!selectedEntity && <div></div>}
              
              {/* Add New Document Button */}
              <Button
                onClick={handleAddDocument}
                className="h-10 px-4 text-white flex-shrink-0"
                style={{
                  backgroundColor: '#7b282d',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                <Plus size={16} className={isArabic ? 'ml-2' : 'mr-2'} />
                {isArabic ? 'إضافة مستند جديد' : 'Add New Document'}
              </Button>
            </div>

            {/* Empty State - No Entity Selected */}
            {!selectedEntity ? (
              <div
                className="bg-white border rounded-lg p-16 text-center"
                style={{
                  borderColor: '#D1D5DB',
                }}
              >
                <div
                  className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-100"
                >
                  <FileText size={40} className="text-gray-400" />
                </div>
                <h3
                  className="text-gray-900 mb-3"
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  {isArabic ? 'الرجاء اختيار جهة' : 'Please Select an Entity'}
                </h3>
                <p
                  className="text-gray-600 mb-6 max-w-md mx-auto"
                  style={{
                    fontSize: 'var(--font-size-base)',
                  }}
                >
                  {isArabic
                    ? 'لعرض المستندات التشريعية، يرجى تحديد جهة من القائمة المنسدلة أعلاه'
                    : 'To view legislative documents, please select an entity from the dropdown above'}
                </p>
                <Button
                  onClick={() => setIsEntityDropdownOpen(true)}
                  className="h-11 px-8 text-white"
                  style={{
                    backgroundColor: '#7b282d',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  {isArabic ? 'اختر جهة' : 'Select Entity'}
                </Button>
              </div>
            ) : (
              <>
                {/* Official-Style Document List */}
                <div 
                  className="bg-white border" 
                  style={{ 
                    borderColor: '#D1D5DB',
                    borderRadius: '8px',
                  }}
                >
                  {paginatedData.map((item, index) => (
                    <div
                      key={item.id}
                      className={`group cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-inset ${
                        index === paginatedData.length - 1 ? '' : 'border-b'
                      }`}
                      tabIndex={0}
                      style={{ 
                        borderColor: '#E5E7EB',
                        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                        borderInlineStart: '3px solid transparent',
                        minHeight: '120px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8F9FA';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                        e.currentTarget.style.borderInlineStartColor = '#8B272D';
                        e.currentTarget.style.minHeight = '130px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderInlineStartColor = 'transparent';
                        e.currentTarget.style.minHeight = '120px';
                      }}
                      onClick={() => setSelectedDocument(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedDocument(item);
                        }
                      }}
                    >
                      <div className="px-6 py-5">
                        {/* Title Line */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3
                            className="text-gray-900 flex-1 group-hover:text-[#8B272D] transition-colors duration-200"
                            style={{
                              fontSize: 'var(--font-size-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              lineHeight: '1.5',
                            }}
                          >
                            {isArabic ? item.nameAr : item.nameEn}
                          </h3>
                          {/* Version Chip */}
                          <span
                            className="px-2.5 py-1 text-xs whitespace-nowrap flex-shrink-0"
                            style={{
                              backgroundColor: '#7b282d',
                              color: 'white',
                              borderRadius: '4px',
                              fontWeight: 'var(--font-weight-semibold)',
                            }}
                          >
                            {isArabic ? `الإصدار ${(item.id % 3) + 1}.0` : `Version ${(item.id % 3) + 1}.0`}
                          </span>
                        </div>

                        {/* Metadata Row */}
                        <div className="flex items-center gap-4 mb-3 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" style={{ fontSize: 'var(--font-size-sm)' }}>
                          <div className="flex items-center gap-1.5">
                            <FileText size={14} className="text-gray-400 group-hover:text-[#8B272D] transition-colors duration-200" />
                            <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{item.lawNumber}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-gray-400 group-hover:text-[#8B272D] transition-colors duration-200" />
                            <span>{item.date}</span>
                          </div>
                          {item.entity && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span>{item.entity}</span>
                            </>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            style={{
                              transition: 'all 200ms ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(139, 39, 45, 0.08)';
                              e.currentTarget.style.transform = 'scale(1.05)';
                              const icon = e.currentTarget.querySelector('svg');
                              if (icon) {
                                (icon as HTMLElement).style.color = '#8B272D';
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.transform = 'scale(1)';
                              const icon = e.currentTarget.querySelector('svg');
                              if (icon) {
                                (icon as HTMLElement).style.color = 'rgb(51, 65, 85)';
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDocument(item);
                            }}
                            aria-label={t.view}
                          >
                            <Eye size={16} style={{ transition: 'color 200ms ease' }} />
                          </button>
                          
                          <button
                            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            style={{
                              transition: 'all 200ms ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(139, 39, 45, 0.08)';
                              const icon = e.currentTarget.querySelector('svg');
                              if (icon) {
                                (icon as HTMLElement).style.color = '#8B272D';
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              const icon = e.currentTarget.querySelector('svg');
                              if (icon) {
                                (icon as HTMLElement).style.color = 'rgb(51, 65, 85)';
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditDocument(item);
                            }}
                            aria-label={isArabic ? 'تعديل' : 'Edit'}
                          >
                            <Edit2 size={16} style={{ transition: 'color 200ms ease' }} />
                          </button>
                          
                          <button
                            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            style={{
                              transition: 'all 200ms ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.08)';
                              const icon = e.currentTarget.querySelector('svg');
                              if (icon) {
                                (icon as HTMLElement).style.color = '#DC2626';
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              const icon = e.currentTarget.querySelector('svg');
                              if (icon) {
                                (icon as HTMLElement).style.color = 'rgb(51, 65, 85)';
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDocument(item.id);
                            }}
                            aria-label={isArabic ? 'حذف' : 'Delete'}
                          >
                            <Trash2 size={16} style={{ transition: 'color 200ms ease' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6 flex justify-center gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      style={{
                        borderColor: '#D1D5DB',
                      }}
                    >
                      <ChevronLeft size={16} className={isArabic ? 'rotate-180' : ''} />
                    </button>
                    
                    {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                      let page;
                      if (totalPages <= 7) {
                        page = i + 1;
                      } else if (currentPage <= 4) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 3) {
                        page = totalPages - 6 + i;
                      } else {
                        page = currentPage - 3 + i;
                      }
                      
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 border hover:bg-gray-50 ${
                            currentPage === page ? 'text-white' : 'bg-white text-gray-700'
                          }`}
                          style={{
                            borderColor: '#D1D5DB',
                            backgroundColor: currentPage === page ? '#7b282d' : undefined,
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                          }}
                        >
                          {page.toLocaleString(isArabic ? 'ar-AE' : 'en-US')}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      style={{
                        borderColor: '#D1D5DB',
                      }}
                    >
                      <ChevronRight size={16} className={isArabic ? 'rotate-180' : ''} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Document Form Modal */}
      <DocumentFormModal
        document={editingDocument}
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingDocument(null);
        }}
        onSave={handleSaveDocument}
        language={language}
        entities={entities}
      />
    </div>
  );
}