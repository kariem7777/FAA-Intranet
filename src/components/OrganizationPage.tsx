import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  Building2, 
  Users, 
  FileCheck, 
  Calculator,
  Landmark,
  Globe,
  Plane,
  Briefcase,
  Building,
  Layers,
  ShieldCheck,
  UserCog,
  DollarSign,
  Scale,
  Target,
  Award,
  BookOpen,
  ArrowLeft,
  LayoutGrid,
  Network
} from 'lucide-react';
import svgPaths from '../imports/svg-qpw9gue3h1';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';

interface OrganizationPageProps {
  onSectorClick?: (sectorId: string) => void;
  onDepartmentClick?: (departmentId: string) => void;
  onBack?: () => void;
}

export function OrganizationPage({ onSectorClick, onDepartmentClick, onBack }: OrganizationPageProps) {
  const [viewMode, setViewMode] = useState<'hierarchy' | 'grid'>('hierarchy');

  // Organization data matching the design
  const orgData = {
    ruler: {
      id: 'ruler',
      title: 'Ruler of Dubai',
      color: '#EC2227',
      icon: 'R'
    },
    chairman: {
      id: 'chairman',
      title: 'Chairman',
      color: '#F97316',
      icon: 'C'
    },
    directorGeneral: {
      id: 'dg',
      title: 'Director General',
      color: '#6B7280',
      icon: 'D'
    },
    branches: [
      {
        id: 'deputy-dg',
        title: 'Deputy Director General',
        color: '#EC4899',
        icon: 'D',
        leftDepts: [
          {
            id: 'strategy-dept',
            title: 'Department\nStrategy\nDepartment',
            name: 'Strategy Department',
            color: '#3B82F6',
            icon: 'D'
          },
          {
            id: 'quality-dept',
            title: 'Department\nProfessional\nPractice & Quality\nAssurance\nDepartment',
            name: 'Professional Practice & Quality Assurance Department',
            color: '#3B82F6',
            icon: 'D'
          },
          {
            id: 'consultancy-dept',
            title: 'Department\nConsultancy &\nBusiness Excellence\nDepartment',
            name: 'Consultancy & Business Excellence Department',
            color: '#3B82F6',
            icon: 'D'
          }
        ],
        sectors: [
          {
            id: 'operation-sector',
            title: 'Operation, Compliance\nand Performance Audit\nSector',
            name: 'Operation, Compliance and Performance Audit Sector',
            color: '#EF4444',
            icon: 'D',
            departments: [
              { name: 'Ports & Free Zones Audit Department', icon: Landmark },
              { name: 'Real Estate, Hotels & Entertainment Audit Department', icon: Building },
              { name: 'Energy & Industry Audit Department', icon: Layers },
              { name: 'Government & Nonprofit Entities Audit Department', icon: Globe },
              { name: 'Aviation & Transportation Audit Department', icon: Plane },
              { name: 'Banks & Investment Companies Audit Department', icon: Briefcase }
            ]
          },
          {
            id: 'financial-sector',
            title: 'Financial Statement\nAudit and Specialized\nAudit Sector',
            name: 'Financial Statement Audit and Specialized Audit Sector',
            color: '#EF4444',
            icon: 'D',
            departments: [
              { name: 'Financial Statement Audit Department', icon: FileCheck },
              { name: 'Financial & Administrative Violation Department', icon: ShieldCheck },
              { name: 'Construction & Infrastructure Audit Department', icon: Building },
              { name: 'Information Systems Audit Department', icon: Layers }
            ]
          },
          {
            id: 'corporate-sector',
            title: 'Corporate Support\nSector',
            name: 'Corporate Support Sector',
            color: '#EF4444',
            icon: 'D',
            departments: [
              { name: 'Human Resources Department', icon: Users },
              { name: 'Finance and Procurement Department', icon: DollarSign },
              { name: 'Legal Affairs Department', icon: Scale },
              { name: 'Information Technology Department', icon: Layers }
            ]
          }
        ]
      },
      {
        id: 'dg-office',
        title: 'Director General Office',
        color: '#3B82F6',
        icon: 'D'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]" style={{ backgroundImage: `url(${bgPattern})`, backgroundRepeat: 'repeat', backgroundSize: 'auto' }}>
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
            <h1 className="text-base text-[#0f172b] font-semibold">Organization Structure</h1>
          </div>

          {/* Right: Change View Button */}
          <button
            onClick={() => setViewMode(viewMode === 'hierarchy' ? 'grid' : 'hierarchy')}
            className="flex items-center justify-center gap-2 h-8 px-3 bg-white border border-[#e5e7eb] rounded-[6.8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths.p14890d00} stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p28db2b80} stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
            <span className="text-sm text-[#374151] font-['Arial',sans-serif]">Change View</span>
          </button>
        </div>
      </div>

      {/* Organization Chart */}
      <div className="px-20 py-12">
        <div className="flex flex-col items-center">
          
          {/* Level 1: Ruler of Dubai */}
          <div className="mb-8">
            <Card className="px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: orgData.ruler.color }}
                >
                  {orgData.ruler.icon}
                </div>
                <span className="text-sm text-gray-900">{orgData.ruler.title}</span>
              </div>
            </Card>
          </div>

          {/* Connector Line */}
          <div className="w-0.5 h-8 bg-gray-300 mb-8"></div>

          {/* Level 2: Chairman */}
          <div className="mb-8">
            <Card className="px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: orgData.chairman.color }}
                >
                  {orgData.chairman.icon}
                </div>
                <span className="text-sm text-gray-900">{orgData.chairman.title}</span>
              </div>
            </Card>
          </div>

          {/* Connector Line */}
          <div className="w-0.5 h-8 bg-gray-300 mb-8"></div>

          {/* Level 3: Director General */}
          <div className="mb-8">
            <Card className="px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: orgData.directorGeneral.color }}
                >
                  {orgData.directorGeneral.icon}
                </div>
                <span className="text-sm text-gray-900">{orgData.directorGeneral.title}</span>
              </div>
            </Card>
          </div>

          {/* Connector Line */}
          <div className="w-0.5 h-12 bg-gray-300 mb-0"></div>

          {/* T-Junction */}
          <div className="relative w-full max-w-4xl">
            <div className="absolute left-1/2 top-0 w-full h-0.5 bg-gray-300" style={{ transform: 'translateX(-50%)' }}></div>
            
            {/* Level 4: Deputy DG and DG Office */}
            <div className="flex justify-between items-start pt-12 relative">
              
              {/* Left: Deputy Director General */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-12 bg-gray-300 -mt-12 mb-0"></div>
                <Card 
                  className="px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onSectorClick?.(orgData.branches[0].id)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm"
                      style={{ backgroundColor: orgData.branches[0].color }}
                    >
                      {orgData.branches[0].icon}
                    </div>
                    <span className="text-sm text-gray-900 whitespace-nowrap">{orgData.branches[0].title}</span>
                  </div>
                </Card>
              </div>

              {/* Right: Director General Office */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-12 bg-gray-300 -mt-12 mb-0"></div>
                <Card 
                  className="px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onSectorClick?.(orgData.branches[1].id)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm"
                      style={{ backgroundColor: orgData.branches[1].color }}
                    >
                      {orgData.branches[1].icon}
                    </div>
                    <span className="text-sm text-gray-900 whitespace-nowrap">{orgData.branches[1].title}</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Level 5: Departments and Sectors under Deputy DG */}
          <div className="w-full max-w-6xl mt-12">
            {/* Connector from Deputy DG */}
            <div className="flex justify-start ml-[25%]">
              <div className="w-0.5 h-12 bg-gray-300"></div>
            </div>

            {/* Main Content Row */}
            <div className="flex gap-12 mt-0">
              
              {/* Left Column: 3 Departments */}
              <div className="w-64 flex flex-col gap-8">
                {orgData.branches[0].leftDepts.map((dept, idx) => (
                  <Card 
                    key={dept.id}
                    className="px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onDepartmentClick?.(dept.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs flex-shrink-0"
                        style={{ backgroundColor: dept.color }}
                      >
                        {dept.icon}
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Department</span>
                        <span className="text-sm text-gray-900 leading-tight">{dept.name}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Right Column: 3 Sectors with Departments */}
              <div className="flex-1 flex flex-col gap-8">
                {orgData.branches[0].sectors.map((sector, idx) => (
                  <div key={sector.id}>
                    {/* Sector Card */}
                    <Card 
                      className="px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer mb-4"
                      onClick={() => onSectorClick?.(sector.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs flex-shrink-0"
                          style={{ backgroundColor: sector.color }}
                        >
                          {sector.icon}
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block mb-1">Sector</span>
                          <span className="text-sm text-gray-900 leading-tight">{sector.name}</span>
                        </div>
                      </div>
                    </Card>

                    {/* Departments under this Sector */}
                    <div className="ml-10 space-y-2">
                      {sector.departments.map((dept, deptIdx) => {
                        const IconComponent = dept.icon;
                        return (
                          <div 
                            key={deptIdx}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer text-xs text-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDepartmentClick?.(`${sector.id}-${deptIdx}`);
                            }}
                          >
                            <div className="w-5 h-5 rounded bg-white flex items-center justify-center border border-gray-200">
                              <IconComponent className="w-3 h-3 text-gray-600" />
                            </div>
                            <span>{dept.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}