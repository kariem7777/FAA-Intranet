import { BaseApiService } from '@/shared/api/BaseApiService';
import type { ApiResponse, PaginatedResponse } from '@/shared/api/types';
import type { Enquiry, Replier } from '../types';
import { API_ROUTES } from '@/shared/api/routes';


export class EnquiriesService extends BaseApiService {

  public async getEnquiries(params: {
    searchText?: string;
    departmentId?: number | string;
    status?: number | string;
    pageNumber?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Enquiry>> {
    return this.get<PaginatedResponse<Enquiry>>(API_ROUTES.ENQURIES.LIST, {
      params: {
        searchText: params.searchText,
        departmentId: params.departmentId,
        status: params.status,
        pageNumber: params.pageNumber || 1,
        pageSize: params.pageSize || 10,
      },
    });
  }

  public async getEnquiryDetails(enquiryId: number | string): Promise<ApiResponse<Enquiry>> {
    return this.get<ApiResponse<Enquiry>>(`${API_ROUTES.ENQURIES.GET_BYID(enquiryId)}`);
  }

  public async closeEnquiry(enquiryId: number | string, status: number | string): Promise<ApiResponse<null>> {
    return this.put<ApiResponse<null>>(`${API_ROUTES.ENQURIES.CLOSE(enquiryId)}`, {
      status,
    });
  }

  public async approveReply(replyId: number | string): Promise<ApiResponse<null>> {
    return this.put<ApiResponse<null>>(`${API_ROUTES.ENQURIES.APPROVE_REPLY(replyId)}`);
  }

  public async getApprovedReplies(params: {
    searchText?: string;
    pageNumber?: number;
    pageSize?: number;
    departmentId?:number | string;
  }): Promise<PaginatedResponse<Enquiry>> {
    return this.get<PaginatedResponse<Enquiry>>(`${API_ROUTES.ENQURIES.GET_APPROVED_REPLIES}`, {
      params: {
        searchText: params.searchText,
        pageNumber: params.pageNumber || 1,
        pageSize: params.pageSize || 10,
        departmentId:params.departmentId

      },
    });
  }

  public async createEnquiry(data: {
    title: string;
    description: string;
  }): Promise<ApiResponse<Enquiry>> {
    return this.post<ApiResponse<Enquiry>>(API_ROUTES.ENQURIES.CREATE, data);
  }

  public async sendReply(enquiryId: number | string, message: string, pureContent?: string): Promise<ApiResponse<null>> {
    return this.post<ApiResponse<null>>(`${API_ROUTES.ENQURIES.REPLY}`, {
      enquiryId,
      message,
      pureContent,
    });
  }
}

export const enquiriesService = new EnquiriesService();
