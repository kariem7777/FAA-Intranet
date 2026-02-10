import { Dialog } from '@/shared/components/Dialog';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useEffect, useState } from 'react';

interface ImportantNoticeModalProps {
    onClose: () => void;
}

export const ImportantNoticeModal = ({ onClose }: ImportantNoticeModalProps) => {
    const { t, isRTL } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const acknowledged = localStorage.getItem('legislation_notice_acknowledged');
        if (!acknowledged) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('legislation_notice_acknowledged', 'true');
        setIsVisible(false);
        onClose();
    };

    if (!isVisible) return null;

    return (
        <Dialog
            title={t('legislation.noticeTitle')}
            closeOnBackdropClick={true}
            closeOnEscape={true}
            onClose={handleClose}
            showCloseButton={true}
            closeButtonText={t('common.acknowledge', 'Acknowledge')}
        >
            <div className="px-6 py-6">
                <ul className="space-y-5">
                    {[t('legislation.notice1'), t('legislation.notice2'), t('legislation.notice3')].map((text, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <span
                                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[14px]"
                                style={{
                                    backgroundColor: 'var(--color-bg-light)',
                                    color: 'var(--color-text-light)',
                                    fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                                    fontWeight: 600,
                                }}
                            >
                                {index + 1}
                            </span>
                            <p
                                className="text-[15px] leading-relaxed flex-1"
                                style={{
                                    fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                                    color: 'var(--color-text-light)',
                                }}
                            >
                                {text}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

        </Dialog>
    );
};
