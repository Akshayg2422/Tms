import {
  RESTORE_COMPANY,
  AUTO_COMPLETE_DROPDOWN,
  GET_TASK_GROUPL,
  GET_TASK_GROUPL_FAILURE,
  GET_TASK_GROUPL_SUCCESS
} from '../ActionTypes';
import { CompanyStateProp } from '../../Interfaces';

const initialState: CompanyStateProp = {
  autoCompleteInputSize: false,
  getTaskGrouplDetails: undefined,
};

const CompanyReducer = (
  state: CompanyStateProp = initialState,
  action: any,
) => {
  switch (action.type) {


    case RESTORE_COMPANY:

      state = initialState;

      break;
    //get task group

    case GET_TASK_GROUPL:
      state = {
        ...state,
        getTaskGrouplDetails: undefined,
      };
      break;
    case GET_TASK_GROUPL_SUCCESS:
      state = {
        ...state,
        getTaskGrouplDetails: action.payload.details,
      };
      break;
    case GET_TASK_GROUPL_FAILURE:
      state = { ...state, getTaskGrouplDetails: undefined };
      break;


    // case UPDATE_EMPLOYEE_PROFILE_PHOTO:
    //   state = {
    //     ...state,
    //     updateEmployeeProfile: undefined,
    //   };
    //   break;
    // case UPDATE_EMPLOYEE_PROFILE_PHOTO_SUCCESS:
    //   state = {
    //     ...state,
    //     updateEmployeeProfile: action.payload.details,
    //   };
    //   break;
    // case UPDATE_EMPLOYEE_PROFILE_PHOTO_FAILURE:
    //   state = { ...state,  updateEmployeeProfile: undefined };
    //   break;

    case AUTO_COMPLETE_DROPDOWN:
      state = { ...state, autoCompleteInputSize: action.payload }
      break;

    default:
      state = state;
      break;
  }
  return state;
};

export { CompanyReducer };
