import React, { useState } from 'react';
import { ArrowLeft, Home, ChevronRight, Plus, Download, Filter, TrendingUp, MessageSquare, Calendar, Eye, ChevronDown, Grid, List, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { StatusBadge } from './legislation/StatusBadge';
import { LegalOpinionDetailView } from './legislation/LegalOpinionDetailView';

interface LegalOpinionsPageProps {
  onBack: () => void;
}

interface Opinion {
  id: number;
  department: string;
  titleEn: string;
  titleAr: string;
  enquiryEn: string;
  enquiryAr: string;
  date: string;
  status: 'new' | 'pending' | 'replied' | 'in-progress';
  replyEn?: string;
  replyAr?: string;
  replyDate?: string;
  replyBy?: string;
}

export function LegalOpinionsPage({ onBack }: LegalOpinionsPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  // Categories for different opinion types
  const categories = [
    { id: 0, name: isArabic ? 'الكل' : 'All', count: 156 },
    { id: 1, name: isArabic ? 'آراء قانونية عامة' : 'General Legal Opinions', count: 42 },
    { id: 2, name: isArabic ? 'استفسارات الجهات' : 'Entity Inquiries', count: 38 },
    { id: 3, name: isArabic ? 'تفسيرات تشريعية' : 'Legislative Interpretations', count: 51 },
    { id: 4, name: isArabic ? 'توجيهات قانونية' : 'Legal Guidance', count: 25 },
  ];

  // Mock data
  const mockOpinions: Opinion[] = [
    {
      id: 1,
      department: 'Roads and Transport Authority',
      titleEn: 'Application of Financial Controls in Public Contracts',
      titleAr: 'تطبيق الضوابط المالية في العقود الحكومية',
      enquiryEn: 'Request for clarification on the application of financial controls...',
      enquiryAr: 'طلب توضيح بشأن تطبيق الضوابط المالية...',
      date: '2024',
      status: 'replied',
      replyEn: 'In accordance with Federal Law No. (3) of 2016...',
      replyAr: 'وفقاً للقانون الاتحادي رقم (3) لسنة 2016...',
      replyDate: 'March 15, 2024',
      replyBy: 'Legal Affairs Department',
    },
    {
      id: 2,
      department: 'Health Authority',
      titleEn: 'Budget Transfer Procedures and Audit Requirements',
      titleAr: 'إجراءات نقل الميزانية ومتطلبات التدقيق',
      enquiryEn: 'Inquiry about procedures for inter-departmental budget transfers...',
      enquiryAr: 'استفسار عن إجراءات نقل الميزانية بين الإدارات...',
      date: '2024',
      status: 'pending',
    },
    {
      id: 3,
      department: 'Department of Finance',
      titleEn: 'Compliance with International Auditing Standards',
      titleAr: 'الامتثال لمعايير التدقيق الدولية',
      enquiryEn: 'Guidance on implementing international auditing standards...',
      enquiryAr: 'توجيهات بشأن تطبيق معايير التدقيق الدولية...',
      date: '2023',
      status: 'replied',
    },
  ];

  // Generate mock data
  const allOpinions = Array.from({ length: categories[selectedCategory].count }, (_, i) => ({
    ...mockOpinions[i % mockOpinions.length],
    id: i + 1,
  }));

  // Filter data
  const filteredOpinions = allOpinions.filter((opinion) => {
    const matchesSearch =
      !searchQuery ||
      (isArabic ? opinion.titleAr : opinion.titleEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
      opinion.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !selectedStatus || opinion.status === selectedStatus;
    const matchesYear = !selectedYear || opinion.date === selectedYear;

    return matchesSearch && matchesStatus && matchesYear;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOpinions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOpinions = filteredOpinions.slice(startIndex, startIndex + itemsPerPage);

  // Calculate metrics (using filteredOpinions for current filter context)
  const newCount = filteredOpinions.filter(op => op.status === 'new').length;
  const pendingCount = filteredOpinions.filter(op => op.status === 'pending').length;
  const repliedCount = filteredOpinions.filter(op => op.status === 'replied').length;

  // Content
  const content = {
    en: {
      breadcrumbHome: 'Home',
      breadcrumbLegal: 'Legal Opinions',
      back: 'Back to Home',
      searchPlaceholder: 'Search by title or department...',
      filter: 'Filter',
      showFilters: 'Show Filters',
      hideFilters: 'Hide Filters',
      addNew: 'Submit New Inquiry',
      export: 'Export',
      totalOpinions: 'Total Opinions',
      newOpinions: 'New',
      pendingOpinions: 'Pending',
      repliedOpinions: 'Replied',
      lastUpdated: 'Last Updated',
      status: 'Status',
      year: 'Year',
      all: 'All',
      new: 'New',
      pending: 'Pending',
      replied: 'Replied',
      inProgress: 'In Progress',
      view: 'View',
      download: 'Download',
      viewMode: 'View Mode',
      grid: 'Grid',
      list: 'List',
      resultsCount: 'results',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      pageTitle: 'FAA Legal Opinions',
      pageDescription: 'Access legal opinions, interpretations, and guidance issued by the Financial Audit Authority',
    },
    ar: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbLegal: 'الآراء القانونية',
      back: 'العودة إلى الرئيسية',
      searchPlaceholder: 'البحث بالعنوان أو الجهة...',
      filter: 'تصفية',
      showFilters: 'إظهار الفلاتر',
      hideFilters: 'إخفاء الفلاتر',
      addNew: 'تقديم استفسار جديد',
      export: 'تصدير',
      totalOpinions: 'إجمالي الآراء',
      newOpinions: 'جديدة',
      pendingOpinions: 'قيد الانتظار',
      repliedOpinions: 'تم الرد',
      lastUpdated: 'آخر تحديث',
      status: 'الحالة',
      year: 'السنة',
      all: 'الكل',
      new: 'جديد',
      pending: 'قيد الانتظار',
      replied: 'تم الرد',
      inProgress: 'قيد المعالجة',
      view: 'عرض',
      download: 'تنزيل',
      viewMode: 'وضع العرض',
      grid: 'شبكة',
      list: 'قائمة',
      resultsCount: 'نتيجة',
      showing: 'عرض',
      to: 'إلى',
      of: 'من',
      pageTitle: 'الآراء القانونية للجهاز',
      pageDescription: 'الوصول إلى الآراء القانونية والتفسيرات والتوجيهات الصادرة عن جهاز التدقيق المالي',
    },
  };

  const t = content[language];

  // If opinion is selected, show detail view
  if (selectedOpinion) {
    return (
      <LegalOpinionDetailView
        opinion={selectedOpinion}
        onBack={() => setSelectedOpinion(null)}
        language={language}
      />
    );
  }

  return (
    <div
      className="min-h-screen"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        fontFamily: isArabic ? 'var(--font-family-ar)' : 'var(--font-family-en)',
      }}
    >
      {/* Header Section - Colorful Banner */}
      <div
        className="border-b relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #A94442 0%, #8B3635 50%, #6D2A28 100%)',
          borderColor: 'var(--color-border-light)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Decorative Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
            <Home size={16} className="text-white opacity-80" />
            <ChevronRight size={16} className={`text-white opacity-60 ${isArabic ? 'rotate-180' : ''}`} />
            <span
              className="text-white"
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              {t.breadcrumbLegal}
            </span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1
                className="text-white mb-3"
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  lineHeight: 'var(--line-height-tight)',
                }}
              >
                {t.pageTitle}
              </h1>
              <p
                className="text-white opacity-90 mb-4"
                style={{
                  fontSize: 'var(--font-size-base)',
                  lineHeight: 'var(--line-height-relaxed)',
                }}
              >
                {t.pageDescription}
              </p>
              <div className="flex items-center gap-2 text-white opacity-80" style={{ fontSize: 'var(--font-size-sm)' }}>
                <Calendar size={16} />
                <span>{t.lastUpdated}: {new Date().toLocaleDateString(isArabic ? 'ar-AE' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onBack}
                className="h-11 px-6 bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-opacity-30"
                style={{ fontSize: 'var(--font-size-sm)' }}
              >
                <ArrowLeft size={18} className={`${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {t.back}
              </Button>
              <Button
                variant="outline"
                className="h-11 px-6 bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-opacity-30"
                style={{ fontSize: 'var(--font-size-sm)' }}
              >
                <Download size={18} className={isArabic ? 'ml-2' : 'mr-2'} />
                {t.export}
              </Button>
              <Button
                className="h-11 px-6 bg-white text-[#A94442] hover:bg-opacity-90"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                <Plus size={18} className={isArabic ? 'ml-2' : 'mr-2'} />
                {t.addNew}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Vertical Categories */}
          {categories.length > 1 && (
            <aside
              className="w-64 flex-shrink-0 hidden lg:block"
              style={{
                position: 'sticky',
                top: '24px',
                alignSelf: 'flex-start',
              }}
            >
              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-light)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h3
                  className="text-gray-900 mb-4 pb-3 border-b"
                  style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    borderColor: 'var(--color-border-light)',
                  }}
                >
                  {isArabic ? 'الفئات' : 'Categories'}
                </h3>
                <nav className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: selectedCategory === cat.id ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                        backgroundColor: selectedCategory === cat.id ? 'var(--color-faa-burgundy)' : 'transparent',
                      }}
                    >
                      <span>{cat.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          selectedCategory === cat.id ? 'bg-white bg-opacity-20 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {cat.count.toLocaleString(isArabic ? 'ar-AE' : 'en-US')}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            {/* Search & Filter Bar */}
            <div
              className="rounded-xl border mb-6"
              style={{
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="w-full h-12 px-5 pr-12 rounded-xl border-2 focus:outline-none focus:border-[var(--color-faa-burgundy)] transition-colors"
                        style={{
                          borderColor: 'var(--color-border-medium)',
                          fontSize: 'var(--font-size-base)',
                          fontFamily: isArabic ? 'var(--font-family-ar)' : 'var(--font-family-en)',
                        }}
                      />
                      <MessageSquare
                        size={20}
                        className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                        style={{ [isArabic ? 'left' : 'right']: '16px' }}
                      />
                    </div>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`h-12 px-4 rounded-lg transition-colors ${
                        viewMode === 'list' ? 'bg-gray-200 text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      aria-label={t.list}
                    >
                      <List size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`h-12 px-4 rounded-lg transition-colors ${
                        viewMode === 'grid' ? 'bg-gray-200 text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      aria-label={t.grid}
                    >
                      <Grid size={20} />
                    </button>
                  </div>

                  {/* Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 px-6"
                    style={{ fontSize: 'var(--font-size-sm)' }}
                  >
                    <Filter size={18} className={isArabic ? 'ml-2' : 'mr-2'} />
                    {showFilters ? t.hideFilters : t.showFilters}
                    <ChevronDown size={18} className={`${isArabic ? 'mr-2' : 'ml-2'} transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </Button>
                </div>

                {/* Collapsible Filters */}
                {showFilters && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50">
                    <div>
                      <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        {t.status}
                      </label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg border-2 bg-white focus:outline-none focus:border-[var(--color-faa-burgundy)]"
                        style={{ borderColor: 'var(--color-border-medium)', fontSize: 'var(--font-size-sm)' }}
                      >
                        <option value="">{t.all}</option>
                        <option value="new">{t.new} ({newCount})</option>
                        <option value="pending">{t.pending} ({pendingCount})</option>
                        <option value="replied">{t.replied} ({repliedCount})</option>
                        <option value="in-progress">{t.inProgress}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        {t.year}
                      </label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg border-2 bg-white focus:outline-none focus:border-[var(--color-faa-burgundy)]"
                        style={{ borderColor: 'var(--color-border-medium)', fontSize: 'var(--font-size-sm)' }}
                      >
                        <option value="">{t.all}</option>
                        {Array.from(new Set(allOpinions.map(op => op.date))).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}\n                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="mb-6">
              <p className="text-gray-600" style={{ fontSize: 'var(--font-size-sm)' }}>
                {t.showing} <span className="font-semibold">{startIndex + 1}</span> {t.to} <span className="font-semibold">{Math.min(startIndex + itemsPerPage, filteredOpinions.length)}</span> {t.of} <span className="font-semibold">{filteredOpinions.length.toLocaleString(isArabic ? 'ar-AE' : 'en-US')}</span> {t.resultsCount}
              </p>
            </div>

            {/* Opinion Cards/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedOpinions.map((opinion) => (
                  <OpinionCard
                    key={opinion.id}
                    opinion={opinion}
                    onClick={() => setSelectedOpinion(opinion)}
                    isArabic={isArabic}
                    t={t}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedOpinions.map((opinion) => (
                  <OpinionListItem
                    key={opinion.id}
                    opinion={opinion}
                    onClick={() => setSelectedOpinion(opinion)}
                    isArabic={isArabic}
                    t={t}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{
                      backgroundColor: currentPage === page ? 'var(--color-faa-burgundy)' : undefined,
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {page.toLocaleString(isArabic ? 'ar-AE' : 'en-US')}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ icon, label, value, color, isArabic }: any) {
  return (
    <div
      className="p-5 rounded-xl border"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderColor: 'var(--color-border-light)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-gray-600 mb-1" style={{ fontSize: 'var(--font-size-sm)' }}>
            {label}
          </p>
          <p
            className="text-gray-900"
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {value.toLocaleString(isArabic ? 'ar-AE' : 'en-US')}
          </p>
        </div>
      </div>
    </div>
  );
}

// Opinion Card Component (Grid View)
function OpinionCard({ opinion, onClick, isArabic, t }: any) {
  const statusConfig: Record<string, { color: string; label: string }> = {
    new: { color: 'var(--color-status-warning)', label: isArabic ? 'جديد' : 'New' },
    pending: { color: 'var(--color-status-info)', label: isArabic ? 'قيد الانتظار' : 'Pending' },
    replied: { color: 'var(--color-status-success)', label: isArabic ? 'تم الرد' : 'Replied' },
    'in-progress': { color: 'var(--color-category-gold)', label: isArabic ? 'قيد المعالجة' : 'In Progress' },
  };

  const status = statusConfig[opinion.status];

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      className="group cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-inset rounded-xl"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderColor: 'var(--color-border-light)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        borderInlineStart: '3px solid transparent',
        minHeight: '200px',
        padding: '24px',
        border: '1px solid var(--color-border-light)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#F8F9FA';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.borderInlineStartColor = '#8B272D';
        e.currentTarget.style.minHeight = '210px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg-primary)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderInlineStartColor = 'transparent';
        e.currentTarget.style.minHeight = '200px';
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
          style={{ backgroundColor: 'var(--color-gray-100)' }}
        >
          <MessageSquare size={24} style={{ color: 'var(--color-faa-burgundy)' }} />
        </div>
        <span
          className="px-3 py-1.5 rounded-full text-xs"
          style={{
            backgroundColor: `${status.color}15`,
            color: status.color,
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {status.label}
        </span>
      </div>

      <h3
        className="text-gray-900 mb-2 line-clamp-2"
        style={{
          fontSize: 'var(--font-size-base)',
          fontWeight: 'var(--font-weight-semibold)',
          lineHeight: 'var(--line-height-snug)',
        }}
      >
        {isArabic ? opinion.titleAr : opinion.titleEn}
      </h3>

      <p className="text-gray-600 mb-4 line-clamp-2" style={{ fontSize: 'var(--font-size-sm)' }}>
        {opinion.department}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-gray-500" style={{ fontSize: 'var(--font-size-xs)' }}>
          {opinion.date}
        </span>
        <button
          className="text-sm text-[var(--color-faa-burgundy)] hover:underline flex items-center gap-1"
          style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
        >
          {t.view}
          <Eye size={14} />
        </button>
      </div>
    </div>
  );
}

// Opinion List Item Component (List View)
function OpinionListItem({ opinion, onClick, isArabic, t }: any) {
  const statusConfig: Record<string, { color: string; label: string }> = {
    new: { color: 'var(--color-status-warning)', label: isArabic ? 'جديد' : 'New' },
    pending: { color: 'var(--color-status-info)', label: isArabic ? 'قيد الانتظار' : 'Pending' },
    replied: { color: 'var(--color-status-success)', label: isArabic ? 'تم الرد' : 'Replied' },
    'in-progress': { color: 'var(--color-category-gold)', label: isArabic ? 'قيد المعالجة' : 'In Progress' },
  };

  const status = statusConfig[opinion.status];

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      className="group cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-inset rounded-xl"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderColor: 'var(--color-border-light)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        borderInlineStart: '3px solid transparent',
        minHeight: '96px',
        padding: '24px',
        border: '1px solid var(--color-border-light)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#F8F9FA';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.borderInlineStartColor = '#8B272D';
        e.currentTarget.style.minHeight = '104px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg-primary)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderInlineStartColor = 'transparent';
        e.currentTarget.style.minHeight = '96px';
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-center gap-6">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--color-gray-100)' }}
        >
          <MessageSquare size={28} style={{ color: 'var(--color-faa-burgundy)' }} />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="text-gray-900 mb-2"
            style={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {isArabic ? opinion.titleAr : opinion.titleEn}
          </h3>
          <div className="flex items-center gap-4 text-gray-600" style={{ fontSize: 'var(--font-size-sm)' }}>
            <span>{opinion.department}</span>
            <span>•</span>
            <span>{opinion.date}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span
            className="px-4 py-2 rounded-full text-sm"
            style={{
              backgroundColor: `${status.color}15`,
              color: status.color,
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            {status.label}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-4"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Eye size={18} className={isArabic ? 'ml-2' : 'mr-2'} />
            {t.view}
          </Button>
        </div>
      </div>
    </div>
  );
}