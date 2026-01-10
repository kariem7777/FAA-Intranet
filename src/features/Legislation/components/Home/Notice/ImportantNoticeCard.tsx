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
        <div className={`relative rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] p-8 mb-20 overflow-hidden transition-opacity duration-500 ${showNoticeCard ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className={`absolute start-0 top-0 bottom-0 w-1`}
                style={{ backgroundColor: '#e7000b' }}
            ></div>

            <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#fef2f2] flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-[#e7000b]" />
                </div>
                <div className="flex-1">
                    <h3 className="text-[#0f172b] text-[22px] mb-4" style={{ fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', fontWeight: 700 }}>
                        {t('legislation.noticeTitle')}
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#45556c] text-[14px] mt-0.5">
                                1
                            </span>
                            <span className="flex-1 text-[#314158] text-[16px] leading-relaxed" style={{ fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                                {t('legislation.notice1')}
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#45556c] text-[14px] mt-0.5">
                                2
                            </span>
                            <span className="flex-1 text-[#314158] text-[16px] leading-relaxed" style={{ fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                                {t('legislation.notice2')}
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#45556c] text-[14px] mt-0.5">
                                3
                            </span>
                            <span className="flex-1 text-[#314158] text-[16px] leading-relaxed" style={{ fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                                {t('legislation.notice3')}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
