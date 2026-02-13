import { Eye, Calendar, FileText } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { LegislationDocument } from '../../types';
import { motion } from 'framer-motion';

interface LegislationDocumentCardProps {
    document: LegislationDocument;
    onView?: (doc: LegislationDocument) => void;
}

export function LegislationDocumentCard({ document: doc, onView }: LegislationDocumentCardProps) {
    const { isRTL, t } = useTranslation();

    const colors = {
        bgWhite: '#FFFFFF',
        textPrimary: '#1A1A1A',
        textSecondary: '#5A5A5A',
        primary: '#0F2A44',
    };

    const ClassificationBadge = ({ classification }: { classification: 'public' | 'secret' }) => {
        const config = {
            public: { bg: '#E8F5E9', text: '#2F7D32', label: t('legislation.public') },
            secret: { bg: '#FFEBEE', text: '#9B1C1C', label: t('legislation.secret') },
        }[classification];

        return (
            <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{ backgroundColor: config.bg, color: config.text, fontFamily: 'Dubai, Arial, sans-serif' }}
            >
                {config.label}
            </span>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            transition={{ duration: 0.3 }}
            className="group rounded-xl border bg-white"
            style={{ borderColor: '#E5E7EB' }}
        >
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h3
                            className="mb-3 text-lg font-bold leading-snug"
                            style={{ fontFamily: 'Dubai, Arial, sans-serif', color: colors.textPrimary }}
                        >
                            {isRTL ? doc.titleAr : doc.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: colors.textSecondary }}>
                            <span className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span className="font-mono">{doc.referenceNumber}</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-mono">{doc.issueDate}</span>
                            </span>
                        </div>
                    </div>

                    <ClassificationBadge classification={doc.classification} />
                </div>

                <div className="h-px my-4 bg-gray-100" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                            {/* Ideally replace with entity logo using doc.entityId */}
                            <span className="text-xs font-bold text-gray-400">{doc.entityId.substring(0, 2).toUpperCase()}</span>
                        </div>
                        <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                            {isRTL ? doc.entityNameAr : doc.entityName}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onView && onView(doc)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-gray-50 font-medium text-sm"
                            style={{ color: colors.primary }}
                        >
                            <Eye className="w-4 h-4" />
                            {t('legislation.viewDocument')}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
