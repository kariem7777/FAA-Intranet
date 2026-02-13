import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { documentsService } from '../services/DocumentsService';
import type { Document, CreateDocument } from '../types';
import type { Entities, LawSubCategory } from '@/features/Legislation/types';
import { legislationService } from '@/features/Legislation/services/legislationService';

interface DocumentsManagementState {
  items: Document[];
  selectedDocument: Document | null;
  entities: Entities[];
  categories: LawSubCategory[];
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  loading: {
    fetch: boolean;
    add: boolean;
    update: boolean;
    delete: boolean;
    entities: boolean;
    categories: boolean;
  };
  error: {
    fetch: string | null;
    add: string | null;
    update: string | null;
    delete: string | null;
    entities: string | null;
    categories: string | null;
  };
  filters: {
    searchQuery: string;
    selectedSubCategory: number | null;
    selectedCategory: number | null;
    selectedEntity: number | null;
  };
}

const initialState: DocumentsManagementState = {
  items: [],
  selectedDocument: null,
  entities: [],
  categories: [],
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  loading: {
    fetch: false,
    add: false,
    update: false,
    delete: false,
    entities: false,
    categories: false,
  },
  error: {
    fetch: null,
    add: null,
    update: null,
    delete: null,
    entities: null,
    categories: null,
  },
  filters: {
    searchQuery: '',
    selectedSubCategory: null,
    selectedCategory: null,
    selectedEntity: null,
  }
};

export const fetchDocumentDetails = createAsyncThunk(
  'documentsManagement/fetchDocumentDetails',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await documentsService.getDocumentById(id);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch document details');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch document details');
    }
  }
);

export const fetchDocuments = createAsyncThunk(
  'documentsManagement/fetchDocuments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { documentsManagement: DocumentsManagementState };
      const { filters, pagination } = state.documentsManagement;

      const response = await documentsService.getDocuments({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        searchQuery: filters.searchQuery,
        entityId: filters.selectedEntity,
        categoryId: filters.selectedCategory,
        subCategoryId: filters.selectedSubCategory,
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

export const fetchDocumentsEntities = createAsyncThunk(
  'documentsManagement/fetchEntities',
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

export const fetchDocumentsCategories = createAsyncThunk(
  'documentsManagement/fetchCategories',
  async (categoryId: number, { rejectWithValue }) => {
    try {
      const response = await legislationService.getLawSubCategories({
        pageNumber: 1,
        pageSize: 100,
        categoryId
      });
      if (response.data) {
        return response.data.items;
      }
      return rejectWithValue(response.message || 'Failed to fetch categories');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

export const addDocument = createAsyncThunk(
  'documentsManagement/addDocument',
  async (document: CreateDocument, { rejectWithValue }) => {
    try {
      const response = await documentsService.addDocument(document);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to add document');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add document');
    }
  }
);

export const updateDocument = createAsyncThunk(
  'documentsManagement/updateDocument',
  async ({ document, file }: { document: Document; file?: File }, { rejectWithValue }) => {
    try {
      const response = await documentsService.updateDocument(document, file);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to update document');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update document');
    }
  }
);

export const deleteDocument = createAsyncThunk(
  'documentsManagement/deleteDocument',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await documentsService.deleteDocument(id);
      if (response.message) {
        return rejectWithValue(response.message);
      }
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete document');
    }
  }
);

const documentsManagementSlice = createSlice({
  name: 'documentsManagement',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.pagination.pageNumber = 1;
    },
    setSelectedSubCategory: (state, action: PayloadAction<number | null>) => {
      state.filters.selectedSubCategory = action.payload;
      state.pagination.pageNumber = 1;
    },
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      if (state.filters.selectedCategory === action.payload) return;
      state.filters.selectedCategory = action.payload;
      state.filters.selectedSubCategory = null;
      state.pagination.pageNumber = 1;
    },
    setSelectedEntity: (state, action: PayloadAction<number | null>) => {
      state.filters.selectedEntity = action.payload;
      state.pagination.pageNumber = 1;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pagination.pageNumber = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
      state.pagination.pageNumber = 1;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination = initialState.pagination;
    },
    setSelectedDocument: (state, action: PayloadAction<Document | null>) => {
      state.selectedDocument = action.payload;
    },
    clearSelectedDocument: (state) => {
      state.selectedDocument = null;
    },
    clearErrors: (state) => {
      state.error = initialState.error;
    }
  },
  extraReducers: (builder) => {
    // Fetch Documents
    builder.addCase(fetchDocuments.pending, (state) => {
      state.loading.fetch = true;
      state.error.fetch = null;
    });
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.loading.fetch = false;
      state.items = action.payload.items;
      state.pagination = {
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
        hasNextPage: (action.payload?.pageNumber || 1) < (action.payload?.totalPages || 0),
        hasPreviousPage: (action.payload?.pageNumber || 1) > 1,
      };
    });
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.loading.fetch = false;
      state.error.fetch = action.payload as string;
    });

    // Fetch Entities
    builder.addCase(fetchDocumentsEntities.pending, (state) => {
      state.loading.entities = true;
      state.error.entities = null;
    });
    builder.addCase(fetchDocumentsEntities.fulfilled, (state, action) => {
      state.loading.entities = false;
      state.entities = action.payload;
    });
    builder.addCase(fetchDocumentsEntities.rejected, (state, action) => {
      state.loading.entities = false;
      state.error.entities = action.payload as string;
    });

    // Fetch Categories
    builder.addCase(fetchDocumentsCategories.pending, (state) => {
      state.loading.categories = true;
      state.error.categories = null;
    });
    builder.addCase(fetchDocumentsCategories.fulfilled, (state, action) => {
      state.loading.categories = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchDocumentsCategories.rejected, (state, action) => {
      state.loading.categories = false;
      state.error.categories = action.payload as string;
    });

    // Add
    builder.addCase(addDocument.pending, (state) => {
      state.loading.add = true;
      state.error.add = null;
    });
    builder.addCase(addDocument.fulfilled, (state, action) => {
      state.loading.add = false;
      state.items.push(action.payload);
    });
    builder.addCase(addDocument.rejected, (state, action) => {
      state.loading.add = false;
      state.error.add = action.payload as string;
    });

    // Update
    builder.addCase(updateDocument.pending, (state) => {
      state.loading.update = true;
      state.error.update = null;
    });
    builder.addCase(updateDocument.fulfilled, (state, action) => {
      state.loading.update = false;
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    });
    builder.addCase(updateDocument.rejected, (state, action) => {
      state.loading.update = false;
      state.error.update = action.payload as string;
    });

    // Delete
    builder.addCase(deleteDocument.pending, (state) => {
      state.loading.delete = true;
      state.error.delete = null;
    });
    builder.addCase(deleteDocument.fulfilled, (state, action) => {
      state.loading.delete = false;
      state.items = state.items.filter(item => item.id !== action.payload);
      state.pagination.totalCount -= 1;
    });
    builder.addCase(deleteDocument.rejected, (state, action) => {
      state.loading.delete = false;
      state.error.delete = action.payload as string;
    });

    // Fetch Document Details
    builder.addCase(fetchDocumentDetails.pending, (state) => {
      state.loading.fetch = true;
      state.error.fetch = null;
    });
    builder.addCase(fetchDocumentDetails.fulfilled, (state, action) => {
      state.loading.fetch = false;
      state.selectedDocument = action.payload;
    });
    builder.addCase(fetchDocumentDetails.rejected, (state, action) => {
      state.loading.fetch = false;
      state.error.fetch = action.payload as string;
    });
  }
});

export const {
  setSearchQuery,
  setSelectedSubCategory,
  setSelectedCategory,
  setSelectedEntity,
  setPageNumber,
  setPageSize,
  resetFilters,
  setSelectedDocument,
  clearSelectedDocument,
  clearErrors
} = documentsManagementSlice.actions;

export default documentsManagementSlice.reducer;
