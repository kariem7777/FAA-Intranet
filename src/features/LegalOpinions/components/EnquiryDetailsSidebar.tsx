import { Building2, Calendar, User, CheckCircle2, Clock, Lock } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { Enquiry } from '../types';

interface EnquiryDetailsSidebarProps {
    enquiry: Enquiry;
}

function getStatusConfig(status: number, t: (key: string) => string) {
    switch (status) {
        case 1:
            return {
                label: t('legalOpinions.status.new'),
                icon: Clock,
                bgColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: 'rgba(59, 130, 246, 0.3)',
                textColor: '#3B82F6',
            };
        case 3:
            return {
                label: t('legalOpinions.status.closed'),
                icon: Lock,
                bgColor: 'rgba(107, 114, 128, 0.1)',
                borderColor: 'rgba(107, 114, 128, 0.3)',
                textColor: '#6B7280',
            };
        case 2:
        default:
            return {
                label: t('legalOpinions.status.replied'),
                icon: CheckCircle2,
                bgColor: 'rgba(39, 174, 96, 0.1)',
                borderColor: 'rgba(39, 174, 96, 0.3)',
                textColor: 'var(--color-accent-green)',
            };
    }
}

export function EnquiryDetailsSidebar({
    enquiry,
}: EnquiryDetailsSidebarProps) {
    const { t, isRTL, getLocalizedString } = useTranslation();

    const statusConfig = getStatusConfig(enquiry.status, t);
    const StatusIcon = statusConfig.icon;
    const approvedReply = enquiry.replies?.find(r => r.approved);

    return (
        <div
            className="bg-white rounded-lg border p-6 sticky"
            style={{
                borderColor: 'rgba(144, 142, 129, 0.3)',
                top: '165px',
            }}
        >
            <h3
                className="mb-6 pb-4 border-b text-lg font-semibold"
                style={{
                    borderColor: 'rgba(144, 142, 129, 0.3)'
                }}
            >
                {t('legalOpinions.enquiryDetails')}
            </h3>

            <div className="space-y-5">
                {/* Title */}
                <div>
                    <label
                        className="block mb-2 uppercase tracking-wide text-xs font-semibold"
                        style={{
                            color: 'var(--color-dashboard-primary)',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {t('legalOpinions.title')}
                    </label>
                    <div
                        className="text-base"
                        style={{
                            color: 'var(--color-dashboard-primary)',
                            lineHeight: '1.5'
                        }}
                    >
                        {enquiry.title}
                    </div>
                </div>

                {/* Department */}
                <div>
                    <label
                        className="block mb-2 uppercase tracking-wide text-xs font-semibold"
                        style={{
                            color: 'var(--color-dashboard-primary)',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {t('legalOpinions.department')}
                    </label>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" style={{ color: 'var(--color-faa-primary)' }} />
                        <span className="text-base" style={{ color: 'var(--color-dashboard-primary)' }}>
                            {getLocalizedString(enquiry.departmentEn, enquiry.departmentAr) || t('common.unknown')}
                        </span>
                    </div>
                </div>

                {/* Submission Date */}
                <div>
                    <label
                        className="block mb-2 uppercase tracking-wide text-xs font-semibold"
                        style={{
                            color: 'var(--color-dashboard-primary)',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {t('legalOpinions.submissionDate')}
                    </label>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" style={{ color: 'var(--color-faa-primary)' }} />
                        <span className="text-base" style={{ color: 'var(--color-dashboard-primary)' }}>
                            {new Date(enquiry.createdOnUtc).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {/* Status */}
                <div>
                    <label
                        className="block mb-2 uppercase tracking-wide text-xs font-semibold"
                        style={{
                            color: 'var(--color-dashboard-primary)',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {t('legalOpinions.statusHeader')}
                    </label>
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{
                            backgroundColor: statusConfig.bgColor,
                            border: `1px solid ${statusConfig.borderColor}`,
                        }}
                    >
                        <StatusIcon className="h-3.5 w-3.5" style={{ color: statusConfig.textColor }} />
                        <span
                            className="text-sm font-semibold"
                            style={{
                                color: statusConfig.textColor,
                            }}
                        >
                            {statusConfig.label}
                        </span>
                    </div>
                </div>

                {/* Reply Date - shown when replied or closed */}
                {(enquiry.status === 2 || enquiry.status === 3) && approvedReply && (
                    <div>
                        <label
                            className="block mb-2 uppercase tracking-wide text-xs font-semibold"
                            style={{
                                color: 'var(--color-dashboard-primary)',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {t('legalOpinions.replyDate')}
                        </label>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" style={{ color: 'var(--color-faa-primary)' }} />
                            <span className="text-base" style={{ color: 'var(--color-dashboard-primary)' }}>
                                {new Date(approvedReply.createdOnUtc).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                )}

                {/* Replied By - shown when replied or closed */}
                {(enquiry.status === 2 || enquiry.status === 3) && approvedReply?.replier && (
                    <div>
                        <label
                            className="block mb-2 uppercase tracking-wide text-xs font-semibold"
                            style={{
                                color: 'var(--color-dashboard-primary)',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {t('legalOpinions.repliedBy')}
                        </label>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" style={{ color: 'var(--color-faa-primary)' }} />
                            <span className="text-base" style={{ color: 'var(--color-dashboard-primary)' }}>
                                {isRTL ? approvedReply.replier.nameAr : approvedReply.replier.nameEn}
                            </span>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
