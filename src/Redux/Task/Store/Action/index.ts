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
        type: ActionTypes.SELECTED_TASK_ITEM,
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


/**
 * get Sub Tasks
 */

/* GET SUB TASK*/

export const getSubTasks = (params: any) => {
    return {
        type: ActionTypes.GET_SUB_TASKS,
        payload: params
    }
}

export const getSubTasksSuccess = (response: any) => {
    return {
        type: ActionTypes.GET_SUB_TASKS_SUCCESS,
        payload: response
    }
}

export const getSubTasksFailure = (error: any) => {
    return {
        type: ActionTypes.GET_SUB_TASKS_FAILURE,
        payload: error
    }
}


/**
 * get Task Events
 * @param
 * @returns
 */
export const getTaskEvents = (params: any) => {
    return {
        type: ActionTypes.GET_TASK_EVENTS,
        payload: params,
    };
};

export const getTaskEventsSuccess = (response: any) => {
    return {
        type: ActionTypes.GET_TASK_EVENTS_SUCCESS,
        payload: response,
    };
};

export const getTaskEventsFailure = (error: any) => {

    return {
        type: ActionTypes.GET_TASK_EVENTS_FAILURE,
        payload: error,
    };
};


/**
 * get reference Task
 */


export const getReferenceTasks = (params) => {
    return {
        type: ActionTypes.GET_REFERENCE_TASKS,
        payload: params,
    };
};

export const getReferenceTasksSuccess = (response) => {
    return {
        type: ActionTypes.GET_REFERENCE_TASKS_SUCCESS,
        payload: response,
    };
};

export const getReferenceTasksFailure = (error) => {
    return {
        type: ActionTypes.GET_REFERENCE_TASKS_FAILURE,
        payload: error,
    };
};


/**
 * 
 * get Task User
 */


/* Task Users */

export const getTaskUsers = (params: any) => {
    return {
        type: ActionTypes.GET_TASK_USERS,
        payload: params
    }
}

export const getTaskUsersSuccess = (response: any) => {

    return {

        type: ActionTypes.GET_TASK_USERS_SUCCESS,
        payload: response
    }
}

export const getTaskUsersFailure = (error: any) => {
    return {
        type: ActionTypes.GET_TASK_USERS_FAILURE,
        payload: error
    }
}



/**
 * refresh task Events
 */


export const refreshTaskEvents = () => {
    return {
        type: ActionTypes.REFRESH_TASK_EVENTS,
    }
}

/**
 * get Task Event Attachments
 */

export const getTaskEventAttachments = (params: any) => {
    return {
        type: ActionTypes.GET_TASK_EVENT_ATTACHMENTS,
        payload: params,
    };
};

export const getTaskEventAttachmentsSuccess = (response: any) => {
    return {
        type: ActionTypes.GET_TASK_EVENT_ATTACHMENTS_SUCCESS,
        payload: response,
    };
};

export const getTaskEventAttachmentsFailure = (error: any) => {

    return {
        type: ActionTypes.GET_TASK_EVENT_ATTACHMENTS_FAILURE,
        payload: error,
    };
};


export const setSelectedTabPosition = (params: any) => {
    return {
        type: ActionTypes.SELECTED_TAB_POSITION,
        payload: params,
    };
};

/* GET TASK DETAILS */

export const getTaskDetails = (params: any) => {
    
    return {
        type: ActionTypes.GET_TASK_DETAILS,
        payload: params
    }
}
export const getTaskDetailsSuccess = (response: any) => {

    return {

        type: ActionTypes.GET_TASK_DETAILS_SUCCESS,
        payload: response
    }
}

export const getTaskDetailsFailure = (error: any) => {
    return {
        type: ActionTypes.GET_TASK_DETAILS_FAILURE,
        payload: error
    }
}



/**
 * 
 */

/* GET TASK DETAILS */

export const getSubTaskGroups = (params: any) => {
    return {
        type: ActionTypes.GET_SUB_TASK_GROUPS,
        payload: params
    }
}
export const getSubTaskGroupsSuccess = (response: any) => {
    return {
        type: ActionTypes.GET_SUB_TASK_GROUPS_SUCCESS,
        payload: response
    }
}

export const getSubTaskGroupsFailure = (error: any) => {
    return {
        type: ActionTypes.GET_SUB_TASK_GROUPS_FAILURE,
        payload: error
    }
}


// GETASSIGNED TASK

export const getAssignedTask = (params: any) => {
    return {
        type: ActionTypes.GET_ASSIGNED_TASK,
        payload: params
    }
}
export const getAssignedTaskSuccess = (response: any) => {
    return {
        type: ActionTypes.GET_ASSIGNED_TASK_SUCCESS,
        payload: response
    }
}

export const getAssignedTaskFailure = (error: any) => {
    return {
        type: ActionTypes.GET_ASSIGNED_TASK_FAILURE,
        payload: error
    }
}

/**
 * TASK FILTER PARAMS
 */

export const setTaskParams = (params: any) => {
    return {
        type: ActionTypes.TASK_DEFAULT_PARAMS,
        payload: params
    }
}
