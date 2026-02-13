import { motion } from 'framer-motion';
import { CategoryCard } from './CategoryCard';
import { CategoryCardSkeleton } from './CategoryCardSkeleton';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { AlertCircle } from 'lucide-react';
import type { LawCategory } from '../../types';

interface LegislationCategoriesGridProps {
    onCategorySelect: (id: number) => void;
}

const container: any = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
};

const LegalOpinionsCategory: LawCategory = {
    id: 0,
    lawCategoryEn: "Legal Opinions",
    lawCategoryAr: "الآراء القانونية",
    descriptionEn: "Legal opinions and consultations issued by the Authority",
    descriptionAr: "الآراء والاستشارات القانونية الصادرة عن الهيئة",
    color: '#2F4F6F',
    imagePath: '/src/assets/categories/legal-opinions.png',
    isActive: true,
}
export const LegislationCategoriesGrid = ({ onCategorySelect }: LegislationCategoriesGridProps) => {
    const { categories } = useSelector((state: RootState) => state.legislationSlice);
    const { t } = useTranslation();

    if (categories.loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {[...Array(6)].map((_, index) => (
                    <CategoryCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (categories.error) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center py-16 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md w-full">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-red-900 mb-2">
                            {t('legislation.failedToLoadCategories')}
                        </h3>
                        <p className="text-red-700 text-sm mb-6">
                            {categories.error}
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (!categories.items || categories.items.length === 0) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center py-16 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                    <p className="text-gray-500 text-lg">{t('common.noResultsFound')}</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {categories.items.map((category, index) => (
                <motion.div key={category.id} variants={item}>
                    <CategoryCard
                        category={category}
                        index={index}
                        onClick={() => onCategorySelect(category.id)}
                    />
                </motion.div>
            ))}
            <CategoryCard
                category={LegalOpinionsCategory}
                index={categories.items.length}
                onClick={() => onCategorySelect(-1)}
            />
        </motion.div>
    );
};
