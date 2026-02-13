import { TrendingUp } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { UploadTrendChartSkeleton } from '../Shimmer';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { QuarterUploadData } from '../../types';

interface UploadTrendChartProps {
    data: QuarterUploadData[];
    loading: boolean;
}

export function UploadTrendChart({ data, loading }: UploadTrendChartProps) {
    const { t, language } = useTranslation('legislation');
    const isArabic = language === 'ar';

    if (loading) {
        return <UploadTrendChartSkeleton />;
    }

    const totalUploads = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-dashboard-bg-off-white)' }}>
                        <TrendingUp size={20} style={{ color: 'var(--color-dashboard-primary)' }} />
                    </div>
                    <h3 className="text-gray-900 text-lg font-semibold">
                        {t('legislation.dashboard.documents.uploadsTrend')}
                    </h3>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm font-medium">
                        {t('legislation.dashboard.documents.total')}
                    </span>
                    <span className="text-gray-900 text-lg font-bold">
                        {totalUploads}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                        {t('legislation.dashboard.documents.uploads')}
                    </span>
                </div>
            </div>

            <div style={{ width: '100%', height: 280 }} dir={isArabic ? 'rtl' : 'ltr'}>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{ top: 30, right: isArabic ? 0 : 20, left: isArabic ? 20 : 0, bottom: 10 }}
                    >
                        <defs>
                            <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={getComputedStyle(document.documentElement).getPropertyValue('--color-chart-indigo').trim()} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={getComputedStyle(document.documentElement).getPropertyValue('--color-chart-indigo').trim()} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                        <XAxis
                            dataKey="quarter"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 'var(--font-size-sm)', fontWeight: 500 }}
                            dy={10}
                            reversed={isArabic}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 'var(--font-size-xs)', fontWeight: 500 }}
                            dx={isArabic ? 10 : -10}
                            orientation={isArabic ? 'right' : 'left'}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: 'var(--font-size-sm)', color: '#FFFFFF' }}
                            formatter={(value) => [`${value ?? 0}`, isArabic ? 'التحميلات' : 'Uploads']}
                            labelStyle={{ color: '#FFFFFF', fontWeight: 600 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#6366F1"
                            strokeWidth={3}
                            fill="url(#colorUploads)"
                            dot={{ fill: '#6366F1', stroke: '#FFFFFF', strokeWidth: 3, r: 6 }}
                            activeDot={{ fill: '#6366F1', stroke: '#FFFFFF', strokeWidth: 3, r: 8 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
                {data.map((item, index) => {
                    const percentage = totalUploads > 0 ? ((item.count / totalUploads) * 100).toFixed(1) : '0';
                    return (
                        <div key={index} className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6366F1' }} />
                                <span className="text-gray-900 text-sm font-semibold">
                                    {item.quarter}
                                </span>
                            </div>
                            <span className="text-gray-500 text-xs font-medium">
                                {percentage}% {t('legislation.dashboard.documents.ofTotal')}
                            </span>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}