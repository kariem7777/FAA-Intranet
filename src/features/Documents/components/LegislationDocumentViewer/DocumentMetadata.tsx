import { Hash, Building2, Calendar, FileText, Shield, Tags, FileCode, Clock } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { MetadataItem } from './MetadataItem';
import { ClassificationBadge } from './ClassificationBadge';
import { ActionButtons } from './ActionButtons';
import type { Document } from '../../types';

interface DocumentMetadataProps {
    document: Document
    onOpenInNewTab: () => void;
    onDownload: () => void;
}

// id: number,
// categoryId: number,
// subCategoryId: number,
// entityId: number,
// documentNameEn: string,
// documentNameAr: string,
// documentPhysicalPath: string,
// fileType: string,
// lawNumber: string,
// lawNameAr: string,
// lawNameEn: string,
// documentContent: string,
// classification: number,
// isActive: boolean,
// createdOn: string,
// updatedOn: string,
// categoryNameEn: string,
// categoryNameAr: string,
// subCategoryNameEn: string,
// subCategoryNameAr: string,
// entityNameEn: string,
// entityNameAr: string

export function DocumentMetadata({
    document,
    onOpenInNewTab,
    onDownload,
}: DocumentMetadataProps) {
    const { isRTL, t, getLocalizedString } = useTranslation();

    return (
        <div
            className="rounded-lg border p-6 sticky top-6"
            style={{
                backgroundColor: 'var(--color-bg-white)',
                borderColor: 'var(--color-bg-light)',
                maxHeight: 'calc(100vh - 160px)',
                overflowY: 'auto',
            }}
        >
            {/* Document Title */}
            <h1
                className="mb-6"
                style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    lineHeight: 1.3,
                }}
            >
                {isRTL ? document.documentNameAr : document.documentNameEn}
            </h1>

            {/* Divider */}
            <div className="h-px mb-6" style={{ backgroundColor: 'var(--color-bg-light)' }} />

            {/* Document Metadata */}
            <div className="space-y-5 mb-8">
                <MetadataItem
                    icon={Hash}
                    label={t('legislation.lawNumber')}
                    value={document.lawNumber}
                />

                <MetadataItem
                    icon={Building2}
                    label={t('legislation.entity')}
                    value={getLocalizedString(document.entityNameAr, document.entityNameEn)}
                />

                <MetadataItem
                    icon={Calendar}
                    label={t('legislation.issueDate')}
                    value={new Date(document.createdOn).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                />

                <MetadataItem
                    icon={FileText}
                    label={t('legislation.category')}
                    value={isRTL ? document.categoryNameAr : document.categoryNameEn}
                />

                <MetadataItem
                    icon={Tags}
                    label={t('legislation.subCategory')}
                    value={isRTL ? document.subCategoryNameAr : document.subCategoryNameEn}
                />

                <MetadataItem
                    icon={Shield}
                    label={t('legislation.classification')}
                    value={<ClassificationBadge classification={document.classification} />}
                />

                <MetadataItem
                    icon={Clock}
                    label={t('legislation.lastUpdated')}
                    value={new Date(document.updatedOn).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                />
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ backgroundColor: 'var(--color-bg-light)' }} />

            {/* Action Buttons */}
            <ActionButtons
                onOpenInNewTab={onOpenInNewTab}
                onDownload={onDownload}
            />
        </div>
    );
}
