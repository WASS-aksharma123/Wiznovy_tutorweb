import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import profileReducer from './profileSlice.js';
import availabilityReducer from './availabilitySlice.js';
import onboardingReducer from './onboardingSlice.js';
import scheduleReducer from './scheduleSlice.js';
import courseReducer from './courseSlice.js';
import notificationReducer from './notificationSlice.js';
import bookReducer from './bookSlice.js';
import bankReducer from './bankSlice.js';
import walletReducer from './walletSlice.js';
import faqReducer from './faqSlice.js';
import modalReducer from './modalSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    availability: availabilityReducer,
    onboarding: onboardingReducer,
    schedule: scheduleReducer,
    course: courseReducer,
    notifications: notificationReducer,
    book: bookReducer,
    bank: bankReducer,
    wallet: walletReducer,
    faq: faqReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;