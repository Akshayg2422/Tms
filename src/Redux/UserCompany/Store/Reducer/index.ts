
import * as ActionTypes from '../ActionTypes'
import { UserCompanyStateProp } from '../../Interfaces';
import { DEFAULT_TASK_GROUP, ifObjectKeyExist } from '@Utils'

// import * as ActionTypes from '../ActionTypes'

const initialState: UserCompanyStateProp = {

  loading: false,
  error: '',
  designations: undefined,
  departments: undefined,
  designationCurrentPages: undefined,
  designationNumOfPages: undefined,
  departmentsCurrentPages: undefined,
  departmentsNumOfPages: undefined,
  employees: undefined,
  employeesCurrentPages: undefined,
  employeesNumOfPages: undefined,
  employeesl: undefined,
  employeeslCurrentPages: undefined,
  employeeslNumOfPages: undefined,
  employeeAddTime: undefined,
  employeeTimeline: [],
  employeeTimelineCurrentPages: 1,
  employeeTimelineNumOfPages: undefined,
  brandSector: undefined,
  ticketTag: undefined,
  brandSectorCurrentPages: undefined,
  brandSectorNumOfPages: undefined,
  addEmployeeDetails: undefined,
  updateEmployeeProfile: undefined,
  ticketTagCurrentPages: undefined,
  ticketTagNumOfPages: undefined,
  taskGroups: undefined,
  getTaskGroupCurrentPages: undefined,
  taskGroupDetails: undefined,
  taskGroupCurrentPages: undefined,
  taskGroupNumOfPages: undefined,
  chatMessage:[],
  addTaskGroup: undefined,
  associatedCompanies: undefined,
  associatedCompaniesNumOfPages: undefined,
  associatedCompaniesCurrentPages: 1,
  response: undefined,
  registerAdminResponse: undefined,
  associatedCompaniesL: undefined,
  dashboardDetails: undefined,
  selectedCompany: undefined,
  events: undefined,
  eventsCurrentPages: 1,
  selectedEmployee: undefined,
  videoConference: undefined,
  scheduledListData: undefined,
  userToken: undefined,
  associatedCompany: undefined,
  updateAssociatedCompany: undefined,
  refreshUserCompany: false,
  groupEmployees: undefined,
  groupMessage: undefined,
  addGroupMessages: undefined,
  refreshGroupEvents: false,
  selectedGroup: undefined,
  getSubGroups: undefined,
  selectedGroupChatCode: undefined,
  chatGroups: undefined,
  selectedTaskGroupCode: "ALL",
  employeesDetails: undefined,
  refreshGroupChat: undefined,
  timeStatus: undefined,
  enableRequestDataList: undefined,
  enableRequest: undefined,
  settingVcDetails: undefined,
  vcNotificationData: undefined,
  chatMessageCurrentPages: 1,
  employeeListData: undefined,
  oneToOneChat: false,
  oneToOneVcNoti: undefined,
  chatEmployeeList: undefined,
  chatEmployeeListCurrentPages: undefined,
  chatEmployeeListNumOfPages: undefined,
  refreshChatMessage: false,
  selectedUserChat:undefined,

}

const UserCompanyReducer = (state: UserCompanyStateProp = initialState, action: any) => {

  switch (action.type) {

    case ActionTypes.RESTORE_USER_COMPANY:
      state = initialState;
      break;

    /**
* add department
*/
    case ActionTypes.ADD_DEPARTMENT:
      state = { ...state, loading: true };
      break;
    case ActionTypes.ADD_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ActionTypes.ADD_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
* add designation
*/
    case ActionTypes.ADD_DESIGNATION:
      state = { ...state, loading: true };
      break;
    case ActionTypes.ADD_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ActionTypes.ADD_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    case ActionTypes.FETCH_DEPARTMENT:
      state = {
        ...state,
        departments: undefined,
        departmentsNumOfPages: 0,
        departmentsCurrentPages: 1,
        loading: true
      };
      break;
    case ActionTypes.FETCH_DEPARTMENT_SUCCESS:
      const department = action.payload.details
      const isDepartments = ifObjectKeyExist(department, 'data')

      state = {
        ...state,
        loading: false,
        departments: action.payload?.details?.data ? action.payload?.details?.data : action.payload?.details,
        departmentsNumOfPages: action.payload?.details.num_pages,
        departmentsCurrentPages:
          action.payload?.details.next_page === -1
            ? action?.payload?.details.num_pages
            : action?.payload?.details.next_page - 1,
      };
      break;
    case ActionTypes.FETCH_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    case ActionTypes.FETCH_DESIGNATION:

      state = {
        ...state,
        designations: undefined,
        designationNumOfPages: 0,
        designationCurrentPages: 1,
        loading: true
      };

      break;
    case ActionTypes.FETCH_DESIGNATION_SUCCESS:
      const designation = action.payload.details
     
      const isDesignations = ifObjectKeyExist(designation, 'data')

      state = {
        ...state,
        loading: false,
        designations: action.payload?.details?.data? action.payload?.details?.data : action.payload?.details,
        designationNumOfPages: action.payload?.details?.num_pages,
        designationCurrentPages:
        action.payload.details.next_page === -1?
          action?.payload?.details.num_pages
            :action?.payload?.details?.next_page - 1,
      };
      break;
    case ActionTypes.FETCH_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;


    case ActionTypes.ADD_BRAND_SECTOR:
      state = { ...state, loading: true };
      break;
    case ActionTypes.ADD_BRAND_SECTOR_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ActionTypes.ADD_BRAND_SECTOR_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    /**
        * add TICKET TAG
        */
    case ActionTypes.ADD_TICKET_TAG:
      state = { ...state, loading: true };
      break;
    case ActionTypes.ADD_TICKET_TAG_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ActionTypes.ADD_TICKET_TAG_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //get BRAND SECTOR

    case ActionTypes.GET_BRAND_SECTOR:
      state = {
        ...state,
        brandSector: undefined,
        brandSectorNumOfPages: 0,
        brandSectorCurrentPages: 1,
      };
      break;
    case ActionTypes.GET_BRAND_SECTOR_SUCCESS:
      state = {
        ...state,
        brandSector: action.payload.details.data,
        brandSectorNumOfPages: action.payload.details.num_pages,
        brandSectorCurrentPages:
          action.payload.details.next_page === -1
            ? action.payload.details.num_pages
            : action.payload.details.next_page - 1,
      };
      break;
    case ActionTypes.GET_BRAND_SECTOR_FAILURE:
      state = {
        ...state,
        error: action.payload,
      };
      break;

    //get designations

    case ActionTypes.GET_TICKET_TAG:

      state = {
        ...state,
        ticketTag: undefined,
        ticketTagNumOfPages: 0,
        ticketTagCurrentPages: 1,
      };

      break;
    case ActionTypes.GET_TICKET_TAG_SUCCESS:
      state = {
        ...state,
        ticketTag: action.payload.details.data,
        ticketTagNumOfPages: action.payload.details.num_pages,
        ticketTagCurrentPages:
          action.payload.details.next_page === -1
            ? action.payload.details.num_pages
            : action.payload.details.next_page - 1,
      };
      break;
    case ActionTypes.GET_TICKET_TAG_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**get task group */
    case ActionTypes.GET_TASK_GROUP:

      state = {
        ...state,
        // taskGroupDetails: page_number === 1 ? [] : state.taskGroupDetails,
        taskGroups: undefined,
        taskGroupNumOfPages: 0,
        taskGroupCurrentPages: 1,
        loading: true
      };

      break;
    case ActionTypes.GET_TASK_GROUP_SUCCESS:
      state = {
        ...state,
        loading: false,
        // taskGroupDetails: [...state.taskGroupDetails, ...action.payload?.details?.data],
        getTaskGroupCurrentPages:
          action.payload?.details?.next_page,

        taskGroups: action?.payload?.details?.data,
        taskGroupNumOfPages: action?.payload?.details?.num_pages,
        taskGroupCurrentPages:
          action?.payload?.details?.next_page === -1
            ? action?.payload?.details?.num_pages
            : action?.payload?.details?.next_page - 1,
      };
      break;
    case ActionTypes.GET_TASK_GROUP_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**add task group */
    case ActionTypes.ADD_TASK_GROUP:

      state = { ...state, addTaskGroup: undefined };
      break;

    case ActionTypes.ADD_TASK_GROUP_SUCCESS:

      state = { ...state, addTaskGroup: action.payload.details };
      break;

    case ActionTypes.ADD_TASK_GROUP_FAILURE:

      state = { ...state, addTaskGroup: action.payload };
      break;

    case ActionTypes.GET_ASSOCIATED_BRANCH:
      state = {
        ...state,
        associatedCompanies: undefined,
        associatedCompaniesNumOfPages: 0,
        associatedCompaniesCurrentPages: 1
      };
      break;
    case ActionTypes.GET_ASSOCIATED_BRANCH_SUCCESS:
      const { data, next_page, num_pages } = action.payload?.details;
      state = {
        ...state,
        associatedCompanies: data,
        associatedCompaniesNumOfPages: num_pages,
        associatedCompaniesCurrentPages:
          next_page === -1
            ? num_pages
            : next_page - 1,
      };
      break;
    case ActionTypes.GET_ASSOCIATED_BRANCH_FAILURE:
      state = { ...state };
      break;

    case ActionTypes.ADD_EMPLOYEE:
      state = {
        ...state,
        addEmployeeDetails: undefined,
      };
      break;
    case ActionTypes.ADD_EMPLOYEE_SUCCESS:

      state = {
        ...state,
        addEmployeeDetails: action.payload.details,
      };
      break;
    case ActionTypes.ADD_EMPLOYEE_FAILURE:
      state = { ...state, addEmployeeDetails: undefined };
      break;

    case ActionTypes.UPDATE_EMPLOYEE_PROFILE_PHOTO:
      state = {
        ...state,
        updateEmployeeProfile: undefined,
      };
      break;
    case ActionTypes.UPDATE_EMPLOYEE_PROFILE_PHOTO_SUCCESS:
      state = {
        ...state,
        updateEmployeeProfile: action.payload.details,
      };
      break;
    case ActionTypes.UPDATE_EMPLOYEE_PROFILE_PHOTO_FAILURE:
      state = { ...state, updateEmployeeProfile: undefined };
      break;


    case ActionTypes.GET_EMPLOYEES:
      state = {
        ...state,
        employees: undefined,
        employeesCurrentPages: 1,
        employeesNumOfPages: 0,
      };

      break;
    case ActionTypes.GET_EMPLOYEES_SUCCESS:

      const employeeResponse = action.payload.details
      const isPagination = ifObjectKeyExist(employeeResponse, "data")
      console.log(isPagination, "ppp")

      state = {
        ...state,
        employees: action.payload?.details?.data ? action.payload?.details?.data : action.payload?.details,
        employeesCurrentPages: action.payload?.details.next_page === -1
          ? action?.payload?.details.num_pages
          : action?.payload?.details.next_page - 1,
        employeesNumOfPages: action.payload.details.num_pages,
      };
      break;
    case ActionTypes.GET_EMPLOYEES_FAILURE:
      state = { ...state, employees: undefined };
      break;

    // GET Employessl

    case ActionTypes.GET_EMPLOYEESL:
      state = {
        ...state,
        employeesl: undefined,
        employeeslCurrentPages: 1,
        employeeslNumOfPages: 0,
      };

      break;
    case ActionTypes.GET_EMPLOYEESL_SUCCESS:
      state = {
        ...state,
        employeesl: action.payload?.details?.data ? action.payload?.details?.data : action.payload?.details,
        employeeslCurrentPages: action.payload?.details.next_page === -1
          ? action?.payload?.details.num_pages
          : action?.payload?.details.next_page - 1,
        employeeslNumOfPages: action.payload.details.num_pages,
      };
      break;
    case ActionTypes.GET_EMPLOYEESL_FAILURE:
      state = { ...state, employeesl: action.payload };
      break;
    //get employee timeline

    case ActionTypes.GET_EMPLOYEE_TIMELINE:
      const { page_number } = action.payload.params
      // console.log('pa',JSON.stringify( page_number))
      state = {
        ...state,
        // employeeTimeline: page_number === 1 ? [] : state.employeeTimeline
      };

      break;
    case ActionTypes.GET_EMPLOYEE_TIMELINE_SUCCESS:
      //     console.log("sssssssssssst",JSON.stringify(state))
      // console.log(...state. employeeTimelineList, ...action.payload?.details?.data,'{{{{{{{{{{{{')

      state = {
        ...state,
        // employeeTimeline: [...state.employeeTimeline, ...action.payload?.details?.data],
        employeeTimeline: action.payload.details,
        // employeeTimelineCurrentPages: action.payload?.details?.next_page
      };


      break;
    case ActionTypes.GET_EMPLOYEE_TIMELINE_FAILURE:
      state = { ...state, employeeTimeline: action.payload };
      break;

    //addEmployeeTimeline
    case ActionTypes.ADD_EMPLOYEE_TIMELINE:
      state = {
        ...state
      };

      break;
    case ActionTypes.ADD_EMPLOYEE_TIMELINE_SUCCESS:
      state = {
        ...state,
        employeeAddTime: action.payload.details,
      };
      break;
    case ActionTypes.ADD_EMPLOYEE_TIMELINE_FAILURE:
      state = { ...state, employeeAddTime: action.payload };
      break;

    case ActionTypes.REGISTER_COMPANY:
      state = { ...state };
      break;
    case ActionTypes.REGISTER_COMPANY_SUCCESS:
      state = { ...state, response: action.payload };
      break;
    case ActionTypes.REGISTER_COMPANY_FAILURE:
      state = { ...state, response: action.payload };
      break;
    case ActionTypes.REGISTER_ADMIN:
      state = { ...state };
      break;
    case ActionTypes.REGISTER_ADMIN_SUCCESS:
      state = { ...state, loading: false, registerAdminResponse: action.payload };
      break;
    case ActionTypes.REGISTER_ADMIN_FAILURE:
      state = { ...state };
      break;

    /**
     * get Comnpanied L
     */


    case ActionTypes.GET_ASSOCIATED_COMPANIES_L:
      state = { ...state, associatedCompaniesL: undefined };
      break;
    case ActionTypes.GET_ASSOCIATED_COMPANIES_L_SUCCESS:
      state = { ...state, associatedCompaniesL: action.payload.details };
      break;
    case ActionTypes.GET_ASSOCIATED_COMPANIES_L_FAILURE:
      state = { ...state, loading: false, associatedCompaniesL: action.payload };
      break;


    /**
 * Dashboard
 */
    case ActionTypes.GET_DASHBOARD:
      state = { ...state, dashboardDetails: undefined };
      break;
    case ActionTypes.GET_DASHBOARD_SUCCESS:
      state = { ...state, dashboardDetails: action.payload.details };
      break;
    case ActionTypes.GET_DASHBOARD_FAILURE:
      state = { ...state, dashboardDetails: action.payload };
      break;

    /**
     * set selected company
     */
    case ActionTypes.SET_SELECTED_COMPANY:
      state = { ...state, selectedCompany: action.payload };
      break;

    //SELECTED EMP
    case ActionTypes.SET_SELECTED_EMPLOYEE:
      state = { ...state, selectedEmployee: action.payload };
      break;


    /**
* add employee details for video conference
*/
    case ActionTypes.POST_VIDEO_CONFERENCE:
      state = { ...state, videoConference: undefined };
      break;
    case ActionTypes.POST_VIDEO_CONFERENCE_SUCCESS:
      state = { ...state, videoConference: action.payload.details };
      break;
    case ActionTypes.POST_VIDEO_CONFERENCE_FAILURE:
      state = { ...state, videoConference: action.payload };
      break;


    /**
*get scheduled list for video call
*/
    case ActionTypes.GET_VIDEO_CONFERENCE_LIST:
      state = { ...state, scheduledListData: undefined };
      break;
    case ActionTypes.GET_VIDEO_CONFERENCE_LIST_SUCCESS:
      state = { ...state, scheduledListData: action.payload.details };
      break;
    case ActionTypes.GET_VIDEO_CONFERENCE_LIST_FAILURE:
      state = { ...state, scheduledListData: action.payload };
      break;


    /**
* get user token
*/
    case ActionTypes.GET_TOKEN_BY_USER:
      state = { ...state, userToken: undefined };
      break;
    case ActionTypes.GET_TOKEN_BY_USER_SUCCESS:

      state = { ...state, userToken: action.payload.details };
      break;
    case ActionTypes.GET_TOKEN_BY_USER_FAILURE:
      state = { ...state, userToken: action.payload };
      break;



    case ActionTypes.GET_EVENTS:

      state = {
        ...state,
        events: action?.payload?.params?.page_number === 1 ? [] : state.events
      };
      break;
    case ActionTypes.GET_EVENTS_SUCCESS:
      state = {
        ...state,
        events: [...state.events, ...action?.payload?.details?.data],
        eventsCurrentPages: action?.payload?.details?.next_page
      };
      break;
    case ActionTypes.GET_EVENTS_FAILURE:
      state = { ...state, events: undefined };
      break;

    /**
     * GET ASSOCIATED COMPANIES
     */

    case ActionTypes.GET_ASSOCIATED_COMPANY:
      state = { ...state, associatedCompany: undefined };
      break;
    case ActionTypes.GET_ASSOCIATED_COMPANY_SUCCESS:
      state = { ...state, associatedCompany: action.payload.details };
      break;
    case ActionTypes.GET_ASSOCIATED_COMPANY_FAILURE:
      state = { ...state, associatedCompany: undefined };
      break;

    /**
   * ADD ASSOCIATED COMPANIES
   */

    case ActionTypes.ADD_ASSOCIATED_COMPANY:
      state = { ...state, updateAssociatedCompany: undefined };
      break;
    case ActionTypes.ADD_ASSOCIATED_COMPANY_SUCCESS:
      state = { ...state, updateAssociatedCompany: action.payload.details.data };
      break;
    case ActionTypes.ADD_ASSOCIATED_COMPANY_FAILURE:
      state = { ...state, updateAssociatedCompany: action.payload };
      break;

    //REFRESH USER COMPANY

    case ActionTypes.REFRESH_USER_COMPANY:
      state = { ...state, refreshUserCompany: !state.refreshUserCompany }
      break;

    //get group employees

    case ActionTypes.GET_GROUPS_EMPLOYEES:
      state = {
        ...state,
        groupEmployees: undefined,
      };
      break;
    case ActionTypes.GET_GROUPS_EMPLOYEES_SUCCESS:
      state = {
        ...state,
        groupEmployees: action.payload.details,
      };
      break;
    case ActionTypes.GET_GROUPS_EMPLOYEES_FAILURE:
      state = { ...state, groupEmployees: action.payload };
      break;

    //get group message

    case ActionTypes.GET_GROUP_MESSAGE:
      state = {
        ...state,
        groupMessage: undefined,
      };
      break;
    case ActionTypes.GET_GROUP_MESSAGE_SUCCESS:
      state = {
        ...state,
        groupMessage: action.payload.details,
      };
      break;
    case ActionTypes.GET_GROUP_MESSAGE_FAILURE:
      state = { ...state, groupMessage: action.payload };
      break;

    /**
   * refresh Tasks 
   */

    case ActionTypes.REFRESH_GROUP_EVENTS:
      state = { ...state, refreshGroupEvents: !state.refreshGroupEvents }
      break;

    /**
   * selected Group
   */
    case ActionTypes.SELECTED_GROUP_ITEM:
      state = { ...state, selectedGroup: action.payload }
      break;

    //add group message

    case ActionTypes.ADD_GROUP_MESSAGE:
      state = {
        ...state,
        addGroupMessages: undefined,
      };
      break;
    case ActionTypes.ADD_GROUP_MESSAGE_SUCCESS:
      state = {
        ...state,
        addGroupMessages: action.payload.details,
      };
      break;
    case ActionTypes.ADD_GROUP_MESSAGE_FAILURE:
      state = { ...state, addGroupMessages: action.payload };
      break;

    // GET SUB GROUP

    case ActionTypes.GET_SUB_GROUP:
      state = {
        ...state,
        getSubGroups: undefined,
      };
      break;
    case ActionTypes.GET_SUB_GROUP_SUCCESS:
      state = {
        ...state,
        getSubGroups: action.payload.details,
      };
      break;
    case ActionTypes.GET_SUB_GROUP_FAILURE:
      state = { ...state, getSubGroups: action.payload };
      break;


    // GET  GROUP

    case ActionTypes.GET_CHAT_GROUPS:
      state = {
        ...state,
        chatGroups: undefined,
      };
      break;
    case ActionTypes.GET_CHAT_GROUPS_SUCCESS:
      state = {
        ...state,
        chatGroups: action.payload?.details?.data?action.payload?.details?.data:action.payload?.details,
      };
      break;
    case ActionTypes.GET_CHAT_GROUPS_FAILURE:
      state = { ...state, chatGroups: undefined };
      break;


    // ADD EMPLOYEE TIMELINE STATUS

    case ActionTypes.EMPLOYEE_TIMELINE_STATUS:
      state = {
        ...state,
        timeStatus: undefined,
      };
      break;
    case ActionTypes.EMPLOYEE_TIMELINE_STATUS_SUCCESS:
      state = {
        ...state,
        timeStatus: action.payload.details,
      };
      break;
    case ActionTypes.EMPLOYEE_TIMELINE_STATUS_FAILURE:
      state = { ...state, timeStatus: undefined };
      break;



    // add enable request

    case ActionTypes.ADD_ENABLE_REQUEST:
      state = {
        ...state,
        enableRequest: undefined,
      };
      break;
    case ActionTypes.ADD_ENABLE_REQUEST_SUCCESS:
      state = {
        ...state,
        enableRequest: action.payload.details,
      };
      break;
    case ActionTypes.ADD_ENABLE_REQUEST_FAILURE:
      state = { ...state, enableRequest: undefined };
      break;




    // get enable request

    case ActionTypes.GET_ENABLE_REQUEST:
      state = {
        ...state,
        enableRequestDataList: undefined,
      };
      break;
    case ActionTypes.GET_ENABLE_REQUEST_SUCCESS:
      state = {
        ...state,
        enableRequestDataList: action.payload.details,
      };
      break;
    case ActionTypes.GET_ENABLE_REQUEST_FAILURE:
      state = { ...state, enableRequestDataList: undefined };
      break;




    /**
     * selected Group chat code
     */
    case ActionTypes.SELECTED_GROUP_CHAT_CODE:
      state = { ...state, selectedGroupChatCode: action.payload };
      break;

    /**
 * selected Group  code
 */
    case ActionTypes.SELECTED_TASK_GROUP_CODE:
      state = { ...state, selectedTaskGroupCode: action.payload };
      break;

    /**
* refresh Group Chat
*/

case ActionTypes.REFRESH_GROUP_CHAT:
  state = { ...state, refreshGroupChat: !state.refreshGroupChat }
  break;


  case ActionTypes.REFRESH_CHAT_MESSAGE:
  state = { ...state, refreshChatMessage: !state.refreshChatMessage}
  break;


  //SELECTED USER

  case ActionTypes.USER_CHAT:

    state = { ...state,  selectedUserChat: action.payload}
    break;
  


    /**
* selected vc details
*/

    case ActionTypes.SELECTED_VC_DETAILS:
      state = { ...state, settingVcDetails: action.payload }
      break;


    /**
* vc notification details
*/

    case ActionTypes.VC_NOTIFICATION_DETAILS:
      console.log("action.payload===>", action)
      state = { ...state, vcNotificationData: action.payload }
      break;


    //post chat message

    case ActionTypes.POST_CHAT_MESSAGE:
      state = {
        ...state,
      };
      break;
    case ActionTypes.POST_CHAT_MESSAGE_SUCCESS:
      state = {
        ...state,
      };
      break;
    case ActionTypes.POST_CHAT_MESSAGE_FAILURE:
      state = { ...state, };
      break;


    // GET chat message

    case ActionTypes.FETCH_CHAT_MESSAGE:
     
      state = {
        ...state,
        chatMessage: action.payload.params.page_number === 1 ? [] : state.chatMessage
       
      };
      break;
    case ActionTypes.FETCH_CHAT_MESSAGE_SUCCESS:
      
      state = {
        ...state,
        chatMessage:[...state.chatMessage,...action.payload?.details?.data],
        chatMessageCurrentPages: action.payload?.details.next_page 
      
      };
      break;
    case ActionTypes.FETCH_CHAT_MESSAGE_FAILURE:
   
      state = { ...state,  chatMessage: undefined};
      break;



      ///chat 

//       case ActionTypes.FETCH_CHAT_MESSAGE:

//       state = {
//         ...state,
//         chatMessage: action?.payload?.params?.page_number === 1 ? [] : state.events
//       };
//       break;
//     case ActionTypes.FETCH_CHAT_MESSAGE_SUCCESS:
// console.log(action?.payload?.details?.data,"action?.payload?.details?.data]")
//       state = {
//         ...state,
//         chatMessage: [...state.events, ...action?.payload?.details?.data],
//         chatMessageCurrentPages: action?.payload?.details?.next_page
//       };
//       break;
//     case ActionTypes.FETCH_CHAT_MESSAGE_FAILURE:
//       state = { ...state,  chatMessage: undefined };
//       break;


    // get chat employee list

    case ActionTypes.FETCH_CHAT_EMPLOYEE_LIST:

      state = {
        ...state,
        chatEmployeeList: undefined,
        chatEmployeeListCurrentPages: 1,
        chatEmployeeListNumOfPages: 0,
      };
      break;
    case ActionTypes.FETCH_CHAT_EMPLOYEE_LIST_SUCCESS:
      state = {
        ...state,
        chatEmployeeList: action.payload?.details?.data ? action.payload?.details?.data : action.payload?.details,
        chatEmployeeListCurrentPages: action.payload?.details.next_page === -1
          ? action?.payload?.details.num_pages
          : action?.payload?.details.next_page - 1,
        chatEmployeeListNumOfPages: action.payload.details.num_pages,
      };
      break;
    case ActionTypes.FETCH_CHAT_EMPLOYEE_LIST_FAILURE:
      state = { ...state, chatEmployeeList: undefined };
      break;




    /**
*handle one to one chat
*/

    case ActionTypes.HANDLE_ONE_TO_ONE_CHAT:
      state = { ...state, oneToOneChat: action.payload }
      break;


    /**
*one to one vc noti
*/

    case ActionTypes.ONE_TO_ONE_VC_NOTI:
      state = { ...state, oneToOneVcNoti: action.payload }
      break;

    default:
      state = state;
      break;
  }
  return state;
}
export { UserCompanyReducer }