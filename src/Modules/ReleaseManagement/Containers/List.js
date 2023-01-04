import { Card, Grid } from "@mui/material";
import React, { useState } from "react";
import Page from "../../../Components/Page";
import AlertBlock from "../../../Components/AlertBlock";
import Title from "../../../Components/Title";
import ConfigurationBlock from "../Components/ConfigurationBlock";
import ReleaseManagement from "../Components/ReleaseManagement";
import NoScreenData from "../../../Components/NoScreenData";

const CardBlock = ({ children }) => (
    <Card>
        <div style={{padding: 10}}>
            {children}
        </div>
    </Card>
)

export default function Dashboard() {

    const [data] = useState("w");

    return (
        <Page girdSet={{xs: 12}} title="Release Management">
            {data ? 
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <CardBlock>
                            <div>
                                <AlertBlock type="success" title="Build Completed">
                                    Last build: 28, May 2021 at 10:00 AM
                                </AlertBlock>
                            </div>
                            <div style={{marginTop: 25}}>
                                <ReleaseManagement />
                            </div>
                        </CardBlock>
                    </Grid>
                    <Grid item md={4}>
                        <CardBlock>
                            <Title title="Variables"/>
                            <div style={{marginTop: 15}}>
                                <ConfigurationBlock />
                            </div>
                        </CardBlock>
                    </Grid>
                </Grid>
            : <NoScreenData label="No Screen Configuration." /> }
        </Page>
    )
}