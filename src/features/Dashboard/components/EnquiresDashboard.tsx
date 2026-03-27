import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { fetchEnquiriesMetrics, setQuarter, setYear } from '../slices/dashboardSlice';
import { CaseStatusChart } from './enquries-components/CaseStatusChart';
import { ConversationMetrics } from './enquries-components/ConversationMetrics';
import { SLAPerformance } from './enquries-components/SLAPerformance';
import { DepartmentInquiriesChart } from './enquries-components/DepartmentInquiriesChart';
import { RecentCasesTable } from './enquries-components/RecentCasesTable';
import { Calendar } from 'lucide-react';
import { YearPicker } from '@/shared/components/YearPicker';
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


    useEffect(() => {
        dispatch(fetchEnquiriesMetrics());
    }, [dispatch, filters.quarter, filters.year]);

    // Extract data from the new structure
    const caseStatusData = enquiriesData.metrics?.caseStatusMetrics || [];
    const departmentData = enquiriesData.metrics?.departmentMetrics || [];
    const conversationMetrics = enquiriesData.metrics?.conversationMetrics || [];
    const slaMetrics = enquiriesData.metrics?.slaMetrics || { slaThresholdHours: 0, inquiriesWithinSla: 0, inquiriesExceededSla: 0 };
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
                <h2 className="text-gray-900 mb-1 text-2xl font-bold" >
                    {t('legislation.dashboard.cases.title')}
                </h2>
                <p className="text-gray-500 text-sm font-medium">
                    {t('legislation.dashboard.cases.subtitle')}
                </p>
            </div>

            {/* Period Filters Card */}
            <Card className="bg-white rounded-xl shadow-sm border border-faa-primary/10">
                {/* Header Row */}
                <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-white shadow-sm border border-faa-primary/10">
                            <Calendar className="w-5 h-5 text-faa-primary" />
                        </div>
                        <span className="text-gray-900 text-base font-bold">
                            {t('legislation.dashboard.cases.filterByPeriod')}
                        </span>
                    </div>

                    <div
                        className="px-3 py-1.5 rounded-full border bg-white shadow-sm flex items-center gap-2"
                        style={{
                            borderColor: 'rgba(144, 142, 129, 0.2)'
                        }}
                    >
                        <div className="w-2 h-2 rounded-full bg-faa-primary animate-pulse" />
                        <span className="text-gray-700 text-sm font-bold">
                            {t(`legislation.dashboard.cases.${filters.quarter.toLowerCase()}`)} {filters.year}
                        </span>
                    </div>
                </div>

                {/* Controls Row */}
                <div className="p-5 flex flex-col md:flex-row items-stretch md:items-end gap-6">
                    {/* Quarter Selector */}
                    <div className="flex-1 space-y-3">
                        <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider text-start">
                            {t('legislation.dashboard.cases.quarter')}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {quarters.map((quarter) => (
                                <button
                                    key={quarter.value}
                                    onClick={() => dispatch(setQuarter(quarter.value as any))}
                                    className={`px-3 py-2.5 rounded-xl transition-all text-sm font-bold border ${filters.quarter === quarter.value
                                        ? 'shadow-md text-white border-transparent'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-faa-primary/40 hover:bg-gray-50'
                                        }`}
                                    style={{
                                        backgroundColor: filters.quarter === quarter.value ? 'var(--color-faa-primary)' : '',
                                    }}
                                >
                                    {quarter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Year Selector */}
                    <div className="space-y-3 md:ps-6 md:border-s border-gray-100">
                        <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider text-start">
                            {t('legislation.dashboard.cases.year')}
                        </label>
                        <div className="w-full md:w-32">
                            <YearPicker
                                value={filters.year}
                                onChange={(year: number) => dispatch(setYear(year))}
                                align={isRTL ? 'left' : 'right'}
                            />
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
            <SLAPerformance data={slaMetrics} loading={loading} />
            <DepartmentInquiriesChart data={departmentData} loading={loading} />
            <RecentCasesTable data={recentCases} loading={loading} />
        </div>
    );
}