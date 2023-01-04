import { Grid } from "@mui/material";
import React from "react";
import Form from "../../../Components/Form";
import SelectBox from "../../../Components/SelectBox";

export default function New() {

    return (
        <Form title="New Release" girdSet={{ md: 4 }}>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <SelectBox label="Clients" fullWidth/>
                </Grid>
            </Grid>
        </Form>
    )
}