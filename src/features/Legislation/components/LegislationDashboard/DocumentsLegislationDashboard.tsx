import {
  FileText,
  BarChart3,
  Building2,
  TrendingUp,
} from 'lucide-react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';
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
  const { t, language } = useTranslation('legislation');
  const { documentsData } = useSelector((state: RootState) => state.dashboard);

  const isArabic = language === 'ar';

  const fontFamily = isArabic
    ? 'Dubai, Arial, sans-serif'
    : 'Inter, system-ui, sans-serif';

  const legislationColors = {
    primary: '#2F4F6F',
    accent: '#C9A24D',
  };

  const getFontSize = (baseSize: number) => `${baseSize * fontSizeMultiplier}px`;

  // Use Redux data with localization
  const documentStats = useMemo(() => {
    return documentsData.documentStats.map(stat => ({
      ...stat,
      label: isArabic ? stat.labelAr : stat.label,
    }));
  }, [documentsData.documentStats, isArabic]);

  const categoryData = documentsData.categoryData;
  const entityData = documentsData.entityData;
  const quarterData = documentsData.quarterData;

  const totalUploads = quarterData.reduce((sum, item) => sum + item.value, 0);

  // Loading state
  if (documentsData.loading) {
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
        <h2 className="text-gray-900 mb-2" style={{ fontFamily, fontSize: getFontSize(24), fontWeight: 600 }}>
          {t('legislation.dashboard.documents.title')}
        </h2>
        <p className="text-gray-600" style={{ fontFamily, fontSize: getFontSize(15) }}>
          {t('legislation.dashboard.documents.subtitle')}
        </p>
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documentStats.map((stat, index) => {
          const icons = [FileText, BarChart3];
          const Icon = icons[index % icons.length];

          return (
            <Card key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="p-3 rounded-lg inline-flex mb-4" style={{ backgroundColor: stat.bgColor }}>
                <Icon style={{ width: '24px', height: '24px', color: stat.color }} />
              </div>
              <h3 className={`text-gray-900 mb-1 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: getFontSize(32), fontWeight: 700 }}>
                {stat.value}
              </h3>
              <p className={`text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily, fontSize: getFontSize(14), fontWeight: 500 }}>
                {stat.label}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Uploads Trend by Quarter */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${legislationColors.primary}15` }}>
              <TrendingUp size={20} color={legislationColors.primary} />
            </div>
            <h3 className="text-gray-900" style={{ fontFamily, fontSize: getFontSize(18), fontWeight: 600 }}>
              {t('legislation.dashboard.documents.uploadsTrend')}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500" style={{ fontFamily, fontSize: getFontSize(14), fontWeight: 500 }}>
              {t('legislation.dashboard.documents.total')}
            </span>
            <span className="text-gray-900" style={{ fontFamily, fontSize: getFontSize(18), fontWeight: 700 }}>
              {totalUploads}
            </span>
            <span className="text-gray-500" style={{ fontFamily, fontSize: getFontSize(14), fontWeight: 500 }}>
              {t('legislation.dashboard.documents.uploads')}
            </span>
          </div>
        </div>

        <div style={{ width: '100%', height: 280 }} dir={isArabic ? 'rtl' : 'ltr'}>
          <ResponsiveContainer>
            <AreaChart
              data={quarterData.map(q => ({ ...q, quarter: isArabic ? q.quarterAr : q.quarter }))}
              margin={{ top: 30, right: isArabic ? 0 : 20, left: isArabic ? 20 : 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis
                dataKey="quarter"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontFamily, fontSize: 13, fontWeight: 500 }}
                dy={10}
                reversed={isArabic}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontFamily, fontSize: 12, fontWeight: 500 }}
                domain={[240, 410]}
                dx={isArabic ? 10 : -10}
                orientation={isArabic ? 'right' : 'left'}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', padding: '8px 12px', fontFamily, fontSize: '13px', color: '#FFFFFF' }}
                formatter={(value) => [`${value ?? 0}`, isArabic ? 'التحميلات' : 'Uploads']}
                labelStyle={{ color: '#FFFFFF', fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366F1"
                strokeWidth={3}
                fill="url(#colorUploads)"
                dot={{ fill: '#6366F1', stroke: '#FFFFFF', strokeWidth: 3, r: 6 }}
                activeDot={{ fill: '#6366F1', stroke: '#FFFFFF', strokeWidth: 3, r: 8 }}
                label={((props: { x?: string | number; y?: string | number; value?: unknown }) => (
                  <text x={Number(props.x ?? 0)} y={Number(props.y ?? 0) - 12} fill="#111827" textAnchor="middle" style={{ fontFamily, fontSize: 14, fontWeight: 700 }}>
                    {typeof props.value === 'number' ? props.value : 0}
                  </text>
                )) as unknown as undefined}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
          {quarterData.map((item, index) => {
            const percentage = totalUploads > 0 ? ((item.value / totalUploads) * 100).toFixed(1) : '0';
            return (
              <div key={index} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-900" style={{ fontFamily, fontSize: '14px', fontWeight: 600 }}>
                    {isArabic ? item.quarterAr : item.quarter}
                  </span>
                </div>
                <span className="text-gray-500" style={{ fontFamily, fontSize: '13px', fontWeight: 500 }}>
                  {percentage}% {t('legislation.dashboard.documents.ofTotal')}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Documents by Category */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${legislationColors.primary}15` }}>
            <BarChart3 size={20} color={legislationColors.primary} />
          </div>
          <h3 className="text-gray-900" style={{ fontFamily, fontSize: getFontSize(18), fontWeight: 600 }}>
            {t('legislation.dashboard.documents.documentsByCategory')}
          </h3>
        </div>

        {(() => {
          const CHART_HEIGHT = 240;
          const MAX_VALUE = 350;
          const Y_AXIS_VALUES = [350, 280, 210, 140, 70, 0];

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
                    {categoryData.map((category, index) => {
                      const barHeight = (category.count / MAX_VALUE) * CHART_HEIGHT;
                      return (
                        <div key={index} className="flex flex-col items-center w-full max-w-[80px] group">
                          <span className="mb-1 text-gray-900" style={{ fontFamily, fontSize: '13px', fontWeight: 700 }}>
                            {category.count}
                          </span>
                          <div
                            className="w-full rounded-t-lg transition hover:opacity-80 relative"
                            style={{ height: `${barHeight}px`, backgroundColor: category.color, minHeight: '6px' }}
                          >
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                              <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap" style={{ fontFamily, fontSize: '12px' }}>
                                <div className="font-semibold">{isArabic ? category.nameAr : category.nameEn}</div>
                                <div className="text-gray-300">{category.count} {t('legislation.dashboard.documents.documents')}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-around px-4 mt-3">
                  {categoryData.map((category, index) => (
                    <div key={index} className="w-full max-w-[80px] text-center">
                      <span className="text-gray-600" style={{ fontFamily, fontSize: '11px', fontWeight: 500, lineHeight: '1.3' }}>
                        {isArabic ? category.nameAr : category.nameEn}
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
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${legislationColors.primary}15` }}>
            <Building2 size={20} color={legislationColors.primary} />
          </div>
          <h3 className="text-gray-900" style={{ fontFamily, fontSize: getFontSize(18), fontWeight: 600 }}>
            {t('legislation.dashboard.documents.documentsByEntity')}
          </h3>
        </div>

        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={entityData.map(item => ({ name: isArabic ? item.nameAr : item.nameEn, count: item.count, color: item.color }))}
              layout="vertical"
              margin={{ top: 10, right: isArabic ? 60 : 40, left: isArabic ? 80 : 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal vertical={false} />
              <XAxis
                type="number"
                reversed={isArabic}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontFamily, fontSize: 12, fontWeight: 500 }}
                domain={[0, 'dataMax + 10']}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#374151', fontFamily, fontSize: 11, fontWeight: 500, textAnchor: 'end' }}
                width={180}
                orientation={isArabic ? 'right' : 'left'}
              />
              <Tooltip
                cursor={{ fill: '#F3F4F6' }}
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', padding: '8px 12px', fontFamily, fontSize: '13px', color: '#FFFFFF' }}
                formatter={(value) => [value ?? 0, t('legislation.dashboard.documents.documents')]}
                labelStyle={{ color: '#FFFFFF', fontWeight: 600 }}
              />
              <Bar dataKey="count" maxBarSize={28} radius={isArabic ? [4, 0, 0, 4] : [0, 4, 4, 0]}>
                {entityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList
                  dataKey="count"
                  position="right"
                  offset={isArabic ? 50 : 8}
                  style={{ fill: '#374151', fontFamily, fontSize: 13, fontWeight: 700 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}