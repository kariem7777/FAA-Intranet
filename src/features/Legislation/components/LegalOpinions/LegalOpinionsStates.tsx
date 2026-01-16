import { AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Shimmer } from '@/shared/components/Shimmer/Shimmer';
import { Button } from '@/shared/components/ui/button';

interface LegalOpinionsLoadingProps {
    fontSizeMultiplier?: number;
}

// Shimmer skeleton for a single opinion card
function OpinionCardSkeleton() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
                {/* Icon placeholder */}
                <Shimmer width={48} height={48} rounded="rounded-lg" />
                <div className="flex-1 space-y-3">
                    {/* Title */}
                    <Shimmer width="70%" height={20} />
                    {/* Subtitle */}
                    <Shimmer width="50%" height={16} />
                    {/* Date and status row */}
                    <div className="flex items-center gap-4 pt-2">
                        <Shimmer width={100} height={14} />
                        <Shimmer width={80} height={24} rounded="rounded-full" />
                    </div>
                </div>
                {/* Arrow */}
                <Shimmer width={24} height={24} rounded="rounded-full" />
            </div>
        </div>
    );
}

export function LegalOpinionsLoading(_props: LegalOpinionsLoadingProps) {
    return (
        <div className="space-y-4">
            {/* Show 5 skeleton cards */}
            {Array.from({ length: 5 }).map((_, index) => (
                <OpinionCardSkeleton key={index} />
            ))}
        </div>
    );
}

// Shimmer skeleton for the detail page - matches exact page layout
export function LegalOpinionDetailLoading() {
    return (
        <div className="grid grid-cols-12 gap-6">
            {/* LEFT SIDEBAR - Enquiry Details Skeleton */}
            <div className="col-span-4">
                <div className="bg-white rounded-lg border p-6" style={{ borderColor: '#E5E7EB' }}>
                    {/* Header with border */}
                    <div className="mb-6 pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                        <Shimmer width="60%" height={22} />
                    </div>

                    <div className="space-y-5">
                        {/* Title */}
                        <div>
                            <Shimmer width="30%" height={12} className="mb-2" />
                            <Shimmer width="90%" height={18} />
                            <Shimmer width="70%" height={18} className="mt-1" />
                        </div>

                        {/* Department */}
                        <div>
                            <Shimmer width="40%" height={12} className="mb-2" />
                            <div className="flex items-center gap-2">
                                <Shimmer width={16} height={16} rounded="rounded" />
                                <Shimmer width="60%" height={18} />
                            </div>
                        </div>

                        {/* Submission Date */}
                        <div>
                            <Shimmer width="50%" height={12} className="mb-2" />
                            <div className="flex items-center gap-2">
                                <Shimmer width={16} height={16} rounded="rounded" />
                                <Shimmer width="45%" height={18} />
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <Shimmer width="25%" height={12} className="mb-2" />
                            <Shimmer width={90} height={28} rounded="rounded-full" />
                        </div>

                        {/* Reply Date */}
                        <div>
                            <Shimmer width="35%" height={12} className="mb-2" />
                            <div className="flex items-center gap-2">
                                <Shimmer width={16} height={16} rounded="rounded" />
                                <Shimmer width="45%" height={18} />
                            </div>
                        </div>

                        {/* Replied By */}
                        <div>
                            <Shimmer width="35%" height={12} className="mb-2" />
                            <div className="flex items-center gap-2">
                                <Shimmer width={16} height={16} rounded="rounded" />
                                <Shimmer width="75%" height={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SECTION - Cards Skeleton */}
            <div className="col-span-8 space-y-6">
                {/* Enquiry Card Skeleton */}
                <div className="bg-white rounded-lg border" style={{ borderColor: '#E5E7EB' }}>
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Shimmer width={20} height={20} rounded="rounded" />
                            <Shimmer width="20%" height={20} />
                        </div>
                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#F8FAFC' }}>
                            <div className="space-y-2">
                                <Shimmer width="100%" height={16} />
                                <Shimmer width="100%" height={16} />
                                <Shimmer width="65%" height={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Approved Opinion Card Skeleton */}
                <div className="bg-white rounded-lg border-2" style={{ borderColor: '#22C55E' }}>
                    {/* Header */}
                    <div
                        className="px-6 py-4 flex items-center justify-between border-b rounded-t-lg"
                        style={{ backgroundColor: '#F0FDF4', borderColor: '#86EFAC' }}
                    >
                        <div className="flex items-center gap-3">
                            <Shimmer width={40} height={40} rounded="rounded-full" />
                            <Shimmer width={180} height={22} />
                        </div>
                        <Shimmer width={100} height={36} rounded="rounded-lg" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div
                            className="p-5 rounded-lg mb-5"
                            style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}
                        >
                            <div className="space-y-2">
                                <Shimmer width="100%" height={16} />
                                <Shimmer width="100%" height={16} />
                                <Shimmer width="100%" height={16} />
                                <Shimmer width="80%" height={16} />
                            </div>
                        </div>

                        {/* Approval Metadata */}
                        <div className="grid grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                            <div>
                                <Shimmer width="40%" height={12} className="mb-2" />
                                <div className="flex items-center gap-2">
                                    <Shimmer width={16} height={16} rounded="rounded" />
                                    <Shimmer width="50%" height={18} />
                                </div>
                            </div>
                            <div>
                                <Shimmer width="40%" height={12} className="mb-2" />
                                <div className="flex items-center gap-2">
                                    <Shimmer width={16} height={16} rounded="rounded" />
                                    <Shimmer width="70%" height={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conversation Toggle Button Skeleton - just the centered button */}
                <div className="flex justify-center">
                    <Shimmer width={220} height={48} rounded="rounded-lg" />
                </div>
            </div>
        </div>
    );
}

interface LegalOpinionsErrorProps {
    message?: string;
    onRetry?: () => void;
    fontSizeMultiplier?: number;
}

export function LegalOpinionsError({
    message,
    onRetry,
    fontSizeMultiplier = 1
}: LegalOpinionsErrorProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3
                className="mb-2"
                style={{
                    fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                    fontSize: `${18 * fontSizeMultiplier}px`,
                    fontWeight: 600,
                    color: '#1F2937',
                }}
            >
                {t('legalOpinions.errorLoadingOpinions')}
            </h3>
            {message && (
                <p
                    className="mb-6 text-center max-w-md"
                    style={{
                        fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                        fontSize: `${14 * fontSizeMultiplier}px`,
                        color: '#64748B',
                    }}
                >
                    {message}
                </p>
            )}
            {onRetry && (
                <Button
                    onClick={onRetry}
                    className="bg-[#2F4F6F] hover:bg-[#253D54] text-white gap-2"
                    size="lg"
                >
                    <RefreshCw className="w-4 h-4" />
                    {t('common.retry')}
                </Button>
            )}
        </div>
    );
}
