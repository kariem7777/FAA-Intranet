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
  }): Promise<any> {
    const response = await this.get<any>(API_ROUTES.DOCUMENTS.SEARCH, {
      params: {
        keyword: params.query,
      },
    });

    return response.data;
  }
}

export const legislationService = new LegislationService();
