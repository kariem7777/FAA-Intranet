import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface BackButtonProps {
    onBack: () => void;
    fontSizeMultiplier?: number;
}

export function BackButton({ onBack }: BackButtonProps) {
    const { isRTL, t } = useTranslation();

    return (
        <div
            className="border-b"
            style={{
                backgroundColor: 'var(--color-bg-white)',
                borderColor: 'var(--color-bg-light)',
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 py-3">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-gray-100"
                    style={{
                        fontSize: `var(--font-size-base)`,
                        fontWeight: 600,
                        color: 'var(--color-faa-primary)',
                    }}
                >
                    <ArrowLeft className="w-5 h-5" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                    {t('legislation.backToList')}
                </button>
            </div>
        </div>
    );
}
