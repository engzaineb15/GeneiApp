import api from './baseApi'

export async function login(data) {
  return api.post('auth/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function signUp(data) {
  return api.post('auth/register', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function sendOTP(data) {
  return api.post('auth/send-otp', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function sendOTPForget(data) {
  return api.post('auth/send-otp-forget', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function verifyOTP(data) {
  return api.post('auth/verify-otp', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
