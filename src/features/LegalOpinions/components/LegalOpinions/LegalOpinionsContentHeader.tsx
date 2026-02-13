import { MessageSquare } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface LegalOpinionsContentHeaderProps {
    totalCount: number;
    userRole: 'user' | 'admin';
    onAddEnquiry: () => void;
}

export function LegalOpinionsContentHeader({ totalCount, userRole, onAddEnquiry }: LegalOpinionsContentHeaderProps) {
    const { t } = useTranslation();

    return (
        <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <h4 className="text-slate-900 flex items-center gap-2 text-[18px] font-semibold">
                    <MessageSquare className="h-5 w-5 text-faa-primary" />
                    {t('legalOpinions.breadcrumbLegal')}
                    <span className="text-slate-500 font-normal text-[16px]">
                        ({totalCount} {t('legalOpinions.results.count')})
                    </span>
                </h4>
            </div>
            {userRole === 'user' && (
                <button
                    onClick={onAddEnquiry}
                    className="h-10 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 text-[16px] font-medium bg-legislation-active-indicator text-slate-800 hover:bg-dashboard-primary hover:text-white"
                >
                    {t('legalOpinions.addEnquiry')}
                </button>
            )}
        </div>
    );
}
