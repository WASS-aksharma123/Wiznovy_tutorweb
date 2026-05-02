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

export const updateStep1 = createAsyncThunk(
  'onboarding/updateStep1',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateStep1(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStep2 = createAsyncThunk(
  'onboarding/updateStep2',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateStep2(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStep3 = createAsyncThunk(
  'onboarding/updateStep3',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateStep3(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStep4 = createAsyncThunk(
  'onboarding/updateStep4',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateStep4(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStep5 = createAsyncThunk(
  'onboarding/updateStep5',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateStep5(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStep6 = createAsyncThunk(
  'onboarding/updateStep6',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateStep6(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStep7 = createAsyncThunk(
  'onboarding/updateStep7',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateStep7(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStep8 = createAsyncThunk(
  'onboarding/updateStep8',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateStep8(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStep9 = createAsyncThunk(
  'onboarding/updateStep9',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateStep9(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStep10 = createAsyncThunk(
  'onboarding/updateStep10',
  async (data, { rejectWithValue }) => {
    try {
      return await onboardingService.updateStep10(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentStep = createAsyncThunk(
  'onboarding/fetchCurrentStep',
  async (_, { rejectWithValue }) => {
    try {
      return await onboardingService.getCurrentStep();
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

export const fetchBudgets = createAsyncThunk(
  'onboarding/fetchBudgets',
  async (_, { rejectWithValue }) => {
    try {
      return await onboardingService.fetchBudgets();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLanguages = createAsyncThunk(
  'onboarding/fetchLanguages',
  async (_, { rejectWithValue }) => {
    try {
      return await onboardingService.fetchLanguages();
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

export const uploadCertification = createAsyncThunk(
  'onboarding/uploadCertification',
  async (file, { rejectWithValue }) => {
    try {
      return await onboardingService.uploadCertification(file);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadGovernmentId = createAsyncThunk(
  'onboarding/uploadGovernmentId',
  async (file, { rejectWithValue }) => {
    try {
      return await onboardingService.uploadGovernmentId(file);
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

export const uploadIntroductionVideo = createAsyncThunk(
  'onboarding/uploadIntroductionVideo',
  async (file, { rejectWithValue }) => {
    try {
      return await onboardingService.uploadIntroductionVideo(file);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentStep: 1,
  stepFetched: false, // Track if step has been fetched
  formData: {
    gender: '',
    dob: '',
    subject: '',
    subjectId: '',
    country: '',
    countryId: '',
    state: '',
    stateId: '',
    city: '',
    cityId: '',
    budget: '',
    budgetId: '',
    qualification: '',
    qualificationId: '',
    certificationFile: null,
    certificationFileName: '',
    certificationUrl: '',
    teachingExperience: '',
    language: '',
    languageId: '',
    languageProficiency: '',
    governmentIdFile: null,
    governmentIdFileName: '',
    governmentIdUrl: '',
    education: '',
    expertiseLevel: '',
    languageId: '',
    specialization: '',
    specializationId: '',
    hourlyRate: '',
    trailRate: '',
    bio: '',
    introductionVideoFile: null,
    introductionVideoFileName: '',
    introductionVideoUrl: '',
    profilePicture: null,
    idDocument: null
  },
  countries: [],
  states: [],
  cities: [],
  budgets: [],
  qualifications: [],
  subjects: [],
  languages: [],
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
      state.stepFetched = false;
      state.formData = {
        gender: '',
        dob: '',
        subject: '',
        subjectId: '',
        country: '',
        countryId: '',
        state: '',
        stateId: '',
        city: '',
        cityId: '',
        budget: '',
        budgetId: '',
        qualification: '',
        qualificationId: '',
        certificationFile: null,
        certificationFileName: '',
        certificationUrl: '',
        teachingExperience: '',
        language: '',
        languageId: '',
        languageProficiency: '',
        governmentIdFile: null,
        governmentIdFileName: '',
        governmentIdUrl: '',
        education: '',
        expertiseLevel: '',
        languageId: '',
        specialization: '',
        specializationId: '',
        hourlyRate: '',
        trailRate: '',
        bio: '',
        introductionVideoFile: null,
        introductionVideoFileName: '',
        introductionVideoUrl: '',
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
      .addCase(updateStep1.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStep1.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStep1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStep2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStep2.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStep2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStep3.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStep3.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStep3.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStep4.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStep4.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStep4.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStep5.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStep5.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStep5.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStep6.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStep6.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStep6.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStep7.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStep7.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStep7.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStep8.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStep8.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStep8.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStep9.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStep9.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStep9.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStep10.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStep10.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStep10.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentStep.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentStep.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStep = action.payload;
        state.stepFetched = true;
      })
      .addCase(fetchCurrentStep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Default to step 1 if fetch fails
        state.currentStep = 1;
      })
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
        state.countries = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.states = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.budgets = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchQualifications.fulfilled, (state, action) => {
        state.qualifications = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.languages = Array.isArray(action.payload) ? action.payload : [];
      });
  }
});

export const { setCurrentStep, updateFormData, resetError, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;