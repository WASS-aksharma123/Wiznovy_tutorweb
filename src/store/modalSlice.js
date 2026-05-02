import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isProfileUpdateOpen: false,
  isNewCourseOpen: false,
  isCreateBookOpen: false,
  scrollToField: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openProfileUpdate: (state, action) => {
      state.isProfileUpdateOpen = true;
      state.scrollToField = action.payload?.scrollToField || null;
    },
    closeProfileUpdate: (state) => {
      state.isProfileUpdateOpen = false;
      state.scrollToField = null;
    },
    openNewCourse: (state) => {
      state.isNewCourseOpen = true;
    },
    closeNewCourse: (state) => {
      state.isNewCourseOpen = false;
    },
    openCreateBook: (state) => {
      state.isCreateBookOpen = true;
    },
    closeCreateBook: (state) => {
      state.isCreateBookOpen = false;
    },
    setScrollToField: (state, action) => {
      state.scrollToField = action.payload;
    },
  },
});

export const { openProfileUpdate, closeProfileUpdate, openNewCourse, closeNewCourse, openCreateBook, closeCreateBook, setScrollToField } = modalSlice.actions;
export default modalSlice.reducer;