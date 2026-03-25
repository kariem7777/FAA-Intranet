import { BaseApiService } from '@/shared/api/BaseApiService';

export interface Notification {
    id: string;
    type: 'new_opinion' | 'admin_reply' | 'user_reply' | 'closed';
    createdAt: string; // ISO format
    isRead: boolean;
    opinionId?: string;
}

class NotificationsService extends BaseApiService {
    constructor() {
        super('/notifications');
    }

    async getNotifications(): Promise<{ data: Notification[] }> {
        const now = new Date();
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: [
                        {
                            id: '1',
                            type: 'admin_reply',
                            createdAt: new Date(now.getTime() - 5 * 60 * 1000).toISOString(), // 5 mins ago
                            isRead: false,
                            opinionId: 'OP-2024-001'
                        },
                        {
                            id: '2',
                            type: 'new_opinion',
                            createdAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString(), // 1 hour ago
                            isRead: false,
                            opinionId: 'OP-2024-002'
                        },
                        {
                            id: '3',
                            type: 'user_reply',
                            createdAt: new Date(now.getTime() - 120 * 60 * 1000).toISOString(), // 2 hours ago
                            isRead: true,
                            opinionId: 'OP-2024-003'
                        }
                    ]
                });
            }, 800);
        });
    }

    async markAsRead(id: string): Promise<void> {
        console.log('Marking as read:', id);
        return new Promise((resolve) => {
            setTimeout(resolve, 300);
        });
    }

    async markAllAsRead(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, 300);
        });
    }
}

export const notificationsService = new NotificationsService();
