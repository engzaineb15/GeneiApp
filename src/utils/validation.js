import * as Yup from 'yup'

export const phoneRegExp = /^(10|11|12|15)\d{8}$/

export const loginValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'phoneNotValid')
    .required('phoneRequired')
    .min(10)
    .max(10, 'phoneExactly'),
  password: Yup.string().required('passwordRequired').min(8),
})
export const phoneValidationForgeSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'phoneNotValid')
    .required('phoneRequired')
    .min(10, 'phoneExactly')
    .max(10, 'phoneExactly'),
})
export const newPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'passwordMin')
    .required('passwordRequired'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'passwordsMatch')
    .required('confirmPasswordRequired'),
});
export const phoneValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'phoneNotValid')
    .required('phoneRequired')
    .min(10, 'phoneExactly')
    .max(10, 'phoneExactly'),
  agree: Yup.boolean()
    .oneOf([true], 'agreeTerms') // Ensures `agree` is true
    .required('agreeTerms'),
})

export const otpValidationSchema = Yup.object().shape({
  otp: Yup.array()
    .of(
      Yup.string()
        .matches(/^\d$/, 'otpDigitNumber') // Ensure each element is a single digit
        .required('otpRequired') // Ensure no element is empty
    )
    .min(4, 'otpExactly')
    .max(4, 'otpExactly'),
})

export const signUpValidationSchema = Yup.object().shape({
  name : Yup.string()
         .min(3, 'usernameMin')
         .max(30, "usernameMax")
         .required('usernameRequired'),
  email : Yup.string()
          .email('emailInvalid')
          .required('emailRequired'),
  password : Yup.string()
              .min(8, 'passwordMin')
              .required('passwordRequired'),
  password_confirmation : Yup.string()
                          .oneOf([Yup.ref('password'), null], 'passwordsMatch')
                          .required('confirmPasswordRequired'),
  agree: Yup.boolean()
          .oneOf([true], 'agreeTerms') // Ensures `agree` is true
          .required('agreeTerms'),
})