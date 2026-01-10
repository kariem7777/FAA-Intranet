import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useState } from 'react';
import { 
  Users, 
  Bell, 
  BookOpen, 
  Megaphone, 
  MessageSquare, 
  FileCheck,
  Gem,
  Calendar,
  TrendingUp,
  FileText,
  Globe,
  ClipboardList,
  Target,
  Scale,
  UserCircle,
  Trophy,
  Calculator,
  ShieldCheck,
  Package,
  BarChart3,
  FolderKanban,
  UserCheck,
  Search,
  LayoutGrid,
  List,
  Pin,
  ExternalLink,
  Settings,
  Database,
  FileSearch,
  Clock,
  Star,
  TrendingUpIcon,
  SortAsc,
  Filter,
  Shield,
  Lock,
  KeyRound,
  Fingerprint
} from 'lucide-react';
import { HeroBanner } from './HeroBanner';
import { useLanguage } from './LanguageContext';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';

export function AutomationPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [pinnedAppIds, setPinnedAppIds] = useState<number[]>([1, 4, 5, 6, 8, 11]);
  const [sortBy, setSortBy] = useState<'name' | 'recent' | 'popular'>('name');

  const togglePin = (appId: number) => {
    setPinnedAppIds(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  // Translations
  const t = {
    en: {
      title: 'Automation Hub',
      description: 'Access all internal applications and systems from one centralized hub. Streamline your workflow with quick access to essential tools and services.',
      searchPlaceholder: 'Search applications...',
      grid: 'Grid',
      list: 'List',
      categories: 'Categories',
      allApplications: 'All Applications',
      pinned: 'Pinned Applications',
      noResults: 'No applications found',
      noResultsDesc: 'Try adjusting your search or filter criteria',
      sortBy: 'Sort By',
      sortName: 'Name (A-Z)',
      sortRecent: 'Recently Used',
      sortPopular: 'Most Popular',
      filters: 'Quick Filters',
      showPinned: 'Pinned Only',
      administration: 'Administration Tools',
      employee: 'Employee Services',
      engagement: 'Engagement',
      compliance: 'Audit & Compliance',
      systems: 'Systems & Tools',
      operations: 'Operations',
      security: 'Information Security',
    },
    ar: {
      title: 'مركز الأتمتة',
      description: 'الوصول إلى جميع التطبيقات والأنظمة الداخلية من مركز واحد. قم بتبسيط سير عملك من خلال الوصول السريع إلى الأدوات والخدمات الأساسية.',
      searchPlaceholder: 'البحث عن التطبيقات...',
      grid: 'شبكة',
      list: 'قائمة',
      categories: 'الفئات',
      allApplications: 'جميع التطبيقات',
      pinned: 'التطبيقات المثبتة',
      noResults: 'لم يتم العثور على تطبيقات',
      noResultsDesc: 'حاول تعديل معايير البحث أو التصفية',
      sortBy: 'الترتيب حسب',
      sortName: 'الاسم (أ-ي)',
      sortRecent: 'المستخدمة مؤخراً',
      sortPopular: 'الأكثر شعبية',
      filters: 'فلاتر سريعة',
      showPinned: 'المثبتة فقط',
      administration: 'أدوات الإدارة',
      employee: 'خدمات الموظفين',
      engagement: 'المشاركة',
      compliance: 'التدقيق والامتثال',
      systems: 'الأنظمة والأدوات',
      operations: 'العمليات',
      security: 'أمن المعلومات',
    },
  };

  const translations = t[language];
  
  const applications = [
    // Administration & Management
    { id: 1, name: 'Administration', icon: Users, description: 'Central administration portal', category: 'admin', color: '#971b1e', pinned: true },
    { id: 2, name: 'Manage Popups', icon: Bell, description: 'System-wide notifications', category: 'admin', color: '#7b282d' },
    { id: 3, name: 'Manage Knowledge Hub', icon: BookOpen, description: 'Knowledge base management', category: 'admin', color: '#064368' },
    { id: 4, name: 'Manage Announcements', icon: Megaphone, description: 'Corporate announcements', category: 'admin', color: '#01949a', pinned: true },
    
    // Employee Services
    { id: 5, name: 'Employee Profile', icon: UserCircle, description: 'View employee information', category: 'employee', color: '#8cd4e4', pinned: true },
    { id: 6, name: 'Employee Performance', icon: TrendingUp, description: 'Performance tracking', category: 'employee', color: '#1949a1', pinned: true },
    { id: 7, name: 'Incentive Reward System', icon: Trophy, description: 'Employee rewards', category: 'employee', color: '#D4A017' },
    { id: 8, name: 'Request & Tasks', icon: ClipboardList, description: 'Work requests tracking', category: 'employee', color: '#543671', pinned: true },
    
    // Feedback & Engagement
    { id: 9, name: 'Feedback-Suggestion', icon: MessageSquare, description: 'Submit feedback', category: 'engagement', color: '#908e81' },
    { id: 10, name: 'Survey', icon: FileCheck, description: 'Organizational surveys', category: 'engagement', color: '#2a5c6f' },
    { id: 11, name: 'Events', icon: Calendar, description: 'Company events', category: 'engagement', color: '#413f30', pinned: true },
    
    // Compliance & Governance
    { id: 12, name: 'Code of Conduct', icon: ShieldCheck, description: 'Organizational code', category: 'compliance', color: '#513a40' },
    { id: 13, name: 'FAA Legislative Platform', icon: Scale, description: 'Legislative compliance', category: 'compliance', color: '#2F4F6F' },
    { id: 14, name: 'Tax Audit', icon: Calculator, description: 'Tax audit management', category: 'compliance', color: '#7d5a44' },
    { id: 15, name: 'AFVP', icon: Globe, description: 'Anti-Financial Violence', category: 'compliance', color: '#6d4c56' },
    
    // Systems & Tools
    { id: 16, name: 'FAA ITC', icon: Gem, description: 'Technology Center', category: 'systems', color: '#C9A24D' },
    { id: 17, name: 'Strategy Execution Monitoring', icon: Target, description: 'Strategic initiatives', category: 'systems', color: '#9B6B3B' },
    { id: 18, name: 'Project Management System', icon: FolderKanban, description: 'Project deliverables', category: 'systems', color: '#3d7680' },
    { id: 19, name: 'Al Maashir', icon: BarChart3, description: 'Performance analytics', category: 'systems', color: '#b8927d' },
    
    // Operations
    { id: 20, name: 'Asset Register', icon: Package, description: 'Asset management', category: 'operations', color: '#5C7C6B' },
    { id: 21, name: 'Visitor Log', icon: UserCheck, description: 'Visitor tracking', category: 'operations', color: '#8B5E3C' },
    
    // Information Security
    { id: 22, name: 'Cybersecurity Dashboard', icon: Shield, description: 'Security monitoring & alerts', category: 'security', color: '#2C5282' },
    { id: 23, name: 'Access Control', icon: Lock, description: 'User access management', category: 'security', color: '#047857' },
    { id: 24, name: 'Identity Management', icon: Fingerprint, description: 'Authentication systems', category: 'security', color: '#7C3AED' },
    { id: 25, name: 'Encryption Keys', icon: KeyRound, description: 'Cryptographic key management', category: 'security', color: '#0891B2' },
  ];

  const categories = [
    { id: 'all', name: 'All Applications', icon: LayoutGrid },
    { id: 'admin', name: 'Administration Tools', icon: Settings },
    { id: 'employee', name: 'Employee Services', icon: Users },
    { id: 'engagement', name: 'Engagement', icon: MessageSquare },
    { id: 'compliance', name: 'Audit & Compliance', icon: ShieldCheck },
    { id: 'systems', name: 'Systems & Tools', icon: Database },
    { id: 'operations', name: 'Operations', icon: FileSearch },
    { id: 'security', name: 'Information Security', icon: Shield },
  ];

  const categoryGroups = {
    'admin': 'Administration Tools',
    'employee': 'Employee Services',
    'engagement': 'Feedback & Engagement',
    'compliance': 'Audit & Compliance',
    'systems': 'Systems & Tools',
    'operations': 'Operations Management',
    'security': 'Information Security',
  };

  const pinnedApps = applications.filter(app => pinnedAppIds.includes(app.id));
  
  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedApps = filteredApps.reduce((acc, app) => {
    if (!acc[app.category]) acc[app.category] = [];
    acc[app.category].push(app);
    return acc;
  }, {} as Record<string, typeof applications>);

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundColor: '#f8f9fa'
      }}
    >
      {/* Hero Banner */}
      <div className="px-20 py-6">
        <HeroBanner 
          title={{
            en: 'Automation Hub',
            ar: 'مركز الأتمتة'
          }}
          description={{
            en: 'Access all internal applications and systems from one centralized hub. Streamline your workflow with quick access to essential tools and services.',
            ar: 'الوصول إلى جميع التطبيقات والأنظمة الداخلية من مركز واحد. قم بتبسيط سير عملك من خلال الوصول السريع إلى الأدوات والخدمات الأساسية.'
          }}
        />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-20 py-4">
          <div className="flex items-center gap-3 mb-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={translations.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 bg-white border-gray-300"
              />
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`h-8 px-3 ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <LayoutGrid className="h-4 w-4 mr-1.5" />
                {translations.grid}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={`h-8 px-3 ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <List className="h-4 w-4 mr-1.5" />
                {translations.list}
              </Button>
            </div>
          </div>

          {/* Quick Filters Section */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Filter className="h-3.5 w-3.5" />
              <span className="text-xs">{translations.sortBy}:</span>
            </div>
            
            {/* Sort Filters */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy('name')}
              className={`h-7 px-3 text-xs border ${
                sortBy === 'name' 
                  ? 'bg-[#971b1e] text-white border-[#971b1e] hover:bg-[#7b282d] hover:text-white' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <SortAsc className="h-3 w-3 mr-1.5" />
              {translations.sortName}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy('recent')}
              className={`h-7 px-3 text-xs border ${
                sortBy === 'recent' 
                  ? 'bg-[#971b1e] text-white border-[#971b1e] hover:bg-[#7b282d] hover:text-white' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Clock className="h-3 w-3 mr-1.5" />
              {translations.sortRecent}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy('popular')}
              className={`h-7 px-3 text-xs border ${
                sortBy === 'popular' 
                  ? 'bg-[#971b1e] text-white border-[#971b1e] hover:bg-[#7b282d] hover:text-white' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Star className="h-3 w-3 mr-1.5" />
              {translations.sortPopular}
            </Button>

            {/* Results Count Badge */}
            {searchQuery && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {filteredApps.length} {filteredApps.length === 1 ? 'result' : 'results'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-20 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar Navigation */}
          <aside className="w-56 flex-shrink-0 hidden lg:block">
            <Card className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 sticky top-[140px]">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-3 px-2">{translations.categories}</p>
              <nav className="space-y-1">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  const count = cat.id === 'all' ? applications.length : applications.filter(app => app.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-[#971b1e] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-xs">{cat.name.replace(' Tools', '').replace(' Services', '').replace(' & Compliance', '')}</span>
                      </div>
                      <Badge variant="secondary" className={`text-xs ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200'}`}>
                        {count}
                      </Badge>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Pinned Applications */}
            {selectedCategory === 'all' && !searchQuery && pinnedApps.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Pin className="h-4 w-4 text-[#D4A017] fill-[#D4A017]" />
                  <p className="text-sm text-gray-900">{translations.pinned}</p>
                  <Badge variant="outline" className="text-xs">{pinnedApps.length}</Badge>
                </div>
                
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'
                  : 'space-y-2'
                }>
                  {pinnedApps.map((app) => {
                    const Icon = app.icon;
                    
                    if (viewMode === 'list') {
                      return (
                        <div
                          key={app.id}
                          className="group bg-white rounded-lg border border-gray-200 p-3 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer relative"
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${app.color}15` }}
                            >
                              <Icon className="h-5 w-5" style={{ color: app.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 mb-0.5 truncate">{app.name}</p>
                              <p className="text-xs text-gray-500 truncate">{app.description}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePin(app.id);
                              }}
                              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                              title={pinnedAppIds.includes(app.id) ? 'Unpin application' : 'Pin application'}
                            >
                              <Pin 
                                className={`h-4 w-4 transition-colors ${
                                  pinnedAppIds.includes(app.id) 
                                    ? 'fill-[#D4A017]' 
                                    : 'text-gray-400 hover:text-[#D4A017]'
                                }`}
                                style={pinnedAppIds.includes(app.id) ? { color: '#D4A017' } : {}}
                              />
                            </button>
                            <Button 
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div
                        key={app.id}
                        className="group bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer relative"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePin(app.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-gray-100 transition-colors z-10"
                          title={pinnedAppIds.includes(app.id) ? 'Unpin application' : 'Pin application'}
                        >
                          <Pin 
                            className={`h-3.5 w-3.5 transition-colors ${
                              pinnedAppIds.includes(app.id) 
                                ? 'fill-[#D4A017]' 
                                : 'text-gray-400 hover:text-[#D4A017]'
                            }`}
                            style={pinnedAppIds.includes(app.id) ? { color: '#D4A017' } : {}}
                          />
                        </button>
                        <div className="flex flex-col items-center text-center gap-2">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
                            style={{ backgroundColor: `${app.color}15` }}
                          >
                            <Icon className="h-6 w-6" style={{ color: app.color }} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900 mb-0.5 line-clamp-2 min-h-[20px]">{app.name}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{app.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Applications - Grouped by Category */}
            {selectedCategory === 'all' ? (
              Object.entries(groupedApps).map(([category, apps]) => (
                <div key={category} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-sm text-gray-900">{categoryGroups[category as keyof typeof categoryGroups]}</p>
                    <Badge variant="outline" className="text-xs">{apps.length}</Badge>
                  </div>
                  
                  <div className={viewMode === 'grid' 
                    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'
                    : 'space-y-2'
                  }>
                    {apps.map((app) => {
                      const Icon = app.icon;
                      
                      if (viewMode === 'list') {
                        return (
                          <div
                            key={app.id}
                            className="group bg-white rounded-lg border border-gray-200 p-3 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer relative"
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${app.color}15` }}
                              >
                                <Icon className="h-5 w-5" style={{ color: app.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 mb-0.5 truncate">{app.name}</p>
                                <p className="text-xs text-gray-500 truncate">{app.description}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePin(app.id);
                                }}
                                className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                                title={pinnedAppIds.includes(app.id) ? 'Unpin application' : 'Pin application'}
                              >
                                <Pin 
                                  className={`h-4 w-4 transition-colors ${
                                    pinnedAppIds.includes(app.id) 
                                      ? 'fill-[#D4A017]' 
                                      : 'text-gray-400 hover:text-[#D4A017]'
                                  }`}
                                  style={pinnedAppIds.includes(app.id) ? { color: '#D4A017' } : {}}
                                />
                              </button>
                              <Button 
                                size="sm"
                                variant="ghost"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <div
                          key={app.id}
                          className="group bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer relative"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePin(app.id);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-gray-100 transition-colors z-10"
                            title={pinnedAppIds.includes(app.id) ? 'Unpin application' : 'Pin application'}
                          >
                            <Pin 
                              className={`h-3.5 w-3.5 transition-colors ${
                                pinnedAppIds.includes(app.id) 
                                  ? 'fill-[#D4A017]' 
                                  : 'text-gray-400 hover:text-[#D4A017]'
                              }`}
                              style={pinnedAppIds.includes(app.id) ? { color: '#D4A017' } : {}}
                            />
                          </button>
                          <div className="flex flex-col items-center text-center gap-2">
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
                              style={{ backgroundColor: `${app.color}15` }}
                            >
                              <Icon className="h-6 w-6" style={{ color: app.color }} />
                            </div>
                            <div>
                              <p className="text-sm text-gray-900 mb-0.5 line-clamp-2 min-h-[20px]">{app.name}</p>
                              <p className="text-xs text-gray-500 line-clamp-1">{app.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              // Filtered Category View
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-900">
                      {categoryGroups[selectedCategory as keyof typeof categoryGroups] || 'Applications'}
                    </p>
                    <Badge variant="outline" className="text-xs">{filteredApps.length}</Badge>
                  </div>
                </div>
                
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'
                  : 'space-y-2'
                }>
                  {filteredApps.map((app) => {
                    const Icon = app.icon;
                    
                    if (viewMode === 'list') {
                      return (
                        <div
                          key={app.id}
                          className="group bg-white rounded-lg border border-gray-200 p-3 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer relative"
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${app.color}15` }}
                            >
                              <Icon className="h-5 w-5" style={{ color: app.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 mb-0.5 truncate">{app.name}</p>
                              <p className="text-xs text-gray-500 truncate">{app.description}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePin(app.id);
                              }}
                              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                              title={pinnedAppIds.includes(app.id) ? 'Unpin application' : 'Pin application'}
                            >
                              <Pin 
                                className={`h-4 w-4 transition-colors ${
                                  pinnedAppIds.includes(app.id) 
                                    ? 'fill-[#D4A017]' 
                                    : 'text-gray-400 hover:text-[#D4A017]'
                                }`}
                                style={pinnedAppIds.includes(app.id) ? { color: '#D4A017' } : {}}
                              />
                            </button>
                            <Button 
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div
                        key={app.id}
                        className="group bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer relative"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePin(app.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-gray-100 transition-colors z-10"
                          title={pinnedAppIds.includes(app.id) ? 'Unpin application' : 'Pin application'}
                        >
                          <Pin 
                            className={`h-3.5 w-3.5 transition-colors ${
                              pinnedAppIds.includes(app.id) 
                                ? 'fill-[#D4A017]' 
                                : 'text-gray-400 hover:text-[#D4A017]'
                            }`}
                            style={pinnedAppIds.includes(app.id) ? { color: '#D4A017' } : {}}
                          />
                        </button>
                        <div className="flex flex-col items-center text-center gap-2">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
                            style={{ backgroundColor: `${app.color}15` }}
                          >
                            <Icon className="h-6 w-6" style={{ color: app.color }} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900 mb-0.5 line-clamp-2 min-h-[20px]">{app.name}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{app.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredApps.length === 0 && (
              <Card className="p-12 text-center bg-white rounded-lg border border-gray-200">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-900 mb-2">{translations.noResults}</p>
                <p className="text-xs text-gray-500">
                  {translations.noResultsDesc}
                </p>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}