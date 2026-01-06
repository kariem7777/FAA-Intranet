import React from 'react';
import { CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export type StatusType = 'active' | 'amended' | 'cancelled' | 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ status, size = 'md', className = '' }: StatusBadgeProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Define sizeMap FIRST before using it
  const sizeMap = {
    sm: {
      padding: '4px 8px',
      fontSize: 'var(--font-size-xs)',
      height: 'var(--badge-height-sm)',
      icon: 12,
      gap: '4px',
    },
    md: {
      padding: '6px 12px',
      fontSize: 'var(--font-size-sm)',
      height: 'var(--badge-height-md)',
      icon: 14,
      gap: '6px',
    },
    lg: {
      padding: '8px 16px',
      fontSize: 'var(--font-size-base)',
      height: 'var(--badge-height-lg)',
      icon: 16,
      gap: '8px',
    },
  };

  const statusConfig: Record<StatusType, {
    labelEn: string;
    labelAr: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
  }> = {
    active: {
      labelEn: 'Active',
      labelAr: 'نافذة',
      icon: <CheckCircle size={sizeMap[size].icon} />,
      color: 'var(--color-status-success)',
      bgColor: 'var(--color-status-success-bg)',
    },
    amended: {
      labelEn: 'Amended',
      labelAr: 'معدلة',
      icon: <AlertCircle size={sizeMap[size].icon} />,
      color: 'var(--color-status-info)',
      bgColor: 'var(--color-status-info-bg)',
    },
    cancelled: {
      labelEn: 'Cancelled',
      labelAr: 'ملغاة',
      icon: <XCircle size={sizeMap[size].icon} />,
      color: 'var(--color-status-error)',
      bgColor: 'var(--color-status-error-bg)',
    },
    pending: {
      labelEn: 'Pending',
      labelAr: 'قيد المراجعة',
      icon: <Clock size={sizeMap[size].icon} />,
      color: 'var(--color-status-warning)',
      bgColor: 'var(--color-status-warning-bg)',
    },
    approved: {
      labelEn: 'Approved',
      labelAr: 'موافق عليه',
      icon: <CheckCircle size={sizeMap[size].icon} />,
      color: 'var(--color-status-success)',
      bgColor: 'var(--color-status-success-bg)',
    },
    rejected: {
      labelEn: 'Rejected',
      labelAr: 'مرفوض',
      icon: <XCircle size={sizeMap[size].icon} />,
      color: 'var(--color-status-error)',
      bgColor: 'var(--color-status-error-bg)',
    },
  };

  const config = statusConfig[status];
  const sizeConfig = sizeMap[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${className}`}
      style={{
        padding: sizeConfig.padding,
        fontSize: sizeConfig.fontSize,
        height: sizeConfig.height,
        gap: sizeConfig.gap,
        color: config.color,
        backgroundColor: config.bgColor,
        fontFamily: isArabic ? 'var(--font-family-ar)' : 'var(--font-family-en)',
        fontWeight: 'var(--font-weight-medium)',
      }}
    >
      {config.icon}
      <span>{isArabic ? config.labelAr : config.labelEn}</span>
    </span>
  );
}