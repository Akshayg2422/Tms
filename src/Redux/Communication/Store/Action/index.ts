import * as  ActionTypes from '../ActionTypes'

/**
 * get Broadcast Message
 */
export const getBroadCastMessages = (params: any) => {
    return {
        type: ActionTypes.GET_BROADCAST_MESSAGES,
        payload: params,
    };
};

export const getBroadCastMessagesSuccess = (response: any) => {

    return {
        type: ActionTypes.GET_BROADCAST_MESSAGES_SUCCESS,
        payload: response,
    };
};

export const getBroadCastMessagesFailure = (error: any) => {
    return {
        type: ActionTypes.GET_BROADCAST_MESSAGES_FAILURE,
        payload: error,
    };
};
