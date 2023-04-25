import { TaskStateProp } from '../../Interfaces';
import * as ActionTypes from '../ActionTypes'

const initialState: TaskStateProp = {
  taskGroups: undefined
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
    default:
      state = state;
      break;
  }

  return state;
};

export { TaskReducer };
