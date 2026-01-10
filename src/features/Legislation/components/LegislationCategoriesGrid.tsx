import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LEGISLATION_CATEGORIES } from '../config/categories.config';

interface LegislationCategoriesGridProps {
    onCategorySelect: (id: number) => void;
}

export const LegislationCategoriesGrid = ({ onCategorySelect }: LegislationCategoriesGridProps) => {
    const { t, i18n } = useTranslation('legislation');
    const isRTL = i18n.dir() === 'rtl';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {LEGISLATION_CATEGORIES.map((category, index) => {
                // First row has shorter cards, second row has taller cards
                const isSecondRow = category.id >= 4;
                const cardHeight = isSecondRow ? 'h-[277.563px]' : 'h-[242.375px]';

                return (
                    <motion.div
                        key={category.id}
                        className="group relative cursor-pointer"
                        tabIndex={0}
                        role="button"
                        aria-label={`${t('accessLabel')} ${t(category.titleKey)}`}
                        onClick={() => onCategorySelect(category.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                    >
                        {/* Card with enhanced hover effects */}
                        <div
                            className={`relative bg-white rounded-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden ${isRTL ? 'h-[242.375px]' : cardHeight}  transition-all duration-300 ease-out
                                hover:shadow-[0_8px_20px_rgba(0,0,0,0.12),0_16px_40px_rgba(0,0,0,0.08)] 
                                hover:-translate-y-1 
                                hover:scale-[1.03]
                                active:scale-[0.99]
                                group`}
                        >
                            {/* Color Strip - RTL aware */}
                            <div
                                className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-[4px] transition-all duration-300 group-hover:w-[7px]`}
                                style={{
                                    backgroundColor: category.stripColor
                                }}
                            ></div>

                            {/* Background subtle highlight */}
                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                style={{ backgroundColor: '#f5f7fa' }}>
                            </div>

                            {/* Card Content */}
                            <div className="px-6 py-6 flex flex-col items-center justify-start h-full relative z-10">

                                {/* Icon/Emblem */}
                                <div className="flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 h-20">
                                    <img
                                        src={category.customImage}
                                        alt={`${t(category.titleKey)} emblem`}
                                        className={`object-contain opacity-90 transition-all duration-300 group-hover:opacity-100  ${category.id === 4 ? 'max-w-[140px] max-h-[90px]' : 'max-w-[72px] max-h-[72px]'
                                            }`}
                                    />
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-[22px] text-[#1d293d] mb-3 leading-[1.6] text-center transition-colors duration-300 group-hover:text-[#0b1a2b]"
                                    style={{
                                        fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                                        fontWeight: 600,
                                        letterSpacing: '-0.01em'
                                    }}
                                >
                                    {t(category.titleKey)}
                                </h3>

                                {/* Subtitle */}
                                <p
                                    className="text-[16px] text-[#62748e] leading-[1.6] text-center transition-colors duration-300 group-hover:text-[#374151]"
                                    style={{
                                        fontFamily: isRTL ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                                        fontWeight: 400
                                    }}
                                >
                                    {t(category.subtitleKey)}
                                </p>
                            </div>
                        </div>


                    </motion.div>
                );
            })}
        </div>
    );
};
