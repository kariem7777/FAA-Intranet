import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Building2, MessageSquare, Send, CheckCircle2, Clock, AlertCircle, Home, ChevronRight as BreadcrumbArrow, FileText, Reply, X, XCircle, Copy, Check, CheckCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { RichTextEditor } from './RichTextEditor';

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

interface LegalOpinionDetailPageProps {
  opinion: Opinion;
  onBack: () => void;
  userRole?: 'admin' | 'user';
  onReply?: (opinionId: number, replyText: string) => void;
  onDelete?: (opinionId: number) => void;
  onEdit?: (opinionId: number) => void;
  fontSizeMultiplier?: number;
}

export function LegalOpinionDetailPage({
  opinion,
  onBack,
  userRole = 'user',
  onReply,
  onDelete,
  onEdit,
  fontSizeMultiplier = 1
}: LegalOpinionDetailPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [conversationStatus, setConversationStatus] = useState<Opinion['status']>(opinion.status);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>(opinion.conversation || []);
  const [expandedMessageId, setExpandedMessageId] = useState<number | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const [approvedReplyId, setApprovedReplyId] = useState<number | null>(null);
  const prevLanguageRef = useRef(language);

  // Legislation Platform Theme Colors
  const legislationColors = {
    primary: '#2F4F6F',      // Deep Blue-Gray (legislation primary)
    accent: '#C9A24D',       // Muted Gold
    bgOffWhite: '#F7F8FA',   // Off-White
  };
  const themeColor = legislationColors.primary;

  // Typography - Enhanced readability with modern Arabic font
  const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';

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

  // Translations
  const t = {
    pageTitle: isArabic ? 'تفاصيل الاستفسار' : 'Opinion Details',
    home: isArabic ? 'الرئيسية' : 'Home',
    legalOpinions: isArabic ? 'الآراء القانونية' : 'Legal Opinions',
    opinionDetails: isArabic ? 'تفاصيل الرأي القانوني' : 'Opinion Details',
    enquiryDetails: isArabic ? 'تفاصيل الاستفسار' : 'Enquiry Details',
    title: isArabic ? 'العنوان' : 'Title',
    department: isArabic ? 'الجهة' : 'Department',
    date: isArabic ? 'التاريخ' : 'Date',
    submissionDate: isArabic ? 'تاريخ الإرسال' : 'Submission Date',
    status: isArabic ? 'الحالة' : 'Status',
    enquiryText: isArabic ? 'نص الاستفسار' : 'Enquiry Text',
    enquiry: isArabic ? 'الاستفسار' : 'Enquiry',
    legalReply: isArabic ? 'الرد القانوني' : 'Legal Reply',
    replyText: isArabic ? 'نص الرد' : 'Reply Text',
    noReply: isArabic ? 'لم يتم الرد بعد' : 'No reply yet',
    awaitingReply: isArabic ? 'في انتظار الرد من الجهاز' : 'Awaiting reply from FAA',
    replyBy: isArabic ? 'الرد من قبل' : 'Replied by',
    repliedBy: isArabic ? 'تم الرد من قبل' : 'Replied by',
    replyDate: isArabic ? 'تاريخ الرد' : 'Reply Date',
    newStatus: isArabic ? 'جديد' : 'New',
    pending: isArabic ? 'قيد الانتظار' : 'Pending',
    replied: isArabic ? 'تم الرد' : 'Replied',
    closed: isArabic ? 'مغلق' : 'Closed',
    inProgress: isArabic ? 'قيد المعالجة' : 'In Progress',
    reply: isArabic ? 'الرد' : 'Reply',
    submit: isArabic ? 'إرسال' : 'Submit',
    cancel: isArabic ? 'إلغاء' : 'Cancel',
    back: isArabic ? 'رجوع' : 'Back',
    enterReply: isArabic ? 'أدخل الرد القانوني' : 'Enter legal reply',
    edit: isArabic ? 'تعديل' : 'Edit',
    delete: isArabic ? 'حذف' : 'Delete',
    submittedBy: isArabic ? 'تم الإرسال من قبل' : 'Submitted by',
    replySuccess: isArabic ? 'تم إرسال الرد بنجاح' : 'Reply sent successfully',
    addReply: isArabic ? 'إضافة رد' : 'Add Reply',
    replyTextEn: isArabic ? 'نص الرد (بالإنجليزية)' : 'Reply Text (English)',
    replyTextAr: isArabic ? 'نص الرد (بالعربية)' : 'Reply Text (Arabic)',
    enterReplyEn: isArabic ? 'أدخل الرد القانوني بالإنجليزية' : 'Enter legal reply in English',
    enterReplyAr: isArabic ? 'أدخل الرد القانوني بالعربية' : 'Enter legal reply in Arabic',
    submitConfirmTitle: isArabic ? 'تأكيد الإرسال' : 'Confirm Submission',
    submitConfirmMessage: isArabic ? 'هل أنت متأكد من أنك تريد إرسال هذا الرد؟ لن تتمكن من التراجع عن هذا الإجراء.' : 'Are you sure you want to submit this reply? This action cannot be undone.',
    confirmSubmit: isArabic ? 'تأكيد' : 'Confirm Submit',
    cancelSubmit: isArabic ? 'إلغاء' : 'Cancel',
    closeConversation: isArabic ? 'إغلاق المحادثة' : 'Close Conversation',
    closeConfirmTitle: isArabic ? 'تأكيد الإغلاق' : 'Confirm Close',
    closeConfirmMessage: isArabic ? 'هل أنت متأكد من أنك تريد إغلاق هذه المحادثة؟ لن يتمكن المستخدم من إضافة ردود جديدة.' : 'Are you sure you want to close this conversation? The user will no longer be able to add new replies.',
    conversationClosed: isArabic ? 'تم إغلاق المحادثة بنجاح' : 'Conversation closed successfully',
    readMore: isArabic ? 'اقرأ المزيد' : 'Read More',
    messageDetails: isArabic ? 'تفاصيل الرسالة' : 'Message Details',
    close: isArabic ? 'إغلاق' : 'Close',
    copyMessage: isArabic ? 'نسخ الرسالة' : 'Copy Message',
    messageCopied: isArabic ? 'تم نسخ الرسالة' : 'Message copied',
    approveAsFinalReply: isArabic ? 'اعتماد كرد نهائي' : 'Approve as Final Reply',
    replyApproved: isArabic ? 'تم اعتماد الرد كرد نهائي' : 'Reply approved as final',
    finalReply: isArabic ? 'الرد النهائي المعتمد' : 'Approved Final Reply',
  };

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

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  // Get department name by ID
  const getDepartmentName = (deptId: string) => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? (isArabic ? dept.nameAr : dept.nameEn) : deptId;
  };

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
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.bg} ${config.text} ${config.border}`}
        style={{ fontFamily, fontSize: '15px', fontWeight: 500 }}>
        <StatusIcon className="h-3.5 w-3.5" />
        {config.label}
      </span>
    );
  };

  // Handle reply submission
  const handleReplySubmit = () => {
    if (!replyText || replyText === '<p><br></p>') return;

    // Show confirmation dialog
    setShowSubmitConfirm(true);
  };

  // Confirm and actually submit the reply
  const confirmSubmit = () => {
    // Add new message to conversation history
    const newMessage: ConversationMessage = {
      id: conversationHistory.length + 1,
      sender: userRole,
      messageEn: replyText,
      messageAr: replyText,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      senderName: userRole === 'admin' ? 'FAA Legal Team' : getDepartmentName(opinion.department),
    };

    setConversationHistory([...conversationHistory, newMessage]);
    setReplyText('');
    setIsReplyMode(false);
    setShowSubmitConfirm(false);
    setShowSuccessMessage(true);
    setSuccessMessage(t.replySuccess);

    // Also call the original onReply if provided
    if (onReply) {
      onReply(opinion.id, replyText);
    }
  };

  // Cancel submission
  const cancelSubmit = () => {
    setShowSubmitConfirm(false);
  };

  // Handle close conversation
  const handleCloseConversation = () => {
    setShowCloseConfirm(true);
  };

  // Confirm close conversation
  const confirmCloseConversation = () => {
    setConversationStatus('closed');
    setShowCloseConfirm(false);
    setShowSuccessMessage(true);
    setSuccessMessage(t.conversationClosed);
  };

  // Cancel close conversation
  const cancelCloseConversation = () => {
    setShowCloseConfirm(false);
  };

  // Handle approve reply as final
  const handleApproveReply = (messageId: number) => {
    setApprovedReplyId(messageId);
    setShowSuccessMessage(true);
    setSuccessMessage(t.replyApproved);
  };

  // Check if message is long (more than 300 characters)
  const isLongMessage = (message: ConversationMessage) => {
    const text = isArabic ? message.messageAr : message.messageEn;
    // Strip HTML tags for character count
    const strippedText = text.replace(/<[^>]*>/g, '');
    return strippedText.length > 200;
  };

  // Get truncated message
  const getTruncatedMessage = (message: ConversationMessage) => {
    const text = isArabic ? message.messageAr : message.messageEn;
    const strippedText = text.replace(/<[^>]*>/g, '');
    if (strippedText.length <= 200) return text;

    // Truncate to 300 characters
    return strippedText.substring(0, 200) + '...';
  };

  // Handle copy message
  const handleCopyMessage = async (message: ConversationMessage) => {
    try {
      const text = isArabic ? message.messageAr : message.messageEn;
      // Strip HTML tags before copying
      const strippedText = text.replace(/<[^>]*>/g, '');

      // Fallback copy method using textarea (more compatible)
      const textarea = document.createElement('textarea');
      textarea.value = strippedText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.top = '0';
      textarea.style.left = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        // Try modern clipboard API first
        await navigator.clipboard.writeText(strippedText);
      } catch (clipboardErr) {
        // Fallback to execCommand
        document.execCommand('copy');
      }

      document.body.removeChild(textarea);

      // Show success feedback
      setCopiedMessageId(message.id);
      setTimeout(() => setCopiedMessageId(null), 2000);

      // Optional: Show success message
      setShowSuccessMessage(true);
      setSuccessMessage(t.messageCopied);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  // Get the title and enquiry based on language
  const title = isArabic ? opinion.titleAr : opinion.titleEn;
  const enquiry = isArabic ? opinion.enquiryAr : opinion.enquiryEn;
  const reply = opinion.status === 'replied' ? (isArabic ? opinion.replyAr : opinion.replyEn) : null;

  return (
    <div className="min-h-screen bg-[#f8f9fa]" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-full px-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl px-4 py-3.5 shadow-lg flex items-center gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <p
              className="flex-1 text-green-800 text-sm"
              style={{
                fontFamily,
                fontWeight: 500
              }}
            >
              {successMessage}
            </p>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg p-1.5 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm fixed top-[135px] z-20 w-full">
        {/* Red top border line */}
        <div className="h-1 w-full" style={{ backgroundColor: themeColor }}></div>

        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 h-9 px-3 -ml-3"
              style={{
                fontFamily,
                fontSize: `${18 * fontSizeMultiplier}px`,
                fontWeight: 500
              }}
            >
              <ArrowLeft className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              {t.back}
            </Button>

            <h6
              className="text-slate-900"
              style={{
                fontFamily,
                fontSize: `${20 * fontSizeMultiplier}px`,
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
      <div className={`max-w-[1400px] mx-auto px-6 pt-6 pb-8 mt-[195px] ${isLanguageChanging ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Metadata */}
          <div className="lg:col-span-1 space-y-6">
            {/* Info Card */}
            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-[180px] self-start">
              <div className="p-6 space-y-4">
                <h3
                  className="text-slate-900 pb-3 border-b border-gray-200"
                  style={{ fontFamily, fontSize: '19px', fontWeight: 600 }}
                >
                  {t.enquiryDetails}
                </h3>

                {/* Title */}
                <div>
                  <label className="text-slate-500 mb-1.5 block uppercase tracking-wide" style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, fontWeight: 500 }}>
                    {t.title}
                  </label>
                  <div className="text-slate-700 leading-relaxed" style={{ fontFamily, fontSize: `${17 * fontSizeMultiplier}px` }}>
                    {title}
                  </div>
                </div>

                <Separator />

                {/* Department */}
                <div>
                  <label className="text-slate-500 mb-1.5 block uppercase tracking-wide" style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, fontWeight: 500 }}>
                    {t.department}
                  </label>
                  <div className="flex items-center gap-2 text-slate-700" style={{ fontFamily, fontSize: `${17 * fontSizeMultiplier}px` }}>
                    <Building2 className="h-4 w-4" style={{ color: themeColor }} />
                    <span>{getDepartmentName(opinion.department)}</span>
                  </div>
                </div>

                <Separator />

                {/* Submission Date */}
                <div>
                  <label className="text-slate-500 mb-1.5 block uppercase tracking-wide" style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, fontWeight: 500 }}>
                    {t.submissionDate}
                  </label>
                  <div className="flex items-center gap-2 text-slate-700" style={{ fontFamily, fontSize: `${17 * fontSizeMultiplier}px` }}>
                    <Calendar className="h-4 w-4" style={{ color: themeColor }} />
                    <span>{opinion.date}</span>
                  </div>
                </div>

                <Separator />

                {/* Status */}
                <div>
                  <label className="text-slate-500 mb-1.5 block uppercase tracking-wide" style={{ fontFamily, fontSize: '15px', fontWeight: 500 }}>
                    {t.status}
                  </label>
                  {getStatusBadge(conversationStatus)}
                </div>

                {/* Reply Date - Only show if replied */}
                {opinion.status === 'replied' && opinion.replyDate && (
                  <>
                    <Separator />
                    <div>
                      <label className="text-slate-500 mb-1.5 block uppercase tracking-wide" style={{ fontFamily, fontSize: '15px', fontWeight: 500 }}>
                        {t.replyDate}
                      </label>
                      <div className="flex items-center gap-2 text-slate-700" style={{ fontFamily, fontSize: '17px' }}>
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span>{opinion.replyDate}</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Replied By - Only show if replied */}
                {opinion.status === 'replied' && opinion.replyBy && (
                  <>
                    <Separator />
                    <div>
                      <label className="text-slate-500 mb-1.5 block uppercase tracking-wide" style={{ fontFamily, fontSize: '15px', fontWeight: 500 }}>
                        {t.repliedBy}
                      </label>
                      <div className="flex items-center gap-2 text-slate-700" style={{ fontFamily, fontSize: '17px' }}>
                        <User className="h-4 w-4 text-green-600" />
                        <span>{opinion.replyBy}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enquiry Card */}
            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div
                className="px-6 py-4 border-b border-gray-200"
                style={{ backgroundColor: '#fafafa' }}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" style={{ color: themeColor }} />
                  <h3 className="text-slate-900" style={{ fontFamily, fontSize: '19px', fontWeight: 600 }}>
                    {t.enquiry}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <p
                    className="text-slate-700 leading-relaxed whitespace-pre-wrap"
                    style={{ fontFamily, fontSize: '17px', lineHeight: '1.8' }}
                  >
                    {enquiry}
                  </p>
                </div>
              </div>
            </Card>

            {/* Conversation Thread - Show if there are any replies */}
            {conversationHistory.length > 0 && (
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div
                  className="px-6 py-4 border-b border-gray-200"
                  style={{ backgroundColor: '#fafafa' }}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" style={{ color: themeColor }} />
                    <h3 className="text-slate-900" style={{ fontFamily, fontSize: '19px', fontWeight: 600 }}>
                      {isArabic ? 'محادثة الرأي القانوني' : 'Legal Opinion Conversation'}
                    </h3>
                    <span className="ml-auto text-slate-500" style={{ fontFamily, fontSize: '16px' }}>
                      {conversationHistory.length} {isArabic ? 'رسالة' : 'messages'}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                  {conversationHistory.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'admin' ? (isArabic ? 'justify-start' : 'justify-end') : (isArabic ? 'justify-end' : 'justify-start')}`}
                    >
                      <div
                        className={`relative max-w-[80%] rounded-lg p-4 ${message.sender === 'admin'
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-blue-50 border border-blue-200'
                          }`}
                      >
                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopyMessage(message)}
                          title={t.copyMessage}
                          className={`absolute ${isArabic ? 'left-2' : 'right-2'} top-2 p-1.5 rounded-md transition-all duration-200 hover:bg-white/50 group`}
                          style={{
                            color: message.sender === 'admin' ? '#15803D' : '#1D4ED8'
                          }}
                        >
                          {copiedMessageId === message.id ? (
                            <Check
                              className="h-4 w-4 text-green-600"
                              style={{ strokeWidth: 2.5 }}
                            />
                          ) : (
                            <Copy
                              className="h-4 w-4 opacity-60 group-hover:opacity-100"
                              style={{ strokeWidth: 2 }}
                            />
                          )}
                        </button>

                        {/* Message Header */}
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'admin' ? 'bg-green-100' : 'bg-blue-100'
                              }`}
                          >
                            <User
                              className={`h-4 w-4 ${message.sender === 'admin' ? 'text-green-700' : 'text-blue-700'
                                }`}
                            />
                          </div>
                          <div className="flex-1">
                            <p
                              className={`text-sm ${message.sender === 'admin' ? 'text-green-800' : 'text-blue-800'
                                }`}
                              style={{
                                fontFamily,
                                fontSize: '16px',
                                fontWeight: 600
                              }}
                            >
                              {message.senderName}
                            </p>
                            <p
                              className="text-slate-500"
                              style={{ fontFamily, fontSize: '14px' }}
                            >
                              {message.date}
                            </p>
                          </div>
                        </div>

                        {/* Message Content */}
                        <div
                          className={`text-slate-700 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
                          style={{
                            fontFamily,
                            fontSize: '17px',
                            lineHeight: '1.8'
                          }}
                        >
                          {isLongMessage(message) ? (
                            <>
                              asdas
                              <div dangerouslySetInnerHTML={{ __html: getTruncatedMessage(message) }} />
                              <button
                                onClick={() => setExpandedMessageId(message.id)}
                                className={`mt-2 hover:underline transition-colors block ${isArabic ? 'text-right' : 'text-left'}`}
                                style={{ fontFamily, fontSize: '16px', fontWeight: 500, direction: isArabic ? 'rtl' : 'ltr', color: legislationColors.primary }}
                                onMouseEnter={(e) => e.currentTarget.style.color = legislationColors.accent}
                                onMouseLeave={(e) => e.currentTarget.style.color = legislationColors.primary}
                              >
                                {t.readMore}
                              </button>
                            </>
                          ) : (
                            < div dangerouslySetInnerHTML={{ __html: isArabic ? message.messageAr : message.messageEn }} />
                          )}
                        </div>

                        {/* Approve as Final Reply Button - Only show for admin on FAA messages */}
                        {message.sender === 'admin' && userRole === 'admin' && (
                          <div className="mt-3 pt-3 border-t border-green-100">
                            {approvedReplyId === message.id ? (
                              <div className="flex items-center gap-2 text-green-700">
                                <CheckCheck className="h-4 w-4" style={{ strokeWidth: 2.5 }} />
                                <span
                                  style={{
                                    fontFamily,
                                    fontSize: '15px',
                                    fontWeight: 600
                                  }}
                                >
                                  {t.finalReply}
                                </span>
                              </div>
                            ) : (
                              // Only show button if no other reply is approved
                              approvedReplyId === null && (
                                <Button
                                  onClick={() => handleApproveReply(message.id)}
                                  variant="outline"
                                  className="border-green-500 text-green-700 hover:bg-green-50 h-9 px-4 rounded-lg gap-2"
                                  style={{
                                    fontFamily,
                                    fontSize: '15px',
                                    fontWeight: 500
                                  }}
                                >
                                  <CheckCheck className="h-4 w-4" />
                                  <span>{t.approveAsFinalReply}</span>
                                </Button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Reply Button - Always show for both admin and user if conversation has started OR admin can start */}
            {!isReplyMode && conversationStatus !== 'closed' && (conversationHistory.length > 0 || userRole === 'admin') && (
              <div className="flex justify-start gap-3">
                <Button
                  onClick={() => setIsReplyMode(true)}
                  className="text-white hover:opacity-90 h-11 px-6 rounded-lg gap-2"
                  style={{
                    backgroundColor: themeColor,
                    fontFamily,
                    fontSize: '17px',
                    fontWeight: 500
                  }}
                >
                  <Reply className="h-4 w-4" />
                  <span>{t.addReply}</span>
                </Button>

                {/* Close Conversation Button - Admin Only */}
                {userRole === 'admin' && conversationHistory.length > 0 && (
                  <Button
                    onClick={handleCloseConversation}
                    className="bg-gray-600 text-white hover:bg-gray-700 h-11 px-6 rounded-lg gap-2"
                    style={{
                      fontFamily,
                      fontSize: '17px',
                      fontWeight: 500
                    }}
                  >
                    <XCircle className="h-4 w-4" />
                    <span>{t.closeConversation}</span>
                  </Button>
                )}
              </div>
            )}

            {/* No Conversation Yet - Show if no messages and user is not admin */}
            {conversationHistory.length === 0 && userRole !== 'admin' && !isReplyMode && (
              <Card className="bg-white rounded-xl shadow-sm border-2 border-yellow-200 overflow-hidden">
                <div className="p-6">
                  <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200 flex items-center gap-3">
                    <Clock className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-800" style={{ fontFamily, fontSize: '18px', fontWeight: 600 }}>
                        {t.awaitingReply}
                      </p>
                      <p className="text-yellow-700 mt-1" style={{ fontFamily, fontSize: '16px' }}>
                        {t.noReply}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Reply Form - Both admin and user can reply */}
            {isReplyMode && (
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div
                  className="px-6 py-4 border-b border-gray-200"
                  style={{ backgroundColor: '#fafafa' }}
                >
                  <div className="flex items-center gap-2">
                    <Send className="h-5 w-5" style={{ color: themeColor }} />
                    <h3 className="text-slate-900" style={{ fontFamily, fontSize: '19px', fontWeight: 600 }}>
                      {t.reply}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-slate-700 mb-2 block" style={{ fontFamily, fontSize: '16px', fontWeight: 500 }}>
                      {t.replyText}
                    </label>
                    <RichTextEditor
                      value={replyText}
                      onChange={(value) => setReplyText(value)}
                      placeholder={t.enterReply}
                      isArabic={isArabic}
                      themeColor={themeColor}
                      minHeight="200px"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setIsReplyMode(false);
                        setReplyText('');
                      }}
                      className="flex-1 h-11 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg"
                      style={{ fontFamily, fontSize: '17px', fontWeight: 500 }}
                    >
                      {t.cancel}
                    </Button>
                    <Button
                      onClick={handleReplySubmit}
                      disabled={!replyText || replyText === '<p><br></p>'}
                      className="flex-1 h-11 text-white hover:opacity-90 rounded-lg disabled:opacity-50 gap-2"
                      style={{
                        backgroundColor: themeColor,
                        fontFamily,
                        fontSize: '17px',
                        fontWeight: 500
                      }}
                    >
                      <Send className="h-4 w-4" />
                      {t.submit}
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Confirmation Dialog */}
            {showSubmitConfirm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={cancelSubmit}>
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {/* Header */}
                  <div className="px-6 py-5" style={{ backgroundColor: legislationColors.primary }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-white" />
                      </div>
                      <h3
                        className="text-white text-lg mb-0"
                        style={{
                          fontFamily,
                          fontSize: '21px',
                          fontWeight: 600
                        }}
                      >
                        {t.submitConfirmTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 py-6">
                    <p
                      className={`text-gray-700 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
                      style={{ fontFamily, fontSize: '18px' }}
                    >
                      {t.submitConfirmMessage}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Button
                      variant="outline"
                      onClick={cancelSubmit}
                      className="flex-1 h-11 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all"
                      style={{ fontFamily, fontSize: '17px' }}
                    >
                      {t.cancelSubmit}
                    </Button>
                    <Button
                      onClick={confirmSubmit}
                      className="flex-1 h-11 text-white border-0 shadow-md hover:shadow-lg transition-all"
                      style={{
                        backgroundColor: legislationColors.primary,
                        fontFamily,
                        fontSize: '17px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#253D54'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = legislationColors.primary}
                    >
                      <Send className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                      {t.confirmSubmit}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Close Conversation Confirmation Dialog */}
            {showCloseConfirm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={cancelCloseConversation}>
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {/* Header */}
                  <div className="px-6 py-5" style={{ backgroundColor: legislationColors.primary }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-white" />
                      </div>
                      <h3
                        className="text-white text-lg mb-0"
                        style={{
                          fontFamily,
                          fontSize: '21px',
                          fontWeight: 600
                        }}
                      >
                        {t.closeConfirmTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 py-6">
                    <p
                      className={`text-gray-700 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
                      style={{ fontFamily, fontSize: '18px' }}
                    >
                      {t.closeConfirmMessage}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Button
                      variant="outline"
                      onClick={cancelCloseConversation}
                      className="flex-1 h-11 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all"
                      style={{ fontFamily, fontSize: '17px' }}
                    >
                      {t.cancelSubmit}
                    </Button>
                    <Button
                      onClick={confirmCloseConversation}
                      className="flex-1 h-11 text-white border-0 shadow-md hover:shadow-lg transition-all"
                      style={{
                        backgroundColor: legislationColors.primary,
                        fontFamily,
                        fontSize: '17px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#253D54'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = legislationColors.primary}
                    >
                      <Send className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                      {t.confirmSubmit}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Message Details Popup */}
            {expandedMessageId !== null && (() => {
              const message = conversationHistory.find(m => m.id === expandedMessageId);
              if (!message) return null;

              return (
                <div
                  className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)'
                  }}
                  onClick={() => setExpandedMessageId(null)}
                >
                  <div
                    className="bg-white overflow-hidden flex flex-col"
                    style={{
                      width: '660px',
                      maxWidth: '100%',
                      borderRadius: '16px',
                      boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
                      maxHeight: '90vh',
                      animation: 'modalEntrance 200ms ease-out'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header Section */}
                    <div
                      className="relative"
                      style={{
                        backgroundColor: '#F8F9FA',
                        padding: '24px',
                        borderRadius: '16px 16px 0 0'
                      }}
                    >
                      {/* Sender Info */}
                      <div className={`flex items-start ${isArabic ? 'gap-3' : 'gap-3'}`}>
                        {/* Avatar */}
                        <div
                          className="flex-shrink-0 rounded-full flex items-center justify-center"
                          style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: `${legislationColors.primary}15`
                          }}
                        >
                          <Building2 style={{ width: '24px', height: '24px', color: legislationColors.primary }} />
                        </div>

                        {/* Name and Date */}
                        <div className="flex-1">
                          <h3
                            style={{
                              fontFamily,
                              fontSize: '18px',
                              fontWeight: 600,
                              color: '#111827',
                              marginBottom: '4px',
                              direction: isArabic ? 'rtl' : 'ltr',
                              textAlign: isArabic ? 'right' : 'left'
                            }}
                          >
                            {message.senderName}
                          </h3>
                          <p
                            style={{
                              fontFamily,
                              fontSize: '14px',
                              fontWeight: 400,
                              color: '#6B7280',
                              direction: isArabic ? 'rtl' : 'ltr',
                              textAlign: isArabic ? 'right' : 'left'
                            }}
                          >
                            {message.date}
                          </p>
                        </div>

                        {/* Close Button */}
                        <button
                          onClick={() => setExpandedMessageId(null)}
                          className="flex-shrink-0 rounded-full transition-all duration-150"
                          style={{
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                            color: '#6B7280'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#E5E7EB';
                            e.currentTarget.style.color = '#111827';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#6B7280';
                          }}
                          aria-label="Close"
                        >
                          <X style={{ width: '20px', height: '20px' }} />
                        </button>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', backgroundColor: '#E5E7EB' }}></div>

                    {/* Content Section */}
                    <div
                      className="overflow-y-auto"
                      style={{
                        padding: '24px',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      {/* Message Card */}
                      <div
                        style={{
                          backgroundColor: '#F8F9FA',
                          padding: '20px',
                          borderRadius: '12px',
                          ...(isArabic
                            ? { borderRight: `4px solid ${legislationColors.accent}` }
                            : { borderLeft: `4px solid ${legislationColors.accent}` }
                          )
                        }}
                      >
                        <div
                          className={isArabic ? 'text-right' : 'text-left'}
                          style={{
                            fontFamily,
                            fontSize: '17px',
                            lineHeight: '1.7',
                            fontWeight: 400,
                            color: '#374151',
                            direction: isArabic ? 'rtl' : 'ltr'
                          }}
                          dangerouslySetInnerHTML={{
                            __html: isArabic ? message.messageAr : message.messageEn
                          }}
                        />
                      </div>
                    </div>

                    {/* Footer Section */}
                    <div
                      className={`flex ${isArabic ? 'justify-start' : 'justify-end'}`}
                      style={{
                        backgroundColor: '#FFFFFF',
                        padding: '20px 24px 24px 24px',
                        borderRadius: '0 0 16px 16px'
                      }}
                    >
                      <button
                        onClick={() => setExpandedMessageId(null)}
                        className="transition-all duration-150"
                        style={{
                          minWidth: '100px',
                          height: '44px',
                          padding: '0 24px',
                          backgroundColor: legislationColors.primary,
                          color: '#FFFFFF',
                          borderRadius: '8px',
                          fontFamily,
                          fontSize: '15px',
                          fontWeight: 500,
                          border: 'none',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#253D54';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = legislationColors.primary;
                        }}
                      >
                        {t.close}
                      </button>
                    </div>
                  </div>

                  {/* Add CSS animation */}
                  <style>{`
                    @keyframes modalEntrance {
                      from {
                        transform: scale(0.95);
                        opacity: 0;
                      }
                      to {
                        transform: scale(1);
                        opacity: 1;
                      }
                    }
                  `}</style>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}