import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { RootState, AppDispatch } from '@/store';
import { clearDocument } from '../slices/legislationDocumentSlice';
import { BackButton } from '../components/LegislationDocumentViewer/BackButton';
import { DocumentMetadata } from '../components/LegislationDocumentViewer/DocumentMetadata';
import { DocumentPreview } from '../components/LegislationDocumentViewer/DocumentPreview';
import { ErrorState } from '../components/LegislationDocumentViewer/ErrorState';
import { LoadingState } from '../components/LegislationDocumentViewer/LoadingState';


interface LegislationDocumentViewerProps {
  onBack: () => void;
  fontSizeMultiplier?: number;
}

export function LegislationDocumentViewer({ onBack, fontSizeMultiplier = 1 }: LegislationDocumentViewerProps) {
  const { isRTL } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { document, loading, error } = useSelector((state: RootState) => state.legislationDocument);

  useEffect(() => {
    return () => {
      dispatch(clearDocument());
    };
  }, [dispatch]);

  const colors = {
    primary: '#0F2A44',
    accent: '#C9A24D',
    bgOffWhite: '#F7F8FA',
    bgWhite: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#5A5A5A',
  };

  const getPdfUrl = () => {
    if (document?.pdfUrl) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(document.pdfUrl)}&embedded=true`;
    }
    const pdfUrl = 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf';
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  };

  const documentUrl = getPdfUrl();

  const handleOpenInNewTab = () => {
    window.open(documentUrl, '_blank');
  };

  const handleDownload = () => {
    if (document?.pdfUrl) {
      const link = window.document.createElement('a');
      link.href = document.pdfUrl;
      link.download = `${document.referenceNumber}.pdf`;
      link.click();
    }
  };

  // Loading State
  if (loading) {
    return <LoadingState onBack={onBack} fontSizeMultiplier={fontSizeMultiplier} colors={colors} />;
  }

  // Error State
  if (error || !document) {
    return <ErrorState error={error} onBack={onBack} fontSizeMultiplier={fontSizeMultiplier} colors={colors} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
      style={{ backgroundColor: colors.bgOffWhite }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <BackButton
        onBack={onBack}
        fontSizeMultiplier={fontSizeMultiplier}
        bgWhite={colors.bgWhite}
        primary={colors.primary}
      />

      {/* Main Content - Side by Side Layout */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT SIDEBAR - Document Details */}
          <div className="col-span-4">
            <DocumentMetadata
              document={document}
              fontSizeMultiplier={fontSizeMultiplier}
              onOpenInNewTab={handleOpenInNewTab}
              onDownload={handleDownload}
              colors={colors}
            />
          </div>

          {/* RIGHT SIDE - Document Preview */}
          <div className="col-span-8">
            <DocumentPreview
              documentUrl={documentUrl}
              documentTitle={isRTL ? document.titleAr : document.title}
              bgWhite={colors.bgWhite}
              accent={colors.accent}
              textSecondary={colors.textSecondary}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
