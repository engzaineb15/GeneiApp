// يمكنك إضافة action للتحقق من حالة الـ onboarding
export const setOnboardingComplete = () => {
  return {
    type: 'SET_ONBOARDING_COMPLETE',
  }
}

export const setUserData = data => {
  return {
    type: 'SET_USER_DATA',
    payload: data,
  }
}
