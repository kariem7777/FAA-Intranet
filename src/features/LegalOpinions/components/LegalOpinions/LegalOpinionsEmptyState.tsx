import { MessageSquare } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';

export function LegalOpinionsEmptyState() {
    const { t } = useTranslation();

    return (
        <div className="px-6 py-16 text-center">
            <MessageSquare className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-slate-900 text-lg mb-2 font-semibold">{t('common.noResultsFound')}</h3>
            <p className="text-slate-500">{t('legalOpinions.noResultsDesc')}</p>
        </div>
    );
}
