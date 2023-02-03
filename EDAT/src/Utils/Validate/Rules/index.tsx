export const MOBILE_NUMBER_RULES = {
  'mobile_number': {
    presence: { message: 'Mobile number cannot be empty' },
    length: { is: 10, message: 'Mobile number should be 10 number' },
  },
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
  first_name: {
    presence: { allowEmpty: false, message: 'First name cannot be empty' },
    length: { minimum: 3, message: 'First name minimum 3 chars' },
  },
  last_name: {
    presence: false,
  },
  mobile_number: MOBILE_NUMBER_RULES.mobile_number,
  email: {
    presence: { allowEmpty: false, message: 'email cannot be empty' },
    email: {
      message: " Doesn't look like a valid email",
    },
  },
  gender: {
    presence: { allowEmpty: false, message: 'Please Select Gender' },
  },
  aadhar_number: {
    presence: { message: 'Aadhar number cannot be empty' },
    length: { minimum: 12, message: 'Aadhar number must be 12 digits' },
  },
  // department_id: {
  //   presence: { allowEmpty: false, message: 'Please Select course' },
  // },
  // designation_id: {
  //   presence: { allowEmpty: false, message: 'Please Select faculty role' },
  // },
  year_of_passing: {
    presence: { allowEmpty: false, message: 'Select year of passing' },
  },
  graduation: {
    presence: { allowEmpty: false, message: 'Select your highest qualification' },
  },
  details: {
    presence: { allowEmpty: false, message: 'Fill your qualification details' }
  },
  institution: {
    presence: { allowEmpty: false, message: 'Fill your institution' },
  },
  photo: {
    presence: { allowEmpty: false, message: 'Select your photo' },
  }
};

export const STUDENT_FORM_RULES = {
  first_name: {
    presence: { allowEmpty: false, message: 'First name cannot be empty' },
    length: { minimum: 3, message: 'First name minimum 3 chars' },
  },
  last_name: {
    presence: false,
  },
  mobile_number: MOBILE_NUMBER_RULES.mobile_number,
  email: {
    presence: { allowEmpty: false, message: 'email cannot be empty' },
    email: {
      message: " Doesn't look like a valid email",
    },
  },
  gender: {
    presence: { allowEmpty: false, message: 'Please Select Gender' },
  },
  aadhar_number: {
    presence: { message: 'Aadhar number cannot be empty' },
    length: { minimum: 12, message: 'Aadhar number must be 12 digits' },
  },
  department_id: {
    presence: { allowEmpty: false, message: 'Please Select course' },
  },
  year_of_passing: {
    presence: { allowEmpty: false, message: 'Select year of passing' },
  },
  dob: {
    presence: { allowEmpty: false, message: 'Select Date of birth' },
  },
  address: {
    presence: { allowEmpty: false, message: 'Fill address' },
  },
  // pincode: {
  //   presence: false,
  //   length: { is: 6, message: 'Pincode must be 6 digits' },
  // },
  graduation: {
    presence: { allowEmpty: false, message: 'Select your highest qualification' },
  },
  details: {
    presence: { allowEmpty: false, message: 'Fill your qualification details' }
  },
  institution: {
    presence: { allowEmpty: false, message: 'Fill your institution' },
  },
  photo: {
    presence: { allowEmpty: false, message: 'Select your photo' },
  }
};

export const BUSINESS_FORM_RULES = {
  businessName: {
    presence: { allowEmpty: false, message: 'Business Name cannot be empty' },
  },
  businessAddress: {
    presence: { allowEmpty: false, message: 'Business Address cannot be empty' },
  },
  pinCode: {
    presence: { allowEmpty: false, message: 'PinCode cannot be empty' },
    length: { is: 6, message: 'PinCode should be 6 number' },
  },
  ...MOBILE_NUMBER_RULES,
  alternativeMobileNumber: {
    presence: {
      allowEmpty: false,
      message: 'Alternative Mobile number cannot be empty',
    },
    length: { is: 10, message: 'Alternative Mobile number should be 10 number' },
  },
  businessSector: {
    presence: { message: 'Please Select Business Sector' },
  },
  businessServiceType: {
    presence: { message: 'Please Select Business Service Type' },
  },
  serviceProvider: {
    presence: { message: 'Please Select  Service Provider' },
  },
};
