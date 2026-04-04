import { BarChart3 } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { DocumentsByCategoryChartSkeleton } from '../Shimmer';
import type { CategoryDocumentData } from '../../types';
import { useAppSelector } from '@/store/hooks';

interface DocumentsByCategoryChartProps {
    data: CategoryDocumentData[];
    loading: boolean;
}

export function DocumentsByCategoryChart({ data, loading }: DocumentsByCategoryChartProps) {
    const { t, getLocalizedString } = useTranslation('legislation');
    const { categories } = useAppSelector(state => state.legislationSlice);

    if (loading) {
        return <DocumentsByCategoryChartSkeleton />;
    }

    const CHART_HEIGHT = 240;
    const maxDataValue = Math.max(...data.map(d => d.count), 0);
    const niceStep = Math.pow(10, Math.max(Math.floor(Math.log10(maxDataValue / 5)), 0));
    const step = Math.ceil((maxDataValue / 5) / niceStep) * niceStep || 10;
    const MAX_VALUE = step * 5;
    const Y_AXIS_VALUES = [
        MAX_VALUE,
        step * 4,
        step * 3,
        step * 2,
        step,
        0
    ];
    const chartData = data.map((element: CategoryDocumentData) => {
        const entity = categories.items.find(e => e.id === element.categoryId);
        return {
            ...element,
            localizedName: getLocalizedString(entity?.lawCategoryEn || element.categoryName, entity?.lawCategoryAr || element.categoryName)
        };
    });
    const chartColors = typeof document === 'undefined'
        ? ['#3B82F6', '#EF4444', '#22C55E', '#F59E0B', '#A855F7', '#06B6D4']
        : [
            getComputedStyle(document.documentElement).getPropertyValue('--color-chart-blue').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--color-chart-red').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--color-chart-green').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--color-chart-yellow').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--color-chart-purple').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--color-chart-cyan').trim()
        ];
    return (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-dashboard-bg-off-white)' }}>
                    <BarChart3 size={20} style={{ color: 'var(--color-dashboard-primary)' }} />
                </div>
                <h3 className="text-gray-900 text-lg font-semibold">
                    {t('legislation.dashboard.documents.documentsByCategory')}
                </h3>
            </div>

            <div className="relative flex">
                <div className="flex flex-col justify-between pr-3" style={{ height: CHART_HEIGHT }}>
                    {Y_AXIS_VALUES.map((value) => (
                        <span key={value} className="text-gray-500 text-right text-xs font-medium">
                            {value}
                        </span>
                    ))}
                </div>

                <div className="flex-1">
                    <div className="relative" style={{ height: CHART_HEIGHT }}>
                        <div className="absolute inset-0 flex flex-col justify-between">
                            {Y_AXIS_VALUES.map((_, index) => (
                                <div key={index} className="border-t border-gray-200" />
                            ))}
                        </div>

                        <div className="absolute inset-0 flex items-end justify-around px-4">
                            {chartData.map((category, index) => {
                                const barHeight = (category.count / MAX_VALUE) * CHART_HEIGHT;
                                const color = chartColors[index % chartColors.length];

                                return (
                                    <div key={index} className="flex flex-col items-center w-full max-w-[80px] group">
                                        <span className="mb-1 text-gray-900 text-xs font-bold">
                                            {category.count}
                                        </span>
                                        <div
                                            className="w-full rounded-t-lg transition hover:opacity-80 relative"
                                            style={{ height: `${barHeight}px`, backgroundColor: color, minHeight: '6px' }}
                                        >
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap" style={{ fontSize: 'var(--font-size-xs)' }}>
                                                    <div className="font-semibold">{category.localizedName}</div>
                                                    <div className="text-gray-300">{category.count} {t('legislation.dashboard.documents.documents')}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-around px-4 mt-3">
                        {chartData.map((category, index) => (
                            <div key={index} className="w-full max-w-[80px] text-center">
                                <span className="text-gray-600 text-xs font-medium" style={{ lineHeight: '1.3' }}>
                                    {category.localizedName}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}