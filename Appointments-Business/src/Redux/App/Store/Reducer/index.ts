import { SHOW_LOADER, HIDE_LOADER } from '../ActionTypes';
import { AppStateProp } from '../../Interfaces';

const initialState: AppStateProp = {
  loading: false,
  userLoggedIn: false
};

const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_LOADER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case HIDE_LOADER:
      state = {
        ...state,
        loading: false,
      };
      break;

    default:
      state = state;
      break;
  }

  return state;
};

export { AppReducer };
