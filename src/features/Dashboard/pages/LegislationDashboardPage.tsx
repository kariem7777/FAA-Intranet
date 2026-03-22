import { useEffect } from 'react';
import {
  MessageSquare,
  FileText,
  Scale
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { setActiveTab } from '../slices/dashboardSlice';
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

  const tabs: DashboardTabConfig[] = [
    {
      id: 'cases',
      labelEn: t('legislation.dashboard.cases.tab'),
      labelAr: t('legislation.dashboard.cases.tab'),
      icon: MessageSquare,
    },
    {
      id: 'documents',
      labelEn: t('legislation.dashboard.documents.tab'),
      labelAr: t('legislation.dashboard.documents.tab'),
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
    <div className="bg-bg-subtle" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        {/* Accent top border */}
        <div className="h-1 w-full bg-legislation-active-indicator"></div>

        <div className="max-w-350 mx-auto px-6 py-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div
                className="flex items-center justify-center rounded-lg w-12 h-12 bg-gray-400/10"
              >
                <Scale
                  className="w-6 h-6 text-faa-primary"
                  strokeWidth={2}
                />
              </div>
              <h1
                className="text-3xl font-bold leading-tight text-[#7e2425]"
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
                  className={`flex items-center gap-2 px-5 py-3 transition-all duration-200 relative text-base ${isActive ? 'font-semibold text-[#7e2425] border-b-3 border-legislation-active-indicator mb-[-1px]' : 'font-medium text-gray-400 border-b-3 border-transparent mb-[-1px] hover:text-faa-primary'}`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? 'text-legislation-active-indicator' : 'text-gray-400'}`}
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