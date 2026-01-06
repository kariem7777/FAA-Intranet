import { useState, useRef, useEffect } from 'react';
import { Search, Eye, ChevronDown, X, FileText, Calendar, ArrowLeft, ChevronLeft, ChevronRight, ArrowUp, Menu } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface LegislationDocumentsPageProps {
  categoryId: number;
  onBack: () => void;
  onViewDocument?: (doc: any) => void;
  fontSizeMultiplier?: number;
}

interface Document {
  id: number;
  title: string;
  titleAr: string;
  referenceNumber: string;
  year: number;
  classification: 'public' | 'secret';
  entityId: string;
  entityName: string;
  entityNameAr: string;
  category: number;
  issueDate: string;
  pdfUrl: string;
}

export function LegislationDocumentsPage({ 
  categoryId, 
  onBack,
  onViewDocument,
  fontSizeMultiplier = 1
}: LegislationDocumentsPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [entitySearchQuery, setEntitySearchQuery] = useState('');
  const [isEntityDropdownOpen, setIsEntityDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(1); // Default to first category
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [categoryPage, setCategoryPage] = useState(1);
  const categoriesPerPage = 10;
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Color palette
  const colors = {
    primary: '#0F2A44',      // Deep Navy
    accent: '#C9A24D',       // Muted Gold
    bgOffWhite: '#F7F8FA',   // Off-White
    bgWhite: '#FFFFFF',      // White
    textPrimary: '#1A1A1A',  // Primary Text
    textSecondary: '#5A5A5A', // Secondary Text
  };

  // Entities list
  const entities = [
    { id: 'rta', nameAr: 'هيئة الطرق والمواصلات', nameEn: 'Roads and Transport Authority' },
    { id: 'dha', nameAr: 'هيئة الصحة', nameEn: 'Health Authority' },
    { id: 'dewa', nameAr: 'هيئة كهرباء ومياه دبي', nameEn: 'Dubai Electricity and Water Authority' },
    { id: 'dld', nameAr: 'دائرة الأراضي والأملاك', nameEn: 'Dubai Land Department' },
    { id: 'ded', nameAr: 'دائرة التنمية الاقتصادية', nameEn: 'Department of Economic Development' },
    { id: 'ddf', nameAr: 'دائرة المالية', nameEn: 'Department of Finance' },
    { id: 'khda', nameAr: 'هيئة المعرفة والتنمية البشرية', nameEn: 'Knowledge and Human Development Authority' },
    { id: 'shjm', nameAr: 'بلدية الشارقة', nameEn: 'Sharjah Municipality' },
  ];

  // Categories configuration
  const categoryConfigs: Record<number, any> = {
   1: {
      title: isArabic ? "تشريعات الجهات الخاضعة" : "Entity's Legislation",
      categories: [
        { id: 1, name: isArabic ? 'الإنشاء' : 'Establishment Law', count: 45 },
        { id: 2, name: isArabic ? 'التشريعات المالية' : 'Financial Legislation', count: 182 },
        { id: 3, name: isArabic ? 'الحوكمة' : 'Governance', count: 98 },
        { id: 4, name: isArabic ? 'العقود والمشتريات' : 'Contracts and Purchasing', count: 67 },
        { id: 5, name: isArabic ? 'الموارد البشرية' : 'Human Resources', count: 54 },
        { id: 6, name: isArabic ? 'مهام الجهة' : 'Tasks of the entity', count: 38 },
      ],
    },
    2: {
      title: isArabic ? 'التشريعات الاتحادية' : 'Federal Legislation',
      categories: [
       { id: 1, name: isArabic ? 'السجل التجاري' : 'Penal procedures', count: 25 },
        { id: 2, name: isArabic ? 'القانون البحري' : 'Civil Aviation', count: 18 },
        { id: 3, name: isArabic ? 'التعاونيات' : 'Witness protection', count: 32 },
        { id: 4, name: isArabic ? 'المعاشات و التأمينات الإجتماعية' : 'Commercial companies', count: 28 },
        { id: 5, name: isArabic ? 'مواجهة جرائم غسل الأموال' : 'Combating rumors and electronic crimes', count: 15 },
        { id: 6, name: isArabic ? 'قواعد و شهادات المنشأ' : 'Maritime Law', count: 22 },
        { id: 7, name: isArabic ? 'حقوق المؤلف والحقوق المجاورة' : 'Regulating the telecommunications sector', count: 19 },
        { id: 8, name: isArabic ? 'دستور دولة الإمارات العربية المتحدة' : 'Personal data protection', count: 12 },
        { id: 9, name: isArabic ? 'مكافحة الغش التجاري' : 'consumer protection', count: 24 },
        { id: 10, name: isArabic ? 'تنظيم الإعلام' : 'Prohibiting the use of academic certificates issued by unauthorized parties', count: 16 },
      ],
    },
    3: {
      title: isArabic ? 'التشريعات المحلية' : 'Local Legislation',
      categories: [
        { id: 1, name: isArabic ? 'تنظيم أعمال المساحة' : 'Knowledge and Innovation Dirham', count: 78 },
        { id: 2, name: isArabic ? 'حوكمة الأندية الرياضية' : 'Governance of Sports Clubs', count: 112 },
        { id: 3, name: isArabic ? 'الموارد البشرية لموظفي حكومة دبي' : 'Vehicle Impoundment', count: 164 },
        { id: 4, name: isArabic ? 'الموارد البشرية للمديرين التنفيذيين' : 'Human Resources for General Managers', count: 89 },
        { id: 5, name: isArabic ? 'تنظيم أعمال الصلح' : 'Investment and Investment Institutions', count: 56 },
        { id: 6, name: isArabic ? 'التبرعات' : 'Human Resources for Executive Directors', count: 134 },
        { id: 7, name: isArabic ? 'ادارة الطوارئ والأزمات و الكوارث' : 'Private Establishments', count: 73 },
        { id: 8, name: isArabic ? 'حوكمة الجهات الحكومية' : 'Financial Legislation', count: 145 },
        { id: 9, name: isArabic ? 'الاستثمار والمؤسسات الاستثمارية' : 'Experts and Expertise', count: 102 },
        { id: 10, name: isArabic ? 'الخبراء و أعمال الخبرة' : 'Governance of Councils and Committees', count: 91 },
      ],
    },
    4: {
      title: isArabic ? 'فتاوى اللجنة العليا للتشريعات' : "Supreme Committee's Legal Opinion",
      categories: [],
    },
    5: {
      title: isArabic ? 'الآراء القانونية للجهاز' : 'FAA Legal Opinions',
      categories: [],
    },
    6: {
      title: isArabic ? "تشريعات الجهاز" : "FAA's Legislation",
      categories: [
        { id: 1, name: isArabic ? 'أمن المعلومات' : 'IT Security', count: 45 },
        { id: 2, name: isArabic ? 'التشريعات المالية' : 'Governance', count: 182 },
        { id: 3, name: isArabic ? 'العقود و المشتريات' : 'Human Resources', count: 98 },
        { id: 4, name: isArabic ? 'الحوكمة' : 'Establishment', count: 67 },
        { id: 5, name: isArabic ? 'مهام الجهة' : 'Financial Legislation', count: 54 },
        { id: 6, name: isArabic ? 'الموارد البشرية' : 'Entity Responsibility', count: 38 },
        { id: 7, name: isArabic ? 'الإنشاء' : 'Contracts and Procurement', count: 29 },
      ],
    },
  };

  const currentConfig = categoryConfigs[categoryId] || categoryConfigs[1];
  const currentCategoryData = currentConfig.categories.find((cat: any) => cat.id === selectedCategory);
  const currentCategoryName = currentCategoryData?.name || '';

  // Document title variations for more realistic data
  const documentTitles = [
    { en: 'Financial Oversight and Audit Framework', ar: 'إطار الرقابة المالية والتدقيق' },
    { en: 'Annual Budget Allocation Guidelines', ar: 'دليل تخصيص الميزانية السنوية' },
    { en: 'Procurement and Contract Management Policy', ar: 'سياسة المشتريات وإدارة العقود' },
    { en: 'Internal Control Systems Regulation', ar: 'لائحة أنظمة الرقابة الداخلية' },
    { en: 'Revenue Collection and Management Standards', ar: 'معايير تحصيل وإدارة الإيرادات' },
    { en: 'Financial Reporting and Disclosure Requirements', ar: 'متطلبات التقارير المالية والإفصاح' },
    { en: 'Risk Management and Compliance Framework', ar: 'إطار إدارة المخاطر والامتثال' },
    { en: 'Asset Management and Inventory Control', ar: 'إدارة الأصول ومراقبة المخزون' },
    { en: 'Investment Portfolio Guidelines', ar: 'إرشادات المحفظة الاستثمارية' },
    { en: 'Treasury Operations Manual', ar: 'دليل عمليات الخزينة' },
    { en: 'Debt Management Strategy', ar: 'استراتيجية إدارة الدين' },
    { en: 'Cost Accounting and Control Systems', ar: 'أنظمة محاسبة وضبط التكاليف' },
    { en: 'Performance Measurement Framework', ar: 'إطار قياس الأداء' },
    { en: 'Grant and Subsidy Administration Rules', ar: 'قواعد إدارة المنح والإعانات' },
    { en: 'Financial Delegation Authority Matrix', ar: 'مصفوفة صلاحيات التفويض المالي' },
    { en: 'Cash Flow Management Procedures', ar: 'إجراءات إدارة التدفقات النقدية' },
    { en: 'Fixed Assets Capitalization Policy', ar: 'سياسة رسملة الأصول الثابتة' },
    { en: 'Revenue Recognition Standards', ar: 'معايير الاعتراف بالإيرادات' },
    { en: 'Expense Classification Guidelines', ar: 'دليل تصنيف المصروفات' },
    { en: 'Financial Statement Preparation Manual', ar: 'دليل إعداد القوائم المالية' },
    { en: 'Audit Committee Charter', ar: 'ميثاق لجنة التدقيق' },
    { en: 'Internal Audit Standards and Procedures', ar: 'معايير وإجراءات التدقيق الداخلي' },
    { en: 'External Audit Coordination Protocol', ar: 'بروتوكول التنسيق مع التدقيق الخارجي' },
    { en: 'Financial Systems Security Requirements', ar: 'متطلبات أمن الأنظمة المالية' },
    { en: 'Electronic Payment Processing Standards', ar: 'معايير معالجة المدفوعات الإلكترونية' },
  ];

  // Mock documents data with varied titles
  const mockDocuments: Document[] = Array.from({ length: currentCategoryData?.count || 10 }, (_, i) => {
    const titleVariation = documentTitles[i % documentTitles.length];
    return {
      id: i + 1,
      title: `${titleVariation.en} (${2020 + (i % 5)})`,
      titleAr: `${titleVariation.ar} (${2020 + (i % 5)})`,
      referenceNumber: `${entities[i % entities.length].id.toUpperCase()}/FIN/${2020 + (i % 5)}/${String(i + 1).padStart(3, '0')}`,
      year: 2020 + (i % 5),
      classification: ['public', 'secret'][i % 2] as 'public' | 'secret',
      entityId: entities[i % entities.length].id,
      entityName: entities[i % entities.length].nameEn,
      entityNameAr: entities[i % entities.length].nameAr,
      category: selectedCategory,
      issueDate: `${2020 + (i % 5)}-${String((i % 12) + 1).padStart(2, '0')}-15`,
      pdfUrl: 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%82%D8%B1%D8%A7%D8%B1%20%D8%B1%D9%82%D9%85%20(312)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%AA%D8%AD%D8%AF%D9%8A%D8%AF%20%D8%A3%D8%AA%D8%B9%D8%A7%D8%A8%20%D8%A7%D9%84%D9%83%D8%A7%D8%AA%D8%A8%20%D8%A7%D9%84%D8%B9%D8%AF%D9%84%20%D8%A7%D9%84%D8%AE%D8%A7%D8%B5%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf',
    };
  });

  // Filter documents
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesEntity = !selectedEntity || doc.entityId === selectedEntity;
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.titleAr.includes(searchQuery) ||
      doc.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEntity && matchesSearch;
  });

  // Filter entities for dropdown
  const filteredEntities = entities.filter(entity => {
    const searchLower = entitySearchQuery.toLowerCase();
    return (
      entity.nameAr.includes(entitySearchQuery) ||
      entity.nameEn.toLowerCase().includes(searchLower)
    );
  });

  const selectedEntityName = selectedEntity 
    ? entities.find(e => e.id === selectedEntity)?.[isArabic ? 'nameAr' : 'nameEn'] || ''
    : '';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsEntityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Classification badge component
  const ClassificationBadge = ({ classification }: { classification: 'public' | 'secret' }) => {
    const classificationConfig = {
      public: {
        bg: '#E8F5E9',
        text: '#2F7D32',
        label: isArabic ? 'عام' : 'Public',
      },
      secret: {
        bg: '#FFEBEE',
        text: '#9B1C1C',
        label: isArabic ? 'سري' : 'Secret',
      },
    };

    const config = classificationConfig[classification];

    return (
      <span
        className="px-3 py-1 rounded-full text-sm"
        style={{
          backgroundColor: config.bg,
          color: config.text,
          fontFamily: 'Dubai, Arial, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div 
      className="min-h-screen pt-[143px]"
      style={{ backgroundColor: colors.bgOffWhite }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="flex">
        {/* LEFT COLUMN — Categories Sidebar */}
        <div 
          className={`h-[calc(100vh-92px)] fixed top-[143px] border-r overflow-y-auto transition-all duration-300 z-20 ${isSidebarCollapsed ? 'w-0 px-0' : 'w-[320px] px-8'}`}
          style={{ 
            backgroundColor: colors.bgWhite,
            borderColor: '#E5E7EB',
            opacity: isSidebarCollapsed ? 0 : 1,
            [isArabic ? 'right' : 'left']: 0,
          }}
        >
          {!isSidebarCollapsed && (
            <>
              {/* Collapse Button - Icon button at top right/left of sidebar */}
              <div className="pt-6 pb-4  flex items-center justify-between">
                <h3 
                  style={{
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: colors.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {isArabic ? 'التصنيفات' : 'Categories'}
                </h3>

                <button
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 group"
                  style={{
                    color: colors.primary,
                  }}
                  aria-label={isArabic ? 'إخفاء التصنيفات' : 'Hide Categories'}
                  title={isArabic ? 'إخفاء التصنيفات' : 'Hide Categories'}
                >
                  <Menu className="w-5 h-5 transition-transform group-hover:scale-110" />
                </button>
              </div>

              {/* Divider */}
              <div className="h-px mb-6" style={{ backgroundColor: '#E5E7EB' }} />

              <div className="space-y-2">
                {currentConfig.categories
                  .slice((categoryPage - 1) * categoriesPerPage, categoryPage * categoriesPerPage)
                  .map((cat: any) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchQuery('');
                      setSelectedEntity('');
                    }}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group"
                    style={{
                      backgroundColor: selectedCategory === cat.id ? colors.primary : 'transparent',
                      color: selectedCategory === cat.id ? '#FFFFFF' : colors.textPrimary,
                      fontFamily: 'Dubai, Arial, sans-serif',
                      fontSize: '15px',
                      fontWeight: selectedCategory === cat.id ? 600 : 500,
                      textAlign: isArabic ? 'right' : 'left',
                    }}
                  >
                    <span>{cat.name}</span>
                    <span 
                      className="text-xs px-2 py-1 rounded-full min-w-[32px] text-center"
                      style={{
                        backgroundColor: selectedCategory === cat.id ? 'rgba(255, 255, 255, 0.2)' : '#F3F4F6',
                        color: selectedCategory === cat.id ? '#FFFFFF' : colors.textSecondary,
                      }}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Category Pagination Controls */}
              {currentConfig.categories.length > 0 && (() => {
  const totalPages = Math.ceil(currentConfig.categories.length / categoriesPerPage);
  const startItem = (categoryPage - 1) * categoriesPerPage + 1;
  const endItem = Math.min(categoryPage * categoriesPerPage, currentConfig.categories.length);
  const totalItems = currentConfig.categories.length;

  return (
    <div className="mt-4 px-3  flex justify-between items-center">
  {/* Pagination Info */}
  <div
    className="text-center"
    style={{
      fontFamily: 'Dubai, Arial, sans-serif',
      fontSize: '12px',
      color: colors.textSecondary,
      whiteSpace: 'nowrap',
    }}
  >
    {isArabic
      ? `1–6 من 6`
      : `1–6 of 6`
    }
  </div>

  {/* Pagination Controls */}
  <div className="flex items-center justify-center gap-2">
    <button
      disabled
      className="p-1.5 rounded-md opacity-30 cursor-not-allowed"
      style={{
        border: `1px solid ${colors.primary}`,
        color: colors.primary,
    
      }}
      aria-label="Previous"
    >
      <ChevronLeft className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
    </button>

    <span
      className="px-2 py-0.5 rounded-md"
      style={{
        fontSize: '12px',
        fontWeight: 600,
        backgroundColor: colors.accent,
        color: colors.primary,
        minWidth: '44px',
        textAlign: 'center',
      }}
    >
      1 / 1
    </span>

    <button
      disabled
      className="p-1.5 rounded-md opacity-30 cursor-not-allowed"
      style={{
        border: `1px solid ${colors.primary}`,
        color: colors.primary,
        backgroundColor: colors.bgOffWhite,
      }}
      aria-label="Next"
    >
      <ChevronRight className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
    </button>
  </div>
</div>

  );
})()}


              {/* Indicator bar for selected category */}
              {selectedCategory && (
                <div 
                  className="mt-6 h-1 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                />
              )}
            </>
          )}
        </div>

        {/* Sidebar Toggle Button - Only shown when collapsed */}
        {isSidebarCollapsed && (
  <button
    onClick={() => setIsSidebarCollapsed(false)}
    className="fixed top-[200px] z-50 rounded-r-lg shadow-lg transition-all duration-300 hover:pr-2 group"
    style={{
      [isArabic ? 'right' : 'left']: '0',
      backgroundColor: colors.primary,
      color: '#FFFFFF',
      padding: '20px 8px',
      writingMode: 'vertical-rl',
      textOrientation: 'mixed',
      transform: isArabic ? 'rotate(180deg)' : 'none',
    }}
  >
    <span style={{
      fontFamily: 'Dubai, Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '1px',
    }}>
      {isArabic ? 'التصنيفات' : 'CATEGORIES'}
    </span>
  </button>
)}

        {/* RIGHT COLUMN — Main Content */}
        <div 
          className="flex-1 transition-all duration-300"
          style={{
            [isArabic ? 'marginRight' : 'marginLeft']: isSidebarCollapsed ? '0' : '320px',
          }}
        >
          {/* FIXED HEADER SECTION - Back Button, Title, Subtitle */}
          <div 
            className="sticky z-30 border-b"
            style={{ 
              top: '143px',
              backgroundColor: colors.bgOffWhite,
              borderColor: '#E5E7EB',
            }}
          >
            <div className={`${isSidebarCollapsed ? "max-w-[1600px]" : "max-w-[1300px]"} mx-auto px-16 py-8`}>
              {/* BACK BUTTON */}
              <button
                onClick={onBack}
                className="flex items-center gap-2  px-4 py-2 rounded-lg transition-all hover:bg-gray-100"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: `${17 * fontSizeMultiplier}px`,
                  fontWeight: 600,
                  color: colors.primary,
                }}
              >
                <ArrowLeft className="w-5 h-5" style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} />
                {isArabic ? 'العودة الى التشريعات' : 'Back to Legislations'}
              </button>

              {/* PAGE TITLE - Main Legislation Category */}
              <h1 
                className="mb-3"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: `${48 * fontSizeMultiplier}px`,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  lineHeight: 1.2,
                }}
              >
                {currentConfig.title}
              </h1>

              {/* Subtitle - Selected subcategory */}
              <p
                className="mb-0"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: `${18 * fontSizeMultiplier}px`,
                  fontWeight: 500,
                  color: colors.textSecondary,
                }}
              >
                {currentCategoryName}
              </p>
            </div>
          </div>

          {/* SCROLLABLE CONTENT SECTION */}
          <div className={`${isSidebarCollapsed ? "max-w-[1600px]" : "max-w-[1300px]"} mx-auto px-16 py-10`}>
            {/* SEARCH & ENTITY SELECTION */}
<div className="grid grid-cols-2 gap-6 mb-10">
  
  


  {/* Entity Dropdown */}
  <div className="relative" ref={dropdownRef}>
    <label
  className="block mb-2"
  style={{
    textAlign: isArabic ? 'right' : 'left',
    fontFamily: 'Dubai, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 800,
  }}
>

      {isArabic ? 'الجهة' : 'Entity'}
    </label>

    <button
      onClick={() => setIsEntityDropdownOpen(!isEntityDropdownOpen)}
      className="w-full h-[56px] rounded-lg border transition-all flex items-center justify-between"
      style={{
        paddingLeft: isArabic ? '16px' : '16px',
        paddingRight: isArabic ? '16px' : '16px',
        backgroundColor: colors.bgWhite,
        borderColor: isEntityDropdownOpen ? colors.primary : '#E5E7EB',
        fontFamily: 'Dubai, Arial, sans-serif',
        fontSize: '16px',
        color: selectedEntity
          ? colors.textPrimary
          : colors.textSecondary,
        textAlign: isArabic ? 'right' : 'left',
        direction: isArabic ? 'rtl' : 'ltr',
      }}
    >
      <span>
        {selectedEntityName ||
          (isArabic ? 'اختر الجهة' : 'Select Entity')}
      </span>
      <ChevronDown className="w-5 h-5 flex-shrink-0" />
    </button>

    {/* Dropdown Menu */}
    {isEntityDropdownOpen && (
      <div
        className="absolute top-full mt-2 w-full rounded-lg border shadow-lg overflow-hidden z-50"
        style={{
          backgroundColor: colors.bgWhite,
          borderColor: '#E5E7EB',
          maxHeight: '320px',
          direction: isArabic ? 'rtl' : 'ltr',
        }}
      >
        {/* Search inside dropdown */}
        <div
          className="p-3 border-b"
          style={{ borderColor: '#E5E7EB' }}
        >
          <div className="relative">
            <Search
              className="absolute top-1/2 -translate-y-1/2 text-gray-400"
              style={{
                [isArabic ? 'right' : 'left']: '12px',
                width: '16px',
                height: '16px',
              }}
            />

            <input
              type="text"
              value={entitySearchQuery}
              onChange={(e) => setEntitySearchQuery(e.target.value)}
              placeholder={
                isArabic ? 'ابحث عن جهة...' : 'Search entity...'
              }
              className="w-full h-[40px] rounded border outline-none"
              style={{
                paddingLeft: isArabic ? '12px' : '36px',
                paddingRight: isArabic ? '36px' : '12px',
                backgroundColor: colors.bgOffWhite,
                borderColor: '#E5E7EB',
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '14px',
                textAlign: isArabic ? 'right' : 'left',
                direction: isArabic ? 'rtl' : 'ltr',
              }}
            />
          </div>
        </div>

        {/* Clear selection */}
        {selectedEntity && (
          <button
            onClick={() => {
              setSelectedEntity('');
              setIsEntityDropdownOpen(false);
              setEntitySearchQuery('');
            }}
            className="w-full px-4 py-3 hover:bg-gray-50 transition-colors border-b flex items-center gap-2"
            style={{
              fontFamily: 'Dubai, Arial, sans-serif',
              fontSize: '15px',
              color: colors.accent,
              borderColor: '#E5E7EB',
              justifyContent: isArabic ? 'flex-end' : 'flex-start',
            }}
          >
            <X className="w-4 h-4" />
            {isArabic ? 'مسح التحديد' : 'Clear Selection'}
          </button>
        )}

        {/* Entity List */}
        <div className="overflow-y-auto" style={{ maxHeight: '240px' }}>
          {filteredEntities.map((entity) => (
            <button
              key={entity.id}
              onClick={() => {
                setSelectedEntity(entity.id);
                setIsEntityDropdownOpen(false);
                setEntitySearchQuery('');
              }}
              className="w-full px-4 py-3 hover:bg-gray-50 transition-colors"
              style={{
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '15px',
                color: colors.textPrimary,
                backgroundColor:
                  selectedEntity === entity.id
                    ? colors.bgOffWhite
                    : 'transparent',
                textAlign: isArabic ? 'right' : 'left',
              }}
            >
              {isArabic ? entity.nameAr : entity.nameEn}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
  {/* Search Input */}
<div className="relative">
  <label
    className="block mb-2"
    style={{
      textAlign: isArabic ? 'right' : 'left',
      fontFamily: 'Dubai, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 800,
    }}
  >
    {isArabic ? 'البحث' : 'Search'}
  </label>

  {/* Input wrapper — this is the key */}
  <div className="relative">
    <Search
      className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      style={{
        [isArabic ? 'right' : 'left']: '16px',
        width: '20px',
        height: '20px',
      }}
    />

    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder={
        isArabic
          ? `البحث ضمن ${currentCategoryName}`
          : `Search within ${currentCategoryName}`
      }
      className="w-full h-[56px] rounded-lg border transition-all outline-none"
      style={{
        paddingLeft: isArabic ? '16px' : '48px',
        paddingRight: isArabic ? '48px' : '16px',
        backgroundColor: colors.bgWhite,
        borderColor: '#E5E7EB',
        fontFamily: 'Dubai, Arial, sans-serif',
        fontSize: '16px',
        color: colors.textPrimary,
        textAlign: isArabic ? 'right' : 'left',
        direction: isArabic ? 'rtl' : 'ltr',
      }}
    />
  </div>
</div>
</div>


            {/* DOCUMENT RESULTS */}
            {!selectedEntity ? (
              // Empty state — no entity selected
              <div 
                className="text-center py-20"
                style={{
                  backgroundColor: colors.bgWhite,
                  borderRadius: '12px',
                }}
              >
                <FileText className="mx-auto mb-4" style={{ width: '64px', height: '64px', color: '#D1D5DB' }} />
                <h3 
                  className="mb-2"
                  style={{
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: colors.textSecondary,
                  }}
                >
                  {isArabic ? 'اختر جهة لعرض الوثائق' : 'Select an entity to view documents'}
                </h3>
                <p
                  style={{
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: '15px',
                    color: colors.textSecondary,
                  }}
                >
                  {isArabic 
                    ? 'يرجى اختيار جهة من القائمة أعلاه للبدء في تصفح الوثائق' 
                    : 'Please select an entity from the list above to start browsing documents'
                  }
                </p>
              </div>
            ) : filteredDocuments.length === 0 ? (
              // No results found
              <div 
                className="text-center py-20"
                style={{
                  backgroundColor: colors.bgWhite,
                  borderRadius: '12px',
                }}
              >
                <FileText className="mx-auto mb-4" style={{ width: '64px', height: '64px', color: '#D1D5DB' }} />
                <h3 
                  className="mb-2"
                  style={{
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: colors.textSecondary,
                  }}
                >
                  {isArabic ? 'لا توجد نتائج' : 'No results found'}
                </h3>
                <p
                  style={{
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: '15px',
                    color: colors.textSecondary,
                  }}
                >
                  {isArabic 
                    ? 'حاول تعديل معايير البحث' 
                    : 'Try adjusting your search criteria'
                  }
                </p>
              </div>
            ) : (
              // Document list
              <div className="space-y-4">
                <p 
                  className="mb-4"
                  style={{
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: '15px',
                    color: colors.textSecondary,
                  }}
                >
                  {isArabic 
                    ? `${filteredDocuments.length} وثيقة` 
                    : `${filteredDocuments.length} document${filteredDocuments.length !== 1 ? 's' : ''}`
                  }
                </p>

                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-6 rounded-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                    style={{
                      backgroundColor: colors.bgWhite,
                      borderInlineStart: '4px solid transparent',
                      borderRadius: '12px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${colors.primary}15`;
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(47, 79, 111, 0.18)';
                      e.currentTarget.style.borderInlineStartColor = colors.accent;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.bgWhite;
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderInlineStartColor = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onClick={() => onViewDocument?.(doc)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Document Title */}
                        <h3 
                          className="mb-3"
                          style={{
                            fontFamily: 'Dubai, Arial, sans-serif',
                            fontSize: `${20 * fontSizeMultiplier}px`,
                            fontWeight: 700,
                            color: colors.textPrimary,
                            lineHeight: 1.4,
                          }}
                        >
                          {isArabic ? doc.titleAr : doc.title}
                        </h3>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                         
                          <span 
                            className="flex items-center gap-2"
                            style={{
                              fontFamily: 'Dubai, Arial, sans-serif',
                              fontSize: '14px',
                              color: colors.textSecondary,
                            }}
                          >
                            <Calendar className="w-4 h-4" />
                            {doc.year}
                          </span>
                          <ClassificationBadge classification={doc.classification} />
                        </div>

                        {/* Entity Name */}
                        <p
                          style={{
                            fontFamily: 'Dubai, Arial, sans-serif',
                            fontSize: '14px',
                            color: colors.textSecondary,
                          }}
                        >
                          {isArabic ? doc.entityNameAr : doc.entityName}
                        </p>
                      </div>

                      {/* View Document Button */}
                      <button
                        className="px-6 py-3 rounded-lg transition-all hover:shadow-md flex items-center gap-2"
                        style={{
                          backgroundColor: colors.primary,
                          color: '#FFFFFF',
                          fontFamily: 'Dubai, Arial, sans-serif',
                          fontSize: '15px',
                          fontWeight: 600,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDocument?.(doc);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        {isArabic ? 'عرض الوثيقة' : 'View Document'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 rounded-full shadow-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 group flex items-center gap-3"
          style={{
            bottom: '40px',
            [isArabic ? 'left' : 'right']: '40px',
            backgroundColor: colors.accent,
            color: '#FFFFFF',
            padding: '16px 24px',
          }}
          aria-label={isArabic ? 'العودة إلى الأعلى' : 'Return to top'}
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:translate-y-[-4px]" />
          <span
            style={{
              fontFamily: 'Dubai, Arial, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            {isArabic ? 'العودة للبحث' : 'Return to Search'}
          </span>
        </button>
      )}
    </div>
  );
}