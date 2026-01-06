import { X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface NavigationConfirmDialogProps {
  isOpen: boolean;
  direction: 'to-legislation' | 'to-intranet';
  onConfirm: () => void;
  onCancel: () => void;
}

export function NavigationConfirmDialog({
  isOpen,
  direction,
  onConfirm,
  onCancel,
}: NavigationConfirmDialogProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  if (!isOpen) return null;

  // ✅ Neutral government-safe theme
  const theme = {
    primary: '#334155',
    secondary: '#475569',
    border: '#CBD5E1',
    background: '#F8FAFC',
  };

  const translations = {
    en: {
      toLegislation: {
        title: 'Navigate to Legislation Platform?',
        message:
          'You are about to leave the FAA Intranet and enter the Legislation Platform. Do you want to continue?',
        confirm: 'Continue',
        cancel: 'Stay on Intranet',
      },
      toIntranet: {
        title: 'Return to FAA Intranet?',
        message:
          'You are about to leave the Legislation Platform and return to the FAA Intranet. Do you want to continue?',
        confirm: 'Return to Intranet',
        cancel: 'Stay on Legislation',
      },
    },
    ar: {
      toLegislation: {
        title: 'الانتقال إلى منصة التشريعات؟',
        message:
          'أنت على وشك مغادرة شبكة هيئة التدقيق المالي والدخول إلى منصة التشريعات. هل تريد المتابعة؟',
        confirm: 'متابعة',
        cancel: 'البقاء في الشبكة',
      },
      toIntranet: {
        title: 'العودة إلى شبكة هيئة التدقيق المالي؟',
        message:
          'أنت على وشك مغادرة منصة التشريعات والعودة إلى شبكة هيئة التدقيق المالي. هل تريد المتابعة؟',
        confirm: 'العودة إلى الشبكة',
        cancel: 'البقاء في التشريعات',
      },
    },
  };

  const t =
    translations[language][
      direction === 'to-legislation' ? 'toLegislation' : 'toIntranet'
    ];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{
          fontFamily: isArabic ? 'Dubai, sans-serif' : 'Inter, system-ui',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{
            backgroundColor: theme.background,
            borderColor: theme.border,
          }}
        >
          <h3
            className="text-[18px] font-semibold"
            style={{ color: theme.primary }}
          >
            {t.title}
          </h3>
          <button
            onClick={onCancel}
            className="text-[#64748B] hover:text-[#334155] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <p
            className={`leading-relaxed ${
              isArabic ? 'text-right' : ''
            }`}
            style={{
              fontSize: '15px',
              color: '#475569',
            }}
          >
            {t.message}
          </p>
        </div>

        {/* Actions */}
        <div
          className={`px-6 py-4 bg-[#F8FAFC] border-t flex gap-3 ${
            isArabic ? 'flex-row-reverse' : ''
          }`}
          style={{ borderColor: theme.border }}
        >
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-lg text-white text-[14px] font-semibold transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: theme.primary }}
          >
            {t.confirm}
          </button>

          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-lg border text-[14px] font-semibold transition-all duration-200 hover:bg-[#E2E8F0]"
            style={{
              borderColor: theme.primary,
              color: theme.primary,
            }}
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
