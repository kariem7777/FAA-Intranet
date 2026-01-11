import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {
  DashboardTab,
  DashboardFilters,
  CaseStatusData,
  SLAMetric,
  ConversationMetric,
  MonthlyTrendData,
  DepartmentInquiry,
  RecentCase,
  DocumentStatistic,
  CategoryDocumentData,
  EntityDocumentData,
  QuarterUploadData,
} from '../types';
import { dashboardService } from '../services/dashboardService';

interface DashboardState {
  activeTab: DashboardTab;
  filters: DashboardFilters;
  casesData: {
    caseStatusData: CaseStatusData[];
    slaMetrics: SLAMetric[];
    conversationMetrics: ConversationMetric[];
    monthlyTrendData: MonthlyTrendData[];
    loading: boolean;
    error: string | null;
  };
  departmentsData: {
    items: DepartmentInquiry[];
    loading: boolean;
    error: string | null;
  };
  recentCases: {
    items: RecentCase[];
    loading: boolean;
    error: string | null;
  };
  documentsData: {
    documentStats: DocumentStatistic[];
    categoryData: CategoryDocumentData[];
    entityData: EntityDocumentData[];
    quarterData: QuarterUploadData[];
    loading: boolean;
    error: string | null;
  };
}

const currentYear = new Date().getFullYear();

const initialState: DashboardState = {
  activeTab: 'overview',
  filters: {
    quarter: 'Q1',
    year: currentYear,
  },
  casesData: {
    caseStatusData: [],
    slaMetrics: [],
    conversationMetrics: [],
    monthlyTrendData: [],
    loading: false,
    error: null,
  },
  departmentsData: {
    items: [],
    loading: false,
    error: null,
  },
  recentCases: {
    items: [],
    loading: false,
    error: null,
  },
  documentsData: {
    documentStats: [],
    categoryData: [],
    entityData: [],
    quarterData: [],
    loading: false,
    error: null,
  },
};

// Async Thunks
export const fetchCasesOverview = createAsyncThunk(
  'dashboard/fetchCasesOverview',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { dashboard: DashboardState };
    try {
      const response = await dashboardService.getCasesOverview(state.dashboard.filters);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch cases overview');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch cases overview';
      return rejectWithValue(message);
    }
  }
);

export const fetchDepartmentInquiries = createAsyncThunk(
  'dashboard/fetchDepartmentInquiries',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { dashboard: DashboardState };
    try {
      const response = await dashboardService.getDepartmentInquiries(state.dashboard.filters);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch department inquiries');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch department inquiries';
      return rejectWithValue(message);
    }
  }
);

export const fetchRecentCases = createAsyncThunk(
  'dashboard/fetchRecentCases',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { dashboard: DashboardState };
    try {
      const response = await dashboardService.getRecentCases(state.dashboard.filters);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch recent cases');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch recent cases';
      return rejectWithValue(message);
    }
  }
);

export const fetchDocumentsOverview = createAsyncThunk(
  'dashboard/fetchDocumentsOverview',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { dashboard: DashboardState };
    try {
      const response = await dashboardService.getDocumentsOverview(state.dashboard.filters);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch documents overview');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch documents overview';
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
        quarter: 'Q4',
        year: currentYear,
      };
    },
  },
  extraReducers: (builder) => {
    // Cases Overview
    builder.addCase(fetchCasesOverview.pending, (state) => {
      state.casesData.loading = true;
      state.casesData.error = null;
    });
    builder.addCase(fetchCasesOverview.fulfilled, (state, action) => {
      state.casesData.loading = false;
      state.casesData.caseStatusData = action.payload.caseStatusData;
      state.casesData.slaMetrics = action.payload.slaMetrics;
      state.casesData.conversationMetrics = action.payload.conversationMetrics;
      state.casesData.monthlyTrendData = action.payload.monthlyTrendData;
    });
    builder.addCase(fetchCasesOverview.rejected, (state, action) => {
      state.casesData.loading = false;
      state.casesData.error = action.payload as string;
    });

    // Department Inquiries
    builder.addCase(fetchDepartmentInquiries.pending, (state) => {
      state.departmentsData.loading = true;
      state.departmentsData.error = null;
    });
    builder.addCase(fetchDepartmentInquiries.fulfilled, (state, action) => {
      state.departmentsData.loading = false;
      state.departmentsData.items = action.payload;
    });
    builder.addCase(fetchDepartmentInquiries.rejected, (state, action) => {
      state.departmentsData.loading = false;
      state.departmentsData.error = action.payload as string;
    });

    // Recent Cases
    builder.addCase(fetchRecentCases.pending, (state) => {
      state.recentCases.loading = true;
      state.recentCases.error = null;
    });
    builder.addCase(fetchRecentCases.fulfilled, (state, action) => {
      state.recentCases.loading = false;
      state.recentCases.items = action.payload;
    });
    builder.addCase(fetchRecentCases.rejected, (state, action) => {
      state.recentCases.loading = false;
      state.recentCases.error = action.payload as string;
    });

    // Documents Overview
    builder.addCase(fetchDocumentsOverview.pending, (state) => {
      state.documentsData.loading = true;
      state.documentsData.error = null;
    });
    builder.addCase(fetchDocumentsOverview.fulfilled, (state, action) => {
      state.documentsData.loading = false;
      state.documentsData.documentStats = action.payload.documentStats;
      state.documentsData.categoryData = action.payload.categoryData;
      state.documentsData.entityData = action.payload.entityData;
      state.documentsData.quarterData = action.payload.quarterData;
    });
    builder.addCase(fetchDocumentsOverview.rejected, (state, action) => {
      state.documentsData.loading = false;
      state.documentsData.error = action.payload as string;
    });
  },
});

export const { setActiveTab, setQuarter, setYear, resetFilters } = dashboardSlice.actions;
export default dashboardSlice.reducer;
