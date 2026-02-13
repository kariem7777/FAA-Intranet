import { ArrowUp } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface ScrollToTopButtonProps {
    visible: boolean;
    onClick: () => void;
}

const LEGISLATION_COLORS = {
    accent: '#C9A24D',
};

export function ScrollToTopButton({
    visible,
    onClick,
}: ScrollToTopButtonProps) {
    const { t, isRTL } = useTranslation();

    if (!visible) return null;

    return (
        <button
            onClick={onClick}
            className="fixed z-50 rounded-full shadow-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 group flex items-center gap-3"
            style={{
                bottom: '40px',
                [isRTL ? 'left' : 'right']: '40px',
                backgroundColor: LEGISLATION_COLORS.accent,
                color: '#FFFFFF',
                padding: '16px 24px',
            }}
            aria-label={t('legalOpinions.returnToTop')}
        >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:translate-y-[-4px]" />
            <span className="text-sm font-semibold" >
                {t('legalOpinions.returnToTop')}
            </span>
        </button>
    );
}
