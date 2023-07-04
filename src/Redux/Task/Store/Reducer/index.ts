import { TaskStateProp } from '../../Interfaces';
import * as ActionTypes from '../ActionTypes'

const initialState: TaskStateProp = {
  taskGroups: undefined,
  tasks: undefined,
  taskNumOfPages: undefined,
  taskCurrentPages: 1,
  selectedTask: undefined,
  addTaskEvents: undefined,
  taskEventHistories: undefined,
  assignedDepartment: undefined,
  assignedDesignation: undefined,
  assignedEmployee: undefined,
  createdDepartment: undefined,
  createdDesignation: undefined,
  createdEmployee: undefined,
  subTasks: undefined,
  taskEvents: undefined,
  taskEventsNumOfPages: undefined,
  taskEventsCurrentPages: 1,
  referencesTasks: undefined,
  referencesTasksNumOfPages: undefined,
  referencesTasksCurrentPages: 1,
  taskUsers: undefined,
  eventsMessage:undefined,
  refreshTaskEvents: false,
  refreshEventMessage:false,
  refreshEventsMessage:false,
  taskEventAttachments: [],
  taskEventAttachmentsCurrentPage: 1,
  selectedTabPositions: { id: '1' },
  taskDetails: {},
  breakDownTimeLine:undefined,
  subTaskGroups: undefined,
  assignedTask: undefined,
  selectedTaskId:undefined,
  selectedReferenceDetails:true,
  addNormalMessage:undefined,
  addAttachmentsMessage:undefined,
  getAttachmentsMessage:undefined,
  taskParams: { q_many: "", assigned_tasks_by: "assigned_to",assigned_company: '', created_company: 'ALL', "created_tasks_by": "ALL", "task_status": "INP", "priority": "ALL", "group": "ALL", "include_subtask": false, "assigned_department_id": "ALL", "assigned_designation_id": "ALL", "created_department_id": "ALL", "created_designation_id": "ALL", page_number: 1, assigned_emp_id: "", created_emp_id: "" },
};

const TaskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    //get task groups

    case ActionTypes.GET_TASK_GROUPS_L:
      state = {
        ...state,
        taskGroups: undefined,
      };
      break;
    case ActionTypes.GET_TASK_GROUPS_L_SUCCESS:
      state = {
        ...state,
        taskGroups: action.payload.details,
      };
      break;
    case ActionTypes.GET_TASK_GROUPS_L_FAILURE:
      state = { ...state, taskGroups: action.payload };
      break;


    /**
  * Get Tasks
  */
    case ActionTypes.GET_TASKS:
      state = {
        ...state,
        tasks: undefined,
        taskNumOfPages: 0,
        taskCurrentPages: 1,
      }
      break;
    case ActionTypes.GET_TASKS_SUCCESS:
      state = {
        ...state,
        tasks: action.payload?.details.data,
        taskNumOfPages: action.payload?.details.num_pages,
        taskCurrentPages:
          action.payload?.details.next_page === -1
            ? action.payload?.details.num_pages
            : action.payload?.details.next_page - 1
      }
      break;
    case ActionTypes.GET_TASKS_FAILURE:
      state = { ...state, tasks: undefined }
      break;

    /**
     * selected Task
     */
    case ActionTypes.SELECTED_TASK_ITEM:
      state = { ...state, selectedTask: action.payload }
      break;
 /**
     * selected Task Id
     */
 case ActionTypes.SELECTED_TASK_ID:
  state = { ...state, selectedTaskId: action.payload }
  break;
    /** 
     * Add Task Event
     */
    case ActionTypes.ADD_TASK_EVENT:
      state = {
        ...state,
        addTaskEvents: undefined,
      };
      break;
    case ActionTypes.ADD_TASK_EVENT_SUCCESS:
      state = {
        ...state,
        addTaskEvents: action.payload.details,
      };
      break;
    case ActionTypes.ADD_TASK_EVENT_FAILURE:
      state = { ...state, addTaskEvents: undefined };
      break;

    /**
     * get Task Event History
     */

    case ActionTypes.GET_TASK_EVENT_HISTORY:
      const { page_numbers } = action.payload.params
      state = {
        ...state, taskEventHistories: page_numbers === 1 ? [] : state.taskEventHistories
      };

      break;
    case ActionTypes.GET_TASK_EVENT_HISTORY_SUCCESS:
      state = {
        ...state,
        // taskEventHistories: [...state.taskEventHistories, ...action.payload.details.data,],
        taskEventHistories: action.payload.details?.data?action.payload.details.data:action.payload.details,
        // taskEventHistories: [...state.taskEventHistories, ...action.payload.details.data,],
        taskEventsCurrentPages:
          action.payload.details.next_page
      };
      break;
    case ActionTypes.GET_TASK_EVENT_HISTORY_FAILURE:
      state = { ...state, taskEventHistories: undefined };
      break;

    /**
     * sub tasks
     */

    /* GET SUB TASK*/

    case ActionTypes.GET_SUB_TASKS:
      state = { ...state, subTasks: undefined }
      break;
    case ActionTypes.GET_SUB_TASKS_SUCCESS:
      state = { ...state, subTasks: action.payload?.details.data }
      break;
    case ActionTypes.GET_SUB_TASKS_FAILURE:
      state = { ...state, subTasks: undefined }
      break;


    /**
     * get Task Events
     */

    case ActionTypes.GET_TASK_EVENTS:

      const { page_number } = action.payload.params
      state = {
        ...state,
        taskEvents: page_number === 1 ? [] : state.taskEvents
      };
      break;
    case ActionTypes.GET_TASK_EVENTS_SUCCESS:


      state = {
        ...state,
        taskEvents: [...state.taskEvents, ...action.payload.details.data],
        taskEventsCurrentPages:
          action.payload.details.next_page
      };
      break;

    case ActionTypes.GET_TASK_EVENTS_FAILURE:
      state = { ...state, taskEvents: action.payload };
      break;

    /**
     * get Reference task
     */

    //GET REFERENCE TASKS
    case ActionTypes.GET_REFERENCE_TASKS:
      state = {
        ...state,
        referencesTasks: undefined,
        referencesTasksNumOfPages: 0,
        referencesTasksCurrentPages: 1,
      };
      break;
    case ActionTypes.GET_REFERENCE_TASKS_SUCCESS:


      state = {
        ...state,
        referencesTasks: action.payload.details.data,
        referencesTasksNumOfPages: action?.payload?.details.num_pages,
        referencesTasksCurrentPages:
          action?.payload?.details.next_page === -1
            ? action?.payload?.details.num_pages
            : action?.payload?.details.next_page - 1,
      };
      break;
    case ActionTypes.GET_REFERENCE_TASKS_FAILURE:
      state = {
        ...state,
        referencesTasks: undefined,
      };
      break;


    /**
     * get Task User
     */

    case ActionTypes.GET_TASK_USERS:
      state = { ...state, taskUsers: undefined }
      break;
    case ActionTypes.GET_TASK_USERS_SUCCESS:
      state = { ...state, taskUsers: action.payload?.details }
      break;
    case ActionTypes.GET_TASK_USERS_FAILURE:
      state = { ...state, taskUsers: undefined }
      break;


    /**
     * refresh Tasks 
     */

    case ActionTypes.REFRESH_TASK_EVENTS:
      state = { ...state, refreshTaskEvents: !state.refreshTaskEvents }
      break;


    /**
     * refresh Events Message 
     */

    case ActionTypes.REFRESH_EVENT_MESSAGE:
      state = { ...state, refreshEventMessage: !state.refreshEventMessage }
      break;

    case ActionTypes.REFRESH_EVENTS_MESSAGE:
      console.log("aaaaaaaaaaaa=====",action)

      state = { ...state, eventsMessage: action.payload }
      break;



    // SELECTED TABS

    case ActionTypes.SELECTED_TAB_POSITION:
    
      state = {
        ...state,
        selectedTabPositions: action.payload,
      };
      break;
    /**
     * get Task Event Attachments
     */


    case ActionTypes.GET_TASK_EVENT_ATTACHMENTS:
      state = {
        ...state,
        taskEventAttachments: action.payload.params.page_number === 1 ? [] : state.taskEventAttachments
      };
      break;
    case ActionTypes.GET_TASK_EVENT_ATTACHMENTS_SUCCESS:
      state = {
        ...state,
        taskEventAttachments: [...state.taskEventAttachments, ...action.payload.details.data],
        taskEventAttachmentsCurrentPage:
          action.payload.details.next_page
      };
      break;

    case ActionTypes.GET_TASK_EVENT_ATTACHMENTS_FAILURE:
      state = { ...state, taskEventAttachments: undefined };
      break;

    /* GET TASK DETAILS */

    case ActionTypes.GET_TASK_DETAILS:
      state = { ...state, taskDetails: undefined }
      break;
    case ActionTypes.GET_TASK_DETAILS_SUCCESS:
      state = { ...state, taskDetails: action.payload?.details }
      break;
    case ActionTypes.GET_TASK_DETAILS_FAILURE:
      state = { ...state, taskDetails: undefined }
      break;



    /* GET TASK DETAILS */

    case ActionTypes.GET_SUB_TASK_GROUPS:
      state = { ...state, subTaskGroups: undefined }
      break;
    case ActionTypes.GET_SUB_TASK_GROUPS_SUCCESS:
   
      state = { ...state, subTaskGroups: action.payload?.details?.data ? action.payload?.details?.data : action.payload?.details }
      break;
    case ActionTypes.GET_SUB_TASK_GROUPS_FAILURE:
      state = { ...state, subTaskGroups: undefined }
      break;

    // get Assigned task

    case ActionTypes.GET_ASSIGNED_TASK:
      state = { ...state, assignedTask: undefined }
      break;
    case ActionTypes.GET_ASSIGNED_TASK_SUCCESS:

      state = { ...state, assignedTask: action.payload?.details }

      break;
    case ActionTypes.GET_ASSIGNED_TASK_FAILURE:
      state = { ...state, assignedTask: undefined }
      break;

      //GET TIME LINE BREAK DOWN

      case ActionTypes.GET_TIMELINE_BREAKDOWN:
        state = { ...state, breakDownTimeLine: undefined }
        break;
      case ActionTypes.GET_TIMELINE_BREAKDOWN_SUCCESS:
  
        state = { ...state,breakDownTimeLine: action.payload?.details }
  
        break;
      case ActionTypes.GET_TIMELINE_BREAKDOWN_FAILURE:
        state = { ...state, breakDownTimeLine: undefined }
        break;

        ///
        case ActionTypes.SELECTED_REFERENCE:
         
        state = { ...state, selectedReferenceDetails:action.payload}
        break;




    /**
 * TASK FILTER GROUPS
 */
    case ActionTypes.TASK_DEFAULT_PARAMS:
      state = { ...state, taskParams: action.payload }
      break;

    //assigned
    case ActionTypes.ASSIGNED_DEPARTMENT:
      state = { ...state, assignedDepartment: action.payload }
      break;

    case ActionTypes.ASSIGNED_DESIGNATION:
      state = { ...state, assignedDesignation: action.payload }
      break;

    case ActionTypes.ASSIGNED_EMPLOYEE:
      state = { ...state, assignedEmployee: action.payload }
      break;
    //creatyed
    case ActionTypes.CREATED_DEPARTMENT:
      state = { ...state, createdDepartment: action.payload }
      break;
    case ActionTypes.CREATED_DESIGNATION:
      state = { ...state, createdDesignation: action.payload }
      break;
    case ActionTypes.CREATED_EMPLOYEE:
      state = { ...state, createdEmployee: action.payload }
      break;
      
        /**
     * add Attachments message
     */

    case ActionTypes.ADD_ATTACHMENTS_MESSAGE:
      state = {
        ...state,
        addAttachmentsMessage:undefined
      };
      break;
    case ActionTypes.ADD_ATTACHMENTS_MESSAGE_SUCCESS:
      state = {
        ...state,
        addAttachmentsMessage:action.payload,
      };
      break;

    case ActionTypes.ADD_ATTACHMENTS_MESSAGE_FAILURE:
      state = { ...state, addAttachmentsMessage: undefined };
      break;


       /**
     * add Normal message
     */


    case ActionTypes.GET_ATTACHMENTS_MESSAGE:
      state = {
        ...state,
        getAttachmentsMessage: action.payload};
      break;
    case ActionTypes.GET_ATTACHMENTS_MESSAGE_SUCCESS:
      state = {
        ...state,
        getAttachmentsMessage: action.payload,
      };
      break;

    case ActionTypes.GET_ATTACHMENTS_MESSAGE_FAILURE:
      state = { ...state, getAttachmentsMessage: undefined };
      break;


    default:
      state = state;
      break;
  }

  return state;
};

export { TaskReducer };
