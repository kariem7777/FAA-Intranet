import { BaseApiService } from '@/shared/api/BaseApiService';
import type { PaginatedResponse, ApiResponse } from '@/shared/api/types';
import type { LegislationCategoryGroup, LegislationEntity, LegislationDocument } from '../types';
import {
  MOCK_ENTITIES,
  LEGISLATION_GROUPS,
  MOCK_DOCUMENTS,
} from './mockData';

export class LegislationService extends BaseApiService {
  
  // Mock Data - Using centralized mock data
  private entities: LegislationEntity[] = MOCK_ENTITIES.map(e => ({
    id: e.id,
    nameAr: e.nameAr,
    nameEn: e.nameEn,
  }));

  private categoryConfigs: Record<number, LegislationCategoryGroup> = Object.values(LEGISLATION_GROUPS).reduce((acc, group) => {
    acc[group.id] = {
      id: group.id,
      titleEn: group.titleEn,
      titleAr: group.titleAr,
      categories: [...group.categories],
    };
    return acc;
  }, {} as Record<number, LegislationCategoryGroup>);


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
        const titleVariation = MOCK_DOCUMENTS[i % MOCK_DOCUMENTS.length];
        const entity = this.entities[i % this.entities.length];
        return {
          id: i + 1,
          title: `${titleVariation.title} (${2020 + (i % 5)})`,
          titleAr: `${titleVariation.titleAr} (${2020 + (i % 5)})`,
          referenceNumber: `${entity.id.toUpperCase()}/FIN/${2020 + (i % 5)}/${String(i + 1).padStart(3, '0')}`,
          year: 2020 + (i % 5),
          classification: ['public', 'secret'][i % 2] as 'public' | 'secret',
          entityId: entity.id,
          entityName: entity.nameEn,
          entityNameAr: entity.nameAr,
          category: currentCategory?.name || 'general',
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

  public async searchGlobal(_params: {
    query: string;
    entityId: string;
  }): Promise<ApiResponse<{ results: Array<{ categoryId: number; count: number }>; total: number }>> {
    await new Promise(resolve => setTimeout(resolve, 600));

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


    const index = MOCK_DOCUMENTS.findIndex(d => d.id === documentId);
    if (index !== -1) {
      
        const mappedDocument = MOCK_DOCUMENTS[index];
        const document : LegislationDocument = {
          id: mappedDocument.id,
          titleAr: mappedDocument.titleAr,
          title: mappedDocument.title,
          referenceNumber: mappedDocument.referenceNumber,
          year: mappedDocument.year,
          classification: mappedDocument.classification as 'secret' | 'public',
          entityId: mappedDocument.entityId,
          entityName: mappedDocument.entity,
          entityNameAr: mappedDocument.entity,
          category: mappedDocument.category,
          issueDate: mappedDocument.issueDate,
          pdfUrl: mappedDocument.pdfUrl
        }

        return { data: document };
    }
    return { message: 'Document not found' };
    
  }
}

export const legislationService = new LegislationService();
