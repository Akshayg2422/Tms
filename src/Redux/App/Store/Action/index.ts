import {SHOW_LOADER, HIDE_LOADER, USER_LOGIN_DETAILS} from '../ActionTypes';

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
