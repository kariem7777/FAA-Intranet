import { BaseApiService } from '@/shared/api/BaseApiService';
import type { ApiResponse } from '@/shared/api/types';
import type { CreateUserRequest, JobTitle, Role } from '../types';
import { API_ROUTES } from '@/shared/api/routes';

export interface UserResponse {
    isAuthenticated: boolean;
    email: string;
    roles: string[];
    userName: string;
    message?: string;
}

class AuthService extends BaseApiService {
    constructor() {
        super();
    }

    public async authenticate(): Promise<UserResponse> {
        return this.get<UserResponse>(API_ROUTES.AUTH);
    }

    public async addUser(user: CreateUserRequest): Promise<ApiResponse<void>> {
        return this.post<ApiResponse<void>>(API_ROUTES.USERS, user);
    }

    public async getRoles(): Promise<ApiResponse<Role[]>> {
        return this.get<ApiResponse<Role[]>>(API_ROUTES.LOOKUPS.ROLES);
    }

    public async getJobTitles(): Promise<ApiResponse<JobTitle[]>> {
        return this.get<ApiResponse<JobTitle[]>>(API_ROUTES.LOOKUPS.JOB_TITLES);
    }

}

export const authService = new AuthService();
