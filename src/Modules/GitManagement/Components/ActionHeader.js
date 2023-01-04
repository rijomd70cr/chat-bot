import { Box, Grid } from "@mui/material";
import React, { useState } from 'react';

import CustomizedInputs from '../../../Components/SelectBox';
import Button from "../../../Components/Button";

export default function ActionHeader() {
    let branchArray = [
        { label: "Staging", value: "staging" },
        { label: "Production", value: "production" },
        { label: "Devolpment", value: "devolpment" }
    ];//branch items
    const [branch, setBranch] = useState("");

    const handleChange = (e) => {
        setBranch(e.target.value);
    }
    const handleSumbit = () => {
        console.log(branch, "branch");
    }
    return (
        <Box sx={{ padding: "6px 16px", background: "#fff" }}>
            <Grid container>
                <Grid item md={7} xs={12}>
                </Grid>
                <Grid item md={5} xs={12}>
                    <Grid container >
                        <Grid item md={8} xs={12}>
                            <CustomizedInputs
                                options={branchArray}
                                value={branch}
                                name={"branch"}
                                label={"Branch"}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={4} xs={12} sx={{ textAlign: "end" }}>
                            <Button onClick={handleSumbit} label={"Pull"} style={{ top: "40%" }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    )
}
