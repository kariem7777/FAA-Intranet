import { BaseApiService } from '@/shared/api/BaseApiService';
import type { ApiResponse, PaginatedResponse } from '@/shared/api/types';
import type { CreateDocument, Document } from '../types';


export class DocumentsService extends BaseApiService {


  public async getDocuments(params: {
    pageNumber: number;
    pageSize: number;
    searchQuery: string;
    entityId: number | null;
    categoryId?: number | null;
    subCategoryId?: number | null;
  }): Promise<PaginatedResponse<Document>> {
    const response = await this.api.get<PaginatedResponse<Document>>('/lawDocuments', { params });
    return response.data;
  }

  public async addDocument(document: CreateDocument): Promise<ApiResponse<Document>> {
    const formData = new FormData();
    formData.append('categoryId', document.categoryId.toString());
    formData.append('subCategoryId', document.subCategoryId.toString());
    formData.append('entityId', document.entityId.toString());
    formData.append('documentNameEn', document.documentNameEn);
    formData.append('documentNameAr', document.documentNameAr);
    formData.append('lawNumber', document.lawNumber);
    formData.append('lawNameAr', document.lawNameAr);
    formData.append('lawNameEn', document.lawNameEn);
    formData.append('classification', document.classification.toString());
    formData.append('file', document.file);
    const response = await this.api.postForm<ApiResponse<Document>>('/lawDocuments', formData);
    return response.data;
  }

  public async updateDocument(document: Document, file?: File): Promise<ApiResponse<Document>> {
    const formData = new FormData();
    formData.append('categoryId', document.categoryId.toString());
    formData.append('subCategoryId', document.subCategoryId.toString());
    formData.append('entityId', document.entityId.toString());
    formData.append('documentNameEn', document.documentNameEn);
    formData.append('documentNameAr', document.documentNameAr);
    formData.append('lawNumber', document.lawNumber);
    formData.append('lawNameAr', document.lawNameAr);
    formData.append('lawNameEn', document.lawNameEn);
    formData.append('classification', document.classification.toString());
    if (file) formData.append('file', file);
    const response = await this.api.putForm<ApiResponse<Document>>(`/lawDocuments/${document.id}`, formData);
    return response.data;
  }

  public async deleteDocument(id: number): Promise<ApiResponse<void>> {
    const response = await this.api.delete<ApiResponse<void>>(`/lawDocuments/${id}`);
    return response.data;
  }

  public async getDocumentById(id: number): Promise<ApiResponse<Document>> {
    const response = await this.api.get<ApiResponse<Document>>(`/lawDocuments/${id}`);
    return response.data;
  }
}

export const documentsService = new DocumentsService();
