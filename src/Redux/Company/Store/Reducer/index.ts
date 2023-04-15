import {
  GET_TICKETS,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAILURE,
  GET_TICKET_TAGS,
  GET_TICKET_TAGS_SUCCESS,
  GET_TICKET_TAGS_FAILURE,
  ADD_TICKET_EVENT,
  ADD_TICKET_EVENT_SUCCESS,
  ADD_TICKET_EVENT_FAILURE,
  GET_TICKET_EVENTS,
  GET_TICKET_EVENTS_SUCCESS,
  GET_TICKET_EVENTS_FAILURE,
  RAISE_NEW_TICKET,
  RAISE_NEW_TICKET_SUCCESS,
  RAISE_NEW_TICKET_FAILURE,
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  GET_REFERENCE_TICKETS,
  GET_REFERENCE_TICKETS_SUCCESS,
  GET_REFERENCE_TICKETS_FAILURE,
  RESTORE_COMPANY,
  ADD_BROADCAST_MESSAGES,
  ADD_BROADCAST_MESSAGES_SUCCESS,
  ADD_BROADCAST_MESSAGES_FAILURE,
  GET_BROADCAST_MESSAGES,
  GET_BROADCAST_MESSAGES_SUCCESS,
  GET_BROADCAST_MESSAGES_FAILURE,
  GET_TASK_EVENTS,
  GET_TASK_EVENTS_SUCCESS,
  GET_TASK_EVENTS_FAILURE,
  ADD_TASK_EVENT,
  ADD_TASK_EVENT_SUCCESS,
  ADD_TASK_EVENT_FAILURE,
  UPDATE_EMPLOYEE_PROFILE_PHOTO,
  UPDATE_EMPLOYEE_PROFILE_PHOTO_SUCCESS,
  UPDATE_EMPLOYEE_PROFILE_PHOTO_FAILURE
} from '../ActionTypes';
import { CompanyStateProp } from '../../Interfaces';

const initialState: CompanyStateProp = {
  tickets: undefined,
  ticketNumOfPages: undefined,
  ticketCurrentPages: 1,
  getTicketTags: undefined,
  ticketEvents: undefined,
  addTicketEvent: undefined,
  employees: undefined,
  addEmployeeDetails: undefined,
  issueReferenceDetails: undefined,
  referenceTicketNoOfPages: undefined,
  referenceTicketCurrentPages: 1,
  broadCastDetails: [],
  broadCastCurrentPage: 1,
  broadCastNumOfPages: undefined,
  taskEvents: undefined,
  addTaskEvents: undefined,
  updateEmployeeProfile:undefined,

};

const CompanyReducer = (
  state: CompanyStateProp = initialState,
  action: any,
) => {
  switch (action.type) {


    case RESTORE_COMPANY:

      state = initialState;

      break;

    case RAISE_NEW_TICKET:
      state = {
        ...state,
      };

      break;
    case RAISE_NEW_TICKET_SUCCESS:
      state = {
        ...state,
      };
      break;
    case RAISE_NEW_TICKET_FAILURE:
      state = { ...state };
      break;

    case ADD_BROADCAST_MESSAGES:
      state = {
        ...state,
      };
      break;
    case ADD_BROADCAST_MESSAGES_SUCCESS:
      state = {
        ...state,
      };
      break;
    case ADD_BROADCAST_MESSAGES_FAILURE:
      state = { ...state };
      break;

    case GET_BROADCAST_MESSAGES:

      const { page_number } = action.payload.params
      state = {
        ...state,
        broadCastDetails: page_number === 1 ? [] : state.broadCastDetails
      };
      break;

    case GET_BROADCAST_MESSAGES_SUCCESS:
      state = {
        ...state,
        broadCastDetails: [...state.broadCastDetails, ...action.payload?.details?.data],
        broadCastCurrentPage:
          action.payload?.details?.next_page
      };
      break;

    case GET_BROADCAST_MESSAGES_FAILURE:
      state = { ...state };
      break;
    case GET_TICKETS:
      state = {
        ...state,
        tickets: undefined,
        ticketNumOfPages: 0,
        ticketCurrentPages: 1,
      };
      break;
    case GET_TICKETS_SUCCESS:

      const { data, next_page, num_pages } = action.payload?.details;
      state = {
        ...state,
        tickets: data,
        ticketNumOfPages: num_pages,
        ticketCurrentPages:
          next_page === -1
            ? num_pages
            : next_page - 1,
      };
      break;
    case GET_TICKETS_FAILURE:
      state = { ...state, tickets: undefined };
      break;
    case GET_TICKET_TAGS:
      state = {
        ...state,
        getTicketTags: 'start',
      };

      break;
    case GET_TICKET_TAGS_SUCCESS:
      state = {
        ...state,
        getTicketTags: [],
      };
      break;
    case GET_TICKET_TAGS_FAILURE:
      state = { ...state };
      break;
    case GET_TICKET_EVENTS:
      state = {
        ...state,
        ticketEvents: undefined,
      };
      break;
    case GET_TICKET_EVENTS_SUCCESS:
      state = {
        ...state,
        ticketEvents: action.payload.details,
      };
      break;
    case GET_TICKET_EVENTS_FAILURE:
      state = { ...state, ticketEvents: action.payload };
      break;
    case ADD_TICKET_EVENT:
      state = {
        ...state,
        addTicketEvent: undefined,
      };
      break;
    case ADD_TICKET_EVENT_SUCCESS:
      state = {
        ...state,
        addTicketEvent: action.payload.details,
      };
      break;
    case ADD_TICKET_EVENT_FAILURE:
      state = { ...state, addTicketEvent: undefined };
      break;

    case GET_EMPLOYEES:
      state = {
        ...state
      };

      break;
    case GET_EMPLOYEES_SUCCESS:
      state = {
        ...state,
        employees: action.payload,
      };
      break;
    case GET_EMPLOYEES_FAILURE:
      state = { ...state, employees: undefined };
      break;
    case ADD_EMPLOYEE:
      state = {
        ...state,
        addEmployeeDetails: undefined,
      };
      break;
    case ADD_EMPLOYEE_SUCCESS:
      state = {
        ...state,
        addEmployeeDetails: action.payload.details,
      };
      break;
    case ADD_EMPLOYEE_FAILURE:
      state = { ...state, addEmployeeDetails: undefined };
      break;
    case GET_REFERENCE_TICKETS:
      state = {
        ...state,
        issueReferenceDetails: undefined,
        referenceTicketNoOfPages: 0,
        referenceTicketCurrentPages: 1,
      };
      break;
    case GET_REFERENCE_TICKETS_SUCCESS:
      // const { data, next_page, num_pages } = action.payload?.details;

      state = {
        ...state,
        issueReferenceDetails: action.payload?.details?.data,
        referenceTicketNoOfPages: action.payload?.details?.num_pages,
        referenceTicketCurrentPages:
          action.payload?.details?.next_page === -1
            ? action.payload?.details?.num_pages
            : action.payload?.details?.next_page - 1,
      };
      break;
    case GET_REFERENCE_TICKETS_FAILURE:
      state = {
        ...state,
        issueReferenceDetails: undefined,
      };
      break;
    case GET_TASK_EVENTS:
      state = {
        ...state,
        taskEvents: undefined,
      };
      break;
    case GET_TASK_EVENTS_SUCCESS:
      state = {
        ...state,
        taskEvents: action.payload.details,
      };
      break;
    case GET_TASK_EVENTS_FAILURE:
      state = { ...state, taskEvents: undefined };
      break;

      case ADD_TASK_EVENT:
        state = {
          ...state,
          addTaskEvents: undefined,
        };
        break;
      case ADD_TASK_EVENT_SUCCESS:
        state = {
          ...state,
          addTaskEvents: action.payload.details,
        };
        break;
      case ADD_TASK_EVENT_FAILURE:
        state = { ...state, addTaskEvents: undefined };
        break;
        

        case UPDATE_EMPLOYEE_PROFILE_PHOTO:
          state = {
            ...state,
            updateEmployeeProfile: undefined,
          };
          break;
        case UPDATE_EMPLOYEE_PROFILE_PHOTO_SUCCESS:
          state = {
            ...state,
            updateEmployeeProfile: action.payload.details,
          };
          break;
        case UPDATE_EMPLOYEE_PROFILE_PHOTO_FAILURE:
          state = { ...state,  updateEmployeeProfile: undefined };
          break;

    default:
      state = state;
      break;
  }
  return state;
};

export { CompanyReducer };
