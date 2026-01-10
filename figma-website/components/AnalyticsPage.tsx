import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BarChart3, Users, FileText, TrendingUp, Clock, Eye, Download, Share2, Activity, Target } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { HeroBanner } from './HeroBanner';
import { useLanguage } from './LanguageContext';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';

export function AnalyticsPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const userStats = [
    { icon: Users, label: isArabic ? 'إجمالي المستخدمين' : 'Total Users', value: '450', change: '+12', color: 'text-[#ec2227]' },
    { icon: Activity, label: isArabic ? 'نشط اليوم' : 'Active Today', value: '342', change: '+8%', color: 'text-[#7b282d]' },
    { icon: Clock, label: isArabic ? 'متوسط وقت الجلسة' : 'Avg. Session Time', value: '24m', change: '+3m', color: 'text-[#971b1e]' },
    { icon: Eye, label: isArabic ? 'مشاهدات الصفحة' : 'Page Views', value: '12.4K', change: '+15%', color: 'text-[#513a40]' },
  ];

  const topPages = [
    { page: 'Home Dashboard', views: 3456, avgTime: '3:24', bounceRate: '12%' },
    { page: 'Documents Search', views: 2890, avgTime: '5:12', bounceRate: '8%' },
    { page: 'Knowledge Hub', views: 2345, avgTime: '6:45', bounceRate: '15%' },
    { page: 'Organization Directory', views: 1987, avgTime: '4:32', bounceRate: '10%' },
    { page: 'Employee Feedback', views: 1654, avgTime: '3:58', bounceRate: '18%' },
  ];

  const documentActivity = [
    { document: 'Audit Methodology Manual', views: 567, downloads: 234, shares: 45 },
    { document: 'Federal Law No. 12/2025', views: 489, downloads: 312, shares: 67 },
    { document: 'Remote Work Policy', views: 456, downloads: 289, shares: 34 },
    { document: 'Risk Assessment Template', views: 398, downloads: 234, shares: 23 },
    { document: 'Employee Handbook', views: 345, downloads: 198, shares: 12 },
  ];

  const departmentUsage = [
    { dept: 'Financial Audit', users: 78, sessions: 1234, avgTime: '28m', color: 'text-[#7b282d]' },
    { dept: 'Performance Audit', users: 65, sessions: 987, avgTime: '24m', color: 'text-[#971b1e]' },
    { dept: 'Compliance', users: 54, sessions: 876, avgTime: '22m', color: 'text-[#ec2227]' },
    { dept: 'Support Services', users: 89, sessions: 1456, avgTime: '26m', color: 'text-[#513a40]' },
    { dept: 'IT Department', users: 42, sessions: 678, avgTime: '20m', color: 'text-[#1949a]' },
  ];

  const workflowMetrics = [
    { workflow: 'Document Approval', total: 456, completed: 398, pending: 58, avgTime: '2.3 days' },
    { workflow: 'Leave Request', total: 789, completed: 756, pending: 33, avgTime: '1.2 days' },
    { workflow: 'Training Enrollment', total: 234, completed: 212, pending: 22, avgTime: '0.8 days' },
    { workflow: 'IT Support Ticket', total: 567, completed: 523, pending: 44, avgTime: '1.5 days' },
  ];

  const peakUsageHours = [
    { hour: '08:00', usage: 45 },
    { hour: '09:00', usage: 78 },
    { hour: '10:00', usage: 92 },
    { hour: '11:00', usage: 85 },
    { hour: '12:00', usage: 42 },
    { hour: '13:00', usage: 38 },
    { hour: '14:00', usage: 76 },
    { hour: '15:00', usage: 88 },
    { hour: '16:00', usage: 65 },
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
            en: 'Analytics & Reporting',
            ar: 'التحليلات والتقارير'
          }}
          description={{
            en: 'Comprehensive insights into user behavior, system performance, and organizational metrics',
            ar: 'رؤى شاملة حول سلوك المستخدم وأداء النظام ومقاييس المؤسسة'
          }}
        />
        
        {/* Stats Cards - Overlapping Banner */}
        <div className="absolute bottom-0 left-0 right-0 px-[140px] translate-y-1/2 pt-14 z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {userStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg bg-gray-50 ${stat.color} w-fit h-fit`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-3xl mb-1">{stat.value}</h3>
                      <p className="text-gray-600 mb-1 text-sm">{stat.label}</p>
                      <p className="text-sm text-green-600 mb-0">{stat.change} {isArabic ? 'مقارنة بالشهر الماضي' : 'vs last month'}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-20 pt-24 pb-8 space-y-8 mt-10">
        {/* Main Analytics Overview */}
        <Card className="p-8 rounded-xl shadow-lg bg-white">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#ec2227]/10">
              <BarChart3 className="h-6 w-6 text-[#ec2227]" />
            </div>
            <div>
              <h2 className="mb-2">System Analytics Overview</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              The Analytics & Reporting module provides real-time insights into how employees interact with the 
              FAA intranet system, enabling data-driven decisions to improve user experience and operational efficiency.
            </p>
            <p className="text-gray-600">
              Our comprehensive analytics platform tracks user behavior, content engagement, workflow performance, 
              and departmental usage patterns to provide actionable insights for continuous improvement.
            </p>
          </div>
        </Card>

        {/* Main Analytics Tabs */}
        <Card className="p-8 rounded-xl shadow-lg bg-white">
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="user">User Behavior</TabsTrigger>
              <TabsTrigger value="workflow">Workflow Analytics</TabsTrigger>
              <TabsTrigger value="department">Department Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="space-y-6">
              {/* Top Pages */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="mb-0">Most Visited Pages</h4>
                  <Badge className="bg-[#ec2227]">This Month</Badge>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm">Page</th>
                        <th className="px-4 py-3 text-left text-sm">Views</th>
                        <th className="px-4 py-3 text-left text-sm">Avg. Time</th>
                        <th className="px-4 py-3 text-left text-sm">Bounce Rate</th>
                        <th className="px-4 py-3 text-left text-sm">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topPages.map((page, idx) => (
                        <tr key={idx} className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">{page.page}</td>
                          <td className="px-4 py-3 text-sm">{page.views.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">{page.avgTime}</td>
                          <td className="px-4 py-3 text-sm">{page.bounceRate}</td>
                          <td className="px-4 py-3">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Document Activity */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="mb-0">Document Activity</h4>
                  <Badge>Top 5 Documents</Badge>
                </div>
                <div className="space-y-3">
                  {documentActivity.map((doc, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="mb-0 text-sm">{doc.document}</h5>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{doc.views} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Download className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{doc.downloads} downloads</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Share2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{doc.shares} shares</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peak Usage Hours */}
              <div className="space-y-4 pt-6">
                <h4 className="mb-4">Peak Usage Hours</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-end justify-between gap-3 h-64">
                    {peakUsageHours.map((hour) => {
                      const maxUsage = Math.max(...peakUsageHours.map(h => h.usage));
                      const heightPercent = (hour.usage / maxUsage) * 100;
                      
                      return (
                        <div key={hour.hour} className="flex-1 flex flex-col items-center gap-2 group">
                          <div className="relative flex items-end h-48 w-full">
                            {/* Bar */}
                            <div
                              className="w-full bg-gradient-to-t from-[#ec2227] to-[#f87171] rounded-t-lg transition-all duration-300 group-hover:from-[#7b282d] group-hover:to-[#ec2227] relative"
                              style={{ height: `${heightPercent}%` }}
                            >
                              {/* Usage value on hover */}
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                {hour.usage} users
                              </div>
                            </div>
                          </div>
                          {/* Hour label */}
                          <span className="text-xs text-gray-600 mt-1">{hour.hour}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* X-axis line */}
                  <div className="w-full h-px bg-gray-300 mt-2"></div>
                  
                  {/* Legend */}
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-t from-[#ec2227] to-[#f87171] rounded"></div>
                      <span className="text-sm text-gray-600">User Activity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">Peak: 10:00 AM (92 users)</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="workflow" className="space-y-6">
              <div className="space-y-4">
                <h4 className="mb-4">Workflow Performance</h4>
                {workflowMetrics.map((workflow, idx) => (
                  <div key={idx} className="p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="mb-0">{workflow.workflow}</h5>
                      <Badge className="bg-[#ec2227]">{workflow.avgTime} avg</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-gray-600 mb-1 text-sm">Total</p>
                        <p className="mb-0 text-lg">{workflow.total}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1 text-sm">Completed</p>
                        <p className="text-green-600 mb-0 text-lg">{workflow.completed}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1 text-sm">Pending</p>
                        <p className="text-yellow-600 mb-0 text-lg">{workflow.pending}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-600"
                        style={{ width: `${(workflow.completed / workflow.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="department" className="space-y-6">
              <div className="space-y-4">
                <h4 className="mb-4">Department Usage Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departmentUsage.map((dept, idx) => (
                    <div key={idx} className="p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h5 className="mb-1">{dept.dept}</h5>
                          <p className="text-sm text-gray-600 mb-0">{dept.users} active users</p>
                        </div>
                        <div className={`p-3 rounded-lg bg-gray-100 ${dept.color}`}>
                          <Users className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600 mb-1 text-sm">Sessions</p>
                          <p className="mb-0 text-lg">{dept.sessions}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1 text-sm">Avg. Time</p>
                          <p className="mb-0 text-lg">{dept.avgTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Export & Reports */}
        <Card className="p-8 rounded-xl shadow-lg bg-white">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#ec2227]/10">
              <FileText className="h-6 w-6 text-[#ec2227]" />
            </div>
            <div>
              <h2 className="mb-2">Export Analytics Reports</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full" />
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Generate comprehensive reports for management review and strategic planning. Export data in multiple formats 
            for further analysis and presentation.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
              <FileText className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button className="bg-gradient-to-r from-[#7b282d] to-[#971b1e] text-white hover:opacity-90">
              <Target className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}