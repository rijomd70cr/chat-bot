import { splitCamelCaseWithAbbreviations } from "../../../../Core/Utilities/index";

export const addValue = (data, formElements) => {
    for (let item of formElements) {
        let element = data.find(e => e.name === item.label);
        if (element) {
            item.value = element.value;
            item.name = splitCamelCaseWithAbbreviations(item.name, '');
        }
    }
    return formElements;
}

export const setDatas = (data, formElements) => {
    let dataArray = [];
    for (let item in data) {
        dataArray.push(
            {
                name: item,
                value: data[item]
            }
        );
    }

    let newArray = [];
    for (let item of dataArray) {
        let element = formElements.find(e => e.name === item.name);
        if (element) {
            newArray.push({
                name: element.label,
                valuie: item.value
            })
        }
    }
    return newArray;
}