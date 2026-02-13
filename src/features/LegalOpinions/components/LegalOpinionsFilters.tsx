import { Search } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { Entities } from '@/features/Legislation/types';

interface LegalOpinionsFiltersProps {
    searchQuery: string;
    selectedDepartment: string;
    entities: Entities[];
    onSearchChange: (value: string) => void;
    onDepartmentChange: (value: string) => void;
}

export function LegalOpinionsFilters({
    searchQuery,
    selectedDepartment,
    entities,
    onSearchChange,
    onDepartmentChange,
}: LegalOpinionsFiltersProps) {
    const { t, i18n, getLocalizedString } = useTranslation();
    const isArabic = i18n.language === 'ar';

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
                {/* Search */}
                <div>
                    <label
                        className="block mb-2 uppercase tracking-wide text-sm font-bold"
                        style={{
                            color: '#64748B',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {t('legalOpinions.searchLabel')}
                    </label>
                    <div className="relative">
                        <Search
                            className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                            style={{
                                [isArabic ? 'right' : 'left']: '12px',
                                width: '20px',
                                height: '20px',
                            }}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={t('legalOpinions.approvedSearchPlaceholder')}
                            className="w-full h-[56px] rounded-lg border border-gray-300 outline-none focus:border-[#2F4F6F] transition-colors text-base"
                            style={{
                                paddingLeft: isArabic ? '16px' : '44px',
                                paddingRight: isArabic ? '44px' : '16px',
                                textAlign: isArabic ? 'right' : 'left',
                            }}
                        />
                    </div>
                </div>

                {/* Department Filter */}
                <div>
                    <label
                        className="block mb-2 uppercase tracking-wide text-sm font-bold"
                        style={{
                            color: '#64748B',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {t('legalOpinions.department')}
                    </label>
                    <select
                        value={selectedDepartment}
                        onChange={(e) => onDepartmentChange(e.target.value)}
                        className="w-full h-[56px] rounded-lg border border-gray-300 outline-none focus:border-[#2F4F6F] transition-colors text-base"
                        style={{
                            paddingLeft: isArabic ? '16px' : '16px',
                            paddingRight: isArabic ? '16px' : '16px',
                            textAlign: isArabic ? 'right' : 'left',
                        }}
                    >
                        <option value="">{t('legalOpinions.allDepartments')}</option>
                        {entities.map(entity => (
                            <option key={entity.entityId} value={entity.entityId}>
                                {getLocalizedString(entity.entityName, entity.entityNameAr)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
