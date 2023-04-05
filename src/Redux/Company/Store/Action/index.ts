import {
  RAISE_NEW_TICKET,
  RAISE_NEW_TICKET_FAILURE,
  RAISE_NEW_TICKET_SUCCESS,
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
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  GET_REFERENCE_TICKETS,
  GET_REFERENCE_TICKETS_SUCCESS,
  GET_REFERENCE_TICKETS_FAILURE,
  ADD_BROADCAST_MESSAGES,
  ADD_BROADCAST_MESSAGES_SUCCESS,
  ADD_BROADCAST_MESSAGES_FAILURE,
  GET_BROADCAST_MESSAGES,
  GET_BROADCAST_MESSAGES_SUCCESS,
  GET_BROADCAST_MESSAGES_FAILURE,
  RESTORE_COMPANY,

  GET_TASK_EVENTS,
  GET_TASK_EVENTS_SUCCESS,
  GET_TASK_EVENTS_FAILURE,

  ADD_TASK_EVENT,
  ADD_TASK_EVENT_SUCCESS,
  ADD_TASK_EVENT_FAILURE,

} from '../ActionTypes';

export const raiseNewTicket = (params: any) => {
  return {

    type: RAISE_NEW_TICKET,
    payload: params,
  };
};

export const raiseNewTicketSuccess = (response: any) => {
  return {
    type: RAISE_NEW_TICKET_SUCCESS,
    payload: response,
  };
};

export const raiseNewTicketFailure = (error: any) => {
  return {
    type: RAISE_NEW_TICKET_FAILURE,
    payload: error,
  };
};

/**
 *
 * @param params get Ticket
 * @returns
 */

export const getTickets = (params: any) => {
  return {
    type: GET_TICKETS,
    payload: params,
  };
};

export const getTicketsSuccess = (response: any) => {
  return {
    type: GET_TICKETS_SUCCESS,
    payload: response,
  };
};

export const getTicketsFailure = (error: any) => {
  return {
    type: GET_TICKETS_FAILURE,
    payload: error,
  };
};

/**
 *get Ticket tags
 * @param params
 * @returns
 */

export const getTicketTags = (params: any) => {
  return {
    type: GET_TICKET_TAGS,
    payload: params,
  };
};

export const getTicketTagsSuccess = (response: any) => {
  return {
    type: GET_TICKET_TAGS_SUCCESS,
    payload: response,
  };
};

export const getTicketTagsFailure = (error: any) => {
  return {
    type: GET_TICKET_TAGS_FAILURE,
    payload: error,
  };
};

/**
 *get Ticket tags
 * @param params
 * @returns
 */
export const addTicketEvent = (params: any) => {
  return {
    type: ADD_TICKET_EVENT,
    payload: params,
  };
};

export const addTicketEventSuccess = (response: any) => {
  return {

    type: ADD_TICKET_EVENT_SUCCESS,
    payload: response,
  };
};

export const addTicketEventFailure = (error: any) => {
  return {
    type: ADD_TICKET_EVENT_FAILURE,
    payload: error,
  };
};

/**
 *get Ticket tags
 * @param params
 * @returns
 */
export const getTicketsEvents = (params: any) => {
  return {
    type: GET_TICKET_EVENTS,
    payload: params,
  };
};

export const getTicketsEventsSuccess = (response: any) => {
  return {
    type: GET_TICKET_EVENTS_SUCCESS,
    payload: response,
  };
};

export const getTicketsEventsFailure = (error: any) => {

  return {
    type: GET_TICKET_EVENTS_FAILURE,
    payload: error,
  };
};


/**
 *GET REFERNCE TICKETS
 * @param params
 * @returns
 */

export const getReferenceTickets = (params: any) => {

  return {
    type: GET_REFERENCE_TICKETS,
    payload: params,
  }
}

export const getReferenceTicketsSuccess = (response: any) => {

  return {
    type: GET_REFERENCE_TICKETS_SUCCESS,
    payload: response,
  };
};

export const getReferenceTicketsFailure = (error: any) => {

  return {
    type: GET_REFERENCE_TICKETS_FAILURE,
    payload: error,
  };
};



/**
 *get Employee tags
 * @param params
 * @returns
 */

export const getEmployees = (params: any) => {

  return {
    type: GET_EMPLOYEES,
    payload: params,
  };
};

export const getEmployeesSuccess = (response: any) => {

  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: response,
  };
};

export const getEmployeesFailure = (error: any) => {
  return {
    type: GET_EMPLOYEES_FAILURE,
    payload: error,
  };
};

/**
 *add Employee tags
 * @param params
 * @returns
 */

export const addEmployee = (params: any) => {
  return {
    type: ADD_EMPLOYEE,
    payload: params,
  };
};

export const addEmployeeSuccess = (response: any) => {

  return {
    type: ADD_EMPLOYEE_SUCCESS,
    payload: response,

  };
};

export const addEmployeeFailure = (error: any) => {

  return {
    type: ADD_EMPLOYEE_FAILURE,
    payload: error,
  };
};
export const restoreCompany = () => {

  return {
    type: RESTORE_COMPANY,

  };
};

export const addBroadCastMessages = (params: any) => {
  return {
    type: ADD_BROADCAST_MESSAGES,
    payload: params,
  };
};

export const addBroadCastMessagesSuccess = (response: any) => {
  return {
    type: ADD_BROADCAST_MESSAGES_SUCCESS,
    payload: response,
  };
};

export const addBroadCastMessagesFailure = (error: any) => {
  return {
    type: ADD_BROADCAST_MESSAGES_FAILURE,
    payload: error,
  };
};

/**
 * GET
 */
export const getBroadCastMessages = (params: any) => {
  return {
    type: GET_BROADCAST_MESSAGES,
    payload: params,
  };
};

export const getBroadCastMessagesSuccess = (response: any) => {

  return {
    type: GET_BROADCAST_MESSAGES_SUCCESS,
    payload: response,
  };
};

export const getBroadCastMessagesFailure = (error: any) => {
  return {
    type: GET_BROADCAST_MESSAGES_FAILURE,
    payload: error,
  };
};

/**
 *get Task Events
 * @param
 * @returns
 */
export const getTaskEvents = (params: any) => {
  return {
    type: GET_TASK_EVENTS,
    payload: params,
  };
};

export const getTaskEventsSuccess = (response: any) => {
  return {
    type: GET_TASK_EVENTS_SUCCESS,
    payload: response,
  };
};

export const getTaskEventsFailure = (error: any) => {

  return {
    type: GET_TASK_EVENTS_FAILURE,
    payload: error,
  };
};

/*ADD TASK EVENTS*/

export const addTaskEvent = (params: any) => {
 
  return {
    type: ADD_TASK_EVENT,
    payload: params,
  };
};

export const addTaskEventSuccess = (response: any) => {
  return {
    type: ADD_TASK_EVENT_SUCCESS,
    payload: response,
  };
};

export const addTaskEventFailure = (error: any) => {

  return {
    type: ADD_TASK_EVENT_FAILURE,
    payload: error,
  };
};
