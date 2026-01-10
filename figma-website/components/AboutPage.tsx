import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Shield, FileText, Building2, Users, Award, Target, BookOpen, Scale } from 'lucide-react';
import { HeroBanner } from './HeroBanner';
import { useLanguage } from './LanguageContext';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';

export function AboutPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const stats = [
    { icon: Building2, value: '176+', label: 'Audited Entities', color: 'text-[#ec2227]' },
    { icon: Users, value: '450+', label: 'Professional Staff', color: 'text-[#7b282d]' },
    { icon: Award, value: '25+', label: 'Years of Excellence', color: 'text-[#971b1e]' },
  ];

  const auditCategories = [
    { icon: Building2, category: 'Federal Ministries', count: 24 },
    { icon: Shield, category: 'Local Government Entities', count: 18 },
    { icon: Target, category: 'Federal Corporations', count: 32 },
    { icon: Users, category: 'Government Owned Companies', count: 45 },
    { icon: Award, category: 'Healthcare Institutions', count: 15 },
    { icon: BookOpen, category: 'Educational Institutions', count: 22 },
    { icon: Building2, category: 'Infrastructure Projects', count: 28 },
    { icon: Users, category: 'Social Development Entities', count: 12 },
  ];

  const keyResources = [
    {
      icon: Target,
      title: 'FAA Strategic Plan 2024-2028',
      description: 'Explore our comprehensive strategic framework including strategic pillars, goals, objectives, and delivery models that guide our mission to enhance public sector accountability and transparency.',
      buttonText: 'View Strategic Plan',
      url: 'https://www.faa.gov.ae/en/who-we-are#!#strategy',
      gradient: 'from-[#ec2227]/5 to-[#7b282d]/5',
    },
    {
      icon: Scale,
      title: 'Federal Law No. 8 of 2011',
      description: 'The founding legislation establishing the Financial Audit Authority and defining its mandate, powers, and responsibilities in accordance with the UAE legal framework.',
      buttonText: 'Read Full Law',
      url: 'https://www.faa.gov.ae/en/search/law',
      gradient: 'from-[#971b1e]/5 to-[#513a40]/5',
    },
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
            en: 'About Financial Audit Authority',
            ar: 'حول هيئة التدقيق المالي'
          }}
          description={{
            en: 'Ensuring accountability, transparency, and excellence in public sector governance since 2011',
            ar: 'ضمان المساءلة والشفافية والتميز في حوكمة القطاع العام منذ عام 2011'
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
        {/* About Overview */}
        <Card className="p-8 rounded-xl shadow-lg bg-white">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#ec2227]/10">
              <Shield className="h-6 w-6 text-[#ec2227]" />
            </div>
            <div>
              <h2 className="mb-2">Who We Are</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              The Financial Audit Authority (FAA) is the supreme audit institution of the United Arab Emirates, 
              established to strengthen financial accountability and enhance transparency in the use of public resources.
            </p>
            <p className="text-gray-600">
              Our mandate encompasses auditing all federal government entities, companies, and organizations 
              to ensure compliance with laws, regulations, and best practices while promoting efficiency and 
              effectiveness in public sector operations.
            </p>
          </div>
        </Card>

        {/* Key Resources */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-2">Key Resources</h2>
            <p className="text-gray-600 mb-0">Access our strategic framework and founding legislation</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {keyResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card 
                  key={resource.title}
                  className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all border-l-4 border-[#ec2227]"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-[#ec2227]/10">
                      <Icon className="h-6 w-6 text-[#ec2227]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">{resource.title}</h3>
                      <p className="text-gray-600 mb-0">{resource.description}</p>
                    </div>
                  </div>
                  <Button 
                    className="bg-[#ec2227] hover:bg-[#7b282d] w-full"
                    onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
                  >
                    {resource.buttonText}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Audit Universe */}
        <div className="space-y-6">
          <Card className="p-6 rounded-xl shadow-lg bg-white border-l-4 border-[#7b282d]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#7b282d]/10">
                  <Building2 className="h-6 w-6 text-[#7b282d]" />
                </div>
                <div>
                  <h3 className="mb-2">Our Audit Universe</h3>
                  <p className="text-gray-600 mb-0">
                    The Financial Audit Authority oversees and audits a comprehensive range of federal entities 
                    across various sectors and industries.
                  </p>
                </div>
              </div>
              <Button 
                variant="outline"
                className="border-[#ec2227] text-[#ec2227] hover:bg-[#ec2227] hover:text-white"
                onClick={() => window.open('https://www.faa.gov.ae/en/who-we-audit', '_blank', 'noopener,noreferrer')}
              >
                View Full List
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {auditCategories.map((item) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={item.category} 
                  className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group bg-white border-t-2 border-transparent hover:border-[#ec2227]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gray-50 text-[#ec2227] group-hover:bg-[#ec2227] group-hover:text-white transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-2xl text-[#7b282d] mb-0">{item.count}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">{item.category}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}