import { post } from '../ApiHelper';
import * as URL from '../UrlHelper'

export const getAssociatedCompaniesApi = payload =>
  post(URL.GET_ASSOCIATED_COMPANIES, payload, {});
export const getAssociatedCompaniesLApi = payload =>
  post(URL.GET_ASSOCIATED_COMPANIES_L, payload, {});

export const getDashboardApi = payload => post(URL.URL_GET_DASHBOARD, payload, {});
export const raiseNewTicketApi = payload => post(URL.RAISE_NEW_TICKET, payload, {});

export const getTicketsApi = payload => post(URL.GET_TICKETS, payload, {});
export const getTicketEventsApi = payload =>
  post(URL.GET_TICKET_EVENTS, payload, {});
export const getTicketTagsApi = payload => post(URL.GET_TICKET_TAGS, payload, {});
export const addTicketEventApi = payload => post(URL.ADD_TICKET_EVENT, payload, {});

export const validateUserApi = payload => post(URL.VALIDATE_USER, payload, {});
export const validateRegisterUserApi = payload =>
  post(URL.VALIDATE_REGISTER_USER, payload, {});
export const otpRegisterApi = payload => post(URL.OTP_REGISTER, payload, {});
export const otpLoginApi = payload => post(URL.OTP_LOGIN, payload, {});
export const getBusinessPlacesApi = payload =>
  post(URL.GET_BUSINESS_PLACES, payload, {});
export const validateUserBusinessApi = payload =>
  post(URL.VALIDATE_USER_BUSINESS, payload, {});
export const registerAdminApi = payload => post(URL.REGISTER_ADMIN, payload, {});
export const getBrandSectorsApi = payload => post(URL.BRAND_SECTORS, payload, {});
export const getBusinessPlaceDetailsApi = payload =>
  post(URL.BUSINESS_PLACES_DETAILS, payload, {});
export const registerCompanyApi = payload =>
  post(URL.REGISTER_COMPANY, payload, {});
export const SectorServiceTypesApi = payload =>
  post(URL.SECTOR_SERVICE_TYPES, payload, {});
export const getEmployeesApi = payload =>
  post(URL.GET_EMPLOYEES, payload, {})

export const addEmployeeApi = payload =>
  post(URL.ADD_EMPLOYEE, payload, {})
export const getReferenceTicketsApi = payload =>
  post(URL.GET_REFERENCE_TICKETS, payload, {})

export const addBroadCastMessagesApi = payload =>
  post(URL.ADD_BROADCAST_MESSAGES, payload, {})
export const getBroadCastMessagesApi = payload =>
  post(URL.GET_BROADCAST_MESSAGES, payload, {})

export const addTaskApi = payload => post(URL.FETCH_ADD_TASK, payload, {})

export const getTaskApi = (payload) => post(URL.URL_GET_TASKS, payload, {})
export const getSubTaskApi = (payload) => post(URL.FETCH_SUB_TASKS, payload, {})
export const getTaskUsersApi = (payload) => post(URL.FETCH_TASK_USERS, payload, {})

export const getTaskEventsApi = (payload) => post(URL.FETCH_TASK_EVENTS, payload, {})

export const addTaskEventApi = (payload) => post(URL.URL_ADD_TASK_EVENTS, payload, {})


/**
 * setting
 */
export const postAddDepartmentApi = (payload) => post(URL.POST_ADD_DEPARTMENT, payload, {})
export const postAddDesignationApi = (payload) => post(URL.POST_ADD_DESIGNATION, payload, {})
export const fetchDesignationDataApi = (payload) => post(URL.FETCH_DESIGNATION, payload, {})
export const fetchDepartmentDataApi = (payload) => post(URL.FETCH_DEPARTMENT, payload, {})

export const getBrandSectorApi = (payload) => post(URL.GET_BRAND_SECTOR, payload, {})
export const addBrandSectorApi = (payload) => post(URL.ADD_BRAND_SECTOR, payload, {})
export const getTicketTagApi = (payload) => post(URL.GET_TICKET_TAG, payload, {})
export const addTicketTagApi = (payload) => post(URL.ADD_TICKET_TAG, payload, {})
export const getReferenceTasksApi = (payload) => post(URL.GET_REFERENCE_TASKS, payload, {})
export const getTicketUsersApi = (payload) => post(URL.GET_TICKET_USERS, payload, {})
export const getTaskGroupApi = (payload) => post(URL.GET_TASK_GROUP, payload, {})
export const addTaskGroupApi = (payload) => post(URL.ADD_TASK_GROUP, payload, {})
export const updateEmployeeProfilePhotoApi = (payload) => post(URL.UPDATE_EMPLOYEE_PROFILE_PHOTO, payload, {})
export const getTaskEventHistoryApi = (payload) => post(URL.URL_GET_TASK_EVENT_HISTORY, payload, {})
export const getTaskGroupLApi = (payload) => post(URL.URL_GET_TASK_GROUP_L, payload, {})
export const getTaskSubGroupApi = (payload) => post(URL.GET_TASK_SUB_GROUP, payload, {})

/* PUSH NOTIFICATION */

export const addPushNotificationApi = payload => post(URL.ADD_PUSH_NOTIFICATION, payload, {});

/* GET TASK DETAILS */

export const getTaskDetailsApi = (payload) => post(URL.FETCH_TASK_DETAILS, payload, {})
export const getSubTaskGroupsApi = (payload) => post(URL.URL_SUB_TASK_GROUPS, payload, {})
export const getEmployeeslApi = (payload) => post(URL.GET_EMPLOYEESL, payload, {})

export const addEmployeeTimeLineApi = (payload) => post(URL.ADD_EMPLOYEE_TIMELINE, payload, {})
export const getEmployeeTimeLineApi = (payload) => post(URL.GET_EMPLOYEE_TIMELINE, payload, {})
export const getAssignedTaskApi = (payload) => post(URL.GET_ASSIGNED_TASK, payload, {})