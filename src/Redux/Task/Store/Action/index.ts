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


//SELECTED CODCE ID

export const setSelectedCodeId=(params)=>{
    return{
        type:ActionTypes.SET_SELECTED_CODE_ID,
        payload:params
    }
}

//SELECTED CODCE 

export const setSelectedTaskCode=(params)=>{
    return{
        type:ActionTypes.SELECTED_TASK_CODE,
        payload:params
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

//
export const selectedTaskIds = (params) => {
    return {
        type: ActionTypes.SELECTED_TASK_ID,
        payload: params
    }
}

export const setSelectedTaskstatus= (params) => {
    return {
        type: ActionTypes.SELECTED_TASK_STATUS,
        payload: params
    }
}



/**
 * refresh task Events
 */


export const refreshTaskEvent = () => {
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



//assigned

export const setAssignedDepartment = (response: any) => {
    return {
        type: ActionTypes.ASSIGNED_DEPARTMENT,
        payload: response
    }
}

export const setAssignedDesignation = (response: any) => {
    return {
        type: ActionTypes.ASSIGNED_DESIGNATION,
        payload: response
    }
}

export const setAssignedEmployee = (response: any) => {
    return {
        type: ActionTypes.ASSIGNED_EMPLOYEE,
        payload: response
    }
}


export const setCreatedDepartment = (response: any) => {
    return {
        type: ActionTypes.CREATED_DEPARTMENT,
        payload: response
    }
}

export const setCreatedDesignation = (response: any) => {
    return {
        type: ActionTypes.CREATED_DESIGNATION,
        payload: response
    }
}

export const setCreatedEmployee = (response: any) => {
    return {
        type: ActionTypes.CREATED_EMPLOYEE,
        payload: response
    }
}


export const getTimeLineBreakdown = (response: any) => {
    return {
        type: ActionTypes.GET_TIMELINE_BREAKDOWN,
        payload: response
    }
}

export const getTimeLineBreakdownSuccess = (response: any) => {
    return {
        type: ActionTypes.GET_TIMELINE_BREAKDOWN_SUCCESS,
        payload: response
    }
}

export const getTimeLineBreakdownFailure = (response: any) => {
    return {
        type: ActionTypes.GET_TIMELINE_BREAKDOWN_FAILURE,
        payload: response
    }
}

// addAttachmentsMessage

export const getSelectedReference = (params: any) => {
  
    return {
        type: ActionTypes.SELECTED_REFERENCE,
        payload: params
    }
}


/**
 * refresh Events message
 */
export const refreshEventMessage = () => {
    return {
        type: ActionTypes.REFRESH_EVENT_MESSAGE
    }
}

export const refreshEventsMessage = (response: any) => {
    return {
        type: ActionTypes.REFRESH_EVENTS_MESSAGE,
        payload: response
    }
}

export const addAttachmentsMessage = (response: any) => {
    return {
        type: ActionTypes.ADD_ATTACHMENTS_MESSAGE,
        payload: response
    }
}

export const addAttachmentsMessageSuccess = (response: any) => {
    return {
        type: ActionTypes.ADD_ATTACHMENTS_MESSAGE_SUCCESS,
        payload: response
    }
}

export const addAttachmentsMessageFailure = (response: any) => {
    return {
        type: ActionTypes.ADD_ATTACHMENTS_MESSAGE_FAILURE,
        payload: response
    }
}

// getAttachmentsMessage

export const getAttachmentsMessage = (response: any) => {
    return {
        type: ActionTypes.GET_ATTACHMENTS_MESSAGE,
        payload: response
    }
}

export const getAttachmentsMessageSuccess = (response: any) => {
    return {
        type: ActionTypes.GET_ATTACHMENTS_MESSAGE_SUCCESS,
        payload: response
    }
}


export const getAttachmentsMessageFailure = (response: any) => {
    return {
        type: ActionTypes.GET_ATTACHMENTS_MESSAGE_FAILURE,
        payload: response
    }
}

export const setTaskParams = (params: any) => {
    return {
        type: ActionTypes.SET_TASK_PARAMS,
        payload: params
    }
}

export const setSelectedModal = (params: any) => {
    return {
        type: ActionTypes.SET_SELECTED_MODAL,
        payload: params
    }
}


export const fetchUsingVoice = (params: any) => {

    return {
        type: ActionTypes.FETCH_USING_VOICE,
        payload: params
    }
}

export const fetchUsingVoiceSuccess = (response: any) => {


    return {
        type: ActionTypes.FETCH_USING_VOICE_SUCCESS,
        payload: response
    }
}

export const fetchUsingVoiceFailure = (error: any) => {

    return {
        type: ActionTypes.FETCH_USING_VOICE_FAILURE,
        payload:error
    }
}


export const fetchUsingCompanyLabel = (params: any) => {
    return {
        type: ActionTypes.FETCH_COMPANY_LABEL,
        payload: params
    }
}

export const  fetchUsingCompanyLabelSuccess = (response: any) => {
    return {
        type: ActionTypes.FETCH_COMPANY_LABEL_SUCCESS,
        payload: response
    }
}


export const  fetchUsingCompanyLabelFailure = (error: any) => {
    return {
        type: ActionTypes.FETCH_COMPANY_LABEL_FAILURE,
        payload:error
    }
}





