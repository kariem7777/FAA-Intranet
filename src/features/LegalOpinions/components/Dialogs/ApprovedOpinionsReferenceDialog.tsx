import { useState, useEffect } from 'react';
import { X, Search, BookOpen, ChevronDown, ChevronUp, Copy, Check, Calendar, Building2, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchApprovedOpinions } from '@/features/LegalOpinions/slices/EnquiriesSlice';
import type { Enquiry, EnquiryReply } from '@/features/LegalOpinions/types';
import { formatDate } from '@/shared/utils/dateUtils';
import toast from 'react-hot-toast';
import { useDialogPortal } from '@/shared/hooks/useDialogPortal';
import { MessageDetailsDialog } from './MessageDetailsDialog';

interface ApprovedOpinionsReferenceDialogProps {
    onClose: () => void;
    onCopy?: (text: string) => void;
    fontSizeMultiplier?: number;
}

export function ApprovedOpinionsReferenceDialog({
    onClose,
    onCopy,
    fontSizeMultiplier = 1
}: ApprovedOpinionsReferenceDialogProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const dispatch = useAppDispatch();
    const { items, loading, error, pagination } = useAppSelector((state) => state.enquiries.approvedOpinions);
    const { show, hide } = useDialogPortal();

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [expandedOpinionId, setExpandedOpinionId] = useState<number | null>(null);
    const [copiedOpinionId, setCopiedOpinionId] = useState<number | null>(null);

    const isLongMessage = (content: string) => {
        const strippedText = content.replace(/<[^>]*>/g, '');
        return strippedText.length > 300;
    };

    const handleExpandMessage = (reply: EnquiryReply, title: string) => {
        show(
            <MessageDetailsDialog
                message={reply}
                senderName={title}
                onClose={hide}
            />
        );
    };

    const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';
    const legislationColors = {
        primary: '#908e81',
        accent: '#e5ddc8',
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch data
    useEffect(() => {
        dispatch(fetchApprovedOpinions({
            searchText: debouncedSearchQuery,
            pageNumber: pagination.pageNumber,
            pageSize: 5
        }));
    }, [dispatch, debouncedSearchQuery, pagination.pageNumber]);

    const handlePageChange = (newPage: number) => {
        dispatch(fetchApprovedOpinions({
            searchText: debouncedSearchQuery,
            pageNumber: newPage,
            pageSize: 5
        }));
    };

    const handleCopyReply = async (opinion: Enquiry) => {
        const approvedReply = opinion.reply || opinion.replies?.find(r => r.approved) || opinion.replies?.[0];

        if (!approvedReply) {
            toast.error(t('legalOpinions.opinionNotFound'));
            return;
        }

        const replyHtml = approvedReply.content;
        const strippedText = replyHtml.replace(/<[^>]*>/g, '');

        // Use fallback method for clipboard (avoid permissions error)
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(strippedText);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = strippedText;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
        } catch (err) {
            console.error('Failed to copy text:', err);
        }

        // Call parent callback to insert into editor
        if (onCopy) {
            onCopy(replyHtml);
        }

        // Show copied feedback
        setCopiedOpinionId(opinion.id);
        setTimeout(() => setCopiedOpinionId(null), 2000);
        toast.success(t('legalOpinions.copied'));
    };

    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
            }}
            onClick={onClose}
        >
            <div
                className="bg-white overflow-hidden flex flex-col"
                style={{
                    width: '900px',
                    maxWidth: '100%',
                    borderRadius: '16px',
                    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
                    maxHeight: '90vh',
                }}
                onClick={(e) => e.stopPropagation()}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                {/* Header */}
                <div
                    className="px-6 py-5"
                    style={{ backgroundColor: legislationColors.primary }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                            <div
                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                            >
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3
                                    className="text-white"
                                    style={{
                                        fontFamily,
                                        fontSize: `${20 * fontSizeMultiplier}px`,
                                        fontWeight: 700,
                                        marginBottom: '4px'
                                    }}
                                >
                                    {t('legalOpinions.approvedPageTitle', 'Reference: Approved Legal Opinions')}
                                </h3>
                                <p
                                    className="text-white/80"
                                    style={{
                                        fontFamily,
                                        fontSize: `${14 * fontSizeMultiplier}px`,
                                        fontWeight: 400,
                                    }}
                                >
                                    {t('legalOpinions.pageDescription', 'View and copy from previously approved opinions to maintain consistency')}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 rounded-full transition-all duration-150"
                            style={{
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            }}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4">
                        <div className="relative">
                            <Search
                                className="absolute top-1/2 transform -translate-y-1/2"
                                style={{
                                    [isArabic ? 'right' : 'left']: '12px',
                                    width: '18px',
                                    height: '18px',
                                    color: '#9CA3AF',
                                }}
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('legalOpinions.approvedSearchPlaceholder', 'Search opinions...')}
                                className="w-full rounded-lg border-0 focus:ring-2"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    padding: '10px 12px',
                                    [isArabic ? 'paddingRight' : 'paddingLeft']: '40px',
                                    fontFamily,
                                    fontSize: '15px',
                                    outline: 'none',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div
                    className="flex-1 overflow-y-auto"
                    style={{
                        backgroundColor: '#F9FAFB',
                        padding: '20px',
                    }}
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                            <Loader2 className="h-8 w-8 animate-spin mb-2" />
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-12 text-red-500">
                            <AlertCircle className="h-12 w-12 mb-2 opacity-50" />
                            <p className="font-medium mb-2">{t('common.errorOccurred')}</p>
                            <p className="text-sm opacity-80 mb-4">{error}</p>
                            <button
                                onClick={() => handlePageChange(pagination.pageNumber)}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
                            >
                                {t('common.retry')}
                            </button>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen
                                className="mx-auto mb-4"
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    color: '#9CA3AF'
                                }}
                            />
                            <p
                                className="text-gray-600"
                                style={{ fontFamily, fontSize: '17px', fontWeight: 500 }}
                            >
                                {t('legalOpinions.noApprovedResults', 'No approved opinions found')}
                            </p>
                            <p
                                className="text-gray-500 mt-1"
                                style={{ fontFamily, fontSize: '15px' }}
                            >
                                {t('legalOpinions.tryAdjusting', 'Try adjusting your search criteria')}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((opinion) => {
                                const approvedReply = opinion.reply;
                                return (
                                    <div
                                        key={opinion.id}
                                        className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
                                    >
                                        {/* Opinion Header */}
                                        <div className="p-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h4
                                                        className="text-slate-900 mb-2"
                                                        style={{
                                                            fontFamily,
                                                            fontSize: '17px',
                                                            fontWeight: 600,
                                                            lineHeight: '1.5',
                                                        }}
                                                    >
                                                        {opinion.title}
                                                    </h4>

                                                    {/* Meta info */}
                                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                                        <div className="flex items-center gap-1.5">
                                                            <Building2
                                                                style={{
                                                                    width: '14px',
                                                                    height: '14px',
                                                                    color: legislationColors.primary
                                                                }}
                                                            />
                                                            <span
                                                                className="text-slate-600"
                                                                style={{ fontFamily, fontSize: '14px' }}
                                                            >
                                                                {isArabic ? opinion.departmentAr : opinion.departmentEn}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar
                                                                style={{
                                                                    width: '14px',
                                                                    height: '14px',
                                                                    color: legislationColors.accent
                                                                }}
                                                            />
                                                            <span
                                                                className="text-slate-600"
                                                                style={{ fontFamily, fontSize: '14px' }}
                                                            >
                                                                {t('legalOpinions.approvedOn', 'Approved on')} {formatDate(opinion.createdOnUtc)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleCopyReply(opinion)}
                                                        className="px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                                                        style={{
                                                            backgroundColor: copiedOpinionId === opinion.id ? '#10B981' : legislationColors.primary,
                                                            color: 'white',
                                                            fontFamily,
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (copiedOpinionId !== opinion.id) {
                                                                e.currentTarget.style.backgroundColor = '#6d6b62';
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (copiedOpinionId !== opinion.id) {
                                                                e.currentTarget.style.backgroundColor = legislationColors.primary;
                                                            }
                                                        }}
                                                    >
                                                        {copiedOpinionId === opinion.id ? (
                                                            <>
                                                                <Check className="h-4 w-4" />
                                                                {t('legalOpinions.copied', 'Copied!')}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy className="h-4 w-4" />
                                                                {t('legalOpinions.copyOpinion', 'Copy Reply')}
                                                            </>
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() => setExpandedOpinionId(expandedOpinionId === opinion.id ? null : opinion.id)}
                                                        className="px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                                                        style={{
                                                            backgroundColor: '#F3F4F6',
                                                            color: legislationColors.primary,
                                                            fontFamily,
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {expandedOpinionId === opinion.id ? (
                                                            <>
                                                                <ChevronUp className="h-4 w-4" />
                                                                {t('legalOpinions.hideConversation', 'Hide Reply')}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ChevronDown className="h-4 w-4" />
                                                                {t('legalOpinions.viewOpinion', 'View Reply')}
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Expanded Reply */}
                                            {expandedOpinionId === opinion.id && approvedReply && (
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <p
                                                        className="text-slate-600 mb-2"
                                                        style={{
                                                            fontFamily,
                                                            fontSize: '13px',
                                                            fontWeight: 600,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px',
                                                        }}
                                                    >
                                                        {t('legalOpinions.finalApprovedOpinion', 'Approved Reply')}
                                                    </p>
                                                    <div
                                                        className="bg-slate-50 rounded-lg p-4"
                                                        style={{
                                                            ...(isArabic
                                                                ? { borderRight: `4px solid ${legislationColors.accent}` }
                                                                : { borderLeft: `4px solid ${legislationColors.accent}` }
                                                            ),
                                                        }}
                                                    >
                                                        <div
                                                            className="text-slate-700"
                                                            style={{
                                                                fontFamily,
                                                                fontSize: '15px',
                                                                lineHeight: '1.7',
                                                            }}
                                                        >
                                                            {isLongMessage(approvedReply.content) ? (
                                                                <>
                                                                    <div
                                                                        className="line-clamp-4 break-words w-full overflow-hidden rich-text-content"
                                                                        dangerouslySetInnerHTML={{ __html: approvedReply.content }}
                                                                    />
                                                                    <button
                                                                        onClick={() => handleExpandMessage(approvedReply, opinion.title)}
                                                                        className="mt-2 hover:underline transition-colors block font-medium"
                                                                        style={{ color: 'var(--color-legislation-primary)' }}
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
                                                    </div>
                                                    <p
                                                        className="text-slate-500 mt-3"
                                                        style={{
                                                            fontFamily,
                                                            fontSize: '13px',
                                                            fontStyle: 'italic',
                                                        }}
                                                    >
                                                        {t('legalOpinions.approvedBy')}: {isArabic && approvedReply.replier ? approvedReply.replier.nameAr : approvedReply.replier ? approvedReply.replier.nameEn : t('common.unknown')}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
                    style={{ backgroundColor: '#FFFFFF' }}
                >
                    {/* Pagination Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(pagination.pageNumber - 1)}
                            disabled={!pagination.hasPreviousPage}
                            className={`p-2 rounded-lg transition-all ${!pagination.hasPreviousPage ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'}`}
                            title={t('common.prev')}
                        >
                            {isArabic ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                        </button>

                        <span className="text-sm font-medium text-gray-600 min-w-[3rem] text-center" style={{ fontFamily }}>
                            {pagination.totalPages > 0 ? `${pagination.pageNumber} / ${pagination.totalPages}` : ''}
                        </span>

                        <button
                            onClick={() => handlePageChange(pagination.pageNumber + 1)}
                            disabled={!pagination.hasNextPage}
                            className={`p-2 rounded-lg transition-all ${!pagination.hasNextPage ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'}`}
                            title={t('common.next')}
                        >
                            {isArabic ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg transition-all duration-200"
                        style={{
                            backgroundColor: '#F3F4F6',
                            color: '#374151',
                            fontFamily,
                            fontSize: '15px',
                            fontWeight: 500,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#E5E7EB';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#F3F4F6';
                        }}
                    >
                        {t('common.close', 'Close')}
                    </button>
                </div>
            </div>
        </div>
    );
}
