import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Building2, 
  Users, 
  FileCheck, 
  Calculator,
  Landmark,
  Globe,
  Plane,
  Briefcase,
  Target,
  Award,
  UserCog,
  DollarSign,
  Scale,
  Building,
  Layers,
  ShieldCheck,
  BookOpen,
  Crown,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import svgPaths from '../imports/svg-qpw9gue3h1';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';

interface OrganizationTreePageProps {
  onSectorClick?: (sectorId: string) => void;
  onDepartmentClick?: (departmentId: string) => void;
  onBack?: () => void;
}

export function OrganizationTreePage({ onSectorClick, onDepartmentClick, onBack }: OrganizationTreePageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [viewMode, setViewMode] = useState<'hierarchy' | 'grid'>('hierarchy');
  
  const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({
    'operation-sector': true,
    'financial-sector': true,
    'corporate-sector': true,
  });

  const toggleSector = (sectorId: string) => {
    setExpandedSectors(prev => ({
      ...prev,
      [sectorId]: !prev[sectorId]
    }));
  };
  
  const leadership = [
    { id: 'ruler', title: 'Ruler of Dubai', icon: Crown, color: '#ec2227' },
    { id: 'chairman', title: 'Chairman', icon: User, color: '#f37021' },
    { id: 'dg', title: 'Director General', icon: Building2, color: '#6d6e71' },
  ];

  const dgOffice = { id: 'dg-office', title: 'Director General Office', icon: Building2, color: '#5b9bd5' };
  const deputyDG = { id: 'deputy-dg', title: 'Deputy Director General', icon: UserCog, color: '#d99694' };

  const sectors = [
    {
      id: 'operation-sector',
      title: 'Operation, Compliance and Performance Audit Sector',
      icon: FileCheck,
      color: '#d99694',
      departments: [
        { id: 'ports', name: 'Ports & Free Zones Audit Department', icon: Landmark },
        { id: 'real-estate', name: 'Real Estate, Hotels & Entertainment Audit Department', icon: Building },
        { id: 'energy', name: 'Energy & Industry Audit Department', icon: Layers },
        { id: 'government', name: 'Government & Nonprofit Entities Audit Department', icon: Globe },
        { id: 'aviation', name: 'Aviation & Transportation Audit Department', icon: Plane },
        { id: 'banks', name: 'Banks & Investment Companies Audit Department', icon: Briefcase },
      ]
    },
    {
      id: 'financial-sector',
      title: 'Financial Statement Audit and Specialized Audit Sector',
      icon: Calculator,
      color: '#d99694',
      departments: [
        { id: 'financial-statement', name: 'Financial Statement Audit Department', icon: FileCheck },
        { id: 'financial-admin', name: 'Financial & Administrative Violation Department', icon: ShieldCheck },
        { id: 'construction', name: 'Construction & Infrastructure Audit Department', icon: Building },
        { id: 'it-audit', name: 'Information Systems Audit Department', icon: Layers },
      ]
    },
    {
      id: 'corporate-sector',
      title: 'Corporate Support Sector',
      icon: Users,
      color: '#d99694',
      departments: [
        { id: 'hr', name: 'Human Resources Department', icon: Users },
        { id: 'finance-proc', name: 'Finance and Procurement Department', icon: DollarSign },
        { id: 'legal', name: 'Legal Affairs Department', icon: Scale },
        { id: 'it', name: 'Information Technology Department', icon: Layers },
      ]
    },
  ];

  const strategyDepts = [
    { id: 'strategy', name: 'Strategy Department', icon: Target, color: '#5b9bd5' },
    { id: 'quality', name: 'Professional Practice & Quality Assurance Department', icon: Award, color: '#5b9bd5' },
    { id: 'consultancy', name: 'Consultancy & Business Excellence Department', icon: BookOpen, color: '#5b9bd5' },
  ];

  return (
    <div 
      className="min-h-screen"
      style={{
        fontFamily: isArabic ? 'Tajawal, IBM Plex Sans Arabic, Noto Sans Arabic, sans-serif' : 'Inter, system-ui, sans-serif',
        backgroundImage: `url(${bgPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundColor: '#f8f9fa'
      }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Header - Figma Design */}
      <div className="bg-white relative shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between px-8 py-5">
          {/* Left: Back Button and Title */}
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 h-10 px-0 hover:opacity-80 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d={svgPaths.p203476e0} stroke="#45556C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d="M12.6667 8H3.33333" stroke="#45556C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
              <span className="text-[15px] text-[#45556c] font-['Arial',sans-serif]">Back to home page</span>
            </button>
            
            {/* Divider */}
            <div className="w-px h-6 bg-[#d1d5dc]"></div>
            
            {/* Title */}
            <h3 className="text-base text-[#0f172b] font-semibold">Organization Structure</h3>
          </div>

         
        </div>
      </div>

      {/* Tree Structure Container */}
      <div className="py-16 px-6 overflow-x-auto">
        <div className="flex justify-center">
          <div className="inline-flex flex-col items-center">
            
            {/* Level 1: Leadership Chain - Vertical */}
            <div className="flex flex-col items-center">
              {leadership.map((leader, index) => {
                const Icon = leader.icon;
                return (
                  <div key={leader.id} className="flex flex-col items-center">
                    <Card className="p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer w-[260px]">
                      <div className="flex items-center justify-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${leader.color}` }}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-gray-900 text-center">{leader.title}</p>
                      </div>
                    </Card>
                    {index < leadership.length - 1 && (
                      <svg width="2" height="48" className="my-0">
                        <line x1="1" y1="0" x2="1" y2="48" stroke="#cccccc" strokeWidth="2" />
                      </svg>
                    )}
                  </div>
                );
              })}
              
              {/* Main connector down */}
              <svg width="2" height="48" className="my-0">
                <line x1="1" y1="0" x2="1" y2="48" stroke="#cccccc" strokeWidth="2" />
              </svg>
            </div>

            {/* Level 2: DG Office and Deputy DG */}
            <div className="flex flex-col items-center">
              {/* T-junction: down from DG, then split left-right */}
              <svg width="532" height="48" className="my-0">
                {/* Vertical line down from center */}
                <line x1="266" y1="0" x2="266" y2="24" stroke="#cccccc" strokeWidth="2" />
                {/* Horizontal line across */}
                <line x1="130" y1="24" x2="402" y2="24" stroke="#cccccc" strokeWidth="2" />
                {/* Left drop to Deputy DG */}
                <line x1="130" y1="24" x2="130" y2="48" stroke="#cccccc" strokeWidth="2" />
                {/* Right drop to DG Office */}
                <line x1="402" y1="24" x2="402" y2="48" stroke="#cccccc" strokeWidth="2" />
              </svg>

              <div className="flex gap-12 items-start">
                {/* Deputy DG - Left */}
                <Card 
                  className="p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
                  style={{ width: '260px' }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${deputyDG.color}` }}
                    >
                      <UserCog className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-gray-900 text-center flex-1 leading-tight">{deputyDG.title}</p>
                  </div>
                </Card>

                {/* DG Office - Right */}
                <Card 
                  className="p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
                  style={{ width: '260px' }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${dgOffice.color}` }}
                    >
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-gray-900 text-center flex-1 leading-tight">{dgOffice.title}</p>
                  </div>
                </Card>
              </div>

              {/* Central connector down to next level */}
              <svg width="2" height="60" className="my-0">
                <line x1="1" y1="0" x2="1" y2="60" stroke="#cccccc" strokeWidth="2" />
              </svg>
            </div>

            {/* Level 3: Strategy Depts + Three Sectors */}
            <div className="flex flex-col items-center">
              {/* Main branching connector for 4 children (1 strategy group + 3 sectors) */}
              <svg width="912" height="48" className="my-0">
                {/* Vertical down from center */}
                <line x1="456" y1="0" x2="456" y2="24" stroke="#cccccc" strokeWidth="2" />
                {/* Main horizontal line */}
                <line x1="120" y1="24" x2="792" y2="24" stroke="#cccccc" strokeWidth="2" />
                {/* Strategy group drop (left) */}
                <line x1="120" y1="24" x2="120" y2="48" stroke="#cccccc" strokeWidth="2" />
                {/* Sector drops */}
                <line x1="360" y1="24" x2="360" y2="48" stroke="#cccccc" strokeWidth="2" />
                <line x1="576" y1="24" x2="576" y2="48" stroke="#cccccc" strokeWidth="2" />
                <line x1="792" y1="24" x2="792" y2="48" stroke="#cccccc" strokeWidth="2" />
              </svg>

              <div className="flex gap-12 items-start">
                {/* Left: Strategy Departments - Vertical Stack */}
                <div className="flex flex-col items-center">
                  {strategyDepts.map((dept, index) => {
                    const Icon = dept.icon;
                    return (
                      <div key={dept.id} className="flex flex-col items-center">
                        <Card 
                          onClick={() => onDepartmentClick?.(dept.id)}
                          className="p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group"
                          style={{ width: '240px' }}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                              style={{ backgroundColor: `${dept.color}` }}
                            >
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-0.5">Department</p>
                              <p className="text-sm text-gray-900 leading-tight">{dept.name}</p>
                            </div>
                          </div>
                        </Card>
                        {index < strategyDepts.length - 1 && (
                          <svg width="2" height="16" className="my-0">
                            <line x1="1" y1="0" x2="1" y2="16" stroke="#cccccc" strokeWidth="2" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Right: Main Sectors with Departments */}
                <div className="flex gap-16 items-start">
                  {sectors.map((sector) => {
                    const Icon = sector.icon;
                    const isExpanded = expandedSectors[sector.id];
                    
                    return (
                      <div key={sector.id} className="flex flex-col items-center">
                        {/* Sector Card */}
                        <Card 
                          className="p-5 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-red-200 transition-all group relative"
                          style={{ width: '240px' }}
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                              style={{ backgroundColor: `${sector.color}` }}
                            >
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div 
                              className="text-center cursor-pointer"
                              onClick={() => onSectorClick?.(sector.id)}
                            >
                              <Badge variant="outline" className="mb-2 text-xs border-gray-300 text-gray-600">
                                Sector
                              </Badge>
                              <p className="text-sm text-gray-900 leading-tight px-2">
                                {sector.title}
                              </p>
                            </div>
                            {/* Collapse/Expand Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSector(sector.id);
                              }}
                              className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                              aria-label={isExpanded ? 'Collapse departments' : 'Expand departments'}
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                        </Card>

                        {/* Departments - only when expanded */}
                        {isExpanded && (
                          <div className="flex flex-col items-center">
                            {/* Vertical connector */}
                            <svg width="2" height="32" className="my-0">
                              <line x1="1" y1="0" x2="1" y2="32" stroke="#cccccc" strokeWidth="2" />
                            </svg>

                            {/* Departments in vertical stack */}
                            <div className="flex flex-col gap-3 animate-in fade-in duration-300 w-[240px]">
                              {sector.departments.map((dept, index) => {
                                const DeptIcon = dept.icon;
                                return (
                                  <div key={dept.id} className="flex flex-col items-center">
                                    <Card
                                      onClick={() => onDepartmentClick?.(dept.id)}
                                      className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group w-full"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div 
                                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                                          style={{ backgroundColor: `${sector.color}20` }}
                                        >
                                          <DeptIcon className="h-4 w-4" style={{ color: sector.color }} />
                                        </div>
                                        <p className="text-xs text-gray-900 leading-tight flex-1">
                                          {dept.name}
                                        </p>
                                      </div>
                                    </Card>
                                    {index < sector.departments.length - 1 && (
                                      <svg width="2" height="12" className="my-0">
                                        <line x1="1" y1="0" x2="1" y2="12" stroke="#cccccc" strokeWidth="2" />
                                      </svg>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      
    </div>
  );
}
