import {
  ValidateUserResponse,
  OtpRegisterResponse,
  OtpLoginResponse,
  ResendRegistrationOtp,
  SubmitRegistrationOtp,
  RegisterUserResponseProps,
} from '@Services';

export interface AuthSliceStateProp {
  loading?: boolean;
  error?: string;
  validateUser?: ValidateUserResponse;
  registeredMobileNumber?: string;
  language?: 'EN' | 'TA';
  resendRegistrationOtp?: ResendRegistrationOtp;
  submitRegistrationOtp?: SubmitRegistrationOtp;
  otpRegister?: OtpRegisterResponse;
  otpLogin?: OtpLoginResponse;
  registerUser?: RegisterUserResponseProps;
  userSelectedLanguage?: string;
}
