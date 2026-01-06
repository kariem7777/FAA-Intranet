import { ArrowLeft, ArrowRight, AlertCircle, Home, ChevronRight as BreadcrumbArrow } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { useState } from 'react';
import { CategoryDetailPage } from './CategoryDetailPageRedesigned';
import svgPaths from "../imports/svg-ut2he6x6pe";
import imgEntitysLegislation from "figma:asset/b72751a84f5670c85d2329e369f98785e55073a8.png";
import imgFederalLegislation from "figma:asset/701a7d3c9c576696f780f7772f55ccf9815b3eff.png";
import imgLocalLegislation from "figma:asset/da83a1f9595c96aa1d1df07d9f37929756542560.png";
import imgSupremeCommittee from "figma:asset/af3e071a6a8b66cf73e762bb897b0e610d356bc8.png";
import imgFaaLegalOpinions from "figma:asset/eadd8ca5997068aec53c80e00b8b2662b44b6552.png";
import imgFaaLegislation from "figma:asset/4812dbedd5625a00002351e6181ae7dad0c3037e.png";

interface LegislativeCategoriesPageProps {
  onBack?: () => void;
  onCategorySelect?: (categoryId: number) => void;
}

export function LegislativeCategoriesPage({ onBack, onCategorySelect }: LegislativeCategoriesPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Legislation platform color palette
  const colors = {
    primary: '#0F2A44',      // Deep Navy
    accent: '#C9A24D',       // Muted Gold
    bgOffWhite: '#F7F8FA',   // Off-White
    textPrimary: '#1A1A1A',  // Primary Text
    textSecondary: '#5A5A5A', // Secondary Text
  };

  // If a category is selected, show the detail page
  if (selectedCategoryId) {
    return (
      <CategoryDetailPage 
        categoryId={selectedCategoryId} 
        onBack={() => setSelectedCategoryId(null)} 
      />
    );
  }

  // Translations
  const t = {
    pageTitle: isArabic ? 'الفئات التشريعية' : 'Legislative Categories',
    pageDescription: isArabic 
      ? 'تصفح مجموعات منظمة من الوثائق القانونية واللوائح والآراء الرسمية. كل فئة موثقة ومحدثة بانتظام لضمان الدقة.'
      : 'Browse through organized collections of legal documents, regulations, and official opinions. Each category is authenticated and regularly updated to ensure accuracy.',
    home: isArabic ? 'الرئيسية' : 'Home',
    legislation: isArabic ? 'التشريعات' : 'Legislation',
    back: isArabic ? 'رجوع' : 'Back',
    importantNotice: isArabic ? 'إشعار هام' : 'Important Notice',
    noticeItems: isArabic ? [
      'يُمنع منعاً باتاً نسخ أو نقل أو التقاط أي معلومات أو بيانات من هذه المنصة.',
      'الوصول مسموح به فقط للمستخدمين المصرح لهم.',
      'نقدر تفهمكم والتزامكم بهذه الإرشادات.'
    ] : [
      'It is strictly prohibited to copy any content, transfer or capture any information or data from this platform.',
      'Access is only permitted for authorized users.',
      'We highly appreciate your understanding and adherence to these guidelines.'
    ],
    categories: {
      entity: {
        title: isArabic ? 'تشريعات الجهة' : "Entity's Legislation",
        description: isArabic ? 'عرض جميع القوانين الحاكمة للجهة' : 'View all governing laws for your entity',
      },
      federal: {
        title: isArabic ? 'التشريعات الاتحادية' : 'Federal Legislation',
        description: isArabic ? 'الوصول إلى القوانين واللوائح الاتحادية على مستوى الدولة' : 'Access UAE-wide federal laws and regulations',
      },
      local: {
        title: isArabic ? 'التشريعات المحلية' : 'Local Legislation',
        description: isArabic ? 'تصفح القواعد والتوجيهات على مستوى الإمارة' : 'Browse emirate-level rules and directives',
      },
      supreme: {
        title: isArabic ? 'الرأي القانوني للجنة العليا' : "Supreme Committee's Legal Opinion",
        description: isArabic ? 'قراءة التفسيرات الرسمية من اللجنة العليا' : 'Read official interpretations from the Supreme Committee',
      },
      faaOpinions: {
        title: isArabic ? 'الآراء القانونية للجهاز' : 'FAA Legal Opinions',
        description: isArabic ? 'استكشاف التوجيهات القانونية الصادرة عن الجهاز' : 'Explore FAA-issued legal guidance',
      },
      faaLegislation: {
        title: isArabic ? 'تشريعات الجهاز' : "FAA's Legislation",
        description: isArabic ? 'البحث عن جميع القوانين والتفويضات التي تحكم الجهاز' : 'Find all laws and mandates governing the FAA',
      },
    },
  };

  const categories = [
    {
      id: 1,
      title: t.categories.entity.title,
      description: t.categories.entity.description,
      image: imgEntitysLegislation,
      bgColor: 'rgba(25,73,154,0.08)',
    },
    {
      id: 2,
      title: t.categories.federal.title,
      description: t.categories.federal.description,
      image: imgFederalLegislation,
      bgColor: 'rgba(201,176,79,0.1)',
    },
    {
      id: 3,
      title: t.categories.local.title,
      description: t.categories.local.description,
      image: imgLocalLegislation,
      bgColor: 'rgba(6,103,52,0.1)',
    },
    {
      id: 4,
      title: t.categories.supreme.title,
      description: t.categories.supreme.description,
      image: imgSupremeCommittee,
      bgColor: 'rgba(228,4,46,0.1)',
    },
    {
      id: 5,
      title: t.categories.faaOpinions.title,
      description: t.categories.faaOpinions.description,
      image: imgFaaLegalOpinions,
      bgColor: 'rgba(32,38,120,0.1)',
    },
    {
      id: 6,
      title: t.categories.faaLegislation.title,
      description: t.categories.faaLegislation.description,
      image: imgFaaLegislation,
      bgColor: 'rgba(166,43,45,0.1)',
    },
  ];

  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: colors.bgOffWhite }} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-20 py-12">
        {/* Page Title and Description */}
        <div className="text-center mb-12">
          <h1 
            className="mb-4"
            style={{ 
              fontFamily: 'Dubai, Arial, sans-serif',
              fontWeight: 700,
              fontSize: '36px',
              color: colors.textPrimary
            }}
          >
            {t.pageTitle}
          </h1>
          <p 
            className="max-w-3xl mx-auto leading-relaxed"
            style={{ 
              fontFamily: 'Dubai, Arial, sans-serif',
              fontSize: '18px',
              color: colors.textSecondary
            }}
          >
            {t.pageDescription}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className="group bg-white border-2 rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-xl hover:scale-105 min-h-[216px] flex flex-col"
              style={{
                fontFamily: 'Dubai, Arial, sans-serif',
                borderColor: '#E5E7EB'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8F5EF';
                e.currentTarget.style.borderColor = colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              {/* Icon Container */}
              <div 
                className="w-[89px] h-[89px] rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: category.bgColor }}
              >
                <img 
                  src={category.image} 
                  alt={category.title}
                  className={category.id === 4 ? "w-[75px] h-[75px] object-contain" : "w-[58px] h-[58px] object-contain"}
                />
              </div>

              {/* Title, Description, and Arrow in flex container */}
              <div className="flex items-center justify-between gap-4 flex-1">
                <div className="flex-1">
                  {/* Title */}
                  <h3 
                    className="mb-2"
                    style={{ 
                      fontFamily: 'Dubai, Arial, sans-serif',
                      textAlign: isArabic ? 'right' : 'left',
                      fontWeight: 600,
                      fontSize: '20px',
                      lineHeight: '1.4',
                      color: colors.textPrimary
                    }}
                  >
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p 
                    style={{ 
                      fontFamily: 'Dubai, Arial, sans-serif',
                      textAlign: isArabic ? 'right' : 'left',
                      fontSize: '16px',
                      lineHeight: '1.5',
                      color: colors.textSecondary
                    }}
                  >
                    {category.description}
                  </p>
                </div>

                {/* Arrow Button */}
                <div className="flex-shrink-0 self-center">
                  <div 
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all"
                    style={{
                      borderColor: colors.accent,
                      backgroundColor: `${colors.accent}15`
                    }}
                  >
                    {isArabic ? (
                      <ArrowLeft className="h-5 w-5" style={{ color: colors.accent }} />
                    ) : (
                      <ArrowRight className="h-5 w-5" style={{ color: colors.accent }} />
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Important Notice */}
        <div 
          className="rounded-2xl p-8 border-2"
          style={{ 
            backgroundColor: `${colors.primary}08`,
            borderColor: `${colors.primary}30`
          }}
        >
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
            <h3 
              style={{ 
                fontFamily: 'Dubai, Arial, sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                color: colors.primary
              }}
            >
              {t.importantNotice}
            </h3>
          </div>
          <ul className={`space-y-2 ${isArabic ? 'pr-9' : 'pl-9'}`}>
            {t.noticeItems.map((item, index) => (
              <li 
                key={index}
                className="relative"
                style={{ 
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: colors.textSecondary
                }}
              >
                <span className={`absolute ${isArabic ? 'right-0' : 'left-0'} ${isArabic ? '-mr-5' : '-ml-5'}`}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}