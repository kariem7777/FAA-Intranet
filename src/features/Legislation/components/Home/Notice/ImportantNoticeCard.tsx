import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';


export const ImportantNoticeCard = () => {
    const { t, isRTL } = useTranslation();
    const [showNoticeCard, setShowNoticeCard] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNoticeCard(true);
        }, 400)
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`relative rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] p-8 mb-2 overflow-hidden transition-opacity duration-500 ${showNoticeCard ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className={`absolute start-0 top-0 bottom-0 w-1`}
                style={{ backgroundColor: 'var(--color-accent-red)' }}
            ></div>

            <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-red-light)' }}>
                    <AlertCircle className="h-6 w-6" style={{ color: 'var(--color-accent-red)' }} />
                </div>
                <div className="flex-1">
                    <h3 className="text-[22px] mb-4" style={{ fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', fontWeight: 700, color: 'var(--color-text-darker)' }}>
                        {t('legislation.noticeTitle')}
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[14px] mt-0.5" style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-subtle)' }}>
                                1
                            </span>
                            <span className="flex-1 text-[16px] leading-relaxed" style={{ fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', color: 'var(--color-text-body)' }}>
                                {t('legislation.notice1')}
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[14px] mt-0.5" style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-subtle)' }}>
                                2
                            </span>
                            <span className="flex-1 text-[16px] leading-relaxed" style={{ fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', color: 'var(--color-text-body)' }}>
                                {t('legislation.notice2')}
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[14px] mt-0.5" style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-subtle)' }}>
                                3
                            </span>
                            <span className="flex-1 text-[16px] leading-relaxed" style={{ fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', color: 'var(--color-text-body)' }}>
                                {t('legislation.notice3')}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
