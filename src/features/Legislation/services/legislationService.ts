import { BaseApiService } from '@/shared/api/BaseApiService';
import { API_ROUTES } from '@/shared/api/routes';
import type { ApiResponse, PaginatedResponse } from '@/shared/api/types';
import type { LawCategory, LawSubCategory, Entities, Department } from '@/features/Legislation/types';


export class LegislationService extends BaseApiService {

  public async getEntities(): Promise<ApiResponse<Entities[]>> {
    return this.get<ApiResponse<Entities[]>>(API_ROUTES.LOOKUPS.ENTITIES);
  }

  public async getLawCategories(params?: {
    pageNumber?: number;
    pageSize?: number;

  }): Promise<PaginatedResponse<LawCategory>> {
    return this.get<PaginatedResponse<LawCategory>>(API_ROUTES.LOOKUPS.CATEGORIES, {
      params: {
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 100,
      },
    });
  }

  public async getLawSubCategories(params?: {
    pageNumber?: number;
    pageSize?: number;
    categoryId?: number;
  }): Promise<PaginatedResponse<LawSubCategory>> {
    return this.get<PaginatedResponse<LawSubCategory>>(API_ROUTES.LOOKUPS.SUBCATEGORIES, {
      params: {
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 100,
        ...(params?.categoryId && { categoryId: params.categoryId }),
      },
    });
  }

  public async getDepartments(): Promise<ApiResponse<Department[]>> {
    return this.get<ApiResponse<Department[]>>(API_ROUTES.LOOKUPS.DEPARTMENTS);
  }

  public async searchGlobal(params: {
    query: string;
    entityId?: string;
  }): Promise<{ results: Array<{ categoryId: number; count: number }>; total: number }> {
    const subCategoriesResponse = await this.getLawSubCategories({
      pageNumber: 1,
      pageSize: 100,
    });

    if (!subCategoriesResponse || !subCategoriesResponse.data || !subCategoriesResponse.data.items) {
      throw new Error('Failed to fetch subcategories');
    }

    const { items } = subCategoriesResponse.data;
    const searchLower = params.query.toLowerCase();

    const matchingSubCategories = items.filter((subCat: LawSubCategory) => {
      const matchesQuery =
        subCat.lawSubCategoryEn.toLowerCase().includes(searchLower) ||
        subCat.lawSubCategoryAr.includes(params.query);

      const isActive = subCat.isActive;
      const hasDocuments = subCat.documentsCount > 0;

      return matchesQuery && isActive && hasDocuments;
    });

    const results = matchingSubCategories.map((subCat: LawSubCategory) => ({
      categoryId: subCat.id,
      count: subCat.documentsCount,
    }));

    const total = results.reduce((sum: number, r: { categoryId: number; count: number }) => sum + r.count, 0);

    return {
      results,
      total,
    };
  }
}

export const legislationService = new LegislationService();
