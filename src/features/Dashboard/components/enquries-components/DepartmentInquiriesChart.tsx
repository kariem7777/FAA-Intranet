import { BarChart3 } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { DepartmentInquiry } from '../../types';
import { DepartmentInquiriesChartSkeleton } from '../Shimmer';
import { useAppSelector } from '@/store/hooks';

interface DepartmentInquiriesChartProps {
    data: DepartmentInquiry[];
    loading?: boolean;
}

export function DepartmentInquiriesChart({ data, loading }: DepartmentInquiriesChartProps) {
    const { t, language, getLocalizedString } = useTranslation('legislation');
    const isArabic = language === 'ar';

    const { departments } = useAppSelector((state) => state.legislationSlice);

    if (loading) {
        return <DepartmentInquiriesChartSkeleton />;
    }

    if (data.length === 0) {
        return (
            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-[320px] flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-gray-50 mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-1">
                    {t('legislation.dashboard.cases.noChartData')}
                </h3>
                <p className="text-gray-500 text-sm max-w-[200px]">
                    {t('legislation.dashboard.cases.noChartDataDescription')}
                </p>
            </Card>
        );
    }

    const legislationColors = {
        primary: '#908e81',
        accent: '#e5ddc8',
    };

    // Department code mapping helper
    const getDeptCode = (id: number) => {
        const department = departments.items.find((dept) => dept.id === id);
        return getLocalizedString(department?.departmentNameEn || 'N/A', department?.departmentNameAr || 'N/A');
    };

    const CHART_HEIGHT = 240;
    const MAX_VALUE = 150; // Align with design constant
    const Y_AXIS_VALUES = [150, 120, 90, 60, 30, 0];

    const colors = ['#971b1e', '#064368', '#01949a', '#908e81', '#513a40', '#7d5a44', '#2a5c6f', '#b8927d'];

    return (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${legislationColors.primary}15` }}>
                    <BarChart3 size={20} style={{ color: legislationColors.primary }} />
                </div>
                <h3 className="text-gray-900 text-lg font-semibold">
                    {t('legislation.dashboard.cases.inquiriesByDepartment')}
                </h3>
            </div>

            <div className="relative flex">
                {/* Y Axis */}
                <div className="flex flex-col justify-between pr-3" style={{ height: CHART_HEIGHT }}>
                    {Y_AXIS_VALUES.map((value) => (
                        <span key={value} className="text-gray-500 text-right text-xs font-medium">
                            {value}
                        </span>
                    ))}
                </div>

                {/* Chart Area */}
                <div className="flex-1">
                    <div className="relative" style={{ height: CHART_HEIGHT }}>
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                            {Y_AXIS_VALUES.map((_, index) => (
                                <div key={index} className="border-t border-gray-100" />
                            ))}
                        </div>

                        {/* Bars */}
                        <div className="absolute inset-0 flex items-end justify-around px-4">
                            {data.map((department, index) => {
                                const barHeight = (department.count / MAX_VALUE) * CHART_HEIGHT;
                                const color = colors[index % colors.length];

                                return (
                                    <div key={index} className="flex flex-col items-center w-full max-w-[70px] group">
                                        {/* Value Above Bar */}
                                        <span className="mb-1 text-gray-900 text-xs font-bold">
                                            {department.count}
                                        </span>

                                        {/* Bar */}
                                        <div
                                            className="w-full rounded-t-lg transition hover:opacity-80 relative"
                                            style={{ height: `${barHeight}px`, backgroundColor: color, minHeight: '6px' }}
                                        >
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-xs">
                                                    <div className="font-semibold">{department.departmentName}</div>
                                                    <div className="text-gray-300">
                                                        {department.count} {isArabic ? 'استفسار' : 'inquiries'}
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
                        {data.map((department, index) => (
                            <div key={index} className="w-full max-w-[70px] text-center">
                                <span className="text-gray-600 font-mono text-[11px] font-bold">
                                    {getDeptCode(department.departmentId)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}
