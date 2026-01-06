import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
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
  Layers,
  ShieldCheck,
  BookOpen,
  Crown,
  User,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Briefcase as BriefcaseIcon,
  GraduationCap,
  Award as AwardIcon,
  Languages,
  Star,
  Calendar,
  MapPin,
  Linkedin,
  X,
  GitBranch,
  Settings,
  Building,
  Trophy,
  Activity,
  AlertTriangle,
  Users2,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrganizationSplitViewProps {
  onViewModeChange?: (mode: 'card' | 'tree' | 'split') => void;
}

type NodeType = 'leadership' | 'office' | 'sector' | 'department' | 'strategy';

interface TreeNode {
  id: string;
  title: string;
  icon: any;
  color: string;
  type: NodeType;
  parentId?: string;
  description?: string;
  leader?: {
    name: string;
    title: string;
    image: string;
    message: string;
    mission: string;
  };
  overview?: {
    description: string;
    focusAreas: string[];
  };
  employees?: any[];
  champions?: {
    id: string;
    name: string;
    role: string;
    category: string;
    image: string;
    categoryColor: string;
  }[];
  kpis?: {
    id: string;
    title: string;
    description: string;
    metric: string;
    target: string;
    status: 'exceeds' | 'meets' | 'below';
    trend: 'up' | 'down' | 'stable';
  }[];
  risks?: {
    strategic: {
      id: string;
      title: string;
      description: string;
      level: 'High' | 'Medium' | 'Low';
      mitigation: string;
      mitigationRole: string;
    }[];
    operational: {
      id: string;
      title: string;
      description: string;
      level: 'High' | 'Medium' | 'Low';
      mitigation: string;
      mitigationRole: string;
    }[];
  };
  committees?: {
    id: string;
    name: string;
    purpose: string;
    chairperson: string;
    coordinator: string;
    members: { name: string; role: string }[];
  }[];
}

export function OrganizationSplitView({ onViewModeChange }: OrganizationSplitViewProps) {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [showEmployeeProfile, setShowEmployeeProfile] = useState<any>(null);
  const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({
    'operation-sector': false,
    'financial-sector': false,
    'corporate-sector': false,
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    about: true,
    academic: false,
    certifications: false,
    training: false,
    faaExperience: false,
    previousExperience: false,
    achievements: false,
    skills: false,
    languages: false,
    champions: false,
    kpis: false,
    risks: false,
    committees: false,
  });

  // Tree data structure
  const treeData: TreeNode[] = [
    {
      id: 'ruler',
      title: 'Ruler of Dubai',
      icon: Crown,
      color: '#ec2227',
      type: 'leadership',
      description: 'Supreme Leadership',
    },
    {
      id: 'chairman',
      title: 'Chairman',
      icon: User,
      color: '#ec2227',
      type: 'leadership',
      description: 'Executive Chairman',
    },
    {
      id: 'dg',
      title: 'Director General',
      icon: Building2,
      color: '#7b282d',
      type: 'leadership',
      leader: {
        name: 'Ahmed Al Mansouri',
        title: 'Director General',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        message: 'Leading the Financial Audit Authority with integrity, transparency, and excellence in governance.',
        mission: 'To ensure the highest standards of financial accountability and audit excellence across all government entities in Dubai.',
      },
      overview: {
        description: 'The Director General oversees all audit operations, compliance frameworks, and strategic initiatives of the Financial Audit Authority.',
        focusAreas: ['Strategic Leadership', 'Governance Excellence', 'Audit Quality', 'Stakeholder Relations'],
      },
      employees: [
        { id: 'e1', name: 'Sarah Johnson', role: 'Executive Assistant', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', since: '2019', email: 'sarah.j@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e2', name: 'Mohammed Hassan', role: 'Chief of Staff', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', since: '2017', email: 'mohammed.h@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
    },
    {
      id: 'dg-office',
      title: 'Director General Office',
      icon: Building2,
      color: '#5b9bd5',
      type: 'office',
      leader: {
        name: 'Fatima Al Zarooni',
        title: 'Head of Director General Office',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        message: 'Supporting the Director General in strategic planning and operational excellence.',
        mission: 'To provide comprehensive administrative and strategic support to ensure seamless operations.',
      },
      overview: {
        description: 'The DG Office coordinates all executive functions, manages strategic communications, and ensures efficient workflow across the organization.',
        focusAreas: ['Executive Support', 'Strategic Planning', 'Communications', 'Coordination'],
      },
      employees: [
        { id: 'e3', name: 'Ali Rahman', role: 'Strategy Coordinator', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', since: '2020', email: 'ali.r@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e4', name: 'Layla Ahmed', role: 'Communications Manager', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', since: '2018', email: 'layla.a@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e5', name: 'Omar Khalil', role: 'Executive Coordinator', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', since: '2021', email: 'omar.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
    },
    {
      id: 'deputy-dg',
      title: 'Deputy Director General',
      icon: UserCog,
      color: '#543671',
      type: 'office',
      leader: {
        name: 'Khalid Al Maktoum',
        title: 'Deputy Director General',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        message: 'Driving operational excellence and ensuring the highest standards of audit quality.',
        mission: 'To support the Director General in achieving organizational objectives and maintaining audit integrity.',
      },
      overview: {
        description: 'The Deputy Director General assists in overseeing daily operations and major audit initiatives.',
        focusAreas: ['Operations Management', 'Quality Control', 'Team Leadership', 'Performance Monitoring'],
      },
    },
    // OPERATION SECTOR
    {
      id: 'operation-sector',
      title: 'Operation, Compliance and Performance Audit Sector',
      icon: FileCheck,
      color: '#d99694',
      type: 'sector',
      leader: {
        name: 'Hassan Al Blooshi',
        title: 'Sector Director',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400',
        message: 'Ensuring comprehensive audit coverage across all operational entities in Dubai.',
        mission: 'To deliver high-quality audits that enhance transparency, compliance, and performance across critical sectors.',
      },
      overview: {
        description: 'This sector conducts audits of government entities, free zones, transportation, energy, and financial institutions to ensure compliance and operational excellence.',
        focusAreas: ['Compliance Audits', 'Performance Reviews', 'Risk Assessment', 'Operational Excellence'],
      },
      employees: [
        { id: 'e6', name: 'Mariam Sultan', role: 'Senior Audit Manager', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', since: '2016', email: 'mariam.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e7', name: 'Yousef Ahmed', role: 'Compliance Specialist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', since: '2019', email: 'yousef.a@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e8', name: 'Aisha Mohammed', role: 'Performance Auditor', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400', since: '2020', email: 'aisha.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e9', name: 'Rashed Saeed', role: 'Audit Coordinator', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400', since: '2018', email: 'rashed.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c1', name: 'Fatima Al Zaabi', role: 'Risk Champion', category: 'Risk', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', categoryColor: '#ef4444' },
        { id: 'c2', name: 'Ahmed Al Hashimi', role: 'KPI Champion', category: 'KPI', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', categoryColor: '#3b82f6' },
        { id: 'c3', name: 'Mariam Al Shamsi', role: 'InfoSec Champion', category: 'InfoSec', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', categoryColor: '#8b5cf6' },
      ],
      kpis: [
        { id: 'kpi1', title: 'Audit Completion Rate', description: 'Percentage of audits completed within scheduled timeframe', metric: '95%', target: '90%', status: 'exceeds', trend: 'up' },
        { id: 'kpi2', title: 'Compliance Score', description: 'Overall compliance rating across all audited entities', metric: '94%', target: '92%', status: 'exceeds', trend: 'up' },
        { id: 'kpi3', title: 'Findings Resolution Rate', description: 'Percentage of audit findings resolved by entities', metric: '88%', target: '85%', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr1', title: 'Regulatory Framework Changes', description: 'Significant changes in audit regulations and standards could impact operations', level: 'High', mitigation: 'Hassan Al Blooshi', mitigationRole: 'Sector Director' },
          { id: 'sr2', title: 'Resource Constraints', description: 'Limited availability of qualified auditors may affect coverage', level: 'Medium', mitigation: 'Mariam Sultan', mitigationRole: 'Audit Manager' },
        ],
        operational: [
          { id: 'or1', title: 'Data Quality Issues', description: 'Incomplete or inaccurate data from audited entities', level: 'High', mitigation: 'Yousef Ahmed', mitigationRole: 'Compliance Specialist' },
          { id: 'or2', title: 'Technology Dependencies', description: 'System failures could disrupt audit processes', level: 'Medium', mitigation: 'Aisha Mohammed', mitigationRole: 'IT Coordinator' },
        ],
      },
      committees: [
        { id: 'com1', name: 'Audit Quality Review Committee', purpose: 'Ensure consistent audit quality and adherence to professional standards', chairperson: 'Hassan Al Blooshi', coordinator: 'Mariam Sultan', members: [{ name: 'Yousef Ahmed', role: 'Quality Reviewer' }, { name: 'Fatima Al Zaabi', role: 'Technical Expert' }] },
        { id: 'com2', name: 'Risk Assessment Team', purpose: 'Identify, assess, and prioritize risks across the sector', chairperson: 'Fatima Al Zaabi', coordinator: 'Ahmed Al Hashimi', members: [{ name: 'Mariam Sultan', role: 'Risk Analyst' }, { name: 'Rashed Saeed', role: 'Data Analyst' }] },
      ],
    },
    {
      id: 'ports',
      title: 'Ports & Free Zones Audit Department',
      icon: Landmark,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'operation-sector',
      leader: {
        name: 'Abdullah Hassan',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
        message: 'Specialized in auditing port operations and free zone compliance.',
        mission: 'To ensure financial integrity and operational efficiency in all port and free zone entities.',
      },
      overview: {
        description: 'Conducts comprehensive audits of port authorities, free zones, and related commercial entities.',
        focusAreas: ['Port Operations', 'Free Zone Compliance', 'Trade Regulations', 'Revenue Verification'],
      },
      employees: [
        { id: 'e10', name: 'Salma Ali', role: 'Lead Auditor', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', since: '2017', email: 'salma.a@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e11', name: 'Hamdan Rashid', role: 'Audit Analyst', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400', since: '2021', email: 'hamdan.r@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e12', name: 'Noora Khalid', role: 'Compliance Officer', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', since: '2019', email: 'noora.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c4', name: 'Salma Ali', role: 'KPI Champion', category: 'KPI', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', categoryColor: '#3b82f6' },
        { id: 'c5', name: 'Hamdan Rashid', role: 'Risk Champion', category: 'Risk', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400', categoryColor: '#ef4444' },
      ],
      kpis: [
        { id: 'kpi4', title: 'Port Audit Coverage', description: 'Percentage of port facilities audited annually', metric: '92%', target: '90%', status: 'exceeds', trend: 'up' },
        { id: 'kpi5', title: 'Free Zone Compliance', description: 'Compliance rate across all free zones', metric: '96%', target: '95%', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr3', title: 'Trade Policy Changes', description: 'Changes in international trade regulations may impact audit scope', level: 'Medium', mitigation: 'Abdullah Hassan', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or3', title: 'Access Restrictions', description: 'Limited access to port facilities during audits', level: 'Medium', mitigation: 'Salma Ali', mitigationRole: 'Lead Auditor' },
        ],
      },
      committees: [
        { id: 'com3', name: 'Port Operations Committee', purpose: 'Review port and free zone audit methodologies', chairperson: 'Abdullah Hassan', coordinator: 'Salma Ali', members: [{ name: 'Hamdan Rashid', role: 'Analyst' }, { name: 'Noora Khalid', role: 'Compliance Expert' }] },
      ],
    },
    {
      id: 'real-estate',
      title: 'Real Estate, Hotels & Entertainment Audit Department',
      icon: Building,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'operation-sector',
      leader: {
        name: 'Noor Al Hashemi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        message: 'Ensuring financial transparency in real estate and hospitality sectors.',
        mission: 'To audit and verify financial operations in real estate developments, hotels, and entertainment facilities.',
      },
      overview: {
        description: 'Specialized audits covering property development, hotel operations, and entertainment venues.',
        focusAreas: ['Real Estate Development', 'Hotel Operations', 'Entertainment Venues', 'Revenue Analysis'],
      },
      employees: [
        { id: 'e40', name: 'Noor Al Hashemi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', since: '2015', email: 'noor.h2@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e41', name: 'Khalid Al Falasi', role: 'Real Estate Auditor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', since: '2017', email: 'khalid.f@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e42', name: 'Hana Al Suwaidi', role: 'Hospitality Specialist', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', since: '2018', email: 'hana.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e43', name: 'Ahmed Al Blooshi', role: 'Revenue Analyst', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', since: '2020', email: 'ahmed.b@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c6', name: 'Noor Al Hashemi', role: 'Excellence Champion', category: 'Excellence', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', categoryColor: '#10b981' },
      ],
      kpis: [
        { id: 'kpi6', title: 'Hotel Audit Completion', description: 'Percentage of hotel audits completed on schedule', metric: '94%', target: '90%', status: 'exceeds', trend: 'up' },
        { id: 'kpi7', title: 'Property Compliance', description: 'Real estate compliance with financial regulations', metric: '91%', target: '88%', status: 'exceeds', trend: 'stable' },
      ],
      risks: {
        strategic: [
          { id: 'sr4', title: 'Tourism Sector Volatility', description: 'Economic fluctuations affecting hospitality sector', level: 'High', mitigation: 'Noor Al Hashemi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or4', title: 'Complex Property Structures', description: 'Multiple ownership structures complicating audits', level: 'Medium', mitigation: 'Noor Al Hashemi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com4', name: 'Real Estate & Hospitality Committee', purpose: 'Oversee audit standards for real estate and hotel sectors', chairperson: 'Noor Al Hashemi', coordinator: 'TBD', members: [{ name: 'Sector Representative', role: 'Specialist' }] },
      ],
    },
    {
      id: 'energy',
      title: 'Energy & Industry Audit Department',
      icon: Layers,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'operation-sector',
      leader: {
        name: 'Salem Al Muhairi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        message: 'Auditing energy and industrial operations for efficiency and compliance.',
        mission: 'To ensure proper financial management and operational efficiency in energy and industrial sectors.',
      },
      overview: {
        description: 'Conducts audits of energy companies, utilities, and industrial facilities.',
        focusAreas: ['Energy Production', 'Utilities Management', 'Industrial Operations', 'Sustainability'],
      },
      employees: [
        { id: 'e44', name: 'Salem Al Muhairi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', since: '2014', email: 'salem.m2@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e45', name: 'Fatima Al Kaabi', role: 'Energy Auditor', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', since: '2016', email: 'fatima.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e46', name: 'Rashid Al Zaabi', role: 'Sustainability Expert', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', since: '2018', email: 'rashid.z@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e47', name: 'Maryam Al Shamsi', role: 'Industrial Auditor', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', since: '2019', email: 'maryam.s2@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c7', name: 'Salem Al Muhairi', role: 'Sustainability Champion', category: 'Sustainability', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', categoryColor: '#22c55e' },
      ],
      kpis: [
        { id: 'kpi8', title: 'Energy Audit Coverage', description: 'Coverage of energy sector entities audited', metric: '89%', target: '85%', status: 'exceeds', trend: 'up' },
        { id: 'kpi9', title: 'Sustainability Compliance', description: 'Compliance with environmental regulations', metric: '93%', target: '90%', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr5', title: 'Energy Transition', description: 'Shift to renewable energy sources changing audit landscape', level: 'Medium', mitigation: 'Salem Al Muhairi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or5', title: 'Technical Complexity', description: 'Highly technical energy systems requiring specialized knowledge', level: 'High', mitigation: 'Salem Al Muhairi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com5', name: 'Energy & Sustainability Committee', purpose: 'Review energy sector audit practices and sustainability standards', chairperson: 'Salem Al Muhairi', coordinator: 'TBD', members: [{ name: 'Technical Expert', role: 'Energy Specialist' }] },
      ],
    },
    {
      id: 'government',
      title: 'Government & Nonprofit Entities Audit Department',
      icon: Globe,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'operation-sector',
      leader: {
        name: 'Hessa Al Nuaimi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400',
        message: 'Ensuring accountability in government and nonprofit organizations.',
        mission: 'To maintain the highest standards of financial governance in public and nonprofit sectors.',
      },
      overview: {
        description: 'Audits government departments and nonprofit organizations.',
        focusAreas: ['Government Entities', 'Nonprofit Organizations', 'Public Funds', 'Grant Management'],
      },
      employees: [
        { id: 'e48', name: 'Hessa Al Nuaimi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400', since: '2013', email: 'hessa.n2@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e49', name: 'Mohammed Al Ketbi', role: 'Government Auditor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', since: '2016', email: 'mohammed.k2@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e82', name: 'Sara Al Falasi', role: 'Nonprofit Specialist', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', since: '2018', email: 'sara.f@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e83', name: 'Ali Al Mansoori', role: 'Public Fund Analyst', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', since: '2020', email: 'ali.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c8', name: 'Hessa Al Nuaimi', role: 'Governance Champion', category: 'Governance', image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400', categoryColor: '#6366f1' },
      ],
      kpis: [
        { id: 'kpi10', title: 'Government Audit Completion', description: 'Percentage of government entity audits completed', metric: '97%', target: '95%', status: 'exceeds', trend: 'up' },
        { id: 'kpi11', title: 'Public Fund Transparency', description: 'Transparency score for public fund management', metric: '95%', target: '92%', status: 'exceeds', trend: 'stable' },
      ],
      risks: {
        strategic: [
          { id: 'sr6', title: 'Policy Changes', description: 'Government restructuring may affect audit scope', level: 'Medium', mitigation: 'Hessa Al Nuaimi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or6', title: 'Documentation Gaps', description: 'Incomplete records from some government entities', level: 'Medium', mitigation: 'Hessa Al Nuaimi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com6', name: 'Government Audit Committee', purpose: 'Coordinate audits across government departments', chairperson: 'Hessa Al Nuaimi', coordinator: 'TBD', members: [{ name: 'Government Liaison', role: 'Coordinator' }] },
      ],
    },
    {
      id: 'aviation',
      title: 'Aviation & Transportation Audit Department',
      icon: Plane,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'operation-sector',
      leader: {
        name: 'Majid Al Shamsi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        message: 'Auditing aviation and transportation infrastructure for compliance and efficiency.',
        mission: 'To ensure financial integrity in aviation and transportation sectors.',
      },
      overview: {
        description: 'Specialized audits of airports, airlines, and transportation infrastructure.',
        focusAreas: ['Airport Operations', 'Airlines', 'Public Transport', 'Infrastructure Projects'],
      },
      employees: [
        { id: 'e84', name: 'Majid Al Shamsi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', since: '2014', email: 'majid.s2@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e85', name: 'Layla Al Mazrouei', role: 'Aviation Auditor', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', since: '2016', email: 'layla.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e86', name: 'Sultan Al Zaabi', role: 'Transport Specialist', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', since: '2018', email: 'sultan.z@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e87', name: 'Amina Al Hashemi', role: 'Airport Operations Analyst', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', since: '2019', email: 'amina.h@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c9', name: 'Majid Al Shamsi', role: 'Innovation Champion', category: 'Innovation', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', categoryColor: '#f59e0b' },
      ],
      kpis: [
        { id: 'kpi12', title: 'Aviation Audit Quality', description: 'Quality score of aviation sector audits', metric: '96%', target: '93%', status: 'exceeds', trend: 'up' },
        { id: 'kpi13', title: 'Transport Infrastructure Coverage', description: 'Coverage of transportation infrastructure audits', metric: '90%', target: '88%', status: 'exceeds', trend: 'stable' },
      ],
      risks: {
        strategic: [
          { id: 'sr7', title: 'Aviation Industry Changes', description: 'Rapid changes in aviation technology and regulations', level: 'High', mitigation: 'Majid Al Shamsi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or7', title: 'Complex Operations', description: 'Highly complex aviation operations requiring specialized expertise', level: 'High', mitigation: 'Majid Al Shamsi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com7', name: 'Aviation & Transport Committee', purpose: 'Review aviation and transportation audit methodologies', chairperson: 'Majid Al Shamsi', coordinator: 'TBD', members: [{ name: 'Aviation Expert', role: 'Technical Advisor' }] },
      ],
    },
    {
      id: 'banks',
      title: 'Banks & Investment Companies Audit Department',
      icon: Briefcase,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'operation-sector',
      leader: {
        name: 'Rashid Al Falasi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        message: 'Ensuring financial stability and compliance in banking and investment sectors.',
        mission: 'To audit financial institutions and investment companies for regulatory compliance.',
      },
      overview: {
        description: 'Conducts audits of banks, investment firms, and financial service providers.',
        focusAreas: ['Banking Operations', 'Investment Management', 'Regulatory Compliance', 'Risk Management'],
      },
      employees: [
        { id: 'e88', name: 'Rashid Al Falasi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', since: '2013', email: 'rashid.f@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e89', name: 'Noora Al Ketbi', role: 'Banking Auditor', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400', since: '2015', email: 'noora.k2@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e90', name: 'Hamad Al Shamsi', role: 'Investment Analyst', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', since: '2017', email: 'hamad.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e91', name: 'Sheikha Al Zarooni', role: 'Compliance Specialist', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', since: '2019', email: 'sheikha.z@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c10', name: 'Rashid Al Falasi', role: 'Risk Champion', category: 'Risk', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', categoryColor: '#ef4444' },
      ],
      kpis: [
        { id: 'kpi14', title: 'Banking Audit Completion', description: 'Percentage of banking audits completed on time', metric: '98%', target: '95%', status: 'exceeds', trend: 'up' },
        { id: 'kpi15', title: 'Financial Risk Detection', description: 'Rate of financial risk identification', metric: '92%', target: '90%', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr8', title: 'Regulatory Compliance', description: 'Evolving financial regulations requiring continuous adaptation', level: 'High', mitigation: 'Rashid Al Falasi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or8', title: 'Data Sensitivity', description: 'Handling sensitive financial data requires strict security', level: 'High', mitigation: 'Rashid Al Falasi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com8', name: 'Banking & Investment Committee', purpose: 'Oversee audits of financial institutions', chairperson: 'Rashid Al Falasi', coordinator: 'TBD', members: [{ name: 'Banking Expert', role: 'Financial Specialist' }] },
      ],
    },

    // FINANCIAL SECTOR
    {
      id: 'financial-sector',
      title: 'Financial Statement Audit and Specialized Audit Sector',
      icon: Calculator,
      color: '#d99694',
      type: 'sector',
      leader: {
        name: 'Dr. Maryam Al Hashemi',
        title: 'Sector Director',
        image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400',
        message: 'Leading financial audits with precision and professional excellence.',
        mission: 'To ensure accurate financial reporting and detect any irregularities across all audited entities.',
      },
      overview: {
        description: 'Specializes in financial statement audits, construction projects, IT systems, and administrative compliance.',
        focusAreas: ['Financial Audits', 'IT Systems Review', 'Construction Projects', 'Fraud Detection'],
      },
      employees: [
        { id: 'e20', name: 'Yousef Al Khouri', role: 'Senior Financial Auditor', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', since: '2015', email: 'yousef.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e21', name: 'Nadia Al Farsi', role: 'IT Audit Specialist', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', since: '2018', email: 'nadia.f@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e22', name: 'Saif Al Zaabi', role: 'Fraud Detection Expert', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400', since: '2017', email: 'saif.z@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e23', name: 'Moza Al Kaabi', role: 'Financial Analyst', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', since: '2020', email: 'moza.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c20', name: 'Yousef Al Khouri', role: 'Quality Champion', category: 'Quality', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', categoryColor: '#10b981' },
        { id: 'c21', name: 'Nadia Al Farsi', role: 'InfoSec Champion', category: 'InfoSec', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', categoryColor: '#8b5cf6' },
        { id: 'c22', name: 'Saif Al Zaabi', role: 'Risk Champion', category: 'Risk', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400', categoryColor: '#ef4444' },
      ],
      kpis: [
        { id: 'kpi30', title: 'Financial Audit Quality', description: 'Overall quality score of financial audits', metric: '97%', target: '94%', status: 'exceeds', trend: 'up' },
        { id: 'kpi31', title: 'Statement Accuracy Rate', description: 'Accuracy of financial statement reviews', metric: '98%', target: '95%', status: 'exceeds', trend: 'up' },
        { id: 'kpi32', title: 'Fraud Detection Rate', description: 'Percentage of fraudulent activities detected', metric: '91%', target: '88%', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr20', title: 'Accounting Standards Evolution', description: 'Continuous changes in accounting and auditing standards', level: 'High', mitigation: 'Dr. Maryam Al Hashemi', mitigationRole: 'Sector Director' },
          { id: 'sr21', title: 'Specialized Expertise Gap', description: 'Need for highly specialized auditors in technical areas', level: 'Medium', mitigation: 'Yousef Al Khouri', mitigationRole: 'Senior Auditor' },
        ],
        operational: [
          { id: 'or20', title: 'Complex Financial Structures', description: 'Increasingly complex financial arrangements requiring deep analysis', level: 'High', mitigation: 'Nadia Al Farsi', mitigationRole: 'IT Specialist' },
          { id: 'or21', title: 'Audit Timeline Pressures', description: 'Tight deadlines for financial statement audits', level: 'Medium', mitigation: 'Saif Al Zaabi', mitigationRole: 'Audit Manager' },
        ],
      },
      committees: [
        { id: 'com20', name: 'Financial Standards Committee', purpose: 'Review and implement financial audit standards and best practices', chairperson: 'Dr. Maryam Al Hashemi', coordinator: 'Yousef Al Khouri', members: [{ name: 'Nadia Al Farsi', role: 'Technical Expert' }, { name: 'Saif Al Zaabi', role: 'Standards Reviewer' }] },
        { id: 'com21', name: 'Fraud Prevention Team', purpose: 'Develop strategies for fraud detection and prevention', chairperson: 'Saif Al Zaabi', coordinator: 'Moza Al Kaabi', members: [{ name: 'Yousef Al Khouri', role: 'Fraud Analyst' }, { name: 'Nadia Al Farsi', role: 'IT Security Expert' }] },
      ],
    },
    {
      id: 'financial-statement',
      title: 'Financial Statement Audit Department',
      icon: FileCheck,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'financial-sector',
      leader: {
        name: 'Amna Al Suwaidi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
        message: 'Ensuring accuracy and transparency in financial reporting.',
        mission: 'To audit financial statements according to international standards.',
      },
      overview: {
        description: 'Reviews and audits financial statements of government entities and companies.',
        focusAreas: ['Financial Reporting', 'IFRS Compliance', 'Annual Audits', 'Financial Analysis'],
      },
      employees: [
        { id: 'e50', name: 'Amna Al Suwaidi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', since: '2014', email: 'amna.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e51', name: 'Khalid Al Blooshi', role: 'Senior Financial Auditor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', since: '2016', email: 'khalid.b@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e52', name: 'Mariam Al Kaabi', role: 'IFRS Specialist', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', since: '2018', email: 'mariam.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e53', name: 'Saeed Al Mansoori', role: 'Financial Analyst', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', since: '2019', email: 'saeed.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c11', name: 'Amna Al Suwaidi', role: 'Quality Champion', category: 'Quality', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', categoryColor: '#8b5cf6' },
      ],
      kpis: [
        { id: 'kpi16', title: 'Financial Statement Accuracy', description: 'Accuracy rate of financial statement audits', metric: '99%', target: '97%', status: 'exceeds', trend: 'up' },
        { id: 'kpi17', title: 'IFRS Compliance', description: 'Compliance with international financial reporting standards', metric: '98%', target: '95%', status: 'exceeds', trend: 'stable' },
      ],
      risks: {
        strategic: [
          { id: 'sr9', title: 'Standards Evolution', description: 'Changes in IFRS standards requiring continuous training', level: 'Medium', mitigation: 'Amna Al Suwaidi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or9', title: 'Reporting Deadlines', description: 'Tight deadlines for annual financial statements', level: 'Medium', mitigation: 'Amna Al Suwaidi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com9', name: 'Financial Reporting Committee', purpose: 'Review financial statement audit methodologies', chairperson: 'Amna Al Suwaidi', coordinator: 'TBD', members: [{ name: 'IFRS Expert', role: 'Standards Specialist' }] },
      ],
    },
    {
      id: 'financial-admin',
      title: 'Financial & Administrative Violation Department',
      icon: ShieldCheck,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'financial-sector',
      leader: {
        name: 'Khalifa Al Mansoori',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        message: 'Detecting and preventing financial and administrative violations.',
        mission: 'To investigate irregularities and ensure compliance with financial regulations.',
      },
      overview: {
        description: 'Investigates financial and administrative violations and irregularities.',
        focusAreas: ['Fraud Investigation', 'Compliance Violations', 'Administrative Review', 'Corrective Actions'],
      },
      employees: [
        { id: 'e54', name: 'Khalifa Al Mansoori', role: 'Department Head', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', since: '2015', email: 'khalifa.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e55', name: 'Sara Al Ketbi', role: 'Fraud Investigator', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', since: '2017', email: 'sara.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e56', name: 'Rashid Al Shamsi', role: 'Compliance Officer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', since: '2018', email: 'rashid.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e57', name: 'Fatima Al Zarooni', role: 'Investigation Analyst', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', since: '2020', email: 'fatima.z@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c12', name: 'Khalifa Al Mansoori', role: 'Compliance Champion', category: 'Compliance', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', categoryColor: '#dc2626' },
      ],
      kpis: [
        { id: 'kpi18', title: 'Violation Detection Rate', description: 'Percentage of violations detected and reported', metric: '94%', target: '90%', status: 'exceeds', trend: 'up' },
        { id: 'kpi19', title: 'Investigation Closure', description: 'Percentage of investigations closed within timeframe', metric: '87%', target: '85%', status: 'exceeds', trend: 'stable' },
      ],
      risks: {
        strategic: [
          { id: 'sr10', title: 'Fraud Sophistication', description: 'Increasing sophistication of financial fraud methods', level: 'High', mitigation: 'Khalifa Al Mansoori', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or10', title: 'Evidence Collection', description: 'Challenges in collecting sufficient evidence for investigations', level: 'High', mitigation: 'Khalifa Al Mansoori', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com10', name: 'Violation Review Committee', purpose: 'Review and assess financial and administrative violations', chairperson: 'Khalifa Al Mansoori', coordinator: 'TBD', members: [{ name: 'Legal Advisor', role: 'Compliance Expert' }] },
      ],
    },
    {
      id: 'construction',
      title: 'Construction & Infrastructure Audit Department',
      icon: Building,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'financial-sector',
      leader: {
        name: 'Mohammed Al Ketbi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        message: 'Auditing major construction and infrastructure projects.',
        mission: 'To ensure proper financial management of construction and infrastructure investments.',
      },
      overview: {
        description: 'Audits construction projects and infrastructure development.',
        focusAreas: ['Construction Projects', 'Infrastructure Development', 'Contract Management', 'Cost Control'],
      },
      employees: [
        { id: 'e58', name: 'Mohammed Al Ketbi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', since: '2013', email: 'mohammed.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e59', name: 'Noura Al Falasi', role: 'Infrastructure Auditor', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', since: '2017', email: 'noura.f@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e60', name: 'Hamdan Al Mazrouei', role: 'Contract Specialist', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', since: '2018', email: 'hamdan.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e61', name: 'Aisha Al Suwaidi', role: 'Cost Analyst', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400', since: '2019', email: 'aisha.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c13', name: 'Mohammed Al Ketbi', role: 'Project Champion', category: 'Projects', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', categoryColor: '#059669' },
      ],
      kpis: [
        { id: 'kpi20', title: 'Project Audit Coverage', description: 'Percentage of construction projects audited', metric: '91%', target: '88%', status: 'exceeds', trend: 'up' },
        { id: 'kpi21', title: 'Cost Variance Detection', description: 'Rate of cost overrun detection and reporting', metric: '93%', target: '90%', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr11', title: 'Project Complexity', description: 'Large-scale infrastructure projects with complex structures', level: 'High', mitigation: 'Mohammed Al Ketbi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or11', title: 'Contract Variations', description: 'Frequent contract changes complicating audits', level: 'Medium', mitigation: 'Mohammed Al Ketbi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com11', name: 'Construction Audit Committee', purpose: 'Review construction and infrastructure audit practices', chairperson: 'Mohammed Al Ketbi', coordinator: 'TBD', members: [{ name: 'Engineering Expert', role: 'Technical Advisor' }] },
      ],
    },
    {
      id: 'it-audit',
      title: 'Information Systems Audit Department',
      icon: Layers,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'financial-sector',
      leader: {
        name: 'Latifa Al Shamsi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
        message: 'Ensuring IT systems integrity and cybersecurity compliance.',
        mission: 'To audit information systems and ensure data security and integrity.',
      },
      overview: {
        description: 'Conducts IT audits, cybersecurity assessments, and system reviews.',
        focusAreas: ['IT Systems', 'Cybersecurity', 'Data Integrity', 'System Controls'],
      },
      employees: [
        { id: 'e62', name: 'Latifa Al Shamsi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400', since: '2014', email: 'latifa.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e63', name: 'Omar Al Kaabi', role: 'Cybersecurity Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', since: '2016', email: 'omar.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e64', name: 'Hana Al Blooshi', role: 'IT Auditor', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', since: '2018', email: 'hana.b@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e65', name: 'Khalid Al Hashemi', role: 'Systems Analyst', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', since: '2020', email: 'khalid.h@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c14', name: 'Latifa Al Shamsi', role: 'InfoSec Champion', category: 'InfoSec', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400', categoryColor: '#7c3aed' },
      ],
      kpis: [
        { id: 'kpi22', title: 'IT Audit Completion', description: 'Percentage of IT audits completed on schedule', metric: '95%', target: '92%', status: 'exceeds', trend: 'up' },
        { id: 'kpi23', title: 'Security Vulnerability Detection', description: 'Rate of cybersecurity vulnerabilities identified', metric: '97%', target: '94%', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr12', title: 'Cybersecurity Threats', description: 'Evolving cyber threats requiring constant vigilance', level: 'High', mitigation: 'Latifa Al Shamsi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or12', title: 'Technology Pace', description: 'Rapid technology changes challenging audit methodologies', level: 'High', mitigation: 'Latifa Al Shamsi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com12', name: 'IT Security Committee', purpose: 'Oversee IT audit standards and cybersecurity practices', chairperson: 'Latifa Al Shamsi', coordinator: 'TBD', members: [{ name: 'Cybersecurity Expert', role: 'Security Specialist' }] },
      ],
    },

    // CORPORATE SECTOR
    {
      id: 'corporate-sector',
      title: 'Corporate Support Sector',
      icon: Users,
      color: '#d99694',
      type: 'sector',
      leader: {
        name: 'Ibrahim Al Shamsi',
        title: 'Sector Director',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        message: 'Providing comprehensive support services to enable organizational success.',
        mission: 'To deliver exceptional HR, IT, legal, and financial support services.',
      },
      overview: {
        description: 'Manages all internal support functions including human resources, finance, IT infrastructure, and legal affairs.',
        focusAreas: ['Human Resources', 'IT Infrastructure', 'Legal Services', 'Financial Management'],
      },
      employees: [
        { id: 'e30', name: 'Reem Al Mansouri', role: 'HR Business Partner', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', since: '2016', email: 'reem.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e31', name: 'Tariq Al Zarooni', role: 'IT Infrastructure Lead', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', since: '2017', email: 'tariq.z@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e32', name: 'Laila Al Suwaidi', role: 'Legal Counsel', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400', since: '2019', email: 'laila.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e33', name: 'Ahmed Al Dhaheri', role: 'Finance Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', since: '2018', email: 'ahmed.d@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c30', name: 'Reem Al Mansouri', role: 'People Champion', category: 'People', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', categoryColor: '#ec4899' },
        { id: 'c31', name: 'Tariq Al Zarooni', role: 'Innovation Champion', category: 'Innovation', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', categoryColor: '#f59e0b' },
        { id: 'c32', name: 'Laila Al Suwaidi', role: 'Compliance Champion', category: 'Compliance', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400', categoryColor: '#dc2626' },
      ],
      kpis: [
        { id: 'kpi40', title: 'Employee Engagement', description: 'Overall employee engagement and satisfaction score', metric: '93%', target: '90%', status: 'exceeds', trend: 'up' },
        { id: 'kpi41', title: 'Support Service Quality', description: 'Quality rating of support services provided', metric: '95%', target: '92%', status: 'exceeds', trend: 'up' },
        { id: 'kpi42', title: 'System Uptime', description: 'IT infrastructure availability and reliability', metric: '99.7%', target: '99.5%', status: 'exceeds', trend: 'stable' },
      ],
      risks: {
        strategic: [
          { id: 'sr30', title: 'Talent Attraction & Retention', description: 'Competitive market for skilled professionals across all functions', level: 'High', mitigation: 'Ibrahim Al Shamsi', mitigationRole: 'Sector Director' },
          { id: 'sr31', title: 'Digital Transformation', description: 'Rapid pace of technology change requiring continuous adaptation', level: 'Medium', mitigation: 'Tariq Al Zarooni', mitigationRole: 'IT Lead' },
        ],
        operational: [
          { id: 'or30', title: 'Service Continuity', description: 'Ensuring uninterrupted support services to all departments', level: 'Medium', mitigation: 'Reem Al Mansouri', mitigationRole: 'HR Partner' },
          { id: 'or31', title: 'Compliance Requirements', description: 'Keeping pace with evolving legal and regulatory requirements', level: 'High', mitigation: 'Laila Al Suwaidi', mitigationRole: 'Legal Counsel' },
        ],
      },
      committees: [
        { id: 'com30', name: 'Corporate Services Committee', purpose: 'Coordinate and oversee all corporate support services and initiatives', chairperson: 'Ibrahim Al Shamsi', coordinator: 'Reem Al Mansouri', members: [{ name: 'Tariq Al Zarooni', role: 'IT Representative' }, { name: 'Laila Al Suwaidi', role: 'Legal Advisor' }] },
        { id: 'com31', name: 'Digital Transformation Team', purpose: 'Drive digital innovation and technology adoption across the organization', chairperson: 'Tariq Al Zarooni', coordinator: 'Ahmed Al Dhaheri', members: [{ name: 'Reem Al Mansouri', role: 'Change Management Lead' }, { name: 'Laila Al Suwaidi', role: 'Compliance Advisor' }] },
      ],
    },
    {
      id: 'hr',
      title: 'Human Resources Department',
      icon: Users,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'corporate-sector',
      leader: {
        name: 'Shaikha Al Mazrouei',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        message: 'Building a talented and motivated workforce.',
        mission: 'To attract, develop, and retain top talent for organizational success.',
      },
      overview: {
        description: 'Manages recruitment, training, performance, and employee relations.',
        focusAreas: ['Recruitment', 'Training & Development', 'Performance Management', 'Employee Relations'],
      },
      employees: [
        { id: 'e70', name: 'Shaikha Al Mazrouei', role: 'Department Head', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', since: '2013', email: 'shaikha.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e71', name: 'Maryam Al Suwaidi', role: 'Recruitment Manager', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', since: '2015', email: 'maryam.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e72', name: 'Abdullah Al Ketbi', role: 'Training Specialist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', since: '2017', email: 'abdullah.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e73', name: 'Amina Al Zaabi', role: 'HR Coordinator', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', since: '2019', email: 'amina.z@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c15', name: 'Shaikha Al Mazrouei', role: 'People Champion', category: 'People', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', categoryColor: '#ec4899' },
      ],
      kpis: [
        { id: 'kpi24', title: 'Employee Satisfaction', description: 'Employee satisfaction score across organization', metric: '92%', target: '88%', status: 'exceeds', trend: 'up' },
        { id: 'kpi25', title: 'Training Completion', description: 'Percentage of mandatory training completed', metric: '96%', target: '93%', status: 'exceeds', trend: 'stable' },
      ],
      risks: {
        strategic: [
          { id: 'sr13', title: 'Talent Retention', description: 'Competition for skilled professionals in the market', level: 'Medium', mitigation: 'Shaikha Al Mazrouei', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or13', title: 'Succession Planning', description: 'Ensuring continuity of key positions', level: 'Medium', mitigation: 'Shaikha Al Mazrouei', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com13', name: 'HR Development Committee', purpose: 'Review HR policies and development programs', chairperson: 'Shaikha Al Mazrouei', coordinator: 'TBD', members: [{ name: 'Training Specialist', role: 'L&D Expert' }] },
      ],
    },
    {
      id: 'finance-proc',
      title: 'Finance and Procurement Department',
      icon: DollarSign,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'corporate-sector',
      leader: {
        name: 'Hamad Al Qassimi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
        message: 'Managing financial resources and procurement operations efficiently.',
        mission: 'To ensure sound financial management and efficient procurement processes.',
      },
      overview: {
        description: 'Handles budgeting, financial operations, and procurement activities.',
        focusAreas: ['Budget Management', 'Financial Operations', 'Procurement', 'Vendor Management'],
      },
      employees: [
        { id: 'e74', name: 'Hamad Al Qassimi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', since: '2012', email: 'hamad.q@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e75', name: 'Noor Al Hashemi', role: 'Budget Manager', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', since: '2016', email: 'noor.h@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e76', name: 'Salem Al Muhairi', role: 'Procurement Officer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', since: '2018', email: 'salem.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e77', name: 'Layla Al Falasi', role: 'Financial Analyst', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', since: '2020', email: 'layla.f@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c16', name: 'Hamad Al Qassimi', role: 'Efficiency Champion', category: 'Efficiency', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', categoryColor: '#0891b2' },
      ],
      kpis: [
        { id: 'kpi26', title: 'Budget Accuracy', description: 'Accuracy of budget forecasts and execution', metric: '97%', target: '94%', status: 'exceeds', trend: 'up' },
        { id: 'kpi27', title: 'Procurement Efficiency', description: 'Efficiency of procurement processes', metric: '93%', target: '90%', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr14', title: 'Budget Constraints', description: 'Limited budget affecting operational capabilities', level: 'Medium', mitigation: 'Hamad Al Qassimi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or14', title: 'Vendor Reliability', description: 'Dependence on external vendors for services', level: 'Medium', mitigation: 'Hamad Al Qassimi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com14', name: 'Finance & Procurement Committee', purpose: 'Oversee financial and procurement policies', chairperson: 'Hamad Al Qassimi', coordinator: 'TBD', members: [{ name: 'Finance Expert', role: 'Budget Specialist' }] },
      ],
    },
    {
      id: 'legal',
      title: 'Legal Affairs Department',
      icon: Scale,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'corporate-sector',
      leader: {
        name: 'Dr. Jamal Al Hashemi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        message: 'Providing legal counsel and ensuring regulatory compliance.',
        mission: 'To protect the organization through sound legal advice and compliance.',
      },
      overview: {
        description: 'Provides legal advice, contract review, and compliance support.',
        focusAreas: ['Legal Counsel', 'Contract Management', 'Compliance', 'Litigation Support'],
      },
      employees: [
        { id: 'e78', name: 'Dr. Jamal Al Hashemi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', since: '2011', email: 'jamal.h@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e79', name: 'Hessa Al Nuaimi', role: 'Senior Legal Counsel', image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400', since: '2015', email: 'hessa.n@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e80', name: 'Majid Al Shamsi', role: 'Contract Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', since: '2017', email: 'majid.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e81', name: 'Moza Al Dhaheri', role: 'Compliance Officer', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', since: '2019', email: 'moza.d@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c17', name: 'Dr. Jamal Al Hashemi', role: 'Compliance Champion', category: 'Compliance', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', categoryColor: '#be123c' },
      ],
      kpis: [
        { id: 'kpi28', title: 'Contract Review Time', description: 'Average time for contract review and approval', metric: '3 days', target: '5 days', status: 'exceeds', trend: 'down' },
        { id: 'kpi29', title: 'Legal Compliance Rate', description: 'Compliance with legal and regulatory requirements', metric: '99%', target: '97%', status: 'exceeds', trend: 'stable' },
      ],
      risks: {
        strategic: [
          { id: 'sr15', title: 'Regulatory Changes', description: 'Frequent changes in legal and regulatory landscape', level: 'High', mitigation: 'Dr. Jamal Al Hashemi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or15', title: 'Contract Disputes', description: 'Potential disputes with external parties', level: 'Medium', mitigation: 'Dr. Jamal Al Hashemi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com15', name: 'Legal Affairs Committee', purpose: 'Review legal matters and compliance issues', chairperson: 'Dr. Jamal Al Hashemi', coordinator: 'TBD', members: [{ name: 'Legal Advisor', role: 'Senior Counsel' }] },
      ],
    },
    {
      id: 'it',
      title: 'Information Technology Department',
      icon: Layers,
      color: '#5b9bd5',
      type: 'department',
      parentId: 'corporate-sector',
      leader: {
        name: 'Yousef Al Shamsi',
        title: 'Department Head',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        message: 'Delivering innovative IT solutions and infrastructure.',
        mission: 'To provide reliable technology infrastructure and innovative digital solutions.',
      },
      overview: {
        description: 'Manages IT infrastructure, applications, and digital transformation.',
        focusAreas: ['IT Infrastructure', 'Application Development', 'Digital Transformation', 'IT Security'],
      },
      employees: [
        { id: 'e100', name: 'Yousef Al Shamsi', role: 'Department Head', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', since: '2013', email: 'yousef.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e101', name: 'Mariam Al Dhaheri', role: 'IT Infrastructure Manager', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', since: '2015', email: 'mariam.d@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e102', name: 'Rashid Al Kaabi', role: 'Application Developer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', since: '2017', email: 'rashid.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e103', name: 'Noura Al Zaabi', role: 'IT Security Specialist', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400', since: '2019', email: 'noura.z@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c18', name: 'Yousef Al Shamsi', role: 'Innovation Champion', category: 'Innovation', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', categoryColor: '#ea580c' },
      ],
      kpis: [
        { id: 'kpi30', title: 'System Uptime', description: 'IT infrastructure availability and uptime', metric: '99.8%', target: '99.5%', status: 'exceeds', trend: 'stable' },
        { id: 'kpi31', title: 'Digital Transformation Progress', description: 'Progress on digital transformation initiatives', metric: '88%', target: '85%', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr16', title: 'Technology Obsolescence', description: 'Rapid technology changes requiring constant updates', level: 'Medium', mitigation: 'Yousef Al Shamsi', mitigationRole: 'Department Head' },
        ],
        operational: [
          { id: 'or16', title: 'System Failures', description: 'Potential IT system failures disrupting operations', level: 'High', mitigation: 'Yousef Al Shamsi', mitigationRole: 'Department Head' },
        ],
      },
      committees: [
        { id: 'com16', name: 'IT Strategy Committee', purpose: 'Guide IT strategy and digital transformation', chairperson: 'Yousef Al Shamsi', coordinator: 'TBD', members: [{ name: 'IT Architect', role: 'Technology Lead' }] },
      ],
    },
    {
      id: 'strategy',
      title: 'Strategy Department',
      icon: Target,
      color: '#8cd4e4',
      type: 'strategy',
      leader: {
        name: 'Sara Al Nuaimi',
        title: 'Head of Strategy',
        image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400',
        message: 'Shaping the future through strategic planning and innovation.',
        mission: 'To develop and implement strategies that drive organizational growth and excellence.',
      },
      overview: {
        description: 'Develops long-term strategic plans, monitors KPIs, and drives organizational transformation.',
        focusAreas: ['Strategic Planning', 'KPI Management', 'Innovation', 'Transformation'],
      },
      employees: [
        { id: 'e92', name: 'Sara Al Nuaimi', role: 'Head of Strategy', image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400', since: '2014', email: 'sara.n@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e93', name: 'Khalifa Al Suwaidi', role: 'Strategic Planning Manager', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', since: '2016', email: 'khalifa.s@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e94', name: 'Muna Al Blooshi', role: 'KPI Analyst', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', since: '2018', email: 'muna.b@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e95', name: 'Tariq Al Hashemi', role: 'Innovation Specialist', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', since: '2019', email: 'tariq.h@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c19', name: 'Sara Al Nuaimi', role: 'Strategy Champion', category: 'Strategy', image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400', categoryColor: '#0284c7' },
      ],
      kpis: [
        { id: 'kpi32', title: 'Strategic Plan Execution', description: 'Percentage of strategic initiatives on track', metric: '93%', target: '90%', status: 'exceeds', trend: 'up' },
        { id: 'kpi33', title: 'Innovation Index', description: 'Number of innovation initiatives implemented', metric: '12', target: '10', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr17', title: 'Strategic Misalignment', description: 'Misalignment between strategy and execution', level: 'Medium', mitigation: 'Sara Al Nuaimi', mitigationRole: 'Head of Strategy' },
        ],
        operational: [
          { id: 'or17', title: 'Resource Allocation', description: 'Limited resources for strategic initiatives', level: 'Medium', mitigation: 'Sara Al Nuaimi', mitigationRole: 'Head of Strategy' },
        ],
      },
      committees: [
        { id: 'com17', name: 'Strategic Planning Committee', purpose: 'Review and guide strategic planning initiatives', chairperson: 'Sara Al Nuaimi', coordinator: 'TBD', members: [{ name: 'Strategy Analyst', role: 'Planning Expert' }] },
      ],
    },
    {
      id: 'quality',
      title: 'Professional Practice & Quality Assurance',
      icon: Award,
      color: '#908e81',
      type: 'strategy',
      leader: {
        name: 'Dr. Ahmed Al Zaabi',
        title: 'Quality Director',
        image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
        message: 'Maintaining the highest standards of audit quality and professional practice.',
        mission: 'To ensure all audits meet international standards and best practices.',
      },
      overview: {
        description: 'Ensures quality control, develops audit methodologies, and maintains professional standards.',
        focusAreas: ['Quality Control', 'Audit Methodology', 'Professional Standards', 'Peer Review'],
      },
      employees: [
        { id: 'e96', name: 'Dr. Ahmed Al Zaabi', role: 'Quality Director', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400', since: '2012', email: 'ahmed.z@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e97', name: 'Latifa Al Mansoori', role: 'Quality Assurance Manager', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400', since: '2015', email: 'latifa.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e98', name: 'Hamdan Al Ketbi', role: 'Methodology Specialist', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', since: '2017', email: 'hamdan.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e99', name: 'Amina Al Falasi', role: 'Peer Review Coordinator', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', since: '2019', email: 'amina.f@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c20', name: 'Dr. Ahmed Al Zaabi', role: 'Quality Champion', category: 'Quality', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400', categoryColor: '#7c3aed' },
      ],
      kpis: [
        { id: 'kpi34', title: 'Audit Quality Score', description: 'Overall quality rating of audits conducted', metric: '98%', target: '95%', status: 'exceeds', trend: 'up' },
        { id: 'kpi35', title: 'Standards Compliance', description: 'Compliance with professional audit standards', metric: '99%', target: '97%', status: 'exceeds', trend: 'stable' },
      ],
      risks: {
        strategic: [
          { id: 'sr18', title: 'Standards Evolution', description: 'Changes in international audit standards', level: 'Medium', mitigation: 'Dr. Ahmed Al Zaabi', mitigationRole: 'Quality Director' },
        ],
        operational: [
          { id: 'or18', title: 'Quality Consistency', description: 'Maintaining consistent quality across all audits', level: 'Medium', mitigation: 'Dr. Ahmed Al Zaabi', mitigationRole: 'Quality Director' },
        ],
      },
      committees: [
        { id: 'com18', name: 'Quality Assurance Committee', purpose: 'Monitor and improve audit quality standards', chairperson: 'Dr. Ahmed Al Zaabi', coordinator: 'TBD', members: [{ name: 'Quality Reviewer', role: 'QA Specialist' }] },
      ],
    },
    {
      id: 'consultancy',
      title: 'Consultancy & Business Excellence Department',
      icon: Briefcase,
      color: '#5b9bd5',
      type: 'strategy',
      leader: {
        name: 'Nasser Al Shamsi',
        title: 'Head of Consultancy & Business Excellence',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        message: 'Driving business excellence and providing expert consultancy services.',
        mission: 'To enhance organizational performance through strategic consultancy and continuous improvement initiatives.',
      },
      overview: {
        description: 'Provides consultancy services and implements business excellence frameworks to drive organizational performance.',
        focusAreas: ['Business Consultancy', 'Excellence Frameworks', 'Process Improvement', 'Change Management'],
      },
      employees: [
        { id: 'e30', name: 'Reem Al Blooshi', role: 'Business Excellence Manager', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', since: '2018', email: 'reem.b@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e31', name: 'Khalid Al Marzouqi', role: 'Senior Consultant', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', since: '2019', email: 'khalid.m@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
        { id: 'e32', name: 'Moza Al Ketbi', role: 'Process Improvement Specialist', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', since: '2020', email: 'moza.k@faa.gov.ae', phone: '+971-4-XXX-XXXX' },
      ],
      champions: [
        { id: 'c21', name: 'Nasser Al Shamsi', role: 'Excellence Champion', category: 'Excellence', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', categoryColor: '#16a34a' },
      ],
      kpis: [
        { id: 'kpi36', title: 'Excellence Score', description: 'Overall business excellence framework rating', metric: '94%', target: '90%', status: 'exceeds', trend: 'up' },
        { id: 'kpi37', title: 'Process Improvement Rate', description: 'Number of processes improved annually', metric: '18', target: '15', status: 'exceeds', trend: 'up' },
      ],
      risks: {
        strategic: [
          { id: 'sr19', title: 'Change Resistance', description: 'Resistance to organizational change initiatives', level: 'Medium', mitigation: 'Nasser Al Shamsi', mitigationRole: 'Head of Consultancy' },
        ],
        operational: [
          { id: 'or19', title: 'Implementation Challenges', description: 'Challenges in implementing excellence frameworks', level: 'Medium', mitigation: 'Reem Al Blooshi', mitigationRole: 'Excellence Manager' },
        ],
      },
      committees: [
        { id: 'com19', name: 'Business Excellence Committee', purpose: 'Drive business excellence and continuous improvement', chairperson: 'Nasser Al Shamsi', coordinator: 'Reem Al Blooshi', members: [{ name: 'Khalid Al Marzouqi', role: 'Senior Consultant' }, { name: 'Moza Al Ketbi', role: 'Process Specialist' }] },
      ],
    },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSector = (sectorId: string) => {
    setExpandedSectors(prev => ({
      ...prev,
      [sectorId]: !prev[sectorId]
    }));
  };

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node);
    setShowEmployeeProfile(null);
  };

  const handleEmployeeClick = (employee: any) => {
    setShowEmployeeProfile(employee);
  };

  // Mock employee profile data
  const employeeProfileData = {
    about: {
      bio: 'Experienced professional with over 10 years in financial auditing and compliance. Passionate about delivering excellence and maintaining the highest standards of integrity.',
      social: {
        linkedin: 'linkedin.com/in/employee',
        twitter: '@employee'
      }
    },
    academic: [
      { degree: 'Master of Business Administration', institution: 'Dubai University', year: '2015' },
      { degree: 'Bachelor of Accounting', institution: 'UAE University', year: '2010' },
    ],
    certifications: [
      { name: 'Certified Public Accountant (CPA)', issuer: 'AICPA', year: '2016' },
      { name: 'Certified Internal Auditor (CIA)', issuer: 'IIA', year: '2017' },
    ],
    training: [
      { course: 'Advanced Financial Auditing', provider: 'FAA Academy', year: '2022' },
      { course: 'Risk Management', provider: 'Dubai Government', year: '2021' },
    ],
    faaExperience: [
      { position: 'Senior Auditor', period: '2019 - Present', department: 'Operation Sector' },
      { position: 'Auditor', period: '2016 - 2019', department: 'Financial Sector' },
    ],
    previousExperience: [
      { company: 'KPMG Dubai', position: 'Audit Associate', period: '2013 - 2016' },
      { company: 'Deloitte', position: 'Junior Auditor', period: '2010 - 2013' },
    ],
    achievements: [
      { title: 'Employee of the Year 2021', description: 'Recognized for outstanding performance' },
      { title: 'Excellence Award', description: 'Best audit report of 2020' },
    ],
    skills: ['Financial Analysis', 'Risk Assessment', 'Compliance Review', 'Data Analytics', 'Report Writing'],
    languages: [
      { language: 'Arabic', level: 'Native' },
      { language: 'English', level: 'Fluent' },
      { language: 'French', level: 'Intermediate' },
    ],
  };

  return (
    <div className="flex h-[calc(100vh-180px)] bg-[#f8f9fa] relative">
      {/* Left Panel - Organization Tree */}
      <div className="w-[35%] border-r border-gray-200 bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
          <h2 className="text-gray-900 mb-1">Organization Chart</h2>
          <p className="text-sm text-gray-600">Select any node to view details</p>
        </div>

        <div className="p-6 space-y-3 pb-8">
          {/* Leadership Chain */}
          <div className="space-y-2">
            {treeData.filter(n => n.type === 'leadership').map(node => {
              const Icon = node.icon;
              const isSelected = selectedNode?.id === node.id;
              return (
                <div key={node.id} className="flex items-center gap-2">
                  <div className="w-1 h-8 bg-gray-200" />
                  <Card
                    onClick={() => handleNodeClick(node)}
                    className={`flex-1 p-3 rounded-lg shadow-sm border cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:shadow-md hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${node.color}15` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: node.color }} />
                      </div>
                      <p className="text-sm text-gray-900">{node.title}</p>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* Offices */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 px-3 mb-2">Executive Offices</p>
            {treeData.filter(n => n.type === 'office').map(node => {
              const Icon = node.icon;
              const isSelected = selectedNode?.id === node.id;
              return (
                <Card
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-3 rounded-lg shadow-sm border cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:shadow-md hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${node.color}15` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: node.color }} />
                    </div>
                    <p className="text-sm text-gray-900">{node.title}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* Sectors with nested Departments */}
          <div className="space-y-4">
            <p className="text-xs text-gray-500 px-3">Sectors & Departments</p>
            {treeData.filter(n => n.type === 'sector').map(sector => {
              const Icon = sector.icon;
              const isSelected = selectedNode?.id === sector.id;
              const isExpanded = expandedSectors[sector.id];
              const departments = treeData.filter(n => n.type === 'department' && n.parentId === sector.id);
              
              return (
                <div key={sector.id} className="space-y-2">
                  {/* Sector Card */}
                  <Card
                    className={`rounded-lg shadow-sm border transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:shadow-md hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 p-3">
                      <div 
                        className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${sector.color}15` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: sector.color }} />
                      </div>
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => handleNodeClick(sector)}
                      >
                        <p className="text-sm text-gray-900 line-clamp-2">{sector.title}</p>
                      </div>
                      {departments.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSector(sector.id);
                          }}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Department Cards - nested under sector */}
                    {departments.length > 0 && isExpanded && (
                      <div className="pb-2 px-3">
                        <div className="ml-6 space-y-1.5 border-l-2 border-gray-200 pl-3">
                          {departments.map(dept => {
                            const DeptIcon = dept.icon;
                            const isDeptSelected = selectedNode?.id === dept.id;
                            return (
                              <Card
                                key={dept.id}
                                onClick={() => handleNodeClick(dept)}
                                className={`p-2.5 rounded-lg shadow-sm border cursor-pointer transition-all ${
                                  isDeptSelected 
                                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                                    : 'border-gray-100 bg-gray-50 hover:shadow-md hover:border-gray-300 hover:bg-white'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div 
                                    className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${dept.color}15` }}
                                  >
                                    <DeptIcon className="h-3.5 w-3.5" style={{ color: dept.color }} />
                                  </div>
                                  <p className="text-xs text-gray-900 leading-tight">{dept.title}</p>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* Strategy Departments */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 px-3 mb-2">Strategy & Quality</p>
            {treeData.filter(n => n.type === 'strategy').map(node => {
              const Icon = node.icon;
              const isSelected = selectedNode?.id === node.id;
              return (
                <Card
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-3 rounded-lg shadow-sm border cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:shadow-md hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${node.color}15` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: node.color }} />
                    </div>
                    <p className="text-sm text-gray-900">{node.title}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {!selectedNode ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-900 mb-2">Select a Node</p>
              <p className="text-sm text-gray-600 max-w-md">
                Click on any sector, department, or office in the organization chart to view detailed information
              </p>
            </div>
          </div>
        ) : showEmployeeProfile ? (
          // Employee Profile Panel
          <div className="p-8 pb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEmployeeProfile(null)}
                >
                  ← Back to {selectedNode.title}
                </Button>
              </div>
            </div>

            <Card className="p-8 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={showEmployeeProfile.image}
                  alt={showEmployeeProfile.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                />
                <div className="flex-1">
                  <h2 className="text-gray-900 mb-1">{showEmployeeProfile.name}</h2>
                  <p className="text-gray-600 mb-2">{showEmployeeProfile.role}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Since {showEmployeeProfile.since}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>Dubai, UAE</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Mail className="h-4 w-4" />
                      {showEmployeeProfile.email}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Phone className="h-4 w-4" />
                      {showEmployeeProfile.phone}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Profile Sections */}
            <div className="space-y-4">
              {/* About */}
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection('about')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">About & Social Profile</span>
                  </div>
                  {expandedSections.about ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {expandedSections.about && (
                  <div className="p-6 pt-0 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">{employeeProfileData.about.bio}</p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <X className="h-4 w-4" />
                        Twitter
                      </Button>
                    </div>
                  </div>
                )}
              </Card>

              {/* Academic Information */}
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection('academic')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">Academic Information</span>
                  </div>
                  {expandedSections.academic ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {expandedSections.academic && (
                  <div className="p-6 pt-0 border-t border-gray-100 space-y-3">
                    {employeeProfileData.academic.map((edu, idx) => (
                      <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                        <p className="text-sm text-gray-900">{edu.degree}</p>
                        <p className="text-xs text-gray-600">{edu.institution} • {edu.year}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Professional Certifications */}
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection('certifications')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <AwardIcon className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">Professional Certifications</span>
                  </div>
                  {expandedSections.certifications ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {expandedSections.certifications && (
                  <div className="p-6 pt-0 border-t border-gray-100 space-y-3">
                    {employeeProfileData.certifications.map((cert, idx) => (
                      <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                        <p className="text-sm text-gray-900">{cert.name}</p>
                        <p className="text-xs text-gray-600">{cert.issuer} • {cert.year}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* FAA Experience */}
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection('faaExperience')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BriefcaseIcon className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">FAA Experience</span>
                  </div>
                  {expandedSections.faaExperience ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {expandedSections.faaExperience && (
                  <div className="p-6 pt-0 border-t border-gray-100 space-y-3">
                    {employeeProfileData.faaExperience.map((exp, idx) => (
                      <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                        <p className="text-sm text-gray-900">{exp.position}</p>
                        <p className="text-xs text-gray-600">{exp.department} • {exp.period}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Previous Experience */}
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection('previousExperience')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BriefcaseIcon className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">Previous Experience</span>
                  </div>
                  {expandedSections.previousExperience ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {expandedSections.previousExperience && (
                  <div className="p-6 pt-0 border-t border-gray-100 space-y-3">
                    {employeeProfileData.previousExperience.map((exp, idx) => (
                      <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                        <p className="text-sm text-gray-900">{exp.position}</p>
                        <p className="text-xs text-gray-600">{exp.company} • {exp.period}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Achievements */}
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection('achievements')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">Achievements & Awards</span>
                  </div>
                  {expandedSections.achievements ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {expandedSections.achievements && (
                  <div className="p-6 pt-0 border-t border-gray-100 space-y-3">
                    {employeeProfileData.achievements.map((ach, idx) => (
                      <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                        <p className="text-sm text-gray-900">{ach.title}</p>
                        <p className="text-xs text-gray-600">{ach.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Skills */}
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection('skills')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">Skills & Competencies</span>
                  </div>
                  {expandedSections.skills ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {expandedSections.skills && (
                  <div className="p-6 pt-0 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {employeeProfileData.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Languages */}
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection('languages')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Languages className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">Languages</span>
                  </div>
                  {expandedSections.languages ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {expandedSections.languages && (
                  <div className="p-6 pt-0 border-t border-gray-100 space-y-3">
                    {employeeProfileData.languages.map((lang, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm text-gray-900">{lang.language}</span>
                        <Badge variant="outline">{lang.level}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        ) : (
          // Node Details Panel
          <div className="p-8 pb-12">
            {/* Section 1: Leadership Message */}
            {selectedNode.leader && (
              <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="flex items-start gap-6">
                  <img
                    src={selectedNode.leader.image}
                    alt={selectedNode.leader.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{selectedNode.leader.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{selectedNode.leader.title}</p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
                      <p className="text-sm text-gray-700 italic">{selectedNode.leader.message}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-2">MISSION STATEMENT</p>
                      <p className="text-sm text-gray-700">{selectedNode.leader.mission}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Section 2: Overview & Responsibilities */}
            {selectedNode.overview && (
              <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900">Overview & Responsibilities</h4>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">{selectedNode.overview.description}</p>
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-3 tracking-wide">KEY FOCUS AREAS</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.overview.focusAreas.map((area, idx) => {
                      const colors = [
                        'bg-blue-100 text-blue-700',
                        'bg-purple-100 text-purple-700',
                        'bg-green-100 text-green-700',
                        'bg-orange-100 text-orange-700',
                        'bg-indigo-100 text-indigo-700',
                        'bg-pink-100 text-pink-700',
                        'bg-teal-100 text-teal-700',
                        'bg-cyan-100 text-cyan-700'
                      ];
                      const colorClass = colors[idx % colors.length];
                      return (
                        <span 
                          key={idx} 
                          className={`px-3 py-1.5 rounded-full text-xs ${colorClass}`}
                        >
                          {area}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Card>
            )}

            {/* Section 3: Employees */}
            {selectedNode.employees && selectedNode.employees.length > 0 && (
              <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900">Team Members</h4>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedNode.employees.map((employee) => (
                    <div
                      key={employee.id}
                      onClick={() => handleEmployeeClick(employee)}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
                    >
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-600">{employee.role}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Section 4: Department Champions */}
            {selectedNode.champions && selectedNode.champions.length > 0 && (
              <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <button
                  onClick={() => toggleSection('champions')}
                  className="w-full flex items-center justify-between mb-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-900">Department Champions</h4>
                      <p className="text-xs text-gray-500">Specialized role champions across functions</p>
                    </div>
                  </div>
                  {expandedSections.champions ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                
                {expandedSections.champions && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedNode.champions.map((champion) => (
                      <div
                        key={champion.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={champion.image}
                            alt={champion.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{champion.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant="outline" 
                                style={{ 
                                  backgroundColor: champion.categoryColor + '15', 
                                  color: champion.categoryColor, 
                                  border: 'none' 
                                }}
                                className="text-xs"
                              >
                                {champion.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">{champion.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* Section 5: Departmental Key Performance Indicators */}
            {selectedNode.kpis && selectedNode.kpis.length > 0 && (
              <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <button
                  onClick={() => toggleSection('kpis')}
                  className="w-full flex items-center justify-between mb-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-900">Departmental Key Performance Indicators</h4>
                      <p className="text-xs text-gray-500">Track performance metrics and achievement status</p>
                    </div>
                  </div>
                  {expandedSections.kpis ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                
                {expandedSections.kpis && (
                  <div className="space-y-4">
                    {selectedNode.kpis.map((kpi) => (
                      <div
                        key={kpi.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-gray-900">{kpi.title}</p>
                              {kpi.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                              {kpi.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                              {kpi.trend === 'stable' && <Minus className="h-4 w-4 text-gray-600" />}
                            </div>
                            <p className="text-xs text-gray-600">{kpi.description}</p>
                          </div>
                          <Badge 
                            variant="outline"
                            className={
                              kpi.status === 'exceeds' ? 'bg-green-50 text-green-700 border-green-200' :
                              kpi.status === 'meets' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-orange-50 text-orange-700 border-orange-200'
                            }
                          >
                            {kpi.status === 'exceeds' ? 'Exceeds Target' : kpi.status === 'meets' ? 'Meets Target' : 'Below Target'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1 tracking-wide">CURRENT PERFORMANCE</p>
                            <p className="text-gray-900">{kpi.metric}</p>
                          </div>
                          <div className="w-px h-8 bg-gray-300" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1 tracking-wide">TARGET</p>
                            <p className="text-gray-900">{kpi.target}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* Section 6: Departmental Risks */}
            {selectedNode.risks && (selectedNode.risks.strategic?.length > 0 || selectedNode.risks.operational?.length > 0) && (
              <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <button
                  onClick={() => toggleSection('risks')}
                  className="w-full flex items-center justify-between mb-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-900">Departmental Risks</h4>
                      <p className="text-xs text-gray-500">Strategic and operational risk assessment</p>
                    </div>
                  </div>
                  {expandedSections.risks ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                
                {expandedSections.risks && (
                  <div className="space-y-6">
                    {/* Strategic Risks */}
                    {selectedNode.risks.strategic && selectedNode.risks.strategic.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                            <Target className="h-4 w-4 text-purple-600" />
                          </div>
                          <h5 className="text-gray-900">Strategic Risks</h5>
                        </div>
                        <div className="space-y-3">
                          {selectedNode.risks.strategic.map((risk) => (
                            <div
                              key={risk.id}
                              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-gray-900">{risk.title}</p>
                                <Badge 
                                  variant="outline"
                                  className={
                                    risk.level === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                                    risk.level === 'Medium' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                                  }
                                >
                                  {risk.level} Risk
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-3">{risk.description}</p>
                              <div className="bg-white p-3 rounded border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1 tracking-wide">MITIGATION STRATEGY</p>
                                <p className="text-xs text-gray-700 mb-2">{risk.mitigation}</p>
                                <p className="text-xs text-gray-500">{risk.mitigationRole}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Operational Risks */}
                    {selectedNode.risks.operational && selectedNode.risks.operational.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Settings className="h-4 w-4 text-blue-600" />
                          </div>
                          <h5 className="text-gray-900">Operational Risks</h5>
                        </div>
                        <div className="space-y-3">
                          {selectedNode.risks.operational.map((risk) => (
                            <div
                              key={risk.id}
                              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-gray-900">{risk.title}</p>
                                <Badge 
                                  variant="outline"
                                  className={
                                    risk.level === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                                    risk.level === 'Medium' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                                  }
                                >
                                  {risk.level} Risk
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-3">{risk.description}</p>
                              <div className="bg-white p-3 rounded border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1 tracking-wide">MITIGATION STRATEGY</p>
                                <p className="text-xs text-gray-700 mb-2">{risk.mitigation}</p>
                                <p className="text-xs text-gray-500">{risk.mitigationRole}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )}

            {/* Section 7: Committees and Teams */}
            {selectedNode.committees && selectedNode.committees.length > 0 && (
              <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <button
                  onClick={() => toggleSection('committees')}
                  className="w-full flex items-center justify-between mb-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                      <Users2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-900">Committees and Teams</h4>
                      <p className="text-xs text-gray-500">Cross-functional committees and working groups</p>
                    </div>
                  </div>
                  {expandedSections.committees ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                
                {expandedSections.committees && (
                  <div className="space-y-4">
                    {selectedNode.committees.map((committee) => (
                      <div
                        key={committee.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="mb-3">
                          <p className="text-gray-900 mb-1">{committee.name}</p>
                          <p className="text-xs text-gray-600">{committee.purpose}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Crown className="h-3.5 w-3.5 text-purple-600" />
                            <span className="text-xs text-gray-500">Chairperson:</span>
                            <span className="text-xs text-gray-900">{committee.chairperson}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <UserCog className="h-3.5 w-3.5 text-blue-600" />
                            <span className="text-xs text-gray-500">Coordinator:</span>
                            <span className="text-xs text-gray-900">{committee.coordinator}</span>
                          </div>
                        </div>
                        {committee.members && committee.members.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-2 tracking-wide">COMMITTEE MEMBERS</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {committee.members.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  <User className="h-3 w-3 text-gray-400" />
                                  <span className="text-gray-900">{member.name}</span>
                                  <span className="text-gray-500">- {member.role}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* Empty state for nodes without data */}
            {!selectedNode.leader && !selectedNode.overview && (!selectedNode.employees || selectedNode.employees.length === 0) && (
              <Card className="p-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-gray-900 mb-2">{selectedNode.title}</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Detailed information for this organizational unit will be available soon.
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
