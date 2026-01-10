import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type LegislationDocument, type LegislationCategoryGroup, type LegislationEntity, type LegislationFiltersState } from '../types';
import { legislationService } from '../services/legislationService';

interface LegislationState {
  documents: {
    items: LegislationDocument[];
    loading: boolean;
    error: string | null;
    pagination: {
      pageNumber: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    }
  };
  categories: {
    data: LegislationCategoryGroup | null;
    loading: boolean;
    error: string | null;
  };
  entities: {
    items: LegislationEntity[];
    loading: boolean;
    error: string | null;
  };
  filters: LegislationFiltersState;
}

const initialState: LegislationState = {
  documents: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      pageNumber: 1,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0,
    }
  },
  categories: {
    data: null,
    loading: false,
    error: null,
  },
  entities: {
    items: [],
    loading: false,
    error: null,
  },
  filters: {
    searchQuery: '',
    selectedEntity: '',
    selectedCategory: 1, // Default to first sub-category
    entitySearchQuery: '',
  }
};

export const fetchDocuments = createAsyncThunk(
  'legislation/fetchDocuments',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as any; // Typed in store, but here using any for quick access or use RootState selector
    const { filters, documents } = state.legislation as LegislationState;
    
    // Ensure we have a category selected
    if (!filters.selectedCategory) return rejectWithValue('No category selected');

    try {
      const response = await legislationService.getDocuments({
        pageNumber: documents.pagination.pageNumber,
        pageSize: documents.pagination.pageSize,
        categoryId: filters.selectedCategory,
        entityId: filters.selectedEntity || undefined,
        search: filters.searchQuery || undefined,
      });

      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch documents');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch documents');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'legislation/fetchCategories',
  async (groupId: number, { rejectWithValue }) => {
    try {
      const response = await legislationService.getCategories(groupId);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch categories');
    } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

export const fetchEntities = createAsyncThunk(
  'legislation/fetchEntities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await legislationService.getEntities();
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch entities');
    } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to fetch entities');
    }
  }
);

const legislationSlice = createSlice({
  name: 'legislation',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.documents.pagination.pageNumber = 1; // Reset to page 1 on filter change
    },
    setSelectedEntity: (state, action: PayloadAction<string>) => {
      state.filters.selectedEntity = action.payload;
      state.documents.pagination.pageNumber = 1;
    },
    setSelectedCategory: (state, action: PayloadAction<number>) => {
      state.filters.selectedCategory = action.payload;
      state.documents.pagination.pageNumber = 1;
      state.filters.searchQuery = ''; // Clear search on category change usually
      state.filters.selectedEntity = '';
    },
    setEntitySearchQuery: (state, action: PayloadAction<string>) => {
        state.filters.entitySearchQuery = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.documents.pagination.pageNumber = action.payload;
    },
    resetFilters: (state) => {
        state.filters.searchQuery = '';
        state.filters.selectedEntity = '';
        state.documents.pagination.pageNumber = 1;
    },
    resetCategories: (state) => {
        state.categories = {
            data: null,
            loading: false,
            error: null,
        };
    }
  },
  extraReducers: (builder) => {
    // Documents
    builder.addCase(fetchDocuments.pending, (state) => {
      state.documents.loading = true;
      state.documents.error = null;
    });
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.documents.loading = false;
      state.documents.items = action.payload.items;
      state.documents.pagination = {
          ...state.documents.pagination,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          // pageNumber is already managed by state and response confirms it
      };
    });
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.documents.loading = false;
      state.documents.error = action.payload as string;
    });

    // Categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories.loading = true;
      state.categories.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories.loading = false;
      state.categories.data = action.payload;
      // Optionally select first category if none selected or invalid?
      // Logic might belong in component or thunk
      if (action.payload.categories.length > 0 && !state.filters.selectedCategory) {
          state.filters.selectedCategory = action.payload.categories[0].id;
      }
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories.loading = false;
      state.categories.error = action.payload as string;
    });

    // Entities
    builder.addCase(fetchEntities.pending, (state) => {
      state.entities.loading = true;
      state.entities.error = null;
    });
    builder.addCase(fetchEntities.fulfilled, (state, action) => {
      state.entities.loading = false;
      state.entities.items = action.payload;
    });
    builder.addCase(fetchEntities.rejected, (state, action) => {
      state.entities.loading = false;
      state.entities.error = action.payload as string;
    });
  }
});

export const {
  setSearchQuery,
  setSelectedEntity,
  setSelectedCategory,
  setEntitySearchQuery,
  setPageNumber,
  resetFilters,
  resetCategories
} = legislationSlice.actions;

export default legislationSlice.reducer;
