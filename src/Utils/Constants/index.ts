

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
  { id: 'false', text: 'Management' },
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

/* Event types Status Code */

export const MEA = 'MEA'
export const TGU = 'TGU'
export const RGU = 'RGU'
export const TEM = 'TEM'
export const EVS = 'EVS'
export const RTS = 'RTS'

export const FILTERED_TICKET_LIST=[
  {id:'all',text:'ALL'},
  {id:'created_by',text:'CREATED'},
  {id:'assigned_to',text:'ASSIGNED'},
  {id:'tagged_to',text:'TAGGED'}
];

export const ISSUES_LIST = [
  {id:'',text:'ALL'},
  {id:'RAI',text:'RAISED'},
  {id:'INP',text:'IN-PROGRASS'},
  {id:'CAN',text:'CANCEL'},
  {id:"CLS",text:'CLOSE'},
  {id:'ONH',text:'ON-HOLD'},
  {id:'REJ',text:'REJECT'}

]
 

export { ERRORS, TABLE_ELEMENT_TEXT_BUTTON, TABLE_ELEMENT_TEXT_STATUS, TABLE_ELEMENT_TEXT_IMAGE, TABLE_CONTENT_TYPE_REPORT, isExist };
