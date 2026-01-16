import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { LegalOpinionsState, ApprovedOpinion, PaginationInfo } from '../types/legalOpinions.types';
import { legalOpinionsService } from '../services/legalOpinionsService';

const initialPagination: PaginationInfo = {
  pageNumber: 1,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const initialState: LegalOpinionsState = {
  opinions: {
    items: [],
    loading: false,
    error: null,
    pagination: initialPagination,
  },
  selectedOpinion: {
    data: null,
    loading: false,
    error: null,
    conversation: [],
  },
  entities: {
    items: [],
    loading: false,
    error: null,
  },
  filters: {
    searchQuery: '',
    selectedDepartment: '',
  },
};

// Async Thunks
export const fetchApprovedOpinions = createAsyncThunk(
  'legalOpinions/fetchApprovedOpinions',
  async (pageNumber: number | undefined, { getState, rejectWithValue }) => {
    const state = getState() as { legalOpinions: LegalOpinionsState };
    const { filters, opinions } = state.legalOpinions;

    try {
      const response = await legalOpinionsService.getApprovedOpinions({
        searchQuery: filters.searchQuery || undefined,
        departmentId: filters.selectedDepartment || undefined,
        pageNumber: pageNumber || opinions.pagination.pageNumber,
        pageSize: opinions.pagination.pageSize,
      });

      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch approved opinions');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch approved opinions';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchOpinionDetails = createAsyncThunk(
  'legalOpinions/fetchOpinionDetails',
  async (opinionId: number, { rejectWithValue }) => {
    try {
      const response = await legalOpinionsService.getOpinionDetails(opinionId);

      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch opinion details');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch opinion details';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchLegalOpinionEntities = createAsyncThunk(
  'legalOpinions/fetchEntities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await legalOpinionsService.getEntities();

      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch entities');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch entities';
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const legalOpinionsSlice = createSlice({
  name: 'legalOpinions',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      // Reset to page 1 when search changes
      state.opinions.pagination.pageNumber = 1;
    },
    setSelectedDepartment: (state, action: PayloadAction<string>) => {
      state.filters.selectedDepartment = action.payload;
      // Reset to page 1 when filter changes
      state.opinions.pagination.pageNumber = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.opinions.pagination.pageNumber = action.payload;
    },
    setSelectedOpinion: (state, action: PayloadAction<ApprovedOpinion | null>) => {
      state.selectedOpinion.data = action.payload;
      state.selectedOpinion.error = null;
    },
    clearSelectedOpinion: (state) => {
      state.selectedOpinion.data = null;
      state.selectedOpinion.conversation = [];
      state.selectedOpinion.error = null;
    },
    resetFilters: (state) => {
      state.filters.searchQuery = '';
      state.filters.selectedDepartment = '';
      state.opinions.pagination.pageNumber = 1;
    },
    clearError: (state) => {
      state.opinions.error = null;
      state.selectedOpinion.error = null;
      state.entities.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Approved Opinions
    builder
      .addCase(fetchApprovedOpinions.pending, (state) => {
        state.opinions.loading = true;
        state.opinions.error = null;
      })
      .addCase(fetchApprovedOpinions.fulfilled, (state, action) => {
        state.opinions.loading = false;
        state.opinions.items = action.payload.items;
        state.opinions.pagination = {
          pageNumber: action.payload.pageNumber,
          pageSize: action.payload.pageSize,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          hasNextPage: action.payload.hasNextPage,
          hasPreviousPage: action.payload.hasPreviousPage,
        };
      })
      .addCase(fetchApprovedOpinions.rejected, (state, action) => {
        state.opinions.loading = false;
        state.opinions.error = action.payload as string;
      });

    // Fetch Opinion Details
    builder
      .addCase(fetchOpinionDetails.pending, (state) => {
        state.selectedOpinion.loading = true;
        state.selectedOpinion.error = null;
      })
      .addCase(fetchOpinionDetails.fulfilled, (state, action) => {
        state.selectedOpinion.loading = false;
        state.selectedOpinion.data = action.payload.opinion;
        state.selectedOpinion.conversation = action.payload.conversation;
      })
      .addCase(fetchOpinionDetails.rejected, (state, action) => {
        state.selectedOpinion.loading = false;
        state.selectedOpinion.error = action.payload as string;
      });

    // Fetch Entities
    builder
      .addCase(fetchLegalOpinionEntities.pending, (state) => {
        state.entities.loading = true;
        state.entities.error = null;
      })
      .addCase(fetchLegalOpinionEntities.fulfilled, (state, action) => {
        state.entities.loading = false;
        state.entities.items = action.payload;
      })
      .addCase(fetchLegalOpinionEntities.rejected, (state, action) => {
        state.entities.loading = false;
        state.entities.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  setSelectedDepartment,
  setPage,
  setSelectedOpinion,
  clearSelectedOpinion,
  resetFilters,
  clearError,
} = legalOpinionsSlice.actions;

export default legalOpinionsSlice.reducer;
