import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { RootState, AppDispatch } from '@/store';
import { fetchDocumentDetails, clearSelectedDocument, setSelectedDocument } from '@/features/Documents/slices/documentsManagementSlice';
import { BackButton } from '../components/LegislationDocumentViewer/BackButton';
import { DocumentMetadata } from '../components/LegislationDocumentViewer/DocumentMetadata';
import { DocumentPreview } from '../components/LegislationDocumentViewer/DocumentPreview';
import { ErrorState } from '../components/LegislationDocumentViewer/ErrorState';
import { LoadingState } from '../components/LegislationDocumentViewer/LoadingState';

interface LegislationDocumentViewerProps {
    documentId: number;
    onBack: () => void;
}

export function LegislationDocumentViewer({ documentId, onBack }: LegislationDocumentViewerProps) {
    const { isRTL } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const { selectedDocument: document, items, loading, error } = useSelector((state: RootState) => state.documentsManagement);

    useEffect(() => {
        if (documentId) {
            if (document && document.id === documentId) return;
            const existingDoc = items.find(doc => doc.id === documentId);
            if (existingDoc) {
                dispatch(setSelectedDocument(existingDoc));
                return;
            }
            dispatch(fetchDocumentDetails(documentId));
        }
    }, [dispatch, documentId, document, items]);

    useEffect(() => {
        return () => {
            dispatch(clearSelectedDocument());
        };
    }, [dispatch]);

    const getPdfUrl = () => {
        return document?.documentPhysicalPath || '';
    };

    const documentUrl = getPdfUrl();

    const handleOpenInNewTab = () => {
        window.open(documentUrl, '_blank');
    };

    const handleDownload = () => {
        if (document?.documentPhysicalPath) {
            const link = window.document.createElement('a');
            link.href = document.documentPhysicalPath;
            link.download = `${document.lawNumber}.pdf`;
            link.click();
        }
    };

    // Loading State
    if (loading.fetch) {
        return <LoadingState onBack={onBack} />;
    }

    // Error State
    if (error.fetch || !document) {
        return <ErrorState error={error.fetch} onBack={onBack} />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen"
            style={{ backgroundColor: 'rgb(250, 250, 248)' }}
        >
            <BackButton
                onBack={onBack}
            />

            {/* Main Content - Side by Side Layout */}
            <div className="max-w-[1400px] mx-auto px-6 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* LEFT SIDEBAR - Document Details */}
                    <div className="col-span-12 md:col-span-4">
                        <DocumentMetadata
                            document={document}
                            onOpenInNewTab={handleOpenInNewTab}
                            onDownload={handleDownload}
                        />
                    </div>

                    {/* RIGHT SIDE - Document Preview */}
                    <div className="col-span-12 md:col-span-8">
                        <DocumentPreview
                            documentUrl={documentUrl}
                            documentTitle={isRTL ? document.documentNameAr : document.documentNameEn}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
