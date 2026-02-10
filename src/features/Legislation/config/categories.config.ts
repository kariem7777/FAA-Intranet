import supremeCommitteeLogo from '@/assets/af3e071a6a8b66cf73e762bb897b0e610d356bc8.png';
import uaeEmblem from '@/assets/701a7d3c9c576696f780f7772f55ccf9815b3eff.png';
import abuDhabiEmblem from '@/assets/da83a1f9595c96aa1d1df07d9f37929756542560.png';
import faaLogo from '@/assets/4812dbedd5625a00002351e6181ae7dad0c3037e.png';
import entityScalesIcon from '@/assets/b72751a84f5670c85d2329e369f98785e55073a8.png';
import faaLegalOpinionsIcon from '@/assets/eadd8ca5997068aec53c80e00b8b2662b44b6552.png';
import type { LawCategory } from '../types';


export const LEGISLATION_CATEGORIES: LawCategory[] = [
  {
    id: 1,
    lawCategoryEn: 'Entity Legislation',
    lawCategoryAr: 'تشريعات الجهة',
    descriptionEn: 'Laws and regulations specific to the entity',
    descriptionAr: 'القوانين واللوائح الخاصة بالجهة',
    color: '#2C3E5B',
    imagePath: entityScalesIcon,
    isActive: true,
  },
  {
    id: 2,
    lawCategoryEn: 'Federal Legislation',
    lawCategoryAr: 'التشريعات الاتحادية',
    descriptionEn: 'Federal laws and regulations of the UAE',
    descriptionAr: 'القوانين واللوائح الاتحادية لدولة الإمارات',
    color: '#C9A049',
    imagePath: uaeEmblem,
    isActive: true,
  },
  {
    id: 3,
    lawCategoryEn: 'Local Legislation',
    lawCategoryAr: 'التشريعات المحلية',
    descriptionEn: 'Local laws and regulations of Abu Dhabi',
    descriptionAr: 'القوانين واللوائح المحلية لإمارة أبوظبي',
    color: '#0A7544',
    imagePath: abuDhabiEmblem,
    isActive: true,
  },
  {
    id: 4,
    lawCategoryEn: 'Supreme Committee',
    lawCategoryAr: 'اللجنة العليا',
    descriptionEn: 'Decisions and regulations from the Supreme Committee',
    descriptionAr: 'قرارات ولوائح اللجنة العليا',
    color: '#C9253B',
    imagePath: supremeCommitteeLogo,
    isActive: true,
  },
  {
    id: 5,
    lawCategoryEn: 'FAA Legal Opinions',
    lawCategoryAr: 'الآراء القانونية للهيئة',
    descriptionEn: 'Legal opinions issued by the Financial Audit Authority',
    descriptionAr: 'الآراء القانونية الصادرة عن هيئة التدقيق المالي',
    color: '#1F3A8A',
    imagePath: faaLegalOpinionsIcon,
    isActive: true,
  },
  {
    id: 6,
    lawCategoryEn: 'FAA Legislation',
    lawCategoryAr: 'تشريعات الهيئة',
    descriptionEn: 'Laws and regulations of the Financial Audit Authority',
    descriptionAr: 'قوانين ولوائح هيئة التدقيق المالي',
    color: '#8B2C2E',
    imagePath: faaLogo,
    isActive: true,
  },
];
