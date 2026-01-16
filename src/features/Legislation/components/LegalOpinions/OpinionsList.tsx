import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { ApprovedOpinion, LegalOpinionEntity } from '../../types/legalOpinions.types';
import { OpinionCard } from './OpinionCard';

interface OpinionsListProps {
    opinions: ApprovedOpinion[];
    entities: LegalOpinionEntity[];
    onOpinionSelect: (opinion: ApprovedOpinion) => void;
    fontSizeMultiplier?: number;
}

const LEGISLATION_COLORS = {
    primary: '#2F4F6F',
};

export function OpinionsList({
    opinions,
    entities,
    onOpinionSelect,
    fontSizeMultiplier = 1,
}: OpinionsListProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    if (opinions.length === 0) {
        return (
            <div className="bg-white rounded-lg p-12 text-center">
                <CheckCircle2 className="mx-auto mb-4 text-gray-300" style={{ width: '64px', height: '64px' }} />
                <h3
                    className="mb-2"
                    style={{
                        fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontSize: `${20 * fontSizeMultiplier}px`,
                        fontWeight: 600,
                        color: '#64748B',
                    }}
                >
                    {t('legalOpinions.noResults')}
                </h3>
                <p
                    style={{
                        fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontSize: `${15 * fontSizeMultiplier}px`,
                        color: '#94A3B8',
                    }}
                >
                    {t('legalOpinions.tryAdjusting')}
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Results Count */}
            <div
                className="mb-4"
                style={{
                    fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontSize: `${16 * fontSizeMultiplier}px`,
                    fontWeight: 600,
                    color: LEGISLATION_COLORS.primary,
                }}
            >
                {opinions.length} {t('legalOpinions.results')}
            </div>

            {/* Opinions List */}
            <div className="space-y-4">
                {opinions.map((opinion) => (
                    <OpinionCard
                        key={opinion.id}
                        opinion={opinion}
                        entities={entities}
                        onSelect={onOpinionSelect}
                        fontSizeMultiplier={fontSizeMultiplier}
                    />
                ))}
            </div>
        </>
    );
}
