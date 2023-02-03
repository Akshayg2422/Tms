export interface ValidateUserResponse {
  success: boolean;
  status: string;
  message: string;
  errorMessage: string;
}
export interface OtpLoginResponse {
  success: boolean;
  token: string;
  has_company: boolean;
  message: string;
  has_company_branch_location: boolean;
  company: {};
  company_branch: {};
}

export interface OtpRegisterResponse extends OtpLoginResponse { }

export interface SubmitRegistrationOtp {
  success: boolean;
  status: string;
  message: string;
  token: string;
  is_admin: boolean;
  is_branch_admin: boolean;
  details: {};
}

export interface ResendRegistrationOtp {
  success: boolean;
  message: string;
}

export interface RegisterUserResponseProps {
  success: boolean;
  status: string;
  message: string;
}

export interface BrandBranchCategories extends RegisterUserResponseProps {
  details: [];
}

export interface BrandBranchServices extends RegisterUserResponseProps {
  data: [];
}

export interface CustomerHomeContentFooterItem {
  order: number;
  text: string;
}

export interface StoreDetails extends OtpLoginResponse {
  error: {};
}
