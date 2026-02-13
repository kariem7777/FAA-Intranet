import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, MessageSquare, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { CaseStatusData } from '../../types';
import { CaseStatusChartSkeleton } from '../Shimmer';

interface CaseStatusChartProps {
    data: CaseStatusData[];
    loading?: boolean;
}

export function CaseStatusChart({ data, loading }: CaseStatusChartProps) {
    const { t, language } = useTranslation('legislation');
    const isArabic = language === 'ar';

    const getStatusInfo = (status: string) => {
        console.log(status)
        const statusMap: Record<string, { name: string; color: string; icon: any }> = {
            New: { name: t('legislation.dashboard.cases.new'), color: '#F59E0B', icon: Clock },
            Replied: { name: t('legislation.dashboard.cases.replied'), color: '#2563EB', icon: AlertCircle },
            Closed: { name: t('legislation.dashboard.cases.closed'), color: '#16A34A', icon: CheckCircle2 },
        };
        return statusMap[status] || { name: `Status ${status}`, color: '#94a3b8', icon: AlertCircle };
    };

    const transformedData = useMemo(() => {
        const statusItems = data.map(item => ({
            ...item,
            value: item.count,
            ...getStatusInfo(item.status)
        }));
        console.log(statusItems)

        const totalValue = statusItems.reduce((sum, item) => sum + item.value, 0);

        return [

            {
                name: t('legislation.dashboard.cases.received'),
                value: totalValue,
                color: '#908e81',
                icon: MessageSquare
            },
            ...statusItems
        ];
    }, [data, t]);

    const totalCases = transformedData.reduce((sum, item) => sum + item.value, 0);
    const legendData = transformedData.map(item => ({
        ...item,
        percent: totalCases > 0 ? ((item.value / totalCases) * 100).toFixed(0) : '0',
    }));

    if (loading) {
        return <CaseStatusChartSkeleton />;
    }

    if (data.length === 0) {
        return (
            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col items-center justify-center text-center py-12">
                <div className="p-4 rounded-full bg-gray-50 mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-1">
                    {t('legislation.dashboard.cases.noData')}
                </h3>
                <p className="text-gray-500 text-sm max-w-[200px]">
                    {t('legislation.dashboard.cases.noDataDescription')}
                </p>
            </Card>
        );
    }

    return (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                    <AlertTriangle style={{ width: '20px', height: '20px', color: '#DC2626' }} />
                </div>
                <h3 className="text-gray-900 text-lg font-semibold">
                    {t('legislation.dashboard.cases.casesByStatus')}
                </h3>
            </div>

            <div className="flex items-center justify-center gap-8">
                <div style={{ width: '60%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={transformedData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={120}
                                paddingAngle={3}
                                dataKey="value"
                                animationDuration={800}
                                strokeWidth={2}
                                stroke="#fff"
                            >
                                {transformedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: any, name: any) => [`${value}`, name]}
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-col gap-4" style={{ width: '35%' }}>
                    {legendData.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-gray-700 text-[13px] font-semibold">
                                    {item.name}
                                </span>
                            </div>
                            <div className={`flex items-baseline gap-2 ${isArabic ? 'mr-6' : 'ml-6'}`}>
                                <span className="text-gray-900 text-xl font-bold">
                                    {item.value}
                                </span>
                                <span className="text-gray-500 text-xs font-medium">
                                    ({item.percent}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
