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
} from '../ActionTypes';
import {CompanyStateProp} from '../../Interfaces';

const initialState: CompanyStateProp = {
  tickets: undefined,
  getTicketTags: undefined,
  ticketEvents: undefined,
  addTicketEvent: undefined,
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
    default:
      state = state;
      break;
  }
  return state;
};

export {CompanyReducer};
