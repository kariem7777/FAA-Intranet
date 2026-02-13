import { Building2 } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { DocumentsByEntityChartSkeleton } from '../Shimmer';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList
} from 'recharts';
import type { EntityDocumentData } from '../../types';

interface DocumentsByEntityChartProps {
    data: EntityDocumentData[];
    loading: boolean;
}

export function DocumentsByEntityChart({ data, loading }: DocumentsByEntityChartProps) {
    const { t, language } = useTranslation('legislation');
    const isArabic = language === 'ar';

    if (loading) {
        return <DocumentsByEntityChartSkeleton />;
    }

    return (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-dashboard-bg-off-white)' }}>
                    <Building2 size={20} style={{ color: 'var(--color-dashboard-primary)' }} />
                </div>
                <h3 className="text-gray-900 text-lg font-semibold">
                    {t('legislation.dashboard.documents.documentsByEntity')}
                </h3>
            </div>

            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 10, right: isArabic ? 60 : 40, left: isArabic ? 80 : 20, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal vertical={false} />
                        <XAxis
                            type="number"
                            reversed={isArabic}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 'var(--font-size-xs)', fontWeight: 500 }}
                            domain={[0, 'dataMax + 10']}
                        />
                        <YAxis
                            type="category"
                            dataKey="entityName"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#374151', fontSize: 'var(--font-size-xs)', fontWeight: 500, textAnchor: 'end' }}
                            width={180}
                            orientation={isArabic ? 'right' : 'left'}
                        />
                        <Tooltip
                            cursor={{ fill: '#F3F4F6' }}
                            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: 'var(--font-size-sm)', color: '#FFFFFF' }}
                            formatter={(value) => [value ?? 0, t('legislation.dashboard.documents.documents')]}
                            labelStyle={{ color: '#FFFFFF', fontWeight: 600 }}
                        />
                        <Bar dataKey="count" maxBarSize={28} radius={isArabic ? [4, 0, 0, 4] : [0, 4, 4, 0]}>
                            {data.map((_, index) => {
                                const colors = [
                                    getComputedStyle(document.documentElement).getPropertyValue('--color-chart-blue').trim(),
                                    getComputedStyle(document.documentElement).getPropertyValue('--color-chart-red').trim(),
                                    getComputedStyle(document.documentElement).getPropertyValue('--color-chart-green').trim(),
                                    getComputedStyle(document.documentElement).getPropertyValue('--color-chart-yellow').trim(),
                                    getComputedStyle(document.documentElement).getPropertyValue('--color-chart-purple').trim(),
                                    getComputedStyle(document.documentElement).getPropertyValue('--color-chart-cyan').trim()
                                ];
                                const color = colors[index % colors.length];
                                return <Cell key={`cell-${index}`} fill={color} />;
                            })}
                            <LabelList
                                dataKey="count"
                                position="right"
                                offset={isArabic ? 50 : 8}
                                style={{ fill: '#374151', fontSize: 'var(--font-size-sm)', fontWeight: 700 }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}