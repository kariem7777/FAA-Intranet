import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import legislationReducer from '@/features/Legislation/slices/legislationSlice';


export const store = configureStore({
    reducer: {
        global: globalReducer,
        legislationSlice: legislationReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

