import { 
  FileText, 
  BarChart3,
  Building2,
  ChevronDown,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Card } from '../ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LabelList
} from 'recharts';

interface DocumentsLegislationDashboardProps {
  fontSizeMultiplier?: number;
}

export function DocumentsLegislationDashboard({ fontSizeMultiplier = 1 }: DocumentsLegislationDashboardProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedYear, setSelectedYear] = useState('2024');

  const fontFamily = isArabic 
    ? 'Dubai, Arial, sans-serif' 
    : 'Inter, system-ui, sans-serif';

  // Legislation Platform Theme Colors
  const legislationColors = {
    primary: '#2F4F6F',
    accent: '#C9A24D',
  };

  // Helper function to apply font size multiplier
  const getFontSize = (baseSize: number) => {
    return `${baseSize * fontSizeMultiplier}px`;
  };

  const t = {
    title: isArabic ? 'الوثائق والتشريعات' : 'Documents & Legislation',
    subtitle: isArabic 
      ? 'تتبع إحصائيات الوثائق والتحميلات والفئات' 
      : 'Track document statistics, uploads, and categories',
    totalDocuments: isArabic ? 'إجمالي الوثائق' : 'Total Documents',
    avgDocsPerCategory: isArabic ? 'متوسط الوثائق لكل فئة' : 'Avg. Docs per Category',
    documentsByCategory: isArabic ? 'الوثائق حسب الفئة' : 'Documents by Category',
    documentsByEntity: isArabic ? 'الوثائق حسب الجهة' : 'Documents by Entity',
    documents: isArabic ? 'وثيقة' : 'documents',
    uploadsByQuarter: isArabic ? 'التحميلات حسب الربع' : 'Uploads by Quarter',
    year: isArabic ? 'السنة' : 'Year',
  };

  const documentStats = [
    {
      icon: FileText,
      label: t.totalDocuments,
      value: '1,248',
      change: '+12%',
      color: '#8B272D',
      bgColor: 'rgba(139, 39, 45, 0.1)',
    },
    {
      icon: BarChart3,
      label: t.avgDocsPerCategory,
      value: '156',
      change: '+15%',
      color: '#16A34A',
      bgColor: 'rgba(22, 163, 74, 0.1)',
    },
  ];

  const categoryData = [
    {
      nameEn: 'Entity\'s Legislation',
      nameAr: 'تشريعات الجهات الخاضعة',
      count: 342,
      color: '#971b1e',
    },
 
    {
      nameEn: 'Federal Legislation',
      nameAr: 'التشريعات الاتحادية',
      count: 215,
      color: '#064368',
    },
    {
      nameEn: 'Local Legislation',
      nameAr: 'التشريعات المحلية',
      count: 189,
      color: '#01949a',
    },
    {
      nameEn: 'Supreme Committees Legal Opinion',
      nameAr: 'فتاوى اللجنة العليا للتشريعات',
      count: 156,
      color: '#908e81',
    },
    {
      nameEn: 'FAAs Legislation',
      nameAr: 'تشريعات الجهاز',
      count: 70,
      color: '#513a40',
    },
  ];

  const entityData = [
    {
      nameEn: 'Finance Department',
      nameAr: 'إدارة المالية',
      count: 187,
      color: '#971b1e',
    },
    {
      nameEn: 'Legal Affairs Department',
      nameAr: 'إدارة الشؤون القانونية',
      count: 156,
      color: '#064368',
    },
    {
      nameEn: 'Human Resources',
      nameAr: 'الموارد البشرية',
      count: 142,
      color: '#01949a',
    },
    {
      nameEn: 'Internal Audit',
      nameAr: 'التدقيق الداخلي',
      count: 134,
      color: '#908e81',
    },
    {
      nameEn: 'Compliance Department',
      nameAr: 'إدارة الامتثال',
      count: 128,
      color: '#513a40',
    },
    {
      nameEn: 'IT Department',
      nameAr: 'قسم تقنية المعلومات',
      count: 119,
      color: '#7d5a44',
    },
    {
      nameEn: 'Operations',
      nameAr: 'العمليات',
      count: 108,
      color: '#2a5c6f',
    },
    {
      nameEn: 'Risk Management',
      nameAr: 'إدارة المخاطر',
      count: 95,
      color: '#b8927d',
    },
    {
      nameEn: 'Administration',
      nameAr: 'الإدارة العامة',
      count: 89,
      color: '#6d4c56',
    },
    {
      nameEn: 'Public Relations',
      nameAr: 'العلاقات العامة',
      count: 90,
      color: '#3d7680',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 
          className="text-gray-900 mb-2"
          style={{ 
            fontFamily,
            fontSize: getFontSize(24),
            fontWeight: 600
          }}
        >
          {t.title}
        </h2>
        <p 
          className="text-gray-600"
          style={{ 
            fontFamily,
            fontSize: getFontSize(15)
          }}
        >
          {t.subtitle}
        </p>
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {documentStats.map((stat, index) => {
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
                  fontSize: getFontSize(32),
                  fontWeight: 700
                }}
              >
                {stat.value}
              </h3>
              
              <p 
                className={`text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ 
                  fontFamily,
                  fontSize: getFontSize(14),
                  fontWeight: 500
                }}
              >
                {stat.label}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Uploads Trend by Quarter - Area Chart */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Header with Total */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${legislationColors.primary}15` }}
            >
              <TrendingUp size={20} color={legislationColors.primary} />
            </div>

            <h3
              className="text-gray-900"
              style={{
                fontFamily,
                fontSize: getFontSize(18),
                fontWeight: 600
              }}
            >
              {isArabic ? 'اتجاه التحميلات حسب الربع' : 'Uploads Trend by Quarter'}
            </h3>
          </div>

          <div className={`flex items-center gap-2 `}>
            <span
              className="text-gray-500"
              style={{
                fontFamily,
                fontSize: getFontSize(14),
                fontWeight: 500
              }}
            >
              {isArabic ? 'الإجمالي:' : 'Total:'}
            </span>
            <span
              className="text-gray-900"
              style={{
                fontFamily,
                fontSize: getFontSize(18),
                fontWeight: 700
              }}
            >
              1248
            </span>
            <span
              className="text-gray-500"
              style={{
                fontFamily,
                fontSize: getFontSize(14),
                fontWeight: 500
              }}
            >
              {isArabic ? 'تحميل' : 'uploads'}
            </span>
          </div>
        </div>

        {/* Area Chart */}
        {(() => {
          const quarterData = [
            { quarter: 'Q1', quarterAr: 'الربع 1', value: 245, color: '#DC2626' },
            { quarter: 'Q2', quarterAr: 'الربع 2', value: 312, color: '#2563EB' },
            { quarter: 'Q3', quarterAr: 'الربع 3', value: 289, color: '#16A34A' },
            { quarter: 'Q4', quarterAr: 'الربع 4', value: 402, color: '#F59E0B' },
          ];

          const totalUploads = quarterData.reduce((sum, item) => sum + item.value, 0);

          return (
            <>
              {/* Chart */}
              <div style={{ width: '100%', height: 280 }} dir={isArabic ? 'rtl' : 'ltr'}>
                <ResponsiveContainer>
                  <AreaChart
                    data={quarterData}
                    margin={{ top: 30, right: isArabic ? 0 : 20, left: isArabic ? 20 : 0, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#E5E7EB" 
                      vertical={false}
                    />
                    <XAxis 
                      dataKey={isArabic ? 'quarterAr' : 'quarter'}
                      axisLine={false}
                      tickLine={false}
                      tick={{ 
                        fill: '#6B7280', 
                        fontFamily,
                        fontSize: 13,
                        fontWeight: 500
                      }}
                      dy={10}
                      reversed={isArabic}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ 
                        fill: '#6B7280', 
                        fontFamily,
                        fontSize: 12,
                        fontWeight: 500
                      }}
                      domain={[240, 410]}
                      ticks={[245, 284, 324, 363, 402]}
                      dx={isArabic ? 10 : -10}
                      orientation={isArabic ? 'right' : 'left'}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily,
                        fontSize: '13px',
                        color: '#FFFFFF'
                      }}
                      formatter={(value: number) => [`${value}`, isArabic ? 'التحميلات' : 'Uploads']}
                      labelStyle={{ color: '#FFFFFF', fontWeight: 600 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#6366F1"
                      strokeWidth={3}
                      fill="url(#colorUploads)"
                      dot={{
                        fill: '#6366F1',
                        stroke: '#FFFFFF',
                        strokeWidth: 3,
                        r: 6
                      }}
                      activeDot={{
                        fill: '#6366F1',
                        stroke: '#FFFFFF',
                        strokeWidth: 3,
                        r: 8
                      }}
                      label={({ x, y, value }) => (
                        <text
                          x={x}
                          y={y - 12}
                          fill="#111827"
                          textAnchor="middle"
                          style={{
                            fontFamily,
                            fontSize: 14,
                            fontWeight: 700
                          }}
                        >
                          {value}
                        </text>
                      )}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Legend with Percentages */}
              <div className={`flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200 `}>
                {quarterData.map((item, index) => {
                  const percentage = ((item.value / totalUploads) * 100).toFixed(1);
                  
                  return (
                    <div key={index} className="flex flex-col items-center gap-1">
                      <div className={`flex items-center gap-2 `}>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span
                          className="text-gray-900"
                          style={{
                            fontFamily,
                            fontSize: '14px',
                            fontWeight: 600
                          }}
                        >
                          {isArabic ? item.quarterAr : item.quarter}
                        </span>
                      </div>
                      <span
                        className="text-gray-500"
                        style={{
                          fontFamily,
                          fontSize: '13px',
                          fontWeight: 500
                        }}
                      >
                        {percentage}% {isArabic ? 'من الإجمالي' : 'of total'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}
      </Card>

      {/* Documents by Category */}
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
        fontSize: getFontSize(18),
        fontWeight: 600
      }}
    >
      {t.documentsByCategory}
    </h3>
  </div>

  {/* Chart */}
  {(() => {
    const CHART_HEIGHT = 240;
    const MAX_VALUE = 350;
    const Y_AXIS_VALUES = [350, 280, 210, 140, 70, 0];

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
          {/* Bars + Grid */}
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
              {categoryData.map((category, index) => {
                const barHeight =
                  (category.count / MAX_VALUE) * CHART_HEIGHT;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center w-full max-w-[80px] group"
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
                      {category.count}
                    </span>

                    {/* Bar */}
                    <div
                      className="w-full rounded-t-lg transition hover:opacity-80 relative"
                      style={{
                        height: `${barHeight}px`,
                        backgroundColor: category.color,
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
                            {isArabic
                              ? category.nameAr
                              : category.nameEn}
                          </div>
                          <div className="text-gray-300">
                            {category.count}{' '}
                            {isArabic ? 'وثيقة' : 'documents'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-around px-4 mt-3">
            {categoryData.map((category, index) => (
              <div
                key={index}
                className="w-full max-w-[80px] text-center"
              >
                <span
                  className="text-gray-600"
                  style={{
                    fontFamily,
                    fontSize: '11px',
                    fontWeight: 500,
                    lineHeight: '1.3'
                  }}
                >
                  {isArabic
                    ? category.nameAr
                    : category.nameEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  })()}
</Card>

{/* Documents by Entity */}
<Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  {/* Header */}
  <div className="flex items-center gap-3 mb-6">
    <div
      className="p-2 rounded-lg"
      style={{ backgroundColor: `${legislationColors.primary}15` }}
    >
      <Building2 size={20} color={legislationColors.primary} />
    </div>

    <h3
      className="text-gray-900"
      style={{
        fontFamily,
        fontSize: getFontSize(18),
        fontWeight: 600
      }}
    >
      {t.documentsByEntity}
    </h3>
  </div>

  {/* Horizontal Bar Chart */}
  <div style={{ width: '100%', height: 400 }}>
    <ResponsiveContainer>
      <BarChart
        data={entityData.map(item => ({
          name: isArabic ? item.nameAr : item.nameEn,
          count: item.count,
          color: item.color
        }))}
        layout="vertical"
        margin={{
          top: 10,
          right: isArabic ? 60 : 40,
          left: isArabic ? 80 : 20,
          bottom: 10
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#E5E7EB"
          horizontal
          vertical={false}
        />

        {/* X Axis (Numbers) */}
        <XAxis
          type="number"
          reversed={isArabic}             
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#6B7280',
            fontFamily,
            fontSize: 12,
            fontWeight: 500
          }}
          domain={[0, 'dataMax + 10']}
        />

        {/* Y Axis (Entities) */}
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#374151',
            fontFamily,
            fontSize: 11,
            fontWeight: 500,
            textAnchor: isArabic ? 'end' : 'end'
          }}
          width={isArabic ? 180 : 180}
          orientation={isArabic ? 'right' : 'left'}   
        />

        {/* Tooltip */}
        <Tooltip
          cursor={{ fill: '#F3F4F6' }}
          contentStyle={{
            backgroundColor: '#1F2937',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            fontFamily,
            fontSize: '13px',
            color: '#FFFFFF'
          }}
          formatter={(value: number) => [
            value,
            isArabic ? 'وثيقة' : 'documents'
          ]}
          labelStyle={{ color: '#FFFFFF', fontWeight: 600 }}
        />

        {/* Bars */}
        <Bar
          dataKey="count"
          maxBarSize={28}
          radius={isArabic ? [4, 0, 0, 4] : [0, 4, 4, 0]} 
        >
          {entityData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}

          {/* Value Labels */}
          <LabelList
            dataKey="count"
            position={isArabic ? 'right' : 'right'}  
            offset={isArabic ? 50 : 8}
            style={{
              fill: '#374151',
              fontFamily,
              fontSize: 13,
              fontWeight: 700
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</Card>


    </div>
  );
}