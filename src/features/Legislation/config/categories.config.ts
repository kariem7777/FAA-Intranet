import supremeCommitteeLogo from '@/assets/af3e071a6a8b66cf73e762bb897b0e610d356bc8.png';
import uaeEmblem from '@/assets/701a7d3c9c576696f780f7772f55ccf9815b3eff.png';
import abuDhabiEmblem from '@/assets/da83a1f9595c96aa1d1df07d9f37929756542560.png';
import faaLogo from '@/assets/4812dbedd5625a00002351e6181ae7dad0c3037e.png';
import entityScalesIcon from '@/assets/b72751a84f5670c85d2329e369f98785e55073a8.png';
import faaLegalOpinionsIcon from '@/assets/eadd8ca5997068aec53c80e00b8b2662b44b6552.png';

export interface LegislationCategory {
  id: number;
  titleKey: string;
  subtitleKey: string;
  customImage: string;
  iconBgColor: string;
  stripColor: string;
}

export const LEGISLATION_CATEGORIES: LegislationCategory[] = [
  {
    id: 1,
    titleKey: 'legislation.categories.entityLegislation.title',
    subtitleKey: 'legislation.categories.entityLegislation.subtitle',
    customImage: entityScalesIcon,
    iconBgColor: '#2C3E5B',
    stripColor: '#2C3E5B',
  },
  {
    id: 2,
    titleKey: 'legislation.categories.federalLegislation.title',
    subtitleKey: 'legislation.categories.federalLegislation.subtitle',
    customImage: uaeEmblem,
    iconBgColor: '#C9A049',
    stripColor: '#C9A049',
  },
  {
    id: 3,
    titleKey: 'legislation.categories.localLegislation.title',
    subtitleKey: 'legislation.categories.localLegislation.subtitle',
    customImage: abuDhabiEmblem,
    iconBgColor: '#0A7544',
    stripColor: '#0A7544',
  },
  {
    id: 4,
    titleKey: 'legislation.categories.supremeCommittee.title',
    subtitleKey: 'legislation.categories.supremeCommittee.subtitle',
    customImage: supremeCommitteeLogo,
    iconBgColor: '#C9253B',
    stripColor: '#C9253B',
  },
  {
    id: 5,
    titleKey: 'legislation.categories.faaLegalOpinions.title',
    subtitleKey: 'legislation.categories.faaLegalOpinions.subtitle',
    customImage: faaLegalOpinionsIcon,
    iconBgColor: '#1F3A8A',
    stripColor: '#1F3A8A',
  },
  {
    id: 6,
    titleKey: 'legislation.categories.faaLegislation.title',
    subtitleKey: 'legislation.categories.faaLegislation.subtitle',
    customImage: faaLogo,
    iconBgColor: '#8B2C2E',
    stripColor: '#8B2C2E',
  },
];
