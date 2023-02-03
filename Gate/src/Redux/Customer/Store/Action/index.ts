import { GET_STORE_DETAILS, GET_STORE_DETAILS_FAILURE, GET_STORE_DETAILS_SUCCESS } from '../ActionTypes'

/**
 *  get store details
 * @param params 
 * @returns 
 */

export const getStoreDetails = (params: any) => {

    console.log('action+"=====');
    
    return {
        type: GET_STORE_DETAILS,
        payload: params,
    };
};

export const getStoreDetailsSuccess = (response: any) => {
    return {
        type: GET_STORE_DETAILS_SUCCESS,
        payload: response,
    };
};


export const getStoreDetailsFailure = (error: any) => {
    return {
        type: GET_STORE_DETAILS_FAILURE,
        payload: error,
    };
};