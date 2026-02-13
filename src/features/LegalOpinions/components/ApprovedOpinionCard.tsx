import { useState } from 'react';
import { CheckCircle2, Copy, Calendar, User } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { EnquiryReply } from '../types';
import { useDialogPortal } from '@/shared/hooks/useDialogPortal';
import { MessageDetailsDialog } from './Dialogs/MessageDetailsDialog';

interface ApprovedOpinionCardProps {
    approvedReply: EnquiryReply;
}

export function ApprovedOpinionCard({ approvedReply }: ApprovedOpinionCardProps) {
    const { t, isRTL, getLocalizedString } = useTranslation();
    const [copied, setCopied] = useState(false);
    const { show, hide } = useDialogPortal();

    const isLongMessage = (content: string) => {
        const strippedText = content.replace(/<[^>]*>/g, '');
        return strippedText.length > 300;
    };

    const handleCopy = () => {
        const strippedText = approvedReply.content.replace(/<[^>]*>/g, '');
        navigator.clipboard.writeText(strippedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExpandMessage = () => {
        const senderName = approvedReply.isAdminResponse
            ? (isRTL ? 'الفريق القانوني' : 'FAA Legal Team')
            : (approvedReply.replier ? getLocalizedString(approvedReply.replier.nameEn, approvedReply.replier.nameAr) : t('common.unknown'));

        show(
            <MessageDetailsDialog
                message={approvedReply}
                senderName={senderName}
                onClose={hide}
            />
        );
    };

    return (
        <div
            className="bg-white rounded-lg border-2 shadow-md"
            style={{
                borderColor: 'var(--color-accent-green)',
            }}
        >
            {/* Header */}
            <div
                className="px-6 py-4 flex items-center justify-between border-b rounded-t-lg"
                style={{
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    borderColor: 'rgba(39, 174, 96, 0.3)'
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="h-10 w-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-accent-green)' }}
                    >
                        <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--color-accent-green)' }}>
                        {t('legalOpinions.finalApprovedOpinion')}
                    </h3>
                </div>
                <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-green-100 text-sm font-medium"
                    style={{ color: 'var(--color-accent-green)' }}
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
                    className="p-5 rounded-lg mb-5 text-slate-700 leading-relaxed text-[17px]"
                    style={{
                        backgroundColor: 'rgba(39, 174, 96, 0.05)',
                        border: '1px solid rgba(39, 174, 96, 0.15)',
                        lineHeight: '1.8'
                    }}
                >
                    {isLongMessage(approvedReply.content) ? (
                        <>
                            <div
                                className="line-clamp-4 break-words w-full overflow-hidden rich-text-content"
                                dangerouslySetInnerHTML={{ __html: approvedReply.content }}
                            />
                            <button
                                onClick={handleExpandMessage}
                                className="mt-2 hover:underline transition-colors block font-medium"
                                style={{ color: 'var(--color-legislation-primary)' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-legislation-accent)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-legislation-primary)'}
                            >
                                {t('legalOpinions.readMore')}
                            </button>
                        </>
                    ) : (
                        <div
                            className="break-words w-full overflow-hidden rich-text-content"
                            dangerouslySetInnerHTML={{ __html: approvedReply.content }}
                        />
                    )}
                </div>

                {/* Approval Metadata */}
                <div className="grid grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: 'rgba(148, 163, 184, 0.3)' }}>
                    {/* Approved On */}
                    <div>
                        <label
                            className="block mb-2 uppercase tracking-wide text-xs font-semibold"
                            style={{ color: 'var(--color-dashboard-primary)' }}
                        >
                            {t('legalOpinions.approvedOn')}
                        </label>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" style={{ color: 'var(--color-accent-green)' }} />
                            <span className="text-sm font-semibold" style={{ color: 'var(--color-accent-green)' }}>
                                {new Date(approvedReply.createdOnUtc).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Approved By */}
                    <div>
                        <label
                            className="block mb-2 uppercase tracking-wide text-xs font-semibold"
                            style={{ color: 'var(--color-dashboard-primary)' }}
                        >
                            {t('legalOpinions.approvedBy')}
                        </label>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" style={{ color: 'var(--color-accent-green)' }} />
                            <span className="text-sm font-semibold" style={{ color: 'var(--color-accent-green)' }}>
                                {approvedReply.replier ? getLocalizedString(approvedReply.replier.nameEn, approvedReply.replier.nameAr)
                                    : t('common.unknown')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
