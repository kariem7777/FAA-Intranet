import { useEffect, useRef, useState } from 'react';
import { Shimmer } from '@/shared/components/Shimmer/Shimmer';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppDispatch, RootState } from '@/store';
import { fetchEntities, setSelectedEntity, setSearchQuery, setEntitySearchQuery } from '@/features/Legislation/slices/legislationSlice';
import { useTranslation } from '@/shared/hooks/useTranslation';

export function LegislationFilters() {
    const { isRTL, t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isEntityDropdownOpen, setIsEntityDropdownOpen] = useState(false);

    const { items: entities, loading: entitiesLoading } = useSelector((state: RootState) => state.legislation.entities);
    const { searchQuery, selectedEntity, entitySearchQuery, selectedCategory } = useSelector((state: RootState) => state.legislation.filters);
    const { data: categoryGroup } = useSelector((state: RootState) => state.legislation.categories);

    const currentCategoryName = categoryGroup?.categories?.find(c => c.id === selectedCategory)?.name || '';

    useEffect(() => {
        dispatch(fetchEntities());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsEntityDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredEntities = entities.filter(entity => {
        const query = entitySearchQuery.toLowerCase();
        return entity.nameEn.toLowerCase().includes(query) || entity.nameAr.includes(query);
    });

    const selectedEntityName = selectedEntity
        ? entities.find(e => e.id === selectedEntity)?.[isRTL ? 'nameAr' : 'nameEn'] || ''
        : '';

    const colors = {
        primary: '#0F2A44',
        bgWhite: '#FFFFFF',
        textPrimary: '#1A1A1A',
        textSecondary: '#5A5A5A',
        bgOffWhite: '#F7F8FA',
        accent: '#C9A24D',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-6 mb-10"
        >
            {/* Entity Dropdown */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
                ref={dropdownRef}
            >
                <label className="block mb-2 font-extrabold text-base" style={{ fontFamily: 'Dubai, Arial, sans-serif' }}>
                    {t('legislation.entity')}
                </label>

                <button
                    onClick={() => setIsEntityDropdownOpen(!isEntityDropdownOpen)}
                    className="w-full h-[56px] rounded-lg border transition-all flex items-center justify-between px-4 bg-white"
                    style={{
                        borderColor: isEntityDropdownOpen ? colors.primary : '#E5E7EB',
                        color: selectedEntity ? colors.textPrimary : colors.textSecondary,
                    }}
                >
                    <span style={{ fontFamily: 'Dubai, Arial, sans-serif' }}>
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
                            className="absolute top-full mt-2 w-full rounded-lg border shadow-lg overflow-hidden z-50 bg-white"
                            style={{ maxHeight: '320px' }}
                        >
                            <div className="p-3 border-b border-gray-200">
                                <div className="relative">
                                    <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
                                    <input
                                        type="text"
                                        value={entitySearchQuery}
                                        onChange={(e) => dispatch(setEntitySearchQuery(e.target.value))}
                                        placeholder={t('legislation.searchEntity')}
                                        className={`w-full h-10 rounded border outline-none bg-gray-50 text-sm ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
                                    />
                                </div>
                            </div>

                            {selectedEntity && (
                                <button
                                    onClick={() => {
                                        dispatch(setSelectedEntity(''));
                                        setIsEntityDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-3 hover:bg-gray-50 transition-colors border-b flex items-center gap-2 text-sm ${isRTL ? 'justify-end' : 'justify-start'}`}
                                    style={{ color: colors.accent }}
                                >
                                    <X className="w-4 h-4" />
                                    {t('legislation.clearSelection')}
                                </button>
                            )}

                            <div className="overflow-y-auto" style={{ maxHeight: '240px' }}>
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
                                        filteredEntities.map((entity, index) => (
                                            <motion.button
                                                key={entity.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03 }}
                                                whileHover={{ backgroundColor: colors.bgOffWhite, x: 5 }}
                                                onClick={() => {
                                                    dispatch(setSelectedEntity(entity.id));
                                                    setIsEntityDropdownOpen(false);
                                                }}
                                                className="w-full px-4 py-3 transition-colors text-start"
                                                style={{
                                                    backgroundColor: selectedEntity === entity.id ? colors.bgOffWhite : 'transparent',
                                                    fontFamily: 'Dubai, Arial, sans-serif',
                                                }}
                                            >
                                                {isRTL ? entity.nameAr : entity.nameEn}
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
                <label className="block mb-2 font-extrabold text-base" style={{ fontFamily: 'Dubai, Arial, sans-serif' }}>
                    {t('legislation.search')}
                </label>
                <div className="relative">
                    <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5 ${isRTL ? 'right-4' : 'left-4'}`} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        placeholder={t('legislation.searchWithin', { category: currentCategoryName })}
                        className={`w-full h-[56px] rounded-lg border transition-all outline-none bg-white text-base ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                        style={{ fontFamily: 'Dubai, Arial, sans-serif' }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
