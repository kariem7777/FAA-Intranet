import { FileText } from 'lucide-react';
import type { Enquiry } from '../types';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface EnquiryCardProps {
    enquiry: Enquiry;

}


export function EnquiryCard({ enquiry }: EnquiryCardProps) {
    const { t, isRTL } = useTranslation();

    return (
        <div className="bg-white rounded-lg border" style={{ borderColor: '#E5E7EB' }}>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5" style={{ color: 'var(--color-faa-primary)' }} />
                    <h3 className="text-lg font-semibold" style={{ color: '#1E293B' }}>
                        {t('legalOpinions.enquiry')}
                    </h3>
                </div>
                <div
                    className="bg-slate-50 rounded-lg p-5 border border-slate-200"
                    style={{
                        backgroundColor: '#F8FAFC',
                        color: '#475569',
                    }}
                >
                    {enquiry.title}
                </div>
            </div>
        </div >
    );
}
