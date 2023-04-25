import * as ActionTypes from '../ActionTypes'
export const getTaskGroupsL = (params: any) => {
    return {
        type: ActionTypes.GET_TASK_GROUPS_L,
        payload: params,
    };
};

export const getTaskGroupsLSuccess = (response: any) => {
    return {
        type: ActionTypes.GET_TASK_GROUPS_L_SUCCESS,
        payload: response,
    };
};

export const getTaskGroupLFailure = (error: any) => {
    return {
        type: ActionTypes.GET_TASK_GROUPS_L_FAILURE,
        payload: error,
    };
};