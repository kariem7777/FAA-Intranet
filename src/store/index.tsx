import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import legislationReducer from '@/features/Legislation/slices/legislationSlice';
import heroReducer from '@/features/Legislation/slices/heroSlice';

export const store = configureStore({
    reducer: {
        global: globalReducer,
        legislation: legislationReducer,
        hero: heroReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
