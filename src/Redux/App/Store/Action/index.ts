import {SHOW_LOADER, HIDE_LOADER, USER_LOGIN_DETAILS, RESTORE_APP, USER_LOGOUT} from '../ActionTypes';

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};

export const userLoginDetails = (params: any) => {
  return {
    type: USER_LOGIN_DETAILS,
    payload: params,
  };
};
export const restoreApp = () => {
  return {
    type:RESTORE_APP,
  };
};

export const userLogout = (params: any) => {
  return {
    type: USER_LOGOUT,
    payload: params,
  };
};