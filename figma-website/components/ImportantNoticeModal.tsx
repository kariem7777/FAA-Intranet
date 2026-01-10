import { useLanguage } from './LanguageContext';
import { AlertCircle, X } from 'lucide-react';

interface ImportantNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportantNoticeModal({
  isOpen,
  onClose,
}: ImportantNoticeModalProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const content = {
    en: {
      noticeTitle: 'Important Notice',
      notice1:
        'It is strictly prohibited to copy, transfer, or capture any content, information, or data from this platform.',
      notice2: 'Access to this platform is restricted to authorized users only.',
      notice3:
        'We appreciate your cooperation and commitment to complying with these regulations.',
      acknowledge: 'Acknowledge',
    },
    ar: {
      noticeTitle: 'إشعار هام',
      notice1:
        'يُمنع منعاً باتاً نسخ أو نقل أو التقاط أي محتوى أو معلومات أو بيانات من هذه المنصة.',
      notice2: 'يقتصر الوصول إلى هذه المنصة على المستخدمين المصرح لهم فقط.',
      notice3:
        'نثمن تعاونكم والتزامكم باللوائح والتعليمات المعتمدة.',
      acknowledge: 'إقرار',
    },
  };

  const t = content[language];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="mx-4 bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-slate-600" />
              </div> */}
              <h2
                className="text-[22px] text-slate-800"
                style={{
                  fontFamily: isArabic
                    ? 'Dubai, Arial, sans-serif'
                    : 'Arial, sans-serif',
                  fontWeight: 700,
                }}
              >
                {t.noticeTitle}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <ul className="space-y-5">
              {[t.notice1, t.notice2, t.notice3].map((text, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span 
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[14px]"
                    style={{
                      backgroundColor: '#D1D5DB',
                      color: '#4B5563',
                      fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {index + 1}
                  </span>
                  <p
                    className="text-slate-700 text-[15px] leading-relaxed flex-1"
                    style={{
                      fontFamily: isArabic
                        ? 'Dubai, Arial, sans-serif'
                        : 'Arial, sans-serif',
                    }}
                  >
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-md bg-slate-800 hover:bg-slate-900 text-white text-[15px] transition"
              style={{
                fontFamily: isArabic
                  ? 'Dubai, Arial, sans-serif'
                  : 'Arial, sans-serif',
                fontWeight: 600,
              }}
            >
              {t.acknowledge}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}