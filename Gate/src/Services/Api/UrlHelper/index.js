/**
 * sample api
 */

const AUTH = '/authentication/';

export const VALIDATE_USER = AUTH + 'validateUser';
export const VALIDATE_REGISTER_USER = AUTH + 'validateRegistrationUser';
export const OTP_REGISTER = AUTH + 'otpRegister';
export const OTP_LOGIN = AUTH + 'otpLogin';
export const GET_BUSINESS_PLACES = AUTH + 'getBusinessPlaces';
export const VALIDATE_USER_BUSINESS = AUTH + 'validateUserBusiness';
export const BUSINESS_PLACES_DETAILS = AUTH + 'getBusinessPlaceDetails';
export const REGISTER_COMPANY = AUTH + 'registerCompany';
export const REGISTER_ADMIN = AUTH + 'registerAdmin';

/**
 *  Company
 */
const COMPANY = '/company/';

export const URL_GET_STORE_DETAILS = COMPANY + 'getStoreDetails';




export const BRAND_SECTORS = COMPANY + 'getBrandSectors';

/**
 *  Service
 */
const SERVICE = '/service/';

export const SECTOR_SERVICE_TYPES = SERVICE + 'getSectorServiceTypes';
