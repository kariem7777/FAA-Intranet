import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import legislationReducer from '@/features/Legislation/slices/legislationSlice';
import dashboardReducer from '@/features/Dashboard/slices/dashboardSlice';
import enquiriesReducer from '@/features/LegalOpinions/slices/EnquiriesSlice';
import documentsManagementReducer from '@/features/Documents/slices/documentsManagementSlice';
import authReducer from '@/features/authentication/slices/authSlice';

export const store = configureStore({
    reducer: {
        global: globalReducer,
        auth: authReducer,
        legislationSlice: legislationReducer,
        dashboard: dashboardReducer,
        enquiries: enquiriesReducer,
        documentsManagement: documentsManagementReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

