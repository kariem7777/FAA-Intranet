import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { LegislationDocument } from '../types';
import { legislationService } from '../services/legislationService';

interface DocumentViewerState {
  document: LegislationDocument | null;
  loading: boolean;
  error: string | null;
}

const initialState: DocumentViewerState = {
  document: null,
  loading: false,
  error: null,
};

export const fetchDocumentDetails = createAsyncThunk(
  'legislationDocument/fetchDetails',
  async (documentId: number, { rejectWithValue }) => {
    try {
      const response = await legislationService.getDocumentDetails(documentId);
      if (response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch document details');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch document details');
    }
  }
);

const legislationDocumentSlice = createSlice({
  name: 'legislationDocument',
  initialState,
  reducers: {
    setDocument: (state, action: PayloadAction<LegislationDocument>) => {
      state.document = action.payload;
      state.error = null;
    },
    clearDocument: (state) => {
      state.document = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDocumentDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDocumentDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.document = action.payload;
    });
    builder.addCase(fetchDocumentDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setDocument, clearDocument } = legislationDocumentSlice.actions;
export default legislationDocumentSlice.reducer;
