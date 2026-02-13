import { Hash, Building2, Calendar, FileText, Shield } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { MetadataItem } from './MetadataItem';
import { ClassificationBadge } from './ClassificationBadge';
import { ActionButtons } from './ActionButtons';

interface DocumentMetadataProps {
    document: {
        title: string;
        titleAr: string;
        referenceNumber: string;
        entityName: string;
        entityNameAr: string;
        issueDate: string;
        year: number;
        classification: 'public' | 'secret';
    };
    fontSizeMultiplier?: number;
    onOpenInNewTab: () => void;
    onDownload: () => void;
    colors: {
        bgWhite: string;
        bgOffWhite: string;
        primary: string;
        accent: string;
        textPrimary: string;
        textSecondary: string;
    };
}

export function DocumentMetadata({
    document,
    fontSizeMultiplier = 1,
    onOpenInNewTab,
    onDownload,
    colors,
}: DocumentMetadataProps) {
    const { isRTL, t } = useTranslation();

    return (
        <div
            className="rounded-lg border p-6 sticky top-6"
            style={{
                backgroundColor: colors.bgWhite,
                borderColor: '#E5E7EB',
                maxHeight: 'calc(100vh - 160px)',
                overflowY: 'auto',
            }}
        >
            {/* Document Title */}
            <h1
                className="mb-6"
                style={{
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: `${28 * fontSizeMultiplier}px`,
                    fontWeight: 700,
                    color: colors.textPrimary,
                    lineHeight: 1.3,
                }}
            >
                {isRTL ? document.titleAr : document.title}
            </h1>

            {/* Divider */}
            <div className="h-px mb-6" style={{ backgroundColor: '#E5E7EB' }} />

            {/* Document Metadata */}
            <div className="space-y-5 mb-8">
                <MetadataItem
                    icon={Hash}
                    label={t('legislation.referenceNumber')}
                    value={document.referenceNumber}
                    fontSizeMultiplier={fontSizeMultiplier}
                    bgOffWhite={colors.bgOffWhite}
                    primary={colors.primary}
                    textSecondary={colors.textSecondary}
                    textPrimary={colors.textPrimary}
                />

                <MetadataItem
                    icon={Building2}
                    label={t('legislation.entity')}
                    value={isRTL ? document.entityNameAr : document.entityName}
                    fontSizeMultiplier={fontSizeMultiplier}
                    bgOffWhite={colors.bgOffWhite}
                    primary={colors.primary}
                    textSecondary={colors.textSecondary}
                    textPrimary={colors.textPrimary}
                />

                <MetadataItem
                    icon={Calendar}
                    label={t('legislation.issueDate')}
                    value={new Date(document.issueDate).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                    fontSizeMultiplier={fontSizeMultiplier}
                    bgOffWhite={colors.bgOffWhite}
                    primary={colors.primary}
                    textSecondary={colors.textSecondary}
                    textPrimary={colors.textPrimary}
                />

                <MetadataItem
                    icon={FileText}
                    label={t('legislation.year')}
                    value={document.year}
                    fontSizeMultiplier={fontSizeMultiplier}
                    bgOffWhite={colors.bgOffWhite}
                    primary={colors.primary}
                    textSecondary={colors.textSecondary}
                    textPrimary={colors.textPrimary}
                />

                <MetadataItem
                    icon={Shield}
                    label={t('legislation.classification')}
                    value={<ClassificationBadge classification={document.classification} />}
                    fontSizeMultiplier={fontSizeMultiplier}
                    bgOffWhite={colors.bgOffWhite}
                    primary={colors.primary}
                    textSecondary={colors.textSecondary}
                    textPrimary={colors.textPrimary}
                />
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ backgroundColor: '#E5E7EB' }} />

            {/* Action Buttons */}
            <ActionButtons
                onOpenInNewTab={onOpenInNewTab}
                onDownload={onDownload}
                accent={colors.accent}
                primary={colors.primary}
            />
        </div>
    );
}
