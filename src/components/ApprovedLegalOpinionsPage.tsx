import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Search, Eye, Calendar, Building2, CheckCircle2, ArrowUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ApprovedLegalOpinionsPageProps {
  onBack: () => void;
  onOpinionSelect?: (opinion: ApprovedOpinion) => void;
  fontSizeMultiplier?: number;
}

interface ApprovedOpinion {
  id: number;
  department: string;
  titleEn: string;
  titleAr: string;
  enquiryEn: string;
  enquiryAr: string;
  date: string;
  approvedReplyEn: string;
  approvedReplyAr: string;
  approvedDate: string;
  approvedBy: string;
}

export function ApprovedLegalOpinionsPage({ 
  onBack, 
  onOpinionSelect,
  fontSizeMultiplier = 1
}: ApprovedLegalOpinionsPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Legislation theme colors
  const legislationColors = {
    primary: '#2F4F6F',
    accent: '#C9A24D',
    bgOffWhite: '#F7F8FA',
  };

  const content = {
    en: {
      pageTitle: 'Approved Legal Opinions',
      back: 'Back',
      search: 'Search approved opinions...',
      searchLabel: 'Search',
      department: 'Department',
      allDepartments: 'All Departments',
      results: 'Results',
      viewDetails: 'View Details',
      approvedOn: 'Approved on',
      noResults: 'No approved opinions found',
      tryAdjusting: 'Try adjusting your search criteria',
    },
    ar: {
      pageTitle: 'الآراء القانونية المعتمدة',
      back: 'رجوع',
      search: 'ابحث في الآراء المعتمدة...',
      searchLabel: 'بحث',
      department: 'الجهة',
      allDepartments: 'كل الجهات',
      results: 'نتيجة',
      viewDetails: 'عرض التفاصيل',
      approvedOn: 'معتمد بتاريخ',
      noResults: 'لا توجد آراء قانونية معتمدة',
      tryAdjusting: 'حاول تعديل معايير البحث',
    },
  };

  const t = content[language];

  // Entities list
  const entities = [
    { id: 'rta', nameAr: 'هيئة الطرق والمواصلات', nameEn: 'Roads and Transport Authority' },
    { id: 'dha', nameAr: 'هيئة الصحة', nameEn: 'Health Authority' },
    { id: 'dewa', nameAr: 'هيئة كهرباء ومياه دبي', nameEn: 'Dubai Electricity and Water Authority' },
    { id: 'dld', nameAr: 'دائرة الأراضي والأملاك', nameEn: 'Dubai Land Department' },
    { id: 'ded', nameAr: 'دائرة التنمية الاقتصادية', nameEn: 'Department of Economic Development' },
  ];

  // Mock approved opinions data
  const approvedOpinions: ApprovedOpinion[] = [
    {
      id: 1,
      department: 'rta',
      titleEn: 'Procurement regulations for emergency purchases',
      titleAr: 'لائحة المشتريات للحالات الطارئة',
      enquiryEn: 'We request clarification on the legal procedures for emergency purchases exceeding the allowable limit in the financial regulations.',
      enquiryAr: 'نرجو من الجهاز توضيح الإجراءات القانونية المتبعة في حالة المشتريات الطارئة التي تتجاوز الحد المسموح به في اللائحة المالية.',
      date: '2024-01-15',
      approvedReplyEn: 'According to Article (12) of the Financial Regulations, prior approval from the competent authority must be obtained for emergency purchases exceeding the allowable limit. The entity must submit a detailed justification report explaining the urgency and necessity of the purchase, along with supporting documents. The approval process should be completed within 48 hours for genuine emergency cases.',
      approvedReplyAr: 'بناءً على المادة (12) من اللائحة المالية، يجب الحصول على موافقة مسبقة من الجهة المختصة في حالة المشتريات الطارئة التي تتجاوز الحد المسموح به. يجب على الجهة تقديم تقرير تبرير مفصل يشرح الحالة الطارئة وضرورة الشراء، مع المستندات الداعمة. يجب إكمال عملية الموافقة في غضون 48 ساعة للحالات الطارئة الحقيقية.',
      approvedDate: '2024-02-10',
      approvedBy: 'Ahmed Al Shamsi - Senior Legal Advisor',
    },
    {
      id: 2,
      department: 'dha',
      titleEn: 'IFRS 16 implementation for operating leases',
      titleAr: 'تطبيق معيار IFRS 16 على عقود الإيجار التشغيلية',
      enquiryEn: 'Is it mandatory for the Authority to apply IFRS 16 to operating lease contracts?',
      enquiryAr: 'هل يتوجب على الهيئة تطبيق معيار IFRS 16 على عقود الإيجار التشغيلية؟',
      date: '2024-01-22',
      approvedReplyEn: 'Yes, according to Cabinet Resolution No. (23) of 2023 regarding the adoption of international accounting standards, all government entities must apply IFRS 16 to their operating lease contracts starting from the fiscal year 2024. This includes recognition of lease assets and liabilities on the balance sheet, regardless of the lease classification.',
      approvedReplyAr: 'نعم، وفقاً لقرار مجلس الوزراء رقم (23) لسنة 2023 بشأن اعتماد المعايير المحاسبية الدولية، يجب على جميع الجهات الحكومية تطبيق معيار IFRS 16 على عقود الإيجار التشغيلية اعتباراً من السنة المالية 2024. ويشمل ذلك إثبات أصول والتزامات الإيجار في الميزانية العمومية، بغض النظر عن تصنيف عقد الإيجار.',
      approvedDate: '2024-02-15',
      approvedBy: 'Fatima Al Marzouqi - Legal Advisor',
    },
    {
      id: 3,
      department: 'dewa',
      titleEn: 'Fund transfers between capital projects',
      titleAr: 'تحويل الأموال بين المشاريع الرأسمالية',
      enquiryEn: 'What are the legal requirements for transferring funds between different capital projects?',
      enquiryAr: 'ما هي المتطلبات القانونية لتحويل الأموال بين المشاريع الرأسمالية المختلفة؟',
      date: '2024-01-25',
      approvedReplyEn: 'Based on Financial Circular No. (7) of 2022, fund transfers between capital projects require written approval from the Department of Finance. The requesting entity must submit a formal request including project details, transfer justification, and budget impact analysis. Transfers exceeding AED 5 million require additional approval from the Executive Council.',
      approvedReplyAr: 'بناءً على التعميم المالي رقم (7) لسنة 2022، يتطلب تحويل الأموال بين المشاريع الرأسمالية موافقة خطية من دائرة المالية. يجب على الجهة الطالبة تقديم طلب رسمي يتضمن تفاصيل المشروع، ومبررات التحويل، وتحليل الأثر على الميزانية. التحويلات التي تتجاوز 5 ملايين درهم تتطلب موافقة إضافية من المجلس التنفيذي.',
      approvedDate: '2024-02-20',
      approvedBy: 'Mohammed Al Hashimi - Chief Legal Counsel',
    },
    {
      id: 4,
      department: 'dld',
      titleEn: 'Disbursement controls before contract finalization',
      titleAr: 'ضوابط الصرف قبل إتمام إجراءات التعاقد',
      enquiryEn: 'We would like to enquire about the legal controls for disbursement on projects before finalizing award procedures.',
      enquiryAr: 'نود الاستفسار عن الضوابط القانونية للصرف على المشاريع قبل إتمام إجراءات الترسية النهائية.',
      date: '2024-01-28',
      approvedReplyEn: 'Disbursement on any project is strictly prohibited before completing final award procedures and contract signing as per Article (25) of the Financial Regulations. Any violation may result in personal liability for the authorizing officer. In exceptional emergency cases, temporary advance payments may be approved by the Director General with proper justification and guarantees.',
      approvedReplyAr: 'يُمنع منعاً باتاً الصرف على أي مشروع قبل إتمام إجراءات الترسية النهائية والتوقيع على العقد وفقاً للمادة (25) من اللائحة المالية. أي مخالفة قد تؤدي إلى مسؤولية شخصية للموظف المخول. في حالات الطوارئ الاستثنائية، يمكن الموافقة على دفعات مقدمة مؤقتة من قبل المدير العام مع التبرير والضمانات المناسبة.',
      approvedDate: '2024-02-25',
      approvedBy: 'Sara Al Nuaimi - Legal Consultant',
    },
    {
      id: 5,
      department: 'ded',
      titleEn: 'Annual financial statement audit requirements',
      titleAr: 'متطلبات تدقيق القوائم المالية السنوية',
      enquiryEn: 'What are the mandatory requirements for external audit of annual financial statements?',
      enquiryAr: 'ما هي المتطلبات الإلزامية للتدقيق الخارجي للقوائم المالية السنوية؟',
      date: '2024-02-01',
      approvedReplyEn: 'According to Law No. (8) of 2011 and its amendments, all government entities must have their annual financial statements audited by the State Audit Institution. The audit must be completed within 90 days from the fiscal year end. Entities must provide all requested documents and ensure full cooperation with the audit team throughout the process.',
      approvedReplyAr: 'وفقاً للقانون رقم (8) لسنة 2011 وتعديلاته، يجب على جميع الجهات الحكومية تدقيق قوائمها المالية السنوية من قبل ديوان المحاسبة. يجب إنجاز التدقيق خلال 90 يوماً من نهاية السنة المالية. يجب على الجهات تقديم جميع المستندات المطلوبة وضمان التعاون الكامل مع فريق التدقيق طوال العملية.',
      approvedDate: '2024-03-01',
      approvedBy: 'Khalid Al Mansouri - Director of Legal Affairs',
    },
  ];

  const getDepartmentName = (deptId: string) => {
    const dept = entities.find(e => e.id === deptId);
    return dept ? (isArabic ? dept.nameAr : dept.nameEn) : deptId;
  };

  // Filter opinions
  const filteredOpinions = approvedOpinions.filter(opinion => {
    const matchesSearch = searchQuery === '' || 
      (isArabic ? opinion.titleAr : opinion.titleEn).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === '' || opinion.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: legislationColors.bgOffWhite }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Fixed Header */}
      <div 
        className="fixed top-[143px] left-0 right-0 z-30 border-b shadow-sm"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center gap-4 mb-0">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 h-9 px-3 -ml-3 rounded-lg transition-all"
              style={{ 
                fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                fontSize: `${15 * fontSizeMultiplier}px`,
                fontWeight: 600
              }}
            >
              <ArrowLeft className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              {t.back}
            </button>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            <h6 
              className="text-slate-900"
              style={{ 
                fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                fontSize: `${18 * fontSizeMultiplier}px`,
                fontWeight: 600,
                lineHeight: '1.5'
              }}
            >
              {t.pageTitle}
            </h6>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-[255px] pb-20">
        <div className="max-w-[1600px] mx-auto px-8">
          {/* Search and Filters */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label 
                  className="block mb-2 uppercase tracking-wide"
                  style={{ 
                    fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontSize: `${15 * fontSizeMultiplier}px`, 
                    fontWeight: 700,
                    color: '#64748B',
                    letterSpacing: '0.5px'
                  }}
                >
                  {t.searchLabel}
                </label>
                <div className="relative">
                  <Search
                    className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                    style={{
                      [isArabic ? 'right' : 'left']: '12px',
                      width: '20px',
                      height: '20px',
                    }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.search}
                    className="w-full h-[56px] rounded-lg border border-gray-300 outline-none focus:border-[#2F4F6F] transition-colors"
                    style={{
                      paddingLeft: isArabic ? '16px' : '44px',
                      paddingRight: isArabic ? '44px' : '16px',
                      fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                      fontSize: `${16 * fontSizeMultiplier}px`,
                      textAlign: isArabic ? 'right' : 'left',
                    }}
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div>
                <label 
                  className="block mb-2 uppercase tracking-wide"
                  style={{ 
                    fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontSize: `${15 * fontSizeMultiplier}px`, 
                    fontWeight: 700,
                    color: '#64748B',
                    letterSpacing: '0.5px'
                  }}
                >
                  {t.department}
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full h-[56px] rounded-lg border border-gray-300 outline-none focus:border-[#2F4F6F] transition-colors"
                  style={{
                    paddingLeft: isArabic ? '16px' : '16px',
                    paddingRight: isArabic ? '16px' : '16px',
                    fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontSize: `${16 * fontSizeMultiplier}px`,
                    textAlign: isArabic ? 'right' : 'left',
                  }}
                >
                  <option value="">{t.allDepartments}</option>
                  {entities.map(entity => (
                    <option key={entity.id} value={entity.id}>
                      {isArabic ? entity.nameAr : entity.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div 
            className="mb-4"
            style={{
              fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
              fontSize: `${16 * fontSizeMultiplier}px`,
              fontWeight: 600,
              color: legislationColors.primary,
            }}
          >
            {filteredOpinions.length} {t.results}
          </div>

          {/* Opinions List */}
          {filteredOpinions.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <CheckCircle2 className="mx-auto mb-4 text-gray-300" style={{ width: '64px', height: '64px' }} />
              <h3 
                className="mb-2"
                style={{
                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                  fontSize: `${20 * fontSizeMultiplier}px`,
                  fontWeight: 600,
                  color: '#64748B',
                }}
              >
                {t.noResults}
              </h3>
              <p
                style={{
                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                  fontSize: `${15 * fontSizeMultiplier}px`,
                  color: '#94A3B8',
                }}
              >
                {t.tryAdjusting}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOpinions.map((opinion) => (
                <div
                  key={opinion.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
                  style={{
                    borderInlineStart: '4px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderInlineStartColor = legislationColors.accent;
                    e.currentTarget.style.backgroundColor = `${legislationColors.primary}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderInlineStartColor = 'transparent';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                  onClick={() => onOpinionSelect?.(opinion)}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Section - Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        {/* Title */}
                        <h3
                          className="text-slate-900 leading-snug flex-1"
                          style={{
                            fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                            fontSize: `${19 * fontSizeMultiplier}px`,
                            fontWeight: 700,
                            lineHeight: '1.4'
                          }}
                        >
                          {isArabic ? opinion.titleAr : opinion.titleEn}
                        </h3>
                        
                        {/* Approved Badge */}
                        <div
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: '#DCFCE7',
                            border: '1px solid #86EFAC',
                          }}
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span
                            style={{
                              fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                              fontSize: `${14 * fontSizeMultiplier}px`,
                              fontWeight: 600,
                              color: '#16A34A',
                            }}
                          >
                            {isArabic ? 'معتمد' : 'Approved'}
                          </span>
                        </div>
                      </div>

                      {/* Metadata Row */}
                      <div className="flex items-center gap-6 flex-wrap">
                        {/* Department */}
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-slate-400" />
                          <span
                            className="text-slate-600"
                            style={{
                              fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                              fontSize: `${16 * fontSizeMultiplier}px`,
                              fontWeight: 400
                            }}
                          >
                            {getDepartmentName(opinion.department)}
                          </span>
                        </div>

                        {/* Approved Date */}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span
                            className="text-slate-600"
                            style={{
                              fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                              fontSize: `${16 * fontSizeMultiplier}px`,
                              fontWeight: 400
                            }}
                          >
                            {t.approvedOn} {opinion.approvedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Action Button */}
                    <div className="flex-shrink-0">
                      <button
                        className="h-11 px-6 rounded-lg text-white flex items-center gap-2 transition-all duration-200"
                        style={{
                          backgroundColor: legislationColors.primary,
                          fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                          fontSize: `${16 * fontSizeMultiplier}px`,
                          fontWeight: 500,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpinionSelect) {
                            onOpinionSelect(opinion);
                          }
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#253D54';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 79, 111, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = legislationColors.primary;
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        {t.viewDetails}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            backgroundColor: legislationColors.accent,
            color: '#FFFFFF',
            padding: '16px 24px',
          }}
          aria-label={isArabic ? 'العودة إلى الأعلى' : 'Return to top'}
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:translate-y-[-4px]" />
          <span
            style={{
              fontFamily: 'Dubai, Arial, sans-serif',
              fontSize: `${15 * fontSizeMultiplier}px`,
              fontWeight: 600,
            }}
          >
            {isArabic ? 'العودة للأعلى' : 'Return to Top'}
          </span>
        </button>
      )}
    </div>
  );
}