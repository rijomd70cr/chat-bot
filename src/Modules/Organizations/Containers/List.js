import { Card, Grid } from "@mui/material";
import React from "react";
import Page from "../../../Components/Page";
import AlertBlock from "../../../Components/AlertBlock";
import Title from "../../../Components/Title";
import HeaderActionContainer from "../Components/HeaderActionContainer";
import ConfigurationBlock from "../Components/ConfigurationBlock";
import ReleaseManagement from "../Components/ReleaseManagement";

const CardBlock = ({ children }) => (
    <Card>
        <div style={{padding: 10}}>
            {children}
        </div>
    </Card>
)

export default function Dashboard() {

    return (
        <Page girdSet={{xs: 12}} title="Release Management"
            customActions={<HeaderActionContainer />}
        >
            <Grid container spacing={2}>
                <Grid item md={7}>
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
                <Grid item md={5}>
                    <CardBlock>
                        <Title title="Variables"/>
                        <div style={{marginTop: 15}}>
                            <ConfigurationBlock />
                        </div>
                    </CardBlock>
                </Grid>
            </Grid>
        </Page>
    )
}