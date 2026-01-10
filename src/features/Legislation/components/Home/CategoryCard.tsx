import { motion } from 'framer-motion';
import { useTranslation } from '../../../../shared/hooks/useTranslation';

interface CategoryCardProps {
    id: number;
    titleKey: string;
    subtitleKey: string;
    customImage: string;
    stripColor: string;
    index: number;
    onClick: () => void;
}

export function CategoryCard({
    id,
    titleKey,
    subtitleKey,
    customImage,
    stripColor,
    index,
    onClick,
}: CategoryCardProps) {
    const { t, isRTL } = useTranslation('legislation');

    return (
        <motion.div
            className="group relative cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label={`${t('accessLabel')} ${t(titleKey)}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            <div
                className={`relative bg-white rounded-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden ${isRTL ? 'h-[242.375px]' : 'h-[242.375px]'
                    } transition-all duration-300 ease-out
          hover:shadow-[0_8px_20px_rgba(0,0,0,0.12),0_16px_40px_rgba(0,0,0,0.08)] 
          hover:-translate-y-1 
          hover:scale-[1.03]
          active:scale-[0.99]
          group`}
            >
                {/* Color Strip - RTL aware */}
                <div
                    className={`absolute ${isRTL ? 'right-0' : 'left-0'
                        } top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.75`}
                    style={{ backgroundColor: stripColor }}
                />

                {/* Background subtle highlight */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: '#f5f7fa' }}
                />

                {/* Card Content */}
                <div className="px-6 py-6 flex flex-col items-center justify-start h-full relative z-10">
                    {/* Icon/Emblem */}
                    <div className="flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 h-20">
                        <img
                            src={customImage}
                            alt={`${t(titleKey)} emblem`}
                            className={`object-contain opacity-90 transition-all duration-300 group-hover:opacity-100 ${id === 4
                                ? 'max-w-35 max-h-22.5'
                                : 'max-w-18 max-h-18'
                                }`}
                        />
                    </div>

                    {/* Title */}
                    <h3
                        className="text-[22px] text-[#1d293d] mb-3 leading-[1.6] text-center transition-colors duration-300 group-hover:text-[#0b1a2b]"
                        style={{
                            fontFamily: isRTL
                                ? 'Dubai, Arial, sans-serif'
                                : 'Inter, system-ui, sans-serif',
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {t(titleKey)}
                    </h3>

                    {/* Subtitle */}
                    <p
                        className="text-[16px] text-[#62748e] leading-[1.6] text-center transition-colors duration-300 group-hover:text-[#374151]"
                        style={{
                            fontFamily: isRTL
                                ? 'Dubai, Arial, sans-serif'
                                : 'Inter, system-ui, sans-serif',
                            fontWeight: 400,
                        }}
                    >
                        {t(subtitleKey)}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
