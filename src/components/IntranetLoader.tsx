import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';
import faaLogo from 'figma:asset/a5ddb65a14d35992c9db64b833b8ead7d6060dbb.png';
import imgImageFinancialAuditAuthority from "figma:asset/e2cb68d504b659d40535c18e986fce5d5ed9ca82.png";

interface IntranetLoaderProps {
  onLoadComplete: () => void;
}

export function IntranetLoader({ onLoadComplete }: IntranetLoaderProps) {
  const [progress, setProgress] = useState(0);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadComplete();
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[300]"
      style={{ backgroundColor: '#064368' }}
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
        <h2 
          className={`text-white mb-2 ${isArabic ? 'font-[Dubai]' : ''}`}
          style={{ fontSize: '24px', fontWeight: '600' }}
        >
          {isArabic ? 'العودة إلى الشبكة الداخلية' : 'Returning to Intranet'}
        </h2>
        <p 
          className={`text-white/80 mb-8 ${isArabic ? 'font-[Dubai]' : ''}`}
          style={{ fontSize: '15px' }}
        >
          {isArabic ? 'جارٍ التحميل...' : 'Loading...'}
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={`mt-2 text-white/60 text-sm ${isArabic ? 'font-[Dubai]' : ''}`}>
            {progress}%
          </div>
        </div>

        {/* Subtext */}
        <p 
          className={`mt-8 text-white/60 text-xs ${isArabic ? 'font-[Dubai]' : ''}`}
        >
          {isArabic ? 'هيئة التدقيق المالي - دبي' : 'Financial Audit Authority - Dubai'}
        </p>
      </div>
    </div>
  );
}