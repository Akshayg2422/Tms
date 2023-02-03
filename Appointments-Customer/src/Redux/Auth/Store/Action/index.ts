import {
  VALIDATE_USER,
  VALIDATE_USER_SUCCESS,
  VALIDATE_USER_FAIL,
  OTP_REGISTER,
  OTP_REGISTER_SUCCESS,
  OTP_REGISTER_FAILURE,
  SUBMIT_REGISTRATION_OTP,
  SUBMIT_REGISTRATION_OTP_SUCCESS,
  SUBMIT_REGISTRATION_OTP_FAILURE,
  RESEND_REGISTRATION_OTP,
  RESEND_REGISTRATION_OTP_SUCCESS,
  RESEND_REGISTRATION_OTP_FAILURE,
  OTP_LOGIN,
  OTP_LOGIN_SUCCESS,
  OTP_LOGIN_FAILURE,
  VALIDATE_REGISTER_USER,
  VALIDATE_REGISTER_USER_FAILURE,
  VALIDATE_REGISTER_USER_SUCCESS,
} from '../ActionTypes';

export const validateUser = (params: any) => {
  return {
    type: VALIDATE_USER,
    payload: params,
  };
};

export const validateUserSuccess = (response: any) => {
  return {
    type: VALIDATE_USER_SUCCESS,
    payload: response,
  };
};

export const validateUserFailure = (error: any) => {
  return {
    type: VALIDATE_USER_FAIL,
    payload: error,
  };
};

/**
 * Otp Register
 * @param state
 * @param action
 */
export const otpRegister = (params: any) => {
  return {
    type: OTP_REGISTER,
    payload: params,
  };
};

export const otpRegisterSuccess = (response: any) => {
  return {
    type: OTP_REGISTER_SUCCESS,
    payload: response,
  };
};

export const otpRegisterFailure = (error: any) => {
  return {
    type: OTP_REGISTER_FAILURE,
    payload: error,
  };
};

/**
 * Submit Registation Otp
 * @param state
 * @param action
 */
export const submitRegistrationOtp = (params: any) => {
  return {
    type: SUBMIT_REGISTRATION_OTP,
    payload: params,
  };
};

export const submitRegistrationOtpSuccess = (response: any) => {
  return {
    type: SUBMIT_REGISTRATION_OTP_SUCCESS,
    payload: response,
  };
};

export const submitRegistrationOtpFailure = (error: any) => {
  return {
    type: SUBMIT_REGISTRATION_OTP_FAILURE,
    payload: error,
  };
};

/**
 * Resend Registation Otp
 * @param state
 * @param action
 */
export const resendRegistrationOtp = (params: any) => {
  return {
    type: RESEND_REGISTRATION_OTP,
    payload: params,
  };
};

export const resendRegistrationOtpSuccess = (response: any) => {
  return {
    type: RESEND_REGISTRATION_OTP_SUCCESS,
    payload: response,
  };
};

export const resendRegistrationOtpFailure = (error: any) => {
  return {
    type: RESEND_REGISTRATION_OTP_FAILURE,
    payload: error,
  };
};

/**
 * Otp Login
 * @param state
 * @param action
 */
export const otpLogin = (params: any) => {
  return {
    type: OTP_LOGIN,
    payload: params,
  };
};

export const otpLoginSuccess = (response: any) => {
  return {
    type: OTP_LOGIN_SUCCESS,
    payload: response,
  };
};

export const otpLoginFailure = (error: any) => {
  return {
    type: OTP_LOGIN_FAILURE,
    payload: error,
  };
};

/**
 * validateRegisterUser
 * @param state
 * @param action
 */

export const validateRegisterUser = (params: any) => {
  return { type: VALIDATE_REGISTER_USER, payload: params };
};

export const validateRegisterUserSuccess = (response: any) => {
  return {
    type: VALIDATE_REGISTER_USER_SUCCESS,
    payload: response,
  };
};

export const validateRegisterUserFailure = (error: any) => {
  return {
    type: VALIDATE_REGISTER_USER_FAILURE,
    payload: error,
  };
};
