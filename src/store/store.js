import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import profileReducer from './profileSlice.js';
import availabilityReducer from './availabilitySlice.js';
import onboardingReducer from './onboardingSlice.js';
import scheduleReducer from './scheduleSlice.js';
import courseReducer from './courseSlice.js';
import notificationReducer from './notificationSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    availability: availabilityReducer,
    onboarding: onboardingReducer,
    schedule: scheduleReducer,
    course: courseReducer,
    notifications: notificationReducer,
  },
});

export default store;