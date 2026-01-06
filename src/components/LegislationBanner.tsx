import { useLanguage } from './LanguageContext';
import { Scale } from 'lucide-react';

interface LegislationBannerProps {
  title?: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
}

export function LegislationBanner({ title, description }: LegislationBannerProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const defaultTitle = {
    en: 'Legislations',
    ar: 'التشريعات',
  };

  const defaultDescription = {
    en: 'An official collection of laws, regulations, and legal documents, organized and regularly updated to ensure accuracy and transparency.',
    ar: 'مجموعة معتمدة من القوانين واللوائح والوثائق الرسمية، منظمة ومحدثة لضمان الشفافية والدقة.',
  };

  const displayTitle = title || defaultTitle;
  const displayDescription = description || defaultDescription;

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="relative w-full h-[160px] mt-[143px] overflow-hidden"
    >
      {/* Brighter animated gradient */}
      <div className="absolute inset-0 animated-bg" />

      {/* Moving architectural grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Light sweep */}
      <div className="absolute inset-0 light-sweep pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex items-center px-20">
        <div className="flex items-start gap-6 max-w-[1100px]">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-white/15">
            <Scale className="w-7 h-7 text-[#C9A24D]" strokeWidth={1.7} />
          </div>

          <div>
            <h1 className="text-[38px] font-bold text-white mb-2 font-dubai">
              {isArabic ? displayTitle.ar : displayTitle.en}
            </h1>

            <p className="text-[17px] leading-[1.7] text-[#F0E3B8] max-w-[760px] font-dubai">
              {isArabic ? displayDescription.ar : displayDescription.en}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gold accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C9A24D]" />

      {/* Styles */}
      <style>{`
        /* Brighter navy gradient */
        .animated-bg {
          background: linear-gradient(
            120deg,
            #3F6993,
            #2a4d73,
            #3F6993
          );
          background-size: 200% 200%;
          animation: gradientMove 18s ease-in-out infinite;
        }

        /* Institutional grid motion */
        .grid-overlay {
          background-image: 
            linear-gradient(
              135deg,
              rgba(201, 162, 77, 0.08) 1px,
              transparent 1px
            );
          background-size: 64px 64px;
          animation: gridMove 42s linear infinite;
          opacity: 0.35;
        }

        /* Light sweep */
        .light-sweep::before {
          content: '';
          position: absolute;
          top: 0;
          left: -60%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.12),
            transparent
          );
          animation: sweep 10s ease-in-out infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 260px 260px; }
        }

        @keyframes sweep {
          0% { transform: translateX(0); }
          100% { transform: translateX(220%); }
        }
      `}</style>
    </div>
  );
}