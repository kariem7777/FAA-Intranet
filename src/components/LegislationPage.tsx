import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { LegislationCategoryPage } from './LegislationCategoryPage';
import { LegislationDocumentViewer } from './LegislationDocumentViewer';
import { LegalOpinionDetailPage } from './LegalOpinionDetailPage';
import { LegislationBanner } from './LegislationBanner';
import { ImportantNoticeModal } from './ImportantNoticeModal';
import { LegalOpinionsPage } from './LegalOpinionsPage';
import { LegislationDocumentsPage } from './LegislationDocumentsPage';
import { FileText, Scale, BookOpen, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import supremeCommitteeLogo from 'figma:asset/af3e071a6a8b66cf73e762bb897b0e610d356bc8.png';
import uaeEmblem from 'figma:asset/701a7d3c9c576696f780f7772f55ccf9815b3eff.png';
import abuDhabiEmblem from 'figma:asset/da83a1f9595c96aa1d1df07d9f37929756542560.png';
import faaLogo from 'figma:asset/4812dbedd5625a00002351e6181ae7dad0c3037e.png';
import entityScalesIcon from 'figma:asset/b72751a84f5670c85d2329e369f98785e55073a8.png';
import faaLegalOpinionsIcon from 'figma:asset/eadd8ca5997068aec53c80e00b8b2662b44b6552.png';

interface LegislationPageProps {
  fontSizeMultiplier?: number;
  userRole?: 'admin' | 'user';
}

export function LegislationPage({ fontSizeMultiplier, userRole = 'admin' }: LegislationPageProps = {}) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedOpinion, setSelectedOpinion] = useState<any | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showNoticeCard, setShowNoticeCard] = useState(false);

  // Show modal on page load
  useEffect(() => {
    setShowNoticeModal(true);
  }, []);

  // Animate the important notice card after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoticeCard(true);
    }, 400); // Delay before animation starts
    
    return () => clearTimeout(timer);
  }, []);

  // If viewing opinion detail, show the detail page
  if (selectedOpinion) {
    return (
      <LegalOpinionDetailPage
        opinion={selectedOpinion}
        onBack={() => setSelectedOpinion(null)}
        userRole={userRole}
        fontSizeMultiplier={fontSizeMultiplier}
        onReply={(opinionId, replyText) => {
          // Handle reply - update opinion with reply
          console.log('Reply to opinion:', opinionId, replyText);
          setSelectedOpinion(null);
        }}
      />
    );
  }

  // If viewing a document, show document viewer
  if (selectedDocument) {
    return (
      <LegislationDocumentViewer
        document={selectedDocument}
        onBack={() => setSelectedDocument(null)}
        fontSizeMultiplier={fontSizeMultiplier}
      />
    );
  }

  // If a category is selected, show the appropriate page
  if (selectedCategoryId) {
    // Show LegalOpinionsPage for category 5 (FAA Legal Opinions)
    if (selectedCategoryId === 5) {
      return (
        <LegalOpinionsPage 
          onBack={() => setSelectedCategoryId(null)}
          userRole={userRole}
          onOpinionSelect={(opinion) => setSelectedOpinion(opinion)}
          fontSizeMultiplier={fontSizeMultiplier}
        />
      );
    }
    
    // Show LegislationDocumentsPage for all other categories
    return (
      <LegislationDocumentsPage 
        categoryId={selectedCategoryId} 
        onBack={() => setSelectedCategoryId(null)}
        onViewDocument={(doc) => setSelectedDocument(doc)}
        fontSizeMultiplier={fontSizeMultiplier}
      />
    );
  }

  const legislationCategories = [
    {
      id: 1,
      title: isArabic ? "تشريعات الجهات الخاضعة" : "Entity's Legislation",
      subtitle: isArabic ? "القوانين والأنظمة الداخلية الخاصة بالجهة" : "Internal laws and regulations specific to the entity",
      customImage: entityScalesIcon,
      iconBgColor: '#2C3E5B',
      stripColor: '#2C3E5B',
    },
    {
      id: 2,
      title: isArabic ? 'التشريعات الاتحادية' : 'Federal Legislation',
      subtitle: isArabic ? "القوانين الاتحادية والمراسيم الصادرة عن الحكومة الاتحادية" : "Federal laws and decrees issued by the federal government",
      customImage: uaeEmblem,
      iconBgColor: '#C9A049',
      stripColor: '#C9A049',
    },
    {
      id: 3,
      title: isArabic ? 'التشريعات المحلية' : 'Local Legislation',
      subtitle: isArabic ? "القوانين والتشريعات المحلية لإمارة دبي" : "Local laws and legislation for the Emirate of Dubai",
      customImage: abuDhabiEmblem,
      iconBgColor: '#0A7544',
      stripColor: '#0A7544',
    },
    {
      id: 4,
      title: isArabic ? 'فتاوى اللجنة العليا للتشريعات' : "Supreme Committee's Legal Opinion",
      subtitle: isArabic ? "الآراء والتوجيهات القانونية الصادرة عن اللجنة العليا" : "Legal opinions and guidance issued by the Supreme Committee",
      customImage: supremeCommitteeLogo,
      iconBgColor: '#C9253B',
      stripColor: '#C9253B',
    },
    {
      id: 5,
      title: isArabic ? 'الآراء القانونية للجهاز' : 'FAA Legal Opinions',
      subtitle: isArabic ? "الآراء القانونية والاستشارات الصادرة عن الهيئة" : "Legal opinions and consultations issued by the Authority",
      customImage: faaLegalOpinionsIcon,
      iconBgColor: '#1F3A8A',
      stripColor: '#1F3A8A',
    },
    {
      id: 6,
      title: isArabic ? 'تشريعات الجهاز' : "FAA's Legislation",
      subtitle: isArabic ? "التشريعات والقرارات الخاصة بهيئة التدقيق المالي" : "Legislation and decisions specific to the Financial Audit Authority",
      customImage: faaLogo,
      iconBgColor: '#8B2C2E',
      stripColor: '#8B2C2E',
    },
  ];

  const content = {
    en: {
      sectionTitle: 'Legislations',
      sectionDesc: 'Browse through organized collections of legal documents, regulations, and official opinions. Each category is authenticated and regularly updated to ensure accuracy.',
      noticeTitle: 'Important Notice',
      notice1: 'It is strictly prohibited to copy any content, transfer or capture any information or data from this platform.',
      notice2: 'Access is only permitted for authorized users.',
      notice3: 'We highly appreciate your understanding and adherence to these guidelines.',
      accessLabel: 'Access',
      documentsLabel: 'documents',
    },
    ar: {
      sectionTitle: 'التشريعات',
      sectionDesc: 'تصفح من خلال مجموعات منظمة من الوثائق القانونية واللوائح والآراء الرسمية. كل فئة موثقة ومحدثة بانتظام لضمان الدقة.',
      noticeTitle: 'إشعار هام',
      notice1: 'يُمنع منعاً باتاً نسخ أي محتوى أو نقل أو التقاط أي معلومات أو بيانات من هذه المنصة.',
      notice2: 'الوصول مسموح فقط للمستخدمين المصرح لهم.',
      notice3: 'نحن نقدر بشدة تفهمكم والتزامكم بهذه الإرشادات.',
      accessLabel: 'الوصول إلى',
      documentsLabel: 'الوثائق',
    },
  };

  const t = content[language];

  // Stats data for overlapping cards
  const legislationStats = [
    { icon: FileText, label: isArabic ? 'إجمالي الوثائق' : 'Total Documents', value: '1,248', change: '+42', color: 'text-[#2C3E5B]' },
    { icon: Scale, label: isArabic ? 'الفئات' : 'Categories', value: '6', change: '100%', color: 'text-[#C9A049]' },
    { icon: BookOpen, label: isArabic ? 'التحديثات الأخيرة' : 'Recent Updates', value: '89', change: '+12', color: 'text-[#0A7544]' },
    { icon: Shield, label: isArabic ? 'الآراء النشطة' : 'Active Opinions', value: '156', change: '+8', color: 'text-[#8B2C2E]' },
  ];

  return (
    <div className="min-h-screen bg-[#FEFEFE] mt-[140px]" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <div className=" relative">
        <LegislationBanner />
      </div>

      {/* Main Content Area */}
      <div className="px-20 pt-10 pb-8 space-y-8">
        {/* Card Grid - 3×2 Layout matching Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {legislationCategories.map((category, index) => {
            // First row has shorter cards, second row has taller cards
            const isSecondRow = category.id >= 4;
            const cardHeight = isSecondRow ? 'h-[277.563px]' : 'h-[242.375px]';
            
            return (
              <motion.div
                key={category.id}
                className="group relative cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label={`${t.accessLabel} ${category.title}`}
                onClick={() => setSelectedCategoryId(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                {/* Card with enhanced hover effects */}
               <div 
  className={`relative bg-white rounded-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden ${isArabic ? 'h-[242.375px]' : cardHeight }  transition-all duration-300 ease-out
    hover:shadow-[0_8px_20px_rgba(0,0,0,0.12),0_16px_40px_rgba(0,0,0,0.08)] 
    hover:-translate-y-1 
    hover:scale-[1.03]
    active:scale-[0.99]
    group`}
>
  {/* Color Strip - RTL aware */}
  <div 
    className={`absolute ${isArabic ? 'right-0' : 'left-0'} top-0 bottom-0 w-[4px] transition-all duration-300 group-hover:w-[7px]`}
    style={{
      backgroundColor: category.stripColor
    }}
  ></div>

  {/* Background subtle highlight */}
  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300"
       style={{ backgroundColor: '#f5f7fa' }}>
  </div>

  {/* Card Content */}
  <div className="px-6 py-6 flex flex-col items-center justify-start h-full relative z-10">
    
    {/* Icon/Emblem */}
    <div className="flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 h-20">
      <img 
        src={category.customImage} 
        alt={`${category.title} emblem`}
        className={`object-contain opacity-90 transition-all duration-300 group-hover:opacity-100  ${
          category.id === 4 ? 'max-w-[140px] max-h-[90px]' : 'max-w-[72px] max-h-[72px]'
        }`}
      />
    </div>

    {/* Title */}
    <h3
      className="text-[22px] text-[#1d293d] mb-3 leading-[1.6] text-center transition-colors duration-300 group-hover:text-[#0b1a2b]"
      style={{ 
        fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif', 
        fontWeight: 600,
        letterSpacing: '-0.01em'
      }}
    >
      {category.title}
    </h3>

    {/* Subtitle */}
    <p 
      className="text-[16px] text-[#62748e] leading-[1.6] text-center transition-colors duration-300 group-hover:text-[#374151]"
      style={{ 
        fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
        fontWeight: 400
      }}
    >
      {category.subtitle}
    </p>
  </div>
</div>


              </motion.div>
            );
          })}
        </div>

        {/* Important Notice matching Figma design */}
        <div className={`relative rounded-[24px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] p-8 mb-20 overflow-hidden ${showNoticeCard ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Color Strip - RTL aware */}
          <div 
            className={`absolute ${isArabic ? 'right-0' : 'left-0'} top-0 bottom-0 w-[4px]`}
            style={{ backgroundColor: '#e7000b' }}
          ></div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fef2f2] flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-[#e7000b]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#0f172b] text-[22px] mb-4" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif', fontWeight: 700 }}>
                {t.noticeTitle}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#45556c] text-[14px] mt-0.5">
                    1
                  </span>
                  <span className="flex-1 text-[#314158] text-[16px] leading-[1.625]" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                    {t.notice1}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#45556c] text-[14px] mt-0.5">
                    2
                  </span>
                  <span className="flex-1 text-[#314158] text-[16px] leading-[1.625]" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                    {t.notice2}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#45556c] text-[14px] mt-0.5">
                    3
                  </span>
                  <span className="flex-1 text-[#314158] text-[16px] leading-[1.625]" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                    {t.notice3}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice Modal */}
      <ImportantNoticeModal
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
      />
    </div>
  );
}