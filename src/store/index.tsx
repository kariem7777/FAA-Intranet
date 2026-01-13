import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import legislationReducer from '@/features/Legislation/slices/legislationSlice';
import heroReducer from '@/features/Legislation/slices/heroSlice';
import legislationDocumentReducer from '@/features/Legislation/slices/legislationDocumentSlice';
import dashboardReducer from '@/features/Legislation/slices/dashboardSlice';
import documentsManagementReducer from '@/features/Legislation/slices/documentsManagementSlice';

export const store = configureStore({
    reducer: {
        global: globalReducer,
        legislation: legislationReducer,
        hero: heroReducer,
        legislationDocument: legislationDocumentReducer,
        dashboard: dashboardReducer,
        documentsManagement: documentsManagementReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

