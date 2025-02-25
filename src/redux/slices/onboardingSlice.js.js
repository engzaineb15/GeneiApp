import { createSlice } from '@reduxjs/toolkit'

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: {
    isFirstTime: true,
  },
  reducers: {
    completeOnboarding: state => {
      state.isFirstTime = false
    },
  },
})

export const { completeOnboarding } = onboardingSlice.actions

export default onboardingSlice.reducer
