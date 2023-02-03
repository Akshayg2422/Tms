import { CustomerStateProp } from '../../Interfaces';
import {GET_STORE_DETAILS, GET_STORE_DETAILS_FAILURE, GET_STORE_DETAILS_SUCCESS} from '../ActionTypes'

const initialState: CustomerStateProp = {
  storeDetails: undefined
};

const CustomerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_STORE_DETAILS:
      state = {...state, storeDetails: undefined};
      break;
    case GET_STORE_DETAILS_SUCCESS:
      console.log(JSON.stringify(action.payload)+"=======sasas");
      
      state = {...state};
      break;
    case GET_STORE_DETAILS_FAILURE:
      console.log(JSON.stringify(action.payload));
      
      state = {...state, storeDetails: action.payload};
      break;
      
    default:
      state = state;
      break;
  }

  return state;
};

export { CustomerReducer };
