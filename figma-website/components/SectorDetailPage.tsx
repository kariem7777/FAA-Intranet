import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';
import { 
  ArrowLeft,
  Users,
  User,
  Target,
  Award,
  Building2,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Trophy,
  Activity,
  AlertTriangle,
  Shield,
  Users2,
  ChevronDown,
  ChevronUp,
  TrendingDown,
  Minus,
  Info,
  ListChecks,
  Building,
  Zap,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import bannerBg from 'figma:asset/33fb6ee80221be4862d153ff6087a71ce90ad51a.png';
import svgPaths from '../imports/svg-yov41l6kdf';
import imgImage15 from 'figma:asset/d60c2a04e94d709fa672d9027dbfa4be52e8ec79.png';

interface SectorDetailPageProps {
  sectorId: string;
  onBack: () => void;
  onViewEmployees?: () => void;
  onDepartmentClick?: (deptId: string) => void;
}

export function SectorDetailPage({ sectorId, onBack, onViewEmployees, onDepartmentClick }: SectorDetailPageProps) {
  // State for collapsible sections
  const [departmentsExpanded, setDepartmentsExpanded] = useState(false);
  const [championsExpanded, setChampionsExpanded] = useState(false);
  const [kpisExpanded, setKpisExpanded] = useState(false);
  const [risksExpanded, setRisksExpanded] = useState(false);
  const [committeesExpanded, setCommitteesExpanded] = useState(false);
  
  // Mock data - would come from props or API
  const sectorData = {
    id: sectorId,
    title: 'Operation, Compliance and Performance Audit Sector',
    color: '#ec2227',
    description: 'Leading operational excellence and compliance across all audit domains',
    vision: 'To be the benchmark for operational audit excellence in the region',
    mission: 'Ensuring the highest standards of compliance and performance through systematic auditing',
    lead: {
      name: 'Ahmed Al Mansouri',
      title: 'Sector Director',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      email: 'ahmed.almansouri@faa.gov.ae',
      phone: '+971 4 XXX XXXX',
      joinedYear: 2018,
      message: 'Our sector is committed to maintaining the highest standards of operational excellence and compliance across all our audit functions.'
    },
    stats: [
      { label: 'Total Employees', value: '142', icon: svgPaths.Users, color: '#ec2227' },
      { label: 'Departments', value: '6', icon: svgPaths.Building2, color: '#1949a1' },
      { label: 'Active Projects', value: '38', icon: svgPaths.TrendingUp, color: '#543671' },
      { label: 'Audits Completed', value: '256', icon: svgPaths.Award, color: '#8cd4e4' },
    ],
    responsibilities: [
      'Conduct comprehensive operational audits across all entities',
      'Ensure compliance with regulatory frameworks and standards',
      'Monitor and evaluate performance metrics and KPIs',
      'Provide strategic recommendations for process improvements',
      'Coordinate with government and private sector stakeholders',
      'Maintain quality assurance and best practices'
    ],
    departments: [
      {
        id: 'ports',
        name: 'Ports & Free Zones Audit Department',
        description: 'Specialized auditing for ports and free zone operations',
        headCount: 24,
        manager: 'Sara Al Hashimi'
      },
      {
        id: 'real-estate',
        name: 'Real Estate, Hotels & Entertainment Audit Department',
        description: 'Comprehensive audits for real estate and hospitality sector',
        headCount: 28,
        manager: 'Mohammed Al Ketbi'
      },
      {
        id: 'energy',
        name: 'Energy & Industry Audit Department',
        description: 'Energy sector compliance and performance auditing',
        headCount: 22,
        manager: 'Fatima Al Zaabi'
      },
      {
        id: 'government',
        name: 'Government & Nonprofit Entities Audit Department',
        description: 'Public sector and nonprofit organization audits',
        headCount: 26,
        manager: 'Ali Al Suwaidi'
      },
      {
        id: 'aviation',
        name: 'Aviation & Transportation Audit Department',
        description: 'Aviation and transportation sector auditing services',
        headCount: 20,
        manager: 'Maryam Al Shamsi'
      },
      {
        id: 'banks',
        name: 'Banks & Investment Companies Audit Department',
        description: 'Financial institutions and investment firms auditing',
        headCount: 22,
        manager: 'Khalid Al Muhairi'
      },
    ],
    champions: [
      {
        id: 'c1',
        name: 'Fatima Al Zaabi',
        role: 'Risk Champion',
        category: 'Risk',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
        categoryColor: '#ef4444'
      },
      {
        id: 'c2',
        name: 'Ahmed Al Hashimi',
        role: 'KPI Champion',
        category: 'KPI',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        categoryColor: '#3b82f6'
      },
      {
        id: 'c3',
        name: 'Mariam Al Shamsi',
        role: 'InfoSec Champion',
        category: 'InfoSec',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        categoryColor: '#8b5cf6'
      },
      {
        id: 'c4',
        name: 'Mohammed Al Ketbi',
        role: 'Business Continuity Champion',
        category: 'Business Continuity',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        categoryColor: '#f59e0b'
      },
      {
        id: 'c5',
        name: 'Sara Al Nuaimi',
        role: 'Quality Champion',
        category: 'Specialty',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        categoryColor: '#10b981'
      },
      {
        id: 'c6',
        name: 'Ali Al Suwaidi',
        role: 'Innovation Champion',
        category: 'Others',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        categoryColor: '#6b7280'
      }
    ],
    kpis: [
      {
        id: 'kpi1',
        title: 'Audit Completion Rate',
        description: 'Percentage of audits completed within scheduled timeframe',
        metric: '95%',
        target: '90%',
        status: 'exceeds',
        trend: 'up'
      },
      {
        id: 'kpi2',
        title: 'Compliance Score',
        description: 'Overall compliance rating across all audited entities',
        metric: '94%',
        target: '92%',
        status: 'exceeds',
        trend: 'up'
      },
      {
        id: 'kpi3',
        title: 'Average Audit Duration',
        description: 'Average number of days to complete an audit',
        metric: '42 days',
        target: '45 days',
        status: 'exceeds',
        trend: 'down'
      },
      {
        id: 'kpi4',
        title: 'Findings Resolution Rate',
        description: 'Percentage of audit findings resolved by entities',
        metric: '88%',
        target: '85%',
        status: 'exceeds',
        trend: 'up'
      },
      {
        id: 'kpi5',
        title: 'Stakeholder Satisfaction',
        description: 'Satisfaction rating from audited entities',
        metric: '4.6/5',
        target: '4.5/5',
        status: 'meets',
        trend: 'stable'
      },
      {
        id: 'kpi6',
        title: 'Team Utilization Rate',
        description: 'Percentage of available auditor hours utilized',
        metric: '82%',
        target: '85%',
        status: 'below',
        trend: 'down'
      }
    ],
    risks: {
      strategic: [
        {
          id: 'sr1',
          title: 'Regulatory Framework Changes',
          description: 'Significant changes in audit regulations and standards could impact operations and require rapid adaptation',
          level: 'High',
          mitigation: 'Ahmed Al Mansouri',
          mitigationRole: 'Sector Director'
        },
        {
          id: 'sr2',
          title: 'Resource Constraints',
          description: 'Limited availability of qualified auditors may affect coverage and quality',
          level: 'Medium',
          mitigation: 'Sara Al Hashimi',
          mitigationRole: 'Department Head'
        },
        {
          id: 'sr3',
          title: 'Stakeholder Expectations',
          description: 'Increasing demands from stakeholders for faster turnaround and deeper insights',
          level: 'Medium',
          mitigation: 'Ahmed Al Mansouri',
          mitigationRole: 'Sector Director'
        }
      ],
      operational: [
        {
          id: 'or1',
          title: 'Data Quality Issues',
          description: 'Incomplete or inaccurate data from audited entities may lead to flawed conclusions',
          level: 'High',
          mitigation: 'Mohammed Al Ketbi',
          mitigationRole: 'Audit Manager'
        },
        {
          id: 'or2',
          title: 'Technology Dependencies',
          description: 'System failures or cybersecurity incidents could disrupt audit processes',
          level: 'Medium',
          mitigation: 'Mariam Al Shamsi',
          mitigationRole: 'IT Coordinator'
        },
        {
          id: 'or3',
          title: 'Knowledge Retention',
          description: 'Loss of institutional knowledge due to staff turnover',
          level: 'Low',
          mitigation: 'Sara Al Nuaimi',
          mitigationRole: 'Knowledge Manager'
        },
        {
          id: 'or4',
          title: 'Process Inefficiencies',
          description: 'Manual processes causing delays and potential errors',
          level: 'Low',
          mitigation: 'Ali Al Suwaidi',
          mitigationRole: 'Process Owner'
        }
      ]
    },
    committees: [
      {
        id: 'com1',
        name: 'Audit Quality Review Committee',
        purpose: 'Ensure consistent audit quality and adherence to professional standards across all departments',
        chairperson: 'Ahmed Al Mansouri',
        coordinator: 'Sara Al Hashimi',
        members: [
          { name: 'Mohammed Al Ketbi', role: 'Quality Reviewer' },
          { name: 'Fatima Al Zaabi', role: 'Technical Expert' },
          { name: 'Ali Al Suwaidi', role: 'Standards Advisor' },
          { name: 'Maryam Al Shamsi', role: 'Peer Reviewer' }
        ]
      },
      {
        id: 'com2',
        name: 'Risk Assessment Team',
        purpose: 'Identify, assess, and prioritize risks across the sector to inform audit planning',
        chairperson: 'Fatima Al Zaabi',
        coordinator: 'Ahmed Al Hashimi',
        members: [
          { name: 'Sara Al Nuaimi', role: 'Risk Analyst' },
          { name: 'Khalid Al Muhairi', role: 'Sector Representative' },
          { name: 'Mohammed Al Ketbi', role: 'Data Analyst' }
        ]
      },
      {
        id: 'com3',
        name: 'Technical Standards Committee',
        purpose: 'Develop and maintain technical audit methodologies and best practices',
        chairperson: 'Mohammed Al Ketbi',
        coordinator: 'Mariam Al Shamsi',
        members: [
          { name: 'Ali Al Suwaidi', role: 'Methodology Expert' },
          { name: 'Sara Al Hashimi', role: 'Standards Specialist' },
          { name: 'Ahmed Al Hashimi', role: 'Technical Advisor' },
          { name: 'Fatima Al Zaabi', role: 'Quality Assurance' }
        ]
      },
      {
        id: 'com4',
        name: 'Knowledge Management Team',
        purpose: 'Capture, organize, and share audit knowledge and lessons learned across the sector',
        chairperson: 'Sara Al Nuaimi',
        coordinator: 'Ali Al Suwaidi',
        members: [
          { name: 'Mariam Al Shamsi', role: 'Content Manager' },
          { name: 'Khalid Al Muhairi', role: 'Knowledge Curator' }
        ]
      }
    ]
  };

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
      {/* New Figma Banner Design */}
      <div className="bg-white border-b border-[rgba(123,40,45,0.1)]">
        
        {/* Back Button */}
        <div className="px-20 pt-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="h-8 rounded-md text-gray-600 hover:text-gray-900 hover:bg-transparent -ml-3"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Back to Organization
          </Button>
        </div>

        {/* Header Content */}
        <div className="px-20 pt-4 pb-6">
          <div className="flex items-center gap-5">
            {/* Profile Image with border */}
            <div className="relative w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
              <img
                src={imgImage15}
                alt={sectorData.lead.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Name and Badge */}
              <div className="flex items-center gap-3 mb-1.5">
                <h1 className="text-[40px] leading-[48px] text-[#111827]">{sectorData.lead.name}</h1>
                <Badge className="bg-[#7b282d] hover:bg-[#7b282d] text-white text-[11px] px-2 py-0.5 rounded-md">
                  Sector Leadership
                </Badge>
              </div>

              {/* Role and Sector */}
              <div className="flex items-center gap-2">
                <p className="text-base text-[#4b5563]">{sectorData.lead.title}</p>
                <span className="text-[#d1d5db]">•</span>
                <p className="text-base text-[#6b7280]">{sectorData.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="px-20 mt-4">
        <div className="grid grid-cols-4 gap-4">
          {/* Total Employees */}
          <Card className="p-5 bg-white rounded-2xl border border-gray-200 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[rgba(236,34,39,0.08)] flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#EC2227]" />
              </div>
              <div>
                <p className="text-base leading-[25.6px] text-[#111827] mb-0">142</p>
                <p className="text-base leading-[25.6px] text-[#6b7280]">Total Employees</p>
              </div>
            </div>
          </Card>

          {/* Departments */}
          <Card className="p-5 bg-white rounded-2xl border border-gray-200 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[rgba(25,73,161,0.08)] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-[#1949A1]" />
              </div>
              <div>
                <p className="text-base leading-[25.6px] text-[#111827] mb-0">6</p>
                <p className="text-base leading-[25.6px] text-[#6b7280]">Departments</p>
              </div>
            </div>
          </Card>

          {/* Active Projects */}
          <Card className="p-5 bg-white rounded-2xl border border-gray-200 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[rgba(84,54,113,0.08)] flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-[#543671]" />
              </div>
              <div>
                <p className="text-base leading-[25.6px] text-[#111827] mb-0">38</p>
                <p className="text-base leading-[25.6px] text-[#6b7280]">Active Projects</p>
              </div>
            </div>
          </Card>

          {/* Audits Completed */}
          <Card className="p-5 bg-white rounded-2xl border border-gray-200 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[rgba(140,212,228,0.08)] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-[#8CD4E4]" />
              </div>
              <div>
                <p className="text-base leading-[25.6px] text-[#111827] mb-0">256</p>
                <p className="text-base leading-[25.6px] text-[#6b7280]">Audits Completed</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-20 py-8 ">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Left Column - Sector Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* About Sector */}
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
                  <Info className="h-5 w-5 text-cyan-600" />
                </div>
                <h4 className="text-base text-gray-900">About This Sector</h4>
              </div>
              <p className="text-sm text-gray-700 mb-4">{sectorData.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <p className="text-xs text-blue-900">Vision</p>
                  </div>
                  <p className="text-sm text-gray-700">{sectorData.vision}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-purple-600" />
                    <p className="text-xs text-purple-900">Mission</p>
                  </div>
                  <p className="text-sm text-gray-700">{sectorData.mission}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Leadership Message</p>
                <p className="text-sm text-gray-700 italic">"{sectorData.lead.message}"</p>
                <p className="text-xs text-gray-500 mt-2">- {sectorData.lead.name}</p>
              </div>
            </Card>

            {/* Core Responsibilities */}
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <ListChecks className="h-5 w-5 text-orange-600" />
                </div>
                <h4 className="text-base text-gray-900">Core Responsibilities</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sectorData.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="h-3 w-3 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-700">{resp}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Departments */}
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setDepartmentsExpanded(!departmentsExpanded)}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                    <Building className="h-5 w-5 text-teal-600" />
                  </div>
                  <h4 className="text-sm text-gray-900">Departments</h4>
                  <Badge variant="outline">{sectorData.departments.length} Total</Badge>
                </div>
                <Button variant="ghost" size="sm">
                  {departmentsExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {departmentsExpanded && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  {sectorData.departments.map(dept => (
                    <div
                      key={dept.id}
                      onClick={() => onDepartmentClick?.(dept.id)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-1 group-hover:text-[#ec2227] transition-colors">
                            {dept.name}
                          </p>
                          <p className="text-xs text-gray-500">{dept.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0 ml-2" />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{dept.headCount} employees</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{dept.manager}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Actions & Quick Info */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <h4 className="text-base text-gray-900">Quick Actions</h4>
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={onViewEmployees}
                  className="w-full justify-between h-10 bg-[#ec2227] hover:bg-[#d41f24]"
                >
                  <span>View All Employees</span>
                  <Users className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-between h-10"
                >
                  <span>Sector Reports</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-between h-10"
                >
                  <span>Contact Sector</span>
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="text-base text-gray-900">Contact Information</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="text-sm text-gray-900">{sectorData.lead.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                    <p className="text-sm text-gray-900">{sectorData.lead.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Location</p>
                    <p className="text-sm text-gray-900">Floor 5, Building A</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="text-base text-gray-900">Recent Activity</h4>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">Quarterly review completed</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">New audit initiated</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">Team meeting scheduled</p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* NEW SECTIONS */}
        
        {/* 1. Department Champions Section */}
        <div className="mb-8">
          <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setChampionsExpanded(!championsExpanded)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-900">Department Champions</h4>
                  <p className="text-xs text-gray-500">Key individuals driving excellence across different areas</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                {championsExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {championsExpanded && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-in fade-in duration-200">
              {sectorData.champions.map(champion => (
                <div key={champion.id} className="flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <div className="w-20 h-20 rounded-full border-3 border-gray-100 overflow-hidden shadow-md">
                      <ImageWithFallback
                        src={champion.image}
                        alt={champion.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div 
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                      style={{ backgroundColor: champion.categoryColor }}
                    >
                      <Trophy className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-900 mb-1">{champion.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{champion.role}</p>
                  <Badge 
                    className="text-xs px-2 py-0.5"
                    style={{ 
                      backgroundColor: `${champion.categoryColor}15`,
                      color: champion.categoryColor,
                      borderColor: champion.categoryColor
                    }}
                    variant="outline"
                  >
                    {champion.category}
                  </Badge>
                </div>
              ))}
              </div>
            )}
          </Card>
        </div>

        {/* 2. Departmental KPIs Section */}
        <div className="mb-8">
          <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setKpisExpanded(!kpisExpanded)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-900">Departmental Key Performance Indicators</h4>
                  <p className="text-xs text-gray-500">Performance metrics and targets for this sector</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                {kpisExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {kpisExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
              {sectorData.kpis.map(kpi => {
                const statusConfig = {
                  exceeds: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', label: 'Exceeds Target' },
                  meets: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Meets Target' },
                  below: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Below Target' }
                };
                const config = statusConfig[kpi.status as keyof typeof statusConfig];

                return (
                  <Card key={kpi.id} className={`p-4 border-2 ${config.border} ${config.bg} rounded-lg`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center border ${config.border}`}>
                        <Activity className={`h-4 w-4 ${config.color}`} />
                      </div>
                      <div className="flex items-center gap-1">
                        {kpi.trend === 'up' && <TrendingUp className={`h-4 w-4 ${config.color}`} />}
                        {kpi.trend === 'down' && <TrendingDown className={`h-4 w-4 ${config.color}`} />}
                        {kpi.trend === 'stable' && <Minus className={`h-4 w-4 ${config.color}`} />}
                      </div>
                    </div>
                    <h3 className="text-sm text-gray-900 mb-1">{kpi.title}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{kpi.description}</p>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Target:</span>
                        <span className="text-gray-700">{kpi.target}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Current:</span>
                        <span className={`text-sm ${config.color}`}>{kpi.metric}</span>
                      </div>
                    </div>

                    <Badge className={`w-full justify-center text-xs ${config.color} ${config.bg} hover:${config.bg} border ${config.border}`}>
                      {config.label}
                    </Badge>
                  </Card>
                );
              })}
              </div>
            )}
          </Card>
        </div>

        {/* 3. Departmental Risks Section */}
        <div className="mb-8">
          <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setRisksExpanded(!risksExpanded)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-900">Departmental Risks</h4>
                  <p className="text-xs text-gray-500">Strategic and operational risks with mitigation strategies</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                {risksExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {risksExpanded && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-200">
              {/* Strategic Risks */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <h3 className="text-sm text-gray-900">Strategic Risks</h3>
                  <Badge variant="outline" className="text-xs">{sectorData.risks.strategic.length}</Badge>
                </div>
                <div className="space-y-3">
                  {sectorData.risks.strategic.map(risk => {
                    const levelConfig = {
                      High: { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
                      Medium: { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
                      Low: { color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' }
                    };
                    const config = levelConfig[risk.level as keyof typeof levelConfig];

                    return (
                      <Card key={risk.id} className={`p-4 border ${config.border} ${config.bg} rounded-lg`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm text-gray-900 flex-1">{risk.title}</h4>
                          <Badge className={`text-xs ${config.color} ${config.bg} hover:${config.bg} border ${config.border} ml-2`}>
                            {risk.level}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{risk.description}</p>
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Mitigation Owner:</p>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-900">{risk.mitigation}</p>
                              <p className="text-xs text-gray-500">{risk.mitigationRole}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Operational Risks */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <h3 className="text-sm text-gray-900">Operational Risks</h3>
                  <Badge variant="outline" className="text-xs">{sectorData.risks.operational.length}</Badge>
                </div>
                <div className="space-y-3">
                  {sectorData.risks.operational.map(risk => {
                    const levelConfig = {
                      High: { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
                      Medium: { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
                      Low: { color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' }
                    };
                    const config = levelConfig[risk.level as keyof typeof levelConfig];

                    return (
                      <Card key={risk.id} className={`p-4 border ${config.border} ${config.bg} rounded-lg`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm text-gray-900 flex-1">{risk.title}</h4>
                          <Badge className={`text-xs ${config.color} ${config.bg} hover:${config.bg} border ${config.border} ml-2`}>
                            {risk.level}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{risk.description}</p>
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Mitigation Owner:</p>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-900">{risk.mitigation}</p>
                              <p className="text-xs text-gray-500">{risk.mitigationRole}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
              </div>
            )}
          </Card>
        </div>

        {/* 4. Committees and Teams Section */}
        <div className="mb-8">
          <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setCommitteesExpanded(!committeesExpanded)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Users2 className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-900">Committees and Teams</h4>
                  <p className="text-xs text-gray-500">Cross-functional groups and governance committees</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                {committeesExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {committeesExpanded && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {sectorData.committees.map(committee => (
                  <CommitteeCard key={committee.id} committee={committee} />
                ))}
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}

// Committee Card Component with Expandable Members
function CommitteeCard({ committee }: { committee: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm text-gray-900 mb-1">{committee.name}</h3>
          <p className="text-xs text-gray-600 mb-3">{committee.purpose}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                <User className="h-3 w-3 text-blue-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Chairperson</p>
                <p className="text-xs text-gray-900">{committee.chairperson}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
                <User className="h-3 w-3 text-purple-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Coordinator</p>
                <p className="text-xs text-gray-900">{committee.coordinator}</p>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-4"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="pt-4 border-t border-gray-200 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-gray-500" />
            <p className="text-xs text-gray-700">Members ({committee.members.length})</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {committee.members.map((member: any, index: number) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-3 w-3 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}