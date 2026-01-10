import { useState } from 'react';
import { LegislationDashboardPage } from './LegislationDashboardPage';
import { LegalOpinionsPage } from './LegalOpinionsPage';
import { LegalOpinionDetailPage } from './LegalOpinionDetailPage';

interface Opinion {
  id: number;
  department: string;
  titleEn: string;
  titleAr: string;
  enquiryEn: string;
  enquiryAr: string;
  date: string;
  status: 'new' | 'replied' | 'closed';
  replyEn?: string;
  replyAr?: string;
  replyDate?: string;
  replyBy?: string;
  conversation?: ConversationMessage[];
}

interface ConversationMessage {
  id: number;
  sender: 'admin' | 'user';
  messageEn: string;
  messageAr: string;
  date: string;
  senderName: string;
}

interface LegislationDashboardWrapperProps {
  fontSizeMultiplier: number;
  userRole?: 'admin' | 'user';
}

export function LegislationDashboardWrapper({ fontSizeMultiplier, userRole = 'admin' }: LegislationDashboardWrapperProps) {
  const [currentView, setCurrentView] = useState<'dashboard' | 'opinions' | 'detail'>('dashboard');
  const [statusFilter, setStatusFilter] = useState<'new' | 'replied' | 'closed' | ''>('');
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);

  // Mock opinions data to match LegalOpinionsPage
  const mockOpinions: Opinion[] = [
    {
      id: 1,
      department: 'rta',
      titleEn: 'Enquiry regarding procurement regulations',
      titleAr: 'استفسار بخصوص لائحة المشتريات',
      enquiryEn: 'We request clarification on the legal procedures for emergency purchases exceeding the allowable limit in the financial regulations.',
      enquiryAr: 'نرجو من الجهاز توضيح الإجراءات القانونية المتبعة في حالة المشتريات الطارئة التي تتجاوز الحد المسموح به في اللائحة المالية.',
      date: '2024-01-15',
      status: 'replied',
      replyEn: 'According to Article (12) of the Financial Regulations, prior approval from the competent authority must be obtained for emergency purchases exceeding the allowable limit.',
      replyAr: 'بناءً على المادة (12) من اللائحة المالية، يجب الحصول على موافقة مسبقة من الجهة المختصة في حالة المشتريات الطارئة التي تتجاوز الحد المسموح به.',
      replyDate: '2024-01-20',
      replyBy: 'Ahmed Al Shamsi - Senior Legal Advisor',
    },
    {
      id: 2,
      department: 'dha',
      titleEn: 'Enquiry on IFRS implementation',
      titleAr: 'استفسار حول تطبيق معايير المحاسبة الدولية',
      enquiryEn: 'Is it mandatory for the Authority to apply IFRS 16 to operating lease contracts?',
      enquiryAr: 'هل يتوجب على الهيئة تطبيق معيار IFRS 16 على عقود الإيجار التشغيلية؟',
      date: '2024-01-22',
      status: 'new',
    },
    {
      id: 3,
      department: 'dewa',
      titleEn: 'Enquiry on capital project financial procedures',
      titleAr: 'استفسار عن الإجراءات المالية للمشاريع الرأسمالية',
      enquiryEn: 'What are the legal requirements for transferring funds between different capital projects?',
      enquiryAr: 'ما هي المتطلبات القانونية لتحويل الأموال بين المشاريع الرأسمالية المختلفة؟',
      date: '2024-01-25',
      status: 'new',
    },
    {
      id: 4,
      department: 'dld',
      titleEn: 'Enquiry on disbursement controls',
      titleAr: 'استفسار حول ضوابط الصرف',
      enquiryEn: 'We would like to enquire about the legal controls for disbursement on projects before finalizing award procedures.',
      enquiryAr: 'نود الاستفسار عن الضوابط القانونية للصرف على المشاريع قبل إتمام إجراءات الترسية النهائية.',
      date: '2024-01-28',
      status: 'closed',
      replyEn: 'Disbursement on any project is not permitted before completing final award procedures and contract signing as per Article (25) of the Financial Regulations.',
      replyAr: 'لا يجوز الصرف على أي مشروع قبل إتمام إجراءات الترسية النهائية والتوقيع على العقد وفقاً للمادة (25) من اللائحة المالية.',
      replyDate: '2024-02-02',
      replyBy: 'Fatima Al Marzouqi - Legal Advisor',
    },
  ];

  const handleNavigateToLegalOpinions = (filter?: { status?: 'new' | 'replied' | 'closed' }) => {
    setStatusFilter(filter?.status || '');
    setCurrentView('opinions');
  };

  const handleNavigateToOpinionDetail = (opinionId: number) => {
    const opinion = mockOpinions.find(o => o.id === opinionId);
    if (opinion) {
      setSelectedOpinion(opinion);
      setCurrentView('detail');
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setStatusFilter('');
    setSelectedOpinion(null);
  };

  const handleBackToOpinions = () => {
    setCurrentView('opinions');
    setSelectedOpinion(null);
  };

  if (currentView === 'detail' && selectedOpinion) {
    return (
      <LegalOpinionDetailPage
        opinion={selectedOpinion}
        onBack={handleBackToOpinions}
        userRole={userRole}
        fontSizeMultiplier={fontSizeMultiplier}
      />
    );
  }

  if (currentView === 'opinions') {
    return (
      <LegalOpinionsPage
        onBack={handleBackToDashboard}
        userRole={userRole}
        onOpinionSelect={handleNavigateToOpinionDetail}
        fontSizeMultiplier={fontSizeMultiplier}
      />
    );
  }

  return (
    <LegislationDashboardPage
      onNavigateToLegalOpinions={handleNavigateToLegalOpinions}
      onNavigateToOpinionDetail={handleNavigateToOpinionDetail}
      fontSizeMultiplier={fontSizeMultiplier}
    />
  );
}