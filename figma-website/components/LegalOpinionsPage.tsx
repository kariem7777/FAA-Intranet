import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Eye, Plus, ChevronDown, X, Calendar, Building2, MessageSquare, Send, CheckCircle2, Clock, AlertCircle, Home, ChevronRight as BreadcrumbArrow, Download, Menu, UserCog, User, FileQuestion, Settings, XCircle, ArrowUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

interface LegalOpinionsPageProps {
  onBack: () => void;
  userRole?: 'admin' | 'user';
  userDepartment?: string;
  onOpinionSelect?: (opinion: Opinion) => void;
  fontSizeMultiplier?: number;
}

interface Opinion {
  id: number;
  department: string;
  titleEn: string;
  titleAr: string;
  enquiryEn: string;
  enquiryAr: string;
  date: string;
  status: 'new' | 'replied' | 'closed';
  replyEn?: string;
  replyAr?: string;
  replyDate?: string;
  replyBy?: string;
  conversation?: ConversationMessage[];
}

interface ConversationMessage {
  id: number;
  sender: 'admin' | 'user';
  messageEn: string;
  messageAr: string;
  date: string;
  senderName: string;
}

export function LegalOpinionsPage({ onBack, userRole = 'admin', userDepartment = 'rta', onOpinionSelect, fontSizeMultiplier = 1 }: LegalOpinionsPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(userRole === 'user' ? userDepartment : ''); // Empty string for admin = show all
  const [departmentSearchQuery, setDepartmentSearchQuery] = useState('');
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newEnquiry, setNewEnquiry] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<'admin' | 'user'>(userRole);
  const [selectedStatus, setSelectedStatus] = useState<'' | 'new' | 'replied' | 'closed'>('');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [showReturnButton, setShowReturnButton] = useState(false);
  const itemsPerPage = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const prevLanguageRef = useRef(language);

  // Legislation Platform Theme Colors - Updated to match legislation theme
  const legislationColors = {
    primary: '#2F4F6F',      // Deep Blue-Gray (legislation primary)
    accent: '#C9A24D',       // Muted Gold
    bgOffWhite: '#F7F8FA',   // Off-White
  };

  // Typography - Enhanced readability with modern Arabic font
  const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';

  // Translations
  const t = {
    pageTitle: isArabic ? 'الآراء القانونية للجهاز' : 'FAA Legal Opinions',
    pageDescription: isArabic 
      ? 'إدارة ومتابعة الآراء القانونية الصادرة من جهاز التدقيق المالي'
      : 'Manage and track legal opinions issued by the Financial Audit Authority',
    home: isArabic ? 'الرئيسية' : 'Home',
    legalOpinions: isArabic ? 'الآراء القانونية' : 'Legal Opinions',
    back: isArabic ? 'رجوع' : 'Back',
    search: isArabic ? 'بحث' : 'Search',
    searchPlaceholder: isArabic ? 'البحث في الآراء القانونية...' : 'Search legal opinions...',
    selectDepartment: isArabic ? 'اختر الجهة' : 'Select Department',
    allDepartments: isArabic ? 'جميع الجهات' : 'All Departments',
    searchDepartment: isArabic ? 'بحث عن جهة...' : 'Search department...',
    departmentName: isArabic ? 'الجهة' : 'Department',
    addEnquiry: isArabic ? 'إضافة استفسار' : 'Add Enquiry',
    number: isArabic ? 'م' : '#',
    department: isArabic ? 'الجهة' : 'Department',
    title: isArabic ? 'العنوان' : 'Title',
    date: isArabic ? 'التاريخ' : 'Date',
    status: isArabic ? 'الحالة' : 'Status',
    actions: isArabic ? 'الإجراءات' : 'Actions',
    view: isArabic ? 'عرض' : 'View',
    pending: isArabic ? 'قيد الانتظار' : 'Pending',
    replied: isArabic ? 'تم الرد' : 'Replied',
    closed: isArabic ? 'مغلق' : 'Closed',
    inProgress: isArabic ? 'قيد المعالجة' : 'In Progress',
    newStatus: isArabic ? 'جديد' : 'New',
    noResults: isArabic ? 'لا توجد نتائج' : 'No results found',
    noResultsDesc: isArabic ? 'جرب تغيير معايير البحث' : 'Try changing your search criteria',
    addNewEnquiry: isArabic ? 'إضافة استفسار جديد' : 'Add New Enquiry',
    opinionTitle: isArabic ? 'عنوان الاستفسار' : 'Enquiry Title',
    enquiryDetails: isArabic ? 'تفاصيل الاستفسار' : 'Enquiry Details',
    enterTitle: isArabic ? 'أدخل عنوان الاستفسار' : 'Enter enquiry title',
    enterEnquiry: isArabic ? 'أدخل تفاصيل الاستفسار' : 'Enter enquiry details',
    successAdded: isArabic ? 'تم إضافة الاستفسار بنجاح' : 'Enquiry added successfully',
    submit: isArabic ? 'إرسال' : 'Submit',
    cancel: isArabic ? 'إلغاء' : 'Cancel',
    close: isArabic ? 'إغلاق' : 'Close',
    showing: isArabic ? 'عرض' : 'Showing',
    to: isArabic ? 'إلى' : 'to',
    of: isArabic ? 'من' : 'of',
    results: isArabic ? 'نتيجة' : 'results',
    previous: isArabic ? 'السابق' : 'Previous',
    next: isArabic ? 'التالي' : 'Next',
    noDepartmentSelected: isArabic ? 'لم يتم اختيار جهة' : 'No Department Selected',
    noDepartmentDesc: isArabic ? 'الرجاء اختيار جهة من القائمة أعلاه لعرض الآراء القانونية' : 'Please select a department from the dropdown above to view legal opinions',
    export: isArabic ? 'تصدير' : 'Export',
    clearFilters: isArabic ? 'مسح الفلاتر' : 'Clear Filters',
    activeFilters: isArabic ? 'الفلاتر النشطة:' : 'Active Filters:',
    adminRole: isArabic ? 'دور المشرف' : 'Admin Role',
    userRole: isArabic ? 'دور المستخدم' : 'User Role',
    selectStatus: isArabic ? 'اختر الحالة' : 'Select Status',
    allStatuses: isArabic ? 'جميع الحالات' : 'All Statuses',
    addReply: isArabic ? 'إضافة رد' : 'Add Reply',
    returnToSearch: isArabic ? 'رجوع للبحث' : 'Return to Search',
  };

  // Department list
  const departments = [
    { id: 'rta', nameAr: 'هيئة النقل والمواصلات', nameEn: 'Roads and Transport Authority' },
    { id: 'dha', nameAr: 'هيئة الصحة', nameEn: 'Health Authority' },
    { id: 'dewa', nameAr: 'هيئة كهرباء ومياه دبي', nameEn: 'Dubai Electricity and Water Authority' },
    { id: 'dld', nameAr: 'دائرة الأراضي والأملاك', nameEn: 'Dubai Land Department' },
    { id: 'ded', nameAr: 'دائرة التنمية الاقتصادية', nameEn: 'Department of Economic Development' },
    { id: 'ddf', nameAr: 'دائرة المالية', nameEn: 'Department of Finance' },
    { id: 'khda', nameAr: 'هيئة المعرفة والتنمية البشرية', nameEn: 'Knowledge and Human Development Authority' },
    { id: 'shjm', nameAr: 'بلدية الشارقة', nameEn: 'Sharjah Municipality' },
  ];

  // Mock data
  const [opinions, setOpinions] = useState<Opinion[]>([
    {
      id: 1,
      department: 'rta',
      titleEn: 'Enquiry regarding asset disposal methods followed by the Authority',
      titleAr: 'استفسار عن الرأي القانوني حول أسلوب التصرف في الأصول المتبع في الهيئة',
      enquiryEn: 'We request clarification on the legal procedures for asset disposal and the applicable methods according to the current regulations.',
      enquiryAr: 'استفسار عن الرأي القانوني حول أسلوب التصرف في الأصول المتبع في الهيئة',
      date: '2024-01-15',
      status: 'replied',
      replyEn: 'With reference to your enquiry, after reviewing Law No. 12 of 2020 concerning Contracts and Warehouse Management in the Emirate of Dubai, Article (85) defines asset disposal methods requiring General Manager approval: 1. Auction 2. Practice 3. Direct Agreement. Article (87) states that auction is the primary method for asset disposal, conducted through public announcement within or outside the country, following the procedures outlined in this law. The practice method may exceptionally be used in cases specified in Article (95). Direct agreement may exceptionally be used in cases specified in Article (96). Upon reviewing clause 7.3.4 of the Revenue Contracts Policy, it states that all new revenue contracts must be concluded through limited or general tender or through the Emirates Auction website, with direct agreement permitted in exceptional cases. Based on the examination results, if one of the exceptional cases specified in clause 7.3.4 of the Revenue Contracts Policy exists, the Authority may use the direct agreement method; otherwise, the auction method must be followed in accordance with the procedures stipulated in the law and the Authority\'s approved policy.',
      replyAr: 'بالإشارة إلى الاستفسار الوارد منكم فإنه بعد الاطلاع على القانون رقم 12 لسنة 2020 بشأن العقود وإدارة المخازن في إمارة دبي فإن نص المادة (85) حددت أساليب التصرُّف في الأصول بأن "يتم التصرُّف في الأصول بمُوافقة المُدير العام بأحد الأساليب التالية: 1. المُزايدة 2 .المُمارسة 3. الاتفاق المُباشِر. " وأوردت المادة (87) أن " المُزايدة هي الطريقة الأساسيّة للتصرُّف في الأصول، يتم طرحها عن طريق الإعلان العام داخل الدولة أو خارجها، والتي تتم إجراءاتها والبت فيها وفقاً لأحكام هذا القانون. ويجوز استثناءً اتباع أسلوب الممارسة في الحالات المبينة بأحكام المادة (95) من القانون. كما يجوز استثناءً اتباع أسلوب الاتفاق المُباشِر في الحالات المبينة بأحكام المادة(96) من القانون. وبالاطلاع على نص البند 7.3.4 من سياسة عقود الإيرادات جاء به انه " يجب إبرام كافة عقود الإيرادات الجديدة من خلال طرح مزايدة محدودة أو عامة أو من خلال استخدام موقع الامارات للمزادات، ويسمح بالاتفاق المباشر في حالات استثنائية. وفي ضوء ما سوف يسفر عنه الفحص أنه في حالة توافر إحدى الحالات المستثناة وفق البند 7.3.4 من سياسة عقود الإيرادات فيجوز للهيئة اللجوء الى أسلوب الاتفاق المباشر وفيما عدا ذلك يتعين التقيد بأسلوب المزايدة واتباع الإجراءات المنصوص عليها في القانون والسياسة المعتمدة بالهيئة.',
      replyDate: '2024-01-20',
      replyBy: isArabic ? 'أحمد الشامسي - مستشار قانوني أول' : 'Ahmed Al Shamsi - Senior Legal Advisor',
      conversation: [
        {
          id: 1,
          sender: 'admin',
          messageEn: 'With reference to your enquiry, after reviewing Law No. 12 of 2020 concerning Contracts and Warehouse Management in the Emirate of Dubai, Article (85) defines asset disposal methods. The primary method is auction (المزايدة), with exceptions for practice (الممارسة) and direct agreement (الاتفاق المباشر) as specified in Articles 95 and 96.',
          messageAr: 'بالإشارة إلى الاستفسار الوارد منكم فإنه بعد الاطلاع على القانون رقم 12 لسنة 2020 بشأن العقود وإدارة المخازن في إمارة دبي فإن نص المادة (85) حددت أساليب التصرُّف في الأصول بأن "يتم التصرُّف في الأصول بمُوافقة المُدير العام بأحد الأساليب التالية: 1. المُزايدة 2 .المُمارسة 3. الاتفاق المُباشِر. " وأوردت المادة (87) أن " المُزايدة هي الطريقة الأساسيّة للتصرُّف في الأصول، يتم طرحها عن طريق الإعلان العام داخل الدولة أو خارجها، والتي تتم إجراءاتها والبت فيها وفقاً لأحكام هذا القانون. و��جوز استثناءً اتباع أسلوب الممارسة في الحالات المبينة بأحكام المادة (95) من القانون. كما يجوز استثناءً اتباع أسلوب الاتفاق المُباشِر في الحالات المبينة بأحكام المادة(96) من القانون. وبالاطلاع على نص البند 7.3.4 من سياسة عقود الإيرادات جاء به انه " يجب إبرام كافة عقود الإيرادات الجديدة من خلال طرح مزايدة محدودة أو عامة أو من خلال استخدام موقع الامارات للمزادات، ويسمح بالاتفاق المباشر في حالات استثنائية. وفي ضوء ما سوف يسفر عنه الفحص أنه في حالة توافر إحدى الحالات المستثناة وفق البند 7.3.4 من سياسة عقود الإيرادات فيجوز للهيئة اللجوء الى أسلوب الاتفاق المباشر وفيما عدا ذلك يتعين التقيد بأسلوب المزايدة واتباع الإجراءات المنصوص عليها في القانون والسياسة المعتمدة بالهيئة.',
          date: 'Jan 20, 2024',
          senderName: 'FAA Legal Team'
        },
        
      ]
    },
    {
      id: 2,
      department: 'dha',
      titleEn: 'Enquiry on IFRS implementation',
      titleAr: 'استفسار حول تطبيق معايير المحاسبة الدولية',
      enquiryEn: 'Is it mandatory for the Authority to apply IFRS 16 to operating lease contracts?',
      enquiryAr: 'هل يتوجب على الهيئة تطبيق معيار IFRS 16 على عقود الإيجار التشغيلية؟',
      date: '2024-01-22',
      status: 'new',
    },
    {
      id: 3,
      department: 'dewa',
      titleEn: 'Enquiry on capital project financial procedures',
      titleAr: 'استفسار عن الإجراءات المالية للمشاريع الرأسمالية',
      enquiryEn: 'What are the legal requirements for transferring funds between different capital projects?',
      enquiryAr: 'ما هي المتطلبات القانونية لتحويل الأموال بين المشاريع الرأسمالية المختلفة؟',
      date: '2024-01-25',
      status: 'new',
    },
    {
      id: 4,
      department: 'dld',
      titleEn: 'Enquiry on disbursement controls',
      titleAr: 'استفسار حول ضوابط الصرف',
      enquiryEn: 'We would like to enquire about the legal controls for disbursement on projects before finalizing award procedures.',
      enquiryAr: 'نود الاستفسار عن الضوابط القانونية للصرف على المشاريع قبل إتمام إجراءات الترسية النهائية.',
      date: '2024-01-28',
      status: 'closed',
      replyEn: 'Disbursement on any project is not permitted before completing final award procedures and contract signing as per Article (25) of the Financial Regulations.',
      replyAr: 'لا يجوز الصرف على أي مشروع قبل إتمام ��جراءات الترسية النهائية والتوقيع على العقد وفقاً للمادة (25) من اللائحة المالية.',
      replyDate: '2024-02-02',
      replyBy: isArabic ? 'فاطمة المرزوقي - مستشار قانوني' : 'Fatima Al Marzouqi - Legal Advisor',
      conversation: [
        {
          id: 1,
          sender: 'admin',
          messageEn: 'Disbursement on any project is not permitted before completing final award procedures and contract signing as per Article (25) of the Financial Regulations.',
          messageAr: 'لا يجوز الصرف على أي مشروع قبل إتمام إجراءات الترسية النهائية والتوقيع على العقد وفقاً للمادة (25) من اللائحة المالية.',
          date: 'Feb 2, 2024',
          senderName: 'FAA Legal Team'
        },
        {
          id: 2,
          sender: 'user',
          messageEn: 'Thank you. The matter has been resolved and we have no further questions.',
          messageAr: 'شكراً لكم. تم حل الموضوع وليس لدينا أي استفسارات أخرى.',
          date: 'Feb 3, 2024',
          senderName: 'Dubai Land Department'
        }
      ]
    },
    {
      id: 5,
      department: 'ded',
      titleEn: 'Enquiry on expense classification',
      titleAr: 'استفسار عن تصنيف المصروفات',
      enquiryEn: 'How should expenses related to major maintenance of fixed assets be classified legally?',
      enquiryAr: 'كيف يتم تصنيف المصروفات المتعلقة بالصيانة الجوهرية للأصول الثابتة من الناحية القانونية؟',
      date: '2024-02-05',
      status: 'new',
    },
    {
      id: 6,
      department: 'rta',
      titleEn: 'Enquiry on employee overtime compensation',
      titleAr: 'استفسار حول تعويض العمل الإضافي للموظفين',
      enquiryEn: 'What are the legal controls for calculating overtime compensation for employees working on official holidays?',
      enquiryAr: 'ما هي الضوابط القانونية لاحتساب تعويض العمل الإضافي للموظفين خلال العطل الرسمية؟',
      date: '2024-02-10',
      status: 'new',
    },
    {
      id: 7,
      department: 'rta',
      titleEn: 'Budget transfer between sections',
      titleAr: 'نقل الميزانية بين البنود',
      enquiryEn: 'Is it permissible to transfer funds from operational budget items to capital expenditure items within the same fiscal year?',
      enquiryAr: 'هل يجوز نقل أموال من بنود الميزانية التشغيلية إلى بنود المصروفات الرأسمالية ضمن نفس السنة المالية؟',
      date: '2024-02-15',
      status: 'closed',
      replyEn: 'According to Article (18) of the Budget Law, budget transfers between operational and capital items require prior approval from the Department of Finance.',
      replyAr: 'بناءً على المادة (18) من قانون الميزان��ة، تتطلب النقلات بين البنود التشغيلية والرأسمالية موافقة مسبقة من دائرة المالية.',
      replyDate: '2024-02-20',
      replyBy: isArabic ? 'محمد الكعبي - مستشار قانوني' : 'Mohammed Al Kaabi - Legal Advisor',
      conversation: [
        {
          id: 1,
          sender: 'admin',
          messageEn: 'According to Article (18) of the Budget Law, budget transfers between operational and capital items require prior approval from the Department of Finance.',
          messageAr: 'بناءً على المادة (18) من قانون الميزانية، تتطلب النقلات بين البنود التشغيلية والرأسمالية موافقة مسبقة من دائرة المالية.',
          date: 'Feb 20, 2024',
          senderName: 'FAA Legal Team'
        },
        {
          id: 2,
          sender: 'user',
          messageEn: 'Understood. This conversation can be closed as our question has been answered.',
          messageAr: 'مفهوم. يمكن إغلاق هذه المحادثة حيث تم الرد على سؤالنا.',
          date: 'Feb 21, 2024',
          senderName: 'Roads and Transport Authority'
        }
      ]
    },
    {
      id: 8,
      department: 'rta',
      titleEn: 'Revenue recognition for multi-year projects',
      titleAr: 'إثبات الإيرادات للمشاريع متعددة السنوات',
      enquiryEn: 'How should revenue be recognized for multi-year projects in accordance with international accounting standards?',
      enquiryAr: 'كيف يتم إثبات الإيرادات للمشاريع متعددة السنوات وفقاً لمعايير المحاسبة الدولية؟',
      date: '2024-02-22',
      status: 'new',
    },
    {
      id: 9,
      department: 'rta',
      titleEn: 'Fixed assets depreciation policy',
      titleAr: 'سياسة استهلاك الأصول الثابتة',
      enquiryEn: 'What is the legal basis for changing depreciation methods for infrastructure assets?',
      enquiryAr: 'ما هو الأساس القانوني لتغيير طرق الاستهلاك للأصول البنية التحتية؟',
      date: '2024-03-01',
      status: 'replied',
      replyEn: 'Changes to depreciation methods must be justified and approved by the Financial Audit Authority in accordance with IAS 16, and disclosed in the financial statements.',
      replyAr: 'يجب تبرير التغييرات في طرق الاستهلاك والحصول على موافقة جهاز التدقيق المالي وفقاً لمعيار المحاسبة الدولي رقم 16، والإفصاح عنها في القوائم المالية.',
      replyDate: '2024-03-05',
      replyBy: isArabic ? 'سارة الزعابي - مستشار قانوني أول' : 'Sara Al Zaabi - Senior Legal Advisor',
    },
    {
      id: 10,
      department: 'rta',
      titleEn: 'Tender cancellation procedures',
      titleAr: 'إجراءات إلغاء المناقصات',
      enquiryEn: 'What are the legal requirements for canceling a tender after opening the bids?',
      enquiryAr: 'ما هي المتطلبات القانونية لإلغاء مناقصة بعد فتح العطاءات؟',
      date: '2024-03-10',
      status: 'new',
    },
    {
      id: 11,
      department: 'rta',
      titleEn: 'Year-end financial closing procedures',
      titleAr: 'إجراءات الإقفال المالي لنهاية السنة',
      enquiryEn: 'What is the deadline for completing year-end closing entries and submitting final financial statements?',
      enquiryAr: 'ما هو الموعد النهائي لإتمام قيود الإقفال وتقديم القوائم المالية النهائية؟',
      date: '2024-03-15',
      status: 'closed',
      replyEn: 'According to the Financial Regulations, year-end closing must be completed within 45 days from the end of the fiscal year, and financial statements submitted within 60 days.',
      replyAr: 'وفقاً للائحة المالية، يجب إتمام الإقفال السنوي خلال 45 يوماً من نهاية السنة المالية، وتقديم القوائم المالية خلال 60 يوماً.',
      replyDate: '2024-03-18',
      replyBy: isArabic ? 'خالد المهيري - مستشار قانوني' : 'Khalid Al Muhairi - Legal Advisor',
      conversation: [
        {
          id: 1,
          sender: 'admin',
          messageEn: 'According to the Financial Regulations, year-end closing must be completed within 45 days from the end of the fiscal year, and financial statements submitted within 60 days.',
          messageAr: 'وفقاً للائحة المالية، يجب إتمام الإقفال السنوي خلال 45 يوماً من نهاية السنة المالية، وتقديم القوائم المالية خلال 60 يوماً.',
          date: 'Mar 18, 2024',
          senderName: 'FAA Legal Team'
        },
        {
          id: 2,
          sender: 'user',
          messageEn: 'Thank you for the information. Our enquiry has been fully resolved.',
          messageAr: 'شكراً على المعلومات. تم حل استفسارنا بالكامل.',
          date: 'Mar 19, 2024',
          senderName: 'Roads and Transport Authority'
        }
      ]
    },
    {
      id: 12,
      department: 'rta',
      titleEn: 'Bank account opening requirements',
      titleAr: 'متطلبات فتح الحسابات البنكية',
      enquiryEn: 'What are the mandatory legal procedures for opening new bank accounts for government entities?',
      enquiryAr: 'ما هي الإجراءات القانونية الإلزامية لفتح حسابات بنكية جديدة للجهات الحكومية؟',
      date: '2024-03-22',
      status: 'new',
    },
    {
      id: 13,
      department: 'rta',
      titleEn: 'Contract amendment procedures',
      titleAr: 'إجراءات تعديل العقود',
      enquiryEn: 'What is the legal process for amending existing contracts that exceed the original value by more than 25%?',
      enquiryAr: 'ما هي الإجراءات القانونية لتعديل العقود القائمة التي تتجاوز القيمة الأصلية بنسبة تزيد عن 25%؟',
      date: '2024-03-25',
      status: 'replied',
      replyEn: 'Contract amendments exceeding 25% of original value require approval from the Tenders Committee and must comply with procurement regulations as per Article (32).',
      replyAr: 'تتطلب تعديلات العقود التي تتجاوز 25% من القيمة الأصلية موافقة لجنة العطاءات ويجب أن تتوافق مع لوائح المشتريات وفقاً للمادة (32).',
      replyDate: '2024-03-28',
      replyBy: isArabic ? 'عائشة البلوشي - مستشار قانوني أول' : 'Aisha Al Balushi - Senior Legal Advisor',
    },
    {
      id: 14,
      department: 'rta',
      titleEn: 'Inventory valuation methods',
      titleAr: 'طرق تقييم المخزون',
      enquiryEn: 'Which inventory valuation method should be used for spare parts and maintenance materials?',
      enquiryAr: 'ما هي طريقة تقييم المخزون الواجب استخدامها لقطع الغيار ومواد الصيانة؟',
      date: '2024-04-01',
      status: 'new',
    },
    {
      id: 15,
      department: 'rta',
      titleEn: 'Petty cash fund management',
      titleAr: 'إدارة صندوق النثريات',
      enquiryEn: 'What are the legal limits and controls for petty cash funds in government entities?',
      enquiryAr: 'ما هي الحدود والضوابط القانونية لصندوق النثريات في الجهات الحكومية؟',
      date: '2024-04-05',
      status: 'replied',
      replyEn: 'Petty cash funds are limited to AED 50,000 maximum and must be replenished monthly with proper documentation as per Financial Circular No. 5/2023.',
      replyAr: 'يقتصر صندوق النثريات على حد أقصى 50,000 درهم ويجب تعويضه شهرياً مع التوثيق المناسب وفقاً للتعميم المالي رقم 5/2023.',
      replyDate: '2024-04-08',
      replyBy: isArabic ? 'علي الحمادي - مستشار قانو��ي' : 'Ali Al Hammadi - Legal Advisor',
    },
    {
      id: 16,
      department: 'rta',
      titleEn: 'External audit cooperation requirements',
      titleAr: 'متطلبات التعاون مع التدقيق الخارجي',
      enquiryEn: 'What are our legal obligations regarding document provision to external auditors?',
      enquiryAr: 'ما هي التزاماتنا القانونية فيما يتعلق بتوفير المستندات للمدققين الخارجيين؟',
      date: '2024-04-10',
      status: 'new',
    },
    {
      id: 17,
      department: 'rta',
      titleEn: 'Travel expense reimbursement policy',
      titleAr: 'سياسة استرداد مصاريف السفر',
      enquiryEn: 'What are the maximum allowable rates for domestic and international travel reimbursements?',
      enquiryAr: 'ما هي المعدلات القصوى المسموح بها لاسترداد مصاريف السفر الداخلي والدولي؟',
      date: '2024-04-15',
      status: 'replied',
      replyEn: 'Travel reimbursement rates are governed by Cabinet Resolution No. 15/2022 and vary by employee grade and destination. Detailed tables are available in the Financial Manual.',
      replyAr: 'تحكم معدلات استرداد السفر قرار مجلس الوزر��ء رقم 15/2022 وتختلف حسب درجة الموظف والوجهة. الجداول التفصيلية متوفرة في الدليل المالي.',
      replyDate: '2024-04-18',
      replyBy: isArabic ? 'مريم الشامسي - مستشار قانوني' : 'Maryam Al Shamsi - Legal Advisor',
    },
    {
      id: 18,
      department: 'rta',
      titleEn: 'Performance bond requirements',
      titleAr: 'متطلبات ضمان حسن الأداء',
      enquiryEn: 'What is the minimum percentage required for performance bonds in construction contracts?',
      enquiryAr: 'ما هي النسبة الدنيا المطلوبة لضمان حسن الأداء في عقود المقاولات؟',
      date: '2024-04-20',
      status: 'new',
    },
    {
      id: 19,
      department: 'rta',
      titleEn: 'Software license capitalization',
      titleAr: 'رسملة تراخيص البرمجيات',
      enquiryEn: 'Should software licenses be capitalized as intangible assets or expensed immediately?',
      enquiryAr: 'هل يجب رسملة تراخيص البرمجيات كأصول غير ملموسة أم تحميلها كمصروف فوري؟',
      date: '2024-04-25',
      status: 'replied',
      replyEn: 'Software licenses should be capitalized if they meet the recognition criteria under IAS 38, particularly if the useful life exceeds one year and the cost exceeds AED 10,000.',
      replyAr: 'يجب رسملة تراخيص البرمجي��ت إذا استوفت معايير الإثبات بموجب معيار المحاسبة الدولي 38، خاصة إذا تجاوزت العمر الإنتاجي سنة واحدة والتكلفة 10,000 درهم.',
      replyDate: '2024-04-28',
      replyBy: isArabic ? 'حمد الفلاسي - مستشار قانوني أول' : 'Hamad Al Falasi - Senior Legal Advisor',
    },
  ]);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDepartmentDropdownOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
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

  // Sync currentUserRole with userRole prop changes from header
  useEffect(() => {
    setCurrentUserRole(userRole);
    // Update department filter based on role
    if (userRole === 'user') {
      setSelectedDepartment(userDepartment);
    } else {
      setSelectedDepartment('');
    }
  }, [userRole, userDepartment]);

  // Handle scroll to show/hide return to search button
  useEffect(() => {
    const handleScroll = () => {
      setShowReturnButton(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter departments based on search
  const filteredDepartments = departments.filter(dept => {
    const searchLower = departmentSearchQuery.toLowerCase();
    return (
      dept.nameAr.includes(departmentSearchQuery) ||
      dept.nameEn.toLowerCase().includes(searchLower)
    );
  });

  // Get department name by ID
  const getDepartmentName = (deptId: string) => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? (isArabic ? dept.nameAr : dept.nameEn) : deptId;
  };

  // Get selected department display text
  const selectedDepartmentName = selectedDepartment 
    ? getDepartmentName(selectedDepartment)
    : '';

  // Filter opinions based on search query, department, status, and user role
  const filteredOpinions = opinions.filter(opinion => {
    // If user role, only show their department
    if (currentUserRole === 'user' && opinion.department !== userDepartment) {
      return false;
    }
    
    // Department filter - only filter if a department is selected
    if (selectedDepartment && opinion.department !== selectedDepartment) {
      return false;
    }
    
    // Status filter
    if (selectedStatus && opinion.status !== selectedStatus) {
      return false;
    }
    
    // Search query filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = opinion.titleAr.includes(searchLower) || opinion.titleEn.toLowerCase().includes(searchLower);
      const enquiryMatch = opinion.enquiryAr.includes(searchLower) || opinion.enquiryEn.toLowerCase().includes(searchLower);
      const deptMatch = getDepartmentName(opinion.department).toLowerCase().includes(searchLower);
      return titleMatch || enquiryMatch || deptMatch;
    }
    
    return true;
  });

  // Calculate status counts
  const newCount = filteredOpinions.filter(op => op.status === 'new').length;
  const repliedCount = filteredOpinions.filter(op => op.status === 'replied').length;
  const closedCount = filteredOpinions.filter(op => op.status === 'closed').length;

  // Pagination
  const totalPages = Math.ceil(filteredOpinions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOpinions = filteredOpinions.slice(startIndex, endIndex);

  // Get status badge
  const getStatusBadge = (status: Opinion['status']) => {
    const statusConfig = {
      new: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        icon: AlertCircle,
        label: t.newStatus,
      },
      replied: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        icon: CheckCircle2,
        label: t.replied,
      },
      closed: {
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        icon: XCircle,
        label: t.closed,
      },
    };

    const config = statusConfig[status];
    const StatusIcon = config.icon;

    return (
      <span 
        className={`inline-flex items-center px-3 py-1.5 text-[16px] ${config.bg} ${config.text}`}
        style={{ 
          fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
          fontWeight: 700,
          borderRadius: '6px',
        }}
      >
        {config.label}
      </span>
    );
  };

  // Handle add opinion
  const handleAddOpinion = () => {
    if (!newTitle || !newEnquiry) return;

    const newOpinion: Opinion = {
      id: opinions.length + 1,
      department: userDepartment,
      titleEn: newTitle,
      titleAr: newTitle,
      enquiryEn: newEnquiry,
      enquiryAr: newEnquiry,
      date: new Date().toISOString().split('T')[0],
      status: 'new',
    };

    setOpinions([newOpinion, ...opinions]);
    setNewTitle('');
    setNewEnquiry('');
    setIsAddModalOpen(false);
    setSuccessMessage(t.successAdded);
    setShowSuccessMessage(true);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    if (userRole === 'admin') {
      setSelectedDepartment('');
    }
    setSelectedStatus('');
    setCurrentPage(1);
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: legislationColors.bgOffWhite }} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Floating Return to Search Button */}
      {showReturnButton && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 ${isArabic ? 'left-8' : 'right-8'} z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl`}
          style={{
            backgroundColor: legislationColors.accent,
            color: '#FFFFFF',
            fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            transform: showReturnButton ? 'translateY(0)' : 'translateY(100px)',
            opacity: showReturnButton ? 1 : 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#B89144';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = legislationColors.accent;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ArrowUp className="h-4 w-4" />
          <span>{t.returnToSearch}</span>
        </button>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 shadow-lg flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p 
                className="text-green-800 text-[15px]"
                style={{ 
                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
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

      {/* Add Opinion Modal - User View */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsAddModalOpen(false)}>
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {/* Modal Header */}
            <div 
              className="px-8 py-6 border-b-2 border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10"
              style={{ backgroundColor: `${legislationColors.primary}08` }}
            >
              <h3 
                className="text-slate-900 text-2xl flex items-center gap-3"
                style={{ 
                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                  fontWeight: 600 
                }}
              >
                <Plus className="h-6 w-6" style={{ color: legislationColors.accent }} />
                {t.addNewEnquiry}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-6 space-y-6">
              <div>
                <label 
                  className="block text-[16px] text-slate-700 mb-2"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 600 
                  }}
                >
                  {t.opinionTitle} *
                </label>
                <Input
                  type="text"
                  placeholder={t.enterTitle}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`h-12 text-base border-2 border-gray-300 ${isArabic ? 'text-right' : ''}`}
                  style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = legislationColors.primary}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                />
              </div>

              <div>
                <label 
                  className="block text-[16px] text-slate-700 mb-2"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 600 
                  }}
                >
                  {t.enquiryDetails} *
                </label>
                <textarea
                  placeholder={t.enterEnquiry}
                  value={newEnquiry}
                  onChange={(e) => setNewEnquiry(e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none resize-none ${isArabic ? 'text-right' : ''}`}
                  style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = legislationColors.primary}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 flex items-start gap-3">
                <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-blue-800 text-[15px]" style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif', fontWeight: 500 }}>
                    {t.department}: {getDepartmentName(userDepartment)}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t-2 border-gray-200 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 h-11 border-2 border-gray-300 hover:bg-gray-100"
              >
                {t.cancel}
              </Button>
              <Button
                onClick={handleAddOpinion}
                className="flex-1 h-11 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: legislationColors.accent }}
                disabled={!newTitle.trim() || !newEnquiry.trim()}
              >
                <CheckCircle2 className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                {t.submit}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section with Breadcrumb */}
      <div className="bg-white border-b border-gray-200 shadow-sm fixed top-[143px] z-20 w-full">
        {/* Legislation theme top border line */}
        <div className="h-1 w-full" style={{ backgroundColor: legislationColors.primary }}></div>
        
        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 h-9 px-3 -ml-3"
              style={{ 
                fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                fontSize: `${15 * fontSizeMultiplier}px`,
                fontWeight: 600
              }}
            >
              <ArrowLeft className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              {t.back}
            </Button>
            
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

      {/* Enhanced Filters Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm pt-[204px]">
        <div className="max-w-[1600px] mx-auto px-8 py-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Department Searchable Dropdown - Admin Only */}
              {currentUserRole === 'admin' && (
                <div className="flex-1" ref={dropdownRef}>
                  <label 
                    className="block text-[16px] text-slate-700 mb-2"
                    style={{ 
                      fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                      fontWeight: 600 
                    }}
                  >
                    {t.departmentName}
                  </label>
                  <div className="relative">
                    <Building2 className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400 pointer-events-none z-10`} />
                    <button
                      onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
                      className={`w-full h-12 ${isArabic ? 'pr-11 pl-11' : 'pl-11 pr-11'} rounded-lg border-2 border-gray-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all flex items-center justify-between text-${isArabic ? 'right' : 'left'}`}
                      style={{ 
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        transition: 'all 0.2s ease-in-out',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = legislationColors.primary;
                        e.currentTarget.style.backgroundColor = `${legislationColors.primary}08`;
                        const icon = e.currentTarget.querySelector('svg:last-child');
                        if (icon && !isDepartmentDropdownOpen) {
                          (icon as HTMLElement).style.transform = 'rotate(5deg)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                        e.currentTarget.style.backgroundColor = 'white';
                        const icon = e.currentTarget.querySelector('svg:last-child');
                        if (icon && !isDepartmentDropdownOpen) {
                          (icon as HTMLElement).style.transform = 'rotate(0deg)';
                        }
                      }}
                    >
                      <span className="text-[15px] truncate">
                        {selectedDepartmentName || t.selectDepartment}
                      </span>
                      <ChevronDown 
                        className={`h-5 w-5 transition-transform duration-200 ${isDepartmentDropdownOpen ? 'rotate-180' : ''}`}
                        style={{ transition: 'transform 0.2s ease-in-out' }}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isDepartmentDropdownOpen && (
                      <div className="absolute z-50 mt-1 w-full bg-white border-2 border-gray-300 shadow-xl rounded-lg max-h-80 overflow-hidden">
                        {/* Search Input */}
                        <div className="p-3 border-b border-gray-200 bg-gray-50">
                          <div className="relative">
                            <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400`} />
                            <Input
                              type="text"
                              placeholder={t.searchDepartment}
                              value={departmentSearchQuery}
                              onChange={(e) => setDepartmentSearchQuery(e.target.value)}
                              className={`h-10 ${isArabic ? 'pr-10' : 'pl-10'} border-gray-300`}
                              style={{ 
                                fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' 
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>

                        {/* Department List */}
                        <div className="max-h-60 overflow-y-auto">
                          {filteredDepartments.length > 0 ? (
                            filteredDepartments.map(dept => (
                              <button
                                key={dept.id}
                                onClick={() => {
                                  setSelectedDepartment(dept.id);
                                  setIsDepartmentDropdownOpen(false);
                                  setDepartmentSearchQuery('');
                                  setCurrentPage(1);
                                }}
                                className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between min-h-[48px] ${
                                  selectedDepartment === dept.id ? 'bg-gray-100' : ''
                                }`}
                                style={{
                                  fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                                }}
                              >
                                <span className="text-[16px] text-slate-700">{dept[isArabic ? 'nameAr' : 'nameEn']}</span>
                                {selectedDepartment === dept.id && (
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: legislationColors.accent }}></div>
                                )}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center text-[16px] text-slate-500"
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
              )}

              {/* Status Filter Dropdown */}
              <div className="flex-1" ref={statusDropdownRef}>
                <label 
                  className="block text-[16px] text-slate-700 mb-2"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 600 
                  }}
                >
                  {t.status}
                </label>
                <div className="relative">
                  <Filter className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400 pointer-events-none z-10`} />
                  <button
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className={`w-full h-12 ${isArabic ? 'pr-11 pl-11' : 'pl-11 pr-11'} rounded-lg border-2 border-gray-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all flex items-center justify-between text-${isArabic ? 'right' : 'left'}`}
                    style={{ 
                      fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                      transition: 'all 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = legislationColors.primary;
                      e.currentTarget.style.backgroundColor = `${legislationColors.primary}08`;
                      const icon = e.currentTarget.querySelector('svg:last-child');
                      if (icon && !isStatusDropdownOpen) {
                        (icon as HTMLElement).style.transform = 'rotate(5deg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                      e.currentTarget.style.backgroundColor = 'white';
                      const icon = e.currentTarget.querySelector('svg:last-child');
                      if (icon && !isStatusDropdownOpen) {
                        (icon as HTMLElement).style.transform = 'rotate(0deg)';
                      }
                    }}
                  >
                    <span className="text-[16px] truncate">
                      {selectedStatus ? (selectedStatus === 'new' ? t.newStatus : selectedStatus === 'replied' ? t.replied : t.closed) : t.allStatuses}
                    </span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`}
                      style={{ transition: 'transform 0.2s ease-in-out' }}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isStatusDropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white border-2 border-gray-300 shadow-xl rounded-lg overflow-hidden">
                      <button
                        onClick={() => {
                          setSelectedStatus('');
                          setIsStatusDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between min-h-[48px] ${
                          selectedStatus === '' ? 'bg-gray-100' : ''
                        }`}
                        style={{
                          fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        }}
                      >
                        <span className="text-[16px] text-slate-700">{t.allStatuses}</span>
                        {selectedStatus === '' && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: legislationColors.accent }}></div>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedStatus('new');
                          setIsStatusDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between min-h-[48px] ${
                          selectedStatus === 'new' ? 'bg-gray-100' : ''
                        }`}
                        style={{
                          fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] text-slate-700">{t.newStatus}</span>
                          <span 
                            className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-[14px] text-white"
                            style={{ backgroundColor: '#3B82F6', fontWeight: 600 }}
                          >
                            {newCount}
                          </span>
                        </div>
                        {selectedStatus === 'new' && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: legislationColors.accent }}></div>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedStatus('replied');
                          setIsStatusDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between min-h-[48px] ${
                          selectedStatus === 'replied' ? 'bg-gray-100' : ''
                        }`}
                        style={{
                          fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] text-slate-700">{t.replied}</span>
                          <span 
                            className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-[14px] text-white"
                            style={{ backgroundColor: '#10B981', fontWeight: 600 }}
                          >
                            {repliedCount}
                          </span>
                        </div>
                        {selectedStatus === 'replied' && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: legislationColors.accent }}></div>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedStatus('closed');
                          setIsStatusDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between min-h-[48px] ${
                          selectedStatus === 'closed' ? 'bg-gray-100' : ''
                        }`}
                        style={{
                          fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] text-slate-700">{t.closed}</span>
                          <span 
                            className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-[14px] text-white"
                            style={{ backgroundColor: '#6B7280', fontWeight: 600 }}
                          >
                            {closedCount}
                          </span>
                        </div>
                        {selectedStatus === 'closed' && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: legislationColors.accent }}></div>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Search Input */}
              <div className="flex-1">
                <label 
                  className="block text-[16px] text-slate-700 mb-2"
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
                  <button 
                    className="h-12 px-8 text-white rounded-lg transition-all duration-200 text-[15px] flex items-center gap-2"
                    style={{ 
                      backgroundColor: legislationColors.accent,
                      fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#B8933D';
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = legislationColors.accent;
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Search className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                    {t.search}
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {/* Only show if there are actual user-applied filters (exclude auto-selected department in user view) */}
            {(
              (currentUserRole === 'admin' && selectedDepartment) || 
              searchQuery || 
              selectedStatus
            ) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  className="text-[15px] text-slate-600"
                  style={{ 
                    fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 500
                  }}
                >
                  {t.activeFilters}
                </span>
                {selectedDepartment && currentUserRole === 'admin' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[15px]">
                    <Building2 className="h-3 w-3" />
                    <span style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                      {selectedDepartmentName}
                    </span>
                    <button onClick={() => setSelectedDepartment('')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedStatus && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-[15px]">
                    <Filter className="h-3 w-3" />
                    <span style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                      {selectedStatus === 'new' ? t.newStatus : t.replied}
                    </span>
                    <button onClick={() => setSelectedStatus('')} className="hover:text-green-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[15px]">
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
                  className="text-slate-600 hover:text-slate-900 h-7 px-3 text-[15px]"
                >
                  <X className="h-3 w-3 mr-1" />
                  {t.clearFilters}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Main Content - Legal Opinions Table */}
            <div className={`col-span-12 ${isLanguageChanging ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
              <div className="" style={{ borderRadius: '8px' }}>
                {/* Table Header */}
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4
                      className="text-slate-900 flex items-center gap-2"
                      style={{ 
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontWeight: 600,
                        fontSize: '18px'
                      }}
                    >
                      <MessageSquare className="h-5 w-5" style={{ color: legislationColors.primary }} />
                      {t.legalOpinions}
                      <span className="text-slate-500" style={{ fontWeight: 400, fontSize: '16px' }}>
                        ({filteredOpinions.length} {t.results})
                      </span>
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="h-10 px-4 rounded-lg border-2 border-gray-300 text-slate-600 transition-all duration-200 ease-in-out flex items-center gap-2"
                      style={{
                        fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = legislationColors.primary;
                        e.currentTarget.style.backgroundColor = `${legislationColors.primary}08`;
                        e.currentTarget.style.color = legislationColors.primary;
                        e.currentTarget.style.boxShadow = `0 2px 4px ${legislationColors.primary}40`;
                        const icon = e.currentTarget.querySelector('svg');
                        if (icon) {
                          (icon as HTMLElement).style.color = legislationColors.primary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'rgb(71, 85, 105)';
                        e.currentTarget.style.boxShadow = 'none';
                        const icon = e.currentTarget.querySelector('svg');
                        if (icon) {
                          (icon as HTMLElement).style.color = 'rgb(71, 85, 105)';
                        }
                      }}
                    >
                      <Download className={`h-4 w-4 transition-colors duration-200 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                      {t.export}
                    </button>
                    {currentUserRole === 'user' && (
                      <Button
                        size="sm"
                        onClick={() => setIsAddModalOpen(true)}
                        className="text-white h-10 px-6"
                        style={{ backgroundColor: legislationColors.accent }}
                      >
                        {t.addEnquiry}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Card-Based Layout */}
                {currentOpinions.length > 0 ? (
                  <>
                    <div className="space-y-4 pb-6">
                      {currentOpinions.map((opinion, index) => (
                        <div
                          key={opinion.id}
                          className="bg-white  transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                          style={{
                            borderRadius: '12px',
                            borderInlineStart: '4px solid transparent',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${legislationColors.primary}15`;
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(47, 79, 111, 0.18)';
                            e.currentTarget.style.borderInlineStartColor = legislationColors.accent;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderInlineStartColor = 'transparent';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                          onClick={() => {
                            if (onOpinionSelect) {
                              onOpinionSelect(opinion);
                            }
                          }}
                        >
                          <div className={`px-8 py-6 flex items-start justify-between gap-6 `}>
                            {/* Left Section - Content */}
                            <div className={`flex-1 space-y-3 ${isArabic ? 'text-right' : 'text-left'}`}>
                              <div className="flex items-center gap-4">
                              {/* Title */}
                              
                              <h3
                                className="text-slate-900 leading-snug"
                                style={{
                                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                                  fontSize: `${19 * fontSizeMultiplier}px`,
                                  fontWeight: 700,
                                  lineHeight: '1.4'
                                }}
                              >
                                {isArabic ? opinion.titleAr : opinion.titleEn}
                              </h3>
 {/* Status Badge */}
                                <div>
                                  {getStatusBadge(opinion.status)}
                                </div>
                            </div>
                              {/* Metadata Row */}
                              <div className={`flex items-center gap-6 flex-wrap `}>
                                {/* Date */}
                                <div className={`flex items-center gap-2 `}>
                                  <Calendar 
                                    className="h-4 w-4 text-slate-400" 
                                    style={{ flexShrink: 0 }}
                                  />
                                  <span
                                    className="text-slate-600"
                                    style={{
                                      fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                                      fontSize: `${16 * fontSizeMultiplier}px`,
                                      fontWeight: 400
                                    }}
                                  >
                                    {opinion.date}
                                  </span>
                                </div>

                               
                              </div>

                              {/* Department */}
                              <div className={`flex items-center gap-2 `}>
                                <Building2 
                                  className="h-4 w-4 text-slate-400" 
                                  style={{ flexShrink: 0 }}
                                />
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
                            </div>

                            {/* Right Section - Action Button */}
                            <div className="flex-shrink-0">
                              <button
                                className={`h-11 px-6 rounded-lg text-white flex items-center gap-2 transition-all duration-200 `}
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
                                <span>{isArabic ? 'عرض الرأي' : 'View Opinion'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                        <div className="text-[16px] text-slate-600" style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                          {t.showing} <span className="font-semibold">{startIndex + 1}</span> {t.to} <span className="font-semibold">{Math.min(endIndex, filteredOpinions.length)}</span> {t.of} <span className="font-semibold">{filteredOpinions.length}</span> {t.results}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="h-9 px-4 border-2 border-gray-300 disabled:opacity-50"
                          >
                            <ChevronDown className={`h-4 w-4 ${isArabic ? 'rotate-270' : '-rotate-270'}`} />
                            {isArabic ? t.next : t.previous}
                          </Button>
                          <span className="text-[16px] text-slate-600 px-3" style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                            {currentPage} / {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="h-9 px-4 border-2 border-gray-300 disabled:opacity-50"
                          >
                            {isArabic ? t.previous : t.next}
                            <ChevronDown className={`h-4 w-4 ${isArabic ? '-rotate-90' : 'rotate-90'}`} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="px-6 py-16 text-center">
                    <MessageSquare className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-slate-900 text-lg mb-2" style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
                      {t.noResults}
                    </h3>
                    <p className="text-slate-500" style={{ fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                      {t.noResultsDesc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}