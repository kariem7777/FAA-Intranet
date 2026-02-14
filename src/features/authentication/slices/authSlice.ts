import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService, type UserResponse } from '../services/AuthService';

export const authenticateUser = createAsyncThunk(
    'auth/authenticate',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.authenticate();
            return response;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

interface AuthState {
    user: UserResponse | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
