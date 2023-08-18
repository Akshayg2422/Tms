import {
  VALIDATE_USER,
  VALIDATE_USER_FAILURE,
  VALIDATE_USER_SUCCESS,
  VALIDATE_REGISTER_USER,
  VALIDATE_REGISTER_USER_SUCCESS,
  VALIDATE_REGISTER_USER_FAILURE,
  CLEAR_VALIDATE_REGISTER_USER,
  OTP_REGISTER,
  OTP_REGISTER_SUCCESS,
  OTP_REGISTER_FAILURE,
  CLEAR_OTP_REGISTER,
  GET_USER_BUSINESS_PLACES,
  GET_USER_BUSINESS_PLACES_SUCCESS,
  GET_USER_BUSINESS_PLACES_FAILURE,
  RESET_SEARCHED_BUSINESS_PLACES,
  VALIDATE_USER_BUSINESS,
  VALIDATE_USER_BUSINESS_SUCCESS,
  VALIDATE_USER_BUSINESS_FAILURE,
  CLEAR_VALIDATE_USER_BUSINESS,
  GET_RESEND_OTP_SUCCESS,
  
  BRAND_SECTOR,
  BRAND_SECTOR_SUCCESS,
  BRAND_SECTOR_FAILURE,
  BUSINESS_PLACES_DETAILS,
  BUSINESS_PLACES_DETAILS_SUCCESS,
  BUSINESS_PLACES_DETAILS_FAILURE,
  SET_ALTERNATIVE_MOBILE_NUMBER,
 
  SECTOR_SERVICE_TYPES,
  SECTOR_SERVICE_TYPES_SUCCESS,
  SECTOR_SERVICE_TYPES_FAILURE,
  SELECT_BUSINESS_PLACE_ID,
  SET_LANGUAGE,
  SET_REGISTER_MOBILE_NUMBER,
  OTP_LOGIN,
  OTP_LOGIN_SUCCESS,
  OTP_LOGIN_FAILURE,
  RESTORE_AUTH,
  PUSH_NOTIFICATION,
  PUSH_NOTIFICATION_SUCCESS,
  PUSH_NOTIFICATION_FAILURE,
  GET_RESEND_OTP,
  GET_RESEND_OTP_FAILURE
} from '../ActionTypes';


export type { RadioItem } from '@Components'

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
    type: VALIDATE_USER_FAILURE,
    payload: error,
  };
};
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



export const clearValidateRegisterUser = () => {
  return {
    type: CLEAR_VALIDATE_REGISTER_USER,
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
 * Otp Register
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



//RESEND OTP

export const getReSendOtp = (params: any) => {
  return {
    type: GET_RESEND_OTP,
    payload: params,
  };
};

export const getReSendOtpSuccess = (response: any) => {
  return {
    type: GET_RESEND_OTP_SUCCESS,
    payload: response,
  };
};

export const getReSendOtpFailure = (error: any) => {
  return {
    type: GET_RESEND_OTP_FAILURE,
    payload: error,
  };
};


export const clearOtpRegister = () => {
  return {
    type: CLEAR_OTP_REGISTER,
  };
};

/**
 * get Business Places
 */

export const getUserBusinessPlaces = (params: any) => {
  return {
    type: GET_USER_BUSINESS_PLACES,
    payload: params,
  };
};

export const getUserBusinessPlacesSuccess = (response: any) => {
  return {
    type: GET_USER_BUSINESS_PLACES_SUCCESS,
    payload: response,
  };
};
export const getUserBusinessPlacesFailure = (error: any) => {
  return {
    type: GET_USER_BUSINESS_PLACES_FAILURE,
    payload: error,
  };
};

/**
 * reset Business places
 */

export const resetSearchedBusinessPlaces = () => {
  return {
    type: RESET_SEARCHED_BUSINESS_PLACES,
  };
};

/**
 * Validate User Business
 * @param state
 * @param action
 */

export const validateUserBusiness = (params: any) => {
  return {
    type: VALIDATE_USER_BUSINESS,
    payload: params,
  };
};

export const validateUserBusinessSuccess = (response: any) => {
  return {
    type: VALIDATE_USER_BUSINESS_SUCCESS,
    payload: response,
  };
};

export const validateUserBusinessFailure = (error: any) => {
  return {
    type: VALIDATE_USER_BUSINESS_FAILURE,
    payload: error,
  };
};

export const clearValidateUserBusiness = () => {
  return {
    type: CLEAR_VALIDATE_USER_BUSINESS,
  };
};


/**
 * Brand Sectors
 */

export const brandSectors = (params: any) => {
  return {
    type: BRAND_SECTOR,
    payload: params,
  };
};

export const brandSectorsSuccess = (response: any) => {
  return {
    type: BRAND_SECTOR_SUCCESS,
    payload: response,
  };
};

export const brandSectorsFailure = (error: any) => {
  return {
    type: BRAND_SECTOR_FAILURE,
    payload: error,
  };
};

/**
 * Business Place Details
 */

export const businessPlaceDetails = (params: any) => {
  return {
    type: BUSINESS_PLACES_DETAILS,
    payload: params,
  };
};

export const businessPlaceDetailsSuccess = (response: any) => {
  return {
    type: BUSINESS_PLACES_DETAILS_SUCCESS,
    payload: response,
  };
};

export const businessPlaceDetailsFailure = (error: any) => {
  return {
    type: BUSINESS_PLACES_DETAILS_FAILURE,
    payload: error,
  };
};
/**
 * setAlternativeNumber
 */

export const setAlternativeMobileNumber = (params: any) => {
  return {
    type: SET_ALTERNATIVE_MOBILE_NUMBER,
    payload: params,
  };
};





/**
 * Sector Service Types
 */

export const sectorServiceTypes = (params: any) => {
  return {
    type: SECTOR_SERVICE_TYPES,
    payload: params,
  };
};

export const sectorServiceTypesSuccess = (response: any) => {
  return {
    type: SECTOR_SERVICE_TYPES_SUCCESS,
    payload: response,
  };
};

export const sectorServiceTypesFailure = (error: any) => {
  return {
    type: SECTOR_SERVICE_TYPES_FAILURE,
    payload: error,
  };
};

/**
 * set selected google business place id
 */

export const selectedBusinessPlaceId = (params: any) => {
  return {
    type: SELECT_BUSINESS_PLACE_ID,
    payload: params,
  };
};

export const setLanguage = (params: any) => {
  return {
    type: SET_LANGUAGE,
    payload: params,
  };
};

export const setRegisteredMobileNumber = (params: any) => {
  return {
    type: SET_REGISTER_MOBILE_NUMBER,
    payload: params,
  };
};

export const restoreAuth = () => {
  return {
    type: RESTORE_AUTH,

  };
};

/* PUSH NOTIFICATION */

export const addPushNotification = (params: any) => {
  return {
    type: PUSH_NOTIFICATION,
    payload: params,
  };
};

export const addPushNotificationSuccess = (response: any) => {
  return {
    type: PUSH_NOTIFICATION_SUCCESS,
    payload: response,
  };
};

export const addPushNotificationFailure = (error: any) => {
  return {
    type: PUSH_NOTIFICATION_FAILURE,
    payload: error,
  };
};

