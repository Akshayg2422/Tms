import { post } from '../ApiHelper';
import {
  VALIDATE_USER,
  OTP_REGISTER,
  SUBMIT_REGISTRATION_OTP,
  RESEND_REGISTRATION_OTP,
  OTP_LOGIN,
  VALIDATE_REGISTER_USER,
  GET_BRAND_BRANCH_CATEGORIES,
  GET_BRAND_BRANCH_SERVICES,
  GET_CUSTOMER_HOME_CONTENT,
  GET_STORE_DETAILS,
} from '../UrlHelper';

export const validateUserApi = payload => post(VALIDATE_USER, payload, {});
export const otpRegisterApi = payload => post(OTP_REGISTER, payload, {});
export const submitRegistrationOtpApi = payload =>
  post(SUBMIT_REGISTRATION_OTP, payload, {});
export const resendRegistrationOtpApi = payload =>
  post(RESEND_REGISTRATION_OTP, payload, {});
export const otpLoginApi = payload => post(OTP_LOGIN, payload, {});
export const validateRegisterUserApi = payload =>
  post(VALIDATE_REGISTER_USER, payload, {});
export const getBrandBranchCategoriesApi = payload =>
  post(GET_BRAND_BRANCH_CATEGORIES, payload, {});
export const getBrandBranchServicesApi = payload =>
  post(GET_BRAND_BRANCH_SERVICES, payload, {});
export const getCustomerHomeContentApi = payload =>
  post(GET_CUSTOMER_HOME_CONTENT, payload, {});
export const getStoreDetailsApi = payload =>
  post(GET_STORE_DETAILS, payload, {});
