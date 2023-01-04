import React, { useState } from 'react';
import Page from '../../../Components/Page';
import FormBuilder from '../../../Components/FormBuilder';
import { useDispatch } from 'react-redux';
import { saveClient } from '../Reducer/Actions';
import useRedirect from '../../../Core/Hooks/Redirect';

export default function Form() {

    const [formElements] = useState([
        {
            label: "Name",
            name: "name",
            type: "text",
            placeholder: "Client name",
            autoFocus: true,
            column: 6
        },
        {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Email ID",
            autoFocus: true,
            column: 6
        },
        {
            label: "Location",
            name: "location",
            type: "text",
            placeholder: "Location",
            autoFocus: true,
            column: 6
        },
    ]);

    const dispatch = useDispatch();
    const { redirectTo } = useRedirect();

    const handSubmit = (event, data, errorCallBack) =>{
        dispatch(saveClient(data))
        .then(res => {
            errorCallBack({});
            redirectTo('/clients/' + res.result.id)

        })
        .catch(error => {
            errorCallBack(error.errors)
        })
    }
    
    return (
        <Page title="New Client" goBack card girdSet={{ md: 6 }}>
            <FormBuilder formElements={formElements} onSubmit={handSubmit}/>
        </Page>
    )
}