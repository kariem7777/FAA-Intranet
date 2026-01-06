import { 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  Clock,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Card } from '../ui/card';

export function DashboardOverview() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const fontFamily = isArabic 
    ? 'Tajawal, IBM Plex Sans Arabic, Noto Sans Arabic, sans-serif' 
    : 'Inter, system-ui, sans-serif';

  const themeColor = '#8B272D';

  const t = {
    title: isArabic ? 'نظرة عامة - مؤشرات الأداء الرئيسية' : 'Overview - Key Performance Indicators',
    subtitle: isArabic 
      ? 'نظرة شاملة على أداء نظام التشريعات والاستفسارات القانونية' 
      : 'Comprehensive view of legislation system and legal inquiries performance',
    totalDocuments: isArabic ? 'إجمالي الوثائق' : 'Total Documents',
    totalInquiries: isArabic ? 'إجمالي الاستفسارات' : 'Total Inquiries',
    closedCases: isArabic ? 'الحالات المغلقة' : 'Closed Cases',
    pendingCases: isArabic ? 'الحالات قيد الانتظار' : 'Pending Cases',
    avgResponseTime: isArabic ? 'متوسط وقت الاستجابة' : 'Avg. Response Time',
    slaCompliance: isArabic ? 'الالتزام باتفاقية مستوى الخدمة' : 'SLA Compliance',
    thisMonth: isArabic ? 'هذا الشهر' : 'This Month',
    vsLastMonth: isArabic ? 'مقارنة بالشهر الماضي' : 'vs Last Month',
    days: isArabic ? 'أيام' : 'days',
    recentActivity: isArabic ? 'النشاط الأخير' : 'Recent Activity',
    quickStats: isArabic ? 'إحصائيات سريعة' : 'Quick Statistics',
  };

  // KPI Cards Data
  const kpiCards = [
    {
      icon: FileText,
      label: t.totalDocuments,
      value: '1,248',
      change: '+12',
      changeType: 'positive',
      color: '#8B272D',
      bgColor: 'rgba(139, 39, 45, 0.1)',
    },
    {
      icon: MessageSquare,
      label: t.totalInquiries,
      value: '856',
      change: '+28',
      changeType: 'positive',
      color: '#2563EB',
      bgColor: 'rgba(37, 99, 235, 0.1)',
    },
    {
      icon: CheckCircle2,
      label: t.closedCases,
      value: '742',
      change: '+18',
      changeType: 'positive',
      color: '#16A34A',
      bgColor: 'rgba(22, 163, 74, 0.1)',
    },
    {
      icon: Clock,
      label: t.pendingCases,
      value: '114',
      change: '-8',
      changeType: 'negative',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
  ];

  // Performance metrics
  const performanceMetrics = [
    {
      icon: BarChart3,
      label: t.avgResponseTime,
      value: '2.4',
      unit: t.days,
      trend: '-0.3',
      trendType: 'positive',
      color: '#8B272D',
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 
          className="text-gray-900 mb-2"
          style={{ 
            fontFamily,
            fontSize: '24px',
            fontWeight: 600
          }}
        >
          {t.title}
        </h2>
        <p 
          className="text-gray-600"
          style={{ 
            fontFamily,
            fontSize: '15px'
          }}
        >
          {t.subtitle}
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = kpi.changeType === 'positive';

          return (
            <Card 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className={`flex items-center ${isArabic ? 'justify-between ' : 'justify-between'} mb-4`}>
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: kpi.bgColor }}
                >
                  <Icon style={{ width: '24px', height: '24px', color: kpi.color }} />
                </div>
              </div>

              <h3 
                className={`text-gray-900 mb-1 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ 
                  fontFamily,
                  fontSize: '28px',
                  fontWeight: 700
                }}
              >
                {kpi.value}
              </h3>
              <p 
                className={`text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ 
                  fontFamily,
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {kpi.label}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 ">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.trendType === 'positive';

          return (
            <Card 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <Icon style={{ width: '28px', height: '28px', color: metric.color }} />
                </div>
                
                <div className="flex-1">
                  <p 
                    className="text-gray-600 mb-1"
                    style={{ 
                      fontFamily,
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    {metric.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 
                      className="text-gray-900"
                      style={{ 
                        fontFamily,
                        fontSize: '32px',
                        fontWeight: 700
                      }}
                    >
                      {metric.value}
                    </h3>
                    <span 
                      className="text-gray-500"
                      style={{ 
                        fontFamily,
                        fontSize: '18px',
                        fontWeight: 500
                      }}
                    >
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
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${themeColor}15` }}
          >
            <BarChart3 style={{ width: '20px', height: '20px', color: themeColor }} />
          </div>
          <h3 
            className="text-gray-900"
            style={{ 
              fontFamily,
              fontSize: '18px',
              fontWeight: 600
            }}
          >
            {t.quickStats}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center py-4 border-e border-gray-200 last:border-e-0">
            <p 
              className="text-gray-600 mb-2"
              style={{ 
                fontFamily,
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              {isArabic ? 'معدل الإغلاق' : 'Closure Rate'}
            </p>
            <p 
              className="text-gray-900"
              style={{ 
                fontFamily,
                fontSize: '28px',
                fontWeight: 700
              }}
            >
              86.7%
            </p>
          </div>
          
          <div className="text-center py-4 border-e border-gray-200 last:border-e-0">
            <p 
              className="text-gray-600 mb-2"
              style={{ 
                fontFamily,
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              {isArabic ? 'الجهات النشطة' : 'Active Departments'}
            </p>
            <p 
              className="text-gray-900"
              style={{ 
                fontFamily,
                fontSize: '28px',
                fontWeight: 700
              }}
            >
              24
            </p>
          </div>
          
          <div className="text-center py-4">
            <p 
              className="text-gray-600 mb-2"
              style={{ 
                fontFamily,
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              {isArabic ? 'التحميلات هذا الشهر' : 'Uploads This Month'}
            </p>
            <p 
              className="text-gray-900"
              style={{ 
                fontFamily,
                fontSize: '28px',
                fontWeight: 700
              }}
            >
              142
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}