import { Dialog } from './Dialog';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from '@/shared/hooks';

export interface ConfirmationDialogProps {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'info' | 'success' | 'primary';
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

export function ConfirmationDialog({
    title,
    message,
    confirmLabel,
    cancelLabel,
    variant = 'danger',
    onConfirm,
    onCancel,
    isOpen,
}: ConfirmationDialogProps) {
    const { t } = useTranslation();
    if (!isOpen) return null;

    const getConfirmButtonVariant = () => {
        switch (variant) {
            case 'danger':
                return 'danger';
            case 'warning':
                return 'secondary';
            case 'success':
            case 'info':
            case 'primary':
            default:
                return 'primary';
        }
    };

    const getIcon = () => {
        switch (variant) {
            case 'danger':
                return 'error_outline';
            case 'warning':
                return 'warning_amber';
            case 'success':
                return 'check_circle_outline';
            case 'primary':
            case 'info':
            default:
                return 'info_outline';
        }
    };

    const getIconColor = () => {
        switch (variant) {
            case 'danger':
                return 'text-red-600 bg-red-100';
            case 'warning':
                return 'text-amber-600 bg-amber-100';
            case 'success':
                return 'text-green-600 bg-green-100';
            case 'primary':
            case 'info':
            default:
                return 'text-blue-600 bg-blue-100';
        }
    };
    return (
        <Dialog
            title={title}
            onClose={onCancel}
            size="small"
            showCloseButton={false}
            closeOnBackdropClick={false}
            closeOnEscape={true}
        >
            <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${getIconColor()}`}>
                    <span className="material-icons text-3xl!">{getIcon()}</span>
                </div>

                <p className="text-gray-600 mb-8 max-w-sm  mb-2!">
                    {message}
                </p>

                <div className="flex items-center justify-center gap-3 w-full">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        className="flex-1 justify-center" size='small'

                    >
                        {cancelLabel || t('cms.common.cancel')}
                    </Button>
                    <Button
                        variant={getConfirmButtonVariant()}
                        onClick={onConfirm}
                        size='small'
                        className="flex-1 justify-center"
                        autoFocus
                    >
                        {confirmLabel || t('cms.common.confirm')}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
