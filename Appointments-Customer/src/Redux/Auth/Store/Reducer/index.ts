import {
  VALIDATE_USER,
  VALIDATE_USER_SUCCESS,
  VALIDATE_USER_FAIL,
  OTP_REGISTER,
  OTP_REGISTER_SUCCESS,
  OTP_REGISTER_FAILURE,
  OTP_LOGIN,
  OTP_LOGIN_SUCCESS,
  OTP_LOGIN_FAILURE,
  VALIDATE_REGISTER_USER,
  VALIDATE_REGISTER_USER_SUCCESS,
  VALIDATE_REGISTER_USER_FAILURE,
  SUBMIT_REGISTRATION_OTP,
  SUBMIT_REGISTRATION_OTP_SUCCESS,
  SUBMIT_REGISTRATION_OTP_FAILURE,
  RESEND_REGISTRATION_OTP,
  RESEND_REGISTRATION_OTP_FAILURE,
  RESEND_REGISTRATION_OTP_SUCCESS,
} from '../ActionTypes';
import { AuthSliceStateProp } from '../../Interfaces';
import { LANGUAGE_ENGLISH } from '@Utils';

const LANGUAGE_DEFAULT = LANGUAGE_ENGLISH;

const initialState: AuthSliceStateProp = {
  error: '',
  validateUser: undefined,
  language: LANGUAGE_DEFAULT,
  otpRegister: undefined,
  otpLogin: undefined,
  registerUser: undefined,
  registeredMobileNumber: undefined,
  submitRegistrationOtp: undefined,
  resendRegistrationOtp: undefined,
};

const AuthReducer = (state: AuthSliceStateProp = initialState, action: any) => {
  switch (action.type) {
    case VALIDATE_USER:
      state = {
        ...state,
        validateUser: action.payload,
        registeredMobileNumber: action.payload.params.mobile_number,
      };

      break;
    case VALIDATE_USER_SUCCESS:
      state = {
        ...state,
        validateUser: action.payload.params,
      };
      break;
    case VALIDATE_USER_FAIL:
      state = { ...state, loading: false };
      break;

    case OTP_REGISTER:
      state = {
        ...state,
        otpRegister: action.payload,
      };
      break;
    case OTP_REGISTER_SUCCESS:
      state = { ...state, otpRegister: action.payload };
      break;
    case OTP_REGISTER_FAILURE:
      state = { ...state, otpRegister: action.payload };
      break;

    case OTP_LOGIN:
      state = { ...state };
      break;
    case OTP_LOGIN_SUCCESS:
      state = { ...state, otpLogin: action.payload };
      break;
    case OTP_LOGIN_FAILURE:
      state = { ...state, otpLogin: action.payload };
      break;

    case SUBMIT_REGISTRATION_OTP:
      state = {
        ...state,
        submitRegistrationOtp: action.payload,
      };
      break;
    case SUBMIT_REGISTRATION_OTP_SUCCESS:
      state = { ...state };
      break;
    case SUBMIT_REGISTRATION_OTP_FAILURE:
      state = { ...state };
      break;

    case RESEND_REGISTRATION_OTP:
      state = {
        ...state,
        resendRegistrationOtp: action.payload,
      };
      break;
    case RESEND_REGISTRATION_OTP_SUCCESS:
      state = { ...state };
      break;
    case RESEND_REGISTRATION_OTP_FAILURE:
      state = { ...state };
      break;

    case VALIDATE_REGISTER_USER:
      state = {
        ...state,
        registeredMobileNumber: action.payload.mobile_number,
      };
      break;
    case VALIDATE_REGISTER_USER_SUCCESS:
      state = { ...state };
      break;
    case VALIDATE_REGISTER_USER_FAILURE:
      state = { ...state, registerUser: action.payload };
      break;

    default:
      state = state;
      break;
  }
  return state;
};

export { AuthReducer };
