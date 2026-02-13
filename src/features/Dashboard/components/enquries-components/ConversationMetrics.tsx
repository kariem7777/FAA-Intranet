import { MessageSquare, Clock, TrendingUp, Calendar } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { ConversationMetric } from '../../types';
import { ConversationMetricsSkeleton } from '../Shimmer';

interface ConversationMetricsProps {
    data: ConversationMetric[];
    loading?: boolean;
}

export function ConversationMetrics({ data, loading }: ConversationMetricsProps) {
    const { t, language } = useTranslation('legislation');
    const isArabic = language === 'ar';

    if (loading) {
        return <ConversationMetricsSkeleton />;
    }

    if (data.length === 0) {
        return (
            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-gray-50 mb-4">
                    <Clock className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-1">
                    {t('legislation.dashboard.cases.noMetrics')}
                </h3>
                <p className="text-gray-500 text-sm max-w-[200px]">
                    {t('legislation.dashboard.cases.noMetricsDescription')}
                </p>
            </Card>
        );
    }

    const legislationColors = {
        primary: '#908e81',
        accent: '#e5ddc8',
    };

    const iconMap: Record<number, any> = {
        0: MessageSquare,
        1: Clock,
        2: TrendingUp,
        3: Calendar,
    };

    const colorMap: Record<number, string> = {
        0: '#8B5CF6',
        1: '#3B82F6',
        2: '#F59E0B',
        3: '#10B981',
    };

    const bgColorMap: Record<number, string> = {
        0: 'rgba(139, 92, 246, 0.1)',
        1: 'rgba(59, 130, 246, 0.1)',
        2: 'rgba(245, 158, 11, 0.1)',
        3: 'rgba(16, 185, 129, 0.1)',
    };

    const unitMap: Record<number, string> = {
        0: t('legislation.dashboard.cases.messages'),
        1: t('legislation.dashboard.cases.days'),
        2: t('legislation.dashboard.cases.messages'),
        3: t('legislation.dashboard.cases.days'),
    };

    const metricNames: Record<number, string> = {
        0: isArabic ? 'متوسط طول المحادثة' : 'Avg. Conversation Length',
        1: isArabic ? 'متوسط وقت الإغلاق' : 'Avg. Time to Close',
        2: isArabic ? 'أطول محادثة' : 'Longest Conversation',
        3: isArabic ? 'أسرع حل' : 'Shortest Resolution',
    };

    return (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${legislationColors.primary}15` }}>
                    <MessageSquare style={{ width: '20px', height: '20px', color: legislationColors.primary }} />
                </div>
                <h3 className="text-gray-900 text-lg font-semibold">
                    {t('legislation.dashboard.cases.conversationMetrics')}
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {data.slice(0, 4).map((metric, index) => {
                    const Icon = iconMap[index] || MessageSquare;
                    const color = colorMap[index] || '#8B5CF6';
                    const bgColor = bgColorMap[index] || 'rgba(139, 92, 246, 0.1)';
                    const unit = unitMap[index] || '';
                    const displayName = metricNames[index] || metric.name;

                    return (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full"
                        >
                            <div className="space-y-3">
                                <div
                                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: bgColor }}
                                >
                                    <Icon style={{ width: '22px', height: '22px', color: color }} />
                                </div>

                                <p
                                    className="text-gray-600 leading-tight font-semibold"
                                    style={{ fontSize: '13px', lineHeight: '1.4' }}
                                >
                                    {displayName}
                                </p>
                            </div>

                            <div className="mt-4">
                                <div className={`flex items-baseline gap-1.5 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                                    <span
                                        className="text-gray-900 font-bold"
                                        style={{ fontSize: '32px', lineHeight: '1' }}
                                    >
                                        {metric.value.toFixed(1)}
                                    </span>
                                    <span
                                        className="text-gray-500 font-medium"
                                        style={{ fontSize: '14px' }}
                                    >
                                        {unit}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
