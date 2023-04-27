import { CommunicationStateProp } from '../../Interfaces';
import * as  ActionTypes from '../ActionTypes'

const initialState: CommunicationStateProp = {
  broadCastDetails: [],
  broadCastCurrentPage: 1,
  broadCastNumOfPages: undefined,
};

const CommunicationReducer = (state = initialState, action: any) => {
  switch (action.type) {

    /**
     * get Broadcastmessage
     */

    case ActionTypes.GET_BROADCAST_MESSAGES:

      const { page_number } = action.payload.params
      state = {
        ...state,
        broadCastDetails: page_number === 1 ? [] : state.broadCastDetails
      };
      break;

    case ActionTypes.GET_BROADCAST_MESSAGES_SUCCESS:
      state = {
        ...state,
        broadCastDetails: [...state.broadCastDetails, ...action.payload?.details?.data],
        broadCastCurrentPage:
          action.payload?.details?.next_page
      };
      break;

    case ActionTypes.GET_BROADCAST_MESSAGES_FAILURE:
      state = { ...state };
      break;


    default:
      state = state;
      break;
  }

  return state;
};

export { CommunicationReducer };
