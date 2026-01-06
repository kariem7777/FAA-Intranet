import { 
  Users, 
  TrendingUp,
  Clock,
  Eye,
  MousePointer,
  Activity,
  BarChart3
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Card } from '../ui/card';

export function UserPlatformUsageDashboard() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const fontFamily = isArabic 
    ? 'Tajawal, IBM Plex Sans Arabic, Noto Sans Arabic, sans-serif' 
    : 'Inter, system-ui, sans-serif';

  const themeColor = '#8B272D';

  const t = {
    title: isArabic ? 'استخدام المستخدمين والمنصة' : 'User & Platform Usage',
    subtitle: isArabic 
      ? 'تتبع نشاط المستخدمين والمشاركة ووقت الاستخدام' 
      : 'Track user activity, engagement, and time spent',
    totalUsers: isArabic ? 'إجمالي المستخدمين' : 'Total Users',
    activeUsers: isArabic ? 'المستخدمون النشطون' : 'Active Users',
    avgTimeSpent: isArabic ? 'متوسط الوقت المستغرق' : 'Avg. Time Spent',
    totalPageViews: isArabic ? 'إجمالي مشاهدات الصفحة' : 'Total Page Views',
    userActivity: isArabic ? 'نشاط المستخدمين' : 'User Activity',
    topFeatures: isArabic ? 'الميزات الأكثر استخدامًا' : 'Most Used Features',
    engagementMetrics: isArabic ? 'مقاييس المشاركة' : 'Engagement Metrics',
    minutes: isArabic ? 'دقيقة' : 'min',
    users: isArabic ? 'مستخدمين' : 'users',
    views: isArabic ? 'مشاهدات' : 'views',
    thisWeek: isArabic ? 'هذا الأسبوع' : 'This Week',
  };

  const usageStats = [
    {
      icon: Users,
      label: t.totalUsers,
      value: '450',
      change: '+12',
      period: t.thisWeek,
      color: '#8B272D',
      bgColor: 'rgba(139, 39, 45, 0.1)',
    },
    {
      icon: Activity,
      label: t.activeUsers,
      value: '342',
      change: '+8%',
      period: t.thisWeek,
      color: '#2563EB',
      bgColor: 'rgba(37, 99, 235, 0.1)',
    },
    {
      icon: Clock,
      label: t.avgTimeSpent,
      value: '12.4',
      change: '+2.3',
      period: t.minutes,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      icon: Eye,
      label: t.totalPageViews,
      value: '8.2K',
      change: '+15%',
      period: t.thisWeek,
      color: '#16A34A',
      bgColor: 'rgba(22, 163, 74, 0.1)',
    },
  ];

  const topFeatures = [
    {
      nameEn: 'Legal Opinions Search',
      nameAr: 'البحث في الآراء القانونية',
      users: 312,
      views: 2847,
      avgTime: '8.2',
      color: '#8B272D',
    },
    {
      nameEn: 'Documents Library',
      nameAr: 'مكتبة الوثائق',
      users: 289,
      views: 2456,
      avgTime: '12.5',
      color: '#2563EB',
    },
    {
      nameEn: 'Entity\'s Legislation',
      nameAr: 'تشريعات الجهة',
      users: 245,
      views: 1923,
      avgTime: '15.8',
      color: '#16A34A',
    },
    {
      nameEn: 'Submit Inquiry',
      nameAr: 'إرسال استفسار',
      users: 198,
      views: 1456,
      avgTime: '6.4',
      color: '#F59E0B',
    },
    {
      nameEn: 'Federal Legislation',
      nameAr: 'التشريعات الاتحادية',
      users: 156,
      views: 1234,
      avgTime: '10.3',
      color: '#8B5CF6',
    },
  ];

  const dailyActivity = [
    { day: isArabic ? 'السبت' : 'Sat', users: 285 },
    { day: isArabic ? 'الأحد' : 'Sun', users: 312 },
    { day: isArabic ? 'الاثنين' : 'Mon', users: 345 },
    { day: isArabic ? 'الثلاثاء' : 'Tue', users: 328 },
    { day: isArabic ? 'الأربعاء' : 'Wed', users: 356 },
    { day: isArabic ? 'الخميس' : 'Thu', users: 342 },
    { day: isArabic ? 'الجمعة' : 'Fri', users: 198 },
  ];

  const maxUsers = Math.max(...dailyActivity.map(d => d.users));
  const maxViews = Math.max(...topFeatures.map(f => f.views));

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

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {usageStats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <Card 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div 
                className="p-3 rounded-lg inline-flex mb-4"
                style={{ backgroundColor: stat.bgColor }}
              >
                <Icon style={{ width: '24px', height: '24px', color: stat.color }} />
              </div>

              <h3 
                className={`text-gray-900 mb-1 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ 
                  fontFamily,
                  fontSize: '32px',
                  fontWeight: 700
                }}
              >
                {stat.value}
              </h3>
              
              <p 
                className={`text-gray-600 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ 
                  fontFamily,
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {stat.label}
              </p>

              <div className={`flex items-center gap-2 text-green-600 ${isArabic ? 'justify-end' : 'justify-start'}`}>
                <TrendingUp style={{ width: '14px', height: '14px' }} />
                <span 
                  style={{ 
                    fontFamily,
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  {stat.change} {stat.period}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Daily User Activity */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${themeColor}15` }}
          >
            <Activity style={{ width: '20px', height: '20px', color: themeColor }} />
          </div>
          <h3 
            className="text-gray-900"
            style={{ 
              fontFamily,
              fontSize: '18px',
              fontWeight: 600
            }}
          >
            {t.userActivity}
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {dailyActivity.map((day, index) => (
            <div key={index} className="text-center">
              <div className="mb-3 flex items-end justify-center" style={{ height: '120px' }}>
                <div 
                  className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                  style={{ 
                    backgroundColor: themeColor,
                    height: `${(day.users / maxUsers) * 100}%`,
                    minHeight: '20px'
                  }}
                ></div>
              </div>
              
              <p 
                className="text-gray-900 mb-1"
                style={{ 
                  fontFamily,
                  fontSize: '16px',
                  fontWeight: 700
                }}
              >
                {day.users}
              </p>
              
              <p 
                className="text-gray-600"
                style={{ 
                  fontFamily,
                  fontSize: '12px',
                  fontWeight: 500
                }}
              >
                {day.day}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Features */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${themeColor}15` }}
          >
            <MousePointer style={{ width: '20px', height: '20px', color: themeColor }} />
          </div>
          <h3 
            className="text-gray-900"
            style={{ 
              fontFamily,
              fontSize: '18px',
              fontWeight: 600
            }}
          >
            {t.topFeatures}
          </h3>
        </div>

        <div className="space-y-4">
          {topFeatures.map((feature, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span 
                  className="text-gray-700"
                  style={{ 
                    fontFamily,
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  {isArabic ? feature.nameAr : feature.nameEn}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users style={{ width: '14px', height: '14px', color: '#6B7280' }} />
                    <span 
                      className="text-gray-600"
                      style={{ 
                        fontFamily,
                        fontSize: '13px'
                      }}
                    >
                      {feature.users}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye style={{ width: '14px', height: '14px', color: '#6B7280' }} />
                    <span 
                      className="text-gray-600"
                      style={{ 
                        fontFamily,
                        fontSize: '13px'
                      }}
                    >
                      {feature.views}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock style={{ width: '14px', height: '14px', color: '#6B7280' }} />
                    <span 
                      className="text-gray-600"
                      style={{ 
                        fontFamily,
                        fontSize: '13px',
                        minWidth: '50px',
                        textAlign: 'right'
                      }}
                    >
                      {feature.avgTime} {t.minutes}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full transition-all"
                  style={{ 
                    width: `${(feature.views / maxViews) * 100}%`,
                    backgroundColor: feature.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div 
            className="p-3 rounded-lg inline-flex mb-3"
            style={{ backgroundColor: `${themeColor}15` }}
          >
            <BarChart3 style={{ width: '24px', height: '24px', color: themeColor }} />
          </div>
          <h4 
            className="text-gray-900 mb-1"
            style={{ 
              fontFamily,
              fontSize: '28px',
              fontWeight: 700
            }}
          >
            76%
          </h4>
          <p 
            className="text-gray-600"
            style={{ 
              fontFamily,
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            {isArabic ? 'معدل المشاركة' : 'Engagement Rate'}
          </p>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div 
            className="p-3 rounded-lg inline-flex mb-3"
            style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)' }}
          >
            <Activity style={{ width: '24px', height: '24px', color: '#2563EB' }} />
          </div>
          <h4 
            className="text-gray-900 mb-1"
            style={{ 
              fontFamily,
              fontSize: '28px',
              fontWeight: 700
            }}
          >
            4.2
          </h4>
          <p 
            className="text-gray-600"
            style={{ 
              fontFamily,
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            {isArabic ? 'متوسط الجلسات' : 'Avg. Sessions'}
          </p>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div 
            className="p-3 rounded-lg inline-flex mb-3"
            style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)' }}
          >
            <Users style={{ width: '24px', height: '24px', color: '#16A34A' }} />
          </div>
          <h4 
            className="text-gray-900 mb-1"
            style={{ 
              fontFamily,
              fontSize: '28px',
              fontWeight: 700
            }}
          >
            89%
          </h4>
          <p 
            className="text-gray-600"
            style={{ 
              fontFamily,
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            {isArabic ? 'معدل العودة' : 'Return Rate'}
          </p>
        </Card>
      </div>
    </div>
  );
}