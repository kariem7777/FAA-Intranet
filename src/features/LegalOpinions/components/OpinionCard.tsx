import { Eye, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { Enquiry } from '../types';

interface OpinionCardProps {
    enquiry: Enquiry;
    onSelect: (enquiry: Enquiry) => void;
}

export function OpinionCard({
    enquiry,
    onSelect,
}: OpinionCardProps) {
    const { t, isRTL } = useTranslation();


    return (
        <div
            className="bg-white rounded-lg border border-gray-200 p-6 transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
            style={{
                borderInlineStart: '4px solid transparent',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderInlineStartColor = 'var(--color-faa-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-faa-primary-08)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderInlineStartColor = 'transparent';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
            onClick={() => onSelect(enquiry)}
        >
            <div className="flex items-start justify-between gap-4">
                {/* Left Section - Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                        {/* Title */}
                        <h3 className="text-lg font-bold leading-snug flex-1 text-slate-900">
                            {enquiry.title}
                        </h3>


                        <div
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{
                                backgroundColor: '#DCFCE7',
                                border: '1px solid #86EFAC',
                            }}
                        >
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-semibold" style={{ color: '#059669' }}>
                                {t('legalOpinions.approved')}
                            </span>
                        </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-6 flex-wrap">
                        {/* Department */}
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-600" >
                                {isRTL ? enquiry.departmentAr : enquiry.departmentEn}
                            </span>
                        </div>

                        {/* Created Date */}
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-600" >
                                {new Date(enquiry.createdOnUtc).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Action Button */}
                <div className="flex-shrink-0">
                    <button
                        className="h-11 px-6 rounded-lg text-white flex items-center gap-2 transition-all duration-200 text-base font-medium"
                        style={{ backgroundColor: 'var(--color-faa-primary)' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(enquiry);
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-legislation-header-end)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 79, 111, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-faa-primary)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <Eye className="h-4 w-4" />
                        {t('legalOpinions.view')}
                    </button>
                </div>
            </div>
        </div>
    );
}
