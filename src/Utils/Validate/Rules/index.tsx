export const MOBILE_NUMBER_RULES = {
  'mobile_number': {
    presence: { message: 'Mobile number cannot be empty' },
    length: { is: 10, message: 'Mobile number should be 10 number' },
  },
};


export const FIRST_NAME_RULES = {
  'first_name': {
    presence: { message: 'Full Name cannot be empty' },
    length: { minimum: 3, message: 'Mobile number should be 10 number' },
  },
};





export const ADD_USER_RULES = {
  'first_name': {
    presence: { message: 'First name cannot be empty' },
    length: { minimum: 3, message: 'First name minimum 3 chars' },
  },
  'mobile_number': {
    presence: { message: 'Mobile number cannot be empty' },
    length: { is: 10, message: 'Mobile number should be 10 number' },
  },
  email: {
      email : { message: "doesn't look like a valid email"}
  },
  gender: {
    presence: { message: 'Please Select Gender' },
  },
  'designation_name': {
    presence: {  allowEmpty: false, message: 'Designation cannot be empty' }
  }
};



export const OTP_RULES = {
  'mobile_number': {
    presence: { message: 'Mobile number cannot be empty' },
    length: { is: 10, message: 'Mobile number should be 10 number' },
  },
  'otp': {
    presence: { message: 'Otp cannot be empty' },
    length: { is: 4, message: 'Otp should be 4 number' },
  },
};



export const USER_FORM_RULES = {
  'first_name': {
    presence: { message: 'First name cannot be empty' },
    length: { minimum: 3, message: 'First name minimum 3 chars' },
  },
  'last_name': {
    presence: false,
  },
  email: {
    presence: { allowEmpty: false, message: 'email cannot be empty' },
    email: {
      message: "doesn't look like a valid email",
    },
  },
  gender: {
    presence: { message: 'Please Select Gender' },
  },
  designation: {
    presence: { message: 'Please Select Designation' },
  },
};

export const BUSINESS_FORM_RULES = {
  brand_name: {
    presence: {message: 'Business Name cannot be empty' },
  },
  communication_address: {
    presence: { allowEmpty: false, message: 'Business Address cannot be empty' },
  },
  pincode: {
    presence: { allowEmpty: false, message: 'PinCode cannot be empty' },
    length: { is: 6, message: 'PinCode should be 6 number' },
  },
  mobile_number1: {
    presence: { message: 'Mobile number cannot be empty' },
    length: { is: 10, message: 'Mobile number should be 10 number' },
  },
  mobile_number2: {
    presence: {
      allowEmpty: false,
      message: 'Alternative Mobile number cannot be empty',
    },
    length: { is: 10, message: 'Alternative Mobile number should be 10 number' },
  },
  brand_sector_id: {
    presence: { message: 'Please Select Business Sector' },
  },
  brand_service_type_id: {
    presence: { message: 'Please Select Business Service Type' },
  },
  
};
