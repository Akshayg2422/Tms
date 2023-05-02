import * as ActionTypes from '../ActionTypes'

/**
   *
   * @param params Raise New Ticket
   * @returns
   */

  export const raiseNewTicket = (params: any) => {
    return {
      type: ActionTypes.RAISE_NEW_TICKET,
      payload: params,
    };
  };
  
  export const raiseNewTicketSuccess = (response: any) => {
    return {
      type: ActionTypes.RAISE_NEW_TICKET_SUCCESS,
      payload: response,
    };
  };
  
  export const raiseNewTicketFailure = (error: any) => {
    return {
      type: ActionTypes.RAISE_NEW_TICKET_FAILURE,
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
      type: ActionTypes.GET_TICKETS,
      payload: params,
    };
  };
  
  export const getTicketsSuccess = (response: any) => {
    return {
      type: ActionTypes.GET_TICKETS_SUCCESS,
      payload: response,
    };
  };
  
  export const getTicketsFailure = (error: any) => {
    return {
      type: ActionTypes.GET_TICKETS_FAILURE,
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
      type: ActionTypes.GET_TICKET_TAGS,
      payload: params,
    };
  };
  
  export const getTicketTagsSuccess = (response: any) => {
    return {
      type: ActionTypes.GET_TICKET_TAGS_SUCCESS,
      payload: response,
    };
  };
  
  export const getTicketTagsFailure = (error: any) => {
    return {
      type: ActionTypes.GET_TICKET_TAGS_FAILURE,
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
      type: ActionTypes.ADD_TICKET_EVENT,
      payload: params,
    };
  };
  
  export const addTicketEventSuccess = (response: any) => {
    return {
      type: ActionTypes.ADD_TICKET_EVENT_SUCCESS,
      payload: response,
    };
  };
  
  export const addTicketEventFailure = (error: any) => {
    return {
      type: ActionTypes.ADD_TICKET_EVENT_FAILURE,
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
      type: ActionTypes.GET_TICKET_EVENTS,
      payload: params,
    };
  };
  
  export const getTicketsEventsSuccess = (response: any) => {
    return {
      type: ActionTypes.GET_TICKET_EVENTS_SUCCESS,
      payload: response,
    };
  };
  
  export const getTicketsEventsFailure = (error: any) => {
  
    return {
      type: ActionTypes.GET_TICKET_EVENTS_FAILURE,
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
      type: ActionTypes.GET_REFERENCE_TICKETS,
      payload: params,
    }
  }
  
  export const getReferenceTicketsSuccess = (response: any) => {
  
    return {
      type: ActionTypes.GET_REFERENCE_TICKETS_SUCCESS,
      payload: response,
    };
  };
  
  export const getReferenceTicketsFailure = (error: any) => {
  
    return {
      type: ActionTypes.GET_REFERENCE_TICKETS_FAILURE,
      payload: error,
    };
  };

  
export const getTicketUsers = (params: any) => {

  return {
    type: ActionTypes.GET_TICKET_USERS,
    payload: params
  }
}

export const getTicketUsersSuccess = (response: any) => {


  return {

    type: ActionTypes.GET_TICKET_USERS_SUCCESS,
    payload: response
  }
}

export const getTicketUsersFailure = (error: any) => {
  return {
    type: ActionTypes.GET_TICKET_USERS_FAILURE,
    payload: error
  }
}

  export const setSelectedTicket = (response: any) => {
    return {
      type: ActionTypes.SET_SELECTED_TICKET,
      payload: response,
    };
  };

  export const setSelectedReferenceTickets = (response: any) => {
  
    return {
      type: ActionTypes.SET_REFERENCE_SELECTED_TICKETS,
      payload: response,
    };
  };
  
  export const referenceIssueDetails = (params) => {
    return {
      type: ActionTypes.REFERENCE_TICKET_DETAILS,
      payload: params,
    }
  }
  