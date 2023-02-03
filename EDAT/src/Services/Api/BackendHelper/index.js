import { GET_FACULTIES_DETAILS } from '@Redux/';
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
  URL_GET_DASHBOARD,
  GET_TICKETS,
  RAISE_NEW_TICKET,
  GET_TICKET_EVENTS,
  GET_TICKET_TAGS,
  ADD_TICKET_EVENT,
  /**
   * TFS
   */
  GET_TASK_DETAILS,
  GET_COURSES,
  GET_COURSE_TOPICS,
  GET_COURSE_TOPIC_TASKS,
  POST_GENERIC_CRUD,
  POST_ADD_DESIGNATION,
  POST_ADD_DEPARTMENT,
  FETCH_DESIGNATION,
  FETCH_DEPARTMENT,
  POST_GENERIC_BATCH_CRUD,
  POST_ADD_STUDENT,
  FETCH_STUDENTS_LIST,
  POST_ADD_FACULTY,
  FETCH_FACULTY_LIST,
  FETCH_APPROVER,
  FETCH_REFERER_LIST,
  FETCH_STUDENT_DETAILS,
  FETCH_DASHBOARD_DETAILS,
  POST_RAISE_ANONYMOUS_COMPLAINT,
  FETCH_FACULTIES_DETAILS,

  /**
   * Student
   */
  FETCH_STUDENT_COURSES,
  FETCH_STUDENT_COURSE_SECTIONS,
  FETCH_STUDENT_COURSE_TOPICS,
  FETCH_STUDENT_COURSE_TASKS,
  FETCH_STUDENT_COURSE_TASKS_DETAILS,
} from '../UrlHelper';

export const getAssociatedCompaniesApi = payload =>
  post(GET_ASSOCIATED_COMPANIES, payload, {});

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

/**
 * TFS 
 */
export const fetchTaskDetailsApi = payload => post(GET_TASK_DETAILS, payload, {})
export const fetchCoursesApi = payload => post(GET_COURSES, payload, {})
export const fetchCourseTopicsApi = payload => post(GET_COURSE_TOPICS, payload, {})
export const fetchCourseTopicTasksApi = payload => post(GET_COURSE_TOPIC_TASKS, payload, {})
export const postAddDesignationApi = (payload) => post(POST_ADD_DESIGNATION, payload, {})
export const postAddDepartmentApi = (payload) => post(POST_ADD_DEPARTMENT, payload, {})
export const fetchDesignationDataApi = (payload) => post(FETCH_DESIGNATION, payload, {})
export const fetchDepartmentDataApi = (payload) => post(FETCH_DEPARTMENT, payload, {})
export const postGenericCrudApi = payload => post(POST_GENERIC_CRUD, payload, {})
export const postGenericBatchCrudApi = payload => post(POST_GENERIC_BATCH_CRUD, payload, {})
export const postAddStudentApi = payload => post(POST_ADD_STUDENT, payload, {})
export const fetchStudentsListApi = payload => post(FETCH_STUDENTS_LIST, payload, {})
export const postAddFacultyApi = payload => post(POST_ADD_FACULTY, payload, {})
export const fetchFacultiesListApi = payload => post(FETCH_FACULTY_LIST, payload, {})
export const fetchApproverApi = payload => post(FETCH_APPROVER, payload, {})
export const fetchRefererListApi = payload => post(FETCH_REFERER_LIST, payload, {})
export const fetchStudentDetailsApi = payload => post(FETCH_STUDENT_DETAILS, payload, {})
export const fetchDashboardDetailsApi = payload => post(FETCH_DASHBOARD_DETAILS, payload, {})
export const postRaiseAnonymousComplaintApi = payload => post(POST_RAISE_ANONYMOUS_COMPLAINT, payload, {})
export const fetchFacultyDetailsApi = payload => post(FETCH_FACULTIES_DETAILS, payload, {})


/**
 * Student
 */
export const fetchStudentCoursesApi = payload => post(FETCH_STUDENT_COURSES, payload, {})
export const fetchStudentCourseSectionsApi = payload => post(FETCH_STUDENT_COURSE_SECTIONS, payload, {})
export const fetchStudentCourseTopicsApi = payload => post(FETCH_STUDENT_COURSE_TOPICS, payload, {})
export const fetchStudentCourseTasksApi = payload => post(FETCH_STUDENT_COURSE_TASKS, payload, {})
export const fetchStudentCourseTasksDetailsApi = payload => post(FETCH_STUDENT_COURSE_TASKS_DETAILS, payload, {})






