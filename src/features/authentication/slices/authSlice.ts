import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService, type UserResponse } from '../services/AuthService';
import type { CreateUserRequest } from '../types';

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

export const addUser = createAsyncThunk(
    'auth/addUser',
    async (user: CreateUserRequest, { rejectWithValue }) => {
        try {
            const response = await authService.addUser(user);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to add user');
        }
    }
);

interface AuthState {
    user: UserResponse | null;
    isLoading: boolean;
    error: string | null;
    addUser: {
        isLoading: boolean;
        error: string | null;
        success: boolean;
    };
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    addUser: {
        isLoading: false,
        error: null,
        success: false,
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
        resetAddUser: (state) => {
            state.addUser = { isLoading: false, error: null, success: false };
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
            })
            .addCase(addUser.pending, (state) => {
                state.addUser.isLoading = true;
                state.addUser.error = null;
                state.addUser.success = false;
            })
            .addCase(addUser.fulfilled, (state) => {
                state.addUser.isLoading = false;
                state.addUser.success = true;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.addUser.isLoading = false;
                state.addUser.error = action.payload as string;
            });
    },
});

export const { logout, resetAddUser } = authSlice.actions;
export default authSlice.reducer;
