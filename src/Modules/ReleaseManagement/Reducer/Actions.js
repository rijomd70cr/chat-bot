import { request } from "../../../Core/Services/Request"
import { getApiConst } from "../../../Core/Utilities"

export const createRelease = (value) => dispatch => {
    return request(getApiConst('INSERT_NEW_RELEASE'), value, 'POST')
}

export const getAllReleases = () => dispatch => {
    return request(getApiConst('GET_RELEASE'));
}

export const applicationMerge = (requestData, data) => dispatch => {
    return request(getApiConst('APPLICATION_MERGE_REQUEST') + '/' + requestData.id + '?branch=' + requestData.release_to, data, 'POST')
}   

export const buildApplication = () => dispatch => {
    return request(getApiConst('BUILD_APPLICATION') ,'', 'POST')
}