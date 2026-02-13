import { useRef, useState } from 'react';
import { Search, Filter, ChevronDown, X, Building2 } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

interface FiltersState {
    searchText?: string;
    departmentId?: number | string;
    status?: number | string;
}

interface Department {
    id: number;
    departmentNameAr: string;
    departmentNameEn: string;
}

interface LegalOpinionsPageFiltersProps {
    filters: FiltersState;
    departments: Department[];
    userRole: 'admin' | 'user';
    statusCounts: Record<number, number>;
    onSearchSubmit: (query: string) => void;
    onStatusChange: (value: number | string) => void;
    onDepartmentChange: (value: number | string) => void;
    onClearSearch: () => void;
    onClearStatus: () => void;
    onClearDepartment: () => void;
    onClearAll: () => void;
}

export function LegalOpinionsPageFilters({
    filters,
    departments,
    userRole,
    statusCounts,
    onSearchSubmit,
    onStatusChange,
    onDepartmentChange,
    onClearSearch,
    onClearStatus,
    onClearDepartment,
    onClearAll,
}: LegalOpinionsPageFiltersProps) {
    const { t, isRTL, language } = useTranslation();
    const isArabic = language === 'ar';

    const [searchQuery, setSearchQuery] = useState(filters.searchText || '');
    const [departmentSearchQuery, setDepartmentSearchQuery] = useState('');
    const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const statusDropdownRef = useRef<HTMLDivElement>(null);

    const filteredDepartments = departments.filter((dept) => {
        const q = departmentSearchQuery.toLowerCase();
        return dept.departmentNameAr.includes(departmentSearchQuery) || dept.departmentNameEn.toLowerCase().includes(q);
    });

    const getDepartmentName = (deptId: number) => {
        const dept = departments.find((d) => d.id === deptId);
        return dept ? (isArabic ? dept.departmentNameAr : dept.departmentNameEn) : '';
    };

    const selectedDepartmentName = filters.departmentId ? getDepartmentName(Number(filters.departmentId)) : '';

    const selectedStatusLabel = (() => {
        if (filters.status === '' || filters.status === undefined) return t('legalOpinions.allStatuses');
        const map: Record<number, string> = {
            1: t('legalOpinions.status.new'),
            2: t('legalOpinions.status.replied'),
            3: t('legalOpinions.status.closed'),
        };
        return map[Number(filters.status)] ?? t('legalOpinions.allStatuses');
    })();

    const handleSearch = () => onSearchSubmit(searchQuery);

    const statusOptions = [
        { value: 1, label: t('legalOpinions.status.new'), color: 'var(--color-chart-blue)' },
        { value: 2, label: t('legalOpinions.status.replied'), color: 'var(--color-chart-green)' },
        { value: 3, label: t('legalOpinions.status.closed'), color: 'var(--color-chart-red)' },
    ];

    const hasActiveFilters = (userRole === 'admin' && filters.departmentId) || filters.searchText || (filters.status !== '' && filters.status !== undefined);

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-[1800px] mx-auto px-8 py-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {userRole === 'admin' && (
                            <div className="flex-1" ref={dropdownRef}>
                                <label className="block text-base text-slate-700 mb-2 font-semibold">{t('legalOpinions.departmentLabel')}</label>
                                <div className="relative">
                                    <Building2 className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400 pointer-events-none z-10`} />
                                    <button
                                        onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
                                        className={`w-full h-12 ${isRTL ? 'pr-11 pl-11' : 'pl-11 pr-11'} rounded-lg border-2 border-gray-300 bg-white text-slate-700 focus:outline-none transition-all flex items-center justify-between ${isRTL ? 'text-right' : 'text-left'}`}
                                    >
                                        <span className="text-sm truncate">{selectedDepartmentName || t('legalOpinions.selectDepartment')}</span>
                                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDepartmentDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isDepartmentDropdownOpen && (
                                        <div className="absolute z-50 mt-1 w-full bg-white border-2 border-gray-300 shadow-xl rounded-lg max-h-80 overflow-hidden">
                                            <div className="p-3 border-b border-gray-200 bg-gray-50">
                                                <div className="relative">
                                                    <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400`} />
                                                    <Input
                                                        type="text"
                                                        placeholder={t('legalOpinions.searchDepartment')}
                                                        value={departmentSearchQuery}
                                                        onChange={(e) => setDepartmentSearchQuery(e.target.value)}
                                                        className={`h-10 ${isRTL ? 'pr-10' : 'pl-10'} border-gray-300`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-h-60 overflow-y-auto">
                                                {filteredDepartments.length > 0 ? (
                                                    filteredDepartments.map((dept) => (
                                                        <button
                                                            key={dept.id}
                                                            onClick={() => {
                                                                onDepartmentChange(dept.id);
                                                                setIsDepartmentDropdownOpen(false);
                                                                setDepartmentSearchQuery('');
                                                            }}
                                                            className={`w-full ${isRTL ? 'text-right' : 'text-left'} px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between min-h-[48px] ${Number(filters.departmentId) === dept.id ? 'bg-gray-100' : ''}`}
                                                        >
                                                            <span className="text-base text-slate-700">{isArabic ? dept.departmentNameAr : dept.departmentNameEn}</span>
                                                            {Number(filters.departmentId) === dept.id && (
                                                                <div className="w-2 h-2 rounded-full bg-legislation-active-indicator" />
                                                            )}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-8 text-center text-base text-slate-500">{t('common.noResultsFound')}</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex-1" ref={statusDropdownRef}>
                            <label className="block text-base text-slate-700 mb-2 font-semibold">{t('legalOpinions.statusLabel')}</label>
                            <div className="relative">
                                <Filter className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400 pointer-events-none z-10`} />
                                <button
                                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                    className={`w-full h-12 ${isRTL ? 'pr-11 pl-11' : 'pl-11 pr-11'} rounded-lg border-2 border-gray-300 bg-white text-slate-700 focus:outline-none transition-all flex items-center justify-between ${isRTL ? 'text-right' : 'text-left'}`}
                                >
                                    <span className="text-base truncate">{selectedStatusLabel}</span>
                                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isStatusDropdownOpen && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border-2 border-gray-300 shadow-xl rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => { onStatusChange(''); setIsStatusDropdownOpen(false); }}
                                            className={`w-full ${isRTL ? 'text-right' : 'text-left'} px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between min-h-[48px] ${filters.status === '' || filters.status === undefined ? 'bg-gray-100' : ''}`}
                                        >
                                            <span className="text-base text-slate-700">{t('legalOpinions.allStatuses')}</span>
                                            {(filters.status === '' || filters.status === undefined) && <div className="w-2 h-2 rounded-full bg-legislation-active-indicator" />}
                                        </button>
                                        {statusOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => { onStatusChange(opt.value); setIsStatusDropdownOpen(false); }}
                                                className={`w-full ${isRTL ? 'text-right' : 'text-left'} px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between min-h-[48px] ${Number(filters.status) === opt.value && filters.status !== '' ? 'bg-gray-100' : ''}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base text-slate-700">{opt.label}</span>
                                                    <span
                                                        className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-sm text-white font-semibold"
                                                        style={{ backgroundColor: opt.color }}
                                                    >
                                                        {statusCounts[opt.value]}
                                                    </span>
                                                </div>
                                                {Number(filters.status) === opt.value && filters.status !== '' && <div className="w-2 h-2 rounded-full bg-legislation-active-indicator" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-base text-slate-700 mb-2 font-semibold">{t('legalOpinions.search')}</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`} />
                                    <Input
                                        type="text"
                                        placeholder={t('legalOpinions.searchPlaceholder')}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className={`h-12 ${isRTL ? 'pr-11' : 'pl-11'} border-2 border-gray-300 text-sm`}
                                    />
                                </div>
                                <button
                                    onClick={handleSearch}
                                    className="h-12 px-8 text-white rounded-lg transition-all duration-200 text-sm flex items-center gap-2 font-medium bg-faa-primary hover:bg-dashboard-primary"
                                >
                                    <Search className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                    {t('legalOpinions.search')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-slate-600 font-medium">{t('legalOpinions.activeFilters')}</span>
                            {filters.departmentId && userRole === 'admin' && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    <Building2 className="h-3 w-3" />
                                    <span>{selectedDepartmentName}</span>
                                    <button onClick={onClearDepartment} className="hover:text-blue-900"><X className="h-3 w-3" /></button>
                                </span>
                            )}
                            {filters.status !== '' && filters.status !== undefined && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                    <Filter className="h-3 w-3" />
                                    <span>{selectedStatusLabel}</span>
                                    <button onClick={onClearStatus} className="hover:text-green-900"><X className="h-3 w-3" /></button>
                                </span>
                            )}
                            {filters.searchText && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                    <Search className="h-3 w-3" />
                                    <span>{filters.searchText}</span>
                                    <button onClick={() => { setSearchQuery(''); onClearSearch(); }} className="hover:text-purple-900"><X className="h-3 w-3" /></button>
                                </span>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(''); onClearAll(); }} className="text-slate-600 hover:text-slate-900 h-7 px-3 text-sm">
                                <X className="h-3 w-3 mr-1" />
                                {t('legalOpinions.clearFilters')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
