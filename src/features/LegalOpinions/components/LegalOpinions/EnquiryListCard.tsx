import { Eye, Calendar, Building2 } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { Enquiry } from '../../types';

interface EnquiryListCardProps {
    enquiry: Enquiry;
    onSelect: (enquiry: Enquiry) => void;
}

function getStatusConfig(status: number, t: (key: string) => string) {
    const map: Record<number, { bg: string; text: string; label: string }> = {
        1: { bg: 'bg-blue-50', text: 'text-blue-700', label: t('legalOpinions.status.new') },
        2: { bg: 'bg-green-50', text: 'text-green-700', label: t('legalOpinions.status.replied') },
        3: { bg: 'bg-gray-50', text: 'text-gray-700', label: t('legalOpinions.status.closed') },
    };
    return map[status] ?? map[0];
}

export function EnquiryListCard({ enquiry, onSelect }: EnquiryListCardProps) {
    const { t, isRTL, language } = useTranslation();
    const isArabic = language === 'ar';
    const statusConf = getStatusConfig(enquiry.status, t);

    return (
        <div
            className="bg-white transition-all duration-300 cursor-pointer group rounded-xl"
            style={{ borderInlineStart: '4px solid transparent' }}
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'color-mix(in srgb, var(--color-faa-primary) 8%, white)';
                el.style.boxShadow = '0 8px 20px rgba(47, 79, 111, 0.18)';
                el.style.borderInlineStartColor = 'var(--color-legislation-active-indicator)';
                el.style.transform = 'translateY(-2px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = '#ffffff';
                el.style.boxShadow = 'none';
                el.style.borderInlineStartColor = 'transparent';
                el.style.transform = 'translateY(0) scale(1)';
            }}
            onClick={() => onSelect(enquiry)}
        >
            <div className="px-8 py-6 flex items-start justify-between gap-6">
                {/* Left — Content */}
                <div className={`flex-1 space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-4">
                        <h3 className="text-slate-900 leading-snug text-lg font-bold" style={{ lineHeight: '1.4' }}>
                            {enquiry.title}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1.5 text-base font-bold rounded-md ${statusConf.bg} ${statusConf.text}`}>
                            {statusConf.label}
                        </span>
                    </div>
                    <div className="flex items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400 flex-shrink-0" />
                            <span className="text-slate-600 text-base">{enquiry.createdOnUtc}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-600 text-base">{isArabic ? enquiry.departmentAr : enquiry.departmentEn}</span>
                    </div>
                </div>

                {/* Right — Action */}
                <div className="flex-shrink-0">
                    <button
                        className="h-11 px-6 rounded-lg text-white flex items-center gap-2 transition-all duration-200 text-base font-medium bg-faa-primary hover:bg-dashboard-primary"
                        onClick={(e) => { e.stopPropagation(); onSelect(enquiry); }}
                    >
                        <Eye className="h-4 w-4" />
                        <span>{t('legalOpinions.viewOpinion')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
