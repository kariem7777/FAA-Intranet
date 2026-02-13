import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {
  DashboardTab,
  DashboardFilters,
  EnquiriesMetrics,
  LegislationMetrics,
} from '../types';
import { dashboardService } from '../services/dashboardService';

interface DashboardState {
  activeTab: DashboardTab;
  filters: DashboardFilters;
  enquiriesData: {
    metrics: EnquiriesMetrics | null;
    loading: boolean;
    error: string | null;
  };
  legislationData: {
    metrics: LegislationMetrics | null;
    loading: boolean;
    error: string | null;
  };
}

const currentYear = new Date().getFullYear();

const initialState: DashboardState = {
  activeTab: 'cases',
  filters: {
    quarter: 'Q1',
    year: currentYear,
  },
  enquiriesData: {
    metrics: null,
    loading: false,
    error: null,
  },
  legislationData: {
    metrics: null,
    loading: false,
    error: null,
  },
};

// Async Thunks
export const fetchEnquiriesMetrics = createAsyncThunk(
  'dashboard/fetchEnquiriesMetrics',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { dashboard: DashboardState };
    try {
      const response = await dashboardService.getEnquiriesMetrics(state.dashboard.filters);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch enquiries metrics');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch enquiries metrics';
      return rejectWithValue(message);
    }
  }
);

export const fetchLegislationMetrics = createAsyncThunk(
  'dashboard/fetchLegislationMetrics',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { dashboard: DashboardState };
    try {
      const response = await dashboardService.getLegislationMetrics(state.dashboard.filters);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch legislation metrics');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch legislation metrics';
      return rejectWithValue(message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<DashboardTab>) => {
      state.activeTab = action.payload;
    },
    setQuarter: (state, action: PayloadAction<'Q1' | 'Q2' | 'Q3' | 'Q4'>) => {
      state.filters.quarter = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.filters.year = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        quarter: 'Q1',
        year: currentYear,
      };
    },
  },
  extraReducers: (builder) => {
    // Enquiries Metrics
    builder.addCase(fetchEnquiriesMetrics.pending, (state) => {
      state.enquiriesData.loading = true;
      state.enquiriesData.error = null;
    });
    builder.addCase(fetchEnquiriesMetrics.fulfilled, (state, action) => {
      state.enquiriesData.loading = false;
      state.enquiriesData.metrics = action.payload;
    });
    builder.addCase(fetchEnquiriesMetrics.rejected, (state, action) => {
      state.enquiriesData.loading = false;
      state.enquiriesData.error = action.payload as string;
    });

    // Legislation Metrics
    builder.addCase(fetchLegislationMetrics.pending, (state) => {
      state.legislationData.loading = true;
      state.legislationData.error = null;
    });
    builder.addCase(fetchLegislationMetrics.fulfilled, (state, action) => {
      state.legislationData.loading = false;
      state.legislationData.metrics = action.payload;
    });
    builder.addCase(fetchLegislationMetrics.rejected, (state, action) => {
      state.legislationData.loading = false;
      state.legislationData.error = action.payload as string;
    });
  },
});

export const { setActiveTab, setQuarter, setYear, resetFilters } = dashboardSlice.actions;
export default dashboardSlice.reducer;
