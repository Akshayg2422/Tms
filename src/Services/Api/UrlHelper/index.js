/**
 * sample api
 */


const COMPANY = '/company/';
const TICKET = '/ticket/';
const AUTH = '/authentication/';
const EMPLOYEE='/employee/'
const TASK = '/task/'

export const GET_ASSOCIATED_COMPANIES = COMPANY + 'getAssociatedCompanies';
export const GET_ASSOCIATED_COMPANIESL = COMPANY + 'getAssociatedCompaniesl';
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
export const GET_EMPLOYEES =EMPLOYEE+'getEmployees';
export const ADD_EMPLOYEE = EMPLOYEE + 'addEmployee';
export const GET_TASKS =  TASK + 'getTasks';
export const FETCH_TASK_USERS = TASK + 'getTaskUsers';
export const FETCH_TASK_EVENTS = TASK + 'getTaskEvents';
export const GET_TICKET_USERS =TICKET+'getTicketUsers';
export const FETCH_ADD_TASK_EVENTS = TASK + 'addTaskEvent'

/**
 *  Company
 */

export const BRAND_SECTORS = COMPANY + 'getBrandSectors';
export const UPDATE_EMPLOYEE_PROFILE_PHOTO = EMPLOYEE +'updateEmployeeProfilePhoto';

/**
 * SETTING
 */
 export const POST_ADD_DEPARTMENT = COMPANY + 'addDepartment';
 export const POST_ADD_DESIGNATION = EMPLOYEE + 'addDesignation';
 export const FETCH_DESIGNATION = EMPLOYEE + 'getDesignations';
export const FETCH_DEPARTMENT = COMPANY + 'getDepartments';

export const GET_BRAND_SECTOR= COMPANY+'getBrandSectors';
export const ADD_BRAND_SECTOR=COMPANY+'addBrandSectors';
 export const GET_TICKET_TAG =TICKET +'getTicketTags';
export const ADD_TICKET_TAG=TICKET +'addTicketTags';

/**
 *  Service
 */
const SERVICE = '/service/';

export const SECTOR_SERVICE_TYPES = SERVICE +'getSectorServiceTypes';

/* ADD TASK */

export const FETCH_ADD_TASK = TASK + 'raiseNewTask'

/* GET SUB TASK */

export const GET_REFERENCE_TASKS=TASK+'getReferenceTasks'
export const FETCH_SUB_TASKS = TASK + 'getSubTasks'
export const ADD_TASK_GROUP=TASK+'addTaskGroup'
export const GET_TASK_GROUP=TASK+'getTaskGroup'
export const GET_TASK_GROUPL=TASK+'getTaskGroupl'
export const GET_TASK_SUB_GROUP=TASK+'getTaskSubGroup'

