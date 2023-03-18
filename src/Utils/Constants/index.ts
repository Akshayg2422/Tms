

export const ERRORS = {
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

export const type = [
  { id: '1', text: 'External', value: 'Ext' },
  { id: '2', text: 'Internal', value: 'Int' },
]

export const DEFAULT_LANGUAGE = LANGUAGES[0]


export function isExist(val: any) {
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

export const FILTERED_TICKET_LIST = [
  { id: 'all', text: 'All' },
  { id: 'created_by', text: 'Created' },
  { id: 'assigned_to', text: 'Assigned' },
  { id: 'tagged_to', text: 'Tagged' }
];

export const ISSUES_LIST = [
  { id: 'ALL', text: 'All' },
  { id: 'RAI', text: 'Raised' },
  { id: 'INP', text: 'In-Prograss' },
  { id: 'CAN', text: 'Cancel' },
  { id: "CLS", text: 'Close' },
  { id: 'ONH', text: 'On-Hold' },
  { id: 'REJ', text: 'Reject' }

]


export const TICKET_PRIORITY = [
  { id: 1, text: "Lowest", color: "black" },
  { id: 2, text: "Low", color: "black" },
  { id: 3, text: "Medium", color: "orange" },
  { id: 4, text: "High", color: "red" },
  { id: 5, text: "Urgent", color: "gray" },
];


export const SEARCH_PAGE = 1
