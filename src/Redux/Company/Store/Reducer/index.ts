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
} from '../ActionTypes';
import { CompanyStateProp } from '../../Interfaces';


const initialState: CompanyStateProp = {
  tickets: undefined,
  getTicketTags: undefined,
  ticketEvents: undefined,
  addTicketEvent: undefined,
  getEmployeesDetails: undefined,
  addEmployeeDetails: undefined,
  addReferenceDetails: undefined,
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
      state = { ...state };
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
        getEmployeesDetails: action.payload,
      };
      break;
    case GET_EMPLOYEES_FAILURE:
      state = { ...state, getEmployeesDetails: undefined };
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
        addReferenceDetails: undefined,
      };
      break;
    case GET_REFERENCE_TICKETS_SUCCESS:
      state = {
        ...state,
        addReferenceDetails: action.payload.details,
      };
      break;
    case GET_REFERENCE_TICKETS_FAILURE:
      state = {
        ...state,
        addReferenceDetails: undefined,
      };
      break;
    default:
      state = state;
      break;
  }
  return state;
};

export { CompanyReducer };
