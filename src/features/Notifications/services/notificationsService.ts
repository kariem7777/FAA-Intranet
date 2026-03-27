import { BaseApiService } from '@/shared/api/BaseApiService';
import type { ApiResponse } from '@/shared/api/types';

export interface Notification {
    id: string;
    type: 'NewOpinion' | 'AdminReply' | 'UserReply' | 'Closed';
    createdAt: string;
    isRead: boolean;
    opinionId?: string;
}

class NotificationsService extends BaseApiService {
    public async getNotifications(): Promise<ApiResponse<Notification[]>> {
        return this.get<ApiResponse<Notification[]>>('/Notifications');
    }

    public async markAsRead(id: string): Promise<ApiResponse<void>> {
        return this.put<ApiResponse<void>>(`/Notifications/${id}/read`);
    }

    public async markAllAsRead(): Promise<ApiResponse<void>> {
        return this.put<ApiResponse<void>>('/Notifications/read-all');
    }
}

export const notificationsService = new NotificationsService();
