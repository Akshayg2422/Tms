export const MOBILE_NUMBER_RULES = {
  mobileNumber: {
    presence: { message: 'Mobile number cannot be empty' },
    length: { is: 10, message: 'Mobile number should be 10 number' },
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
