import { 
  Building2, 
  TrendingUp,
  MessageSquare,
  FileText,
  Users,
  BarChart3
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Card } from '../ui/card';

export function DepartmentsAnalyticsDashboard() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const fontFamily = isArabic 
    ? 'Tajawal, IBM Plex Sans Arabic, Noto Sans Arabic, sans-serif' 
    : 'Inter, system-ui, sans-serif';

  const themeColor = '#8B272D';

  const t = {
    title: isArabic ? 'تحليلات الإدارات' : 'Departments Analytics',
    subtitle: isArabic 
      ? 'تحليل الاستفسارات والاستخدام حسب الإدارة' 
      : 'Analyze inquiries and usage by department',
    activeDepartments: isArabic ? 'الإدارات النشطة' : 'Active Departments',
    totalInquiries: isArabic ? 'إجمالي الاستفسارات' : 'Total Inquiries',
    avgInquiriesPerDept: isArabic ? 'متوسط الاستفسارات لكل إدارة' : 'Avg. Inquiries per Dept.',
    topDepartment: isArabic ? 'أعلى إدارة' : 'Top Department',
    inquiriesByDepartment: isArabic ? 'الاستفسارات حسب الإدارة' : 'Inquiries by Department',
    departmentPerformance: isArabic ? 'أداء الإدارات' : 'Department Performance',
    inquiries: isArabic ? 'الاستفسارات' : 'Inquiries',
    documents: isArabic ? 'الوثائق' : 'Documents',
    responseRate: isArabic ? 'معدل الاستجابة' : 'Response Rate',
  };

  const departmentStats = [
    {
      icon: Building2,
      label: t.activeDepartments,
      value: '24',
      change: '+2',
      color: '#8B272D',
      bgColor: 'rgba(139, 39, 45, 0.1)',
    },
    {
      icon: MessageSquare,
      label: t.totalInquiries,
      value: '856',
      change: '+28',
      color: '#2563EB',
      bgColor: 'rgba(37, 99, 235, 0.1)',
    },
    {
      icon: BarChart3,
      label: t.avgInquiriesPerDept,
      value: '35.7',
      change: '+5.2',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      icon: TrendingUp,
      label: t.topDepartment,
      value: 'RTA',
      change: '142',
      color: '#16A34A',
      bgColor: 'rgba(22, 163, 74, 0.1)',
    },
  ];

  const departmentData = [
    {
      nameEn: 'Roads and Transport Authority',
      nameAr: 'هيئة النقل والمواصلات',
      code: 'RTA',
      inquiries: 142,
      documents: 87,
      responseRate: 96,
      color: '#8B272D',
    },
    {
      nameEn: 'Health Authority',
      nameAr: 'هيئة الصحة',
      code: 'DHA',
      inquiries: 118,
      documents: 64,
      responseRate: 94,
      color: '#2563EB',
    },
    {
      nameEn: 'Department of Finance',
      nameAr: 'دائرة المالية',
      code: 'DOF',
      inquiries: 105,
      documents: 78,
      responseRate: 97,
      color: '#16A34A',
    },
    {
      nameEn: 'Dubai Land Department',
      nameAr: 'دائرة الأراضي والأملاك',
      code: 'DLD',
      inquiries: 89,
      documents: 52,
      responseRate: 92,
      color: '#F59E0B',
    },
    {
      nameEn: 'Department of Economic Development',
      nameAr: 'دائرة التنمية الاقتصادية',
      code: 'DED',
      inquiries: 76,
      documents: 45,
      responseRate: 91,
      color: '#8B5CF6',
    },
    {
      nameEn: 'Knowledge and Human Development Authority',
      nameAr: 'هيئة المعرفة والتنمية البشرية',
      code: 'KHDA',
      inquiries: 68,
      documents: 38,
      responseRate: 95,
      color: '#EC4899',
    },
    {
      nameEn: 'Dubai Electricity and Water Authority',
      nameAr: 'هيئة كهرباء ومياه دبي',
      code: 'DEWA',
      inquiries: 54,
      documents: 31,
      responseRate: 93,
      color: '#06B6D4',
    },
    {
      nameEn: 'Sharjah Municipality',
      nameAr: 'بلدية الشارقة',
      code: 'SHJ',
      inquiries: 42,
      documents: 28,
      responseRate: 89,
      color: '#84CC16',
    },
  ];

  const maxInquiries = Math.max(...departmentData.map(d => d.inquiries));

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

      {/* Department Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {departmentStats.map((stat, index) => {
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
                className={`text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ 
                  fontFamily,
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {stat.label}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Department Performance Table */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div 
          className="px-6 py-4 border-b border-gray-200"
          style={{ backgroundColor: '#F8F9FA' }}
        >
          <h3 
            className="text-gray-900"
            style={{ 
              fontFamily,
              fontSize: '18px',
              fontWeight: 600
            }}
          >
            {t.departmentPerformance}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th 
                  className="px-6 py-3 text-left"
                  style={{ 
                    fontFamily,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {isArabic ? 'الإدارة' : 'Department'}
                </th>
                <th 
                  className="px-6 py-3 text-center"
                  style={{ 
                    fontFamily,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {t.inquiries}
                </th>
                <th 
                  className="px-6 py-3 text-center"
                  style={{ 
                    fontFamily,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {t.documents}
                </th>
                <th 
                  className="px-6 py-3 text-center"
                  style={{ 
                    fontFamily,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {t.responseRate}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {departmentData.map((dept, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: dept.color }}
                      ></div>
                      <div>
                        <p 
                          className="text-gray-900"
                          style={{ 
                            fontFamily,
                            fontSize: '14px',
                            fontWeight: 600
                          }}
                        >
                          {isArabic ? dept.nameAr : dept.nameEn}
                        </p>
                        <p 
                          className="text-gray-500 font-mono"
                          style={{ 
                            fontFamily: 'monospace',
                            fontSize: '12px'
                          }}
                        >
                          {dept.code}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span 
                      className="text-gray-900"
                      style={{ 
                        fontFamily,
                        fontSize: '15px',
                        fontWeight: 600
                      }}
                    >
                      {dept.inquiries}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span 
                      className="text-gray-600"
                      style={{ 
                        fontFamily,
                        fontSize: '15px',
                        fontWeight: 500
                      }}
                    >
                      {dept.documents}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div 
                        className={`px-3 py-1 rounded-md ${
                          dept.responseRate >= 95 ? 'bg-green-50' : 
                          dept.responseRate >= 90 ? 'bg-yellow-50' : 'bg-red-50'
                        }`}
                      >
                        <span 
                          style={{ 
                            fontFamily,
                            fontSize: '14px',
                            fontWeight: 600,
                            color: dept.responseRate >= 95 ? '#16A34A' : 
                                   dept.responseRate >= 90 ? '#F59E0B' : '#DC2626'
                          }}
                        >
                          {dept.responseRate}%
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}