import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { fetchEnquiriesMetrics, setQuarter, setYear } from '../slices/dashboardSlice';
import { CaseStatusChart } from './enquries-components/CaseStatusChart';
import { ConversationMetrics } from './enquries-components/ConversationMetrics';
import { SLAPerformanceStatic } from './enquries-components/SLAPerformanceStatic';
import { DepartmentInquiriesChart } from './enquries-components/DepartmentInquiriesChart';
import { RecentCasesTable } from './enquries-components/RecentCasesTable';
import { ChevronDown, Calendar } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';

export function EnquiresDashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { t, isRTL } = useTranslation('legislation');
    const { enquiriesData, filters } = useSelector((state: RootState) => state.dashboard);

    const quarters = [
        { label: t('legislation.dashboard.cases.q1'), value: 'Q1' },
        { label: t('legislation.dashboard.cases.q2'), value: 'Q2' },
        { label: t('legislation.dashboard.cases.q3'), value: 'Q3' },
        { label: t('legislation.dashboard.cases.q4'), value: 'Q4' },
    ] as const;

    const years = [2024, 2025, 2026];

    useEffect(() => {
        dispatch(fetchEnquiriesMetrics());
    }, [dispatch, filters.quarter, filters.year]);

    // Extract data from the new structure
    const caseStatusData = enquiriesData.metrics?.caseStatusMetrics || [];
    const departmentData = enquiriesData.metrics?.departmentMetrics || [];
    const conversationMetrics = enquiriesData.metrics?.conversationMetrics || [];
    const recentCases = enquiriesData.metrics?.recentCases || [];
    const loading = enquiriesData.loading;
    const error = enquiriesData.error;

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center py-20 ">
                <div className="text-center w-2xl">
                    <div className="p-4 rounded-lg mb-4 bg-red-50">
                        <svg className="w-12 h-12 mx-auto text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-red-800 mb-2 text-lg font-semibold">
                            {t('common.errorOccurred')}
                        </h3>
                        <p className="text-red-600 mb-4 text-sm">
                            {t('dashboard.cases.errorFetchingData')}
                        </p>
                        <p className="text-red-500 text-sm bg-red-50 p-3 rounded border text-xs">
                            {error}
                        </p>
                        <button
                            onClick={() => dispatch(fetchEnquiriesMetrics())}
                            className="mt-4 px-6 py-2 rounded-lg transition-all hover:shadow-md text-sm font-semibold"
                            style={{
                                background: 'var(--color-button-gradient)',
                                color: '#FFFFFF'
                            }}
                        >
                            {t('common.tryAgain')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-gray-900 mb-1 text-2xl font-bold">
                    {t('legislation.dashboard.cases.title')}
                </h2>
                <p className="text-gray-500 text-sm font-medium">
                    {t('legislation.dashboard.cases.subtitle')}
                </p>
            </div>

            {/* Period Filters Card */}
            <Card className="bg-white rounded-xl shadow-sm border border-faa-primary/20 p-5">
                <div className={`flex flex-col md:flex-row items-start md:items-end gap-7 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Label Section */}
                    <div className="flex items-center gap-2 pb-2">
                        <Calendar className="w-5 h-5" style={{ color: 'var(--color-faa-primary)' }} />
                        <span className="text-gray-900 text-[15px] font-bold">
                            {t('legislation.dashboard.cases.filterByPeriod')}
                        </span>
                    </div>

                    <div className={`flex flex-wrap items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {/* Quarter Selector */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-600 text-[13px] font-medium">
                                {t('legislation.dashboard.cases.quarter')}
                            </label>
                            <div className="flex gap-2">
                                {quarters.map((quarter) => (
                                    <button
                                        key={quarter.value}
                                        onClick={() => dispatch(setQuarter(quarter.value as any))}
                                        className={`px-4 py-2 rounded-lg transition-all text-sm font-bold border ${filters.quarter === quarter.value
                                            ? 'shadow-sm text-white'
                                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                                            }`}
                                        style={{
                                            backgroundColor: filters.quarter === quarter.value ? 'var(--color-faa-primary)' : '',
                                            borderColor: filters.quarter === quarter.value ? 'var(--color-faa-primary)' : ''
                                        }}
                                    >
                                        {quarter.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Year Selector */}
                        <div className={`flex flex-col gap-1.5 ${isRTL ? 'pe-5' : 'ps-5 border-l border-gray-200'}`}>
                            <label className="text-gray-600 text-[13px] font-medium">
                                {t('legislation.dashboard.cases.year')}
                            </label>
                            <div className="relative">
                                <select
                                    value={filters.year}
                                    onChange={(e) => dispatch(setYear(parseInt(e.target.value)))}
                                    className={`appearance-none bg-white border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-faa-primary/20 cursor-pointer hover:border-gray-400 transition-colors text-sm font-medium text-gray-700 min-w-[120px] ${isRTL ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    className={`absolute top-1/2 -translate-y-1/2 pointer-events-none w-[18px] h-[18px] text-gray-500 ${isRTL ? 'left-3' : 'right-3'}`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Selected Period Display */}
                    <div className={`${isRTL ? 'mr-auto ml-0' : 'ml-auto'}`}>
                        <div
                            className="px-4 py-2 rounded-lg border"
                            style={{
                                backgroundColor: 'rgba(144, 142, 129, 0.1)',
                                borderColor: 'rgba(144, 142, 129, 0.3)'
                            }}
                        >
                            <span className="text-gray-700 text-sm font-bold">
                                {t(`legislation.dashboard.cases.${filters.quarter.toLowerCase()}`)} {filters.year}
                            </span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Cases & Conversation Analytics - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column - Cases by Status */}
                <div className="lg:col-span-7">
                    <CaseStatusChart data={caseStatusData} loading={loading} />
                </div>

                {/* Right Column - Conversation Metrics */}
                <div className="lg:col-span-5">
                    <ConversationMetrics data={conversationMetrics} loading={loading} />
                </div>
            </div>
            <SLAPerformanceStatic isEmpty={caseStatusData.length === 0} />
            <DepartmentInquiriesChart data={departmentData} loading={loading} />
            <RecentCasesTable data={recentCases} loading={loading} />
        </div>
    );
}