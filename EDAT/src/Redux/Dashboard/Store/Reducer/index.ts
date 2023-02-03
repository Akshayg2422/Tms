import {
  FETCH_TASK_DETAILS,
  FETCH_TASK_DETAILS_SUCCESS,
  FETCH_TASK_DETAILS_FAILURE,

  FETCH_COURSES,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,

  FETCH_COURSE_TOPICS,
  FETCH_COURSE_TOPICS_SUCCESS,
  FETCH_COURSE_TOPICS_FAILURE,

  FETCH_COURSE_TOPIC_TASKS,
  FETCH_COURSE_TOPIC_TASKS_SUCCESS,
  FETCH_COURSE_TOPIC_TASKS_FAILURE,

  SET_COURSE_TOPIC_NAME,

  POST_GENERIC_CRUD_DETAILS,
  POST_GENERIC_CRUD_DETAILS_SUCCESS,
  POST_GENERIC_CRUD_DETAILS_FAILURE,

  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_FAILURE,

  ADD_DESIGNATION,
  ADD_DESIGNATION_SUCCESS,
  ADD_DESIGNATION_FAILURE,

  FETCH_DEPARTMENT,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,

  FETCH_DESIGNATION,
  FETCH_DESIGNATION_SUCCESS,
  FETCH_DESIGNATION_FAILURE,

  SET_CURRENT_COURSE_SECTION,

  POST_GENERIC_BATCH_CRUD_DETAILS,
  POST_GENERIC_BATCH_CRUD_DETAILS_SUCCESS,
  POST_GENERIC_BATCH_CRUD_DETAILS_FAILURE,
  IS_DND_MODAL_OPEN,

  ADD_STUDENT,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,

  FETCH_STUDENTS_LIST,
  FETCH_STUDENTS_LIST_SUCCESS,
  FETCH_STUDENTS_LIST_FAILURE,

  ADD_FACULTY,
  ADD_FACULTY_SUCCESS,
  ADD_FACULTY_FAILURE,

  FETCH_FACULTIES_LIST,
  FETCH_FACULTIES_LIST_SUCCESS,
  FETCH_FACULTIES_LIST_FAILURE,

  FETCH_APPROVER_LIST,
  FETCH_APPROVER_LIST_SUCCESS,
  FETCH_APPROVER_LIST_FAILURE,

  FETCH_REFERER_LIST,
  FETCH_REFERER_LIST_SUCCESS,
  FETCH_REFERER_LIST_FAILURE,

  SETTING_CURRENT_COURSE,

  FETCH_STUDENTS_DETAILS,
  FETCH_STUDENTS_DETAILS_SUCCESS,
  FETCH_STUDENTS_DETAILS_FAILURE,

  SETTING_CURRENT_TASK_ITEM,

  FETCH_DASHBOARD_DETAILS,
  FETCH_DASHBOARD_DETAILS_SUCCESS,
  FETCH_DASHBOARD_DETAILS_FAILURE,

  SETTING_SELECTED_FACULTY_ID,

  EDIT_USER_REGISTRATION,

  POST_RAISE_ANONYMOUS_COMPLAINT,
  POST_RAISE_ANONYMOUS_COMPLAINT_SUCCESS,
  POST_RAISE_ANONYMOUS_COMPLAINT_FAILURE,

  FETCH_FACULTIES_DETAILS_FAILURE,
  FETCH_FACULTIES_DETAILS_SUCCESS,
  FETCH_FACULTIES_DETAILS,

  /**
   * Student
   */

  FETCH_STUDENT_COURSES,
  FETCH_STUDENT_COURSES_SUCCESS,
  FETCH_STUDENT_COURSES_FAILURE,

  FETCH_STUDENT_COURSE_SECTION,
  FETCH_STUDENT_COURSE_SECTION_SUCCESS,
  FETCH_STUDENT_COURSE_SECTION_FAILURE,

  FETCH_STUDENT_COURSE_TOPICS,
  FETCH_STUDENT_COURSE_TOPICS_SUCCESS,
  FETCH_STUDENT_COURSE_TOPICS_FAILURE,

  FETCH_STUDENT_COURSE_TASKS,
  FETCH_STUDENT_COURSE_TASKS_SUCCESS,
  FETCH_STUDENT_COURSE_TASKS_FAILURE,

  FETCH_STUDENT_COURSE_TASKS_DETAILS,
  FETCH_STUDENT_COURSE_TASKS_DETAILS_SUCCESS,
  FETCH_STUDENT_COURSE_TASKS_DETAILS_FAILURE,

  SETTING_DEFAULT_COURSE

} from '../ActionTypes';

const initialState: any = {
  loading: false,
  error: '',
  response: undefined,
  taskDetails: undefined,
  registeredCourses: undefined,
  courseTopics: undefined,
  courseTopicTasks: undefined,
  courseTopicName: '',
  designationData: undefined,
  departmentData: undefined,
  currentCourseSectionObject: undefined,
  currentCourseSection: undefined,
  dndData: undefined,
  isOpenDndModal: false,
  studentsListData: undefined,
  facultiesListData: undefined,
  approverListData: undefined,
  refererListData: undefined,
  currentCourse: [],
  studentDetails: undefined,
  currentTaskItem: undefined,
  dashboardDetails: undefined,
  selectedFacultyId: undefined,
  editUserDetails: undefined,

  /**
   * Student
   */
  studentCourses: undefined,
  studentCourseSection: undefined,
  studentCourseTopics: undefined,
  studentCourseTasks: undefined,
  studentCourseTasksDetails: undefined,
  defaultCourse : []
};

const DashboardReducer = (state: any = initialState, action: any) => {
  switch (action.type) {

    case FETCH_TASK_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_TASK_DETAILS_SUCCESS:
      state = { ...state, taskDetails: action.payload };
      break;
    case FETCH_TASK_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * get courses
     */

    case FETCH_COURSES:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSES_SUCCESS:
      state = { ...state, registeredCourses: action.payload };
      break;
    case FETCH_COURSES_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
  * get course Topics
  */

    case FETCH_COURSE_TOPICS:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSE_TOPICS_SUCCESS:
      state = { ...state, courseTopics: action.payload };
      break;
    case FETCH_COURSE_TOPICS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get course Topic tasks
*/

    case FETCH_COURSE_TOPIC_TASKS:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSE_TOPIC_TASKS_SUCCESS:
      state = { ...state, courseTopicTasks: action.payload };
      break;
    case FETCH_COURSE_TOPIC_TASKS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * setting course topic name
     */
    case SET_COURSE_TOPIC_NAME:
      state = { ...state, courseTopicName: action.payload };
      break;

    /**
     * Generic CRUD details
     */
    case POST_GENERIC_CRUD_DETAILS:
      state = { ...state, loading: true };
      break;
    case POST_GENERIC_CRUD_DETAILS_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_GENERIC_CRUD_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
     * Add department
     */

    case ADD_DEPARTMENT:
      state = { ...state, loading: true };
      break;
    case ADD_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * Add designation
     */

    case ADD_DESIGNATION:
      state = { ...state, loading: true };
      break;
    case ADD_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //get departments

    case FETCH_DEPARTMENT:
      state = { ...state, loading: true };
      break;
    case FETCH_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        departmentData: action.payload,
      };
      break;
    case FETCH_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //get designations

    case FETCH_DESIGNATION:
      state = { ...state, loading: true };
      break;
    case FETCH_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
        designationData: action.payload,
      };
      break;
    case FETCH_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
    * setting current course section
    */
    case SET_CURRENT_COURSE_SECTION:

      state = { ...state, currentCourseSectionObject: action.payload };
      break;

    /**
  * Generic Batch CRUD details
  */
    case POST_GENERIC_BATCH_CRUD_DETAILS:
      state = { ...state, loading: true };
      break;
    case POST_GENERIC_BATCH_CRUD_DETAILS_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_GENERIC_BATCH_CRUD_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * handle dnd modal open or close state
    */
    case IS_DND_MODAL_OPEN:
      console.log("reducer--->", action.payload);

      state = { ...state, isDndModalOpen: action.payload };
      break;

    /**
   * add student
   */
    case ADD_STUDENT:
      state = { ...state, loading: true };
      break;
    case ADD_STUDENT_SUCCESS:
      state = { ...state, loading: false };
      break;
    case ADD_STUDENT_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
 * get students list
 */
    case FETCH_STUDENTS_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENTS_LIST_SUCCESS:
      state = { ...state, loading: false, studentsListData: action.payload };
      break;
    case FETCH_STUDENTS_LIST_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
   * add faculty
   */
    case ADD_FACULTY:
      state = { ...state, loading: true };
      break;
    case ADD_FACULTY_SUCCESS:
      state = { ...state, loading: false };
      break;
    case ADD_FACULTY_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
 * get faculties list
 */
    case FETCH_FACULTIES_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_FACULTIES_LIST_SUCCESS:
      state = { ...state, loading: false, facultiesListData: action.payload };
      break;
    case FETCH_FACULTIES_LIST_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * get Approver list
     */
    case FETCH_APPROVER_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_APPROVER_LIST_SUCCESS:
      state = { ...state, loading: false, approverListData: action.payload };
      break;
    case FETCH_APPROVER_LIST_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * get referer list
    */
    case FETCH_REFERER_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_REFERER_LIST_SUCCESS:
      state = { ...state, loading: false, refererListData: action.payload };
      break;
    case FETCH_REFERER_LIST_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
   * setting current course
   */
    case SETTING_CURRENT_COURSE:
      state = { ...state, currentCourse: action.payload };
      break;

    /**
 * get referer list
 */
    case FETCH_STUDENTS_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENTS_DETAILS_SUCCESS:
      state = { ...state, loading: false, studentDetails: action.payload };
      break;
    case FETCH_STUDENTS_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* setting current task item
*/
    case SETTING_CURRENT_TASK_ITEM:
      console.log(" action.payload action.payload", action.payload);

      state = { ...state, currentTaskItem: action.payload };
      break;

    /**
    * get dashboard details
    */
    case FETCH_DASHBOARD_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_DASHBOARD_DETAILS_SUCCESS:
      state = { ...state, loading: false, dashboardDetails: action.payload };
      break;
    case FETCH_DASHBOARD_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
  * setting selected faculty id
  */
    case SETTING_SELECTED_FACULTY_ID:

      state = { ...state, selectedFacultyId: action.payload };
      break;

    /**
    * edit user or add user
    */
    case EDIT_USER_REGISTRATION:
      state = { ...state, editUserDetails: action.payload };
      break;


    /**
    * post raise anonymous complaint/ticket
    */

    case POST_RAISE_ANONYMOUS_COMPLAINT:
      state = { ...state, loading: true };
      break;
    case POST_RAISE_ANONYMOUS_COMPLAINT_SUCCESS:
      state = { ...state, loader: false };
      break;
    case POST_RAISE_ANONYMOUS_COMPLAINT_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
     * Get Faculty Details
     */


    case FETCH_FACULTIES_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_FACULTIES_DETAILS_SUCCESS:
      state = { ...state, loader: false };
      break;
    case FETCH_FACULTIES_DETAILS_FAILURE:

    /**
     * Student
     */

    /**
    * get student course
    */

    case FETCH_STUDENT_COURSES:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSES_SUCCESS:
      state = { ...state, studentCourses: action.payload };
      break;
    case FETCH_STUDENT_COURSES_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * get student course section
    */

    case FETCH_STUDENT_COURSE_SECTION:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSE_SECTION_SUCCESS:
      state = { ...state, studentCourseSection: action.payload };
      break;
    case FETCH_STUDENT_COURSE_SECTION_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
 * get student course topics
 */

    case FETCH_STUDENT_COURSE_TOPICS:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSE_TOPICS_SUCCESS:
      state = { ...state, studentCourseTopics: action.payload };
      break;
    case FETCH_STUDENT_COURSE_TOPICS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * gfetch student course tasks
    */
    case FETCH_STUDENT_COURSE_TASKS:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSE_TASKS_SUCCESS:
      state = { ...state, loading: false, studentCourseTasks: action.payload };
      break;
    case FETCH_STUDENT_COURSE_TASKS_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
    * fetch student course tasks details
    */
    case FETCH_STUDENT_COURSE_TASKS_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSE_TASKS_DETAILS_SUCCESS:
      state = { ...state, loading: false, studentCourseTasksDetails: action.payload };
      break;
    case FETCH_STUDENT_COURSE_TASKS_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
   * setting default course
   */
    case SETTING_DEFAULT_COURSE:
      state = { ...state, defaultCourse: action.payload };
      break;


    default:
      state = state;
      break;
  }
  return state;
};
export default DashboardReducer;