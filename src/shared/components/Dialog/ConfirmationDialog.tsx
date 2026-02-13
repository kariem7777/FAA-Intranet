import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Dialog } from './Dialog';
import { CheckCircle, Info, MessageCircleWarning, XCircle } from 'lucide-react';


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
    // "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    const getConfirmButtonVariant = () => {
        switch (variant) {
            case 'danger':
                return 'destructive';
            case 'warning':
                return 'outline';
            case 'success':
            case 'primary':
                return 'default';
            case 'info':
            default:
                return 'ghost';

        }
    };

    const getIcon = () => {
        switch (variant) {
            case 'warning':
                return MessageCircleWarning;
            case 'success':
                return CheckCircle;
            case 'primary':
            case 'info':
                return Info
            default:
                return XCircle
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
    const Icon = getIcon();

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
                    <Icon className={`w-6 h-6  ${getIconColor}`} />
                </div>

                <p className="text-gray-600 mb-8 max-w-sm  mb-2!">
                    {message}
                </p>

                <div className="flex items-center justify-center gap-3 w-full">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        className="flex-1 justify-center" size='sm'

                    >
                        {cancelLabel || t('cms.common.cancel')}
                    </Button>
                    <Button
                        variant={getConfirmButtonVariant()}
                        onClick={onConfirm}
                        size='sm'
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
