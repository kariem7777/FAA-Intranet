import { BaseApiService } from '@/shared/api/BaseApiService';
import type { ApiResponse } from '@/shared/api/types';
import type { CreateUserRequest, JobTitle, Role } from '../types';
import { API_ROUTES } from '@/shared/api/routes';

export interface UserResponse {
    email: string;
    role: string;
}

class AuthService extends BaseApiService {
    constructor() {
        super();
    }

    public async authenticate(): Promise<UserResponse> {
        return this.post<UserResponse>('/authenticate');
    }

    public async addUser(user: CreateUserRequest): Promise<ApiResponse<void>> {
        return this.post<ApiResponse<void>>('/Users', user);
    }

    public async getRoles(): Promise<ApiResponse<Role[]>> {
        return this.get<ApiResponse<Role[]>>(API_ROUTES.LOOKUPS.ROLES);
    }

    public async getJobTitles(): Promise<ApiResponse<JobTitle[]>> {
        return this.get<ApiResponse<JobTitle[]>>(API_ROUTES.LOOKUPS.JOB_TITLES);
    }

}

export const authService = new AuthService();
