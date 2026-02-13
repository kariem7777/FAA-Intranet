import { useEffect, useRef, useState } from 'react';
import { Shimmer } from '@/shared/components/Shimmer/Shimmer';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ChevronDown, X } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppDispatch, RootState } from '@/store';
import { setSelectedEntity, setSearchQuery } from '@/features/Documents/slices/documentsManagementSlice';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { Entities, LawSubCategory } from '@/features/Legislation/types';
import useDebounce from '@/shared/hooks/useDebouncing';

export function LegislationFilters() {
    const { isRTL, t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isEntityDropdownOpen, setIsEntityDropdownOpen] = useState(false);
    const [entitySearchQuery, setEntitySearchQuery] = useState('');
    const debounce = useDebounce();

    const { filters } = useSelector((state: RootState) => state.documentsManagement);
    const [searchTerm, setSearchTerm] = useState(filters.searchQuery);

    const { items: entities, loading: entitiesLoading } = useSelector((state: RootState) => state.legislationSlice.entities);
    const { subCategories } = useSelector((state: RootState) => state.legislationSlice);

    const currentSubCategoryName = subCategories.items.find((c: LawSubCategory) => c.id === filters.selectedSubCategory)?.[isRTL ? 'lawSubCategoryAr' : 'lawSubCategoryEn'] || '';

    // Sync local state with Redux when it changes elsewhere (e.g. reset)
    useEffect(() => {
        setSearchTerm(filters.searchQuery);
    }, [filters.searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsEntityDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (val: string) => {
        setSearchTerm(val);
        debounce(() => {
            dispatch(setSearchQuery(val));
        }, 500);
    };

    const filteredEntities = entities.filter((entity: Entities) => {
        const query = entitySearchQuery.toLowerCase();
        return entity.entityName.toLowerCase().includes(query) || entity.entityNameAr.includes(query);
    });

    const selectedEntityName = filters.selectedEntity
        ? entities.find((e: Entities) => e.entityId === filters.selectedEntity)?.[isRTL ? 'entityNameAr' : 'entityName'] || ''
        : '';



    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-10 p-3"
        >
            {/* Entity Dropdown */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
                ref={dropdownRef}
            >
                <label className="block mb-2 font-extrabold text-base">
                    {t('legislation.entity')}
                </label>

                <button
                    onClick={() => setIsEntityDropdownOpen(!isEntityDropdownOpen)}
                    className={`w-full h-[56px] rounded-lg border transition-all flex items-center justify-between px-4 bg-white
                        ${isEntityDropdownOpen ? 'border-faa-primary/60' : 'border-faa-primary/30'}
                        ${filters.selectedEntity ? 'text-primary' : 'text-secondary'}
                    `}
                >
                    <span>
                        {selectedEntityName || t('legislation.selectEntity')}
                    </span>
                    <ChevronDown className="w-5 h-5 flex-shrink-0" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isEntityDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-2 w-full rounded-lg border shadow-lg overflow-y-auto max-h-[320px] z-50 bg-white"
                        >
                            <div className="p-3 border-b border-gray-200">
                                <div className="relative">
                                    <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
                                    <Input
                                        type="text"
                                        value={entitySearchQuery}
                                        onChange={(e) => setEntitySearchQuery(e.target.value)}
                                        placeholder={t('legislation.searchEntity')}
                                        className={`w-full h-10 bg-gray-50 text-sm border-faa-primary/20 ${isRTL ? 'pr-9' : 'pl-9'}`}
                                    />
                                </div>
                            </div>

                            {filters.selectedEntity && (
                                <button
                                    onClick={() => {
                                        dispatch(setSelectedEntity(null));
                                        setIsEntityDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-3 hover:bg-gray-50 transition-colors border-b flex items-center gap-2 text-sm text-legislation-accent ${isRTL ? 'justify-end' : 'justify-start'}`}
                                >
                                    <X className="w-4 h-4" />
                                    {t('legislation.clearSelection')}
                                </button>
                            )}

                            <div className="overflow-y-auto max-h-[240px]">
                                {entitiesLoading ? (
                                    <div className="p-3 space-y-2">
                                        {[...Array(4)].map((_, i) => (
                                            <Shimmer key={i} height={36} className="w-full" />
                                        ))}
                                    </div>
                                ) : (
                                    filteredEntities.length === 0 ? (
                                        <div className="p-4 text-center text-sm text-gray-500">
                                            {t('legislation.noEntitiesFound')}
                                        </div>
                                    ) : (
                                        filteredEntities.map((entity: Entities, index: number) => (
                                            <motion.button
                                                key={entity.entityId}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03 }}
                                                whileHover={{ backgroundColor: 'var(--color-legislation-bg-off-white)', x: 5 }}
                                                onClick={() => {
                                                    dispatch(setSelectedEntity(entity.entityId));
                                                    setIsEntityDropdownOpen(false);
                                                }}
                                                className={`w-full px-4 py-3 transition-colors text-start 
                                                    ${filters.selectedEntity === entity.entityId ? 'bg-legislation-bg-off-white' : 'bg-transparent'}
                                                `}
                                            >
                                                {isRTL ? entity.entityNameAr : entity.entityName}
                                            </motion.button>
                                        ))
                                    )
                                )
                                }
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

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
