import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface LegalOpinionsHeaderProps {
    title: string;
    onBack: () => void;
}

export function LegalOpinionsHeader({
    title,
    onBack,
}: LegalOpinionsHeaderProps) {
    const { t, isRTL } = useTranslation();

    return (
        <div
            className="fixed top-[143px] left-0 right-0 z-30 border-b shadow-sm"
            style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E7EB',
            }}
        >
            <div className="max-w-[1800px] mx-auto px-8 py-6">
                <div className="flex items-center gap-4 mb-0">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 h-9 px-3 -ml-3 rounded-lg transition-all text-sm font-semibold"
                    >
                        <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                        {t('legalOpinions.back')}
                    </button>

                    <div className="h-6 w-px bg-gray-300"></div>

                    <h6
                        className="text-slate-900 text-lg font-semibold leading-6"
                    >
                        {title}
                    </h6>
                </div>
            </div>
        </div>
    );
}
