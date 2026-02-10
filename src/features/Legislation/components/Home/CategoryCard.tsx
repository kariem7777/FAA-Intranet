import { motion } from 'framer-motion';
import { useTranslation } from '../../../../shared/hooks/useTranslation';
import type { LawCategory } from '../../types';

interface CategoryCardProps {
    category: LawCategory
    index: number;
    onClick: () => void;
}

export function CategoryCard({
    category,
    index,
    onClick,
}: CategoryCardProps) {
    const { isRTL, getLocalizedString } = useTranslation('legislation');

    return (
        <motion.div
            className="group relative cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label={getLocalizedString(category.lawCategoryEn, category.lawCategoryAr)}
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
                <div
                    className={`absolute ${isRTL ? 'right-0' : 'left-0'
                        } top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.75`}
                    style={{ backgroundColor: category.color }}
                />

                <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: 'var(--color-bg-subtle)' }}
                />

                <div className="px-6 py-6 flex flex-col items-center justify-start h-full relative z-5">
                    <div className="flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 h-20">
                        <img
                            src={category.imagePath}
                            alt={`${getLocalizedString(category.lawCategoryEn, category.lawCategoryAr)} emblem`}
                            className={`object-contain opacity-90 transition-all duration-300 group-hover:opacity-100 ${category.id === 4
                                ? 'max-w-35 max-h-22.5'
                                : 'max-w-18 max-h-18'
                                }`}
                        />
                    </div>

                    {/* Title */}
                    <h3
                        className="text-[22px] mb-3 leading-[1.6] text-center transition-colors duration-300"
                        style={{
                            fontFamily: isRTL
                                ? 'Dubai, Arial, sans-serif'
                                : 'Inter, system-ui, sans-serif',
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                            color: 'var(--color-text-primary)',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-dark)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                    >
                        {getLocalizedString(category.lawCategoryEn, category.lawCategoryAr)}
                    </h3>

                    {/* Subtitle */}
                    <p
                        className="text-[16px] leading-[1.6] text-center transition-colors duration-300"
                        style={{
                            fontFamily: isRTL
                                ? 'Dubai, Arial, sans-serif'
                                : 'Inter, system-ui, sans-serif',
                            fontWeight: 400,
                            color: 'var(--color-text-secondary)',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                    >
                        {getLocalizedString(category.descriptionEn, category.descriptionAr)}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
