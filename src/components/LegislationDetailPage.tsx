import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Eye, Edit2, Trash2, Download, ChevronLeft, ChevronRight, FileText, Building2, ChevronDown, X, Calendar, User, ExternalLink, AlertCircle, CheckCircle2, RefreshCw, Home, ChevronRight as BreadcrumbArrow, Menu, Settings, UserCog, Plus } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
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

export function LegislationDetailPage({ categoryId, onBack }: LegislationDetailPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [entitySearchQuery, setEntitySearchQuery] = useState('');
  const [isEntityDropdownOpen, setIsEntityDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLegislation, setSelectedLegislation] = useState<LegislationItem | null>(null);
  const [editingLegislation, setEditingLegislation] = useState<LegislationItem | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editClassification, setEditClassification] = useState<'public' | 'secret'>('public');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'number'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const [viewMode, setViewMode] = useState<'admin' | 'user'>('admin');
  const [showViewOptions, setShowViewOptions] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formEditingDocument, setFormEditingDocument] = useState<any | null>(null);
  const itemsPerPage = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstHighlightRef = useRef<HTMLElement>(null);
  const prevLanguageRef = useRef(language);

  // Single unified theme color - Lighter burgundy for better visual consistency
  const themeColor = '#A94442';

  // Legislation platform theme colors
  const legislationColors = {
    primary: '#2F4F6F',    // Deep Blue-Gray
    accent: '#C9A24D',     // Muted Gold
    bgOffWhite: '#f8f9fa', // Off-white background
  };

  // Typography - Enhanced readability with modern Arabic font
  const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';

  // Entity list
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

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  useEffect(() => {
    if (showErrorMessage) {
      const timer = setTimeout(() => setShowErrorMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showErrorMessage]);

  // Handle language change to prevent flicker
  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      setIsLanguageChanging(true);
      const timer = setTimeout(() => {
        setIsLanguageChanging(false);
        prevLanguageRef.current = language;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [language]);

  // Filter entities based on search
  const filteredEntities = entities.filter(entity => {
    const searchLower = entitySearchQuery.toLowerCase();
    return (
      entity.nameAr.includes(entitySearchQuery) ||
      entity.nameEn.toLowerCase().includes(searchLower)
    );
  });

  // Get selected entity name
  const selectedEntityName = selectedEntity 
    ? entities.find(e => e.id === selectedEntity)?.[isArabic ? 'nameAr' : 'nameEn'] || ''
    : '';

  // Category configurations
  const categoryConfigs: Record<number, any> = {
    
     1: {// Entity's Legislation
      title: isArabic ? "تشريعات الجهات الخاضعة" : "Entity's Legislation",
       stripColor: '#2C3E5B',
      categories: [
        { id: 1, name: isArabic ? 'الإنشاء' : 'Establishment Law', count: 3 },
        { id: 2, name: isArabic ? 'التشريعات المالية' : 'Financial Legislation', count: 15 },
        { id: 3, name: isArabic ? 'الحوكمة' : 'Governance', count: 12 },
        { id: 4, name: isArabic ? 'العقود والمشتريات' : 'Contracts and Purchasing', count: 20 },
        { id: 5, name: isArabic ? 'الموارد البشرية' : 'Human Resources', count: 18 },
        { id: 6, name: isArabic ? 'مهام الجهة' : 'Tasks of the entity', count: 6 },
      ],
    },
    2: { // Federal Legislation
      title: isArabic ? 'التشريعات الاتحادية' : 'Federal Legislation',
      stripColor: '#C9A049',
      categories: [
        { id: 1, name: isArabic ? 'القوانين الاتحادية' : 'Federal Laws', count: 25 },
        { id: 2, name: isArabic ? 'المراسيم الاتحادية' : 'Federal Decrees', count: 18 },
        { id: 3, name: isArabic ? 'القرارات الاتحادية' : 'Federal Decisions', count: 32 },
      ],
    },
    3: { // Local Legislation
      title: isArabic ? 'التشريعات المحلية' : 'Local Legislation',
      stripColor: '#0A7544',
      categories: [
        { id: 1, name: isArabic ? 'قوانين محلية' : 'Local Laws', count: 20 },
        { id: 2, name: isArabic ? 'مراسيم محلية' : 'Local Decrees', count: 15 },
        { id: 3, name: isArabic ? 'قرارات محلية' : 'Local Decisions', count: 28 },
      ],
    },
    4: { // Supreme Committee's Legal Opinion - No categories, just list of fatwas
      title: isArabic ? 'فتاوى اللجنة العليا للتشريعات' : "Supreme Committee's Legal Opinion",
      stripColor: '#C9253B',
      categories: [], // No categories for this section
    },
    5: { // FAA Legal Opinions
      title: isArabic ? 'الآراء القانونية للجهاز' : 'FAA Legal Opinions',
      stripColor: '#1F3A8A',
      categories: [], // No categories for this section
    },
    6: { // FAA's Legislation
      title: isArabic ? 'تشريعات الجهاز' : "FAA's Legislation",
      stripColor: '#8B2C2E',
      categories: [
        { id: 1, name: isArabic ? 'قرارات مجلس الإدارة' : 'Board Decisions', count: 30 },
        { id: 2, name: isArabic ? 'السياسات والإجراءات' : 'Policies & Procedures', count: 25 },
        { id: 3, name: isArabic ? 'التعاميم' : 'Circulars', count: 40 },
        { id: 4, name: isArabic ? 'الأدلة الإرشادية' : 'Guidelines', count: 18 },
      ],
    },
  };

  const currentConfig = categoryConfigs[categoryId] || categoryConfigs[1];

  // Sample legislation data with enhanced metadata
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
    const matchesSearch = isArabic 
      ? item.nameAr.includes(searchQuery)
      : item.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    // If no categories exist (like Supreme Committee's Legal Opinion), don't filter by category
    const matchesCategory = currentConfig.categories.length === 0 ? true : item.category === selectedCategory;
    return matchesEntity && matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const content = {
    en: {
      back: 'Back',
      entityName: 'Entity Name',
      searchPlaceholder: 'Search by law name, number, or keyword...',
      searchEntityPlaceholder: 'Search for entity...',
      search: 'Search',
      clearFilters: 'Clear Filters',
      categories: 'Categories',
      hideCategories: 'Hide Categories',
      showCategories: 'Show Categories',
      legislation: 'The Legislation',
      legislationName: 'Legislation Name',
      view: 'View Details',
      edit: 'Edit',
      delete: 'Delete',
      addNew: 'Add New Record',
      refresh: 'Refresh',
      selectEntity: 'Select an entity',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'results',
      noEntitySelected: 'Please select an entity to view legislation',
      noEntityDesc: 'Select an entity from the dropdown above to begin',
      closePreview: 'Close Preview',
      lawNumber: 'Law Number',
      issueDate: 'Issue Date',
      status: 'Status',
      tags: 'Tags',
      entity: 'Entity',
      downloadPDF: 'Download PDF',
      viewFullDocument: 'View Full Document',
      active: 'Active',
      amended: 'Amended',
      cancelled: 'Cancelled',
      successDelete: 'Legislation deleted successfully',
      errorDelete: 'Failed to delete legislation. Please try again.',
      metadata: 'Metadata',
      editLegislation: 'Edit Legislation',
      addLegislation: 'Add New Legislation',
      legislationTitle: 'Legislation Title',
      classification: 'Document Classification',
      public: 'Public',
      secret: 'Secret',
      uploadNewFile: 'Upload New File',
      currentFile: 'Current File',
      save: 'Save Changes',
      cancel: 'Cancel',
      chooseFile: 'Choose File',
      noFileSelected: 'No file selected',
      legislationText: 'Legislation Text',
      searchHighlighted: 'Search results highlighted',
      officialSource: 'Official Source - Financial Audit Authority',
      deleteConfirmTitle: 'Confirm Delete',
      deleteConfirmMessage: 'Are you sure you want to delete this legislation? This action cannot be undone.',
      changeView: 'Change View',
      adminView: 'Admin View',
      userView: 'User View',
      current: 'Current',
      confirmDelete: 'Delete',
      cancelDelete: 'Cancel',
      addNewRecord: 'Add New Record',
      fatwaDetails: 'Fatwa Details',
    },
    ar: {
      back: 'رجوع',
      entityName: 'اسم الجهة',
      searchPlaceholder: 'البحث باسم القانون، الرقم، أو كلمة مفتاحية...',
      searchEntityPlaceholder: 'ابحث عن جهة...',
      search: 'بحث',
      clearFilters: 'مسح الفلاتر',
      categories: 'التصنيف',
      hideCategories: 'إخفاء التصنيف',
      showCategories: 'إظهار التصنيف',
      legislation: 'التشريعات',
      legislationName: 'اسم التشريع',
      view: 'عرض التفاصيل',
      edit: 'تعديل',
      delete: 'حذف',
      addNew: 'إضافة سجل جديد',
      refresh: 'تحديث',
      selectEntity: 'اختر جهة',
      showing: 'عرض',
      to: 'إلى',
      of: 'من',
      results: 'نتيجة',
      noEntitySelected: 'الرجاء اختيار جهة لعرض التشريعات',
      noEntityDesc: 'اختر جهة من القائمة أعلاه للبدء',
      closePreview: 'إغلاق المعاينة',
      lawNumber: 'رقم القانون',
      issueDate: 'تاريخ الإصدار',
      status: 'الحالة',
      tags: 'الوسوم',
      entity: 'الجهة',
      downloadPDF: 'تحميل PDF',
      viewFullDocument: 'عرض المستند كاملاً',
      active: 'ساري',
      amended: 'معدّل',
      cancelled: 'ملغى',
      successDelete: 'تم حذف التشريع بنجاح',
      errorDelete: 'فشل حذف التشريع. الرجاء المحاولة مرة أخرى.',
      metadata: 'البيانات الوصفية',
      editLegislation: 'تعديل التشريع',
      addLegislation: 'إضافة تشريع جديد',
      legislationTitle: 'عنوان التشريع',
      classification: 'تصنيف المستند',
      public: 'عام',
      secret: 'سري',
      uploadNewFile: 'رفع ملف جديد',
      currentFile: 'الملف الحالي',
      save: 'حفظ التغييرات',
      cancel: 'إلغاء',
      chooseFile: 'اختر ملف',
      noFileSelected: 'لم يتم اختيار ملف',
      legislationText: 'نص التشريع',
      searchHighlighted: 'نتائج البحث مميزة',
      officialSource: 'مصدر رسمي - هيئة التدقيق المالي',
      deleteConfirmTitle: 'تأكيد الحذف',
      deleteConfirmMessage: 'هل أنت متأكد من حذف هذا التشريع؟ لا يمكن التراجع عن هذا الإجراء.',
      confirmDelete: 'حذف',
      cancelDelete: 'إلغاء',
      fatwaDetails: 'تفاصيل الفتوى',
      changeView: 'تغيير العرض',
      adminView: 'عرض المشرف',
      userView: 'عرض المستخدم',
      current: 'الحالي',
      addNewRecord: 'إضافة سجل جديد',
    },
  };

  const t = content[language];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'amended': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="h-3 w-3" />;
      case 'amended': return <RefreshCw className="h-3 w-3" />;
      case 'cancelled': return <X className="h-3 w-3" />;
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
    // Show confirmation dialog
    setDeleteItemId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteItemId !== null) {
      // Simulate delete action
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

  const handleEdit = (item: LegislationItem) => {
    setEditingLegislation(item);
    setIsAddMode(false);
    setEditTitle(isArabic ? item.nameAr : item.nameEn);
    setEditFile(null);
    setEditClassification(item.classification || 'public');
  };

  const handleAddNew = () => {
    setEditingLegislation(null);
    setIsAddMode(true);
    setEditTitle('');
    setEditFile(null);
    setEditClassification('public');
  };

  const handleCloseEdit = () => {
    setEditingLegislation(null);
    setIsAddMode(false);
    setEditTitle('');
    setEditFile(null);
    setEditClassification('public');
  };

  const handleSaveEdit = () => {
    // Simulate save action
    if (isAddMode) {
      setSuccessMessage(isArabic ? 'تمت إضافة التشريع بنجاح' : 'Legislation added successfully');
    } else {
      setSuccessMessage(isArabic ? 'تم تحديث التشريع بنجاح' : 'Legislation updated successfully');
    }
    setShowSuccessMessage(true);
    handleCloseEdit();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditFile(e.target.files[0]);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedEntity('');
    setSelectedCategory(2);
    setCurrentPage(1);
  };

  // Get PDF URL with search parameter
  const getPdfUrl = (item: LegislationItem) => {
    // Real Dubai government legislation PDF - مرسوم رقم (52) لسنة 2025 بشأن إنشاء منطقة حرة في إمارة دبي
    const pdfUrl = 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf';
    
    // Use Google Docs Viewer to handle CORS restrictions and display the PDF
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Floating Action Buttons - Change View & Add New Record */}
      {!selectedLegislation && (
        <div className={`fixed top-40 ${isArabic ? 'left-4' : 'right-4'} z-50`}>
          <div className="flex gap-3">
            {/* Add New Record Button - Only visible in Admin View for all legislation categories except FAA Legal Opinions */}
            {viewMode === 'admin' && categoryId !== 5 && (
              <Button
                onClick={() => setIsFormModalOpen(true)}
                className="text-white hover:opacity-90 shadow-lg gap-2"
                size="sm"
                style={{ 
                  fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                  backgroundColor: themeColor
                }}
              >
                <Plus className="h-4 w-4" />
                {t.addNewRecord}
              </Button>
            )}

            {/* Change View Button */}
            <div className="relative">
              <Button
                onClick={() => setShowViewOptions(!showViewOptions)}
                className="bg-white text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-200 gap-2"
                size="sm"
                style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}
              >
                <Settings className="h-4 w-4" />
                {t.changeView}
              </Button>
            
            {showViewOptions && (
              <Card className={`absolute top-12 ${isArabic ? 'left-0' : 'right-0'} p-2 bg-white shadow-xl border border-gray-200 rounded-lg min-w-[200px]`}>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full ${isArabic ? 'justify-end' : 'justify-start'} gap-2`}
                    onClick={() => {
                      setViewMode('admin');
                      setShowViewOptions(false);
                    }}
                    style={{ 
                      fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                      backgroundColor: viewMode === 'admin' ? '#f3f4f6' : undefined,
                    }}
                  >
                    <UserCog className="h-4 w-4" />
                    {t.adminView}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full ${isArabic ? 'justify-end' : 'justify-start'} gap-2`}
                    onClick={() => {
                      setViewMode('user');
                      setShowViewOptions(false);
                    }}
                    style={{ 
                      fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                      backgroundColor: viewMode === 'user' ? '#f3f4f6' : undefined,
                    }}
                  >
                    <User className="h-4 w-4" />
                    {t.userView}
                  </Button>
                  <Separator className="my-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full ${isArabic ? 'justify-end' : 'justify-start'} text-gray-400 cursor-not-allowed`}
                    disabled
                    style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}
                  >
                    {viewMode === 'admin' ? `${t.current}: ${t.adminView}` : `${t.current}: ${t.userView}`}
                  </Button>
                </div>
              </Card>
            )}
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Messages */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 shadow-lg flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p 
                className="text-green-800 text-sm"
                style={{ 
                  fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                  fontWeight: 500
                }}
              >
                {successMessage}
              </p>
            </div>
            <button onClick={() => setShowSuccessMessage(false)} className="text-green-600 hover:text-green-800">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {showErrorMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 shadow-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p 
                className="text-red-800 text-sm"
                style={{ 
                  fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                  fontWeight: 500
                }}
              >
                {errorMessage}
              </p>
            </div>
            <button onClick={() => setShowErrorMessage(false)} className="text-red-600 hover:text-red-800">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Edit/Add Modal */}
      {(editingLegislation || isAddMode) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleCloseEdit}>
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {/* Modal Header */}
            <div 
              className="px-8 py-6 border-b-2 border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10"
              style={{ backgroundColor: `${themeColor}08` }}
            >
              <h3 
                className="text-slate-900 text-2xl flex items-center gap-3"
                style={{ 
                  fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                  fontWeight: 600 
                }}
              >
                <Edit2 className="h-6 w-6" style={{ color: themeColor }} />
                {isAddMode ? t.addLegislation : t.editLegislation}
              </h3>
              <button
                onClick={handleCloseEdit}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-6 space-y-6">
              {/* Legislation Title Field */}
              <div>
                <label 
                  className="block text-sm text-slate-700 mb-2"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 600 
                  }}
                >
                  {t.legislationTitle} *
                </label>
                <Input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="h-12 text-base border-2 border-gray-300 focus:border-[#923D3C] focus:ring-2 focus:ring-[#923D3C]/20"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    direction: isArabic ? 'rtl' : 'ltr',
                    textAlign: isArabic ? 'right' : 'left'
                  }}
                  placeholder={isArabic ? 'أدخل عنوان التشريع' : 'Enter legislation title'}
                />
              </div>

              {/* Classification Field */}
              <div>
                <label 
                  className="block text-sm text-slate-700 mb-2"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 600 
                  }}
                >
                  {t.classification} *
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="classification"
                      value="public"
                      checked={editClassification === 'public'}
                      onChange={(e) => setEditClassification(e.target.value as 'public' | 'secret')}
                      className="w-4 h-4 text-[#A94442] border-gray-300 "
                    />
                    <span 
                      className="text-slate-700"
                      style={{ 
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontSize: '15px'
                      }}
                    >
                      {t.public}
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="classification"
                      value="secret"
                      checked={editClassification === 'secret'}
                      onChange={(e) => setEditClassification(e.target.value as 'public' | 'secret')}
                      className="w-4 h-4 text-[#A94442] border-gray-300 "
                    />
                    <span 
                      className="text-slate-700"
                      style={{ 
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontSize: '15px'
                      }}
                    >
                      {t.secret}
                    </span>
                  </label>
                </div>
              </div>

              {/* File Upload Section */}
              <div>
                <label 
                  className="block text-sm text-slate-700 mb-2"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 600 
                  }}
                >
                  {isAddMode ? (isArabic ? 'رفع الملف *' : 'Upload File *') : t.uploadNewFile}
                </label>
                
                {/* Current File Display - Only show in edit mode */}
                {!isAddMode && editingLegislation && (
                  <div className="mb-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div className="flex-1">
                        <p 
                          className="text-sm text-slate-700"
                          style={{ 
                            fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                            fontWeight: 500 
                          }}
                        >
                          {t.currentFile}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {editingLegislation.lawNumber}.pdf
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* File Input */}
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-2 w-full h-12 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#923D3C] hover:bg-[#FBF5F5] transition-all"
                  >
                    <Download className="h-5 w-5 text-slate-600" />
                    <span 
                      className="text-slate-700"
                      style={{ 
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontWeight: 500 
                      }}
                    >
                      {t.chooseFile}
                    </span>
                  </label>
                  {editFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                        {editFile.name}
                      </span>
                    </div>
                  )}
                </div>
                <p 
                  className="mt-2 text-xs text-slate-500"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' 
                  }}
                >
                  {isArabic ? 'الملفات المدعومة: PDF (الحد الأقصى 10 ميجابايت)' : 'Supported files: PDF (Max 10MB)'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t-2 border-gray-200 flex items-center justify-end gap-3 bg-gray-50 rounded-b-2xl">
              <Button
                variant="outline"
                onClick={handleCloseEdit}
                className="h-11 px-6 border-2 border-gray-300 hover:bg-gray-100"
              >
                {t.cancel}
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="h-11 px-8 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: themeColor }}
                disabled={!editTitle.trim() || (isAddMode && !editFile)}
              >
                <CheckCircle2 className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                {t.save}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section with Breadcrumb */}
      <div className="bg-white border-b border-gray-200 shadow-sm fixed top-[133px] w-full  z-20">
        <div className="max-w-[1600px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={selectedLegislation ? handleClosePreview : onBack}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-10 px-4"
                style={{ 
                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600
                }}
              >
                <ArrowLeft className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} />
                <span>{t.back}</span>
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h6 
                className="text-slate-900"
                style={{ 
                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600 
                }}
              >
                {currentConfig.title}
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      {!selectedLegislation && (
      <div className="bg-white border-b border-gray-200 shadow-sm pt-[80px]">
        <div className="max-w-[1600px] mx-auto px-8 py-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Entity Searchable Dropdown */}
              <div className="flex-1" ref={dropdownRef}>
                <label 
                  className="block text-sm text-slate-700 mb-2"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 600 
                  }}
                >
                  {t.entityName}
                </label>
                <div className="relative">
                  <Building2 className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400 pointer-events-none z-10`} />
                  <button
                    onClick={() => setIsEntityDropdownOpen(!isEntityDropdownOpen)}
                    className={`w-full h-12 ${isArabic ? 'pr-11 pl-11' : 'pl-11 pr-11'} rounded-lg border-2 border-gray-300 bg-white text-slate-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all flex items-center justify-between text-${isArabic ? 'right' : 'left'}`}
                    style={{ 
                      fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' 
                    }}
                  >
                    <span className="text-[15px] truncate">
                      {selectedEntityName || t.selectEntity}
                    </span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isEntityDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isEntityDropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white border-2 border-gray-300 shadow-xl rounded-lg max-h-80 overflow-hidden">
                      {/* Search Input */}
                      <div className="p-3 border-b border-gray-200 bg-gray-50">
                        <div className="relative">
                          <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400`} />
                          <Input
                            type="text"
                            placeholder={t.searchEntityPlaceholder}
                            value={entitySearchQuery}
                            onChange={(e) => setEntitySearchQuery(e.target.value)}
                            className={`h-10 ${isArabic ? 'pr-10' : 'pl-10'} border-gray-300`}
                            style={{ 
                              fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' 
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>

                      {/* Entity List */}
                      <div className="max-h-60 overflow-y-auto">
                        {filteredEntities.length > 0 ? (
                          filteredEntities.map(entity => (
                            <button
                              key={entity.id}
                              onClick={() => {
                                setSelectedEntity(entity.id);
                                setIsEntityDropdownOpen(false);
                                setEntitySearchQuery('');
                                setCurrentPage(1);
                              }}
                              className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between min-h-[48px] ${
                                selectedEntity === entity.id ? 'bg-gray-100' : ''
                              }`}
                              style={{
                                fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                              }}
                            >
                              <span className="text-[15px] text-slate-700">{entity[isArabic ? 'nameAr' : 'nameEn']}</span>
                              {selectedEntity === entity.id && (
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-sm text-slate-500"
                            style={{ 
                              fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' 
                            }}
                          >
                            {isArabic ? 'لا توجد نتائج' : 'No results found'}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Search Input */}
              <div className="flex-1">
                <label 
                  className="block text-sm text-slate-700 mb-2"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 600 
                  }}
                >
                  {t.search}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`} />
                    <Input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`h-12 ${isArabic ? 'pr-11' : 'pl-11'} border-2 border-gray-300 text-[15px]`}
                      style={{ 
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' 
                      }}
                    />
                  </div>
                  <Button 
                    className="h-12 px-8 text-white hover:opacity-90 transition-opacity text-[15px]"
                    style={{ backgroundColor: themeColor }}
                  >
                    <Search className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                    {t.search}
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedEntity || searchQuery) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  className="text-sm text-slate-600"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 500
                  }}
                >
                  {isArabic ? 'الفلاتر النشطة:' : 'Active Filters:'}
                </span>
                {selectedEntity && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <Building2 className="h-3 w-3" />
                    <span style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                      {selectedEntityName}
                    </span>
                    <button onClick={() => setSelectedEntity('')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    <Search className="h-3 w-3" />
                    <span style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                      {searchQuery}
                    </span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-purple-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-slate-600 hover:text-slate-900 h-7 px-3 text-sm"
                >
                  <X className="h-3 w-3 mr-1" />
                  {t.clearFilters}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Main Content */}
      {!selectedEntity ? (
        // Empty State - No Entity Selected
        <div className="max-w-[1600px] mx-auto px-8 py-16">
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-12 text-center">
            <Building2 className="h-20 w-20 mx-auto mb-4 text-gray-300" />
            <h3 
              className="text-slate-700 text-xl mb-2"
              style={{ 
                fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                fontWeight: 600 
              }}
            >
              {t.noEntitySelected}
            </h3>
            <p 
              className="text-slate-500 text-base"
              style={{ 
                fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' 
              }}
            >
              {t.noEntityDesc}
            </p>
          </div>
        </div>
      ) : selectedLegislation ? (
        // Document Preview Panel
        <>
          

        <div className="max-w-[1600px] mx-auto px-8 py-8 mt-[85px]">
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
            {/* Header with Color Strip */}
            <div 
              className="h-2"
              style={{ backgroundColor: themeColor }}
            ></div>
            
            {/* Title Section - Full Width */}
            <div className="px-8 py-6 border-b border-gray-200">
              {/* Classification Chip */}
              <div className="mb-4">
                <span 
                  className="inline-flex items-center px-2.5 py-1 text-xs"
                  style={{
                    backgroundColor: selectedLegislation.classification === 'public' ? '#F9E8E9' : '#A94442',
                    color: selectedLegislation.classification === 'public' ? '#7B282D' : 'white',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif'
                  }}
                >
                  {selectedLegislation.classification === 'public' 
                    ? (isArabic ? 'عام' : 'Public') 
                    : (isArabic ? 'سري' : 'Secret')
                  }
                </span>
              </div>

              {/* Title */}
              <h2 
                className="text-slate-900 mb-6"
                style={{ 
                  fontFamily,
                  fontSize: '29px',
                  fontWeight: 600,
                  lineHeight: '1.4'
                }}
              >
                {isArabic ? selectedLegislation.nameAr : selectedLegislation.nameEn}
              </h2>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="text-white h-11 px-6"
                  style={{ backgroundColor: themeColor }}
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = getPdfUrl(selectedLegislation);
                    link.download = `${selectedLegislation.lawNumber}.pdf`;
                    link.click();
                  }}
                >
                  <Download className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                  {t.downloadPDF}
                </Button>
                <Button 
                  variant="outline"
                  className="h-11 px-6 border-2"
                  onClick={() => {
                    window.open(getPdfUrl(selectedLegislation), '_blank');
                  }}
                >
                  <ExternalLink className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                  {t.viewFullDocument}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleEdit(selectedLegislation)}
                  className="h-11 px-6 border-2 border-[#923D3C] text-[#923D3C] hover:bg-[#FBF5F5]"
                >
                  <Edit2 className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                  {t.edit}
                </Button>
              </div>
            </div>

            {/* Two Column Layout: Metadata (1/4) + Document Viewer (3/4) */}
            <div className="grid grid-cols-12 gap-0">
              {/* Left Sidebar - Metadata (1/4 width = 3 columns) */}
              <div className="col-span-12 lg:col-span-3 border-r border-gray-200 bg-gray-50">
                <div className="p-6 sticky top-[100px]">
                  <h3 
                    className="text-slate-900 mb-6 pb-3 border-b border-gray-300"
                    style={{ 
                      fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                      fontWeight: 600,
                      fontSize: '18px'
                    }}
                  >
                    {t.metadata}
                  </h3>

                  {/* Metadata Items */}
                  <div className="space-y-6">
                    {/* Law Number */}
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-500 mb-1" style={{ fontFamily, fontSize: '13px' }}>
                            {t.lawNumber}
                          </p>
                          <p className="text-slate-900" style={{ fontFamily, fontSize: '16px', fontWeight: 500 }}>
                            {selectedLegislation.lawNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Issue Date */}
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-500 mb-1" style={{ fontFamily, fontSize: '13px' }}>
                            {t.issueDate}
                          </p>
                          <p className="text-slate-900" style={{ fontFamily, fontSize: '16px', fontWeight: 500 }}>
                            {selectedLegislation.issueDate}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Entity */}
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-500 mb-1" style={{ fontFamily, fontSize: '13px' }}>
                            {t.entity}
                          </p>
                          <p className="text-slate-900" style={{ fontFamily, fontSize: '16px', fontWeight: 500 }}>
                            {selectedEntityName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Document Viewer (3/4 width = 9 columns) */}
              <div className="col-span-12 lg:col-span-9">
                <div className="p-6">
                  {/* Document Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 
                      className="text-slate-900 text-xl flex items-center gap-2"
                      style={{ 
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontWeight: 600 
                      }}
                    >
                      <FileText className="h-5 w-5" style={{ color: themeColor }} />
                      {t.legislationText}
                    </h3>
                    {searchQuery && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <Search className="h-4 w-4 text-yellow-600" />
                        <span 
                          className="text-sm text-yellow-800"
                          style={{ 
                            fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                            fontWeight: 500
                          }}
                        >
                          {t.searchHighlighted}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* PDF Iframe Viewer */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
                    <iframe
                      src={getPdfUrl(selectedLegislation)}
                      className="w-full h-[800px]"
                      title={isArabic ? selectedLegislation.nameAr : selectedLegislation.nameEn}
                      style={{
                        border: 'none',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Document Footer */}
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                      {t.officialSource}
                    </span>
                    <span style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                      {selectedLegislation.issueDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      ) : (
        // Content Area - Entity Selected
        <div className="max-w-[1600px] mx-auto px-8 py-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar - Categories (only show if categories exist) */}
            {currentConfig.categories.length > 0 && (
            <div className={`col-span-12 lg:col-span-3 transition-all duration-300 ${!isSidebarOpen ? 'hidden lg:block' : ''} ${isLanguageChanging ? 'opacity-0' : 'opacity-100'}`}>
              <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden sticky top-[226px]">
                <div 
                  className="px-5 py-4 border-b border-gray-200"
                  style={{ backgroundColor: `${themeColor}08` }}
                >
                  <h4 
                    className="text-slate-900 text-base flex items-center gap-2"
                    style={{ 
                      fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                      fontWeight: 600 
                    }}
                  >
                    <Filter className="h-5 w-5" style={{ color: themeColor }} />
                    {t.categories}
                  </h4>
                </div>
                <div className="p-2">
                  {currentConfig.categories.map((cat: any) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentPage(1);
                        // Collapse sidebar on mobile/tablet
                        if (window.innerWidth < 1024) {
                          setIsSidebarOpen(false);
                        }
                      }}
                      className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group min-h-[48px] ${
                        selectedCategory === cat.id
                          ? 'text-white shadow-md'
                          : 'text-slate-700 hover:bg-gray-50'
                      }`}
                      style={{
                        backgroundColor: selectedCategory === cat.id ? themeColor : 'transparent',
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontWeight: selectedCategory === cat.id ? 500 : 400,
                      }}
                    >
                      <span className="text-[15px]">{cat.name}</span>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full min-w-[28px] text-center ${
                          selectedCategory === cat.id 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-100 text-slate-600 group-hover:bg-gray-200'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            )}

            {/* Main Content - Legislation Table */}
            <div className={`col-span-12 transition-all duration-300 ${currentConfig.categories.length === 0 ? '' : (!isSidebarOpen ? 'lg:col-span-12' : 'lg:col-span-9')} ${isLanguageChanging ? 'opacity-0' : 'opacity-100'}`}>
              <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Sidebar Toggle Button - Mobile/Tablet (only show if categories exist) */}
                    {currentConfig.categories.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      className="lg:hidden text-slate-600 border-2 border-gray-300 hover:bg-gray-50 h-10 w-10 p-0"
                      title={isSidebarOpen ? t.hideCategories : t.showCategories}
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                    )}
                    <h4
                      className="text-slate-900 text-base flex items-center gap-2"
                      style={{ 
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontWeight: 600 
                      }}
                    >
                      <FileText className="h-5 w-5" style={{ color: themeColor }} />
                      {t.legislation}
                      <span className="text-slate-500 text-sm" style={{ fontWeight: 400 }}>
                        ({filteredData.length} {t.results})
                      </span>
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-slate-600 border-2 border-gray-300 hover:bg-gray-50 h-10 px-4"
                    >
                      <Download className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                      {isArabic ? 'تصدير' : 'Export'}
                    </Button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      {(categoryId === 4 || categoryId === 5) ? (
                        /* Enhanced Fatwa Table Header */
                        <tr className="bg-gray-50 border-b-2 border-gray-200">
                          <th 
                            className={`px-4 py-4 text-${isArabic ? 'right' : 'left'} uppercase tracking-wider text-slate-700`}
                            style={{ 
                              fontFamily,
                              fontWeight: 700,
                              fontSize: '15px',
                              width: '50px'
                            }}
                          >
                            #
                          </th>
                          <th 
                            className={`px-4 py-4 text-${isArabic ? 'right' : 'left'} uppercase tracking-wider text-slate-700`}
                            style={{ 
                              fontFamily,
                              fontWeight: 700,
                              fontSize: '15px'
                            }}
                          >
                            {isArabic ? 'الموضوع' : 'Subject'}
                          </th>
                          <th 
                            className={`px-4 py-4 text-${isArabic ? 'right' : 'left'} uppercase tracking-wider text-slate-700`}
                            style={{ 
                              fontFamily,
                              fontWeight: 700,
                              fontSize: '15px',
                              width: '150px'
                            }}
                          >
                            {isArabic ? 'تاريخ الإصدار' : 'Issue Date'}
                          </th>
                          <th 
                            className="px-4 py-4 text-center uppercase tracking-wider text-slate-700"
                            style={{ 
                              fontFamily,
                              fontWeight: 700,
                              fontSize: '15px',
                              width: '160px'
                            }}
                          >
                            {isArabic ? 'الإجراءات' : 'Actions'}
                          </th>
                        </tr>
                      ) : (
                        /* Regular Legislation Table Header */
                        <tr className="bg-gray-50 border-b-2 border-gray-200">
                          <th 
                            className={`px-6 py-4 text-${isArabic ? 'right' : 'left'} uppercase tracking-wider text-slate-700`}
                            style={{ 
                              fontFamily,
                              fontWeight: 700,
                              fontSize: '15px',
                              width: '60px'
                            }}
                          >
                            #
                          </th>
                          <th 
                            className={`px-6 py-4 text-${isArabic ? 'right' : 'left'} uppercase tracking-wider text-slate-700`}
                            style={{ 
                              fontFamily,
                              fontWeight: 700,
                              fontSize: '15px'
                            }}
                          >
                            {t.legislationName}
                          </th>
                          <th 
                            className="px-6 py-4 text-center uppercase tracking-wider text-slate-700"
                            style={{ 
                              fontFamily,
                              fontWeight: 700,
                              fontSize: '15px',
                              width: '200px'
                            }}
                          >
                            {isArabic ? 'الإجراءات' : 'Actions'}
                          </th>
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item, index) => (
                          (categoryId === 4 || categoryId === 5) ? (
                            /* Enhanced Fatwa Row */
                            <tr 
                              key={item.id} 
                              className="group cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-inset"
                              tabIndex={0}
                              style={{
                                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                                borderInlineStart: '4px solid transparent',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${legislationColors.primary}15`;
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(47, 79, 111, 0.18)';
                                e.currentTarget.style.borderInlineStartColor = legislationColors.accent;
                                e.currentTarget.style.transform = 'translateY(-2px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderInlineStartColor = 'transparent';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                              onClick={() => handleViewDetails(item)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleViewDetails(item);
                                }
                              }}
                            >
                              {/* Row Number */}
                              <td 
                                className={`px-4 py-4 text-${isArabic ? 'right' : 'left'} text-slate-600 transition-all duration-200`}
                                style={{ 
                                  fontFamily,
                                  fontSize: '17px',
                                  transition: 'all 200ms ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = '#8B272D';
                                  e.currentTarget.style.fontWeight = '500';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = 'rgb(71, 85, 105)';
                                  e.currentTarget.style.fontWeight = '400';
                                }}
                              >
                                {startIndex + index + 1}
                              </td>
                              
                              {/* Subject/Title */}
                              <td className={`px-4 py-4 text-${isArabic ? 'right' : 'left'}`}>
                                <p 
                                  className="text-slate-900 group-hover:text-[#8B272D] transition-colors duration-200"
                                  style={{ 
                                    fontFamily,
                                    fontSize: '18px',
                                    lineHeight: '1.6',
                                    fontWeight: 500
                                  }}
                                >
                                  {isArabic ? item.nameAr : item.nameEn}
                                </p>
                              </td>

                              {/* Issue Date */}
                              <td className={`px-4 py-4 text-${isArabic ? 'right' : 'left'}`}>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-slate-400 group-hover:text-[#8B272D] transition-colors duration-200" />
                                  <span 
                                    className="text-slate-600 group-hover:text-slate-900 transition-colors duration-200"
                                    style={{ 
                                      fontFamily,
                                      fontSize: '17px',
                                      fontWeight: 400
                                    }}
                                  >
                                    {item.issueDate || item.date}
                                  </span>
                                </div>
                              </td>

                              {/* Actions - With Tooltips */}
                              <td className="px-4 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  {/* View Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleViewDetails(item);
                                    }}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                                    aria-label={t.view}
                                    title={t.view}
                                  >
                                    <Eye className="h-5 w-5" style={{ transition: 'color 200ms ease' }} />
                                  </button>

                                  {/* Edit Button - Admin Only */}
                                  {viewMode === 'admin' && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(item);
                                      }}
                                      className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                                      aria-label={t.edit}
                                      title={t.edit}
                                    >
                                      <Edit2 className="h-4 w-4" style={{ transition: 'color 200ms ease' }} />
                                    </button>
                                  )}

                                  {/* Delete Button - Admin Only */}
                                  {viewMode === 'admin' && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item.id);
                                      }}
                                      className="w-10 h-10 rounded-full flex items-center justify-center text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
                                          (icon as HTMLElement).style.color = '#DC2626';
                                        }
                                      }}
                                      aria-label={t.delete}
                                      title={t.delete}
                                    >
                                      <Trash2 className="h-4 w-4" style={{ transition: 'color 200ms ease' }} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ) : (
                            /* Regular Legislation Row */
                            <tr 
                              key={item.id} 
                              className="group cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-inset"
                              tabIndex={0}
                              style={{
                                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                                borderInlineStart: '4px solid transparent',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${legislationColors.primary}15`;
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(47, 79, 111, 0.18)';
                                e.currentTarget.style.borderInlineStartColor = legislationColors.accent;
                                e.currentTarget.style.transform = 'translateY(-2px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderInlineStartColor = 'transparent';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                              onClick={() => handleViewDetails(item)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleViewDetails(item);
                                }
                              }}
                            >
                              <td 
                                className={`px-6 py-4 text-${isArabic ? 'right' : 'left'} text-slate-600 transition-all duration-200`}
                                style={{ 
                                  fontFamily,
                                  fontSize: '17px',
                                  transition: 'all 200ms ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = '#8B272D';
                                  e.currentTarget.style.fontWeight = '500';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = 'rgb(71, 85, 105)';
                                  e.currentTarget.style.fontWeight = '400';
                                }}
                              >
                                {startIndex + index + 1}
                              </td>
                              <td 
                                className={`px-6 py-4 text-${isArabic ? 'right' : 'left'}`}
                              >
                                <div className="flex flex-col gap-1">
                                  <p 
                                    className="text-slate-900 group-hover:text-[#8B272D] transition-colors duration-200"
                                    style={{ 
                                      fontFamily,
                                      fontSize: '18px',
                                      lineHeight: '1.6',
                                      fontWeight: 500
                                    }}
                                  >
                                    {isArabic ? item.nameAr : item.nameEn}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    {viewMode === 'admin' ? (
                                      /* Document Classification Chip - Admin View */
                                      <span 
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs"
                                        style={{
                                          backgroundColor: item.classification === 'public' ? '#F9E8E9' : '#A94442',
                                          color: item.classification === 'public' ? '#7B282D' : 'white',
                                          borderRadius: '4px',
                                          fontSize: '15px',
                                          fontWeight: '600',
                                          fontFamily
                                        }}
                                      >
                                        {item.classification === 'public' 
                                          ? (isArabic ? 'عام' : 'Public') 
                                          : (isArabic ? 'سري' : 'Secret')
                                        }
                                      </span>
                                    ) : (
                                      /* Year Chip - User View */
                                      <span 
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs"
                                        style={{
                                          backgroundColor: '#A94442',
                                          color: 'white',
                                          borderRadius: '4px',
                                          fontSize: '15px',
                                          fontWeight: '600',
                                          fontFamily
                                        }}
                                      >
                                        <Calendar className="h-3 w-3" />
                                        {(item.issueDate || item.date).split('-')[0]}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                {/* View Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewDetails(item);
                                  }}
                                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                                  aria-label={t.view}
                                >
                                  <Eye className="h-5 w-5" style={{ transition: 'color 200ms ease' }} />
                                </button>

                                {/* Edit Button - Admin Only */}
                                {viewMode === 'admin' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEdit(item);
                                    }}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                                    aria-label={t.edit}
                                  >
                                    <Edit2 className="h-5 w-5" style={{ transition: 'color 200ms ease' }} />
                                  </button>
                                )}

                                {/* Delete Button - Admin Only */}
                                {viewMode === 'admin' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(item.id);
                                    }}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
                                    aria-label={t.delete}
                                  >
                                    <Trash2 className="h-5 w-5" style={{ transition: 'color 200ms ease' }} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                          )
                        ))
                      ) : (
                        <tr>
                          <td colSpan={(categoryId === 4 || categoryId === 5) ? 4 : 3} className="px-6 py-16 text-center">
                            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                            <p 
                              className="text-slate-500 text-base"
                              style={{ 
                                fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                                fontWeight: 500
                              }}
                            >
                              {isArabic ? 'لا توجد تشريعات' : 'No legislation found'}
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {paginatedData.length > 0 && (
                  <div className="px-6 py-5 border-t-2 border-gray-200 flex items-center justify-between bg-gray-50">
                    <div 
                      className="text-sm text-slate-700"
                      style={{ 
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontWeight: 500
                      }}
                    >
                      {t.showing} {startIndex + 1} {t.to} {Math.min(startIndex + itemsPerPage, filteredData.length)} {t.of} {filteredData.length} {t.results}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="disabled:opacity-50 disabled:cursor-not-allowed h-10 w-10 p-0 border-2"
                      >
                        <ChevronLeft className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} />
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 border-2 ${currentPage === page ? 'text-white' : 'text-slate-700'}`}
                            style={{
                              backgroundColor: currentPage === page ? themeColor : 'transparent',
                              borderColor: currentPage === page ? themeColor : '#d1d5db',
                            }}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="disabled:opacity-50 disabled:cursor-not-allowed h-10 w-10 p-0 border-2"
                      >
                        <ChevronRight className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={cancelDelete}>
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="bg-[#A94442] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <h3 
                  className="text-white text-lg mb-0"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 600 
                  }}
                >
                  {t.deleteConfirmTitle}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <p 
                className={`text-gray-700 text-base leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}
              >
                {t.deleteConfirmMessage}
              </p>
            </div>

            {/* Actions */}
            <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="outline"
                onClick={cancelDelete}
                className="flex-1 h-11 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all"
                style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}
              >
                {t.cancelDelete}
              </Button>
              <Button
                onClick={confirmDelete}
                className="flex-1 h-11 text-white border-0 shadow-md hover:shadow-lg transition-all hover:bg-[#8B3735]"
                style={{ 
                  backgroundColor: '#A94442',
                  fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif'
                }}
              >
                <Trash2 className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                {t.confirmDelete}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Document Form Modal */}
      <DocumentFormModal
        document={formEditingDocument}
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setFormEditingDocument(null);
        }}
        onSave={(documentData) => {
          // Handle document save
          console.log('Document saved:', documentData);
          setSuccessMessage(isArabic ? 'تم حفظ المستند بنجاح' : 'Document saved successfully');
          setShowSuccessMessage(true);
          setIsFormModalOpen(false);
          setFormEditingDocument(null);
        }}
        language={language}
        entities={entities}
      />
    </div>
  );
}