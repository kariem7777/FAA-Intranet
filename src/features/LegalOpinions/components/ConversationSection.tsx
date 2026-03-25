import { useState } from 'react';
import { QuillViewer } from '@/shared/components/QuillViewer';
import { MessageSquare, Copy, Loader2, User, Check, CheckCheck, Verified, FileText, Reply } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { EnquiryReply } from '../types';
import { Button } from '@/shared/components/ui/button';
import { useDialogPortal } from '@/shared/hooks/useDialogPortal';
import { MessageDetailsDialog } from './Dialogs/MessageDetailsDialog';
import toast from 'react-hot-toast';

interface ConversationSectionProps {
    messages: EnquiryReply[];
    isAdmin?: boolean;
    onApproveReply?: (replyId: number | string) => void;
    approvingReplyId?: number | string | null;
    onCopy?: (html: string) => void;
    isClosed: boolean;
}

export function ConversationSection({ messages, isAdmin, onApproveReply, approvingReplyId, onCopy, isClosed }: ConversationSectionProps) {
    const { t, isRTL, getLocalizedString } = useTranslation();
    const [copiedMessageId, setCopiedMessageId] = useState<string | number | null>(null);
    const { show, hide } = useDialogPortal();

    const isLongMessage = (content: string) => {
        const strippedText = content.replace(/<[^>]*>/g, '');
        return strippedText.length > 200;
    };

    const handleCopyPlain = async (message: EnquiryReply) => {
        try {
            const strippedText = message.content.replace(/<[^>]*>/g, '');
            await navigator.clipboard.writeText(strippedText);
            setCopiedMessageId(`${message.id}-plain`);
            setTimeout(() => setCopiedMessageId(null), 2000);
            toast.success(t('legalOpinions.copied'));
        } catch (err) {
            console.error('Failed to copy plain text:', err);
        }
    };

    const handleCopyRich = async (message: EnquiryReply) => {
        try {
            const strippedText = message.content.replace(/<[^>]*>/g, '');
            const htmlContent = message.content;

            if (navigator.clipboard && window.ClipboardItem) {
                const textBlob = new Blob([strippedText], { type: 'text/plain' });
                const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
                const item = new ClipboardItem({
                    'text/plain': textBlob,
                    'text/html': htmlBlob,
                });
                await navigator.clipboard.write([item]);
            } else {
                await navigator.clipboard.writeText(strippedText);
            }

            setCopiedMessageId(`${message.id}-rich`);
            setTimeout(() => setCopiedMessageId(null), 2000);
            toast.success(t('legalOpinions.copied'));
        } catch (err) {
            console.error('Failed to copy rich text:', err);
        }
    };

    const handleCopyToEditor = (message: EnquiryReply) => {
        if (onCopy) {
            onCopy(message.content);
            setCopiedMessageId(`${message.id}-editor`);
            setTimeout(() => setCopiedMessageId(null), 2000);
            toast.success(t('legalOpinions.copied'));
        }
    };

    const handleExpandMessage = (message: EnquiryReply) => {
        const senderName = message.isAdminResponse
            ? (isRTL ? 'الفريق القانوني' : 'FAA Legal Team')
            : (message.replier ? getLocalizedString(message.replier.nameEn, message.replier.nameAr) : t('common.unknown'));

        show(
            <MessageDetailsDialog
                message={message}
                senderName={senderName}
                onClose={hide}
            />
        );
    };
    return (
        <div className="bg-white rounded-xl shadow-sm border border-faa-primary/10 overflow-hidden">
            <div
                className="px-4 sm:px-6 py-3 sm:py-4 border-b border-faa-primary/10 bg-[#fafafa]"
            >
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" style={{ color: 'var(--color-legislation-primary)' }} />
                    <h3 className="text-slate-900 font-semibold text-[19px]">
                        {t('legalOpinions.legalOpinionConversation')}
                    </h3>
                    <span className="ml-auto text-slate-500 text-[16px]">
                        {messages.length} {t('legalOpinions.messages')}
                    </span>
                </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[700px] overflow-y-auto">
                {messages.map((message) => {
                    const isRightSide = message.isAdminResponse;


                    const alignmentClass = isRightSide
                        ? (isRTL ? 'justify-start' : 'justify-end')
                        : (isRTL ? 'justify-end' : 'justify-start');

                    const bubbleColorClass = message.approved
                        ? 'bg-green-50 border-green-200 shadow-[0_4px_12px_rgba(34,197,94,0.08)]'
                        : isRightSide
                            ? 'bg-[var(--color-msg-admin-bg)] border-[var(--color-msg-admin-border)]'
                            : 'bg-[var(--color-msg-user-bg)] border-[var(--color-msg-user-border)]';

                    const senderName = (message.replier ? getLocalizedString(message.replier.nameEn, message.replier.nameAr) : t('common.unknown'));
                    const senderRole = message.isAdminResponse;
                    const iconColorClass = isRightSide ? 'text-[var(--color-msg-admin-icon)]' : 'text-[var(--color-msg-user-icon)]';
                    const iconBgClass = isRightSide ? 'bg-[var(--color-msg-admin-icon-bg)]' : 'bg-[var(--color-msg-user-icon-bg)]';
                    const adminTextColor = 'text-[var(--color-msg-admin-text)]';
                    const userTextColor = 'text-[var(--color-msg-user-text)]';

                    return (
                        <div
                            key={message.id}
                            className={`flex ${alignmentClass}`}
                        >
                            <div
                                className={`relative w-fit min-w-[85%] sm:min-w-[80%] max-w-[95%] sm:max-w-[90%] rounded-lg p-3 sm:p-4 border ${bubbleColorClass} ${message.approved ? `ring-2 ring-green-600/15 border-green-300 shadow-lg ${isRTL ? 'pr-7' : 'pl-7'}` : ''}`}
                            >
                                {message.approved && (
                                    <div className={`absolute top-0 bottom-0 w-1.5 ${isRTL ? 'right-0 rounded-r-lg' : 'left-0 rounded-l-lg'} bg-green-500/50`} />
                                )}
                                <div className={`absolute ${isRTL ? 'left-1 sm:left-2' : 'right-1 sm:right-2'} top-1 sm:top-2 flex items-center gap-0.5 sm:gap-1`}>
                                    {onCopy && !isClosed && (
                                        <button
                                            onClick={() => handleCopyToEditor(message)}
                                            title={t('legalOpinions.copyToEditor')}
                                            className={`p-1.5 rounded-md transition-all duration-200 hover:bg-white/50 group ${iconColorClass}`}
                                        >
                                            {copiedMessageId === `${message.id}-editor` ? (
                                                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ strokeWidth: 2.5 }} />
                                            ) : (
                                                <Reply className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-60 group-hover:opacity-100" style={{ strokeWidth: 2 }} />
                                            )}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleCopyPlain(message)}
                                        title={t('legalOpinions.copyPlainText')}
                                        className={`p-1.5 rounded-md transition-all duration-200 hover:bg-white/50 group ${iconColorClass}`}
                                    >
                                        {copiedMessageId === `${message.id}-plain` ? (
                                            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ strokeWidth: 2.5 }} />
                                        ) : (
                                            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-60 group-hover:opacity-100" style={{ strokeWidth: 2 }} />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleCopyRich(message)}
                                        title={t('legalOpinions.copyRichText')}
                                        className={`p-1.5 rounded-md transition-all duration-200 hover:bg-white/50 group ${iconColorClass}`}
                                    >
                                        {copiedMessageId === `${message.id}-rich` ? (
                                            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ strokeWidth: 2.5 }} />
                                        ) : (
                                            <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-60 group-hover:opacity-100" style={{ strokeWidth: 2 }} />
                                        )}
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <div
                                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${iconBgClass}`}
                                    >
                                        <User className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${iconColorClass}`} />

                                    </div>
                                    <div className="flex-1">
                                        <p
                                            className={`flex items-center gap-2 text-[14px] sm:text-[16px]! font-semibold! ${isRightSide ? adminTextColor : userTextColor} ${isRTL ? 'pl-20 sm:pl-0' : 'pr-20 sm:pr-0'}`}
                                        >
                                            {senderName}
                                            {senderRole &&

                                                <Verified className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-center' />
                                            }
                                        </p>
                                        <p className="text-slate-500 text-[12px]! sm:text-[14px]!">
                                            {new Date(message.createdOnUtc).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', {
                                                year: 'numeric', month: 'short', day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="text-slate-700 leading-relaxed text-[15px] sm:text-[17px] word-line-break!"
                                    style={{ lineHeight: '1.8' }}
                                >
                                    {isLongMessage(message.content) ? (
                                        <>
                                            <QuillViewer html={message.content} />
                                            <button
                                                onClick={() => handleExpandMessage(message)}
                                                className="mt-2 hover:underline transition-colors block font-medium! text-sm!"
                                                style={{ color: 'var(--color-legislation-primary)' }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-legislation-accent)'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-legislation-primary)'}
                                            >
                                                {t('legalOpinions.readMore')}...
                                            </button>
                                        </>
                                    ) : (
                                        <QuillViewer html={message.content} />
                                    )}
                                </div>

                                {!isClosed && isAdmin && message.isAdminResponse && !message.approved && onApproveReply && (
                                    <div className="mt-3 pt-3 border-t border-green-100">
                                        <Button
                                            onClick={() => onApproveReply(message.id)}
                                            variant="outline"
                                            className="border-green-500 text-green-700 hover:bg-green-50 h-9 px-4 rounded-lg gap-2 font-medium text-[15px]"
                                            disabled={approvingReplyId === message.id}
                                        >
                                            {approvingReplyId === message.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <CheckCheck className="h-4 w-4" />
                                            )}
                                            <span>{t('legalOpinions.approveReply')}</span>
                                        </Button>
                                    </div>
                                )}

                                {message.approved && (
                                    <div className="mt-3 pt-3 border-t border-green-200/50">
                                        <div className="flex items-center gap-2 text-green-700 font-bold text-[15px] bg-green-100/50 px-3 py-1.5 rounded-lg w-fit">
                                            <CheckCheck className="h-4 w-4" style={{ strokeWidth: 3 }} />
                                            <span>{t('legalOpinions.finalReply')}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
