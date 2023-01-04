import React from "react";

import Page from "../../../Components/Page";
import ActionHeader from "../Components/ActionHeader";
import GitManagement from "../Components/GitManagement";

import { Box } from "@mui/material";

export default function List() {

    return (
        <div>
            <Page
                title="Git Management"
                girdSet={{ xs: 12 }}
            >
                <Box>
                    <ActionHeader />
                    <Box sx={{ marginTop: "8px" }}>
                        <GitManagement />
                    </Box>
                </Box>
            </Page>
        </div>

    )
}