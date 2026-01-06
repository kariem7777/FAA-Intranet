import { useState } from 'react';
import { ArrowLeft, Building2, Calendar, User, CheckCircle2, MessageSquare, ChevronDown, ChevronUp, FileText, Copy } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

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

interface ApprovedOpinionDetailPageProps {
  opinion: ApprovedOpinion;
  onBack: () => void;
  fontSizeMultiplier?: number;
}

export function ApprovedOpinionDetailPage({ 
  opinion, 
  onBack,
  fontSizeMultiplier = 1
}: ApprovedOpinionDetailPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [showConversation, setShowConversation] = useState(false);

  const themeColor = '#2F4F6F';
  const accentColor = '#C9A24D';
  const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';

  const content = {
    en: {
      back: 'Back',
      pageTitle: 'Opinion Details',
      enquiryDetails: 'Enquiry Details',
      title: 'TITLE',
      department: 'DEPARTMENT',
      submissionDate: 'SUBMISSION DATE',
      status: 'STATUS',
      replyDate: 'REPLY DATE',
      repliedBy: 'REPLIED BY',
      enquiry: 'Enquiry',
      finalApprovedOpinion: 'Final Approved Legal Opinion',
      approvedOn: 'APPROVED ON',
      approvedBy: 'APPROVED BY',
      legalOpinionConversation: 'Legal Opinion Conversation',
      messages: 'messages',
      showConversation: 'Show Conversation',
      hideConversation: 'Hide Conversation',
      readMore: 'Read More',
      replied: 'Replied',
      copyOpinion: 'Copy Opinion',
    },
    ar: {
      back: 'رجوع',
      pageTitle: 'تفاصيل الرأي',
      enquiryDetails: 'تفاصيل الاستفسار',
      title: 'العنوان',
      department: 'الجهة',
      submissionDate: 'تاريخ التقديم',
      status: 'الحالة',
      replyDate: 'تاريخ الرد',
      repliedBy: 'الرد من قبل',
      enquiry: 'الاستفسار',
      finalApprovedOpinion: 'الرأي القانوني النهائي المعتمد',
      approvedOn: 'تاريخ الاعتماد',
      approvedBy: 'معتمد من',
      legalOpinionConversation: 'محادثة الرأي القانوني',
      messages: 'رسالة',
      showConversation: 'عرض المحادثة',
      hideConversation: 'إخفاء المحادثة',
      readMore: 'اقرأ المزيد',
      replied: 'تم الرد',
      copyOpinion: 'نسخ الرأي',
    },
  };

  const t = content[language];
  const title = isArabic ? opinion.titleAr : opinion.titleEn;
  const enquiry = isArabic ? opinion.enquiryAr : opinion.enquiryEn;
  const approvedReply = isArabic ? opinion.approvedReplyAr : opinion.approvedReplyEn;

  // Entities list
  const entities = [
    { id: 'rta', nameAr: 'هيئة الطرق والمواصلات', nameEn: 'Roads and Transport Authority' },
    { id: 'dha', nameAr: 'هيئة الصحة', nameEn: 'Health Authority' },
    { id: 'dewa', nameAr: 'هيئة كهرباء ومياه دبي', nameEn: 'Dubai Electricity and Water Authority' },
    { id: 'dld', nameAr: 'دائرة الأراضي والأملاك', nameEn: 'Dubai Land Department' },
    { id: 'ded', nameAr: 'دائرة التنمية الاقتصادية', nameEn: 'Department of Economic Development' },
  ];

  const getDepartmentName = (deptId: string) => {
    const dept = entities.find(e => e.id === deptId);
    return dept ? (isArabic ? dept.nameAr : dept.nameEn) : deptId;
  };

  // Mock conversation messages (the discussion that led to approval)
  const conversationMessages = [
    {
      id: 1,
      sender: 'FAA Legal Team',
      date: 'Jan 20, 2024',
      message: isArabic 
        ? 'بالإشارة إلى استفساركم، وبعد مراجعة القانون رقم 12 لسنة 2020 بشأن العقود وإدارة المستودعات في إمارة دبي، والمادة (85) التي تحدد طرق التصرف بالأصول. الطريقة الأساسية...'
        : 'With reference to your enquiry, after reviewing Law No. 12 of 2020 concerning Contracts and Warehouse Management in the Emirate of Dubai, Article (85) defines asset disposal methods. The primary metho...',
    },
  ];

  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: '#F7F8FA' }}
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
        <div className="max-w-[1400px] mx-auto px-8 py-6">
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

      {/* Main Content - Two Column Layout */}
      <div className="pt-[245px] pb-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT SIDEBAR - Enquiry Details */}
            <div className="col-span-4">
              <div 
                className="bg-white rounded-lg border p-6 sticky"
                style={{ 
                  borderColor: '#E5E7EB',
                  top: '165px',
                }}
              >
                <h3 
                  className="mb-6 pb-4 border-b"
                  style={{ 
                    fontFamily, 
                    fontSize: `${18 * fontSizeMultiplier}px`, 
                    fontWeight: 600,
                    color: '#1E293B',
                    borderColor: '#E5E7EB'
                  }}
                >
                  {t.enquiryDetails}
                </h3>

                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label 
                      className="block mb-2 uppercase tracking-wide"
                      style={{ 
                        fontFamily, 
                        fontSize: `${11 * fontSizeMultiplier}px`, 
                        fontWeight: 600,
                        color: '#64748B',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {t.title}
                    </label>
                    <div 
                      style={{ 
                        fontFamily, 
                        fontSize: `${15 * fontSizeMultiplier}px`,
                        color: '#334155',
                        lineHeight: '1.5'
                      }}
                    >
                      {title}
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label 
                      className="block mb-2 uppercase tracking-wide"
                      style={{ 
                        fontFamily, 
                        fontSize: `${11 * fontSizeMultiplier}px`, 
                        fontWeight: 600,
                        color: '#64748B',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {t.department}
                    </label>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" style={{ color: '#64748B' }} />
                      <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, color: '#334155' }}>
                        {getDepartmentName(opinion.department)}
                      </span>
                    </div>
                  </div>

                  {/* Submission Date */}
                  <div>
                    <label 
                      className="block mb-2 uppercase tracking-wide"
                      style={{ 
                        fontFamily, 
                        fontSize: `${11 * fontSizeMultiplier}px`, 
                        fontWeight: 600,
                        color: '#64748B',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {t.submissionDate}
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" style={{ color: '#64748B' }} />
                      <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, color: '#334155' }}>
                        {opinion.date}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label 
                      className="block mb-2 uppercase tracking-wide"
                      style={{ 
                        fontFamily, 
                        fontSize: `${11 * fontSizeMultiplier}px`, 
                        fontWeight: 600,
                        color: '#64748B',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {t.status}
                    </label>
                    <div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: '#DCFCE7',
                        border: '1px solid #86EFAC',
                      }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                      <span
                        style={{
                          fontFamily,
                          fontSize: `${13 * fontSizeMultiplier}px`,
                          fontWeight: 600,
                          color: '#16A34A',
                        }}
                      >
                        {t.replied}
                      </span>
                    </div>
                  </div>

                  {/* Reply Date */}
                  <div>
                    <label 
                      className="block mb-2 uppercase tracking-wide"
                      style={{ 
                        fontFamily, 
                        fontSize: `${11 * fontSizeMultiplier}px`, 
                        fontWeight: 600,
                        color: '#64748B',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {t.replyDate}
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, color: '#334155' }}>
                        {opinion.approvedDate}
                      </span>
                    </div>
                  </div>

                  {/* Replied By */}
                  <div>
                    <label 
                      className="block mb-2 uppercase tracking-wide"
                      style={{ 
                        fontFamily, 
                        fontSize: `${11 * fontSizeMultiplier}px`, 
                        fontWeight: 600,
                        color: '#64748B',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {t.repliedBy}
                    </label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-green-600" />
                      <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, color: '#334155' }}>
                        {opinion.approvedBy}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - Enquiry, Approved Opinion & Conversation */}
            <div className="col-span-8 space-y-6">
              {/* Enquiry Card */}
              <div className="bg-white rounded-lg border" style={{ borderColor: '#E5E7EB' }}>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5" style={{ color: themeColor }} />
                    <h3 
                      style={{ 
                        fontFamily, 
                        fontSize: `${17 * fontSizeMultiplier}px`, 
                        fontWeight: 600,
                        color: '#1E293B'
                      }}
                    >
                      {t.enquiry}
                    </h3>
                  </div>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ 
                      backgroundColor: '#F8FAFC',
                      fontFamily,
                      fontSize: `${15 * fontSizeMultiplier}px`,
                      color: '#475569',
                      lineHeight: '1.7'
                    }}
                  >
                    {enquiry}
                  </div>
                </div>
              </div>

              {/* Final Approved Opinion Card */}
              <div 
                className="bg-white rounded-lg border-2 shadow-md"
                style={{ 
                  borderColor: '#22C55E',
                }}
              >
                <div 
                  className="px-6 py-4 flex items-center justify-between border-b rounded-t-lg"
                  style={{ 
                    backgroundColor: '#F0FDF4',
                    borderColor: '#86EFAC'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-10 w-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#22C55E' }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <h3 
                      style={{ 
                        fontFamily, 
                        fontSize: `${18 * fontSizeMultiplier}px`, 
                        fontWeight: 700,
                        color: '#15803D'
                      }}
                    >
                      {t.finalApprovedOpinion}
                    </h3>
                  </div>
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-green-100"
                    style={{
                      fontFamily,
                      fontSize: `${14 * fontSizeMultiplier}px`,
                      fontWeight: 500,
                      color: '#15803D',
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(approvedReply);
                    }}
                  >
                    <Copy className="h-4 w-4" />
                    {t.copyOpinion}
                  </button>
                </div>

                <div className="p-6">
                  {/* Opinion Text */}
                  <div 
                    className="p-5 rounded-lg mb-5"
                    style={{ 
                      backgroundColor: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      fontFamily,
                      fontSize: `${16 * fontSizeMultiplier}px`,
                      color: '#166534',
                      lineHeight: '1.8'
                    }}
                  >
                    {approvedReply}
                  </div>

                  {/* Approval Metadata */}
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                    {/* Approved On */}
                    <div>
                      <label 
                        className="block mb-2 uppercase tracking-wide"
                        style={{ 
                          fontFamily, 
                          fontSize: `${11 * fontSizeMultiplier}px`, 
                          fontWeight: 600,
                          color: '#64748B',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {t.approvedOn}
                      </label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, fontWeight: 600, color: '#15803D' }}>
                          {opinion.approvedDate}
                        </span>
                      </div>
                    </div>

                    {/* Approved By */}
                    <div>
                      <label 
                        className="block mb-2 uppercase tracking-wide"
                        style={{ 
                          fontFamily, 
                          fontSize: `${11 * fontSizeMultiplier}px`, 
                          fontWeight: 600,
                          color: '#64748B',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {t.approvedBy}
                      </label>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-600" />
                        <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, fontWeight: 600, color: '#15803D' }}>
                          {opinion.approvedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversation Toggle Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowConversation(!showConversation)}
                  className="flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all hover:shadow-md"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: themeColor,
                    color: themeColor,
                    fontFamily,
                    fontSize: `${15 * fontSizeMultiplier}px`,
                    fontWeight: 600,
                  }}
                >
                  <MessageSquare className="h-5 w-5" />
                  {showConversation ? t.hideConversation : t.showConversation}
                  {showConversation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* Conversation Section (Collapsible) */}
              {showConversation && (
                <div 
                  className="bg-white rounded-lg border"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <div 
                    className="px-6 py-4 border-b flex items-center justify-between"
                    style={{ borderColor: '#E5E7EB' }}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5" style={{ color: themeColor }} />
                      <h3 
                        style={{ 
                          fontFamily, 
                          fontSize: `${17 * fontSizeMultiplier}px`, 
                          fontWeight: 600,
                          color: '#1E293B'
                        }}
                      >
                        {t.legalOpinionConversation}
                      </h3>
                    </div>
                    <span 
                      style={{
                        fontFamily,
                        fontSize: `${14 * fontSizeMultiplier}px`,
                        color: '#64748B',
                      }}
                    >
                      {conversationMessages.length} {t.messages}
                    </span>
                  </div>

                  <div className="p-6">
                    {conversationMessages.map((msg) => (
                      <div 
                        key={msg.id}
                        className="p-5 rounded-lg border"
                        style={{
                          backgroundColor: '#F0FDF4',
                          borderColor: '#BBF7D0',
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div 
                              className="h-8 w-8 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: '#22C55E' }}
                            >
                              <span style={{ color: '#FFFFFF', fontSize: `${14 * fontSizeMultiplier}px`, fontWeight: 600 }}>
                                A
                              </span>
                            </div>
                            <div>
                              <div 
                                style={{ 
                                  fontFamily, 
                                  fontSize: `${15 * fontSizeMultiplier}px`, 
                                  fontWeight: 600,
                                  color: '#15803D'
                                }}
                              >
                                {msg.sender}
                              </div>
                              <div 
                                style={{ 
                                  fontFamily, 
                                  fontSize: `${13 * fontSizeMultiplier}px`,
                                  color: '#64748B'
                                }}
                              >
                                {msg.date}
                              </div>
                            </div>
                          </div>
                          <button
                            className="p-2 rounded-lg hover:bg-green-100 transition-colors"
                            onClick={() => navigator.clipboard.writeText(msg.message)}
                          >
                            <Copy className="h-4 w-4" style={{ color: '#15803D' }} />
                          </button>
                        </div>
                        <div 
                          style={{
                            fontFamily,
                            fontSize: `${15 * fontSizeMultiplier}px`,
                            color: '#166534',
                            lineHeight: '1.7'
                          }}
                        >
                          {msg.message}
                        </div>
                        <button
                          className="mt-3 px-4 py-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: '#DCFCE7',
                            color: '#15803D',
                            fontFamily,
                            fontSize: `${14 * fontSizeMultiplier}px`,
                            fontWeight: 500,
                          }}
                        >
                          {t.readMore}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}