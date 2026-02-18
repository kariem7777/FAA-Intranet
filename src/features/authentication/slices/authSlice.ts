import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService, type UserResponse } from '../services/AuthService';
import type { CreateUserRequest, Role, JobTitle } from '../types';

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

export const fetchRoles = createAsyncThunk(
    'auth/fetchRoles',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.getRoles();
            return response.data ?? [];
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch roles');
        }
    }
);

export const fetchJobTitles = createAsyncThunk(
    'auth/fetchJobTitles',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.getJobTitles();
            return response.data ?? [];
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch job titles');
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
    lookups: {
        roles: Role[];
        rolesLoading: boolean;
        rolesError: string | null;
        jobTitles: JobTitle[];
        jobTitlesLoading: boolean;
        jobTitlesError: string | null;
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
    lookups: {
        roles: [],
        rolesLoading: false,
        rolesError: null,
        jobTitles: [],
        jobTitlesLoading: false,
        jobTitlesError: null,
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
            // authenticate
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
            // addUser
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
            })
            // fetchRoles
            .addCase(fetchRoles.pending, (state) => {
                state.lookups.rolesLoading = true;
                state.lookups.rolesError = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.lookups.rolesLoading = false;
                state.lookups.roles = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.lookups.rolesLoading = false;
                state.lookups.rolesError = action.payload as string;
            })
            // fetchJobTitles
            .addCase(fetchJobTitles.pending, (state) => {
                state.lookups.jobTitlesLoading = true;
                state.lookups.jobTitlesError = null;
            })
            .addCase(fetchJobTitles.fulfilled, (state, action) => {
                state.lookups.jobTitlesLoading = false;
                state.lookups.jobTitles = action.payload;
            })
            .addCase(fetchJobTitles.rejected, (state, action) => {
                state.lookups.jobTitlesLoading = false;
                state.lookups.jobTitlesError = action.payload as string;
            });
    },
});

export const { logout, resetAddUser } = authSlice.actions;
export default authSlice.reducer;
