import { Grid } from "@mui/material";
import React from "react";
import TextBox from "../../../Components/TextBox";

export default function ConfigurationBlock() {

    const envVariables = [
        {
            key: "REACT_APP_BASE_URL",
            value: "https://www.google.com"
        },
        {
            key: "REACT_APP_BASE_URL",
            value: "https://www.google.com"
        },
        {
            key: "REACT_APP_BASE_URL",
            value: "https://www.google.com"
        }
    ]

    return (
        <div>
            {envVariables.map((value, index) => {

                return (
                    <Grid style={{marginBottom: 10}} key={index} container spacing={1}>
                        <Grid item md={6}>
                            <TextBox label="Key" value={value.key} placeholder="Hosted Application URL"/>
                        </Grid>
                        <Grid item md={6}>
                            <TextBox label="Value" value={value.value} placeholder="Hosted Application URL"/>
                        </Grid>
                    </Grid>
                )
            })}
        </div>
    )
}