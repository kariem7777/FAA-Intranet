import imgImage from "figma:asset/14a7bedb16f5751eddf0fc794da9e33a1599152b.png";
import { useLanguage } from './LanguageContext';

interface HeroBannerProps {
  title?: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
}

export function HeroBanner({ title, description }: HeroBannerProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const defaultTranslations = {
    en: {
      heading: 'Financial Audit Authority Intranet Welcomes You',
      description: 'Welcome to the Financial Audit Authority Intranet, your central hub for resources, updates, and tools to support our mission of ensuring financial integrity and accountability.',
    },
    ar: {
      heading: 'هيئة التدقيق المالي ترحب بكم',
      description: 'مرحبًا بكم في الشبكة الداخلية لهيئة التدقيق المالي، المركز المركزي للموارد والتحديثات والأدوات لدعم مهمتنا المتمثلة في ضمان النزاهة المالية والمساءلة.',
    },
  };

  const heading = title ? title[language] : defaultTranslations[language].heading;
  const desc = description ? description[language] : defaultTranslations[language].description;

  return (
    <div 
      className="overflow-clip relative rounded-[16.4px] w-full h-[280px]"
      style={{
        fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif'
      }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background Image */}
      <div className="absolute h-full left-0 top-0 w-full">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            alt="" 
            className="absolute h-full left-0 max-w-none top-0 w-full object-cover bg-center object-top" 
            src={imgImage} 
          />
        </div>
      </div>

     {/* Light Overlay + Content (height fits content, centered vertically) */}
<div
  className="absolute left-0 top-1/2 w-full -translate-y-1/2 flex justify-center"
>
  {/* Light Tint Overlay (auto height) */}
  <div className="py-[40px] w-full flex justify-center">
    
    {/* Content Container */}
    <div
      className={`bg-[rgba(81,58,64,0.72)] flex flex-col items-start px-[20px] pt-[20px] rounded-[10px] ${
        isArabic ? 'text-right' : 'text-left'
      }`}
      style={{
        width: 'min(957px, calc(100% - 424px))',
      }}
    >
      <div className="flex flex-col gap-[22px] w-full">
        {/* Heading */}
        <h2
          className="leading-[28px] text-[24px] text-white"
          style={{ fontWeight: 500 }}
        >
          {heading}
        </h2>

        {/* Description */}
        <p
          className="leading-[25.6px] text-[18px] text-white pb-5"
          style={{ fontWeight: 400 }}
        >
          {desc}
        </p>
      </div>
    </div>

  </div>
</div>

    </div>
  );
}