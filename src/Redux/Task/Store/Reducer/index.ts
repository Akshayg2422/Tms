import { TaskStateProp } from '../../Interfaces';
import * as ActionTypes from '../ActionTypes'

const initialState: TaskStateProp = {
  taskGroups: undefined,
  tasks: undefined,
  taskNumOfPages: undefined,
  taskCurrentPages: 1,
  selectedTask: undefined,
  addTaskEvents: undefined,
  taskEventHistories: undefined

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
     * get Taks
     */

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
      state = { ...state, tasks: action.payload }
      break;

    /**
     * selected Task
     */
    case ActionTypes.SELECTED_TASK_IEM:
      state = { ...state, selectedTask: action.payload }
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
      state = {
        ...state
      };

      break;
    case ActionTypes.GET_TASK_EVENT_HISTORY_SUCCESS:
      state = {
        ...state, taskEventHistories: action.payload?.details.data,
      };
      break;
    case ActionTypes.GET_TASK_EVENT_HISTORY_FAILURE:
      state = { ...state, taskEventHistories: action.payload };
      break;

    default:
      state = state;
      break;
  }

  return state;
};

export { TaskReducer };
