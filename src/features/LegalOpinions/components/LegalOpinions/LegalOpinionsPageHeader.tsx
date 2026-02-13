import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/components/ui/button';

interface LegalOpinionsPageHeaderProps {
    onBack: () => void;
}

export function LegalOpinionsPageHeader({ onBack }: LegalOpinionsPageHeaderProps) {
    const { t, isRTL } = useTranslation();

    return (
        <div className=" bg-white border-b border-gray-200 shadow-sm ">
            <div className="h-1 bg-faa-primary w-full" />
            <div className="max-w-[1800px] mx-auto px-8 py-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 h-9 px-3 -ml-3 text-sm font-semibold"
                    >
                        <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                        {t('legalOpinions.back')}
                    </Button>
                    <div className="h-6 w-px bg-gray-300" />
                    <h6 className="text-slate-900 text-lg font-semibold leading-relaxed">
                        {t('legalOpinions.pageTitle')}
                    </h6>
                </div>
            </div>
        </div>
    );
}
