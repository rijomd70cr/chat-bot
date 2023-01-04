import { capitalize, splitCamelCaseWithAbbreviations } from "../../Core/Utilities";

export const extractHeaders = (header, hideColumns = [], resetData = []  ) => {
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
                    key: capitalize(splitCamelCaseWithAbbreviations(element, ' ')),
                    value: <span style={{...changeData.style}}>{header[element]}</span>,
                    keyName: element
                }
            }else {
                headerValue = {
                    key: capitalize(splitCamelCaseWithAbbreviations(element, ' ')),
                    value: header[element],
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
            let key = data.find(i => i.keyName === element);
            if(key)
                reHeader.push(key)
        }
        return reHeader;
    }
    return data
}