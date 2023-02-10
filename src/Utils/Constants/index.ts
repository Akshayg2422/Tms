

const ERRORS = {
  SOMETHING_WENT_WRONG: 'Something went wrong, please try again later',
  INVALID_REQUEST: 'Invalid Request',
};

export const USER_TOKEN = 'USER_TOKEN'
export const GENDER_LIST = [
  { id: 'M', text: 'Male' },
  { id: 'F', text: 'Female' },
  { id: 'O', text: 'Others' },
];
export const DESIGNATION_LIST = [
  { id: 'true', text: 'Business Owner' },
  { id: 'false',text: 'Management' },
];

export const LANGUAGES = [
  { id: '1', text: 'English', value: 'en' },
  { id: '2', text: 'Tamil', value: 'ta' },
];

export const type =[
  {id:'1', text:'External',value:'Ext'},
  {id:'2', text:'Internal',value:'Int'},
]

export const DEFAULT_LANGUAGE = LANGUAGES[0]

const TABLE_ELEMENT_TEXT_BUTTON = 1
const TABLE_ELEMENT_TEXT_STATUS = 2
const TABLE_ELEMENT_TEXT_IMAGE = 3
const TABLE_CONTENT_TYPE_REPORT = 1

function isExist(val: any) {
  return val ? val : ''
}

export const LANGUAGE_ENGLISH = 'EN';
export const LANGUAGE_TAMIL = 'TA';


export const BUSINESS = 'business';
export const ERROR_MESSAGE_ALERT = 'A';
export const ERROR_MESSAGE_SHORT_TOAST = 'S';
export const ERROR_MESSAGE_LONG_TOAST = 'L';
export const ERROR_MESSAGE_MEDIUM_TOAST = 'M';

export const OTP_RESEND_DEFAULT_TIME = 9;


export { ERRORS, TABLE_ELEMENT_TEXT_BUTTON, TABLE_ELEMENT_TEXT_STATUS, TABLE_ELEMENT_TEXT_IMAGE, TABLE_CONTENT_TYPE_REPORT, isExist };
