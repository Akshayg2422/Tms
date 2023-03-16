import { USER_LOGIN_DETAILS, RESTORE_APP, HANDLING_API } from '../ActionTypes';
import { AppStateProp } from '../../Interfaces';

const initialState: AppStateProp = {

  userLoggedIn: false,
  loginDetails: undefined,
  isSync: { issues: false, companies: false, broadcast: false, dashboardDetails: false }
};

const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RESTORE_APP:
      state = initialState;
      break;
    case USER_LOGIN_DETAILS:
      state = {
        ...state,
        loginDetails: { ...state.loginDetails, ...action.payload },
      };
      break;
    case HANDLING_API:
      state = {
        ...state,
        isSync: action.payload,
      };
      state = state;
      break;
    default:

  }

  return state;
};

export { AppReducer };
