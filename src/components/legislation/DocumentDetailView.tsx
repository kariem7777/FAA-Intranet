import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Download, FileText, Calendar, Building2, Clock, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

interface DocumentDetailViewProps {
  document: any;
  onBack: () => void;
  onEdit?: () => void;
  language: string;
}

export function DocumentDetailView({ document, onBack, onEdit, language }: DocumentDetailViewProps) {
  const isArabic = language === 'ar';

  const content = {
    en: {
      breadcrumbCategories: 'Legislative Categories',
      back: 'Back to List',
      download: 'Download PDF',
      viewNewPage: 'Open in New Page',
      documentInfo: 'Document Information',
      lawNumber: 'Law Number',
      issueDate: 'Issue Date',
      effectiveDate: 'Effective Date',
      issuingAuthority: 'Issuing Authority',
      gazette: 'Official Gazette',
      status: 'Status',
      description: 'Description',
      documentContent: 'Document Content',
      noPdf: 'PDF document will be displayed here',
    },
    ar: {
      breadcrumbCategories: 'الفئات التشريعية',
      back: 'العودة إلى القائمة',
      download: 'تحميل PDF',
      viewNewPage: 'فتح في صفحة جديدة',
      documentInfo: 'معلومات الوثيقة',
      lawNumber: 'رقم القانون',
      issueDate: 'تاريخ الإصدار',
      effectiveDate: 'تاريخ النفاذ',
      issuingAuthority: 'الجهة المصدرة',
      gazette: 'الجريدة الرسمية',
      status: 'الحالة',
      description: 'الوصف',
      documentContent: 'محتوى الوثيقة',
      noPdf: 'سيتم عرض مستند PDF هنا',
    },
  };

  const t = content[language as 'en' | 'ar'];

  // Helper component for info rows
  const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-start gap-3 py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
      <div className="text-gray-400 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-600 mb-1" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          {label}
        </p>
        <p className="text-gray-900" style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}>
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        backgroundColor: '#F5F5F5',
        fontFamily: isArabic ? 'var(--font-family-ar)' : 'var(--font-family-en)',
      }}
    >
      {/* Header - White Background, Professional */}
      <div
        className="border-b"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#D1D5DB',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          {/* Back to List Button */}
          <div className="mb-5">
            <Button
              variant="outline"
              onClick={onBack}
              className="h-10 px-5 border bg-white hover:bg-gray-50"
              style={{ 
                borderColor: '#D1D5DB',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              <ArrowLeft size={18} className={`${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {t.back}
            </Button>
          </div>

          {/* Document Title & Version */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
            <div className="flex-1">
              <h1
                className="text-gray-900 mb-3"
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  letterSpacing: '-0.025em',
                  lineHeight: '1.2',
                }}
              >
                {isArabic ? document.nameAr : document.nameEn}
              </h1>
              <div className="flex items-center gap-3">
                {/* Version Chip */}
                <span
                  className="px-3 py-1.5"
                  style={{
                    backgroundColor: '#7b282d',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  {isArabic ? `الإصدار ${(document.id % 3) + 1}.0` : `Version ${(document.id % 3) + 1}.0`}
                </span>
                {document.issueDate && (
                  <span className="text-gray-600 flex items-center gap-2" style={{ fontSize: 'var(--font-size-sm)' }}>
                    <Calendar size={16} />
                    {document.issueDate}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {onEdit && (
                <Button
                  onClick={onEdit}
                  variant="outline"
                  className="h-10 px-5 border bg-white hover:bg-gray-50"
                  style={{ 
                    borderColor: '#D1D5DB',
                    fontSize: 'var(--font-size-sm)',
                  }}
                >
                  {/* <Edit2 size={18} className={isArabic ? 'ml-2' : 'mr-2'} /> */}
                  {isArabic ? 'تعديل' : 'Edit'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content - 8 columns */}
          <div className="col-span-12 lg:col-span-8">
            {/* Document Content Viewer */}
            <div
              className="bg-white border"
              style={{
                borderColor: '#D1D5DB',
                borderRadius: '8px',
              }}
            >
              {/* Content Header */}
              <div
                className="px-6 py-4 border-b flex items-center justify-between"
                style={{
                  backgroundColor: '#F9FAFB',
                  borderColor: '#D1D5DB',
                }}
              >
                <h2
                  className="text-gray-900"
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  {t.documentContent}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 border bg-white hover:bg-gray-50 rounded-lg"
                    style={{ 
                      borderColor: '#D1D5DB',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    <Download size={16} className={isArabic ? 'ml-2' : 'mr-2'} />
                    {t.download}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 border bg-white hover:bg-gray-50 rounded-lg"
                    style={{ 
                      borderColor: '#D1D5DB',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    <ExternalLink size={16} className={isArabic ? 'ml-2' : 'mr-2'} />
                    {t.viewNewPage}
                  </Button>
                </div>
              </div>

              {/* PDF Viewer Container */}
              <div
                className="w-full bg-gray-100 flex items-center justify-center"
                style={{ minHeight: '800px' }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-white border rounded-lg" style={{ borderColor: '#D1D5DB' }}>
                    <FileText size={40} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-2" style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}>
                    {t.documentContent}
                  </p>
                  <p className="text-gray-500" style={{ fontSize: 'var(--font-size-sm)' }}>
                    {t.noPdf}
                  </p>
                  {/* In a real implementation, embed PDF viewer here */}
                  {/* <iframe src={document.pdfUrl} className="w-full h-full" /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 4 columns */}
          <div className="col-span-12 lg:col-span-4">
            {/* Document Information Card */}
            <div
              className="bg-white border"
              style={{
                borderColor: '#D1D5DB',
                borderRadius: '8px',
              }}
            >
              {/* Card Header */}
              <div
                className="px-5 py-4 border-b"
                style={{
                  backgroundColor: '#F9FAFB',
                  borderColor: '#D1D5DB',
                }}
              >
                <h3
                  className="text-gray-900"
                  style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  {t.documentInfo}
                </h3>
              </div>

              {/* Card Content */}
              <div className="px-5">
                {/* Description */}
                {document.description && (
                  <div className="py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                    <p className="text-gray-600 mb-2" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                      {t.description}
                    </p>
                    <p
                      className="text-gray-900"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        lineHeight: '1.6',
                      }}
                    >
                      {document.description}
                    </p>
                  </div>
                )}

                {/* Information Grid */}
                <div>
                  {/* Law Number */}
                  <InfoRow
                    icon={<FileText size={18} />}
                    label={t.lawNumber}
                    value={document.lawNumber}
                  />

                  {/* Issue Date */}
                  {document.issueDate && (
                    <InfoRow
                      icon={<Calendar size={18} />}
                      label={t.issueDate}
                      value={document.issueDate}
                    />
                  )}

                  {/* Effective Date */}
                  {document.effectiveDate && (
                    <InfoRow
                      icon={<Clock size={18} />}
                      label={t.effectiveDate}
                      value={document.effectiveDate}
                    />
                  )}

                  {/* Issuing Authority */}
                  {document.issuingAuthority && (
                    <InfoRow
                      icon={<Building2 size={18} />}
                      label={t.issuingAuthority}
                      value={document.issuingAuthority}
                    />
                  )}

                  {/* Gazette */}
                  {document.gazette && (
                    <InfoRow
                      icon={<FileText size={18} />}
                      label={t.gazette}
                      value={document.gazette}
                    />
                  )}

                  {/* Entity */}
                  {document.entity && (
                    <InfoRow
                      icon={<Building2 size={18} />}
                      label={isArabic ? 'الجهة' : 'Entity'}
                      value={document.entity}
                    />
                  )}

                  {/* Version */}
                  <div className="flex items-start gap-3 py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
                    <div className="text-gray-400 mt-0.5">
                      <FileText size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-600 mb-2" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        {isArabic ? 'الإصدار' : 'Version'}
                      </p>
                      <span
                        className="px-2.5 py-1 inline-block"
                        style={{
                          backgroundColor: '#7b282d',
                          color: 'white',
                          borderRadius: '8px',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                        }}
                      >
                        {isArabic ? `الإصدار ${(document.id % 3) + 1}.0` : `Version ${(document.id % 3) + 1}.0`}
                      </span>
                    </div>
                  </div>

                  {/* Year */}
                  <div className="flex items-start gap-3 py-3">
                    <div className="text-gray-400 mt-0.5">
                      <Calendar size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-600 mb-1" style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                        {isArabic ? 'السنة' : 'Year'}
                      </p>
                      <p className="text-gray-900" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}>
                        {document.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}