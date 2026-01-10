import { ExternalLink, Globe, Mail, HelpCircle, FileText, LayoutDashboard, ClipboardList, Settings } from 'lucide-react';
import { Card } from './ui/card';

export function InternalApplicationsPage() {
  const applications = [
    {
      id: 1,
      name: 'FAA Website',
      description: 'Official FAA public website',
      icon: Globe,
      url: 'https://faa.gov.ae',
      color: '#7b282d'
    },
    {
      id: 2,
      name: 'TeamMate',
      description: 'Audit management platform',
      icon: ClipboardList,
      url: '#',
      color: '#8cd4e4'
    },
    {
      id: 3,
      name: 'Email on Web',
      description: 'Access your email online',
      icon: Mail,
      url: '#',
      color: '#ec2227'
    },
    {
      id: 4,
      name: 'IT Helpdesk',
      description: 'Technical support portal',
      icon: HelpCircle,
      url: '#',
      color: '#971b1e'
    },
    {
      id: 5,
      name: 'Tarasul',
      description: 'Document management system',
      icon: FileText,
      url: '#',
      color: '#54367'
    },
    {
      id: 6,
      name: 'Dashboard',
      description: 'Analytics and reporting',
      icon: LayoutDashboard,
      url: '#',
      color: '#413f30'
    },
    {
      id: 7,
      name: 'Survey System',
      description: 'Employee surveys and feedback',
      icon: ClipboardList,
      url: '#',
      color: '#908e81'
    },
    {
      id: 8,
      name: 'QRP',
      description: 'Quality review program',
      icon: Settings,
      url: '#',
      color: '#7b282d'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#000000] text-2xl mb-2">Internal Applications</h1>
          <p className="text-gray-600">Access all FAA internal systems and applications</p>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Application Cards */}
        {applications.map((app) => (
          <Card 
            key={app.id}
            className="faa-card border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
          >
            <a 
              href={app.url}
              target={app.url !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="flex flex-col h-full">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${app.color}15` }}
                >
                  <app.icon 
                    className="w-8 h-8"
                    style={{ color: app.color }}
                  />
                </div>
                
                <h3 className="text-[#000000] mb-2 group-hover:text-[#7b282d] transition-colors">
                  {app.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  {app.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-[#7b282d] group-hover:gap-3 transition-all">
                  Open Application
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </a>
          </Card>
        ))}
      </div>

      {/* Quick Tips Section */}
      <Card className="faa-card border-0 shadow-md bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#8cd4e4] to-[#54367] flex items-center justify-center flex-shrink-0 shadow-md">
            <HelpCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-[#000000] mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If you're having trouble accessing any of these applications, please contact IT Support.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="text-sm bg-white border border-[#7b282d] text-[#7b282d] hover:bg-[#7b282d] hover:text-white px-4 py-2 rounded-lg transition-all duration-300">
                Contact IT Helpdesk
              </button>
              <button className="text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
