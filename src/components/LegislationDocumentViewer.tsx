import { useState } from 'react';
import { ArrowLeft, Download, ExternalLink, FileText, Calendar, Building2, User, Hash, Shield } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface LegislationDocumentViewerProps {
  document: any;
  onBack: () => void;
  fontSizeMultiplier?: number;
}

export function LegislationDocumentViewer({ document, onBack, fontSizeMultiplier = 1 }: LegislationDocumentViewerProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [isLoading, setIsLoading] = useState(true);

  // Color palette
  const colors = {
    primary: '#0F2A44',      // Deep Navy
    accent: '#C9A24D',       // Muted Gold
    bgOffWhite: '#F7F8FA',   // Off-White
    bgWhite: '#FFFFFF',      // White
    textPrimary: '#1A1A1A',  // Primary Text
    textSecondary: '#5A5A5A', // Secondary Text
  };

  // Get PDF URL with Google Docs Viewer to handle CORS
  const getPdfUrl = () => {
    // Real Dubai government legislation PDF - مرسوم رقم (52) لسنة 2025 بشأن إنشاء منطقة حرة في إمارة دبي
    const pdfUrl = 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf';
    
    // Use Google Docs Viewer to handle CORS restrictions and display the PDF
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  };

  const documentUrl = getPdfUrl();

  const handleOpenInNewTab = () => {
    window.open(documentUrl, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = `${document.referenceNumber}.pdf`;
    link.click();
  };

  // Classification badge component
  const ClassificationBadge = ({ classification }: { classification: 'public' | 'secret' }) => {
    const classificationConfig = {
      public: {
        bg: '#E8F5E9',
        text: '#2F7D32',
        label: isArabic ? 'عام' : 'Public',
      },
      secret: {
        bg: '#FFEBEE',
        text: '#9B1C1C',
        label: isArabic ? 'سري' : 'Secret',
      },
    };

    const config = classificationConfig[classification];

    return (
      <span
        className="px-3 py-1.5 rounded-full text-sm inline-flex items-center gap-2"
        style={{
          backgroundColor: config.bg,
          color: config.text,
          fontFamily: 'Dubai, Arial, sans-serif',
          fontWeight: 600,
          fontSize: '13px',
        }}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: colors.bgOffWhite,
        marginTop: '232px', // 92px header + 40px back button + 60px spacing
      }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Back Button Section - Fixed */}
      <div
        className="fixed top-[144px] left-0 right-0 border-b z-30"
        style={{
          backgroundColor: colors.bgWhite,
          borderColor: '#E5E7EB',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-gray-100"
            style={{
              fontFamily: 'Dubai, Arial, sans-serif',
              fontSize: `${15 * fontSizeMultiplier}px`,
              fontWeight: 600,
              color: colors.primary,
            }}
          >
            <ArrowLeft className="w-5 h-5" style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} />
            {isArabic ? 'العودة إلى القائمة' : 'Back to List'}
          </button>
        </div>
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="max-w-[1400px] mx-auto px-6 pb-6">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT SIDEBAR - Document Details */}
          <div className="col-span-4">
            <div
              className="rounded-lg border p-6 sticky top-[219px]"
              style={{
                backgroundColor: colors.bgWhite,
                borderColor: '#E5E7EB',
                maxHeight: 'calc(100vh - 160px)',
                overflowY: 'auto',
              }}
            >
              {/* Document Title */}
              <h1
                className="mb-6"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: `${28 * fontSizeMultiplier}px`,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  lineHeight: 1.3,
                }}
              >
                {isArabic ? document.titleAr : document.title}
              </h1>

              {/* Divider */}
              <div className="h-px mb-6" style={{ backgroundColor: '#E5E7EB' }} />

              {/* Document Metadata */}
              <div className="space-y-5 mb-8">
                {/* Reference Number */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg mt-1"
                    style={{
                      backgroundColor: colors.bgOffWhite,
                    }}
                  >
                    <Hash className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <div className="flex-1">
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: `${13 * fontSizeMultiplier}px`,
                        fontWeight: 600,
                        color: colors.textSecondary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {isArabic ? 'الرقم المرجعي' : 'Reference Number'}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: `${16 * fontSizeMultiplier}px`,
                        fontWeight: 600,
                        color: colors.textPrimary,
                      }}
                    >
                      {document.referenceNumber}
                    </p>
                  </div>
                </div>

                {/* Entity */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg mt-1"
                    style={{
                      backgroundColor: colors.bgOffWhite,
                    }}
                  >
                    <Building2 className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <div className="flex-1">
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: colors.textSecondary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {isArabic ? 'الجهة' : 'Entity'}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: colors.textPrimary,
                      }}
                    >
                      {isArabic ? document.entityNameAr : document.entityName}
                    </p>
                  </div>
                </div>

                {/* Issue Date */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg mt-1"
                    style={{
                      backgroundColor: colors.bgOffWhite,
                    }}
                  >
                    <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <div className="flex-1">
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: colors.textSecondary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {isArabic ? 'تاريخ الإصدار' : 'Issue Date'}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: colors.textPrimary,
                      }}
                    >
                      {new Date(document.issueDate).toLocaleDateString(isArabic ? 'ar-AE' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Year */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg mt-1"
                    style={{
                      backgroundColor: colors.bgOffWhite,
                    }}
                  >
                    <FileText className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <div className="flex-1">
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: colors.textSecondary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {isArabic ? 'السنة' : 'Year'}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: colors.textPrimary,
                      }}
                    >
                      {document.year}
                    </p>
                  </div>
                </div>

                {/* Classification */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg mt-1"
                    style={{
                      backgroundColor: colors.bgOffWhite,
                    }}
                  >
                    <Shield className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <div className="flex-1">
                    <p
                      className="mb-2"
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: colors.textSecondary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {isArabic ? 'التصنيف' : 'Classification'}
                    </p>
                    <ClassificationBadge classification={document.classification} />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px mb-6" style={{ backgroundColor: '#E5E7EB' }} />

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleOpenInNewTab}
                  className="w-full px-6 py-3.5 rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: colors.accent,
                    color: '#FFFFFF',
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                  }}
                >
                  <ExternalLink className="w-5 h-5" />
                  {isArabic ? 'فتح في نافذة جديدة' : 'Open in New Tab'}
                </button>

                <button
                  onClick={handleDownload}
                  className="w-full px-6 py-3.5 rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: colors.primary,
                    color: '#FFFFFF',
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                  }}
                >
                  <Download className="w-5 h-5" />
                  {isArabic ? 'تحميل الوثيقة' : 'Download Document'}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Document Preview */}
          <div className="col-span-8">
            <div
              className="rounded-lg overflow-hidden border relative"
              style={{
                backgroundColor: colors.bgWhite,
                borderColor: '#E5E7EB',
                height: 'calc(100vh - 140px)',
              }}
            >
              {/* Loading Overlay */}
              {isLoading && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  style={{
                    backgroundColor: colors.bgWhite,
                  }}
                >
                  <div className="text-center">
                    <div
                      className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
                      style={{
                        borderColor: colors.accent,
                        borderTopColor: 'transparent',
                      }}
                    />
                    <p
                      style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: '15px',
                        color: colors.textSecondary,
                      }}
                    >
                      {isArabic ? 'جاري تحميل الوثيقة...' : 'Loading document...'}
                    </p>
                  </div>
                </div>
              )}

              {/* PDF Iframe */}
              <iframe
                src={documentUrl}
                className="w-full h-full"
                title={isArabic ? document.titleAr : document.title}
                onLoad={() => setIsLoading(false)}
                style={{
                  border: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}