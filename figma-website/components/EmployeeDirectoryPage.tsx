import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useState } from 'react';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';
import { 
  ArrowLeft,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  User,
  Users,
  Building2,
  Award
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EmployeeDirectoryPageProps {
  sectorId?: string;
  departmentId?: string;
  onBack: () => void;
  onEmployeeClick?: (employeeId: string) => void;
}

export function EmployeeDirectoryPage({ sectorId, departmentId, onBack, onEmployeeClick }: EmployeeDirectoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Mock employee data
  const employees = [
    {
      id: '1',
      name: 'Ahmed Al Mansouri',
      role: 'Sector Director',
      department: 'Operation, Compliance and Performance Audit Sector',
      email: 'ahmed.almansouri@faa.gov.ae',
      phone: '+971 4 XXX XXXX',
      workingSince: 2018,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      specialization: 'Operational Audit'
    },
    {
      id: '2',
      name: 'Sara Al Hashimi',
      role: 'Department Manager',
      department: 'Ports & Free Zones Audit Department',
      email: 'sara.alhashimi@faa.gov.ae',
      phone: '+971 4 XXX XXXX',
      workingSince: 2019,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      specialization: 'Port Operations'
    },
    {
      id: '3',
      name: 'Mohammed Al Ketbi',
      role: 'Department Manager',
      department: 'Real Estate, Hotels & Entertainment Audit',
      email: 'mohammed.alketbi@faa.gov.ae',
      phone: '+971 4 XXX XXXX',
      workingSince: 2017,
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=400',
      specialization: 'Real Estate Audit'
    },
    {
      id: '4',
      name: 'Fatima Al Zaabi',
      role: 'Department Manager',
      department: 'Energy & Industry Audit Department',
      email: 'fatima.alzaabi@faa.gov.ae',
      phone: '+971 4 XXX XXXX',
      workingSince: 2016,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      specialization: 'Energy Sector'
    },
    {
      id: '5',
      name: 'Ali Al Suwaidi',
      role: 'Department Manager',
      department: 'Government & Nonprofit Entities Audit',
      email: 'ali.alsuwaidi@faa.gov.ae',
      phone: '+971 4 XXX XXXX',
      workingSince: 2015,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      specialization: 'Public Sector Audit'
    },
    {
      id: '6',
      name: 'Maryam Al Shamsi',
      role: 'Department Manager',
      department: 'Aviation & Transportation Audit',
      email: 'maryam.alshamsi@faa.gov.ae',
      phone: '+971 4 XXX XXXX',
      workingSince: 2020,
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
      specialization: 'Aviation Audit'
    },
    {
      id: '7',
      name: 'Khalid Al Muhairi',
      role: 'Senior Auditor',
      department: 'Banks & Investment Companies Audit',
      email: 'khalid.almuhairi@faa.gov.ae',
      phone: '+971 4 XXX XXXX',
      workingSince: 2021,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      specialization: 'Financial Audit'
    },
    {
      id: '8',
      name: 'Noura Al Kaabi',
      role: 'Senior Auditor',
      department: 'Ports & Free Zones Audit Department',
      email: 'noura.alkaabi@faa.gov.ae',
      phone: '+971 4 XXX XXXX',
      workingSince: 2022,
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
      specialization: 'Compliance'
    },
  ];

  const departments = [
    'All Departments',
    'Ports & Free Zones Audit Department',
    'Real Estate, Hotels & Entertainment Audit',
    'Energy & Industry Audit Department',
    'Government & Nonprofit Entities Audit',
    'Aviation & Transportation Audit',
    'Banks & Investment Companies Audit',
  ];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDepartment === 'all' || emp.department === filterDepartment;
    return matchesSearch && matchesDept;
  });

  const stats = [
    { label: 'Total Employees', value: employees.length, icon: Users, color: '#ec2227' },
    { label: 'Departments', value: departments.length - 1, icon: Building2, color: '#1949a1' },
    { label: 'Managers', value: employees.filter(e => e.role.includes('Manager')).length, icon: User, color: '#543671' },
    { label: 'Avg. Tenure', value: '4.5yrs', icon: Award, color: '#8cd4e4' },
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h2 className="text-xl text-gray-900">Employee Directory</h2>
                <p className="text-sm text-gray-500">Browse all employees and team members</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {filteredEmployees.length} {filteredEmployees.length === 1 ? 'Employee' : 'Employees'}
            </Badge>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, role, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="h-10 px-3 rounded-md border border-gray-300 text-sm bg-white"
            >
              <option value="all">All Departments</option>
              {departments.slice(1).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-20 py-6">
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-xl text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.map(employee => (
            <Card 
              key={employee.id}
              onClick={() => onEmployeeClick?.(employee.id)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group overflow-hidden"
            >
              {/* Employee Image */}
              <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                <ImageWithFallback
                  src={employee.image}
                  alt={employee.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-gray-900 text-xs">
                    Since {employee.workingSince}
                  </Badge>
                </div>
              </div>

              {/* Employee Info */}
              <div className="p-4">
                <p className="text-sm text-gray-900 mb-1 group-hover:text-[#ec2227] transition-colors">
                  {employee.name}
                </p>
                <p className="text-xs text-gray-600 mb-3">{employee.role}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Building2 className="h-3 w-3 flex-shrink-0" />
                    <span className="line-clamp-1">{employee.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="line-clamp-1">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="h-3 w-3 flex-shrink-0" />
                    <span>{employee.phone}</span>
                  </div>
                </div>

                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full h-8 text-xs group-hover:bg-[#ec2227] group-hover:text-white group-hover:border-[#ec2227] transition-colors"
                >
                  View Profile
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredEmployees.length === 0 && (
          <Card className="p-12 text-center bg-white rounded-xl border border-gray-200">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-900 mb-2">No employees found</p>
            <p className="text-xs text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}