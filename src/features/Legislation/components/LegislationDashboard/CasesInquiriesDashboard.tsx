import {
  MessageSquare,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
  ChevronDown,
  BarChart3,
  Download,
  Table as TableIcon,
  ArrowUpDown,
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { setQuarter, setYear } from '../../slices/dashboardSlice';
import { useTranslation } from '@/shared/hooks/useTranslation';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// interface CasesInquiriesDashboardProps {
//   onNavigateToLegalOpinions?: (filter?: { status?: 'new' | 'replied' | 'closed' }) => void;
//   onNavigateToOpinionDetail?: (opinionId: number) => void;
// }

export function CasesInquiriesDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { t, language } = useTranslation('legislation');
  const { filters, casesData, departmentsData, recentCases } = useSelector((state: RootState) => state.dashboard);

  const isArabic = language === 'ar';

  const fontFamily = isArabic
    ? 'Dubai, Arial, sans-serif'
    : 'Inter, system-ui, sans-serif';

  const legislationColors = {
    primary: '#2F4F6F',
    accent: '#C9A24D',
  };

  // Use Redux data or fallback to empty
  const caseStatusData = useMemo(() => {
    if (casesData.caseStatusData.length > 0) {
      return casesData.caseStatusData.map(item => ({
        ...item,
        name: isArabic ? item.nameAr : item.name,
      }));
    }
    return [];
  }, [casesData.caseStatusData, isArabic]);

  const slaMetrics = useMemo(() => {
    if (casesData.slaMetrics.length > 0) {
      return casesData.slaMetrics.map(metric => ({
        ...metric,
        label: metric.label === 'Within SLA' ? t('legislation.dashboard.cases.withinSLA') : t('legislation.dashboard.cases.breachedSLA'),
      }));
    }
    return [];
  }, [casesData.slaMetrics, t]);

  const conversationMetrics = useMemo(() => {
    return casesData.conversationMetrics.map(metric => ({
      ...metric,
      unit: metric.unit === 'messages' ? t('legislation.dashboard.cases.messages') : t('legislation.dashboard.cases.days'),
    }));
  }, [casesData.conversationMetrics, t]);

  const departmentData = departmentsData.items;

  const recentCasesItems = useMemo(() => {
    return recentCases.items.map(item => ({
      ...item,
      department: isArabic ? item.departmentAr : item.department,
      title: isArabic ? item.titleAr : item.title,
    }));
  }, [recentCases.items, isArabic]);

  // Legend calculations
  const totalCases = caseStatusData.reduce((sum, item) => sum + item.value, 0);
  const legendData = caseStatusData.map(item => ({
    ...item,
    percent: totalCases > 0 ? ((item.value / totalCases) * 100).toFixed(0) : '0',
  }));

  const getStatusBadge = (status: 'new' | 'replied' | 'closed') => {
    const statusLabels = {
      new: isArabic ? 'جديد' : 'New',
      replied: isArabic ? 'قيد المعالجة' : 'In Progress',
      closed: isArabic ? 'مغلق' : 'Closed',
    };
    const config = {
      new: { bg: 'bg-orange-50', text: 'text-orange-700', label: statusLabels.new },
      replied: { bg: 'bg-blue-50', text: 'text-blue-700', label: statusLabels.replied },
      closed: { bg: 'bg-green-50', text: 'text-green-700', label: statusLabels.closed },
    };
    return config[status];
  };

  // Sorting state for table
  const [sortColumn, setSortColumn] = useState<'conversationLength' | 'totalDays' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: 'conversationLength' | 'totalDays') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedCases = [...recentCasesItems].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  // Years and quarters for filter
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  const quarters: Array<{ value: 'Q1' | 'Q2' | 'Q3' | 'Q4'; label: string }> = [
    { value: 'Q1', label: t('legislation.dashboard.cases.q1') },
    { value: 'Q2', label: t('legislation.dashboard.cases.q2') },
    { value: 'Q3', label: t('legislation.dashboard.cases.q3') },
    { value: 'Q4', label: t('legislation.dashboard.cases.q4') },
  ];

  const handleQuarterChange = (q: 'Q1' | 'Q2' | 'Q3' | 'Q4') => {
    dispatch(setQuarter(q));
  };

  const handleYearChange = (y: number) => {
    dispatch(setYear(y));
  };

  // Loading state
  if (casesData.loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: legislationColors.primary }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-gray-900 mb-2" style={{ fontFamily, fontSize: '24px', fontWeight: 600 }}>
          {t('legislation.dashboard.cases.title')}
        </h2>
        <p className="text-gray-600" style={{ fontFamily, fontSize: '15px' }}>
          {t('legislation.dashboard.cases.subtitle')}
        </p>
      </div>

      {/* Date Filter */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-7">
          <div className="flex items-center gap-2 pb-2">
            <Calendar style={{ width: '20px', height: '20px', color: legislationColors.primary }} />
            <span className="text-gray-900" style={{ fontFamily, fontSize: '15px', fontWeight: 600 }}>
              {t('legislation.dashboard.cases.filterByPeriod')}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Quarter Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-600" style={{ fontFamily, fontSize: '13px', fontWeight: 500 }}>
                {t('legislation.dashboard.cases.quarter')}
              </label>
              <div className="flex gap-2">
                {quarters.map((quarter) => (
                  <button
                    key={quarter.value}
                    onClick={() => handleQuarterChange(quarter.value)}
                    className={`px-4 py-2 rounded-lg transition-all ${filters.quarter === quarter.value ? 'shadow-sm' : 'hover:bg-gray-100'}`}
                    style={{
                      backgroundColor: filters.quarter === quarter.value ? legislationColors.primary : '#F3F4F6',
                      color: filters.quarter === quarter.value ? '#FFFFFF' : '#374151',
                      fontFamily,
                      fontSize: '14px',
                      fontWeight: 600,
                      border: filters.quarter === quarter.value ? 'none' : '1px solid #E5E7EB'
                    }}
                  >
                    {quarter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Selector */}
            <div className="flex flex-col gap-1.5 ps-5">
              <label className="text-gray-600" style={{ fontFamily, fontSize: '13px', fontWeight: 500 }}>
                {t('legislation.dashboard.cases.year')}
              </label>
              <div className="relative">
                <select
                  value={filters.year}
                  onChange={(e) => handleYearChange(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-5 focus:outline-none cursor-pointer hover:border-gray-400 transition-colors"
                  style={{ fontFamily, fontSize: '14px', fontWeight: 500, color: '#374151', minWidth: '120px' }}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ width: '18px', height: '18px', color: '#6B7280', [isArabic ? 'left' : 'right']: '12px' }}
                />
              </div>
            </div>
          </div>

          {/* Selected Period Display */}
          <div className={`ml-auto ${isArabic ? 'mr-auto ml-0' : ''}`}>
            <div
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: `${legislationColors.accent}20`, border: `1px solid ${legislationColors.accent}60` }}
            >
              <span className="text-gray-700" style={{ fontFamily, fontSize: '14px', fontWeight: 600 }}>
                {filters.quarter} {filters.year}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Cases & Conversation Analytics - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Cases by Status */}
        <div className="lg:col-span-7">
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                <AlertTriangle style={{ width: '20px', height: '20px', color: '#DC2626' }} />
              </div>
              <h3 className="text-gray-900" style={{ fontFamily, fontSize: '18px', fontWeight: 600 }}>
                {t('legislation.dashboard.cases.casesByStatus')}
              </h3>
            </div>

            <div className="flex items-center justify-center gap-8">
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
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value ?? 0}`, name]}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontFamily }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-4" style={{ width: '35%' }}>
                {legendData.map((item, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-700" style={{ fontFamily, fontSize: '13px', fontWeight: 600 }}>
                        {item.name}
                      </span>
                    </div>
                    <div className={`flex items-baseline gap-2 ${isArabic ? 'mr-6' : 'ml-6'}`}>
                      <span className="text-gray-900" style={{ fontFamily, fontSize: '20px', fontWeight: 700 }}>
                        {item.value}
                      </span>
                      <span className="text-gray-500" style={{ fontFamily, fontSize: '12px', fontWeight: 500 }}>
                        ({item.percent}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Conversation Metrics */}
        <div className="lg:col-span-5">
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${legislationColors.primary}15` }}>
                <MessageSquare style={{ width: '20px', height: '20px', color: legislationColors.primary }} />
              </div>
              <h3 className="text-gray-900" style={{ fontFamily, fontSize: '18px', fontWeight: 600 }}>
                {t('legislation.dashboard.cases.conversationMetrics')}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
              {conversationMetrics.map((metric, index) => {
                const icons = [MessageSquare, Clock, TrendingUp, Calendar];
                const Icon = icons[index % icons.length];

                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full"
                  >
                    <div className="space-y-3">
                      <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ backgroundColor: metric.bgColor }}>
                        <Icon style={{ width: '22px', height: '22px', color: metric.color }} />
                      </div>
                      <p className="text-gray-600 leading-tight" style={{ fontFamily, fontSize: '13px', fontWeight: 600, lineHeight: '1.4' }}>
                        {metric.label}
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className={`flex items-baseline gap-1.5 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                        <span className="text-gray-900" style={{ fontFamily, fontSize: '32px', fontWeight: 700, lineHeight: '1' }}>
                          {metric.value}
                        </span>
                        <span className="text-gray-500" style={{ fontFamily, fontSize: '14px', fontWeight: 500 }}>
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
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
            <AlertTriangle style={{ width: '20px', height: '20px', color: '#DC2626' }} />
          </div>
          <h3 className="text-gray-900" style={{ fontFamily, fontSize: '18px', fontWeight: 600 }}>
            {t('legislation.dashboard.cases.slaPerformance')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slaMetrics.map((metric, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700" style={{ fontFamily, fontSize: '14px', fontWeight: 600 }}>
                  {metric.label}
                </span>
                <span className="text-gray-900" style={{ fontFamily, fontSize: '18px', fontWeight: 700, color: metric.color }}>
                  {metric.percentage}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${metric.percentage}%`, backgroundColor: metric.color }}
                ></div>
              </div>
              <span className="text-gray-500" style={{ fontFamily, fontSize: '13px', fontWeight: 500 }}>
                {metric.value} {t('legislation.dashboard.cases.cases')}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Inquiries by Department */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${legislationColors.primary}15` }}>
            <BarChart3 size={20} color={legislationColors.primary} />
          </div>
          <h3 className="text-gray-900" style={{ fontFamily, fontSize: '18px', fontWeight: 600 }}>
            {t('legislation.dashboard.cases.inquiriesByDepartment')}
          </h3>
        </div>

        {(() => {
          const CHART_HEIGHT = 240;
          const MAX_VALUE = 150;
          const Y_AXIS_VALUES = [150, 120, 90, 60, 30, 0];

          return (
            <div className="relative flex">
              <div className="flex flex-col justify-between pr-3" style={{ height: CHART_HEIGHT }}>
                {Y_AXIS_VALUES.map((value) => (
                  <span key={value} className="text-gray-500 text-right" style={{ fontFamily, fontSize: '12px', fontWeight: 500 }}>
                    {value}
                  </span>
                ))}
              </div>

              <div className="flex-1">
                <div className="relative" style={{ height: CHART_HEIGHT }}>
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {Y_AXIS_VALUES.map((_, index) => (
                      <div key={index} className="border-t border-gray-200" />
                    ))}
                  </div>

                  <div className="absolute inset-0 flex items-end justify-around px-4">
                    {departmentData.map((dept, index) => {
                      const barHeight = (dept.inquiries / MAX_VALUE) * CHART_HEIGHT;
                      return (
                        <div key={index} className="flex flex-col items-center w-full max-w-[70px] group">
                          <span className="mb-1 text-gray-900" style={{ fontFamily, fontSize: '13px', fontWeight: 700 }}>
                            {dept.inquiries}
                          </span>
                          <div
                            className="w-full rounded-t-lg transition hover:opacity-80 relative"
                            style={{ height: `${barHeight}px`, backgroundColor: dept.color, minHeight: '6px' }}
                          >
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                              <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap" style={{ fontFamily, fontSize: '12px' }}>
                                <div className="font-semibold">{isArabic ? dept.nameAr : dept.nameEn}</div>
                                <div className="text-gray-300">{dept.inquiries} {isArabic ? 'استفسار' : 'inquiries'}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-around px-4 mt-3">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="w-full max-w-[70px] text-center">
                      <span className="text-gray-600 font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
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

      {/* Recent Cases Table */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${legislationColors.primary}15` }}>
              <TableIcon style={{ width: '20px', height: '20px', color: legislationColors.primary }} />
            </div>
            <h3 className="text-gray-900" style={{ fontFamily, fontSize: '18px', fontWeight: 600 }}>
              {t('legislation.dashboard.cases.recentCasesLength')}
            </h3>
          </div>

          <button
            onClick={() => {
              const headers = [t('legislation.dashboard.cases.caseId'), t('legislation.dashboard.cases.department'), t('legislation.dashboard.cases.caseTitle'), t('legislation.dashboard.cases.conversationLength'), t('legislation.dashboard.cases.timeLength'), t('legislation.dashboard.cases.status')];
              const csvRows = [
                headers.join(','),
                ...sortedCases.map(caseItem => [
                  `"#${caseItem.id}"`,
                  `"${caseItem.department}"`,
                  `"${caseItem.title}"`,
                  `"${caseItem.conversationLength} ${t('legislation.dashboard.cases.messages')}"`,
                  `"${caseItem.totalDays} ${t('legislation.dashboard.cases.days')}"`,
                  `"${getStatusBadge(caseItem.status).label}"`
                ].join(','))
              ];
              const csvContent = csvRows.join('\n');
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('legislation.a');
              const url = URL.createObjectURL(blob);
              link.setAttribute('href', url);
              link.setAttribute('download', `recent-cases-${new Date().toISOString().split('legislation.T')[0]}.csv`);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:shadow-md"
            style={{ backgroundColor: legislationColors.primary, color: '#FFFFFF', fontFamily, fontSize: '14px', fontWeight: 600 }}
          >
            <Download style={{ width: '18px', height: '18px' }} />
            <span>{t('legislation.dashboard.cases.exportData')}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>{t('legislation.dashboard.cases.caseId')}</th>
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>{t('legislation.dashboard.cases.department')}</th>
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>{t('legislation.dashboard.cases.caseTitle')}</th>
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>
                  <button className="flex items-center gap-1" onClick={() => handleSort('conversationLength')}>
                    {t('legislation.dashboard.cases.conversationLength')}
                    <ArrowUpDown size={16} color={sortColumn === 'conversationLength' ? '#374151' : '#6B7280'} />
                  </button>
                </th>
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>
                  <button className="flex items-center gap-1" onClick={() => handleSort('totalDays')}>
                    {t('legislation.dashboard.cases.timeLength')}
                    <ArrowUpDown size={16} color={sortColumn === 'totalDays' ? '#374151' : '#6B7280'} />
                  </button>
                </th>
                <th className={`pb-3 px-4 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>{t('legislation.dashboard.cases.status')}</th>
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
                        <span style={{ fontFamily, fontSize: '14px', fontWeight: 600, color: '#374151' }}>{caseItem.conversationLength} {t('legislation.dashboard.cases.messages')}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center gap-2">
                        <Clock style={{ width: '16px', height: '16px', color: '#3B82F6' }} />
                        <span style={{ fontFamily, fontSize: '14px', fontWeight: 600, color: '#374151' }}>{caseItem.totalDays} {t('legislation.dashboard.cases.days')}</span>
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