import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Enquiry } from '../types';
import { enquiriesService } from '../services/EnquiriesService';

interface EnquiriesFilters {
  searchText?: string;
  departmentId?: number | string;
  status?: number | string;
}

interface EnquiriesState {
  enquiries: {
    items: Enquiry[];
    loading: boolean;
    error: string | null;
    pagination: {
      pageNumber: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
  selectedEnquiry: {
    data: Enquiry | null;
    loading: boolean;
    error: string | null;
  };
  enquiryActions: {
    closeLoading: boolean;
    approveLoading: boolean;
    createLoading: boolean;
    replyLoading: boolean;
    error: string | null;
  };
  enquiryFilters: EnquiriesFilters;
  approvedFilters: EnquiriesFilters;
  approvedOpinions: {
    items: Enquiry[];
    loading: boolean;
    error: string | null;
    pagination: {
      pageNumber: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

const initialState: EnquiriesState = {
  enquiries: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      pageNumber: 1,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  selectedEnquiry: {
    data: null,
    loading: false,
    error: null,
  },
  enquiryActions: {
    closeLoading: false,
    approveLoading: false,
    createLoading: false,
    replyLoading: false,
    error: null,
  },
  enquiryFilters: {
    searchText: '',
    departmentId: '',
    status: '',
  },
  approvedFilters: {
    searchText: '',
    departmentId: '',
    status: '',
  },
  approvedOpinions: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      pageNumber: 1,
      pageSize: 5,
      totalCount: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
};

// Async Thunks
export const fetchEnquiries = createAsyncThunk(
  'enquiries/fetchEnquiries',
  async (
    params: {
      searchText?: string;
      departmentId?: number | string;
      status?: number | string;
      pageNumber?: number;
      pageSize?: number;
    } = {},
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { enquiries: EnquiriesState };
      const currentFilters = state.enquiries.enquiryFilters;
      const currentPagination = state.enquiries.enquiries.pagination;

      const requestParams = {
        searchText: params?.searchText ?? currentFilters.searchText,
        departmentId: params?.departmentId ?? currentFilters.departmentId,
        status: params?.status ?? currentFilters.status,
        pageNumber: params?.pageNumber ?? currentPagination.pageNumber,
        pageSize: params?.pageSize ?? currentPagination.pageSize,
      };

      const response = await enquiriesService.getEnquiries(requestParams);
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch enquiries';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchEnquiryDetails = createAsyncThunk(
  'enquiries/fetchEnquiryDetails',
  async (enquiryId: number | string, { rejectWithValue }) => {
    try {
      const response = await enquiriesService.getEnquiryDetails(enquiryId);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch enquiry details';
      return rejectWithValue(errorMessage);
    }
  }
);

export const closeEnquiry = createAsyncThunk(
  'enquiries/closeEnquiry',
  async (params: { enquiryId: number | string; status: number | string }, { rejectWithValue }) => {
    try {
      await enquiriesService.closeEnquiry(params.enquiryId, params.status);
      return { enquiryId: params.enquiryId, status: params.status };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to close enquiry';
      return rejectWithValue(errorMessage);
    }
  }
);

export const approveReply = createAsyncThunk(
  'enquiries/approveReply',
  async (replyId: number | string, { rejectWithValue }) => {
    try {
      await enquiriesService.approveReply(replyId);
      return { replyId };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to approve reply';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createEnquiry = createAsyncThunk(
  'enquiries/createEnquiry',
  async (data: {
    title: string;
    description: string;
  }, { rejectWithValue }) => {
    try {
      const response = await enquiriesService.createEnquiry(data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create enquiry';
      return rejectWithValue(errorMessage);
    }
  }
);

export const sendReply = createAsyncThunk(
  'enquiries/sendReply',
  async (params: { enquiryId: number | string; message: string; pureContent?: string }, { rejectWithValue }) => {
    try {
      await enquiriesService.sendReply(params.enquiryId, params.message, params.pureContent);
      return params;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reply';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchApprovedOpinions = createAsyncThunk(
  'enquiries/fetchApprovedOpinions',
  async (
    params: {
      searchText?: string;
      departmentId?: number | string;
      pageNumber?: number;
      pageSize?: number;
    } = {},
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { enquiries: EnquiriesState };
      const currentFilters = state.enquiries.approvedFilters;
      const currentPagination = state.enquiries.approvedOpinions.pagination;

      const requestParams = {
        searchText: params?.searchText ?? currentFilters.searchText,
        departmentId: params?.departmentId ?? currentFilters.departmentId,
        pageNumber: params?.pageNumber ?? currentPagination.pageNumber,
        pageSize: params?.pageSize ?? currentPagination.pageSize,
      };

      const response = await enquiriesService.getApprovedReplies(requestParams);
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch approved opinions';
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const enquiriesSlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {
    // Enquiry Filters
    setSearchText: (state, action: PayloadAction<string>) => {
      state.enquiryFilters.searchText = action.payload;
      state.enquiries.pagination.pageNumber = 1;
    },
    setDepartmentFilter: (state, action: PayloadAction<number | string>) => {
      state.enquiryFilters.departmentId = action.payload;
      state.enquiries.pagination.pageNumber = 1;
    },
    setStatusFilter: (state, action: PayloadAction<number | string>) => {
      state.enquiryFilters.status = action.payload;
      state.enquiries.pagination.pageNumber = 1;
    },

    // Approved Filters
    setApprovedSearchText: (state, action: PayloadAction<string>) => {
      state.approvedFilters.searchText = action.payload;
      state.approvedOpinions.pagination.pageNumber = 1;
    },
    setApprovedDepartmentFilter: (state, action: PayloadAction<number | string>) => {
      state.approvedFilters.departmentId = action.payload;
      state.approvedOpinions.pagination.pageNumber = 1;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.enquiries.pagination.pageNumber = action.payload;
    },
    setApprovedPage: (state, action: PayloadAction<number>) => {
      state.approvedOpinions.pagination.pageNumber = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.enquiries.pagination.pageSize = action.payload;
      state.enquiries.pagination.pageNumber = 1;
    },
    clearSelectedEnquiry: (state) => {
      state.selectedEnquiry.data = null;
      state.selectedEnquiry.error = null;
    },
    resetFilters: (state) => {
      state.enquiryFilters.searchText = '';
      state.enquiryFilters.departmentId = '';
      state.enquiryFilters.status = '';
      state.enquiries.pagination.pageNumber = 1;

      state.approvedFilters.searchText = '';
      state.approvedFilters.departmentId = '';
      state.approvedOpinions.pagination.pageNumber = 1;
    },
    clearErrors: (state) => {
      state.enquiries.error = null;
      state.selectedEnquiry.error = null;
      state.enquiryActions.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Enquiries
    builder
      .addCase(fetchEnquiries.pending, (state) => {
        state.enquiries.loading = true;
        state.enquiries.error = null;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.enquiries.loading = false;
        state.enquiries.items = action.payload.data?.items || [];
        state.enquiries.pagination = {
          pageNumber: action.payload.data?.pageNumber || 1,
          pageSize: action.payload.data?.pageSize || 10,
          totalCount: action.payload.data?.totalCount || 0,
          totalPages: action.payload.data?.totalPages || 0,
          hasNextPage: (action.payload.data?.pageNumber || 1) < (action.payload.data?.totalPages || 0),
          hasPreviousPage: (action.payload.data?.pageNumber || 1) > 1,
        };
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.enquiries.loading = false;
        state.enquiries.error = action.payload as string;
      });

    // Fetch Enquiry Details
    builder
      .addCase(fetchEnquiryDetails.pending, (state) => {
        state.selectedEnquiry.loading = true;
        state.selectedEnquiry.error = null;
      })
      .addCase(fetchEnquiryDetails.fulfilled, (state, action) => {
        state.selectedEnquiry.loading = false;
        state.selectedEnquiry.data = action.payload || null;
      })
      .addCase(fetchEnquiryDetails.rejected, (state, action) => {
        state.selectedEnquiry.loading = false;
        state.selectedEnquiry.error = action.payload as string;
      });

    // Close Enquiry
    builder
      .addCase(closeEnquiry.pending, (state) => {
        state.enquiryActions.closeLoading = true;
        state.enquiryActions.error = null;
      })
      .addCase(closeEnquiry.fulfilled, (state, action) => {
        state.enquiryActions.closeLoading = false;
        // Update the enquiry status in the list if it exists
        const enquiry = state.enquiries.items.find(e => e.id.toString() === action.payload.enquiryId.toString());
        if (enquiry) {
          enquiry.status = Number(action.payload.status);
        }
        // Update selected enquiry if it's the same one
        if (state.selectedEnquiry.data && state.selectedEnquiry.data.id.toString() === action.payload.enquiryId.toString()) {
          state.selectedEnquiry.data.status = Number(action.payload.status);
        }
      })
      .addCase(closeEnquiry.rejected, (state, action) => {
        state.enquiryActions.closeLoading = false;
        state.enquiryActions.error = action.payload as string;
      });

    // Approve Reply
    builder
      .addCase(approveReply.pending, (state) => {
        state.enquiryActions.approveLoading = true;
        state.enquiryActions.error = null;
      })
      .addCase(approveReply.fulfilled, (state, action) => {
        state.enquiryActions.approveLoading = false;
        // Update the reply approval status in selected enquiry if it exists
        if (state.selectedEnquiry.data?.replies) {
          const reply = state.selectedEnquiry.data.replies.find(r => r.id.toString() === action.payload.replyId.toString());
          if (reply) {
            reply.approved = true;
          }
        }
      })
      .addCase(approveReply.rejected, (state, action) => {
        state.enquiryActions.approveLoading = false;
        state.enquiryActions.error = action.payload as string;
      });

    // Create Enquiry
    builder
      .addCase(createEnquiry.pending, (state) => {
        state.enquiryActions.createLoading = true;
        state.enquiryActions.error = null;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.enquiryActions.createLoading = false;
        if (action.payload) {
          state.enquiries.items.unshift(action.payload);
          state.enquiries.pagination.totalCount += 1;
        }
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.enquiryActions.createLoading = false;
        state.enquiryActions.error = action.payload as string;
      });

    // Send Reply
    builder
      .addCase(sendReply.pending, (state) => {
        state.enquiryActions.replyLoading = true;
        state.enquiryActions.error = null;
      })
      .addCase(sendReply.fulfilled, (state) => {
        state.enquiryActions.replyLoading = false;
      })
      .addCase(sendReply.rejected, (state, action) => {
        state.enquiryActions.replyLoading = false;
        state.enquiryActions.error = action.payload as string;
      });

    // Fetch Approved Opinions
    builder
      .addCase(fetchApprovedOpinions.pending, (state) => {
        state.approvedOpinions.loading = true;
        state.approvedOpinions.error = null;
      })
      .addCase(fetchApprovedOpinions.fulfilled, (state, action) => {
        state.approvedOpinions.loading = false;
        state.approvedOpinions.items = action.payload.data?.items || [];
        state.approvedOpinions.pagination = {
          pageNumber: action.payload.data?.pageNumber || 1,
          pageSize: action.payload.data?.pageSize || 5,
          totalCount: action.payload.data?.totalCount || 0,
          totalPages: action.payload.data?.totalPages || 0,
          hasNextPage: (action.payload.data?.pageNumber || 1) < (action.payload.data?.totalPages || 0),
          hasPreviousPage: (action.payload.data?.pageNumber || 1) > 1,
        };
      })
      .addCase(fetchApprovedOpinions.rejected, (state, action) => {
        state.approvedOpinions.loading = false;
        state.approvedOpinions.error = action.payload as string;
      });
  },
});

export const {
  setSearchText,
  setDepartmentFilter,
  setStatusFilter,
  setApprovedSearchText,
  setApprovedDepartmentFilter,
  setPage,
  setApprovedPage,
  setPageSize,
  clearSelectedEnquiry,
  resetFilters,
  clearErrors,
} = enquiriesSlice.actions;

export type { EnquiriesState, EnquiriesFilters };
export default enquiriesSlice.reducer;
