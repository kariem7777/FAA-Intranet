import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { useState } from 'react';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Users,
  Globe,
  Star,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Building2,
  Target
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import bannerBg from 'figma:asset/33fb6ee80221be4862d153ff6087a71ce90ad51a.png';

interface EmployeeProfilePageProps {
  employeeId: string;
  onBack: () => void;
}

export function EmployeeProfilePage({ employeeId, onBack }: EmployeeProfilePageProps) {
  const [profileVisible, setProfileVisible] = useState(true);
  const [aboutSectionVisible, setAboutSectionVisible] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'about',
    'academic',
    'experience'
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // Mock employee data
  const employee = {
    id: employeeId,
    name: 'Ahmed Al Mansouri',
    title: 'Sector Director',
    department: 'Operation, Compliance and Performance Audit Sector',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    email: 'ahmed.almansouri@faa.gov.ae',
    phone: '+971 4 XXX XXXX',
    location: 'Dubai, UAE',
    joinedDate: 'January 2018',
    employeeId: 'FAA-2018-042',
    
    about: {
      bio: 'Experienced audit professional with over 15 years of expertise in operational auditing and compliance. Led numerous high-profile audit projects across government and private sector entities.',
      linkedin: 'linkedin.com/in/ahmedalmansouri',
      twitter: '@ahmedalmansouri',
    },
    
    academic: [
      {
        degree: 'Master of Business Administration',
        institution: 'American University of Dubai',
        year: '2012',
        specialization: 'Finance and Accounting'
      },
      {
        degree: 'Bachelor of Accounting',
        institution: 'United Arab Emirates University',
        year: '2008',
        specialization: 'Financial Accounting'
      }
    ],
    
    certifications: [
      { name: 'Certified Public Accountant (CPA)', issuer: 'AICPA', year: '2013' },
      { name: 'Certified Internal Auditor (CIA)', issuer: 'IIA', year: '2014' },
      { name: 'Certified Information Systems Auditor (CISA)', issuer: 'ISACA', year: '2016' },
      { name: 'Project Management Professional (PMP)', issuer: 'PMI', year: '2017' },
    ],
    
    training: [
      { name: 'Advanced Audit Techniques', provider: 'IIA Middle East', year: '2023', duration: '40 hours' },
      { name: 'Risk Management Framework', provider: 'ISACA Dubai', year: '2022', duration: '24 hours' },
      { name: 'Leadership Excellence Program', provider: 'Dubai Government', year: '2021', duration: '80 hours' },
    ],
    
    faaExperience: [
      {
        title: 'Sector Director',
        department: 'Operation, Compliance and Performance Audit Sector',
        period: '2020 - Present',
        responsibilities: [
          'Lead operational audit strategy across all sectors',
          'Manage team of 140+ audit professionals',
          'Oversee compliance and performance auditing initiatives',
          'Report directly to Director General'
        ]
      },
      {
        title: 'Department Manager',
        department: 'Government Entities Audit Department',
        period: '2018 - 2020',
        responsibilities: [
          'Managed government entity audit operations',
          'Led team of 25 senior auditors',
          'Implemented new audit methodologies'
        ]
      }
    ],
    
    previousExperience: [
      {
        company: 'Ernst & Young Middle East',
        title: 'Senior Audit Manager',
        period: '2014 - 2018',
        description: 'Led audit engagements for major public sector clients across the UAE'
      },
      {
        company: 'Deloitte Dubai',
        title: 'Audit Senior',
        period: '2010 - 2014',
        description: 'Conducted financial statement audits for diversified portfolio of clients'
      }
    ],
    
    achievements: [
      { title: 'Excellence in Leadership Award', year: '2023', organization: 'FAA' },
      { title: 'Outstanding Audit Project Award', year: '2022', organization: 'FAA' },
      { title: 'Innovation in Audit Practices', year: '2021', organization: 'Dubai Government' },
    ],
    
    skills: [
      'Audit Management', 'Risk Assessment', 'Compliance', 'Financial Analysis',
      'Team Leadership', 'Strategic Planning', 'Stakeholder Management', 'Project Management'
    ],
    
    languages: [
      { language: 'Arabic', proficiency: 'Native' },
      { language: 'English', proficiency: 'Fluent' },
      { language: 'French', proficiency: 'Intermediate' }
    ]
  };

  const sections = [
    { id: 'about', title: 'About & Social Profile', icon: Users, color: '#ec2227' },
    { id: 'academic', title: 'Academic Information', icon: GraduationCap, color: '#1949a1' },
    { id: 'certifications', title: 'Professional Certifications', icon: Award, color: '#543671' },
    { id: 'training', title: 'Training & Other Certificates', icon: FileText, color: '#8cd4e4' },
    { id: 'experience', title: 'Work Experience at FAA', icon: Building2, color: '#7b282d' },
    { id: 'previous', title: 'Previous Work Experience', icon: Briefcase, color: '#971b1e' },
    { id: 'achievements', title: 'Achievements', icon: Star, color: '#413f30' },
    { id: 'skills', title: 'Skills & Talents', icon: Target, color: '#908e81' },
    { id: 'languages', title: 'Languages', icon: Globe, color: '#8cd4e4' },
  ];

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
      {/* Minimal Compact Header */}
      <div className="bg-white border-b-2 border-[#7b282d]/10">
        {/* Thin Red Accent Top Border */}
        <div className="h-0.5 bg-gradient-to-r from-[#7b282d] to-[#971b1e]"></div>
        
        {/* Back Button Row */}
        <div className="max-w-7xl mx-auto px-6 pt-5 pb-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 -ml-3 h-8"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Back to Directory
          </Button>
        </div>

        {/* Horizontal Header Layout */}
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div className="flex items-center gap-5">
            {/* Compact Profile Image */}
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
              <ImageWithFallback
                src={employee.image}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content: Horizontal Layout */}
            <div className="flex-1 min-w-0">
              {/* Primary Title with Inline Badge */}
              <div className="flex items-baseline gap-3 mb-1.5">
                <h1 className="text-xl text-gray-900">{employee.name}</h1>
                <Badge className="bg-[#7b282d] hover:bg-[#7b282d] text-white border-0 text-[11px] px-2 py-0.5">
                  {employee.employeeId}
                </Badge>
              </div>

              {/* Secondary: Role and Department on Same Line */}
              <div className="flex items-center gap-2 mb-2.5">
                <p className="text-sm text-gray-600">{employee.title}</p>
                <span className="text-gray-300">•</span>
                <p className="text-sm text-gray-500">{employee.department}</p>
              </div>

             
            </div>

            {/* Privacy Toggle - Compact */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex flex-col items-end">
                <span className="text-[11px] text-gray-600 mb-1">Profile Visibility</span>
                <div className="flex items-center gap-1.5">
                  {profileVisible ? (
                    <>
                      <Eye className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">Visible</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-500">Hidden</span>
                    </>
                  )}
                </div>
              </div>
              <Switch
                checked={profileVisible}
                onCheckedChange={setProfileVisible}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  mb-8 relative z-20">
          <Card className="p-5 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <p className="text-sm text-gray-900">{employee.email}</p>
              </div>
            </div>
          </Card>
          <Card className="p-5 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                <p className="text-sm text-gray-900">{employee.phone}</p>
              </div>
            </div>
          </Card>
          <Card className="p-5 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Location</p>
                <p className="text-sm text-gray-900">{employee.location}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile Sections */}
        <div className="space-y-4">
          
          {/* About & Social Profile */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('about')}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#ec2227]" />
                </div>
                <p className="text-sm text-gray-900">About & Social Profile</p>
              </div>
              {expandedSections.includes('about') ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSections.includes('about') && (
              <div className="px-5 pb-5 border-t border-gray-100">
                {/* Privacy Toggle */}
                <div className="flex items-center justify-between p-4 mt-4 mb-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    {aboutSectionVisible ? (
                      <Eye className="h-4 w-4 text-[#ec2227]" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                    <div>
                      <p className="text-sm text-gray-900">Display to Others</p>
                      <p className="text-xs text-gray-500">
                        {aboutSectionVisible 
                          ? 'Your profile info is visible to other employees' 
                          : 'Your profile info is hidden from other employees'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={aboutSectionVisible}
                    onCheckedChange={setAboutSectionVisible}
                  />
                </div>

                <p className="text-sm text-gray-700 mb-4">{employee.about.bio}</p>
                <div className="flex gap-4">
                  <Badge variant="outline" className="text-xs">
                    <Globe className="h-3 w-3 mr-1" />
                    {employee.about.linkedin}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Globe className="h-3 w-3 mr-1" />
                    {employee.about.twitter}
                  </Badge>
                </div>
              </div>
            )}
          </Card>

          {/* Academic Information */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('academic')}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-900">Academic Information</p>
              </div>
              {expandedSections.includes('academic') ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSections.includes('academic') && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <div className="space-y-4">
                  {employee.academic.map((edu, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 mb-0.5">{edu.degree}</p>
                        <p className="text-xs text-gray-600 mb-1">{edu.institution}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{edu.year}</span>
                          <span>•</span>
                          <span>{edu.specialization}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Professional Certifications */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('certifications')}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-sm text-gray-900">Professional Certifications</p>
                <Badge variant="secondary" className="text-xs">{employee.certifications.length}</Badge>
              </div>
              {expandedSections.includes('certifications') ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSections.includes('certifications') && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {employee.certifications.map((cert, idx) => (
                    <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-900 mb-1">{cert.name}</p>
                      <p className="text-xs text-gray-500">{cert.issuer} • {cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Training & Certificates */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('training')}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-cyan-600" />
                </div>
                <p className="text-sm text-gray-900">Training & Other Certificates</p>
              </div>
              {expandedSections.includes('training') ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSections.includes('training') && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <div className="space-y-3">
                  {employee.training.map((training, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-0.5">{training.name}</p>
                        <p className="text-xs text-gray-500">{training.provider} • {training.year} • {training.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* FAA Experience */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('experience')}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-[#7b282d]" />
                </div>
                <p className="text-sm text-gray-900">Work Experience at FAA</p>
              </div>
              {expandedSections.includes('experience') ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSections.includes('experience') && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <div className="space-y-4">
                  {employee.faaExperience.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 pb-4 border-l-2 border-gray-200 last:border-0">
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#ec2227] border-2 border-white" />
                      <p className="text-sm text-gray-900 mb-0.5">{exp.title}</p>
                      <p className="text-xs text-gray-600 mb-1">{exp.department}</p>
                      <p className="text-xs text-gray-500 mb-2">{exp.period}</p>
                      <ul className="space-y-1">
                        {exp.responsibilities.map((resp, ridx) => (
                          <li key={ridx} className="text-xs text-gray-700 flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Previous Experience */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('previous')}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                </div>
                <p className="text-sm text-gray-900">Previous Work Experience</p>
              </div>
              {expandedSections.includes('previous') ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSections.includes('previous') && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <div className="space-y-4">
                  {employee.previousExperience.map((exp, idx) => (
                    <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-900 mb-0.5">{exp.title}</p>
                      <p className="text-xs text-gray-600 mb-1">{exp.company}</p>
                      <p className="text-xs text-gray-500 mb-2">{exp.period}</p>
                      <p className="text-xs text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Achievements */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('achievements')}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-900">Achievements</p>
              </div>
              {expandedSections.includes('achievements') ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSections.includes('achievements') && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {employee.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Award className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-900 mb-0.5">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.organization} • {achievement.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Skills & Talents */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('skills')}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-900">Skills & Talents</p>
              </div>
              {expandedSections.includes('skills') ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSections.includes('skills') && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Languages */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('languages')}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-indigo-600" />
                </div>
                <p className="text-sm text-gray-900">Languages</p>
              </div>
              {expandedSections.includes('languages') ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSections.includes('languages') && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {employee.languages.map((lang, idx) => (
                    <div key={idx} className="text-center p-4 border border-gray-200 rounded-lg">
                      <Globe className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-900 mb-0.5">{lang.language}</p>
                      <Badge variant="outline" className="text-xs">{lang.proficiency}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}