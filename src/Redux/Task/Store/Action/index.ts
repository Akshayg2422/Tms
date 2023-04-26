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


/**
 * get Tasks
 */

export const getTasks = (params: any) => {
    return {
        type: ActionTypes.GET_TASKS,
        payload: params
    }
}
export const getTasksSuccess = (response: any) => {

    return {

        type: ActionTypes.GET_TASKS_SUCCESS,
        payload: response
    }
}

export const getTasksFailure = (error: any) => {
    return {
        type: ActionTypes.GET_TASKS_FAILURE,
        payload: error
    }
}

/**
 * store selected Task 
 */

export const setSelectedTask = (task: any) => {
    return {
        type: ActionTypes.SELECTED_TASK_IEM,
        payload: task
    }
}


/*ADD TASK EVENTS*/

export const addTaskEvent = (params: any) => {
    return {
        type: ActionTypes.ADD_TASK_EVENT,
        payload: params,
    };
};

export const addTaskEventSuccess = (response: any) => {
    return {
        type: ActionTypes.ADD_TASK_EVENT_SUCCESS,
        payload: response,
    };
};

export const addTaskEventFailure = (error: any) => {
    return {
        type: ActionTypes.ADD_TASK_EVENT_FAILURE,
        payload: error,
    };
};

/** 
 * Task Event History
 */


export const getTaskEventHistory = (params: any) => {
    return {
        type: ActionTypes.GET_TASK_EVENT_HISTORY,
        payload: params,
    };
};

export const getTaskEventHistorySuccess = (response: any) => {

    return {
        type: ActionTypes.GET_TASK_EVENT_HISTORY_SUCCESS,
        payload: response,
    };
};

export const getTaskEventHistoryFailure = (error: any) => {

    return {
        type: ActionTypes.GET_TASK_EVENT_HISTORY_FAILURE,
        payload: error,
    };
};