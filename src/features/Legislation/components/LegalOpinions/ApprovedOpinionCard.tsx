import { useState } from 'react';
import { CheckCircle2, Copy, Calendar, User } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { ApprovedOpinion } from '../../types/legalOpinions.types';

interface ApprovedOpinionCardProps {
    opinion: ApprovedOpinion;
    fontSizeMultiplier?: number;
}

export function ApprovedOpinionCard({ opinion, fontSizeMultiplier = 1 }: ApprovedOpinionCardProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';
    const approvedReply = isArabic ? opinion.approvedReplyAr : opinion.approvedReplyEn;
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(approvedReply);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className="bg-white rounded-lg border-2 shadow-md"
            style={{
                borderColor: '#22C55E',
            }}
        >
            {/* Header */}
            <div
                className="px-6 py-4 flex items-center justify-between border-b rounded-t-lg"
                style={{
                    backgroundColor: '#F0FDF4',
                    borderColor: '#86EFAC'
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="h-10 w-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#22C55E' }}
                    >
                        <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <h3
                        style={{
                            fontFamily,
                            fontSize: `${18 * fontSizeMultiplier}px`,
                            fontWeight: 700,
                            color: '#15803D'
                        }}
                    >
                        {t('legalOpinions.finalApprovedOpinion')}
                    </h3>
                </div>
                <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-green-100"
                    style={{
                        fontFamily,
                        fontSize: `${14 * fontSizeMultiplier}px`,
                        fontWeight: 500,
                        color: '#15803D',
                    }}
                    onClick={handleCopy}
                >
                    <Copy className="h-4 w-4" />
                    {copied ? t('legalOpinions.copied') : t('legalOpinions.copyOpinion')}
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Opinion Text */}
                <div
                    className="p-5 rounded-lg mb-5"
                    style={{
                        backgroundColor: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        fontFamily,
                        fontSize: `${16 * fontSizeMultiplier}px`,
                        color: '#166534',
                        lineHeight: '1.8'
                    }}
                >
                    {approvedReply}
                </div>

                {/* Approval Metadata */}
                <div className="grid grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                    {/* Approved On */}
                    <div>
                        <label
                            className="block mb-2 uppercase tracking-wide"
                            style={{
                                fontFamily,
                                fontSize: `${11 * fontSizeMultiplier}px`,
                                fontWeight: 600,
                                color: '#64748B',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {t('legalOpinions.approvedOn')}
                        </label>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, fontWeight: 600, color: '#15803D' }}>
                                {opinion.approvedDate}
                            </span>
                        </div>
                    </div>

                    {/* Approved By */}
                    <div>
                        <label
                            className="block mb-2 uppercase tracking-wide"
                            style={{
                                fontFamily,
                                fontSize: `${11 * fontSizeMultiplier}px`,
                                fontWeight: 600,
                                color: '#64748B',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {t('legalOpinions.approvedBy')}
                        </label>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-green-600" />
                            <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, fontWeight: 600, color: '#15803D' }}>
                                {opinion.approvedBy}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
