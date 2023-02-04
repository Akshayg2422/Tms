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
  REGISTER_ADMIN,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_ADMIN_FAILURE,
  BRAND_SECTOR,
  BRAND_SECTOR_SUCCESS,
  BRAND_SECTOR_FAILURE,
  BUSINESS_PLACES_DETAILS,
  BUSINESS_PLACES_DETAILS_SUCCESS,
  BUSINESS_PLACES_DETAILS_FAILURE,
  SET_ALTERNATIVE_MOBILE_NUMBER,
  REGISTER_COMPANY,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_FAILURE,
  SECTOR_SERVICE_TYPES,
  SECTOR_SERVICE_TYPES_SUCCESS,
  SECTOR_SERVICE_TYPES_FAILURE,
  SELECT_BUSINESS_PLACE_ID,
  SET_LANGUAGE,
  SET_REGISTER_MOBILE_NUMBER,
  OTP_LOGIN,
OTP_LOGIN_SUCCESS,
OTP_LOGIN_FAILURE,
} from '../ActionTypes';


export type {RadioItem} from '@Components'

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

  return {type: VALIDATE_REGISTER_USER, payload: params};
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

  console.log(JSON.stringify(params)+"=====validateUserBusiness");
  
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
 * Register admin
 */

export const registerAdmin = (params: any) => {
  return {
    type: REGISTER_ADMIN,
    payload: params,
  };
};

export const registerAdminSuccess = (response: any) => {
  return {
    type: REGISTER_ADMIN_SUCCESS,
    payload: response,
  };
};

export const registerAdminFailure = (error: any) => {
  return {
    type: REGISTER_ADMIN_FAILURE,
    payload: error,
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
 * register company
 */

export const registerCompany = (params: any) => {
  console.log(params,"naveen===>registercompany params")
  return {
    type: REGISTER_COMPANY,
    payload: params,
  };
};

export const registerCompanySuccess = (response: any) => {
  console.log(response,"naveen==>reg com success")
  return {
    type: REGISTER_COMPANY_SUCCESS,
    payload: response,
  };
};

export const registerCompanyFailure = (error: any) => {
  return {
    type: REGISTER_COMPANY_FAILURE,
    payload: error,
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
