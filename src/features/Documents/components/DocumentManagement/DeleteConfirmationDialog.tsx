import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Dialog } from '@/shared/components/Dialog/Dialog';
import { Button } from '@/shared/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteDocument } from '../../slices/documentsManagementSlice';
import type { Document } from '../../types';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document;
}

export function DeleteConfirmationDialog({ isOpen, onClose, document }: DeleteConfirmationDialogProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.documentsManagement);





  const handleDelete = async () => {
    const resultAction = await dispatch(deleteDocument(document.id));
    if (deleteDocument.fulfilled.match(resultAction)) {
      toast.success(t('legislation.documentsManagement.toasts.deleteSuccess'));
      onClose();
    } else {
      toast.error(t('legislation.documentsManagement.toasts.deleteError'));
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog
      onClose={onClose}
      title={t('legislation.documentsManagement.dialogs.delete.title')}
      size="small"
      className={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="space-y-6 px-2 py-4">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="p-4 bg-red-100 rounded-full flex-shrink-0 bg-opacity-70">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <p className="text-gray-700 text-base leading-relaxed max-w-sm">
            {t('legislation.documentsManagement.dialogs.delete.message')}
          </p>
        </div>

        <div className="bg-red-50 border border-red-100 p-4 rounded-lg text-center">
          <span className="text-xs text-red-500 uppercase tracking-wider font-semibold block mb-1">
            {t('legislation.documentsManagement.dialogs.delete.documentLabel')}
          </span>
          <p className="font-bold text-gray-900 text-lg">{i18n.language === 'ar' ? document.documentNameAr : document.documentNameEn}</p>
        </div>

        <div className="flex justify-center gap-4 pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto min-w-[120px]"
          >
            {t('legislation.documentsManagement.dialogs.delete.cancel')}
          </Button>
          <Button
            onClick={handleDelete}
            className="w-full sm:w-auto min-w-[120px] bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all"
            disabled={loading.delete}
          >
            {loading.delete ? t('common.loading') : t('legislation.documentsManagement.dialogs.delete.confirm')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}