import { USER_LOGIN_DETAILS, RESTORE_APP, USER_LOGOUT, HANDLING_API } from '../ActionTypes';



export const userLoginDetails = (params: any) => {
  return {
    type: USER_LOGIN_DETAILS,
    payload: params,
  };
};
export const restoreApp = () => {
  return {
    type: RESTORE_APP,
  };
};

export const userLogout = (params: any) => {
  return {
    type: USER_LOGOUT,
    payload: params,
  };
};

export const setIsSync = (params: any) => {
  return {
    type: HANDLING_API,
    payload: params,
  };
};