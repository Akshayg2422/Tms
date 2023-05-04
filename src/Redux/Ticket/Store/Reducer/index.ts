import { log } from 'console';
import { TicketStateProps } from '../../Interfaces';
import * as ActionTypes from '../ActionTypes'

const initialState: TicketStateProps = {
  tickets: undefined,
  ticketNumOfPages: undefined,
  ticketCurrentPages: 1,
  getTicketTags: undefined,
  ticketEvents: undefined,
  addTicketEvent: undefined,
  ticketReferenceDetails: undefined,
  referenceTicketNoOfPages: undefined,
  referenceTicketCurrentPages: 1,
  selectedTicket: undefined,
  referenceTicketSelectedDetails: undefined,
  selectedReferenceTickets: undefined,
  ticketEmployees: undefined,
  refreshTicketEvents: false,
  ticketEventHistories: undefined,
  ticketDetails: {},



};

const TicketReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case ActionTypes.RAISE_NEW_TICKET:
      state = {
        ...state,
      };

      break;
    case ActionTypes.RAISE_NEW_TICKET_SUCCESS:
      state = {
        ...state,
      };
      break;
    case ActionTypes.RAISE_NEW_TICKET_FAILURE:
      state = { ...state };
      break;

    case ActionTypes.GET_TICKETS:
      state = {
        ...state,
        tickets: undefined,
        ticketNumOfPages: 0,
        ticketCurrentPages: 1,
      };
      break;
    case ActionTypes.GET_TICKETS_SUCCESS:

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
    case ActionTypes.GET_TICKETS_FAILURE:
      state = { ...state, tickets: undefined };
      break;

    case ActionTypes.GET_TICKET_TAGS:
      state = {
        ...state,
        getTicketTags: 'start',
      };

      break;
    case ActionTypes.GET_TICKET_TAGS_SUCCESS:
      state = {
        ...state,
        getTicketTags: [],
      };
      break;
    case ActionTypes.GET_TICKET_TAGS_FAILURE:
      state = { ...state };
      break;


    case ActionTypes.GET_TICKET_EVENTS:
      state = {
        ...state,
        ticketEvents: undefined,
      };
      break;
    case ActionTypes.GET_TICKET_EVENTS_SUCCESS:
      state = {
        ...state,
        ticketEvents: action.payload.details,
      };
      break;
    case ActionTypes.GET_TICKET_EVENTS_FAILURE:
      state = { ...state, ticketEvents: action.payload };
      break;


    case ActionTypes.ADD_TICKET_EVENT:
      state = {
        ...state,
        addTicketEvent: undefined,
      };
      break;
    case ActionTypes.ADD_TICKET_EVENT_SUCCESS:
      state = {
        ...state,
        addTicketEvent: action.payload.details,
      };
      break;
    case ActionTypes.ADD_TICKET_EVENT_FAILURE:
      state = { ...state, addTicketEvent: undefined };
      break;


    case ActionTypes.GET_REFERENCE_TICKETS:
      state = {
        ...state,
        ticketReferenceDetails: undefined,
        referenceTicketNoOfPages: 0,
        referenceTicketCurrentPages: 1,
      };
      break;
    case ActionTypes.GET_REFERENCE_TICKETS_SUCCESS:
      // const { data, next_page, num_pages } = action.payload?.details;

      state = {
        ...state,
        ticketReferenceDetails: action.payload?.details?.data,
        referenceTicketNoOfPages: action.payload?.details?.num_pages,
        referenceTicketCurrentPages:
          action.payload?.details?.next_page === -1
            ? action.payload?.details?.num_pages
            : action.payload?.details?.next_page - 1,
      };
      break;
    case ActionTypes.GET_REFERENCE_TICKETS_FAILURE:
      state = {
        ...state,
        ticketReferenceDetails: undefined,
      };
      break;



    case ActionTypes.SELECTED_TICKET_ITEM:

      state = { ...state, selectedTicket: action.payload };
      break;
    case ActionTypes.REFERENCE_TICKET_DETAILS:
      state = {
        ...state,
        referenceTicketSelectedDetails: action.payload,
      };
      break;
      

    case ActionTypes.SET_REFERENCE_SELECTED_TICKETS:

      state = { ...state, selectedReferenceTickets: action.payload };
      break;

    case ActionTypes.GET_TICKET_USERS:
      state = {
        ...state
      };
      break;


    case ActionTypes.GET_TICKET_USERS_SUCCESS:
      state = {
        ...state,
        ticketEmployees: action.payload,
      };
      break;
    case ActionTypes.GET_TICKET_USERS_FAILURE:
      state = { ...state, ticketEmployees: undefined };
      break;
    case ActionTypes.REFRESH_TICKET_EVENTS:
      state = { ...state, refreshTicketEvents: !state.refreshTicketEvents }
      break;

      
    /**
    * get Task Event History
    */

    case ActionTypes.GET_TICKET_EVENT_HISTORY:
      state = {
        ...state
      };

      break;
    case ActionTypes.GET_TICKET_EVENT_HISTORY_SUCCESS:
      state = {
        ...state, ticketEventHistories: action.payload?.details.data,
      };
      break;
    case ActionTypes.GET_TICKET_EVENT_HISTORY_FAILURE:
      state = { ...state, ticketEventHistories: action.payload };
      break;

    case ActionTypes.GET_TICKET_DETAILS:
      state = { ...state, ticketDetails: undefined }
      break;
    case ActionTypes.GET_TICKET_DETAILS_SUCCESS:
      state = { ...state, ticketDetails: action.payload?.details }
      break;
    case ActionTypes.GET_TICKET_DETAILS_FAILURE:
      state = { ...state, ticketDetails: undefined }
      break;



    default:
      state = state;
      break;
  }

  return state;
};

export { TicketReducer };
