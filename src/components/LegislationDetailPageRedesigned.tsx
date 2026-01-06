import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Search, Eye, Trash2, Download, ChevronLeft, ChevronRight, FileText, Building2, ChevronDown, X, Calendar, ExternalLink, AlertCircle, CheckCircle2, RefreshCw, Plus, Filter, Tag, Menu } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { DocumentFormModal } from './legislation/DocumentFormModal';

interface LegislationDetailPageProps {
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
  classification?: 'public' | 'secret';
}

export function LegislationDetailPageRedesigned({ categoryId, onBack }: LegislationDetailPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [entitySearchQuery, setEntitySearchQuery] = useState('');
  const [isEntityDropdownOpen, setIsEntityDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(2);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Category pagination state
  const [categoryPage, setCategoryPage] = useState(1);
  const categoriesPerPage = 10;
  
  // View state
  const [selectedLegislation, setSelectedLegislation] = useState<LegislationItem | null>(null);
  const [viewMode, setViewMode] = useState<'admin' | 'user'>('admin');
  
  // Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  
  // Message state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fontFamily = 'Dubai, Arial, sans-serif';

  // Color palette
  const colors = {
    primary: '#0F2A44',      // Deep Navy
    secondary: '#2E2E2E',    // Charcoal Gray
    accent: '#C9A24D',       // Muted Gold
    bgOffWhite: '#F7F8FA',   // Off-White
    bgWhite: '#FFFFFF',      // White
    textPrimary: '#1A1A1A',  // Primary Text
    textSecondary: '#5A5A5A', // Secondary Text
    textDisabled: '#9CA3AF', // Disabled / Hint
    success: '#2F7D32',      // Success
    warning: '#C57C00',      // Warning
    error: '#9B1C1C',        // Error
  };

  const entities = [
    { id: 'rta', nameAr: 'هيئة النقل والمواصلات', nameEn: 'Roads and Transport Authority' },
    { id: 'dha', nameAr: 'هيئة الصحة', nameEn: 'Health Authority' },
    { id: 'dewa', nameAr: 'هيئة كهرباء ومياه دبي', nameEn: 'Dubai Electricity and Water Authority' },
    { id: 'dld', nameAr: 'دائرة الأراضي والأملاك', nameEn: 'Dubai Land Department' },
    { id: 'ded', nameAr: 'دائرة التنمية الاقتصادية', nameEn: 'Department of Economic Development' },
    { id: 'ddf', nameAr: 'دائرة المالية', nameEn: 'Department of Finance' },
    { id: 'khda', nameAr: 'هيئة المعرفة والتنمية البشرية', nameEn: 'Knowledge and Human Development Authority' },
    { id: 'shjm', nameAr: 'بلدية الشارقة', nameEn: 'Sharjah Municipality' },
  ];

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

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

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

  const categoryConfigs: Record<number, any> = {
    1: {
      title: isArabic ? "تشريعات الجهات الخاضعة" : "Entity's Legislation",
      categories: [
        { id: 1, name: isArabic ? 'أمن المعلومات' : 'IT Security', count: 3 },
        { id: 2, name: isArabic ? 'الحوكمة' : 'Governance', count: 15 },
        { id: 3, name: isArabic ? 'الموارد البشرية' : 'Human Resources', count: 12 },
        { id: 4, name: isArabic ? 'الإنشاء' : 'Establishment', count: 20 },
        { id: 5, name: isArabic ? 'التشريعات المالية' : 'Financial Legislation', count: 18 },
        { id: 6, name: isArabic ? 'مهام الجهة' : 'Entity Responsibility', count: 6 },
        { id: 7, name: isArabic ? 'العقود والمشتريات' : 'Contracts and Procurement', count: 8 },
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
        { id: 1, name: isArabic ? 'تنظيم أعمال المساحة' : 'Regulating Surveying Works', count: 14 },
        { id: 2, name: isArabic ? 'حوكمة الأندية الرياضية' : 'Governance of Sports Clubs', count: 22 },
        { id: 3, name: isArabic ? 'الموارد البشرية لموظفي حكومة دبي' : 'Human Resources for Dubai Government Employees', count: 35 },
        { id: 4, name: isArabic ? 'الموارد البشرية للمديرين التنفيذيين' : 'Human Resources for Executive Directors', count: 18 },
        { id: 5, name: isArabic ? 'تنظيم أعمال الصلح' : 'Regulating Reconciliation Works', count: 12 },
        { id: 6, name: isArabic ? 'الفريضات' : 'Fees', count: 28 },
        { id: 7, name: isArabic ? 'الدوائر الطيران والأزمات والتوارث' : 'Aviation, Crises and Inheritance Departments', count: 16 },
        { id: 8, name: isArabic ? 'حوكمة الجهات الحكومية' : 'Governance of Government Entities', count: 31 },
        { id: 9, name: isArabic ? 'الاستثمار والمؤسسات الاستثمارية' : 'Investment and Investment Institutions', count: 24 },
        { id: 10, name: isArabic ? 'التدبير وأعمال المدنية' : 'Management and Civil Works', count: 19 },
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
      title: isArabic ? 'تشريعات الجهاز' : "FAA's Legislation",
      categories: [
        { id: 1, name: isArabic ? 'قرارات مجلس الإدارة' : 'Board Decisions', count: 30 },
        { id: 2, name: isArabic ? 'السياسات والإجراءات' : 'Policies & Procedures', count: 25 },
        { id: 3, name: isArabic ? 'التعاميم' : 'Circulars', count: 40 },
        { id: 4, name: isArabic ? 'الأدلة الإرشادية' : 'Guidelines', count: 18 },
      ],
    },
  };

  const currentConfig = categoryConfigs[categoryId] || categoryConfigs[1];

  const legislationData: LegislationItem[] = [
    { 
      id: 1, 
      nameAr: 'قانون رقم (3) لسنة 2016 بشأن إنشاء هيئة التدقيق المالي',
      nameEn: 'Law No. (3) of 2016 on Establishing the Financial Audit Authority',
      entity: 'rta',
      date: '2016',
      category: 2,
      lawNumber: 'قانون رقم (3) لسنة 2016',
      issueDate: '2016-12-15',
      tags: [isArabic ? 'تأسيس' : 'Establishment', isArabic ? 'تدقيق مالي' : 'Financial Audit'],
      status: 'active',
      classification: 'public',
    },
    { 
      id: 2, 
      nameAr: 'قانون رقم (14) لسنة 2009 بشأن إجراءات المحاسبة المالية في إمارة دبي',
      nameEn: 'Law No. (14) of 2009 on Financial Accounting Procedures in Dubai',
      entity: 'rta',
      date: '2009',
      category: 2,
      lawNumber: 'قانون رقم (14) لسنة 2009',
      issueDate: '2009-08-20',
      tags: [isArabic ? 'محاسبة' : 'Accounting', isArabic ? 'إجراءات' : 'Procedures'],
      status: 'amended',
      classification: 'public',
    },
    { 
      id: 3, 
      nameAr: 'قانون رقم (2) لسنة 2013 بشأن تنظيم إجراءات التعاقد الحكومي في إمارة دبي',
      nameEn: 'Law No. (2) of 2013 on Organizing Government Procurement in Dubai',
      entity: 'rta',
      date: '2013',
      category: 2,
      lawNumber: 'قانون رقم (2) لسنة 2013',
      issueDate: '2013-03-10',
      tags: [isArabic ? 'تعاقد' : 'Procurement', isArabic ? 'حكومي' : 'Government'],
      status: 'active',
      classification: 'secret',
    },
    { 
      id: 4, 
      nameAr: 'قانون رقم (19) لسنة 2021 بتعديل بعض أحكام القانون رقم (2) لسنة 2013 بشأن تنظيم إجراءات التعاقد الحكومي',
      nameEn: 'Law No. (19) of 2021 Amending Law No. (2) of 2013 on Government Contracting',
      entity: 'rta',
      date: '2021',
      category: 2,
      lawNumber: 'قانون رقم (19) لسنة 2021',
      issueDate: '2021-11-05',
      tags: [isArabic ? 'تعديل' : 'Amendment', isArabic ? 'تعاقد' : 'Contracting'],
      status: 'active',
      classification: 'public',
    },
    { 
      id: 5, 
      nameAr: 'قرار رقم (28) لسنة 2023 بشأن اعتماد أسعار الخدمات المالية المحاسبية وتصنيف الجهات الحكومية',
      nameEn: 'Decision No. (28) of 2023 on Financial Accounting Service Fees',
      entity: 'rta',
      date: '2023',
      category: 2,
      lawNumber: 'قرار رقم (28) لسنة 2023',
      issueDate: '2023-06-12',
      tags: [isArabic ? 'أسعار' : 'Fees', isArabic ? 'خدمات مالية' : 'Financial Services'],
      status: 'active',
      classification: 'public',
    },
    { 
      id: 6, 
      nameAr: 'قانون رقم (1) لسنة 2024 بتعديل بعض أحكام القانون رقم (3) لسنة 2016',
      nameEn: 'Law No. (1) of 2024 Amending Law No. (3) of 2016',
      entity: 'rta',
      date: '2024',
      category: 2,
      lawNumber: 'قانون رقم (1) لسنة 2024',
      issueDate: '2024-01-18',
      tags: [isArabic ? 'تعديل' : 'Amendment', isArabic ? 'تدقيق' : 'Audit'],
      status: 'active',
      classification: 'secret',
    },
    { 
      id: 7, 
      nameAr: 'قرار المجلس التنفيذي رقم (48) لسنة 2017 بشأن ضوابط التدقيق المالي',
      nameEn: 'Executive Council Decision No. (48) of 2017 on Audit Controls',
      entity: 'rta',
      date: '2017',
      category: 2,
      lawNumber: 'قرار رقم (48) لسنة 2017',
      issueDate: '2017-09-25',
      tags: [isArabic ? 'ضوابط' : 'Controls', isArabic ? 'تدقيق' : 'Audit'],
      status: 'active',
      classification: 'public',
    },
    { 
      id: 8, 
      nameAr: 'قرار المجلس التنفيذي رقم (5) لسنة 2021 بشأن إصدار اللائحة التنفيذية للقانون رقم (3) لسنة 2016',
      nameEn: 'Executive Council Decision No. (5) of 2021 on Implementation Regulations',
      entity: 'rta',
      date: '2021',
      category: 2,
      lawNumber: 'قرار رقم (5) لسنة 2021',
      issueDate: '2021-02-14',
      tags: [isArabic ? 'لائحة تنفيذية' : 'Regulations', isArabic ? 'تنيذ' : 'Implementation'],
      status: 'active',
      classification: 'public',
    },
    { 
      id: 9, 
      nameAr: 'قانون رقم (2) لسنة 2022 بشأن تنظيم القطاع المصرفي والخدمات المالية للإمارة',
      nameEn: 'Law No. (2) of 2022 on Banking and Financial Services Regulation',
      entity: 'rta',
      date: '2022',
      category: 2,
      lawNumber: 'قانون رقم (2) لسنة 2022',
      issueDate: '2022-07-30',
      tags: [isArabic ? 'مصرفي' : 'Banking', isArabic ? 'خدمات مالية' : 'Financial Services'],
      status: 'active',
      classification: 'secret',
    },
    { 
      id: 10, 
      nameAr: 'مرسوم رقم (98) لسنة 2023 بشأن تعديل اللائحة الداخلية للجهة الحكومية',
      nameEn: 'Decree No. (98) of 2023 on Amending Internal Regulations',
      entity: 'rta',
      date: '2023',
      category: 2,
      lawNumber: 'مرسوم رقم (98) لسنة 2023',
      issueDate: '2023-10-08',
      tags: [isArabic ? 'لائحة داخلية' : 'Internal Regulations', isArabic ? 'تعديل' : 'Amendment'],
      status: 'active',
      classification: 'public',
    },
  ];

  const filteredData = legislationData.filter(item => {
    const matchesEntity = selectedEntity ? item.entity === selectedEntity : false;
    const matchesSearch = searchQuery === '' || (isArabic 
      ? item.nameAr.includes(searchQuery) || item.lawNumber?.includes(searchQuery) || item.tags?.some(tag => tag.includes(searchQuery))
      : item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.lawNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    const matchesCategory = currentConfig.categories.length === 0 ? true : item.category === selectedCategory;
    return matchesEntity && matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const content = {
    en: {
      back: 'Back',
      searchPlaceholder: 'Search legislation by name, number, keywords, or tags...',
      searchEntityPlaceholder: 'Search entity...',
      clearFilters: 'Clear Filters',
      categories: 'Categories',
      legislationName: 'Legislation Name',
      view: 'View',
      delete: 'Delete',
      addNew: 'Add New',
      selectEntity: 'Select Entity',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'results',
      noEntitySelected: 'Select an Entity to View Legislation',
      noEntityDesc: 'Choose an entity from the dropdown above to browse available legislation',
      noResults: 'No Legislation Found',
      noResultsDesc: 'Try adjusting your search criteria or filters',
      closePreview: 'Close',
      lawNumber: 'Law Number',
      issueDate: 'Issue Date',
      status: 'Status',
      tags: 'Tags',
      downloadPDF: 'Download PDF',
      viewFullDocument: 'View Document',
      active: 'Active',
      amended: 'Amended',
      cancelled: 'Cancelled',
      successDelete: 'Legislation deleted successfully',
      metadata: 'Document Information',
      deleteConfirmTitle: 'Confirm Deletion',
      deleteConfirmMessage: 'Are you sure you want to delete this legislation? This action cannot be undone.',
      confirmDelete: 'Delete',
      cancelDelete: 'Cancel',
      public: 'Public',
      secret: 'Confidential',
      download: 'Download',
    },
    ar: {
      back: 'رجوع',
      searchPlaceholder: 'ابحث في التشريعات بالاسم، الرقم، الكلمات المفتاحية، أو الوسوم...',
      searchEntityPlaceholder: 'ابحث عن جهة...',
      clearFilters: 'مسح الفلاتر',
      categories: 'التصنيفات',
      legislationName: 'اسم التشريع',
      view: 'عرض',
      delete: 'حذف',
      addNew: 'إضافة',
      selectEntity: 'اختر الجهة',
      showing: 'عرض',
      to: 'إلى',
      of: 'من',
      results: 'نتيجة',
      noEntitySelected: 'اختر جهة لعرض التشريعات',
      noEntityDesc: 'اختر جهة من القائمة أعلاه لتصفح التشريعات المتاحة',
      noResults: 'لم يتم العثور على تشريعات',
      noResultsDesc: 'حاول تعديل معايير البحث أو الفلاتر',
      closePreview: 'إغلاق',
      lawNumber: 'رقم القانون',
      issueDate: 'تاريخ الإصدار',
      status: 'الحالة',
      tags: 'الوسوم',
      downloadPDF: 'تحميل PDF',
      viewFullDocument: 'عرض المستند',
      active: 'ساري',
      amended: 'معدّل',
      cancelled: 'ملغى',
      successDelete: 'تم حذف التشريع بنجاح',
      metadata: 'معلومات المستند',
      deleteConfirmTitle: 'تأكيد الحذف',
      deleteConfirmMessage: 'هل أنت متأكد من حذف هذا التشريع؟ لا يمكن التراجع عن هذا الإجراء.',
      confirmDelete: 'حذف',
      cancelDelete: 'إلغاء',
      public: 'عام',
      secret: 'سري',
      download: 'تحميل',
    },
  };

  const t = content[language];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return { bg: '#E8F5E9', text: colors.success, border: colors.success };
      case 'amended': return { bg: '#FFF8E1', text: colors.warning, border: colors.warning };
      case 'cancelled': return { bg: '#FFEBEE', text: colors.error, border: colors.error };
      default: return { bg: colors.bgOffWhite, text: colors.textSecondary, border: colors.textDisabled };
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="h-5 w-5" />;
      case 'amended': return <RefreshCw className="h-5 w-5" />;
      case 'cancelled': return <X className="h-5 w-5" />;
      default: return null;
    }
  };

  const handleViewDetails = (item: LegislationItem) => {
    setSelectedLegislation(item);
  };

  const handleClosePreview = () => {
    setSelectedLegislation(null);
  };

  const handleDelete = (id: number) => {
    setDeleteItemId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteItemId !== null) {
      setSuccessMessage(t.successDelete);
      setShowSuccessMessage(true);
      setShowDeleteConfirm(false);
      setDeleteItemId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteItemId(null);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedEntity('');
    setCurrentPage(1);
  };

  const getPdfUrl = () => {
    const pdfUrl = 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf';
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  };

  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: colors.bgOffWhite }} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4 animate-in slide-in-from-top duration-300">
          <div 
            className="rounded-xl p-5 shadow-2xl flex items-start gap-4"
            style={{ backgroundColor: '#E8F5E9', borderLeft: `4px solid ${colors.success}` }}
          >
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: colors.success }} />
            <div className="flex-1">
              <p style={{ fontFamily, fontSize: '17px', fontWeight: 600, color: colors.textPrimary }}>
                {successMessage}
              </p>
            </div>
            <button 
              onClick={() => setShowSuccessMessage(false)} 
              className="transition-transform hover:scale-110"
              style={{ color: colors.success }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-in zoom-in duration-200">
            <div className="flex items-start gap-5 mb-6">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#FFEBEE' }}
              >
                <AlertCircle className="h-6 w-6" style={{ color: colors.error }} />
              </div>
              <div className="flex-1">
                <h3 style={{ fontFamily, fontWeight: 700, fontSize: '22px', color: colors.textPrimary, marginBottom: '8px' }}>
                  {t.deleteConfirmTitle}
                </h3>
                <p style={{ fontFamily, fontSize: '16px', color: colors.textSecondary, lineHeight: '1.6' }}>
                  {t.deleteConfirmMessage}
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-6 py-3 rounded-lg transition-all hover:scale-105"
                style={{ 
                  fontFamily, 
                  fontSize: '16px',
                  fontWeight: 600,
                  backgroundColor: colors.bgOffWhite,
                  color: colors.textPrimary,
                  border: `2px solid ${colors.textDisabled}`
                }}
              >
                {t.cancelDelete}
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
                style={{ 
                  fontFamily, 
                  fontSize: '16px',
                  fontWeight: 600,
                  backgroundColor: colors.error,
                  color: 'white'
                }}
              >
                {t.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Form Modal */}
      {isFormModalOpen && (
        <DocumentFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSave={(data) => {
            setSuccessMessage(isArabic ? 'تمت إضافة السجل بنجاح' : 'Record added successfully');
            setShowSuccessMessage(true);
            setIsFormModalOpen(false);
          }}
          initialData={null}
          mode="add"
        />
      )}

      {/* Page Header */}
      <div className="px-20 py-8" style={{ backgroundColor: colors.primary }}>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all hover:scale-105"
            style={{
              fontFamily,
              fontSize: '17px',
              fontWeight: 600,
              backgroundColor: colors.bgWhite,
              color: colors.primary
            }}
          >
            <ArrowLeft className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} />
            {t.back}
          </button>
          
          {viewMode === 'admin' && categoryId !== 5 && (
            <button
              onClick={() => setIsFormModalOpen(true)}
              className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
              style={{
                fontFamily,
                fontSize: '17px',
                fontWeight: 600,
                backgroundColor: colors.accent,
                color: colors.primary
              }}
            >
              <Plus className="h-5 w-5" />
              {t.addNew}
            </button>
          )}
        </div>

        <h1 style={{ fontFamily, fontSize: '36px', fontWeight: 700, color: colors.bgWhite, marginBottom: '8px' }}>
          {currentConfig.title}
        </h1>
        <p style={{ fontFamily, fontSize: '18px', fontWeight: 400, color: colors.accent }}>
          {isArabic ? 'ابحث وتصفح التشريعات' : 'Search and browse legislation'}
        </p>
      </div>

      {/* Main Content */}
      {!selectedLegislation ? (
        <div className="px-20 py-10">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-6 mb-6">
              {/* Large Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search 
                    className={`absolute ${isArabic ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 h-6 w-6`}
                    style={{ color: colors.primary }}
                  />
                  <Input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className={`${isArabic ? 'pr-16 pl-6' : 'pl-16 pr-6'} border-2 rounded-xl shadow-sm transition-all focus:scale-102`}
                    style={{ 
                      fontFamily,
                      fontSize: '18px',
                      height: '64px',
                      borderColor: searchQuery ? colors.accent : '#E5E7EB',
                      backgroundColor: searchQuery ? '#FFF8E1' : colors.bgWhite
                    }}
                  />
                </div>
              </div>

              {/* Entity Dropdown */}
              <div className="w-80 relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsEntityDropdownOpen(!isEntityDropdownOpen)}
                  className={`w-full px-6 border-2 rounded-xl bg-white flex items-center justify-between transition-all hover:scale-105 shadow-sm`}
                  style={{
                    height: '64px',
                    borderColor: selectedEntity ? colors.accent : '#E5E7EB',
                    backgroundColor: selectedEntity ? '#FFF8E1' : colors.bgWhite,
                    fontFamily,
                    fontSize: '17px',
                    fontWeight: 600,
                    color: selectedEntity ? colors.textPrimary : colors.textDisabled
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6" style={{ color: colors.primary }} />
                    <span>{selectedEntity ? selectedEntityName : t.selectEntity}</span>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform ${isEntityDropdownOpen ? 'rotate-180' : ''}`}
                    style={{ color: colors.primary }}
                  />
                </button>

                {isEntityDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border-2 z-50 max-h-96 overflow-hidden" style={{ borderColor: colors.bgOffWhite }}>
                    <div className="p-4 border-b" style={{ borderColor: colors.bgOffWhite }}>
                      <div className="relative">
                        <Search className={`absolute ${isArabic ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5`} style={{ color: colors.textDisabled }} />
                        <Input
                          type="text"
                          placeholder={t.searchEntityPlaceholder}
                          value={entitySearchQuery}
                          onChange={(e) => setEntitySearchQuery(e.target.value)}
                          className={`${isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'} border rounded-lg`}
                          style={{ fontFamily, fontSize: '16px', height: '48px' }}
                        />
                      </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                      {filteredEntities.length > 0 ? (
                        filteredEntities.map((entity) => (
                          <button
                            key={entity.id}
                            onClick={() => {
                              setSelectedEntity(entity.id);
                              setIsEntityDropdownOpen(false);
                              setEntitySearchQuery('');
                              setCurrentPage(1);
                            }}
                            className={`w-full px-6 py-4 ${isArabic ? 'text-right' : 'text-left'} transition-all hover:scale-102`}
                            style={{ 
                              fontFamily, 
                              fontSize: '17px',
                              fontWeight: selectedEntity === entity.id ? 700 : 500,
                              backgroundColor: selectedEntity === entity.id ? '#FFF8E1' : 'transparent',
                              color: selectedEntity === entity.id ? colors.primary : colors.textPrimary
                            }}
                          >
                            {isArabic ? entity.nameAr : entity.nameEn}
                          </button>
                        ))
                      ) : (
                        <div className="px-6 py-12 text-center" style={{ fontFamily, fontSize: '16px', color: colors.textSecondary }}>
                          {t.noResults}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Category Filter (if applicable) */}
            {currentConfig.categories.length > 0 && (
              <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: colors.bgOffWhite }}>
                <Filter className="h-5 w-5" style={{ color: colors.textSecondary }} />
                <div className="flex-1 flex flex-wrap gap-3">
                  {currentConfig.categories
                    .slice((categoryPage - 1) * categoriesPerPage, categoryPage * categoriesPerPage)
                    .map((cat: any) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentPage(1);
                      }}
                      className="px-5 py-2 rounded-lg transition-all hover:scale-105"
                      style={{
                        fontFamily,
                        fontSize: '15px',
                        fontWeight: 600,
                        backgroundColor: selectedCategory === cat.id ? colors.accent : colors.bgOffWhite,
                        color: selectedCategory === cat.id ? colors.primary : colors.textSecondary,
                        border: `2px solid ${selectedCategory === cat.id ? colors.accent : 'transparent'}`,
                        textAlign: isArabic ? 'right' : 'left',
                      }}
                    >
                      {cat.name} ({cat.count})
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
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Pagination Buttons */}
                      <button
                        onClick={() => setCategoryPage(prev => Math.max(1, prev - 1))}
                        disabled={categoryPage === 1}
                        className="p-2 rounded-lg transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                        style={{ 
                          backgroundColor: colors.bgOffWhite,
                          color: colors.primary,
                          border: `2px solid ${colors.primary}`
                        }}
                      >
                        <ChevronLeft className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Pagination Info - Compact Single Line */}
                      <div 
                        className="text-center px-4 py-2 rounded-lg whitespace-nowrap"
                        style={{
                          fontFamily,
                          fontSize: '13px',
                          color: colors.textSecondary,
                          backgroundColor: colors.bgOffWhite,
                        }}
                      >
                        {isArabic 
                          ? `${startItem}–${endItem} / ${totalItems} تصنيف • صفحة ${categoryPage} من ${totalPages}`
                          : `${startItem}–${endItem} / ${totalItems} items • Page ${categoryPage} of ${totalPages}`
                        }
                      </div>
                      
                      <button
                        onClick={() => setCategoryPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={categoryPage === totalPages}
                        className="p-2 rounded-lg transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                        style={{ 
                          backgroundColor: colors.bgOffWhite,
                          color: colors.primary,
                          border: `2px solid ${colors.primary}`
                        }}
                      >
                        <ChevronRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Active Filters */}
            {(searchQuery || selectedEntity) && (
              <div className="flex items-center gap-4 pt-6 border-t mt-6" style={{ borderColor: colors.bgOffWhite }}>
                <span style={{ fontFamily, fontSize: '15px', fontWeight: 600, color: colors.textSecondary }}>
                  {isArabic ? 'الفلاتر النشطة:' : 'Active Filters:'}
                </span>
                {searchQuery && (
                  <span 
                    className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
                    style={{ 
                      fontFamily,
                      fontSize: '14px',
                      fontWeight: 600,
                      backgroundColor: '#FFF8E1',
                      color: colors.warning,
                      border: `2px solid ${colors.warning}`
                    }}
                  >
                    <Search className="h-4 w-4" />
                    {searchQuery}
                    <button onClick={() => setSearchQuery('')} className="hover:scale-125 transition-transform">
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {selectedEntity && (
                  <span 
                    className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
                    style={{ 
                      fontFamily,
                      fontSize: '14px',
                      fontWeight: 600,
                      backgroundColor: '#FFF8E1',
                      color: colors.warning,
                      border: `2px solid ${colors.warning}`
                    }}
                  >
                    <Building2 className="h-4 w-4" />
                    {selectedEntityName}
                    <button onClick={() => setSelectedEntity('')} className="hover:scale-125 transition-transform">
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
                <button 
                  onClick={handleClearFilters}
                  className="px-4 py-2 rounded-lg transition-all hover:scale-110"
                  style={{
                    fontFamily,
                    fontSize: '14px',
                    fontWeight: 600,
                    backgroundColor: '#FFEBEE',
                    color: colors.error
                  }}
                >
                  {t.clearFilters}
                </button>
              </div>
            )}
          </div>

          {/* Results Area */}
          {!selectedEntity ? (
            <Card className="p-16 text-center border-2 border-dashed rounded-2xl transition-all hover:scale-102" style={{ borderColor: colors.primary, backgroundColor: colors.bgWhite }}>
              <Building2 className="h-24 w-24 mx-auto mb-6" style={{ color: colors.textDisabled }} />
              <h3 style={{ fontFamily, fontSize: '28px', fontWeight: 700, color: colors.textPrimary, marginBottom: '12px' }}>
                {t.noEntitySelected}
              </h3>
              <p style={{ fontFamily, fontSize: '18px', color: colors.textSecondary, lineHeight: '1.6' }}>
                {t.noEntityDesc}
              </p>
            </Card>
          ) : filteredData.length === 0 ? (
            <Card className="p-16 text-center border-2 rounded-2xl" style={{ borderColor: colors.warning, backgroundColor: colors.bgWhite }}>
              <AlertCircle className="h-24 w-24 mx-auto mb-6" style={{ color: colors.warning }} />
              <h3 style={{ fontFamily, fontSize: '28px', fontWeight: 700, color: colors.textPrimary, marginBottom: '12px' }}>
                {t.noResults}
              </h3>
              <p style={{ fontFamily, fontSize: '18px', color: colors.textSecondary, lineHeight: '1.6' }}>
                {t.noResultsDesc}
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Results Header */}
              <div 
                className="px-6 py-4 rounded-xl"
                style={{ backgroundColor: colors.bgWhite, borderLeft: `4px solid ${colors.accent}` }}
              >
                <p style={{ fontFamily, fontSize: '17px', fontWeight: 600, color: colors.textPrimary }}>
                  {t.showing} <span style={{ color: colors.accent, fontWeight: 700 }}>{startIndex + 1}</span> {t.to} <span style={{ color: colors.accent, fontWeight: 700 }}>{Math.min(startIndex + itemsPerPage, filteredData.length)}</span> {t.of} <span style={{ color: colors.accent, fontWeight: 700 }}>{filteredData.length}</span> {t.results}
                </p>
              </div>

              {/* Results Cards */}
              <div className="grid gap-5">
                {paginatedData.map((item) => {
                  const statusColors = getStatusColor(item.status);
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-md p-6 transition-all hover:scale-102 hover:shadow-xl"
                      style={{ border: `2px solid ${colors.bgOffWhite}` }}
                    >
                      <div className="flex items-start justify-between gap-6">
                        {/* Main Content */}
                        <div className="flex-1">
                          {/* Title & Badges Row */}
                          <div className="flex items-start gap-4 mb-3">
                            <button
                              onClick={() => handleViewDetails(item)}
                              className="flex-1 text-left transition-all hover:scale-102"
                              style={{ fontFamily, fontSize: '20px', fontWeight: 700, color: colors.primary, lineHeight: '1.4' }}
                            >
                              {isArabic ? item.nameAr : item.nameEn}
                            </button>
                            <span 
                              className="px-3 py-1 rounded-lg flex-shrink-0"
                              style={{ 
                                fontFamily,
                                fontSize: '13px',
                                fontWeight: 700,
                                backgroundColor: item.classification === 'public' ? '#E3F2FD' : '#FFEBEE',
                                color: item.classification === 'public' ? '#1976D2' : colors.error,
                                border: `2px solid ${item.classification === 'public' ? '#1976D2' : colors.error}`
                              }}
                            >
                              {item.classification === 'public' ? t.public : t.secret}
                            </span>
                          </div>

                          {/* Metadata Row */}
                          <div className="flex flex-wrap items-center gap-6 mb-3">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5" style={{ color: colors.primary }} />
                              <span style={{ fontFamily, fontSize: '15px', fontWeight: 600, color: colors.textSecondary }}>
                                {item.lawNumber}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5" style={{ color: colors.accent }} />
                              <span style={{ fontFamily, fontSize: '15px', fontWeight: 600, color: colors.textSecondary }}>
                                {item.issueDate}
                              </span>
                            </div>
                            <span 
                              className="px-4 py-2 rounded-lg flex items-center gap-2"
                              style={{ 
                                fontFamily,
                                fontSize: '14px',
                                fontWeight: 700,
                                backgroundColor: statusColors.bg,
                                color: statusColors.text,
                                border: `2px solid ${statusColors.border}`
                              }}
                            >
                              {getStatusIcon(item.status)}
                              {item.status === 'active' ? t.active : item.status === 'amended' ? t.amended : t.cancelled}
                            </span>
                          </div>

                          {/* Tags */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag, i) => (
                                <span 
                                  key={i}
                                  className="px-3 py-1 rounded-lg flex items-center gap-1"
                                  style={{ 
                                    fontFamily,
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    backgroundColor: '#FFF8E1',
                                    color: colors.warning,
                                    border: `1px solid ${colors.warning}`
                                  }}
                                >
                                  <Tag className="h-3 w-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleViewDetails(item)}
                            className="px-5 py-3 rounded-lg transition-all hover:scale-110 flex items-center gap-2"
                            style={{ 
                              fontFamily,
                              fontSize: '15px',
                              fontWeight: 700,
                              backgroundColor: colors.primary,
                              color: 'white'
                            }}
                          >
                            <Eye className="h-5 w-5" />
                            {t.view}
                          </button>
                          <button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = getPdfUrl();
                              link.download = `${item.lawNumber}.pdf`;
                              link.click();
                            }}
                            className="px-5 py-3 rounded-lg transition-all hover:scale-110 flex items-center gap-2"
                            style={{ 
                              fontFamily,
                              fontSize: '15px',
                              fontWeight: 700,
                              backgroundColor: colors.success,
                              color: 'white'
                            }}
                          >
                            <Download className="h-5 w-5" />
                            {t.download}
                          </button>
                          {viewMode === 'admin' && (
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-5 py-3 rounded-lg transition-all hover:scale-110 flex items-center gap-2"
                              style={{ 
                                fontFamily,
                                fontSize: '15px',
                                fontWeight: 700,
                                backgroundColor: colors.error,
                                color: 'white'
                              }}
                            >
                              <Trash2 className="h-5 w-5" />
                              {t.delete}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-6">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-3 rounded-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ 
                      fontFamily,
                      fontSize: '16px',
                      fontWeight: 700,
                      backgroundColor: colors.bgWhite,
                      color: colors.primary,
                      border: `2px solid ${colors.primary}`
                    }}
                  >
                    <ChevronLeft className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-12 h-12 rounded-lg transition-all ${isActive ? 'scale-110' : 'hover:scale-110'}`}
                          style={{ 
                            fontFamily,
                            fontSize: '16px',
                            fontWeight: 700,
                            backgroundColor: isActive ? colors.accent : colors.bgWhite,
                            color: isActive ? colors.primary : colors.textPrimary,
                            border: `2px solid ${isActive ? colors.accent : colors.textDisabled}`
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 rounded-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ 
                      fontFamily,
                      fontSize: '16px',
                      fontWeight: 700,
                      backgroundColor: colors.bgWhite,
                      color: colors.primary,
                      border: `2px solid ${colors.primary}`
                    }}
                  >
                    <ChevronRight className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Detail View */
        <div className="px-20 py-10">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2" style={{ borderColor: colors.bgOffWhite }}>
            {/* Header Section */}
            <div className="px-10 py-8" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}>
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={handleClosePreview}
                  className="px-6 py-3 rounded-lg transition-all hover:scale-110 flex items-center gap-3"
                  style={{
                    fontFamily,
                    fontSize: '16px',
                    fontWeight: 700,
                    backgroundColor: colors.bgWhite,
                    color: colors.primary
                  }}
                >
                  <ArrowLeft className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} />
                  {t.back}
                </button>
                <span 
                  className="px-4 py-2 rounded-lg"
                  style={{ 
                    fontFamily,
                    fontSize: '14px',
                    fontWeight: 700,
                    backgroundColor: selectedLegislation.classification === 'public' ? '#E3F2FD' : '#FFEBEE',
                    color: selectedLegislation.classification === 'public' ? '#1976D2' : colors.error,
                    border: `2px solid ${selectedLegislation.classification === 'public' ? '#1976D2' : colors.error}`
                  }}
                >
                  {selectedLegislation.classification === 'public' ? t.public : t.secret}
                </span>
              </div>

              <h2 style={{ fontFamily, fontSize: '32px', fontWeight: 700, color: colors.bgWhite, lineHeight: '1.3', marginBottom: '24px' }}>
                {isArabic ? selectedLegislation.nameAr : selectedLegislation.nameEn}
              </h2>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = getPdfUrl();
                    link.download = `${selectedLegislation.lawNumber}.pdf`;
                    link.click();
                  }}
                  className="px-8 py-4 rounded-xl transition-all hover:scale-110 flex items-center gap-3"
                  style={{ 
                    fontFamily,
                    fontSize: '17px',
                    fontWeight: 700,
                    backgroundColor: colors.accent,
                    color: colors.primary
                  }}
                >
                  <Download className="h-5 w-5" />
                  {t.downloadPDF}
                </button>
                <button
                  onClick={() => window.open(getPdfUrl(), '_blank')}
                  className="px-8 py-4 rounded-xl transition-all hover:scale-110 flex items-center gap-3"
                  style={{ 
                    fontFamily,
                    fontSize: '17px',
                    fontWeight: 700,
                    backgroundColor: colors.bgWhite,
                    color: colors.primary
                  }}
                >
                  <ExternalLink className="h-5 w-5" />
                  {t.viewFullDocument}
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-12 gap-0">
              {/* Metadata Sidebar */}
              <div className="col-span-12 lg:col-span-4 p-8 space-y-5" style={{ backgroundColor: colors.bgOffWhite, borderRight: isArabic ? 'none' : `3px solid ${colors.primary}`, borderLeft: isArabic ? `3px solid ${colors.primary}` : 'none' }}>
                <h3 style={{ fontFamily, fontWeight: 700, fontSize: '24px', color: colors.textPrimary, marginBottom: '20px' }}>
                  {t.metadata}
                </h3>

                <div className="bg-white p-5 rounded-xl border-2 transition-all hover:scale-105" style={{ borderColor: colors.primary }}>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.primary }}>
                      <FileText className="h-6 w-6" style={{ color: colors.bgWhite }} />
                    </div>
                    <div className="flex-1">
                      <p style={{ fontFamily, fontSize: '14px', fontWeight: 600, color: colors.textSecondary, marginBottom: '6px' }}>
                        {t.lawNumber}
                      </p>
                      <p style={{ fontFamily, fontSize: '17px', fontWeight: 700, color: colors.textPrimary, lineHeight: '1.4' }}>
                        {selectedLegislation.lawNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border-2 transition-all hover:scale-105" style={{ borderColor: colors.accent }}>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.accent }}>
                      <Calendar className="h-6 w-6" style={{ color: colors.primary }} />
                    </div>
                    <div className="flex-1">
                      <p style={{ fontFamily, fontSize: '14px', fontWeight: 600, color: colors.textSecondary, marginBottom: '6px' }}>
                        {t.issueDate}
                      </p>
                      <p style={{ fontFamily, fontSize: '17px', fontWeight: 700, color: colors.textPrimary, lineHeight: '1.4' }}>
                        {selectedLegislation.issueDate}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedLegislation.tags && selectedLegislation.tags.length > 0 && (
                  <div className="bg-white p-5 rounded-xl border-2 transition-all hover:scale-105" style={{ borderColor: colors.warning }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-5 w-5" style={{ color: colors.warning }} />
                      <p style={{ fontFamily, fontSize: '16px', fontWeight: 700, color: colors.textPrimary }}>
                        {t.tags}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedLegislation.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1.5 rounded-lg"
                          style={{ 
                            fontFamily,
                            fontSize: '14px',
                            fontWeight: 600,
                            backgroundColor: '#FFF8E1',
                            color: colors.warning,
                            border: `2px solid ${colors.warning}`
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Document Viewer */}
              <div className="col-span-12 lg:col-span-8 p-8">
                <div className="rounded-xl overflow-hidden border-2" style={{ height: '800px', borderColor: colors.primary }}>
                  <iframe
                    src={getPdfUrl()}
                    className="w-full h-full border-0"
                    title={isArabic ? selectedLegislation.nameAr : selectedLegislation.nameEn}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}