import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { fetchLegislationMetrics } from '../slices/dashboardSlice';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { DocumentStatistics } from './lesgislation-components/DocumentStatistics';
import { UploadTrendChart } from './lesgislation-components/UploadTrendChart';
import { DocumentsByCategoryChart } from './lesgislation-components/DocumentsByCategoryChart';
import { DocumentsByEntityChart } from './lesgislation-components/DocumentsByEntityChart';
import { useEffect } from 'react';

interface DocumentsLegislationDashboardProps {
  // No props needed anymore
}

export function DocumentsLegislationDashboard({ }: DocumentsLegislationDashboardProps = {}) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('legislation');
  const { legislationData } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchLegislationMetrics());
  }, [dispatch]);

  // Extract data from the new structure
  const metrics = legislationData.metrics;
  const loading = legislationData.loading;
  const error = legislationData.error;

  const uploadTrendData = metrics?.uploadTrendByQuarter || [];
  const categoryData = metrics?.documentsByCategory || [];
  const entityData = metrics?.documentsByEntity || [];

  // Loading state with shimmer effects
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-gray-900 mb-2 text-2xl font-semibold">
            {t('legislation.dashboard.documents.title')}
          </h2>
          <p className="text-gray-600 text-base">
            {t('legislation.dashboard.documents.subtitle')}
          </p>
        </div>
        <DocumentStatistics metrics={null} loading={true} />
        <UploadTrendChart data={[]} loading={true} />
        <DocumentsByCategoryChart data={[]} loading={true} />
        <DocumentsByEntityChart data={[]} loading={true} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center w-2xl">
          <div className="p-4 rounded-lg mb-4 bg-red-50">
            <svg className="w-12 h-12 mx-auto text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-red-800 mb-2 text-lg font-semibold">
              {t('common.errorOccurred')}
            </h3>
            <p className="text-red-600 mb-4 text-sm">
              {t('legislation.dashboard.documents.errorFetchingData')}
            </p>
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded border">
              {error}
            </p>
            <button
              onClick={() => dispatch(fetchLegislationMetrics())}
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
        <h2 className="text-gray-900 mb-2 text-2xl font-semibold">
          {t('legislation.dashboard.documents.title')}
        </h2>
        <p className="text-gray-600 text-base">
          {t('legislation.dashboard.documents.subtitle')}
        </p>
      </div>

      {/* Document Statistics */}
      <DocumentStatistics metrics={metrics} loading={false} />

      {/* Upload Trend Chart */}
      <UploadTrendChart data={uploadTrendData} loading={false} />

      {/* Documents by Category Chart */}
      <DocumentsByCategoryChart data={categoryData} loading={false} />

      {/* Documents by Entity Chart */}
      <DocumentsByEntityChart data={entityData} loading={false} />
    </div>
  );
}