import { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Building2, 
  Users,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Card } from './ui/card';
import { DashboardOverview } from './legislation/DashboardOverview';
import { CasesInquiriesDashboard } from './legislation/CasesInquiriesDashboard';
import { DocumentsLegislationDashboard } from './legislation/DocumentsLegislationDashboard';
import { DepartmentsAnalyticsDashboard } from './legislation/DepartmentsAnalyticsDashboard';
import { UserPlatformUsageDashboard } from './legislation/UserPlatformUsageDashboard';

type DashboardTab = 'overview' | 'cases' | 'documents' | 'departments' | 'usage';

interface DashboardTabConfig {
  id: DashboardTab;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface LegislationDashboardPageProps {
  onNavigateToLegalOpinions?: (filter?: { status?: 'new' | 'replied' | 'closed' }) => void;
  onNavigateToOpinionDetail?: (opinionId: number) => void;
  fontSizeMultiplier?: number;
}

export function LegislationDashboardPage({ 
  onNavigateToLegalOpinions, 
  onNavigateToOpinionDetail,
  fontSizeMultiplier = 1
}: LegislationDashboardPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [activeTab, setActiveTab] = useState<DashboardTab>('cases');

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

  // Translations
  const t = {
    title: isArabic ? 'لوحة تحكم التشريعات' : 'Legislation Dashboard',
    subtitle: isArabic 
      ? 'تحليلات شاملة ومؤشرات الأداء للتشريعات والاستفسارات القانونية' 
      : 'Comprehensive analytics and performance indicators for legislation and legal inquiries',
    back: isArabic ? 'رجوع' : 'Back',
  };

  // Dashboard tabs configuration - Overview removed
  const tabs: DashboardTabConfig[] = [
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
      <div className="bg-white border-b border-gray-200 shadow-sm mt-[143px]">
        {/* Accent top border */}
        <div className="h-1 w-full" style={{ backgroundColor: colors.accent }}></div>
        
        <div className="max-w-[1400px] mx-auto px-6 py-6">
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
              {t.title}
            </h1>
            <p 
              className="text-gray-600 mt-2"
              style={{ 
                fontFamily,
                fontSize: `${16 * fontSizeMultiplier}px`,
                lineHeight: '1.6'
              }}
            >
              {t.subtitle}
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
                  onClick={() => setActiveTab(tab.id)}
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
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {renderDashboardView()}
      </div>
    </div>
  );
}