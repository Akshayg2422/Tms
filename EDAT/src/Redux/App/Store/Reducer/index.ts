import { SHOW_LOADER, HIDE_LOADER, USER_LOGIN_DETAILS, USER_DETAILS } from '../ActionTypes';
import { AppStateProp } from '../../Interfaces';

const initialState: AppStateProp = {
  loading: false,
  userLoggedIn: false,
  loginDetails: undefined,
  userDetails: undefined
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
    case USER_LOGIN_DETAILS:
      state = {
        ...state,
        loginDetails: { ...state.loginDetails, ...action.payload },
      };
      break;

      case USER_DETAILS:
        state = {
          ...state,
          loginDetails: { ...state.userDetails, ...action.payload },
        };
        break;

    default:
      state = state;
      break;
  }

  return state;
};

export { AppReducer };
