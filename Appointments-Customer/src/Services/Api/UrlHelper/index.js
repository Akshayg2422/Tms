/**
 * sample api
 */

const AUTH = '/authentication/';
const HOME = '/service/';
const STORE = '/company/';
const ORDER = '/order/';

export const VALIDATE_USER = AUTH + 'validateUser';
export const OTP_REGISTER = AUTH + 'otpRegister';
export const SUBMIT_REGISTRATION_OTP = AUTH + 'submitRegistrationOtp';
export const RESEND_REGISTRATION_OTP = AUTH + 'resendRegistrationOtp';
export const OTP_LOGIN = AUTH + 'otpLogin';
export const VALIDATE_REGISTER_USER = AUTH + 'validateRegisterUser';
export const GET_BRAND_BRANCH_CATEGORIES = HOME + 'getBrandBranchCategories';
export const GET_BRAND_BRANCH_SERVICES = HOME + 'getBrandBranchServices';
export const GET_CUSTOMER_HOME_CONTENT = STORE + 'getCustomerHomeContent';
export const GET_STORE_DETAILS = STORE + 'getStoreDetails';
export const VALIDATE_ORDER = ORDER + 'validateOder';
