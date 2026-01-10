import { AlertCircle, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface DeleteConfirmationDialogProps {
  isOpen?: boolean;
  document: any;
  onDelete: () => void;
  onCancel: () => void;
}

export function DeleteConfirmationDialog({ 
  isOpen = true,
  document, 
  onDelete, 
  onCancel 
}: DeleteConfirmationDialogProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const fontFamily = isArabic 
    ? 'Dubai, Arial, sans-serif' 
    : 'Inter, system-ui, sans-serif';

  const content = {
    en: {
      title: 'Delete Document',
      message: 'Are you sure you want to delete this document? This action cannot be undone.',
      documentLabel: 'Document',
      confirmButton: 'Delete',
      cancelButton: 'Cancel',
    },
    ar: {
      title: 'حذف الوثيقة',
      message: 'هل أنت متأكد من رغبتك في حذف هذه الوثيقة؟ لا يمكن التراجع عن هذا الإجراء.',
      documentLabel: 'الوثيقة',
      confirmButton: 'حذف',
      cancelButton: 'إلغاء',
    },
  };

  const t = content[language];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onCancel}
    >
      <div 
        className="bg-white shadow-2xl max-w-md w-full animate-fadeIn"
        style={{ 
          borderRadius: '12px',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FEE2E2' }}
            >
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <h2 
              className="text-[20px] text-[#1D293D]"
              style={{ fontFamily, fontWeight: 700 }}
            >
              {t.title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          <p 
            className="text-[16px] text-gray-600"
            style={{ fontFamily }}
          >
            {t.message}
          </p>
          
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: '#F9FAFB' }}
          >
            <p 
              className="text-[14px] text-gray-500 mb-1"
              style={{ fontFamily }}
            >
              {t.documentLabel}:
            </p>
            <p 
              className="text-[16px] text-[#1D293D]"
              style={{ fontFamily, fontWeight: 600 }}
            >
              {document.title}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div 
          className="flex gap-3 px-6 py-4 border-t border-gray-200"
          style={{ 
            flexDirection: isArabic ? 'row-reverse' : 'row',
            justifyContent: 'flex-end' 
          }}
        >
          <button
            onClick={onCancel}
            style={{ fontFamily, fontWeight: 600 }}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {t.cancelButton}
          </button>
          <button
            onClick={onDelete}
            style={{ 
              fontFamily, 
              fontWeight: 600,
              backgroundColor: '#DC2626'
            }}
            className="px-6 py-2.5 rounded-lg text-white hover:bg-red-700 transition-colors"
          >
            {t.confirmButton}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}