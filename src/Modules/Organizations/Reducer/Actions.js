import { setOrganizations } from "."
import { request } from "../../../Core/Services/Request"
import { getApiConst } from "../../../Core/Utilities"

export const getOrganizations = () => dispatch => {
    request(getApiConst('ORGANIZATION_DROPDOWN'))
    .then(res => {
        dispatch(setOrganizations(res.result))
    })
    .catch(error => {
        console.log(error)
    })
}