import { ReactNode, useState } from 'react';
import { Menu, Bell, User, Home, Building2, Users, BookOpen, FileText, MessageSquare, PenTool, BarChart3, Scale, X, ChevronDown, Grid3x3, Award, GraduationCap, FileSignature, Clock, Briefcase, UserCog, Layers, ClipboardList, FileCheck, UserCheck, ChevronRight, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';
import { FAAHeader } from './FAAHeader';
import faaLogo from 'figma:asset/a5ddb65a14d35992c9db64b833b8ead7d6060dbb.png';
import svgPaths from '../imports/svg-0yq6q3iiva';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onSectorClick?: (sectorId: string) => void;
  onDepartmentClick?: (deptId: string) => void;
}

export function Layout({ children, currentPage, onNavigate, onSectorClick, onDepartmentClick }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [expandedSectors, setExpandedSectors] = useState(false);
  const [expandedLegislation, setExpandedLegislation] = useState(false);
  const [expandedSector, setExpandedSector] = useState<string | null>(null);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === 'ar';

  const sectorsData = {
    'operation-compliance': {
      name: isArabic ? 'قطاع تدقيق العمليات والامتثال والأداء' : 'Operation, Compliance and Performance Audit Sector',
      departments: isArabic ? [
        'إدارة تدقيق الموانئ والمناطق الحرة',
        'إدارة تدقيق العقارات والفنادق والترفيه',
        'إدارة تدقيق الطاقة والصناعة',
        'إدارة تدقيق الجهات الحكومية وغير الربحية',
        'إدارة تدقيق الطيران والنقل',
        'إدارة تدقيق البنوك وشركات الاستثمار',
      ] : [
        'Ports & Free Zones Audit Department',
        'Real Estate, Hotels & Entertainment Audit Department',
        'Energy & Industry Audit Department',
        'Government & Nonprofit Entities Audit Department',
        'Aviation & Transportation Audit Department',
        'Banks & Investment Companies Audit Department',
      ]
    },
    'financial-statement': {
      name: isArabic ? 'قطاع تدقيق البيانات المالية والتدقيق المتخصص' : 'Financial Statement Audit and Specialized Audit Sector',
      departments: isArabic ? [
        'إدارة تدقيق البيانات المالية',
        'إدارة المخالفات المالية والإدارية',
        'إدارة تدقيق الإنشاءات والبنية التحتية',
        'إدارة تدقيق نظم المعلومات',
      ] : [
        'Financial Statement Audit Department',
        'Financial & Administrative Violation Department',
        'Construction & Infrastructure Audit Department',
        'Information Systems Audit Department',
      ]
    },
    'corporate-support': {
      name: isArabic ? 'قطاع الدعم المؤسسي' : 'Corporate Support Sector',
      departments: isArabic ? [
        'إدارة الموارد البشرية',
        'إدارة المالية والمشتريات',
        'إدارة الشؤون القانونية',
        'إدارة تقنية المعلومات',
      ] : [
        'Human Resources Department',
        'Finance and Procurement Department',
        'Legal Affairs Department',
        'Information Technology Department',
      ]
    }
  };

  const translations = {
    en: {
      menuItems: {
        home: 'Home',
        about: 'About FAA',
        organization: 'Organization Structure',
        sectors: 'Sectors',
        dgOffice: 'DG Office',
        administration: 'Administration',
        knowledge: 'Knowledge Hub',
        documents: 'Approved Templates',
        requestsTasks: 'Requests & Tasks',
        visitorLog: 'Visitor Log',
        feedback: 'Employee Feedback',
        signature: 'Digital Signature',
        analytics: 'Analytics & Reporting',
        legislation: 'Legislation',
        automation: 'Automation',
        legislationCategories: 'Legislative Categories',
        legislationSearch: 'Legislation Search',
        legislationDashboard: 'Legislation Dashboard',
        documentsManagement: 'Documents Management',
      },
      notifications: {
        title: 'Notifications',
        new: 'new',
        viewAll: 'View All Notifications →',
        sectorsLabel: 'SECTORS',
      },
      user: 'User',
    },
    ar: {
      menuItems: {
        home: 'الرئيسية',
        about: 'عن الهيئة',
        organization: 'الهيكل التنظيمي',
        sectors: 'القطاعات',
        dgOffice: 'مكتب المدير العام',
        administration: 'الإدارة',
        knowledge: 'مركز المعرفة',
        documents: 'النماذج المعتمدة',
        requestsTasks: 'الطلبات والمهام',
        visitorLog: 'سجل الزوار',
        feedback: 'ملاحظات الموظفين',
        signature: 'التوقيع الرقمي',
        analytics: 'التحليلات والتقارير',
        legislation: 'التشريعات',
        automation: 'الأتمتة',
        legislationCategories: 'الفئات التشريعية',
        legislationSearch: 'بحث التشريعات',
        legislationDashboard: 'لوحة تحكم التشريعات',
        documentsManagement: 'إدارة الوثائق',
      },
      notifications: {
        title: 'الإشعارات',
        new: 'جديد',
        viewAll: '← عرض جميع الإشعارات',
        sectorsLabel: 'القطاعات',
      },
      user: 'مستخدم',
    },
  };

  const t = translations[language];

  const menuItems = [
    { name: t.menuItems.home, icon: Home, id: 'home' },
    { name: t.menuItems.about, icon: Building2, id: 'about' },
    { name: t.menuItems.organization, icon: Users, id: 'organization' },
    { name: t.menuItems.sectors, icon: Layers, id: 'sectors', hasSubmenu: true },
    { name: t.menuItems.dgOffice, icon: Briefcase, id: 'dg-office' },
    { name: t.menuItems.administration, icon: UserCog, id: 'administration' },
    { name: t.menuItems.knowledge, icon: BookOpen, id: 'knowledge' },
    { name: t.menuItems.documents, icon: FileCheck, id: 'documents' },
    { name: t.menuItems.requestsTasks, icon: ClipboardList, id: 'requests-tasks' },
    { name: t.menuItems.visitorLog, icon: UserCheck, id: 'visitor-log' },
    { name: t.menuItems.feedback, icon: MessageSquare, id: 'feedback' },
    { name: t.menuItems.signature, icon: PenTool, id: 'signature' },
    { name: t.menuItems.analytics, icon: BarChart3, id: 'analytics' },
    { name: t.menuItems.legislation, icon: Scale, id: 'legislation', hasSubmenu: true },
    { name: t.menuItems.automation, icon: Grid3x3, id: 'automation' },
  ];

  const notifications = [
    { 
      id: 1, 
      type: 'policy', 
      title: isArabic ? 'تحديث سياسة جديدة' : 'New Policy Update', 
      description: isArabic ? 'سياسة العمل عن بعد المحدثة سارية المفعول الآن. يرجى مراجعة الإرشادات الجديدة.' : 'Updated remote work policy is now effective. Please review the new guidelines.',
      time: isArabic ? 'منذ ساعتين' : '2 hours ago', 
      unread: true,
      icon: 'FileText',
      color: '#ec2227'
    },
    { 
      id: 2, 
      type: 'memo', 
      title: isArabic ? 'مذكرة اجتماع القسم' : 'Department Meeting Memo', 
      description: isArabic ? 'تم جدولة اجتماع المراجعة الربع سنوية في 5 ديسمبر الساعة 10:00 صباحاً.' : 'Quarterly review meeting scheduled for December 5th at 10:00 AM.',
      time: isArabic ? 'منذ 5 ساعات' : '5 hours ago', 
      unread: true,
      icon: 'MessageSquare',
      color: '#8cd4e4'
    },
    { 
      id: 3, 
      type: 'award', 
      title: isArabic ? 'تقدير الموظفين' : 'Employee Recognition', 
      description: isArabic ? 'تهانينا! تم ترشيحك لموظف الشهر.' : 'Congratulations! You have been nominated for Employee of the Month.',
      time: isArabic ? 'منذ يوم واحد' : '1 day ago', 
      unread: false,
      icon: 'Award',
      color: '#7b282d'
    },
    { 
      id: 4, 
      type: 'training', 
      title: isArabic ? 'جلسة تدريبية قادمة' : 'Upcoming Training Session', 
      description: isArabic ? 'ورشة عمل التحول الرقمي مقررة للأسبوع القادم. سجل الآن!' : 'Digital transformation workshop scheduled for next week. Register now!',
      time: isArabic ? 'منذ يومين' : '2 days ago', 
      unread: false,
      icon: 'GraduationCap',
      color: '#413f30'
    },
    { 
      id: 5, 
      type: 'document', 
      title: isArabic ? 'توقيع الوثيقة مطلوب' : 'Document Signature Required', 
      description: isArabic ? 'يتطلب تقرير التدقيق السنوي توقيعك الرقمي.' : 'Annual audit report requires your digital signature.',
      time: isArabic ? 'منذ 3 أيام' : '3 days ago', 
      unread: false,
      icon: 'FileSignature',
      color: '#971b1e'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - New FAA Header */}
      <header className="sticky top-0 z-50" dir={isArabic ? 'rtl' : 'ltr'}>
        <FAAHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={onNavigate}
        />
      </header>

      <div className="relative">
        {/* Main Content */}
        <main className="w-full">
          <div className="">
            {children}
          </div>
        </main>

        {/* Overlay Sidebar */}
        <aside
          className={`fixed top-[136px] ${isArabic ? 'right-0' : 'left-0'} h-[calc(100vh-136px)] bg-white shadow-[0px_3.574px_40.207px_0px_rgba(0,0,0,0.08)] ${isArabic ? 'border-l' : 'border-r'} border-gray-200 transition-all duration-300 z-50 ${
            sidebarOpen ? 'w-72 translate-x-0' : isArabic ? 'w-72 translate-x-full' : 'w-72 -translate-x-full'
          }`}
          dir={isArabic ? 'rtl' : 'ltr'}
          style={{
            fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif'
          }}
        >
          <div className="h-full flex flex-col">
            {/* Navigation */}
            <nav className="flex-1 p-6 space-y-0 overflow-y-auto pt-8">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                if (item.hasSubmenu && item.id === 'sectors') {
                  return (
                    <div key={item.id} className="mb-0">
                      <button
                        onClick={() => setExpandedSectors(!expandedSectors)}
                        className={`group w-full flex items-center justify-between gap-3 px-2 py-3 rounded-[4.185px] transition-all duration-200 ${
                          expandedSectors
                            ? 'text-[#493439]'
                            : 'text-[#493439] hover:bg-[#f0f0f0]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center p-2">
                            <Icon className="h-[18px] w-[18px] text-[#493439]" strokeWidth={1.5} />
                          </div>
                          
                          <span className={`${isArabic ? 'Dubai, Arial, sans-serif' : ''} text-[14px] leading-[25.108px] tracking-[0.14px] text-[#5d7285]`}>
                            {item.name}
                          </span>
                        </div>
                        
                        <ChevronRight className={`h-4 w-4 text-[#493439] transition-transform ${expandedSectors ? 'rotate-90' : ''} ${isArabic ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                      </button>
                    </div>
                  );
                }

                if (item.hasSubmenu && item.id === 'legislation') {
                  return (
                    <div key={item.id} className="mb-0">
                      <button
                        onClick={() => {
                          onNavigate('legislation');
                          setSidebarOpen(false);
                        }}
                        className={`group w-full flex items-center gap-3 px-2 py-3 rounded-[4.185px] transition-all duration-200 ${
                          isActive
                            ? 'bg-[#f0f0f0] '
                            : ' hover:bg-[#f0f0f0]'
                        }`}
                      >
                        <div className="flex items-center justify-center p-2">
                          <Icon className={`h-[18px] w-[18px] ${isActive ? 'text-[#80252a]' : 'text-[#493439]'}`} strokeWidth={1.5} />
                        </div>
                        
                        <span className={`${isArabic ? 'Dubai, Arial, sans-serif' : ''} text-[14px] leading-[25.108px] tracking-[0.14px] text-[#5d7285]`}>
                          {item.name}
                        </span>
                      </button>
                    </div>
                  );
                }
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`group w-full flex items-center gap-3 px-2 py-3 rounded-[4.185px] transition-all duration-200 mb-0 ${
                      isActive
                        ? 'bg-[#f0f0f0]'
                        : 'hover:bg-[#f0f0f0]'
                    }`}
                  >
                    <div className="flex items-center justify-center p-2">
                      <Icon className={`h-[18px] w-[18px] ${isActive ? 'text-[#80252a]' : 'text-[#493439]'}`} strokeWidth={1.5} />
                    </div>
                    
                    <span className={`${isArabic ? 'Dubai, Arial, sans-serif' : ''} text-[14px] leading-[25.108px] tracking-[0.14px] text-[#5d7285]`}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </nav>

          </div>
        </aside>

        {/* Sectors Submenu Overlay - Level 1 */}
        {sidebarOpen && expandedSectors && (
          <div 
            className={`fixed top-[295px] ${isArabic ? 'right-72' : 'left-72'} h-fit max-h-[calc(100vh-295px)] w-80 bg-white shadow-xl z-45 overflow-y-auto rounded-lg`}
            style={{ 
              boxShadow: '0 2px 16px rgba(0, 0, 0, 0.1)',
              fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif'
            }}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <div className="p-6 pb-2">
              <h4 className="text-sm text-gray-600 mb-2">{t.notifications.sectorsLabel}</h4>
            </div>
            <div className="px-4 pb-4 space-y-0.5">
              {Object.entries(sectorsData).map(([sectorId, sector]) => (
                <button
                  key={sectorId}
                  onClick={() => {
                    if (onSectorClick) {
                      onSectorClick(sectorId);
                      setSidebarOpen(false);
                      setExpandedSectors(false);
                      setHoveredSector(null);
                    }
                  }}
                  onMouseEnter={() => setHoveredSector(sectorId)}
                  className={`group w-full flex items-center justify-between gap-3 px-4 py-3 rounded transition-all duration-150 hover:bg-gray-100 ${isArabic ? 'text-right' : 'text-left'}`}
                >
                  <span className="text-[15px] text-gray-700">
                    {sector.name}
                  </span>
                  
                  <ChevronRight className={`h-4 w-4 text-gray-400 flex-shrink-0 ${isArabic ? 'rotate-180' : ''}`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Departments Submenu Overlay - Level 2 */}
        {sidebarOpen && expandedSectors && hoveredSector && (
          <div 
            className={`fixed top-[295px] ${isArabic ? 'right-[610px]' : 'left-[610px]'} h-fit max-h-[calc(100vh-295px)] w-80 bg-white shadow-xl z-50 overflow-y-auto rounded-lg`}
            style={{ 
              boxShadow: '0 2px 16px rgba(0, 0, 0, 0.1)',
              fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif'
            }}
            onMouseLeave={() => setHoveredSector(null)}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <div className="p-6 pb-2">
              <h4 className={`text-sm text-gray-600 mb-1 ${isArabic ? 'text-right' : ''}`}>
                {sectorsData[hoveredSector as keyof typeof sectorsData]?.name.toUpperCase()}
              </h4>
            </div>
            <div className="px-4 pb-4 space-y-0.5">
              {sectorsData[hoveredSector as keyof typeof sectorsData]?.departments.map((dept, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (onDepartmentClick) {
                      onDepartmentClick(dept);
                      setSidebarOpen(false);
                      setExpandedSectors(false);
                      setHoveredSector(null);
                    }
                  }}
                  className={`group w-full flex items-center gap-3 px-4 py-3 rounded transition-all duration-150 hover:bg-gray-100 ${isArabic ? 'text-right' : 'text-left'}`}
                >
                  <span className="text-[15px] text-gray-700">
                    {dept}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Overlay backdrop when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 top-[127px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}