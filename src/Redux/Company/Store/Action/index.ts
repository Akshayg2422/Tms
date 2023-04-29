
import {
  ADD_BROADCAST_MESSAGES,
  ADD_BROADCAST_MESSAGES_SUCCESS,
  ADD_BROADCAST_MESSAGES_FAILURE,
  RESTORE_COMPANY,
  GET_TASK_GROUPL_FAILURE,
  GET_TASK_GROUPL,
  GET_TASK_GROUPL_SUCCESS,
} from '../ActionTypes';


export const restoreCompany = () => {

  return {
    type: RESTORE_COMPANY,

  };
};

export const addBroadCastMessages = (params: any) => {
  return {
    type: ADD_BROADCAST_MESSAGES,
    payload: params,
  };
};

export const addBroadCastMessagesSuccess = (response: any) => {
  return {
    type: ADD_BROADCAST_MESSAGES_SUCCESS,
    payload: response,
  };
};

export const addBroadCastMessagesFailure = (error: any) => {
  return {
    type: ADD_BROADCAST_MESSAGES_FAILURE,
    payload: error,
  };
};


//GET TASK GROUP
export const getTaskGroupl = (params: any) => {
  return {
    type: GET_TASK_GROUPL,
    payload: params,
  };
};

export const getTaskGrouplSuccess = (response: any) => {
  return {
    type: GET_TASK_GROUPL_SUCCESS,
    payload: response,
  };
};

export const getTaskGrouplFailure = (error: any) => {
  return {
    type: GET_TASK_GROUPL_FAILURE,
    payload: error,
  };
};