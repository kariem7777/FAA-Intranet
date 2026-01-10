import { FileText, Clock, Download, ArrowLeft, ExternalLink, Calendar, Building2, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useLanguage } from './LanguageContext';

interface DocumentPreviewPageProps {
  document: any;
  onBack: () => void;
}

export function DocumentPreviewPage({ document, onBack }: DocumentPreviewPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const themeColor = '#A94442';
  const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';

  const content = {
    en: {
      metadata: 'Metadata',
      documentNumber: 'Document Number',
      issueDate: 'Issue Date',
      entity: 'Entity',
      requestedBy: 'Requested by',
      fileSize: 'File Size',
      priority: 'Priority',
      downloadPDF: 'Download PDF',
      viewFullDocument: 'View Full Document',
      documentText: 'Document Content',
      public: 'Public',
      secret: 'Secret',
      back: 'Back',
      digitalSignature: 'Digital Signature',
      signWithUAE: 'Sign with UAE Pass'
    },
    ar: {
      metadata: 'البيانات الوصفية',
      documentNumber: 'رقم المستند',
      issueDate: 'تاريخ الإصدار',
      entity: 'الجهة',
      requestedBy: 'طلب من',
      fileSize: 'حجم الملف',
      priority: 'الأولوية',
      downloadPDF: 'تحميل PDF',
      viewFullDocument: 'عرض المستند الكامل',
      documentText: 'محتوى المستند',
      public: 'عام',
      secret: 'سري',
      back: 'رجوع',
      digitalSignature: 'التوقيع الرقمي',
      signWithUAE: 'التوقيع عبر الهوية الرقمية'
    }
  };

  const t = content[language];

  // Mock PDF URL - in real implementation, this would come from the document object
  const getPdfUrl = () => {
    return 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Breadcrumb Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            style={{
              fontFamily,
              fontSize: '15px'
            }}
          >
            <ArrowLeft className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
            <span>{t.back}</span>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-900">{t.digitalSignature}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-8 mt-[20px]">
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
          {/* Header with Color Strip */}
          <div 
            className="h-2"
            style={{ backgroundColor: themeColor }}
          ></div>
          
          {/* Title Section - Full Width */}
          <div className="px-8 py-6 border-b border-gray-200">
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
              {document.title}
            </h2>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                className="text-white h-11 px-6"
                style={{ backgroundColor: themeColor }}
              >
                <Download className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                {t.downloadPDF}
              </Button>
              <Button 
                variant="outline"
                className="h-11 px-6 border-2"
              >
                <ExternalLink className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                {t.viewFullDocument}
              </Button>
              <Button 
                className="text-white h-11 px-6"
                style={{ backgroundColor: themeColor }}
              >
                {t.signWithUAE}
                <ExternalLink className={`h-4 w-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
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
                    fontFamily: isArabic ? 'Tajawal, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: '18px'
                  }}
                >
                  {t.metadata}
                </h3>

                {/* Metadata Items */}
                <div className="space-y-6">
                  {/* Document Number */}
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-500 mb-1" style={{ fontFamily, fontSize: '13px' }}>
                          {t.documentNumber}
                        </p>
                        <p className="text-slate-900" style={{ fontFamily, fontSize: '16px', fontWeight: 500 }}>
                          {document.type} #{document.id}
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
                          {document.date || document.requestDate}
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
                          {document.department}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Requested By */}
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-500 mb-1" style={{ fontFamily, fontSize: '13px' }}>
                          {t.requestedBy}
                        </p>
                        <p className="text-slate-900" style={{ fontFamily, fontSize: '16px', fontWeight: 500 }}>
                          {document.requester}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* File Size */}
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-500 mb-1" style={{ fontFamily, fontSize: '13px' }}>
                          {t.fileSize}
                        </p>
                        <p className="text-slate-900" style={{ fontFamily, fontSize: '16px', fontWeight: 500 }}>
                          {document.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Priority */}
                  {document.priority && (
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: document.priority === 'High' ? '#FEE2E2' : document.priority === 'Medium' ? '#FEF3C7' : '#E0F2FE'
                          }}
                        >
                          <Clock 
                            className="h-5 w-5"
                            style={{
                              color: document.priority === 'High' ? '#DC2626' : document.priority === 'Medium' ? '#D97706' : '#0284C7'
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-500 mb-1" style={{ fontFamily, fontSize: '13px' }}>
                            {t.priority}
                          </p>
                          <p className="text-slate-900" style={{ fontFamily, fontSize: '16px', fontWeight: 500 }}>
                            {document.priority}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
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
                      fontFamily: isArabic ? 'Tajawal, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
                      fontWeight: 600 
                    }}
                  >
                    <FileText className="h-5 w-5" style={{ color: themeColor }} />
                    {t.documentText}
                  </h3>
                </div>

                {/* Document Content Area */}
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
                  {/* PDF Iframe Viewer */}
                  <iframe
                    src={getPdfUrl()}
                    className="w-full h-[800px]"
                    title={document.title}
                    style={{
                      border: 'none',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Document Footer */}
                <div 
                  className="mt-4 flex items-center justify-between text-sm text-slate-500"
                  style={{ fontFamily }}
                >
                  <p className="mb-0">
                    {isArabic 
                      ? `آخر تحديث: ${document.date || document.requestDate}`
                      : `Last updated: ${document.date || document.requestDate}`}
                  </p>
                  <p className="mb-0">
                    {isArabic ? 'نسخة للمعاينة فقط' : 'Preview version only'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}