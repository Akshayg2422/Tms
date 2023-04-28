import { TicketStateProps } from '../../Interfaces';
import * as ActionTypes from '../ActionTypes'

const initialState: TicketStateProps = {
 
};

const TicketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    
    default:
      state = state;
      break;
  }

  return state;
};

export { TicketReducer };
