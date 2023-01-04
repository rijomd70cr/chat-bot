import { request } from "../../Core/Services/Request"
import { capitalize, splitCamelCaseWithAbbreviations } from "../../Core/Utilities";
import { setTable } from "./Reducer";

export const fetchTableData = (url, module) => dispatch => {
    return new Promise((resolve, reject) => {
        return request(url, '', 'GET')
        .then(res => {
            dispatch(setTable({ data: res.result, module }))
            resolve(res);
        })
        .catch(error => {
            reject(error);
        })
    })
}

export const generateFilter = (filter) => {

    let keys = Object.keys(filter);
    let query = "?";
    for (let i = 0; i < keys.length; i++) {
        const element = keys[i];
        query += `${element}=${filter[element]}&`
    }
    return query.slice(0, -1);
    
}

export const generateHeader = (header, hideColumns = ['id'], resetData = []) => {
    let keys = Object.keys(header);
    let tableHeader = [];
    for (let i = 0; i < keys.length; i++) {
        const element = keys[i];

        if(!hideColumns.includes(element)) {
            let headerValue = {}
            let changeData = resetData.find(i => i.name === element);
            if(changeData) {
                headerValue = {
                    ...changeData,
                    name: capitalize(splitCamelCaseWithAbbreviations(changeData.name, ' ')),
                    keyName: changeData.name
                }
            }else {
                headerValue = {
                    name: capitalize(splitCamelCaseWithAbbreviations(element, ' ')),
                    selector: row => row[element] || '---',
                    keyName: element
                }
            }

            tableHeader.push(headerValue)
        }
            
    }

    return tableHeader;
}

export const resetHeaderOrder = (data, headerReorder = []) => {
    
    if(headerReorder.length > 0) {
    
        let reHeader = [];
        for (let i = 0; i < headerReorder.length; i++) {
            const element = headerReorder[i];
            reHeader.push(data.find(i => i.keyName === element))
        }
        return reHeader;
    }
    return data
}