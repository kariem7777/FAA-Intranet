import { FileText } from 'lucide-react';
import type { ApprovedOpinion } from '../../types/legalOpinions.types';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface EnquiryCardProps {
    opinion: ApprovedOpinion;
    fontSizeMultiplier?: number;
}

const THEME_COLOR = '#2F4F6F';

export function EnquiryCard({ opinion, fontSizeMultiplier = 1 }: EnquiryCardProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';
    const enquiry = isArabic ? opinion.enquiryAr : opinion.enquiryEn;

    return (
        <div className="bg-white rounded-lg border" style={{ borderColor: '#E5E7EB' }}>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5" style={{ color: THEME_COLOR }} />
                    <h3
                        style={{
                            fontFamily,
                            fontSize: `${17 * fontSizeMultiplier}px`,
                            fontWeight: 600,
                            color: '#1E293B'
                        }}
                    >
                        {t('legalOpinions.enquiry')}
                    </h3>
                </div>
                <div
                    className="p-4 rounded-lg"
                    style={{
                        backgroundColor: '#F8FAFC',
                        fontFamily,
                        fontSize: `${15 * fontSizeMultiplier}px`,
                        color: '#475569',
                        lineHeight: '1.7'
                    }}
                >
                    {enquiry}
                </div>
            </div>
        </div>
    );
}
