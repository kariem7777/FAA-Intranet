import { BookOpen, Users, Video, FileText, Award, Lightbulb, HelpCircle, Library, Tv, TrendingUp, BookMarked, GraduationCap, FileStack, MessageCircle, Globe } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HeroBanner } from './HeroBanner';
import { useLanguage } from './LanguageContext';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';

export function KnowledgeHubPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const stats = [
    { icon: Video, value: '24+', label: 'E-Learning Courses', color: 'text-[#ec2227]' },
    { icon: Library, value: '1,245', label: 'Library Resources', color: 'text-[#7b282d]' },
    { icon: Award, value: '156+', label: 'Best Practice Articles', color: 'text-[#971b1e]' },
  ];

  const memberships = [
    { name: 'INTOSAI', description: 'International Organization of Supreme Audit Institutions', logo: 'bg-[#7b282d]' },
    { name: 'ARABOSAI', description: 'Arab Organization of Supreme Audit Institutions', logo: 'bg-[#971b1e]' },
    { name: 'IIA', description: 'Institute of Internal Auditors', logo: 'bg-[#ec2227]' },
    { name: 'ACCA', description: 'Association of Chartered Certified Accountants', logo: 'bg-[#a94442]' },
  ];

  const onboardingModules = [
    { title: 'Welcome to FAA', duration: '15 min', type: 'video', quiz: true, completed: true, score: 95 },
    { title: 'Our Mission & Values', duration: '20 min', type: 'video', quiz: true, completed: true, score: 88 },
    { title: 'FAA Structure & Departments', duration: '25 min', type: 'video', quiz: true, completed: false, score: null },
    { title: 'Audit Methodologies', duration: '45 min', type: 'video', quiz: true, completed: false, score: null },
    { title: 'IT Systems & Tools', duration: '30 min', type: 'video', quiz: true, completed: false, score: null },
    { title: 'Ethics & Professional Conduct', duration: '40 min', type: 'video', quiz: true, completed: false, score: null },
  ];

  const eLearningCourses = [
    {
      title: 'Advanced Financial Audit Techniques',
      category: 'Audit',
      duration: '8 hours',
      level: 'Advanced',
      enrolled: 45,
      rating: 4.8,
    },
    {
      title: 'Risk-Based Audit Planning',
      category: 'Audit',
      duration: '6 hours',
      level: 'Intermediate',
      enrolled: 67,
      rating: 4.9,
    },
    {
      title: 'Data Analytics for Auditors',
      category: 'Technology',
      duration: '10 hours',
      level: 'Intermediate',
      enrolled: 52,
      rating: 4.7,
    },
    {
      title: 'Performance Audit Fundamentals',
      category: 'Audit',
      duration: '5 hours',
      level: 'Beginner',
      enrolled: 89,
      rating: 4.6,
    },
  ];

  const bestPractices = [
    {
      title: 'Implementing AI in Audit Processes',
      author: 'Dr. Ahmed Al Mansoori',
      date: '2025-11-20',
      category: 'Innovation',
      views: 234,
    },
    {
      title: 'Effective Stakeholder Communication',
      author: 'Ms. Fatima Al Zaabi',
      date: '2025-11-18',
      category: 'Communication',
      views: 189,
    },
    {
      title: 'Cybersecurity Audit Framework',
      author: 'Mr. Omar Rashid',
      date: '2025-11-15',
      category: 'Technology',
      views: 312,
    },
  ];

  const benchmarkCategories = [
    {
      title: 'Benchmarking',
      icon: TrendingUp,
      color: 'bg-[#0891b2]',
      description: 'Measure products, services, and processes against industry leaders'
    },
    {
      title: 'Competitiveness Reports',
      icon: FileText,
      color: 'bg-[#ec2227]',
      description: 'Comprehensive analysis of organizational performance metrics'
    },
    {
      title: 'Knowledge Strategy',
      icon: Lightbulb,
      color: 'bg-[#ec2227]',
      description: 'Strategic insights for continuous improvement and innovation'
    },
  ];

  const articles = [
    {
      title: 'The Future of Government Auditing in the Digital Age',
      author: 'Dr. Sarah Al Kaabi',
      date: '2025-12-01',
      category: 'Digital Transformation',
      readTime: '8 min',
    },
    {
      title: 'Enhancing Audit Quality Through Professional Development',
      author: 'Mr. Khalid Al Hashemi',
      date: '2025-11-28',
      category: 'Professional Development',
      readTime: '6 min',
    },
    {
      title: 'International Audit Standards: A Practical Guide',
      author: 'Ms. Mariam Al Suwaidi',
      date: '2025-11-25',
      category: 'Standards',
      readTime: '10 min',
    },
  ];

  const faqs = [
    {
      category: 'Audit Process',
      questions: [
        { q: 'What is the typical audit cycle?', views: 145 },
        { q: 'How are audit priorities determined?', views: 98 },
        { q: 'What is risk-based auditing?', views: 234 },
      ],
    },
    {
      category: 'HR & Benefits',
      questions: [
        { q: 'How do I apply for leave?', views: 567 },
        { q: 'What training opportunities are available?', views: 432 },
        { q: 'How is performance evaluated?', views: 298 },
      ],
    },
    {
      category: 'IT & Systems',
      questions: [
        { q: 'How do I reset my password?', views: 789 },
        { q: 'Which audit software should I use?', views: 345 },
        { q: 'How to access VPN remotely?', views: 456 },
      ],
    },
  ];

  const enrichmentPrograms = [
    { name: 'Professional Certification Support', participants: 45, icon: Award },
    { name: 'Mentorship Program', participants: 78, icon: Users },
    { name: 'Innovation Workshop Series', participants: 92, icon: Lightbulb },
    { name: 'Leadership Development', participants: 34, icon: TrendingUp },
  ];

  const connectInitiativeResources = [
    { 
      title: 'IEC Presentations', 
      year: '2022',
      description: 'Internal Exchange & Collaboration presentations and knowledge sharing sessions',
      count: 24,
      icon: FileText,
      color: 'bg-[#ec2227]'
    },
    { 
      title: 'EI Presentations', 
      year: '2022',
      description: 'Excellence & Innovation initiatives and best practice presentations',
      count: 18,
      icon: Lightbulb,
      color: 'bg-[#7b282d]'
    },
    { 
      title: 'CIII Presentations', 
      year: '2022',
      description: 'Continuous Improvement & Innovation presentations from various departments',
      count: 32,
      icon: TrendingUp,
      color: 'bg-[#971b1e]'
    },
  ];

  const connectLinks = [
    'Learning Platforms',
    'User Manuals',
    'Overview - FAA Knowledge Hub',
    'FAA Library',
    'Article',
    'Benchmarks & Innovation',
    'Research & Studies',
    'Employee Skills',
    'Knowledge Enrichment Programs',
    'Partnerships & Memberships',
  ];

  const libraryCategories = [
    { name: 'Audit Standards & Guidelines', count: 284, icon: FileStack },
    { name: 'Research Papers', count: 156, icon: BookMarked },
    { name: 'Case Studies', count: 98, icon: FileText },
    { name: 'Reference Materials', count: 427, icon: BookOpen },
    { name: 'Legal Documents', count: 189, icon: FileText },
    { name: 'Training Materials', count: 91, icon: GraduationCap },
  ];

  return (
    <div 
      className="min-h-screen" 
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundColor: '#f8f9fa'
      }}
    >
      {/* Hero Banner */}
      <div className="px-20 pt-6 relative">
        <HeroBanner 
          title={{
            en: 'Knowledge Hub',
            ar: 'مركز المعرفة'
          }}
          description={{
            en: 'Your comprehensive gateway to learning, development, and professional excellence',
            ar: 'بوابتك الشاملة للتعلم والتطوير والتميز المهني'
          }}
        />
        
        {/* Stats Cards - Overlapping Banner */}
        <div className="absolute bottom-0 left-0 right-0 px-[160px] translate-y-1/2 pt-10 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-3xl mb-1">{stat.value}</h3>
                      <p className="text-gray-600 mb-0">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-20 pt-24 pb-8 space-y-8">
        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="w-full space-y-6">
          <Card className="p-2 rounded-xl shadow-lg bg-white">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
              <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="memberships" className="text-xs md:text-sm">Memberships</TabsTrigger>
              <TabsTrigger value="induction" className="text-xs md:text-sm">Induction</TabsTrigger>
              <TabsTrigger value="practices" className="text-xs md:text-sm">Best Practices</TabsTrigger>
              <TabsTrigger value="articles" className="text-xs md:text-sm">Articles</TabsTrigger>
              <TabsTrigger value="connect" className="text-xs md:text-sm">Connect</TabsTrigger>
              <TabsTrigger value="faqs" className="text-xs md:text-sm">FAQs</TabsTrigger>
              <TabsTrigger value="elearning" className="text-xs md:text-sm">E-Learning</TabsTrigger>
              <TabsTrigger value="enrichment" className="text-xs md:text-sm">Enrichment</TabsTrigger>
              <TabsTrigger value="library" className="text-xs md:text-sm">Library</TabsTrigger>
            </TabsList>
          </Card>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-8 rounded-xl shadow-lg bg-white">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#ec2227]/10">
                  <BookOpen className="h-6 w-6 text-[#ec2227]" />
                </div>
                <div>
                  <h2 className="mb-2">Overview</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full" />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  The Knowledge Hub serves as your central resource for professional development, learning materials, 
                  and institutional knowledge. Access comprehensive training programs, industry best practices, and 
                  collaborative learning opportunities designed to enhance your skills and expertise.
                </p>
                <p className="text-gray-600">
                  Whether you're a new employee looking for onboarding materials or a seasoned professional seeking 
                  advanced training, the Knowledge Hub provides the resources and support you need to excel in your role 
                  and contribute to FAA's mission of excellence in financial auditing.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Memberships and Partnerships Tab */}
          <TabsContent value="memberships" className="space-y-6">
            <Card className="p-8 rounded-xl shadow-lg bg-white">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#7b282d]/10">
                  <Globe className="h-6 w-6 text-[#7b282d]" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2">Memberships and Partnerships</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full mb-4" />
                  <p className="text-gray-600 mb-0">Our global network of professional organizations and strategic partners</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {memberships.map((org) => (
                  <Card key={org.name} className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className={`${org.logo} h-16 w-16 rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="text-center mb-2">{org.name}</h5>
                    <p className="text-sm text-gray-600 text-center mb-0">{org.description}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* New Employees Portal / Induction Materials Tab */}
          <TabsContent value="induction" className="space-y-6">
            <Card className="p-8 rounded-xl shadow-lg bg-white">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#ec2227]/10">
                  <Video className="h-6 w-6 text-[#ec2227]" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2">New Employees Portal / Induction Materials</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full mb-4" />
                  <p className="text-gray-600 mb-0">
                    Interactive videos and quizzes for new joiners to ensure comprehensive understanding of everything 
                    needed during their induction. Complete all modules and pass the quizzes to successfully finish your onboarding.
                  </p>
                </div>
                <Badge className="bg-[#ec2227]">6 Modules</Badge>
              </div>
              
              {/* Progress Overview */}
              <div className="bg-gradient-to-br from-[#ec2227]/5 to-[#7b282d]/5 rounded-lg p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="mb-0">Your Progress</h5>
                  <span className="text-sm text-gray-600">2 of 6 completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-[#ec2227] to-[#7b282d] h-3 rounded-full" style={{ width: '33.3%' }}></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {onboardingModules.map((module, index) => (
                  <div
                    key={module.title}
                    className={`p-5 rounded-lg border-l-4 transition-all cursor-pointer ${
                      module.completed 
                        ? 'bg-green-50 border-green-500 hover:border-green-600' 
                        : 'bg-gray-50 border-transparent hover:border-[#ec2227]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-gray-500">Module {index + 1}</span>
                          {module.completed && <Badge className="bg-green-500 text-xs">✓ Completed</Badge>}
                        </div>
                        <h5 className="mb-0">{module.title}</h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Video size={14} />
                        <span>{module.duration}</span>
                      </div>
                      {module.quiz && (
                        <Badge variant="outline" className="text-xs border-[#ec2227] text-[#ec2227]">
                          Quiz Included
                        </Badge>
                      )}
                    </div>
                    {module.score !== null && (
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Quiz Score:</span>
                          <span className={`${module.score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {module.score}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button className="w-full bg-[#ec2227] hover:bg-[#7b282d]">
                {onboardingModules.filter(m => m.completed).length === 0 
                  ? 'Start Induction Program' 
                  : 'Continue Induction Program'}
              </Button>
            </Card>
          </TabsContent>

          {/* Best Practices & Benchmark Tab */}
          <TabsContent value="practices" className="space-y-6">
            <Card className="p-8 rounded-xl shadow-lg bg-white">
              <div className="flex items-start gap-3 mb-8">
                <div className="p-2 rounded-lg bg-[#971b1e]/10">
                  <Lightbulb className="h-6 w-6 text-[#971b1e]" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2">Explore Our Benchmarks & Innovation</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full" />
                </div>
              </div>

              {/* Three Category Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {benchmarkCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card 
                      key={category.title}
                      className={`${category.color} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer text-white`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="h-10 w-10" />
                        <h4 className="text-white mb-0">{category.title}</h4>
                      </div>
                      <p className="text-white/90 text-sm mb-0">{category.description}</p>
                    </Card>
                  );
                })}
              </div>

              {/* Benchmarking Definition */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <p className="text-gray-700 mb-3">
                  Benchmarking is defined as the process of measuring products, services, and processes against those of organizations 
                  known to be leaders in one or more aspects of their operations. Benchmarking provides necessary insights that help you 
                  understand how your organization compares with similar organizations, even if they are in a different business or have 
                  a different group of customers.
                </p>
                <p className="text-gray-700 mb-0">
                  Benchmarking can also help organizations identify areas, systems, or processes for improvements – either incremental 
                  (continuous) improvements or dramatic (business process re-engineering) improvements.
                </p>
              </div>

              {/* Performance Diagram */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Performance</p>
                  <div className="relative h-64">
                    {/* Y-axis */}
                    <div className="absolute left-0 top-0 h-full w-px bg-gray-300"></div>
                    {/* X-axis */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
                    
                    {/* Incremental Improvement Line */}
                    <div className="absolute top-8 left-12 right-12">
                      <div className="relative h-40">
                        <svg className="w-full h-full" viewBox="0 0 400 160">
                          <path 
                            d="M 0 20 L 100 60 L 200 100 L 300 120 L 400 140" 
                            stroke="#94a3b8" 
                            strokeWidth="2" 
                            fill="none"
                            strokeDasharray="5,5"
                          />
                          <text x="10" y="15" className="text-xs fill-gray-600">Incremental improvement</text>
                        </svg>
                      </div>
                    </div>

                    {/* Benchmarking Breakthrough */}
                    <div className="absolute top-8 left-12 right-12">
                      <div className="relative h-40">
                        <svg className="w-full h-full" viewBox="0 0 400 160">
                          <path 
                            d="M 0 140 L 120 140 L 125 20 L 400 20" 
                            stroke="#0891b2" 
                            strokeWidth="3" 
                            fill="none"
                          />
                          <text x="140" y="35" className="text-xs fill-[#0891b2]">Future gap if</text>
                          <text x="140" y="50" className="text-xs fill-[#0891b2]">no changes</text>
                          <text x="140" y="65" className="text-xs fill-[#0891b2]">are made</text>
                          
                          <text x="20" y="125" className="text-xs fill-gray-600">Gap found during</text>
                          <text x="20" y="140" className="text-xs fill-gray-600">benchmarking</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-center mt-4">Time</p>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Benchmarking recommendations implemented
                  </p>
                </div>
              </div>

              {/* Incremental Quality Improvement Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="mb-3">Incremental Quality Improvement vs Benchmarking Breakthroughs</h4>
                <p className="text-gray-700 mb-0">
                  Benchmarking has been classified into two distinct categories: technical and competitive. The House of Quality matrix 
                  and Gantt charts are often used to plot the benchmarking evaluation.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <Card className="p-8 rounded-xl shadow-lg bg-white">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#ec2227]/10">
                  <FileText className="h-6 w-6 text-[#ec2227]" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2">Articles</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full mb-4" />
                  <p className="text-gray-600 mb-0">
                    Featured articles and insights from our audit professionals on industry trends, methodologies, and innovations
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card 
                    key={article.title}
                    className="p-5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border-t-2 border-transparent hover:border-[#ec2227]"
                  >
                    <Badge className="mb-3 bg-[#7b282d]">{article.category}</Badge>
                    <h5 className="mb-3">{article.title}</h5>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{article.author}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 mb-0">{article.date}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Connect Initiative Tab */}
          <TabsContent value="connect" className="space-y-6">
            <Card className="p-8 rounded-xl shadow-lg bg-white">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#ec2227]/10">
                  <FileText className="h-6 w-6 text-[#ec2227]" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2">Connect Initiative Resources</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full mb-4" />
                  <p className="text-gray-600 mb-0">Access a variety of resources from our Connect Initiative</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connectInitiativeResources.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <Card key={resource.title} className="p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all cursor-pointer border-t-2 border-transparent hover:border-[#ec2227]">
                      <div className="h-12 w-12 bg-[#ec2227] rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h5 className="mb-2">{resource.title}</h5>
                      <p className="text-sm text-gray-600 mb-0">{resource.description}</p>
                      <p className="text-sm text-gray-600 mb-0">{resource.count} presentations</p>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-6">
            <Card className="p-8 rounded-xl shadow-lg bg-white">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#7b282d]/10">
                  <HelpCircle className="h-6 w-6 text-[#7b282d]" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2">Frequently Asked Questions</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full mb-4" />
                  <p className="text-gray-600 mb-0">Find quick answers to common questions across different topics</p>
                </div>
              </div>
              <Tabs defaultValue="audit" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="audit">Audit Process</TabsTrigger>
                  <TabsTrigger value="hr">HR & Benefits</TabsTrigger>
                  <TabsTrigger value="it">IT & Systems</TabsTrigger>
                </TabsList>
                
                {faqs.map((category) => (
                  <TabsContent key={category.category} value={category.category.toLowerCase().split(' ')[0]}>
                    <div className="space-y-3">
                      {category.questions.map((item) => (
                        <div
                          key={item.q}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between border-l-4 border-transparent hover:border-[#ec2227]"
                        >
                          <p className="mb-0">{item.q}</p>
                          <span className="text-sm text-gray-500">{item.views} views</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </Card>
          </TabsContent>

          {/* E-Learning Tab */}
          <TabsContent value="elearning" className="space-y-6">
            <Card className="p-8 rounded-xl shadow-lg bg-white">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#ec2227]/10">
                  <Video className="h-6 w-6 text-[#ec2227]" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2">E-Learning</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full mb-4" />
                  <p className="text-gray-600 mb-0">Interactive online courses designed to enhance your professional skills and knowledge</p>
                </div>
              </div>

              {/* Featured E-Learning Platform */}
              <Card className="p-6 rounded-xl shadow-md bg-gradient-to-br from-gray-50 to-white border-l-4 border-[#ec2227]">
                <h4 className="mb-3">E-LEARNING PLATFORM FOR TECHNICAL EMPLOYEES</h4>
                <p className="text-gray-700 mb-3">
                  A platform developed in collaboration with PwC, providing employees with access to a range of training courses and 
                  educational workshops in the field of control and audit.
                </p>
                <p className="text-gray-600 mb-4">
                  In this phase, it targets a number of employees from Assistant Auditor to Senior Auditor job levels.
                </p>
                <Button className="bg-[#ec2227] hover:bg-[#7b282d]">
                  Log In (mwgd.com)
                </Button>
              </Card>
            </Card>
          </TabsContent>

          {/* Knowledge Enrichment Programs Tab */}
          <TabsContent value="enrichment" className="space-y-6">
            <Card className="p-8 rounded-xl shadow-lg bg-white">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#971b1e]/10">
                  <Award className="h-6 w-6 text-[#971b1e]" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2">Knowledge Enrichment Programs</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full mb-4" />
                  <p className="text-gray-600 mb-0">Specialized programs designed to accelerate your professional growth and development</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {enrichmentPrograms.map((program) => {
                  const Icon = program.icon;
                  return (
                    <Card key={program.name} className="p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all cursor-pointer border-t-2 border-transparent hover:border-[#ec2227]">
                      <div className="h-12 w-12 bg-[#ec2227] rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h5 className="mb-2">{program.name}</h5>
                      <p className="text-sm text-gray-600 mb-0">{program.participants} participants</p>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Our Library Tab */}
          <TabsContent value="library" className="space-y-6">
            <Card className="p-6 rounded-xl shadow-lg bg-white border-l-4 border-[#7b282d]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#7b282d]/10">
                    <Library className="h-6 w-6 text-[#7b282d]" />
                  </div>
                  <div>
                    <h2 className="mb-2">Our Library</h2>
                    <p className="text-gray-600 mb-0">
                      Access our comprehensive digital library with over 1,245 resources including standards, 
                      research papers, case studies, and reference materials.
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="border-[#ec2227] text-[#ec2227] hover:bg-[#ec2227] hover:text-white"
                >
                  Browse Library
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {libraryCategories.map((item) => {
                const Icon = item.icon;
                return (
                  <Card 
                    key={item.name} 
                    className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group bg-white border-t-2 border-transparent hover:border-[#ec2227]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gray-50 text-[#ec2227] group-hover:bg-[#ec2227] group-hover:text-white transition-all">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-2xl text-[#7b282d] mb-0">{item.count}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-0">{item.name}</p>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}