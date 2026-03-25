import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { notificationsService, type Notification } from '../services/notificationsService';
import { getErrorMessage } from '@/shared/utils/errorUtils';

interface NotificationsState {
    items: Notification[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
}

const initialState: NotificationsState = {
    items: [],
    unreadCount: 0,
    loading: false,
    error: null,
};

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { rejectWithValue }) => {
        try {
            const response = await notificationsService.getNotifications();
            if (response.data) {
                return response.data;
            }
            return rejectWithValue(getErrorMessage(response));
        } catch (error: any) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const markAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (id: string, { rejectWithValue }) => {
        try {
            await notificationsService.markAsRead(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const markAllAsRead = createAsyncThunk(
    'notifications/markAllAsRead',
    async (_, { rejectWithValue }) => {
        try {
            await notificationsService.markAllAsRead();
            return;
        } catch (error: any) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        clearNotificationsError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
                state.loading = false;
                state.items = action.payload;
                state.unreadCount = action.payload.filter((n: Notification) => !n.isRead).length;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(markAsRead.fulfilled, (state, action: PayloadAction<string>) => {
                const notification = state.items.find(n => n.id === action.payload);
                if (notification && !notification.isRead) {
                    notification.isRead = true;
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            })
            .addCase(markAllAsRead.fulfilled, (state) => {
                state.items.forEach(n => { n.isRead = true; });
                state.unreadCount = 0;
            });
    },
});

export const { clearNotificationsError } = notificationsSlice.actions;
export default notificationsSlice.reducer;
