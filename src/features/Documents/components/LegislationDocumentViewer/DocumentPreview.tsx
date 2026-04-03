import { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { useTranslation } from '@/shared/hooks/useTranslation';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString();

interface DocumentPreviewProps {
    documentUrl: string;
    documentTitle: string;
}

export function DocumentPreview({ documentUrl, documentTitle }: DocumentPreviewProps) {
    const { t } = useTranslation();

    const containerRef = useRef<HTMLDivElement>(null);
    const pdfRef = useRef<any>(null);
    const renderTasksRef = useRef<Map<number, any>>(new Map());

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1.2);
    const [inputPage, setInputPage] = useState('1');

    // ── 1. Load the PDF document ───────────────────────────────────────────
    useEffect(() => {
        if (!documentUrl) return;

        setIsLoading(true);
        setError(null);
        setTotalPages(0);
        setCurrentPage(1);
        setInputPage('1');
        pdfRef.current = null;

        pdfjsLib
            .getDocument({
                url: documentUrl,
                cMapUrl: new URL('pdfjs-dist/cmaps/', import.meta.url).toString(),
                cMapPacked: true,
            })
            .promise
            .then((pdf: any) => {
                pdfRef.current = pdf;
                setTotalPages(pdf.numPages);
                setIsLoading(false);
            })
            .catch(() => {
                setError('Could not load the document. It may be unavailable or blocked.');
                setIsLoading(false);
            });
    }, [documentUrl]);

    // ── 2. Render a single page onto a canvas ─────────────────────────────
    const renderPage = useCallback(async (pageNum: number) => {
        if (!pdfRef.current || !containerRef.current) return;

        const existing = renderTasksRef.current.get(pageNum);
        if (existing) { try { existing.cancel(); } catch { } }

        const page = await pdfRef.current.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const canvas = document.getElementById(`pdf-page-${pageNum}`) as HTMLCanvasElement | null;
        if (!canvas) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const task = page.render({ canvasContext: canvas.getContext('2d')!, viewport });
        renderTasksRef.current.set(pageNum, task);

        try {
            await task.promise;
        } catch (e: any) {
            if (e?.name !== 'RenderingCancelledException') console.error(e);
        }
    }, [scale]);

    // ── 3. Re-render all pages when scale or totalPages change ─────────────
    useEffect(() => {
        if (!totalPages) return;
        for (let i = 1; i <= totalPages; i++) renderPage(i);
    }, [totalPages, scale, renderPage]);

    // ── 4. Scroll to current page ──────────────────────────────────────────
    useEffect(() => {
        document.getElementById(`pdf-page-${currentPage}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [currentPage]);

    const goToPage = (n: number) => {
        const clamped = Math.max(1, Math.min(n, totalPages));
        setCurrentPage(clamped);
        setInputPage(String(clamped));
    };

    const zoomIn = () => setScale(s => Math.min(s + 0.2, 3));
    const zoomOut = () => setScale(s => Math.max(s - 0.2, 0.6));

    const btnStyle: React.CSSProperties = {
        padding: '6px 12px',
        border: '1px solid var(--color-bg-light)',
        borderRadius: '6px',
        background: 'var(--color-bg-white)',
        color: 'var(--color-secondary)',
        cursor: 'pointer',
        fontSize: 'var(--font-size-sm)',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <div
            className="rounded-lg overflow-hidden border flex flex-col"
            style={{
                backgroundColor: 'var(--color-bg-white)',
                borderColor: 'var(--color-bg-light)',
                height: 'calc(100vh - 140px)',
            }}
        >
            {/* ── Toolbar ── */}
            {!isLoading && !error && totalPages > 0 && (
                <div
                    className="flex items-center justify-between px-4 py-2 border-b flex-shrink-0"
                    style={{ borderColor: 'var(--color-bg-light)', backgroundColor: 'var(--color-bg-white)' }}
                >
                    <div className="flex items-center gap-2">
                        <button style={btnStyle} onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}>‹</button>
                        <div className="flex items-center gap-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-secondary)' }}>
                            <input
                                type="number"
                                min={1}
                                max={totalPages}
                                value={inputPage}
                                onChange={e => setInputPage(e.target.value)}
                                onBlur={() => goToPage(Number(inputPage))}
                                onKeyDown={e => e.key === 'Enter' && goToPage(Number(inputPage))}
                                style={{
                                    width: '48px',
                                    textAlign: 'center',
                                    border: '1px solid var(--color-bg-light)',
                                    borderRadius: '4px',
                                    padding: '4px',
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-secondary)',
                                }}
                            />
                            <span>/ {totalPages}</span>
                        </div>
                        <button style={btnStyle} onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}>›</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button style={btnStyle} onClick={zoomOut}>－</button>
                        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-secondary)', minWidth: '44px', textAlign: 'center' }}>
                            {Math.round(scale * 100)}%
                        </span>
                        <button style={btnStyle} onClick={zoomIn}>＋</button>
                    </div>
                </div>
            )}

            {/* ── Loading / Error states ── */}
            {(isLoading || error) && (
                <div className="flex flex-col items-center justify-center flex-1 gap-4">
                    {isLoading && !error && (
                        <>
                            <div
                                className="w-12 h-12 rounded-full border-4 animate-spin"
                                style={{ borderColor: 'var(--color-legislation-active-indicator)', borderTopColor: 'transparent' }}
                            />
                            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-secondary)' }}>
                                {t('legislation.loadingDocument')}
                            </p>
                        </>
                    )}
                    {error && (
                        <>
                            <p style={{ color: 'var(--color-error, #ef4444)', fontSize: 'var(--font-size-base)' }}>
                                {error}
                            </p>
                            <a href={documentUrl} target="_blank" rel="noopener noreferrer"
                                className="underline" style={{ color: 'var(--color-legislation-active-indicator)' }}>
                                {t('legislation.openInNewTab')}
                            </a>
                        </>
                    )}
                </div>
            )}

            {/* ── Canvas pages ── */}
            {!error && (
                <div
                    ref={containerRef}
                    className="flex-1 overflow-y-auto flex flex-col items-center gap-4 py-4"
                    style={{ backgroundColor: '#f0f0f0' }}
                    onScroll={() => {
                        for (let i = 1; i <= totalPages; i++) {
                            const el = document.getElementById(`pdf-page-${i}`);
                            if (!el) continue;
                            const rect = el.getBoundingClientRect();
                            if (rect.top >= 0 || rect.bottom > window.innerHeight / 2) {
                                setCurrentPage(i);
                                setInputPage(String(i));
                                break;
                            }
                        }
                    }}
                >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <div
                            key={pageNum}
                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#fff' }}
                        >
                            <canvas id={`pdf-page-${pageNum}`} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}