import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { motion } from 'framer-motion';
import type { AppDispatch, RootState } from '@/store';
import { setSelectedEntity, setSearchQuery } from '@/features/Documents/slices/documentsManagementSlice';
import { fetchEntities } from '@/features/Legislation/slices/legislationSlice';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { FetchingSelect } from '@/shared/components/Select/FetchingSelect';
import type { Entities, LawSubCategory } from '@/features/Legislation/types';
import useDebounce from '@/shared/hooks/useDebouncing';

export function LegislationFilters() {
    const { isRTL, t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const debounce = useDebounce();

    const { filters } = useSelector((state: RootState) => state.documentsManagement);
    const [searchTerm, setSearchTerm] = useState(filters.searchQuery);

    const { items: entities, loading: entitiesLoading, error } = useSelector((state: RootState) => state.legislationSlice.entities);
    const { subCategories, categories } = useSelector((state: RootState) => state.legislationSlice);

    const activeCategory = categories.items.find(cat => cat.id === filters.selectedCategory);
    const isEntityLegislation = activeCategory?.slug === 'entity-legislation';

    const currentSubCategoryName = subCategories.items.find((c: LawSubCategory) => c.id === filters.selectedSubCategory)?.[isRTL ? 'lawSubCategoryAr' : 'lawSubCategoryEn'] || '';

    useEffect(() => {
        setSearchTerm(filters.searchQuery);
    }, [filters.searchQuery]);

    const handleSearchChange = (val: string) => {
        setSearchTerm(val);
        debounce(() => {
            dispatch(setSearchQuery(val));
        }, 500);
    };

    const handleRetryEntities = () => dispatch(fetchEntities());

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`grid grid-cols-1 ${isEntityLegislation ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-4 lg:gap-6 mb-6 lg:mb-10 p-3 items-end`}
        >
            {/* Entity Dropdown */}
            {isEntityLegislation && (
                <div className="relative">
                    <FetchingSelect
                        id="entity-filter"
                        label={t('legislation.entity')}
                        value={filters.selectedEntity || 0}
                        onChange={(val) => dispatch(setSelectedEntity(val || null))}
                        isLoading={entitiesLoading}
                        error={error}
                        onRetry={handleRetryEntities}
                        placeholder={t('legislation.selectEntity')}
                    >
                        {entities.map((entity: Entities) => (
                            <option key={entity.entityId} value={entity.entityId}>
                                {isRTL ? entity.entityNameAr : entity.entityName}
                            </option>
                        ))}
                    </FetchingSelect>
                </div>
            )}

            {/* Search Input */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
            >
                <label className="block mb-2 font-extrabold text-base">
                    {t('legislation.search')}
                </label>
                <div className="relative">
                    <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5 ${isRTL ? 'right-4' : 'left-4'}`} />
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder={t('legislation.searchWithin', { category: currentSubCategoryName })}
                        className={`w-full h-[56px] bg-white text-base border-faa-primary/30 ${isRTL ? 'pr-12' : 'pl-12'}`}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
