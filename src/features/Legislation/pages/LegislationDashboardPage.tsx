import { useEffect } from 'react';
import {
  MessageSquare,
  FileText
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { setActiveTab, fetchCasesOverview, fetchDocumentsOverview, fetchDepartmentInquiries, fetchRecentCases } from '../slices/dashboardSlice';
import type { DashboardTab } from '../types';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { DashboardOverview } from '../components/LegislationDashboard/DashboardOverview';
import { CasesInquiriesDashboard } from '../components/LegislationDashboard/CasesInquiriesDashboard';
import { DocumentsLegislationDashboard } from '../components/LegislationDashboard/DocumentsLegislationDashboard';

interface DashboardTabConfig {
  id: DashboardTab;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface LegislationDashboardPageProps {
  onNavigateToLegalOpinions?: (filter?: { status?: 'new' | 'replied' | 'closed' }) => void;
  onNavigateToOpinionDetail?: (opinionId: number) => void;
}

export default function LegislationDashboardPage({
  onNavigateToLegalOpinions,
  onNavigateToOpinionDetail,
}: LegislationDashboardPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { t, language } = useTranslation('legislation');
  const { fontSizeMultiplier } = useSelector((state: RootState) => state.global);
  const { activeTab } = useSelector((state: RootState) => state.dashboard);

  const isArabic = language === 'ar';

  // Typography - Use Dubai font for Arabic
  const fontFamily = isArabic
    ? 'Dubai, Arial, sans-serif'
    : 'Inter, system-ui, sans-serif';

  // Legislation Platform Theme Colors
  const colors = {
    primary: '#2F4F6F',      // Deep Blue-Gray (legislation primary)
    accent: '#C9A24D',       // Muted Gold
    bgOffWhite: '#F7F8FA',   // Off-White
  };

  // Dashboard tabs configuration
  const tabs: DashboardTabConfig[] = [
    {
      id: 'overview',
      labelEn: 'Overview',
      labelAr: 'الإحصائيات',
      icon: MessageSquare,
    },
    {
      id: 'cases',
      labelEn: 'Legal Opinion',
      labelAr: 'الآراء القانونية',
      icon: MessageSquare,
    },
    {
      id: 'documents',
      labelEn: 'Documents & Legislation',
      labelAr: 'الوثائق والتشريعات',
      icon: FileText,
    },
  ];

  // Fetch data on tab change
  useEffect(() => {
    if (activeTab === 'cases') {
      dispatch(fetchCasesOverview());
      dispatch(fetchDepartmentInquiries());
      dispatch(fetchRecentCases());
    } else if (activeTab === 'documents') {
      dispatch(fetchDocumentsOverview());
    }
  }, [activeTab, dispatch]);

  const handleTabChange = (tabId: DashboardTab) => {
    dispatch(setActiveTab(tabId));
  };

  // Render the active dashboard view
  const renderDashboardView = () => {
    switch (activeTab) {
      case 'cases':
        return (
          <CasesInquiriesDashboard
            onNavigateToLegalOpinions={onNavigateToLegalOpinions}
            onNavigateToOpinionDetail={onNavigateToOpinionDetail}
          />
        );
      case 'documents':
        return <DocumentsLegislationDashboard fontSizeMultiplier={fontSizeMultiplier} />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bgOffWhite }} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        {/* Accent top border */}
        <div className="h-1 w-full" style={{ backgroundColor: colors.accent }}></div>

        <div className="max-w-350 mx-auto px-6 py-6">
          <div>
            <h1
              style={{
                fontFamily,
                fontSize: `${32 * fontSizeMultiplier}px`,
                fontWeight: 700,
                lineHeight: '1.2',
                color: colors.primary,
              }}
            >
              {t('legislation.dashboard.title')}
            </h1>
            <p
              className="text-gray-600 mt-2"
              style={{
                fontFamily,
                fontSize: `${16 * fontSizeMultiplier}px`,
                lineHeight: '1.6'
              }}
            >
              {t('legislation.dashboard.subtitle')}
            </p>
          </div>

          {/* Horizontal Tabs */}
          <div className="mt-6 flex gap-2 border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const label = isArabic ? tab.labelAr : tab.labelEn;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className="flex items-center gap-2 px-5 py-3 transition-all duration-200 relative"
                  style={{
                    fontFamily,
                    fontSize: `${15 * fontSizeMultiplier}px`,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? colors.primary : '#64748b',
                    borderBottom: isActive ? `3px solid ${colors.accent}` : '3px solid transparent',
                    marginBottom: '-1px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = colors.primary;
                      e.currentTarget.style.backgroundColor = '#F8F9FA';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#64748b';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon
                    style={{
                      width: '20px',
                      height: '20px',
                      color: isActive ? colors.accent : '#94a3b8'
                    }}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-350 mx-auto px-6 py-8">
        {renderDashboardView()}
      </div>
    </div>
  );
}