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
  Users2,
  ChevronDown,
  ChevronUp,
  TrendingDown,
  Minus,
  Info,
  ListChecks,
  Zap,
  Clock,
  FileText,
  BarChart3,
  Briefcase
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import bannerBg from 'figma:asset/33fb6ee80221be4862d153ff6087a71ce90ad51a.png';

interface DepartmentDetailPageProps {
  departmentId: string;
  onBack: () => void;
  onViewEmployees?: () => void;
}

export function DepartmentDetailPage({ departmentId, onBack, onViewEmployees }: DepartmentDetailPageProps) {
  // State for collapsible sections
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [championsExpanded, setChampionsExpanded] = useState(false);
  const [kpisExpanded, setKpisExpanded] = useState(false);
  const [risksExpanded, setRisksExpanded] = useState(false);
  const [teamsExpanded, setTeamsExpanded] = useState(false);
  
  // Mock data - would come from props or API
  const departmentData = {
    id: departmentId,
    title: 'Ports & Free Zones Audit Department',
    sector: 'Operation, Compliance and Performance Audit Sector',
    color: '#1949a1',
    description: 'Specialized in conducting comprehensive audits for ports and free zone operations across Dubai',
    vision: 'To be the premier audit authority for ports and free zones in the region',
    mission: 'Ensuring transparency, compliance, and operational excellence in ports and free zone entities',
    head: {
      name: 'Sara Al Hashimi',
      title: 'Department Head',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      email: 'sara.alhashimi@faa.gov.ae',
      phone: '+971 4 XXX XXXX',
      joinedYear: 2019,
      message: 'Our department is dedicated to maintaining the highest standards of audit excellence for ports and free zones, ensuring compliance and driving operational improvements.'
    },
    stats: [
      { label: 'Team Members', value: '24', icon: Users, color: '#1949a1' },
      { label: 'Active Audits', value: '12', icon: FileText, color: '#ec2227' },
      { label: 'Annual Projects', value: '45', icon: Briefcase, color: '#543671' },
      { label: 'Completion Rate', value: '96%', icon: TrendingUp, color: '#10b981' },
    ],
    responsibilities: [
      'Conduct operational audits of port facilities and operations',
      'Audit free zone entities for compliance with regulations',
      'Evaluate customs and logistics processes',
      'Review security and safety protocols',
      'Assess financial controls and reporting',
      'Monitor environmental compliance measures'
    ],
    projects: [
      {
        id: 'proj1',
        name: 'Dubai Ports Authority Annual Audit',
        status: 'In Progress',
        completion: 75,
        lead: 'Mohammed Al Ketbi',
        dueDate: 'Dec 2024'
      },
      {
        id: 'proj2',
        name: 'Jebel Ali Free Zone Compliance Review',
        status: 'In Progress',
        completion: 60,
        lead: 'Fatima Al Zaabi',
        dueDate: 'Jan 2025'
      },
      {
        id: 'proj3',
        name: 'Dubai Maritime City Audit',
        status: 'Planning',
        completion: 20,
        lead: 'Ali Al Suwaidi',
        dueDate: 'Feb 2025'
      },
      {
        id: 'proj4',
        name: 'Free Zone Security Assessment',
        status: 'Completed',
        completion: 100,
        lead: 'Maryam Al Shamsi',
        dueDate: 'Nov 2024'
      }
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
        name: 'Khalid Al Muhairi',
        role: 'Quality Champion',
        category: 'Quality',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        categoryColor: '#10b981'
      }
    ],
    kpis: [
      {
        id: 'kpi1',
        title: 'Audit Completion Rate',
        description: 'Percentage of audits completed within scheduled timeframe',
        metric: '96%',
        target: '90%',
        status: 'exceeds',
        trend: 'up'
      },
      {
        id: 'kpi2',
        title: 'Finding Resolution Rate',
        description: 'Percentage of audit findings addressed by entities',
        metric: '92%',
        target: '85%',
        status: 'exceeds',
        trend: 'up'
      },
      {
        id: 'kpi3',
        title: 'Average Audit Duration',
        description: 'Average number of days to complete an audit',
        metric: '38 days',
        target: '40 days',
        status: 'exceeds',
        trend: 'down'
      },
      {
        id: 'kpi4',
        title: 'Stakeholder Satisfaction',
        description: 'Satisfaction rating from audited entities',
        metric: '4.7/5',
        target: '4.5/5',
        status: 'exceeds',
        trend: 'up'
      },
      {
        id: 'kpi5',
        title: 'Team Utilization',
        description: 'Percentage of available team hours utilized',
        metric: '85%',
        target: '85%',
        status: 'meets',
        trend: 'stable'
      },
      {
        id: 'kpi6',
        title: 'Report Quality Score',
        description: 'Quality rating of audit reports',
        metric: '4.8/5',
        target: '4.5/5',
        status: 'exceeds',
        trend: 'up'
      }
    ],
    risks: {
      strategic: [
        {
          id: 'sr1',
          title: 'Regulatory Changes',
          description: 'Changes in port and free zone regulations may require rapid adaptation of audit procedures',
          level: 'Medium',
          mitigation: 'Sara Al Hashimi',
          mitigationRole: 'Department Head'
        },
        {
          id: 'sr2',
          title: 'Resource Allocation',
          description: 'Increased demand for audits may strain department resources',
          level: 'Medium',
          mitigation: 'Mohammed Al Ketbi',
          mitigationRole: 'Senior Auditor'
        }
      ],
      operational: [
        {
          id: 'or1',
          title: 'Data Access Delays',
          description: 'Delays in receiving data from audited entities may impact timelines',
          level: 'High',
          mitigation: 'Fatima Al Zaabi',
          mitigationRole: 'Audit Manager'
        },
        {
          id: 'or2',
          title: 'Complex Operations',
          description: 'Complexity of port operations requires specialized expertise',
          level: 'Medium',
          mitigation: 'Ali Al Suwaidi',
          mitigationRole: 'Technical Lead'
        },
        {
          id: 'or3',
          title: 'Technology Dependencies',
          description: 'Reliance on audit software and systems',
          level: 'Low',
          mitigation: 'Maryam Al Shamsi',
          mitigationRole: 'IT Coordinator'
        }
      ]
    },
    teams: [
      {
        id: 'team1',
        name: 'Port Operations Audit Team',
        purpose: 'Conduct audits of port operations and logistics',
        lead: 'Mohammed Al Ketbi',
        coordinator: 'Fatima Al Zaabi',
        members: [
          { name: 'Ali Al Suwaidi', role: 'Senior Auditor' },
          { name: 'Maryam Al Shamsi', role: 'Auditor' },
          { name: 'Ahmed Al Hashimi', role: 'Auditor' },
          { name: 'Noura Al Falasi', role: 'Junior Auditor' }
        ]
      },
      {
        id: 'team2',
        name: 'Free Zone Compliance Team',
        purpose: 'Focus on free zone regulatory compliance and financial audits',
        lead: 'Fatima Al Zaabi',
        coordinator: 'Ali Al Suwaidi',
        members: [
          { name: 'Khalid Al Muhairi', role: 'Compliance Expert' },
          { name: 'Sara Al Nuaimi', role: 'Financial Auditor' },
          { name: 'Hamdan Al Mazrouei', role: 'Auditor' }
        ]
      },
      {
        id: 'team3',
        name: 'Quality Assurance Team',
        purpose: 'Review audit reports and ensure quality standards',
        lead: 'Sara Al Hashimi',
        coordinator: 'Mohammed Al Ketbi',
        members: [
          { name: 'Maryam Al Shamsi', role: 'Quality Reviewer' },
          { name: 'Ahmed Al Hashimi', role: 'Standards Advisor' }
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
      {/* Hero Banner with Profile */}
      <div className="relative h-[320px] overflow-hidden bg-gradient-to-r from-[#7b282d] via-[#971b1e] to-[#ec2227]">
        <div className="absolute inset-0 opacity-10">
          <img alt="" className="w-full h-full object-cover" src={bannerBg} />
        </div>
        
        <div className="relative z-10 px-6 h-full flex items-center pb-8">
          {/* Back Button */}
          <div className="absolute top-6 left-6 z-20">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Organization
            </Button>
          </div>
          
          <div className="flex items-end gap-6 w-full">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex-shrink-0">
              <ImageWithFallback
                src={departmentData.head.image}
                alt={departmentData.head.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Head Info */}
            <div className="flex-1 pb-2">
              <Badge className="bg-white/20 hover:bg-white/20 text-white border-0 backdrop-blur-sm mb-2">
                Department Leadership
              </Badge>
              <h1 className="text-white text-3xl mb-1">{departmentData.head.name}</h1>
              <p className="text-white/90 text-base mb-2">{departmentData.head.title}</p>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {departmentData.head.joinedYear}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{departmentData.head.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-4">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4  mb-4 relative z-20">
          {departmentData.stats.map(stat => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-5 bg-white rounded-xl shadow-md border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{departmentData.sector}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{departmentData.title}</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Left Column - Department Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* About Department */}
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
                  <Info className="h-5 w-5 text-cyan-600" />
                </div>
                <h4 className="text-base text-gray-900">About This Department</h4>
              </div>
              <p className="text-sm text-gray-700 mb-4">{departmentData.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <p className="text-xs text-blue-900">Vision</p>
                  </div>
                  <p className="text-sm text-gray-700">{departmentData.vision}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-purple-600" />
                    <p className="text-xs text-purple-900">Mission</p>
                  </div>
                  <p className="text-sm text-gray-700">{departmentData.mission}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Leadership Message</p>
                <p className="text-sm text-gray-700 italic">"{departmentData.head.message}"</p>
                <p className="text-xs text-gray-500 mt-2">- {departmentData.head.name}</p>
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
                {departmentData.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="h-3 w-3 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-700">{resp}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Projects */}
            <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setProjectsExpanded(!projectsExpanded)}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900">Active Projects</h4>
                    <p className="text-xs text-gray-500">Current audit engagements and initiatives</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {projectsExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {projectsExpanded && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  {departmentData.projects.map(project => {
                    const statusConfig: Record<string, any> = {
                      'In Progress': { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
                      'Planning': { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
                      'Completed': { color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' }
                    };
                    const config = statusConfig[project.status];

                    return (
                      <div
                        key={project.id}
                        className={`p-4 border ${config.border} ${config.bg} rounded-lg`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm text-gray-900 flex-1">{project.name}</h4>
                          <Badge className={`text-xs ${config.color} ${config.bg} hover:${config.bg} border ${config.border} ml-2`}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 mb-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all"
                              style={{ 
                                width: `${project.completion}%`,
                                backgroundColor: project.status === 'Completed' ? '#10b981' : project.status === 'In Progress' ? '#3b82f6' : '#f59e0b'
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-600">{project.completion}% Complete</p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{project.lead}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Due {project.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                  <span>View Team Members</span>
                  <Users className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-between h-10"
                >
                  <span>Department Reports</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-between h-10"
                >
                  <span>Contact Department</span>
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
                    <p className="text-sm text-gray-900">{departmentData.head.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                    <p className="text-sm text-gray-900">{departmentData.head.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Location</p>
                    <p className="text-sm text-gray-900">Floor 3, Building B</p>
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
                    <p className="text-sm text-gray-900">Port audit completed</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">New project initiated</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">Team training session</p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Additional Sections */}
        
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-200">
              {departmentData.champions.map(champion => (
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
                  <h4 className="text-sm text-gray-900">Department Key Performance Indicators</h4>
                  <p className="text-xs text-gray-500">Performance metrics and targets for this department</p>
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
              {departmentData.kpis.map(kpi => {
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
                  <h4 className="text-sm text-gray-900">Department Risks</h4>
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
                  <Target className="h-5 w-5 text-purple-600" />
                  <h3 className="text-sm text-gray-900">Strategic Risks</h3>
                  <Badge variant="outline" className="text-xs">{departmentData.risks.strategic.length}</Badge>
                </div>
                <div className="space-y-3">
                  {departmentData.risks.strategic.map(risk => {
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
                  <Badge variant="outline" className="text-xs">{departmentData.risks.operational.length}</Badge>
                </div>
                <div className="space-y-3">
                  {departmentData.risks.operational.map(risk => {
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

        {/* 4. Teams Section */}
        <div className="mb-8">
          <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setTeamsExpanded(!teamsExpanded)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Users2 className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-900">Department Teams</h4>
                  <p className="text-xs text-gray-500">Specialized teams and working groups</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                {teamsExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {teamsExpanded && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {departmentData.teams.map(team => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}

// Team Card Component with Expandable Members
function TeamCard({ team }: { team: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm text-gray-900 mb-1">{team.name}</h3>
          <p className="text-xs text-gray-600 mb-3">{team.purpose}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                <User className="h-3 w-3 text-blue-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Team Lead</p>
                <p className="text-xs text-gray-900">{team.lead}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
                <User className="h-3 w-3 text-purple-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Coordinator</p>
                <p className="text-xs text-gray-900">{team.coordinator}</p>
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
            <p className="text-xs text-gray-700">Members ({team.members.length})</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {team.members.map((member: any, index: number) => (
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