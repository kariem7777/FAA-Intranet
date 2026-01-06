import { FileText, Search, Filter, Download, Eye, Calendar, User, Tag, FolderOpen, Shield, BookOpen, Award, Scale, TrendingUp, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { HeroBanner } from './HeroBanner';
import svgPaths from '../imports/svg-z20qwemupq';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';

export function DocumentsPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All Documents');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sectors and their departments
  const sectors = [
    { 
      id: 'audit', 
      nameEn: 'Audit Sector', 
      nameAr: 'قطاع التدقيق',
      departments: [
        { id: 'financial', nameEn: 'Financial Audit', nameAr: 'التدقيق المالي' },
        { id: 'performance', nameEn: 'Performance Audit', nameAr: 'تدقيق الأداء' },
        { id: 'compliance', nameEn: 'Compliance Audit', nameAr: 'تدقيق الامتثال' },
        { id: 'it', nameEn: 'IT Audit', nameAr: 'تدقيق تقنية المعلومات' },
      ]
    },
    { 
      id: 'support', 
      nameEn: 'Support Services Sector', 
      nameAr: 'قطاع الخدمات المساندة',
      departments: [
        { id: 'hr', nameEn: 'Human Resources', nameAr: 'الموارد البشرية' },
        { id: 'finance', nameEn: 'Finance Department', nameAr: 'إدارة المالية' },
        { id: 'it_services', nameEn: 'IT Services', nameAr: 'خدمات تقنية المعلومات' },
        { id: 'legal', nameEn: 'Legal Affairs', nameAr: 'الشؤون القانونية' },
      ]
    },
    { 
      id: 'strategy', 
      nameEn: 'Strategy & Planning Sector', 
      nameAr: 'قطاع الاستراتيجية والتخطيط',
      departments: [
        { id: 'planning', nameEn: 'Strategic Planning', nameAr: 'التخطيط الاستراتيجي' },
        { id: 'risk', nameEn: 'Risk Management', nameAr: 'إدارة المخاطر' },
        { id: 'quality', nameEn: 'Quality Assurance', nameAr: 'ضمان الجودة' },
        { id: 'research', nameEn: 'Research & Development', nameAr: 'البحث والتطوير' },
      ]
    },
    { 
      id: 'operations', 
      nameEn: 'Operations Sector', 
      nameAr: 'قطاع العمليات',
      departments: [
        { id: 'operations_mgmt', nameEn: 'Operations Management', nameAr: 'إدارة العمليات' },
        { id: 'facilities', nameEn: 'Facilities Management', nameAr: 'إدارة المرافق' },
        { id: 'procurement', nameEn: 'Procurement', nameAr: 'المشتريات' },
        { id: 'admin', nameEn: 'Administration', nameAr: 'الإدارة' },
      ]
    },
  ];

  // Get departments for selected sector
  const getDepartments = () => {
    if (selectedSector === 'all') return [];
    const sector = sectors.find(s => s.id === selectedSector);
    return sector?.departments || [];
  };

  // Reset department when sector changes
  const handleSectorChange = (sectorId: string) => {
    setSelectedSector(sectorId);
    setSelectedDepartment('all');
  };

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

  const content = {
    en: {
      pageTitle: 'Documents Search Engine',
      pageSubtitle: 'Centralized repository of institutional knowledge and official documents',
      statTotal: 'Total Documents',
      statViews: 'Monthly Views',
      statDownloads: 'Downloads',
      searchPlaceholder: 'Search by title, content, tags, author, or metadata...',
      allSectors: 'All Sectors',
      selectSector: 'Select Sector',
      allDepartments: 'All Departments',
      selectDepartment: 'Select Department',
      lawsLegislation: 'Laws & Legislation',
      policies: 'Policies',
      procedures: 'Procedures & Manuals',
      auditStandards: 'Audit Standards',
      templates: 'Templates & Forms',
      securityHub: 'Information Security Hub',
      filters: 'Filters',
      popularTags: 'Popular tags:',
      documentCategories: 'Document Categories',
      documentsCount: 'documents',
      recentDocuments: 'Recent Documents',
      documents: 'Documents',
      myDocuments: 'My Documents',
      recentlyViewed: 'Recently Viewed',
      uploadedBy: 'Uploaded by:',
      views: 'views',
      downloads: 'downloads',
      view: 'View',
      download: 'Download',
      managementTitle: 'Document Management Features',
      metadataTitle: 'Metadata Tagging',
      metadataDesc: 'Advanced tagging system for easy categorization and retrieval',
      accessTitle: 'Access Control',
      accessDesc: 'Role-based permissions ensuring document security and confidentiality',
      trackingTitle: 'Activity Tracking',
      trackingDesc: 'Comprehensive audit trail of document views, downloads, and modifications',
      published: 'Published',
      previous: 'Previous',
      next: 'Next',
      showing: 'Showing',
      of: 'of',
    },
    ar: {
      pageTitle: 'محرك البحث عن الوثائق',
      pageSubtitle: 'مستودع مركزي للمعرفة المؤسسية والوثائق الرسمية',
      statTotal: 'إجمالي الوثائق',
      statViews: 'المشاهدات الشهرية',
      statDownloads: 'التنزيلات',
      searchPlaceholder: 'البحث حسب العنوان أو المحتوى أو الوسوم أو المؤلف أو البيانات الوصفية...',
      allSectors: 'جميع القطاعات',
      selectSector: 'اختر القطاع',
      allDepartments: 'جميع الإدارات',
      selectDepartment: 'اختر الإدارة',
      lawsLegislation: 'القوانين والتشريعات',
      policies: 'السياسات',
      procedures: 'الإجراءات والأدلة',
      auditStandards: 'معايير التدقيق',
      templates: 'النماذج والقوالب',
      securityHub: 'مركز أمن المعلومات',
      filters: 'الفلاتر',
      popularTags: 'الوسوم الشائعة:',
      documentCategories: 'فئات الوثائق',
      documentsCount: 'وثيقة',
      recentDocuments: 'الوثائق الحديثة',
      documents: 'الوثائق',
      myDocuments: 'وثائقي',
      recentlyViewed: 'المشاهدة مؤخراً',
      uploadedBy: 'تم الرفع بواسطة:',
      views: 'مشاهدة',
      downloads: 'تنزيل',
      view: 'عرض',
      download: 'تحميل',
      managementTitle: 'ميزات إدارة الوثائق',
      metadataTitle: 'وضع علامات على البيانات الوصفية',
      metadataDesc: 'نظام وسوم متقدم لسهولة التصنيف والاسترجاع',
      accessTitle: 'التحكم في الوصول',
      accessDesc: 'أذونات قائمة على الأدوار لضمان أمان الوثائق والسرية',
      trackingTitle: 'تتبع النشاط',
      trackingDesc: 'سجل تدقيق شامل لمشاهدات الوثائق والتنزيلات والتعديلات',
      published: 'منشور',
      previous: 'السابق',
      next: 'التالي',
      showing: 'عرض',
      of: 'من',
    }
  };

  const t = content[language];

  const documentCategories = [
    { name: isArabic ? 'جميع الوثائق' : 'All Documents', count: 1345, icon: FileText, color: 'bg-[#7b282d]' },
    { name: t.lawsLegislation, count: 156, icon: Scale, color: 'bg-[#971b1e]' },
    { name: t.policies, count: 234, icon: FileText, color: 'bg-[#ec2227]' },
    { name: t.procedures, count: 189, icon: BookOpen, color: 'bg-[#513a40]' },
    { name: t.auditStandards, count: 98, icon: Award, color: 'bg-[#A94442]' },
    { name: t.templates, count: 312, icon: FileText, color: 'bg-[#413f30]' },
    { name: t.securityHub, count: 87, icon: Shield, color: 'bg-[#064368]' },
    { name: isArabic ? 'المنشورات والقرارات' : 'Circulars & Decisions', count: 145, icon: FileText, color: 'bg-[#908e81]' },
    { name: isArabic ? 'أدلة المستخدم' : 'User Guides', count: 124, icon: BookOpen, color: 'bg-[#5f4367]' },
  ];

  const recentDocuments = [
    {
      id: 1,
      title: 'Audit Methodology Manual v4.2',
      titleAr: 'دليل منهجية التدقيق الإصدار 4.2',
      category: 'Procedures & Manuals',
      categoryAr: 'الإجراءات والأدلة',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Ahmed Al Mansoori',
      uploadedByAr: 'أحمد المنصوري',
      uploadDate: '2025-11-25',
      views: 234,
      downloads: 89,
      tags: ['Audit', 'Methodology', 'Manual'],
      tagsAr: ['التدقيق', 'المنهجية', 'الدليل'],
      status: 'Published',
    },
    {
      id: 2,
      title: 'Federal Law No. 12/2025 - Public Sector Governance',
      titleAr: 'القانون الاتحادي رقم 12/2025 - حوكمة القطاع العام',
      category: 'Laws & Legislation',
      categoryAr: 'القوانين والتشريعات',
      type: 'PDF',
      size: '1.8 MB',
      uploadedBy: 'Legal Department',
      uploadedByAr: 'الإدارة القانونية',
      uploadDate: '2025-11-24',
      views: 567,
      downloads: 234,
      tags: ['Law', 'Governance', 'Compliance'],
      tagsAr: ['قانون', 'حوكمة', 'امتثال'],
      status: 'Published',
    },
    {
      id: 3,
      title: 'Remote Work Policy Update',
      titleAr: 'تحديث سياسة العمل عن بُعد',
      category: 'Policies',
      categoryAr: 'السياسات',
      type: 'DOCX',
      size: '456 KB',
      uploadedBy: 'HR Department',
      uploadedByAr: 'إدارة الموارد البشرية',
      uploadDate: '2025-11-23',
      views: 432,
      downloads: 178,
      tags: ['HR', 'Policy', 'Remote Work'],
      tagsAr: ['الموارد البشرية', 'سياسة', 'العمل عن بُعد'],
      status: 'Published',
    },
    {
      id: 4,
      title: 'Risk Assessment Template',
      titleAr: 'نموذج تقييم المخاطر',
      category: 'Templates & Forms',
      categoryAr: 'النماذج والقوالب',
      type: 'XLSX',
      size: '124 KB',
      uploadedBy: 'Risk Management',
      uploadedByAr: 'إدارة المخاطر',
      uploadDate: '2025-11-22',
      views: 298,
      downloads: 145,
      tags: ['Risk', 'Template', 'Assessment'],
      tagsAr: ['مخاطر', 'نموذج', 'تقييم'],
      status: 'Published',
    },
    {
      id: 5,
      title: 'International Audit Standards - ISSAI Framework',
      titleAr: 'معايير التدقيق الدولية - إطار ISSAI',
      category: 'Audit Standards',
      categoryAr: 'معايير التدقيق',
      type: 'PDF',
      size: '3.2 MB',
      uploadedBy: 'Quality Assurance',
      uploadedByAr: 'ضمان الجودة',
      uploadDate: '2025-11-20',
      views: 389,
      downloads: 167,
      tags: ['Standards', 'ISSAI', 'International'],
      tagsAr: ['معايير', 'ISSAI', 'دولي'],
      status: 'Published',
    },
    {
      id: 6,
      title: 'Employee Expense Claim Form',
      titleAr: 'نموذج مطالبة نفقات الموظف',
      category: 'Templates & Forms',
      categoryAr: 'النماذج والقوالب',
      type: 'PDF',
      size: '89 KB',
      uploadedBy: 'Finance Department',
      uploadedByAr: 'إدارة المالية',
      uploadDate: '2025-11-18',
      views: 678,
      downloads: 456,
      tags: ['Finance', 'Form', 'Expenses'],
      tagsAr: ['مالية', 'نموذج', 'نفقات'],
      status: 'Published',
    },
    {
      id: 7,
      title: 'Cybersecurity Policy 2025',
      titleAr: 'سياسة الأمن السيبراني 2025',
      category: 'Information Security Hub',
      categoryAr: 'مركز أمن المعلومات',
      type: 'PDF',
      size: '1.2 MB',
      uploadedBy: 'IT Security',
      uploadedByAr: 'أمن تقنية المعلومات',
      uploadDate: '2025-11-26',
      views: 512,
      downloads: 267,
      tags: ['Security', 'Cybersecurity', 'Policy'],
      tagsAr: ['أمن', 'أمن سيبراني', 'سياسة'],
      status: 'Published',
    },
    {
      id: 8,
      title: 'Data Protection Guidelines',
      titleAr: 'إرشادات حماية البيانات',
      category: 'Information Security Hub',
      categoryAr: 'مركز أمن المعلومات',
      type: 'PDF',
      size: '956 KB',
      uploadedBy: 'IT Security',
      uploadedByAr: 'أمن تقنية المعلومات',
      uploadDate: '2025-11-21',
      views: 398,
      downloads: 189,
      tags: ['Data Protection', 'Privacy', 'Guidelines'],
      tagsAr: ['حماية البيانات', 'الخصوصية', 'إرشادات'],
      status: 'Published',
    },
  ];

  const popularTags = isArabic 
    ? ['التدقيق', 'سياسة', 'معايير', 'الامتثال', 'مخاطر', 'أمن المعلومات', 'الموارد البشرية', 'مالية', 'تقنية المعلومات', 'قانوني', 'تدريب', 'نماذج', 'حوكمة', 'إجراءات', 'إرشادات']
    : ['Audit', 'Policy', 'Standards', 'Compliance', 'Risk', 'Security', 'HR', 'Finance', 'IT', 'Legal', 'Training', 'Templates', 'Governance', 'Procedures', 'Guidelines'];

  const stats = [
    { label: t.statTotal, value: '1,345', icon: FileText, color: 'text-[#ec2227]' },
    { label: t.statViews, value: '23,456', icon: TrendingUp, color: 'text-[#7b282d]' },
    { label: t.statDownloads, value: '8,934', icon: Download, color: 'text-[#971b1e]' },
  ];

  // Filter documents based on search term and selected category
  const filteredDocuments = recentDocuments.filter((doc) => {
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.titleAr.includes(searchTerm) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.categoryAr.includes(searchTerm) ||
      (isArabic ? doc.uploadedByAr : doc.uploadedBy).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isArabic ? doc.tagsAr : doc.tags).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategoryFilter = 
      selectedCategoryFilter === 'All Documents' ||
      selectedCategoryFilter === 'جميع الوثائق' ||
      (isArabic ? doc.categoryAr : doc.category) === selectedCategoryFilter;

    return matchesSearch && matchesCategoryFilter;
  });

  // Handle category card click
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    // Scroll to documents section
    const documentsSection = document.getElementById('documents-list');
    if (documentsSection) {
      documentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle tag click
  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  // Clear category filter
  const clearCategoryFilter = () => {
    setSelectedCategoryFilter(null);
  };

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const currentDocuments = filteredDocuments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div 
      className="min-h-screen" 
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundColor: '#f8f9fa'
      }}
    >
      {/* Hero Banner */}
      <div className="px-20 pt-6 relative">
        <HeroBanner 
          title={{
            en: 'Documents Search Engine',
            ar: 'محرك البحث عن الوثائق'
          }}
          description={{
            en: 'Centralized repository of institutional knowledge and official documents',
            ar: 'مستودع مركزي للمعرفة المؤسسية والوثائق الرسمية'
          }}
        />
        
        {/* Stats Cards - Overlapping Banner */}
        <div className="absolute bottom-0 left-0 right-0 px-[160px] translate-y-1/2 pt-10 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-3xl mb-1">{stat.value}</h3>
                      <p className="text-gray-600 mb-0">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-20 pt-24 pb-8">
        {/* Search Bar */}
        <Card className="p-6 rounded-xl shadow-lg mb-8">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px] relative">
              <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`} />
              <Input
                type="search"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${isArabic ? 'pr-10' : 'pl-10'} h-12`}
              />
            </div>
            
            {/* Sector Filter */}
            <Select value={selectedSector} onValueChange={handleSectorChange}>
              <SelectTrigger className="w-full md:w-64 h-12 min-h-[48px]">
                <SelectValue placeholder={t.selectSector} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allSectors}</SelectItem>
                {sectors.map((sector) => (
                  <SelectItem key={sector.id} value={sector.id}>
                    {isArabic ? sector.nameAr : sector.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Department Filter - Only shown when a sector is selected */}
            {selectedSector !== 'all' && (
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full md:w-64 h-12 min-h-[48px]">
                  <SelectValue placeholder={t.selectDepartment} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allDepartments}</SelectItem>
                  {getDepartments().map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {isArabic ? dept.nameAr : dept.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            <Button className="bg-[#A94442] hover:bg-[#7b282d] h-12 px-8">
              <Filter className={`h-5 w-5 ${isArabic ? 'ml-2' : 'mr-2'}`} />
              {t.filters}
            </Button>
          </div>

          {/* Popular Tags */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">{t.popularTags}</p>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-[#A94442] hover:text-white hover:border-[#A94442] transition-colors"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Main Layout with Sidebar */}
        <div className="flex gap-6">
          {/* Left Sidebar - Document Categories */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <Card className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 sticky top-[140px]">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-3 px-2">{t.documentCategories}</p>
              <nav className="space-y-1">
                {documentCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategoryFilter === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors ${
                        isSelected
                          ? 'bg-[#971b1e] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4" />
                        <span className="text-xs">{cat.name}</span>
                      </div>
                      <Badge variant="secondary" className={`text-xs ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-200'}`}>
                        {cat.count}
                      </Badge>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Recent & Popular Documents */}
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="mb-0">{t.documents}</h2>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm">
                    <FolderOpen className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                    {t.myDocuments}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                    {t.recentlyViewed}
                  </Button>
                </div>
              </div>

              <div className="space-y-4" id="documents-list">
                {currentDocuments.map((doc) => (
                  <Card key={doc.id} className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between gap-6 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="h-6 w-6 text-[#ec2227]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2 gap-3 flex-wrap">
                              <div className="flex-1 min-w-0">
                                <h5 className="mb-1">{isArabic ? doc.titleAr : doc.title}</h5>
                                <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                                  <Badge>{isArabic ? doc.categoryAr : doc.category}</Badge>
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {isArabic ? doc.uploadedByAr : doc.uploadedBy}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {doc.uploadDate}
                                  </span>
                                </div>
                              </div>
                              <Badge className="bg-green-500 flex-shrink-0">{t.published}</Badge>
                            </div>

                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              {(isArabic ? doc.tagsAr : doc.tags).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-600 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {doc.views} {t.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Download className="h-4 w-4" />
                                {doc.downloads} {t.downloads}
                              </span>
                              <span>{doc.type} • {doc.size}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-shrink-0 flex-wrap">
                        <Button variant="outline" size="sm">
                          <Eye className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                          {t.view}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                          {t.download}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Card className="p-4 rounded-xl shadow-sm bg-white my-6">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="flex items-center gap-2"
                    >
                      {isArabic ? (
                        <>
                          <span>{t.previous}</span>
                          <ChevronRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <ChevronLeft className="h-4 w-4" />
                          <span>{t.previous}</span>
                        </>
                      )}
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 p-0 ${
                            currentPage === page
                              ? 'bg-[#971b1e] hover:bg-[#7b282d] text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="flex items-center gap-2"
                    >
                      {isArabic ? (
                        <>
                          <ChevronLeft className="h-4 w-4" />
                          <span>{t.next}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.next}</span>
                          <ChevronRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600 mt-3">
                    {t.showing} {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredDocuments.length)} {t.of} {filteredDocuments.length} {t.documentsCount}
                  </div>
                </Card>
              )}
            </div>

            {/* Document Access & Tracking */}
            <Card className="p-6 rounded-xl shadow-lg">
              <h3 className="mb-6">{t.managementTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-[#A94442] rounded-lg flex items-center justify-center">
                      <Tag className="h-5 w-5 text-white" />
                    </div>
                    <h5 className="mb-0">{t.metadataTitle}</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">
                    {t.metadataDesc}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-[#A94442] rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <h5 className="mb-0">{t.accessTitle}</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">
                    {t.accessDesc}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-[#A94442] rounded-lg flex items-center justify-center">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    <h5 className="mb-0">{t.trackingTitle}</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">
                    {t.trackingDesc}
                  </p>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}