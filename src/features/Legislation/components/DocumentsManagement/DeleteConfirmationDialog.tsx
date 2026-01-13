import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Dialog } from '@/shared/components/Dialog/Dialog';
import { Button } from '@/shared/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteDocument } from '../../slices/documentsManagementSlice';
import { type DocumentDto } from '../../services/DocumentsService';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentDto;
}

export function DeleteConfirmationDialog({ isOpen, onClose, document }: DeleteConfirmationDialogProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.documentsManagement);



  const isArabic = i18n.language === 'ar';
  const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';

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
      className={isArabic ? 'rtl' : 'ltr'}
    >
      <div dir={isArabic ? 'rtl' : 'ltr'} style={{ fontFamily }} className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-100 rounded-full flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-gray-600">
              {t('legislation.documentsManagement.dialogs.delete.message')}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
            {t('legislation.documentsManagement.dialogs.delete.documentLabel')}
          </span>
          <p className="font-medium text-gray-900 mt-1">{document.title}</p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            style={{ fontFamily }}
          >
            {t('legislation.documentsManagement.dialogs.delete.cancel')}
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={loading.delete}
            style={{ fontFamily }}
          >
            {loading.delete ? t('common.loading') : t('legislation.documentsManagement.dialogs.delete.confirm')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}