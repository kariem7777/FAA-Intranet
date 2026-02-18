import { BaseApiService } from '@/shared/api/BaseApiService';
import type { ApiResponse } from '@/shared/api/types';
import type { CreateUserRequest } from '../types';

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
}

export const authService = new AuthService();
