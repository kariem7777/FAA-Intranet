import { useState } from 'react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface DocumentPreviewProps {
    documentUrl: string;
    documentTitle: string;
    bgWhite: string;
    accent: string;
    textSecondary: string;
}

export function DocumentPreview({
    documentUrl,
    documentTitle,
    bgWhite,
    accent,
    textSecondary,
}: DocumentPreviewProps) {
    const { t } = useTranslation();
    const [isPdfLoading, setIsPdfLoading] = useState(true);

    return (
        <div
            className="rounded-lg overflow-hidden border relative"
            style={{
                backgroundColor: bgWhite,
                borderColor: '#E5E7EB',
                height: 'calc(100vh - 140px)',
            }}
        >
            {/* Loading Overlay */}
            {isPdfLoading && (
                <div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    style={{ backgroundColor: bgWhite }}
                >
                    <div className="text-center">
                        <div
                            className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
                            style={{
                                borderColor: accent,
                                borderTopColor: 'transparent',
                            }}
                        />
                        <p
                            style={{
                                fontFamily: 'Dubai, Arial, sans-serif',
                                fontSize: '15px',
                                color: textSecondary,
                            }}
                        >
                            {t('legislation.loadingDocument')}
                        </p>
                    </div>
                </div>
            )}

            {/* PDF Iframe */}
            <iframe
                src={documentUrl}
                className="w-full h-full"
                title={documentTitle}
                onLoad={() => setIsPdfLoading(false)}
                style={{ border: 'none' }}
            />
        </div>
    );
}
