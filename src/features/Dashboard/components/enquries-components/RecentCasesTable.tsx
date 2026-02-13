import { useState } from 'react';
import { Download, Table as TableIcon, MessageSquare, Clock, ArrowUpDown } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { RecentCase } from '../../types';
import { RecentCasesTableSkeleton } from '../Shimmer';

interface RecentCasesTableProps {
    data: RecentCase[];
    loading?: boolean;
}

export function RecentCasesTable({ data, loading }: RecentCasesTableProps): React.JSX.Element {
    const { t, language } = useTranslation('legislation');
    const isArabic = language === 'ar';

    const legislationColors = {
        primary: '#908e81',
        accent: '#e5ddc8',
    };

    // Sorting state
    const [sortColumn, setSortColumn] = useState<'conversationLength' | 'timeLength' | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const handleSort = (column: 'conversationLength' | 'timeLength') => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('desc');
        }
    };

    const parseTimeLength = (timeStr: string): number => {
        if (!timeStr || !timeStr.includes(':')) return parseFloat(timeStr) || 0;
        const parts = timeStr.split(':');
        let days = 0, hours = 0, minutes = 0;
        const first = parts[0];
        if (first.includes('.')) {
            const d = first.split('.');
            days = parseInt(d[0], 10) || 0;
            hours = parseInt(d[1], 10) || 0;
        } else {
            hours = parseInt(first, 10) || 0;
        }
        minutes = parts.length > 1 ? parseInt(parts[1], 10) || 0 : 0;
        return days + (hours / 24) + (minutes / 1440);
    };

    const formatTimeLength = (timeStr: string): string => {
        const totalDays = parseTimeLength(timeStr);

        if (totalDays >= 1) {
            const d = Math.floor(totalDays);
            const h = Math.round((totalDays - d) * 24);
            const dayLabel = isArabic ? 'ي' : 'd';
            const hourLabel = isArabic ? 'س' : 'h';
            return h > 0 ? `${d}${dayLabel} ${h}${hourLabel}` : `${d}${dayLabel}`;
        } else {
            const totalHours = totalDays * 24;
            const h = Math.floor(totalHours);
            const m = Math.round((totalHours - h) * 60);
            const hourLabel = isArabic ? 'س' : 'h';
            const minLabel = isArabic ? 'د' : 'm';
            if (h > 0) {
                return m > 0 ? `${h}${hourLabel} ${m}${minLabel}` : `${h}${hourLabel}`;
            }
            return `${m}${minLabel}`;
        }
    };

    const sortedCases = [...data].sort((a, b) => {
        if (!sortColumn) return 0;
        const aValue = sortColumn === 'timeLength' ? parseTimeLength(a[sortColumn]) : a[sortColumn];
        const bValue = sortColumn === 'timeLength' ? parseTimeLength(b[sortColumn]) : b[sortColumn];

        if (aValue < (bValue as any)) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > (bValue as any)) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const getStatusBadge = (status: string) => {
        const badges: Record<string, { bg: string; text: string; label: string }> = {
            'New': { bg: 'bg-orange-50', text: 'text-orange-700', label: isArabic ? 'جديد' : 'New' },
            'Replied': { bg: 'bg-blue-50', text: 'text-blue-700', label: isArabic ? 'تم الرد' : 'Replied' },
            'Closed': { bg: 'bg-green-50', text: 'text-green-700', label: isArabic ? 'مغلق' : 'Closed' },
        };
        return badges[status] || { bg: 'bg-gray-50', text: 'text-gray-700', label: status };
    };

    const handleExport = () => {
        const headers = [
            t('legislation.dashboard.cases.department'),
            t('legislation.dashboard.cases.caseTitle'),
            t('legislation.dashboard.cases.conversationLength'),
            t('legislation.dashboard.cases.timeLength'),
            t('legislation.dashboard.cases.status')
        ];

        const csvRows = [
            headers.join(','),
            ...sortedCases.map(caseItem => [
                `"${isArabic ? caseItem.departmentAr : caseItem.departmentEn}"`,
                `"${caseItem.title}"`,
                `"${caseItem.conversationLength}"`,
                `"${formatTimeLength(caseItem.timeLength)}"`,
                `"${getStatusBadge(caseItem.status).label}"`
            ].join(','))
        ];

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `recent-cases-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return <RecentCasesTableSkeleton />;
    }

    return (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${legislationColors.primary}15` }}>
                        <TableIcon style={{ width: '20px', height: '20px', color: legislationColors.primary }} />
                    </div>
                    <h3 className="text-gray-900 text-lg font-semibold">
                        {t('legislation.dashboard.cases.recentCases')}
                    </h3>
                </div>

                <button
                    onClick={handleExport}
                    disabled={data.length === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold ${data.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#253D54] hover:shadow-lg'}`}
                    style={{ backgroundColor: legislationColors.primary, color: '#FFFFFF' }}
                >
                    <Download style={{ width: '18px', height: '18px' }} />
                    <span>{t('legislation.dashboard.cases.exportData')}</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className={`pb-3 px-4 text-sm font-semibold text-gray-500 ${isArabic ? 'text-right' : 'text-left'}`}>
                                {t('legislation.dashboard.cases.department')}
                            </th>
                            <th className={`pb-3 px-4 text-sm font-semibold text-gray-500 ${isArabic ? 'text-right' : 'text-left'}`}>
                                {t('legislation.dashboard.cases.caseTitle')}
                            </th>
                            <th className={`pb-3 px-4 text-sm font-semibold text-gray-500 ${isArabic ? 'text-right' : 'text-left'}`}>
                                <button
                                    className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                                    onClick={() => handleSort('conversationLength')}
                                >
                                    {t('legislation.dashboard.cases.conversationLength')}
                                    <ArrowUpDown size={14} className={sortColumn === 'conversationLength' ? 'text-faa-primary' : 'text-gray-400'} />
                                </button>
                            </th>
                            <th className={`pb-3 px-4 text-sm font-semibold text-gray-500 ${isArabic ? 'text-right' : 'text-left'}`}>
                                <button
                                    className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                                    onClick={() => handleSort('timeLength')}
                                >
                                    {t('legislation.dashboard.cases.timeLength')}
                                    <ArrowUpDown size={14} className={sortColumn === 'timeLength' ? 'text-faa-primary' : 'text-gray-400'} />
                                </button>
                            </th>
                            <th className={`pb-3 px-4 text-sm font-semibold text-gray-500 ${isArabic ? 'text-right' : 'text-left'}`}>
                                {t('legislation.dashboard.cases.status')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCases.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-20 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="p-4 rounded-full bg-gray-50 mb-4">
                                            <TableIcon className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <h3 className="text-gray-900 font-semibold mb-1">
                                            {t('legislation.dashboard.cases.noRecentCases')}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            {t('legislation.dashboard.cases.noRecentCasesDescription')}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : sortedCases.map((caseItem, index) => {
                            const statusBadge = getStatusBadge(caseItem.status);
                            return (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className={`py-4 px-4 text-sm font-medium text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`}>
                                        {isArabic ? caseItem.departmentAr : caseItem.departmentEn}
                                    </td>
                                    <td className={`py-4 px-4 text-sm font-semibold text-gray-900 max-w-[300px] truncate ${isArabic ? 'text-right' : 'text-left'}`}>
                                        {caseItem.title}
                                    </td>
                                    <td className={`py-4 px-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                                        <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                                            <MessageSquare size={16} className="text-purple-500" />
                                            <span className="text-sm font-bold text-gray-700">
                                                {caseItem.conversationLength} {isArabic ? t('legislation.dashboard.cases.messages') : 'messages'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={`py-4 px-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                                        <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                                            <Clock size={16} className="text-blue-500" />
                                            <span className="text-sm font-bold text-gray-700">
                                                {formatTimeLength(caseItem.timeLength)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={`py-4 px-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusBadge.bg} ${statusBadge.text}`}>
                                            {statusBadge.label}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
