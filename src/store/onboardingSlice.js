import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onboardingService } from '../services/onboardingService';

export const updateTutorDetails = createAsyncThunk(
  'onboarding/updateTutorDetails',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateTutorDetails(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCountries = createAsyncThunk(
  'onboarding/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      return await onboardingService.fetchCountries();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchStates = createAsyncThunk(
  'onboarding/fetchStates',
  async (countryId, { rejectWithValue }) => {
    try {
      return await onboardingService.fetchStates(countryId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCities = createAsyncThunk(
  'onboarding/fetchCities',
  async (stateId, { rejectWithValue }) => {
    try {
      return await onboardingService.fetchCities(stateId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchQualifications = createAsyncThunk(
  'onboarding/fetchQualifications',
  async (_, { rejectWithValue }) => {
    try {
      return await onboardingService.fetchQualifications();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSubjects = createAsyncThunk(
  'onboarding/fetchSubjects',
  async (_, { rejectWithValue }) => {
    try {
      return await onboardingService.fetchSubjects();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  'onboarding/uploadProfileImage',
  async (file, { rejectWithValue }) => {
    try {
      return await onboardingService.uploadProfileImage(file);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadDocument = createAsyncThunk(
  'onboarding/uploadDocument',
  async (file, { rejectWithValue }) => {
    try {
      return await onboardingService.uploadDocument(file);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentStep: 1,
  formData: {
    gender: '',
    dob: '',
    country: '',
    countryId: '',
    state: '',
    stateId: '',
    city: '',
    cityId: '',
    education: '',
    proficiency: '',
    specialization: '',
    specializationId: '',
    bio: '',
    profilePicture: null,
    idDocument: null
  },
  countries: [],
  states: [],
  cities: [],
  qualifications: [],
  subjects: [],
  loading: false,
  error: null
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetError: (state) => {
      state.error = null;
    },
    resetOnboarding: (state) => {
      state.currentStep = 1;
      state.formData = {
        gender: '',
        dob: '',
        country: '',
        countryId: '',
        state: '',
        stateId: '',
        city: '',
        cityId: '',
        education: '',
        proficiency: '',
        specialization: '',
        specializationId: '',
        bio: '',
        profilePicture: null,
        idDocument: null
      };
      state.states = [];
      state.cities = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTutorDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTutorDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTutorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.states = action.payload;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(fetchQualifications.fulfilled, (state, action) => {
        state.qualifications = action.payload;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
      });
  }
});

export const { setCurrentStep, updateFormData, resetError, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;