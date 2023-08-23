import {
  VALIDATE_USER,
  VALIDATE_USER_FAILURE,
  VALIDATE_USER_SUCCESS,
  VALIDATE_REGISTER_USER,
  VALIDATE_REGISTER_USER_SUCCESS,
  VALIDATE_REGISTER_USER_FAILURE,
  VALIDATE_USER_BUSINESS,
  VALIDATE_USER_BUSINESS_SUCCESS,
  VALIDATE_USER_BUSINESS_FAILURE,
  SET_REGISTER_MOBILE_NUMBER,
  SET_LANGUAGE,
  SET_ALTERNATIVE_MOBILE_NUMBER,
  OTP_REGISTER,
  OTP_REGISTER_SUCCESS,
  OTP_REGISTER_FAILURE,
  GET_USER_BUSINESS_PLACES,
  GET_USER_BUSINESS_PLACES_SUCCESS,
  GET_USER_BUSINESS_PLACES_FAILURE,
 
  BRAND_SECTOR,
  BRAND_SECTOR_SUCCESS,
  BRAND_SECTOR_FAILURE,
  BUSINESS_PLACES_DETAILS,
  BUSINESS_PLACES_DETAILS_SUCCESS,
  BUSINESS_PLACES_DETAILS_FAILURE,

  SECTOR_SERVICE_TYPES,
  SECTOR_SERVICE_TYPES_SUCCESS,
  SECTOR_SERVICE_TYPES_FAILURE,
  SELECT_BUSINESS_PLACE_ID,
  OTP_LOGIN,
  OTP_LOGIN_FAILURE,
  OTP_LOGIN_SUCCESS,
  RESTORE_AUTH,
  PUSH_NOTIFICATION,
  PUSH_NOTIFICATION_SUCCESS,
  PUSH_NOTIFICATION_FAILURE,
  GET_RESEND_OTP,
  GET_RESEND_OTP_SUCCESS,
  GET_RESEND_OTP_FAILURE,
} from '../ActionTypes';
import { AuthSliceStateProp } from '../../Interfaces';
import { DEFAULT_LANGUAGE } from '@Utils';

const initialState: AuthSliceStateProp = {
  loading: false,
  error: '',
   response: undefined,
  userDetails: undefined,
  registeredMobileNumber: undefined,
  language: { id: '1', text: 'English', value: 'en' },
  registerUserResponse: undefined,
  otpRegisterResponse: undefined,
  userBusinessPlaces: undefined,
  validateUserNumber: undefined,
  validateUserBusinessResponse: undefined,
  userSelectedLanguage: undefined,
 
  selectedGoogleBusinessPlaceId: undefined,
  selectedGoogleBusinessPlaceDetails: undefined,
  businessSectorDropdownData: undefined,
  businessServiceTypesDropdownData: undefined,
  alternativeNumber: undefined,
  notification: undefined,
  reSendOtp:undefined,
  selectedAuthId:undefined
};

const AuthReducer = (state: AuthSliceStateProp = initialState, action: any) => {
  switch (action.type) {
    case RESTORE_AUTH:
      state = initialState;
      break;


    case VALIDATE_USER:
      state = { ...state, loading: true };
      break;
    case VALIDATE_USER_SUCCESS:
      state = { ...state, response: action.payload };
      break;
    case VALIDATE_USER_FAILURE:
      state = { ...state, loading: false };
      break;
    case VALIDATE_REGISTER_USER:
      state = {
        ...state,
        registeredMobileNumber: action.payload.params.mobile_number,
        language: action.payload.ln,
      };
      break;
    case VALIDATE_REGISTER_USER_SUCCESS:
      state = {
        ...state,
        registerUserResponse: action.payload,
        userSelectedLanguage: action.payload.ln,
      };
      break;
    case VALIDATE_REGISTER_USER_FAILURE:
      state = { ...state, registerUserResponse: action.payload };
      break;
    case OTP_REGISTER:
      state = { ...state };
      break;
    case OTP_REGISTER_SUCCESS:
      state = { ...state, otpRegisterResponse: action.payload };
      break;
    case OTP_REGISTER_FAILURE:
      state = { ...state, otpRegisterResponse: action.payload };
      break;

    /**
     * otp login
     */

    //resend
    case GET_RESEND_OTP:
      state = { ...state };
      break;
    case GET_RESEND_OTP_SUCCESS:
      state = { ...state, reSendOtp:action.payload };
      break;
    case GET_RESEND_OTP_FAILURE:
      state = { ...state, reSendOtp: action.payload };
      break;

      //

    case OTP_LOGIN:
      state = { ...state };
      break;
    case OTP_LOGIN_SUCCESS:
      state = { ...state, userDetails: action.payload.details };
      break;
    case OTP_LOGIN_FAILURE:
      state = { ...state, userDetails: action.payload };
      break;

    case GET_USER_BUSINESS_PLACES:
      state = { ...state };
      break;
    case GET_USER_BUSINESS_PLACES_SUCCESS:
      state = { ...state, userBusinessPlaces: action.payload.details };
      break;
    case GET_USER_BUSINESS_PLACES_FAILURE:
      state = { ...state, userBusinessPlaces: action.payload };
      break;
    case VALIDATE_USER_BUSINESS:
      state = { ...state, validateUserBusinessResponse: undefined };
      break;
    case VALIDATE_USER_BUSINESS_SUCCESS:
      state = {
        ...state,
        validateUserBusinessResponse: action.payload,
        userSelectedLanguage: action.payload.ln,
      };
      break;
    case VALIDATE_USER_BUSINESS_FAILURE:
      state = { ...state, validateUserBusinessResponse: action.payload };
      break;
    
    case BRAND_SECTOR:
      state = { ...state, businessSectorDropdownData: undefined };
      break;
    case BRAND_SECTOR_SUCCESS:
      state = { ...state, businessSectorDropdownData: action.payload.details };
      break;
    case BRAND_SECTOR_FAILURE:
      state = { ...state, response: action.payload };
      break;
    case BUSINESS_PLACES_DETAILS:
      state = { ...state };
      break;
    case BUSINESS_PLACES_DETAILS_SUCCESS:
      state = {
        ...state,
        selectedGoogleBusinessPlaceDetails: action.payload.details,
      };
      break;
    case BUSINESS_PLACES_DETAILS_FAILURE:
      state = { ...state, response: action.payload };
      break;
    case SET_ALTERNATIVE_MOBILE_NUMBER:
      state = { ...state, alternativeNumber: action.payload };
      break;
  
    case SECTOR_SERVICE_TYPES:
      state = { ...state };
      break;
    case SECTOR_SERVICE_TYPES_SUCCESS:
      state = {
        ...state,
        businessServiceTypesDropdownData: action.payload.details,
      };
      break;
    case SECTOR_SERVICE_TYPES_FAILURE:
      state = { ...state, response: action.payload };
      break;
    case SELECT_BUSINESS_PLACE_ID:
      state = { ...state, selectedGoogleBusinessPlaceId: action.payload };
      break;
    case SET_REGISTER_MOBILE_NUMBER:
      state = { ...state, registeredMobileNumber: action.payload };
      break;
    case SET_LANGUAGE:
      state = { ...state, language: action.payload };
      break;

    
    /*PUSH NOTIFICATION */

    case PUSH_NOTIFICATION:
      state = { ...state };
      break;
    case PUSH_NOTIFICATION_SUCCESS:
      state = { ...state, notification: action.payload.details };
      break;
    case PUSH_NOTIFICATION_FAILURE:
      state = { ...state, notification: action.payload };
      break;

    default:
      state = state;
      break;
  }
  return state;
};
export { AuthReducer };
