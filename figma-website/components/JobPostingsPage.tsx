import { ArrowLeft, Briefcase, MapPin, Clock, Building, Search, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useState } from 'react';

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  deadline: string;
  type: string;
  level: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

interface JobPostingsPageProps {
  onBack: () => void;
}

export function JobPostingsPage({ onBack }: JobPostingsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const allJobPostings: JobPosting[] = [
    {
      id: 1,
      title: 'Senior Financial Auditor',
      department: 'Financial Audit',
      location: 'Abu Dhabi',
      deadline: '2025-12-15',
      type: 'Full-time',
      level: 'Senior',
      description: 'We are seeking an experienced Senior Financial Auditor to join our Financial Audit Department. The successful candidate will lead audit engagements and mentor junior team members.',
      requirements: [
        'Bachelor\'s degree in Accounting, Finance, or related field',
        'Professional certification (CPA, ACCA, or equivalent)',
        'Minimum 7 years of audit experience',
        'Strong analytical and communication skills',
        'Experience with government audit standards'
      ],
      responsibilities: [
        'Lead financial audit engagements for government entities',
        'Review and assess internal control systems',
        'Prepare comprehensive audit reports',
        'Mentor and supervise junior auditors',
        'Ensure compliance with audit standards and regulations'
      ]
    },
    {
      id: 2,
      title: 'Risk Assessment Specialist',
      department: 'Risk Management',
      location: 'Dubai',
      deadline: '2025-12-20',
      type: 'Full-time',
      level: 'Mid-level',
      description: 'Join our Risk Management team to help identify, assess, and mitigate risks across government audit operations.',
      requirements: [
        'Bachelor\'s degree in Risk Management, Finance, or related field',
        'Minimum 5 years of risk assessment experience',
        'Knowledge of risk management frameworks',
        'Strong analytical and problem-solving skills',
        'Excellent report writing abilities'
      ],
      responsibilities: [
        'Conduct risk assessments for audit projects',
        'Develop risk mitigation strategies',
        'Monitor and report on risk indicators',
        'Collaborate with audit teams on risk-based audits',
        'Maintain risk management documentation'
      ]
    },
    {
      id: 3,
      title: 'IT Audit Manager',
      department: 'IT Audit',
      location: 'Abu Dhabi',
      deadline: '2025-12-25',
      type: 'Full-time',
      level: 'Manager',
      description: 'Lead our IT Audit team in evaluating technology controls and cybersecurity measures across government entities.',
      requirements: [
        'Bachelor\'s degree in Information Technology, Computer Science, or related field',
        'Professional certification (CISA, CISSP, or equivalent)',
        'Minimum 8 years of IT audit experience',
        'Strong knowledge of cybersecurity frameworks',
        'Experience managing audit teams'
      ],
      responsibilities: [
        'Manage IT audit engagements',
        'Evaluate IT controls and cybersecurity measures',
        'Lead technology risk assessments',
        'Develop IT audit methodologies',
        'Present findings to senior management'
      ]
    },
    {
      id: 4,
      title: 'Junior Internal Auditor',
      department: 'Internal Audit',
      location: 'Abu Dhabi',
      deadline: '2025-12-18',
      type: 'Full-time',
      level: 'Junior',
      description: 'Start your audit career with the FAA as a Junior Internal Auditor. Excellent opportunity for recent graduates.',
      requirements: [
        'Bachelor\'s degree in Accounting, Finance, or related field',
        'Strong analytical skills',
        'Good communication abilities',
        'Proficiency in Microsoft Office',
        'Willingness to learn and develop'
      ],
      responsibilities: [
        'Assist in conducting internal audits',
        'Prepare working papers and documentation',
        'Perform testing of controls and transactions',
        'Support senior auditors in fieldwork',
        'Participate in audit training programs'
      ]
    },
    {
      id: 5,
      title: 'Compliance Officer',
      department: 'Compliance',
      location: 'Dubai',
      deadline: '2025-12-22',
      type: 'Full-time',
      level: 'Mid-level',
      description: 'Ensure organizational compliance with laws, regulations, and internal policies as a Compliance Officer.',
      requirements: [
        'Bachelor\'s degree in Law, Business, or related field',
        'Minimum 5 years of compliance experience',
        'Knowledge of UAE regulations and international standards',
        'Strong attention to detail',
        'Excellent organizational skills'
      ],
      responsibilities: [
        'Monitor compliance with regulations',
        'Develop and implement compliance policies',
        'Conduct compliance audits and assessments',
        'Provide compliance training to staff',
        'Report compliance issues to management'
      ]
    },
    {
      id: 6,
      title: 'Data Analytics Specialist',
      department: 'Technology',
      location: 'Abu Dhabi',
      deadline: '2025-12-28',
      type: 'Full-time',
      level: 'Mid-level',
      description: 'Use data analytics to enhance audit effectiveness and provide insights for decision-making.',
      requirements: [
        'Bachelor\'s degree in Data Science, Statistics, or related field',
        'Minimum 4 years of data analytics experience',
        'Proficiency in analytics tools (SQL, Python, R, Power BI)',
        'Strong problem-solving skills',
        'Experience in audit or finance preferred'
      ],
      responsibilities: [
        'Perform data analysis for audit projects',
        'Develop dashboards and visualizations',
        'Identify trends and anomalies in data',
        'Support audit teams with analytics insights',
        'Maintain data quality and integrity'
      ]
    },
    {
      id: 7,
      title: 'Training & Development Manager',
      department: 'Human Resources',
      location: 'Abu Dhabi',
      deadline: '2025-12-30',
      type: 'Full-time',
      level: 'Manager',
      description: 'Lead the development and delivery of training programs to enhance employee capabilities.',
      requirements: [
        'Bachelor\'s degree in HR, Education, or related field',
        'Minimum 7 years of training and development experience',
        'Strong presentation and facilitation skills',
        'Knowledge of adult learning principles',
        'Experience designing training programs'
      ],
      responsibilities: [
        'Design and deliver training programs',
        'Assess training needs across departments',
        'Manage training budget and resources',
        'Evaluate training effectiveness',
        'Develop leadership development initiatives'
      ]
    },
    {
      id: 8,
      title: 'Legal Counsel',
      department: 'Legal Affairs',
      location: 'Abu Dhabi',
      deadline: '2025-12-27',
      type: 'Full-time',
      level: 'Senior',
      description: 'Provide legal advice and support to the organization on audit-related and operational matters.',
      requirements: [
        'Law degree and admission to UAE bar',
        'Minimum 8 years of legal experience',
        'Knowledge of government regulations',
        'Strong legal research and writing skills',
        'Fluency in Arabic and English'
      ],
      responsibilities: [
        'Provide legal advice on audit matters',
        'Review and draft legal documents',
        'Represent the organization in legal proceedings',
        'Ensure compliance with legal requirements',
        'Advise on legislative changes'
      ]
    },
    {
      id: 9,
      title: 'Quality Assurance Reviewer',
      department: 'Quality Assurance',
      location: 'Dubai',
      deadline: '2025-12-24',
      type: 'Full-time',
      level: 'Senior',
      description: 'Ensure the quality and consistency of audit work through comprehensive reviews and assessments.',
      requirements: [
        'Bachelor\'s degree in Accounting or Audit',
        'Professional certification (CPA, CIA, or equivalent)',
        'Minimum 10 years of audit experience',
        'Strong knowledge of audit standards',
        'Excellent analytical and review skills'
      ],
      responsibilities: [
        'Conduct quality assurance reviews of audit reports',
        'Assess compliance with audit standards',
        'Provide feedback to audit teams',
        'Develop quality assurance procedures',
        'Report on quality metrics to management'
      ]
    }
  ];

  const departments = ['all', 'Financial Audit', 'Risk Management', 'IT Audit', 'Internal Audit', 'Compliance', 'Technology', 'Human Resources', 'Legal Affairs', 'Quality Assurance'];

  const filteredJobs = allJobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-20 pt-6">
        <Card className="faa-card">
          <div className="p-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 -ml-2 text-faa-red-dark hover:text-faa-red-alt hover:bg-faa-red-dark/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-8 w-8 text-faa-red-dark" />
              <h2 className="text-3xl mb-0">Internal Job Postings & Transfers</h2>
            </div>
            <p className="text-gray-600 mb-0">Explore career opportunities within the Federal Audit Authority</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-20 py-6">
        {/* Search and Filter */}
        <Card className="faa-card mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by title, department, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-faa-red-dark focus:border-transparent"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-0">
                Showing {filteredJobs.length} of {allJobPostings.length} positions
              </p>
            </div>
          </div>
        </Card>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="faa-card hover:shadow-lg transition-shadow">
              <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-faa-red-dark hover:bg-faa-red-dark">{job.level}</Badge>
                    <Badge variant="outline" className="border-gray-300">{job.type}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building className="h-4 w-4 text-faa-red-dark" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-faa-red-dark" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-faa-red-dark" />
                  <span>Deadline: {job.deadline}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{job.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h5 className="mb-2">Key Requirements:</h5>
                  <ul className="space-y-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="text-sm text-gray-600">• {req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="mb-2">Main Responsibilities:</h5>
                  <ul className="space-y-1">
                    {job.responsibilities.slice(0, 3).map((resp, index) => (
                      <li key={index} className="text-sm text-gray-600">• {resp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button className="bg-faa-red-dark hover:bg-faa-red-alt">
                  Apply Now
                </Button>
                <Button variant="outline" className="border-faa-red-dark text-faa-red-dark hover:bg-faa-red-dark/10">
                  View Full Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="faa-card">
            <div className="p-12 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="mb-2">No positions found</h4>
              <p className="text-gray-600 mb-0">Try adjusting your search criteria</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
