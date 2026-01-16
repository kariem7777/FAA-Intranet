import { Eye, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { ApprovedOpinion, LegalOpinionEntity } from '../../types/legalOpinions.types';

interface OpinionCardProps {
    opinion: ApprovedOpinion;
    entities: LegalOpinionEntity[];
    onSelect: (opinion: ApprovedOpinion) => void;
    fontSizeMultiplier?: number;
}

const LEGISLATION_COLORS = {
    primary: '#2F4F6F',
    accent: '#C9A24D',
};

export function OpinionCard({
    opinion,
    entities,
    onSelect,
    fontSizeMultiplier = 1,
}: OpinionCardProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    const getDepartmentName = (deptId: string) => {
        const dept = entities.find(e => e.id === deptId);
        return dept ? (isArabic ? dept.nameAr : dept.nameEn) : deptId;
    };

    return (
        <div
            className="bg-white rounded-lg border border-gray-200 p-6 transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
            style={{
                borderInlineStart: '4px solid transparent',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderInlineStartColor = LEGISLATION_COLORS.accent;
                e.currentTarget.style.backgroundColor = `${LEGISLATION_COLORS.primary}08`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderInlineStartColor = 'transparent';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
            onClick={() => onSelect(opinion)}
        >
            <div className="flex items-start justify-between gap-4">
                {/* Left Section - Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                        {/* Title */}
                        <h3
                            className="text-slate-900 leading-snug flex-1"
                            style={{
                                fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                                fontSize: `${19 * fontSizeMultiplier}px`,
                                fontWeight: 700,
                                lineHeight: '1.4'
                            }}
                        >
                            {isArabic ? opinion.titleAr : opinion.titleEn}
                        </h3>

                        {/* Approved Badge */}
                        <div
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{
                                backgroundColor: '#DCFCE7',
                                border: '1px solid #86EFAC',
                            }}
                        >
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span
                                style={{
                                    fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                                    fontSize: `${14 * fontSizeMultiplier}px`,
                                    fontWeight: 600,
                                    color: '#16A34A',
                                }}
                            >
                                {t('legalOpinions.approved')}
                            </span>
                        </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-6 flex-wrap">
                        {/* Department */}
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            <span
                                className="text-slate-600"
                                style={{
                                    fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                                    fontSize: `${16 * fontSizeMultiplier}px`,
                                    fontWeight: 400
                                }}
                            >
                                {getDepartmentName(opinion.department)}
                            </span>
                        </div>

                        {/* Approved Date */}
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span
                                className="text-slate-600"
                                style={{
                                    fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                                    fontSize: `${16 * fontSizeMultiplier}px`,
                                    fontWeight: 400
                                }}
                            >
                                {t('legalOpinions.approvedOn')} {opinion.approvedDate}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Action Button */}
                <div className="flex-shrink-0">
                    <button
                        className="h-11 px-6 rounded-lg text-white flex items-center gap-2 transition-all duration-200"
                        style={{
                            backgroundColor: LEGISLATION_COLORS.primary,
                            fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
                            fontSize: `${16 * fontSizeMultiplier}px`,
                            fontWeight: 500,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(opinion);
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#253D54';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 79, 111, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = LEGISLATION_COLORS.primary;
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <Eye className="h-4 w-4" />
                        {t('legalOpinions.viewDetails')}
                    </button>
                </div>
            </div>
        </div>
    );
}
