import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface BackButtonProps {
    onBack: () => void;
    fontSizeMultiplier?: number;
    bgWhite: string;
    primary: string;
}

export function BackButton({ onBack, fontSizeMultiplier = 1, bgWhite, primary }: BackButtonProps) {
    const { isRTL, t } = useTranslation();

    return (
        <div
            className="border-b"
            style={{
                backgroundColor: bgWhite,
                borderColor: '#E5E7EB',
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 py-3">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-gray-100"
                    style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: `${15 * fontSizeMultiplier}px`,
                        fontWeight: 600,
                        color: primary,
                    }}
                >
                    <ArrowLeft className="w-5 h-5" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                    {t('legislation.backToList')}
                </button>
            </div>
        </div>
    );
}
