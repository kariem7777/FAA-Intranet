import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { Enquiry } from '../types';
import { OpinionCard } from './OpinionCard';

interface OpinionsListProps {
    enquiries: Enquiry[];
    onEnquirySelect: (enquiry: Enquiry) => void;
}



export function OpinionsList({
    enquiries,
    onEnquirySelect,
}: OpinionsListProps) {
    const { t } = useTranslation();

    if (enquiries.length === 0) {
        return (
            <div className=" rounded-lg p-12 text-center">
                <CheckCircle2 className="mx-auto mb-4 text-gray-300" style={{ width: '64px', height: '64px' }} />
                <h3 className="mb-2 text-xl font-semibold" >
                    {t('legalOpinions.noResults')}
                </h3>
                <p className="text-sm" style={{ color: '#94A3B8' }}>
                    {t('legalOpinions.tryAdjusting')}
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 text-base font-semibold" style={{ color: 'var(--color-faa-primary)' }}>
                {enquiries.length} {t('legalOpinions.resultsLabel')}
            </div>

            <div className="space-y-4">
                {enquiries.map((enquiry) => (
                    <OpinionCard
                        key={enquiry.id}
                        enquiry={enquiry}
                        onSelect={onEnquirySelect}
                    />
                ))}
            </div>
        </>
    );
}
