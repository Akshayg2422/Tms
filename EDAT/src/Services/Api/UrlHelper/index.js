/**
 * sample api
 */


const COMPANY = 'company/';
const TICKET = '/ticket/';
const AUTH = '/authentication/';
const COURSE = 'course/';
const EMPLOYEE = 'employee/'
const STUDENT = 'student/'

export const GET_ASSOCIATED_COMPANIES = COMPANY + 'getAssociatedCompanies';
export const URL_GET_DASHBOARD = AUTH + 'dashboard';

export const RAISE_NEW_TICKET = TICKET + 'raiseNewTicket';
export const GET_TICKETS = TICKET + 'getTickets';
export const GET_TICKET_TAGS = TICKET + 'getTicketTags';
export const ADD_TICKET_EVENT = TICKET + 'addTicketEvent';
export const GET_TICKET_EVENTS = TICKET + 'getTicketEvents';

export const VALIDATE_USER = AUTH + 'validateUser';
export const VALIDATE_REGISTER_USER = AUTH + 'validateRegistrationUser';
export const OTP_REGISTER = AUTH + 'otpRegister';
export const OTP_LOGIN = AUTH + 'otpLogin';
export const GET_BUSINESS_PLACES = AUTH + 'getBusinessPlaces';
export const VALIDATE_USER_BUSINESS = AUTH + 'validateUserBusiness';
export const BUSINESS_PLACES_DETAILS = AUTH + 'getBusinessPlaceDetails';
export const REGISTER_COMPANY = AUTH + 'registerCompany';
export const REGISTER_ADMIN = AUTH + 'registerAdmin';


/**
 *  Company
 */

export const BRAND_SECTORS = COMPANY + 'getBrandSectors';

/**
 * TFS
 */
export const GET_TASK_DETAILS = COURSE + 'getTaskDetails';
export const GET_COURSES = COURSE + 'getCourses';
export const GET_COURSE_TOPICS = COURSE + 'getCourseTopics';
export const GET_COURSE_TOPIC_TASKS = COURSE + 'getCourseTopicTasks';
export const POST_ADD_DESIGNATION = EMPLOYEE + 'addDesignation';
export const POST_ADD_DEPARTMENT = COMPANY + 'addDepartment';
export const FETCH_DESIGNATION = EMPLOYEE + 'getDesignations';
export const FETCH_DEPARTMENT = COMPANY + 'getDepartments';
export const POST_GENERIC_CRUD = COURSE + 'genericCRUD';
export const POST_GENERIC_BATCH_CRUD = COURSE + 'genericBatchCRUD';
export const POST_ADD_STUDENT = EMPLOYEE + 'addStudent'
export const FETCH_STUDENTS_LIST = STUDENT + 'getStudents'
export const POST_ADD_FACULTY = EMPLOYEE + 'addFaculty'
export const FETCH_FACULTY_LIST = STUDENT + 'getFaculties'
export const FETCH_APPROVER = STUDENT + 'getApprover'
export const FETCH_REFERER_LIST = STUDENT + 'getRefferer'
export const FETCH_STUDENT_DETAILS = STUDENT + 'getStudentDetails'
export const FETCH_DASHBOARD_DETAILS = AUTH + 'dashboard'
export const POST_RAISE_ANONYMOUS_COMPLAINT = EMPLOYEE + 'raiseAnonymousComplaint'
export const FETCH_FACULTIES_DETAILS = STUDENT + 'getFacultyDetails'

/**
 * Student
 */
export const FETCH_STUDENT_COURSES = STUDENT + 'getStudentCourses'
export const FETCH_STUDENT_COURSE_SECTIONS = STUDENT + 'getStudentCourseSections'
export const FETCH_STUDENT_COURSE_TOPICS = STUDENT + 'getStudentCourseTopics'
export const FETCH_STUDENT_COURSE_TASKS = STUDENT + 'getStudentCourseTasks'
export const FETCH_STUDENT_COURSE_TASKS_DETAILS = STUDENT + 'getStudentCourseTasksDetails'




/**
 *  Service
 */
const SERVICE = '/service/';



export const SECTOR_SERVICE_TYPES = SERVICE + 'getSectorServiceTypes';