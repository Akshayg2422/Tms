export const MOBILE_NUMBER_RULES = {
  mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  },
};

// export const FIRST_NAME_RULES = {
//   first_name: {
//     presence: { message: 'Full Name cannot be empty' },
//     length: { minimum: 3, message: 'First name minimum 3 chars' },
//   },
// };

export const ADD_USER_RULES = {
  first_name: {
    presence: { message: "First name cannot be empty" },
    length: { minimum: 3, message: "First name minimum 3 chars" },
  },
  mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  },
  email: {
    email: { message: "doesn't look like a valid email" },
  },
  gender: {
    presence: { message: "Please Select Gender" },
  },
  designation_name: {
    presence: { allowEmpty: false, message: "Designation cannot be empty" },
  },
};

export const OTP_RULES = {
  mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  },
  otp: {
    presence: { message: "Otp cannot be empty" },
    length: { is: 4, message: "Otp should be 4 number" },
  },
};

export const BUSINESS_FORM_RULES = {
  registered_name: {
    presence: { message: "Name cannot be empty" },
    length: { minimum: 3, message: "Name minimum 3 chars" },
  },
  communication_address: {
    presence: { allowEmpty: false, message: "Address cannot be empty" },
  },
  pincode: {
    presence: { allowEmpty: false, message: "PinCode cannot be empty" },
    length: { is: 6, message: "PinCode should be 6 number" },
  },
  attachment_logo:{
    presence: { allowEmpty: false, message: "Attach cannot be empty" }

  },

  mobile_number2: MOBILE_NUMBER_RULES.mobile_number,
};

export const USER_FORM_RULES = {
  first_name: {
    presence: { message: "Name cannot be empty" },
    length: { minimum: 3, message: "Name minimum 3 chars" },
  },
  mobile_number: MOBILE_NUMBER_RULES.mobile_number,

  email: {
    email: {
      message: "doesn't look like a valid email",
    },
  },
  gender: {
    presence: { message: "Please Select Gender" },
  },
  designation: {
    presence: { message: "please select Designation" },
  },
};

export const CREATE_TICKET = {
  title: {
    presence: { allowEmpty: false, message: "title cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  reference_number: {
    presence: { allowEmpty: false, message: "referenceNo cannot be empty" },
  },

  assigned_to_id: {
    presence: { allowEmpty: false, message: "please select User" },
  },
  priority:{
    presence: { allowEmpty: false, message: "please select priority" },
  
  },
  
  ticket_attachments:{
   presence: { allowEmpty: false, message: "attachments cannot be empty" },
   

    
  }
    // length: { minimum: 2, message: "attachments cannot be empty" },



};

export const CREATE_BROAD_CAST = {

  title: {
    presence: { allowEmpty: false, message: "title cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  applicable_branches_ids:{
    presence: { allowEmpty: false, message: "Company cannot be empty" },

  },
  broadcast_attachments:
  { 
    presence: { message: "attachments cannot be empty" },
  
  }
  }
 
  export const CREATE_BROAD_CAST_INTERNAL= {

    title: {
      presence: { allowEmpty: false, message: "title cannot be empty" },
    },
    description: {
      presence: { allowEmpty: false, message: "description cannot be empty" },
    },
    broadcast_attachments:
    { 
      presence: { message: "attachments cannot be empty" },
    
    }

    }
