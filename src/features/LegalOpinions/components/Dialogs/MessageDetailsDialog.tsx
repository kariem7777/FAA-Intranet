import { Dialog } from '@/shared/components/Dialog';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { EnquiryReply } from '../../types';
import { Building2, X } from 'lucide-react';
import { QuillViewer } from '@/shared/components/QuillViewer';

interface MessageDetailsDialogProps {
    message: EnquiryReply;
    senderName: string;
    onClose: () => void;
}

export function MessageDetailsDialog({ message, senderName, onClose }: MessageDetailsDialogProps) {
    const { t, isRTL } = useTranslation();

    return (
        <Dialog
            onClose={onClose}
            size="large"
            className="rounded-2xl overflow-hidden"
            showCloseIcon={false}
        >
            <div className="flex flex-col">
                {/* Header - Custom styled per user design instead of default Dialog title */}
                <div className="bg-gray-50 p-6 -mx-6 -mt-4 mb-4 border-b border-gray-200">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[#908e81]/10">
                            <Building2 className="w-6 h-6 text-[var(--color-legislation-primary)]" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {senderName}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {new Date(message.createdOnUtc).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', {
                                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="py-2">
                    <div
                        className={`bg-gray-50 p-5 rounded-xl ${isRTL ? 'border-r-4' : 'border-l-4'} overflow-y-auto max-h-[60vh]`}
                        style={{ borderColor: 'var(--color-legislation-accent)' }}
                    >
                        <QuillViewer html={message.content} isLineClamp={false} />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 mt-2">
                    <button
                        onClick={onClose}
                        className="h-11 px-6 rounded-lg text-white font-medium text-[15px] transition-colors hover:bg-[#253D54]"
                        style={{ backgroundColor: 'var(--color-legislation-primary)' }}
                    >
                        {t('common.close')}
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
