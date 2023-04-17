import { GET_TASK_HISTORY } from '@Redux/';
import { post } from '../ApiHelper';
import {
  VALIDATE_USER,
  VALIDATE_REGISTER_USER,
  OTP_REGISTER,
  OTP_LOGIN,
  VALIDATE_USER_BUSINESS,
  GET_BUSINESS_PLACES,
  REGISTER_ADMIN,
  BRAND_SECTORS,
  BUSINESS_PLACES_DETAILS,
  REGISTER_COMPANY,
  SECTOR_SERVICE_TYPES,
  GET_ASSOCIATED_COMPANIES,
  GET_ASSOCIATED_COMPANIESL,
  URL_GET_DASHBOARD,
  GET_TICKETS,
  RAISE_NEW_TICKET,
  GET_TICKET_EVENTS,
  GET_TICKET_TAGS,
  ADD_TICKET_EVENT,
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  GET_REFERENCE_TICKETS,
  ADD_BROADCAST_MESSAGES,
  GET_BROADCAST_MESSAGES,
  GET_TASKS,
  FETCH_ADD_TASK,
  FETCH_SUB_TASKS,
  GET_BRAND_SECTOR,
  ADD_BRAND_SECTOR,
  GET_TICKET_TAG,
  ADD_TICKET_TAG,
  FETCH_TASK_USERS,
  FETCH_TASK_EVENTS,
  /**
   * setting
   */
  POST_ADD_DEPARTMENT,
  POST_ADD_DESIGNATION,
  FETCH_DESIGNATION,
  FETCH_DEPARTMENT,
  GET_TICKET_USERS,
  GET_REFERENCE_TASKS,
  GET_TASK_GROUP,
  ADD_TASK_GROUP,
  FETCH_ADD_TASK_EVENTS,
  UPDATE_EMPLOYEE_PROFILE_PHOTO,
  GET_TASK_HISTORY_LIST

} from '../UrlHelper';

export const getAssociatedCompaniesApi = payload =>
  post(GET_ASSOCIATED_COMPANIES, payload, {});
export const getAssociatedCompanieslApi = payload =>
  post(GET_ASSOCIATED_COMPANIESL, payload, {});

export const getDashboardApi = payload => post(URL_GET_DASHBOARD, payload, {});
export const raiseNewTicketApi = payload => post(RAISE_NEW_TICKET, payload, {});

export const getTicketsApi = payload => post(GET_TICKETS, payload, {});
export const getTicketEventsApi = payload =>
  post(GET_TICKET_EVENTS, payload, {});
export const getTicketTagsApi = payload => post(GET_TICKET_TAGS, payload, {});
export const addTicketEventApi = payload => post(ADD_TICKET_EVENT, payload, {});

export const validateUserApi = payload => post(VALIDATE_USER, payload, {});
export const validateRegisterUserApi = payload =>
  post(VALIDATE_REGISTER_USER, payload, {});
export const otpRegisterApi = payload => post(OTP_REGISTER, payload, {});
export const otpLoginApi = payload => post(OTP_LOGIN, payload, {});
export const getBusinessPlacesApi = payload =>
  post(GET_BUSINESS_PLACES, payload, {});
export const validateUserBusinessApi = payload =>
  post(VALIDATE_USER_BUSINESS, payload, {});
export const registerAdminApi = payload => post(REGISTER_ADMIN, payload, {});
export const getBrandSectorsApi = payload => post(BRAND_SECTORS, payload, {});
export const getBusinessPlaceDetailsApi = payload =>
  post(BUSINESS_PLACES_DETAILS, payload, {});
export const registerCompanyApi = payload =>
  post(REGISTER_COMPANY, payload, {});
export const SectorServiceTypesApi = payload =>
  post(SECTOR_SERVICE_TYPES, payload, {});
export const getEmployeesApi = payload =>
  post(GET_EMPLOYEES, payload, {})

export const addEmployeeApi = payload =>
  post(ADD_EMPLOYEE, payload, {})
export const getReferenceTicketsApi = payload =>
  post(GET_REFERENCE_TICKETS, payload, {})

export const addBroadCastMessagesApi = payload =>
  post(ADD_BROADCAST_MESSAGES, payload, {})
export const getBroadCastMessagesApi = payload =>
  post(GET_BROADCAST_MESSAGES, payload, {})

export const addTaskApi = payload => post(FETCH_ADD_TASK, payload, {})

export const getTaskApi = (payload) => post(GET_TASKS, payload, {})

export const getSubTaskApi = (payload) => post(FETCH_SUB_TASKS, payload, {})

export const getTaskUsersApi = (payload) => post(FETCH_TASK_USERS, payload, {})

export const getTaskEventsApi = (payload) => post(FETCH_TASK_EVENTS, payload, {})

export const addTaskEventApi = (payload) => post(FETCH_ADD_TASK_EVENTS, payload, {})


/**
 * setting
 */
export const postAddDepartmentApi = (payload) => post(POST_ADD_DEPARTMENT, payload, {})
export const postAddDesignationApi = (payload) => post(POST_ADD_DESIGNATION, payload, {})
export const fetchDesignationDataApi = (payload) => post(FETCH_DESIGNATION, payload, {})
export const fetchDepartmentDataApi = (payload) => post(FETCH_DEPARTMENT, payload, {})

export const getBrandSectorApi = (payload) => post(GET_BRAND_SECTOR, payload, {})
export const addBrandSectorApi = (payload) => post(ADD_BRAND_SECTOR, payload, {})
export const getTicketTagApi = (payload) => post(GET_TICKET_TAG, payload, {})
export const addTicketTagApi = (payload) => post(ADD_TICKET_TAG, payload, {})
export const getReferenceTasksApi = (payload) => post(GET_REFERENCE_TASKS, payload, {})
export const getTicketUsersApi = (payload) => post(GET_TICKET_USERS, payload, {})
export const getTaskGroupApi = (payload) => post(GET_TASK_GROUP, payload, {})
export const addTaskGroupApi = (payload) => post(ADD_TASK_GROUP, payload, {})
export const updateEmployeeProfilePhotoApi = (payload) => post(UPDATE_EMPLOYEE_PROFILE_PHOTO, payload, {})
export const getTaskHistoryApi = (payload) => post(GET_TASK_HISTORY_LIST, payload, {})
