import { FileText, BarChart3 } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { DocumentStatsSkeleton } from '../Shimmer';
import type { LegislationMetrics } from '../../types';

interface DocumentStatisticsProps {
    metrics: LegislationMetrics | null;
    loading: boolean;
}

export function DocumentStatistics({ metrics, loading }: DocumentStatisticsProps) {
    const { t, language } = useTranslation('legislation');
    const isArabic = language === 'ar';

    if (loading) {
        return <DocumentStatsSkeleton />;
    }

    const totalDocuments = metrics?.totalDocuments || 0;
    const averageDocsPerCategory = metrics?.averageDocsPerCategory || 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="p-3 rounded-lg inline-flex mb-4" style={{ backgroundColor: 'rgba(47, 79, 111, 0.1)' }}>
                    <FileText style={{ width: '24px', height: '24px', color: 'var(--color-dashboard-primary)' }} />
                </div>
                <h3 className={`text-gray-900 mb-1 text-3xl font-bold ${isArabic ? 'text-right' : 'text-left'}`}>
                    {totalDocuments.toLocaleString()}
                </h3>
                <p className={`text-gray-600 text-sm font-medium ${isArabic ? 'text-right' : 'text-left'}`}>
                    {t('legislation.dashboard.documents.totalDocuments')}
                </p>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="p-3 rounded-lg inline-flex mb-4" style={{ backgroundColor: 'rgba(201, 162, 77, 0.1)' }}>
                    <BarChart3 style={{ width: '24px', height: '24px', color: 'var(--color-dashboard-accent)' }} />
                </div>
                <h3 className={`text-gray-900 mb-1 text-3xl font-bold ${isArabic ? 'text-right' : 'text-left'}`}>
                    {averageDocsPerCategory.toFixed(1)}
                </h3>
                <p className={`text-gray-600 text-sm font-medium ${isArabic ? 'text-right' : 'text-left'}`}>
                    {t('legislation.dashboard.documents.averagePerCategory')}
                </p>
            </Card>
        </div>
    );
}