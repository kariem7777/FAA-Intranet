import { Building2, Calendar, User, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { ApprovedOpinion, LegalOpinionEntity } from '../../types/legalOpinions.types';

interface EnquiryDetailsSidebarProps {
    opinion: ApprovedOpinion;
    entities: LegalOpinionEntity[];
    fontSizeMultiplier?: number;
}

export function EnquiryDetailsSidebar({
    opinion,
    entities,
    fontSizeMultiplier = 1,
}: EnquiryDetailsSidebarProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';

    const getDepartmentName = (deptId: string) => {
        const dept = entities.find(e => e.id === deptId);
        return dept ? (isArabic ? dept.nameAr : dept.nameEn) : deptId;
    };

    const title = isArabic ? opinion.titleAr : opinion.titleEn;

    return (
        <div
            className="bg-white rounded-lg border p-6 sticky"
            style={{
                borderColor: '#E5E7EB',
                top: '165px',
            }}
        >
            <h3
                className="mb-6 pb-4 border-b"
                style={{
                    fontFamily,
                    fontSize: `${18 * fontSizeMultiplier}px`,
                    fontWeight: 600,
                    color: '#1E293B',
                    borderColor: '#E5E7EB'
                }}
            >
                {t('legalOpinions.enquiryDetails')}
            </h3>

            <div className="space-y-5">
                {/* Title */}
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
                        {t('legalOpinions.title')}
                    </label>
                    <div
                        style={{
                            fontFamily,
                            fontSize: `${15 * fontSizeMultiplier}px`,
                            color: '#334155',
                            lineHeight: '1.5'
                        }}
                    >
                        {title}
                    </div>
                </div>

                {/* Department */}
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
                        {t('legalOpinions.department')}
                    </label>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" style={{ color: '#64748B' }} />
                        <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, color: '#334155' }}>
                            {getDepartmentName(opinion.department)}
                        </span>
                    </div>
                </div>

                {/* Submission Date */}
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
                        {t('legalOpinions.submissionDate')}
                    </label>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" style={{ color: '#64748B' }} />
                        <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, color: '#334155' }}>
                            {opinion.date}
                        </span>
                    </div>
                </div>

                {/* Status */}
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
                        {t('legalOpinions.status')}
                    </label>
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{
                            backgroundColor: '#DCFCE7',
                            border: '1px solid #86EFAC',
                        }}
                    >
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                        <span
                            style={{
                                fontFamily,
                                fontSize: `${13 * fontSizeMultiplier}px`,
                                fontWeight: 600,
                                color: '#16A34A',
                            }}
                        >
                            {t('legalOpinions.replied')}
                        </span>
                    </div>
                </div>

                {/* Reply Date */}
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
                        {t('legalOpinions.replyDate')}
                    </label>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, color: '#334155' }}>
                            {opinion.approvedDate}
                        </span>
                    </div>
                </div>

                {/* Replied By */}
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
                        {t('legalOpinions.repliedBy')}
                    </label>
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-600" />
                        <span style={{ fontFamily, fontSize: `${15 * fontSizeMultiplier}px`, color: '#334155' }}>
                            {opinion.approvedBy}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
