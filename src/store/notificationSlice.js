import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotifications, fetchUnreadCount, markAllNotificationsAsRead } from '../services/notificationService.js';

export const fetchNotificationsAsync = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    const result = await fetchNotifications();
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const fetchUnreadCountAsync = createAsyncThunk(
  'notifications/fetchUnreadCount',
  async (_, { rejectWithValue }) => {
    const result = await fetchUnreadCount();
    if (result.success) {
      return result.count;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const markAllAsReadAsync = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    const result = await markAllNotificationsAsRead();
    if (result.success) {
      return true;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetUnreadCount: (state) => {
      state.unreadCount = 0;
    },
    updateUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        // Update unread count based on notifications
        state.unreadCount = action.payload.filter(n => !n.read).length;
      })
      .addCase(fetchNotificationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUnreadCountAsync.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })
      .addCase(fetchUnreadCountAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(markAllAsReadAsync.fulfilled, (state) => {
        // Mark all notifications as read
        state.notifications.forEach(notification => {
          notification.read = true;
        });
        state.unreadCount = 0;
      })
      .addCase(markAllAsReadAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
export const { resetUnreadCount, updateUnreadCount } = notificationSlice.actions;