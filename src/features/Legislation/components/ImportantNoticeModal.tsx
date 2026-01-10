import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ImportantNoticeModalProps {
    onClose: () => void;
}

export const ImportantNoticeModal = ({ onClose }: ImportantNoticeModalProps) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
                dir={isRTL ? 'rtl' : 'ltr'}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-4 bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2
                                className="text-[22px] text-slate-800"
                                style={{
                                    fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                                    fontWeight: 700,
                                }}
                            >
                                {t('legislation.noticeTitle')}
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
                            {[t('legislation.notice1'), t('legislation.notice2'), t('legislation.notice3')].map((text, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <span
                                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[14px]"
                                        style={{
                                            backgroundColor: '#D1D5DB',
                                            color: '#4B5563',
                                            fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {index + 1}
                                    </span>
                                    <p
                                        className="text-slate-700 text-[15px] leading-relaxed flex-1"
                                        style={{
                                            fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
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
                                fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                                fontWeight: 600,
                            }}
                        >
                            {t('legislation.acknowledge')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
