import React, { useState } from 'react';

import { Box, Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

import Button from "../../../Components/Button";
import Title from "../../../Components/Title";
import MultipleSelectChip from '../../../Components/SelectBox/MultipleSelectChip';

export default function DevUat({ data, onClose }) {
    const [isSubmit, setIsSubmit] = useState(false);
    const [uatData, setuatData] = useState([])
    const uatArray = [
        { label: 'UAT - Multinet', value: "multinet" },
        { label: 'UAT - Omdha', value: "omdha" },
        { label: 'UAT - Uae', value: "uae" },
    ];

    const handleSumbit = () => {
        setIsSubmit(true);
        setTimeout(() => { setIsSubmit(false) }, 1000)
    }
    // const handleChange = () => {

    // }
    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <div style={{ flex: 2, margin: 0 }}><Title title={`Modal UAT of ${data.Branch}`} /></div>
                <div style={{ flex: 1, textAlign: "end", cursor: "pointer", margin: 0 }} onClick={onClose} ><CloseIcon /></div>
            </Box>
            <Divider />
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <MultipleSelectChip
                        label={"UAT"}
                        options={uatArray}
                        onChange={(data) => setuatData(data)}
                        values={uatData}
                    />
                </Grid>
                <Grid item md={12} style={{ textAlign: 'right' }}>
                    <Button onClick={handleSumbit} label="Submit" type="submit" loading={isSubmit} />
                </Grid>
            </Grid>
        </Box>
    )
}
