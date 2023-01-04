import Config from "../../Config";
import Menus from "../../Config/menus";
import colors from "../../Config/colors";
import { StaticData } from "../../Data/StaticData";
import apiConstants from "../../Config/apiConstants";
import moment from "moment";
import { ApLogo } from "../../Assets";

export const getStaticData = (name) => StaticData[name];

export const appLogo = () => ApLogo

export const getConfig = (name) => Config[name];

export const url = (url) => {
    let urlString = url.split('');
    if(urlString[0] !== '/') url = '/' + url
    return encodeURI(`${Config.API_URL}${url}`);
}

export const serverValidationError = (value) => value ? value[0] : null; 

export const getMenus = () => Menus;

export const getColors = (clr) => {
    let d = colors[clr];
    if(! d) return clr;
    return d;
}

export const getApiConst = (clr) => {
    let d = apiConstants[clr];
    if(! d) return clr;
    return url(d);
}

export const capitalize = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}

export const generateServerSideError = (errors) => {
    let keys = Object.keys(errors);
    let reSet = {};
    for (let i = 0; i < keys.length; i++) {
        const element = keys[i];
        reSet = {
            ...reSet,
            [element]: errors[element][0]
        }
    }

    return reSet;
}

export const setDropdownData = (data, keyPair = []) => {

    let resetValue = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        resetValue.push({
            value: element[keyPair[0]],
            label: element[keyPair[1]]
        })
    }
    return resetValue;
}

export const appDateFormat = (date) => {
    return moment(date).format('DD, MMM YY | h:m A');
} 

export const splitCamelCaseWithAbbreviations = (s, dLimiter = '-') => {
    return s.replace(/([^[\p{L}\d]+|(?<=[\p{Ll}\d])(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}[\p{Ll}\d])|(?<=[\p{L}\d])(?=\p{Lu}[\p{Ll}\d]))/gu, dLimiter).toLowerCase()
 }