/**
 * sample api
 */


const COMPANY = '/company/';
const TICKET = '/ticket/';
const AUTH = '/authentication/';
const EMPLOYEE = '/employee/'
const TASK = '/task/'
const AUTHENTICATION = '/authentication/'

export const GET_ASSOCIATED_COMPANIES = COMPANY + 'getAssociatedCompanies';
export const GET_ASSOCIATED_COMPANIES_L = COMPANY + 'getAssociatedCompaniesl';

/* GET ASSOCIATED COMPANY */

export const FETCH_ASSOCIATED_COMPANY = COMPANY + 'getCompanies'

/* ADD ASSOCIATED COMPANIES */

export const ADDING_ASSOCIATED_COMPANY = COMPANY + 'addAssociatedCompanies'

export const URL_GET_DASHBOARD = AUTH + 'dashboard';

export const RAISE_NEW_TICKET = TICKET + 'raiseNewTicket';
export const GET_TICKETS = TICKET + 'getTickets';
export const GET_TICKET_TAGS = TICKET + 'getTicketTags';
export const ADD_TICKET_EVENT = TICKET + 'addTicketEvent';
export const GET_TICKET_EVENTS = TICKET + 'getTicketEvents';
export const GET_REFERENCE_TICKETS = TICKET + 'getReferenceTickets';
export const ADD_BROADCAST_MESSAGES = TICKET + 'addBroadcastMessages';
export const GET_BROADCAST_MESSAGES = TICKET + 'getBroadcastMessages';

export const VALIDATE_USER = AUTH + 'validateUser';
export const VALIDATE_REGISTER_USER = AUTH + 'validateRegistrationUser';
export const OTP_REGISTER = AUTH + 'otpRegister';
export const OTP_LOGIN = AUTH + 'otpLogin';
export const GET_BUSINESS_PLACES = AUTH + 'getBusinessPlaces';
export const VALIDATE_USER_BUSINESS = AUTH + 'validateUserBusiness';
export const BUSINESS_PLACES_DETAILS = AUTH + 'getBusinessPlaceDetails';
export const REGISTER_COMPANY = AUTH + 'registerCompany';
export const REGISTER_ADMIN = AUTH + 'registerAdmin';
export const GET_EMPLOYEES = EMPLOYEE + 'getEmployees';
export const ADD_EMPLOYEE = EMPLOYEE + 'addEmployee';
export const GET_EMPLOYEESL = EMPLOYEE + 'getEmployeesl';
export const URL_GET_TASKS = TASK + 'getTasks';
export const FETCH_TASK_USERS = TASK + 'getTaskUsers';
export const FETCH_TASK_EVENTS = TASK + 'getTaskEvents';
export const GET_TICKET_USERS = TICKET + 'getTicketUsers';
export const URL_ADD_TASK_EVENTS = TASK + 'addTaskEvent'

/**
 *  Company
 */

export const BRAND_SECTORS = COMPANY + 'getBrandSectors';
export const UPDATE_EMPLOYEE_PROFILE_PHOTO = EMPLOYEE + 'updateEmployeeProfilePhoto';


/**
 * SETTING
 */
export const POST_ADD_DEPARTMENT = COMPANY + 'addDepartment';
export const POST_ADD_DESIGNATION = EMPLOYEE + 'addDesignation';
export const FETCH_DESIGNATION = EMPLOYEE + 'getDesignations';
export const FETCH_DEPARTMENT = COMPANY + 'getDepartments';

export const GET_BRAND_SECTOR = COMPANY + 'getBrandSectors';
export const ADD_BRAND_SECTOR = COMPANY + 'addBrandSectors';
export const GET_TICKET_TAG = TICKET + 'getTicketTags';
export const ADD_TICKET_TAG = TICKET + 'addTicketTags';

/**
 *  Service
 */
const SERVICE = '/service/';

export const SECTOR_SERVICE_TYPES = SERVICE + 'getSectorServiceTypes';


/* ADD TASK */

export const FETCH_ADD_TASK = TASK + 'raiseNewTask'
export const GET_ASSIGNED_TASK = TASK + 'getAssingedTask'

/* GET SUB TASK */

export const GET_REFERENCE_TASKS = TASK + 'getReferenceTasks'
export const FETCH_SUB_TASKS = TASK + 'getSubTasks'
export const ADD_TASK_GROUP = TASK + 'addTaskGroup'
export const GET_TASK_GROUP = TASK + 'getTaskGroup'
export const URL_GET_TASK_GROUP_L = TASK + 'getTaskGroupl'

/* GET TASK HISTORY */

export const URL_GET_TASK_EVENT_HISTORY = TASK + 'getTaskHistory'

export const GET_TASK_SUB_GROUP = TASK + 'getTaskSubGroup'

export const ADD_PUSH_NOTIFICATION = AUTHENTICATION + 'webAppConfig'

/* GET TICKET  HISTORY */

export const URL_GET_TICKET_EVENT_HISTORY = TICKET + 'getTicketHistory'
/* GET TASK DETAILS */

export const FETCH_TASK_DETAILS = TASK + 'getTaskDetails';
export const URL_SUB_TASK_GROUPS = TASK + 'getTaskSubGroupl';

export const ADD_EMPLOYEE_TIMELINE = TASK + 'addEmployeeTimeline';
export const GET_EMPLOYEE_TIMELINE = TASK + 'getEmployeeTimeline';

/* GET TICKET DETAILS */

export const URL_FETCH_TICKET_DETAILS = TICKET + 'getTicketDetails';

/* Events */

export const URL_GET_EVENTS = TASK + 'getEmployeeEvents'
export const URL_ADD_EVENTS = TASK + 'addEmployeeEvent'
/*POST VIDEO CONFERENCE */

export const POSE_VIDEO_CONFERENCE = TASK + 'addVideoConference';

/*GET VIDEO CONFERENCE LIST */

export const GET_VIDEO_CONFERENCE_LIST = TASK + 'getVideoConferenceList';

/*GET AUTH TOKEN FOR VIDEO CONFERENCE */

export const GET_TOKEN_BY_USER = TASK + 'getTokenByUser';

/* GET GROUPS EMPLOYEES*/

export const GET_GROUP_EMPLOYEES = TASK + 'getGroupEmployees'

/* GET GROUP MESSAGE*/

export const GET_GROUP_MESSAGE = TASK + 'getGroupMessage'

/* ADD GROUP MESSAGE*/

export const ADD_GROUP_MESSAGE = TASK + 'addGroupMessage'

// get subTaskGroup
export const GET_SUB_GROUP = TASK + 'getSubGroup'

//add group user
export const ADD_GROUP_USER = TASK + 'addGroupUser'

//get group
export const GET_CHAT_GROUPS = TASK + 'getGroup'




