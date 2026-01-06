import { 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  XCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  ExternalLink,
  ChevronDown,
  BarChart3,
  Download,
  Table as TableIcon,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Card } from '../ui/card';
import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  BarChart as RechartsBarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Label
} from 'recharts';

interface CasesInquiriesDashboardProps {
  onNavigateToLegalOpinions?: (filter?: { status?: 'new' | 'replied' | 'closed' }) => void;
  onNavigateToOpinionDetail?: (opinionId: number) => void;
}

export function CasesInquiriesDashboard({ 
  onNavigateToLegalOpinions, 
  onNavigateToOpinionDetail 
}: CasesInquiriesDashboardProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const fontFamily = isArabic 
    ? 'Dubai, Arial, sans-serif' 
    : 'Inter, system-ui, sans-serif';

  // Legislation Platform Theme Colors
  const legislationColors = {
    primary: '#2F4F6F',
    accent: '#C9A24D',
  };

  const t = {
    title: isArabic ? 'الآراء القانونية' : 'Legal Opinion',
    subtitle: isArabic 
      ? 'تتبع وإدارة الآراء القانونية وأداء اتفاقية مستوى الخدمة' 
      : 'Track and manage legal opinions and SLA performance',
    received: isArabic ? 'اجمالي الإستعلامات' : 'Received',
    closed: isArabic ? 'الإستعلامات المغلقة' : 'Closed',
    new: isArabic ? 'الإستعلامات الجديدة' : 'New',
    inProgress: isArabic ? 'الإستعلامات قيد المعالجة' : 'In Progress',
    overdue: isArabic ? 'الإستعلامات المتأخرة' : 'Overdue',
    slaPerformance: isArabic ? 'أداء اتفاقية مستوى الخدمة' : 'SLA Performance',
    withinSLA: isArabic ? 'ضمن الاتفاقية' : 'Within SLA',
    breachedSLA: isArabic ? 'تجاوزت الاتفاقية' : 'Breached SLA',
    thisMonth: isArabic ? 'هذا الشهر' : 'This Month',
    casesByStatus: isArabic ? 'الحالات حسب الحالة' : 'Cases by Status',
    responseTimeTrend: isArabic ? 'اتجاه وقت الاستجابة' : 'Response Time Trend',
    avgDays: isArabic ? 'متوسط الأيام' : 'Avg. Days',
    recentCases: isArabic ? 'الآراء القانونية الأخيرة' : 'Recent Legal Opinions',
    conversationMetrics: isArabic ? 'مقاييس المحادثة' : 'Conversation Metrics',
    avgConversationLength: isArabic ? 'متوسط طول المحادثة' : 'Avg. Conversation Length',
    messages: isArabic ? 'رسالة' : 'messages',
    avgTimeToClose: isArabic ? 'متوسط وقت الإغلاق' : 'Avg. Time to Close',
    days: isArabic ? 'يوم' : 'days',
    totalMessages: isArabic ? 'إجمالي الرسائل' : 'Total Messages',
    longestConversation: isArabic ? 'أطول محادثة' : 'Longest Conversation',
    shortestResolution: isArabic ? 'أسرع حل' : 'Shortest Resolution',
    filterByPeriod: isArabic ? 'تصفية حسب الفترة' : 'Filter by Period',
    quarter: isArabic ? 'الربع' : 'Quarter',
    year: isArabic ? 'السنة' : 'Year',
    q1: isArabic ? 'الربع الأول' : 'Q1',
    q2: isArabic ? 'الربع الثاني' : 'Q2',
    q3: isArabic ? 'الربع الثالث' : 'Q3',
    q4: isArabic ? 'الربع الرابع' : 'Q4',
    inquiriesByDepartment: isArabic ? 'الاستفسارات حسب الإدارة' : 'Inquiries by Department',
    recentCasesLength: isArabic ? 'طول الحالات الأخيرة' : 'Length of Recent Cases',
    caseId: isArabic ? 'رقم الحالة' : 'Case ID',
    department: isArabic ? 'الإدارة' : 'Department',
    caseTitle: isArabic ? 'عنوان الحالة' : 'Case Title',
    conversationLength: isArabic ? 'طول المحادثة' : 'Conversation Length',
    timeLength: isArabic ? 'طول الوقت' : 'Time Length',
    status: isArabic ? 'الحالة' : 'Status',
    exportData: isArabic ? 'تصدير البيانات' : 'Export Data',
  };

  // Data for case status visualization
  const caseStatusData = [
    {
      name: isArabic ? 'اجمالي الإستعلامات' : 'Received',
      value: 856,
      color: legislationColors.primary,
      icon: MessageSquare,
      filter: undefined,
    },
    {
      name: isArabic ? 'الإستعلامات الجديدة' : 'New',
      value: 114,
      color: '#F59E0B',
      icon: Clock,
      filter: 'new' as const,
    },
    {
      name: isArabic ? 'قيد المعالجة' : 'In Progress',
      value: 742,
      color: '#2563EB',
      icon: AlertTriangle,
      filter: 'replied' as const,
    },
    {
      name: isArabic ? 'الإستعلامات المغلقة' : 'Closed',
      value: 23,
      color: '#16A34A',
      icon: CheckCircle2,
      filter: 'closed' as const,
    },
  ];
const totalCases = caseStatusData.reduce(
  (sum, item) => sum + item.value,
  0
);
const legendData = caseStatusData.map(item => ({
  ...item,
  percent: ((item.value / totalCases) * 100).toFixed(0),
}));

  // Monthly trend data for line chart
  const monthlyTrendData = [
    { month: isArabic ? 'أكتوبر' : 'Oct', received: 789, closed: 720, new: 105 },
    { month: isArabic ? 'نوفمبر' : 'Nov', received: 812, closed: 765, new: 98 },
    { month: isArabic ? 'ديسمبر' : 'Dec', received: 856, closed: 810, new: 114 },
  ];

  const slaMetrics = [
    {
      label: t.withinSLA,
      value: 810,
      percentage: 94.5,
      color: '#16A34A',
    },
    {
      label: t.breachedSLA,
      value: 46,
      percentage: 5.5,
      color: '#DC2626',
    },
  ];

  // Conversation length and time metrics
  const conversationMetrics = [
    {
      icon: MessageSquare,
      label: t.avgConversationLength,
      value: '4.2',
      unit: t.messages,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      trend: '+0.3',
    },
    {
      icon: Clock,
      label: t.avgTimeToClose,
      value: '5.8',
      unit: t.days,
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      trend: '-1.2',
    },
    {
      icon: TrendingUp,
      label: t.longestConversation,
      value: '12',
      unit: t.messages,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      trend: '',
    },
    {
      icon: Calendar,
      label: t.shortestResolution,
      value: '2',
      unit: t.days,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      trend: '',
    },
  ];

  const recentCases = [
    {
      id: 1,
      opinionId: 1,
      department: isArabic ? 'هيئة النقل والمواصلات' : 'Roads and Transport Authority',
      title: isArabic ? 'استفسار بخصوص لائحة المشتريات' : 'Enquiry regarding procurement regulations',
      status: 'replied' as const,
      daysOpen: 2,
      priority: 'high',
      conversationLength: 5,
      totalDays: 10,
    },
    {
      id: 2,
      opinionId: 2,
      department: isArabic ? 'هيئة الصحة' : 'Health Authority',
      title: isArabic ? 'استفسار حول تطبيق معايير المحاسبة الدولية' : 'Enquiry on IFRS implementation',
      status: 'new' as const,
      daysOpen: 1,
      priority: 'medium',
      conversationLength: 1,
      totalDays: 3,
    },
    {
      id: 3,
      opinionId: 3,
      department: isArabic ? 'هيئة كهرباء ومياه دبي' : 'Dubai Electricity and Water Authority',
      title: isArabic ? 'استفسار عن الإجراءات المالية للمشاريع الرأسمالية' : 'Enquiry on capital project financial procedures',
      status: 'new' as const,
      daysOpen: 5,
      priority: 'high',
      conversationLength: 1,
      totalDays: 5,
    },
    {
      id: 4,
      opinionId: 4,
      department: isArabic ? 'دائرة الأراضي والأملاك' : 'Dubai Land Department',
      title: isArabic ? 'استفسار حول ضوابط الصرف' : 'Enquiry on disbursement controls',
      status: 'closed' as const,
      daysOpen: 3,
      priority: 'low',
      conversationLength: 2,
      totalDays: 5,
    },
  ];

  const departmentData = [
    {
      nameEn: 'Roads and Transport Authority',
      nameAr: 'هيئة النقل والمواصلات',
      code: 'RTA',
      inquiries: 142,
      color: '#971b1e',
    },
    {
      nameEn: 'Health Authority',
      nameAr: 'هيئة الصحة',
      code: 'DHA',
      inquiries: 118,
      color: '#064368',
    },
    {
      nameEn: 'Department of Finance',
      nameAr: 'دائرة المالية',
      code: 'DOF',
      inquiries: 105,
      color: '#01949a',
    },
    {
      nameEn: 'Dubai Land Department',
      nameAr: 'دائرة الأراضي والأملاك',
      code: 'DLD',
      inquiries: 89,
      color: '#908e81',
    },
    {
      nameEn: 'Department of Economic Development',
      nameAr: 'دائرة التنمية الاقتصادية',
      code: 'DED',
      inquiries: 76,
      color: '#513a40',
    },
    {
      nameEn: 'Knowledge and Human Development Authority',
      nameAr: 'هيئة المعرفة والتنمية البشرية',
      code: 'KHDA',
      inquiries: 68,
      color: '#7d5a44',
    },
    {
      nameEn: 'Dubai Electricity and Water Authority',
      nameAr: 'هيئة كهرباء ومياه دبي',
      code: 'DEWA',
      inquiries: 54,
      color: '#2a5c6f',
    },
    {
      nameEn: 'Sharjah Municipality',
      nameAr: 'بلدية الشارقة',
      code: 'SHJ',
      inquiries: 42,
      color: '#b8927d',
    },
  ];

  const maxInquiries = Math.max(...departmentData.map(d => d.inquiries));

  const getStatusBadge = (status: 'new' | 'replied' | 'closed') => {
    const config = {
      new: {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        label: isArabic ? 'جديد' : 'New',
      },
      replied: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        label: isArabic ? 'قيد المعالجة' : 'In Progress',
      },
      closed: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        label: isArabic ? 'مغلق' : 'Closed',
      },
    };
    return config[status];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: '#DC2626',
      medium: '#F59E0B',
      low: '#6B7280',
    };
    return colors[priority as keyof typeof colors];
  };

  const [showAllCases, setShowAllCases] = useState(false);
  const currentYear = new Date().getFullYear();
  const [selectedQuarter, setSelectedQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q4');
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  
  // Sorting state for table
  const [sortColumn, setSortColumn] = useState<'conversationLength' | 'timeLength' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Sort handler
  const handleSort = (column: 'conversationLength' | 'timeLength') => {
    if (sortColumn === column) {
      // Toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to descending
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  // Sort cases based on current sort state
  const sortedCases = [...recentCases].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (sortDirection === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  // Generate years (current year and 5 years back)
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  const quarters: Array<{ value: 'Q1' | 'Q2' | 'Q3' | 'Q4'; label: string }> = [
    { value: 'Q1', label: t.q1 },
    { value: 'Q2', label: t.q2 },
    { value: 'Q3', label: t.q3 },
    { value: 'Q4', label: t.q4 },
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

      {/* Date Filter */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className={`flex flex-col md:flex-row items-start md:items-end gap-7 `}>
          <div className={`flex items-center gap-2 pb-2 ${isArabic ? ' ' : ''}`}>
            <Calendar style={{ width: '20px', height: '20px', color: legislationColors.primary }} />
            <span 
              className="text-gray-900"
              style={{ 
                fontFamily,
                fontSize: '15px',
                fontWeight: 600
              }}
            >
              {t.filterByPeriod}
            </span>
          </div>

          <div className={`flex flex-wrap items-center gap-3 ${isArabic ? ' ' : ''}`}>
            {/* Quarter Selector */}
            <div className={`flex flex-col gap-1.5 `}>
              <label 
                className="text-gray-600"
                style={{ 
                  fontFamily,
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                {t.quarter}
              </label>
              <div className={`flex gap-2 ${isArabic ? ' ' : ''}`}>
                {quarters.map((quarter) => (
                  <button
                    key={quarter.value}
                    onClick={() => setSelectedQuarter(quarter.value)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedQuarter === quarter.value
                        ? 'shadow-sm'
                        : 'hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: selectedQuarter === quarter.value ? legislationColors.primary : '#F3F4F6',
                      color: selectedQuarter === quarter.value ? '#FFFFFF' : '#374151',
                      fontFamily,
                      fontSize: '14px',
                      fontWeight: 600,
                      border: selectedQuarter === quarter.value ? 'none' : '1px solid #E5E7EB'
                    }}
                  >
                    {quarter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Selector */}
            <div className={`flex flex-col gap-1.5 ps-5 `}>
              <label 
                className="text-gray-600"
                style={{ 
                  fontFamily,
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                {t.year}
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-5 focus:outline-none focus:ring-2 focus:ring-opacity-50 cursor-pointer hover:border-gray-400 transition-colors"
                  style={{
                    fontFamily,
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    minWidth: '120px',
                  }}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown 
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ 
                    width: '18px', 
                    height: '18px',
                    color: '#6B7280',
                    [isArabic ? 'left' : 'right']: '12px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Selected Period Display */}
          <div className={`ml-auto ${isArabic ? 'mr-auto ml-0' : ''}`}>
            <div 
              className="px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: `${legislationColors.accent}20`,
                border: `1px solid ${legislationColors.accent}60`
              }}
            >
              <span 
                className="text-gray-700"
                style={{ 
                  fontFamily,
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                {selectedQuarter} {selectedYear}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Cases & Conversation Analytics - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7/12) - Cases by Status */}
        <div className="lg:col-span-7">
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
              >
                <AlertTriangle style={{ width: '20px', height: '20px', color: '#DC2626' }} />
              </div>
              <h3 
                className="text-gray-900"
                style={{ 
                  fontFamily,
                  fontSize: '18px',
                  fontWeight: 600
                }}
              >
                {t.casesByStatus}
              </h3>
            </div>

            {/* Donut Chart with Side Legend */}
            <div className="flex items-center justify-center gap-8">
              {/* Pie Chart */}
              <div style={{ width: '60%' }}>
                <ResponsiveContainer width="100%" height={380}>
                  <PieChart>
                   <Pie
  data={caseStatusData}
  cx="50%"
  cy="50%"
  outerRadius={120}
  innerRadius={70}
  paddingAngle={3}
  dataKey="value"
  animationDuration={800}
  labelLine={false}
>
  {caseStatusData.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={entry.color}
      stroke="#fff"
      strokeWidth={2}
    />
  ))}

  
</Pie>


                    <Tooltip
                      formatter={(value: number, name: string) => [`${value}`, name]}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        fontFamily
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend - Beside the chart */}
              <div className="flex flex-col gap-4" style={{ width: '35%' }}>
                {legendData.map((item, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: item.color }}
                      />
                      <span 
                        className="text-gray-700"
                        style={{
                          fontFamily,
                          fontSize: '13px',
                          fontWeight: 600
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                    <div className={`flex items-baseline gap-2 ${isArabic ? 'mr-6' : 'ml-6'}`}>
                      <span 
                        className="text-gray-900"
                        style={{
                          fontFamily,
                          fontSize: '20px',
                          fontWeight: 700
                        }}
                      >
                        {item.value}
                      </span>
                      <span 
                        className="text-gray-500"
                        style={{
                          fontFamily,
                          fontSize: '12px',
                          fontWeight: 500
                        }}
                      >
                        ({item.percent}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (5/12) - Conversation Metrics */}
        <div className="lg:col-span-5">
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${legislationColors.primary}15` }}
              >
                <MessageSquare style={{ width: '20px', height: '20px', color: legislationColors.primary }} />
              </div>
              <h3 
                className="text-gray-900"
                style={{ 
                  fontFamily,
                  fontSize: '18px',
                  fontWeight: 600
                }}
              >
                {t.conversationMetrics}
              </h3>
            </div>

            {/* 2×2 Compact Card Grid */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              {conversationMetrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                  <div 
                    key={index} 
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full"
                  >
                    {/* Icon and Label */}
                    <div className="space-y-3">
                      <div 
                        className="w-11 h-11 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: metric.bgColor }}
                      >
                        <Icon style={{ width: '22px', height: '22px', color: metric.color }} />
                      </div>
                      
                      <p 
                        className="text-gray-600 leading-tight"
                        style={{ 
                          fontFamily,
                          fontSize: '13px',
                          fontWeight: 600,
                          lineHeight: '1.4'
                        }}
                      >
                        {metric.label}
                      </p>
                    </div>

                    {/* Value and Unit */}
                    <div className="mt-4">
                      <div className={`flex items-baseline gap-1.5 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                        <span 
                          className="text-gray-900"
                          style={{ 
                            fontFamily,
                            fontSize: '32px',
                            fontWeight: 700,
                            lineHeight: '1'
                          }}
                        >
                          {metric.value}
                        </span>
                        <span 
                          className="text-gray-500"
                          style={{ 
                            fontFamily,
                            fontSize: '14px',
                            fontWeight: 500
                          }}
                        >
                          {metric.unit}
                        </span>
                      </div>

                     
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* SLA Performance */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
          >
            <AlertTriangle style={{ width: '20px', height: '20px', color: '#DC2626' }} />
          </div>
          <h3 
            className="text-gray-900"
            style={{ 
              fontFamily,
              fontSize: '18px',
              fontWeight: 600
            }}
          >
            {t.slaPerformance}
          </h3>
        </div>

        {/* SLA Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slaMetrics.map((metric, index) => (
            <div key={index}>
              {/* Label and Percentage */}
              <div className="flex items-center justify-between mb-3">
                <span 
                  className="text-gray-700"
                  style={{ 
                    fontFamily,
                    fontSize: '14px',
                    fontWeight: 600
                  }}
                >
                  {metric.label}
                </span>
                <span 
                  className="text-gray-900"
                  style={{ 
                    fontFamily,
                    fontSize: '18px',
                    fontWeight: 700,
                    color: metric.color
                  }}
                >
                  {metric.percentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div 
                className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2"
              >
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${metric.percentage}%`,
                    backgroundColor: metric.color
                  }}
                ></div>
              </div>

              {/* Cases Count */}
              <span 
                className="text-gray-500"
                style={{ 
                  fontFamily,
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                {metric.value} {isArabic ? 'حالة' : 'cases'}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Inquiries by Department Chart */}
<Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  {/* Header */}
  <div className="flex items-center gap-3 mb-6">
    <div
      className="p-2 rounded-lg"
      style={{ backgroundColor: `${legislationColors.primary}15` }}
    >
      <BarChart3 size={20} color={legislationColors.primary} />
    </div>

    <h3
      className="text-gray-900"
      style={{
        fontFamily,
        fontSize: '18px',
        fontWeight: 600
      }}
    >
      {t.inquiriesByDepartment}
    </h3>
  </div>

  {(() => {
    const CHART_HEIGHT = 240;
    const MAX_VALUE = 150;
    const Y_AXIS_VALUES = [150, 120, 90, 60, 30, 0];

    return (
      <div className="relative flex">
        {/* Y Axis */}
        <div
          className="flex flex-col justify-between pr-3"
          style={{ height: CHART_HEIGHT }}
        >
          {Y_AXIS_VALUES.map((value) => (
            <span
              key={value}
              className="text-gray-500 text-right"
              style={{
                fontFamily,
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              {value}
            </span>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1">
          {/* Bars & Grid */}
          <div
            className="relative"
            style={{ height: CHART_HEIGHT }}
          >
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {Y_AXIS_VALUES.map((_, index) => (
                <div
                  key={index}
                  className="border-t border-gray-200"
                />
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-around px-4">
              {departmentData.map((dept, index) => {
                const barHeight =
                  (dept.inquiries / MAX_VALUE) * CHART_HEIGHT;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center w-full max-w-[70px] group"
                  >
                    {/* Value */}
                    <span
                      className="mb-1 text-gray-900"
                      style={{
                        fontFamily,
                        fontSize: '13px',
                        fontWeight: 700
                      }}
                    >
                      {dept.inquiries}
                    </span>

                    {/* Bar */}
                    <div
                      className="w-full rounded-t-lg transition hover:opacity-80 relative"
                      style={{
                        height: `${barHeight}px`,
                        backgroundColor: dept.color,
                        minHeight: '6px'
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                        <div
                          className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
                          style={{
                            fontFamily,
                            fontSize: '12px'
                          }}
                        >
                          <div className="font-semibold">
                            {isArabic ? dept.nameAr : dept.nameEn}
                          </div>
                          <div className="text-gray-300">
                            {dept.inquiries}{' '}
                            {isArabic ? 'استفسار' : 'inquiries'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* X Axis (Department Codes) */}
          <div className="flex justify-around px-4 mt-3">
            {departmentData.map((dept, index) => (
              <div
                key={index}
                className="w-full max-w-[70px] text-center"
              >
                <span
                  className="text-gray-600 font-mono"
                  style={{
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  {dept.code}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  })()}
</Card>


      {/* Length of Recent Cases Table */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${legislationColors.primary}15` }}
            >
              <TableIcon style={{ width: '20px', height: '20px', color: legislationColors.primary }} />
            </div>
            <h3
              className="text-gray-900"
              style={{
                fontFamily,
                fontSize: '18px',
                fontWeight: 600
              }}
            >
              {t.recentCasesLength}
            </h3>
          </div>

          <button
            onClick={() => {
              const headers = [t.caseId, t.department, t.caseTitle, t.conversationLength, t.timeLength, t.status];
              const csvRows = [
                headers.join(','),
                ...sortedCases.map(caseItem => [
                  `"#${caseItem.id}"`,
                  `"${caseItem.department}"`,
                  `"${caseItem.title}"`,
                  `"${caseItem.conversationLength} ${isArabic ? 'رسائل' : 'messages'}"`,
                  `"${caseItem.totalDays} ${isArabic ? 'أيام' : 'days'}"`,
                  `"${getStatusBadge(caseItem.status).label}"`
                ].join(','))
              ];
              const csvContent = csvRows.join('\n');
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              const url = URL.createObjectURL(blob);
              link.setAttribute('href', url);
              link.setAttribute('download', `recent-cases-length-${new Date().toISOString().split('T')[0]}.csv`);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:shadow-md"
            style={{
              backgroundColor: legislationColors.primary,
              color: '#FFFFFF',
              fontFamily,
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            <Download style={{ width: '18px', height: '18px' }} />
            <span>{t.exportData}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>{t.caseId}</th>
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>{t.department}</th>
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>{t.caseTitle}</th>
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>
                  <button
                    className={`flex items-center gap-1 ${isArabic ? 'text-right' : 'text-left'} `}
                    onClick={() => handleSort('conversationLength')}
                  >
                    {t.conversationLength}
                    <ArrowUpDown
                      size={16}
                      color={sortColumn === 'conversationLength' ? (sortDirection === 'asc' ? '#374151' : '#DC2626') : '#6B7280'}
                    />
                  </button>
                </th>
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>
                  <button
                    className={`flex items-center gap-1 ${isArabic ? 'text-right' : 'text-left'} `}
                    onClick={() => handleSort('timeLength')}
                  >
                    {t.timeLength}
                    <ArrowUpDown
                      size={16}
                      color={sortColumn === 'timeLength' ? (sortDirection === 'asc' ? '#374151' : '#DC2626') : '#6B7280'}
                    />
                  </button>
                </th>
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>{t.status}</th>
              </tr>
            </thead>
            <tbody>
              {sortedCases.map((caseItem) => {
                const statusBadge = getStatusBadge(caseItem.status);
                return (
                  <tr key={caseItem.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className={`py-4 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '14px', fontWeight: 600, color: '#374151' }}>#{caseItem.id}</td>
                    <td className={`py-4 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '14px', fontWeight: 500, color: '#6B7280' }}>{caseItem.department}</td>
                    <td className={`py-4 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '14px', fontWeight: 500, color: '#111827', maxWidth: '300px' }}>{caseItem.title}</td>
                    <td className={`py-4 px-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center gap-2">
                        <MessageSquare style={{ width: '16px', height: '16px', color: '#8B5CF6' }} />
                        <span style={{ fontFamily, fontSize: '14px', fontWeight: 600, color: '#374151' }}>{caseItem.conversationLength} {isArabic ? 'رسائل' : 'messages'}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center gap-2">
                        <Clock style={{ width: '16px', height: '16px', color: '#3B82F6' }} />
                        <span style={{ fontFamily, fontSize: '14px', fontWeight: 600, color: '#374151' }}>{caseItem.totalDays} {isArabic ? 'أيام' : 'days'}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                      <span className={`px-3 py-1 rounded-full ${statusBadge.bg} ${statusBadge.text}`} style={{ fontFamily, fontSize: '12px', fontWeight: 600 }}>{statusBadge.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      
    </div>
  );
}