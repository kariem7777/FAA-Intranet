import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Department, Entities, LawCategory, LawSubCategory } from '../types';
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
  subCategories: {
    items: LawSubCategory[];
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
  categories: {
    items: LawCategory[];
    loading: boolean;
    error: string | null;
  };
  entities: {
    items: Entities[];
    loading: boolean;
    error: string | null;
  };
  departments: {
    items: Department[];
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
  subCategories: {
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
  categories: {
    items: [],
    loading: false,
    error: null,
  },
  entities: {
    items: [],
    loading: false,
    error: null,
  },
  departments: {
    items: [],
    loading: false,
    error: null,
  },
};

export const fetchEntities = createAsyncThunk(
  'globalCategories/fetchEntities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await legislationService.getEntities();
      return response;
    }
    catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch entities');
    }
  }
);

// Async Thunks
export const fetchSubCategories = createAsyncThunk(
  'globalCategories/fetchSubCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await legislationService.getLawSubCategories({
        pageNumber: 1,
        pageSize: 100,
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


export const fetchSubCategoriesByCategory = createAsyncThunk(
  'globalCategories/fetchSubCategoriesByCategory',
  async ({ categoryId, pageNumber = 1, pageSize = 10 }: { categoryId: number; pageNumber?: number; pageSize?: number }, { rejectWithValue }) => {
    try {
      const response = await legislationService.getLawSubCategories({
        pageNumber,
        pageSize,
        categoryId,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch subcategories');
    }
  }
);


export const fetchDepartments = createAsyncThunk(
  'globalCategories/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await legislationService.getDepartments();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch departments');
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
    resetSubCategories(state) {
      state.subCategories.items = [];
      state.subCategories.loading = false;
      state.subCategories.error = null;
    }

  },
  extraReducers: (builder) => {
    // SubCategories (all)
    builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
      state.subCategories.items = action.payload.data?.items || [];
    });

    // SubCategories by Category
    builder.addCase(fetchSubCategoriesByCategory.pending, (state) => {
      state.subCategories.loading = true;
      state.subCategories.error = null;
    });
    builder.addCase(fetchSubCategoriesByCategory.fulfilled, (state, action) => {
      state.subCategories.loading = false;
      state.subCategories.items = action.payload.data?.items || [];
      if (action.payload.data) {
        state.subCategories.pagination = {
          pageNumber: action.payload.data.pageNumber,
          pageSize: action.payload.data.pageSize,
          totalCount: action.payload.data.totalCount,
          totalPages: action.payload.data.totalPages,
          hasNextPage: (action.payload.data?.pageNumber || 1) < (action.payload.data?.totalPages || 0),
          hasPreviousPage: (action.payload.data?.pageNumber || 1) > 1,
        };
      }
    });
    builder.addCase(fetchSubCategoriesByCategory.rejected, (state, action) => {
      state.subCategories.loading = false;
      state.subCategories.error = action.payload as string;
    });

    // Categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories.loading = true;
      state.categories.error = null;
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories.loading = false;
      state.categories.items = action.payload.data?.items || [];
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
      state.entities.items = action.payload?.data || [];
    })
    builder.addCase(fetchEntities.rejected, (state, action) => {
      state.entities.loading = false;
      state.entities.error = action.payload as string;
    });

    // Departments
    builder.addCase(fetchDepartments.pending, (state) => {
      state.departments.loading = true;
      state.departments.error = null;
    });
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.departments.loading = false;
      state.departments.items = action.payload?.data || [];
    });
    builder.addCase(fetchDepartments.rejected, (state, action) => {
      state.departments.loading = false;
      state.departments.error = action.payload as string;
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
  resetSubCategories
} = legislationSlice.actions;

export default legislationSlice.reducer;
