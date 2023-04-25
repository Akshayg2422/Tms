import {
  GenericStatusCode,
  UserBusinessPlace,
  OtpRegister,
  RegisterUser,
  ValidateUserBusiness,
  BrandSectorDetailsItem,
  BusinessPlaceDetailsDetailsItem,
  SectorServiceTypes,
} from '@Services';


export interface AuthSliceStateProp {
  loading?: boolean;
  error?: string;
  response?: GenericStatusCode;
  userDetails: any,
  otpRegisterResponse?: OtpRegister;
  registerUserResponse?: RegisterUser;
  registeredMobileNumber?: string;
  alternativeNumber?: string;
  language?: {id: string, text: string, value: string};
  userBusinessPlaces?: UserBusinessPlace;
  validateUserBusinessResponse?: ValidateUserBusiness;
  userSelectedLanguage?: string;
  registerAdminResponse?: GenericStatusCode;
  validateUserNumber?: string;
  selectedGoogleBusinessPlaceId?: string;
  businessSectorDropdownData?: BrandSectorDetailsItem;
  businessServiceTypesDropdownData?: SectorServiceTypes;
  selectedGoogleBusinessPlaceDetails?: BusinessPlaceDetailsDetailsItem;
  notification?: any;
}
