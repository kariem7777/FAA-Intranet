import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type LegislationEntity } from '../types';
import { legislationService } from '../services/legislationService';

interface SearchResult {
  categoryId: number;
  count: number;
}

interface HeroState {
  globalSearchQuery: string;
  selectedEntity: string;
  isEntityDropdownOpen: boolean;
  entitySearchQuery: string;
  showSearchTooltip: boolean;
  searchResults: SearchResult[];
  totalResults: number;
  entities: {
    items: LegislationEntity[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: HeroState = {
  globalSearchQuery: '',
  selectedEntity: '',
  isEntityDropdownOpen: false,
  entitySearchQuery: '',
  showSearchTooltip: false,
  searchResults: [],
  totalResults: 0,
  entities: {
    items: [],
    loading: false,
    error: null,
  },
};

// Async Thunks
export const fetchEntities = createAsyncThunk(
  'hero/fetchEntities',
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

export const performGlobalSearch = createAsyncThunk(
  'hero/performGlobalSearch',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as any;
    const { globalSearchQuery, selectedEntity } = state.hero as HeroState;
    
    if (!globalSearchQuery.trim() || !selectedEntity) {
      return { results: [], total: 0 };
    }

    try {
      const response = await legislationService.searchGlobal({
        query: globalSearchQuery,
        entityId: selectedEntity,
      });

      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to perform search');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to perform search');
    }
  }
);

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setGlobalSearchQuery: (state, action: PayloadAction<string>) => {
      state.globalSearchQuery = action.payload;
    },
    setSelectedEntity: (state, action: PayloadAction<string>) => {
      state.selectedEntity = action.payload;
      state.globalSearchQuery = ''; // Clear search when entity changes
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
    resetHero: (state) => {
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
  resetHero,
} = heroSlice.actions;

export default heroSlice.reducer;
