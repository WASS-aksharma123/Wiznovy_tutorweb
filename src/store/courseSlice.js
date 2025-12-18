import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCourse, fetchSubjects, fetchLanguages, fetchMyCourses, updateCourse, createUnit, updateUnit, updateUnitImage, fetchUnitsByCourse, fetchVideoLecturesByUnit, updateVideoLecture, updateVideoThumbnail } from '../services/courseService.js';

export const createCourseAsync = createAsyncThunk(
  'course/createCourse',
  async (courseData, { rejectWithValue }) => {
    const result = await createCourse(courseData);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const fetchSubjectsAsync = createAsyncThunk(
  'course/fetchSubjects',
  async (_, { rejectWithValue }) => {
    const result = await fetchSubjects();
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const fetchLanguagesAsync = createAsyncThunk(
  'course/fetchLanguages',
  async (_, { rejectWithValue }) => {
    const result = await fetchLanguages();
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const fetchMyCoursesAsync = createAsyncThunk(
  'course/fetchMyCourses',
  async (_, { rejectWithValue }) => {
    const result = await fetchMyCourses();
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const updateCourseAsync = createAsyncThunk(
  'course/updateCourse',
  async ({ courseId, courseData }, { rejectWithValue }) => {
    const result = await updateCourse(courseId, courseData);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const createUnitAsync = createAsyncThunk(
  'course/createUnit',
  async (unitData, { rejectWithValue }) => {
    const result = await createUnit(unitData);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const updateUnitAsync = createAsyncThunk(
  'course/updateUnit',
  async ({ unitId, unitData }, { rejectWithValue }) => {
    const result = await updateUnit(unitId, unitData);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const updateUnitImageAsync = createAsyncThunk(
  'course/updateUnitImage',
  async ({ unitId, imageFile }, { rejectWithValue }) => {
    const result = await updateUnitImage(unitId, imageFile);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const fetchUnitsByCourseAsync = createAsyncThunk(
  'course/fetchUnitsByCourse',
  async (courseId, { rejectWithValue }) => {
    const result = await fetchUnitsByCourse(courseId);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const fetchVideoLecturesByUnitAsync = createAsyncThunk(
  'course/fetchVideoLecturesByUnit',
  async (unitId, { rejectWithValue }) => {
    const result = await fetchVideoLecturesByUnit(unitId);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const updateVideoLectureAsync = createAsyncThunk(
  'course/updateVideoLecture',
  async ({ videoLectureId, videoData }, { rejectWithValue }) => {
    const result = await updateVideoLecture(videoLectureId, videoData);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const updateVideoThumbnailAsync = createAsyncThunk(
  'course/updateVideoThumbnail',
  async ({ videoLectureId, thumbnailFile }, { rejectWithValue }) => {
    const result = await updateVideoThumbnail(videoLectureId, thumbnailFile);
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    subjects: [],
    languages: [],
    myCourses: [],
    units: [],
    videoLectures: [],
    loading: false,
    unitsLoading: false,
    videoLecturesLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourseAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCourseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSubjectsAsync.fulfilled, (state, action) => {
        state.subjects = action.payload;
      })
      .addCase(fetchLanguagesAsync.fulfilled, (state, action) => {
        state.languages = action.payload;
      })
      .addCase(fetchMyCoursesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyCoursesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myCourses = action.payload;
      })
      .addCase(fetchMyCoursesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCourseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCourseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUnitAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUnitAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.units.push(action.payload);
        }
      })
      .addCase(createUnitAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUnitAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUnitAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUnit = action.payload;
        const unitIndex = state.units.findIndex(unit => unit.id === updatedUnit.id);
        if (unitIndex !== -1) {
          state.units[unitIndex] = updatedUnit;
        }
      })
      .addCase(updateUnitAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUnitImageAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUnitImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUnit = action.payload;
        const unitIndex = state.units.findIndex(unit => unit.id === updatedUnit.id);
        if (unitIndex !== -1) {
          state.units[unitIndex] = updatedUnit;
        }
      })
      .addCase(updateUnitImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUnitsByCourseAsync.pending, (state) => {
        state.unitsLoading = true;
        state.error = null;
      })
      .addCase(fetchUnitsByCourseAsync.fulfilled, (state, action) => {
        state.unitsLoading = false;
        state.units = action.payload;
      })
      .addCase(fetchUnitsByCourseAsync.rejected, (state, action) => {
        state.unitsLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchVideoLecturesByUnitAsync.pending, (state) => {
        state.videoLecturesLoading = true;
        state.error = null;
      })
      .addCase(fetchVideoLecturesByUnitAsync.fulfilled, (state, action) => {
        state.videoLecturesLoading = false;
        state.videoLectures = action.payload;
      })
      .addCase(fetchVideoLecturesByUnitAsync.rejected, (state, action) => {
        state.videoLecturesLoading = false;
        state.error = action.payload;
      })
      .addCase(updateVideoLectureAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVideoLectureAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateVideoLectureAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVideoThumbnailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVideoThumbnailAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateVideoThumbnailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;