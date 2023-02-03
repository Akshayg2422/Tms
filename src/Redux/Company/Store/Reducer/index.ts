import {
  RAISE_NEW_TICKET,
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
  RAISE_NEW_TICKET_SUCCESS,
  RAISE_NEW_TICKET_FAILURE,
  GET_EMPLOYEE,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE
} from '../ActionTypes';
import {CompanyStateProp} from '../../Interfaces';
import { Console } from 'console';

const initialState: CompanyStateProp = {
  tickets: undefined,
  getTicketTags: undefined,
  ticketEvents: undefined,
  addTicketEvent: undefined,
  getEmployeeData: undefined,
  addEmployeeData: undefined
};

const CompanyReducer = (
  state: CompanyStateProp = initialState,
  action: any,
) => {
  switch (action.type) {
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
      state = {...state};
      break;
    case GET_TICKETS:
      state = {
        ...state,
        tickets: undefined,
      };

      break;
    case GET_TICKETS_SUCCESS:
      state = {
        ...state,
        tickets: action.payload.details,
      };
      break;
    case GET_TICKETS_FAILURE:
      state = {...state, tickets: undefined};
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
      state = {...state};
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
      state = {...state, ticketEvents: action.payload};
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
        addTicketEvent: action.payload,
      };
      break;
    case ADD_TICKET_EVENT_FAILURE:
      state = {...state, addTicketEvent: undefined};
      break;
      
      case GET_EMPLOYEE:
      state = {
        ...state, getEmployeeData:undefined
      };

      break;
    case GET_EMPLOYEE_SUCCESS:
      state = {
        ...state,
        getEmployeeData: action.payload.details,
      };
      break;
    case GET_EMPLOYEE_FAILURE:
      state = {...state, getEmployeeData: undefined};
      break; 
      case ADD_EMPLOYEE:
      state = {
        ...state,
        addEmployeeData: undefined,
      };

      break;
    case ADD_EMPLOYEE_SUCCESS:
      state = {
        ...state,
        addEmployeeData: action.payload.details,
      };
      break;
    case ADD_EMPLOYEE_FAILURE:
      state = {...state, addEmployeeData: undefined};
      break;
    default:
      state = state;
      break;
  }
  return state;
};

export {CompanyReducer};
