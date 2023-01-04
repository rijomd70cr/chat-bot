import React, { useState } from 'react';

import Title from "../../../Components/Title";
import FormBuilder from '../../../Components/FormBuilder';

import { Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

export default function ProductionBuild({ data, onClose }) {

    const [formElements] = useState([
        {
            label: "Client",
            name: "client",
            type: "select",
            placeholder: "Client",
            autoFocus: true,
            column: 6
        },
        {
            label: "Branch",
            name: "branch",
            type: "select",
            placeholder: "Branch",
            autoFocus: true,
            column: 6
        },
        {
            label: "Api Url",
            name: "apiurl",
            type: "text",
            placeholder: "Api Url",
            autoFocus: true,
            column: 12
        },
        {
            label: "Peer Url",
            name: "peerurl",
            type: "text",
            placeholder: "peer Url",
            autoFocus: true,
            column: 12
        },
    ]);


    const handSubmit = () => {
        onClose()
    }


    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <div style={{ flex: 2, margin: 0 }}><Title title={`Generate production build of ${data.Branch}`} /></div>
                <div style={{ flex: 1, textAlign: "end", cursor: "pointer", margin: 0 }} onClick={onClose} ><CloseIcon /></div>
            </Box>
            <Divider />
            <Box sx={{ mt: 2 }}>
                <FormBuilder formElements={formElements} onSubmit={handSubmit} />
            </Box>
        </Box>
    )
}
