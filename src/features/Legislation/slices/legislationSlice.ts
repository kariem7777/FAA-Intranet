import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { LawCategory, LawSubCategory } from '../types';
import { legislationService } from '../services/legislationService';

interface SearchResult {
  categoryId: number;
  count: number;
}


interface GlobalCategoriesState {
  globalSearchQuery: string;
  selectedEntity: string;
  isEntityDropdownOpen: boolean;
  entitySearchQuery: string;
  showSearchTooltip: boolean;
  searchResults: SearchResult[];
  totalResults: number;
  subCategories: LawSubCategory[];
  categories: {
    items: LawCategory[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: GlobalCategoriesState = {
  globalSearchQuery: '',
  selectedEntity: '',
  isEntityDropdownOpen: false,
  entitySearchQuery: '',
  showSearchTooltip: false,
  searchResults: [],
  totalResults: 0,
  subCategories: [],
  categories: {
    items: [],
    loading: false,
    error: null,
  },
};

// Async Thunks
export const fetchSubCategories = createAsyncThunk(
  'globalCategories/fetchSubCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await legislationService.getLawSubCategories({
        pageNumber: 1,
        pageSize: 1000,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch subcategories');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'globalCategories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await legislationService.getLawCategories();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

export const performGlobalSearch = createAsyncThunk(
  'globalCategories/performGlobalSearch',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as any;
    const { globalSearchQuery } = state.legislationSlice as GlobalCategoriesState;
    
    if (!globalSearchQuery.trim()) {
      return { results: [], total: 0 };
    }

    try {
      const response = await legislationService.searchGlobal({
        query: globalSearchQuery,
      });

      // Response is already the data object
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to perform search');
    }
  }
);

const legislationSlice = createSlice({
  name: 'globalCategories',
  initialState,
  reducers: {
    setGlobalSearchQuery: (state, action: PayloadAction<string>) => {
      state.globalSearchQuery = action.payload;
    },
    setSelectedEntity: (state, action: PayloadAction<string>) => {
      state.selectedEntity = action.payload;
      state.globalSearchQuery = ''; 
      state.searchResults = [];
      state.totalResults = 0;
    },
    setIsEntityDropdownOpen: (state, action: PayloadAction<boolean>) => {
      state.isEntityDropdownOpen = action.payload;
    },
    setEntitySearchQuery: (state, action: PayloadAction<string>) => {
      state.entitySearchQuery = action.payload;
    },
    setShowSearchTooltip: (state, action: PayloadAction<boolean>) => {
      state.showSearchTooltip = action.payload;
    },
    clearSearch: (state) => {
      state.globalSearchQuery = '';
      state.searchResults = [];
      state.totalResults = 0;
    },
    resetGlobalCategories: (state) => {
      state.globalSearchQuery = '';
      state.selectedEntity = '';
      state.isEntityDropdownOpen = false;
      state.entitySearchQuery = '';
      state.showSearchTooltip = false;
      state.searchResults = [];
      state.totalResults = 0;
    },
  },
  extraReducers: (builder) => {
    // SubCategories
    builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
      state.subCategories = action.payload.items || [];
    });

    // Entities
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories.loading = true;
      state.categories.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories.loading = false;
      state.categories.items = action.payload.items || [];
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories.loading = false;
      state.categories.error = action.payload as string;
    });

    // Global Search
    builder.addCase(performGlobalSearch.fulfilled, (state, action) => {
      state.searchResults = action.payload.results;
      state.totalResults = action.payload.total;
    });
  },
});

export const {
  setGlobalSearchQuery,
  setSelectedEntity,
  setIsEntityDropdownOpen,
  setEntitySearchQuery,
  setShowSearchTooltip,
  clearSearch,
  resetGlobalCategories,
} = legislationSlice.actions;

export default legislationSlice.reducer;
