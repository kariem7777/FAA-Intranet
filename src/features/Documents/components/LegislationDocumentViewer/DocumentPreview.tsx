import { useState } from 'react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface DocumentPreviewProps {
    documentUrl: string;
    documentTitle: string;
}

export function DocumentPreview({
    documentUrl,
    documentTitle,
}: DocumentPreviewProps) {
    const { t } = useTranslation();
    const [isPdfLoading, setIsPdfLoading] = useState(true);

    return (
        <div
            className="rounded-lg overflow-hidden border relative"
            style={{
                backgroundColor: 'var(--color-bg-white)',
                borderColor: 'var(--color-bg-light)',
                height: 'calc(100vh - 140px)',
            }}
        >
            {/* Loading Overlay */}
            {isPdfLoading && (
                <div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    style={{ backgroundColor: 'var(--color-bg-white)' }}
                >
                    <div className="text-center">
                        <div
                            className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
                            style={{
                                borderColor: 'var(--color-legislation-active-indicator)',
                                borderTopColor: 'transparent',
                            }}
                        />
                        <p
                            style={{
                                fontSize: 'var(--font-size-base)',
                                color: 'var(--color-secondary)',
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
