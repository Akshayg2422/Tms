import {post} from '../ApiHelper';
import {
  VALIDATE_USER,
  VALIDATE_REGISTER_USER,
  OTP_REGISTER,
  VALIDATE_USER_BUSINESS,
  GET_BUSINESS_PLACES,
  REGISTER_ADMIN,
  BRAND_SECTORS,
  BUSINESS_PLACES_DETAILS,
  REGISTER_COMPANY,
  SECTOR_SERVICE_TYPES,
} from '../UrlHelper';

export const validateUserApi = payload => post(VALIDATE_USER, payload, {});
export const validateRegisterUserApi = payload =>
  post(VALIDATE_REGISTER_USER, payload, {});
export const otpRegisterApi = payload => post(OTP_REGISTER, payload, {});
export const getBusinessPlacesApi = payload =>
  post(GET_BUSINESS_PLACES, payload, {});
export const validateUserBusinessApi = payload =>
  post(VALIDATE_USER_BUSINESS, payload, {});
export const registerAdminApi = payload => post(REGISTER_ADMIN, payload, {});
export const getBrandSectorsApi = payload => post(BRAND_SECTORS, payload, {});
export const getBusinessPlaceDetailsApi = payload =>
  post(BUSINESS_PLACES_DETAILS, payload, {});
export const registerCompanyApi = payload =>
  post(REGISTER_COMPANY, payload, {});
export const SectorServiceTypesApi = payload =>
  post(SECTOR_SERVICE_TYPES, payload, {});
