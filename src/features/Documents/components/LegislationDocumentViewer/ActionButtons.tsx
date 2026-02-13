import { Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface ActionButtonsProps {
    onOpenInNewTab: () => void;
    onDownload: () => void;
}

export function ActionButtons({ onOpenInNewTab, onDownload }: ActionButtonsProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-3">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenInNewTab}
                className="w-full px-6 py-3.5 rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 font-base bg-faa-primary"
                style={{
                    color: 'white',
                    fontWeight: 600,
                }}
            >
                <ExternalLink className="w-5 h-5" />
                {t('legislation.openInNewTab')}
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDownload}
                className="w-full px-6 py-3.5 rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 font-base bg-faa-primary"
                style={{
                    color: 'white',
                    fontWeight: 600,
                }}
            >
                <Download className="w-5 h-5" />
                {t('legislation.downloadDocument')}
            </motion.button>
        </div>
    );
}
