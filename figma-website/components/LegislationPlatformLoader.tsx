import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';
import imgImageFinancialAuditAuthority from "figma:asset/e2cb68d504b659d40535c18e986fce5d5ed9ca82.png";

interface LegislationPlatformLoaderProps {
  onLoadComplete: () => void;
}

export function LegislationPlatformLoader({ onLoadComplete }: LegislationPlatformLoaderProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadComplete(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  const content = {
    en: {
      loading: 'Loading FAA Legal Platform',
      redirecting: 'You are being redirected to the legislation system',
      pleaseWait: 'Please wait...',
    },
    ar: {
      loading: 'جاري تحميل منصة التشريعات القانونية',
      redirecting: 'جاري تحويلك إلى نظام التشريعات',
      pleaseWait: 'يرجى الانتظار...',
    },
  };

  const t = content[language];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#0F2A44' }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="text-center max-w-2xl px-8">
        {/* FAA Logo */}
        <div className="mb-12 flex justify-center">
          <div 
            className="w-[280px] h-[120px] rounded-2xl p-8 flex items-center justify-center animate-pulse"
            style={{ backgroundColor: '#C9A24D' }}
          >
            <img 
              src={imgImageFinancialAuditAuthority} 
              alt={isArabic ? 'هيئة التدقيق المالي' : 'Financial Audit Authority'}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Loading Text */}
        <h1 
          className="mb-4"
          style={{
            fontFamily: 'Dubai, Arial, sans-serif',
            fontSize: '36px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px'
          }}
        >
          {t.loading}
        </h1>
        
        <p 
          style={{
            fontFamily: 'Dubai, Arial, sans-serif',
            fontSize: '20px',
            fontWeight: 400,
            color: '#C9A24D',
            marginBottom: '48px'
          }}
        >
          {t.redirecting}
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(201, 162, 77, 0.2)' }}
          >
            <div 
              className="h-full transition-all duration-300 ease-out rounded-full"
              style={{ 
                width: `${progress}%`,
                backgroundColor: '#C9A24D'
              }}
            />
          </div>
          <p 
            className="mt-4"
            style={{
              fontFamily: 'Dubai, Arial, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            {progress}% - {t.pleaseWait}
          </p>
        </div>
      </div>
    </div>
  );
}