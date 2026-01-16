import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface LegalOpinionsHeaderProps {
    title: string;
    onBack: () => void;
    fontSizeMultiplier?: number;
}

export function LegalOpinionsHeader({
    title,
    onBack,
    fontSizeMultiplier = 1
}: LegalOpinionsHeaderProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    return (
        <div
            className="fixed top-[143px] left-0 right-0 z-30 border-b shadow-sm"
            style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E7EB',
            }}
        >
            <div className="max-w-[1600px] mx-auto px-8 py-6">
                <div className="flex items-center gap-4 mb-0">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 h-9 px-3 -ml-3 rounded-lg transition-all"
                        style={{
                            fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                            fontSize: `${15 * fontSizeMultiplier}px`,
                            fontWeight: 600
                        }}
                    >
                        <ArrowLeft className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                        {t('legalOpinions.back')}
                    </button>

                    <div className="h-6 w-px bg-gray-300"></div>

                    <h6
                        className="text-slate-900"
                        style={{
                            fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                            fontSize: `${18 * fontSizeMultiplier}px`,
                            fontWeight: 600,
                            lineHeight: '1.5'
                        }}
                    >
                        {title}
                    </h6>
                </div>
            </div>
        </div>
    );
}
