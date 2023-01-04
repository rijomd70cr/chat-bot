import { setClientData } from "."
import { request } from "../../../Core/Services/Request"
import { getApiConst } from "../../../Core/Utilities"

export const saveClient = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return request(getApiConst('SAVE_CLIENTS'), data, 'POST')
            .then(res => {
                dispatch(setClientData({data: res.result}));
                resolve(res)
            })
            .catch(error => {
                reject(error);
            })
    })
}

export const fetchClientDetails = (id) => dispatch => {
    return request(getApiConst('SAVE_CLIENT_DETAILS') + '/' + id, '', 'GET')
        .then(res => {
            dispatch(setClientData({data: res.result, id}))
        });
}

export const saveApplicationSettings = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return request(getApiConst('SAVE_CLIENT_APPLICATION_SETTINGS') + id, data, 'POST')
        .then(res => {
            resolve(res)
        })
    })
}