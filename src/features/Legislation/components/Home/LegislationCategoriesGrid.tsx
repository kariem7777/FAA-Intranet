import { motion } from 'framer-motion';
import { LEGISLATION_CATEGORIES } from '../../config/categories.config';
import { CategoryCard } from './CategoryCard';

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

export const LegislationCategoriesGrid = ({ onCategorySelect }: LegislationCategoriesGridProps) => {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {LEGISLATION_CATEGORIES.map((category, index) => (
                <motion.div key={category.id} variants={item}>
                    <CategoryCard
                        {...category}
                        index={index}
                        onClick={() => onCategorySelect(category.id)}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};
