import { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown, Calendar, FileText, CheckCircle2, AlertCircle, Clock, Loader2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';

interface LegislationItem {
  id: number;
  titleEn: string;
  titleAr: string;
  referenceNumber: string;
  year: number;
  status: 'active' | 'draft' | 'repealed';
  category: string;
  categoryAr: string;
  authority: string;
  authorityAr: string;
  summaryEn: string;
  summaryAr: string;
}

interface LegislationSearchPageProps {
  onBack?: () => void;
}

export function LegislationSearchPage({ onBack }: LegislationSearchPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAuthority, setSelectedAuthority] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<LegislationItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Color palette
  const colors = {
    primary: '#0F2A44',
    accent: '#C9A24D',
    bgOffWhite: '#F7F8FA',
    bgWhite: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#5A5A5A',
    success: '#2F7D32',
    warning: '#C57C00',
    error: '#9B1C1C',
  };

  // Mock data
  const mockResults: LegislationItem[] = [
    {
      id: 1,
      titleEn: 'Federal Decree-Law No. 32 of 2021 on Commercial Companies',
      titleAr: 'المرسوم بقانون اتحادي رقم 32 لسنة 2021 في شأن الشركات التجارية',
      referenceNumber: 'FDL-32-2021',
      year: 2021,
      status: 'active',
      category: 'Federal Legislation',
      categoryAr: 'التشريعات الاتحادية',
      authority: 'UAE Federal Government',
      authorityAr: 'الحكومة الاتحادية لدولة الإمارات',
      summaryEn: 'Comprehensive law governing the establishment, operation, and dissolution of commercial companies in the UAE.',
      summaryAr: 'قانون شامل ينظم تأسيس وعمل وحل الشركات التجارية في دولة الإمارات.',
    },
    {
      id: 2,
      titleEn: 'Dubai Law No. 13 of 2022 Concerning the Protection of Personal Data',
      titleAr: 'قانون دبي رقم 13 لسنة 2022 بشأن حماية البيانات الشخصية',
      referenceNumber: 'DXB-13-2022',
      year: 2022,
      status: 'active',
      category: 'Local Legislation',
      categoryAr: 'التشريعات المحلية',
      authority: 'Government of Dubai',
      authorityAr: 'حكومة دبي',
      summaryEn: 'Establishes framework for processing and protecting personal data in Dubai.',
      summaryAr: 'يضع إطاراً لمعالجة وحماية البيانات الشخصية في دبي.',
    },
    {
      id: 3,
      titleEn: 'FAA Decision No. 8 of 2023 on Financial Audit Standards',
      titleAr: 'قرار الهيئة رقم 8 لسنة 2023 بشأن معايير التدقيق المالي',
      referenceNumber: 'FAA-08-2023',
      year: 2023,
      status: 'active',
      category: "FAA's Legislation",
      categoryAr: 'تشريعات الجهاز',
      authority: 'Financial Audit Authority',
      authorityAr: 'هيئة التدقيق المالي',
      summaryEn: 'Sets comprehensive standards for financial auditing practices and procedures.',
      summaryAr: 'يحدد معايير شاملة لممارسات وإجراءات التدقيق المالي.',
    },
    {
      id: 4,
      titleEn: 'Federal Law No. 7 of 2017 on Anti-Money Laundering',
      titleAr: 'قانون اتحادي رقم 7 لسنة 2017 في شأن مكافحة غسل الأموال',
      referenceNumber: 'FL-07-2017',
      year: 2017,
      status: 'draft',
      category: 'Federal Legislation',
      categoryAr: 'التشريعات الاتحادية',
      authority: 'UAE Federal Government',
      authorityAr: 'الحكومة الاتحادية لدولة الإمارات',
      summaryEn: 'Framework for preventing and combating money laundering activities.',
      summaryAr: 'إطار لمنع ومكافحة أنشطة غسل الأموال.',
    },
  ];

  const content = {
    en: {
      pageTitle: 'Search Legislation',
      searchPlaceholder: 'Search legislation by title, number, keyword, or year...',
      searchButton: 'Search',
      filterYear: 'Year',
      filterCategory: 'Category',
      filterStatus: 'Status',
      filterAuthority: 'Issuing Authority',
      moreFilters: 'More Filters',
      lessFilters: 'Less Filters',
      clearFilters: 'Clear All',
      allYears: 'All Years',
      allCategories: 'All Categories',
      allStatuses: 'All Statuses',
      allAuthorities: 'All Authorities',
      viewDetails: 'View Details',
      resultsFound: 'results found',
      noResults: 'No legislation found',
      noResultsDesc: 'Try adjusting your search or filters to find what you\'re looking for.',
      loading: 'Searching...',
      statusActive: 'Active',
      statusDraft: 'Draft',
      statusRepealed: 'Repealed',
    },
    ar: {
      pageTitle: 'البحث في التشريعات',
      searchPlaceholder: 'ابحث في التشريعات بالعنوان، الرقم، الكلمة المفتاحية، أو السنة...',
      searchButton: 'بحث',
      filterYear: 'السنة',
      filterCategory: 'الفئة',
      filterStatus: 'الحالة',
      filterAuthority: 'الجهة المصدرة',
      moreFilters: 'المزيد من الفلاتر',
      lessFilters: 'إخفاء الفلاتر',
      clearFilters: 'مسح الكل',
      allYears: 'جميع السنوات',
      allCategories: 'جميع الفئات',
      allStatuses: 'جميع الحالات',
      allAuthorities: 'جميع الجهات',
      viewDetails: 'عرض التفاصيل',
      resultsFound: 'نتيجة',
      noResults: 'لم يتم العثور على تشريعات',
      noResultsDesc: 'حاول تعديل البحث أو الفلاتر للعثور على ما تبحث عنه.',
      loading: 'جاري البحث...',
      statusActive: 'نافذ',
      statusDraft: 'مسودة',
      statusRepealed: 'ملغى',
    },
  };

  const t = content[language];

  // Filter options
  const years = ['2023', '2022', '2021', '2020', '2019', '2018', '2017'];
  const categories = [
    { en: 'Federal Legislation', ar: 'التشريعات الاتحادية' },
    { en: 'Local Legislation', ar: 'التشريعات المحلية' },
    { en: "Entity's Legislation", ar: 'تشريعات الجهة' },
    { en: "FAA's Legislation", ar: 'تشريعات الجهاز' },
  ];
  const statuses = [
    { value: 'active', labelEn: 'Active', labelAr: 'نافذ' },
    { value: 'draft', labelEn: 'Draft', labelAr: 'مسودة' },
    { value: 'repealed', labelEn: 'Repealed', labelAr: 'ملغى' },
  ];
  const authorities = [
    { en: 'UAE Federal Government', ar: 'الحكومة الاتحادية لدولة الإمارات' },
    { en: 'Government of Dubai', ar: 'حكومة دبي' },
    { en: 'Financial Audit Authority', ar: 'هيئة التدقيق المالي' },
  ];

  // Handle search
  const handleSearch = () => {
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      // Filter mock results based on search criteria
      let filtered = mockResults;
      
      if (searchQuery) {
        filtered = filtered.filter(item => 
          item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.titleAr.includes(searchQuery) ||
          item.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (selectedYear) {
        filtered = filtered.filter(item => item.year.toString() === selectedYear);
      }
      
      if (selectedCategory) {
        filtered = filtered.filter(item => 
          item.category === selectedCategory || item.categoryAr === selectedCategory
        );
      }
      
      if (selectedStatus) {
        filtered = filtered.filter(item => item.status === selectedStatus);
      }
      
      if (selectedAuthority) {
        filtered = filtered.filter(item => 
          item.authority === selectedAuthority || item.authorityAr === selectedAuthority
        );
      }
      
      setSearchResults(filtered);
      setIsLoading(false);
    }, 800);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedYear('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedAuthority('');
    setSearchResults([]);
    setHasSearched(false);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: colors.success, label: t.statusActive, icon: CheckCircle2 },
      draft: { color: colors.warning, label: t.statusDraft, icon: Clock },
      repealed: { color: colors.error, label: t.statusRepealed, icon: AlertCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <div 
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
        style={{ 
          backgroundColor: `${config.color}15`,
          color: config.color,
        }}
      >
        <Icon className="h-3.5 w-3.5" />
        <span 
          style={{ 
            fontFamily: 'Dubai, Arial, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {config.label}
        </span>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen pt-24"
      style={{ backgroundColor: colors.bgOffWhite }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1200px] mx-auto px-20 py-12">
        {/* Page Title */}
        <h1 
          className="mb-8"
          style={{
            fontFamily: 'Dubai, Arial, sans-serif',
            fontSize: '36px',
            fontWeight: 700,
            color: colors.textPrimary,
          }}
        >
          {t.pageTitle}
        </h1>

        {/* Search Section */}
        <div 
          className="rounded-2xl p-8 mb-8 shadow-lg"
          style={{ backgroundColor: colors.bgWhite }}
        >
          {/* Main Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search 
                className="absolute top-1/2 -translate-y-1/2 h-6 w-6"
                style={{ 
                  [isArabic ? 'right' : 'left']: '20px',
                  color: colors.textSecondary,
                }}
              />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full rounded-xl border-2 transition-all"
                style={{
                  [isArabic ? 'paddingRight' : 'paddingLeft']: '56px',
                  [isArabic ? 'paddingLeft' : 'paddingRight']: '20px',
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: '17px',
                  borderColor: '#E5E7EB',
                  outline: 'none',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              />
            </div>
            
            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-8 py-4 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: colors.primary,
                color: colors.bgWhite,
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '17px',
                fontWeight: 600,
                minWidth: '140px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(15, 42, 68, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t.searchButton}
            </button>
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Year Filter */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 appearance-none cursor-pointer transition-all"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: '15px',
                  color: selectedYear ? colors.textPrimary : colors.textSecondary,
                  borderColor: colors.primary,
                  backgroundColor: colors.bgWhite,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%230F2A44' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: isArabic ? 'left 12px center' : 'right 12px center',
                  [isArabic ? 'paddingLeft' : 'paddingRight']: '36px',
                }}
              >
                <option value="">{t.allYears}</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 appearance-none cursor-pointer transition-all"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: '15px',
                  color: selectedCategory ? colors.textPrimary : colors.textSecondary,
                  borderColor: colors.primary,
                  backgroundColor: colors.bgWhite,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%230F2A44' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: isArabic ? 'left 12px center' : 'right 12px center',
                  [isArabic ? 'paddingLeft' : 'paddingRight']: '36px',
                }}
              >
                <option value="">{t.allCategories}</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={isArabic ? cat.ar : cat.en}>
                    {isArabic ? cat.ar : cat.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 appearance-none cursor-pointer transition-all"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: '15px',
                  color: selectedStatus ? colors.textPrimary : colors.textSecondary,
                  borderColor: colors.primary,
                  backgroundColor: colors.bgWhite,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%230F2A44' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: isArabic ? 'left 12px center' : 'right 12px center',
                  [isArabic ? 'paddingLeft' : 'paddingRight']: '36px',
                }}
              >
                <option value="">{t.allStatuses}</option>
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {isArabic ? status.labelAr : status.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Authority Filter */}
            <div className="relative">
              <select
                value={selectedAuthority}
                onChange={(e) => setSelectedAuthority(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 appearance-none cursor-pointer transition-all"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: '15px',
                  color: selectedAuthority ? colors.textPrimary : colors.textSecondary,
                  borderColor: colors.primary,
                  backgroundColor: colors.bgWhite,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%230F2A44' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: isArabic ? 'left 12px center' : 'right 12px center',
                  [isArabic ? 'paddingLeft' : 'paddingRight']: '36px',
                }}
              >
                <option value="">{t.allAuthorities}</option>
                {authorities.map((auth, idx) => (
                  <option key={idx} value={isArabic ? auth.ar : auth.en}>
                    {isArabic ? auth.ar : auth.en}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery || selectedYear || selectedCategory || selectedStatus || selectedAuthority) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.textSecondary,
                  backgroundColor: `${colors.textSecondary}10`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.textSecondary}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.textSecondary}10`;
                }}
              >
                <X className="h-4 w-4" />
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center gap-3 py-12">
            <Loader2 className="h-6 w-6 animate-spin" style={{ color: colors.primary }} />
            <span
              style={{
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '17px',
                color: colors.textSecondary,
              }}
            >
              {t.loading}
            </span>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && hasSearched && searchResults.length > 0 && (
          <div className="mb-6">
            <p
              style={{
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '17px',
                color: colors.textSecondary,
              }}
            >
              <span style={{ fontWeight: 600, color: colors.textPrimary }}>
                {searchResults.length}
              </span>{' '}
              {t.resultsFound}
            </p>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && hasSearched && searchResults.length > 0 && (
          <div className="space-y-4">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="rounded-2xl p-6 transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: colors.bgWhite,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    {/* Title */}
                    <h3
                      className="mb-2"
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: '22px',
                        fontWeight: 700,
                        color: colors.textPrimary,
                        lineHeight: '1.4',
                      }}
                    >
                      {isArabic ? result.titleAr : result.titleEn}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" style={{ color: colors.textSecondary }} />
                        <span
                          style={{
                            fontFamily: 'Dubai, Arial, sans-serif',
                            fontSize: '14px',
                            color: colors.textSecondary,
                          }}
                        >
                          {result.referenceNumber}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" style={{ color: colors.textSecondary }} />
                        <span
                          style={{
                            fontFamily: 'Dubai, Arial, sans-serif',
                            fontSize: '14px',
                            color: colors.textSecondary,
                          }}
                        >
                          {result.year}
                        </span>
                      </div>

                      {getStatusBadge(result.status)}
                    </div>

                    {/* Summary */}
                    <p
                      className="mb-4"
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: '15px',
                        color: colors.textSecondary,
                        lineHeight: '1.6',
                      }}
                    >
                      {isArabic ? result.summaryAr : result.summaryEn}
                    </p>

                    {/* Category & Authority Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="px-3 py-1 rounded-full"
                        style={{
                          fontFamily: 'Dubai, Arial, sans-serif',
                          fontSize: '13px',
                          backgroundColor: `${colors.primary}10`,
                          color: colors.primary,
                        }}
                      >
                        {isArabic ? result.categoryAr : result.category}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full"
                        style={{
                          fontFamily: 'Dubai, Arial, sans-serif',
                          fontSize: '13px',
                          backgroundColor: `${colors.accent}15`,
                          color: colors.accent,
                        }}
                      >
                        {isArabic ? result.authorityAr : result.authority}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    className="px-6 py-3 rounded-xl transition-all duration-200 flex-shrink-0"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.bgWhite,
                      fontFamily: 'Dubai, Arial, sans-serif',
                      fontSize: '15px',
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1a3a5a';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {t.viewDetails}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && hasSearched && searchResults.length === 0 && (
          <div className="text-center py-20">
            <div 
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.textSecondary}10` }}
            >
              <Search className="h-12 w-12" style={{ color: colors.textSecondary }} />
            </div>
            <h3
              className="mb-2"
              style={{
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '24px',
                fontWeight: 700,
                color: colors.textPrimary,
              }}
            >
              {t.noResults}
            </h3>
            <p
              style={{
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '17px',
                color: colors.textSecondary,
              }}
            >
              {t.noResultsDesc}
            </p>
          </div>
        )}

        {/* Initial State - No Search Yet */}
        {!isLoading && !hasSearched && (
          <div className="text-center py-20">
            <div 
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}10` }}
            >
              <Search className="h-12 w-12" style={{ color: colors.primary }} />
            </div>
            <h3
              className="mb-2"
              style={{
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '24px',
                fontWeight: 700,
                color: colors.textPrimary,
              }}
            >
              {isArabic ? 'ابدأ البحث عن التشريعات' : 'Start Searching for Legislation'}
            </h3>
            <p
              style={{
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '17px',
                color: colors.textSecondary,
              }}
            >
              {isArabic 
                ? 'استخدم شريط البحث والفلاتر أعلاه للعثور على التشريعات'
                : 'Use the search bar and filters above to find legislation'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
