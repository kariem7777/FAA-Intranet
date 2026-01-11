import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import legislationReducer from '@/features/Legislation/slices/legislationSlice';
import heroReducer from '@/features/Legislation/slices/heroSlice';
import legislationDocumentReducer from '@/features/Legislation/slices/legislationDocumentSlice';

export const store = configureStore({
    reducer: {
        global: globalReducer,
        legislation: legislationReducer,
        hero: heroReducer,
        legislationDocument: legislationDocumentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
