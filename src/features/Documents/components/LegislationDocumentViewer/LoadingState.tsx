import { motion } from 'framer-motion';
import { Shimmer } from '@/shared/components/Shimmer/Shimmer';
import { BackButton } from './BackButton';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface LoadingStateProps {
    onBack: () => void;
    fontSizeMultiplier?: number;
    colors: {
        bgOffWhite: string;
        bgWhite: string;
        primary: string;
        accent: string;
        textSecondary: string;
    };
}

export function LoadingState({ onBack, fontSizeMultiplier = 1, colors }: LoadingStateProps) {
    const { isRTL, t } = useTranslation();

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

            {/* Loading Skeleton */}
            <div className="max-w-[1400px] mx-auto px-6 py-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-4">
                        <div className="rounded-lg border p-6" style={{ backgroundColor: colors.bgWhite, borderColor: '#E5E7EB' }}>
                            <Shimmer width="80%" height={32} className="mb-6" />
                            <div className="h-px mb-6" style={{ backgroundColor: '#E5E7EB' }} />
                            <div className="space-y-5">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Shimmer width={40} height={40} rounded="rounded-lg" />
                                        <div className="flex-1">
                                            <Shimmer width={80} height={14} className="mb-2" />
                                            <Shimmer width="60%" height={18} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-8">
                        <div className="rounded-lg overflow-hidden border" style={{ backgroundColor: colors.bgWhite, borderColor: '#E5E7EB', height: 'calc(100vh - 140px)' }}>
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                    <div
                                        className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
                                        style={{ borderColor: colors.accent, borderTopColor: 'transparent' }}
                                    />
                                    <p style={{ fontFamily: 'Dubai, Arial, sans-serif', fontSize: '15px', color: colors.textSecondary }}>
                                        {t('legislation.loadingDocument')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
