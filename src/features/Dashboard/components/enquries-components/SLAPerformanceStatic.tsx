import { AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface SLAPerformanceProps {
    isEmpty?: boolean;
}

export function SLAPerformanceStatic({ isEmpty }: SLAPerformanceProps) {
    const { t, language } = useTranslation('legislation');
    const isArabic = language === 'ar';

    if (isEmpty) {
        return (
            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col items-center justify-center text-center py-12">
                <div className="p-4 rounded-full bg-gray-50 mb-4">
                    <AlertTriangle className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-1">
                    {t('legislation.dashboard.cases.noSLA')}
                </h3>
                <p className="text-gray-500 text-sm max-w-[200px]">
                    {t('legislation.dashboard.cases.noSLADescription')}
                </p>
            </Card>
        );
    }

    // Static SLA data for now
    const slaMetrics = [
        {
            label: t('legislation.dashboard.cases.withinSLA'),
            value: 75,
            count: 642,
            color: '#16A34A',
            icon: CheckCircle2,
            bgColor: 'rgba(22, 163, 74, 0.1)'
        },
        {
            label: t('legislation.dashboard.cases.breachedSLA'),
            value: 25,
            count: 214,
            color: '#DC2626',
            icon: AlertCircle,
            bgColor: 'rgba(220, 38, 38, 0.1)'
        }
    ];

    return (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                    <AlertTriangle style={{ width: '20px', height: '20px', color: '#DC2626' }} />
                </div>
                <h3 className="text-gray-900 text-lg font-semibold">
                    {t('legislation.dashboard.cases.slaPerformance')}
                </h3>
            </div>

            <div className="flex flex-col gap-8">
                {slaMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <div key={index} className="space-y-4">
                            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                                    <div className="p-1.5 rounded-md" style={{ backgroundColor: metric.bgColor }}>
                                        <Icon style={{ width: '16px', height: '16px', color: metric.color }} />
                                    </div>
                                    <span className="text-gray-700 text-sm font-semibold">
                                        {metric.label}
                                    </span>
                                </div>
                                <span className="text-gray-900 text-lg font-bold">
                                    {metric.value}%
                                </span>
                            </div>

                            <div className="relative pt-1">
                                <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-100">
                                    <div
                                        style={{
                                            width: `${metric.value}%`,
                                            backgroundColor: metric.color,
                                            [isArabic ? 'marginRight' : 'marginLeft']: '0',
                                            [isArabic ? 'marginLeft' : 'marginRight']: 'auto'
                                        }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 rounded-full"
                                    />
                                </div>
                            </div>

                            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                                <span className="text-gray-500 text-xs font-medium">
                                    {metric.count} {t('legislation.dashboard.cases.cases')}
                                </span>
                                <span className="text-gray-400 text-[10px] font-medium">
                                    {isArabic ? 'محدث منذ ساعة' : 'Updated 1h ago'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
