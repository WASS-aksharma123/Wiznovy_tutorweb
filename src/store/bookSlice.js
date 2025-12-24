import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBook, createBookBasic, getBook, getTutorBooks, updateBook, updateBookCoverImage, updateBookImages, updateBookPdf } from '../services/bookService';

export const getTutorBooksAsync = createAsyncThunk(
  'book/getTutorBooks',
  async (_, { rejectWithValue }) => {
    const result = await getTutorBooks();
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const createBookBasicAsync = createAsyncThunk(
  'book/createBookBasic',
  async (bookData, { rejectWithValue }) => {
    const result = await createBookBasic(bookData);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const updateBookPdfAsync = createAsyncThunk(
  'book/updateBookPdf',
  async ({ bookId, pdfFile }, { rejectWithValue }) => {
    const result = await updateBookPdf(bookId, pdfFile);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const createBookAsync = createAsyncThunk(
  'book/createBook',
  async (bookData, { rejectWithValue }) => {
    const result = await createBook(bookData);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const getBookAsync = createAsyncThunk(
  'book/getBook',
  async (bookId, { rejectWithValue }) => {
    const result = await getBook(bookId);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const updateBookCoverImageAsync = createAsyncThunk(
  'book/updateCoverImage',
  async ({ bookId, coverImageFile }, { rejectWithValue }) => {
    const result = await updateBookCoverImage(bookId, coverImageFile);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const updateBookImagesAsync = createAsyncThunk(
  'book/updateBookImages',
  async ({ bookId, bookImagesFiles }, { rejectWithValue }) => {
    const result = await updateBookImages(bookId, bookImagesFiles);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const updateBookAsync = createAsyncThunk(
  'book/updateBook',
  async ({ bookId, bookData }, { rejectWithValue }) => {
    const result = await updateBook(bookId, bookData);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
    currentBook: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTutorBooksAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTutorBooksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.result;
      })
      .addCase(getTutorBooksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBookBasicAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBookBasicAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(createBookBasicAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookPdfAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookPdfAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentBook) {
          state.currentBook.pdfFile = action.payload.pdfFile;
        }
      })
      .addCase(updateBookPdfAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBookAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBookAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(createBookAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBookAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(getBookAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookCoverImageAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookCoverImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentBook) {
          state.currentBook.coverImage = action.payload.coverImage;
        }
      })
      .addCase(updateBookCoverImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookImagesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookImagesAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentBook) {
          state.currentBook.bookImages = action.payload.bookImages;
        }
      })
      .addCase(updateBookImagesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(updateBookAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;