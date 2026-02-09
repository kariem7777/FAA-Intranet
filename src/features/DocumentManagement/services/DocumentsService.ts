import { BaseApiService } from '@/shared/api/BaseApiService';
import type { ApiResponse, PaginatedResponse } from '@/shared/api/types';
import { MOCK_DOCUMENTS } from '../../Legislation/services/mockData';

export interface DocumentDto {
  id: number;
  title: string;
  entity: string;
  legislation: string;
  category: string;
  uploadDate: string;
  uploadedBy: string;
  classification: 'public' | 'secret';
  fileSize: string;
  fileType: string;
  pdfUrl: string;
}

export class DocumentsService extends BaseApiService {
  
  // Mock Data - Using centralized mock data
  private documents: DocumentDto[] = MOCK_DOCUMENTS.map(doc => ({
    id: doc.id,
    title: doc.title,
    entity: doc.entity,
    legislation: doc.legislation,
    category: doc.category,
    uploadDate: doc.uploadDate,
    uploadedBy: doc.uploadedBy,
    classification: doc.classification,
    fileSize: doc.fileSize,
    fileType: doc.fileType,
    pdfUrl: doc.pdfUrl,
  }));

  public async getDocuments(params: {
    pageNumber: number;
    pageSize: number;
    searchQuery: string;
    legislation: string;
    category: string;
    entity: string;
  }): Promise<PaginatedResponse<DocumentDto>> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate more mock data if needed for testing pagination
    if (this.documents.length < 50) {
       // Simple data replication for pagination testing
       for(let i=0; i<45; i++) {
         const base = this.documents[i % 6];
         this.documents.push({
           ...base,
           id: this.documents.length + 1,
           title: `${base.title} - Copy ${i}`,
           uploadDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
         });
       }
    }

    let filtered = this.documents;

    // Search
    if (params.searchQuery) {
      const lowerQuery = params.searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.entity.toLowerCase().includes(lowerQuery)
      );
    }

    // Filters
    if (params.legislation && params.legislation !== 'all') {
      filtered = filtered.filter(doc => doc.legislation === params.legislation);
    }

    if (params.category && params.category !== 'all') {
      filtered = filtered.filter(doc => doc.category === params.category);
    }

    if (params.entity && params.entity !== 'all') {
      filtered = filtered.filter(doc => doc.entity === params.entity || doc.entity.toLowerCase().includes(params.entity.toLowerCase()) ); 
    }

    // Pagination
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / params.pageSize);
    const startIndex = (params.pageNumber - 1) * params.pageSize;
    const endIndex = startIndex + params.pageSize;
    const paginatedItems = filtered.slice(startIndex, endIndex);

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

  public async addDocument(document: Omit<DocumentDto, 'id' | 'uploadDate' | 'fileSize' | 'fileType'>): Promise<ApiResponse<DocumentDto>> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDoc: DocumentDto = {
        ...document,
        id: Math.max(...this.documents.map(d => d.id)) + 1,
        uploadDate: new Date().toISOString().split('T')[0],
        fileSize: '1.0 MB', // Mock
        fileType: 'PDF', // Mock
    };
    
    this.documents.push(newDoc);
    return { data: newDoc };
  }

  public async updateDocument(document: DocumentDto): Promise<ApiResponse<DocumentDto>> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = this.documents.findIndex(d => d.id === document.id);
    if (index !== -1) {
        this.documents[index] = document;
        return { data: document };
    }
    return { message: 'Document not found' };
  }

  public async deleteDocument(id: number): Promise<ApiResponse<void>> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    this.documents = this.documents.filter(d => d.id !== id);
    return { data: undefined };
  }
}

export const documentsService = new DocumentsService();
