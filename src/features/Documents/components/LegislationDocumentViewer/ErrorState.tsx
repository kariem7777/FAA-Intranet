import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { BackButton } from './BackButton';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface ErrorStateProps {
    error: string | null;
    onBack: () => void;
}

export function ErrorState({ error, onBack }: ErrorStateProps) {
    const { isRTL, t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen"
            style={{ backgroundColor: 'var(--color-bg-subtle)' }}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <BackButton
                onBack={onBack}
            />

            {/* Error Content */}
            <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Dubai, Arial, sans-serif' }}>
                    {t('common.somethingWentWrong')}
                </h3>
                <p className="text-gray-500 mb-6" style={{ fontFamily: 'Dubai, Arial, sans-serif' }}>
                    {error || t('legislation.documentNotFound')}
                </p>
                <button
                    onClick={onBack}
                    className="px-6 py-3 rounded-lg transition-all hover:opacity-90"
                    style={{
                        backgroundColor: 'var(--color-faa-primary)',
                        color: 'var(--color-bg-white)',
                        fontSize: 'var(--font-size-base)',
                        fontWeight: 600,
                    }}
                >
                    {t('legislation.backToList')}
                </button>
            </div>
        </motion.div>
    );
}
