import { ArrowUp } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface ReturnToTopButtonProps {
    visible: boolean;
    onClick: () => void;
}

export function ReturnToTopButton({ visible, onClick }: ReturnToTopButtonProps) {
    const { t, isRTL } = useTranslation();

    if (!visible) return null;

    return (
        <button
            onClick={onClick}
            className={`fixed bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl bg-legislation-active-indicator text-black`}
        >
            <ArrowUp className="h-4 w-4" />
            <span className="text-[15px] font-medium">{t('legalOpinions.returnToSearch')}</span>
        </button>
    );
}
