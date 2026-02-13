import { useEffect } from 'react';
import {
  MessageSquare,
  FileText,
  Scale
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { setActiveTab, fetchEnquiriesMetrics, fetchLegislationMetrics } from '../slices/dashboardSlice';
import type { DashboardTab } from '../types';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { EnquiresDashboard } from '../components/EnquiresDashboard';
import { DocumentsLegislationDashboard } from '../components/DocumentsLegislationDashboard';

interface DashboardTabConfig {
  id: DashboardTab;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

export default function LegislationDashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { t, language } = useTranslation('legislation');
  const { activeTab } = useSelector((state: RootState) => state.dashboard);

  const isArabic = language === 'ar';

  const colors = {
    primary: "#908e81", // Neutral gray (legislation primary)
    accent: "#e5ddc8", // Light beige gold
    bgOffWhite: "#FAFAF8", // Off-White,
  };

  const tabs: DashboardTabConfig[] = [
    {
      id: 'cases',
      labelEn: 'Legal Opinions & Inquiries',
      labelAr: 'الآراء القانونية والاستفسارات',
      icon: MessageSquare,
    },
    {
      id: 'documents',
      labelEn: 'Documents & Legislation',
      labelAr: 'الوثائق والتشريعات',
      icon: FileText,
    },
  ];

  // Initialize with cases tab
  useEffect(() => {
    if (activeTab === 'cases') {
      dispatch(setActiveTab('cases'));
    }
  }, [activeTab, dispatch]);

  const handleTabChange = (tabId: DashboardTab) => {
    dispatch(setActiveTab(tabId));
  };

  // Render the active dashboard view
  const renderDashboardView = () => {
    switch (activeTab) {
      case 'cases':
        return <EnquiresDashboard />;
      case 'documents':
        return <DocumentsLegislationDashboard />;
      default:
        return <EnquiresDashboard />;
    }
  };

  return (
    <div style={{ backgroundColor: colors.bgOffWhite }} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        {/* Accent top border */}
        <div className="h-1 w-full" style={{ backgroundColor: colors.accent }}></div>

        <div className="max-w-350 mx-auto px-6 py-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "rgba(164, 168, 169, 0.1)",
                }}
              >
                <Scale
                  className="w-6 h-6 text-[#C9A24D]"
                  style={{ color: "#908e81" }}
                  strokeWidth={2}
                />
              </div>
              <h1
                className="text-3xl font-bold leading-tight"
                style={{
                  color: "#7e2425",
                }}
              >
                {t('legislation.dashboard.title')}
              </h1>
            </div>
            <p
              className="text-gray-600 mt-2 text-base leading-relaxed"
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
                  className="flex items-center gap-2 px-5 py-3 transition-all duration-200 relative text-base"
                  style={{
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#7e2425" : "#a8a8a8",
                    borderBottom: isActive ? `3px solid ${colors.accent}` : '3px solid transparent',
                    marginBottom: '-1px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = colors.primary;
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