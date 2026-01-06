import React, { useState } from 'react';
import { ArrowLeft, Home, ChevronRight, Download, Printer, Share2, MessageSquare, Calendar, Building2, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface LegalOpinionDetailViewProps {
  opinion: any;
  onBack: () => void;
  language: string;
}

export function LegalOpinionDetailView({ opinion, onBack, language }: LegalOpinionDetailViewProps) {
  const isArabic = language === 'ar';
  const [activeTab, setActiveTab] = useState<'inquiry' | 'response'>('inquiry');

  const content = {
    en: {
      breadcrumbHome: 'Home',
      breadcrumbLegal: 'Legal Opinions',
      back: 'Back to List',
      download: 'Download PDF',
      print: 'Print',
      share: 'Share',
      opinionInfo: 'Opinion Information',
      department: 'Department',
      submissionDate: 'Submission Date',
      status: 'Status',
      responseDate: 'Response Date',
      respondedBy: 'Responded By',
      inquiry: 'Inquiry',
      response: 'Official Response',
      inquiryDetails: 'Inquiry Details',
      responseDetails: 'Legal Opinion Response',
      noResponse: 'This inquiry is pending review by the legal team.',
      waitingResponse: 'Waiting for Response',
      new: 'New',
      pending: 'Pending Review',
      replied: 'Response Issued',
      inProgress: 'In Progress',
    },
    ar: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbLegal: 'الآراء القانونية',
      back: 'العودة إلى القائمة',
      download: 'تحميل PDF',
      print: 'طباعة',
      share: 'مشاركة',
      opinionInfo: 'معلومات الرأي',
      department: 'الجهة',
      submissionDate: 'تاريخ التقديم',
      status: 'الحالة',
      responseDate: 'تاريخ الرد',
      respondedBy: 'الرد من قبل',
      inquiry: 'الاستفسار',
      response: 'الرد الرسمي',
      inquiryDetails: 'تفاصيل الاستفسار',
      responseDetails: 'الرد على الرأي القانوني',
      noResponse: 'هذا الاستفسار قيد المراجعة من قبل الفريق القانوني.',
      waitingResponse: 'بانتظار الرد',
      new: 'جديد',
      pending: 'قيد المراجعة',
      replied: 'تم الرد',
      inProgress: 'قيد المعالجة',
    },
  };

  const t = content[language as 'en' | 'ar'];

  const statusConfig: Record<string, { color: string; label: string; icon: any }> = {
    new: { color: 'var(--color-status-warning)', label: t.new, icon: AlertCircle },
    pending: { color: 'var(--color-status-info)', label: t.pending, icon: Clock },
    replied: { color: 'var(--color-status-success)', label: t.replied, icon: CheckCircle },
    'in-progress': { color: 'var(--color-category-gold)', label: t.inProgress, icon: Clock },
  };

  const currentStatus = statusConfig[opinion.status] || statusConfig.new;
  const StatusIcon = currentStatus.icon;

  return (
    <div
      className="min-h-screen"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        fontFamily: isArabic ? 'var(--font-family-ar)' : 'var(--font-family-en)',
      }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          borderColor: 'var(--color-border-light)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
            <Home size={16} className="text-gray-500" />
            <ChevronRight size={16} className={`text-gray-400 ${isArabic ? 'rotate-180' : ''}`} />
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {t.breadcrumbLegal}
            </button>
            <ChevronRight size={16} className={`text-gray-400 ${isArabic ? 'rotate-180' : ''}`} />
            <span
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-faa-burgundy)',
              }}
            >
              {opinion.id}
            </span>
          </nav>

          {/* Opinion Title & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${currentStatus.color}15`,
                  }}
                >
                  <MessageSquare size={32} style={{ color: currentStatus.color }} />
                </div>
                <div className="flex-1">
                  <h1
                    className="text-gray-900 mb-2"
                    style={{
                      fontSize: 'var(--font-size-3xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      lineHeight: 'var(--line-height-tight)',
                    }}
                  >
                    {isArabic ? opinion.titleAr : opinion.titleEn}
                  </h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className="px-4 py-2 rounded-full flex items-center gap-2"
                      style={{
                        backgroundColor: `${currentStatus.color}15`,
                        color: currentStatus.color,
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      <StatusIcon size={16} />
                      {currentStatus.label}
                    </span>
                    <span
                      className="text-gray-600 flex items-center gap-2"
                      style={{ fontSize: 'var(--font-size-sm)' }}
                    >
                      <Calendar size={16} />
                      {opinion.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onBack}
                className="h-11 px-6"
                style={{ fontSize: 'var(--font-size-sm)' }}
              >
                <ArrowLeft size={18} className={`${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {t.back}
              </Button>
              <Button
                variant="outline"
                className="h-11 px-6"
                style={{ fontSize: 'var(--font-size-sm)' }}
              >
                <Download size={18} className={isArabic ? 'ml-2' : 'mr-2'} />
                {t.download}
              </Button>
              <Button
                variant="outline"
                className="h-11 px-6"
                style={{ fontSize: 'var(--font-size-sm)' }}
              >
                <Printer size={18} className={isArabic ? 'ml-2' : 'mr-2'} />
                {t.print}
              </Button>
              <Button
                variant="outline"
                className="h-11 px-6"
                style={{ fontSize: 'var(--font-size-sm)' }}
              >
                <Share2 size={18} className={isArabic ? 'ml-2' : 'mr-2'} />
                {t.share}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
            <div className="flex gap-8">
              {[
                { key: 'inquiry', label: t.inquiry },
                { key: 'response', label: t.response },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`pb-4 transition-colors relative ${
                    activeTab === tab.key ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: activeTab === tab.key ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                  }}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: 'var(--color-faa-burgundy)' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === 'inquiry' && (
              <div
                className="rounded-xl border p-8"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-light)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h2
                  className="text-gray-900 mb-6"
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  {t.inquiryDetails}
                </h2>
                <div
                  className="prose max-w-none text-gray-700"
                  style={{
                    fontSize: 'var(--font-size-base)',
                    lineHeight: 'var(--line-height-relaxed)',
                  }}
                >
                  {isArabic ? opinion.enquiryAr : opinion.enquiryEn}
                </div>
              </div>
            )}

            {activeTab === 'response' && (
              <div
                className="rounded-xl border p-8"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-light)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h2
                  className="text-gray-900 mb-6"
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  {t.responseDetails}
                </h2>
                {opinion.replyEn || opinion.replyAr ? (
                  <div>
                    <div
                      className="prose max-w-none text-gray-700 mb-6"
                      style={{
                        fontSize: 'var(--font-size-base)',
                        lineHeight: 'var(--line-height-relaxed)',
                      }}
                    >
                      {isArabic ? opinion.replyAr : opinion.replyEn}
                    </div>
                    {opinion.replyDate && (
                      <div className="pt-6 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
                        <div className="flex items-center gap-4 text-gray-600" style={{ fontSize: 'var(--font-size-sm)' }}>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{t.responseDate}: {opinion.replyDate}</span>
                          </div>
                          {opinion.replyBy && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-2">
                                <User size={16} />
                                <span>{t.respondedBy}: {opinion.replyBy}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-gray-100)' }}
                    >
                      <Clock size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-2" style={{ fontSize: 'var(--font-size-base)' }}>
                      {t.waitingResponse}
                    </p>
                    <p className="text-gray-500" style={{ fontSize: 'var(--font-size-sm)' }}>
                      {t.noResponse}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Opinion Information Card */}
            <div
              className="rounded-xl border p-6"
              style={{
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                className="text-gray-900 mb-4"
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                {t.opinionInfo}
              </h3>

              <div className="space-y-4">
                {/* Department */}
                <InfoRow
                  icon={<Building2 size={18} />}
                  label={t.department}
                  value={opinion.department}
                  isArabic={isArabic}
                />

                {/* Submission Date */}
                <InfoRow
                  icon={<Calendar size={18} />}
                  label={t.submissionDate}
                  value={opinion.date}
                  isArabic={isArabic}
                />

                {/* Status */}
                <div className="pb-4 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <StatusIcon size={18} className="text-gray-500" />
                    <span
                      className="text-gray-600"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {t.status}
                    </span>
                  </div>
                  <span
                    className="px-3 py-1.5 rounded-full inline-block"
                    style={{
                      backgroundColor: `${currentStatus.color}15`,
                      color: currentStatus.color,
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {currentStatus.label}
                  </span>
                </div>

                {/* Response Date (if available) */}
                {opinion.replyDate && (
                  <InfoRow
                    icon={<CheckCircle size={18} />}
                    label={t.responseDate}
                    value={opinion.replyDate}
                    isArabic={isArabic}
                  />
                )}

                {/* Responded By (if available) */}
                {opinion.replyBy && (
                  <InfoRow
                    icon={<User size={18} />}
                    label={t.respondedBy}
                    value={opinion.replyBy}
                    isArabic={isArabic}
                  />
                )}
              </div>
            </div>

            {/* Actions Card */}
            <div
              className="rounded-xl border p-6"
              style={{
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                className="text-gray-900 mb-4"
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                {isArabic ? 'إجراءات' : 'Actions'}
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download size={16} className={isArabic ? 'ml-2' : 'mr-2'} />
                  {t.download}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Printer size={16} className={isArabic ? 'ml-2' : 'mr-2'} />
                  {t.print}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 size={16} className={isArabic ? 'ml-2' : 'mr-2'} />
                  {t.share}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component
function InfoRow({ icon, label, value, isArabic }: any) {
  return (
    <div className="pb-4 border-b last:border-b-0" style={{ borderColor: 'var(--color-border-light)' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-500">{icon}</span>
        <span
          className="text-gray-600"
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {label}
        </span>
      </div>
      <p
        className="text-gray-900"
        style={{
          fontSize: 'var(--font-size-base)',
          fontWeight: 'var(--font-weight-medium)',
        }}
      >
        {value}
      </p>
    </div>
  );
}
