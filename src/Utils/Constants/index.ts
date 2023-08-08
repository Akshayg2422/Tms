import { icons } from "@Assets";
import { translate } from "@I18n";
import moment from "moment";

export const DEFAULT_TASK_GROUP = { id: 'ALL', Photo: null, code: "ALL" }

export const TODAY = moment().format("YYYY-MM-DD");
// export const TODAY = moment().format(" MMM DD YYYY hh:mm A"); 

export const ERRORS = {
  SOMETHING_WENT_WRONG: 'Something went wrong, please try again later',
  INVALID_REQUEST: 'Invalid Request',
};

export const USER_TOKEN = 'USER_TOKEN'

export const FCM_TOKEN = 'FCM_TOKEN'




// export const GENDER_LIST = [
//   { id: 'M', text: 'Male' },
//   { id: 'F', text: 'Female' },
//   { id: 'O', text: 'Others' },
// ];

export const GENDER_LIST = [
  { id: 'M', text: translate('common.Male')! },
  { id: 'F', text: translate('common.Female')! },
  { id: 'O', text: translate('common.Others')! },
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

export const assignedToType = [
  { id: '1', text: 'User', value: 'usr' },
  { id: '2', text: 'Department', value: 'dep' },
  { id: '3', text: 'Designation', value: 'des' },
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

export const OTP_RESEND_DEFAULT_TIME = 59;

/* Event types Status Code */

export const MEA = 'MEA'
export const TGU = 'TGU'
export const RGU = 'RGU'
export const TEM = 'TEM'
export const EVS = 'EVS'
export const RTS = 'RTS'
export const ETA = 'ETA'



export const TASK_FILTER_LIST = [
  { id: 'ALL', text: translate('common.All')! },
  // { id: 'created_by', text: translate('product.Created by me')! },
  { id: 'assigned_to', text: translate('product.assigned To Me')! },
  // { id: 'tagged_to', text: translate('product.tagged')! },
  { id: 'assigned_by_company', text: 'Assigned By Company'},
  { id: 'advance', text: 'Advanced' },
 

];

export const TASK_FILTER_LIST_CREATED_BY = [
  { id: 'ALL', text: translate('common.All')! },
   { id: 'created_by', text: translate('product.Created by me')! },
  // { id: 'assigned_to', text: translate('product.assigned To Me')! },
  // { id: 'tagged_to', text: translate('product.tagged')! },

  { id: 'created_by_company', text: 'Created by Company' },
  { id: 'advance', text: 'Advanced' },
 
 
];

export const TASK_FILTER_ALL={id: 'ALL', name: 'All' }
export const TASK_COMPANY_FILTER={ id: '', display_name: '𝗦𝗘𝗟𝗙', name: 'self' }


export const TASK_STATUS_LIST = [
  { id: 'ALL', text: translate('common.All')! },
  { id: 'RAI', text: translate('product.Raised')!, color: "gray" },
  { id: 'INP', text: translate('product.In-Progress')!, color: "yellow" },
  { id: 'CAN', text: translate('product.cancel')!, color: "red" },
  { id: "CLS", text: translate('product.Close')!, color: "red" },
  { id: 'ONH', text: translate('product.On-Hold')!, color: "black" },
  { id: 'REJ', text: translate('product.Reject')!, color: "red" }

]

export const 
USER_RECORDS = [
  
  {id:'TSK',   text: 'Task', type: 'TSK'},
  {
  id: 'MET',

  text: 'Meeting',
  type: 'MET',
  },
  {id:'BRK', text: 'Break', Type: 'BRK'},
  {
  id: 'STP',

  text: 'StandUp',
  type: 'STP',
  },
  {
  id: 'GRO',

  text: 'Grooming',
  type: 'GRO',
  },
  {
  id: 'HOL',
 
  text: 'Technical Discussion',
  type: 'HOL',
  },
  {
  id: 'TDN',

  text: 'knowledge Transfer',
  type: 'TDN',
  },
  {
  id: 'KTR',
 
  text: 'Holiday',
  type: 'KTR',
  },
  {
  id:'PER',
 
  text: 'Permission',
  type: 'PER',
  },
  {
  id:'WKF',
 text: 'Week Off',
  type: 'WKF',
  },
  ];


export const TASK_PRIORITY_LIST = [
  { id: 'ALL', text: translate('common.All')! },
  { id: 1, text: translate('product.Lowest')!, color: "black" },
  { id: 2, text: translate('product.Low')!, color: "black" },
  { id: 3, text: translate('product.Medium')!, color: "orange" },
  { id: 4, text: translate('product.High')!, color: "red" },
  { id: 5, text: translate('product.Critical')!, color: "gray" },
];

export const TICKET_FILTER_LIST = [
  { id: 'ALL', text: translate('common.All')! },
  { id: 'created_by', text: translate('product.Created by me')! },
  { id: 'assigned_to', text: translate('product.assigned To Me')! },
  { id: 'tagged_to', text: translate('product.tagged')! }
];

export const TICKET_STATUS_LIST = [
  { id: 'ALL', text: translate('common.All')! },
  { id: 'RAI', text: translate('product.Raised')!, color: "gray" },
  { id: 'INP', text: translate('product.In-Progress')!, color: "yellow" },
  { id: 'CAN', text: translate('product.cancel')!, color: "red" },
  { id: "CLS", text: translate('product.Close')!, color: "red" },
  { id: 'ONH', text: translate('product.On-Hold')!, color: "black" },
  { id: 'REJ', text: translate('product.Reject')!, color: "red" }
]

export const TICKET_PRIORITY_LIST = [
  { id: 'ALL', text: translate('common.All')! },
  { id: 1, text: translate('product.Lowest')!, color: "black" },
  { id: 2, text: translate('product.Low')!, color: "black" },
  { id: 3, text: translate('product.Medium')!, color: "orange" },
  { id: 4, text: translate('product.High')!, color: "red" },
  { id: 5, text: translate('product.Critical')!, color: "gray" },
];



export const STATUS_LIST = [
  { id: 'ALL', text: 'All', },
  { id: 'RAI', text: 'Raised', color: "gray" },
  { id: 'INP', text: 'In-Progress', color: "yellow" },
  { id: 'CAN', text: 'Cancel', color: "red" },
  { id: "CLS", text: 'Close', color: "red" },
  { id: 'ONH', text: 'On-Hold', color: "black" },
  { id: 'REJ', text: 'Reject', color: "red" }

]

export const GROUP_STATUS_LIST = [
  { id: 'ALL', text: 'All', },
  { id: 'RAI', text: 'Raised', color: "gray" },
  { id: 'INP', text: 'In-Progress', color: "yellow" },
  { id: 'CAN', text: 'Cancel', color: "red" },
  { id: "CLS", text: 'Close', color: "red" },
  { id: 'ONH', text: 'On-Hold', color: "black" },
  { id: 'REJ', text: 'Reject', color: "red" }

]


export const FILTERED_LIST = [
  { id: 'ALL', text: 'All' },
  { id: 'created_by', text: 'Created by me' },
  { id: 'assigned_to', text: 'Assigned to me' },
  { id: 'tagged_to', text: 'Tagged' }
];



export const PRIORITY_DROPDOWN_LIST = [
  { id: 'ALL', text: "All" },
  { id: 1, text: "Lowest", color: "black" },
  { id: 2, text: "Low", color: "black" },
  { id: 3, text: "Medium", color: "orange" },
  { id: 4, text: "High", color: "red" },
  { id: 5, text: "Critical", color: "gray" },
];
export const PRIORITY = [
  { id: 1, text: translate("product.Lowest")!, color: "black" },
  { id: 2, text: translate("product.Low")!, color: "black" },
  { id: 3, text: translate("product.Medium")!, color: "orange" },
  { id: 4, text: translate("product.High")!, color: "red" },
  { id: 5, text: translate("product.Critical")!, color: "gray" },
];

export const PRIORITY_DROPDOWNICON_LIST = [
  { id: 'ALL', text: translate("common.All")! },
  { id: 1, text: translate("product.Lowest")!, icon: icons.eye, color: "black" },
  { id: 2, text: translate("product.Low")!, icon: icons.eye, color: "black" },
  { id: 3, text: translate("product.Medium")!, icon: icons.eye, color: "orange" },
  { id: 3, text: translate("product.High")!, icon: icons.eye, color: "red" },
  { id: 3, text: translate("product.Critical")!, icon: icons.eye, color: "gray" }
];


export const COMPANY_TYPE = [
  { id: '', text: translate("common.Self")! },
]

export const EVENT_STATUS_LIST = [
  { id: 'ALL', text: translate('common.All')! },
  { id: 'RAI', text: translate('product.Raised')!, color: "gray" },
  { id: 'INP', text: translate('product.In-Progress')!, color: "yellow" },
  { id: 'CAN', text: translate('product.cancel')!, color: "red" },
  { id: "CLS", text: translate('product.Close')!, color: "red" },
  { id: 'ONH', text: translate('product.On-Hold')!, color: "black" },
  { id: 'REJ', text: translate('product.Reject')!, color: "red" }

]


export const SEARCH_PAGE = 1
export const INITIAL_PAGE = 1


export const TASK_EVENT_ETA = 'ETA'

