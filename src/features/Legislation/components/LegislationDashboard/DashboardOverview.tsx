import {
  FileText,
  MessageSquare,
  CheckCircle2,
  Clock,
  BarChart3
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';

export function DashboardOverview() {
  const { t, language } = useTranslation();

  const isArabic = language === 'ar';

  const fontFamily = isArabic
    ? 'Tajawal, IBM Plex Sans Arabic, Noto Sans Arabic, sans-serif'
    : 'Inter, system-ui, sans-serif';

  const themeColor = '#8B272D';

  // KPI Cards Data
  const kpiCards = [
    { icon: FileText, label: t('legislation.dashboard.overview.totalDocuments'), value: '1,248', color: '#8B272D', bgColor: 'rgba(139, 39, 45, 0.1)' },
    { icon: MessageSquare, label: t('legislation.dashboard.overview.totalInquiries'), value: '856', color: '#2563EB', bgColor: 'rgba(37, 99, 235, 0.1)' },
    { icon: CheckCircle2, label: t('legislation.dashboard.overview.closedCases'), value: '742', color: '#16A34A', bgColor: 'rgba(22, 163, 74, 0.1)' },
    { icon: Clock, label: t('legislation.dashboard.overview.pendingCases'), value: '114', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.1)' },
  ];

  // Performance metrics
  const performanceMetrics = [
    { icon: BarChart3, label: t('legislation.dashboard.overview.avgResponseTime'), value: '2.4', unit: t('legislation.dashboard.overview.days'), color: '#8B272D' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-gray-900 mb-2" style={{ fontFamily, fontSize: '24px', fontWeight: 600 }}>
          {t('legislation.dashboard.overview.title')}
        </h2>
        <p className="text-gray-600" style={{ fontFamily, fontSize: '15px' }}>
          {t('legislation.dashboard.overview.subtitle')}
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className={`flex items-center ${isArabic ? 'justify-between' : 'justify-between'} mb-4`}>
                <div className="p-3 rounded-lg" style={{ backgroundColor: kpi.bgColor }}>
                  <Icon style={{ width: '24px', height: '24px', color: kpi.color }} />
                </div>
              </div>
              <h3 className={`text-gray-900 mb-1 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '28px', fontWeight: 700 }}>
                {kpi.value}
              </h3>
              <p className={`text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '14px', fontWeight: 500 }}>
                {kpi.label}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${metric.color}15` }}>
                  <Icon style={{ width: '28px', height: '28px', color: metric.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 mb-1" style={{ fontFamily, fontSize: '14px', fontWeight: 500 }}>
                    {metric.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-gray-900" style={{ fontFamily, fontSize: '32px', fontWeight: 700 }}>
                      {metric.value}
                    </h3>
                    <span className="text-gray-500" style={{ fontFamily, fontSize: '18px', fontWeight: 500 }}>
                      {metric.unit}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeColor}15` }}>
            <BarChart3 style={{ width: '20px', height: '20px', color: themeColor }} />
          </div>
          <h3 className="text-gray-900" style={{ fontFamily, fontSize: '18px', fontWeight: 600 }}>
            {t('legislation.dashboard.overview.quickStats')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center py-4 border-e border-gray-200 last:border-e-0">
            <p className="text-gray-600 mb-2" style={{ fontFamily, fontSize: '14px', fontWeight: 500 }}>
              {t('legislation.dashboard.overview.closureRate')}
            </p>
            <p className="text-gray-900" style={{ fontFamily, fontSize: '28px', fontWeight: 700 }}>
              86.7%
            </p>
          </div>

          <div className="text-center py-4 border-e border-gray-200 last:border-e-0">
            <p className="text-gray-600 mb-2" style={{ fontFamily, fontSize: '14px', fontWeight: 500 }}>
              {t('legislation.dashboard.overview.activeDepartments')}
            </p>
            <p className="text-gray-900" style={{ fontFamily, fontSize: '28px', fontWeight: 700 }}>
              24
            </p>
          </div>

          <div className="text-center py-4">
            <p className="text-gray-600 mb-2" style={{ fontFamily, fontSize: '14px', fontWeight: 500 }}>
              {t('legislation.dashboard.overview.uploadsThisMonth')}
            </p>
            <p className="text-gray-900" style={{ fontFamily, fontSize: '28px', fontWeight: 700 }}>
              142
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}