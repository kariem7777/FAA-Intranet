import { Eye, Calendar, FileText } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { Document } from '../../types';
import { motion } from 'framer-motion';

interface LegislationDocumentCardProps {
    document: Document;
    onView?: (doc: Document) => void;
}

export function LegislationDocumentCard({ document: doc, onView }: LegislationDocumentCardProps) {
    const { isRTL, t } = useTranslation();

    const ClassificationBadge = ({ classification }: { classification: number }) => {
        const config = {
            1: {
                bg: 'var(--color-msg-admin-bg)',
                text: 'var(--color-msg-admin-text)',
                label: t('legislation.public')
            },
            2: {
                bg: 'var(--color-bg-red-light)',
                text: 'var(--color-accent-red)',
                label: t('legislation.secret')
            },
        }[classification as 1 | 2] || {
            bg: 'var(--color-bg-card)',
            text: 'var(--color-secondary)',
            label: t('legislation.unknown')
        };

        return (
            <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                    backgroundColor: config.bg,
                    color: config.text,
                    fontFamily: 'Dubai, Arial, sans-serif',
                    fontSize: 'var(--font-size-sm)'
                }}
            >
                {config.label}
            </span>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -2,
                backgroundColor: 'rgba(144, 142, 129, 0.08)', // primary + 15
                boxShadow: '0 8px 20px rgba(47, 79, 111, 0.18)',
                borderInlineStart: '4px solid var(--color-legislation-active-indicator)',
                scale: 1.03
            }}
            transition={{ duration: 0.02 }}
            className="group p-6 rounded-xl border transition-all duration-300 cursor-pointer"
            style={{
                backgroundColor: 'var(--color-bg-white)',
                borderColor: 'rgba(144, 142, 129, 0.3)',
            }}
            onClick={() => onView && onView(doc)}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    {/* Document Title */}
                    <h3
                        className="mb-3 font-bold leading-snug break-words"
                        style={{
                            color: 'var(--color-primary)',
                            fontSize: 'var(--font-size-xl)'
                        }}
                    >
                        {isRTL ? doc.documentNameAr : doc.documentNameEn}
                    </h3>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                        <span className="flex items-center gap-2" style={{ color: 'var(--color-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            <FileText className="w-4 h-4" />
                            <span className="font-mono">{doc.lawNumber}</span>
                        </span>
                        <span className="flex items-center gap-2" style={{ color: 'var(--color-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            <Calendar className="w-4 h-4" />
                            <span className="font-mono">{new Date(doc.createdOn).toLocaleDateString(isRTL ? 'ar-AE' : 'en-GB')}</span>
                        </span>
                        <ClassificationBadge classification={doc.classification} />
                    </div>

                    {/* Entity Name */}
                    <div className="flex items-center gap-2 mt-4">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-faa-primary/20 overflow-hidden">
                            <span className="text-xs font-bold text-gray-400">FA</span>
                        </div>
                        <p className="font-medium" style={{ color: 'var(--color-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            {isRTL ? doc.entityNameAr : doc.entityNameEn}
                        </p>
                    </div>
                </div>

                {/* View Document Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onView && onView(doc);
                    }}
                    className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold"
                    style={{
                        backgroundColor: 'var(--color-faa-primary)',
                        color: 'var(--color-bg-white)',
                        fontSize: 'var(--font-size-sm)'
                    }}
                >
                    <Eye className="w-4 h-4" />
                    {t('legislation.viewDocument')}
                </motion.button>
            </div>
        </motion.div>
    );
}
