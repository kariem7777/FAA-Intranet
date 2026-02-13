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
import { ChevronDown } from 'lucide-react';

export function EnquiresDashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { t, language } = useTranslation('legislation');
    const isArabic = language === 'ar';
    const { enquiriesData, filters } = useSelector((state: RootState) => state.dashboard);

    useEffect(() => {
        dispatch(fetchEnquiriesMetrics());
    }, [dispatch, filters.quarter, filters.year]);

    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
    const years = [2024, 2025, 2026];

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
                            {t('legislation.dashboard.cases.errorFetchingData')}
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
            {/* Page Header & Filters */}
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 ${isArabic ? 'md:flex-row-reverse' : ''}`}>
                <div>
                    <h2 className="text-gray-900 mb-1 text-2xl font-bold">
                        {t('legislation.dashboard.cases.title')}
                    </h2>
                    <p className="text-gray-500 text-sm font-medium">
                        {t('legislation.dashboard.cases.subtitle')}
                    </p>
                </div>

                <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className="relative group">
                        <select
                            value={filters.quarter}
                            onChange={(e) => dispatch(setQuarter(e.target.value as any))}
                            className="appearance-none w-[120px] bg-white border border-gray-200 rounded-lg px-4 h-10 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-slate-200 transition-all cursor-pointer hover:bg-gray-50 pr-10"
                        >
                            {quarters.map((q) => (
                                <option key={q} value={q}>{q}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
                    </div>

                    <div className="relative group">
                        <select
                            value={filters.year.toString()}
                            onChange={(e) => dispatch(setYear(parseInt(e.target.value)))}
                            className="appearance-none w-[120px] bg-white border border-gray-200 rounded-lg px-4 h-10 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-slate-200 transition-all cursor-pointer hover:bg-gray-50 pr-10"
                        >
                            {years.map((y) => (
                                <option key={y} value={y.toString()}>{y}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
                    </div>
                </div>
            </div>

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