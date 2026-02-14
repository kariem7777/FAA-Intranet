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
        const response = await this.get<UserResponse>('/AuthTest/authenticate');
        console.log('✅ [AuthService] Authenticate Response:', response);
        return response;
    }
}

export const authService = new AuthService();
