import { BaseApiService } from '@/shared/api/BaseApiService';

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
}

export const authService = new AuthService();
