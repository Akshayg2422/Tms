import{ 
  
    GET_TASK_GROUP,
    GET_TASK_GROUP_FAILURE,
    GET_TASK_GROUP_SUCCESS,
    ADD_TASK_GROUP,
    ADD_TASK_GROUP_SUCCESS,
    ADD_TASK_GROUP_FAILURE,
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
    ADD_BRAND_SECTOR_SUCCESS,
    ADD_BRAND_SECTOR_FAILURE,
    ADD_TICKET_TAG_SUCCESS,
    ADD_TICKET_TAG_FAILURE,
    GET_BRAND_SECTOR_SUCCESS,
    GET_BRAND_SECTOR_FAILURE,
    GET_TICKET_TAG_SUCCESS,
    GET_TICKET_TAG_FAILURE,
    GET_TICKET_TAG,
    GET_BRAND_SECTOR,
    ADD_BRAND_SECTOR,
    ADD_TICKET_TAG,
  
    RESTORE_USER_COMPANY,} from '../ActionTypes';
import {UserCompanyStateProp} from '../../Interfaces';

const initialState: UserCompanyStateProp = {
 
    loading: false,
    error: '',
    designationData: undefined,
    departmentData: undefined,
    designationCurrentPages: undefined,
    designationNumOfPages: undefined,
    departmentCurrentPages: undefined,
    departmentNumOfPages: undefined,
  
    brandSector: undefined,
    ticketTag: undefined,
    brandSectorCurrentPages: undefined,
    brandSectorNumOfPages: undefined,

    ticketTagCurrentPages: undefined,
    ticketTagNumOfPages: undefined,
    getTaskGroupDetails: undefined,
    getTaskGroupCurrentPages: undefined,
    taskGroupDetails: undefined,
    taskGroupCurrentPages: undefined,
    taskGroupNumOfPages: undefined,
    addTaskGroup: undefined,
}

const UserCompanyReducer = (state: UserCompanyStateProp = initialState, action: any) => {

    switch (action.type) {

        case RESTORE_USER_COMPANY:
          state = initialState;
          break;

           /**
     * add department
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
     * add designation
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

        case FETCH_DEPARTMENT:
      state = {
        ...state,
        departmentData: undefined,
        departmentNumOfPages: 0,
        departmentCurrentPages: 1,
        loading: true
      };
      break;
    case FETCH_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        departmentData: action?.payload?.data,
        departmentNumOfPages: action?.payload?.num_pages,
        departmentCurrentPages:
          action?.payload?.next_page === -1
            ? action?.payload?.num_pages
            : action?.payload?.next_page - 1,
      };
      break;
    case FETCH_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

      case FETCH_DESIGNATION:

      state = {
        ...state,
        designationData: undefined,
        designationNumOfPages: 0,
        designationCurrentPages: 1,
        loading: true
      };

      break;
    case FETCH_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
        designationData: action?.payload?.data,
        designationNumOfPages: action?.payload?.num_pages,
        designationCurrentPages:
          action?.payload?.next_page === -1
            ? action?.payload?.num_pages
            : action?.payload?.next_page - 1,
      };
      break;
    case FETCH_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

   
         case ADD_BRAND_SECTOR:
           state = { ...state, loading: true };
           break;
         case ADD_BRAND_SECTOR_SUCCESS:
           state = {
             ...state,
             loading: false,
           };
           break;
         case ADD_BRAND_SECTOR_FAILURE:
           state = {
             ...state,
             error: action.payload,
             loading: false,
           };
           break;
 /**
     * add TICKET TAG
     */
 case ADD_TICKET_TAG:
    state = { ...state, loading: true };
    break;
  case ADD_TICKET_TAG_SUCCESS:
    state = {
      ...state,
      loading: false,
    };
    break;
  case ADD_TICKET_TAG_FAILURE:
    state = {
      ...state,
      error: action.payload,
      loading: false,
    };
    break;
    
      //get BRAND SECTOR

      case GET_BRAND_SECTOR:
        state = {
          ...state,
          brandSector: undefined,
          brandSectorNumOfPages: 0,
          brandSectorCurrentPages: 1,
          loading: true
        };
        break;
      case GET_BRAND_SECTOR_SUCCESS:
        state = {
          ...state,
          loading: false,
          brandSector: action?.payload?.data,
          brandSectorNumOfPages: action?.payload?.num_pages,
          brandSectorCurrentPages:
            action?.payload?.next_page === -1
              ? action?.payload?.num_pages
              : action?.payload?.next_page - 1,
        };
        break;
      case GET_BRAND_SECTOR_FAILURE:
        state = {
          ...state,
          error: action.payload,
          loading: false,
        };
        break;

         //get designations

    case GET_TICKET_TAG:

    state = {
      ...state,
      ticketTag: undefined,
      ticketTagNumOfPages: 0,
      ticketTagCurrentPages: 1,
      loading: true
    };

    break;
  case GET_TICKET_TAG_SUCCESS:
    state = {
      ...state,
      loading: false,
      ticketTag: action?.payload?.data,
      ticketTagNumOfPages: action?.payload?.num_pages,
      ticketTagCurrentPages:
        action?.payload?.next_page === -1
          ? action?.payload?.num_pages
          : action?.payload?.next_page - 1,
    };
    break;
  case GET_TICKET_TAG_FAILURE:
    state = {
      ...state,
      error: action.payload,
      loading: false,
    };
    break;

      /**get task group */
      case GET_TASK_GROUP:
        const { page_number } = action.payload.params
        state = {
          ...state,
          taskGroupDetails: page_number === 1 ? [] : state.taskGroupDetails,
          getTaskGroupDetails: undefined,
          taskGroupNumOfPages: 0,
          taskGroupCurrentPages: 1,
          loading: true
        };
  
        break;
      case GET_TASK_GROUP_SUCCESS:
        state = {
          ...state,
          loading: false,
           taskGroupDetails: [...state.taskGroupDetails, ...action.payload?.details?.data],
          getTaskGroupCurrentPages:
            action.payload?.details?.next_page,
  
          getTaskGroupDetails: action?.payload?.details?.data,
          taskGroupNumOfPages: action?.payload?.details?.num_pages,
          taskGroupCurrentPages:
            action?.payload?.details?.next_page === -1
              ? action?.payload?.details?.num_pages
              : action?.payload?.details?.next_page - 1,
        };
        break;
      case GET_TASK_GROUP_FAILURE:
        state = {
          ...state,
          error: action.payload,
          loading: false,
        };
        break;

         /**add task group */
    case ADD_TASK_GROUP:

    state = { ...state, addTaskGroup: undefined };
    break;

  case ADD_TASK_GROUP_SUCCESS:

    state = { ...state, addTaskGroup: action.payload.details };
    break;

  case ADD_TASK_GROUP_FAILURE:

    state = { ...state, addTaskGroup: action.payload };
    break;
  

     default:
      state = state;
      break;
    }
    return state;
}
export {UserCompanyReducer}