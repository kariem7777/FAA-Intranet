import { BaseApiService } from '@/shared/api/BaseApiService';
import type { PaginatedResponse, ApiResponse } from '@/shared/api/types';
import type { LegislationCategoryGroup, LegislationDocument, LegislationEntity } from '../types';

export class LegislationService extends BaseApiService {
  
  // Mock Data
  private entities: LegislationEntity[] = [
    { id: 'rta', nameAr: 'هيئة الطرق والمواصلات', nameEn: 'Roads and Transport Authority' },
    { id: 'dha', nameAr: 'هيئة الصحة', nameEn: 'Health Authority' },
    { id: 'dewa', nameAr: 'هيئة كهرباء ومياه دبي', nameEn: 'Dubai Electricity and Water Authority' },
    { id: 'dld', nameAr: 'دائرة الأراضي والأملاك', nameEn: 'Dubai Land Department' },
    { id: 'ded', nameAr: 'دائرة التنمية الاقتصادية', nameEn: 'Department of Economic Development' },
    { id: 'ddf', nameAr: 'دائرة المالية', nameEn: 'Department of Finance' },
    { id: 'khda', nameAr: 'هيئة المعرفة والتنمية البشرية', nameEn: 'Knowledge and Human Development Authority' },
    { id: 'shjm', nameAr: 'بلدية الشارقة', nameEn: 'Sharjah Municipality' },
  ];

  private categoryConfigs: Record<number, LegislationCategoryGroup> = {
    1: {
      id: 1,
      titleEn: "Entity's Legislation",
      titleAr: "تشريعات الجهات الخاضعة",
      categories: [
        { id: 1, name: 'Establishment Law', nameEn: 'Establishment Law', nameAr: 'الإنشاء', count: 45 },
        { id: 2, name: 'Financial Legislation', nameEn: 'Financial Legislation', nameAr: 'التشريعات المالية', count: 182 },
        { id: 3, name: 'Governance', nameEn: 'Governance', nameAr: 'الحوكمة', count: 98 },
        { id: 4, name: 'Contracts and Purchasing', nameEn: 'Contracts and Purchasing', nameAr: 'العقود والمشتريات', count: 67 },
        { id: 5, name: 'Human Resources', nameEn: 'Human Resources', nameAr: 'الموارد البشرية', count: 54 },
        { id: 6, name: 'Tasks of the entity', nameEn: 'Tasks of the entity', nameAr: 'مهام الجهة', count: 38 },
      ],
    },
    2: {
      id: 2,
      titleEn: 'Federal Legislation',
      titleAr: 'التشريعات الاتحادية',
      categories: [
        { id: 1, name: 'Penal procedures', nameEn: 'Penal procedures', nameAr: 'السجل التجاري', count: 25 },
        { id: 2, name: 'Civil Aviation', nameEn: 'Civil Aviation', nameAr: 'القانون البحري', count: 18 },
        { id: 3, name: 'Witness protection', nameEn: 'Witness protection', nameAr: 'التعاونيات', count: 32 },
        { id: 4, name: 'Commercial companies', nameEn: 'Commercial companies', nameAr: 'المعاشات و التأمينات الإجتماعية', count: 28 },
        { id: 5, name: 'Combating rumors and electronic crimes', nameEn: 'Combating rumors and electronic crimes', nameAr: 'مواجهة جرائم غسل الأموال', count: 15 },
        { id: 6, name: 'Maritime Law', nameEn: 'Maritime Law', nameAr: 'قواعد و شهادات المنشأ', count: 22 },
        { id: 7, name: 'Regulating the telecommunications sector', nameEn: 'Regulating the telecommunications sector', nameAr: 'حقوق المؤلف والحقوق المجاورة', count: 19 },
        { id: 8, name: 'Personal data protection', nameEn: 'Personal data protection', nameAr: 'دستور دولة الإمارات العربية المتحدة', count: 12 },
        { id: 9, name: 'consumer protection', nameEn: 'consumer protection', nameAr: 'مكافحة الغش التجاري', count: 24 },
        { id: 10, name: 'Prohibiting the use of academic certificates issued by unauthorized parties', nameEn: 'Prohibiting the use of academic certificates issued by unauthorized parties', nameAr: 'تنظيم الإعلام', count: 16 },
      ],
    },
    3: {
        id: 3,
        titleEn: 'Local Legislation',
        titleAr: 'التشريعات المحلية',
        categories: [
          { id: 1, name: 'Knowledge and Innovation Dirham', nameEn: 'Knowledge and Innovation Dirham', nameAr: 'تنظيم أعمال المساحة', count: 78 },
          { id: 2, name: 'Governance of Sports Clubs', nameEn: 'Governance of Sports Clubs', nameAr: 'حوكمة الأندية الرياضية', count: 112 },
          { id: 3, name: 'Vehicle Impoundment', nameEn: 'Vehicle Impoundment', nameAr: 'الموارد البشرية لموظفي حكومة دبي', count: 164 },
          { id: 4, name: 'Human Resources for General Managers', nameEn: 'Human Resources for General Managers', nameAr: 'الموارد البشرية للمديرين التنفيذيين', count: 89 },
          { id: 5, name: 'Investment and Investment Institutions', nameEn: 'Investment and Investment Institutions', nameAr: 'تنظيم أعمال الصلح', count: 56 },
          { id: 6, name: 'Human Resources for Executive Directors', nameEn: 'Human Resources for Executive Directors', nameAr: 'التبرعات', count: 134 },
          { id: 7, name: 'Private Establishments', nameEn: 'Private Establishments', nameAr: 'ادارة الطوارئ والأزمات و الكوارث', count: 73 },
          { id: 8, name: 'Financial Legislation', nameEn: 'Financial Legislation', nameAr: 'حوكمة الجهات الحكومية', count: 145 },
          { id: 9, name: 'Experts and Expertise', nameEn: 'Experts and Expertise', nameAr: 'الاستثمار والمؤسسات الاستثمارية', count: 102 },
          { id: 10, name: 'Governance of Councils and Committees', nameEn: 'Governance of Councils and Committees', nameAr: 'الخبراء و أعمال الخبرة', count: 91 },
        ],
      },
      4: {
        id: 4,
        titleEn: "Supreme Committee's Legal Opinion",
        titleAr: 'فتاوى اللجنة العليا للتشريعات',
        categories: [],
      },
      5: {
        id: 5,
        titleEn: 'FAA Legal Opinions',
        titleAr: 'الآراء القانونية للجهاز',
        categories: [],
      },
      6: {
        id: 6,
        titleEn: "FAA's Legislation",
        titleAr: "تشريعات الجهاز",
        categories: [
          { id: 1, name: 'IT Security', nameEn: 'IT Security', nameAr: 'أمن المعلومات', count: 45 },
          { id: 2, name: 'Governance', nameEn: 'Governance', nameAr: 'التشريعات المالية', count: 182 },
          { id: 3, name: 'Human Resources', nameEn: 'Human Resources', nameAr: 'العقود و المشتريات', count: 98 },
          { id: 4, name: 'Establishment', nameEn: 'Establishment', nameAr: 'الحوكمة', count: 67 },
          { id: 5, name: 'Financial Legislation', nameEn: 'Financial Legislation', nameAr: 'مهام الجهة', count: 54 },
          { id: 6, name: 'Entity Responsibility', nameEn: 'Entity Responsibility', nameAr: 'الموارد البشرية', count: 38 },
          { id: 7, name: 'Contracts and Procurement', nameEn: 'Contracts and Procurement', nameAr: 'الإنشاء', count: 29 },
        ],
      },
  };

  private documentTitles = [
    { en: 'Financial Oversight and Audit Framework', ar: 'إطار الرقابة المالية والتدقيق' },
    { en: 'Annual Budget Allocation Guidelines', ar: 'دليل تخصيص الميزانية السنوية' },
    { en: 'Procurement and Contract Management Policy', ar: 'سياسة المشتريات وإدارة العقود' },
    { en: 'Internal Control Systems Regulation', ar: 'لائحة أنظمة الرقابة الداخلية' },
    { en: 'Revenue Collection and Management Standards', ar: 'معايير تحصيل وإدارة الإيرادات' },
  ];

  public async getCategories(groupId: number): Promise<ApiResponse<LegislationCategoryGroup>> {
    // Mock network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = this.categoryConfigs[groupId];
    if (!data) {
        return { message: 'Categories not found' };
    }
    return { data };
  }

  public async getEntities(): Promise<ApiResponse<LegislationEntity[]>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: this.entities };
  }

  public async getDocuments(params: {
    pageNumber: number;
    pageSize: number;
    categoryId: number;
    entityId?: string;
    search?: string;
  }): Promise<PaginatedResponse<LegislationDocument>> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate mock documents for the current category
    const currentCategory = Object.values(this.categoryConfigs)
        .flatMap(g => g.categories)
        .find(c => c.id === params.categoryId);
    
    // Fallback count if category not found (shouldn't happen in happy path)
    const count = currentCategory?.count || 20;

    const allDocuments: LegislationDocument[] = Array.from({ length: count }, (_, i) => {
        const titleVariation = this.documentTitles[i % this.documentTitles.length];
        const entity = this.entities[i % this.entities.length];
        return {
          id: i + 1,
          title: `${titleVariation.en} (${2020 + (i % 5)})`,
          titleAr: `${titleVariation.ar} (${2020 + (i % 5)})`,
          referenceNumber: `${entity.id.toUpperCase()}/FIN/${2020 + (i % 5)}/${String(i + 1).padStart(3, '0')}`,
          year: 2020 + (i % 5),
          classification: ['public', 'secret'][i % 2] as 'public' | 'secret',
          entityId: entity.id,
          entityName: entity.nameEn,
          entityNameAr: entity.nameAr,
          category: params.categoryId,
          issueDate: `${2020 + (i % 5)}-${String((i % 12) + 1).padStart(2, '0')}-15`,
          pdfUrl: '#',
        };
      });

    // Apply Filters
    let filtered = allDocuments;

    if (params.entityId) {
        filtered = filtered.filter(d => d.entityId === params.entityId);
    }

    if (params.search) {
        const lowerSearch = params.search.toLowerCase();
        filtered = filtered.filter(d => 
            d.title.toLowerCase().includes(lowerSearch) || 
            d.titleAr.includes(params.search!) ||
            d.referenceNumber.toLowerCase().includes(lowerSearch)
        );
    }

    // Apply Pagination
    const totalCount = filtered.length;
    const startIndex = (params.pageNumber - 1) * params.pageSize;
    const endIndex = startIndex + params.pageSize;
    const paginatedItems = filtered.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalCount / params.pageSize);

    return {
        data: {
            items: paginatedItems,
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            totalCount: totalCount,
            totalPages: totalPages,
            hasNextPage: params.pageNumber < totalPages,
            hasPreviousPage: params.pageNumber > 1,
        }
    };
  }

  public async searchGlobal(params: {
    query: string;
    entityId: string;
  }): Promise<ApiResponse<{ results: Array<{ categoryId: number; count: number }>; total: number }>> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const { query, entityId } = params;
    const lowerQuery = query.toLowerCase();

    // Search across all category groups for the selected entity
    const results: Array<{ categoryId: number; count: number }> = [];

    Object.values(this.categoryConfigs).forEach(group => {
      if (group.categories.length > 0) {
        // Simulate searching within this category group
        const categoryCount = Math.floor(Math.random() * 50) + 1;
        if (categoryCount > 0) {
          results.push({ categoryId: group.id, count: categoryCount });
        }
      }
    });

    const total = results.reduce((sum, r) => sum + r.count, 0);

    return {
      data: {
        results: results.filter(r => r.count > 0),
        total,
      }
    };
  }
  
  public async getDocumentDetails(documentId: number): Promise<ApiResponse<LegislationDocument>> {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate mock document matching the ID
    const titleVariation = this.documentTitles[documentId % this.documentTitles.length];
    const entity = this.entities[documentId % this.entities.length];

    const document: LegislationDocument = {
      id: documentId,
      title: `${titleVariation.en} (${2020 + (documentId % 5)})`,
      titleAr: `${titleVariation.ar} (${2020 + (documentId % 5)})`,
      referenceNumber: `${entity.id.toUpperCase()}/FIN/${2020 + (documentId % 5)}/${String(documentId).padStart(3, '0')}`,
      year: 2020 + (documentId % 5),
      classification: ['public', 'secret'][documentId % 2] as 'public' | 'secret',
      entityId: entity.id,
      entityName: entity.nameEn,
      entityNameAr: entity.nameAr,
      category: (documentId % 6) + 1,
      issueDate: `${2020 + (documentId % 5)}-${String((documentId % 12) + 1).padStart(2, '0')}-15`,
      pdfUrl: 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf',
    };

    return { data: document };
  }
}

export const legislationService = new LegislationService();
