export interface ValidateUserBusiness {
  success: boolean;
  status: string;
  message_duration: 'A' | 'S' | 'L' | 'M';
  error_message: string;
  status_code: number;
}

export interface GenericStatusCode {
  success: boolean;
  status: string;
  message: string;
  errorMessage: string;
}

export interface RegisterUser {
  success: boolean;
  status: string;
  message: string;
}

export interface OtpRegister {
  success: boolean;
  status: string;
  status_code: number;
  message_duration: string;
  error_message: string;
}
export interface UserBusinessPlaceItem extends GenericStatusCode {
  place_id: string;
  title: string;
  address: string;
}

export interface UserBusinessPlace extends GenericStatusCode {
  details: Array<UserBusinessPlaceItem>;
}




export interface CommonApi {
  success: boolean;
  status: string;
  message: string;
}

export interface BrandSectorDetailsItem {
  id: string;
  name: string;
}
export interface BrandSectors extends CommonApi {
  details: Array<BrandSectorDetailsItem>;
}

export interface BusinessPlaceDetailsDetailsItem {
  business_name: string;
  business_address: string;
  pin_code: string;
  contact_number: string;
  maps_url: string;
}
export interface BusinessPlaceDetails extends CommonApi {
  details: BusinessPlaceDetailsDetailsItem;
}
export interface SectorServiceTypesDetailsItem {
  id: string;
  name: string;
  sector_id: string;
}

export interface SectorServiceTypes extends CommonApi {
  details: SectorServiceTypesDetailsItem;
}

export interface RegisterCompany {
  detail: string;
}

export interface CommonApi {
  success: boolean;
  status: string;
  message: string;
}

export interface BrandSectorDetailsItem {
  id: string;
  name: string;
}
export interface BrandSectors extends CommonApi {
  details: Array<BrandSectorDetailsItem>;
}

export interface BusinessPlaceDetailsDetailsItem {
  business_name: string;
  business_address: string;
  pin_code: string;
  contact_number: string;
  maps_url: string;
}
export interface BusinessPlaceDetails extends CommonApi {
  details: BusinessPlaceDetailsDetailsItem;
}
export interface SectorServiceTypesDetailsItem {
  id: string;
  name: string;
  sector_id: string;
}

export interface SectorServiceTypes extends CommonApi {
  details: SectorServiceTypesDetailsItem;
}

export interface RegisterCompany {
  detail: string;
}


