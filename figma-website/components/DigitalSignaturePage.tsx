import { PenTool, Shield, CheckCircle, Clock, FileText, Download, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { HeroBanner } from './HeroBanner';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Plus, Upload, Users } from 'lucide-react';
import uaePassLogo from 'figma:asset/a3e6f64550b9ea5fc90bfc22d1224066a473e881.png';
import { Combobox } from '@headlessui/react';
import {  ChevronDown } from 'lucide-react';

interface DigitalSignaturePageProps {
  onPreviewDocument?: (doc: any) => void;
}

export function DigitalSignaturePage({ onPreviewDocument }: DigitalSignaturePageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [activeTab, setActiveTab] = useState<'pending' | 'signed'>('pending');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recipientType, setRecipientType] = useState<'myself' | 'colleague'>('myself');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedColleague, setSelectedColleague] = useState<Colleague | null>(null);
  const [query, setQuery] = useState('');

  const documentsToSign = [
    {
      id: 1,
      title: 'Annual Audit Report 2024',
      requester: 'Ahmed Al Mansoori',
      department: 'Financial Audit',
      date: '2025-11-26',
      priority: 'High',
      type: 'Report',
      size: '2.4 MB',
    },
    {
      id: 2,
      title: 'Budget Approval Request',
      requester: 'Fatima Al Zaabi',
      department: 'Finance',
      date: '2025-11-25',
      priority: 'Medium',
      type: 'Approval',
      size: '1.8 MB',
    },
    {
      id: 3,
      title: 'Contract Agreement - IT Services',
      requester: 'Omar Rashid',
      department: 'IT',
      date: '2025-11-24',
      priority: 'High',
      type: 'Contract',
      size: '3.1 MB',
    },
    {
      id: 4,
      title: 'Quarterly Financial Statement Q4 2024',
      requester: 'Sara Al Hashimi',
      department: 'Financial Audit',
      date: '2025-11-23',
      priority: 'High',
      type: 'Report',
      size: '4.2 MB',
    },
    {
      id: 5,
      title: 'Policy Review Document',
      requester: 'Mohammed Al Zarooni',
      department: 'Compliance',
      date: '2025-11-22',
      priority: 'Medium',
      type: 'Policy',
      size: '1.5 MB',
    },
    {
      id: 6,
      title: 'Internal Audit Plan 2025',
      requester: 'Laila Al Amiri',
      department: 'Internal Audit',
      date: '2025-11-21',
      priority: 'High',
      type: 'Plan',
      size: '2.9 MB',
    },
    {
      id: 7,
      title: 'Staff Training Approval',
      requester: 'Khalid Al Suwaidi',
      department: 'HR',
      date: '2025-11-20',
      priority: 'Low',
      type: 'Approval',
      size: '0.8 MB',
    },
    {
      id: 8,
      title: 'Risk Assessment Report',
      requester: 'Noura Al Mazrouei',
      department: 'Risk Management',
      date: '2025-11-19',
      priority: 'High',
      type: 'Report',
      size: '3.6 MB',
    },
  ];

  const signedDocuments = [
    {
      id: 101,
      title: 'Annual Budget Review 2024',
      requester: 'Hassan Al Kaabi',
      department: 'Finance',
      requestDate: '2025-11-10',
      signedDate: '2025-11-15',
      type: 'Report',
      size: '3.2 MB',
    },
    {
      id: 102,
      title: 'HR Policy Update Document',
      requester: 'Mariam Al Qassimi',
      department: 'Human Resources',
      requestDate: '2025-11-05',
      signedDate: '2025-11-12',
      type: 'Policy',
      size: '1.9 MB',
    },
    {
      id: 103,
      title: 'IT Infrastructure Procurement Contract',
      requester: 'Rashid Al Nuaimi',
      department: 'IT',
      requestDate: '2025-10-28',
      signedDate: '2025-11-08',
      type: 'Contract',
      size: '4.5 MB',
    },
    {
      id: 104,
      title: 'Q3 Financial Audit Report',
      requester: 'Aisha Al Shamsi',
      department: 'Financial Audit',
      requestDate: '2025-10-20',
      signedDate: '2025-11-01',
      type: 'Report',
      size: '2.8 MB',
    },
    {
      id: 105,
      title: 'Employee Benefits Approval',
      requester: 'Abdullah Al Dhaheri',
      department: 'HR',
      requestDate: '2025-10-15',
      signedDate: '2025-10-28',
      type: 'Approval',
      size: '1.2 MB',
    },
  ];

  const content = {
    en: {
      pageTitle: 'Digital Signature',
      pageSubtitle: 'Secure document signing with UAE Pass integration',
      pendingTab: 'Pending Signature',
      signedTab: 'Signed Documents',
      pendingTitle: 'Documents Awaiting Signature',
      pendingDescription: 'Review, download, and sign documents using UAE Pass',
      signedTitle: 'Signed Documents',
      signedDescription: 'View and download previously signed documents',
      pendingCount: 'Pending',
      signedCount: 'Signed',
      documentsLabel: 'Documents',
      secureProcessTitle: 'Secure Signing Process:',
      secureProcessDesc: 'All documents are signed exclusively through UAE Pass. You can preview and download documents before signing. Clicking "Sign with UAE Pass" will redirect you to the official UAE Pass portal to authenticate and complete your signature.',
      requestedBy: 'Requested by:',
      requestDate: 'Request Date:',
      signedDate: 'Signed Date:',
      preview: 'Preview',
      download: 'Download',
      signWithUAE: 'Sign with UAE Pass',
      viewDocument: 'View Document',
      statPending: 'Pending Signatures',
      statCompleted: 'Completed This Month',
      statTotal: 'Total Signed',
      priority: {
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      }
    },
    ar: {
      pageTitle: 'التوقيع الرقمي',
      pageSubtitle: 'توقيع آمن للمستندات مع تكامل الهوية الرقمية',
      pendingTab: 'في انتظار التوقيع',
      signedTab: 'المستندات الموقعة',
      pendingTitle: 'المستندات في انتظار التوقيع',
      pendingDescription: 'مراجعة وتحميل وتوقيع المستندات باستخدام الهوية الرقمية',
      signedTitle: 'المستندات الموقعة',
      signedDescription: 'عرض وتحميل المستندات الموقعة مسبقاً',
      pendingCount: 'في الانتظار',
      signedCount: 'موقعة',
      documentsLabel: 'مستند',
      secureProcessTitle: 'عملية توقيع آمنة:',
      secureProcessDesc: 'يتم توقيع جميع المستندات حصرياً من خلال الهوية الرقمية. يمكنك معاينة وتحميل المستندات قبل التوقيع. سيؤدي النقر على "التوقيع بالهوية الرقمية" إلى إعادة توجيهك إلى بوابة الهوية الرقمية الرسمية للمصادقة وإكمال التوقيع.',
      requestedBy: 'طلب من:',
      requestDate: 'تاريخ الطلب:',
      signedDate: 'تاريخ التوقيع:',
      preview: 'معاينة',
      download: 'تحميل',
      signWithUAE: 'التوقيع بالهوية الرقمية',
      viewDocument: 'عرض المستند',
      statPending: 'التوقيعات المعلقة',
      statCompleted: 'المكتملة هذا الشهر',
      statTotal: 'إجمالي الموقعة',
      priority: {
        high: 'عالي',
        medium: 'متوسط',
        low: 'منخفض'
      }
    }
  };

  const t = content[language];

  const signatureStats = [
    { label: t.statPending, value: documentsToSign.length.toString(), icon: PenTool, color: 'text-[#ec2227]' },
    { label: t.statCompleted, value: '34', icon: CheckCircle, color: 'text-[#7b282d]' },
    { label: t.statTotal, value: signedDocuments.length.toString(), icon: FileText, color: 'text-[#971b1e]' },
  ];

  const currentDocuments = activeTab === 'pending' ? documentsToSign : signedDocuments;

  const colleagues: Colleague[] = [
    { name: 'Ahmed Al Mansoori', department: 'Financial Audit' },
    { name: 'Fatima Al Zaabi', department: 'Finance' },
    { name: 'Omar Rashid', department: 'IT' },
    { name: 'Sara Al Hashimi', department: 'Financial Audit' },
    { name: 'Mohammed Al Zarooni', department: 'Compliance' },
    { name: 'Laila Al Amiri', department: 'Internal Audit' },
    { name: 'Khalid Al Suwaidi', department: 'HR' },
    { name: 'Noura Al Mazrouei', department: 'Risk Management' },
    { name: 'Hassan Al Kaabi', department: 'Finance' },
    { name: 'Mariam Al Qassimi', department: 'Human Resources' },
    { name: 'Rashid Al Nuaimi', department: 'IT' },
    { name: 'Aisha Al Shamsi', department: 'Financial Audit' },
    { name: 'Abdullah Al Dhaheri', department: 'HR' },
  ];

  const filteredColleagues = query
    ? colleagues.filter((colleague) =>
        colleague.name.toLowerCase().includes(query.toLowerCase()) ||
        colleague.department.toLowerCase().includes(query.toLowerCase())
      )
    : colleagues;

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
            en: 'Digital Signature',
            ar: 'التوقيع الرقمي'
          }}
          description={{
            en: 'Secure document signing with UAE Pass integration',
            ar: 'توقيع آمن للمستندات مع تكامل الهوية الرقمية'
          }}
        />
        
        {/* Stats Cards - Overlapping Banner */}
        <div className="absolute bottom-0 left-0 right-0 px-[160px] translate-y-1/2 pt-10 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {signatureStats.map((stat) => {
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

        {/* Tab Navigation */}
        <Card className="p-1 rounded-xl shadow-lg bg-white">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 px-6 py-4 rounded-lg transition-all duration-300 ${
                activeTab === 'pending'
                  ? 'bg-[#A94442] text-white shadow-md'
                  : 'bg-transparent text-gray-600 hover:bg-gray-50'
              }`}
              style={{
                fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <PenTool className="h-5 w-5" />
                <span>{t.pendingTab}</span>
                <Badge 
                  variant={activeTab === 'pending' ? 'secondary' : 'outline'}
                  className={activeTab === 'pending' ? 'bg-white/20 text-white border-0' : ''}
                >
                  {documentsToSign.length}
                </Badge>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('signed')}
              className={`flex-1 px-6 py-4 rounded-lg transition-all duration-300 ${
                activeTab === 'signed'
                  ? 'bg-[#A94442] text-white shadow-md'
                  : 'bg-transparent text-gray-600 hover:bg-gray-50'
              }`}
              style={{
                fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>{t.signedTab}</span>
                <Badge 
                  variant={activeTab === 'signed' ? 'secondary' : 'outline'}
                  className={activeTab === 'signed' ? 'bg-white/20 text-white border-0' : ''}
                >
                  {signedDocuments.length}
                </Badge>
              </div>
            </button>
          </div>
        </Card>

        {/* Documents Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="mb-2">
                {activeTab === 'pending' ? t.pendingTitle : t.signedTitle}
              </h2>
              <p className="text-gray-600 mb-0">
                {activeTab === 'pending' ? t.pendingDescription : t.signedDescription}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-lg px-4 py-2">
                {currentDocuments.length} {t.documentsLabel}
              </Badge>
              
              {/* Add Document Dialog */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#A94442] hover:bg-[#7b282d] text-white">
                    <Plus className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                    {isArabic ? 'إضافة مستند' : 'Add Document'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]" dir={isArabic ? 'rtl' : 'ltr'}>
                  <DialogHeader>
                    <DialogTitle>
                      {isArabic ? 'إضافة مستند للتوقيع' : 'Add Document for Signature'}
                    </DialogTitle>
                    <DialogDescription>
                      {isArabic 
                        ? 'قم بتحميل مستند وحدد ما إذا كان للتوقيع الشخصي أو لإرساله إلى زميل'
                        : 'Upload a document and specify whether it\'s for your signature or to send to a colleague'}
                    </DialogDescription>
                  </DialogHeader>
                  
                 <div className="space-y-6 py-4">
      {/* Document Upload */}
      <div className="space-y-2">
        <label className="block font-medium text-gray-700">
          {isArabic ? 'تحميل المستند' : 'Upload Document'}
        </label>
        <div className="relative">
          <input
            id="document-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <label
            htmlFor="document-upload"
            className="flex  items-center justify-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#ec2227] hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <div className="text-center flex flex-col">
              <p className="font-medium text-gray-700 mb-1">
                {selectedFile ? selectedFile.name : (isArabic ? 'اختر ملف PDF أو DOC' : 'Choose PDF or DOC')}
              </p>
              <p className="text-sm text-gray-500 mb-0">
                {isArabic ? 'أو اسحب وأفلت' : 'or drag and drop'}
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Document Title */}
      <div className="space-y-2">
        <label className="block font-medium text-gray-700">
          {isArabic ? 'عنوان المستند' : 'Document Title'}
        </label>
        <input
          type="text"
          placeholder={isArabic ? 'أدخل عنوان المستند' : 'Enter document title'}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Recipient Type */}
      <div className="space-y-3">
        <label className="block font-medium text-gray-700">{isArabic ? 'المستلم' : 'Recipient'}</label>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="myself"
              value="myself"
              checked={recipientType === 'myself'}
              onChange={() => setRecipientType('myself')}
              className="cursor-pointer"
            />
            <label htmlFor="myself" className="flex items-center gap-2 cursor-pointer">
              <PenTool className="h-4 w-4" />
              {isArabic ? 'للتوقيع الشخصي' : 'For My Signature'}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="colleague"
              value="colleague"
              checked={recipientType === 'colleague'}
              onChange={() => setRecipientType('colleague')}
              className="cursor-pointer"
            />
            <label htmlFor="colleague" className="flex items-center gap-2 cursor-pointer">
              <Users className="h-4 w-4" />
              {isArabic ? 'إرسال إلى زميل' : 'Send to Colleague'}
            </label>
          </div>
        </div>
      </div>

      {/* Colleague Selection - Searchable */}
      {recipientType === 'colleague' && (
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">{isArabic ? 'اختر الزميل' : 'Select Colleague'}</label>
          <Combobox value={selectedColleague} onChange={setSelectedColleague}>
            <div className="relative">
              <Combobox.Input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(colleague: Colleague | null) => colleague?.name || ''}
                placeholder={isArabic ? 'اختر من القائمة' : 'Select from list'}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </Combobox.Button>

              {filteredColleagues.length > 0 && (
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border border-gray-300 shadow-lg z-10">
                  {filteredColleagues.map((colleague) => (
                    <Combobox.Option
                      key={colleague.name}
                      value={colleague}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`
                      }
                    >
                      {colleague.name} - {colleague.department}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
      )}

                    {/* Document Type */}
                    <div className="space-y-2">
                      <Label htmlFor="doc-type">
                        {isArabic ? 'نوع المستند' : 'Document Type'}
                      </Label>
                      <Select>
                        <SelectTrigger id="doc-type">
                          <SelectValue placeholder={isArabic ? 'اختر النوع' : 'Select type'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="report">{isArabic ? 'تقرير' : 'Report'}</SelectItem>
                          <SelectItem value="approval">{isArabic ? 'موافقة' : 'Approval'}</SelectItem>
                          <SelectItem value="contract">{isArabic ? 'عقد' : 'Contract'}</SelectItem>
                          <SelectItem value="policy">{isArabic ? 'سياسة' : 'Policy'}</SelectItem>
                          <SelectItem value="plan">{isArabic ? 'خطة' : 'Plan'}</SelectItem>
                          <SelectItem value="other">{isArabic ? 'أخرى' : 'Other'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Priority */}
                    <div className="space-y-2">
                      <Label htmlFor="priority">
                        {isArabic ? 'الأولوية' : 'Priority'}
                      </Label>
                      <Select>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder={isArabic ? 'اختر الأولوية' : 'Select priority'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">{isArabic ? 'عالي' : 'High'}</SelectItem>
                          <SelectItem value="medium">{isArabic ? 'متوسط' : 'Medium'}</SelectItem>
                          <SelectItem value="low">{isArabic ? 'منخفض' : 'Low'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      {isArabic ? 'إلغاء' : 'Cancel'}
                    </Button>
                    <Button
                      className="bg-[#A94442] hover:bg-[#7b282d] text-white"
                      onClick={() => {
                        // Handle form submission here
                        setIsDialogOpen(false);
                        setSelectedFile(null);
                        setRecipientType('myself');
                      }}
                    >
                      <Upload className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                      {isArabic ? 'إرسال للتوقيع' : 'Submit for Signature'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Info Alert - Only show for pending tab */}
          {activeTab === 'pending' && (
            <Card className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900 mb-0">
                    <strong>{t.secureProcessTitle}</strong> {t.secureProcessDesc}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Documents List */}
          <div className="space-y-4">
            {activeTab === 'pending' ? (
              documentsToSign.map((doc) => (
                <Card key={doc.id} className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all bg-white">
                  <div className="flex items-start justify-between gap-6 flex-wrap">
                    <div className="flex gap-4 flex-1 min-w-0">
                      <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-[#ec2227]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h5 className="mb-0">{doc.title}</h5>
                          <Badge variant={doc.priority === 'High' ? 'destructive' : doc.priority === 'Medium' ? 'secondary' : 'outline'}>
                            {t.priority[doc.priority.toLowerCase() as keyof typeof t.priority]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                          <span>{t.requestedBy} {doc.requester}</span>
                          <span>•</span>
                          <span>{doc.department}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {doc.date}
                          </span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                        <Badge variant="outline" className="mt-2">{doc.type}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 flex-wrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onPreviewDocument?.(doc)}
                      >
                        <FileText className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                        {t.preview}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                        {t.download}
                      </Button>
                      <Button 
                        className="bg-[#A94442] hover:bg-[#7b282d] text-white" 
                        size="default"
                      >
                        {t.signWithUAE}
                        <ExternalLink className={`h-4 w-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              signedDocuments.map((doc) => (
                <Card key={doc.id} className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all bg-white">
                  <div className="flex items-start justify-between gap-6 flex-wrap">
                    <div className="flex gap-4 flex-1 min-w-0">
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h5 className="mb-0">{doc.title}</h5>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {isArabic ? 'موقع' : 'Signed'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                          <span>{t.requestedBy} {doc.requester}</span>
                          <span>•</span>
                          <span>{doc.department}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {t.signedDate} {doc.signedDate}
                          </span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                        <Badge variant="outline" className="mt-2">{doc.type}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 flex-wrap">
                      <Button variant="outline" size="sm">
                        <FileText className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                        {t.preview}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                        {t.download}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Colleague {
  name: string;
  department: string;
}